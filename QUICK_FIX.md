# ⚡ QUICK FIX - 3 Steps to Deploy

**Your build is failing because environment variables are not set in Vercel.**

---

## 🎯 DO THIS NOW (12 minutes)

### Step 1: Get Database URL (2 min)
1. Go to https://neon.tech
2. Create account / Login
3. Click "New Project"
4. **Copy the connection string** it shows you
   - Looks like: `postgresql://user:pass@ep-xxx.region.aws.neon.tech/neondb?sslmode=require`

### Step 2: Get NextAuth Secret (30 sec)
Run this in your terminal:
```bash
openssl rand -base64 32
```
**Copy the output**

### Step 3: Add to Vercel (2 min)
1. Go to https://vercel.com/dashboard
2. Click your project
3. Click "Settings" → "Environment Variables"
4. Add these THREE variables:

```
Key: DATABASE_URL
Value: [paste from Step 1]
Environment: ✅ Production ✅ Preview ✅ Development

Key: NEXTAUTH_SECRET  
Value: [paste from Step 2]
Environment: ✅ Production ✅ Preview ✅ Development

Key: NEXTAUTH_URL
Value: https://your-project-name.vercel.app
Environment: ✅ Production ✅ Preview ✅ Development
```

### Step 4: Redeploy (3 min)
1. Go to "Deployments" tab
2. Click **three dots (...)** on latest deployment
3. Click **"Redeploy"**
4. Wait for build to complete ✅

---

## ✅ Build Will Succeed!

Once you add those 3 environment variables and redeploy, the build will succeed.

---

## 🗄️ Then Initialize Database (5 min)

After successful deployment, run locally:

```bash
# Install dependencies
npm install

# Create .env file with same variables
cp .env.example .env
# Edit .env and add the same 3 variables

# Setup database
npx prisma generate
npx prisma db push
npm run db:seed
```

**Done! Your platform is live! 🎉**

---

## 🔑 Login After Deploy

Visit: `https://your-url.vercel.app/login`

**Admin:**
- Email: `admin@servicehub.lk`
- Password: `password123`
- ⚠️ **CHANGE THIS PASSWORD IMMEDIATELY!**

---

## ❓ Still Having Issues?

Read the detailed guide: **`FIX_VERCEL_DEPLOYMENT.md`**

---

**Let's go live! 🚀**
