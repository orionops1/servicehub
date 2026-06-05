import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'Provider Dashboard',
}

export default async function ProviderDashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login')
  }

  const provider = await prisma.provider.findUnique({
    where: { userId: session.user.id },
    include: {
      services: true,
      district: true,
      city: true,
      _count: {
        select: {
          reviews: true,
          services: true,
        }
      }
    }
  })

  if (!provider) {
    redirect('/provider/register')
  }

  const stats = {
    profileViews: provider.viewCount,
    totalClicks: provider.clickCount,
    whatsappClicks: provider.whatsappClickCount,
    callClicks: provider.callClickCount,
    totalServices: provider._count.services,
    totalReviews: provider._count.reviews,
    averageRating: provider.averageRating,
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold">{provider.businessName}</h1>
              <p className="text-muted-foreground mt-1">
                {provider.city?.name}, {provider.district?.name}
              </p>
              <div className="flex gap-2 mt-2">
                <span className="text-sm px-3 py-1 bg-primary/10 text-primary rounded-full">
                  {provider.tier} Plan
                </span>
                {provider.verified && (
                  <span className="text-sm px-3 py-1 bg-green-100 text-green-700 rounded-full">
                    ✓ Verified
                  </span>
                )}
                {provider.featured && (
                  <span className="text-sm px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full">
                    ⭐ Featured
                  </span>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <Link href={`/providers/${provider.slug}`}>
                <Button variant="outline">View Public Profile</Button>
              </Link>
              <Link href="/provider/edit">
                <Button>Edit Profile</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Profile Views
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.profileViews}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Clicks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.totalClicks}</div>
              <div className="text-sm text-muted-foreground mt-1">
                {stats.whatsappClicks} WhatsApp • {stats.callClicks} Calls
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Services
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.totalServices}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Reviews
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.totalReviews}</div>
              <div className="text-sm text-muted-foreground mt-1">
                ⭐ {stats.averageRating.toFixed(1)} average
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Recent Services</CardTitle>
            </CardHeader>
            <CardContent>
              {provider.services.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">No services added yet</p>
                  <Link href="/provider/services/new">
                    <Button>Add Your First Service</Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {provider.services.slice(0, 5).map((service) => (
                    <div key={service.id} className="flex justify-between items-center p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{service.title}</h4>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {service.description}
                        </p>
                      </div>
                      <Link href={`/provider/services/${service.id}/edit`}>
                        <Button variant="ghost" size="sm">Edit</Button>
                      </Link>
                    </div>
                  ))}
                  {provider.services.length > 5 && (
                    <Link href="/provider/services">
                      <Button variant="outline" className="w-full">
                        View All Services ({provider.services.length})
                      </Button>
                    </Link>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link href="/provider/services/new" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    + Add Service
                  </Button>
                </Link>
                <Link href="/provider/gallery" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    📸 Manage Gallery
                  </Button>
                </Link>
                <Link href="/provider/requests" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    📋 View Requests
                  </Button>
                </Link>
                <Link href="/provider/reviews" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    ⭐ View Reviews
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {provider.tier === 'FREE' && (
              <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
                <CardHeader>
                  <CardTitle>Upgrade to Pro</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Get featured placement, analytics, and more visibility
                  </p>
                  <Link href="/pricing">
                    <Button className="w-full">View Plans</Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
