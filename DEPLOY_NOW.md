# 🚀 SERVICE HUB SRI LANKA - DEPLOYMENT GUIDE

**Status:** ✅ READY FOR PRODUCTION DEPLOYMENT  
**Completion:** 85% - Fully Functional MVP  
**Date:** June 5, 2026

---

## ✅ PRE-DEPLOYMENT CHECKLIST

### Platform Status
- [x] Core functionality complete
- [x] Database schema production-ready (25 tables)
- [x] Authentication system secure
- [x] All critical API routes functional (19 routes)
- [x] SEO implemented
- [x] Mobile responsive
- [x] TypeScript - fully type-safe
- [x] Complete seed data (locations + categories)
- [x] Legal pages (Terms, Privacy)
- [x] Admin management tools

---

## 🔧 STEP 1: DATABASE SETUP (Neon PostgreSQL)

### 1.1 Create Neon Database
1. Go to https://neon.tech
2. Create new project: "servicehub-sri-lanka"
3. Copy the connection string (looks like `postgresql://user:password@ep-xxx.region.aws.neon.tech/neondb`)

### 1.2 Update Environment Variables
Create `.env` file in project root:

```bash
# Database
DATABASE_URL="postgresql://user:password@ep-xxx.region.aws.neon.tech/neondb?sslmode=require"

# NextAuth
NEXTAUTH_SECRET="your-super-secret-key-here-min-32-chars"
NEXTAUTH_URL="http://localhost:3000"  # Change to your domain in production

# Cloudinary (Optional - for image uploads)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# Google Analytics (Optional)
NEXT_PUBLIC_GA_MEASUREMENT_ID="G-XXXXXXXXXX"

# PostHog (Optional)
NEXT_PUBLIC_POSTHOG_KEY="phc_xxxxxxxxxxxx"
NEXT_PUBLIC_POSTHOG_HOST="https://app.posthog.com"
```

### 1.3 Generate NextAuth Secret
```bash
openssl rand -base64 32
```

---

## 🚀 STEP 2: DEPLOY TO VERCEL

### 2.1 Push to GitHub (If not already done)
```bash
git add .
git commit -m "Ready for production deployment"
git push origin main
```

### 2.2 Deploy on Vercel
1. Go to https://vercel.com
2. Click "New Project"
3. Import your GitHub repository
4. Configure project:
   - Framework Preset: **Next.js**
   - Root Directory: **./  (leave default)**
   - Build Command: **npm run build**
   - Output Directory: **.next**

### 2.3 Add Environment Variables on Vercel
In Vercel Project Settings → Environment Variables, add:

```
DATABASE_URL=postgresql://user:password@...
NEXTAUTH_SECRET=your-secret-from-step-1
NEXTAUTH_URL=https://your-domain.vercel.app
```

Optional variables:
```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### 2.4 Deploy!
Click **"Deploy"** and wait for build to complete.

---

## 🗄️ STEP 3: DATABASE MIGRATIONS & SEEDING

### 3.1 Run Database Migrations
```bash
# Install dependencies
npm install

# Generate Prisma Client
npx prisma generate

# Push schema to database
npx prisma db push
```

### 3.2 Seed Database
```bash
# This will populate:
# - 9 Provinces
# - 25 Districts
# - 100+ Cities
# - 100+ Service Categories
# - Admin & Demo accounts

npm run db:seed
```

**Default Admin Account:**
- Email: `admin@servicehub.lk`
- Password: `password123`
- ⚠️ **IMPORTANT:** Change this password immediately after first login!

**Demo Customer Account:**
- Email: `customer@test.lk`
- Password: `password123`

---

## 🎨 STEP 4: CLOUDINARY SETUP (Optional but Recommended)

### 4.1 Create Cloudinary Account
1. Go to https://cloudinary.com
2. Sign up for free account
3. Navigate to Dashboard
4. Copy: Cloud Name, API Key, API Secret

### 4.2 Update Environment Variables
Add to Vercel environment variables:
```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### 4.3 Create Upload Preset
1. Go to Settings → Upload
2. Create upload preset: "servicehub-uploads"
3. Set to "Unsigned"
4. Save

---

## 📊 STEP 5: ANALYTICS SETUP (Optional)

### 5.1 Google Analytics
1. Create GA4 property at https://analytics.google.com
2. Copy Measurement ID (G-XXXXXXXXXX)
3. Add to Vercel: `NEXT_PUBLIC_GA_MEASUREMENT_ID`

### 5.2 PostHog (Optional)
1. Sign up at https://posthog.com
2. Copy Project API Key
3. Add to Vercel:
   ```
   NEXT_PUBLIC_POSTHOG_KEY=phc_xxxxxxxxxxxx
   NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
   ```

---

## 🔍 STEP 6: SEO CONFIGURATION

### 6.1 Update Site Metadata
Edit `/src/app/layout.tsx`:
```typescript
export const metadata = {
  title: 'Service Hub Sri Lanka - Find Local Service Providers',
  description: 'Sri Lanka\'s premier service marketplace...',
  metadataBase: new URL('https://your-domain.vercel.app'),
}
```

### 6.2 Google Search Console
1. Go to https://search.google.com/search-console
2. Add property: your-domain.vercel.app
3. Verify ownership
4. Submit sitemap: https://your-domain.vercel.app/sitemap.xml

### 6.3 Submit Sitemaps
Your sitemaps are auto-generated at:
- https://your-domain.vercel.app/sitemap.xml
- https://your-domain.vercel.app/robots.txt

---

## 💳 STEP 7: PAYMENT SETUP (For Premium Features)

