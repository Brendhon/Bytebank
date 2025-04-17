'use client';

import { Button, Logo } from '@/components/ui';
import { cn } from '@/lib/utils';
import { HeaderVariant } from '@/types/ui';
import { FileCode, Settings, UserIcon } from 'lucide-react';
import { signOut } from 'next-auth/react';
import Popover from '../Popover/Popover';

interface HeaderProps {
  variant: HeaderVariant;
  userName?: string; // Usado apenas se variant === 'user'
  onOpenAccount?: () => void;
  onLogin?: () => void;
  onNavigate?: (path: string) => void;
}

export default ({
  variant,
  userName,
  onOpenAccount,
  onLogin,
  onNavigate,
}: HeaderProps) => {

  // Handle navigation
  const handleNavigation = (path: string) => onNavigate && onNavigate(path);

  // Avatar
  const avatar = (
    <UserIcon
      className="rounded-full border border-orange p-2 text-orange cursor-pointer hover:bg-orange/30 transition-all duration-200 ease-in-out outline-none focus:outline-none"
      size={40} />
  )

  // Default class for li
  const liClass = 'hover:text-orange cursor-pointer p-2';

  // Popover content
  const content = (
    <ul className="flex flex-col gap-2 justify-center items-center">
      {/* Storybook */}
      <li className={liClass} onClick={() => handleNavigation(process.env.NEXT_PUBLIC_STORYBOOK_URL || '')}>
        <FileCode size={20} className="inline mr-2" />
        Documentação
      </li>

      {/* Settings */}
      <li className={liClass} onClick={() => handleNavigation('/settings')}>
        <Settings size={20} className="inline mr-2" />
        Configurações
      </li>

      {/* Logout */}
      <li onClick={() => signOut()}
        className={cn(liClass, 'border-t border-t-dark-gray p-0 pt-6 w-full text-center')}>
        Sair
      </li>
    </ul>
  );

  return (
    <header>
      <Logo variant='icon' className={cn(variant === 'guest' ? 'text-green' : 'text-orange', 'hidden sm:flex')} />

      {variant === 'guest' ? (
        <div className="flex gap-6">
          <Button variant="green" onClick={onOpenAccount}>
            Abrir conta
          </Button>
          <Button variant="outlineGreen" onClick={onLogin}>
            Já tenho conta
          </Button>
        </div>
      ) : (
        <div className="flex items-center gap-6">
          <span className="text-white">{userName}</span>
          <Popover pButton={avatar} className='py-6'>{content}</Popover>
        </div>
      )}
    </header>
  );
}
