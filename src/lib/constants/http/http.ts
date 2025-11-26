/**
 * HTTP client constants
 *
 * Centralized constants for HTTP requests including valid methods, default timeout,
 * and error messages. This facilitates maintenance and ensures consistency across
 * the application.
 *
 * @module lib/constants/http
 */

/**
 * Valid HTTP methods supported by the API client
 */
export const VALID_HTTP_METHODS = ['GET', 'POST', 'PUT', 'DELETE'] as const;

/**
 * Default timeout for HTTP requests in milliseconds (30 seconds)
 */
export const DEFAULT_TIMEOUT = 30000;

/**
 * Type for error message formatter functions
 *
 * @template T - Tuple type representing the function parameters
 */
type ErrorMessageFormatter<T extends unknown[] = []> = (...args: T) => string;

/**
 * Error messages for HTTP client operations
 */
export const ERROR_MESSAGES = {
  /** Default error message when no specific error message is available */
  DEFAULT: 'Error performing task, please try again',
  /**
   * Error message for invalid HTTP method
   * @param method - The invalid method that was provided
   * @param validMethods - List of valid HTTP methods
   * @returns Formatted error message
   */
  INVALID_METHOD: ((method: string, validMethods: readonly string[]) =>
    `Invalid HTTP method: ${method}. Must be one of: ${validMethods.join(', ')}`) as ErrorMessageFormatter<
    [string, readonly string[]]
  >,
  /**
   * Error message for invalid URL
   * @param url - The invalid URL that was provided
   * @returns Formatted error message
   */
  INVALID_URL: ((url: string) => `Invalid URL: ${url}`) as ErrorMessageFormatter<[string]>,
  /**
   * Error message for invalid timeout value
   * @param timeout - The invalid timeout value that was provided
   * @returns Formatted error message
   */
  INVALID_TIMEOUT: ((timeout: number) =>
    `Invalid timeout: ${timeout}. Must be a positive number`) as ErrorMessageFormatter<[number]>,
  /**
   * Error message for request timeout
   * @param timeout - The timeout value in milliseconds
   * @returns Formatted error message
   */
  REQUEST_TIMEOUT: ((timeout: number) =>
    `Request timeout after ${timeout}ms`) as ErrorMessageFormatter<[number]>,
} as const;

