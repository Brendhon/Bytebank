import { handleErrorResponse, handleSuccessResponse, isAuthenticated } from '@/lib/api/api';
import { connectToDatabase } from '@/lib/mongoose/mongoose';
import Transaction from '@/models/Transaction/Transaction';
import { transactionSchema } from '@/schemas/transaction/transaction.schema';
import { HttpError } from '@/types/http';
import { ITransaction } from '@/types/transaction';
import { Types } from 'mongoose';

interface Params { params: Promise<{ id: string }> }

/**
 * Handles GET requests to retrieve a transaction record by ID for the authenticated user.
 * 
 * This endpoint requires authentication via NextAuth session. It retrieves a specific transaction
 * by ID and verifies that the transaction belongs to the authenticated user before returning it.
 * 
 * @param {Request} req - The incoming HTTP request.
 * @param {Params} context - The context containing route parameters with the transaction ID.
 * @returns {Promise<NextResponse>} A response object containing the transaction data in JSON format
 * @throws {HttpError} Throws 401 Unauthorized if user is not authenticated
 * @throws {HttpError} Throws 403 Forbidden if transaction does not belong to the authenticated user
 * @throws {HttpError} Throws 404 Not Found if transaction does not exist
 */
export async function GET(req: Request, { params }: Params) {
  try {
    const session = await isAuthenticated();
    await connectToDatabase();

    const { id } = await params;

    // Validate ObjectId format
    if (!Types.ObjectId.isValid(id)) {
      throw HttpError.badRequest('Invalid transaction ID format');
    }

    const transaction = await Transaction.findById(id);

    if (!transaction) {
      throw HttpError.notFound('Transaction not found');
    }

    // Verify ownership - ensure the transaction belongs to the authenticated user
    if (transaction.user.toString() !== session.user.id) {
      throw HttpError.forbidden('Forbidden: You can only access your own transactions');
    }

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
 * @param {Request} req - The incoming HTTP request.
 * @param {Params} context - The context containing route parameters with the transaction ID.
 * @returns {Promise<NextResponse>} A response object containing the deleted transaction data
 * @throws {HttpError} Throws 401 Unauthorized if user is not authenticated
 * @throws {HttpError} Throws 403 Forbidden if transaction does not belong to the authenticated user
 * @throws {HttpError} Throws 404 Not Found if transaction does not exist
 */
export async function DELETE(req: Request, { params }: Params) {
  try {
    const session = await isAuthenticated();
    await connectToDatabase();

    const { id } = await params;

    // Validate ObjectId format
    if (!Types.ObjectId.isValid(id)) {
      throw HttpError.badRequest('Invalid transaction ID format');
    }

    const transaction = await Transaction.findById(id);

    if (!transaction) {
      throw HttpError.notFound('Transaction not found');
    }

    // Verify ownership - ensure the transaction belongs to the authenticated user
    if (transaction.user.toString() !== session.user.id) {
      throw HttpError.forbidden('Forbidden: You can only delete your own transactions');
    }

    const deletedTransaction = await Transaction.findByIdAndDelete(id);

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
 * @param {Request} req - The incoming HTTP request containing transaction data in the body.
 * @param {Params} context - The context containing route parameters with the transaction ID.
 * @returns {Promise<NextResponse>} A response object containing the updated transaction data
 * @throws {HttpError} Throws 401 Unauthorized if user is not authenticated
 * @throws {HttpError} Throws 400 Bad Request if validation fails or ID format is invalid
 * @throws {HttpError} Throws 403 Forbidden if transaction does not belong to the authenticated user
 * @throws {HttpError} Throws 404 Not Found if transaction does not exist
 */
export async function PUT(req: Request, { params }: Params) {
  try {
    const session = await isAuthenticated();
    await connectToDatabase();

    const { id } = await params;

    // Validate ObjectId format
    if (!Types.ObjectId.isValid(id)) {
      throw HttpError.badRequest('Invalid transaction ID format');
    }

    const existingTransaction = await Transaction.findById(id);

    if (!existingTransaction) {
      throw HttpError.notFound('Transaction not found');
    }

    // Verify ownership - ensure the transaction belongs to the authenticated user
    if (existingTransaction.user.toString() !== session.user.id) {
      throw HttpError.forbidden('Forbidden: You can only update your own transactions');
    }

    // Validate request body with Zod schema
    const body = await req.json();
    const validationResult = transactionSchema.safeParse(body);
    
    if (!validationResult.success) {
      const errorMessages = validationResult.error.errors.map(e => e.message).join(', ');
      throw HttpError.badRequest(errorMessages);
    }

    // Ensure user field is not modified - always use authenticated user's ID
    const updateData = {
      ...validationResult.data,
      user: session.user.id,
    };

    // Update the transaction record with validated data
    const transaction = await Transaction.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    return handleSuccessResponse<ITransaction>(transaction);
  } catch (error) {
    return handleErrorResponse(error, 'Error updating transaction');
  }
}