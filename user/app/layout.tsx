import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";
import { HydrationGuard } from "@/components/HydrationGuard";
import { AuthApiSync } from "@/components/AuthApiSync";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RecordX - Your Personal health record manager",
  description: "RecordX is a personal health record manager that helps you keep track of your medical history, medications, and appointments in one secure place.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", inter.variable)}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <HydrationGuard>
          <AuthApiSync />
          {children}
        </HydrationGuard>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
