import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Admin Dashboard',
}

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== 'ADMIN') {
    redirect('/dashboard')
  }

  // Fetch platform statistics
  const [
    totalUsers,
    totalProviders,
    activeProviders,
    pendingProviders,
    totalServices,
    totalRequests,
    openRequests,
    totalReviews,
    pendingReviews,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.provider.count(),
    prisma.provider.count({ where: { status: 'ACTIVE' } }),
    prisma.provider.count({ where: { status: 'PENDING' } }),
    prisma.service.count(),
    prisma.serviceRequest.count(),
    prisma.serviceRequest.count({ where: { status: 'OPEN' } }),
    prisma.review.count(),
    prisma.review.count({ where: { approved: false } }),
  ])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1">Platform management and analytics</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalUsers}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Providers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalProviders}</div>
              <div className="text-sm text-muted-foreground mt-1">
                {activeProviders} active • {pendingProviders} pending
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Services
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalServices}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Service Requests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalRequests}</div>
              <div className="text-sm text-muted-foreground mt-1">
                {openRequests} open
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {pendingProviders > 0 && (
            <Card className="bg-yellow-50 border-yellow-200">
              <CardHeader>
                <CardTitle>Pending Providers</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {pendingProviders} provider{pendingProviders !== 1 ? 's' : ''} awaiting approval
                </p>
                <Link href="/admin/providers?status=pending">
                  <Button>Review Providers</Button>
                </Link>
              </CardContent>
            </Card>
          )}

          {pendingReviews > 0 && (
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle>Pending Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {pendingReviews} review{pendingReviews !== 1 ? 's' : ''} awaiting moderation
                </p>
                <Link href="/admin/reviews">
                  <Button>Moderate Reviews</Button>
                </Link>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link href="/admin/users" className="block">
                <Button variant="outline" className="w-full justify-start">
                  👥 Manage Users
                </Button>
              </Link>
              <Link href="/admin/categories" className="block">
                <Button variant="outline" className="w-full justify-start">
                  📁 Manage Categories
                </Button>
              </Link>
              <Link href="/admin/analytics" className="block">
                <Button variant="outline" className="w-full justify-start">
                  📊 View Analytics
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Providers</CardTitle>
            </CardHeader>
            <CardContent>
              <RecentProviders />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <RecentReviews />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

async function RecentProviders() {
  const providers = await prisma.provider.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    include: {
      user: { select: { name: true, email: true } },
      district: true,
    }
  })

  return (
    <div className="space-y-3">
      {providers.map((provider) => (
        <div key={provider.id} className="flex justify-between items-start p-3 border rounded-lg">
          <div>
            <h4 className="font-medium">{provider.businessName}</h4>
            <p className="text-sm text-muted-foreground">{provider.district?.name}</p>
            <span className={`text-xs px-2 py-1 rounded-full mt-1 inline-block ${
              provider.status === 'ACTIVE'
                ? 'bg-green-100 text-green-700'
                : provider.status === 'PENDING'
                ? 'bg-yellow-100 text-yellow-700'
                : 'bg-gray-100 text-gray-700'
            }`}>
              {provider.status}
            </span>
          </div>
          <Link href={`/admin/providers/${provider.id}`}>
            <Button variant="ghost" size="sm">View</Button>
          </Link>
        </div>
      ))}
    </div>
  )
}

async function RecentReviews() {
  const reviews = await prisma.review.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    include: {
      customer: { select: { name: true } },
      provider: { select: { businessName: true } },
    }
  })

  return (
    <div className="space-y-3">
      {reviews.map((review) => (
        <div key={review.id} className="p-3 border rounded-lg">
          <div className="flex justify-between items-start mb-2">
            <span className="font-medium">{review.customer.name}</span>
            <span className={`text-xs px-2 py-1 rounded-full ${
              review.approved
                ? 'bg-green-100 text-green-700'
                : 'bg-yellow-100 text-yellow-700'
            }`}>
              {review.approved ? 'Approved' : 'Pending'}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mb-1">
            {review.provider.businessName}
          </p>
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className={i < review.rating ? 'text-yellow-500' : 'text-gray-300'}
              >
                ★
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
