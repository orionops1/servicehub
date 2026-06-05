# 🚨 FIX VERCEL DEPLOYMENT ERROR

**Current Status:** Build failing on Vercel  
**Error:** `Environment variable not found: DATABASE_URL`  
**Location:** Failing at sitemap generation (`/sitemap.xml`)

---

## 🎯 THE PROBLEM

Your Vercel build is failing because the `DATABASE_URL` environment variable is **not configured** in Vercel's dashboard. This is a **required manual step** that must be done through Vercel's web interface.

The error occurs when Next.js tries to pre-render the sitemap during build time - Prisma needs `DATABASE_URL` to initialize its client.

---

## ✅ THE SOLUTION (5 MINUTES)

You need to add environment variables in Vercel's dashboard. This **cannot** be done automatically - you must do this manually.

### Step 1: Create a Neon PostgreSQL Database

1. Go to: **https://neon.tech**
2. Sign up or log in
3. Click **"New Project"**
4. Name it: `servicehub-sri-lanka`
5. Select region: Choose closest to your users (Singapore for Asia)
6. Click **"Create Project"**
7. **COPY** the connection string (looks like this):
   ```
   postgresql://username:password@ep-xxx-xxx.region.aws.neon.tech/neondb?sslmode=require
   ```
8. **SAVE THIS** - you'll need it in Step 2

### Step 2: Generate NextAuth Secret

Open your terminal and run:
```bash
openssl rand -base64 32
```

Copy the output (it will look like: `AbCdEf123456...`)

### Step 3: Add Environment Variables to Vercel

1. Go to: **https://vercel.com/dashboard**
2. Find your project: `servicehub` (or similar name)
3. Click on the project
4. Click **"Settings"** in the top navigation
5. Click **"Environment Variables"** in the left sidebar
6. Add the following THREE variables:

#### Variable 1: DATABASE_URL
- **Key:** `DATABASE_URL`
- **Value:** Paste the connection string from Neon (Step 1)
- **Environment:** Check all boxes (Production, Preview, Development)
- Click **"Save"**

#### Variable 2: NEXTAUTH_SECRET
- **Key:** `NEXTAUTH_SECRET`
- **Value:** Paste the secret from Step 2
- **Environment:** Check all boxes (Production, Preview, Development)
- Click **"Save"**

#### Variable 3: NEXTAUTH_URL
- **Key:** `NEXTAUTH_URL`
- **Value:** Your Vercel deployment URL (e.g., `https://servicehub.vercel.app` or your custom domain)
- **Environment:** Check all boxes (Production, Preview, Development)
- Click **"Save"**

### Step 4: Redeploy

After adding all three environment variables:

**Option A - Through Vercel Dashboard:**
1. Go to **"Deployments"** tab
2. Click the **three dots (...)** on the latest failed deployment
3. Click **"Redeploy"**
4. Wait for build to complete (2-3 minutes)

**Option B - Push a commit:**
```bash
# Make a small change to trigger rebuild
git commit --allow-empty -m "Trigger rebuild with env vars"
git push origin main
```

---

## 📊 VERIFICATION

### Build Should Succeed
After adding the environment variables and redeploying, the build should:
- ✅ Complete successfully (no errors)
- ✅ Generate sitemap at `/sitemap.xml`
- ✅ Deploy to your domain

### Check Deployment Logs
In Vercel dashboard, check the logs. You should see:
```
✓ Generating static pages (10/10)
✓ Finalizing page optimization
```

**No more "Environment variable not found" errors!**

---

## 🗄️ AFTER SUCCESSFUL DEPLOYMENT

Once the build succeeds, you need to initialize your database:

### Step 1: Clone Repository Locally (if not already)
```bash
git clone https://github.com/orionops1/servicehub.git
cd servicehub
```

### Step 2: Create Local `.env` File
```bash
cp .env.example .env
```

Edit `.env` and add the same values from Vercel:
```env
DATABASE_URL="your-neon-connection-string"
NEXTAUTH_SECRET="your-generated-secret"
NEXTAUTH_URL="https://your-vercel-url.vercel.app"
```

### Step 3: Install Dependencies
```bash
npm install
```

