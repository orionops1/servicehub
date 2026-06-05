import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://servicehubsl.com'

  // Static pages
  const routes = [
    '',
    '/search',
    '/requests',
    '/login',
    '/register',
    '/about',
    '/contact',
    '/terms',
    '/privacy',
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // Categories
  const categories = await prisma.category.findMany({
    where: { active: true }
  })
  const categoryRoutes = categories.map(cat => ({
    url: `${baseUrl}/search?category=${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.9,
  }))

  // Providers
  const providers = await prisma.provider.findMany({
    where: { status: 'ACTIVE' },
    select: { slug: true, updatedAt: true }
  })
  const providerRoutes = providers.map(provider => ({
    url: `${baseUrl}/providers/${provider.slug}`,
    lastModified: provider.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [...routes, ...categoryRoutes, ...providerRoutes]
}
