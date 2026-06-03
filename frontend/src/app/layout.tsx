import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CopilotWidget from "@/components/CopilotWidget";
import SessionManager from "@/components/SessionManager";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FaceFlow | Enterprise Identity Platform",
  description: "Next-generation privacy-preserving facial recognition attendance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-50 text-slate-900 antialiased`}>
        <SessionManager />
        {children}
        <CopilotWidget />
      </body>
    </html>
  );
}
