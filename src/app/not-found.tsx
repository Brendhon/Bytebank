import { redirect } from 'next/navigation';
import { PAGE_ROUTES } from '@/lib/constants';

/**
 * Not found page component that handles 404 errors.
 * 
 * This Server Component redirects users to the custom 404 page
 * when a route is not found. The redirect is performed server-side
 * for better performance and SEO.
 * 
 * @returns {Promise<void>} Redirects the user to the 404 page
 * @throws {Error} May throw if redirect fails (should be handled by Next.js)
 */
export default async function NotFoundPage(): Promise<void> {
  redirect(PAGE_ROUTES.NOT_FOUND);
}
