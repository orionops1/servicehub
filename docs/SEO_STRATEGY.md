# SEO Strategy

## Overview

SERVICE HUB SRI LANKA implements a comprehensive SEO strategy to dominate search results for local service queries in Sri Lanka.

## Target Keywords

### Primary Keywords
- "electrician colombo"
- "plumber gampaha"
- "home tutor kandy"
- "car mechanic negombo"
- "cleaning services sri lanka"

### Long-tail Keywords
- "emergency electrician in colombo 24/7"
- "best english tutor kandy area"
- "affordable house cleaning services galle"
- "reliable car mechanic near me dehiwala"

## Dynamic SEO Pages

### URL Structure

```
/[category]                              # Category landing page
/[category]/[district]                   # District-specific page
/[category]/[district]/[city]            # City-specific page
/providers/[slug]                        # Provider profile
/requests                                # Service requests
/requests/[category]                     # Category requests
```

### Examples
- `/electrician` - All electricians
- `/electrician/colombo` - Electricians in Colombo district
- `/electrician/colombo/dehiwala` - Electricians in Dehiwala
- `/providers/acme-electrical-services` - Provider profile

## Implementation

### 1. Dynamic Metadata Generation

```typescript
// app/[category]/[district]/[city]/page.tsx
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, district, city } = params
  
  return {
    title: `${category} in ${city}, ${district} | Service Hub Sri Lanka`,
    description: `Find trusted ${category} services in ${city}, ${district}. Compare prices, read reviews, and contact providers instantly via WhatsApp or phone.`,
    keywords: [
      `${category} ${city}`,
      `${category} ${district}`,
      `${category} near me`,
      `best ${category} ${city}`,
      `${category} services ${district}`,
    ],
    openGraph: {
      title: `${category} in ${city} - Service Hub Sri Lanka`,
      description: `Find the best ${category} services in ${city}`,
      type: 'website',
      locale: 'en_LK',
    },
  }
}
```

### 2. Structured Data (JSON-LD)

