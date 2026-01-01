"use client";

import React from "react";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  FileText,
  CreditCard,
  MessageSquare,
  Menu, // Added for the hamburger menu
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

// 1. Updated navItems to include Menu at the end
const navItems = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/client-dashboard" },
  { name: "Projects", icon: FolderKanban, href: "/project" },
  { name: "Proposals", icon: MessageSquare, href: "/messages" },
  { name: "Payments", icon: CreditCard, href: "/payment" },
  { name: "Menu", icon: Menu, href: "#menu" }, // Hamburger menu trigger
];

interface BottomNavProps {
  onMenuClick: () => void;
}

export default function BottomNav({ onMenuClick }: BottomNavProps) {
  const pathname = usePathname();
  const centerIndex = Math.floor(navItems.length / 2);

  return (
    <div className="fixed -bottom-1 left-0 right-0 z-50 flex justify-center md:hidden pointer-events-none">
      <div className="relative w-full max-w-md pointer-events-auto">
        {/* Background Layer */}
        <div 
          className="absolute inset-0 bottom-0 h-16 bg-white shadow-[0_-5px_20px_-5px_rgba(0,0,0,0.1)] rounded-t-2xl rounded-b-none"
          style={{
            maskImage: 'radial-gradient(circle 38px at center -15px, transparent 36px, black 37px)',
            WebkitMaskImage: 'radial-gradient(circle 38px at center -15px, transparent 36px, black 37px)'
          }}
        />

        <nav className="relative flex h-16 items-center justify-between px-6">
          {navItems.map((item, index) => {
            const isActive = pathname === item.href;
            const isCenter = index === centerIndex;
            const isMenu = item.href === "#menu";

            // Determine what component to render
            if (isMenu) {
              return (
                <button
                  key={item.name}
                  onClick={onMenuClick}
                  className="group relative flex flex-1 flex-col items-center justify-center gap-1 h-full w-1/5 text-slate-400 hover:text-slate-600"
                >
                  <div className="relative p-2">
                    <item.icon size={22} strokeWidth={2} />
                  </div>
                </button>
              );
            }

            if (isCenter) {
              return (
                <div key={item.name} className="relative -top-8 flex flex-col items-center justify-center w-1/5">
                  <Link
                    href={item.href}
                    className={`flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all duration-300 ${
                      isActive ? "bg-emerald-600 text-white" : "bg-blue-600 text-white"
                    } hover:scale-105 active:scale-95`}
                  >
                    <item.icon size={24} strokeWidth={2} />
                  </Link>
                </div>
              );
            }

            return (
              <Link
                key={item.name}
                href={item.href}
                className="group relative flex flex-1 flex-col items-center justify-center gap-1 h-full w-1/5"
              >
                <div className={`relative p-2 transition-colors duration-300 ${isActive ? "text-blue-700" : "text-slate-400 group-hover:text-slate-600"}`}>
                  <item.icon size={22} strokeWidth={2} />
                </div>
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute bottom-3 h-1.5 w-1.5 rounded-full bg-blue-600"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}