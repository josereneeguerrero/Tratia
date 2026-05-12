# 🚀 Tratia Deployment Checklist - PHASE 6

## Pre-Deployment: Database Setup

### Step 1: Create Tables in Supabase ⚠️ CRITICAL
- [ ] Go to https://app.supabase.com
- [ ] Select your Tratia project
- [ ] Go to **SQL Editor**
- [ ] Create a **New Query**
- [ ] Copy SQL from `supabase/migrations/001_init_tables.sql`
- [ ] Click **Run** to create tables
- [ ] Verify tables appear in **Table Editor**: users, bookings, services

### Step 2: Verify Environment Variables

**In `.env.local` (already configured for dev):**
```env
NEXT_PUBLIC_SUPABASE_URL=https://pqkythrkciioklloxais.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
CLERK_SECRET_KEY=sk_live_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/login
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/signup
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding
```

**Get keys if missing:**
- Supabase keys: https://app.supabase.com → Settings → API
- Clerk keys: https://dashboard.clerk.com → API Keys

## Deployment Steps

### Step 3: Push to GitHub
```bash
git add .
git commit -m "Deploy PHASE 6: Complete Tratia MVP with APIs and dashboard"
git push origin main
```

### Step 4: Deploy to Vercel
**Option A: Via Vercel Dashboard (Recommended)**
1. Go to https://vercel.com/dashboard
2. Click **Add New...** → **Project**
3. Select your GitHub repository (tratia-web)
4. Click **Import**
5. Configure Project:
   - **Framework**: Next.js ✓ (auto-detected)
   - **Environment Variables**: Add all from below
6. Click **Deploy**

**Option B: Via Vercel CLI**
```bash
npm install -g vercel
vercel login
vercel
# Follow prompts and select GitHub repo
```

### Step 5: Add Environment Variables in Vercel

In Vercel Dashboard → Project Settings → Environment Variables:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://pqkythrkciioklloxais.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
CLERK_SECRET_KEY=sk_live_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/login
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/signup
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding
```

✅ Check each variable is set for **Production** environment

### Step 6: Configure Clerk for Vercel Domain

1. Go to https://dashboard.clerk.com
2. Select your application
3. Go to **Settings → Domains**
4. Add your Vercel domain:
   - Format: `https://tratia-abc123.vercel.app`
   - Copy from Vercel dashboard
5. Update OAuth redirect URIs if needed

### Step 7: Verify Deployment

After Vercel deployment completes:

- [ ] Visit your Vercel URL (e.g., https://tratia-abc123.vercel.app)
- [ ] Page loads without errors
- [ ] Click "Comenzar" or go to `/login`
- [ ] Sign up with Clerk works
- [ ] Onboarding form submits
- [ ] Dashboard loads with navigation
- [ ] Try creating a service
- [ ] Settings page loads and saves work

## Testing the Full Flow in Production

1. **Sign Up Flow:**
   - [ ] Go to `/login` → Click "Regístrate"
   - [ ] Fill in email/password
   - [ ] Verify email (check Clerk dashboard)
   - [ ] Redirected to `/onboarding`
   - [ ] Fill in salon name and phone
   - [ ] Submit → Redirected to `/dashboard`

2. **Dashboard:**
   - [ ] See KPI cards (may show 0 initially)
   - [ ] Click "Citas" → Bookings page loads
   - [ ] Click "Servicios" → Services page loads
   - [ ] Click "Configuración" → Settings loads

3. **Create Service:**
   - [ ] Go to Services page
   - [ ] Click "+ Nuevo servicio"
   - [ ] Fill in name, duration, price
   - [ ] Click "Guardar"
   - [ ] Service appears in list

4. **Update Service:**
   - [ ] Click ⚙️ on a service
   - [ ] Edit fields
   - [ ] Click "Guardar"
   - [ ] Verify it updates

## Troubleshooting Production Issues

### Issue: 401 Unauthorized errors
- **Cause**: Environment variables not set in Vercel
- **Fix**: Double-check all env vars in Vercel dashboard match `.env.local`

### Issue: Blank dashboard (no KPI data)
- **Cause**: Probably normal - mock data shown for demo
- **Fix**: Create test data by creating services/bookings in app

### Issue: Can't sign up / "Invalid Client"
- **Cause**: Clerk domain not configured for Vercel URL
- **Fix**: Add Vercel domain to Clerk Settings → Domains

### Issue: Database connection failed
- **Cause**: Tables not created or SUPABASE_SERVICE_ROLE_KEY wrong
- **Fix**: 
  1. Verify SQL migration ran successfully
  2. Check that service role key is correct (not anon key)

## Post-Deployment

### Update DNS (Optional but Recommended)
To use a custom domain instead of `vercel.app`:

1. In Vercel → Project Settings → Domains
2. Add your custom domain (e.g., `tratia.com`)
3. Update your domain DNS records to point to Vercel
4. Update Clerk allowed domains

### Monitoring & Analytics
1. Set up Vercel Analytics: Vercel Dashboard → Analytics
2. Monitor logs: Vercel Dashboard → Functions
3. Set up Supabase monitoring: Supabase → Monitoring

### Next: PHASE 7 (Testing & Polish)
- [ ] Write unit tests for hooks
- [ ] Write E2E tests with Playwright
- [ ] Performance optimization
- [ ] Security audit
- [ ] Final design review

## Success Criteria ✨

Your deployment is successful when:

- ✅ App loads at Vercel URL without errors
- ✅ Clerk authentication works (sign up/login)
- ✅ User profile saves in Supabase
- ✅ Dashboard loads with user data
- ✅ Can create/edit services
- ✅ Can create/edit bookings
- ✅ Settings page loads and updates work
- ✅ All API endpoints respond (check Network tab in DevTools)
- ✅ No 401/403 errors in production
- ✅ Database RLS policies enforce user data isolation

## Support

If you encounter issues during deployment:
1. Check Vercel build logs
2. Check Vercel function logs
3. Check browser console (F12)
4. Check Supabase error logs
5. Check Clerk logs

---

**Estimated Time**: 30 minutes to 1 hour

**Ready to deploy?** Follow the steps above! 🚀