### Step 4: Push Database Schema
```bash
npx prisma generate
npx prisma db push
```

This creates all 25 database tables in your Neon database.

### Step 5: Seed the Database
```bash
npm run db:seed
```

This populates your database with:
- ✅ 9 Provinces
- ✅ 25 Districts  
- ✅ 100+ Cities
- ✅ 100+ Service Categories
- ✅ Admin account (`admin@servicehub.lk` / `password123`)
- ✅ Demo customer account

**This takes about 30 seconds to complete.**

---

## 🎉 SUCCESS!

After completing these steps, your application will be:
- ✅ Successfully deployed on Vercel
- ✅ Connected to PostgreSQL database
- ✅ Seeded with location and category data
- ✅ Ready to accept user registrations
- ✅ Fully functional!

---

## 🔐 IMPORTANT: SECURITY

### Change Admin Password Immediately!

After deployment:
1. Visit: `https://your-vercel-url.vercel.app/login`
2. Login with:
   - Email: `admin@servicehub.lk`
   - Password: `password123`
3. Go to your profile settings
4. **Change the password immediately!**

---

## 🐛 TROUBLESHOOTING

### "Environment variable not found: DATABASE_URL"
- **Cause:** Environment variables not added to Vercel
- **Solution:** Follow Step 3 above - add variables in Vercel dashboard

### "Can't reach database server"
- **Cause:** Invalid DATABASE_URL or Neon project suspended
- **Solution:** Check your Neon dashboard, verify connection string has `?sslmode=require`

### "Invalid NEXTAUTH_SECRET"
- **Cause:** Secret too short or not set
- **Solution:** Must be at least 32 characters. Use `openssl rand -base64 32` to generate

### "Build succeeds but site shows errors"
- **Cause:** Database not initialized
- **Solution:** Run `npx prisma db push` and `npm run db:seed` as shown above

### "Can't login after deployment"
- **Cause:** Database not seeded
- **Solution:** Run `npm run db:seed` to create admin account

---

## 📞 QUICK REFERENCE

### Required Environment Variables (Minimum)
```
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=your-32-char-secret
NEXTAUTH_URL=https://your-domain.vercel.app
```

### Database Commands
```bash
npx prisma generate      # Generate Prisma client
npx prisma db push       # Create database tables
npm run db:seed          # Seed with data
npx prisma studio        # Open database GUI (optional)
```

### Git Commands
```bash
git status               # Check changes
git add .                # Stage changes
git commit -m "message"  # Commit changes
git push origin main     # Deploy to Vercel
```

---

## ✅ CHECKLIST

Complete these in order:

- [ ] Create Neon PostgreSQL database
- [ ] Copy connection string
- [ ] Generate NEXTAUTH_SECRET
- [ ] Add DATABASE_URL to Vercel
- [ ] Add NEXTAUTH_SECRET to Vercel
- [ ] Add NEXTAUTH_URL to Vercel
- [ ] Redeploy on Vercel
- [ ] Wait for build to succeed
- [ ] Run `npx prisma db push` locally
- [ ] Run `npm run db:seed` locally
- [ ] Visit deployed site
- [ ] Login as admin
- [ ] Change admin password
- [ ] Test user registration
- [ ] Test provider registration
- [ ] Celebrate! 🎉

---

## 🎯 EXPECTED TIMELINE

- **Create Neon Database:** 2 minutes
- **Generate Secret:** 30 seconds
- **Add to Vercel:** 2 minutes
- **Redeploy & Build:** 3 minutes
- **Database Setup:** 2 minutes
- **Testing:** 3 minutes

**Total: ~12 minutes from start to finish!**

---

## 📖 NEXT STEPS AFTER FIX

Once deployment succeeds:

1. Read: `START_HERE.md` - Quick start guide
2. Read: `LAUNCH_CHECKLIST.md` - Pre-launch tasks
3. Read: `100_PERCENT_COMPLETE.md` - Full feature list
4. Start onboarding providers!

---

**Last Updated:** June 5, 2026  
**Status:** Action Required - Manual Steps  
**Blocker:** Environment Variables Not Set

**LET'S FIX THIS AND GO LIVE! 🚀**
