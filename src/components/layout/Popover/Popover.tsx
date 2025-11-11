import { cn } from '@/lib/utils/utils';
import { Popover, PopoverBackdrop, PopoverButton, PopoverPanel } from '@headlessui/react';
import { ReactNode } from 'react';

interface Props {
  className?: string;
  pButton: ReactNode;
  children: ReactNode;
}

export default ({ className, pButton, children }: Props) => {
  const newClass = cn(
    'w-full flex flex-col w-[200px] bg-white shadow-lg text-dark-gray rounded-sm',
    className,
  );

  return (
    <Popover className="relative">
      <PopoverButton className="outline-none focus:outline-none">
        {pButton}
      </PopoverButton>

      {/* Backdrop to close the popover when clicking outside - https://github.com/tailwindlabs/headlessui/discussions/2731) */}
      <PopoverBackdrop className="fixed inset-0 bg-transparent" />

      <PopoverPanel anchor="bottom end" className={newClass}>
        {({ close }) =>
          <div
            onClick={() => close()}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') close();
            }}
          >
            {children}
          </div>
        }
      </PopoverPanel>
    </Popover>
  );
};
