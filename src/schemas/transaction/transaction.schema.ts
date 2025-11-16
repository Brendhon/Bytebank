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
    errorMap: () => ({ message: 'Please select a description' }),
  }),
  type: z.enum(TransactionTypeKeys, {
    errorMap: () => ({ message: 'Please select a type' }),
  }),
  alias: z.string().max(100, 'Alias cannot exceed 100 characters').optional(),
  value: z
    .number()
    .min(0, 'Value must be greater than or equal to 0')
    .max(999999999.99, 'Value is too large')
    .refine((val) => {
      const decimalPlaces = (val.toString().split('.')[1] || '').length;
      return decimalPlaces <= 2;
    }, {
      message: 'Value cannot have more than 2 decimal places',
    }),
  date: z
    .string()
    .min(1, 'Please provide a date')
    .regex(DATE_REGEX, 'Date must be in format dd/mm/yyyy')
    .refine((val) => {
      const [day, month, year] = val.split('/').map(Number);
      const date = new Date(year, month - 1, day);
      return date.getDate() === day && date.getMonth() === month - 1 && date.getFullYear() === year;
    }, {
      message: 'Please provide a valid date',
    }),
})

/**
 * Type inferred from transactionSchema
 * Represents the shape of transaction form data
 */
export type TransactionFormData = z.infer<typeof transactionSchema>