import { cn } from '@/lib/utils/utils';
import { Popover as PopoverHeadless, PopoverBackdrop, PopoverButton, PopoverPanel } from '@headlessui/react';
import { ReactNode } from 'react';

/**
 * Popover component props
 * @interface PopoverProps
 */
export interface PopoverProps {
  /** Additional CSS classes for the panel */
  className?: string;
  /** Button or trigger element to open the popover */
  button: ReactNode;
  /** Content to display inside the popover panel */
  children: ReactNode;
}

/**
 * Popover component that displays a popover with button and panel
 * Uses Headless UI for accessibility and positioning
 * Supports custom button, content, and styling
 * @param props - Popover component props
 * @returns A popover component
 */
export const Popover = ({ className, button, children }: PopoverProps) => {
  const panelClassName = cn(styles.panel, className);

  return (
    <PopoverHeadless className={styles.popover}>
      <PopoverButton className={styles.button}>{button}</PopoverButton>

      {/* Backdrop to close the popover when clicking outside */}
      {/* Reference: https://github.com/tailwindlabs/headlessui/discussions/2731 */}
      <PopoverBackdrop className={styles.backdrop} />

      <PopoverPanel anchor="bottom end" className={panelClassName}>
        {({ close }) => (
          <div
            onClick={() => close()}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') close();
            }}
          >
            {children}
          </div>
        )}
      </PopoverPanel>
    </PopoverHeadless>
  );
};

/**
 * Popover component styles
 */
const styles = {
  popover: 'relative',
  button: 'outline-none focus:outline-none',
  backdrop: 'fixed inset-0 bg-transparent',
  panel: 'flex flex-col w-[200px] bg-white shadow-lg text-dark-gray rounded-sm',
} as const;
