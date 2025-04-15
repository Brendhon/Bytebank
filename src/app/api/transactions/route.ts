import { connectToDatabase } from '@/lib/mongoose';
import Transaction from '@/models/Transaction';

/**
 * Handles GET requests to retrieve all transaction records.
 * @param {Request} req - The incoming HTTP request.
 * @returns A response object containing the transaction data in JSON format
 */
export async function GET(req: Request) {
  // Check if the request method is GET
  await connectToDatabase();

  // Fetch all transactions from the database
  const transactions = await Transaction.find();

  // Check if there are no transactions
  return Response.json(transactions);
}

/**
 * Handles POST requests to create a new transaction record.
 * @param {Request} req - The incoming HTTP request.
 * @returns A response object indicating the success or failure of the operation
 */
export async function POST(req: Request) {
  // Check if the request method is POST
  await connectToDatabase();

  // Parse the request body as JSON
  const data = await req.json();

  // Create a new transaction record in the database
  const transaction = await Transaction.create(data);

  // Return a success response with the created transaction
  return Response.json(transaction);
}

/**
 * Handles DELETE requests to delete a transaction record by ID.
 * @param {Request} req - The incoming HTTP request.
 * @returns A response object indicating the success or failure of the operation
 */
export async function DELETE(req: Request) {
  // Check if the request method is DELETE
  await connectToDatabase();

  // Parse the request body as JSON
  const { id } = await req.json();

  // Delete the transaction record by ID
  const transaction = await Transaction.findByIdAndDelete(id);

  // Return a success response with the deleted transaction
  return Response.json(transaction);
}

/**
 * Handles PUT requests to update a transaction record by ID.
 * @param {Request} req - The incoming HTTP request.
 * @returns A response object indicating the success or failure of the operation
 */
export async function PUT(req: Request) {
  // Check if the request method is PUT
  await connectToDatabase();

  // Parse the request body as JSON
  const { id, ...data } = await req.json();

  // Update the transaction record by ID
  const transaction = await Transaction.findByIdAndUpdate(id, data, {
    new: true,
  });

  // Return a success response with the updated transaction
  return Response.json(transaction);
}