'use client';

import { cn } from '@/lib/utils/utils';
import { GeneralModalProps } from '@/types/modal';
import { ButtonVariant } from '@/types/ui';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { Fragment, ReactNode, useState } from 'react';
import { Button } from '../../ui';

/**
 * Modal component props
 * @interface ModalProps
 * @extends {GeneralModalProps}
 */
export interface ModalProps extends GeneralModalProps {
  /** Modal title (optional) */
  title?: string;
  /** Modal content */
  children: ReactNode;
  /** Cancel button text (default: 'Cancelar') */
  btnTextCancel?: string;
  /** Submit button text (default: 'Confirmar') */
  btnTextSubmit?: string;
  /** Submit button variant (default: 'blue') */
  btnVariantSubmit?: ButtonVariant;
  /** Whether submit button is disabled */
  isSubmitDisabled?: boolean;
  /** Additional CSS classes for content container */
  className?: string;
}

/**
 * Modal component that displays a dialog with actions
 * Uses Headless UI for accessibility and animations
 * Supports custom title, buttons, and content
 * @param props - Modal component props
 * @returns A modal dialog component
 */
export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  onSubmit,
  className,
  btnTextSubmit = 'Confirmar',
  btnTextCancel = 'Cancelar',
  btnVariantSubmit = 'blue',
  isSubmitDisabled = false,
}: ModalProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await onSubmit();
    } catch (error) {
      console.error('Error submitting modal:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className={styles.dialog} onClose={onClose}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className={styles.backdrop} />
        </TransitionChild>

        <div className={styles.overlay}>
          <div className={styles.container}>
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className={styles.panel}>
                {title && (
                  <DialogTitle as="h2" className={styles.title}>
                    {title}
                  </DialogTitle>
                )}

                <div className={cn(styles.content, className)}>{children}</div>

                <div className={styles.actions}>
                  <Button onClick={onClose} variant="dark">
                    {btnTextCancel}
                  </Button>

                  <Button
                    type="submit"
                    onClick={handleSubmit}
                    variant={btnVariantSubmit}
                    loading={isLoading}
                    disabled={isSubmitDisabled}
                  >
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

/**
 * Modal component styles
 */
const styles = {
  dialog: 'relative z-40',
  backdrop: 'fixed inset-0 bg-black/40 backdrop-blur-xs',
  overlay: 'fixed inset-0 overflow-y-auto',
  container: 'flex min-h-full items-center justify-center px-4 py-8 text-left',
  panel: 'transform overflow-hidden card transition-all flex flex-col gap-8',
  title: 'text-24-bold text-dark-gray flex',
  content: 'flex justify-start flex-col gap-4',
  actions: 'flex items-center justify-center gap-8 sm:flex-row flex-col',
} as const;
