import { connectToDatabase } from "@/lib/mongoose/mongoose";
import Transaction from "@/models/Transaction/Transaction";
import { ITransaction, TransactionDescKey, TransactionSummary } from "@/types/transaction";
import { Types } from "mongoose";
import { HttpError } from "@/types/http";

/**
 * Server-side service for transaction operations.
 * 
 * This service contains business logic that can be called directly from Server Components
 * without going through HTTP requests. This is the recommended approach for Next.js App Router.
 * 
 * The API routes use these services internally, and Server Components can call them directly
 * for better performance and to avoid unnecessary HTTP requests.
 * 
 * All functions in this module:
 * - Connect to the database automatically
 * - Throw HttpError for consistent error handling
 * - Return plain objects (not Mongoose documents) for serialization
 */

/**
 * Serializes a Mongoose transaction document or lean object to a plain ITransaction object.
 * 
 * This utility function converts Mongoose-specific types (_id, user as ObjectId) to plain
 * JavaScript types (strings) for safe serialization in Server Components and API responses.
 * 
 * The function handles both Mongoose documents (with .toObject()) and lean objects,
 * ensuring consistent serialization across all transaction operations.
 * 
 * @param {any} transaction - Mongoose document or lean object to serialize
 * @returns {ITransaction} Serialized transaction object with string IDs
 * 
 * @example
 * ```typescript
 * const transaction = await Transaction.findById(id).lean();
 * const serialized = serializeTransaction(transaction);
 * ```
 */
function serializeTransaction(transaction: any): ITransaction {
  // Handle Mongoose document (has toObject method)
  const plainObject = transaction.toObject ? transaction.toObject() : transaction;
  
  return {
    ...plainObject,
    _id: plainObject._id?.toString(),
    user: plainObject.user?.toString(),
  } as ITransaction;
}

/**
 * Serializes an array of Mongoose transaction documents or lean objects to plain ITransaction objects.
 * 
 * This utility function converts an array of Mongoose documents/objects to an array of
 * plain JavaScript objects for safe serialization in Server Components and API responses.
 * 
 * @param {any[]} transactions - Array of Mongoose documents or lean objects to serialize
 * @returns {ITransaction[]} Array of serialized transaction objects with string IDs
 * 
 * @example
 * ```typescript
 * const transactions = await Transaction.find({ user: userId }).lean();
 * const serialized = serializeTransactions(transactions);
 * ```
 */
function serializeTransactions(transactions: any[]): ITransaction[] {
  return transactions.map(transaction => serializeTransaction(transaction));
}

/**
 * Validates if a string is a valid MongoDB ObjectId format.
 * 
 * This utility function checks if the provided ID string matches the ObjectId format
 * before attempting database queries, preventing invalid queries and providing clear error messages.
 * 
 * @param {string} id - Transaction ID to validate
 * @throws {HttpError} Throws 400 Bad Request if ID format is invalid
 * 
 * @example
 * ```typescript
 * validateTransactionId(id);
 * // Throws HttpError.badRequest if invalid
 * ```
 */
function validateTransactionId(id: string): void {
  if (!Types.ObjectId.isValid(id)) {
    throw HttpError.badRequest('Invalid transaction ID format');
  }
}

/**
 * Finds a transaction by ID and validates its existence.
 * 
 * This utility function combines the common pattern of finding a transaction
 * and checking if it exists, reducing code duplication across multiple functions.
 * 
 * @param {string} id - Transaction ID to find
 * @returns {Promise<any>} Mongoose transaction document
 * @throws {HttpError} Throws 404 Not Found if transaction doesn't exist
 * 
 * @example
 * ```typescript
 * const transaction = await findAndValidateTransaction(id);
 * // Throws HttpError.notFound if transaction doesn't exist
 * ```
 */
async function findAndValidateTransaction(id: string): Promise<any> {
  const transaction = await Transaction.findById(id);
  
  if (!transaction) {
    throw HttpError.notFound('Transaction not found');
  }
  
  return transaction;
}

/**
 * Verifies that a transaction belongs to the specified user (ownership verification).
 * 
 * This utility function ensures that users can only access, modify, or delete their own transactions,
 * providing security and preventing unauthorized access to other users' data.
 * 
 * @param {any} transaction - Mongoose transaction document to verify
 * @param {string} userId - User ID to verify ownership against
 * @param {'access' | 'update' | 'delete'} action - Action being performed (for error message context)
 * @throws {HttpError} Throws 403 Forbidden if user doesn't own the transaction
 * 
 * @example
 * ```typescript
 * verifyTransactionOwnership(transaction, userId, 'update');
 * // Throws HttpError.forbidden if user doesn't own the transaction
 * ```
 */
function verifyTransactionOwnership(
  transaction: any, 
  userId: string, 
  action: 'access' | 'update' | 'delete'
): void {
  if (transaction.user.toString() !== userId) {
    throw HttpError.forbidden(`Forbidden: You can only ${action} your own transactions`);
  }
}

