import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { PAGE_ROUTES, PROTECTED_ROUTES } from '@/lib/constants';

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
 * @returns NextResponse with redirect to /home, or NextResponse.next() if redirect fails
 */
export const handleUnauthenticatedAccess = (request: NextRequest): NextResponse => {
  try {
    return NextResponse.redirect(new URL(PAGE_ROUTES.HOME, request.url));
  } catch (error) {
    console.error('Error creating redirect URL in handleUnauthenticatedAccess:', error);
    // Fallback: return next to avoid breaking the application
    return NextResponse.next();
  }
};

/**
 * Handler for authenticated users trying to access auth pages (home/login)
 * Redirects to the dashboard
 * @param request - The incoming Next.js request
 * @returns NextResponse with redirect to /dashboard, or NextResponse.next() if redirect fails
 */
export const handleAuthenticatedAuthPageAccess = (request: NextRequest): NextResponse => {
  try {
    return NextResponse.redirect(new URL(PROTECTED_ROUTES.DASHBOARD, request.url));
  } catch (error) {
    console.error('Error creating redirect URL in handleAuthenticatedAuthPageAccess:', error);
    // Fallback: return next to avoid breaking the application
    return NextResponse.next();
  }
};

/**
 * Default handler - allows the request to continue
 * @param request - The incoming Next.js request
 * @returns NextResponse allowing the request to continue
 */
export const handleDefaultCase = (_request: NextRequest): NextResponse => {
  return NextResponse.next();
};

