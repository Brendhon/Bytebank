import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes, ReactNode } from 'react';
import { Button as HeadlessButton } from '@headlessui/react';
import { Loader2 } from 'lucide-react';
import { ButtonVariant } from '@/types/ui';
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
      <span className={cn({ 'opacity-0': loading })}>{children}</span>
      {loading && (
        <Loader2 
          className="animate-spin text-white absolute flex items-center justify-center" 
          aria-hidden="true"
        />
      )}
    </HeadlessButton>
  );
}
