# SERVICE HUB SRI LANKA 🇱🇰

[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-5.11-green)](https://www.prisma.io/)
[![License](https://img.shields.io/badge/License-Proprietary-red)](LICENSE)

> Modern Local Service Marketplace - Connecting Sri Lankan Customers with Quality Service Providers

## 🎯 Overview

SERVICE HUB SRI LANKA is a production-ready SaaS platform designed to be the #1 local service marketplace in Sri Lanka, outperforming competitors like Hodabass.lk, Ikman Services, and QuickFind.lk.

### Key Features

- 🔍 **Advanced Search** - By category, district, city, and nearby services
- 📱 **Mobile-First** - PWA support with offline capabilities
- 💬 **Instant Contact** - WhatsApp & Phone integration
- 🎯 **Service Requests** - Customers post needs, providers respond
- ⭐ **Reviews & Ratings** - Build trust through transparency
- 💎 **Premium Tiers** - Monetization through subscriptions
- 🚀 **SEO Optimized** - Dynamic pages for every service/location combo
- 📊 **Analytics Dashboard** - Track clicks, views, and conversions

## 🏗️ Architecture

```
Next.js 15 (App Router)
├── Frontend: React 19 + TypeScript + Tailwind CSS
├── Backend: Next.js API Routes + Server Actions
├── Database: PostgreSQL (Neon) + Prisma ORM
├── Auth: NextAuth/Auth.js
├── Storage: Cloudinary
├── Deployment: Vercel
└── Analytics: Google Analytics + PostHog
```

## 📁 Project Structure

```
servicehub/
├── prisma/                 # Database schema & migrations
│   ├── schema.prisma
│   ├── seed.ts
│   └── data/              # Seed data (categories, locations)
├── src/
│   ├── app/               # Next.js 15 App Router
│   │   ├── (auth)/        # Authentication routes
│   │   ├── (dashboard)/   # Dashboard routes
│   │   ├── (marketing)/   # Public pages
│   │   ├── api/           # API routes
│   │   └── layout.tsx
│   ├── components/        # React components
│   │   ├── ui/            # Shadcn UI components
│   │   ├── layout/        # Layout components
│   │   ├── forms/         # Form components
│   │   ├── cards/         # Card components
│   │   └── shared/        # Shared components
│   ├── lib/               # Utilities & configurations
│   │   ├── prisma.ts      # Prisma client
│   │   ├── auth.ts        # Auth config
│   │   ├── cloudinary.ts  # Cloudinary config
│   │   └── utils.ts       # Helper functions
│   ├── types/             # TypeScript types
│   ├── hooks/             # Custom React hooks
│   ├── store/             # Zustand state management
│   └── styles/            # Global styles
├── public/                # Static assets
│   ├── icons/
│   ├── images/
│   └── manifest.json
└── docs/                  # Documentation
    ├── ARCHITECTURE.md
    ├── DATABASE.md
    ├── DEPLOYMENT.md
    ├── SEO_STRATEGY.md
    └── MONETIZATION.md
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18.17.0 or higher
- PostgreSQL database (Neon recommended)
- Cloudinary account
- Google Analytics & AdSense accounts

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/orionops1/servicehub.git
cd servicehub
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
```bash
cp .env.example .env
```

Edit `.env` with your credentials:
- Database URL (Neon PostgreSQL)
- NextAuth secret
- Cloudinary credentials
- Google Analytics ID
- PostHog API key

4. **Set up database**
```bash
npm run db:push
npm run db:seed
```

5. **Run development server**
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## 🗄️ Database Schema

### Core Tables

- **users** - All platform users (customers, providers, admins)
- **providers** - Service provider profiles
- **services** - Individual services offered
- **categories** - Service categories hierarchy
- **service_requests** - Customer service requests
- **reviews** - Customer reviews & ratings
- **subscriptions** - Premium subscriptions
- **analytics** - Profile view/click tracking
- **provinces** - Sri Lankan provinces
- **districts** - Sri Lankan districts (25)
- **cities** - Sri Lankan cities & towns

See [docs/DATABASE.md](docs/DATABASE.md) for complete schema documentation.

## 🎨 User Roles

| Role | Description |
|------|-------------|
| **Guest** | Browse services, view profiles |
| **Customer** | Search, contact, review, post requests |
| **Provider** | Free tier - basic profile |
| **Premium Provider** | Featured profile, analytics, higher ranking |
| **Elite Provider** | Top ranking, verified badge, lead tracking |
| **Admin** | Platform management & moderation |

## 📊 Premium Plans

### Free Tier
- Basic profile listing
- Limited visibility
- Ads displayed on profile

### Professional (LKR 2,500/month)
- Featured profile badge
- Photo gallery (10 images)
- Basic analytics
- Higher search ranking
- Priority in service requests

### Elite (LKR 5,000/month)
- Top search ranking
- Verified badge
- Advanced analytics & lead tracking
- No ads on profile
- Premium placement in all listings
- Priority customer support

## 🌍 SEO Strategy

### Dynamic SEO Pages

Automatically generated pages for every combination:
- `/[category]` - e.g., `/electrician`
- `/[category]/[district]` - e.g., `/electrician/colombo`
- `/[category]/[district]/[city]` - e.g., `/electrician/colombo/dehiwala`

### Implementation

- Server-side rendering (SSR)
- Dynamic metadata generation
- Structured data (JSON-LD)
- Open Graph tags
- XML sitemap generation
- Robots.txt optimization

See [docs/SEO_STRATEGY.md](docs/SEO_STRATEGY.md) for details.

## 💰 Monetization Strategy

1. **Premium Subscriptions** - Recurring revenue from providers
2. **Featured Listings** - Pay-per-promotion
3. **Lead Generation** - Pay-per-lead model
4. **Google AdSense** - Display ads on free profiles
5. **Sponsored Placements** - Category sponsorships

See [docs/MONETIZATION.md](docs/MONETIZATION.md) for business model details.

## 🔐 Security Features

- Password hashing (bcrypt)
- JWT-based authentication
- CSRF protection
- Rate limiting on API routes
- Input validation (Zod)
- SQL injection prevention (Prisma)
- XSS protection
- Secure headers configuration

## 📱 PWA Support

- Offline functionality
- Add to home screen
- Push notifications (future)
- Background sync
- Service worker caching

## 🧪 Testing Strategy

- Unit tests (Jest)
- Integration tests
- E2E tests (Playwright)
- Load testing
- Security audits

## 📈 Scaling Strategy

### Phase 1: MVP (0-1K users)
- Single Vercel deployment
- Neon serverless PostgreSQL
- Cloudinary free tier

### Phase 2: Growth (1K-10K users)
- Multi-region deployment
- Database connection pooling
- CDN optimization
- Redis caching

### Phase 3: Scale (10K+ users)
- Microservices architecture
- Dedicated database instance
- Message queue (Bull/Redis)
- Advanced caching strategies

See [docs/SCALING.md](docs/SCALING.md) for detailed roadmap.

## 🚀 Deployment

### Vercel Deployment (Recommended)

1. **Push to GitHub**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Deploy to Vercel**
- Connect repository to Vercel
- Configure environment variables
- Deploy automatically on push

3. **Configure Custom Domain**
- Add custom domain in Vercel
- Update DNS records

See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for complete guide.

## 📚 Documentation

- [Architecture Overview](docs/ARCHITECTURE.md)
- [Database Design](docs/DATABASE.md)
- [API Documentation](docs/API.md)
- [SEO Strategy](docs/SEO_STRATEGY.md)
- [Monetization Model](docs/MONETIZATION.md)
- [Deployment Guide](docs/DEPLOYMENT.md)
- [Scaling Strategy](docs/SCALING.md)
- [Security Best Practices](docs/SECURITY.md)

## 🤝 Contributing

This is a proprietary project. Contribution guidelines available for authorized team members.

## 📄 License

Proprietary - All Rights Reserved

## 🛠️ Support

For technical support or business inquiries:
- Email: support@servicehubsl.com
- Website: https://servicehubsl.com

## 🗺️ Roadmap

### Q1 2026
- ✅ MVP Launch
- ✅ Core features implementation
- ✅ SEO optimization
- 🚧 Payment gateway integration

### Q2 2026
- Mobile apps (iOS/Android)
- Advanced analytics
- AI-powered recommendations
- Multi-language support (Sinhala, Tamil)

### Q3 2026
- Service booking system
- In-app messaging
- Video consultations
- Verified provider program

### Q4 2026
- API marketplace
- White-label solutions
- Franchise model
- Regional expansion

---

**Built with ❤️ for Sri Lanka's Service Industry**
