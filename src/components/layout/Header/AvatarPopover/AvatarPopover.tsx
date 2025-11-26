import FigmaSvg from '@/assets/figma.svg';
import GithubSvg from '@/assets/github.svg';
import StorybookSvg from '@/assets/storybook.svg';
import { Popover } from "@/components/layout";
import { HeaderProps } from "@/types/layout";
import { Button } from '@headlessui/react';
import { UserIcon } from "lucide-react";

/**
 * AvatarPopover component props
 * Extends HeaderProps to include navigation and logout callbacks
 * @interface AvatarPopoverProps
 */
export interface AvatarPopoverProps extends Pick<HeaderProps, 'onNavigate' | 'onLogout'> {
  /** Text for GitHub link (default: 'Github') */
  githubText?: string;
  /** Text for Figma link (default: 'Figma') */
  figmaText?: string;
  /** Text for Storybook link (default: 'Storybook') */
  storybookText?: string;
  /** Text for logout button (default: 'Sair') */
  logoutText?: string;
}

/**
 * Environment variables for external resource URLs
 * Validated at module level to ensure they are defined
 */
const GITHUB_URL = process.env.NEXT_PUBLIC_GITHUB_URL || '';
const FIGMA_URL = process.env.NEXT_PUBLIC_FIGMA_URL || '';
const STORYBOOK_URL = process.env.NEXT_PUBLIC_STORYBOOK_URL || '';

// Validate environment variables
if (typeof window !== 'undefined') {
  if (!GITHUB_URL || !FIGMA_URL || !STORYBOOK_URL) {
    console.warn('AvatarPopover: Some environment variables are not defined');
  }
}

/**
 * Avatar popover component that displays links to external resources and logout
 * Renders a popover with user avatar icon and menu items for navigation
 * 
 * @param props - AvatarPopover component props
 * @param props.onNavigate - Optional callback for navigation actions
 * @param props.onLogout - Optional callback to trigger logout
 * @param props.githubText - Optional text for GitHub link (default: 'Github')
 * @param props.figmaText - Optional text for Figma link (default: 'Figma')
 * @param props.storybookText - Optional text for Storybook link (default: 'Storybook')
 * @param props.logoutText - Optional text for logout button (default: 'Sair')
 * @returns An avatar popover component
 * 
 * @example
 * ```tsx
 * <AvatarPopover
 *   onNavigate={(path) => router.push(path)}
 *   onLogout={() => signOut()}
 * />
 * ```
 */
export const AvatarPopover = ({
  onNavigate,
  onLogout,
  githubText = 'Github',
  figmaText = 'Figma',
  storybookText = 'Storybook',
  logoutText = 'Sair',
}: AvatarPopoverProps) => {
  return (
    <Popover button={<UserIcon className={styles.trigger} size={40} />} className={styles.panel}>
      <div className={styles.container}>
        <Button
          className={styles.button}
          onClick={() => GITHUB_URL && onNavigate?.(GITHUB_URL)}
          disabled={!GITHUB_URL}
        >
          <GithubSvg className={styles.icon} /> {githubText}
        </Button>
        <Button
          className={styles.button}
          onClick={() => FIGMA_URL && onNavigate?.(FIGMA_URL)}
          disabled={!FIGMA_URL}
        >
          <FigmaSvg className={styles.icon} /> {figmaText}
        </Button>
        <Button
          className={styles.button}
          onClick={() => STORYBOOK_URL && onNavigate?.(STORYBOOK_URL)}
          disabled={!STORYBOOK_URL}
        >
          <StorybookSvg className={styles.icon} /> {storybookText}
        </Button>
        <Button onClick={() => onLogout?.()} className={styles.logoutButton}>
          {logoutText}
        </Button>
      </div>
    </Popover>
  );
};

/**
 * AvatarPopover component styles
 * Isolated Tailwind CSS classes for maintainability
 */
const styles = {
  trigger: 'popover-trigger rounded-full border border-orange p-2',
  panel: 'p-4',
  container: 'flex flex-col gap-2 justify-center items-center',
  button: 'popover-li',
  icon: 'inline mr-2 h-auto w-6',
  logoutButton: 'border-t border-t-dark-gray p-0 pt-6 w-full text-center popover-li',
} as const;
