'use client';

import { cn } from '@/lib/utils/utils';
import { NavItemLabel } from '@/types/nav';
import { PROTECTED_ROUTES } from '@/lib/constants';
import { Button } from '@headlessui/react';
import { BadgeDollarSign, CreditCard, LayoutDashboard, Loader2, Settings } from 'lucide-react';
import { useEffect, useState, useTransition } from 'react';

/**
 * Navigation menu item interface
 * @interface NavMenuItem
 */
export interface NavMenuItem {
  /** Display label for the navigation item */
  label: string;
  /** Route href for the navigation item */
  href: string;
  /** Icon component for the navigation item */
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

/**
 * NavMenu component props
 * @interface NavMenuProps
 */
export interface NavMenuProps {
  /** Additional CSS classes */
  className?: string;
  /** Current active navigation item */
  current: NavItemLabel;
  /** Callback function called when navigation item is clicked */
  onNavigate?: (href: string) => void;
}

export const navItems: NavMenuItem[] = [
  { label: 'Dashboard', href: PROTECTED_ROUTES.DASHBOARD, icon: LayoutDashboard },
  { label: 'Transações', href: PROTECTED_ROUTES.TRANSACTIONS, icon: BadgeDollarSign },
  { label: 'Meus Cartões', href: PROTECTED_ROUTES.CARDS, icon: CreditCard },
  { label: 'Configurações', href: PROTECTED_ROUTES.SETTINGS, icon: Settings },
] as const;

/**
 * Navigation menu component that displays navigation items with active state
 * Uses React Transitions for smooth navigation transitions
 * Supports loading state during navigation
 * @param props - NavMenu component props
 * @returns A navigation menu component
 */
export const NavMenu = ({ current, onNavigate, className }: NavMenuProps) => {
  // State to manage the pending navigation
  const [pendingHref, setPendingHref] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  // When the transition ends, clear the pendingHref
  useEffect(() => {
    if (!isPending) setPendingHref(null);
  }, [isPending]);

  const handleClick = (href: string) => {
    // Mark this item as "pending"
    setPendingHref(href);
    // Trigger navigation within a transition
    startTransition(() => onNavigate?.(href));
  };

  // Check if the current tab is active
  const isActive = (value: string) => current === value;

  // Set the color based on the active state
  const getColorClass = (value: string) =>
    cn({
      [styles.activeText]: isActive(value),
      [styles.inactiveText]: !isActive(value),
    });

  // Render the navigation items
  return (
    <nav className={cn(styles.nav, className)}>
      <ul className={styles.list}>
        {navItems.map(({ label, href, icon: Icon }) => (
          <li className={styles.item} key={href}>
            <Button
              type="button"
              onClick={() => handleClick(href)}
              className={cn(styles.button, getColorClass(href))}
            >
              {isPending && pendingHref === href ? (
                <Loader2 size={20} className={cn(styles.loader, getColorClass(href))} />
              ) : (
                <Icon size={20} className={getColorClass(href)} />
              )}
              <span>{label}</span>
            </Button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

/**
 * NavMenu component styles
 */
const styles = {
  nav: '',
  list: 'flex flex-col gap-3',
  item: 'hover:opacity-70',
  button: 'flex items-center w-full gap-2 px-2 py-2 rounded-md text-left transition-colors cursor-pointer',
  activeText: 'text-orange font-bold',
  inactiveText: 'text-dark-gray',
  loader: 'animate-spin',
} as const;
