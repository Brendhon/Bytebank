import { z } from 'zod';
import { emailValidation, nameValidation, strongPasswordValidation } from '../user/user.schema';

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
  name: nameValidation,
  email: emailValidation,
  password: strongPasswordValidation,
  confirmPassword: strongPasswordValidation,
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