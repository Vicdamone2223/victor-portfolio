// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Header from "../components/Header";
import FireCursor from "../components/FireCursor";
import TapRipple from "../components/TapRipple";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Victor Digital Media",
  description: "Web & app developer portfolio by Victor.",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0b1625] text-white`}>
        <Header />
        {children}

        {/* Visual effects (desktop cursor + mobile tap ripple) */}
        <FireCursor />
        <TapRipple />
      </body>
    </html>
  );
}
