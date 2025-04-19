import { TransactionType, TransactionTypeKey } from '@/types/transaction';
import { z } from 'zod';

const transactionTypeKeys = Object.keys(TransactionType) as [TransactionTypeKey, ...Array<TransactionTypeKey>];

export const transactionSchema = z.object({
  type: z.enum(transactionTypeKeys, {
    errorMap: () => ({ message: 'Selecione um tipo' }),
  }),
  alias: z.string().optional(),
  value: z.number().min(0, 'Informe um valor maior que 0'),
  date: z.string().min(1, 'Informe uma data'),
})

export type TransactionFormData = z.infer<typeof transactionSchema>