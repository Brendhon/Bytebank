'use client';

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default () => {
  // Get session data
  const session = useSession();

  // Use router to navigate
  const router = useRouter();

  return (
    <>
      Settings
    </>
  );
};
