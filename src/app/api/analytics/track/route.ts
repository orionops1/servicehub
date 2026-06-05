import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const { providerId, action, source } = await request.json()

    if (!providerId || !action) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    // Update or create analytics record
    const analytics = await prisma.providerAnalytics.upsert({
      where: {
        providerId_date: {
          providerId,
          date: today
        }
      },
      update: {
        ...(action === 'PROFILE_VIEW' && { profileViews: { increment: 1 } }),
        ...(action === 'PHONE_CLICK' && { phoneClicks: { increment: 1 } }),
        ...(action === 'WHATSAPP_CLICK' && { whatsappClicks: { increment: 1 } }),
        ...(action === 'WEBSITE_CLICK' && { websiteClicks: { increment: 1 } }),
        ...(action === 'EMAIL_CLICK' && { emailClicks: { increment: 1 } }),
        ...(action === 'GALLERY_VIEW' && { galleryViews: { increment: 1 } }),
        ...(source === 'SEARCH' && { sourceSearch: { increment: 1 } }),
        ...(source === 'DIRECT' && { sourceDirect: { increment: 1 } }),
        ...(source === 'REQUEST' && { sourceRequest: { increment: 1 } }),
      },
      create: {
        providerId,
        date: today,
        profileViews: action === 'PROFILE_VIEW' ? 1 : 0,
        phoneClicks: action === 'PHONE_CLICK' ? 1 : 0,
        whatsappClicks: action === 'WHATSAPP_CLICK' ? 1 : 0,
        websiteClicks: action === 'WEBSITE_CLICK' ? 1 : 0,
        emailClicks: action === 'EMAIL_CLICK' ? 1 : 0,
        galleryViews: action === 'GALLERY_VIEW' ? 1 : 0,
        sourceSearch: source === 'SEARCH' ? 1 : 0,
        sourceDirect: source === 'DIRECT' ? 1 : 0,
        sourceRequest: source === 'REQUEST' ? 1 : 0,
      }
    })

    return NextResponse.json({ success: true, analytics })
  } catch (error) {
    console.error('Analytics tracking error:', error)
    return NextResponse.json(
      { error: 'Failed to track analytics' },
      { status: 500 }
    )
  }
}
