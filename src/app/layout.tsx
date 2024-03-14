import type { Metadata } from "next";

import "./globals.css";
import localFont from 'next/font/local'
const myFont = localFont({ src: '../../asset/fonts/VonwaonBitmap-16px.ttf', weight: '800' })

import { Providers } from "../components/layouts/Providers";

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_PLATFORM_TITLE,
  description: process.env.NEXT_PUBLIC_PLATFORM_DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${myFont.className} text-lg h-[calc(100vh-120px)]`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
