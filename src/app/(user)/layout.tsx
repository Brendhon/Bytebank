'use client';

import { Footer, Header, NavMenu } from "@/components/layout";
import { NavItemLabel } from "@/types/nav";
import { signOut, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode } from "react";

export default ({ children }: { children: ReactNode }) => {
  // Get the current pathname
  const pathname = usePathname() as NavItemLabel;

  // Get session data
  const session = useSession();

  // Use router to navigate
  const router = useRouter();

  // Function to redirect to Storybook
  const handleNavigation = (link: string) => {
    // Check if the link is external or internal
    return link?.startsWith('http')
      ? window.open(link, '_blank')
      : router.push(link || '/');
  };

  return (
    <>
      {/* Header */}
      <Header
        variant="user"
        userName={session?.data?.user?.name || ''}
        onNavigate={handleNavigation}
        pathname={pathname}
        onLogout={() => signOut()}
      />

      <div className="content">
        {/* Sidebar */}
        <NavMenu className="hidden md:flex" current={pathname} onNavigate={handleNavigation} />

        {/* Content */}
        <main>{children}</main>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
};
