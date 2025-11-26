import { auth } from '@/lib/auth/auth';
import { PAGE_ROUTES, PROTECTED_ROUTES } from '@/lib/constants';
import { redirect } from 'next/navigation';

/**
 * Root page component that handles initial routing based on authentication state.
 * 
 * This Server Component checks if the user has an active session:
 * - If authenticated: redirects to `/dashboard`
 * - If not authenticated: redirects to `/home`
 * 
 * The redirect is performed server-side for better security and performance.
 * In case of errors during session check, the user is redirected to the home page
 * as a safe fallback.
 * 
 * @returns {Promise<void>} Redirects the user to the appropriate route
 * @throws {Error} May throw if session check fails (should be handled by Next.js)
 */
export default async function RootPage(): Promise<void> {
  try {
    // Get session data server-side
    const session = await auth();

    // Redirect based on authentication state
    session
      ? redirect(PROTECTED_ROUTES.DASHBOARD)
      : redirect(PAGE_ROUTES.HOME);
  } catch (error) {
    // Log error for debugging
    console.error('Error checking session:', error);

    // Fallback: redirect to home page if session check fails
    redirect(PAGE_ROUTES.HOME);
  }
}
