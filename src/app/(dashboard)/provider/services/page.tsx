'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { Plus, Pencil, Trash2 } from 'lucide-react'

interface Service {
  id: string
  title: string
  description: string | null
  priceFrom: number | null
  priceTo: number | null
  priceUnit: string | null
  active: boolean
  category: {
    name: string
  }
}

export default function ProviderServicesPage() {
  const { data: session, status } = useSession()
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingService, setEditingService] = useState<Service | null>(null)

  useEffect(() => {
    if (status === 'unauthenticated') {
      redirect('/login')
    }
  }, [status])

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/services')
      if (response.ok) {
        const data = await response.json()
        setServices(data.services || [])
      }
    } catch (error) {
      console.error('Failed to fetch services:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (serviceId: string) => {
    if (!confirm('Delete this service?')) return

    try {
      const response = await fetch(`/api/services/${serviceId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        fetchServices()
      }
    } catch (error) {
      console.error('Failed to delete service:', error)
    }
  }

  const handleToggleActive = async (serviceId: string, currentActive: boolean) => {
    try {
      const response = await fetch(`/api/services/${serviceId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active: !currentActive }),
      })

      if (response.ok) {
        fetchServices()
      }
    } catch (error) {
      console.error('Failed to update service:', error)
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
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Services</h1>
          <p className="text-gray-600">Manage the services you offer</p>
        </div>
        <button
          onClick={() => {
            setEditingService(null)
            setShowForm(true)
          }}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Service
        </button>
      </div>

      {/* Service Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">
              {editingService ? 'Edit Service' : 'Add New Service'}
            </h2>
            <ServiceForm
              service={editingService}
              onSuccess={() => {
                setShowForm(false)
                fetchServices()
              }}
              onCancel={() => setShowForm(false)}
            />
          </div>
        </div>
      )}

      {/* Services Grid */}
      {services.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <p className="text-gray-500 mb-4">No services added yet</p>
          <button
            onClick={() => setShowForm(true)}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Add your first service
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-semibold text-lg">{service.title}</h3>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    service.active
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {service.active ? 'Active' : 'Inactive'}
                </span>
              </div>

              <p className="text-sm text-gray-600 mb-3">
                {service.category.name}
              </p>

              {service.description && (
                <p className="text-sm text-gray-700 mb-4 line-clamp-2">
                  {service.description}
                </p>
              )}

              {(service.priceFrom || service.priceTo) && (
                <div className="text-sm font-medium text-gray-900 mb-4">
                  {service.priceFrom && service.priceTo ? (
                    <>LKR {service.priceFrom.toLocaleString()} - {service.priceTo.toLocaleString()}</>
                  ) : service.priceFrom ? (
                    <>From LKR {service.priceFrom.toLocaleString()}</>
                  ) : (
                    <>Up to LKR {service.priceTo?.toLocaleString()}</>
                  )}
                  {service.priceUnit && <span className="text-gray-600"> {service.priceUnit}</span>}
                </div>
              )}

              <div className="flex gap-2 border-t pt-4">
                <button
                  onClick={() => {
                    setEditingService(service)
                    setShowForm(true)
                  }}
                  className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm"
                >
                  <Pencil className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => handleToggleActive(service.id, service.active)}
                  className="flex items-center gap-1 text-gray-600 hover:text-gray-700 text-sm"
                >
                  {service.active ? 'Deactivate' : 'Activate'}
                </button>
                <button
                  onClick={() => handleDelete(service.id)}
                  className="flex items-center gap-1 text-red-600 hover:text-red-700 text-sm ml-auto"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// Service Form Component
function ServiceForm({
  service,
  onSuccess,
  onCancel,
}: {
  service: Service | null
  onSuccess: () => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState({
    title: service?.title || '',
    description: service?.description || '',
    categoryId: '',
    priceFrom: service?.priceFrom?.toString() || '',
    priceTo: service?.priceTo?.toString() || '',
    priceUnit: service?.priceUnit || 'per hour',
    active: service?.active ?? true,
  })
  const [categories, setCategories] = useState<Array<{ id: string; name: string }>>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories')
      if (response.ok) {
        const data = await response.json()
        setCategories(data.categories || [])
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const url = service ? `/api/services/${service.id}` : '/api/services'
      const method = service ? 'PATCH' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          priceFrom: formData.priceFrom ? parseFloat(formData.priceFrom) : null,
          priceTo: formData.priceTo ? parseFloat(formData.priceTo) : null,
        }),
      })

      if (response.ok) {
        onSuccess()
      } else {
        alert('Failed to save service')
      }
    } catch (error) {
      console.error('Failed to save service:', error)
      alert('Failed to save service')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Service Title *</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full p-2 border rounded-lg"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Category *</label>
        <select
          value={formData.categoryId}
          onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
          className="w-full p-2 border rounded-lg"
          required
        >
          <option value="">Select category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full p-2 border rounded-lg"
          rows={4}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Price From</label>
          <input
            type="number"
            value={formData.priceFrom}
            onChange={(e) => setFormData({ ...formData, priceFrom: e.target.value })}
            className="w-full p-2 border rounded-lg"
            placeholder="LKR"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Price To</label>
          <input
            type="number"
            value={formData.priceTo}
            onChange={(e) => setFormData({ ...formData, priceTo: e.target.value })}
            className="w-full p-2 border rounded-lg"
            placeholder="LKR"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Price Unit</label>
        <select
          value={formData.priceUnit}
          onChange={(e) => setFormData({ ...formData, priceUnit: e.target.value })}
          className="w-full p-2 border rounded-lg"
        >
          <option value="per hour">per hour</option>
          <option value="per day">per day</option>
          <option value="per visit">per visit</option>
          <option value="per project">per project</option>
          <option value="per month">per month</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={formData.active}
          onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
          className="rounded"
        />
        <label className="text-sm">Active (visible to customers)</label>
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Saving...' : service ? 'Update Service' : 'Add Service'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
