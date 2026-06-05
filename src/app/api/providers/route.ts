import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { generateSlug } from '@/lib/utils'
import { z } from 'zod'

const providerSchema = z.object({
  businessName: z.string().min(3, 'Business name must be at least 3 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters').optional(),
  phone: z.string().min(10, 'Phone number is required'),
  whatsapp: z.string().optional(),
  email: z.string().email('Invalid email').optional(),
  website: z.string().url('Invalid website URL').optional(),
  provinceId: z.string().optional(),
  districtId: z.string().optional(),
  cityId: z.string().optional(),
  address: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Check if user already has a provider profile
    const existingProvider = await prisma.provider.findUnique({
      where: { userId: session.user.id }
    })

    if (existingProvider) {
      return NextResponse.json(
        { error: 'You already have a provider profile' },
        { status: 400 }
      )
    }

    const body = await request.json()
    const validatedData = providerSchema.parse(body)
    
    // Generate unique slug
    let slug = generateSlug(validatedData.businessName)
    const existingSlug = await prisma.provider.findUnique({
      where: { slug }
    })
    
    if (existingSlug) {
      slug = `${slug}-${Date.now()}`
    }

    const provider = await prisma.provider.create({
      data: {
        userId: session.user.id,
        businessName: validatedData.businessName,
        slug,
        description: validatedData.description,
        phone: validatedData.phone,
        whatsapp: validatedData.whatsapp,
        email: validatedData.email,
        website: validatedData.website,
        districtId: validatedData.districtId,
        cityId: validatedData.cityId,
        provinceId: validatedData.provinceId,
        address: validatedData.address,
        latitude: validatedData.latitude,
        longitude: validatedData.longitude,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          }
        },
        district: true,
        city: true,
        province: true,
      }
    })

    return NextResponse.json({
      success: true,
      provider,
      message: 'Provider profile created successfully'
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      )
    }
    
    console.error('Provider creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create provider profile' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const categorySlug = searchParams.get('category')
    const districtId = searchParams.get('district')
    const cityId = searchParams.get('city')
    const tier = searchParams.get('tier')
    const verified = searchParams.get('verified') === 'true'
    const featured = searchParams.get('featured') === 'true'
    const skip = (page - 1) * limit

    const where: any = {
      status: 'ACTIVE',
    }

    if (categorySlug) {
      where.services = {
        some: {
          category: {
            slug: categorySlug
          }
        }
      }
    }

    if (districtId) {
      where.districtId = districtId
    }

    if (cityId) {
      where.cityId = cityId
    }

    if (tier) {
      where.tier = tier
    }

    if (verified) {
      where.verified = true
    }

    if (featured) {
      where.featured = true
    }

    const [providers, total] = await Promise.all([
      prisma.provider.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              name: true,
            }
          },
          district: true,
          city: true,
          province: true,
          services: {
            take: 3,
            include: {
              category: true
            }
          },
          _count: {
            select: {
              reviews: true,
              services: true,
            }
          }
        },
        orderBy: [
          { featured: 'desc' },
          { tier: 'desc' },
          { averageRating: 'desc' },
          { createdAt: 'desc' }
        ],
        skip,
        take: limit
      }),
      prisma.provider.count({ where })
    ])

    return NextResponse.json({
      providers,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Provider fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch providers' },
      { status: 500 }
    )
  }
}
