import { getToken } from 'next-auth/jwt';
import { NextRequest } from 'next/server';
import { isAPIRoute, isAuthenticated, isAuthPage } from './middlewares/auth/guards';
import { handleAPIRequest, handleAuthenticatedAuthPageAccess, handleDefaultCase, handleUnauthenticatedAccess } from './middlewares/auth/handlers';

export async function middleware(request: NextRequest) {
  // Get the token from the request
  const token = await getToken({ 
    req: request, 
    secret: process.env.NEXTAUTH_SECRET 
  });

  // Get path from the request
  const { pathname } = request.nextUrl;

  // Check route types
  const isAPI = isAPIRoute(pathname);
  const isAuth = isAuthPage(pathname);
  const hasToken = isAuthenticated(token);

  // Route handling logic
  switch (true) {
    // Allow API requests to pass through
    case isAPI:
      return handleAPIRequest(request);

    // Redirect unauthenticated users to home/login
    case !hasToken && !isAuth:
      return handleUnauthenticatedAccess(request);

    // Redirect authenticated users away from auth pages to dashboard
    case hasToken && isAuth:
      return handleAuthenticatedAuthPageAccess(request);

    // Default: allow request to continue
    default:
      return handleDefaultCase(request);
  } 
}

/**
 * Configuration for the middleware
 */
export const config = {
  matcher: ['/((?!_next|.*\\..*).*)'] // Exclude /_next and files with extension
};