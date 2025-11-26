import { Logo } from '@/components/ui';
import { ReactNode } from 'react';

/**
 * Footer content wrapper component props
 * @interface FooterContentProps
 */
interface FooterContentProps {
  /** Content to be wrapped */
  children: ReactNode;
}

/**
 * Footer content wrapper component
 * Wraps footer content sections with consistent styling
 * @param props - FooterContentProps
 * @returns A wrapper div for footer content
 */
const FooterContent = ({ children }: FooterContentProps) => {
  return <div className={styles.content}>{children}</div>;
};

/**
 * Footer contact information interface
 * @interface FooterContactInfo
 */
export interface FooterContactInfo {
  /** Phone number for contact */
  phone?: string;
  /** Email address for contact */
  email?: string;
}

/**
 * Footer component props
 * @interface FooterProps
 */
export interface FooterProps {
  /** Additional CSS classes */
  className?: string;
  /** Custom contact information (optional, uses default if not provided) */
  contactInfo?: FooterContactInfo;
}

const defaultContactInfo: Required<FooterContactInfo> = {
  phone: '0800 004 250 08',
  email: 'meajuda@bytebank.com.br',
};

/**
 * Footer component that displays contact information and logo
 * Renders a footer with contact details (phone and email) and the bank logo
 * @param props - FooterProps
 * @returns A footer component
 */
export const Footer = ({ className, contactInfo }: FooterProps = {}) => {
  const phone = contactInfo?.phone || defaultContactInfo.phone;
  const email = contactInfo?.email || defaultContactInfo.email;

  // Format phone number for tel: link (remove spaces and special characters)
  const phoneLink = phone.replace(/\s+/g, '').replace(/[^\d+]/g, '');

  return (
    <footer className={className ? `${styles.footer} ${className}` : styles.footer}>
      <address className={styles.address}>
        <FooterContent>
          <h3 className={styles.contactTitle}>Contato</h3>
          <a href={`tel:${phoneLink}`} className={styles.contactLink} aria-label={`Call us at ${phone}`}>
            {phone}
          </a>
          <a href={`mailto:${email}`} className={styles.contactLink} aria-label={`Send email to ${email}`}>
            {email}
          </a>
        </FooterContent>
      </address>

      <FooterContent>
        <Logo />
      </FooterContent>
    </footer>
  );
};

/**
 * Footer component styles
 */
const styles = {
  footer: 'flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-4',
  content: 'flex flex-col gap-2',
  address: 'not-italic',
  contactTitle: 'text-base font-semibold',
  contactLink: 'hover:text-green transition-colors',
} as const;
