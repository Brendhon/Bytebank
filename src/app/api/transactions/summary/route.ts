import { handleErrorResponse, handleSuccessResponse, isAuthenticated } from "@/lib/api/api";
import { getTransactionSummaryServer } from "@/services/transaction/transaction.service.server";

/**
 * Handles GET requests to retrieve a transaction summary for the authenticated user.
 * 
 * This endpoint requires authentication via NextAuth session. It uses the server-side
 * service `getTransactionSummaryServer` to calculate the summary, which can also be
 * called directly from Server Components for better performance.
 * 
 * @param {Request} req - The incoming HTTP request.
 * @returns {Promise<NextResponse>} A response object containing the transaction summary in JSON format
 * @throws {HttpError} Throws 401 Unauthorized if user is not authenticated
 * 
 * @example
 * Response structure:
 * ```json
 * {
 *   "balance": 1500.50,
 *   "breakdown": {
 *     "deposit": 2000.00,
 *     "payment": 300.00,
 *     "transfer": 150.00,
 *     "withdrawal": 49.50
 *   }
 * }
 * ```
 */
export async function GET(req: Request) {
  try {
    const session = await isAuthenticated();
    const summary = await getTransactionSummaryServer(session.user.id);
    return handleSuccessResponse(summary);
  } catch (error) {
    return handleErrorResponse(error, 'Error fetching transaction summary');
  }
}