/**
 * Retrieves all transactions for a given user ID.
 * 
 * This function connects to the database, queries all transactions belonging to the user,
 * and returns them as plain JavaScript objects for safe serialization in Server Components.
 * 
 * @param {string} userId - User ID to retrieve transactions for
 * @returns {Promise<ITransaction[]>} Array of user's transactions
 * @throws {Error} May throw if database connection fails or query fails
 * 
 * @example
 * ```typescript
 * // In a Server Component
 * const session = await auth();
 * const transactions = await getUserTransactionsServer(session.user.id);
 * ```
 */
export async function getUserTransactionsServer(userId: string): Promise<ITransaction[]> {
  await connectToDatabase();
  
  const transactions = await Transaction.find({ user: userId }).lean();
  
  return serializeTransactions(transactions);
}

/**
 * Creates a new transaction for a given user.
 * 
 * This function validates the input data, connects to the database, creates the transaction,
 * and returns it as a plain JavaScript object for safe serialization.
 * 
 * @param {ITransaction} data - Transaction data to create
 * @param {string} userId - User ID to associate the transaction with
 * @returns {Promise<ITransaction>} Created transaction
 * @throws {Error} May throw if database connection fails, validation fails, or creation fails
 * 
 * @example
 * ```typescript
 * // In a Server Action
 * const session = await auth();
 * const transaction = await createTransactionServer(data, session.user.id);
 * ```
 */
export async function createTransactionServer(
  data: ITransaction,
  userId: string
): Promise<ITransaction> {
  await connectToDatabase();

  const transaction = await Transaction.create({
    ...data,
    user: userId,
  });

  return serializeTransaction(transaction);
}

/**
 * Updates an existing transaction by ID.
 * 
 * This function validates the transaction ID, connects to the database,
 * verifies ownership, updates the transaction, and returns it as a plain object.
 * 
 * @param {string} id - Transaction ID to update
 * @param {Partial<ITransaction>} data - Data to update
 * @param {string} userId - User ID for ownership verification
 * @returns {Promise<ITransaction>} Updated transaction
 * @throws {HttpError} Throws 400 if ID format is invalid
 * @throws {HttpError} Throws 404 if transaction not found
 * @throws {HttpError} Throws 403 if user doesn't own the transaction
 * 
 * @example
 * ```typescript
 * // In a Server Action
 * const session = await auth();
 * const updated = await updateTransactionServer(id, data, session.user.id);
 * ```
 */
export async function updateTransactionServer(
  id: string,
  data: Partial<ITransaction>,
  userId: string
): Promise<ITransaction> {
  await connectToDatabase();

  validateTransactionId(id);
  const existingTransaction = await findAndValidateTransaction(id);
  verifyTransactionOwnership(existingTransaction, userId, 'update');

  // Update transaction
  const transaction = await Transaction.findByIdAndUpdate(
    id,
    { ...data, user: userId },
    { new: true }
  ).lean();

  if (!transaction) {
    throw HttpError.notFound('Transaction not found after update');
  }

  return serializeTransaction(transaction);
}

/**
 * Deletes a transaction by ID.
 * 
 * This function validates the transaction ID, connects to the database,
 * verifies ownership, deletes the transaction, and returns it as a plain object.
 * 
 * @param {string} id - Transaction ID to delete
 * @param {string} userId - User ID for ownership verification
 * @returns {Promise<ITransaction>} Deleted transaction
 * @throws {HttpError} Throws 400 if ID format is invalid
 * @throws {HttpError} Throws 404 if transaction not found
 * @throws {HttpError} Throws 403 if user doesn't own the transaction
 * 
 * @example
 * ```typescript
 * // In a Server Action
 * const session = await auth();
 * const deleted = await deleteTransactionServer(id, session.user.id);
 * ```
 */
export async function deleteTransactionServer(
  id: string,
  userId: string
): Promise<ITransaction> {
  await connectToDatabase();

  validateTransactionId(id);
  const transaction = await findAndValidateTransaction(id);
  verifyTransactionOwnership(transaction, userId, 'delete');

  // Delete transaction
  const deletedTransaction = await Transaction.findByIdAndDelete(id).lean();

  if (!deletedTransaction) {
    throw HttpError.notFound('Transaction not found after deletion');
  }

  return serializeTransaction(deletedTransaction);
}

/**
 * Retrieves a specific transaction by ID.
 * 
 * This function validates the transaction ID, connects to the database,
 * verifies ownership, and returns the transaction as a plain object.
 * 
 * @param {string} id - Transaction ID to retrieve
 * @param {string} userId - User ID for ownership verification
 * @returns {Promise<ITransaction>} Transaction data
 * @throws {HttpError} Throws 400 if ID format is invalid
 * @throws {HttpError} Throws 404 if transaction not found
 * @throws {HttpError} Throws 403 if user doesn't own the transaction
 * 
 * @example
 * ```typescript
 * // In a Server Component
 * const session = await auth();
 * const transaction = await getTransactionByIdServer(id, session.user.id);
 * ```
 */
export async function getTransactionByIdServer(
  id: string,
  userId: string
): Promise<ITransaction> {
  await connectToDatabase();

  validateTransactionId(id);
  const transaction = await findAndValidateTransaction(id);
  verifyTransactionOwnership(transaction, userId, 'access');

  return serializeTransaction(transaction);
}

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

