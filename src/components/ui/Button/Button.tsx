import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes, ReactNode } from 'react';
import { ButtonVariant } from '@/types/ui';
import { Button } from '@headlessui/react';

// Button variants - Defines different styles for the button component
// using class-variance-authority (cva) for variant management 
// This dependence is used to create a set of variants for the button component, allowing for easy styling and customization.
// It provides a way to define different styles based on the variant prop passed to the Button component.
// The cva function takes a base class name and an object with variants and their corresponding styles.
export const buttonVariants = cva(
  'w-[180px] h-[48px] rounded-sm text-white transition-colors disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer font-semibold',
  {
    variants: {
      variant: {
        dark: 'bg-dark hover:bg-dark-gray',
        blue: 'bg-blue hover:bg-dark',
        green: 'bg-green hover:bg-blue',
        orange: 'bg-orange hover:bg-dark',
        outlineGreen:
          'bg-transparent border-2 border-green text-green hover:bg-green hover:text-white',
        outlineOrange:
          'bg-transparent border-2 border-orange text-orange hover:bg-orange hover:text-white',
      },
    },
    defaultVariants: {
      variant: 'blue',
    },
  }
);

// Button props - Combines HTML button attributes with custom variants and children
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: ReactNode;
  className?: string;
};

// Button component - A reusable button component that accepts variant and children props
export default ({
  className,
  variant,
  children,
  ...props
}: ButtonProps) => {
  return (
    <Button className={cn(buttonVariants({ variant }), className)} {...props}>
      {children}
    </Button>
  );
}
