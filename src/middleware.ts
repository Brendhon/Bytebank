import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  const isAuthPage = request.nextUrl.pathname.startsWith('/home');
  const isAPI = request.nextUrl.pathname.startsWith('/api');

  // Allow the request to proceed if it's an API route
  if (isAPI) return NextResponse.next();

  // Redirect unauthenticated users to the home page unless they're already there
  if (!token && !isAuthPage) {
    return NextResponse.redirect(new URL('/home', request.url));
  }

  // Redirect authenticated users away from the auth page to the dashboard
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Proceed with the request as intended
  return NextResponse.next();
}

/**
 * Configuration for the middleware
 */
export const config = {
  matcher: ['/((?!_next|.*\\..*).*)'] // Exclude /_next and files with extension
};

