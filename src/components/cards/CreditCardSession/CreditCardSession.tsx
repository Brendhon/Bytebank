"use client";

import { ICreditCard } from '@/types/ui';
import { useCreditCardState } from '@/hooks/useCreditCardState/useCreditCardState';
import { CardActions } from './CardActions/CardActions';
import { CardSection } from './CardSection/CardSection';
import { CreditCard } from '../CreditCard/CreditCard';
import { CARD_SESSION_TEXT } from '@/lib/constants';

/**
 * Props for the CreditCardSession component
 * 
 * @interface CreditCardSessionProps
 * @property {ICreditCard} physical - Physical credit card data
 * @property {ICreditCard} digital - Digital credit card data
 */
export interface CreditCardSessionProps {
  physical: ICreditCard;
  digital: ICreditCard;
}

/**
 * CreditCardSession component displays and manages physical and digital credit cards
 * 
 * Provides interactive controls for showing/hiding card information
 * and blocking/unblocking cards.
 * 
 * @component
 * @example
 * ```tsx
 * <CreditCardSession 
 *   physical={physicalCardData} 
 *   digital={digitalCardData} 
 * />
 * ```
 * 
 * @example
 * ```tsx
 * // With card data
 * <CreditCardSession 
 *   physical={{
 *     name: "John Doe",
 *     number: "1234 5678 9012 3456",
 *     expiration: "12/25",
 *     cvv: "123"
 *   }}
 *   digital={{
 *     name: "John Doe",
 *     number: "5532 6475 8570 4251",
 *     expiration: "03/25",
 *     cvv: "514"
 *   }}
 * />
 * ```
 */
export default function CreditCardSession({ physical, digital }: CreditCardSessionProps) {
  const { physicalState, digitalState, toggleVisibility, toggleBlock } = useCreditCardState();

  return (
    <section 
      className={styles.container}
      aria-labelledby="card-session-title"
    >
      <h2 id="card-session-title" className={styles.title}>
        {CARD_SESSION_TEXT.title}
      </h2>

      <CardSection title={CARD_SESSION_TEXT.physicalCard}>
        <CreditCard
          variant="physical"
          showInfo={physicalState.showInfo}
          blocked={physicalState.blocked}
          {...physical}
        />
        <CardActions
          type="physical"
          isVisible={physicalState.showInfo}
          isBlocked={physicalState.blocked}
          onToggleVisibility={() => toggleVisibility('physical')}
          onToggleBlock={() => toggleBlock('physical')}
        />
      </CardSection>

      <CardSection title={CARD_SESSION_TEXT.digitalCard}>
        <CreditCard
          variant="digital"
          showInfo={digitalState.showInfo}
          blocked={digitalState.blocked}
          {...digital}
        />
        <CardActions
          type="digital"
          isVisible={digitalState.showInfo}
          isBlocked={digitalState.blocked}
          onToggleVisibility={() => toggleVisibility('digital')}
          onToggleBlock={() => toggleBlock('digital')}
        />
      </CardSection>
    </section>
  );
}

const styles = {
  container: 'card flex flex-col gap-2',
  title: 'text-20-bold text-dark mb-2',
} as const;
