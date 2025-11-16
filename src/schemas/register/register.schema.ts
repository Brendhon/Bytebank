import { z } from 'zod';

/**
 * Password validation schema with complexity requirements
 * 
 * Validates password with the following requirements:
 * - Minimum 8 characters
 * - Maximum 128 characters
 * - At least one lowercase letter
 * - At least one uppercase letter
 * - At least one number
 * - At least one special character (@$!%*?&)
 */
const passwordValidation = z
  .string({ required_error: 'Password is required' })
  .min(8, 'Password must be at least 8 characters long')
  .max(128, 'Password cannot exceed 128 characters')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[@$!%*?&]/, 'Password must contain at least one special character (@$!%*?&)');

/**
 * Registration schema for validating user registration form data
 * 
 * Validates name, email, password, password confirmation, and privacy policy acceptance.
 * Ensures passwords match and meet complexity requirements.
 * 
 * @example
 * ```typescript
 * const result = registerSchema.parse({
 *   name: 'John Doe',
 *   email: 'john@example.com',
 *   password: 'SecurePass123!',
 *   confirmPassword: 'SecurePass123!',
 *   acceptPrivacy: true
 * });
 * ```
 */
export const registerSchema = z.object({
  name: z
    .string({ required_error: 'Field is required' })
    .min(1, 'Field is required')
    .max(100, 'Name cannot exceed 100 characters')
    .trim()
    .refine((val) => val.length > 0, {
      message: 'Name cannot be empty',
    }),
  email: z
    .string({ required_error: 'Email is required' })
    .email('Invalid email address')
    .max(255, 'Email cannot exceed 255 characters')
    .toLowerCase()
    .trim(),
  password: passwordValidation,
  confirmPassword: passwordValidation,
  acceptPrivacy: z
    .boolean()
    .refine((val) => val === true, {
      message: 'You must accept the terms of use',
    }),
})
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

/**
 * Type inferred from registerSchema
 * 
 * Represents the shape of registration form data after validation.
 * All fields are validated according to the schema rules.
 */
export type RegisterFormData = z.infer<typeof registerSchema>;