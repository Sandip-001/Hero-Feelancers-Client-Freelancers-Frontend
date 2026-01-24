"use client"

import { useState, useEffect, useRef, use } from "react"
import { 
  Search, 
  Bell, 
  MessageSquare, 
  ChevronRight, 
  Check, 
  X, 
  CreditCard, 
  AlertCircle, 
  Info, 
  Mail,
  Trash2
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { usePathname } from "next/navigation" // Added for path detection
import { cn } from "@/lib/utils"
import { useGetMeQuery } from "@/app/redux/api/auth.api"

interface HeaderProps {
  userName?: string
  userRole?: string
  userImage?: string
  collapsed: boolean 
}

type NotificationType = 'payment' | 'message' | 'alert' | 'system';

interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
  type: NotificationType;
}

const initialNotifications: Notification[] = [
  {
    id: '1',
    title: 'Payment Received',
    description: 'Milestone 2 payment of $400 has been released.',
    time: '2 min ago',
    read: false,
    type: 'payment'
  },
  {
    id: '2',
    title: 'New Proposal Request',
    description: 'Client "TechCorp" invited you to a job.',
    time: '1 hour ago',
    read: false,
    type: 'system'
  },
  {
    id: '3',
    title: 'Security Alert',
    description: 'New login detected from Chrome on Mac OS.',
    time: 'Yesterday',
    read: true,
    type: 'alert'
  },
  {
    id: '4',
    title: 'Message from Sarah',
    description: 'Hey, can you update the Figma file?',
    time: '2 days ago',
    read: true,
    type: 'message'
  }
];

