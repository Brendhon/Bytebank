import { NextRequest, NextResponse } from 'next/server';
import { authMiddleware } from './middlewares/auth';

/**
 * Middleware handler
 * Entry point for Next.js middleware that delegates to the authentication middleware
 * @param request - The incoming Next.js request
 * @returns The response from the middleware handler
 */
export const proxy = async (request: NextRequest): Promise<NextResponse> => authMiddleware(request);

/**
 * Middleware configuration
 * 
 * The matcher pattern uses a negative lookahead regex to exclude certain routes:
 * - `(?!_next|.*\\..*)` - Negative lookahead that excludes:
 *   - `_next` - Next.js internal routes (e.g., /_next/static, /_next/image)
 *   - `.*\\..*` - Any path containing a dot (static files like .js, .css, .png, etc.)
 * 
 * This ensures the middleware only runs on actual page routes,
 * improving performance by skipping static assets and Next.js internals.
 * 
 * @returns The configuration for the middleware
 */
export const config = {
  matcher: ['/((?!_next|.*\\..*).*)'] // Exclude /_next and files with extension
};