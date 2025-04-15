'use client';

import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { Fragment, ReactNode } from 'react';
import { Button } from '../../ui';
import { ButtonVariant } from '@/types/ui';

type ModalProps = {
  // General
  isOpen: boolean;
  children: ReactNode;

  // Title
  title?: string;

  // Actions
  onClose: () => void;
  onSubmit: () => void;
  btnTextCancel?: string;
  btnTextSubmit?: string;
  btnVariantSubmit?: ButtonVariant;
};

export default ({
  isOpen,
  onClose,
  title,
  children,
  onSubmit,
  btnTextSubmit = 'Confirmar',
  btnTextCancel = 'Cancelar',
  btnVariantSubmit = 'blue'
}: ModalProps) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
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
          <div className="flex min-h-full items-center justify-center px-4 py-8 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-md transform overflow-hidden card transition-all flex flex-col gap-8">
                {/* Title */}
                {title && (
                  <DialogTitle as="h2" className="text-24-bold text-dark-gray flex">
                    {title}
                  </DialogTitle>
                )}

                {/* Children */}
                <div className="flex">{children}</div>

                {/* Actions */}
                <div className="flex items-center justify-center gap-8">
                  <Button onClick={onClose} variant='dark'>
                    {btnTextCancel}
                  </Button>

                  <Button onClick={onSubmit} variant={btnVariantSubmit}>
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
