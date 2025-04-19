import { z } from 'zod';

export const transactionSchema = z.object({
  type: z.string().min(1, 'Selecione um tipo'),
  alias: z.string().optional(),
  value: z.number().positive('O valor deve ser positivo'),
  date: z.string().min(1, 'Informe uma data'),
})

export type TransactionFormData = z.infer<typeof transactionSchema>