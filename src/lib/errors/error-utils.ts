/**
 * Error utility functions
 * 
 * Provides utilities for error handling, normalization, and type checking.
 * 
 * @module lib/errors/error-utils
 */

import { HttpError } from '@/types/http';

/**
 * Type guard to check if a value is an HttpError instance
 * 
 * @param error - The value to check
 * @returns True if the value is an HttpError instance
 * 
 * @example
 * ```typescript
 * try {
 *   // some code
 * } catch (error: unknown) {
 *   if (isHttpError(error)) {
 *     console.log(`HTTP Error: ${error.message}, Status: ${error.status}`);
 *   }
 * }
 * ```
 */
export function isHttpError(error: unknown): error is HttpError {
  return error instanceof HttpError;
}

/**
 * Type guard to check if a value is an Error instance
 * 
 * @param error - The value to check
 * @returns True if the value is an Error instance
 */
export function isError(error: unknown): error is Error {
  return error instanceof Error;
}

/**
 * Checks if an error has a cause object with a status code
 * 
 * @param error - The error to check
 * @returns True if the error has cause.status
 */
function hasErrorCauseStatus(error: Error): error is Error & { cause: { status: number } } {
  return (
    typeof error.cause === 'object' &&
    error.cause !== null &&
    'status' in error.cause &&
    typeof (error.cause as { status?: unknown }).status === 'number'
  );
}

/**
 * Normalizes any unknown error into an HttpError instance
 * 
 * This function handles various error types and converts them to a standardized
 * HttpError format, making error handling consistent across the application.
 * 
 * @param error - The error to normalize (can be anything)
 * @param defaultMessage - Default message if error has no message
 * @returns An HttpError instance
 * 
 * @example
 * ```typescript
 * try {
 *   await someAsyncOperation();
 * } catch (error: unknown) {
 *   const httpError = toHttpError(error);
 *   console.log(httpError.message, httpError.status);
 * }
 * ```
 */
export function toHttpError(error: unknown, defaultMessage: string = 'An error occurred'): HttpError {
  // If it's already an HttpError, return as is
  if (isHttpError(error)) {
    return error;
  }

  // If it's an Error with cause.status, create HttpError preserving the status
  if (isError(error)) {
    if (hasErrorCauseStatus(error)) {
      return new HttpError(error.message, error.cause.status);
    }
    // Regular Error without status, default to 500
    return new HttpError(error.message, 500);
  }

  // If it's a string, use it as the message
  if (typeof error === 'string') {
    return new HttpError(error, 500);
  }

  // If it's an object with a message property
  if (
    error &&
    typeof error === 'object' &&
    'message' in error &&
    typeof error.message === 'string'
  ) {
    // Check for status code in the object
    const status =
      'status' in error && typeof error.status === 'number'
        ? error.status
        : 500;

    return new HttpError(error.message, status);
  }

  // Fallback: unknown error type
  return new HttpError(defaultMessage, 500);
}

/**
 * Extracts error message from any error type
 * 
 * @param error - The error to extract message from
 * @param defaultMessage - Default message if extraction fails
 * @returns The error message as a string
 * 
 * @example
 * ```typescript
 * const message = getErrorMessage(error, 'Something went wrong');
 * console.log(message);
 * ```
 */
export function getErrorMessage(error: unknown, defaultMessage: string = 'An error occurred'): string {
  if (isError(error)) {
    return error.message;
  }

  if (typeof error === 'string') {
    return error;
  }

  if (
    error &&
    typeof error === 'object' &&
    'message' in error &&
    typeof error.message === 'string'
  ) {
    return error.message;
  }

  return defaultMessage;
}

/**
 * Extracts HTTP status code from any error type
 * 
 * @param error - The error to extract status from
 * @param defaultStatus - Default status if extraction fails (default: 500)
 * @returns The HTTP status code
 * 
 * @example
 * ```typescript
 * const status = getErrorStatus(error, 500);
 * console.log(status); // 404, 500, etc.
 * ```
 */
export function getErrorStatus(error: unknown, defaultStatus: number = 500): number {
  if (isHttpError(error)) {
    return error.status;
  }

  if (isError(error) && hasErrorCauseStatus(error)) {
    return error.cause.status;
  }

  if (
    error &&
    typeof error === 'object' &&
    'status' in error &&
    typeof error.status === 'number'
  ) {
    return error.status;
  }

  return defaultStatus;
}

