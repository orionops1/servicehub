import { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import { SearchFilters } from '@/components/search/SearchFilters'
import { ProviderCard } from '@/components/cards/ProviderCard'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Find Service Providers',
  description: 'Search and discover trusted service providers across Sri Lanka'
}

interface SearchPageProps {
  searchParams: Promise<{
    q?: string
    category?: string
    district?: string
    city?: string
    tier?: string
    verified?: string
    page?: string
  }>
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const resolvedSearchParams = await searchParams
  const page = parseInt(resolvedSearchParams.page || '1')
  const limit = 20
  const skip = (page - 1) * limit

  const where: Record<string, unknown> = {
    status: 'ACTIVE',
  }

  if (resolvedSearchParams.category) {
    where.services = {
      some: {
        category: {
          slug: resolvedSearchParams.category
        }
      }
    }
  }

  if (resolvedSearchParams.district) {
    where.districtId = resolvedSearchParams.district
  }

  if (resolvedSearchParams.city) {
    where.cityId = resolvedSearchParams.city
  }

  if (resolvedSearchParams.tier) {
    where.tier = resolvedSearchParams.tier
  }

  if (resolvedSearchParams.verified === 'true') {
    where.verified = true
  }

  if (resolvedSearchParams.q) {
    where.OR = [
      { businessName: { contains: resolvedSearchParams.q, mode: 'insensitive' } },
      { description: { contains: resolvedSearchParams.q, mode: 'insensitive' } },
    ]
  }

  const [providers, total] = await Promise.all([
    prisma.provider.findMany({
      where,
      include: {
        user: {
          select: {
            name: true,
          }
        },
        district: true,
        city: true,
        services: {
          take: 3,
          include: {
            category: true
          }
        },
        _count: {
          select: {
            reviews: true,
          }
        }
      },
      orderBy: [
        { featured: 'desc' },
        { tier: 'desc' },
        { averageRating: 'desc' },
        { createdAt: 'desc' }
      ],
      skip,
      take: limit
    }),
    prisma.provider.count({ where })
  ])

  const totalPages = Math.ceil(total / limit)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold mb-2">Find Service Providers</h1>
          <p className="text-muted-foreground">
            {total} provider{total !== 1 ? 's' : ''} found
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <aside className="md:col-span-1">
            <SearchFilters />
          </aside>

          {/* Results */}
          <main className="md:col-span-3">
            {providers.length === 0 ? (
              <div className="bg-white rounded-lg p-12 text-center">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold mb-2">No providers found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your filters or search query
                </p>
                <Link href="/search" className="text-primary hover:underline">
                  Clear all filters
                </Link>
              </div>
            ) : (
              <>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {providers.map((provider) => (
                    <ProviderCard key={provider.id} provider={provider} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center gap-2">
                    {page > 1 && (
                      <Link
                        href={{
                          pathname: '/search',
                          query: { ...resolvedSearchParams, page: page - 1 }
                        }}
                        className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                      >
                        Previous
                      </Link>
                    )}
                    
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      const pageNum = i + 1
                      return (
                        <Link
                          key={pageNum}
                          href={{
                            pathname: '/search',
                            query: { ...resolvedSearchParams, page: pageNum }
                          }}
                          className={`px-4 py-2 border rounded-lg ${
                            pageNum === page
                              ? 'bg-primary text-white'
                              : 'hover:bg-gray-50'
                          }`}
                        >
                          {pageNum}
                        </Link>
                      )
                    })}
                    
                    {page < totalPages && (
                      <Link
                        href={{
                          pathname: '/search',
                          query: { ...resolvedSearchParams, page: page + 1 }
                        }}
                        className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                      >
                        Next
                      </Link>
                    )}
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
