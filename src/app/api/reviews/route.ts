import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const reviewSchema = z.object({
  providerId: z.string(),
  rating: z.number().min(1).max(5),
  comment: z.string().min(10).optional(),
})

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = reviewSchema.parse(body)

    // Check if user already reviewed this provider
    const existingReview = await prisma.review.findUnique({
      where: {
        providerId_customerId: {
          providerId: validatedData.providerId,
          customerId: session.user.id
        }
      }
    })

    if (existingReview) {
      return NextResponse.json(
        { error: 'You have already reviewed this provider' },
        { status: 400 }
      )
    }

    const review = await prisma.review.create({
      data: {
        providerId: validatedData.providerId,
        customerId: session.user.id,
        rating: validatedData.rating,
        comment: validatedData.comment,
        approved: false, // Requires admin approval
      },
      include: {
        customer: {
          select: { name: true }
        }
      }
    })

    // Update provider average rating
    const provider = await prisma.provider.findUnique({
      where: { id: validatedData.providerId },
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
        where: { id: validatedData.providerId },
        data: {
          averageRating: avgRating,
          totalReviews: approvedReviews.length
        }
      })
    }

    return NextResponse.json({
      success: true,
      review,
      message: 'Review submitted successfully. It will be visible after approval.'
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      )
    }
    
    console.error('Review creation error:', error)
    return NextResponse.json(
      { error: 'Failed to submit review' },
      { status: 500 }
    )
  }
}
