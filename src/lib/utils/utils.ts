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
 * Checks if a value exists and can be used as a date
 * @param {unknown} value - The value to check
 * @returns {boolean} True if the value exists and is not empty
 */
const hasValidDateValue = (value: unknown): boolean => {
  return value !== null && value !== undefined && value !== '';
};

/**
 * Safely parses a date string and returns its timestamp
 * @param {unknown} dateValue - The date value to parse
 * @returns {number | null} The timestamp if parsing succeeds, null otherwise
 */
const getDateTimestamp = (dateValue: unknown): number | null => {
  if (!hasValidDateValue(dateValue)) {
    return null;
  }

  try {
    const date = parseDate(dateValue as string);
    return date.getTime();
  } catch (error) {
    return null;
  }
};

/**
 * Compares two date timestamps in descending order (newest first)
 * @param {number} timestampA - First date timestamp
 * @param {number} timestampB - Second date timestamp
 * @returns {number} Comparison result for sorting
 */
const compareDateTimestamps = (timestampA: number, timestampB: number): number => {
  return timestampB - timestampA;
};

/**
 * Handles comparison when one or both date values are invalid
 * Invalid dates are placed at the end of the sorted array
 * @param {boolean} hasValueA - Whether the first value is valid
 * @param {boolean} hasValueB - Whether the second value is valid
 * @returns {number} Comparison result for sorting
 */
const handleInvalidDateComparison = (hasValueA: boolean, hasValueB: boolean): number => {
  if (!hasValueA && !hasValueB) return 0;
  if (!hasValueA) return 1; // Put invalid dates at the end
  if (!hasValueB) return -1; // Put invalid dates at the end
  return 0; // Should not reach here, but TypeScript requires it
};

/**
 * Compares two objects by their date property values
 * @param {T} a - First object
 * @param {T} b - Second object
 * @param {keyof T} dateKey - The key of the date property
 * @returns {number} Comparison result for sorting
 */
const compareDates = <T>(a: T, b: T, dateKey: keyof T): number => {
  const dateValueA = a[dateKey];
  const dateValueB = b[dateKey];

  const hasValueA = hasValidDateValue(dateValueA);
  const hasValueB = hasValidDateValue(dateValueB);

  // Handle invalid or missing date values
  if (!hasValueA || !hasValueB) {
    return handleInvalidDateComparison(hasValueA, hasValueB);
  }

  // Try to parse both dates
  const timestampA = getDateTimestamp(dateValueA);
  const timestampB = getDateTimestamp(dateValueB);

  // If parsing fails for either value, log error and maintain order
  if (timestampA === null || timestampB === null) {
    console.error('Error parsing dates for sorting:', {
      dateKey,
      valueA: dateValueA,
      valueB: dateValueB
    });
    return 0;
  }

  // Compare valid timestamps in descending order
  return compareDateTimestamps(timestampA, timestampB);
};

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
  
  return arr.sort((a, b) => compareDates(a, b, dateKey));
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
