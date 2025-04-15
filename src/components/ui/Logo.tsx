
// Import svg file from assets
import LogoSvg from  '@/assets/logo.svg';


// Logo component
export default ({ className }: { className?: string }) => {
  return (
    <div className={className}>
      <LogoSvg className="w-auto h-auto" />
    </div>
  );
};
