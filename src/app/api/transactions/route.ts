import { handleErrorResponse, handleSuccessResponse, isAuthenticated } from '@/lib/api/api';
import { transactionSchema } from '@/schemas/transaction/transaction.schema';
import { HttpError } from '@/types/http';
import { ITransaction } from '@/types/transaction';
import { getUserTransactionsServer, createTransactionServer } from '@/services/transaction/transaction.service.server';
import { NextResponse } from 'next/server';

/**
 * Handles GET requests to retrieve all transaction records for the authenticated user.
 * 
 * This endpoint requires authentication via NextAuth session. It retrieves all transactions
 * associated with the authenticated user's ID from the session.
 * 
 * This route delegates to the server-side service function for consistency with
 * Server Components that call the service directly.
 * 
 * @param {Request} req - The incoming HTTP request.
 * @returns {Promise<NextResponse>} A response object containing the transaction data in JSON format
 * @throws {HttpError} Throws 401 Unauthorized if user is not authenticated
 */
export async function GET(req: Request): Promise<NextResponse> {
  try {
    const session = await isAuthenticated();
    const transactions = await getUserTransactionsServer(session.user.id);
    return handleSuccessResponse<ITransaction[]>(transactions);
  } catch (error) {
    return handleErrorResponse(error, 'Error fetching transactions');
  }
}

/**
 * Handles POST requests to create a new transaction record for the authenticated user.
 * 
 * This endpoint requires authentication via NextAuth session. It validates the request body
 * using Zod schema and automatically associates the transaction with the authenticated user.
 * Any `user` field in the request body is ignored and replaced with the authenticated user's ID.
 * 
 * This route delegates to the server-side service function for consistency with
 * Server Components that call the service directly.
 * 
 * @param {Request} req - The incoming HTTP request containing transaction data in the body.
 * @returns {Promise<NextResponse>} A response object containing the created transaction data
 * @throws {HttpError} Throws 401 Unauthorized if user is not authenticated
 * @throws {HttpError} Throws 400 Bad Request if validation fails
 */
export async function POST(req: Request): Promise<NextResponse> {
  try {
    const session = await isAuthenticated();
    const body = await req.json();
    
    // Validate request body with Zod schema
    const validationResult = transactionSchema.safeParse(body);
    
    if (!validationResult.success) {
      const errorMessages = validationResult.error.errors.map(e => e.message).join(', ');
      return handleErrorResponse(
        HttpError.badRequest(errorMessages),
        errorMessages
      );
    }

    // Create transaction using server-side service
    const transaction = await createTransactionServer(validationResult.data, session.user.id);
    return handleSuccessResponse<ITransaction>(transaction);
  } catch (error) {
    return handleErrorResponse(error, 'Error creating transaction');
  }
}