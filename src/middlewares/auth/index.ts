import { getToken } from "next-auth/jwt";
import { isAPIRoute, isAuthenticated, isAuthPage } from "./guards";
import { handleAPIRequest, handleAuthenticatedAuthPageAccess, handleDefaultCase, handleUnauthenticatedAccess } from "./handlers";
import { NextRequest, NextResponse } from "next/server";

/**
 * Authentication middleware handler
 * @param request - The incoming Next.js request
 * @returns The response from the authentication middleware handler
 */
export const authMiddleware = async (request: NextRequest): Promise<NextResponse> => {
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