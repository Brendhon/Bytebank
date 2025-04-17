// src/context/ToastContext.tsx
'use client';
import { Toast } from '@/components/ui';
import { IToast } from '@/types/ui';
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the type for the toast object
interface SimpleToast extends Pick<IToast, 'message' | 'duration'> { }

// Define what our context will expose
type ToastContextType = {
  showToast(toast: Omit<IToast, 'id'>): void
  showSuccessToast(toast: SimpleToast): void
  showErrorToast(toast: SimpleToast): void
};

// Create the context
const ToastContext = createContext<ToastContextType | null>(null);

// Provider component that wraps your app
export const ToastProvider = ({ children }: { children: ReactNode }) => {
  // State to hold the list of active toasts
  const [toasts, setToasts] = useState<IToast[]>([]);

  // Expose this function to trigger a new toast
  const showToast = ({ message, variant, duration }: Omit<IToast, 'id'>) => {
    // Generate a unique ID for the toast
    const id = crypto.randomUUID();

    // Add the new toast to the list
    setToasts((prev) => [...prev, { id, message, variant, duration }]);
  };

  // Function to remove a toast by its ID
  const removeToast = (id?: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }

  // Show success toast
  const showSuccessToast = ({ message, duration = 4000 }: SimpleToast) => {
    showToast({ message, variant: 'success', duration });
  };

  // Show error toast
  const showErrorToast = ({ message, duration = 4000 }: SimpleToast) => {
    showToast({ message, variant: 'error', duration });
  };

  return (
    <ToastContext.Provider value={{ showToast, showSuccessToast, showErrorToast }}>
      {/* Render the children */}
      {children}

      {/* Toaster global */}
      <div className="fixed top-4 right-4 space-y-2 z-50">
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

// Hook to use the toast context
export const useToast = () => {
  // Get the context
  const ctx = useContext(ToastContext);

  // If the context is not available, throw an error
  if (!ctx) throw new Error('useToast must be inside ToastProvider');

  // Return the context
  return ctx;
};
