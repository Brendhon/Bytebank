import { HeaderProps } from '@/types/layout';
import { AvatarPopover } from '../AvatarPopover/AvatarPopover';

/**
 * UserActions component props
 * Extends HeaderProps to include user-specific actions
 * @interface UserActionsProps
 */
export interface UserActionsProps extends Pick<HeaderProps, 'userName' | 'onNavigate' | 'onLogout'> {}

/**
 * User actions component that displays user name and avatar popover
 * Renders user-specific actions in the header for authenticated users
 * 
 * @param props - UserActions component props
 * @param props.userName - Optional user name to display
 * @param props.onNavigate - Optional callback for navigation actions
 * @param props.onLogout - Optional callback to trigger logout
 * @returns A user actions component
 * 
 * @example
 * ```tsx
 * <UserActions
 *   userName="John Doe"
 *   onNavigate={(path) => router.push(path)}
 *   onLogout={() => signOut()}
 * />
 * ```
 */
export const UserActions = ({ userName, onNavigate, onLogout }: UserActionsProps) => {
  return (
    <div className={styles.container}>
      <span className={styles.userName}>{userName}</span>
      <AvatarPopover onNavigate={onNavigate} onLogout={onLogout} />
    </div>
  );
};

/**
 * UserActions component styles
 * Isolated Tailwind CSS classes for maintainability
 */
const styles = {
  container: 'flex items-center gap-6',
  userName: 'text-white',
} as const;
