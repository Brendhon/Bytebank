/**
 * Application route constants
 * 
 * Centralized route definitions to facilitate maintenance and avoid hardcoded routes.
 * Routes are organized by category (pages and API) for better organization and type safety.
 * 
 * @module lib/constants/routes
 */

/**
 * Public page routes (accessible without authentication)
 */
export const PAGE_ROUTES = {
  /** Home page - landing page for unauthenticated users */
  HOME: '/home',
  /** 404 error page */
  NOT_FOUND: '/404',
} as const;

/**
 * Protected page routes (require authentication)
 */
export const PROTECTED_ROUTES = {
  /** Dashboard - main user dashboard */
  DASHBOARD: '/dashboard',
  /** Transactions - transaction management page */
  TRANSACTIONS: '/transactions',
  /** Cards - credit cards management page */
  CARDS: '/cards',
  /** Settings - user settings page */
  SETTINGS: '/settings',
} as const;

/**
 * API route endpoints
 */
export const API_ROUTES = {
  /** API base prefix */
  BASE: '/api',
  
  /** Authentication endpoints */
  AUTH: {
    /** NextAuth authentication endpoint (catch-all) */
    NEXTAUTH: '/api/auth/[...nextauth]',
  },
  
  /** Transaction endpoints */
  TRANSACTIONS: {
    /** Base transactions endpoint */
    BASE: '/api/transactions',
    /**
     * Creates a dynamic route URL for a transaction by ID.
     * 
     * @param {string} id - The transaction ID (must be a non-empty string)
     * @returns {string} The complete API route URL for the transaction
     * @throws {Error} If id is empty or invalid
     * 
     * @example
     * const route = API_ROUTES.TRANSACTIONS.BY_ID('507f1f77bcf86cd799439011');
     * // Returns: '/api/transactions/507f1f77bcf86cd799439011'
     */
    BY_ID: (id: string): string => {
      if (!id || typeof id !== 'string' || id.trim() === '') {
        throw new Error('Transaction ID must be a non-empty string');
      }
      return `/api/transactions/${id}`;
    },
    /** Transaction summary endpoint */
    SUMMARY: '/api/transactions/summary',
  },
  
  /** User endpoints */
  USERS: {
    /** Base users endpoint */
    BASE: '/api/users',
    /**
     * Creates a dynamic route URL for a user by email.
     * 
     * @param {string} email - The user email address (must be a non-empty string)
     * @returns {string} The complete API route URL for the user
     * @throws {Error} If email is empty or invalid
     * 
     * @example
     * const route = API_ROUTES.USERS.BY_EMAIL('user@example.com');
     * // Returns: '/api/users/user@example.com'
     */
    BY_EMAIL: (email: string): string => {
      if (!email || typeof email !== 'string' || email.trim() === '') {
        throw new Error('User email must be a non-empty string');
      }
      return `/api/users/${email}`;
    },
  },
} as const;

/**
 * All page routes combined (public + protected)
 */
export const ALL_PAGE_ROUTES = {
  ...PAGE_ROUTES,
  ...PROTECTED_ROUTES,
} as const;

/**
 * Type definitions for route values
 */
export type PageRoute = typeof PAGE_ROUTES[keyof typeof PAGE_ROUTES];
export type ProtectedRoute = typeof PROTECTED_ROUTES[keyof typeof PROTECTED_ROUTES];
export type AllPageRoute = typeof ALL_PAGE_ROUTES[keyof typeof ALL_PAGE_ROUTES];

