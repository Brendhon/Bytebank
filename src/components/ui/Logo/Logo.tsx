// Import svg file from assets
import LogoSvg from '@/assets/logo.svg';

type LogoProps = {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

const sizeClasses = {
  sm: 'w-16',
  md: 'w-32',
  lg: 'w-42',
};

export default ({ size = 'md', className }: LogoProps) => {
  return <LogoSvg className={`${sizeClasses[size]} h-auto ${className || ''}`} />;
};
