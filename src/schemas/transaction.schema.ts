import { TransactionDesc, TransactionDescKey } from '@/types/transaction';
import { z } from 'zod';

const TransactionDescKeys = Object.keys(TransactionDesc) as [TransactionDescKey, ...Array<TransactionDescKey>];

export const transactionSchema = z.object({
  desc: z.enum(TransactionDescKeys, {
    errorMap: () => ({ message: 'Selecione um tipo' }),
  }),
  alias: z.string().optional(),
  value: z.number().min(0, 'Informe um valor maior que 0'),
  date: z.string().min(1, 'Informe uma data'),
})

export type TransactionFormData = z.infer<typeof transactionSchema>