// Enum  for transaction types
export enum TransactionDesc {
  deposit = 'Depósito',
  transfer = 'Transferência',
  withdrawal = 'Saque',
  payment = 'Pagamento',
}

export type TransactionDescKey = keyof typeof TransactionDesc;

export interface ITransaction {
  id?: string
  date: string
  alias?: string
  desc: TransactionDescKey
  value: number
}