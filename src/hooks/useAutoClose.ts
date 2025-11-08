import { useEffect } from 'react';

/**
 * Custom hook to handle auto-close functionality for toast notifications
 * @param isVisible - Whether the toast is currently visible
 * @param duration - Auto-dismiss duration in milliseconds (0 = no auto-dismiss)
 * @param onClose - Callback function to execute when toast should close
 */
export function useAutoClose(
  isVisible: boolean,
  duration: number,
  onClose: () => void
) {
  useEffect(() => {
    if (!isVisible || duration === 0) return;

    const timeout = setTimeout(onClose, duration);

    return () => clearTimeout(timeout);
  }, [isVisible, duration, onClose]);
}

