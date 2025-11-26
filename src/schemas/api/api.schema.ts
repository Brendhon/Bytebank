import { z } from 'zod';

/**
 * Zod schema for validating error objects with HTTP status codes
 *
 * Validates error structure including optional message, status code (100-599),
 * and nested cause object with status code.
 *
 * @example
 * ```typescript
 * const error = {
 *   message: 'Not found',
 *   status: 404,
 *   cause: { status: 404 }
 * };
 * const result = errorSchema.safeParse(error);
 * if (result.success) {
 *   console.log(result.data); // Validated error object
 * }
 * ```
 */
export const errorSchema = z.object({
  message: z.string().optional(),
  status: z.number().int().min(100).max(599).optional(),
  cause: z.object({
    status: z.number().int().min(100).max(599).optional(),
  }).optional(),
}).passthrough();

/**
 * Base schema for validating message strings
 *
 * Ensures the message is a non-empty string.
 */
const messageSchema = z.string().min(1, 'A mensagem não pode ser vazia');

/**
 * Zod schema for validating not found message parameter
 *
 * Ensures the message is a non-empty string.
 *
 * @example
 * ```typescript
 * const result = notFoundMessageSchema.safeParse('Resource not found');
 * if (result.success) {
 *   console.log(result.data); // 'Resource not found'
 * }
 * ```
 */
export const notFoundMessageSchema = messageSchema;

/**
 * Zod schema for validating default error message parameter
 *
 * Ensures the message is a non-empty string.
 *
 * @example
 * ```typescript
 * const result = defaultMessageSchema.safeParse('An error occurred');
 * if (result.success) {
 *   console.log(result.data); // 'An error occurred'
 * }
 * ```
 */
export const defaultMessageSchema = messageSchema;

