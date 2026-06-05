'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function AdminCategoriesPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [categories, setCategories] = useState<any[]>([])

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
      return
    }

    if (session?.user?.role !== 'ADMIN') {
      router.push('/dashboard')
      return
    }

    fetchCategories()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, status])

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories')
      if (response.ok) {
        const data = await response.json()
        setCategories(data.categories || [])
      }
    } catch (error) {
      console.error('Error fetching categories:', error)
    } finally {
      setLoading(false)
    }
  }

  const toggleActive = async (categoryId: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/categories/${categoryId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active: !currentStatus }),
      })

      if (response.ok) {
        fetchCategories()
      }
    } catch (error) {
      console.error('Error updating category:', error)
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
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Manage Categories</CardTitle>
              <p className="text-sm text-muted-foreground mt-2">
                {categories.length} categories total
              </p>
            </div>
            <Button>Add Category</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {categories.map((category: any) => (
              <div
                key={category.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:border-primary transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div>
                    {category.icon && (
                      <span className="text-2xl">{category.icon}</span>
                    )}
                  </div>
                  <div>
                    <div className="font-semibold">{category.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {category.slug}
                      {category.parent && ` • Under: ${category.parent.name}`}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      category.active
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {category.active ? 'Active' : 'Inactive'}
                  </span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => toggleActive(category.id, category.active)}
                  >
                    {category.active ? 'Deactivate' : 'Activate'}
                  </Button>
                  <Button size="sm" variant="ghost">
                    Edit
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
