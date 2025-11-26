import { connectToDatabase } from "@/lib/mongoose/mongoose";
import Transaction from "@/models/Transaction/Transaction";
import { TransactionDescKey, TransactionSummary } from "@/types/transaction";
import { Types } from "mongoose";

/**
 * Server-side service for transaction operations.
 * 
 * This service contains business logic that can be called directly from Server Components
 * without going through HTTP requests. This is the recommended approach for Next.js App Router.
 * 
 * The API route (`/api/transactions/summary`) uses this service internally,
 * and Server Components can call it directly for better performance.
 */

/**
 * Calculates transaction summary for a given user ID.
 * 
 * Aggregates all transactions for the user and calculates:
 * - Balance: Total balance (inflow - outflow)
 * - Breakdown: Sum of values by transaction description category (deposit, payment, transfer, withdrawal)
 * 
 * The aggregation is performed efficiently using MongoDB's aggregation pipeline, grouping
 * transactions by description and summing their values in a single database query.
 * 
 * @param {string} userId - User ID to calculate summary for
 * @returns {Promise<TransactionSummary>} Transaction summary with balance and breakdown
 * @throws {Error} May throw if database connection fails or query fails
 * 
 * @example
 * ```typescript
 * // In a Server Component
 * const session = await auth();
 * const summary = await getTransactionSummaryServer(session.user.id);
 * ```
 */
export async function getTransactionSummaryServer(userId: string): Promise<TransactionSummary> {
  // Ensure database connection
  await connectToDatabase();

  // Aggregate transactions by description category
  const agg = await Transaction.aggregate([
    { $match: { user: new Types.ObjectId(userId) } },
    {
      $group: {
        _id: "$desc",
        total: { $sum: "$value" },
      }
    }
  ]);

  // Create default summary object with all transaction types initialized to 0
  const defaultSummary: Record<TransactionDescKey, number> = {
    deposit: 0,
    transfer: 0,
    withdrawal: 0,
    payment: 0,
  };

  // Process aggregation result - convert to summary object
  const summary = agg.reduce<Record<TransactionDescKey, number>>((acc, cur) => {
    acc[cur._id as TransactionDescKey] = cur.total;
    return acc;
  }, defaultSummary);

  // Extract values from summary
  const deposit = summary.deposit ?? 0;
  const payment = summary.payment ?? 0;
  const transfer = summary.transfer ?? 0;
  const withdrawal = summary.withdrawal ?? 0;

  // Calculate balance: inflow (deposit) - outflow (payment + transfer + withdrawal)
  const inflow = deposit;
  const outflow = payment + transfer + withdrawal;
  const balance = inflow - outflow;

  return {
    balance,
    breakdown: {
      deposit,
      payment,
      transfer,
      withdrawal,
    },
  };
}

