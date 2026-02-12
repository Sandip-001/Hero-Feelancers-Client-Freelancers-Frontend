"use client";

import { useGetMeQuery } from "@/app/redux/api/auth.api";
import { useGetchatHistoryQuery } from "@/app/redux/api/chatMessage.api";
import { useGetchatroomsQuery } from "@/app/redux/api/chatroom.api";
import { connectSocket, getSocket } from "@/app/socket";
import { formatDateLabel } from "@/lib/utils/formatDateLabelChat";
import {
  Paperclip,
  Phone,
  Smile,
  Video,
  ArrowLeft,
  PanelRightClose,
  PanelRightOpen,
  Search,
  SendHorizonal,
  CheckCheck,
  Image as ImageIcon,
  Mic,
  Check,
  ChevronDown,
} from "lucide-react";
import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useLayoutEffect,
} from "react";
import { toast } from "sonner";

const cn = (...classes: string[]) => classes.filter(Boolean).join(" ");

// --- TYPES ---
interface ChatMessage {
  id: string;
  sender: "user" | "contact";
  content: string;
  time: string;
  type: "text" | "image" | "link";
  createdAt: string;
  status?: "sent" | "delivered" | "seen";
  imageUrl?: string;
  linkUrl?: string;
}

interface ChatWindowProps {
  chatRoomId: string;
  className?: string;
  onBack?: () => void;
  onToggleInfo?: () => void;
  isSidebarOpen?: boolean;
}

interface HeaderUser {
  name: string;
  avatar?: string;
  role: "client" | "freelancer" | "manager";
  isOnline?: boolean;
  lastSeenAt?: string;
}

function getHeaderUser(
  room: any,
  userType: "client" | "freelancer",
): HeaderUser | null {
  if (!room) return null;

  // CLIENT VIEW
  if (userType === "client") {
    if (room.Freelancer) {
      return {
        name: room.Freelancer.fullName,
        avatar: room.Freelancer.profileImage,
        role: "freelancer",
        isOnline: room.Freelancer.isOnline,
        lastSeenAt: room.Freelancer.lastSeenAt,
      };
    }

    if (room.RelationShipManager) {
      return {
        name: room.RelationShipManager.fullName,
        avatar: room.RelationShipManager.profileImage,
        role: "manager",
      };
    }
  }

  // FREELANCER VIEW
  if (userType === "freelancer") {
    if (room.Client) {
      return {
        name: room.Client.fullName,
        avatar: room.Client.profileImage,
        role: "client",
        isOnline: room.Client.isOnline,
        lastSeenAt: room.Client.lastSeenAt,
      };
    }

    if (room.RelationShipManager) {
      return {
        name: room.RelationShipManager.fullName,
        avatar: room.RelationShipManager.profileImage,
        role: "manager",
      };
    }
  }

  return null;
}

