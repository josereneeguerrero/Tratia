# 🗄️ Tratia Database Setup Guide

## Step 1: Create Supabase Tables

Go to your Supabase dashboard: https://app.supabase.com/

1. Click on your project (Tratia)
2. Go to **SQL Editor** on the left sidebar
3. Click **New Query**
4. Copy and paste the SQL from `supabase/migrations/001_init_tables.sql`
5. Click **Run**

This will create:
- `users` table (user profiles linked to Clerk)
- `bookings` table (salon appointments)
- `services` table (services offered by each salon)
- Indexes for performance
- Row Level Security (RLS) policies

## Step 2: Verify Tables in Supabase UI

After running the SQL:
1. Go to **Table Editor** on the left sidebar
2. You should see three tables:
   - `users`
   - `bookings`
   - `services`

3. Click on each table and verify columns are created correctly

## Step 3: Environment Variables

Make sure these are in your `.env.local`:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://pqkythrkciioklloxais.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key_here
CLERK_SECRET_KEY=your_secret_key_here

# Clerk URLs (these are pre-configured)
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/login
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/signup
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding
```

## Step 4: Test the Setup

1. Start the dev server: `npm run dev`
2. Go to http://localhost:3000
3. Click "Comenzar" or go to `/login`
4. Sign up with Clerk
5. Fill in the onboarding form
6. You should be redirected to `/dashboard`
7. In the dashboard, try:
   - Viewing the bookings page
   - Viewing the services page
   - Creating/editing services

## API Endpoints Available

### Bookings
- `GET /api/bookings` - List all bookings
- `POST /api/bookings` - Create new booking
- `GET /api/bookings/[id]` - Get specific booking
- `PUT /api/bookings/[id]` - Update booking
- `DELETE /api/bookings/[id]` - Delete booking

### Services
- `GET /api/services` - List all services
- `POST /api/services` - Create new service
- `GET /api/services/[id]` - Get specific service
- `PUT /api/services/[id]` - Update service
- `DELETE /api/services/[id]` - Delete service

### User
- `GET /api/user` - Get current user profile
- `PUT /api/user` - Update user profile

## Hooks for Frontend

Use these hooks in your React components:

```typescript
import { useBookings } from '@/hooks/useBookings'
import { useServices } from '@/hooks/useServices'
import { useClerkUser } from '@/hooks/useClerkUser'

function MyComponent() {
  const { bookings, isLoading, createBooking } = useBookings()
  const { services, createService, updateService } = useServices()
  const { userProfile, loading } = useClerkUser()

  // Use these in your component...
}
```

## Row Level Security (RLS)

All tables have RLS enabled, meaning:
- Users can only see their own data
- Users can only modify their own data
- This is enforced at the database level for security

## Troubleshooting

### Tables not showing in Supabase UI?
- Refresh the page
- Check SQL execution output for errors
- Ensure you're logged in and on the correct project

### API calls returning 401?
- Check that user is authenticated (see login/signup flow)
- Verify Clerk configuration in environment variables
- Check that `.env.local` is loaded

### RLS errors?
- These are normal - they mean the database is protecting user data
- Make sure you're authenticated before making API calls
- Use the provided hooks which handle auth automatically

## Next Steps

1. ✅ Database tables created
2. ✅ APIs working
3. ⏭️ Connect dashboard pages to real API data (FASE 5)
4. ⏭️ Create forms for adding/editing bookings and services
5. ⏭️ Deploy to Vercel
