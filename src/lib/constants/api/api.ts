/**
 * API utility constants
 *
 * Centralized constants for API utility functions including error messages
 * and success messages. This facilitates maintenance and ensures consistency
 * across the application.
 *
 * @module lib/constants/api
 */

/**
 * API response messages for utility functions
 */
export const API_MESSAGES = {
  /** Default message when a resource is not found */
  RESOURCE_NOT_FOUND: 'Resource not found',
  /** Message for unauthorized access */
  UNAUTHORIZED: 'Unauthorized',
  /** Message for forbidden access */
  FORBIDDEN: 'Forbidden',
  /** Message when user ID is required but not provided */
  USER_ID_REQUIRED: 'userId is required',
  /** Default error message when no specific error message is available */
  DEFAULT_ERROR: 'An error occurred while processing the request',
} as const;

