import { cn } from '@/lib/utils';
import { CardProps } from '@/types/ui';
import { cva } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';

// Button variants - Defines different styles for the button component
// using class-variance-authority (cva) for variant management 
// This dependence is used to create a set of variants for the button component, allowing for easy styling and customization.
// It provides a way to define different styles based on the variant prop passed to the Button component.
// The cva function takes a base class name and an object with variants and their corresponding styles.
export const cardVariants = cva(
  'w-[200px] h-[160px] rounded-sm text-white transition-colors flex flex-col gap-7 items-center justify-center shadow-sm',
  {
    variants: {
      variant: {
        dark: 'bg-dark',
        blue: 'bg-blue',
        green: 'bg-green',
        orange: 'bg-orange',
      },
    },
    defaultVariants: {
      variant: 'dark',
    },
  }
);

// Button component - A reusable button component that accepts variant and children props
export default ({
  variant,
  className,
  value,
  label = 'Pagamentos',
}: CardProps) => {
  // Check if value is a number
  const isValueNumber = (value: number | undefined): value is number => typeof value === 'number' && !isNaN(value);

  // Format value to a money string
  const formatValue = (value: number): string => {
    return Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      currencyDisplay: 'symbol',
    }).format(value);
  };

  return (
    <div className={cn(cardVariants({ variant }), className)}>
      {
        // Check if value is a number and format it, otherwise show a loader
        isValueNumber(value)
          ? <span className="text-20-bold">{formatValue(value)}</span>
          : <Loader2 className="animate-spin text-white" size={40} />
      }
      <span className="text-14">{label}</span>
    </div>
  );
}
