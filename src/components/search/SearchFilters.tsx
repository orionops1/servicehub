'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface Category {
  id: string
  name: string
  slug: string
}

interface District {
  id: string
  name: string
}

interface City {
  id: string
  name: string
}

export function SearchFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [categories, setCategories] = useState<Category[]>([])
  const [districts, setDistricts] = useState<District[]>([])
  const [cities, setCities] = useState<City[]>([])
  
  const [filters, setFilters] = useState({
    q: searchParams.get('q') || '',
    category: searchParams.get('category') || '',
    district: searchParams.get('district') || '',
    city: searchParams.get('city') || '',
    tier: searchParams.get('tier') || '',
    verified: searchParams.get('verified') || '',
  })

  useEffect(() => {
    // Load categories
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => {
        const allCategories: Category[] = []
        data.categories?.forEach((cat: any) => {
          allCategories.push(cat)
          if (cat.children) {
            allCategories.push(...cat.children)
          }
        })
        setCategories(allCategories)
      })

    // Load districts
    fetch('/api/locations/districts')
      .then(res => res.json())
      .then(data => setDistricts(data.districts || []))
  }, [])

  useEffect(() => {
    if (filters.district) {
      fetch(`/api/locations/cities?districtId=${filters.district}`)
        .then(res => res.json())
        .then(data => setCities(data.cities || []))
    } else {
      setCities([])
      setFilters(prev => ({ ...prev, city: '' }))
    }
  }, [filters.district])

  const handleSearch = () => {
    const params = new URLSearchParams()
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, value)
    })
    router.push(`/search?${params.toString()}`)
  }

  const handleReset = () => {
    setFilters({
      q: '',
      category: '',
      district: '',
      city: '',
      tier: '',
      verified: '',
    })
    router.push('/search')
  }

  return (
    <div className="bg-white rounded-lg p-6 space-y-6">
      <div>
        <h3 className="font-semibold mb-4">Filter Results</h3>
        
        <div className="space-y-4">
          <div>
            <Label>Search</Label>
            <Input
              placeholder="Search providers..."
              value={filters.q}
              onChange={(e) => setFilters({ ...filters, q: e.target.value })}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>

          <div>
            <Label>Category</Label>
            <Select
              value={filters.category}
              onValueChange={(value) => setFilters({ ...filters, category: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="All categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All categories</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.slug}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>District</Label>
            <Select
              value={filters.district}
              onValueChange={(value) => setFilters({ ...filters, district: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="All districts" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All districts</SelectItem>
                {districts.map((district) => (
                  <SelectItem key={district.id} value={district.id}>
                    {district.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {filters.district && cities.length > 0 && (
            <div>
              <Label>City</Label>
              <Select
                value={filters.city}
                onValueChange={(value) => setFilters({ ...filters, city: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All cities" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All cities</SelectItem>
                  {cities.map((city) => (
                    <SelectItem key={city.id} value={city.id}>
                      {city.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div>
            <Label>Provider Tier</Label>
            <Select
              value={filters.tier}
              onValueChange={(value) => setFilters({ ...filters, tier: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="All tiers" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All tiers</SelectItem>
                <SelectItem value="ELITE">Elite</SelectItem>
                <SelectItem value="PROFESSIONAL">Professional</SelectItem>
                <SelectItem value="FREE">Free</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Verification</Label>
            <Select
              value={filters.verified}
              onValueChange={(value) => setFilters({ ...filters, verified: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="All providers" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All providers</SelectItem>
                <SelectItem value="true">Verified only</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Button onClick={handleSearch} className="w-full">
          Apply Filters
        </Button>
        <Button onClick={handleReset} variant="outline" className="w-full">
          Reset Filters
        </Button>
      </div>
    </div>
  )
}
