"use client";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

import {
  Bell,
  Calendar,
  ChevronLeft,
  CircleUserRound,
  Contact,
  CreditCard,
  Crown,
  FileText,
  LayoutDashboard,
  LogOut,
  Megaphone,
  Menu,
  Send,
  Star,
  Users,
  X,
  Check,
  Zap,
  MessageCircleMore
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type SidebarProps = {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
};

// --- DATA CONFIGURATION ---

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: FileText, label: "Projects", href: "/projects", shouldCollapse: true },
  { icon: MessageCircleMore, label: "Workstreams", href: "/workstreams", shouldCollapse: true },
  { icon: Calendar, label: "Calendar", href: "/calendar" },
  // { icon: Send, label: "Proposal Sent", href: "/proposals", badge: 3, shouldCollapse: true },
  // { icon: Star, label: "Bookmarks", href: "/bookmarks" },
  { icon: Contact, label: "Contacts", href: "/contacts" },
  { icon: CreditCard, label: "Payment History", href: "/payments" },
  { icon: CircleUserRound, label: "Profile", href: "/profile" },
];

const promotionItems = [
  { icon: Megaphone, label: "Promotions", href: "/promotions" },
];

const pricingPlans = [
  {
    name: "Basic",
    price: "Free",
    period: "forever",
    description: "Essential tools to start your journey.",
    features: ["10 Connects/mo", "Basic Profile", "Standard Support", "Payment Protection"],
    current: true,
  },
  {
    name: "Freelancer Pro",
    price: "$14.99",
    period: "/month",
    description: "Power up your career with exclusive tools.",
    features: ["80 Connects/mo", "View Competitor Bids", "Priority Support", "Custom Profile URL", "0% Service Fee on tips"],
    recommended: true,
  },
  {
    name: "Agency Plus",
    price: "$29.99",
    period: "/month",
    description: "Built for teams scaling their operations.",
    features: ["Unlimited Team Members", "Agency Insights", "Dedicated Account Manager", "API Access", "White-label Reports"],
  }
];

// --- COMPONENTS ---

