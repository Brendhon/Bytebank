import { ITransaction, TransactionDescKey, TransactionTypeKey } from '@/types/transaction';

/**
 * Generates the current date in pt-BR format (dd/mm/yyyy)
 * This function should be called at runtime (in client components) to avoid hydration mismatches
 * 
 * @returns {string} Formatted date string
 */
export const getCurrentDate = (): string => {
  return new Date().toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};

/**
 * Default transaction values used to initialize the transaction form
 * 
 * Note: The date field is intentionally omitted here to prevent hydration mismatches.
 * The date should be generated at runtime in client components using getCurrentDate().
 * 
 * @constant {Omit<ITransaction, 'date'>} DEFAULT_TRANSACTION
 */
export const DEFAULT_TRANSACTION: Omit<ITransaction, 'date'> = {
  desc: 'deposit',
  alias: '',
  value: 0,
  type: 'inflow',
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

