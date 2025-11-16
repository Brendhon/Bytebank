import { z } from 'zod';

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
  email: z
    .string({ required_error: 'Email is required' })
    .email('Invalid email address')
    .max(255, 'Email cannot exceed 255 characters')
    .toLowerCase()
    .trim(),
  password: z
    .string({ required_error: 'Password is required' })
    .min(6, 'Password must be at least 6 characters long')
    .max(128, 'Password cannot exceed 128 characters'),
});

/**
 * Type inferred from loginSchema
 * 
 * Represents the shape of login form data after validation.
 * All fields are validated according to the schema rules.
 */
export type LoginFormData = z.infer<typeof loginSchema>;
