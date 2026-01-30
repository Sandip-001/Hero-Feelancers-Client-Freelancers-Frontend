import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SidebarProvider } from "@/components/layout/SidebarContext";
import ReduxProvider from "./redux/provider";
import { ToasterProvider } from "@/components/ui/toaster";
import GoogleAnalytics from "./_components/GoogleAnalytics";
import AnalyticsTracker from "./_components/AnalyticsTracker";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HeroFreelancer - Freelance Project Management Platform",
  description: "Manage your freelance projects, clients, and proposals with ease",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Combined the body tags into one. 
          Applied the font class here.
      */}
      <body className={`${inter.className} antialiased`}>
        <ToasterProvider />
        <GoogleAnalytics />
        <AnalyticsTracker />
        <ReduxProvider>
          <SidebarProvider>
            {children}
          </SidebarProvider>
         
        </ReduxProvider>
      </body>
    </html>
  );
}