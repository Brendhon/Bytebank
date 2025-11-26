import { getToken } from "next-auth/jwt";
import { isAPIRoute, isAuthenticated, isAuthPage, isRootRoute } from "./guards";
import { handleAPIRequest, handleAuthenticatedAuthPageAccess, handleDefaultCase, handleRootRoute, handleUnauthenticatedAccess } from "./handlers";
import { NextRequest, NextResponse } from "next/server";

/**
 * Authentication middleware handler
 * Handles authentication and routing logic for incoming requests.
 * Includes error handling and validation of environment variables.
 * 
 * @param request - The incoming Next.js request
 * @returns The response from the authentication middleware handler
 * @throws Will log errors but return NextResponse.next() as fallback to prevent application breakage
 */
export const authMiddleware = async (request: NextRequest): Promise<NextResponse> => {
  try {
    // Validate environment variable
    if (!process.env.NEXTAUTH_SECRET) {
      console.error('NEXTAUTH_SECRET is not defined');
      // In production, you might want to log to monitoring service
      // For now, allow request to proceed (fail open) to avoid breaking the application
      // In a fail-closed approach, you could redirect to an error page
      return NextResponse.next();
    }

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
    const isRoot = isRootRoute(pathname);
    const hasToken = isAuthenticated(token);

    // Route handling logic
    switch (true) {
      // Handle root route - redirect based on authentication
      case isRoot:
        return handleRootRoute(request, hasToken);

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
  } catch (error) {
    // Log error for debugging and monitoring
    console.error('Middleware error:', error);
    // In case of error, allow request to proceed (fail open)
    // This prevents the middleware from breaking the entire application
    // In a fail-closed approach, you could redirect to an error page based on security requirements
    return NextResponse.next();
  }
}