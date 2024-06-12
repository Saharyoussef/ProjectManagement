import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {siteConfig} from '@/config/site';
import { setConfig } from "next/config";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template:`%s | ${setConfig.name}`,
  },
  description: siteConfig.description,
  icons:[
    {
      url: "/logos.svg",
      href:"/logos.svg"
    }
  ]
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
