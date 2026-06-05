# Database Design

## Overview

SERVICE HUB SRI LANKA uses PostgreSQL with Prisma ORM for type-safe database access.

## Database Schema

### User Management

#### users
Primary user table for all user types.

| Column | Type | Description |
|--------|------|-------------|
| id | String (CUID) | Primary key |
| email | String | Unique email |
| password | String | Hashed password |
| name | String | Display name |
| phone | String | Phone number |
| role | Enum | GUEST, CUSTOMER, PROVIDER, ADMIN |
| createdAt | DateTime | Registration date |
| updatedAt | DateTime | Last update |

#### providers
Service provider profiles.

| Column | Type | Description |
|--------|------|-------------|
| id | String (CUID) | Primary key |
| userId | String | FK to users |
| businessName | String | Business name |
| slug | String | Unique URL slug |
| description | Text | Business description |
| logo | String | Logo URL |
| phone | String | Contact phone |
| whatsapp | String | WhatsApp number |
| tier | Enum | FREE, PROFESSIONAL, ELITE |
| status | Enum | PENDING, ACTIVE, SUSPENDED |
| verified | Boolean | Verification status |
| featured | Boolean | Featured listing |
| averageRating | Float | Cached average rating |
| totalReviews | Int | Total review count |
| viewCount | Int | Profile view count |
| clickCount | Int | Total clicks |

### Location Data

#### provinces
Sri Lankan provinces (9).

| Column | Type | Description |
|--------|------|-------------|
| id | String (CUID) | Primary key |
| name | String | Province name |
| nameEn | String | English name |
| nameSi | String | Sinhala name |
| nameTa | String | Tamil name |
| code | String | Province code |
| latitude | Float | Coordinates |
| longitude | Float | Coordinates |

#### districts
Sri Lankan districts (25).

| Column | Type | Description |
|--------|------|-------------|
| id | String (CUID) | Primary key |
| provinceId | String | FK to provinces |
| name | String | District name |
| code | String | District code |
| latitude | Float | Coordinates |
| longitude | Float | Coordinates |

#### cities
Sri Lankan cities and towns.

| Column | Type | Description |
|--------|------|-------------|
| id | String (CUID) | Primary key |
| districtId | String | FK to districts |
| provinceId | String | FK to provinces |
| name | String | City name |
| isMajor | Boolean | Major city flag |
| population | Int | Population |

### Service Management

#### categories
Service categories with hierarchy.

| Column | Type | Description |
|--------|------|-------------|
| id | String (CUID) | Primary key |
| name | String | Category name |
| slug | String | URL slug |
| description | Text | Description |
| icon | String | Icon/emoji |
| parentId | String | Parent category |
| featured | Boolean | Featured flag |
| active | Boolean | Active status |

#### services
Individual services offered by providers.

| Column | Type | Description |
|--------|------|-------------|
| id | String (CUID) | Primary key |
| providerId | String | FK to providers |
| categoryId | String | FK to categories |
| title | String | Service title |
| description | Text | Service description |
| priceFrom | Decimal | Starting price |
| priceTo | Decimal | Maximum price |
| priceUnit | String | Price unit |
| serviceProvinces | String[] | Service areas |
| serviceDistricts | String[] | Service areas |
| serviceCities | String[] | Service areas |
| active | Boolean | Active status |
| featured | Boolean | Featured flag |

### Service Requests

#### service_requests
Customer service requests.

| Column | Type | Description |
|--------|------|-------------|
| id | String (CUID) | Primary key |
| customerId | String | FK to users |
| categoryId | String | FK to categories |
| title | String | Request title |
| description | Text | Request details |
| districtId | String | Location |
| cityId | String | Location |
| budgetMin | Decimal | Min budget |
| budgetMax | Decimal | Max budget |
| urgency | Enum | LOW, MEDIUM, HIGH, URGENT |
| status | Enum | OPEN, IN_PROGRESS, COMPLETED, CANCELLED |
| contactPhone | String | Contact info |
| contactWhatsapp | String | WhatsApp |
| viewCount | Int | View counter |
| responseCount | Int | Response counter |
| createdAt | DateTime | Created date |
| expiresAt | DateTime | Expiration date |

#### service_responses
Provider responses to requests.

| Column | Type | Description |
|--------|------|-------------|
| id | String (CUID) | Primary key |
| requestId | String | FK to service_requests |
| providerId | String | FK to providers |
| message | Text | Response message |
| quotedPrice | Decimal | Quoted price |
| createdAt | DateTime | Response date |

