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
 * HTTP error with status code
 */
export interface HttpError extends Error {
  /** HTTP status code */
  status: number;
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

