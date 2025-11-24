import { NavItemLabel } from "./nav";

/**
 * Type representing the variant options for Header component.
 * 
 * @typedef {('guest' | 'user')} HeaderVariant
 */
export type HeaderVariant = 'guest' | 'user';

/**
 * Props for the Header component.
 * 
 * @interface HeaderProps
 * @property {HeaderVariant} variant - Header variant (guest or authenticated user)
 * @property {NavItemLabel} [pathname] - Optional current pathname for navigation highlighting
 * @property {string} [userName] - Optional user name to display (for user variant)
 * @property {() => void} [onOpenAccount] - Optional callback to open account modal/menu
 * @property {() => void} [onLogin] - Optional callback to trigger login (for guest variant)
 * @property {(path: string) => void} [onNavigate] - Optional callback for navigation actions
 * @property {() => void} [onLogout] - Optional callback to trigger logout (for user variant)
 */
export interface HeaderProps {
  variant: HeaderVariant;
  pathname?: NavItemLabel;
  userName?: string;
  onOpenAccount?: () => void;
  onLogin?: () => void;
  onNavigate?: (path: string) => void;
  onLogout?: () => void;
}

/**
 * Benefit item interface
 * Represents a single benefit item in the BenefitsSection component
 * @interface Benefit
 */
export interface Benefit {
  /** Unique identifier for the benefit */
  id: string;
  /** Image source filename (without path prefix) */
  iconSrc: string;
  /** Benefit title */
  title: string;
  /** Benefit description */
  description: string;
}