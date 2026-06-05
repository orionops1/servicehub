'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function ProviderRequestsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [requests, setRequests] = useState<any[]>([])

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
      return
    }

    if (session?.user) {
      fetchRequests()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, status])

  const fetchRequests = async () => {
    try {
      // Fetch all open service requests that match provider's categories
      const response = await fetch('/api/requests?status=OPEN')
      if (response.ok) {
        const data = await response.json()
        setRequests(data.requests || [])
      }
    } catch (error) {
      console.error('Error fetching requests:', error)
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
      <Card>
        <CardHeader>
          <CardTitle>Service Requests</CardTitle>
          <p className="text-sm text-muted-foreground">
            Browse and respond to customer service requests
          </p>
        </CardHeader>
        <CardContent>
          {requests.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📋</div>
              <h3 className="text-lg font-semibold mb-2">No Requests Available</h3>
              <p className="text-muted-foreground">
                Check back later for new service requests from customers
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {requests.map((request: any) => (
                <div key={request.id} className="border rounded-lg p-4 hover:border-primary transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-lg">{request.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {request.city?.name}, {request.district?.name}
                      </p>
                    </div>
                    <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                      {request.urgency}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {request.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      {request.budgetMin && request.budgetMax && (
                        <span>Budget: LKR {request.budgetMin} - {request.budgetMax}</span>
                      )}
                    </div>
                    <Link href={`/requests/${request.id}`}>
                      <Button size="sm">View Details</Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