export default function Sidebar({ collapsed, setCollapsed }: SidebarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  

  // Close mobile drawer on route change
  useEffect(() => setMobileOpen(false), [pathname]);

  const sidebarWidth = collapsed ? "w-[80px]" : "w-[285px]";

  const handleMenuClick = (item: any) => {
    if (item.shouldCollapse && window.innerWidth >= 1024) {
      setCollapsed(true);
    }
  };

  // --- RENDER HELPERS ---

  return (
    <>
      {/* --- DESKTOP SIDEBAR --- */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 bg-white border-r transition-all duration-300 ease-in-out",
          "hidden lg:flex flex-col",
          sidebarWidth
        )}
      >
        <div className="flex flex-col h-full">
          {/* LOGO HEADER */}
          <div className="h-16 border-b flex items-center justify-between px-4 shrink-0">
            {!collapsed && (
              <Link href="/" className="flex items-center space-x-2 overflow-hidden">
                <div className="h-8 w-8 bg-[#14A9F9] rounded-full flex items-center justify-center shrink-0 shadow-sm">
                  <span className="text-white font-bold">HF</span>
                </div>
                <span className="text-xl font-bold text-gray-800 whitespace-nowrap tracking-tight">
                  HeroFreelancer
                </span>
              </Link>
            )}
            
            <button
              className={cn(
                "p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors",
                collapsed ? "mx-auto" : "ml-auto"
              )}
              onClick={() => setCollapsed(!collapsed)}
            >
              {collapsed ? <Menu className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
            </button>
          </div>

          {/* MENU SCROLL AREA */}
          <div className="flex-1 overflow-y-auto py-4 scrollbar-thin scrollbar-thumb-gray-200">
            <div className="px-3">
              {!collapsed && (
                <h2 className="px-4 mb-2 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  Main Menu
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
                        "flex items-center group py-2.5 px-3 rounded-xl transition-all duration-200",
                        isActive
                          ? "bg-blue-50 text-[#14A9F9] shadow-sm"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      )}
                    >
                      <Icon
                        className={cn(
                          "h-5 w-5 shrink-0 transition-colors",
                          isActive ? "text-[#14A9F9]" : "text-gray-400 group-hover:text-gray-600",
                          collapsed ? "mx-auto" : "mr-3"
                        )}
                      />
                      {!collapsed && (
                        <span className="flex-1 font-medium text-sm truncate">{item.label}</span>
                      )}
                      {/* {!collapsed && item.badge && (
                        <Badge 
                          variant="secondary" 
                          className="bg-blue-100 text-blue-700 hover:bg-blue-200 ml-auto border-none"
                        >
                          {item.badge}
                        </Badge>
                      )} */}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* PRO CARD (Only visible when expanded) */}
            {!collapsed && (
              <div className="px-3 mt-6">
                <Link href="/subscription">
                <button
                  className="relative w-full overflow-hidden p-4 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-left group hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  {/* Decorative circles */}
                  <div className="absolute top-0 right-0 -mt-2 -mr-2 w-16 h-16 bg-white/10 rounded-full blur-xl"></div>
                  <div className="absolute bottom-0 left-0 -mb-2 -ml-2 w-12 h-12 bg-white/10 rounded-full blur-lg"></div>
                  
                  <div className="relative z-10 flex items-center gap-3 mb-1">
                    <div className="p-1.5 bg-white/20 backdrop-blur-md rounded-lg shadow-inner">
                      <Crown className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="text-sm font-bold text-white tracking-wide">Become a PRO</h3>
                  </div>
                  <p className="relative z-10 text-xs text-blue-100 mt-1 font-medium pl-1">
                    Upgrade for 10x visibility
                  </p>
                </button>
                </Link>
              </div>
            )}

            {/* PROMOTIONS */}
            <div className="px-3 mt-6">
              {!collapsed && (
                <h2 className="px-4 mb-2 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
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
                      className={cn(
                        "flex items-center group py-2.5 px-3 rounded-xl transition-all text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      )}
                    >
                      <Icon className={cn(
                          "h-5 w-5 shrink-0 text-gray-400 group-hover:text-gray-600",
                          collapsed ? "mx-auto" : "mr-3"
                        )} 
                      />
                      {!collapsed && <span className="font-medium text-sm truncate">{item.label}</span>}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* LOGOUT FOOTER */}
          <div className="p-4 border-t bg-white shrink-0">
            <button 
              onClick={() => alert("Logging out...")}
              className={cn(
                "flex items-center w-full rounded-xl text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors",
                collapsed ? "justify-center py-2" : "px-3 py-2.5 space-x-3"
              )}
            >
              <LogOut className="h-5 w-5 shrink-0" />
              {!collapsed && <span className="font-medium text-sm">Logout</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* --- MOBILE OVERLAY (DRAWER) --- */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative w-[85%] max-w-[320px] bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-left duration-300">
            <div className="h-20 flex items-center justify-between px-6 border-b bg-gray-50/50">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 bg-[#14A9F9] rounded-lg flex items-center justify-center shrink-0 shadow-sm">
                  <span className="text-white font-bold">HF</span>
                </div>
                <span className="text-lg font-bold text-gray-800">HeroFreelancer</span>
              </div>
              <button onClick={() => setMobileOpen(false)} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">

              <h3 className="px-2 mb-2 text-xs font-semibold text-gray-400 uppercase">Menu</h3>
              {menuItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "flex items-center space-x-3 py-3 px-3 rounded-lg transition-colors",
                      isActive ? "bg-blue-50 text-[#14A9F9]" : "text-gray-600 hover:bg-gray-50"
                    )}
                  >
                    <item.icon className={cn("h-5 w-5", isActive ? "text-[#14A9F9]" : "text-gray-400")} />
                    <span className="font-medium text-sm">{item.label}</span>
                    {/* {item.badge && (
                      <Badge variant="secondary" className="ml-auto bg-blue-100 text-blue-700">
                        {item.badge}
                      </Badge>
                    )} */}
                  </Link>
                );
              })}
            

              <div className="mb-6">
                  <button
                    onClick={() => { setMobileOpen(false); }}
                    className="w-full p-4 rounded-xl bg-gradient-to-r from-[#14A9F9] to-blue-600 text-white flex items-center justify-between shadow-md"
                  >
                    <div className="flex items-center gap-3">
                      <Crown className="w-5 h-5 text-white" />
                      <div className="text-left">
                          <p className="text-sm font-bold">Upgrade to Pro</p>
                          <p className="text-[10px] text-blue-100">Unlock all features</p>
                      </div>
                    </div>
                    <ChevronLeft className="w-4 h-4 rotate-180" />
                  </button>
              </div>
            </div>

             <div className="p-4 border-t bg-gray-50">
               <button onClick={() => alert("Logging out")} className="flex items-center justify-center space-x-2 text-gray-600 hover:text-red-600 w-full px-4 py-3 bg-white border rounded-xl shadow-sm">
                 <LogOut className="h-5 w-5" />
                 <span className="font-medium text-sm">Log Out</span>
               </button>
             </div>
          </div>
        </div>
      )}

      {/* --- MOBILE BOTTOM NAVIGATION (CURVED) --- */}
      {/* Structure:
         [Item 0] [Item 1] [MIDDLE FAB] [Item 3] [Item 4 - Menu]
         The middle item (index 2) is "Workstreams" in our logic, but visually we will make it pop.
      */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white h-[70px] flex items-center justify-between px-2 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
         {/* Item 1: Dashboard */}
         <Link href="/dashboard" className={cn("flex-1 flex flex-col items-center gap-1", pathname === "/dashboard" ? "text-[#14A9F9]" : "text-gray-400")}>
            <LayoutDashboard className="h-6 w-6" />
         </Link>

         {/* Item 2: Projects */}
         <Link href="/projects" className={cn("flex-1 flex flex-col items-center gap-1", pathname === "/projects" ? "text-[#14A9F9]" : "text-gray-400")}>
            <FileText className="h-6 w-6" />
         </Link>

         {/* Item 3: MIDDLE FAB (Workstreams) */}
         <div className="relative -top-8 flex-1 flex justify-center">
            <Link 
               href="/workstreams" 
               className="h-14 w-14 rounded-full bg-[#14A9F9] text-white shadow-lg shadow-blue-400/40 flex items-center justify-center border-[5px] border-gray-50 transform hover:scale-110 transition-transform duration-200"
            >
               <Users className="h-6 w-6" />
            </Link>
            {/* Curved cut-out simulation via SVG or just CSS tricks. Since we have a gray background page, border-gray-50 helps blend it. */}
         </div>

         {/* Item 4: Calendar */}
         <Link href="/calendar" className={cn("flex-1 flex flex-col items-center gap-1", pathname === "/calendar" ? "text-[#14A9F9]" : "text-gray-400")}>
            <Calendar className="h-6 w-6" />
         </Link>

         {/* Item 5: Menu Trigger */}
         <button onClick={() => setMobileOpen(true)} className={cn("flex-1 flex flex-col items-center gap-1 text-gray-400", mobileOpen && "text-[#14A9F9]")}>
            <Menu className="h-6 w-6" />
         </button>
      </div>
    </>
  );
}