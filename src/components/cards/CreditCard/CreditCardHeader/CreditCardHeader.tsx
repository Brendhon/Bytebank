import { CARD_CONFIG } from "@/lib/constants";

/**
 * Props for the CreditCardHeader component
 * 
 * @interface CreditCardHeaderProps
 * @property {boolean} blocked - Whether the card is blocked
 */
export interface CreditCardHeaderProps {
  blocked: boolean;
}

/**
 * CreditCardHeader component displays the card brand and blocked status
 * 
 * @component
 * @param {CreditCardHeaderProps} props - Props for the CreditCardHeader component
 */
export const CreditCardHeader = ({ blocked }: CreditCardHeaderProps) => (
  <header className={styles.header}>
    <div className={styles.brandContainer}>
      <div className={styles.brandName} aria-label={`Card brand: ${CARD_CONFIG.brand.name}`}>
        {CARD_CONFIG.brand.name}
      </div>
      <div className={styles.cardTier} aria-label={`Card tier: ${CARD_CONFIG.brand.tier}`}>
        {CARD_CONFIG.brand.tier}
      </div>
    </div>
    {blocked && (
      <span 
        className={styles.blockedBadge}
        role="status"
        aria-live="polite"
        aria-label="Card status: Blocked"
      >
        {CARD_CONFIG.labels.blocked}
      </span>
    )}
  </header>
);

const styles = {
  header: 'flex items-center justify-between',
  brandContainer: 'flex flex-col gap-1',
  brandName: 'italic text-24 font-semibold',
  cardTier: 'text-sm',
  blockedBadge: 'text-white text-14-semi bg-dark rounded-md p-2',
} as const;

