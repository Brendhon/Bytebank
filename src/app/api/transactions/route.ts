import { handleErrorResponse, handleSuccessResponse, isAuthenticated } from '@/lib/api/api';
import { connectToDatabase } from '@/lib/mongoose/mongoose';
import Transaction from '@/models/Transaction/Transaction';
import { transactionSchema } from '@/schemas/transaction/transaction.schema';
import { HttpError } from '@/types/http';
import { ITransaction } from '@/types/transaction';

/**
 * Handles GET requests to retrieve all transaction records for the authenticated user.
 * 
 * This endpoint requires authentication via NextAuth session. It retrieves all transactions
 * associated with the authenticated user's ID from the session.
 * 
 * @param {Request} req - The incoming HTTP request.
 * @returns {Promise<NextResponse>} A response object containing the transaction data in JSON format
 * @throws {HttpError} Throws 401 Unauthorized if user is not authenticated
 */
export async function GET(req: Request) {
  try {
    const session = await isAuthenticated();
    const userId = session.user.id;

    await connectToDatabase();
    
    const transactions = await Transaction.find({ user: userId });

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
 * @param {Request} req - The incoming HTTP request containing transaction data in the body.
 * @returns {Promise<NextResponse>} A response object containing the created transaction data
 * @throws {HttpError} Throws 401 Unauthorized if user is not authenticated
 * @throws {HttpError} Throws 400 Bad Request if validation fails
 */
export async function POST(req: Request) {
  try {
    const session = await isAuthenticated();
    await connectToDatabase();

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

    // Create transaction with validated data and associate with authenticated user
    // Always use authenticated user's ID, ignoring any user field in the body
    const transaction = await Transaction.create({
      ...validationResult.data,
      user: session.user.id,
    });

    return handleSuccessResponse<ITransaction>(transaction);
  } catch (error) {
    return handleErrorResponse(error, 'Error creating transaction');
  }
}