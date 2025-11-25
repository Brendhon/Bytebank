import { NavMenu, Popover } from "@/components/layout";
import { PROTECTED_ROUTES } from "@/lib/constants";
import { HeaderProps } from "@/types/layout";
import { NavItemLabel } from "@/types/nav";
import { Menu } from "lucide-react";

/**
 * MenuPopover component props
 * Extends HeaderProps to include navigation props for mobile menu
 * @interface MenuPopoverProps
 */
export interface MenuPopoverProps extends Pick<HeaderProps, 'pathname' | 'onNavigate'> {}

/**
 * Menu popover component that displays a mobile navigation menu
 * Renders a popover with menu icon and navigation menu for mobile devices
 * Only visible on screens smaller than md breakpoint
 * 
 * @param props - MenuPopover component props
 * @param props.pathname - Optional current pathname for navigation highlighting
 * @param props.onNavigate - Optional callback for navigation actions
 * @returns A menu popover component
 * 
 * @example
 * ```tsx
 * <MenuPopover
 *   pathname="/dashboard"
 *   onNavigate={(path) => router.push(path)}
 * />
 * ```
 */
export const MenuPopover = ({ pathname, onNavigate }: MenuPopoverProps) => {
  const currentPathname: NavItemLabel = (pathname ?? PROTECTED_ROUTES.DASHBOARD) as NavItemLabel;

  return (
    <div className={styles.container}>
      <Popover button={<Menu className={styles.trigger} size={40} />}>
        <NavMenu className={styles.menu} current={currentPathname} onNavigate={onNavigate} />
      </Popover>
    </div>
  );
};

/**
 * MenuPopover component styles
 * Isolated Tailwind CSS classes for maintainability
 */
const styles = {
  container: 'flex md:hidden',
  trigger: 'popover-trigger',
  menu: 'flex p-0',
} as const;
