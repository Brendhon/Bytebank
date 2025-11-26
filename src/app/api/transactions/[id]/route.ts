import { handleErrorResponse, handleSuccessResponse, isAuthenticated } from '@/lib/api/api';
import { transactionSchema } from '@/schemas/transaction/transaction.schema';
import { HttpError } from '@/types/http';
import { ITransaction } from '@/types/transaction';
import { 
  getTransactionByIdServer, 
  updateTransactionServer, 
  deleteTransactionServer 
} from '@/services/transaction/transaction.service.server';
import { NextResponse } from 'next/server';

interface Params { params: Promise<{ id: string }> }

/**
 * Handles GET requests to retrieve a transaction record by ID for the authenticated user.
 * 
 * This endpoint requires authentication via NextAuth session. It retrieves a specific transaction
 * by ID and verifies that the transaction belongs to the authenticated user before returning it.
 * 
 * This route delegates to the server-side service function for consistency with
 * Server Components that call the service directly.
 * 
 * @param {Request} req - The incoming HTTP request.
 * @param {Params} context - The context containing route parameters with the transaction ID.
 * @returns {Promise<NextResponse>} A response object containing the transaction data in JSON format
 * @throws {HttpError} Throws 401 Unauthorized if user is not authenticated
 * @throws {HttpError} Throws 403 Forbidden if transaction does not belong to the authenticated user
 * @throws {HttpError} Throws 404 Not Found if transaction does not exist
 */
export async function GET(req: Request, { params }: Params): Promise<NextResponse> {
  try {
    const session = await isAuthenticated();
    const { id } = await params;
    const transaction = await getTransactionByIdServer(id, session.user.id);
    return handleSuccessResponse<ITransaction>(transaction);
  } catch (error) {
    return handleErrorResponse(error, 'Error fetching transaction');
  }
}

/**
 * Handles DELETE requests to delete a transaction record by ID for the authenticated user.
 * 
 * This endpoint requires authentication via NextAuth session. It deletes a specific transaction
 * by ID after verifying that the transaction exists and belongs to the authenticated user.
 * 
 * This route delegates to the server-side service function for consistency with
 * Server Components that call the service directly.
 * 
 * @param {Request} req - The incoming HTTP request.
 * @param {Params} context - The context containing route parameters with the transaction ID.
 * @returns {Promise<NextResponse>} A response object containing the deleted transaction data
 * @throws {HttpError} Throws 401 Unauthorized if user is not authenticated
 * @throws {HttpError} Throws 403 Forbidden if transaction does not belong to the authenticated user
 * @throws {HttpError} Throws 404 Not Found if transaction does not exist
 */
export async function DELETE(req: Request, { params }: Params): Promise<NextResponse> {
  try {
    const session = await isAuthenticated();
    const { id } = await params;
    const deletedTransaction = await deleteTransactionServer(id, session.user.id);
    return handleSuccessResponse<ITransaction>(deletedTransaction);
  } catch (error) {
    return handleErrorResponse(error, 'Error deleting transaction');
  }
}

/**
 * Handles PUT requests to update a transaction record by ID for the authenticated user.
 * 
 * This endpoint requires authentication via NextAuth session. It validates the request body
 * using Zod schema, verifies that the transaction exists and belongs to the authenticated user,
 * and then updates the transaction. Any `user` field in the request body is ignored to prevent
 * unauthorized ownership changes.
 * 
 * This route delegates to the server-side service function for consistency with
 * Server Components that call the service directly.
 * 
 * @param {Request} req - The incoming HTTP request containing transaction data in the body.
 * @param {Params} context - The context containing route parameters with the transaction ID.
 * @returns {Promise<NextResponse>} A response object containing the updated transaction data
 * @throws {HttpError} Throws 401 Unauthorized if user is not authenticated
 * @throws {HttpError} Throws 400 Bad Request if validation fails or ID format is invalid
 * @throws {HttpError} Throws 403 Forbidden if transaction does not belong to the authenticated user
 * @throws {HttpError} Throws 404 Not Found if transaction does not exist
 */
export async function PUT(req: Request, { params }: Params): Promise<NextResponse> {
  try {
    const session = await isAuthenticated();
    const { id } = await params;
    const body = await req.json();
    
    // Validate request body with Zod schema
    const validationResult = transactionSchema.safeParse(body);
    
    if (!validationResult.success) {
      const errorMessages = validationResult.error.errors.map(e => e.message).join(', ');
      throw HttpError.badRequest(errorMessages);
    }

    // Update transaction using server-side service
    const transaction = await updateTransactionServer(id, validationResult.data, session.user.id);
    return handleSuccessResponse<ITransaction>(transaction);
  } catch (error) {
    return handleErrorResponse(error, 'Error updating transaction');
  }
}