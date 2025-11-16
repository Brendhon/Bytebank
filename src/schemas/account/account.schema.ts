import { z } from 'zod';
import { emailValidation, nameValidation, simplePasswordValidation, strongPasswordValidation } from '../user/user.schema';

/**
 * Account schema for validating account update form data
 * 
 * Validates name, email, current password, and optional new password fields.
 * The current password uses simple validation (minimum 6 characters) for backward
 * compatibility with existing users. The new password uses strong validation
 * (minimum 8 characters with complexity requirements) to ensure security.
 * 
 * @example
 * ```typescript
 * const result = accountSchema.parse({
 *   name: 'John Doe',
 *   email: 'john@example.com',
 *   password: 'currentPassword123',
 *   newPassword: 'SecurePass123!',
 *   confirmPassword: 'SecurePass123!'
 * });
 * ```
 */
export const accountSchema = z.object({
  name: nameValidation,
  email: emailValidation,
  password: simplePasswordValidation,
  newPassword: z
    .string()
    .optional()
    .refine((val) => !val || strongPasswordValidation.safeParse(val).success, {
      message: 'New password must be at least 8 characters long and contain uppercase, lowercase, number, and special character (@$!%*?&)',
    }),
  confirmPassword: z
    .string()
    .optional(),
})
  .refine((data) => !data.newPassword || data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

/**
 * Type inferred from accountSchema
 * 
 * Represents the shape of account form data after validation.
 * All fields are validated according to the schema rules.
 */
export type AccountFormData = z.infer<typeof accountSchema>;