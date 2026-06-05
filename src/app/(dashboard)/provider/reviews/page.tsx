'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function ProviderReviewsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [reviews, setReviews] = useState<any[]>([])
  const [stats, setStats] = useState({ average: 0, total: 0 })

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
      return
    }

    if (session?.user) {
      fetchReviews()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, status])

  const fetchReviews = async () => {
    try {
      const response = await fetch('/api/providers/me/reviews')
      if (response.ok) {
        const data = await response.json()
        setReviews(data.reviews || [])
        setStats({
          average: data.averageRating || 0,
          total: data.totalReviews || 0,
        })
      }
    } catch (error) {
      console.error('Error fetching reviews:', error)
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
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Your Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">
                {stats.average.toFixed(1)}
              </div>
              <div className="text-yellow-500 text-2xl">★★★★★</div>
              <div className="text-sm text-muted-foreground mt-1">
                Average Rating
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold">{stats.total}</div>
              <div className="text-sm text-muted-foreground mt-1">
                Total Reviews
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Customer Feedback</CardTitle>
        </CardHeader>
        <CardContent>
          {reviews.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">⭐</div>
              <h3 className="text-lg font-semibold mb-2">No Reviews Yet</h3>
              <p className="text-muted-foreground">
                Provide excellent service to receive your first review
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {reviews.map((review: any) => (
                <div key={review.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="font-semibold">{review.customer.name}</div>
                      <div className="text-yellow-500">
                        {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  {review.comment && (
                    <p className="text-sm text-gray-600">{review.comment}</p>
                  )}
                  {!review.approved && (
                    <div className="mt-2 text-xs text-amber-600">
                      ⏳ Pending admin approval
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
