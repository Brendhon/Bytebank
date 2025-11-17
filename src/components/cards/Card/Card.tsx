import { formatCurrency } from '@/lib/formatter/formatter';
import { cn, isNumber } from '@/lib/utils/utils';
import { CardProps } from '@/types/ui';
import { cardVariants } from './Card.variants';
import { Loader2 } from 'lucide-react';

/**
 * CardValue component displays the formatted currency value or a loading spinner
 * 
 * @component
 * @param {number | undefined} value - Numeric value to display (formatted as currency)
 */
function CardValue({ value }: { value?: number }) {
  return (
    <div 
      className={styles.value}
      aria-live="polite"
      aria-atomic="true"
      role="status"
    >
      {isNumber(value) ? (
        <span aria-label={`Amount: ${formatCurrency(value)}`}>
          {formatCurrency(value)}
        </span>
      ) : (
        <>
          <Loader2 className={styles.loader} size={40} />
          <span className="sr-only">Loading amount...</span>
        </>
      )}
    </div>
  );
}

/**
 * CardLabel component displays the label text below the value
 * 
 * @component
 * @param {string} label - Label text to display
 */
function CardLabel({ label }: { label: string }) {
  return (
    <span className={styles.label} id={`card-label-${label}`}>
      {label}
    </span>
  );
}

/**
 * Card component displays financial information with different color variants
 * 
 * @component
 * @example
 * ```tsx
 * <Card 
 *   variant="blue" 
 *   value={24000} 
 *   label="Deposits" 
 * />
 * ```
 * 
 * @example
 * ```tsx
 * // Loading state
 * <Card variant="dark" label="Payments" />
 * ```
 */
export const Card = ({
  variant,
  className,
  value,
  label = 'Payments',
}: CardProps) => {
  return (
    <article 
      className={cn(cardVariants({ variant }), className)}
      role="article"
      aria-label={`Financial card showing ${label}`}
    >
      <CardValue value={value} />
      <CardLabel label={label} />
    </article>
  );
}

const styles = {
  value: 'text-20-bold',
  label: 'text-14',
  loader: 'animate-spin text-white',
} as const;
