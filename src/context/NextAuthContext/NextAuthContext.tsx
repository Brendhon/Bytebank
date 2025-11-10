'use client';
import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

// Wrap your app in this provider to enable NextAuth session context
export default function NextAuthProvider({ children }: { children: ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
