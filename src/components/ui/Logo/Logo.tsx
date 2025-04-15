// components/ui/Logo/index.tsx
import LogoSvg from '@/assets/logo.svg';
import IconSvg from '@/assets/icon.svg';

interface LogoProps {
  variant?: 'full' | 'icon';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'w-16',
  md: 'w-32',
  lg: 'w-42',
};

export default ({ variant = 'full', size = 'md', className }: LogoProps) => {
  // Set new className based on size and className props
  const newClass = `${sizeClasses[size]} h-auto ${className}`;

  // Return the appropriate SVG based on the variant prop
  return variant === 'icon' ? <IconSvg className={newClass} /> : <LogoSvg className={newClass} />;
};
