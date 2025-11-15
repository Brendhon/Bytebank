/**
 * Enumeration of transaction description categories.
 * 
 * @enum {string} TransactionDesc
 * @property {string} deposit - Deposit transaction
 * @property {string} transfer - Transfer transaction
 * @property {string} withdrawal - Withdrawal transaction
 * @property {string} payment - Payment transaction
 */
export enum TransactionDesc {
  deposit = 'Depósito',
  transfer = 'Transferência',
  withdrawal = 'Saque',
  payment = 'Pagamento',
}

/**
 * Enumeration of transaction types (cash flow direction).
 * 
 * @enum {string} TransactionType
 * @property {string} outflow - Money going out (expense)
 * @property {string} inflow - Money coming in (income)
 */
export enum TransactionType {
  outflow = 'Saída',
  inflow = 'Entrada',
}

/**
 * Type representing the keys of the TransactionDesc enum.
 * 
 * @typedef {('deposit' | 'transfer' | 'withdrawal' | 'payment')} TransactionDescKey
 */
export type TransactionDescKey = keyof typeof TransactionDesc;

/**
 * Type representing the keys of the TransactionType enum.
 * 
 * @typedef {('outflow' | 'inflow')} TransactionTypeKey
 */
export type TransactionTypeKey = keyof typeof TransactionType;

/**
 * Represents a financial transaction in the system.
 * 
 * @interface ITransaction
 * @property {string} [_id] - Optional unique identifier for the transaction (MongoDB ObjectId)
 * @property {string} date - Transaction date in ISO format (YYYY-MM-DD)
 * @property {string} [alias] - Optional alias or description for the transaction
 * @property {TransactionTypeKey} type - Type of transaction (inflow or outflow)
 * @property {TransactionDescKey} desc - Description category of the transaction
 * @property {number} value - Transaction amount (positive number)
 * @property {string} [user] - Optional user identifier associated with the transaction
 */
export interface ITransaction {
  _id?: string
  date: string
  alias?: string
  type: TransactionTypeKey
  desc: TransactionDescKey
  value: number
  user?: string
}

/**
 * Represents a summary of transactions with balance and breakdown by category.
 * 
 * @interface TransactionSummary
 * @property {number} balance - Total balance (sum of all transactions)
 * @property {Record<TransactionDescKey, number>} breakdown - Breakdown of transactions by description category
 */
export interface TransactionSummary {
  balance:   number;
  breakdown: Record<TransactionDescKey, number>;
}