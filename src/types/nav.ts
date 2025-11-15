import { navItems } from "@/components/layout/NavMenu/NavMenu";

/**
 * Type representing the possible navigation item labels (href values).
 * Derived from the navItems array in NavMenu component.
 * 
 * @typedef {typeof navItems[number]['href']} NavItemLabel
 */
export type NavItemLabel = typeof navItems[number]['href'];