// Enums
export enum TransactionDesc {
  deposit = 'Depósito',
  transfer = 'Transferência',
  withdrawal = 'Saque',
  payment = 'Pagamento',
}

export enum TransactionType {
  outflow = 'Saída',
  inflow = 'Entrada',
}

// Types
export type TransactionDescKey = keyof typeof TransactionDesc;
export type TransactionTypeKey = keyof typeof TransactionType;

// Interface for transaction
export interface ITransaction {
  _id?: string
  date: string
  alias?: string
  type: TransactionTypeKey
  desc: TransactionDescKey
  value: number
  user: string
}