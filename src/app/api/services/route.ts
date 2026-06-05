import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const serviceSchema = z.object({
  categoryId: z.string(),
  title: z.string().min(5),
  description: z.string().optional(),
  priceFrom: z.number().optional(),
  priceTo: z.number().optional(),
  priceUnit: z.string().optional(),
  serviceDistricts: z.array(z.string()).optional(),
  serviceCities: z.array(z.string()).optional(),
})

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const provider = await prisma.provider.findUnique({
      where: { userId: session.user.id }
    })

    if (!provider) {
      return NextResponse.json(
        { error: 'Provider profile not found' },
        { status: 404 }
      )
    }

    const body = await request.json()
    const validatedData = serviceSchema.parse(body)

    const service = await prisma.service.create({
      data: {
        providerId: provider.id,
        categoryId: validatedData.categoryId,
        title: validatedData.title,
        description: validatedData.description,
        priceFrom: validatedData.priceFrom,
        priceTo: validatedData.priceTo,
        priceUnit: validatedData.priceUnit,
        serviceDistricts: validatedData.serviceDistricts || [],
        serviceCities: validatedData.serviceCities || [],
      },
      include: {
        category: true
      }
    })

    return NextResponse.json({ success: true, service })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      )
    }
    
    console.error('Service creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create service' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const providerId = searchParams.get('providerId')
    const categoryId = searchParams.get('categoryId')

    const where: any = { active: true }
    if (providerId) where.providerId = providerId
    if (categoryId) where.categoryId = categoryId

    const services = await prisma.service.findMany({
      where,
      include: {
        category: true,
        provider: {
          include: {
            user: { select: { name: true } },
            district: true,
            city: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({ services })
  } catch (error) {
    console.error('Service fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch services' },
      { status: 500 }
    )
  }
}
