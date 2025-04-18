'use client';

import FigmaSvg from '@/assets/figma.svg';
import { Button, Logo } from '@/components/ui';
import { cn } from '@/lib/utils';
import { HeaderVariant } from '@/types/ui';
import { FileCode, Menu, Settings, UserIcon } from 'lucide-react';
import { signOut } from 'next-auth/react';
import NavMenu, { NavItemLabel } from '../NavMenu/NavMenu';
import Popover from '../Popover/Popover';

interface HeaderProps {
  variant: HeaderVariant;
  pathname?: NavItemLabel;
  userName?: string;
  onOpenAccount?: () => void;
  onLogin?: () => void;
  onNavigate?: (path: string) => void;
}

export default ({
  variant,
  userName,
  pathname,
  onOpenAccount,
  onLogin,
  onNavigate,
}: HeaderProps) => {

  // Handle navigation
  const handleNavigation = (path: string) => onNavigate && onNavigate(path);

  // Popover Trigger css 
  const triggerClass = 'text-orange cursor-pointer hover:bg-orange/30 transition-all duration-200 ease-in-out outline-none focus:outline-none'

  // Avatar
  const avatar = <UserIcon className={cn("rounded-full border border-orange p-2", triggerClass)} size={40} />

  // Menu
  const menu = <Menu className={triggerClass} size={40} />;

  // Default class for li
  const liClass = 'hover:text-orange cursor-pointer p-2 w-full';

  return (
    <header className={cn(variant === 'guest' ? 'justify-center sm:justify-between' : 'justify-between')}>
      {/* left icon */}
      <div>
        {/* Logo */}
        <Logo variant='icon' className={cn(variant === 'guest' ? 'text-green sm:flex' : 'text-orange md:flex', 'hidden')} />

        {/* Menu icon */}
        {variant == 'user' && pathname && (
          <div className="flex md:hidden">
            <Popover pButton={menu}>
              <NavMenu className="flex p-0" current={pathname} onNavigation={handleNavigation} />
            </Popover>
          </div>
        )}
      </div>

      {
        variant === 'guest'
          ? ( // Guest variant
            <div className="flex gap-6">
              <Button variant="green" onClick={onOpenAccount}>
                Abrir conta
              </Button>
              <Button variant="outlineGreen" onClick={onLogin}>
                Já tenho conta
              </Button>
            </div>
          ) :
          ( // User variant
            <div className="flex items-center gap-6">
              <span className="text-white">{userName}</span>
              <Popover pButton={avatar} className='p-4'>
                <ul className="flex flex-col gap-2 justify-center items-center">
                  {/* Storybook */}
                  <li className={liClass} onClick={() => handleNavigation(process.env.NEXT_PUBLIC_FIGMA_URL || '')}>
                    <FigmaSvg className="inline mr-2 h-auto w-6" />
                    Figma
                  </li>

                  {/* Storybook */}
                  <li className={liClass} onClick={() => handleNavigation(process.env.NEXT_PUBLIC_STORYBOOK_URL || '')}>
                    <FileCode size={24} className="inline mr-2" />
                    Documentação
                  </li>

                  {/* Settings */}
                  <li className={liClass} onClick={() => handleNavigation('/settings')}>
                    <Settings size={24} className="inline mr-2" />
                    Configurações
                  </li>

                  {/* Logout */}
                  <li onClick={() => signOut()}
                    className={cn(liClass, 'border-t border-t-dark-gray p-0 pt-6 w-full text-center')}>
                    Sair
                  </li>
                </ul>
              </Popover>
            </div>
          )}
    </header>
  );
}
