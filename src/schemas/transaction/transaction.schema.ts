import { TransactionDesc, TransactionDescKey, TransactionType, TransactionTypeKey } from '@/types/transaction';
import { DATE_REGEX } from '@/lib/constants';
import { z } from 'zod';

// Keys
const TransactionDescKeys = Object.keys(TransactionDesc) as [TransactionDescKey, ...Array<TransactionDescKey>];
const TransactionTypeKeys =  Object.keys(TransactionType) as [TransactionTypeKey, ...Array<TransactionTypeKey>];

/**
 * Transaction schema for validating transaction form data
 * Validates description, type, alias, value, and date fields
 * 
 * @example
 * ```typescript
 * const result = transactionSchema.parse({
 *   desc: 'deposit',
 *   type: 'inflow',
 *   alias: 'Salary',
 *   value: 1000.50,
 *   date: '18/04/2025'
 * });
 * ```
 */
export const transactionSchema = z.object({
  desc: z.enum(TransactionDescKeys, {
    errorMap: () => ({ message: 'Por favor, selecione uma descrição' }),
  }),
  type: z.enum(TransactionTypeKeys, {
    errorMap: () => ({ message: 'Por favor, selecione um tipo' }),
  }),
  alias: z.string().max(100, 'O alias não pode ter mais de 100 caracteres').optional(),
  value: z
    .number()
    .min(0, 'O valor deve ser maior ou igual a 0')
    .max(999999999.99, 'O valor é muito grande')
    .refine((val) => {
      const decimalPlaces = (val.toString().split('.')[1] || '').length;
      return decimalPlaces <= 2;
    }, {
      message: 'O valor não pode ter mais de 2 casas decimais',
    }),
  date: z
    .string()
    .min(1, 'Por favor, forneça uma data')
    .regex(DATE_REGEX, 'A data deve estar no formato dd/mm/yyyy')
    .refine((val) => {
      const [day, month, year] = val.split('/').map(Number);
      const date = new Date(year, month - 1, day);
      return date.getDate() === day && date.getMonth() === month - 1 && date.getFullYear() === year;
    }, {
      message: 'Por favor, forneça uma data válida',
    }),
})

/**
 * Type inferred from transactionSchema
 * Represents the shape of transaction form data
 */
export type TransactionFormData = z.infer<typeof transactionSchema>