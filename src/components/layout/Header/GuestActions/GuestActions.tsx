import { Button } from "@/components/ui";
import { HeaderProps } from "@/types/layout";

/**
 * GuestActions component props
 * Extends HeaderProps to include callbacks for guest user actions
 * @interface GuestActionsProps
 */
export interface GuestActionsProps extends Pick<HeaderProps, 'onOpenAccount' | 'onLogin'> {
  /** Text for open account button (default: 'Abrir conta') */
  openAccountText?: string;
  /** Text for login button (default: 'Já tenho conta') */
  loginText?: string;
}

/**
 * Guest actions component that displays actions for guest users
 * Renders buttons for opening account and logging in
 * 
 * @param props - GuestActions component props
 * @param props.onOpenAccount - Optional callback to open account modal/form
 * @param props.onLogin - Optional callback to trigger login
 * @param props.openAccountText - Optional text for open account button (default: 'Abrir conta')
 * @param props.loginText - Optional text for login button (default: 'Já tenho conta')
 * @returns A guest actions component
 * 
 * @example
 * ```tsx
 * <GuestActions
 *   onOpenAccount={() => router.push('/register')}
 *   onLogin={() => router.push('/login')}
 * />
 * ```
 */
export const GuestActions = ({
  onOpenAccount,
  onLogin,
  openAccountText = 'Abrir conta',
  loginText = 'Já tenho conta',
}: GuestActionsProps) => {
  return (
    <div className={styles.container}>
      <Button variant="green" onClick={onOpenAccount}>
        {openAccountText}
      </Button>
      <Button variant="outlineGreen" onClick={onLogin}>
        {loginText}
      </Button>
    </div>
  );
};

/**
 * GuestActions component styles
 * Isolated Tailwind CSS classes for maintainability
 */
const styles = {
  container: 'flex gap-6',
} as const;