```typescript
// Provider profile structured data
const structuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": provider.businessName,
  "description": provider.description,
  "url": `https://servicehub.lk/providers/${provider.slug}`,
  "telephone": provider.phone,
  "address": {
    "@type": "PostalAddress",
    "addressLocality": provider.city?.name,
    "addressRegion": provider.district?.name,
    "addressCountry": "LK"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": provider.latitude,
    "longitude": provider.longitude
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": provider.averageRating,
    "reviewCount": provider.totalReviews
  },
  "priceRange": "$$"
}
```

### 3. Sitemap Generation

```typescript
// app/sitemap.ts
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://servicehub.lk'
  
  // Static pages
  const routes = ['', '/about', '/contact', '/providers/register'].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: 1,
  }))
  
  // Dynamic category pages
  const categories = await prisma.category.findMany()
  const categoryRoutes = categories.map(cat => ({
    url: `${baseUrl}/${cat.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'daily',
    priority: 0.9,
  }))
  
  // Provider profiles
  const providers = await prisma.provider.findMany({
    where: { status: 'ACTIVE' }
  })
  const providerRoutes = providers.map(provider => ({
    url: `${baseUrl}/providers/${provider.slug}`,
    lastModified: provider.updatedAt.toISOString(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))
  
  return [...routes, ...categoryRoutes, ...providerRoutes]
}
```

### 4. Robots.txt

```typescript
// app/robots.ts
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/dashboard/'],
      },
    ],
    sitemap: `${process.env.NEXT_PUBLIC_SITE_URL}/sitemap.xml`,
  }
}
```

## On-Page SEO

### Headers Hierarchy
```html
<h1>Electrician Services in Colombo</h1>
<h2>Top-Rated Electricians in Colombo District</h2>
<h3>Why Choose Our Electricians?</h3>
```

### Content Strategy

#### Category Pages
- Service overview (300+ words)
- Benefits of hiring professionals
- What to look for
- Common services
- Pricing information
- FAQ section

#### Location Pages
- Location-specific information
- List of providers
- Nearby areas served
- Local insights

### Image Optimization
- Alt text with keywords
- Descriptive filenames
- WebP format
- Lazy loading
- Responsive images

## Technical SEO

### Performance
- Core Web Vitals optimization
- Fast page load times (<3s)
- Mobile-first design
- Lighthouse score >90

### Mobile Optimization
- Responsive design
- Touch-friendly buttons
- Mobile-optimized forms
- PWA capabilities

### URL Structure
- Clean, readable URLs
- Keyword-rich slugs
- Proper URL hierarchy
- Canonical tags

### Internal Linking
- Related services
- Nearby locations
- Provider cross-linking
- Breadcrumbs

## Local SEO

### Google Business Profile
- Claim business listing
- Add service areas
- Upload photos
- Collect reviews

### Local Citations
- Consistent NAP (Name, Address, Phone)
- Local directories
- Industry-specific listings

### Reviews Strategy
- Encourage customer reviews
- Respond to all reviews
- Display reviews on site
- Star ratings in search results

## Content Marketing

### Blog Topics
- "How to Choose a Reliable Electrician in Colombo"
- "Emergency Plumbing: What to Do Before Help Arrives"
- "Top 10 Home Services Every Sri Lankan Homeowner Needs"
- "Guide to Hiring a Home Tutor in Kandy"

### Service Guides
- Comprehensive guides for each category
- Step-by-step hiring process
- Cost estimation guides
- Safety checklists

## Link Building

### Strategies
- Guest posting on local blogs
- Partner with complementary businesses
- Local news features
- Industry associations
- Social media promotion

### Quality Over Quantity
- Focus on relevant, high-authority sites
- Sri Lankan websites priority
- Natural link acquisition
- Avoid black-hat techniques

## Analytics & Tracking

### Key Metrics
- Organic search traffic
- Keyword rankings
- Bounce rate
- Time on page
- Conversion rate
- Provider profile views
- Contact clicks (WhatsApp/Phone)

### Tools
- Google Search Console
- Google Analytics 4
- PostHog analytics
- Rank tracking tools

### Monthly Reports
- Traffic growth
- Top-performing keywords
- Top-performing pages
- Conversion metrics
- Competitor analysis

## Competitive Analysis

### Monitor Competitors
- Hodabass.lk
- Ikman Services
- QuickFind.lk
- LankaServices.lk

### Track
- Their keyword rankings
- Content strategy
- Backlink profile
- User experience
- Pricing strategy

## Content Calendar

### Weekly
- 2-3 new provider profiles
- Service request updates
- Review moderation

### Monthly
- 4 blog posts
- 1 comprehensive guide
- Category page updates
- Performance review

### Quarterly
- Major content overhaul
- New category additions
- SEO audit
- Competitor analysis

## Schema Markup Types

### LocalBusiness
For provider profiles

### Service
For service offerings

### AggregateRating
For reviews and ratings

### BreadcrumbList
For navigation

### FAQPage
For FAQ sections

## Future SEO Enhancements

### Phase 2
- Multi-language support (Sinhala, Tamil)
- Voice search optimization
- Video content
- Rich snippets enhancement

### Phase 3
- AI-generated content
- Personalized search results
- Advanced local targeting
- Mobile app SEO

## SEO Checklist

### Before Launch
- [ ] All pages have unique titles
- [ ] Meta descriptions optimized
- [ ] Structured data implemented
- [ ] Sitemap generated
- [ ] Robots.txt configured
- [ ] Analytics installed
- [ ] Search Console configured
- [ ] Page speed optimized
- [ ] Mobile responsive
- [ ] HTTPS enabled

### Ongoing
- [ ] Monitor rankings weekly
- [ ] Update content monthly
- [ ] Build quality backlinks
- [ ] Respond to reviews
- [ ] Fix technical issues
- [ ] Optimize underperforming pages
- [ ] Track competitors
- [ ] Report on metrics

## Expected Results

### Month 1-3
- Index 100+ dynamic pages
- Rank for long-tail keywords
- 500+ organic visitors/month

### Month 4-6
- Rank for competitive keywords
- 2,000+ organic visitors/month
- 50+ providers onboarded

### Month 7-12
- Dominate local search
- 10,000+ organic visitors/month
- 200+ active providers
- #1 for primary keywords

## Success Metrics

- **Organic Traffic** - 50% month-over-month growth
- **Keyword Rankings** - Top 3 for 20+ keywords
- **Domain Authority** - Increase by 10 points
- **Conversion Rate** - 5%+ provider contact rate
- **Review Velocity** - 10+ new reviews/month
