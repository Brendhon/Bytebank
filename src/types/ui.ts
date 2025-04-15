import { buttonVariants } from '@/components/ui/Button/Button';
import { VariantProps } from 'class-variance-authority';

export type ButtonVariant = VariantProps<typeof buttonVariants>['variant'];

export type HeaderVariant = 'guest' | 'user';

export type InputTypes = 'text' | 'email' | 'password' | 'number';