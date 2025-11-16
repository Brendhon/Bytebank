import { ClassValue, clsx } from 'clsx';
import { Session } from 'next-auth';
import { twMerge } from 'tailwind-merge';
import { DATE_REGEX, EMAIL_REGEX } from '../constants/regex/regex';

/**
 * Utility function to merge class names
 * @param {ClassValue[]} inputs - Class names to be merged
 * @returns {string} - Merged class names
 */
export const cn = (...inputs: ClassValue[]): string => twMerge(clsx(inputs));

/**
 * Type guard to check if a value is a valid number
 * @param {unknown} value - The value to check
 * @returns {boolean} True if the value is a number, false otherwise
 */
export const isNumber = (value: unknown): value is number => {
  return typeof value === 'number' && !isNaN(value);
};

/**
 * Parses a date string in format 'dd/mm/yyyy' to a Date object
 * @param {string} dateStr - The date string to parse (format: 'dd/mm/yyyy')
 * @returns {Date} A Date object representing the parsed date
 * @throws {Error} If the date string is not in the expected format or contains invalid values
 */
export const parseDate = (dateStr: string): Date => {
  if (!DATE_REGEX.test(dateStr)) {
    throw new Error(`parseDate: Invalid date format. Expected 'dd/mm/yyyy', got '${dateStr}'`);
  }
  
  const [day, month, year] = dateStr.split('/').map(Number);
  
  if (isNaN(day) || isNaN(month) || isNaN(year)) {
    throw new Error(`parseDate: Invalid date values in '${dateStr}'`);
  }
  
  const date = new Date(year, month - 1, day); // month is 0-based
  
  if (isNaN(date.getTime())) {
    throw new Error(`parseDate: Invalid date '${dateStr}'`);
  }
  
  return date;
};

/**
 * Checks if an email string matches the valid email format pattern
 * @param {string} email - The email string to validate
 * @returns {boolean} - True if the email format is valid, false otherwise
 */
export const isEmailFormatValid = (email: string): boolean => EMAIL_REGEX.test(email);

/**
 * Sorts an array of objects by a specific date property (format: 'dd/mm/yyyy')
 * @param {T[]} arr - The array to sort
 * @param {keyof T} dateKey - The key of the date property to sort by
 * @returns {T[]} The sorted array in descending order (newest first)
 * @throws {Error} If arr is not an array
 */
export const sortByDate = <T>(arr: T[], dateKey: keyof T): T[] => {
  if (!Array.isArray(arr)) {
    throw new Error('sortByDate: arr must be an array');
  }
  
  if (arr.length === 0) {
    return arr;
  }
  
  return arr.sort((a, b) => {
    try {
      const dateA = parseDate(a[dateKey] as unknown as string);
      const dateB = parseDate(b[dateKey] as unknown as string);
      return dateB.getTime() - dateA.getTime(); // Descending order
    } catch (error) {
      console.error('Error sorting by date:', error);
      return 0;
    }
  });
};

/**
 * Gets a field value from the session user object
 * @param {Session | null} session - The session object from next-auth
 * @param {string} field - The field name to retrieve from the user object
 * @returns {string} The field value if it exists, empty string otherwise
 */
export const getFieldFromSession = (session: Session | null, field: string): string => {
  const user = session?.user;

  if (!user) return '';

  return field in user ? (user[field as keyof typeof user] || '') : '';
};

/**
 * Removes empty fields from an object
 * @param {T} obj - The object to clean
 * @returns {Partial<T>} - The cleaned object
 */
export const removeEmptyFields = <T extends Record<string, unknown>>(obj: T): Partial<T> => {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => value !== '' && value !== undefined && value !== null)
  ) as Partial<T>;
};