export default function ChatWindow({
  chatRoomId,
  className,
  onBack,
  onToggleInfo,
  isSidebarOpen,
}: ChatWindowProps) {
  const {
    data: chatData,
    isLoading,
    refetch,
  } = useGetchatHistoryQuery(
    { chatId: chatRoomId },
    {
      refetchOnMountOrArgChange: true,
    },
  );

  // 2. GET CURRENT USER ID
  const { data: authData, isLoading: isAuthLoading } = useGetMeQuery();

  const { data: chatrooms } = useGetchatroomsQuery(
    {
      userId: authData?.user?.id,
      userType: authData?.user?.userType,
    },
    { skip: !authData?.user?.id },
  );

  const currentRoom = chatrooms?.data?.find(
    (room: any) => room.id === Number(chatRoomId),
  );

  const headerUser = useMemo(() => {
    if (!currentRoom || !authData?.user?.userType) return null;

    return getHeaderUser(currentRoom, authData.user.userType);
  }, [currentRoom, authData]);

  // State for Messages and Input
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const [showScrollButton, setShowScrollButton] = useState(false);
  const [currentStickyDate, setCurrentStickyDate] = useState("");

  const [presence, setPresence] = useState({
    isOnline: headerUser?.isOnline,
    lastSeenAt: headerUser?.lastSeenAt,
  });

  const [searchMode, setSearchMode] = useState(false);
  const [searchText, setSearchText] = useState("");
  const messageRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    if (headerUser) {
      setPresence({
        isOnline: headerUser.isOnline,
        lastSeenAt: headerUser.lastSeenAt,
      });
    }
  }, [headerUser]);

  useEffect(() => {
    // Clear messages immediately when room changes
    setMessages([]);
    setIsTyping(false);
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
    if (chatRoomId) {
      refetch();
    }
  }, [chatRoomId]);

  useLayoutEffect(() => {
    if (!scrollRef.current) return;

    const el = scrollRef.current;
    el.scrollTop = el.scrollHeight;
  }, [messages, chatRoomId, isTyping]);

  //Track scroll position for floating button
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      const nearBottom = isNearBottom();
      setShowScrollButton(!nearBottom);

      // sticky date logic
      const dateElements = el.querySelectorAll("[data-date]");
      let current = "";

      dateElements.forEach((d: any) => {
        const rect = d.getBoundingClientRect();
        if (rect.top <= 80) {
          current = d.dataset.date;
        }
      });

      if (current) setCurrentStickyDate(current);
    };

    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, [messages]);

  const scrollToBottom = () => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  };

  const handleSearch = (text: string) => {
    setSearchText(text);

    const found = messages.find((m) =>
      m.content.toLowerCase().includes(text.toLowerCase()),
    );

    if (found && messageRefs.current[found.id]) {
      messageRefs.current[found.id]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  useEffect(() => {
    if (!authData?.user) return;

    // If still loading → do nothing
    if (isLoading) return;

    // If no messages → empty state
    if (!chatData?.messages || chatData.messages.length === 0) {
      setMessages([]);
      return;
    }

    const mapped = chatData.messages.map((m: any) => ({
      id: m.id.toString(),
      sender: m.senderType === authData.user.userType ? "user" : "contact",
      content: m.message,
      time: new Date(m.createdAt).toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      createdAt: m.createdAt,
      type: "text",
      status: m.status || "sent",
    }));

    setMessages((prev) => {
      if (!prev.length) return mapped;

      const prevMap = new Map(prev.map((m) => [m.id, m.status]));

      return mapped.map((m: any) => ({
        ...m,
        status: prevMap.get(m.id) || m.status,
      }));
    });
  }, [chatData, authData, isLoading]);

  const typingTimeoutRef = useRef<any>(null);

  const userTypeRef = useRef<string | null>(null);

  useEffect(() => {
    if (authData?.user?.userType) {
      userTypeRef.current = authData.user.userType;
    }
  }, [authData]);

  useEffect(() => {
    if (!chatRoomId || !authData?.user) return;

    const socket = getSocket();
    if (!socket) return;

    const joinRoom = () => {
      console.log("📥 Join chatRoom:", chatRoomId);
      socket.emit("join_chat", {
        chatRoomId: Number(chatRoomId),
      });
    };

    if (socket.connected) {
      joinRoom();
    } else {
      socket.once("connect", joinRoom);
    }

    const handleNewMessage = (msg: any) => {
      setMessages((prev) => {
        if (prev.find((m) => m.id === msg.id.toString())) {
          return prev;
        }

        const newMsg: ChatMessage = {
          id: msg.id.toString(),
          sender: msg.senderType === userTypeRef.current ? "user" : "contact",
          content: msg.message,
          time: new Date(msg.createdAt).toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
          }),
          createdAt: msg.createdAt, // ✅ add this
          type: "text",
          status: msg.status,
        };

        const updated = [...prev, newMsg];

        // if message already seen, update it
        if (newMsg.status === "seen") {
          return updated.map((m) =>
            m.id === newMsg.id ? { ...m, status: "seen" } : m,
          );
        }

        return updated;
      });
    };

    const handleBlocked = (data: any) => {
      toast.error(data.error);
    };

    const handleRemoved = (data: any) => {
      setMessages((prev) =>
        prev.filter((m) => Number(m.id) !== data.messageId),
      );
    };

    const handleSeen = (data: any) => {
      if (data.chatRoomId !== Number(chatRoomId)) return;

      setMessages((prev) =>
        prev.map((m) =>
          data.messageIds?.includes(Number(m.id))
            ? { ...m, status: "seen" }
            : m,
        ),
      );
    };

    const handleDelivered = (data: any) => {
      setMessages((prev) =>
        prev.map((m) =>
          Number(m.id) === data.messageId ? { ...m, status: "delivered" } : m,
        ),
      );
    };

    const handleTyping = (data: any) => {
      if (data.chatRoomId === Number(chatRoomId)) {
        setIsTyping(true);
      }
    };

    const handleStopTyping = (data: any) => {
      if (data.chatRoomId === Number(chatRoomId)) {
        setIsTyping(false);
      }
    };

    const handlePresence = (data: any) => {
      if (!headerUser) return;

      if (data.userType === headerUser.role) {
        setPresence({
          isOnline: data.isOnline,
          lastSeenAt: data.lastSeenAt,
        });
      }
    };

    socket.on("new_message", handleNewMessage);
    socket.on("message_blocked", handleBlocked);
    socket.on("message_removed", handleRemoved);
    socket.on("user_typing", handleTyping);
    socket.on("user_stop_typing", handleStopTyping);
    socket.on("messages_seen", handleSeen);
    socket.on("user_presence", handlePresence);
    socket.on("message_delivered", handleDelivered);

    return () => {
      socket.emit("leave_chat", {
        chatRoomId: Number(chatRoomId),
      });

      socket.off("new_message", handleNewMessage);
      socket.off("message_blocked", handleBlocked);
      socket.off("message_removed", handleRemoved);
      socket.off("user_typing", handleTyping);
      socket.off("user_stop_typing", handleStopTyping);
      socket.off("messages_seen", handleSeen);
      socket.off("user_presence", handlePresence);
      socket.off("message_delivered", handleDelivered);
    };
  }, [chatRoomId, authData?.user?.id]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const socket = getSocket();
    if (!socket) return;

    socket.emit("send_message", {
      chatRoomId: Number(chatRoomId),
      message: inputValue,
    });

    // stop typing immediately
    socket.emit("typing_stop", {
      chatRoomId: Number(chatRoomId),
    });

    setInputValue("");
  };

  const isNearBottom = () => {
    if (!scrollRef.current) return false;
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    return scrollHeight - (scrollTop + clientHeight) < 100;
  };

  // Handle Enter Key
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className={cn("flex flex-col h-full bg-slate-50", className ?? "")}>
      {/* ---------------- HEADER ---------------- */}
      <div className="h-16 flex-shrink-0 px-4 md:px-6 flex items-center justify-between bg-white border-b border-slate-200 z-10 shadow-sm">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="lg:hidden p-2 -ml-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 p-4 border-b bg-white">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-200">
              {headerUser?.avatar ? (
                <img
                  src={headerUser.avatar}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-sm font-semibold">
                  {headerUser?.name?.[0]}
                </div>
              )}
            </div>

            <div>
              <p className="font-semibold text-slate-800">
                {headerUser?.name || "Conversation"}
              </p>
              <p className="text-xs text-slate-400 capitalize">
                {headerUser?.role}
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span
                className={cn(
                  "w-2 h-2 rounded-full",
                  presence.isOnline ? "bg-green-500" : "bg-gray-400",
                )}
              />
              {presence.isOnline ? (
                <span className="text-green-600 font-medium">Online</span>
              ) : presence.lastSeenAt ? (
                <span>
                  Last seen{" "}
                  {new Date(presence.lastSeenAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              ) : (
                "Offline"
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1 md:gap-2 text-slate-400">
          {searchMode ? (
            <input
              autoFocus
              placeholder="Search messages..."
              className="px-3 py-1.5 border rounded-lg text-sm"
              value={searchText}
              onChange={(e) => handleSearch(e.target.value)}
              onBlur={() => setSearchMode(false)}
            />
          ) : (
            <button
              title="Search Chat"
              onClick={() => setSearchMode(true)}
              className="p-2 hover:bg-slate-50 hover:text-indigo-600 rounded-lg transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
          )}

          {/*<button
            title="Voice Call"
            className="p-2 hover:bg-slate-50 hover:text-indigo-600 rounded-lg hidden sm:block transition-colors"
          >
            <Phone className="w-5 h-5" />
          </button>
          <button
            title="Video Call"
            className="p-2 hover:bg-slate-50 hover:text-indigo-600 rounded-lg hidden sm:block transition-colors"
          >
            <Video className="w-5 h-5" />
          </button> */}

          <div className="h-6 w-px bg-slate-200 mx-2 hidden sm:block"></div>

          <button
            onClick={onToggleInfo}
            className={cn(
              "p-2 rounded-lg transition-all duration-200",
              isSidebarOpen
                ? "bg-indigo-50 text-indigo-600"
                : "text-slate-500 hover:bg-slate-100",
            )}
            title={isSidebarOpen ? "Close Details" : "Open Details"}
          >
            {isSidebarOpen ? (
              <PanelRightClose className="w-5 h-5" />
            ) : (
              <PanelRightOpen className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* ---------------- MESSAGES AREA ---------------- */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6"
      >
        <div className="relative max-w-4xl mx-auto flex flex-col gap-4">
          {currentStickyDate && (
            <div className="sticky top-2 z-20 flex justify-center pointer-events-none">
              <span className="bg-slate-200/90 backdrop-blur text-slate-700 text-[11px] font-semibold px-3 py-1 rounded-full shadow">
                {currentStickyDate}
              </span>
            </div>
          )}

          {isLoading && (
            <div className="flex justify-center mt-10">
              <span className="text-slate-400 text-sm font-medium">
                Loading messages...
              </span>
            </div>
          )}

          {!isLoading && messages.length === 0 && (
            <div className="flex justify-center mt-10">
              <span className="text-slate-400 text-sm font-medium">
                No messages yet
              </span>
            </div>
          )}

          {messages.map((msg, index) => {
            const currentDate = new Date(msg.createdAt);
            const prevMsg = messages[index - 1];

            let showDivider = false;
            let label = "";

            if (!prevMsg) {
              showDivider = true;
              label = formatDateLabel(msg.createdAt);
            } else {
              const prevDate = new Date(prevMsg.createdAt);
              if (currentDate.toDateString() !== prevDate.toDateString()) {
                showDivider = true;
                label = formatDateLabel(msg.createdAt);
              }
            }

            return (
              <React.Fragment key={msg.id}>
                {showDivider && (
                  <div
                    data-date={label}
                    className="flex justify-center my-4 sticky top-2 z-10"
                  >
                    <span className="bg-slate-200/80 backdrop-blur text-slate-600 text-[11px] font-semibold px-3 py-1 rounded-full shadow">
                      {label}
                    </span>
                  </div>
                )}
                <div
                  ref={(el) => {
                    messageRefs.current[msg.id] = el;
                  }}
                  className={cn(
                    "flex w-full animate-in slide-in-from-bottom-2 duration-300",
                    msg.sender === "user" ? "justify-end" : "justify-start",
                    searchText &&
                      msg.content
                        .toLowerCase()
                        .includes(searchText.toLowerCase())
                      ? "bg-yellow-100 rounded-xl"
                      : "",
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[85%] sm:max-w-[70%] rounded-2xl px-5 py-3 text-sm shadow-sm leading-relaxed relative group",
                      // User: Indigo Solid | Contact: White Card
                      msg.sender === "user"
                        ? "bg-indigo-600 text-white rounded-br-sm"
                        : "bg-white text-slate-700 border border-slate-200 rounded-bl-sm",
                    )}
                  >
                    {msg.type === "text" && (
                      <p className="whitespace-pre-wrap break-words">
                        {msg.content}
                      </p>
                    )}
                    {msg.type === "link" && (
                      <a
                        href={msg.linkUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          "underline break-all font-medium",
                          msg.sender === "user"
                            ? "text-indigo-100"
                            : "text-indigo-600",
                        )}
                      >
                        {msg.linkUrl}
                      </a>
                    )}

                    <div
                      className={cn(
                        "text-[10px] flex items-center justify-end gap-1 mt-1 opacity-70",
                        msg.sender === "user"
                          ? "text-indigo-100"
                          : "text-slate-400",
                      )}
                    >
                      {msg.time}
                      {msg.sender === "user" && (
                        <>
                          {msg.status === "sent" && (
                            <Check className="w-3 h-3" />
                          )}
                          {msg.status === "delivered" && (
                            <CheckCheck className="w-3 h-3 text-white font-bold" />
                          )}
                          {msg.status === "seen" && (
                            <CheckCheck className="w-3 h-3 text-blue-400" />
                          )}
                        </>
                      )}
                    </div>
                  </div>{" "}
                </div>{" "}
              </React.Fragment>
            );
          })}

          {/* your existing bubble code stays unchanged */}

          {/* Typing Indicator Bubble */}
          {isTyping && (
            <div className="flex w-full justify-start animate-in fade-in duration-200">
              <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1 shadow-sm items-center">
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
              </div>
            </div>
          )}
        </div>
      </div>

      {showScrollButton && (
        <button
          onClick={scrollToBottom}
          className="absolute bottom-24 right-6 bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-full shadow-lg transition-all animate-in fade-in zoom-in"
        >
          <ChevronDown className="w-5 h-5" />
        </button>
      )}

      {/* ---------------- INPUT AREA ---------------- */}
      <div className="bg-white px-4 py-4 border-t border-slate-200 z-10">
        <div className="max-w-4xl mx-auto flex items-end gap-2">
          {/* Attachments Menu */}
          <div className="flex gap-1">
            <button
              title="Add File"
              className="text-slate-400 hover:text-indigo-600 p-2.5 rounded-full hover:bg-slate-50 transition-colors hidden sm:block"
            >
              <Paperclip className="w-5 h-5" />
            </button>
            <button
              title="Add Image"
              className="text-slate-400 hover:text-indigo-600 p-2.5 rounded-full hover:bg-slate-50 transition-colors hidden sm:block"
            >
              <ImageIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Text Input */}
          <div className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl flex items-center px-4 focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-500 transition-all">
            <input
              className="flex-1 py-3 bg-transparent border-none focus:outline-none placeholder-slate-400 text-sm text-slate-700"
              placeholder="Type your message..."
              value={inputValue}
              onChange={(e) => {
                const value = e.target.value;
                setInputValue(value);

                const socket = getSocket();
                if (!socket) return;

                // emit typing start
                socket.emit("typing_start", {
                  chatRoomId: Number(chatRoomId),
                });

                // reset typing timeout
                if (typingTimeoutRef.current) {
                  clearTimeout(typingTimeoutRef.current);
                }

                typingTimeoutRef.current = setTimeout(() => {
                  socket.emit("typing_stop", {
                    chatRoomId: Number(chatRoomId),
                  });
                }, 1500); // stop after 1.5s idle
              }}
              onKeyDown={handleKeyDown}
              autoFocus
            />
            <button
              title="Add Emoji"
              className="text-slate-400 hover:text-amber-500 p-2 transition-colors"
            >
              <Smile className="w-5 h-5" />
            </button>
          </div>

          <button
            onClick={handleSendMessage}
            className="bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-full shadow-lg shadow-indigo-200 transition-all transform hover:scale-105 active:scale-95 flex-shrink-0"
          >
            <SendHorizonal className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
