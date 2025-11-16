import { NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth";
import { Session } from "next-auth";
import { API_MESSAGES } from "@/lib/constants";
import { notFoundMessageSchema, defaultMessageSchema } from "@/schemas";
import { HttpError } from "@/types/http";
import { toHttpError } from "@/lib/errors/error-utils";


/**
 * Function to check if the request is authenticated using NextAuth session
 * @returns {Promise<Session>} - Returns the session if authenticated
 * @throws {HttpError} - Throws an HttpError with status 401 if not authenticated
 */
export async function isAuthenticated(): Promise<Session> {
  // Get the session
  const session = await auth();

  // If the user is not authenticated, throw an error
  if (!session?.user?.id) throw HttpError.unauthorized(API_MESSAGES.UNAUTHORIZED);

  // Return the session
  return session;
}

/**
 * Function to return the response
 * @param {T} data - The data object
 * @param {string} notFoundMessage - The default message to return
 * @returns {NextResponse} - The response object
 */
export function handleSuccessResponse<T>(
  data: T | null,
  notFoundMessage: string = API_MESSAGES.RESOURCE_NOT_FOUND
): NextResponse {
  // Validate notFoundMessage parameter
  const validationResult = notFoundMessageSchema.safeParse(notFoundMessage);

  // If validation fails, use the default message
  const message = validationResult.success ? validationResult.data : API_MESSAGES.RESOURCE_NOT_FOUND;

  // Return the response
  return data
    ? NextResponse.json(data)
    : NextResponse.json({ error: message }, { status: 404 });
}

/**
 * Handles error responses in a standardized way
 * 
 * Accepts any error type (unknown), normalizes it to HttpError, and returns
 * a properly formatted NextResponse with appropriate status code.
 * 
 * @param {unknown} error - The error object (can be any type)
 * @param {string} defaultMessage - The default error message to use if none available
 * @returns {NextResponse} - The response object with error message and status
 * 
 * @example
 * ```typescript
 * try {
 *   // some operation
 * } catch (error: unknown) {
 *   return handleErrorResponse(error, 'Failed to process request');
 * }
 * ```
 */
export function handleErrorResponse(
  error: unknown,
  defaultMessage: string = API_MESSAGES.DEFAULT_ERROR
): NextResponse {
  // Validate defaultMessage parameter
  const messageValidation = defaultMessageSchema.safeParse(defaultMessage);
  const validatedDefaultMessage = messageValidation.success
    ? messageValidation.data
    : API_MESSAGES.DEFAULT_ERROR;

  // Normalize error to HttpError
  const httpError = toHttpError(error, validatedDefaultMessage);

  // Log the error with full context
  console.error('HTTP Error:', httpError);

  // Return standardized error response
  return NextResponse.json(
    { message: httpError.message },
    { status: httpError.status }
  );
}