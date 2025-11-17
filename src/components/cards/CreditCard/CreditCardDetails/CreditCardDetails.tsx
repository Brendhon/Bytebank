import { CARD_CONFIG } from "@/lib/constants";

/**
 * Props for the CreditCardDetails component
 * 
 * @interface CreditCardDetailsProps
 * @property {string} cardName - Formatted cardholder name
 * @property {boolean} showInfo - Whether to show card information (expiration, number, CVV)
 * @property {string} [expiration] - Card expiration date (MM/YY format)
 * @property {string} [number] - Card number
 * @property {string} [cvv] - Card CVV code
 */
export interface CreditCardDetailsProps {
  cardName: string;
  showInfo: boolean;
  expiration?: string;
  number?: string;
  cvv?: string;
}

/**
 * CreditCardDetails component displays cardholder name, expiration, number and CVV
 * 
 * @component
 * @param {CreditCardDetailsProps} props - Props for the CreditCardDetails component
 */
export const CreditCardDetails = ({
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

const styles = {
  detailsContainer: 'flex flex-col gap-1',
  detailsRow: 'flex justify-between text-center text-14',
} as const;

