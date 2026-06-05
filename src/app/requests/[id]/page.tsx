import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { MapPin, Clock, DollarSign, Calendar, Phone, Mail, MessageSquare } from 'lucide-react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import ResponseForm from '@/components/forms/ResponseForm'

interface PageProps {
  params: {
    id: string
  }
}

async function getServiceRequest(id: string) {
  const request = await prisma.serviceRequest.findUnique({
    where: { id },
    include: {
      customer: {
        select: {
          name: true,
          email: true,
        },
      },
      category: {
        select: {
          name: true,
        },
      },
      district: {
        select: {
          name: true,
        },
      },
      city: {
        select: {
          name: true,
        },
      },
      responses: {
        include: {
          provider: {
            select: {
              businessName: true,
              slug: true,
              phone: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
  })

  return request
}

export default async function ServiceRequestDetailPage({ params }: PageProps) {
  const session = await getServerSession(authOptions)
  const request = await getServiceRequest(params.id)

  if (!request) {
    notFound()
  }

  const urgencyColors = {
    LOW: 'bg-gray-100 text-gray-800',
    MEDIUM: 'bg-blue-100 text-blue-800',
    HIGH: 'bg-orange-100 text-orange-800',
    URGENT: 'bg-red-100 text-red-800',
  }

  const statusColors = {
    OPEN: 'bg-green-100 text-green-800',
    IN_PROGRESS: 'bg-blue-100 text-blue-800',
    COMPLETED: 'bg-gray-100 text-gray-800',
    CANCELLED: 'bg-red-100 text-red-800',
  }

  const isProvider = session?.user?.role === 'PROVIDER'
  const isCustomer = session?.user?.id === request.customerId

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">{request.title}</h1>
            <p className="text-gray-600">{request.category.name}</p>
          </div>
          <div className="flex gap-2">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                statusColors[request.status]
              }`}
            >
              {request.status}
            </span>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                urgencyColors[request.urgency]
              }`}
            >
              {request.urgency}
            </span>
          </div>
        </div>

        {/* Description */}
        <div className="prose max-w-none mb-6">
          <p className="text-gray-700 whitespace-pre-wrap">{request.description}</p>
        </div>

        {/* Details Grid */}
        <div className="grid md:grid-cols-2 gap-4 border-t pt-4">
          <div className="flex items-center gap-2 text-gray-700">
            <MapPin className="w-5 h-5 text-gray-400" />
            <span>
              {request.city?.name}, {request.district?.name}
            </span>
          </div>

          <div className="flex items-center gap-2 text-gray-700">
            <Calendar className="w-5 h-5 text-gray-400" />
            <span>Posted {new Date(request.createdAt).toLocaleDateString()}</span>
          </div>

          {(request.budgetMin || request.budgetMax) && (
            <div className="flex items-center gap-2 text-gray-700">
              <DollarSign className="w-5 h-5 text-gray-400" />
              <span>
                Budget:{' '}
                {request.budgetMin && request.budgetMax
                  ? `LKR ${request.budgetMin.toLocaleString()} - ${request.budgetMax.toLocaleString()}`
                  : request.budgetMin
                  ? `From LKR ${request.budgetMin.toLocaleString()}`
                  : `Up to LKR ${request.budgetMax?.toLocaleString()}`}
              </span>
            </div>
          )}

          <div className="flex items-center gap-2 text-gray-700">
            <Clock className="w-5 h-5 text-gray-400" />
            <span>{request.urgency} Priority</span>
          </div>
        </div>

        {/* Contact Information (visible to providers) */}
        {isProvider && (
          <div className="border-t mt-4 pt-4">
            <h3 className="font-semibold mb-3">Contact Information</h3>
            <div className="space-y-2">
              {request.contactPhone && (
                <div className="flex items-center gap-2 text-gray-700">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <a
                    href={`tel:${request.contactPhone}`}
                    className="text-blue-600 hover:underline"
                  >
                    {request.contactPhone}
                  </a>
                </div>
              )}
              {request.contactEmail && (
                <div className="flex items-center gap-2 text-gray-700">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <a
                    href={`mailto:${request.contactEmail}`}
                    className="text-blue-600 hover:underline"
                  >
                    {request.contactEmail}
                  </a>
                </div>
              )}
              {request.contactWhatsapp && (
                <div className="flex items-center gap-2 text-gray-700">
                  <MessageSquare className="w-5 h-5 text-gray-400" />
                  <a
                    href={`https://wa.me/${request.contactWhatsapp.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 hover:underline"
                  >
                    {request.contactWhatsapp} (WhatsApp)
                  </a>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Response Form (for providers) */}
      {isProvider && request.status === 'OPEN' && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">Send Your Response</h2>
          <ResponseForm requestId={request.id} />
        </div>
      )}

      {/* Responses */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">
          Responses ({request.responses.length})
        </h2>

        {request.responses.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            No responses yet. {isProvider && 'Be the first to respond!'}
          </p>
        ) : (
          <div className="space-y-4">
            {request.responses.map((response) => (
              <div key={response.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-lg">
                      {response.provider.businessName}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {new Date(response.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  {response.quotedPrice && (
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Quoted Price</p>
                      <p className="text-lg font-semibold text-blue-600">
                        LKR {response.quotedPrice.toLocaleString()}
                      </p>
                    </div>
                  )}
                </div>

                <p className="text-gray-700 whitespace-pre-wrap mb-3">
                  {response.message}
                </p>

                {(isCustomer || isProvider) && (
                  <div className="flex gap-2 border-t pt-3">
                    {response.provider.phone && (
                      <a
                        href={`tel:${response.provider.phone}`}
                        className="text-blue-600 hover:underline text-sm"
                      >
                        Call Provider
                      </a>
                    )}
                    <a
                      href={`/providers/${response.provider.slug}`}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      View Profile
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="bg-gray-50 rounded-lg p-4 mt-6">
        <div className="flex justify-between text-sm text-gray-600">
          <span>{request.viewCount} views</span>
          <span>{request.responseCount} responses</span>
        </div>
      </div>
    </div>
  )
}
