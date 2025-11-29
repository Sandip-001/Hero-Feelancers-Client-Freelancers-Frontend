"use client";

import { Header } from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import { useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    
    <div className="flex h-screen">

      {/* SIDEBAR */}
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* CONTENT AREA */}
      <div
        className={`
          flex-1 flex flex-col transition-all duration-300
          ${collapsed ? "ml-20" : "ml-64"}
        `}
      >
        <Header/>

        <main className="p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
