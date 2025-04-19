'use client';

import { cn } from '@/lib/utils';
import { NavItemLabel } from '@/types/nav';
import { Button } from '@headlessui/react';
import clsx from 'clsx';
import { BadgeDollarSign, CreditCard, LayoutDashboard, Loader2, Settings } from 'lucide-react';
import { useEffect, useState, useTransition } from 'react';

// Set interface for the props
interface Props {
  className?: string;
  current: NavItemLabel;
  onNavigate?: (href: string) => void;
}

export const navItems = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Transações', href: '/transactions', icon: BadgeDollarSign },
  { label: 'Meus Cartões', href: '/cards', icon: CreditCard },
  { label: 'Configurações', href: '/settings', icon: Settings },
] as const;

export default ({ current, onNavigate, className = '' }: Props) => {
  // State to manage the pending navigation
  const [pendingHref, setPendingHref] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  // When the transition ends, clear the pendingHref
  useEffect(() => {
    if (!isPending) setPendingHref(null);
  }, [isPending]);

  const handleClick = (href: string) => {
    // mark this item as “pending”
    setPendingHref(href);
    // trigger navigation within a transition
    startTransition(() => onNavigate?.(href));
  };

  // Check if the current tab is active
  const isActive = (value: string) => current === value;

  // Set the color based on the active state
  const color = (value: string) => clsx({ 'text-orange font-bold ': isActive(value), 'text-dark-gray': !isActive(value) })

  // Render the navigation items
  return (
    <nav className={className}>
      <ul className="flex flex-col gap-3">
        {navItems.map(({ label, href, icon: Icon }) => (
          <li className='hover:opacity-70'
            key={href}>
            <Button
              type="button"
              onClick={() => handleClick(href)}
              className={cn(
                'flex items-center w-full gap-2 px-2 py-2 rounded-md text-left transition-colors cursor-pointer',
                color(href),
              )}
            >
              {isPending && pendingHref === href
                ? <Loader2 size={20} className="animate-spin" />
                : <Icon size={20} className={color(href)} />
              }
              <span>{label}</span>
            </Button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
