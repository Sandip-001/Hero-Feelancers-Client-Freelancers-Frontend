"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import {
    Bell,
    Calendar,
    ChevronLeft,
    FileCheck,
    FileText,
    LayoutDashboard,
    Megaphone,
    Menu,
    Send,
    Settings,
    Star,
    UserCircle,
    Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";


type SidebarProps = {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
};

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: FileText, label: "Project", href: "/projects", shouldCollapse: true },
  { icon: Users, label: "Workstreams", href: "/workstreams", shouldCollapse: true },
  { icon: Calendar, label: "Calendar", href: "/calendar" },
  { icon: Send, label: "Proposal Sent", href: "/proposals", badge: 3, shouldCollapse: true },
  { icon: Bell, label: "Notifications", href: "/notifications", badge: 5, shouldCollapse: true },
  { icon: FileCheck, label: "Articles", href: "/articles" },
  { icon: Star, label: "Bookmarks", href: "/bookmarks" },
  { icon: UserCircle, label: "Contacts", href: "/contacts" },
];

const promotionItems = [
  { icon: Megaphone, label: "Promotions", href: "/promotions" }
];

export default function Sidebar({ collapsed, setCollapsed }: SidebarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => setMobileOpen(false), [pathname]);

  const sidebarWidth = collapsed ? "w-20" : "w-64";

  const handleMenuClick = (item: any) => {
    if (item.shouldCollapse) setCollapsed(true);
  };

  return (
    <>
      {/* MOBILE TOP BAR */}
      <div className="lg:hidden fixed top-0 left-0 z-50 w-full p-3 bg-white border-b flex items-center">
        <button onClick={() => setMobileOpen(!mobileOpen)}>
          <Menu className="h-6 w-6" />
        </button>
        <span className="ml-4 font-semibold">Stratalite</span>
      </div>

      {/* SIDEBAR */}
      <aside
        className={cn(
          "fixed h-screen bg-white border-r z-40 transition-all duration-300",
          sidebarWidth,
          mobileOpen ? "left-0" : "left-[-300px] lg:left-0"
        )}
      >
        <div className="flex flex-col h-full">

          {/* LOGO + COLLAPSE BUTTON */}
          <div className="h-16 border-b flex items-center justify-between px-4">
            {!collapsed && (
              <Link href="/" className="flex items-center space-x-2">
                <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">S</span>
                </div>
                <span className="text-xl font-bold text-gray-800">Stratalite</span>
              </Link>
            )}

            <button
              className="p-2 rounded hover:bg-gray-100"
              onClick={() => setCollapsed(!collapsed)}
            >
              {collapsed ? <Menu /> : <ChevronLeft />}
            </button>
          </div>

          {/* MENU LIST */}
          <div className="flex-1 overflow-y-auto py-3">
            <div className="px-3">
              {!collapsed && (
                <h2 className="px-4 mb-2 text-xs text-gray-500 uppercase">Menu</h2>
              )}

              <div className="space-y-1">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => handleMenuClick(item)}
                      className={cn(
                        "flex items-center justify-between py-2.5 px-4 rounded-lg text-sm transition",
                        isActive ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100"
                      )}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className="h-5 w-5" />
                        {!collapsed && <span>{item.label}</span>}
                      </div>

                      {!collapsed && item.badge && (
                        <Badge variant={isActive ? "secondary" : "default"}>
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* PRO CARD */}
            {!collapsed && (
              <div className="mx-3 my-4 p-4 rounded-lg bg-blue-50">
                <h3 className="text-sm font-semibold">Become a PRO</h3>
                <p className="text-xs mt-1">Upgrade your account</p>
              </div>
            )}

            {/* PROMOTIONS */}
            <div className="px-3">
              {!collapsed && (
                <h2 className="px-4 mb-2 text-xs text-gray-500 uppercase">Promotions</h2>
              )}

              <div className="space-y-1">
                {promotionItems.map((item) => {
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setCollapsed(true)}
                      className="flex items-center space-x-3 py-2.5 px-4 rounded-lg hover:bg-gray-100 text-gray-700"
                    >
                      <Icon className="h-5 w-5" />
                      {!collapsed && <span>{item.label}</span>}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* SETTINGS */}
          <div className="border-t p-4">
            <Link
              href="/settings"
              onClick={() => setCollapsed(true)}
              className="flex items-center space-x-3 px-4 py-2.5 rounded-lg hover:bg-gray-100 text-gray-700"
            >
              <Settings className="h-5 w-5" />
              {!collapsed && <span>Settings</span>}
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
