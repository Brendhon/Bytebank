import { NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth";
import { Session } from "next-auth";
import { API_MESSAGES } from "@/lib/constants";
import {
  errorSchema,
  notFoundMessageSchema,
  defaultMessageSchema,
} from "@/schemas";

/**
 * Interface for API errors with optional status code
 */
interface ApiError extends Error {
  status?: number;
  cause?: {
    status?: number;
  };
}

/**
 * Function to check if the request is authenticated using NextAuth session
 * @returns {Promise<Session>} - Returns the session if authenticated
 * @throws {Error} - Throws an error if the request is not authenticated
 */
export async function isAuthenticated(): Promise<Session> {
  // Get the session
  const session = await auth();

  // If the user is not authenticated, throw an error
  if (!session?.user?.id) throw new Error(API_MESSAGES.UNAUTHORIZED, { cause: { status: 401 } });

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
 * Handle the error
 * @param {ApiError | Error} error - The error object
 * @param {string} defaultMessage - The default error message
 * @returns {NextResponse} - The response object
 */
export function handleErrorResponse(
  error: ApiError | Error,
  defaultMessage: string = API_MESSAGES.DEFAULT_ERROR
): NextResponse {
  // Log the error
  console.error('Error:', error);

  // Validate defaultMessage parameter
  const messageValidation = defaultMessageSchema.safeParse(defaultMessage);
  const validatedDefaultMessage = messageValidation.success ? messageValidation.data : API_MESSAGES.DEFAULT_ERROR;

  // Validate error structure if it's an object with known properties
  let validatedError: ApiError | Error = error;

  // Validate error structure if it's an object with known properties
  if (error && typeof error === 'object' && 'message' in error) {
    const errorValidation = errorSchema.safeParse({
      message: error.message,
      status: (error as ApiError).status,
      cause: (error as ApiError).cause,
    });

    // If validation succeeds, set the validated error
    if (errorValidation.success) {
      validatedError = {
        ...error,
        status: errorValidation.data.status,
        cause: errorValidation.data.cause,
      } as ApiError;
    }
  }

  // Get message from error
  const message = validatedError?.message || validatedDefaultMessage;

  // Get status from error
  const apiError = validatedError as ApiError;
  const status = apiError?.status || apiError?.cause?.status || 500;

  // Return an error response
  return NextResponse.json({ message }, { status });
}