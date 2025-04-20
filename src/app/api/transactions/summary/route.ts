import { handleErrorResponse, handleSuccessResponse, isReqAuthenticated } from "@/lib/api";
import { connectToDatabase } from "@/lib/mongoose";
import Transaction from "@/models/Transaction";
import { TransactionDescKey } from "@/types/transaction";

export async function GET(req: Request) {
  try {
    // Check if the request is authenticated
    isReqAuthenticated(req);

    // Connect to the database
    await connectToDatabase();

    // Get query parameters from the request
    const { searchParams } = new URL(req.url);

    // Extract userId from query parameters
    const userId = searchParams.get("userId");

    // Check if userId is provided
    if (!userId) throw new Error("userId is required", { cause: { status: 400 } });

    // Aggregate transactions by userId
    const agg = await Transaction.aggregate([
      { $match: { user: userId } },
      {
        $group: {
          _id: "$desc", // TransactionDesc
          total: { $sum: "$value" }, // Sum of values for each desc
        }
      }
    ]);

    // Create default summary object
    const defaultSummary = {
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

    // Destructure summary
    const deposit = summary["deposit"] ?? 0;
    const payment = summary["payment"] ?? 0;
    const transfer = summary["transfer"] ?? 0;
    const withdrawal = summary["withdrawal"] ?? 0;

    // Calculate inflow (deposit) and outflow (others)
    const inflow = deposit;
    const outflow = payment + transfer + withdrawal;

    // Form response
    const response = {
      balance: inflow - outflow,
      breakdown: {
        deposit,
        payment,
        transfer,
        withdrawal,
      },
    }

    // Return success response
    return handleSuccessResponse(response);
  } catch (error) {
    return handleErrorResponse(error, 'Erro ao buscar resumo de transações');
  }
}
