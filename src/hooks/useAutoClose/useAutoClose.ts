import { useEffect } from 'react';

/**
 * Parameters for the useAutoClose hook
 * @interface UseAutoCloseParams
 */
export interface UseAutoCloseParams {
  /** Whether the element is currently visible */
  isVisible: boolean;
  /** Auto-dismiss duration in milliseconds (0 = no auto-dismiss, must be non-negative) */
  duration: number;
  /** Callback function to execute when element should close */
  onClose: () => void;
}

/**
 * Custom hook to handle auto-close functionality for toast notifications or other elements
 * 
 * Automatically closes an element after a specified duration when it becomes visible.
 * The hook sets up a timeout that triggers the `onClose` callback after the duration expires.
 * 
 * @param params - Hook parameters
 * @param params.isVisible - Whether the element is currently visible
 * @param params.duration - Auto-dismiss duration in milliseconds (0 = no auto-dismiss, must be non-negative)
 * @param params.onClose - Callback function to execute when element should close
 * @returns {void}
 * @throws {Error} If duration is negative
 * 
 * @note It's recommended to memoize the `onClose` callback using `useCallback` 
 *       in the component that uses this hook to prevent unnecessary effect recreations.
 * 
 * @example
 * ```tsx
 * function Toast({ message, duration, onClose }) {
 *   const [isVisible, setIsVisible] = useState(true);
 *   
 *   const handleClose = useCallback(() => {
 *     setIsVisible(false);
 *     onClose();
 *   }, [onClose]);
 * 
 *   useAutoClose({
 *     isVisible,
 *     duration,
 *     onClose: handleClose
 *   });
 * 
 *   if (!isVisible) return null;
 *   return <div>{message}</div>;
 * }
 * ```
 */
export const useAutoClose = ({
  isVisible,
  duration,
  onClose,
}: UseAutoCloseParams): void => {
  // Validate duration parameter
  if (duration < 0) {
    throw new Error('useAutoClose: duration must be a non-negative number');
  }

  useEffect(() => {
    if (!isVisible || duration === 0) return;

    const timeout = setTimeout(onClose, duration);

    return () => clearTimeout(timeout);
  }, [isVisible, duration, onClose]);
};

