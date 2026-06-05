import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { providerId } = await request.json()

    const existing = await prisma.favorite.findUnique({
      where: {
        userId_providerId: {
          userId: session.user.id,
          providerId
        }
      }
    })

    if (existing) {
      return NextResponse.json(
        { error: 'Provider already in favorites' },
        { status: 400 }
      )
    }

    const favorite = await prisma.favorite.create({
      data: {
        userId: session.user.id,
        providerId
      }
    })

    return NextResponse.json({ success: true, favorite })
  } catch (error) {
    console.error('Favorite creation error:', error)
    return NextResponse.json(
      { error: 'Failed to add favorite' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const favorites = await prisma.favorite.findMany({
      where: { userId: session.user.id },
      include: {
        user: true
      },
      orderBy: { createdAt: 'desc' }
    })

    // Get provider details for each favorite
    const providerIds = favorites.map(f => f.providerId)
    const providers = await prisma.provider.findMany({
      where: {
        id: { in: providerIds },
        status: 'ACTIVE'
      },
      include: {
        district: true,
        city: true,
        services: {
          take: 3,
          include: { category: true }
        },
        _count: {
          select: { reviews: true }
        }
      }
    })

    return NextResponse.json({ favorites, providers })
  } catch (error) {
    console.error('Favorites fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch favorites' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { providerId } = await request.json()

    await prisma.favorite.delete({
      where: {
        userId_providerId: {
          userId: session.user.id,
          providerId
        }
      }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Favorite deletion error:', error)
    return NextResponse.json(
      { error: 'Failed to remove favorite' },
      { status: 500 }
    )
  }
}
