import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { SidebarProvider } from "@/components/layout/SidebarContext"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "HeroFreelancer - Freelance Project Management Platform",
  description: "Manage your freelance projects, clients, and proposals with ease",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      
      <SidebarProvider>
        <body className={inter.className}>{children}</body>
      </SidebarProvider>
    </html>
  )
}
