import { CARD_CONFIG } from "@/lib/constants";
import { cn, formatCardholderName } from "@/lib/utils/utils";
import { ICreditCard } from "@/types/ui";

/**
 * Props for the CreditCard component
 * 
 * @interface CreditCardProps
 * @property {'physical' | 'digital'} variant - Type of credit card (physical or digital)
 * @property {boolean} showInfo - Whether to show card information (expiration, number, CVV)
 * @property {boolean} blocked - Whether the card is blocked
 * @property {string} name - Cardholder full name (will be formatted to show first and last name only)
 * @property {string} [number] - Card number
 * @property {string} [expiration] - Card expiration date (MM/YY format)
 * @property {string} [cvv] - Card CVV code
 */
export interface CreditCardProps extends ICreditCard {
  variant: "physical" | "digital";
  showInfo: boolean;
  blocked: boolean;
}

interface CreditCardDetailsProps {
  cardName: string;
  showInfo: boolean;
  expiration?: string;
  number?: string;
  cvv?: string;
}

interface CreditCardHeaderProps {
  blocked: boolean;
}

/**
 * CreditCardHeader component displays the card brand and blocked status
 * 
 * @component
 * @param {CreditCardHeaderProps} props - Props for the CreditCardHeader component
 */
const CreditCardHeader = ({ blocked }: CreditCardHeaderProps) => (
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

/**
 * CreditCardDetails component displays cardholder name, expiration, number and CVV
 * @component
 * @param {CreditCardDetailsProps} props - Props for the CreditCardDetails component
 */
const CreditCardDetails = ({
  cardName,
  showInfo,
  expiration,
  number,
  cvv,
}: CreditCardDetailsProps) => (
  <div 
    className={styles.detailsContainer}
    id="card-details"
  >
    <div className={styles.detailsRow}>
      <span aria-label={`Cardholder: ${cardName}`}>
        {cardName}
      </span>
      <span aria-label={`Expiration: ${showInfo && expiration ? expiration : 'hidden'}`}>
        {showInfo && expiration ? expiration : CARD_CONFIG.labels.hidden}
      </span>
    </div>

    <div className={styles.detailsRow}>
      <span 
        aria-label={`Card number: ${showInfo && number ? number : 'hidden'}`}
      >
        {showInfo && number ? number : CARD_CONFIG.labels.hiddenNumber}
      </span>
      <span aria-label={`CVV: ${showInfo && cvv ? cvv : 'hidden'}`}>
        {showInfo && cvv ? cvv : CARD_CONFIG.labels.hiddenCvv}
      </span>
    </div>
  </div>
);

/**
 * CreditCard component displays a stylized credit card
 * 
 * @component
 * @example
 * ```tsx
 * <CreditCard 
 *   variant="physical" 
 *   showInfo={false}
 *   blocked={false}
 *   name="John Doe"
 *   number="1234 5678 9012 3456"
 *   expiration="12/25"
 * />
 * ```
 * 
 * @example
 * ```tsx
 * // Digital card with hidden information
 * <CreditCard 
 *   variant="digital" 
 *   showInfo={false}
 *   blocked={false}
 *   name="Jane Smith"
 * />
 * ```
 */
export const CreditCard = ({
  variant,
  showInfo,
  name,
  blocked,
  number,
  expiration,
  cvv,
}: CreditCardProps) => {
  const isPhysical = variant === "physical";
  const cardType = isPhysical ? "Physical" : "Digital";
  const cardName = formatCardholderName(name);

  return (
    <article
      className={cn(styles.container, isPhysical ? styles.physical : styles.digital)}
      aria-label={`${cardType} credit card${blocked ? ', blocked' : ''}`}
      aria-describedby="card-details"
    >
      <CreditCardHeader blocked={blocked} />
      <CreditCardDetails 
        cardName={cardName}
        showInfo={showInfo}
        expiration={expiration}
        number={number}
        cvv={cvv}
      />
      
      {!showInfo && (
        <span className="sr-only">
          Card information is hidden. Enable visibility to view details.
        </span>
      )}
    </article>
  );
};

const styles = {
  container: 'rounded-md text-white p-4 w-[270px] h-[150px] flex flex-col justify-between',
  physical: 'bg-blue',
  digital: 'bg-gray',
  header: 'flex items-center justify-between',
  brandContainer: 'flex flex-col gap-1',
  brandName: 'italic text-24 font-semibold',
  cardTier: 'text-sm',
  blockedBadge: 'text-white text-14-semi bg-dark rounded-md p-2',
  detailsContainer: 'flex flex-col gap-1',
  detailsRow: 'flex justify-between text-center text-14',
} as const;
