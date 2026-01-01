"use client";

import BottomNav from "@/components/layout/clientDashboard/bottomNav";
import Sidebar from "@/components/layout/clientDashboard/sidebar";
import { Bell, Check, CreditCard, FileText, LogOut, Search, User, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const USER_NAME = "John Doe";
const USER_AVATAR_URL = "https://api.dicebear.com/7.x/avataaars/svg?seed=JohnDoe";

const INITIAL_NOTIFICATIONS = [
  { id: 1, title: "New Proposal Received", message: "Alice Dev submitted a proposal...", time: "2 min ago", type: "proposal", read: false },
  { id: 2, title: "Milestone Completed", message: "Backend API integration...", time: "1 hour ago", type: "milestone", read: false },
  { id: 3, title: "Invoice Ready", message: "Invoice #4023 is ready...", time: "3 hours ago", type: "payment", read: true },
];

export default function ClientDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  
  const pathname = usePathname();
  const notificationRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Combined Click Outside Logic
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleClearNotifications = () => setNotifications([]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "proposal": return <User size={16} className="text-indigo-600" />;
      case "payment": return <CreditCard size={16} className="text-emerald-600" />;
      default: return <FileText size={16} className="text-blue-600" />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans text-slate-900">
      
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 transform transition-all duration-300 ease-in-out lg:static lg:translate-x-0 shrink-0 
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        ${isCollapsed ? "lg:w-20" : "lg:w-64"}`}
      >
        <Sidebar 
          onClose={() => setIsSidebarOpen(false)} 
          currentPath={pathname} 
          isCollapsed={isCollapsed} 
          setIsCollapsed={setIsCollapsed} 
        />
      </aside>

      <div className="flex-1 flex flex-col min-w-0 h-full relative transition-all duration-300">
        
        <header className="flex items-center justify-between px-4 sm:px-6 py-4 bg-white border-b border-slate-200 z-30 shrink-0 h-18">
          <div className="flex items-center gap-4">
            <h1 className="lg:hidden text-lg font-bold text-slate-900 tracking-tight">
                HeroFreelancer
            </h1>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <div className="hidden sm:flex items-center bg-slate-100 rounded-full px-4 py-2 border border-slate-200 focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-500 transition-all">
                <Search size={18} className="text-slate-400" />
                <input placeholder="Search projects..." className="bg-transparent border-none focus:ring-0 text-sm ml-2 w-32 md:w-48 placeholder:text-slate-400" />
            </div>

            {/* Notifications Container */}
            <div className="relative" ref={notificationRef}>
              <button 
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className={`relative p-2 rounded-full transition-colors ${isNotificationsOpen ? 'bg-indigo-50 text-indigo-600' : 'text-slate-500 hover:bg-slate-100'}`}
              >
                <Bell size={20} />
                {notifications.length > 0 && (
                  <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white animate-pulse"></span>
                )}
              </button>

              {/* Responsive Notification Dropdown */}
              {isNotificationsOpen && (
                <div className="fixed inset-x-4 top-20 sm:absolute sm:inset-x-auto sm:right-0 sm:top-full mt-3 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-[60] origin-top sm:origin-top-right animate-in fade-in slide-in-from-top-4 duration-300">
                  <div className="flex items-center justify-between px-4 py-4 border-b border-slate-100 bg-white">
                    <div>
                      <h3 className="font-bold text-base text-slate-800">Notifications</h3>
                      <p className="text-xs text-slate-500">{notifications.length} unread alerts</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {notifications.length > 0 && (
                        <button onClick={handleClearNotifications} className="text-xs text-indigo-600 hover:text-indigo-700 font-semibold px-2 py-1 hover:bg-indigo-50 rounded-md transition-colors">Clear all</button>
                      )}
                      <button onClick={() => setIsNotificationsOpen(false)} className="sm:hidden p-1 text-slate-400">
                        <X size={20} />
                      </button>
                    </div>
                  </div>

                  <div className="max-h-[60vh] sm:max-h-[400px] overflow-y-auto overscroll-contain">
                    {notifications.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-12 text-center px-4">
                        <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mb-3">
                          <Check size={24} className="text-slate-300" />
                        </div>
                        <p className="text-slate-600 font-semibold">All caught up!</p>
                        <p className="text-slate-400 text-xs mt-1">No new notifications at the moment.</p>
                      </div>
                    ) : (
                      <ul className="divide-y divide-slate-50">
                        {notifications.map((item) => (
                          <li key={item.id} className="group hover:bg-slate-50/80 transition-colors cursor-pointer px-4 py-4 flex gap-4">
                            <div className={`mt-1 flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${item.type === 'proposal' ? 'bg-indigo-50 text-indigo-600' : item.type === 'payment' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'}`}>
                                {getNotificationIcon(item.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors leading-tight">{item.title}</p>
                                <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">{item.message}</p>
                                <p className="text-[10px] text-slate-400 mt-2 font-bold uppercase tracking-wider">{item.time}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  
                  <div className="p-3 bg-slate-50 border-t border-slate-100 text-center">
                    <button className="text-xs font-bold text-slate-500 hover:text-indigo-600 transition-colors">
                      View all activities
                    </button>
                  </div>
                </div>
              )}
            </div>

            <Link href="/jobpost">
              <button className="hidden sm:block bg-indigo-600 text-white px-5 py-2 rounded-full text-sm font-semibold shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 transition-all transform active:scale-95">
                + New Project
              </button>
            </Link>

            {/* Profile Section */}
            <div className="relative" ref={profileRef}>
                <div 
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center gap-2 border-l border-slate-200 pl-3 sm:pl-4 cursor-pointer hover:opacity-80 transition-opacity"
                >
                    <img 
                        src={USER_AVATAR_URL} 
                        alt={USER_NAME} 
                        className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover bg-indigo-100 ring-2 ring-indigo-500/10"
                    />
                    <div className="hidden lg:block">
                        <p className="font-semibold text-sm leading-none">{USER_NAME}</p>
                        <p className="text-xs text-slate-500 mt-1">Client</p>
                    </div>
                </div>

                {/* Profile Dropdown */}
                {isProfileOpen && (
                    <div className="absolute right-0 top-full mt-3 w-48 bg-white rounded-xl shadow-2xl border border-slate-100 overflow-hidden z-50 origin-top-right animate-in fade-in slide-in-from-top-2 duration-200">
                        <div className="p-2">
                            <Link 
                                href="/client-profile" 
                                onClick={() => setIsProfileOpen(false)}
                                className="flex items-center gap-3 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
                            >
                                <User size={16} />
                                My Profile
                            </Link>
                            <div className="h-px bg-slate-100 my-1" />
                            <Link 
                                href="/" 
                                onClick={() => setIsProfileOpen(false)}
                                className="flex items-center gap-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
                            >
                                <LogOut size={16} />
                                Logout
                            </Link>
                        </div>
                    </div>
                )}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto pb-24 lg:pb-0">
          <div className="max-w-[1600px] mx-auto md:p-6">
            {children}
          </div>
        </main>
      </div>

      <BottomNav onMenuClick={() => setIsSidebarOpen(true)} />
    </div>
  );
}