'use client'

import { formatCurrency, formatDateToLong } from '@/lib/formatter/formatter'
import { WELCOME_CARD_TEXT } from '@/lib/constants/card/card'
import { Button } from '@/components/ui'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'

/**
 * Props for WelcomeCard component
 * 
 * @interface WelcomeCardProps
 */
export interface WelcomeCardProps {
  /** User's name for personalized greeting */
  name: string
  /** Account balance amount (will be formatted as currency) */
  balance: number
  /** Type of account (e.g., Checking Account, Savings Account) */
  accountType?: string
  /** Date to display (will be formatted to long format) */
  date?: Date
}

/**
 * WelcomeCard component displays a personalized greeting with account balance information.
 * Users can toggle balance visibility for privacy.
 * 
 * @param props - WelcomeCard component props
 * @returns A welcome card with greeting and balance information
 * 
 * @example
 * ```tsx
 * <WelcomeCard 
 *   name="John Doe" 
 *   balance={2500.50} 
 *   accountType="Checking Account"
 * />
 * ```
 */
export const WelcomeCard = ({
  name,
  balance,
  accountType = WELCOME_CARD_TEXT.defaultAccountType,
  date = new Date(),
}: WelcomeCardProps) => {
  const [isBalanceVisible, setIsBalanceVisible] = useState(false)

  const toggleBalanceVisibility = () => {
    setIsBalanceVisible((prev) => !prev)
  }

  const ariaLabel = isBalanceVisible
    ? WELCOME_CARD_TEXT.ariaLabels.hideBalance
    : WELCOME_CARD_TEXT.ariaLabels.showBalance

  return (
    <section className={styles.container} aria-label="Welcome card">
      <div className={styles.greetingSection}>
        <p className={styles.greeting}>{WELCOME_CARD_TEXT.greeting(name)}</p>
        <p className={styles.date}>{formatDateToLong(date)}</p>
      </div>

      <section
        className={styles.balanceSection}
        aria-label={WELCOME_CARD_TEXT.ariaLabels.balanceSection}
        aria-live="polite"
        aria-atomic="true"
      >
        <div className={styles.balanceHeader}>
          <span>{WELCOME_CARD_TEXT.balanceLabel}</span>
          <Button
            className={styles.toggleButton}
            onClick={toggleBalanceVisibility}
            aria-label={ariaLabel}
            aria-pressed={isBalanceVisible}
            variant="dark"
          >
            {isBalanceVisible ? (
              <EyeOff size={24} aria-hidden="true" />
            ) : (
              <Eye size={24} aria-hidden="true" />
            )}
          </Button>
        </div>

        <hr className={styles.divider} aria-hidden="true" />

        <span className={styles.accountType}>{accountType}</span>
        <span className={styles.balanceAmount}>
          {isBalanceVisible ? (
            formatCurrency(balance)
          ) : (
            <span aria-label={WELCOME_CARD_TEXT.ariaLabels.balanceHidden}>
              {WELCOME_CARD_TEXT.hiddenBalance}
            </span>
          )}
        </span>
      </section>
    </section>
  )
}

/**
 * Styles for WelcomeCard component
 * 
 * All Tailwind classes are centralized here for better maintainability
 * and separation of concerns.
 */
const styles = {
  container: 'bg-dark text-white p-6 rounded-md shadow-md flex justify-between items-start gap-6 flex-col sm:flex-row',
  greetingSection: '',
  greeting: 'text-24',
  date: 'text-base mt-2',
  balanceSection: 'w-[125px] flex flex-col items-end gap-1',
  balanceHeader: 'w-full flex items-center justify-between gap-2 text-orange font-medium text-16',
  balanceLabel: '',
  toggleButton: 'cursor-pointer',
  divider: 'w-full border-orange my-2',
  accountType: 'text-sm',
  balanceAmount: 'text-lg font-bold',
} as const
