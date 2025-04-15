import { buttonVariants } from '@/components/ui/Button/Button';
import { VariantProps } from 'class-variance-authority';

export type ButtonVariant = VariantProps<typeof buttonVariants>['variant'];
