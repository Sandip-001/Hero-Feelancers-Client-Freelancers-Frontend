"use client";

import { Check, CheckCheck, Search, Star, Pin, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useState, useMemo } from 'react';

const cn = (...classes: string[]) => classes.filter(Boolean).join(' ');

// ... (Interfaces remain same) ...
interface Message {
  id: string; name: string; avatar?: string; preview: string; time: string; unreadCount?: number; online?: boolean; typing?: boolean; tick?: 'single' | 'double' | 'blue-double'; role: 'client' | 'manager' | 'freelancer'; isPinned?: boolean; isArchived?: boolean; isFavorite?: boolean;
}

interface MessageListProps {
  className?: string;
  onSelectMessage: (messageId: string) => void;
  selectedMessageId: string;
}

// MOCK DATA (Same as before)
const rawMessages: Message[] = [
    { id: '1', name: 'John Doe', role: 'manager', preview: 'The contract is ready.', time: '16:45', unreadCount: 2, online: true, isPinned: true },
    { id: '2', name: 'Travis Barker', role: 'client', avatar: '/avatars/travis.jpg', preview: 'I will try the new API...', time: '16:45', tick: "blue-double", online: false, isPinned: true },
    { id: '3', name: 'Kate Moss', role: 'manager', preview: 'typing...', time: '16:45', typing: true, online: true, isFavorite: true },
    { id: '4', name: 'Robert Parker', role: 'client', preview: 'Awesome!!', time: 'Yesterday', unreadCount: 1, online: false, tick: "single" },
    { id: '5', name: 'Old Project A', role: 'client', preview: 'Final files delivered.', time: '20/10/25', isArchived: true, tick: "blue-double" },
];
// Added more mock data to demonstrate pagination
for (let i = 6; i <= 25; i++) {
    rawMessages.push({ id: i.toString(), name: `User ${i}`, role: i % 2 === 0 ? 'client' : 'freelancer', preview: 'Can we schedule a call?', time: '14:00', online: i % 3 === 0, tick: "double" });
}

// Reusable Components
const Avatar = ({ src, fallback, className }: { src?: string, fallback: string, className?: string }) => (
    <div className={cn("rounded-full overflow-hidden flex items-center justify-center bg-slate-200 flex-shrink-0 border border-slate-100", className??"")}>
        {src ? (
            <img src={src} alt="Avatar" className="w-full h-full object-cover" />
        ) : (
            <div className="text-slate-500 font-semibold text-xs bg-slate-200 w-full h-full flex items-center justify-center">
                {fallback}
            </div>
        )}
    </div>
);

const MessageTick = ({ tick }: { tick?: Message['tick'] }) => {
    if (tick === "single") return <Check className="w-3 h-3 text-slate-400" />;
    if (tick === "double") return <CheckCheck className="w-3 h-3 text-slate-400" />;
    if (tick === "blue-double") return <CheckCheck className="w-3 h-3 text-indigo-500" />;
    return null;
};

