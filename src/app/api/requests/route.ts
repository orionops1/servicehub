import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const requestSchema = z.object({
  categoryId: z.string(),
  title: z.string().min(10),
  description: z.string().min(20),
  districtId: z.string().optional(),
  cityId: z.string().optional(),
  budgetMin: z.number().optional(),
  budgetMax: z.number().optional(),
  urgency: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']).default('MEDIUM'),
  contactPhone: z.string().optional(),
  contactWhatsapp: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = requestSchema.parse(body)

    // Get district's province if not provided
    let provinceId = null
    if (validatedData.districtId) {
      const district = await prisma.district.findUnique({
        where: { id: validatedData.districtId }
      })
      provinceId = district?.provinceId
    }

    const serviceRequest = await prisma.serviceRequest.create({
      data: {
        customerId: session.user.id,
        categoryId: validatedData.categoryId,
        title: validatedData.title,
        description: validatedData.description,
        provinceId,
        districtId: validatedData.districtId,
        cityId: validatedData.cityId,
        budgetMin: validatedData.budgetMin,
        budgetMax: validatedData.budgetMax,
        urgency: validatedData.urgency,
        contactPhone: validatedData.contactPhone,
        contactWhatsapp: validatedData.contactWhatsapp,
        status: 'OPEN',
      },
      include: {
        category: true,
        district: true,
        city: true,
        customer: {
          select: { name: true }
        }
      }
    })

    return NextResponse.json({ success: true, request: serviceRequest })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      )
    }
    
    console.error('Service request creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create service request' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const categoryId = searchParams.get('categoryId')
    const districtId = searchParams.get('districtId')
    const status = searchParams.get('status')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = 20

    const where: any = {}
    if (categoryId) where.categoryId = categoryId
    if (districtId) where.districtId = districtId
    if (status) where.status = status
    else where.status = 'OPEN' // Default to open requests

    const [requests, total] = await Promise.all([
      prisma.serviceRequest.findMany({
        where,
        include: {
          customer: { select: { name: true } },
          category: true,
          district: true,
          city: true,
          _count: {
            select: { responses: true }
          }
        },
        orderBy: [
          { urgency: 'desc' },
          { createdAt: 'desc' }
        ],
        skip: (page - 1) * limit,
        take: limit
      }),
      prisma.serviceRequest.count({ where })
    ])

    return NextResponse.json({
      requests,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Service request fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch service requests' },
      { status: 500 }
    )
  }
}
