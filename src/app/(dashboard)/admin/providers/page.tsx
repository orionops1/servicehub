'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import Link from 'next/link'

interface Provider {
  id: string
  businessName: string
  slug: string
  phone: string
  email: string | null
  tier: string
  status: string
  verified: boolean
  createdAt: string
  user: {
    name: string | null
    email: string
  }
}

export default function AdminProvidersPage() {
  const { data: session, status } = useSession()
  const [providers, setProviders] = useState<Provider[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>('ALL')

  useEffect(() => {
    if (status === 'unauthenticated') {
      redirect('/login')
    }
    if (session?.user?.role !== 'ADMIN') {
      redirect('/dashboard')
    }
  }, [session, status])

  useEffect(() => {
    fetchProviders()
  }, [])

  const fetchProviders = async () => {
    try {
      const response = await fetch('/api/admin/providers')
      if (response.ok) {
        const data = await response.json()
        setProviders(data.providers || [])
      }
    } catch (error) {
      console.error('Failed to fetch providers:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async (providerId: string) => {
    if (!confirm('Approve this provider?')) return

    try {
      const response = await fetch(`/api/admin/providers/${providerId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'ACTIVE' }),
      })

      if (response.ok) {
        fetchProviders()
      }
    } catch (error) {
      console.error('Failed to approve provider:', error)
    }
  }

  const handleSuspend = async (providerId: string) => {
    if (!confirm('Suspend this provider?')) return

    try {
      const response = await fetch(`/api/admin/providers/${providerId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'SUSPENDED' }),
      })

      if (response.ok) {
        fetchProviders()
      }
    } catch (error) {
      console.error('Failed to suspend provider:', error)
    }
  }

  const filteredProviders = filter === 'ALL' 
    ? providers 
    : providers.filter(p => p.status === filter)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-green-100 text-green-800'
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800'
      case 'SUSPENDED':
        return 'bg-red-100 text-red-800'
      case 'INACTIVE':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'ELITE':
        return 'bg-purple-100 text-purple-800'
      case 'PROFESSIONAL':
        return 'bg-blue-100 text-blue-800'
      case 'FREE':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

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
        <h1 className="text-3xl font-bold mb-2">Provider Management</h1>
        <p className="text-gray-600">Approve, manage, and monitor service providers</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-600 text-sm">Total Providers</p>
          <p className="text-3xl font-bold">{providers.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-600 text-sm">Pending Approval</p>
          <p className="text-3xl font-bold text-yellow-600">
            {providers.filter(p => p.status === 'PENDING').length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-600 text-sm">Active</p>
          <p className="text-3xl font-bold text-green-600">
            {providers.filter(p => p.status === 'ACTIVE').length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-600 text-sm">Suspended</p>
          <p className="text-3xl font-bold text-red-600">
            {providers.filter(p => p.status === 'SUSPENDED').length}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex gap-2 flex-wrap">
          {['ALL', 'PENDING', 'ACTIVE', 'SUSPENDED', 'INACTIVE'].map((status) => (
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

      {/* Providers Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Business
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tier
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Joined
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProviders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    No providers found
                  </td>
                </tr>
              ) : (
                filteredProviders.map((provider) => (
                  <tr key={provider.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">
                        {provider.businessName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {provider.user.name || provider.user.email}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{provider.phone}</div>
                      {provider.email && (
                        <div className="text-sm text-gray-500">{provider.email}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getTierColor(provider.tier)}`}>
                        {provider.tier}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(provider.status)}`}>
                        {provider.status}
                      </span>
                      {provider.verified && (
                        <span className="ml-2 text-blue-600">✓</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(provider.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Link
                        href={`/providers/${provider.slug}`}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                        target="_blank"
                      >
                        View
                      </Link>
                      {provider.status === 'PENDING' && (
                        <button
                          onClick={() => handleApprove(provider.id)}
                          className="text-green-600 hover:text-green-900 mr-4"
                        >
                          Approve
                        </button>
                      )}
                      {provider.status === 'ACTIVE' && (
                        <button
                          onClick={() => handleSuspend(provider.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Suspend
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
