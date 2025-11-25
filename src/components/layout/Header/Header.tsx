import { Logo } from "@/components/ui";
import { cn } from "@/lib/utils/utils";
import { HeaderProps } from "@/types/layout";
import { GuestActions } from "./GuestActions/GuestActions";
import { MenuPopover } from "./MenuPopover/MenuPopover";
import UserActions from "./UserActions/UserActions";

export default ({ variant, userName, pathname, onLogin, onOpenAccount, onNavigate, onLogout }: HeaderProps) => {
  return (
    <header className={cn(styles.header.base, variant === 'guest' ? styles.header.guest : styles.header.user)}>
      <div>
        {/* Logo */}
        <Logo variant='icon' className={cn(styles.logo.base, variant === 'guest' ? styles.logo.guest : styles.logo.user)} />

        {/* Menu Popover */}
        {variant === 'user' && pathname && <MenuPopover pathname={pathname} onNavigate={onNavigate} />}
      </div>

      {
        variant === 'guest'
          ? <GuestActions onOpenAccount={onOpenAccount} onLogin={onLogin} />
          : <UserActions userName={userName} onNavigate={onNavigate} onLogout={onLogout} />
      }
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