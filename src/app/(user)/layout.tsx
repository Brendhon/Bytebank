'use client';

import { Footer, Header, NavMenu } from "@/components/layout";
import { PROTECTED_ROUTES } from "@/lib/constants";
import { NavItemLabel } from "@/types/nav";
import { signOut, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { ReactElement, ReactNode, useCallback, useMemo } from "react";

/**
 * Props for the UserLayout component.
 */
export interface UserLayoutProps {
  /**
   * Child components to render inside the layout.
   */
  children: ReactNode;
}

/**
 * Type guard to validate if a path is a valid NavItemLabel.
 * 
 * @param {string} path - The path to validate
 * @returns {boolean} True if path is a valid NavItemLabel
 */
function isValidNavItem(path: string): path is NavItemLabel {
  const validPaths: readonly string[] = Object.values(PROTECTED_ROUTES);
  return validPaths.includes(path);
}

/**
 * User layout component that wraps authenticated user pages.
 * 
 * Provides:
 * - Header with user actions and navigation
 * - Sidebar navigation menu (NavMenu)
 * - Footer
 * - Main content area
 * 
 * This is a Client Component that manages navigation and session state.
 * It handles both internal and external navigation links.
 * 
 * @component
 * @param {UserLayoutProps} props - Component props
 * @returns {ReactElement} User layout structure
 */
export default function UserLayout({ children }: UserLayoutProps): ReactElement {
  // Get the current pathname
  const pathname = usePathname();

  // Get session data
  const session = useSession();

  // Use router to navigate
  const router = useRouter();

  /**
   * Handles navigation to internal or external links.
   * 
   * External links (starting with 'http') are opened in a new tab.
   * Internal links are navigated using Next.js router.
   * 
   * @param {string} link - The link to navigate to
   * @returns {void} Opens external links in new tab, navigates to internal links
   */
  const handleNavigation = useCallback((link: string) => {
    link?.startsWith('http') ? window.open(link, '_blank') : router.push(link || '/');
  }, [router]);

  /**
   * Validated pathname for navigation.
   * Returns pathname if it's a valid NavItemLabel, otherwise defaults to dashboard.
   */
  const navPathname = useMemo((): NavItemLabel => {
    return pathname && isValidNavItem(pathname) ? pathname : PROTECTED_ROUTES.DASHBOARD;
  }, [pathname]);

  return (
    <>
      {/* Header */}
      <Header
        variant="user"
        userName={session?.data?.user?.name || ''}
        onNavigate={handleNavigation}
        pathname={navPathname}
        onLogout={() => signOut()}
      />

      <div className={styles.content}>
        {/* Sidebar */}
        <NavMenu
          className={styles.sidebar}
          current={navPathname}
          onNavigate={handleNavigation}
        />

        {/* Content */}
        <main>{children}</main>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}

/**
 * Styles for UserLayout component
 * 
 * All Tailwind classes are centralized here for better maintainability
 * and separation of concerns.
 */
const styles = {
  content: 'content',
  sidebar: 'hidden md:flex',
} as const;
