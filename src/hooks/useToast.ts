import { ToastContext } from "@/context";
import { useContext } from "react";

// Hook to use the toast context
export default () => {
  // Get the context
  const ctx = useContext(ToastContext);

  // If the context is not available, throw an error
  if (!ctx) throw new Error('useToast must be inside ToastProvider');

  // Return the context
  return ctx;
};