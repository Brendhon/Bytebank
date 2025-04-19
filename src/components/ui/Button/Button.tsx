import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes, ReactNode } from 'react';
import { Button } from '@headlessui/react';
import { Loader2 } from 'lucide-react';
import { ButtonVariant } from '@/types/ui';

// Button variants - Defines different styles for the button component
// using class-variance-authority (cva) for variant management 
// This dependence is used to create a set of variants for the button component, allowing for easy styling and customization.
// It provides a way to define different styles based on the variant prop passed to the Button component.
// The cva function takes a base class name and an object with variants and their corresponding styles.
export const buttonVariants = cva(
  'button',
  {
    variants: {
      variant: {
        dark: 'button-dark',
        blue: 'button-blue',
        green: 'button-green',
        orange: 'button-orange',
        outlineGreen: 'button-outline-green',
        outlineOrange: 'button-outline-orange',
      },
    },
    defaultVariants: {
      variant: 'blue',
    },
  }
);

// Button props
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: ReactNode;
  className?: string;
  loading?: boolean;
}

// Button component - A reusable button component that accepts variant and children props
export default ({
  className,
  variant,
  children,
  loading = false,
  disabled,
  ...props
}: ButtonProps) => {
  return (
    <Button
      className={cn(buttonVariants({ variant }), className)}
      disabled={disabled || loading}
      {...props}>
      <span className={cn({ 'opacity-0': loading })}>{children}</span>
      {loading && <Loader2 className="animate-spin text-white absolute flex items-center justify-center" />}
    </Button>
  );
}
