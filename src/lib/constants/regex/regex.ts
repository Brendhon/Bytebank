/**
 * Regular expression for validating email addresses
 * @constant {RegExp} EMAIL_REGEX
 * @description Matches email addresses in the format: username@domain.com
 * @example
 * const email = 'test@example.com';
 * if (EMAIL_REGEX.test(email)) {
 *   console.log('Email is valid');
 * }
 */
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Regular expression for validating date format dd/mm/yyyy
 * @constant {RegExp} DATE_REGEX
 * @description Matches dates in the format: dd/mm/yyyy (e.g., 18/04/2025)
 * @example
 * const date = '18/04/2025';
 * if (DATE_REGEX.test(date)) {
 *   console.log('Date format is valid');
 * }
 */
export const DATE_REGEX = /^\d{2}\/\d{2}\/\d{4}$/;