export default function MessageList({ className, onSelectMessage, selectedMessageId }: MessageListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<'all' | 'unread' | 'favorites' | 'archived' | 'clients' | 'managers'>('all');
  
  // --- PAGINATION STATE ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Number of messages per page

  const filteredMessages = useMemo(() => {
    let filtered = rawMessages.filter(msg => 
      msg.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      msg.preview.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (activeFilter === 'archived') { return filtered.filter(msg => msg.isArchived); } 
    else { filtered = filtered.filter(msg => !msg.isArchived); }

    if (activeFilter === 'unread') return filtered.filter(msg => (msg.unreadCount || 0) > 0);
    if (activeFilter === 'favorites') return filtered.filter(msg => msg.isFavorite);
    if (activeFilter === 'clients') return filtered.filter(msg => msg.role === 'client');
    if (activeFilter === 'managers') return filtered.filter(msg => msg.role === 'manager');
    return filtered.sort((a, b) => (Number(b.isPinned) - Number(a.isPinned)));
  }, [searchQuery, activeFilter]);

  // --- PAGINATION LOGIC ---
  const totalPages = Math.ceil(filteredMessages.length / itemsPerPage);
  
  // Reset to page 1 if filter changes
  useMemo(() => {
      setCurrentPage(1);
  }, [activeFilter, searchQuery]);

  const paginatedMessages = useMemo(() => {
      const startIndex = (currentPage - 1) * itemsPerPage;
      return filteredMessages.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredMessages, currentPage, itemsPerPage]);

  const FilterPill = ({ label, value }: { label: string, value: typeof activeFilter }) => (
    <button
        onClick={() => setActiveFilter(value)}
        className={cn(
            "px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap",
            activeFilter === value 
                ? "bg-slate-800 text-white shadow-sm" 
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
        )}
    >
        {label}
    </button>
  );

  return (
    <div className={cn("flex flex-col h-full bg-white", className??"")}>
      
      {/* Header Area */}
      <div className="flex-shrink-0 px-4 pt-5 pb-3 bg-white z-10 space-y-4 border-b border-slate-100">
        <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Messages</h2>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search workstreams..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 h-10 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder-slate-400"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            <FilterPill label="All" value="all" />
            <FilterPill label="Unread" value="unread" />
            <FilterPill label="Starred" value="favorites" />
            <FilterPill label="Clients" value="clients" />
            <FilterPill label="Managers" value="managers" />
        </div>
      </div>

      {/* Messages List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {paginatedMessages.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-sm mt-10">
                <Filter className="w-8 h-8 mx-auto mb-2 opacity-50" />
                No conversations found.
            </div>
        ) : (
            paginatedMessages.map((message) => (
            <button
                key={message.id}
                onClick={() => onSelectMessage(message.id)}
                className={cn(
                    "w-full px-4 py-4 flex items-start gap-3 transition-all text-left group relative border-b border-slate-50",
                    selectedMessageId === message.id 
                        ? "bg-indigo-50/50" 
                        : "hover:bg-slate-50"
                )}
            >
                {/* Active Indicator Line */}
                {selectedMessageId === message.id && (
                    <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-indigo-600 rounded-r-full" />
                )}

                <div className="relative flex-shrink-0">
                    <Avatar 
                        className="w-12 h-12 shadow-sm" 
                        src={message.avatar} 
                        fallback={message.name.split(' ').map((n) => n[0]).join('')} 
                    />
                    {message.online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white ring-1 ring-white"></div>
                    )}
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                        <h3 className={cn("font-semibold truncate flex items-center gap-1.5", 
                            message.unreadCount ? "text-slate-900" : "text-slate-700"
                        )}>
                            {message.name}
                            {message.role === 'client' && <span className="bg-blue-100 text-blue-700 text-[10px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">Client</span>}
                            {message.role === 'manager' && <span className="bg-purple-100 text-purple-700 text-[10px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">Mgr</span>}
                        </h3>
                        <span className="text-xs text-slate-400 flex-shrink-0 font-medium">
                            {message.time}
                        </span>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 overflow-hidden">
                            <MessageTick tick={message.tick} />
                            {message.typing ? (
                                <p className="text-sm text-indigo-600 font-medium animate-pulse">
                                    typing...
                                </p>
                            ) : (
                                <p className={cn("text-sm truncate", message.unreadCount ? "text-slate-800 font-medium" : "text-slate-500")}>
                                    {message.preview}
                                </p>
                            )}
                        </div>

                        <div className="flex items-center gap-2 ml-2">
                            {message.isPinned && <Pin className="w-3.5 h-3.5 text-slate-400 rotate-45" />}
                            {message.isFavorite && <Star className="w-3.5 h-3.5 text-amber-400 fill-current" />}
                            {message.unreadCount ? (
                                <div className="bg-indigo-600 text-white text-[10px] font-bold h-5 min-w-[1.25rem] px-1.5 flex items-center justify-center rounded-full shadow-sm shadow-indigo-200">
                                    {message.unreadCount}
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>
            </button>
            ))
        )}
      </div>

      {/* --- PAGINATION FOOTER --- */}
      {filteredMessages.length > itemsPerPage && (
          <div className="p-3 border-t border-slate-100 bg-white flex items-center justify-between shrink-0">
              <button 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                  <ChevronLeft className="w-5 h-5" />
              </button>
              
              <span className="text-xs font-medium text-slate-500">
                  Page {currentPage} of {totalPages}
              </span>

              <button 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                  <ChevronRight className="w-5 h-5" />
              </button>
          </div>
      )}

    </div>
  );
}