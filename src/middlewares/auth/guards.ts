/**
 * Route guard utilities for middleware
 * Contains functions to identify different types of routes
 */

/**
 * Check if the pathname is an authentication page (home/login)
 * @param pathname - The current request pathname
 * @returns true if the pathname is an auth page
 */
export const isAuthPage = (pathname: string): boolean => {
  return pathname.startsWith('/home');
};

/**
 * Check if the pathname is an API route
 * @param pathname - The current request pathname
 * @returns true if the pathname is an API route
 */
export const isAPIRoute = (pathname: string): boolean => {
  return pathname.startsWith('/api');
};

/**
 * Check if the user is authenticated
 * @param token - The JWT token from next-auth
 * @returns true if the user has a valid token
 */
export const isAuthenticated = (token: unknown): boolean => {
  return !!token;
};

