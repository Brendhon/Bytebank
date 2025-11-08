import IconSvg from '@/assets/icon.svg';
import LogoSvg from '@/assets/logo.svg';
import { cn } from '@/lib/utils';

/**
 * Logo component props
 * @interface LogoProps
 */
export interface LogoProps {
  /** Display variant: 'full' for complete logo with text, 'icon' for icon only */
  variant?: 'full' | 'icon';
  /** Size preset: 'sm' (64px), 'md' (128px), 'lg' (168px) */
  size?: 'sm' | 'md' | 'lg';
  /** Additional CSS classes for customization */
  className?: string;
  /** Accessible label for screen readers (defaults to 'Bytebank Logo') */
  title?: string;
}

/**
 * Logo component that displays the Bytebank brand in full or icon variants
 * Supports multiple sizes and provides accessibility features
 * @param props - Logo component props
 * @returns A logo component with the specified variant and size
 */
export default function Logo({
  variant = 'full',
  size = 'md',
  className,
  title,
}: LogoProps) {
  const logoTitle = title || 'Bytebank Logo';
  const logoClass = cn(styles.sizeClasses[size], styles.base, className);

  return variant === 'icon' ? (
    <IconSvg
      className={logoClass}
      role="img"
      aria-label={logoTitle}
    />
  ) : (
    <LogoSvg
      className={logoClass}
      role="img"
      aria-label={logoTitle}
    />
  );
}

/**
 * Logo component styles
 */
const styles = {
  base: `h-auto`,
  sizeClasses: {
    sm: `w-16`,
    md: `w-32`,
    lg: `w-42`,
  },
} as const;
