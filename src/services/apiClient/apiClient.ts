import {
  DEFAULT_TIMEOUT,
  ERROR_MESSAGES,
  VALID_HTTP_METHODS,
} from '@/lib/constants';
import { HttpError } from '@/types/http';
import type { CancellableRequest, HttpMethod } from '@/types/http';

/**
 * Validates if the HTTP method is valid.
 *
 * @param {string} method - HTTP method to validate
 * @throws {HttpError} - Throws HttpError (400) if method is invalid
 */
function validateHttpMethod(method: string): asserts method is HttpMethod {
  if (!VALID_HTTP_METHODS.includes(method as HttpMethod)) {
    throw HttpError.badRequest(ERROR_MESSAGES.INVALID_METHOD(method, VALID_HTTP_METHODS));
  }
}

/**
 * Validates if the URL is valid.
 *
 * @param {string} url - URL to validate
 * @throws {HttpError} - Throws HttpError (400) if URL is invalid
 */
function validateUrl(url: string): void {
  try {
    new URL(url);
  } catch {
    throw HttpError.badRequest(ERROR_MESSAGES.INVALID_URL(url));
  }
}

/**
 * Validates if the timeout value is valid.
 *
 * @param {number} timeout - Timeout value to validate
 * @throws {HttpError} - Throws HttpError (400) if timeout is invalid
 */
function validateTimeout(timeout: number): void {
  if (timeout <= 0 || !Number.isFinite(timeout)) {
    throw HttpError.badRequest(ERROR_MESSAGES.INVALID_TIMEOUT(timeout));
  }
}

/**
 * Creates HTTP headers for the request.
 * NextAuth session cookies are automatically sent by the browser.
 *
 * @returns {HeadersInit} - Headers object
 */
function createHeaders(): HeadersInit {
  return {
    'Content-Type': 'application/json',
  };
}

/**
 * Extracts error message from response, trying JSON first, then text.
 *
 * @param {Response} response - Response object
 * @returns {Promise<string>} - Error message
 */
async function extractErrorMessage(response: Response): Promise<string> {
  try {
    const errorData = await response.json();
    return errorData.message || ERROR_MESSAGES.DEFAULT;
  } catch {
    return (await response.text()) || ERROR_MESSAGES.DEFAULT;
  }
}

/**
 * Creates an HttpError instance with the given message and status code.
 *
 * @param {string} message - Error message
 * @param {number} status - HTTP status code
 * @returns {HttpError} - HttpError instance with status code
 */
function createHttpError(message: string, status: number): HttpError {
  return new HttpError(message, status);
}

/**
 * Handles timeout errors by converting AbortError to HttpError.
 *
 * @param {unknown} error - Error to handle
 * @param {number} timeout - Timeout value in milliseconds
 * @throws {HttpError} - Throws HttpError (408) if error is AbortError
 */
function handleTimeoutError(error: unknown, timeout: number): void {
  if (error instanceof Error && error.name === 'AbortError') {
    throw new HttpError(ERROR_MESSAGES.REQUEST_TIMEOUT(timeout), 408);
  }
}

/**
 * Executes the HTTP request with timeout support.
 *
 * @param {HttpMethod} method - HTTP method
 * @param {string} url - Request URL
 * @param {HeadersInit} headers - Request headers
 * @param {unknown} body - Request body (optional)
 * @param {number} timeout - Request timeout in milliseconds
 * @param {AbortController} controller - AbortController for request cancellation
 * @returns {Promise<Response>} - Response object
 * @throws {HttpError} - Throws HttpError if request fails or times out
 */
async function executeRequest(
  method: HttpMethod,
  url: string,
  headers: HeadersInit,
  body: unknown,
  timeout: number,
  controller: AbortController,
): Promise<Response> {
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    handleTimeoutError(error, timeout);
    throw error;
  }
}

