import { ITransaction, TransactionDescKey, TransactionTypeKey } from '@/types/transaction';

/**
 * Default transaction values used to initialize the transaction form
 * 
 * @constant {ITransaction} DEFAULT_TRANSACTION
 */
export const DEFAULT_TRANSACTION: ITransaction = {
  desc: 'deposit',
  alias: '',
  value: 0,
  type: 'inflow',
  date: new Date().toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }),
} as const;

/**
 * Mapping from transaction description to transaction type
 * Automatically determines the type based on the selected description
 * 
 * @constant {Record<TransactionDescKey, TransactionTypeKey>} DESC_TO_TYPE_MAP
 * @example
 * ```typescript
 * const type = DESC_TO_TYPE_MAP['deposit']; // 'inflow'
 * const type = DESC_TO_TYPE_MAP['transfer']; // 'outflow'
 * ```
 */
export const DESC_TO_TYPE_MAP: Record<TransactionDescKey, TransactionTypeKey> = {
  deposit: 'inflow',
  transfer: 'outflow',
  withdrawal: 'outflow',
  payment: 'outflow',
} as const;

