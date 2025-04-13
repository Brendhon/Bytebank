
// Import svg file from assets
import LogoSvg from  '@/assets/logo.svg';


// Define the Footer component
export default function Logo({ className }: { className?: string }) {
  return (
    <div className={className}>
      <LogoSvg className="w-auto h-auto" />
    </div>
  );
}
