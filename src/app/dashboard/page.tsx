'use client';

import { Footer, Header } from "@/components/layout";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default () => {
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

      {/* Content */}
      <main>
        Dashboard
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
};
