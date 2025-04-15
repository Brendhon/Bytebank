'use client';

import { Logo } from '@/components/ui';
import { Button } from '@/components/ui';
import { UserIcon } from 'lucide-react';
import { HeaderVariant } from '@/types/ui';

interface HeaderProps {
  variant: HeaderVariant;
  userName?: string; // Usado apenas se variant === 'user'
  onOpenAccount?: () => void;
  onLogin?: () => void;
  onProfileClick?: () => void;
}

export default ({
  variant,
  userName,
  onOpenAccount,
  onLogin,
  onProfileClick
}: HeaderProps) => {
  return (
    <header>
      <Logo variant='icon' className={variant === 'guest' ? 'text-green' : 'text-orange'} />

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
          <button
            onClick={onProfileClick}
            className="rounded-full border border-orange p-2 text-orange"
          >
            <UserIcon size={20} />
          </button>
        </div>
      )}
    </header>
  );
}
