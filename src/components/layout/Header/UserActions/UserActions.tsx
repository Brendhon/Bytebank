import { HeaderProps } from '@/types/layout';
import AvatarPopover from '../AvatarPopover/AvatarPopover';

export default ({ userName, onNavigate, onLogout }: Pick<HeaderProps, 'userName' | 'onNavigate' | 'onLogout'>) => (
  <div className="flex items-center gap-6">
    <span className="text-white">{userName}</span>
    <AvatarPopover onNavigate={onNavigate} onLogout={onLogout} />
  </div>
);
