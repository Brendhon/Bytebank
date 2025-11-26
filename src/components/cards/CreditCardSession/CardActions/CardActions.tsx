import { Button } from "@/components/ui";
import { CARD_SESSION_TEXT } from "@/lib/constants";

/**
 * Props for CardActions component
 * 
 * @interface CardActionsProps
 * @property {'physical' | 'digital'} type - Type of credit card
 * @property {boolean} isVisible - Whether card information is currently visible
 * @property {boolean} isBlocked - Whether card is currently blocked
 * @property {Function} onToggleVisibility - Callback to toggle card visibility
 * @property {Function} onToggleBlock - Callback to toggle card block status
 */
export interface CardActionsProps {
  type: 'physical' | 'digital';
  isVisible: boolean;
  isBlocked: boolean;
  onToggleVisibility: () => void;
  onToggleBlock: () => void;
}

/**
 * CardActions component provides visibility and block controls for credit cards
 * 
 * Includes accessibility features such as ARIA labels, live regions for state changes,
 * and semantic button groups.
 * 
 * @component
 * @example
 * ```tsx
 * <CardActions
 *   type="physical"
 *   isVisible={false}
 *   isBlocked={false}
 *   onToggleVisibility={() => {}}
 *   onToggleBlock={() => {}}
 * />
 * ```
 */
export const CardActions = ({
  type,
  isVisible,
  isBlocked,
  onToggleVisibility,
  onToggleBlock,
}: CardActionsProps) => {
  const cardTypeLabel = type === 'physical' ? 'Physical' : 'Digital';
  const cardTypeLower = cardTypeLabel.toLowerCase();

  return (
    <div 
      className={styles.actionsContainer}
      role="group"
      aria-label={`${cardTypeLabel} card actions`}
    >
      <Button
        variant={!isVisible ? "blue" : "orange"}
        onClick={onToggleVisibility}
        aria-label={isVisible 
          ? CARD_SESSION_TEXT.ariaLabels.hideInfo(cardTypeLower)
          : CARD_SESSION_TEXT.ariaLabels.showInfo(cardTypeLower)
        }
        aria-pressed={isVisible}
      >
        {!isVisible ? CARD_SESSION_TEXT.actions.show : CARD_SESSION_TEXT.actions.hide}
      </Button>
      <Button
        variant={!isBlocked ? "outlineOrange" : "outlineGreen"}
        onClick={onToggleBlock}
        aria-label={isBlocked 
          ? CARD_SESSION_TEXT.ariaLabels.unblockCard(cardTypeLower)
          : CARD_SESSION_TEXT.ariaLabels.blockCard(cardTypeLower)
        }
        aria-pressed={isBlocked}
      >
        {!isBlocked ? CARD_SESSION_TEXT.actions.block : CARD_SESSION_TEXT.actions.unblock}
      </Button>
      
      <div 
        role="status" 
        aria-live="polite" 
        aria-atomic="true"
        className="sr-only"
      >
        {CARD_SESSION_TEXT.ariaLabels.cardStatus(cardTypeLabel, isBlocked, isVisible)}
      </div>
    </div>
  );
}

const styles = {
  actionsContainer: 'flex flex-col gap-2',
} as const;

