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