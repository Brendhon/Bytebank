'use client';

import { GeneralModalProps } from '@/types/modal';
import { ButtonVariant } from '@/types/ui';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { Fragment, ReactNode, useState } from 'react';
import { Button } from '../../ui';

interface ModalProps extends GeneralModalProps {
  // General
  title?: string;
  children: ReactNode;

  // Actions;
  btnTextCancel?: string;
  btnTextSubmit?: string;
  btnVariantSubmit?: ButtonVariant;
  isSubmitDisabled?: boolean;
  className?: string;
};

export default ({
  isOpen,
  onClose,
  title,
  children,
  onSubmit,
  className = '',
  btnTextSubmit = 'Confirmar',
  btnTextCancel = 'Cancelar',
  btnVariantSubmit = 'blue',
  isSubmitDisabled = false
}: ModalProps) => {
  // Loading state
  const [isLoading, setIsLoading] = useState(false);

  // Handle submit
  const handleSubmit = async () => {
    setIsLoading(true);
    await onSubmit();
    setIsLoading(false);
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-40" onClose={onClose}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40 backdrop-blur-xs" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center px-4 py-8 text-left">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="transform overflow-hidden card transition-all flex flex-col gap-8">
                {/* Title */}
                {title && (
                  <DialogTitle as="h2" className="text-24-bold text-dark-gray flex">
                    {title}
                  </DialogTitle>
                )}

                {/* Children */}
                <div className={`flex justify-start flex-col gap-4 ${className}`}>
                  {children}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-center gap-8 sm:flex-row flex-col">
                  <Button onClick={onClose} variant='dark'>
                    {btnTextCancel}
                  </Button>

                  <Button type='submit' onClick={handleSubmit} variant={btnVariantSubmit} loading={isLoading} disabled={isSubmitDisabled}>
                    {btnTextSubmit}
                  </Button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
