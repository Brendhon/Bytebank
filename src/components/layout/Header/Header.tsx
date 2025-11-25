import { Logo } from "@/components/ui";
import { cn } from "@/lib/utils/utils";
import { HeaderProps } from "@/types/layout";
import { GuestActions } from "./GuestActions/GuestActions";
import { MenuPopover } from "./MenuPopover/MenuPopover";
import { UserActions } from "./UserActions/UserActions";

/**
 * Header component that displays a header with different variants (guest/user)
 * Renders appropriate actions based on the variant
 * Uses composition pattern with GuestActions, UserActions, and MenuPopover
 * 
 * @param props - Header component props
 * @param props.variant - Header variant (guest or authenticated user)
 * @param props.userName - Optional user name to display (for user variant)
 * @param props.pathname - Optional current pathname for navigation highlighting (for user variant)
 * @param props.onOpenAccount - Optional callback to open account modal/menu (for guest variant)
 * @param props.onLogin - Optional callback to trigger login (for guest variant)
 * @param props.onNavigate - Optional callback for navigation actions
 * @param props.onLogout - Optional callback to trigger logout (for user variant)
 * @returns A header component
 * 
 * @example
 * ```tsx
 * <Header
 *   variant="user"
 *   userName="John Doe"
 *   pathname="/dashboard"
 *   onNavigate={(path) => router.push(path)}
 *   onLogout={() => signOut()}
 * />
 * ```
 */
export const Header = ({
  variant,
  userName,
  pathname,
  onLogin,
  onOpenAccount,
  onNavigate,
  onLogout,
}: HeaderProps) => {
  return (
    <header className={cn(styles.header.base, variant === 'guest' ? styles.header.guest : styles.header.user)}>
      <div>
        {/* Logo section */}
        <Logo
          variant="icon"
          className={cn(styles.logo.base, variant === 'guest' ? styles.logo.guest : styles.logo.user)}
        />

        {/* Menu Popover for mobile navigation */}
        {variant === 'user' && pathname && <MenuPopover pathname={pathname} onNavigate={onNavigate} />}
      </div>

      {variant === 'guest' ? (
        <GuestActions onOpenAccount={onOpenAccount} onLogin={onLogin} />
      ) : (
        <UserActions userName={userName} onNavigate={onNavigate} onLogout={onLogout} />
      )}
    </header>
  );
};


const styles = {
  header: {
    base: 'px-6 flex items-center text-sm text-white bg-dark min-h-18',
    guest: 'justify-center sm:justify-between',
    user: 'justify-between',
  },
  logo: {
    base: 'hidden',
    guest: 'text-green sm:flex',
    user: 'text-orange md:flex',
  },
} as const;