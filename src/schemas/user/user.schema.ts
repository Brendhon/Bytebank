import { z } from 'zod';

/**
 * Email validation schema
 * 
 * Validates email with the following requirements:
 * - Valid email format
 * - Maximum 255 characters
 * - Normalized to lowercase
 * - Trimmed (whitespace removed)
 * 
 * @example
 * ```typescript
 * const result = emailValidation.parse('user@example.com');
 * ```
 */
export const emailValidation = z
  .string({ required_error: 'Email is required' })
  .email('Invalid email address')
  .max(255, 'Email cannot exceed 255 characters')
  .toLowerCase()
  .trim();

/**
 * Name validation schema
 * 
 * Validates name with the following requirements:
 * - Minimum 1 character
 * - Maximum 100 characters
 * - Trimmed (whitespace removed)
 * - Cannot be empty after trimming
 * 
 * @example
 * ```typescript
 * const result = nameValidation.parse('John Doe');
 * ```
 */
export const nameValidation = z
  .string({ required_error: 'Field is required' })
  .min(1, 'Field is required')
  .max(100, 'Name cannot exceed 100 characters')
  .trim()
  .refine((val) => val.length > 0, {
    message: 'Name cannot be empty',
  });

/**
 * Strong password validation schema with complexity requirements
 * 
 * Validates password with the following requirements:
 * - Minimum 8 characters
 * - Maximum 128 characters
 * - At least one lowercase letter
 * - At least one uppercase letter
 * - At least one number
 * - At least one special character (@$!%*?&)
 * 
 * @example
 * ```typescript
 * const result = strongPasswordValidation.parse('SecurePass123!');
 * ```
 */
export const strongPasswordValidation = z
  .string({ required_error: 'Password is required' })
  .min(8, 'Password must be at least 8 characters long')
  .max(128, 'Password cannot exceed 128 characters')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[@$!%*?&]/, 'Password must contain at least one special character (@$!%*?&)');

/**
 * Simple password validation schema for backward compatibility
 * 
 * Validates password with minimal requirements:
 * - Minimum 6 characters (for backward compatibility with existing users)
 * - Maximum 128 characters
 * 
 * Note: This validation is used for login and current password fields
 * to maintain compatibility with users registered with the previous
 * validation rules (minimum 6 characters).
 * 
 * @example
 * ```typescript
 * const result = simplePasswordValidation.parse('password123');
 * ```
 */
export const simplePasswordValidation = z
  .string({ required_error: 'Password is required' })
  .min(6, 'Password must be at least 6 characters long')
  .max(128, 'Password cannot exceed 128 characters');

