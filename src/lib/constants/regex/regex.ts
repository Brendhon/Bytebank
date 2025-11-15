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