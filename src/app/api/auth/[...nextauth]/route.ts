import NextAuth from 'next-auth';
import { authOptions } from '@/lib/auth/auth';

/**
 * NextAuth API route handler
 * 
 * This route handler creates a NextAuth instance using the configured authOptions
 * and exports it as both GET and POST handlers for the Next.js App Router.
 * 
 * The catch-all route `[...nextauth]` allows NextAuth to handle all authentication
 * endpoints such as:
 * - /api/auth/signin
 * - /api/auth/signout
 * - /api/auth/callback
 * - /api/auth/session
 * - /api/auth/providers
 * 
 * @see {@link https://next-auth.js.org/configuration/initialization#route-handlers-app}
 */
const handler = NextAuth(authOptions);

/**
 * GET handler for NextAuth endpoints
 * Handles GET requests to NextAuth routes (e.g., /api/auth/session, /api/auth/providers)
 */
export { handler as GET };

/**
 * POST handler for NextAuth endpoints
 * Handles POST requests to NextAuth routes (e.g., /api/auth/signin, /api/auth/signout)
 */
export { handler as POST };
