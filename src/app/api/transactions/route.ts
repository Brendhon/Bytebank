import { getUserIdFromQuery, handleErrorResponse, handleSuccessResponse, isReqAuthenticated } from '@/lib/api';
import { connectToDatabase } from '@/lib/mongoose';
import Transaction from '@/models/Transaction';
import { ITransaction } from '@/types/transaction';

/**
 * Handles GET requests to retrieve all transaction records.
 * @param {Request} req - The incoming HTTP request.
 * @returns A response object containing the transaction data in JSON format
 */
export async function GET(req: Request) {
  try {
    // Check if the request is authenticated
    isReqAuthenticated(req);

    // Get query parameters from the request
    const userId = getUserIdFromQuery(req);

    // Check if the request method is GET
    await connectToDatabase();
    
    // Fetch all transactions for the user from the database
    const transactions = await Transaction.find({ user: userId })

    // Check if there are no transactions
    return handleSuccessResponse<ITransaction[]>(transactions);
  } catch (error) {
    return handleErrorResponse(error, 'Erro ao buscar transações');
  }
}

/**
 * Handles POST requests to create a new transaction record.
 * @param {Request} req - The incoming HTTP request.
 * @returns A response object indicating the success or failure of the operation
 */
export async function POST(req: Request) {
  try {
    // Check if the request is authenticated
    isReqAuthenticated(req);

    // Check if the request method is POST
    await connectToDatabase();

    // Parse the request body as JSON
    const data = await req.json();

    // Create a new transaction record in the database
    const transaction = await Transaction.create(data);

    // Return a success response with the created transaction
    return handleSuccessResponse<ITransaction>(transaction);
  } catch (error) {
    return handleErrorResponse(error, 'Erro ao buscar transação');
  }
}