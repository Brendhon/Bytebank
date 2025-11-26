import { auth } from "@/lib/auth/auth";
import { getUserTransactionsServer } from "@/services/transaction/transaction.service.server";
import { sortByDate } from "@/lib/utils/utils";
import { redirect } from "next/navigation";
import { ReactElement } from "react";
import { TransactionsClient } from "./components/TransactionsClient";
import { ITransaction } from "@/types/transaction";

/**
 * Transactions page component for authenticated users.
 * 
 * Displays user's transaction history with full CRUD operations.
 * This is a Server Component that fetches data server-side,
 * following Next.js App Router best practices.
 * 
 * The component:
 * - Validates user authentication
 * - Fetches transaction data server-side using direct database access
 * - Delegates UI interactions to TransactionsClient
 * - Uses Server Actions for data mutations
 * 
 * @returns {Promise<ReactElement>} Transactions page content
 * @throws {Error} May redirect to login if session is invalid
 */
export default async function TransactionsPage(): Promise<ReactElement> {
  // Get session data server-side
  const session = await auth();

  // Validate session and redirect if not authenticated
  if (!session?.user?.id) {
    redirect('/login');
  }

  // Fetch transactions server-side using direct database access
  let transactions: ITransaction[] = [];
  
  try {
    const data = await getUserTransactionsServer(session.user.id);
    transactions = sortByDate<ITransaction>(data, "date");
  } catch (error) {
    // Log error for debugging
    console.error('Error fetching transactions:', error);
    // Continue with empty array - TransactionsClient will handle empty state
  }

  return (
    <TransactionsClient 
      initialTransactions={transactions}
      userId={session.user.id}
    />
  );
}
