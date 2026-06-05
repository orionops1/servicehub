'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function ProviderGalleryPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [gallery, setGallery] = useState<any[]>([])

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
      return
    }

    if (session?.user) {
      fetchGallery()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, status])

  const fetchGallery = async () => {
    try {
      const response = await fetch('/api/providers/me/gallery')
      if (response.ok) {
        const data = await response.json()
        setGallery(data.gallery || [])
      }
    } catch (error) {
      console.error('Error fetching gallery:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // In a real app, upload to Cloudinary or similar service
    alert('Image upload functionality will be implemented with Cloudinary integration')
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
              <CardTitle>Photo Gallery</CardTitle>
              <p className="text-sm text-muted-foreground mt-2">
                Showcase your work with photos
              </p>
            </div>
            <label htmlFor="upload">
              <Button type="button" onClick={() => document.getElementById('upload')?.click()}>
                Upload Photo
              </Button>
              <input
                id="upload"
                type="file"
                accept="image/*"
                onChange={handleUpload}
                className="hidden"
              />
            </label>
          </div>
        </CardHeader>
        <CardContent>
          {gallery.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📸</div>
              <h3 className="text-lg font-semibold mb-2">No Photos Yet</h3>
              <p className="text-muted-foreground mb-4">
                Upload photos of your work to showcase your skills
              </p>
              <label htmlFor="upload-empty">
                <Button onClick={() => document.getElementById('upload-empty')?.click()}>
                  Upload Your First Photo
                </Button>
                <input
                  id="upload-empty"
                  type="file"
                  accept="image/*"
                  onChange={handleUpload}
                  className="hidden"
                />
              </label>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {gallery.map((image: any) => (
                <div key={image.id} className="relative aspect-square rounded-lg overflow-hidden border">
                  <Image
                    src={image.imageUrl}
                    alt={image.caption || 'Gallery image'}
                    fill
                    className="object-cover"
                  />
                  {image.caption && (
                    <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2 text-sm">
                      {image.caption}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
