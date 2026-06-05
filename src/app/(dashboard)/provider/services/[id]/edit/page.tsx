'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function EditServicePage() {
  const router = useRouter()
  const params = useParams()
  const serviceId = params.id as string
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [service, setService] = useState<any>(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priceFrom: '',
    priceTo: '',
    priceUnit: 'per hour',
    active: true,
  })

  useEffect(() => {
    fetchService()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serviceId])

  const fetchService = async () => {
    try {
      const response = await fetch(`/api/services/${serviceId}`)
      if (response.ok) {
        const data = await response.json()
        setService(data)
        setFormData({
          title: data.title,
          description: data.description || '',
          priceFrom: data.priceFrom?.toString() || '',
          priceTo: data.priceTo?.toString() || '',
          priceUnit: data.priceUnit || 'per hour',
          active: data.active,
        })
      }
    } catch (error) {
      console.error('Error fetching service:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const response = await fetch(`/api/services/${serviceId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        alert('Service updated successfully!')
        router.push('/provider/dashboard')
      } else {
        alert('Failed to update service')
      }
    } catch (error) {
      console.error('Error updating service:', error)
      alert('An error occurred')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this service?')) return

    try {
      const response = await fetch(`/api/services/${serviceId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        alert('Service deleted successfully')
        router.push('/provider/dashboard')
      } else {
        alert('Failed to delete service')
      }
    } catch (error) {
      console.error('Error deleting service:', error)
      alert('An error occurred')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    )
  }

  if (!service) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="py-8 text-center">
            <p>Service not found</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Card>
        <CardHeader>
          <CardTitle>Edit Service</CardTitle>
          <p className="text-sm text-muted-foreground">
            Update your service details
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Service Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Description *
              </label>
              <textarea
                required
                rows={5}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Price Range (Optional)
              </label>
              <div className="grid grid-cols-3 gap-4">
                <input
                  type="number"
                  value={formData.priceFrom}
                  onChange={(e) => setFormData({ ...formData, priceFrom: e.target.value })}
                  className="w-full px-4 py-2 border rounded-md"
                  placeholder="From (LKR)"
                />
                <input
                  type="number"
                  value={formData.priceTo}
                  onChange={(e) => setFormData({ ...formData, priceTo: e.target.value })}
                  className="w-full px-4 py-2 border rounded-md"
                  placeholder="To (LKR)"
                />
                <select
                  value={formData.priceUnit}
                  onChange={(e) => setFormData({ ...formData, priceUnit: e.target.value })}
                  className="w-full px-4 py-2 border rounded-md"
                >
                  <option value="per hour">per hour</option>
                  <option value="per day">per day</option>
                  <option value="per visit">per visit</option>
                  <option value="per project">per project</option>
                  <option value="per item">per item</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="active"
                checked={formData.active}
                onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                className="w-4 h-4"
              />
              <label htmlFor="active" className="text-sm font-medium">
                Active (visible to customers)
              </label>
            </div>

            <div className="flex gap-4">
              <Button type="submit" disabled={saving} className="flex-1">
                {saving ? 'Saving...' : 'Save Changes'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
              <Button
                type="button"
                variant="destructive"
                onClick={handleDelete}
              >
                Delete
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
