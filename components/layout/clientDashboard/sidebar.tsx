"use client";

import Link from "next/link";
import {
    LayoutDashboard,
    FolderKanban,
    FileText,
    CreditCard,
    MessageSquare,
    Users,
    LogOut,
    X,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

interface SidebarProps {
    onClose: () => void;
    currentPath: string;
    isCollapsed: boolean;
    setIsCollapsed: (value: boolean) => void;
}

const navItems = [
    { name: "Dashboard", icon: LayoutDashboard, href: '/client-dashboard' },
    { name: "My Projects", icon: FolderKanban, href: '/project' },
    { name: "Proposals", icon: FileText, href: '/proposal' },
    { name: "Payments", icon: CreditCard, href: '/payment' },
    { name: "Messages", icon: MessageSquare, href: '/messages' },
    { name: "Relationship Manager", icon: Users, href: '/manager' },
];

export default function Sidebar({ onClose, currentPath, isCollapsed, setIsCollapsed }: SidebarProps) {
    
    const handleItemClick = () => {
        // Close the mobile drawer when a link is clicked
        if (window.innerWidth < 1024 && onClose) {
            onClose();
        }
    };

    return (
        <div 
            className={`flex flex-col h-full bg-white text-slate-700 shadow-xl transition-all duration-300 ease-in-out ${
                isCollapsed ? "lg:w-20" : "lg:w-64"
            } w-[280px]`} 
        >
            {/* Header Section */}
           <div className="p-4 border-b border-gray-200 flex justify-between items-center h-[73px] shrink-0">
    <Link 
        href="/" 
        onClick={handleItemClick}
        className={`hover:opacity-80 transition-opacity ${isCollapsed ? "lg:hidden" : "block"}`}
    >
        <h1 className="text-xl font-bold tracking-tight text-slate-900 truncate">
            HeroFreelancer
        </h1>
    </Link>
    
    {/* Desktop Toggle Button */}
    <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="hidden lg:flex p-1.5 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors"
    >
        {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
    </button>

    {/* Mobile Close Button (X) */}
    <button 
        onClick={onClose} 
        className="p-1 text-slate-500 hover:bg-slate-100 rounded-md lg:hidden"
    >
        <X size={24} />
    </button>
</div>

            {/* Scrollable Navigation Section */}
            <div className="flex-1 overflow-y-auto py-4">
                <nav className="px-3 space-y-1">
                    {navItems.map((item, idx) => {
                        const isActive = item.href === currentPath || (item.href === '/client-dashboard' && currentPath === '/');
                        
                        return (
                            <Link
                                key={idx}
                                href={item.href}
                                onClick={handleItemClick}
                                className={`flex items-center gap-3 rounded-xl transition-all duration-200 ${
                                    isCollapsed ? "lg:justify-center lg:px-2" : "px-4"
                                } py-3 ${
                                    isActive 
                                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" 
                                    : "text-slate-600 hover:bg-indigo-50 hover:text-indigo-700" 
                                }`}
                                title={isCollapsed ? item.name : ""}
                            >
                                <item.icon size={20} className="shrink-0" />
                                <span className={`font-semibold text-sm whitespace-nowrap ${isCollapsed ? "lg:hidden" : "block"}`}>
                                    {item.name}
                                </span>
                            </Link>
                        );
                    })}
                </nav>
            </div>

        </div>
    );
}