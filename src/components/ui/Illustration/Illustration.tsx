import { cn } from '@/lib/utils';
import Image from 'next/image';

/**
 * Illustration component props
 * @interface IllustrationProps
 */
export interface IllustrationProps {
  /** Image filename (without path prefix) */
  src: string;
  /** Accessible description of the image (required for WCAG compliance) */
  alt?: string;
  /** Image width in pixels */
  width?: number;
  /** Image height in pixels (defaults to width value if not provided) */
  height?: number;
  /** Additional CSS classes */
  className?: string;
  /** Hide on mobile, show on sm+ breakpoints (default: true) */
  responsive?: boolean;
}

/**
 * Illustration component for displaying optimized images from the /public/illustrations directory
 * Uses Next.js Image component for automatic optimization, lazy loading, and modern format conversion
 * @param props - Illustration component props
 * @returns An optimized image component with responsive behavior
 */
export default function Illustration({
  src,
  alt = 'Illustration',
  width = 400,
  height,
  className,
  responsive = true,
}: IllustrationProps) {
  const imageHeight = height || width;

  return (
    <div className={cn(styles.container, { [styles.hiddenSmFlex]: responsive }, className)}>
      <Image
        alt={alt}
        width={width}
        height={imageHeight}
        src={`/illustrations/${src}`}
        className={styles.image}
        style={{ width: `${width}px` }}
      />
    </div>
  );
}


/**
 * Illustration component styles
 * Using template literals for Tailwind Intellisense autocomplete support
 */
const styles = {
  container: `flex flex-col items-center`,
  hiddenSmFlex: `hidden sm:flex`,
  image: `h-auto object-contain`,
} as const;