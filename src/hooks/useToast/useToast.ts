import { ToastContext, type ToastContextType } from '@/context';
import { useContext } from 'react';

/**
 * Custom hook to access the toast context
 * 
 * Provides a safe way to access the toast context with validation.
 * Must be used within a ToastProvider component.
 * 
 * @returns The toast context with methods to show toasts (showToast, showSuccessToast, showErrorToast)
 * @throws {Error} If the hook is used outside of a ToastProvider
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { showSuccessToast, showErrorToast } = useToast();
 * 
 *   const handleSuccess = () => {
 *     showSuccessToast('Operation completed successfully!');
 *   };
 * 
 *   return <button onClick={handleSuccess}>Click me</button>;
 * }
 * ```
 */
export const useToast = (): ToastContextType => {
  const ctx = useContext(ToastContext);

  if (!ctx) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  return ctx;
};