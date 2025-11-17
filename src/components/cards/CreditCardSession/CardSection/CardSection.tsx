import { ReactNode } from 'react';

/**
 * Props for CardSection component
 * 
 * @interface CardSectionProps
 * @property {string} title - Section title
 * @property {ReactNode} children - Section content
 */
export interface CardSectionProps {
  title: string;
  children: ReactNode;
}

/**
 * CardSection component wraps a card with its title and actions
 * 
 * Provides semantic structure for card sections with consistent styling.
 * 
 * @component
 * @example
 * ```tsx
 * <CardSection title="Physical Card">
 *   <CreditCard variant="physical" {...cardProps} />
 *   <CardActions {...actionsProps} />
 * </CardSection>
 * ```
 */
export const CardSection = ({ title, children }: CardSectionProps) => {
  return (
    <div className={styles.section}>
      <h3 className={styles.sectionTitle}>
        {title}
      </h3>
      <div className={styles.sectionContent}>
        {children}
      </div>
    </div>
  );
}

const styles = {
  section: 'flex flex-col gap-2',
  sectionTitle: 'text-14',
  sectionContent: 'flex flex-col items-center gap-4 mb-4 sm:gap-16 sm:flex-row',
} as const;

