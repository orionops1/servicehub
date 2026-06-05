'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function AdminAnalyticsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProviders: 0,
    totalRequests: 0,
    totalReviews: 0,
    activeProviders: 0,
    pendingProviders: 0,
    thisMonthRequests: 0,
    thisMonthReviews: 0,
  })

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
      return
    }

    if (session?.user?.role !== 'ADMIN') {
      router.push('/dashboard')
      return
    }

    fetchAnalytics()
  }, [session, status])

  const fetchAnalytics = async () => {
    try {
      // In a real app, this would fetch from a dedicated analytics API
      const [usersRes, providersRes, requestsRes, reviewsRes] = await Promise.all([
        fetch('/api/admin/users'),
        fetch('/api/admin/providers'),
        fetch('/api/requests'),
        fetch('/api/admin/reviews'),
      ])

      const users = usersRes.ok ? await usersRes.json() : { users: [] }
      const providers = providersRes.ok ? await providersRes.json() : { providers: [] }
      const requests = requestsRes.ok ? await requestsRes.json() : { requests: [] }
      const reviews = reviewsRes.ok ? await reviewsRes.json() : { reviews: [] }

      setStats({
        totalUsers: users.users?.length || 0,
        totalProviders: providers.providers?.length || 0,
        totalRequests: requests.requests?.length || 0,
        totalReviews: reviews.reviews?.length || 0,
        activeProviders: providers.providers?.filter((p: any) => p.status === 'ACTIVE').length || 0,
        pendingProviders: providers.providers?.filter((p: any) => p.status === 'PENDING').length || 0,
        thisMonthRequests: requests.requests?.filter((r: any) => {
          const created = new Date(r.createdAt)
          const now = new Date()
          return created.getMonth() === now.getMonth() && created.getFullYear() === now.getFullYear()
        }).length || 0,
        thisMonthReviews: reviews.reviews?.filter((r: any) => {
          const created = new Date(r.createdAt)
          const now = new Date()
          return created.getMonth() === now.getMonth() && created.getFullYear() === now.getFullYear()
        }).length || 0,
      })
    } catch (error) {
      console.error('Error fetching analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-3xl font-bold mb-8">Platform Analytics</h1>

      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.totalUsers}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Providers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.totalProviders}</div>
            <div className="text-sm text-muted-foreground mt-1">
              {stats.activeProviders} active, {stats.pendingProviders} pending
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Service Requests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.totalRequests}</div>
            <div className="text-sm text-muted-foreground mt-1">
              {stats.thisMonthRequests} this month
            </div>
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
              {stats.thisMonthReviews} this month
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Platform Growth</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-muted-foreground">
            <p>Detailed analytics charts coming soon</p>
            <p className="text-sm mt-2">
              Track user growth, revenue, and engagement over time
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
