// Constants
const VALID_HTTP_METHODS = ['GET', 'POST', 'PUT', 'DELETE'] as const;
const DEFAULT_TIMEOUT = 30000; // 30 seconds

// Error messages
const ERROR_MESSAGES = {
  DEFAULT: 'Error performing task, please try again',
  INVALID_METHOD: (method: string, validMethods: readonly string[]) =>
    `Invalid HTTP method: ${method}. Must be one of: ${validMethods.join(', ')}`,
  INVALID_URL: (url: string) => `Invalid URL: ${url}`,
  INVALID_TIMEOUT: (timeout: number) =>
    `Invalid timeout: ${timeout}. Must be a positive number`,
  REQUEST_TIMEOUT: (timeout: number) => `Request timeout after ${timeout}ms`,
} as const;

// Types
type HttpMethod = (typeof VALID_HTTP_METHODS)[number];
type HttpError = Error & { status: number };

/**
 * Result object for cancellable requests.
 *
 * @template T - The expected response type
 */
export interface CancellableRequest<T> {
  /**
   * Promise that resolves with the response data.
   */
  promise: Promise<T>;
  /**
   * Cancels the ongoing request.
   */
  cancel: () => void;
}

/**
 * Validates if the HTTP method is valid.
 *
 * @param {string} method - HTTP method to validate
 * @throws {Error} - Throws error if method is invalid
 */
function validateHttpMethod(method: string): asserts method is HttpMethod {
  if (!VALID_HTTP_METHODS.includes(method as HttpMethod)) {
    throw new Error(ERROR_MESSAGES.INVALID_METHOD(method, VALID_HTTP_METHODS));
  }
}

/**
 * Validates if the URL is valid.
 *
 * @param {string} url - URL to validate
 * @throws {Error} - Throws error if URL is invalid
 */
function validateUrl(url: string): void {
  try {
    new URL(url);
  } catch {
    throw new Error(ERROR_MESSAGES.INVALID_URL(url));
  }
}

/**
 * Validates if the timeout value is valid.
 *
 * @param {number} timeout - Timeout value to validate
 * @throws {Error} - Throws error if timeout is invalid
 */
function validateTimeout(timeout: number): void {
  if (timeout <= 0 || !Number.isFinite(timeout)) {
    throw new Error(ERROR_MESSAGES.INVALID_TIMEOUT(timeout));
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
 * Creates an HTTP error with status code.
 *
 * @param {string} message - Error message
 * @param {number} status - HTTP status code
 * @returns {HttpError} - Error object with status code
 */
function createHttpError(message: string, status: number): HttpError {
  const error = new Error(message) as HttpError;
  error.status = status;
  return error;
}

/**
 * Handles timeout errors by converting AbortError to a more descriptive error.
 *
 * @param {unknown} error - Error to handle
 * @param {number} timeout - Timeout value in milliseconds
 * @throws {Error} - Throws descriptive timeout error if error is AbortError
 */
function handleTimeoutError(error: unknown, timeout: number): void {
  if (error instanceof Error && error.name === 'AbortError') {
    throw new Error(ERROR_MESSAGES.REQUEST_TIMEOUT(timeout));
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
 * @throws {Error} - Throws error if request fails or times out
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
 * @template T - The expected response type
 * @param {('GET' | 'POST' | 'PUT' | 'DELETE')} method - HTTP method to use for the request
 * @param {string} url - Request URL (must be a valid URL)
 * @param {unknown | T} [body] - Request body (optional, will be JSON stringified)
 * @param {number} [timeout=30000] - Request timeout in milliseconds (default: 30000ms / 30 seconds)
 * @returns {Promise<T>} - Parsed response data as type T
 * @throws {Error} - Throws error if request fails, timeout occurs, or validation fails
 * @throws {Error & { status: number }} - Error object includes HTTP status code for failed requests
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
 * @template T - The expected response type
 * @param {('GET' | 'POST' | 'PUT' | 'DELETE')} method - HTTP method to use for the request
 * @param {string} url - Request URL (must be a valid URL)
 * @param {unknown | T} [body] - Request body (optional, will be JSON stringified)
 * @param {number} [timeout=30000] - Request timeout in milliseconds (default: 30000ms / 30 seconds)
 * @returns {CancellableRequest<T>} - Object with promise and cancel method
 * @throws {Error} - Throws error if validation fails
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
 *   if (error.name === 'AbortError') {
 *     console.log('Request was cancelled');
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