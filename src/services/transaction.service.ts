import { ITransaction, TransactionSummary } from "@/types/transaction";
import { request } from "./apiClient";

/**
 * Form the endpoint for the API
 * @param {string} id - The id of the transaction
 * @returns {string} - The endpoint URL
 */
function getEndpoint(id?: string | null | undefined): string {
  return `/api/transactions${id ? `/${id}` : ''}`;
}

/**
 * Creates a new transaction.
 * @param {ITransaction} data - Transaction data.
 * @returns {Promise<ITransaction>} - Created transaction.
 */
export async function createTransaction(data: ITransaction): Promise<ITransaction> {
  return request<ITransaction>('POST', getEndpoint(), data);
}

/**
 * Retrieves all user transactions.
 * @returns {Promise<ITransaction[]>} - List of transactions.
 */
export async function getUserTransactions(): Promise<ITransaction[]> {
  return request<ITransaction[]>('GET', getEndpoint());
}

/**
 * Updates an existing transaction.
 * @param {string} id - Transaction ID.
 * @param {Partial<ITransaction>} data - Data for update.
 * @returns {Promise<ITransaction>} - Updated transaction.
 */
export async function updateTransaction(id: string, data: Partial<ITransaction>): Promise<ITransaction> {
  return request<ITransaction>('PUT', getEndpoint(id), data);
}

/**
 * Deletes a transaction.
 * @param {string} id - Transaction ID.
 * @returns {Promise<ITransaction>} - Deleted transaction.
 */
export async function deleteTransaction(id: string): Promise<ITransaction> {
  return request<ITransaction>('DELETE', getEndpoint(id));
}

/**
 * Retrieves a specific transaction.
 * @param {string} id - Transaction ID.
 * @returns {Promise<ITransaction>} - Transaction data.
 */
export async function getTransactionById(id: string): Promise<ITransaction> {
  return request<ITransaction>('GET', getEndpoint(id));
}

/**
 * Get summary of transactions.
 * @param {string} userId - User ID for filtering transactions. Query param.
 * @returns {Promise<TransactionSummary>} - Summary of transactions.
 */
export async function getTransactionSummary(userId: string): Promise<TransactionSummary> {
  const path = getEndpoint('summary') + `?userId=${userId}`;
  return request<TransactionSummary>('GET', path);
}
