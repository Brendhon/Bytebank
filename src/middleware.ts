import { NextRequest, NextResponse } from 'next/server';
import { authMiddleware } from './middlewares/auth';

/**
 * Middleware handler
 * @param request - The incoming Next.js request
 * @returns The response from the middleware handler
 */
export const middleware = async (request: NextRequest): Promise<NextResponse> => authMiddleware(request);

/**
 * Middleware configuration
 * @returns The configuration for the middleware
 */
export const config = {
  matcher: ['/((?!_next|.*\\..*).*)'] // Exclude /_next and files with extension
};