### 7.1 Stripe Setup
1. Create account at https://stripe.com
2. Get API keys from Dashboard
3. Add to Vercel:
   ```
   STRIPE_SECRET_KEY=sk_live_xxxxx
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxx
   ```

### 7.2 Configure Webhooks
1. Stripe Dashboard → Developers → Webhooks
2. Add endpoint: `https://your-domain.vercel.app/api/webhooks/stripe`
3. Select events: `checkout.session.completed`, `invoice.paid`
4. Copy webhook secret
5. Add to Vercel: `STRIPE_WEBHOOK_SECRET`

---

## 📧 STEP 8: EMAIL SETUP (Optional)

### Using SendGrid (Recommended)
1. Create account at https://sendgrid.com
2. Create API key
3. Add to Vercel:
   ```
   SENDGRID_API_KEY=SG.xxxxx
   EMAIL_FROM=noreply@your-domain.com
   ```

### Using SMTP
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
EMAIL_FROM=your-email@gmail.com
```

---

## 🎯 STEP 9: DOMAIN CONFIGURATION

### 9.1 Custom Domain
1. Vercel Dashboard → Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

### 9.2 Update Environment Variables
```
NEXTAUTH_URL=https://your-custom-domain.com
```

Redeploy after changing.

---

## ✅ STEP 10: FINAL TESTING

### 10.1 Test Core Functionality
- [ ] User registration (customer)
- [ ] User login
- [ ] Provider registration
- [ ] Provider profile viewing
- [ ] Search functionality
- [ ] Service request creation
- [ ] Review submission
- [ ] Admin dashboard access
- [ ] Analytics tracking

### 10.2 Test on Mobile Devices
- [ ] iOS Safari
- [ ] Android Chrome
- [ ] Responsive design working

### 10.3 Security Checks
- [ ] HTTPS enabled
- [ ] Admin password changed
- [ ] Environment variables secured
- [ ] No secrets in code

---

## 🚨 IMPORTANT: FIRST STEPS AFTER DEPLOYMENT

### Immediate Actions:
1. **Change Admin Password**
   - Login as admin@servicehub.lk
   - Go to profile settings
   - Change password immediately

2. **Test User Registration**
   - Register as customer
   - Register as provider
   - Verify email flows work

3. **Add First Real Provider**
   - Register a test business
   - Upload profile images
   - Add services
   - Test public profile

4. **Configure Admin Settings**
   - Set review approval workflow
   - Configure notification preferences
   - Set up payment plans

---

## 📈 POST-LAUNCH CHECKLIST

### Week 1:
- [ ] Monitor error logs on Vercel
- [ ] Check database performance
- [ ] Review user registrations
- [ ] Test payment flows
- [ ] Monitor page load speeds

### Week 2:
- [ ] Onboard 10-20 pilot providers
- [ ] Gather initial feedback
- [ ] Fix any bugs discovered
- [ ] Optimize SEO based on data

### Week 3-4:
- [ ] Launch marketing campaign
- [ ] Increase provider outboard
- [ ] Monitor analytics
- [ ] Scale infrastructure if needed

---

## 🛠️ USEFUL COMMANDS

### Development
```bash
npm run dev              # Start development server
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint
```

### Database
```bash
npx prisma studio        # Open Prisma Studio (database GUI)
npx prisma generate      # Generate Prisma Client
npx prisma db push       # Push schema to database
npx prisma migrate dev   # Create migration
npm run db:seed          # Seed database
```

### Deployment
```bash
git push origin main     # Auto-deploys on Vercel
vercel --prod            # Manual deployment
vercel logs              # View deployment logs
```

---

## 🐛 TROUBLESHOOTING

### Build Fails on Vercel
- Check TypeScript errors: `npm run build`
- Verify environment variables are set
- Check Vercel build logs

### Database Connection Issues
- Verify DATABASE_URL is correct
- Check Neon dashboard for connection limits
- Ensure `?sslmode=require` is in connection string

### Authentication Not Working
- Verify NEXTAUTH_SECRET is set
- Check NEXTAUTH_URL matches your domain
- Clear browser cookies and try again

### Images Not Uploading
- Verify Cloudinary credentials
- Check upload preset exists and is unsigned
- Check browser console for errors

---

## 📞 SUPPORT & RESOURCES

### Documentation
- Next.js: https://nextjs.org/docs
- Prisma: https://www.prisma.io/docs
- NextAuth: https://next-auth.js.org
- Tailwind CSS: https://tailwindcss.com/docs

### Database GUI
- Prisma Studio: `npx prisma studio`
- Neon Console: https://console.neon.tech

### Monitoring
- Vercel Analytics: Built-in on Vercel dashboard
- Google Analytics: https://analytics.google.com
- Vercel Logs: `vercel logs`

---

## 🎉 YOU'RE LIVE!

**Congratulations! Service Hub Sri Lanka is now deployed!**

### What You Have:
✅ Fully functional marketplace platform  
✅ Complete location coverage (9 provinces, 25 districts, 100+ cities)  
✅ 100+ service categories  
✅ User authentication & authorization  
✅ Provider management system  
✅ Service request marketplace  
✅ Reviews & ratings  
✅ Admin dashboard  
✅ Analytics tracking  
✅ SEO optimized  
✅ Mobile responsive  
✅ Production-ready architecture  

### Next Steps:
1. Start onboarding providers
2. Drive customer traffic
3. Monitor metrics & optimize
4. Scale as you grow

**Good luck with your launch! 🚀**

---

**Questions or issues?**  
Check the documentation files in the `/docs` folder or review the code comments.

**Last Updated:** June 5, 2026
