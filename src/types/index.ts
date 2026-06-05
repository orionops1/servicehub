import { Prisma } from '@prisma/client'

// Provider with relations
export type ProviderWithRelations = Prisma.ProviderGetPayload<{
  include: {
    user: true
    province: true
    district: true
    city: true
    services: {
      include: {
        category: true
      }
    }
    gallery: true
    reviews: {
      include: {
        customer: true
      }
    }
  }
}>

// Service with relations
export type ServiceWithRelations = Prisma.ServiceGetPayload<{
  include: {
    provider: {
      include: {
        user: true
        district: true
        city: true
      }
    }
    category: true
  }
}>

// Service Request with relations
export type ServiceRequestWithRelations = Prisma.ServiceRequestGetPayload<{
  include: {
    customer: true
    category: true
    province: true
    district: true
    city: true
    responses: {
      include: {
        provider: {
          include: {
            user: true
          }
        }
      }
    }
  }
}>

// Review with relations
export type ReviewWithRelations = Prisma.ReviewGetPayload<{
  include: {
    customer: true
    provider: true
  }
}>

// Search filters
export interface SearchFilters {
  query?: string
  categoryId?: string
  provinceId?: string
  districtId?: string
  cityId?: string
  tier?: string[]
  minRating?: number
  verified?: boolean
  featured?: boolean
  sortBy?: 'relevance' | 'rating' | 'recent' | 'popular'
  page?: number
  limit?: number
}

// Analytics data
export interface AnalyticsData {
  profileViews: number
  phoneClicks: number
  whatsappClicks: number
  websiteClicks: number
  totalLeads: number
  conversionRate: number
  chartData: {
    date: string
    views: number
    clicks: number
  }[]
}
