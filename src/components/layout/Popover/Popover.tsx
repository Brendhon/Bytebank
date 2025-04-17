import { cn } from '@/lib/utils';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { ReactNode } from 'react';

interface Props {
  className?: string;
  pButton: ReactNode;
  children: ReactNode;
}

export default ({ className, pButton, children }: Props) => {
  const newClass = cn(
    'w-full flex flex-col md:w-[200px] bg-white shadow-lg text-dark-gray rounded-sm p-4',
    className,
  );

  return (
    <Popover className={`relative ${className || ''}`}>
      <PopoverButton>{pButton}</PopoverButton>
      <PopoverPanel anchor="bottom end" className={newClass}>
        {children}
      </PopoverPanel>
    </Popover>
  );
}
