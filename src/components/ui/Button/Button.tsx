'use client';

import { cn } from '@/lib/utils';
import { ButtonVariant } from '@/types/ui';
import { Button as HeadlessButton } from '@headlessui/react';
import { Loader2 } from 'lucide-react';
import { ButtonHTMLAttributes, ReactNode } from 'react';
import { buttonVariants } from './Button.variants';

/**
 * Button component props
 * @interface ButtonProps
 */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style variant of the button */
  variant?: ButtonVariant;
  /** Button content */
  children: ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Shows a loading spinner and disables interaction */
  loading?: boolean;
}

/**
 * Button component with multiple variants and loading state support
 * @param props - Button component props
 * @returns A reusable button component
 */
export default function Button({
  className,
  variant,
  children,
  loading = false,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <HeadlessButton
      className={cn(buttonVariants({ variant }), className)}
      disabled={disabled || loading}
      aria-busy={loading}
      aria-label={loading ? `${children} - Loading` : undefined}
      {...props}>
      <span className={cn({ [styles.span]: loading })}>{children}</span>
      {loading && (
        <Loader2
          className={cn(styles.loader)}
          aria-hidden="true"
        />
      )}
    </HeadlessButton>
  );
}

/**
 * Button component styles
 */
const styles = {
  span: `opacity-0`,
  loader: `animate-spin text-white absolute flex items-center justify-center`,
} as const;