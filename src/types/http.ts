/**
 * HTTP client types
 *
 * Type definitions for HTTP request operations including method types,
 * error types, and cancellable request interfaces.
 *
 * @module types/http
 */

import type { VALID_HTTP_METHODS } from '@/lib/constants/http/http';

/**
 * Valid HTTP method type derived from VALID_HTTP_METHODS constant
 */
export type HttpMethod = (typeof VALID_HTTP_METHODS)[number];

/**
 * HTTP Error class with status code support
 * 
 * Provides a standardized way to create and handle HTTP errors with status codes.
 * Used across the application (both backend API routes and frontend services) for
 * consistent error handling.
 * 
 * @example
 * ```typescript
 * // Create a 404 error
 * throw new HttpError('User not found', 404);
 * 
 * // Using factory methods (recommended)
 * throw HttpError.notFound('User not found');
 * throw HttpError.forbidden('Access denied');
 * throw HttpError.badRequest('Invalid input');
 * ```
 */
export class HttpError extends Error {
  /** HTTP status code */
  public readonly status: number;

  /**
   * Creates a new HttpError instance
   * @param message - Error message
   * @param status - HTTP status code (default: 500)
   */
  constructor(message: string, status: number = 500) {
    super(message);
    this.name = 'HttpError';
    this.status = status;

    // Maintains proper stack trace for where error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, HttpError);
    }
  }

  /**
   * Creates a 400 Bad Request error
   * @param message - Error message (default: 'Bad Request')
   * @returns HttpError instance with status 400
   */
  static badRequest(message: string = 'Bad Request'): HttpError {
    return new HttpError(message, 400);
  }

  /**
   * Creates a 401 Unauthorized error
   * @param message - Error message (default: 'Unauthorized')
   * @returns HttpError instance with status 401
   */
  static unauthorized(message: string = 'Unauthorized'): HttpError {
    return new HttpError(message, 401);
  }

  /**
   * Creates a 403 Forbidden error
   * @param message - Error message (default: 'Forbidden')
   * @returns HttpError instance with status 403
   */
  static forbidden(message: string = 'Forbidden'): HttpError {
    return new HttpError(message, 403);
  }

  /**
   * Creates a 404 Not Found error
   * @param message - Error message (default: 'Not Found')
   * @returns HttpError instance with status 404
   */
  static notFound(message: string = 'Not Found'): HttpError {
    return new HttpError(message, 404);
  }

  /**
   * Creates a 409 Conflict error
   * @param message - Error message (default: 'Conflict')
   * @returns HttpError instance with status 409
   */
  static conflict(message: string = 'Conflict'): HttpError {
    return new HttpError(message, 409);
  }

  /**
   * Creates a 500 Internal Server Error
   * @param message - Error message (default: 'Internal Server Error')
   * @returns HttpError instance with status 500
   */
  static internal(message: string = 'Internal Server Error'): HttpError {
    return new HttpError(message, 500);
  }
}

/**
 * Result object for cancellable HTTP requests
 *
 * @template T - The expected response type
 */
export interface CancellableRequest<T> {
  /**
   * Promise that resolves with the response data
   */
  promise: Promise<T>;
  /**
   * Cancels the ongoing request
   */
  cancel: () => void;
}

