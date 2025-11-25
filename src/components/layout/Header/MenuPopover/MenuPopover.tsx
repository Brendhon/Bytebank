import { NavMenu, Popover } from "@/components/layout";
import { PROTECTED_ROUTES } from "@/lib/constants";
import { HeaderProps } from "@/types/layout";
import { Menu } from "lucide-react";

export default ({ pathname, onNavigate }: Pick<HeaderProps, 'pathname' | 'onNavigate'>) => {
  return (
    <div className="flex md:hidden">
      <Popover button={<Menu className='popover-trigger' size={40} />}>
        <NavMenu className="flex p-0" current={pathname ?? PROTECTED_ROUTES.DASHBOARD} onNavigate={onNavigate} />
      </Popover>
    </div>
  );
};
