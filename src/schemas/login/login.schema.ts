import { z } from 'zod';
import { emailValidation, simplePasswordValidation } from '../user/user.schema';

/**
 * Login schema for validating login form data
 * 
 * Validates email and password fields. Note that password validation
 * maintains a minimum of 6 characters for backward compatibility with
 * existing users who were registered with the previous validation rules.
 * 
 * @example
 * ```typescript
 * const result = loginSchema.parse({
 *   email: 'user@example.com',
 *   password: 'password123'
 * });
 * ```
 */
export const loginSchema = z.object({
  email: emailValidation,
  password: simplePasswordValidation,
});

/**
 * Type inferred from loginSchema
 * 
 * Represents the shape of login form data after validation.
 * All fields are validated according to the schema rules.
 */
export type LoginFormData = z.infer<typeof loginSchema>;
