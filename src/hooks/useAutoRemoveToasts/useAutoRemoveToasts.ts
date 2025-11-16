import { IToast } from '@/types/ui';
import { useEffect } from 'react';

/**
 * Check if a toast should have an auto-remove timer
 * @param {IToast} toast - Toast to check
 * @returns {boolean} True if toast should be auto-removed, false otherwise
 */
const shouldCreateTimer = (toast: IToast): boolean => {
  return toast.duration !== undefined && toast.duration > 0;
};

/**
 * Create a timer for a single toast that will remove it after its duration expires
 * @param {IToast} toast - Toast to create timer for
 * @param {(id?: string) => void} removeToast - Function to remove a toast by its ID
 * @returns {NodeJS.Timeout | null} Timer ID if created, null otherwise
 */
const createToastTimer = (toast: IToast, removeToast: (id?: string) => void): NodeJS.Timeout | null => {
  // If the toast should not have an auto-remove timer, return null
  if (!shouldCreateTimer(toast)) return null;

  // Create a timer to remove the toast after its duration expires
  return setTimeout(() => removeToast(toast.id), toast.duration);
};

/**
 * Create timers for all toasts that should be auto-removed
 * @param {IToast[]} toasts - Array of active toasts
 * @param {(id?: string) => void} removeToast - Function to remove a toast by its ID
 * @returns {Array<NodeJS.Timeout | null>} Array of timer IDs (null for toasts without timers)
 */
const createToastTimers = (toasts: IToast[], removeToast: (id?: string) => void): Array<NodeJS.Timeout | null> => {
  // Create timers for all toasts that should be auto-removed
  return toasts.map((toast) => createToastTimer(toast, removeToast));
};

/**
 * Clear all active timers
 * @param {Array<NodeJS.Timeout | null>} timers - Array of timer IDs to clear
 */
const clearAllTimers = (timers: Array<NodeJS.Timeout | null>): void => {
  // Clear all active timers
  timers.forEach((timer) => timer && clearTimeout(timer));
};

/**
 * Hook to automatically remove toasts after their duration expires
 * @param {IToast[]} toasts - Array of active toasts
 * @param {(id?: string) => void} removeToast - Function to remove a toast by its ID
 */
export const useAutoRemoveToasts = (
  toasts: IToast[],
  removeToast: (id?: string) => void
): void => {
  useEffect(() => {
    // Create timers for all toasts that should be auto-removed
    const timers = createToastTimers(toasts, removeToast);

    // Clear all active timers when the component unmounts
    return () => clearAllTimers(timers);
  }, [toasts, removeToast]);
};

