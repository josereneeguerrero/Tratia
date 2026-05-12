# 🎨 Tratia - Beauty Salon Management MVP

A modern, production-ready SaaS platform for beauty salons to manage appointments, services, and client relationships.

**Status**: MVP Ready for Deployment ✅

## 🎯 What is Tratia?

Tratia is a comprehensive salon management system that helps beauty salon owners:
- 📅 **Manage appointments** - Keep track of all bookings with client details
- ✨ **Manage services** - List all services offered with pricing and duration
- 👤 **Manage profiles** - Store salon info and client details
- 📊 **Track metrics** - See weekly revenue, occupancy, and no-shows

## 🏗️ Architecture

### Tech Stack
- **Frontend**: Next.js 16.2.6 (React 19) + Tailwind CSS v4
- **Authentication**: Clerk (Premium) - Pre-built auth UI
- **Database**: Supabase (PostgreSQL) with Row Level Security
- **Hosting**: Vercel (auto-deploy from GitHub)
- **Animations**: Framer Motion
- **Data Fetching**: SWR (stale-while-revalidate)
- **Type Safety**: TypeScript

## 🚀 Quick Start

```bash
npm install
npm run dev
# Visit http://localhost:3000
```

Create `.env.local` with Supabase and Clerk keys (see SETUP_DATABASE.md)

## 📖 Documentation

- **[SETUP_DATABASE.md](./SETUP_DATABASE.md)** - Database setup guide
- **[DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)** - Production deployment

## 🔌 API Endpoints

### Bookings
- `GET /api/bookings` - List bookings
- `POST /api/bookings` - Create booking
- `PUT /api/bookings/[id]` - Update booking
- `DELETE /api/bookings/[id]` - Delete booking

### Services
- `GET /api/services` - List services
- `POST /api/services` - Create service
- `PUT /api/services/[id]` - Update service
- `DELETE /api/services/[id]` - Delete service

### User
- `GET /api/user` - Get profile
- `PUT /api/user` - Update profile

## 🛠️ Built By

Development with Claude Code + Anthropic Claude AI

MVP Ready: All 7 phases complete ✅
