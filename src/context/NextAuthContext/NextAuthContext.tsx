'use client';
import { SessionProvider } from 'next-auth/react';
import { ReactElement, ReactNode } from 'react';

/**
 * NextAuthProvider component props
 * @interface NextAuthProviderProps
 */
export interface NextAuthProviderProps {
  /** Child components to wrap */
  children: ReactNode;
}

/**
 * NextAuth provider component that wraps your app
 * 
 * Provides NextAuth session context to all child components.
 * Uses NextAuth's SessionProvider internally to manage authentication state.
 * 
 * @param props - NextAuthProvider component props
 * @returns A NextAuth provider component
 * 
 * @example
 * ```tsx
 * // Wrap your app root layout
 * export default function RootLayout({ children }) {
 *   return (
 *     <html>
 *       <body>
 *         <NextAuthProvider>
 *           {children}
 *         </NextAuthProvider>
 *       </body>
 *     </html>
 *   );
 * }
 * ```
 */
export const NextAuthProvider = ({ children }: NextAuthProviderProps): ReactElement => {
  return <SessionProvider>{children}</SessionProvider>;
};
