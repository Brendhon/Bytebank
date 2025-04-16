import Providers from "@/components/Providers";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import "./globals.css";

// Import the Inter font from Google Fonts
const inter = Inter({ subsets: ['latin'] })

// Define the metadata for the application
export const metadata: Metadata = {
  title: "Bytebank",
  description: "A simple banking app",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
