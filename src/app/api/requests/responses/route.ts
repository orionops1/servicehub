import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const responseSchema = z.object({
  requestId: z.string(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  quotedPrice: z.number().positive().optional().nullable(),
})

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get provider
    const provider = await prisma.provider.findUnique({
      where: { userId: session.user.id },
    })

    if (!provider) {
      return NextResponse.json(
        { error: 'Only providers can respond to requests' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const validatedData = responseSchema.parse(body)

    // Check if request exists and is open
    const serviceRequest = await prisma.serviceRequest.findUnique({
      where: { id: validatedData.requestId },
    })

    if (!serviceRequest) {
      return NextResponse.json(
        { error: 'Service request not found' },
        { status: 404 }
      )
    }

    if (serviceRequest.status !== 'OPEN') {
      return NextResponse.json(
        { error: 'This request is no longer accepting responses' },
        { status: 400 }
      )
    }

    // Check if provider already responded
    const existingResponse = await prisma.serviceResponse.findFirst({
      where: {
        requestId: validatedData.requestId,
        providerId: provider.id,
      },
    })

    if (existingResponse) {
      return NextResponse.json(
        { error: 'You have already responded to this request' },
        { status: 400 }
      )
    }

    // Create response
    const response = await prisma.serviceResponse.create({
      data: {
        requestId: validatedData.requestId,
        providerId: provider.id,
        message: validatedData.message,
        quotedPrice: validatedData.quotedPrice,
      },
    })

    // Update request response count
    await prisma.serviceRequest.update({
      where: { id: validatedData.requestId },
      data: {
        responseCount: {
          increment: 1,
        },
      },
    })

    return NextResponse.json({ response })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }

    console.error('Response creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create response' },
      { status: 500 }
    )
  }
}
