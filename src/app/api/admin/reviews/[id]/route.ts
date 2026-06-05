import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { id } = await params
    const body = await request.json()
    const { approved } = body

    const review = await prisma.review.update({
      where: { id },
      data: { approved },
      include: {
        customer: { select: { name: true } },
        provider: true,
      }
    })

    // Recalculate provider average rating
    if (approved) {
      const provider = await prisma.provider.findUnique({
        where: { id: review.providerId },
        include: {
          reviews: {
            where: { approved: true }
          }
        }
      })

      if (provider) {
        const approvedReviews = provider.reviews
        const avgRating = approvedReviews.length > 0
          ? approvedReviews.reduce((sum, r) => sum + r.rating, 0) / approvedReviews.length
          : 0

        await prisma.provider.update({
          where: { id: review.providerId },
          data: {
            averageRating: avgRating,
            totalReviews: approvedReviews.length
          }
        })
      }
    }

    return NextResponse.json({ success: true, review })
  } catch (error) {
    console.error('Review update error:', error)
    return NextResponse.json(
      { error: 'Failed to update review' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { id } = await params

    await prisma.review.delete({
      where: { id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Review deletion error:', error)
    return NextResponse.json(
      { error: 'Failed to delete review' },
      { status: 500 }
    )
  }
}
