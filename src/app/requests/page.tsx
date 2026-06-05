import { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Service Requests',
  description: 'Browse and respond to service requests'
}

export default async function ServiceRequestsPage() {
  const requests = await prisma.serviceRequest.findMany({
    where: { status: 'OPEN' },
    include: {
      customer: { select: { name: true } },
      category: true,
      district: true,
      city: true,
      _count: { select: { responses: true } }
    },
    orderBy: [
      { urgency: 'desc' },
      { createdAt: 'desc' }
    ],
    take: 50
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Service Requests</h1>
              <p className="text-muted-foreground mt-1">
                {requests.length} active requests
              </p>
            </div>
            <Link href="/requests/new">
              <Button>Post New Request</Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {requests.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <div className="text-6xl mb-4">📋</div>
              <h3 className="text-xl font-semibold mb-2">No requests yet</h3>
              <p className="text-muted-foreground mb-4">
                Be the first to post a service request
              </p>
              <Link href="/requests/new">
                <Button>Post Request</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {requests.map((request) => (
              <Card key={request.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-semibold">{request.title}</h3>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          request.urgency === 'URGENT'
                            ? 'bg-red-100 text-red-700'
                            : request.urgency === 'HIGH'
                            ? 'bg-orange-100 text-orange-700'
                            : request.urgency === 'MEDIUM'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          {request.urgency}
                        </span>
                      </div>

                      <p className="text-muted-foreground mb-3">{request.description}</p>

                      <div className="flex flex-wrap gap-4 text-sm">
                        <span className="text-primary font-medium">
                          {request.category.name}
                        </span>
                        {request.city && request.district && (
                          <span>📍 {request.city.name}, {request.district.name}</span>
                        )}
                        {request.budgetMin && request.budgetMax && (
                          <span>💰 LKR {request.budgetMin} - {request.budgetMax}</span>
                        )}
                        <span className="text-muted-foreground">
                          {new Date(request.createdAt).toLocaleDateString()}
                        </span>
                      </div>

                      <div className="mt-3 text-sm text-muted-foreground">
                        {request._count.responses} response{request._count.responses !== 1 ? 's' : ''}
                      </div>
                    </div>

                    <Link href={`/requests/${request.id}`}>
                      <Button variant="outline">View Details</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
