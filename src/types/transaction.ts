// Enum  for transaction types
export enum TransactionType {
  deposit = 'Depósito',
  transfer = 'Transferência',
  withdrawal = 'Saque',
  payment = 'Pagamento',
}

export type TransactionTypeKey = keyof typeof TransactionType

export interface Transaction {
  date: string
  alias?: string
  type: TransactionTypeKey
  value: number
}