import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import Image from 'next/image'

interface ProviderProfilePageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: ProviderProfilePageProps): Promise<Metadata> {
  const { slug } = await params
  const provider = await prisma.provider.findUnique({
    where: { slug },
    include: { district: true, city: true }
  })

  if (!provider) {
    return { title: 'Provider Not Found' }
  }

  return {
    title: `${provider.businessName} - ${provider.city?.name || provider.district?.name || 'Sri Lanka'}`,
    description: provider.description || `Contact ${provider.businessName} for professional services in ${provider.city?.name || 'Sri Lanka'}`
  }
}

export default async function ProviderProfilePage({ params }: ProviderProfilePageProps) {
  const { slug } = await params
  const provider = await prisma.provider.findUnique({
    where: { slug },
    include: {
      user: {
        select: { name: true }
      },
      province: true,
      district: true,
      city: true,
      services: {
        where: { active: true },
        include: {
          category: true
        }
      },
      gallery: {
        orderBy: { order: 'asc' }
      },
      reviews: {
        where: { approved: true },
        include: {
          customer: {
            select: { name: true }
          }
        },
        orderBy: { createdAt: 'desc' },
        take: 10
      },
      _count: {
        select: {
          reviews: true,
          services: true
        }
      }
    }
  })

  if (!provider) {
    notFound()
  }

  // Track profile view (in real implementation, this would be in a server action)
  await prisma.provider.update({
    where: { id: provider.id },
    data: { viewCount: { increment: 1 } }
  })

  const handleWhatsAppClick = async () => {
    'use server'
    await prisma.provider.update({
      where: { id: provider.id },
      data: {
        whatsappClickCount: { increment: 1 },
        clickCount: { increment: 1 }
      }
    })
  }

  const handlePhoneClick = async () => {
    'use server'
    await prisma.provider.update({
      where: { id: provider.id },
      data: {
        callClickCount: { increment: 1 },
        clickCount: { increment: 1 }
      }
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <h1 className="text-4xl font-bold">{provider.businessName}</h1>
                {provider.verified && (
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                    ✓ Verified
                  </span>
                )}
                {provider.tier !== 'FREE' && (
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    provider.tier === 'ELITE'
                      ? 'bg-purple-100 text-purple-700'
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {provider.tier}
                  </span>
                )}
              </div>

              {(provider.city || provider.district) && (
                <p className="text-lg text-muted-foreground mb-4">
                  📍 {provider.city?.name && `${provider.city.name}, `}
                  {provider.district?.name}
                </p>
              )}

              <div className="flex items-center gap-4 mb-4">
                {provider.averageRating > 0 && (
                  <div className="flex items-center">
                    <span className="text-yellow-500 text-xl mr-2">★</span>
                    <span className="text-2xl font-bold">{provider.averageRating.toFixed(1)}</span>
                    <span className="text-muted-foreground ml-2">
                      ({provider._count.reviews} reviews)
                    </span>
                  </div>
                )}
                
                <div className="text-muted-foreground">
                  👁 {provider.viewCount} views
                </div>
              </div>

              {provider.description && (
                <p className="text-gray-700 mb-6 leading-relaxed">
                  {provider.description}
                </p>
              )}
            </div>

            {/* Contact Card */}
            <Card className="md:w-80">
              <CardHeader>
                <CardTitle>Contact Provider</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {provider.whatsapp && (
                  <form action={handleWhatsAppClick}>
                    <a
                      href={`https://wa.me/${provider.whatsapp.replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                        <span className="text-xl mr-2">💬</span>
                        WhatsApp
                      </Button>
                    </a>
                  </form>
                )}
                
                <form action={handlePhoneClick}>
                  <a href={`tel:${provider.phone}`} className="block">
                    <Button type="submit" variant="outline" className="w-full">
                      <span className="text-xl mr-2">📞</span>
                      {provider.phone}
                    </Button>
                  </a>
                </form>

                {provider.email && (
                  <a href={`mailto:${provider.email}`} className="block">
                    <Button variant="outline" className="w-full">
                      <span className="text-xl mr-2">📧</span>
                      Email
                    </Button>
                  </a>
                )}

                {provider.website && (
                  <a
                    href={provider.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button variant="outline" className="w-full">
                      <span className="text-xl mr-2">🌐</span>
                      Website
                    </Button>
                  </a>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            {/* Services */}
            {provider.services.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Services Offered</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {provider.services.map((service) => (
                      <div key={service.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-lg">{service.title}</h3>
                          <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                            {service.category.name}
                          </span>
                        </div>
                        {service.description && (
                          <p className="text-muted-foreground">{service.description}</p>
                        )}
                        {service.priceFrom && (
                          <p className="text-sm font-medium mt-2">
                            From LKR {service.priceFrom.toNumber()}
                            {service.priceUnit && ` ${service.priceUnit}`}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Gallery */}
            {provider.gallery.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Gallery</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {provider.gallery.map((image) => (
                      <div key={image.id} className="aspect-square bg-gray-100 rounded-lg overflow-hidden relative">
                        <Image
                          src={image.imageUrl}
                          alt={image.caption || 'Gallery image'}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Reviews */}
            {provider.reviews.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Customer Reviews</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {provider.reviews.map((review) => (
                    <div key={review.id} className="border-b last:border-0 pb-4 last:pb-0">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{review.customer.name}</span>
                        <div className="flex items-center">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <span
                              key={i}
                              className={`text-lg ${
                                i < review.rating ? 'text-yellow-500' : 'text-gray-300'
                              }`}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                      </div>
                      {review.comment && (
                        <p className="text-muted-foreground">{review.comment}</p>
                      )}
                      <p className="text-sm text-muted-foreground mt-2">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Business Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                {provider.address && (
                  <div>
                    <p className="font-medium mb-1">Address</p>
                    <p className="text-muted-foreground">{provider.address}</p>
                  </div>
                )}
                
                {provider.establishedYear && (
                  <div>
                    <p className="font-medium mb-1">Established</p>
                    <p className="text-muted-foreground">{provider.establishedYear}</p>
                  </div>
                )}

                <div>
                  <p className="font-medium mb-1">Total Services</p>
                  <p className="text-muted-foreground">{provider._count.services}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Need a Service?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Post your service request and get quotes from multiple providers
                </p>
                <Link href="/requests/new">
                  <Button className="w-full">Post Request</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
