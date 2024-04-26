
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

import { ReactNode } from "react";
import SessionProvider from "@/utils/SessionProviders";
import { getServerSession } from "next-auth";



const poppins = Poppins({ weight: '400', subsets: ["latin"], style: "normal" });

export const metadata: Metadata = {
  title: "Greenwich University Magazine",
  description: "Magazine",
};



export default async function RootLayout({
  children,
}: { children: React.ReactNode }) {
  const session = await getServerSession();
  return (
    
    <html lang="en" suppressHydrationWarning>
      <body className={poppins.className}>
        <SessionProvider session={session}>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
