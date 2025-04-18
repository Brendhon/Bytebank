import { NavItemLabel } from "@/components/layout/NavMenu/NavMenu";

export type HeaderVariant = 'guest' | 'user';

export interface HeaderProps {
  variant: HeaderVariant;
  pathname?: NavItemLabel;
  userName?: string;
  onOpenAccount?: () => void;
  onLogin?: () => void;
  onNavigate?: (path: string) => void;
  onLogout?: () => void;
}