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
  .string({ required_error: 'Email é requerido' })
  .email('Endereço de email inválido')
  .max(255, 'Email não pode ter mais de 255 caracteres')
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
  .string({ required_error: 'Campo é requerido' })
  .min(1, 'Campo é requerido')
  .max(100, 'Nome não pode ter mais de 100 caracteres')
  .trim()
  .refine((val) => val.length > 0, {
    message: 'Nome não pode ser vazio',
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
  .string({ required_error: 'Senha é requerida' })
  .min(8, 'Senha deve ter pelo menos 8 caracteres')
  .max(128, 'Senha não pode ter mais de 128 caracteres')
  .regex(/[a-z]/, 'Senha deve ter pelo menos uma letra minúscula')
  .regex(/[A-Z]/, 'Senha deve ter pelo menos uma letra maiúscula')
  .regex(/[0-9]/, 'Senha deve ter pelo menos um número')
  .regex(/[@$!%*?&]/, 'Senha deve ter pelo menos um caractere especial (@$!%*?&)');

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
  .string({ required_error: 'Senha é requerida' })
  .min(6, 'Senha deve ter pelo menos 6 caracteres')
  .max(128, 'Senha não pode ter mais de 128 caracteres');

