import { cardVariants } from '@/components/cards/Card/Card.variants';
import { buttonVariants } from '@/components/ui/Button/Button.variants';
import { VariantProps } from 'class-variance-authority';
import { ReactNode } from 'react';
import { TransactionDescKey } from './transaction';

/**
 * Type representing the variant options for Button component.
 * 
 * @typedef {VariantProps<typeof buttonVariants>['variant']} ButtonVariant
 */
export type ButtonVariant = VariantProps<typeof buttonVariants>['variant'];

/**
 * Type representing the variant options for Card component.
 * 
 * @typedef {VariantProps<typeof cardVariants>['variant']} CardVariant
 */
export type CardVariant = VariantProps<typeof cardVariants>['variant'];

/**
 * Type representing valid HTML input types.
 * 
 * @typedef {('text' | 'email' | 'password' | 'number' | 'date')} InputTypes
 */
export type InputTypes = 'text' | 'email' | 'password' | 'number' | 'date';

/**
 * Represents a toast notification message.
 * 
 * @interface IToast
 * @property {string} [id] - Optional unique identifier for the toast
 * @property {string} message - The message text to display
 * @property {('success' | 'error' | 'info')} variant - Visual variant of the toast
 * @property {number} [duration] - Optional duration in milliseconds before auto-dismiss
 */
export interface IToast {
  id?: string;
  message: string;
  variant: 'success' | 'error' | 'info';
  duration?: number
}

/**
 * Simplified toast object without id
 * @type SimpleToast
 */
export type SimpleToast = Pick<IToast, 'message' | 'duration'>;

/**
 * Toast context type that defines the API exposed by the context
 * @interface ToastContextType
 */
export type ToastContextType = {
  /** Show a toast with custom variant */
  showToast(toast: Omit<IToast, 'id'>): void;
  /** Show a success toast */
  showSuccessToast(toast: SimpleToast): void;
  /** Show an error toast */
  showErrorToast(toast: SimpleToast): void;
};

/**
 * Props for the Card component.
 * 
 * @interface CardProps
 * @property {TransactionDescKey} key - Transaction description key used as identifier
 * @property {CardVariant} [variant] - Optional visual variant of the card
 * @property {string} [label] - Optional label text to display
 * @property {number} [value] - Optional numeric value to display
 * @property {string} [className] - Optional additional CSS classes
 */
export interface CardProps {
  key: TransactionDescKey;
  variant?: CardVariant;
  label?: string;
  value?: number;
  className?: string;
}

/**
 * Represents a column configuration for a table component.
 * 
 * @interface TableColumn
 * @template T - The type of data object in each table row
 * @property {string} label - Display label for the column header
 * @property {keyof T} accessor - Property key to access the value from the row data
 * @property {(value: any, row: T, index: number) => ReactNode} [render] - Optional custom render function for the cell content
 */
export interface TableColumn<T = void> {
  label: string;
  accessor: keyof T;
  render?: (value: any, row: T, index: number) => ReactNode;
}

/**
 * Represents credit card information.
 * 
 * @interface ICreditCard
 * @property {string} name - Cardholder name
 * @property {string} [number] - Optional credit card number (should be masked in production)
 * @property {string} [expiration] - Optional expiration date (MM/YY format)
 * @property {string} [cvv] - Optional CVV code (should never be stored or displayed)
 */
export interface ICreditCard {
  name: string;
  number?: string;
  expiration?: string;
  cvv?: string;
}