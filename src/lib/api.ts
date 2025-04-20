import { NextResponse } from "next/server";

/**
 * Function to check if the request is authenticated
 * @param {Request} req - The request object
 * @returns {Promise<void>} - Resolves if the request is authenticated
 * @throws {Error} - Throws an error if the request is not authenticated
 */
export function isReqAuthenticated(req: Request): void {
  if (req.headers.get('x-api-key') !== process.env.NEXT_PUBLIC_API_KEY)
    throw new Error('Forbidden', { cause: { status: 401 } });
}

/**
 * Function to return the response
 * @param {T} data - The data object
 * @param {string} notFoundMessage - The default message to return
 * @returns {NextResponse} - The response object
 */
export function handleSuccessResponse<T>(data: T | null, notFoundMessage: string = 'Recurso não encontrado'): NextResponse {
  return data
    ? NextResponse.json(data)
    : NextResponse.json({ error: notFoundMessage }, { status: 404 });
}

/**
 * Handle the error
 * @param {Error} error - The error object
 * @param {string} defaultMessage - The default error message
 * @returns {NextResponse} - The response object
 * @throws {Error} - Throws an error if the request is not authenticated
 */
export function handleErrorResponse(error: any, defaultMessage: string): NextResponse {
  // Log the error
  console.error('Error:', error);

  // Get message from error
  const message = error?.message || defaultMessage;

  // Get status from error
  const status = error?.status || error?.cause?.status || 500;

  // Return an error response
  return NextResponse.json({ message }, { status });
}