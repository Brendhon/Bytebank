import { TransactionDesc, TransactionDescKey, TransactionType, TransactionTypeKey } from '@/types/transaction';
import { z } from 'zod';

// Keys
const TransactionDescKeys = Object.keys(TransactionDesc) as [TransactionDescKey, ...Array<TransactionDescKey>];
const TransactionTypeKeys =  Object.keys(TransactionType) as [TransactionTypeKey, ...Array<TransactionTypeKey>];

export const transactionSchema = z.object({
  desc: z.enum(TransactionDescKeys, {
    errorMap: () => ({ message: 'Selecione uma descrição' }),
  }),
  type: z.enum(TransactionTypeKeys, {
    errorMap: () => ({ message: 'Selecione um tipo' }),
  }),
  alias: z.string().optional(),
  value: z.number().min(0, 'Informe um valor maior que 0'),
  date: z.string().min(1, 'Informe uma data'),
})

export type TransactionFormData = z.infer<typeof transactionSchema>