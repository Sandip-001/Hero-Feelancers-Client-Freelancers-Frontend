"use client";

import { useGetMeQuery } from "@/app/redux/api/auth.api";
import { getSocket } from "@/app/socket";
import {
  Check,
  CheckCheck,
  Search,
  Star,
  Pin,
  Filter,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import React, { useState, useMemo, useEffect } from "react";

const cn = (...classes: string[]) => classes.filter(Boolean).join(" ");

// ... (Interfaces remain same) ...
interface Message {
  id: string;
  name: string;
  avatar?: string;
  preview: string;
  time: string;
  unreadCount?: number;
  online?: boolean;
  typing?: boolean;
  tick?: "single" | "double" | "blue-double";
  role: "client" | "manager" | "freelancer";
  isPinned?: boolean;
  isArchived?: boolean;
  isFavorite?: boolean;
}

interface MessageListProps {
  refetchChatrooms?: any;
  className?: string;
  chatRooms?: any[];
  loading: boolean;
  onSelectMessage: (messageId: string) => void;
  selectedMessageId: string;
  userType: "client" | "freelancer";
}

// Reusable Components
const Avatar = ({
  src,
  fallback,
  className,
}: {
  src?: string;
  fallback: string;
  className?: string;
}) => (
  <div
    className={cn(
      "rounded-full overflow-hidden flex items-center justify-center bg-slate-200 flex-shrink-0 border border-slate-100",
      className ?? "",
    )}
  >
    {src ? (
      <img src={src} alt="Avatar" className="w-full h-full object-cover" />
    ) : (
      <div className="text-slate-500 font-semibold text-xs bg-slate-200 w-full h-full flex items-center justify-center">
        {fallback}
      </div>
    )}
  </div>
);

const MessageTick = ({ tick }: { tick?: Message["tick"] }) => {
  if (tick === "single") return <Check className="w-3 h-3 text-slate-400" />;
  if (tick === "double")
    return <CheckCheck className="w-3 h-3 text-slate-400" />;
  if (tick === "blue-double")
    return <CheckCheck className="w-3 h-3 text-indigo-500" />;
  return null;
};

export default function MessageList({
  className,
  chatRooms,
  loading,
  refetchChatrooms,
  onSelectMessage,
  selectedMessageId,
  userType,
}: MessageListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<
    "all" | "unread" | "favorites" | "archived" | "clients" | "managers"
  >("all");

  const [typingRooms, setTypingRooms] = useState<Record<string, boolean>>({});

  // 2. GET CURRENT USER ID
  const { data: authData, isLoading: isAuthLoading } = useGetMeQuery();

  // --- PAGINATION STATE ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Number of messages per page

  const messages: Message[] = useMemo(() => {
    if (!chatRooms || !authData?.user) return [];

    return chatRooms.map((room: any) => {
      let name = "";
      let avatar = "";
      let role: Message["role"] = "client";
      let online = false;

      // ---------- CLIENT VIEW ----------
      if (userType === "client") {
        if (room.Freelancer) {
          name = room.Freelancer.fullName;
          avatar = room.Freelancer.profileImage;
          role = "freelancer";
          online = room.Freelancer.isOnline;
        } else if (room.RelationShipManager) {
          name = room.RelationShipManager.fullName;
          avatar = room.RelationShipManager.profileImage;
          role = "manager";
        }
      }

      // ---------- FREELANCER VIEW ----------
      if (userType === "freelancer") {
        if (room.Client) {
          name = room.Client.fullName;
          avatar = room.Client.profileImage;
          role = "client";
          online = room.Client.isOnline;
        } else if (room.RelationShipManager) {
          name = room.RelationShipManager.fullName;
          avatar = room.RelationShipManager.profileImage;
          role = "manager";
        }
      }

      // ---------- LATEST MESSAGE ----------
      let lastMessage = null;

      if (room.messages && room.messages.length) {
        const sorted = [...room.messages].sort(
          (a: any, b: any) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );

        lastMessage = sorted[0]; // newest
      }

      let preview = "No messages yet";
      let time = new Date(room.createdAt).toLocaleDateString();
      let tick: Message["tick"] | undefined;

      if (lastMessage) {
        preview = lastMessage.message;
        time = new Date(lastMessage.createdAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        // ticks only for own messages
        if (lastMessage.senderType === authData.user.userType) {
          if (lastMessage.status === "sent") tick = "single";
          if (lastMessage.status === "delivered") tick = "double";
          if (lastMessage.status === "seen") tick = "blue-double";
        }
      }

      // ---------- UNREAD COUNT ----------
      let unreadCount = 0;

      if (room.messages && room.messages.length) {
        unreadCount = room.messages.filter(
          (m: any) =>
            m.senderType !== authData.user.userType && m.status !== "seen",
        ).length;
      }

      return {
        id: room.id.toString(),
        name,
        avatar,
        role,
        online,
        preview,
        time,
        tick,
        unreadCount,
      };
    });
  }, [chatRooms, userType, authData]);

  const messagesWithTyping = messages.map((m) => ({
    ...m,
    typing: typingRooms[m.id],
  }));

  const filteredMessages = useMemo(() => {
    let filtered = messagesWithTyping.filter(
      (msg) =>
        msg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        msg.preview.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    if (activeFilter === "archived") {
      return filtered.filter((msg) => msg.isArchived);
    } else {
      filtered = filtered.filter((msg) => !msg.isArchived);
    }

    if (activeFilter === "unread")
      return filtered.filter((msg) => (msg.unreadCount || 0) > 0);
    if (activeFilter === "favorites")
      return filtered.filter((msg) => msg.isFavorite);
    if (activeFilter === "clients") {
      if (userType === "freelancer") {
        return filtered.filter((msg) => msg.role === "client");
      }
      if (userType === "client") {
        return filtered.filter((msg) => msg.role === "freelancer");
      }
    }

    if (activeFilter === "managers")
      return filtered.filter((msg) => msg.role === "manager");
    return filtered.sort((a, b) => Number(b.isPinned) - Number(a.isPinned));
  }, [messagesWithTyping, searchQuery, activeFilter]);

  // --- PAGINATION LOGIC ---
  const totalPages = Math.max(
    1,
    Math.ceil(filteredMessages.length / itemsPerPage),
  );

  // Reset page when filter/search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter, searchQuery]);

  const paginatedMessages = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredMessages.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredMessages, currentPage]);

  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    const handleTyping = (data: any) => {
      setTypingRooms((prev) => ({
        ...prev,
        [String(data.chatRoomId)]: true,
      }));
    };

    const handleStopTyping = (data: any) => {
      setTypingRooms((prev) => ({
        ...prev,
        [String(data.chatRoomId)]: false,
      }));
    };

    const refetch = () => refetchChatrooms?.();

    socket.on("user_typing", handleTyping);
    socket.on("user_stop_typing", handleStopTyping);
    socket.on("chat_list_updated", refetch);
    socket.on("chat_room_created", refetch);
    socket.on("user_presence", refetch);
    socket.on("message_delivered", refetch);
    socket.on("messages_seen", refetch);

    return () => {
      socket.off("user_typing", handleTyping);
      socket.off("user_stop_typing", handleStopTyping);
      socket.off("chat_list_updated", refetch);
      socket.off("chat_room_created", refetch);
      socket.off("user_presence", refetch);
      socket.off("message_delivered", refetch);
      socket.off("messages_seen", refetch);
    };
  }, [refetchChatrooms]);

  const FilterPill = ({
    label,
    value,
  }: {
    label: string;
    value: typeof activeFilter;
  }) => (
    <button
      onClick={() => setActiveFilter(value)}
      className={cn(
        "px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap",
        activeFilter === value
          ? "bg-slate-800 text-white shadow-sm"
          : "bg-slate-100 text-slate-600 hover:bg-slate-200",
      )}
    >
      {label}
    </button>
  );

  return (
    <div className={cn("flex flex-col h-full bg-white", className ?? "")}>
      {/* Header Area */}
      <div className="flex-shrink-0 px-4 pt-5 pb-3 bg-white z-10 space-y-4 border-b border-slate-100">
        <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
          Messages
        </h2>

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
          {userType === "freelancer" && (
            <FilterPill label="Clients" value="clients" />
          )}

          {userType === "client" && (
            <FilterPill label="Freelancers" value="clients" />
          )}

          <FilterPill label="Managers" value="managers" />
        </div>
      </div>

      {/* Messages List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {loading ? (
          <div className="p-4 space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-3 animate-pulse">
                <div className="w-12 h-12 bg-slate-200 rounded-full" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 bg-slate-200 rounded w-1/3" />
                  <div className="h-3 bg-slate-200 rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : paginatedMessages.length === 0 ? (
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
                  : "hover:bg-slate-50",
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
                  fallback={message.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                />
                {message.online && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white ring-1 ring-white"></div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3
                    className={cn(
                      "font-semibold truncate flex items-center gap-1.5",
                      message.unreadCount ? "text-slate-900" : "text-slate-700",
                    )}
                  >
                    {message.name}
                    {message.role === "client" && (
                      <span className="bg-blue-100 text-blue-700 text-[10px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">
                        Client
                      </span>
                    )}

                    {message.role === "freelancer" && (
                      <span className="bg-green-100 text-green-700 text-[10px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">
                        FR
                      </span>
                    )}

                    {message.role === "manager" && (
                      <span className="bg-purple-100 text-purple-700 text-[10px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">
                        Mgr
                      </span>
                    )}
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
                      <p
                        className={cn(
                          "text-sm truncate",
                          message.unreadCount
                            ? "text-slate-800 font-medium"
                            : "text-slate-500",
                        )}
                      >
                        {message.preview}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 ml-2">
                    {message.isPinned && (
                      <Pin className="w-3.5 h-3.5 text-slate-400 rotate-45" />
                    )}
                    {message.isFavorite && (
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-current" />
                    )}
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
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <span className="text-xs font-medium text-slate-500">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
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
