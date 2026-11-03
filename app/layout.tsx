import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SiteLoader from "@/components/ui/site-loader";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "DevCatalyst | Student Community",
  description: "A student community that builds connection through technology, events, and collaboration.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={inter.className}>
        <noscript>
          <style>{`.dc-site-loader{display:none}`}</style>
        </noscript>
        <SiteLoader />
        {children}
      </body>
    </html>
  );
}
