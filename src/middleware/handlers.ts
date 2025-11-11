import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

/**
 * Handler for API routes - allows them to pass through
 * @param request - The incoming Next.js request
 * @returns NextResponse allowing the request to continue
 */
export const handleAPIRequest = (_request: NextRequest): NextResponse => {
  return NextResponse.next();
};

/**
 * Handler for unauthenticated users trying to access protected routes
 * Redirects to the home/login page
 * @param request - The incoming Next.js request
 * @returns NextResponse with redirect to /home
 */
export const handleUnauthenticatedAccess = (request: NextRequest): NextResponse => {
  return NextResponse.redirect(new URL('/home', request.url));
};

/**
 * Handler for authenticated users trying to access auth pages (home/login)
 * Redirects to the dashboard
 * @param request - The incoming Next.js request
 * @returns NextResponse with redirect to /dashboard
 */
export const handleAuthenticatedAuthPageAccess = (request: NextRequest): NextResponse => {
  return NextResponse.redirect(new URL('/dashboard', request.url));
};

/**
 * Default handler - allows the request to continue
 * @param request - The incoming Next.js request
 * @returns NextResponse allowing the request to continue
 */
export const handleDefaultCase = (_request: NextRequest): NextResponse => {
  return NextResponse.next();
};

