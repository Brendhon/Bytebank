'use client';

import { Footer, Header } from "@/components/layout";
import { useSession } from "next-auth/react";

export default () => {
  // Get session data
  const session = useSession();

  return (
    <>
      {/* Header */}
      <Header
        variant="user"
        userName={session?.data?.user?.name || ''}
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
