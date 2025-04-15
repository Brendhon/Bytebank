// Import svg file from assets
import LogoSvg from '@/assets/logo.svg';

type LogoProps = {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

const sizeClasses = {
  sm: 'w-16 h-auto',
  md: 'w-32 h-auto',
  lg: 'w-42 h-auto',
};

export default ({ size = 'md', className }: LogoProps) => {
  return <LogoSvg className={`${sizeClasses[size]} ${className || ''}`} />;
};
