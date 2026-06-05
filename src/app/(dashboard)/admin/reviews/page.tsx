'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { Star } from 'lucide-react'

interface Review {
  id: string
  rating: number
  comment: string | null
  approved: boolean
  createdAt: string
  customer: {
    name: string | null
    email: string
  }
  provider: {
    businessName: string
    slug: string
  }
}

export default function AdminReviewsPage() {
  const { data: session, status } = useSession()
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'ALL' | 'PENDING' | 'APPROVED'>('PENDING')

  useEffect(() => {
    if (status === 'unauthenticated') {
      redirect('/login')
    }
    if (session?.user?.role !== 'ADMIN') {
      redirect('/dashboard')
    }
  }, [session, status])

  useEffect(() => {
    fetchReviews()
  }, [])

  const fetchReviews = async () => {
    try {
      const response = await fetch('/api/admin/reviews')
      if (response.ok) {
        const data = await response.json()
        setReviews(data.reviews || [])
      }
    } catch (error) {
      console.error('Failed to fetch reviews:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async (reviewId: string) => {
    try {
      const response = await fetch(`/api/admin/reviews/${reviewId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ approved: true }),
      })

      if (response.ok) {
        fetchReviews()
      }
    } catch (error) {
      console.error('Failed to approve review:', error)
    }
  }

  const handleReject = async (reviewId: string) => {
    if (!confirm('Reject and delete this review?')) return

    try {
      const response = await fetch(`/api/admin/reviews/${reviewId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        fetchReviews()
      }
    } catch (error) {
      console.error('Failed to reject review:', error)
    }
  }

  const filteredReviews = reviews.filter(review => {
    if (filter === 'ALL') return true
    if (filter === 'PENDING') return !review.approved
    if (filter === 'APPROVED') return review.approved
    return true
  })

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Review Moderation</h1>
        <p className="text-gray-600">Review and approve customer reviews</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-600 text-sm">Total Reviews</p>
          <p className="text-3xl font-bold">{reviews.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-600 text-sm">Pending</p>
          <p className="text-3xl font-bold text-yellow-600">
            {reviews.filter(r => !r.approved).length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-600 text-sm">Approved</p>
          <p className="text-3xl font-bold text-green-600">
            {reviews.filter(r => r.approved).length}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex gap-2">
          {(['ALL', 'PENDING', 'APPROVED'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === status
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center text-gray-500">
            No reviews to show
          </div>
        ) : (
          filteredReviews.map((review) => (
            <div key={review.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold">
                      {review.customer.name || 'Anonymous'}
                    </span>
                    <span className="text-gray-500 text-sm">
                      reviewed
                    </span>
                    <span className="font-semibold text-blue-600">
                      {review.provider.businessName}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-5 h-5 ${
                            star <= review.rating
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                    {review.approved && (
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        Approved
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {review.comment && (
                <p className="text-gray-700 mb-4">{review.comment}</p>
              )}

              {!review.approved && (
                <div className="flex gap-3 border-t pt-4">
                  <button
                    onClick={() => handleApprove(review.id)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(review.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}
