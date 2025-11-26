'use server';

import { revalidatePath } from 'next/cache';
import { auth } from '@/lib/auth/auth';
import { 
  createTransactionServer, 
  deleteTransactionServer, 
  updateTransactionServer 
} from '@/services/transaction/transaction.service.server';
import { ITransaction } from '@/types/transaction';

/**
 * Server Action to create a new transaction.
 * 
 * This action validates the user session, associates the transaction
 * with the authenticated user, creates the transaction in the database
 * using direct database access (not HTTP), and revalidates the transactions
 * page to reflect the changes.
 * 
 * @param {ITransaction} data - Transaction data to create
 * @throws {Error} If user is not authenticated
 * @returns {Promise<void>}
 */
export async function createTransactionAction(data: ITransaction): Promise<void> {
  const session = await auth();
  
  if (!session?.user?.id) {
    throw new Error('Unauthorized: User session is required');
  }

  await createTransactionServer(data, session.user.id);
  revalidatePath('/transactions');
}

/**
 * Server Action to update an existing transaction.
 * 
 * This action validates the user session, verifies ownership,
 * updates the transaction in the database using direct database access (not HTTP),
 * and revalidates the transactions page to reflect the changes.
 * 
 * @param {string} id - Transaction ID to update
 * @param {ITransaction} data - Updated transaction data
 * @throws {Error} If user is not authenticated
 * @throws {HttpError} If transaction not found or user doesn't own it
 * @returns {Promise<void>}
 */
export async function updateTransactionAction(id: string, data: ITransaction): Promise<void> {
  const session = await auth();
  
  if (!session?.user?.id) {
    throw new Error('Unauthorized: User session is required');
  }

  await updateTransactionServer(id, data, session.user.id);
  revalidatePath('/transactions');
}

/**
 * Server Action to delete a transaction.
 * 
 * This action validates the user session, verifies ownership,
 * deletes the transaction from the database using direct database access (not HTTP),
 * and revalidates the transactions page to reflect the changes.
 * 
 * @param {string} id - Transaction ID to delete
 * @throws {Error} If user is not authenticated
 * @throws {HttpError} If transaction not found or user doesn't own it
 * @returns {Promise<void>}
 */
export async function deleteTransactionAction(id: string): Promise<void> {
  const session = await auth();
  
  if (!session?.user?.id) {
    throw new Error('Unauthorized: User session is required');
  }

  await deleteTransactionServer(id, session.user.id);
  revalidatePath('/transactions');
}

