import { BadgeDollarSign, CreditCard, LayoutDashboard, Settings } from "lucide-react";

export const navItems = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Transações', href: '/transactions', icon: BadgeDollarSign },
  { label: 'Meus Cartões', href: '/cards', icon: CreditCard },
  { label: 'Configurações', href: '/settings', icon: Settings },
] as const;

// Gera o tipo com base nas labels
export type NavItemLabel = typeof navItems[number]['href'];