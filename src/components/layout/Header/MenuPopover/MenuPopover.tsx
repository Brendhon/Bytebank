import { HeaderProps } from "@/types/layout";
import { PROTECTED_ROUTES } from "@/lib/constants";
import { Menu } from "lucide-react";
import NavMenu from "../../NavMenu/NavMenu";
import Popover from "../../Popover/Popover";

export default ({ pathname, onNavigate }: Pick<HeaderProps, 'pathname' | 'onNavigate'>) => {
  return (
    <div className="flex md:hidden">
      <Popover pButton={<Menu className='popover-trigger' size={40} />}>
        <NavMenu className="flex p-0" current={pathname ?? PROTECTED_ROUTES.DASHBOARD} onNavigate={onNavigate} />
      </Popover>
    </div>
  );
};
