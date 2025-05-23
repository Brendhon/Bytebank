'use client';

import { cn } from '@/lib/utils';
import { IToast } from '@/types/ui';
import { Button, Transition } from '@headlessui/react';
import { CheckCircle, Info, X, XCircle } from 'lucide-react';
import { useEffect, useState, useCallback } from 'react';

interface Props extends IToast {
  show?: boolean;
  onClose?: () => void;
}

const icons = {
  success: <CheckCircle className="text-white w-5 h-5" />,
  error: <XCircle className="text-white w-5 h-5" />,
  info: <Info className="text-white w-5 h-5" />,
};

export default ({
  message,
  variant = 'info',
  show = true,
  onClose,
  duration = 0, // Default to 0 (no auto close)
}: Props) => {
  // State to control the visibility of the toast
  const [isVisible, setIsVisible] = useState(show);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    onClose?.();
  }, [onClose]);

  // Auto close after duration
  useEffect(() => {
    // If the toast is not visible or duration is 0, do nothing
    if (!isVisible || duration === 0) return;

    // Set a timeout to close the toast after the specified duration
    const timeout = setTimeout(() => handleClose(), duration);

    // Clear the timeout if the component unmounts or if isVisible changes
    return () => clearTimeout(timeout);
  }, [isVisible, duration, handleClose]);


  // Set className based on variant
  const className = cn(
    'fixed top-20 right-4 z-50 h-12 flex gap-3 rounded-sm p-3 shadow-lg text-white min-w-[250px] flex-row justify-between items-center',
    {
      'bg-green': variant === 'success',
      'bg-red': variant === 'error',
      'bg-blue': variant === 'info',
    }
  )

  return (
    <Transition
      show={isVisible}
      enter="transition ease-out duration-200"
      enterFrom="translate-y-2 opacity-0"
      enterTo="translate-y-0 opacity-100"
      leave="transition ease-in duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className={className}>
        <div>{icons[variant]}</div>
        <p className="text-14 flex-1">{message}</p>
        <Button onClick={handleClose} className="ml-2">
          <X className="w-4 h-4 cursor-pointer" />
        </Button>
      </div>
    </Transition>
  );
};
