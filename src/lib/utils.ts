import { ClassValue, clsx } from 'clsx';
import { DefaultSession, Session } from 'next-auth';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function to merge class names
 * @param {ClassValue[]} inputs - Class names to be merged
 * @returns {string} - Merged class names
 */
export const cn = (...inputs: ClassValue[]): string => twMerge(clsx(inputs));

// Check if value is a number
export const isNumber = (value: any): value is number => typeof value === 'number' && !isNaN(value);

// Parse date from string format 'dd/mm/yyyy' to Date object
export const parseDate = (dateStr: string) => {
  const [day, month, year] = dateStr.split('/').map(Number);
  return new Date(year, month - 1, day); // month é 0-based
};

// Sort an array of objects by a specific date (dd/mm/yyyy) property
export const sortByDate = <T>(arr: T[], dateKey: keyof T) => {
  return arr.sort((a, b) => {
    const dateA = parseDate(a[dateKey] as unknown as string);
    const dateB = parseDate(b[dateKey] as unknown as string);
    return dateB.getTime() - dateA.getTime(); // Descending order
  });
};

// Get field from session
export const getFieldFromSession = (session: Session | null, field: string): string => {
  // Check if session is loading
  const user = session?.user;

  // Check if session is loading or not authenticated
  if (!user) return '';

  // Check if field exists in user object
  return field in user ? (user[field as keyof typeof user] || '') : '';
};
