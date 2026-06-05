# API Documentation

## Base URL
```
Development: http://localhost:3000/api
Production: https://servicehub.lk/api
```

## Authentication

Most endpoints require authentication via NextAuth session.

```typescript
// Protected API route example
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET(request: Request) {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  // Handle request
}
```

## API Endpoints

### Authentication

#### POST /api/auth/register
Register a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword",
  "name": "John Doe",
  "phone": "0771234567",
  "role": "CUSTOMER"
}
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "clx...",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "CUSTOMER"
  }
}
```

### Providers

#### GET /api/providers
Get list of providers with filtering.

**Query Parameters:**
- `category` - Category slug
- `district` - District ID
- `city` - City ID
- `tier` - Provider tier (FREE, PROFESSIONAL, ELITE)
- `verified` - Boolean
- `featured` - Boolean
- `page` - Page number (default: 1)
- `limit` - Results per page (default: 20)
- `sortBy` - Sort field (rating, recent, popular)

**Response:**
```json
{
  "providers": [
    {
      "id": "clx...",
      "businessName": "Acme Electric",
      "slug": "acme-electric",
      "description": "Professional electrical services",
      "logo": "https://...",
      "phone": "0771234567",
      "whatsapp": "94771234567",
      "tier": "PROFESSIONAL",
      "verified": true,
      "featured": false,
      "averageRating": 4.8,
      "totalReviews": 24,
      "district": {
        "name": "Colombo"
      },
      "city": {
        "name": "Dehiwala"
      },
      "services": [
        {
          "id": "clx...",
          "title": "Residential Wiring",
          "category": {
            "name": "Electrician"
          }
        }
      ]
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "totalPages": 8
  }
}
```

#### GET /api/providers/[slug]
Get single provider by slug.

**Response:**
```json
{
  "id": "clx...",
  "businessName": "Acme Electric",
  "slug": "acme-electric",
  "description": "Professional electrical services...",
  "logo": "https://...",
  "coverImage": "https://...",
  "phone": "0771234567",
  "whatsapp": "94771234567",
  "email": "contact@acme.lk",
  "website": "https://acme.lk",
  "address": "123 Main St, Dehiwala",
  "tier": "PROFESSIONAL",
  "verified": true,
  "averageRating": 4.8,
  "totalReviews": 24,
  "viewCount": 1523,
  "district": { "name": "Colombo" },
  "city": { "name": "Dehiwala" },
  "gallery": [
    {
      "id": "clx...",
      "imageUrl": "https://...",
      "caption": "Recent project"
    }
  ],
  "services": [...],
  "reviews": [...]
}
```

#### POST /api/providers
Create new provider profile (requires authentication).

**Request Body:**
```json
{
  "businessName": "Acme Electric",
  "description": "Professional electrical services",
  "phone": "0771234567",
  "whatsapp": "94771234567",
  "email": "contact@acme.lk",
  "districtId": "clx...",
  "cityId": "clx...",
  "address": "123 Main St"
}
```

#### PUT /api/providers/[id]
Update provider profile (requires authentication & ownership).

#### DELETE /api/providers/[id]
Delete provider profile (requires authentication & ownership or admin).

### Services

#### GET /api/services
Get list of services.

**Query Parameters:**
- `categoryId` - Filter by category
- `providerId` - Filter by provider
- `districtId` - Filter by district

**Response:**
```json
{
  "services": [
    {
      "id": "clx...",
      "title": "Residential Electrical Wiring",
      "description": "Complete home wiring services",
      "priceFrom": 5000,
      "priceTo": 50000,
      "priceUnit": "per project",
      "provider": {
        "businessName": "Acme Electric",
        "slug": "acme-electric"
      },
      "category": {
        "name": "Electrician",
        "slug": "electrician"
      }
    }
  ]
}
```

#### POST /api/services
Create new service (requires authentication & provider role).

**Request Body:**
```json
{
  "categoryId": "clx...",
  "title": "Residential Electrical Wiring",
  "description": "Complete home wiring services",
  "priceFrom": 5000,
  "priceTo": 50000,
  "priceUnit": "per project",
  "serviceDistricts": ["clx1...", "clx2..."]
}
```

### Service Requests

#### GET /api/requests
Get list of service requests.

**Query Parameters:**
- `categoryId` - Filter by category
- `districtId` - Filter by district
- `status` - Filter by status (OPEN, IN_PROGRESS, COMPLETED)
- `page` - Page number
- `limit` - Results per page

**Response:**
```json
{
  "requests": [
    {
      "id": "clx...",
      "title": "Need electrician urgently",
      "description": "House wiring issue...",
      "category": {
        "name": "Electrician"
      },
      "district": {
        "name": "Colombo"
      },
      "city": {
        "name": "Dehiwala"
      },
      "budgetMin": 5000,
      "budgetMax": 10000,
      "urgency": "HIGH",
      "status": "OPEN",
      "responseCount": 3,
      "createdAt": "2026-06-01T10:00:00Z"
    }
  ]
}
```

#### POST /api/requests
Create new service request (requires authentication).

**Request Body:**
```json
{
  "categoryId": "clx...",
  "title": "Need electrician urgently",
  "description": "House wiring issue in bedroom",
  "districtId": "clx...",
  "cityId": "clx...",
  "budgetMin": 5000,
  "budgetMax": 10000,
  "urgency": "HIGH",
  "contactPhone": "0771234567",
  "contactWhatsapp": "94771234567"
}
```

#### POST /api/requests/[id]/responses
Respond to service request (requires authentication & provider role).

**Request Body:**
```json
{
  "message": "I can help with your electrical issue. Available today.",
  "quotedPrice": 7500
}
```

### Reviews

#### GET /api/providers/[providerId]/reviews
Get reviews for a provider.

**Query Parameters:**
- `page` - Page number
- `limit` - Results per page

**Response:**
```json
{
  "reviews": [
    {
      "id": "clx...",
      "rating": 5,
      "comment": "Excellent service! Very professional.",
      "customer": {
        "name": "John Doe"
      },
      "createdAt": "2026-05-15T10:00:00Z"
    }
  ],
  "average": 4.8,
  "total": 24
}
```

#### POST /api/reviews
Submit a review (requires authentication).

**Request Body:**
```json
{
  "providerId": "clx...",
  "rating": 5,
  "comment": "Excellent service! Very professional."
}
```

### Categories

#### GET /api/categories
Get all categories.

**Response:**
```json
{
  "categories": [
    {
      "id": "clx...",
      "name": "Home Services",
      "slug": "home-services",
      "description": "Professional home maintenance",
      "icon": "🏠",
      "featured": true,
      "children": [
        {
          "id": "clx...",
          "name": "Electrician",
          "slug": "electrician"
        }
      ]
    }
  ]
}
```

### Locations

#### GET /api/locations/provinces
Get all provinces.

#### GET /api/locations/districts
Get all districts (optionally filtered by province).

**Query Parameters:**
- `provinceId` - Filter by province

#### GET /api/locations/cities
Get all cities (optionally filtered by district).

**Query Parameters:**
- `districtId` - Filter by district

### Analytics

#### POST /api/analytics/track
Track user interaction.

**Request Body:**
```json
{
  "providerId": "clx...",
  "action": "PHONE_CLICK",
  "source": "SEARCH"
}
```

**Actions:**
- `PROFILE_VIEW`
- `PHONE_CLICK`
- `WHATSAPP_CLICK`
- `WEBSITE_CLICK`
- `EMAIL_CLICK`
- `GALLERY_VIEW`

#### GET /api/analytics/provider/[id]
Get analytics for provider (requires authentication & ownership).

**Response:**
```json
{
  "summary": {
    "totalViews": 1523,
    "totalClicks": 342,
    "conversionRate": 22.4,
    "averageRating": 4.8
  },
  "chartData": [
    {
      "date": "2026-06-01",
      "views": 45,
      "clicks": 12
    }
  ],
  "breakdown": {
    "phoneClicks": 150,
    "whatsappClicks": 180,
    "websiteClicks": 12
  },
  "sources": {
    "search": 1200,
    "direct": 200,
    "requests": 123
  }
}
```

### Search

#### GET /api/search
Global search across providers and services.

**Query Parameters:**
- `q` - Search query
- `type` - Type filter (providers, services, all)
- `districtId` - Location filter

**Response:**
```json
{
  "results": {
    "providers": [...],
    "services": [...]
  },
  "total": 45
}
```

### Favorites

#### GET /api/favorites
Get user's saved providers (requires authentication).

#### POST /api/favorites
Add provider to favorites (requires authentication).

**Request Body:**
```json
{
  "providerId": "clx..."
}
```

#### DELETE /api/favorites/[id]
Remove from favorites (requires authentication).

## Rate Limiting

All API endpoints are rate-limited:
- **Authenticated users:** 100 requests/minute
- **Anonymous users:** 20 requests/minute
- **Search endpoints:** 30 requests/minute

Rate limit headers:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1717234567
```

## Error Responses

### 400 Bad Request
```json
{
  "error": "Validation failed",
  "details": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

### 401 Unauthorized
```json
{
  "error": "Authentication required"
}
```

### 403 Forbidden
```json
{
  "error": "Insufficient permissions"
}
```

### 404 Not Found
```json
{
  "error": "Resource not found"
}
```

### 429 Too Many Requests
```json
{
  "error": "Rate limit exceeded",
  "retryAfter": 60
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error"
}
```

## Webhooks (Future)

### Payment Events
```
POST /api/webhooks/stripe
```

Events:
- `subscription.created`
- `subscription.updated`
- `subscription.deleted`
- `payment.succeeded`
- `payment.failed`

## SDK/Client Libraries (Future)

### JavaScript/TypeScript
```typescript
import { ServiceHubClient } from '@servicehub/sdk'

const client = new ServiceHubClient({
  apiKey: 'your-api-key'
})

const providers = await client.providers.list({
  category: 'electrician',
  district: 'colombo'
})
```

## Testing

### Development
```bash
# Run API tests
npm run test:api

# Test specific endpoint
curl http://localhost:3000/api/providers
```

### Postman Collection
Available at: `/docs/ServiceHub-API.postman_collection.json`

## Versioning

API versioning via URL path (future):
- `/api/v1/providers`
- `/api/v2/providers`

Current version: v1 (implicit)
