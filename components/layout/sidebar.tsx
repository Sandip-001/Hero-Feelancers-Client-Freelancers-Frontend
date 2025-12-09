"use client";

import { cn } from "@/lib/utils";
import { CreditCard } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";


import {
  Bell,
  Calendar,
  ChevronLeft,
  CircleUserRound,
  Contact,
  Crown,
  FileCheck,
  FileText,
  LayoutDashboard,
  LogOut,
  Megaphone,
  Menu,
  Send,
  Star,
  Users
} from "lucide-react";

import { Badge } from "@/components/ui/badge";

const pricingPlans = [
  {
    name: "Basic",
    price: "Free",
    description: "Everything you need to start finding work.",
    features: [
      "10 Connects per month",
      "Basic profile visibility",
      "Payment protection",
      "Safe messaging",
    ],
    highlight: false,
    buttonText: "Current Plan",
  },
  {
    name: "Freelancer Plus",
    price: "$14.99/mo",
    description: "Stand out and get more control over your success.",
    features: [
      "80 Connects per month",
      "View competitor bids",
      "Keep earnings confidential",
      "Custom profile URL",
      "High-value job alerts",
    ],
    highlight: true,
    buttonText: "Upgrade Now",
  },
  {
    name: "Agency Plus",
    price: "$29.99/mo",
    description: "For agencies looking to scale their operations.",
    features: [
      "Unlimited team members",
      "Agency profile visibility",
      "Dedicated support",
      "Lower service fees",
      "Advanced reporting",
    ],
    highlight: false,
    buttonText: "Contact Sales",
  },
];

type SidebarProps = {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
};

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: FileText, label: "Project", href: "/projects", shouldCollapse: true },
  {
    icon: Users,
    label: "Workstreams",
    href: "/workstreams",
    shouldCollapse: true,
  },
  { icon: Calendar, label: "Calendar", href: "/calendar" },
  {
    icon: Send,
    label: "Proposal Sent",
    href: "/proposals",
    badge: 3,
    shouldCollapse: true,
  },
  {
    icon: Bell,
    label: "Notifications",
    href: "/notifications",
    badge: 5,
    shouldCollapse: true,
  },
  { icon: FileCheck, label: "Articles", href: "/articles" },
  { icon: Star, label: "Bookmarks", href: "/bookmarks" },
  { icon: Contact, label: "Contacts", href: "/contacts" },
  { icon: CreditCard, label: "Payment History", href: "/payments" },
  { icon: CircleUserRound, label: "Profile", href: "/profile" },
];

const promotionItems = [
  { icon: Megaphone, label: "Promotions", href: "/promotions" },
];

export default function Sidebar({ collapsed, setCollapsed }: SidebarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isProModalOpen, setIsProModalOpen] = useState(false);

  useEffect(() => setMobileOpen(false), [pathname]);

  const sidebarWidth = collapsed ? "w-25" : "w-72";

  const handleMenuClick = (item: any) => {
    if (item.shouldCollapse) setCollapsed(true);
  };

  const handleLogout = () => {
    alert("Logging out...");
  };

  return (
    <>
      {/* MOBILE BAR */}
      <div className="lg:hidden fixed top-0 left-0 z-50 w-full p-3 bg-white border-b flex items-center">
        <button onClick={() => setMobileOpen(!mobileOpen)}>
          <Menu className="h-6 w-6" />
        </button>
        <span className="ml-4 font-semibold">HeroFreelancer</span>
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
          {/* HEADER */}
          <div className="h-16 border-b flex items-center justify-between px-4">
            {!collapsed && (
              <Link href="/" className="flex items-center space-x-2">
                <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">HF</span>
                </div>
                <span className="text-xl font-bold text-gray-800">
                  HeroFreelancer
                </span>
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
                <h2 className="px-4 mb-2 text-xs text-gray-500 uppercase">
                  Menu
                </h2>
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
                        "flex items-center justify-between py-2.5 px-4 text-sm rounded-lg transition-all border-l-4",
                        isActive
                          ? "border-[#14A9F9] text-[#14A9F9] font-semibold bg-transparent"
                          : "border-transparent text-gray-700 hover:bg-gray-100"
                      )}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon
                          className={cn(
                            "h-5 w-5 transition",
                            isActive ? "text-[#14A9F9]" : "text-gray-600"
                          )}
                        />

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
              <button
                onClick={() => setIsProModalOpen(true)}
                className="w-[calc(100%-24px)] mx-3 my-4 p-4 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors cursor-pointer text-left group border border-blue-100"
              >
                <div className="flex items-center gap-2 mb-1">
                  <Crown className="w-4 h-4 text-[#14A9F9]" />
                  <h3 className="text-sm font-bold text-blue-900">
                    Become a PRO
                  </h3>
                </div>
                <p className="text-xs text-blue-700">
                  Upgrade your account for more features
                </p>
              </button>
            )}

            {/* PROMOTIONS */}
            <div className="px-3">
              {!collapsed && (
                <h2 className="px-4 mb-2 text-xs text-gray-500 uppercase">
                  Promotions
                </h2>
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

          {/* LOGOUT */}
          <div className="border-t p-4">
            <Link href="/">
              <button className="flex w-full items-center space-x-3 px-4 py-2.5 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors">
                <LogOut className="h-5 w-5" />
                {!collapsed && <span>Logout</span>}
              </button>
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
