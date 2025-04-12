import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Import the Inter font from Google Fonts
const inter = Inter({ subsets: ['latin'] })

// Define the metadata for the application
export const metadata: Metadata = {
  title: "Bytebank",
  description: "A simple banking app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
