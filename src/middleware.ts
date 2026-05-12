import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isPublicRoute = createRouteMatcher([
  '/',
  '/login(.*)',
  '/signup(.*)',
  '/onboarding(.*)',
])

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)'])

export default clerkMiddleware(async (auth, req) => {
  // Si es ruta protegida y no está autenticado, redirigir a login
  if (isProtectedRoute(req)) {
    await auth.protect()
  }

  // Si está autenticado y trata de acceder a login/signup, redirigir a dashboard
  if ((req.nextUrl.pathname === '/login' || req.nextUrl.pathname === '/signup') && (await auth()).userId) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}
