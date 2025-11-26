'use client';

import { Card } from '@/components/cards';
import { CardProps } from '@/types/ui';

/**
 * MovementsSection component props
 * @interface MovementsSectionProps
 */
export interface MovementsSectionProps {
  /** Array of card data to display */
  data: CardProps[];
  /** Additional CSS classes */
  className?: string;
  /** Custom title for the section (optional, uses default if not provided) */
  title?: string;
}

const defaultTitle = 'Movimentações';

/**
 * Movements section component that displays financial movements with cards
 * Renders a section with a title and a grid of cards showing different transaction types
 * @param props - MovementsSection component props
 * @returns A movements section component
 */
export const MovementsSection = ({ data, className, title }: MovementsSectionProps) => {
  const sectionTitle = title || defaultTitle;

  // Validate data array
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <section className={className ? `${styles.section} ${className}` : styles.section}>
        <h2 className={styles.title}>{sectionTitle}</h2>
        <p className={styles.emptyState}>Nenhuma movimentação disponível</p>
      </section>
    );
  }

  return (
    <section className={className ? `${styles.section} ${className}` : styles.section}>
      {/* Title section */}
      <h2 className={styles.title}>{sectionTitle}</h2>

      {/* Cards grid */}
      <div className={styles.grid}>
        {data.map(({ key, label, value, variant }) => (
          <Card key={key} label={label} value={value} variant={variant} />
        ))}
      </div>
    </section>
  );
};

/**
 * MovementsSection component styles
 */
const styles = {
  section: 'card',
  title: 'text-20-bold text-dark-gray mb-6',
  grid: 'sm:grid sm:grid-cols-2 gap-4 flex flex-col items-center',
  emptyState: 'text-gray-500 text-center py-8',
} as const;
