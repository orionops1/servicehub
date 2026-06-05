import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const provinceId = searchParams.get('provinceId')

    const where = provinceId ? { provinceId } : {}

    const districts = await prisma.district.findMany({
      where,
      orderBy: { name: 'asc' },
      include: {
        province: true,
        _count: {
          select: {
            cities: true,
            providers: true,
          }
        }
      }
    })

    return NextResponse.json({ districts })
  } catch (error) {
    console.error('District fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch districts' },
      { status: 500 }
    )
  }
}
