// Import svg file from assets
import LogoSvg from '@/assets/logo.svg';

type LogoProps = {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

const sizeClasses = {
  sm: '16',
  md: '32',
  lg: '42',
};

export default ({ size = 'md', className }: LogoProps) => {
  return <LogoSvg className={`w-${sizeClasses[size]} h-auto ${className || ''}`} />;
};