export function Header({ 
  userName = "Bhim", 
  userRole = "Vendor", 
  userImage, 
  collapsed 
}: HeaderProps) {

  const {data} = useGetMeQuery();
  
  const pathname = usePathname(); // Get current route
  const isWorkstreamPage = pathname === "/workstreams"; // Check if we are in messages

  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const notificationRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 50 && currentScrollY > lastScrollY.current) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const removeNotification = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case 'payment': return <CreditCard className="w-4 h-4 text-emerald-500" />;
      case 'alert': return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'message': return <Mail className="w-4 h-4 text-blue-500" />;
      default: return <Info className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <header 
      className={cn(
        "fixed top-0 right-0 z-30 h-16 border-b bg-white/95 backdrop-blur-sm transition-all duration-300 ease-in-out",
        collapsed ? "lg:left-[80px]" : "lg:left-[285px]",
        "left-0",
        // HIDE TOTALLY ON MOBILE IF IN WORKSTREAM PAGE
        isWorkstreamPage ? "hidden lg:flex" : "flex", 
        !isVisible && "-translate-y-full lg:translate-y-0"
      )}
    >
      <div className="flex h-full w-full items-center justify-between px-4 lg:px-6 gap-4">
        
        <div className="lg:hidden flex items-center gap-2">
           <div className="h-8 w-8 bg-[#14A9F9] rounded-full flex items-center justify-center shrink-0">
              <span className="text-white font-bold text-xs">HF</span>
           </div>
        </div>

        <div className="flex-1 max-w-xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-10 bg-gray-50 border-gray-200 focus-visible:ring-[#14A9F9] focus-visible:ring-offset-0"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2 lg:space-x-4 shrink-0">
          
          <div className="relative" ref={notificationRef}>
            <Button 
              variant="ghost" 
              size="icon" 
              className={cn(
                "relative hover:bg-gray-100 rounded-full transition-colors",
                showNotifications && "bg-blue-50 text-blue-600"
              )}
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell className="h-5 w-5 text-gray-600" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-white animate-pulse"></span>
              )}
            </Button>

            {showNotifications && (
              <div className="absolute right-0 sm:right-0 top-full mt-2 w-[300px] sm:w-[380px] bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden animate-in slide-in-from-top-2 duration-200 origin-top-right z-50">
                <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                   <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-gray-800">Notifications</h3>
                      {unreadCount > 0 && (
                        <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                          {unreadCount} New
                        </span>
                      )}
                   </div>
                   {unreadCount > 0 && (
                     <button 
                       onClick={markAllAsRead}
                       className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                     >
                       <Check className="w-3 h-3" /> Mark all read
                     </button>
                   )}
                </div>

                <div className="max-h-[350px] overflow-y-auto custom-scrollbar">
                  {notifications.length === 0 ? (
                    <div className="p-8 text-center text-gray-400">
                      <Bell className="w-8 h-8 mx-auto mb-2 opacity-20" />
                      <p className="text-sm">No notifications available</p>
                    </div>
                  ) : (
                    notifications.map((item) => (
                      <div 
                        key={item.id}
                        onClick={() => markAsRead(item.id)}
                        className={cn(
                          "p-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors relative group",
                          !item.read ? "bg-blue-50/30" : "bg-white"
                        )}
                      >
                         <div className="flex gap-3">
                            <div className={cn(
                              "w-8 h-8 rounded-full flex items-center justify-center shrink-0 border",
                              !item.read ? "bg-white border-blue-100" : "bg-gray-50 border-gray-100"
                            )}>
                               {getNotificationIcon(item.type)}
                            </div>
                            <div className="flex-1 space-y-1">
                               <div className="flex justify-between items-start">
                                  <p className={cn("text-sm leading-tight", !item.read ? "font-semibold text-gray-800" : "text-gray-600")}>
                                    {item.title}
                                  </p>
                                  <span className="text-[10px] text-gray-400 whitespace-nowrap ml-2">{item.time}</span>
                               </div>
                               <p className="text-xs text-gray-500 line-clamp-2">{item.description}</p>
                            </div>
                         </div>
                         
                         <button 
                           onClick={(e) => removeNotification(e, item.id)}
                           className="absolute top-2 right-2 p-1 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                           title="Dismiss"
                         >
                           <X className="w-3 h-3" />
                         </button>

                         {!item.read && (
                           <div className="absolute top-1/2 right-3 -translate-y-1/2 w-2 h-2 bg-blue-500 rounded-full"></div>
                         )}
                      </div>
                    ))
                  )}
                </div>

                {notifications.length > 0 && (
                  <div className="p-3 bg-gray-50 text-center border-t border-gray-100">
                    <button 
                      onClick={clearAllNotifications}
                      className="text-xs font-medium text-gray-500 hover:text-red-600 flex items-center justify-center gap-1 w-full transition-colors"
                    >
                      <Trash2 className="w-3 h-3" /> Clear all notifications
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="relative hidden sm:block">
            <Link href="/workstreams">
              <Button variant="ghost" size="icon" className="relative hover:bg-gray-100 rounded-full">
                <MessageSquare className="h-5 w-5 text-gray-600" />
                <span className="absolute top-1.5 right-1.5 h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-white"></span>
              </Button>
            </Link>
          </div>

          <div className="pl-2 lg:pl-4 lg:border-l border-gray-100">
            <Link 
              href="/profile" 
              className="flex items-center gap-2 lg:gap-3 hover:bg-gray-50 rounded-full p-1 pr-2 transition-all cursor-pointer"
            >
              <Avatar className="h-8 w-8 lg:h-9 lg:w-9 border border-gray-200">
                <AvatarImage src={data?.user?.profileImage} alt={data?.user?.fullName} />
                <AvatarFallback className="bg-[#14A9F9] text-white">
                  {data?.user?.fullName.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              
              <div className="hidden lg:flex flex-col text-left">
                <span className="text-sm font-semibold text-gray-800 leading-none">{data?.user?.fullName}</span>
                <span className="text-xs text-gray-500 mt-1 leading-none">{data?.user?.userType}</span>
              </div>
              
              <ChevronRight className="hidden lg:block h-4 w-4 text-gray-400" />
            </Link>
          </div>

        </div>
      </div>
    </header>
  )
}