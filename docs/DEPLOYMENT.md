# Deployment Guide

## Vercel Deployment (Recommended)

### Prerequisites

1. **GitHub Account** - Code repository
2. **Vercel Account** - Free tier available
3. **Neon Database** - Serverless PostgreSQL
4. **Cloudinary Account** - Image storage

### Step 1: Prepare Database

#### Create Neon Database

1. Visit [neon.tech](https://neon.tech)
2. Create new project
3. Copy connection string
4. Format: `postgresql://user:password@host/database?sslmode=require`

#### Initialize Database Schema

```bash
# Set DATABASE_URL in .env
DATABASE_URL="your-neon-connection-string"

# Push schema to database
npm run db:push

# Seed initial data
npm run db:seed
```

### Step 2: Configure Cloudinary

1. Visit [cloudinary.com](https://cloudinary.com)
2. Create account
3. Get credentials from dashboard:
   - Cloud Name
   - API Key
   - API Secret

### Step 3: Push to GitHub

```bash
# Initialize git (if not done)
git init
git add .
git commit -m "Initial commit"

# Add remote and push
git remote add origin https://github.com/yourusername/servicehub.git
git branch -M main
git push -u origin main
```

### Step 4: Deploy to Vercel

#### Via Vercel Dashboard

1. Visit [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Configure project:
   - Framework Preset: **Next.js**
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`

5. Add Environment Variables:

```env
# Database
DATABASE_URL=postgresql://...

# NextAuth
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=generate-with-openssl-rand-base64-32

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_POSTHOG_KEY=phc_xxxxx
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com

# Site
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
NEXT_PUBLIC_SITE_NAME=Service Hub Sri Lanka
```

6. Click "Deploy"

#### Via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Production deployment
vercel --prod
```

### Step 5: Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain
3. Configure DNS records:

```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

4. Wait for DNS propagation (up to 48 hours)

### Step 6: Configure Analytics

#### Google Analytics

1. Create GA4 property
2. Get Measurement ID (G-XXXXXXXXXX)
3. Add to Vercel environment variables

#### PostHog

1. Create PostHog account
2. Get API key
3. Add to environment variables

### Step 7: SSL Certificate

Vercel automatically provisions SSL certificates for all domains.

## Alternative Deployment Options

### Railway

```bash
# Install Railway CLI
npm install -g railway

# Login
railway login

# Initialize
railway init

# Deploy
railway up
```

### DigitalOcean App Platform

1. Connect GitHub repository
2. Configure app:
   - Environment: Node.js
   - Build Command: `npm run build`
   - Run Command: `npm start`
3. Add environment variables
4. Deploy

### Self-Hosted (Docker)

```dockerfile
# Dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
ENV PORT 3000
CMD ["node", "server.js"]
```

```bash
# Build image
docker build -t servicehub .

# Run container
docker run -p 3000:3000 \
  -e DATABASE_URL="..." \
  -e NEXTAUTH_SECRET="..." \
  servicehub
```

## Environment Variables Management

### Generate Secrets

```bash
# Generate NextAuth secret
openssl rand -base64 32

# Generate JWT secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Environment Files

**Development** - `.env.local`
**Staging** - Vercel Environment Variables (Preview)
**Production** - Vercel Environment Variables (Production)

## Post-Deployment Checklist

- [ ] Database schema applied
- [ ] Seed data loaded
- [ ] Environment variables set
- [ ] SSL certificate active
- [ ] Custom domain configured
- [ ] Analytics tracking active
- [ ] Error monitoring active
- [ ] Backup strategy configured
- [ ] Performance monitoring enabled
- [ ] Security headers configured

## Monitoring Production

### Vercel Dashboard
- View deployments
- Check build logs
- Monitor performance
- View analytics

### Database (Neon)
- Connection pooling
- Query performance
- Storage usage
- Backup status

### Error Tracking
- Check Vercel logs
- Monitor error rates
- Set up alerts

## Rollback Strategy

### Automatic Rollback
Vercel keeps previous deployments available.

1. Go to Deployments
2. Find previous working deployment
3. Click "Promote to Production"

### Manual Rollback
```bash
# Revert git commit
git revert HEAD
git push origin main

# Vercel auto-deploys
```

## Continuous Deployment

Vercel automatically deploys:
- **Main branch** → Production
- **Other branches** → Preview deployments
- **Pull requests** → Preview deployments

## Performance Optimization

### Enable Edge Functions
```javascript
// app/layout.tsx
export const runtime = 'edge'
```

### Enable ISR (Incremental Static Regeneration)
```javascript
export const revalidate = 3600 // 1 hour
```

### Image Optimization
Already configured via Next.js Image component.

## Security Headers

Add to `next.config.mjs`:

```javascript
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  }
]

module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },
}
```

## Backup Strategy

### Database Backups
- Neon automatic daily backups
- Point-in-time recovery available
- Manual backup before major updates

### Code Backups
- Git version control
- GitHub repository
- Multiple deployment snapshots

## Scaling Strategy

### Vertical Scaling
- Upgrade Neon database tier
- Increase connection pool
- Upgrade Vercel plan

### Horizontal Scaling
- Edge functions for global distribution
- Database read replicas
- CDN for static assets

## Support & Troubleshooting

### Common Issues

**Build Failures**
- Check build logs in Vercel
- Verify all dependencies installed
- Check TypeScript errors

**Database Connection**
- Verify DATABASE_URL format
- Check Neon database status
- Verify connection pooling

**Environment Variables**
- Ensure all required variables set
- Check variable names match code
- Verify no trailing spaces

### Getting Help
- Vercel Support: https://vercel.com/support
- Neon Support: https://neon.tech/docs
- Next.js Docs: https://nextjs.org/docs
