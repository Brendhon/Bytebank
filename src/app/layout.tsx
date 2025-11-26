import { NextAuthProvider, ToastProvider } from "@/context";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReactElement, ReactNode } from "react";
import "./globals.css";

/**
 * Props for the RootLayout component.
 */
export interface RootLayoutProps {
  /**
   * Child components to render inside the root layout.
   */
  children: ReactNode;
}

// Import the Inter font from Google Fonts
const inter = Inter({ subsets: ['latin'] });

/**
 * Define the metadata for the application.
 * 
 * This metadata is used for SEO and browser display.
 */
export const metadata: Metadata = {
  title: "Bytebank",
  description: "A simple banking app",
};

/**
 * Root layout component that wraps the entire application.
 * 
 * Provides:
 * - Global providers (NextAuth, Toast)
 * - Font optimization (Inter from Google Fonts)
 * - HTML structure and metadata
 * - Global CSS styles
 * 
 * This is a Server Component that serves as the root of the application.
 * All pages and layouts are nested within this component.
 * 
 * @component
 * @param {RootLayoutProps} props - Component props
 * @param {ReactNode} props.children - Child components to render
 * @returns {ReactElement} Root layout structure with providers and global styles
 */
export default function RootLayout({ children }: Readonly<RootLayoutProps>): ReactElement {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
