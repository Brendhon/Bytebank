import { buttonVariants } from '@/components/ui/Button/Button';
import { cardVariants } from '@/components/cards/Card/Card';
import { VariantProps } from 'class-variance-authority';
import { ReactNode } from 'react';

export type ButtonVariant = VariantProps<typeof buttonVariants>['variant'];

export type CardVariant = VariantProps<typeof cardVariants>['variant'];

export type InputTypes = 'text' | 'email' | 'password' | 'number' | 'date';

export interface IToast {
  id?: string;
  message: string;
  variant: 'success' | 'error' | 'info';
  duration?: number
};

export interface CardProps {
  variant?: CardVariant;
  label?: string;
  value?: number;
  className?: string;
}

export interface TableColumn<T = void> {
  label: string;
  accessor: keyof T;
  render?: (value: any, row: T, index: number) => ReactNode;
}

export interface ICreditCard  {
  name: string;
  number?: string;
  expiration?: string;
  cvv?: string;
}

export interface CreditCardProps extends ICreditCard   {
  variant: "physical" | "digital";
  showInfo: boolean;
  blocked: boolean;
};