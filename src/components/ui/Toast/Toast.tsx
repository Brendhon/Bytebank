'use client';

import { cn } from '@/lib/utils/utils';
import { IToast } from '@/types/ui';
import { Button, Transition } from '@headlessui/react';
import { CheckCircle, Info, X, XCircle } from 'lucide-react';
import { useState, useCallback } from 'react';
import { useAutoClose } from '@/hooks';

/**
 * Toast component props
 * @interface ToastProps
 */
export interface ToastProps extends IToast {
  /** Controls visibility of the toast */
  show?: boolean;
  /** Callback fired when toast is closed */
  onClose?: () => void;
  /** Position of the toast on screen */
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  /** Custom accessible label for screen readers */
  ariaLabel?: string;
}

/**
 * Toast notification component with auto-dismiss and close functionality
 * Supports multiple variants (success, error, info) and provides accessibility features
 * @param props - Toast component props
 * @returns A toast notification component with transitions
 */
export default function Toast({
  message,
  variant = 'info',
  show = true,
  onClose,
  duration = 0,
  position = 'top-right',
  ariaLabel,
}: ToastProps) {
  const [isVisible, setIsVisible] = useState(show);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    onClose?.();
  }, [onClose]);

  useAutoClose(isVisible, duration, handleClose);

  const toastClassName = cn(
    styles.base,
    styles.positionClasses[position],
    styles.variantClasses[variant]
  );

  const role = variant === 'error' ? 'alert' : 'status';
  const ariaLive = variant === 'error' ? 'assertive' : 'polite';
  const defaultAriaLabel = ariaLabel || `${variant} notification: ${message}`;

  const icons = {
    success: <CheckCircle className={styles.icon} />,
    error: <XCircle className={styles.icon} />,
    info: <Info className={styles.icon} />,
  } as const;

  return (
    <Transition
      show={isVisible}
      enter={styles.enter}
      enterFrom={styles.enterFrom}
      enterTo={styles.enterTo}
      leave={styles.leave}
      leaveFrom={styles.leaveFrom}
      leaveTo={styles.leaveTo}
    >
      <div
        className={toastClassName}
        role={role}
        aria-live={ariaLive}
        aria-atomic="true"
        aria-label={defaultAriaLabel}
      >
        <div>{icons[variant]}</div>
        <p className={styles.message}>{message}</p>
        <Button onClick={handleClose} className={styles.closeButton}>
          <X className={styles.closeIcon} />
        </Button>
      </div>
    </Transition>
  );
}

/**
 * Toast component styles
 */
const styles = {
  base: `fixed z-50 h-12 flex gap-3 rounded-sm p-3 shadow-lg text-white min-w-[250px] flex-row justify-between items-center`,
  enter: `transition ease-out duration-200`,
  enterFrom: `translate-y-2 opacity-0`,
  enterTo: `translate-y-0 opacity-100`,
  leave: `transition ease-in duration-150`,
  leaveFrom: `opacity-100`,
  leaveTo: `opacity-0`,
  positionClasses: {
    'top-right': `top-20 right-4`,
    'top-left': `top-20 left-4`,
    'bottom-right': `bottom-4 right-4`,
    'bottom-left': `bottom-4 left-4`,
  },
  variantClasses: {
    success: `bg-green`,
    error: `bg-red`,
    info: `bg-blue`,
  },
  icon: `text-white w-5 h-5`,
  message: `text-14 flex-1`,
  closeButton: `ml-2`,
  closeIcon: `w-4 h-4 cursor-pointer`,
} as const;
