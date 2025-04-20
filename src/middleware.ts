import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // Get the token from the request
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  // Get path from the request
  const { pathname } = request.nextUrl;

  // Check if the request is for a a
  const isAuthPage = pathname.startsWith('/home');
  const isAPI = pathname.startsWith('/api');

  switch (true) {
    // Check if the request is an internal API request
    case isAPI:
      return NextResponse.next();

    // Check if the user is authenticated and trying to access the login page
    case !token && !isAuthPage:
      return NextResponse.redirect(new URL('/home', request.url));

    // Check if the user is authenticated and trying to access the dashboard page
    case token && isAuthPage:
      return NextResponse.redirect(new URL('/dashboard', request.url));

    // Check if the user is authenticated and trying to access the login page
    default:
      return NextResponse.next();
  }
}

/**
 * Configuration for the middleware
 */
export const config = {
  matcher: ['/((?!_next|.*\\..*).*)'] // Exclude /_next and files with extension
};

