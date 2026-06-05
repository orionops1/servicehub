import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'

interface ProviderCardProps {
  provider: {
    id: string
    slug: string
    businessName: string
    description: string | null
    logo: string | null
    tier: string
    verified: boolean
    featured: boolean
    averageRating: number
    district: {
      name: string
    } | null
    city: {
      name: string
    } | null
    services: Array<{
      id: string
      title: string
      category: {
        name: string
      }
    }>
    _count: {
      reviews: number
    }
  }
}

export function ProviderCard({ provider }: ProviderCardProps) {
  return (
    <Link href={`/providers/${provider.slug}`}>
      <Card className="hover:shadow-lg transition-shadow h-full">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-semibold text-lg line-clamp-1">
                  {provider.businessName}
                </h3>
                {provider.verified && (
                  <span className="text-green-600" title="Verified">
                    ✓
                  </span>
                )}
              </div>
              
              {provider.city && provider.district && (
                <p className="text-sm text-muted-foreground mb-2">
                  {provider.city.name}, {provider.district.name}
                </p>
              )}

              <div className="flex items-center gap-2 mb-3">
                {provider.averageRating > 0 && (
                  <div className="flex items-center text-sm">
                    <span className="text-yellow-500 mr-1">★</span>
                    <span className="font-medium">{provider.averageRating.toFixed(1)}</span>
                    <span className="text-muted-foreground ml-1">
                      ({provider._count.reviews})
                    </span>
                  </div>
                )}
                
                {provider.tier !== 'FREE' && (
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    provider.tier === 'ELITE'
                      ? 'bg-purple-100 text-purple-700'
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {provider.tier}
                  </span>
                )}

                {provider.featured && (
                  <span className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-700">
                    ⭐ Featured
                  </span>
                )}
              </div>

              {provider.description && (
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                  {provider.description}
                </p>
              )}

              {provider.services.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {provider.services.slice(0, 3).map((service) => (
                    <span
                      key={service.id}
                      className="text-xs px-2 py-1 bg-gray-100 rounded-full"
                    >
                      {service.category.name}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
