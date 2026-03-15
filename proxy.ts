import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Proxy function for handling route protection and authentication redirects.
 * In Next.js 16, this replaces the traditional middleware.ts.
 */
export default function proxy(request: NextRequest) {
  const token = request.cookies.get('access_token')?.value
  const { pathname } = request.nextUrl

  // Define protected routes (require authentication)
  const isDashboardRoute = pathname.startsWith('/dashboard')
  
  // Define auth routes (require non-authentication)
  const isAuthRoute = pathname.startsWith('/login') || pathname.startsWith('/register')

  // 1. Protect (dashboard) from non-authenticated users
  if (isDashboardRoute && !token) {
    const loginUrl = new URL('/login', request.url)
    // Optional: add a callback URL to redirect back after login
    // loginUrl.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // 2. Protect (auth) from authenticated users
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

// Optimization: Only run proxy on relevant routes
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
