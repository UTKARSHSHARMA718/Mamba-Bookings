import type { Metadata } from "next";
import { Inter } from "next/font/google";

import ModalsProvider from "@/providers/ModalsProvider";
import Navbar from "@/components/Navbar/Navbar";
import Providers from "@/Theme/Providers";
import RemoveFilter from "@/components/RemoveFilter/RemoveFilter";
import ToastProvider from "@/providers/ToastProvider";

import { getCurrentUser } from "@/actions/getCurrentUser";
import { COMPANY_NAME } from "@/constants/const";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: `${COMPANY_NAME} App`,
  description: `${COMPANY_NAME} practice project`,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <>
            <ModalsProvider />
            <ToastProvider />
            <RemoveFilter />
            <Navbar {...{ currentUser }} />
            {children}
          </>
        </Providers>
      </body>
    </html>
  );
}