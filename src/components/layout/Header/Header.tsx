import { Logo } from "@/components/ui";
import { cn } from "@/lib/utils/utils";
import { HeaderProps } from "@/types/layout";
import GuestActions from "./GuestActions/GuestActions";
import MenuPopover from "./MenuPopover/MenuPopover";
import UserActions from "./UserActions/UserActions";

export default ({ variant, userName, pathname, onLogin, onOpenAccount, onNavigate, onLogout }: HeaderProps) => {
  return (
    <header className={cn(variant === 'guest' ? 'justify-center sm:justify-between' : 'justify-between')}>
      <div>
        {/* Logo */}
        <Logo variant='icon' className={cn(variant === 'guest' ? 'text-green sm:flex' : 'text-orange md:flex', 'hidden')} />

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
