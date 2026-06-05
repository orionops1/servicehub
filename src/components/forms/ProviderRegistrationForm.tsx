'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface Province {
  id: string
  name: string
}

interface District {
  id: string
  name: string
  provinceId: string
}

interface City {
  id: string
  name: string
  districtId: string
}

export function ProviderRegistrationForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [provinces, setProvinces] = useState<Province[]>([])
  const [districts, setDistricts] = useState<District[]>([])
  const [cities, setCities] = useState<City[]>([])

  const [formData, setFormData] = useState({
    businessName: '',
    description: '',
    phone: '',
    whatsapp: '',
    email: '',
    website: '',
    provinceId: '',
    districtId: '',
    cityId: '',
    address: '',
  })

  // Load provinces on mount
  useEffect(() => {
    fetch('/api/locations/provinces')
      .then(res => res.json())
      .then(data => setProvinces(data.provinces || []))
  }, [])

  // Load districts when province changes
  useEffect(() => {
    if (formData.provinceId) {
      fetch(`/api/locations/districts?provinceId=${formData.provinceId}`)
        .then(res => res.json())
        .then(data => setDistricts(data.districts || []))
    } else {
      setDistricts([])
    }
    setFormData(prev => ({ ...prev, districtId: '', cityId: '' }))
  }, [formData.provinceId])

  // Load cities when district changes
  useEffect(() => {
    if (formData.districtId) {
      fetch(`/api/locations/cities?districtId=${formData.districtId}`)
        .then(res => res.json())
        .then(data => setCities(data.cities || []))
    } else {
      setCities([])
    }
    setFormData(prev => ({ ...prev, cityId: '' }))
  }, [formData.districtId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/providers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Failed to create profile')
        return
      }

      // Redirect to provider dashboard
      router.push('/provider/dashboard?success=true')
    } catch (error) {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-destructive/10 text-destructive p-3 rounded-md text-sm">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Business Information</h3>
        
        <div>
          <Label htmlFor="businessName">Business Name *</Label>
          <Input
            id="businessName"
            value={formData.businessName}
            onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
            required
            disabled={loading}
            placeholder="e.g., ABC Electrical Services"
          />
        </div>

        <div>
          <Label htmlFor="description">Business Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            disabled={loading}
            placeholder="Tell customers about your business, services, and experience..."
            rows={4}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Contact Information</h3>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
              disabled={loading}
              placeholder="0771234567"
            />
          </div>

          <div>
            <Label htmlFor="whatsapp">WhatsApp Number</Label>
            <Input
              id="whatsapp"
              type="tel"
              value={formData.whatsapp}
              onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
              disabled={loading}
              placeholder="94771234567"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              disabled={loading}
              placeholder="business@example.com"
            />
          </div>

          <div>
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              type="url"
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              disabled={loading}
              placeholder="https://yourbusiness.com"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Location</h3>
        
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="province">Province</Label>
            <Select
              value={formData.provinceId}
              onValueChange={(value) => setFormData({ ...formData, provinceId: value })}
              disabled={loading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select province" />
              </SelectTrigger>
              <SelectContent>
                {provinces.map((province) => (
                  <SelectItem key={province.id} value={province.id}>
                    {province.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="district">District</Label>
            <Select
              value={formData.districtId}
              onValueChange={(value) => setFormData({ ...formData, districtId: value })}
              disabled={loading || !formData.provinceId}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select district" />
              </SelectTrigger>
              <SelectContent>
                {districts.map((district) => (
                  <SelectItem key={district.id} value={district.id}>
                    {district.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="city">City</Label>
            <Select
              value={formData.cityId}
              onValueChange={(value) => setFormData({ ...formData, cityId: value })}
              disabled={loading || !formData.districtId}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select city" />
              </SelectTrigger>
              <SelectContent>
                {cities.map((city) => (
                  <SelectItem key={city.id} value={city.id}>
                    {city.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor="address">Street Address</Label>
          <Input
            id="address"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            disabled={loading}
            placeholder="123 Main Street"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-4 pt-6">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? 'Creating Profile...' : 'Create Profile'}
        </Button>
      </div>
    </form>
  )
}
