import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const districtId = searchParams.get('districtId')
    const provinceId = searchParams.get('provinceId')

    const where: any = {}
    if (districtId) where.districtId = districtId
    if (provinceId) where.provinceId = provinceId

    const cities = await prisma.city.findMany({
      where,
      orderBy: [
        { isMajor: 'desc' },
        { name: 'asc' }
      ],
      include: {
        district: true,
        province: true,
        _count: {
          select: {
            providers: true,
          }
        }
      }
    })

    return NextResponse.json({ cities })
  } catch (error) {
    console.error('City fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch cities' },
      { status: 500 }
    )
  }
}
