import { cn, formatCardholderName } from "@/lib/utils/utils";
import { ICreditCard } from "@/types/ui";
import { CreditCardHeader } from "./CreditCardHeader/CreditCardHeader";
import { CreditCardDetails } from "./CreditCardDetails/CreditCardDetails";

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
} as const;
