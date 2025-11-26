/**
 * Error utility functions
 * 
 * Provides utilities for error handling, normalization, and type checking.
 * 
 * @module lib/errors/error-utils
 */

import { HttpError } from '@/types/http';

/**
 * Default HTTP status code for internal server errors
 */
const DEFAULT_ERROR_STATUS = 500;

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
 * Type guard to check if a value is a non-null object
 * 
 * @param value - The value to check
 * @returns True if the value is a non-null object
 */
function isObject(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object';
}

/**
 * Checks if an object has a property of a specific type
 * 
 * @param obj - The object to check
 * @param property - The property name to check
 * @param type - The expected type of the property
 * @returns True if the object has the property with the expected type
 */
function hasObjectProperty<K extends string, T>(
  obj: Record<string, unknown>,
  property: K,
  type: 'string' | 'number' | 'boolean'
): obj is Record<string, unknown> & { [P in K]: T } {
  return property in obj && typeof obj[property] === type;
}

/**
 * Checks if an error has a cause object with a status code
 * 
 * @param error - The error to check
 * @returns True if the error has cause.status
 */
function hasErrorCauseStatus(error: Error): error is Error & { cause: { status: number } } {
  return (
    isObject(error.cause) &&
    hasObjectProperty(error.cause, 'status', 'number')
  );
}

/**
 * Type guard to check if an error is an object with a message property
 * 
 * @param error - The error to check
 * @returns True if the error is an object with a string message property
 */
function hasObjectMessage(error: unknown): error is { message: string } {
  return isObject(error) && hasObjectProperty(error, 'message', 'string');
}

/**
 * Type guard to check if an error is an object with a status property
 * 
 * @param error - The error to check
 * @returns True if the error is an object with a number status property
 */
function hasObjectStatus(error: unknown): error is { status: number } {
  return isObject(error) && hasObjectProperty(error, 'status', 'number');
}
/**
 * Creates an HttpError with default status code
 * 
 * @param message - The error message
 * @returns An HttpError instance with status 500
 */
function createHttpErrorWithDefaultStatus(message: string): HttpError {
  return new HttpError(message, DEFAULT_ERROR_STATUS);
}

/**
 * Normalizes an Error instance into an HttpError
 * 
 * @param error - The Error instance to normalize
 * @returns An HttpError instance
 */
function normalizeErrorInstance(error: Error): HttpError {
  if (hasErrorCauseStatus(error)) {
    return new HttpError(error.message, error.cause.status);
  }
  return createHttpErrorWithDefaultStatus(error.message);
}

/**
 * Normalizes a string error into an HttpError
 * 
 * @param error - The string error to normalize
 * @returns An HttpError instance
 */
function normalizeStringError(error: string): HttpError {
  return createHttpErrorWithDefaultStatus(error);
}

/**
 * Normalizes an object error with message property into an HttpError
 * 
 * @param error - The object error to normalize
 * @returns An HttpError instance
 */
function normalizeObjectError(error: { message: string }): HttpError {
  const status = hasObjectStatus(error) ? error.status : DEFAULT_ERROR_STATUS;
  return new HttpError(error.message, status);
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
  switch (true) {
    // If it's already an HttpError, return as is
    case isHttpError(error):
      return error;

    // If it's an Error instance, normalize it
    case isError(error):
      return normalizeErrorInstance(error);

    // If it's a string, use it as the message
    case typeof error === 'string':
      return normalizeStringError(error);

    // If it's an object with a message property, normalize it
    case hasObjectMessage(error):
      return normalizeObjectError(error);

    // Fallback: unknown error type
    default:
      return createHttpErrorWithDefaultStatus(defaultMessage);
  }
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
  switch (true) {
    // If it's an Error, return the message
    case isError(error):
      return error.message;

    // If it's a string, return the string
    case typeof error === 'string':
      return error;

    // If it's an object with a message property, return the message
    case hasObjectMessage(error):
      return error.message;

    // If it's an unknown error type, return the default message
    default:
      return defaultMessage;
  }
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
export function getErrorStatus(error: unknown, defaultStatus: number = DEFAULT_ERROR_STATUS): number {
  switch (true) {
    // If it's an HttpError, return the status  
    case isHttpError(error):
      return error.status;

    // If it's an Error with cause.status, return the status
    case isError(error) && hasErrorCauseStatus(error):
      return error.cause.status;

    // If it's an object with a status property, return the status
    case hasObjectStatus(error):
      return error.status;

    // If it's an unknown error type, return the default status
    default:
      return defaultStatus;
  }
}