### Reviews & Ratings

#### reviews
Customer reviews of providers.

| Column | Type | Description |
|--------|------|-------------|
| id | String (CUID) | Primary key |
| providerId | String | FK to providers |
| customerId | String | FK to users |
| rating | Int | Rating (1-5) |
| comment | Text | Review text |
| approved | Boolean | Moderation status |
| createdAt | DateTime | Review date |

#### favorites
Customer saved providers.

| Column | Type | Description |
|--------|------|-------------|
| id | String (CUID) | Primary key |
| userId | String | FK to users |
| providerId | String | Provider ID |
| createdAt | DateTime | Saved date |

### Subscriptions

#### subscriptions
Provider subscription history.

| Column | Type | Description |
|--------|------|-------------|
| id | String (CUID) | Primary key |
| providerId | String | FK to providers |
| tier | Enum | Subscription tier |
| status | Enum | ACTIVE, CANCELLED, EXPIRED |
| startDate | DateTime | Start date |
| endDate | DateTime | End date |
| amount | Decimal | Payment amount |
| currency | String | Currency code |
| transactionId | String | Payment reference |
| autoRenew | Boolean | Auto-renewal flag |

### Analytics

#### provider_analytics
Daily provider metrics.

| Column | Type | Description |
|--------|------|-------------|
| id | String (CUID) | Primary key |
| providerId | String | FK to providers |
| date | Date | Analytics date |
| profileViews | Int | Profile views |
| phoneClicks | Int | Phone clicks |
| whatsappClicks | Int | WhatsApp clicks |
| websiteClicks | Int | Website clicks |
| sourceSearch | Int | From search |
| sourceDirect | Int | Direct visits |
| sourceRequest | Int | From requests |

## Indexes

### Performance Indexes
```prisma
@@index([slug])                          // providers
@@index([tier, status, featured])        // providers
@@index([districtId, cityId])           // providers
@@index([categoryId])                    // services
@@index([status, urgency])               // service_requests
@@index([providerId, date])              // provider_analytics
```

### Unique Constraints
```prisma
@@unique([email])                        // users
@@unique([slug])                         // providers, categories
@@unique([providerId, customerId])       // reviews
@@unique([userId, providerId])           // favorites
@@unique([providerId, date])             // provider_analytics
```

## Database Operations

### Setup
```bash
# Push schema to database
npm run db:push

# Run migrations
npm run db:migrate

# Seed database
npm run db:seed

# Open Prisma Studio
npm run db:studio
```

### Common Queries

#### Find providers by category and location
```typescript
const providers = await prisma.provider.findMany({
  where: {
    services: {
      some: {
        categoryId: categoryId,
      }
    },
    districtId: districtId,
    status: 'ACTIVE',
  },
  include: {
    user: true,
    services: true,
    district: true,
    city: true,
  },
  orderBy: [
    { featured: 'desc' },
    { tier: 'desc' },
    { averageRating: 'desc' },
  ],
})
```

#### Track analytics
```typescript
await prisma.providerAnalytics.upsert({
  where: {
    providerId_date: {
      providerId: providerId,
      date: new Date(),
    },
  },
  update: {
    profileViews: { increment: 1 },
  },
  create: {
    providerId: providerId,
    date: new Date(),
    profileViews: 1,
  },
})
```

## Backup Strategy

### Development
- Local backups before migrations
- Version control for schema

### Production
- Neon automatic daily backups
- Point-in-time recovery
- Manual backup before major changes

## Migration Strategy

1. Test locally
2. Backup production database
3. Run migration on staging
4. Validate data integrity
5. Deploy to production
6. Verify migration success

## Optimization Tips

1. **Use indexes** - Add indexes for frequently queried fields
2. **Pagination** - Always paginate large result sets
3. **Select fields** - Use `select` to fetch only needed fields
4. **Eager loading** - Use `include` to prevent N+1 queries
5. **Batch operations** - Use `createMany` and `updateMany`
6. **Connection pooling** - Configure Prisma connection pool

## Security

- All passwords hashed with bcrypt
- Parameterized queries (Prisma)
- No raw SQL queries
- Input validation before DB operations
- Role-based access control
- Soft deletes for important data

## Future Enhancements

- Read replicas for scaling
- Full-text search (PostgreSQL)
- Geospatial queries
- Time-series data (ClickHouse)
- Data warehouse integration
