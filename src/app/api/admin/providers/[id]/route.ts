import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const body = await request.json()
    const { status, verified, featured, tier } = body

    const updates: any = {}
    if (status) updates.status = status
    if (typeof verified === 'boolean') updates.verified = verified
    if (typeof featured === 'boolean') updates.featured = featured
    if (tier) updates.tier = tier

    const provider = await prisma.provider.update({
      where: { id: params.id },
      data: updates,
      include: {
        user: {
          select: { name: true, email: true }
        },
        district: true,
        city: true,
      }
    })

    return NextResponse.json({ success: true, provider })
  } catch (error) {
    console.error('Provider update error:', error)
    return NextResponse.json(
      { error: 'Failed to update provider' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    await prisma.provider.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Provider deletion error:', error)
    return NextResponse.json(
      { error: 'Failed to delete provider' },
      { status: 500 }
    )
  }
}
