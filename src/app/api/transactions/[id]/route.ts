import { handleErrorResponse, handleSuccessResponse, isReqAuthenticated } from '@/lib/api';
import { connectToDatabase } from '@/lib/mongoose';
import Transaction from '@/models/Transaction';
import { ITransaction } from '@/types/transaction';

interface Params { params: Promise<{ id: string }> }

/**
 * Handles GET requests to retrieve a transaction record by ID.
 * @param {Request} req - The incoming HTTP request.
 * @param {Params} context - The context containing route parameters.
 * @returns A response object containing the transaction data in JSON format
 */
export async function GET(req: Request, { params }: Params) {
  try {
    // Check if the request is authenticated
    isReqAuthenticated(req);

    // Connect to the database
    await connectToDatabase();

    // Extract the ID from params
    const { id } = await params;

    // Find the transaction record by ID
    const transaction = await Transaction.findById(id);

    // Handle success response
    return handleSuccessResponse<ITransaction>(transaction);
  } catch (error) {
    return handleErrorResponse(error, 'Erro ao buscar transações');
  }
}

/**
 * Handles DELETE requests to delete a transaction record by ID.
 * @param {Request} req - The incoming HTTP request.
 * @param {Params} context - The context containing route parameters.
 * @returns A response object indicating the success or failure of the operation
 */
export async function DELETE(req: Request, { params }: Params) {
  try {
    // Check if the request is authenticated
    isReqAuthenticated(req);

    // Connect to the database
    await connectToDatabase();

    // Extract the ID from params
    const { id } = await params;

    // Delete the transaction record by ID
    const transaction = await Transaction.findByIdAndDelete(id);

    // Return a success response with the deleted transaction
    return handleSuccessResponse<ITransaction>(transaction);
  } catch (error) {
    return handleErrorResponse(error, 'Erro ao deletar transação');
  }
}

/**
 * Handles PUT requests to update a transaction record by ID.
 * @param {Request} req - The incoming HTTP request.
 * @param {Params} context - The context containing route parameters.
 * @returns A response object indicating the success or failure of the operation
 */
export async function PUT(req: Request, { params }: Params) {
  try {
    // Check if the request is authenticated
    isReqAuthenticated(req);

    // Connect to the database
    await connectToDatabase();

    // Extract the ID from params
    const { id } = await params;

    // Parse the request body as JSON
    const data = await req.json();

    // Update the transaction record by ID
    const transaction = await Transaction.findByIdAndUpdate(id, data, {
      new: true, // Return the updated transaction
    });

    // Return a success response with the updated transaction
    return handleSuccessResponse<ITransaction>(transaction);
  } catch (error) {
    return handleErrorResponse(error, 'Erro ao atualizar transação');
  }
}