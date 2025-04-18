'use client';

import { cn } from '@/lib/utils';
import { Button } from '@headlessui/react';
import clsx from 'clsx';
import {
  CreditCard,
  BadgeDollarSign,
  LayoutDashboard,
  Settings
} from 'lucide-react';

const navItems = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Transações', href: '/transactions', icon: BadgeDollarSign },
  { label: 'Meus Cartões', href: '/cards', icon: CreditCard },
  { label: 'Configurações', href: '/settings', icon: Settings },
] as const;

// Gera o tipo com base nas labels
export type NavItemLabel = typeof navItems[number]['href'];

// Set interface for the props
interface Props {
  className?: string;
  current: NavItemLabel;
  onNavigate?: (href: string) => void;
}

export default ({ current, onNavigate, className = '' }: Props) => {
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
              onClick={() => onNavigate?.(href)}
              className={cn(
                'flex items-center w-full gap-2 px-2 py-2 rounded-md text-left transition-colors cursor-pointer',
                color(href),
              )}
            >
              <Icon size={20} className={color(href)} />
              <span>{label}</span>
            </Button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
