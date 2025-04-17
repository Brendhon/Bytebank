'use client';

import { Footer, Header, NavMenu } from "@/components/layout";
import { NavItemLabel } from "@/components/layout/NavMenu/NavMenu";
import { useSession } from "next-auth/react";
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
    link?.startsWith('http')
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
      />

      <div className="content">
        {/* Sidebar */}
        <NavMenu current={pathname} onNavigation={handleNavigation} />

        {/* Content */}
        <main>{children}</main>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
};
