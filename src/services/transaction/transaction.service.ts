import { API_ROUTES } from "@/lib/constants";
import { request } from "@/services/apiClient/apiClient";
import { ITransaction, TransactionSummary } from "@/types/transaction";

// Base URL of the API
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

/**
 * Forms the base endpoint for the API
 * @returns {string} - The base endpoint URL
 */
function getBaseEndpoint(): string {
  return `${baseUrl}${API_ROUTES.TRANSACTIONS.BASE}`;
}

/**
 * Forms the endpoint for the API.
 * @param {string} id - The id of the transaction
 * @returns {string} - The endpoint URL
 */
function getTransactionByIdEndpoint(id: string): string {
  return `${baseUrl}${API_ROUTES.TRANSACTIONS.BY_ID(id)}`;
}

/**
 * Forms the endpoint for the API - Summary
 * @param {string} userId - The user id for filtering transactions
 * @returns {string} - The endpoint URL - Summary
 */
function getSummaryEndpoint(userId: string): string {
  const searchParams = new URLSearchParams({ userId });
  return `${baseUrl}${API_ROUTES.TRANSACTIONS.SUMMARY}?${searchParams.toString()}`;
}

/**
 * Forms the endpoint for the API - Transactions
 * @param {string} userId - The user id for filtering transactions
 * @returns {string} - The endpoint URL - Transactions
 */
function getTransactionsEndpoint(userId: string): string {
  const searchParams = new URLSearchParams({ userId });
  return `${getBaseEndpoint()}?${searchParams.toString()}`;
}

/**
 * Creates a new transaction.
 * @param {ITransaction} data - Transaction data.
 * @returns {Promise<ITransaction>} - Created transaction.
 */
export async function createTransaction(data: ITransaction): Promise<ITransaction> {
  return request<ITransaction>('POST', getBaseEndpoint(), data);
}

/**
 * Updates an existing transaction.
 * @param {string} id - Transaction ID.
 * @param {Partial<ITransaction>} data - Data for update.
 * @returns {Promise<ITransaction>} - Updated transaction.
 */
export async function updateTransaction(id: string, data: Partial<ITransaction>): Promise<ITransaction> {
  return request<ITransaction>('PUT', getTransactionByIdEndpoint(id), data);
}

/**
 * Deletes a transaction.
 * @param {string} id - Transaction ID.
 * @returns {Promise<ITransaction>} - Deleted transaction.
 */
export async function deleteTransaction(id: string): Promise<ITransaction> {
  return request<ITransaction>('DELETE', getTransactionByIdEndpoint(id));
}

/**
 * Retrieves a specific transaction.
 * @param {string} id - Transaction ID.
 * @returns {Promise<ITransaction>} - Transaction data.
 */
export async function getTransactionById(id: string): Promise<ITransaction> {
  return request<ITransaction>('GET', getTransactionByIdEndpoint(id));
}

/**
 * Retrieves all user transactions.
 * @param {string} userId - User ID for filtering transactions
 * @returns {Promise<ITransaction[]>} - List of transactions
 */
export async function getUserTransactions(userId: string): Promise<ITransaction[]> {
  return request<ITransaction[]>('GET', getTransactionsEndpoint(userId));
}

/**
 * Gets summary of transactions.
 * @param {string} userId - User ID for filtering transactions (query parameter)
 * @returns {Promise<TransactionSummary>} - Summary of transactions
 */
export async function getTransactionSummary(userId: string): Promise<TransactionSummary> {
  return request<TransactionSummary>('GET', getSummaryEndpoint(userId));
}
