import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      where: {
        active: true,
        parentId: null, // Get only parent categories
      },
      orderBy: [
        { featured: 'desc' },
        { order: 'asc' },
        { name: 'asc' }
      ],
      include: {
        children: {
          where: { active: true },
          orderBy: { name: 'asc' },
          include: {
            _count: {
              select: { services: true }
            }
          }
        },
        _count: {
          select: { services: true }
        }
      }
    })

    return NextResponse.json({ categories })
  } catch (error) {
    console.error('Category fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    )
  }
}
