# System Architecture

## Overview

SERVICE HUB SRI LANKA is built using a modern full-stack architecture optimized for performance, scalability, and developer experience.

## Technology Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Shadcn UI** - Component library
- **Framer Motion** - Animations
- **Zustand** - State management

### Backend
- **Next.js API Routes** - RESTful API
- **Server Actions** - Form handling & mutations
- **Prisma** - Database ORM
- **NextAuth** - Authentication
- **Zod** - Input validation

### Database
- **PostgreSQL** - Primary database
- **Neon** - Serverless PostgreSQL hosting

### Infrastructure
- **Vercel** - Hosting & deployment
- **Cloudinary** - Image storage & optimization
- **Google Analytics** - Web analytics
- **PostHog** - Product analytics

## Architecture Patterns

### 1. Server-Side Rendering (SSR)
All public pages are server-rendered for optimal SEO and performance.

### 2. API Route Architecture
```
/api
├── /auth          # Authentication endpoints
├── /providers     # Provider CRUD
├── /services      # Service management
├── /requests      # Service requests
├── /reviews       # Review system
└── /analytics     # Analytics tracking
```

### 3. Server Actions
Form submissions and mutations use Next.js Server Actions for improved UX and security.

### 4. Component Structure
```
components/
├── ui/            # Base UI components (Shadcn)
├── layout/        # Layout components
├── forms/         # Form components
├── cards/         # Card components
└── shared/        # Shared/reusable components
```

## Data Flow

### Customer Journey
1. Customer searches for service
2. SSR page renders with SEO optimization
3. Customer views provider profiles
4. Click tracking (WhatsApp/Phone)
5. Analytics recorded
6. Review submission

### Provider Journey
1. Provider registers account
2. Creates business profile
3. Adds services & gallery
4. Receives service requests
5. Views analytics dashboard
6. Upgrades to premium

## Security

### Authentication
- Secure password hashing (bcrypt)
- JWT-based session management
- Protected API routes
- Role-based access control (RBAC)

### Data Protection
- Input validation (Zod)
- SQL injection prevention (Prisma)
- XSS protection
- CSRF tokens
- Rate limiting

## Performance Optimization

### Frontend
- Image optimization (Next.js Image)
- Code splitting
- Lazy loading
- Route prefetching
- Static generation where possible

### Backend
- Database connection pooling
- Query optimization
- Caching strategy (future: Redis)
- CDN delivery (Vercel Edge)

### Database
- Indexed queries
- Efficient relations
- Pagination
- Denormalized counts (viewCount, ratingAverage)

## SEO Strategy

### Dynamic Pages
- `/[category]`
- `/[category]/[district]`
- `/[category]/[district]/[city]`
- `/providers/[slug]`

### Metadata
- Dynamic meta tags
- Open Graph tags
- Structured data (JSON-LD)
- XML sitemap
- Robots.txt

## Monitoring & Analytics

### Web Analytics
- Google Analytics 4
- Page views
- User journeys
- Conversion tracking

### Product Analytics
- PostHog
- Feature usage
- User behavior
- A/B testing

### Error Tracking
- Vercel Analytics
- Error logging
- Performance monitoring

## Deployment Strategy

### Development
```bash
npm run dev
```

### Staging
- Automatic preview deployments
- Feature branch testing

### Production
- Main branch deployment
- Zero-downtime updates
- Automatic rollback

## Scaling Roadmap

### Phase 1 (Current)
- Single region
- Serverless functions
- Neon serverless DB

### Phase 2 (1K-10K users)
- Multi-region deployment
- Database connection pooling
- Redis caching
- Image CDN optimization

### Phase 3 (10K+ users)
- Microservices architecture
- Dedicated database
- Message queue (Bull/Redis)
- Load balancing
- Horizontal scaling

## Future Enhancements

### Q2 2026
- Mobile apps (React Native)
- Real-time chat (Socket.io)
- Push notifications

### Q3 2026
- Video consultations (WebRTC)
- Booking system
- Payment gateway integration
- Multi-language support

### Q4 2026
- AI recommendations
- Automated matching
- API marketplace
- White-label solutions

## Development Workflow

1. **Feature Branch** - Create feature branch
2. **Development** - Implement feature locally
3. **Testing** - Manual & automated tests
4. **PR Review** - Code review
5. **Preview Deploy** - Vercel preview deployment
6. **Merge** - Merge to main
7. **Production** - Automatic production deployment

## Environment Variables

Required environment variables:
- `DATABASE_URL` - PostgreSQL connection
- `NEXTAUTH_SECRET` - Auth secret
- `NEXTAUTH_URL` - Site URL
- `CLOUDINARY_*` - Image upload
- `NEXT_PUBLIC_GA_ID` - Analytics
- `NEXT_PUBLIC_POSTHOG_KEY` - Product analytics

See `.env.example` for complete list.
