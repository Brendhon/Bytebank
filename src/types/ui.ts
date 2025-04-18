import { buttonVariants } from '@/components/ui/Button/Button';
import { cardVariants } from '@/components/ui/Card/Card';
import { VariantProps } from 'class-variance-authority';

export type ButtonVariant = VariantProps<typeof buttonVariants>['variant'];

export type CardVariant = VariantProps<typeof cardVariants>['variant'];

export type InputTypes = 'text' | 'email' | 'password' | 'number';

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