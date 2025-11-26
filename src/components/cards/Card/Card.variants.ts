import { cva } from 'class-variance-authority';

/**
 * Card variants - Defines different color styles for the Card component
 * using class-variance-authority (cva) for variant management
 * 
 * @example
 * ```tsx
 * import { cardVariants } from './Card.variants';
 * 
 * <div className={cardVariants({ variant: 'blue' })}>
 *   Card content
 * </div>
 * ```
 */
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

