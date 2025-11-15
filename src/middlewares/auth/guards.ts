import { API_ROUTES, PAGE_ROUTES } from '@/lib/constants';
import { JWT } from 'next-auth/jwt';

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
  return pathname.startsWith(PAGE_ROUTES.HOME);
};

/**
 * Check if the pathname is an API route
 * @param pathname - The current request pathname
 * @returns true if the pathname is an API route
 */
export const isAPIRoute = (pathname: string): boolean => {
  return pathname.startsWith(API_ROUTES.BASE);
};

/**
 * Check if the user is authenticated
 * @param token - The JWT token from next-auth
 * @returns true if the user has a valid token
 */
export const isAuthenticated = (token: JWT | null): boolean => {
  return !!token;
};

