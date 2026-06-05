# Implementation Guide

This guide provides step-by-step instructions for implementing SERVICE HUB SRI LANKA from the current foundation.

## Current Status

✅ **Completed:**
- Project structure
- Package configuration
- TypeScript setup
- Tailwind CSS + Shadcn UI
- Prisma schema
- Core utilities
- Documentation

🔄 **Next Steps:**
- Install dependencies
- Set up database
- Implement authentication
- Build core features

## Step-by-Step Implementation

### Step 1: Install Dependencies

```bash
# Install all dependencies
npm install

# This will install:
# - Next.js 15
# - React 19
# - TypeScript
# - Prisma
# - NextAuth
# - Tailwind CSS
# - Shadcn UI components
# - All other dependencies from package.json
```

### Step 2: Set Up Database

#### 2.1 Create Neon Database

1. Visit [neon.tech](https://neon.tech)
2. Sign up for free account
3. Create new project: "servicehub"
4. Copy connection string

#### 2.2 Configure Environment

```bash
# Copy example env file
cp .env.example .env

# Edit .env and add your database URL
DATABASE_URL="postgresql://user:password@host/database?sslmode=require"
```

#### 2.3 Initialize Database

```bash
# Generate Prisma Client
npx prisma generate

# Push schema to database
npm run db:push

# Seed initial data (provinces, districts, cities, categories)
npm run db:seed

# Open Prisma Studio to verify
npm run db:studio
```

### Step 3: Set Up Cloudinary

1. Visit [cloudinary.com](https://cloudinary.com)
2. Create free account
3. Get credentials from dashboard
4. Add to `.env`:

```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
```

### Step 4: Configure NextAuth

Generate authentication secret:

```bash
# Generate secret key
openssl rand -base64 32

# Add to .env
NEXTAUTH_SECRET="generated-secret-here"
NEXTAUTH_URL="http://localhost:3000"
```

### Step 5: Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Implementation Order

### Priority 1: Authentication (Week 2)

#### Create Auth Configuration

```bash
# Create auth lib file
touch src/lib/auth.ts
```

**File: `src/lib/auth.ts`**
```typescript
import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from './prisma'
import bcrypt from 'bcryptjs'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials')
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        })

        if (!user || !user.password) {
          throw new Error('Invalid credentials')
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.password
        )

        if (!isCorrectPassword) {
          throw new Error('Invalid credentials')
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        }
      }
    })
  ],
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role
      }
      return session
    }
  }
}
```

#### Create API Route

**File: `src/app/api/auth/[...nextauth]/route.ts`**
```typescript
import NextAuth from 'next-auth'
import { authOptions } from '@/lib/auth'

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
```

#### Create Login Page

**File: `src/app/(auth)/login/page.tsx`**
```typescript
import { LoginForm } from '@/components/forms/LoginForm'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to your account'
}

export default function LoginPage() {
  return (
    <div className="container max-w-md mx-auto py-16">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Welcome Back</h1>
        <p className="text-muted-foreground mt-2">
          Login to your Service Hub account
        </p>
      </div>
      <LoginForm />
    </div>
  )
}
```

#### Create Login Form Component

**File: `src/components/forms/LoginForm.tsx`**
```typescript
'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError('Invalid email or password')
      } else {
        router.push('/dashboard')
        router.refresh()
      }
    } catch (error) {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-destructive/10 text-destructive p-3 rounded-md text-sm">
          {error}
        </div>
      )}
      
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      
      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </Button>
      
      <p className="text-center text-sm text-muted-foreground">
        Don't have an account?{' '}
        <a href="/register" className="text-primary hover:underline">
          Register
        </a>
      </p>
    </form>
  )
}
```

### Priority 2: Provider Registration

#### Create Registration API

**File: `src/app/api/providers/route.ts`**
```typescript
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { generateSlug } from '@/lib/utils'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const data = await request.json()
    
    // Generate unique slug
    let slug = generateSlug(data.businessName)
    const existingSlug = await prisma.provider.findUnique({
      where: { slug }
    })
    
    if (existingSlug) {
      slug = `${slug}-${Date.now()}`
    }

    const provider = await prisma.provider.create({
      data: {
        userId: session.user.id,
        businessName: data.businessName,
        slug,
        description: data.description,
        phone: data.phone,
        whatsapp: data.whatsapp,
        email: data.email,
        districtId: data.districtId,
        cityId: data.cityId,
        provinceId: data.provinceId,
        address: data.address,
      },
      include: {
        user: true,
        district: true,
        city: true,
      }
    })

    return NextResponse.json(provider)
  } catch (error) {
    console.error('Provider creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create provider' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const skip = (page - 1) * limit

    const providers = await prisma.provider.findMany({
      where: { status: 'ACTIVE' },
      include: {
        user: true,
        district: true,
        city: true,
        services: {
          include: {
            category: true
          }
        }
      },
      orderBy: [
        { featured: 'desc' },
        { tier: 'desc' },
        { averageRating: 'desc' }
      ],
      skip,
      take: limit
    })

    const total = await prisma.provider.count({
      where: { status: 'ACTIVE' }
    })

    return NextResponse.json({
      providers,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Provider fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch providers' },
      { status: 500 }
    )
  }
}
```

### Priority 3: Search & Discovery

#### Create Search Page

**File: `src/app/search/page.tsx`**
```typescript
import { prisma } from '@/lib/prisma'
import { ProviderCard } from '@/components/cards/ProviderCard'
import { SearchFilters } from '@/components/search/SearchFilters'

interface SearchPageProps {
  searchParams: {
    q?: string
    category?: string
    district?: string
    city?: string
  }
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const providers = await prisma.provider.findMany({
    where: {
      status: 'ACTIVE',
      ...(searchParams.category && {
        services: {
          some: {
            category: {
              slug: searchParams.category
            }
          }
        }
      }),
      ...(searchParams.district && {
        districtId: searchParams.district
      }),
      ...(searchParams.city && {
        cityId: searchParams.city
      }),
    },
    include: {
      user: true,
      district: true,
      city: true,
      services: {
        include: {
          category: true
        }
      }
    },
    orderBy: [
      { featured: 'desc' },
      { tier: 'desc' },
      { averageRating: 'desc' }
    ]
  })

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">
        Find Service Providers
      </h1>
      
      <div className="grid md:grid-cols-4 gap-8">
        <aside>
          <SearchFilters />
        </aside>
        
        <main className="md:col-span-3">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {providers.map(provider => (
              <ProviderCard key={provider.id} provider={provider} />
            ))}
          </div>
          
          {providers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No providers found. Try adjusting your filters.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
```

## Common Pitfalls & Solutions

### Issue: Prisma Client Not Generated
**Solution:**
```bash
npx prisma generate
```

### Issue: Database Connection Errors
**Solution:**
- Verify DATABASE_URL is correct
- Ensure database is accessible
- Check SSL mode in connection string

### Issue: NextAuth Session Not Working
**Solution:**
- Verify NEXTAUTH_SECRET is set
- Clear browser cookies
- Check authOptions configuration

### Issue: Deployment Build Failures
**Solution:**
```bash
# Test production build locally
npm run build

# Check for TypeScript errors
npm run type-check

# Fix lint errors
npm run lint
```

## Testing Strategy

### Unit Tests
```bash
# Install testing dependencies
npm install -D jest @testing-library/react @testing-library/jest-dom

# Run tests
npm test
```

### E2E Tests
```bash
# Install Playwright
npm install -D @playwright/test

# Run E2E tests
npx playwright test
```

## Performance Optimization Checklist

- [ ] Enable Next.js Image optimization
- [ ] Implement ISR for static pages
- [ ] Add database indexes
- [ ] Enable Prisma query optimization
- [ ] Configure CDN (Vercel Edge)
- [ ] Implement caching strategy
- [ ] Optimize bundle size
- [ ] Lazy load components
- [ ] Implement pagination everywhere
- [ ] Monitor Core Web Vitals

## Security Checklist

- [ ] Implement rate limiting
- [ ] Add CSRF protection
- [ ] Validate all inputs (Zod)
- [ ] Sanitize user content
- [ ] Use environment variables for secrets
- [ ] Enable HTTPS only
- [ ] Implement security headers
- [ ] Regular dependency updates
- [ ] SQL injection prevention (Prisma)
- [ ] XSS protection

## Next Steps

1. Complete authentication system
2. Build provider dashboard
3. Implement search functionality
4. Add service request marketplace
5. Deploy to Vercel staging
6. User testing
7. Production launch

## Getting Help

- **Documentation:** `/docs` folder
- **Issues:** GitHub Issues
- **Community:** Discord (future)
- **Support:** support@servicehub.lk

---

**Good luck building SERVICE HUB SRI LANKA! 🚀**
