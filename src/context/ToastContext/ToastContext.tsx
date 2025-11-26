'use client';

import { Toast } from '@/components/ui';
import { useAutoRemoveToasts } from '@/hooks';
import {
  createErrorToast,
  createSuccessToast,
  createToast,
  validateToastDuration,
  validateToastMessage,
} from '@/lib/utils/utils';
import {
  IToast,
  SimpleToast,
  ToastContextType,
} from '@/types/ui';
import {
  createContext,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from 'react';

// Re-export types for convenience
export type { SimpleToast, ToastContextType };

/**
 * Toast context for managing toast notifications globally
 * Provides functions to show different types of toasts
 */
export const ToastContext = createContext<ToastContextType | null>(null);

/**
 * ToastProvider component props
 * @interface ToastProviderProps
 */
export interface ToastProviderProps {
  /** Child components to wrap */
  children: ReactNode;
}

/**
 * Toast provider component that wraps your app
 * Manages toast state and provides toast functions to child components
 * @param props - ToastProvider component props
 * @returns A toast provider component
 */
export const ToastProvider = ({ children }: ToastProviderProps) => {
  // State to hold the list of active toasts
  const [toasts, setToasts] = useState<IToast[]>([]);

  /**
   * Remove a toast by its ID
   * @param id - Toast ID to remove
   */
  const removeToast = useCallback((id?: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  /**
   * Show a toast with custom variant
   * @param toast - Toast object without id (id is generated automatically)
   */
  const showToast = useCallback((toast: Omit<IToast, 'id'>) => {
    // Destructure the toast object
    const { message, variant, duration } = toast;

    // Validate toast data
    if (!validateToastMessage(message) || !validateToastDuration(duration)) return;

    // Create and add the new toast to the list
    setToasts((prev) => [...prev, createToast({ message, variant, duration })]);
  }, []);

  /**
   * Show a success toast
   * @param toast - Simplified toast object with message and optional duration
   */
  const showSuccessToast = useCallback(
    (toast: SimpleToast) => {
      showToast(createSuccessToast(toast));
    },
    [showToast]
  );  

  /**
   * Show an error toast
   * @param toast - Simplified toast object with message and optional duration
   */
  const showErrorToast = useCallback(
    (toast: SimpleToast) => {
      showToast(createErrorToast(toast));
    },
    [showToast]
  );

  // Remove toast automatically after duration
  useAutoRemoveToasts(toasts, removeToast);

  // Memoize the context value to avoid unnecessary re-renders
  const contextValue = useMemo(
    () => ({ showToast, showSuccessToast, showErrorToast }),
    [showToast, showSuccessToast, showErrorToast]
  );

  return (
    <ToastContext.Provider value={contextValue}>
      {/* Render the children */}
      {children}

      {/* Toaster global */}
      <div className={styles.container}>
        {toasts.map(({ id, message, variant, duration }) => (
          <Toast
            key={id}
            message={message}
            variant={variant}
            duration={duration}
            onClose={() => removeToast(id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

const styles = {
  container: 'fixed top-4 right-4 space-y-2 z-50',
} as const;