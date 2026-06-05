import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Service Hub Sri Lanka - Find Trusted Local Service Providers",
    template: "%s | Service Hub Sri Lanka"
  },
  description: "Connect with verified service providers across Sri Lanka. Find electricians, plumbers, tutors, cleaners, and more. Instant contact via WhatsApp or phone.",
  keywords: ["sri lanka services", "local services", "service providers", "electrician sri lanka", "plumber sri lanka", "home services"],
  authors: [{ name: "Service Hub Sri Lanka" }],
  creator: "Service Hub Sri Lanka",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    type: "website",
    locale: "en_LK",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    title: "Service Hub Sri Lanka - Find Trusted Local Service Providers",
    description: "Connect with verified service providers across Sri Lanka",
    siteName: "Service Hub Sri Lanka",
  },
  twitter: {
    card: "summary_large_image",
    title: "Service Hub Sri Lanka",
    description: "Find Trusted Local Service Providers",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className, "antialiased")}>
        {children}
      </body>
    </html>
  );
}