/**
 * Generic function to perform HTTP requests with validation, error handling, and timeout support.
 * Authentication is handled automatically via NextAuth session cookies (HTTP-only cookies).
 *
 * All errors thrown are instances of HttpError with appropriate status codes.
 *
 * @template T - The expected response type
 * @param {('GET' | 'POST' | 'PUT' | 'DELETE')} method - HTTP method to use for the request
 * @param {string} url - Request URL (must be a valid URL)
 * @param {unknown | T} [body] - Request body (optional, will be JSON stringified)
 * @param {number} [timeout=30000] - Request timeout in milliseconds (default: 30000ms / 30 seconds)
 * @returns {Promise<T>} - Parsed response data as type T
 * @throws {HttpError} - Throws HttpError with appropriate status code if request fails, timeout occurs, or validation fails
 *
 * @example
 * ```typescript
 * // GET request
 * const users = await request<User[]>('GET', '/api/users');
 *
 * // POST request with body
 * const newUser = await request<User>('POST', '/api/users', { name: 'John', email: 'john@example.com' });
 *
 * // Request with custom timeout
 * const data = await request<Data>('GET', '/api/data', undefined, 60000);
 *
 * // Error handling
 * try {
 *   const data = await request<Data>('GET', '/api/data');
 * } catch (error) {
 *   if (error instanceof HttpError) {
 *     console.log(`HTTP Error ${error.status}: ${error.message}`);
 *   }
 * }
 * ```
 */
export async function request<T>(
  method: HttpMethod,
  url: string,
  body?: unknown | T,
  timeout: number = DEFAULT_TIMEOUT,
): Promise<T> {
  // Validate inputs
  validateHttpMethod(method);
  validateUrl(url);
  validateTimeout(timeout);

  // Create headers
  const headers = createHeaders();

  // Create AbortController for timeout
  const controller = new AbortController();

  // Execute request with timeout
  const response = await executeRequest(method, url, headers, body, timeout, controller);

  // Handle error responses
  if (!response.ok) {
    const message = await extractErrorMessage(response);
    throw createHttpError(message, response.status);
  }

  // Parse and return response
  return response.json() as T;
}

/**
 * Generic function to perform HTTP requests with cancellation support.
 * Returns an object with the promise and a cancel method to abort the request.
 * Authentication is handled automatically via NextAuth session cookies (HTTP-only cookies).
 *
 * All errors thrown are instances of HttpError with appropriate status codes.
 *
 * @template T - The expected response type
 * @param {('GET' | 'POST' | 'PUT' | 'DELETE')} method - HTTP method to use for the request
 * @param {string} url - Request URL (must be a valid URL)
 * @param {unknown | T} [body] - Request body (optional, will be JSON stringified)
 * @param {number} [timeout=30000] - Request timeout in milliseconds (default: 30000ms / 30 seconds)
 * @returns {CancellableRequest<T>} - Object with promise and cancel method
 * @throws {HttpError} - Throws HttpError with appropriate status code if validation fails
 *
 * @example
 * ```typescript
 * // Request with cancellation support
 * const { promise, cancel } = requestWithCancellation<User[]>('GET', '/api/users');
 *
 * // Cancel the request if needed
 * setTimeout(() => cancel(), 5000); // Cancel after 5 seconds
 *
 * try {
 *   const users = await promise;
 * } catch (error) {
 *   if (error instanceof HttpError && error.status === 408) {
 *     console.log('Request was cancelled or timed out');
 *   }
 * }
 * ```
 */
export function requestWithCancellation<T>(
  method: HttpMethod,
  url: string,
  body?: unknown | T,
  timeout: number = DEFAULT_TIMEOUT,
): CancellableRequest<T> {
  // Validate inputs
  validateHttpMethod(method);
  validateUrl(url);
  validateTimeout(timeout);

  // Create headers
  const headers = createHeaders();

  // Create AbortController for cancellation
  const controller = new AbortController();

  // Create promise that executes the request
  const promise = (async (): Promise<T> => {
    // Execute request with timeout
    const response = await executeRequest(method, url, headers, body, timeout, controller);

    // Handle error responses
    if (!response.ok) {
      const message = await extractErrorMessage(response);
      throw createHttpError(message, response.status);
    }

    // Parse and return response
    return response.json() as T;
  })();

  // Return object with promise and cancel method
  return {
    promise,
    cancel: () => controller.abort(),
  };
}