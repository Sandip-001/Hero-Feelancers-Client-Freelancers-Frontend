"use client";

import { useGetMeQuery } from "@/app/redux/api/auth.api";
import { useGetchatroomsQuery } from "@/app/redux/api/chatroom.api";
import ChatWindow from "@/components/layout/chatWindow";
import MessagesList from "@/components/layout/messagesList";
import WorkStreamRightBar from "@/components/layout/workstreamRightBar";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const cn = (...classes: string[]) => classes.filter(Boolean).join(" ");

export default function MessagesPage() {
  // Initialize as NULL so mobile shows the list first
  const searchParams = useSearchParams();
  const roomIdFromUrl = searchParams.get("roomId");

  const [selectedChatId, setSelectedChatId] = useState<string | null>(
    roomIdFromUrl,
  );
  const [showRightSidebar, setShowRightSidebar] = useState(false); // Default closed for cleaner start
  const [isMobile, setIsMobile] = useState(false);

  // 2. GET CURRENT USER ID
  const { data: authData, isLoading: isAuthLoading } = useGetMeQuery();
  const clientId = authData?.user?.id;

  // 3. PASS ID TO QUERY (AND SKIP IF NOT READY)
  const {
    data: chatrooms,
    isLoading: isListLoading,
    refetch,
  } = useGetchatroomsQuery(
    { userId: clientId, userType: "client" },
    { skip: !clientId },
  );

  useEffect(() => {
      if (roomIdFromUrl) {
        setSelectedChatId(roomIdFromUrl);
      }
    }, [roomIdFromUrl]);

  //console.log("Chatrooms", chatrooms?.data)

  // Responsive Check
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleSelectMessage = (id: string) => {
    setSelectedChatId(id);
    // On mobile, ensure sidebar is closed when entering a new chat
    if (isMobile) setShowRightSidebar(false);
  };

  const handleBackToList = () => {
    setSelectedChatId(null);
    setShowRightSidebar(false);
  };

  const toggleRightSidebar = () => {
    setShowRightSidebar(!showRightSidebar);
  };

  return (
    // Main container - Fixed height, no overflow on body
    <div className="flex bg-white overflow-hidden relative shadow-sm border border-slate-200 rounded-2xl h-[calc(100vh-9rem)]">
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
      {/* ---------------- LEFT SIDEBAR (MESSAGES LIST) ---------------- */}
      <div
        className={cn(
          "bg-white h-full flex-shrink-0 border-r border-slate-200 transition-all duration-300 z-10",
          // Mobile: Full width if no chat selected
          // Desktop: Fixed width always visible
          isMobile
            ? selectedChatId
              ? "hidden"
              : "w-full absolute inset-0"
            : "w-[320px] xl:w-[380px] relative",
        )}
      >
        <MessagesList
          userType="client"
          refetchChatrooms={refetch}
          chatRooms={chatrooms?.data}
          loading={isListLoading}
          selectedMessageId={selectedChatId || ""}
          onSelectMessage={handleSelectMessage}
        />
      </div>

      {/* ---------------- MIDDLE (CHAT WINDOW) ---------------- */}
      <div
        className={cn(
          "flex-1 bg-slate-50 h-full relative flex flex-col min-w-0",
          // Mobile: Hidden if no chat selected
          isMobile && !selectedChatId ? "hidden" : "flex",
        )}
      >
        {selectedChatId ? (
          <ChatWindow
            key={selectedChatId}
            chatRoomId={selectedChatId}
            onBack={handleBackToList}
            onToggleInfo={toggleRightSidebar}
            isSidebarOpen={showRightSidebar}
          />
        ) : (
          /* Empty State (Desktop Only) */
          <div className="hidden lg:flex flex-col items-center justify-center h-full text-slate-400">
            <div className="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center mb-4">
              <span className="text-3xl">💬</span>
            </div>
            <h3 className="text-lg font-semibold text-slate-700">
              Select a Workstream
            </h3>
            <p className="text-sm text-slate-500">
              Choose a conversation to view details.
            </p>
          </div>
        )}
      </div>

      {/* ---------------- RIGHT SIDEBAR (OVERLAY DRAWER) ---------------- */}
      {/* Fixed Logic: Positioned ABSOLUTE on both Mobile and Desktop.
         This ensures it overlays the chat instead of shrinking it.
      */}
      <div
        className={cn(
          "h-full bg-white shadow-2xl border-l border-slate-200 absolute right-0 top-0 z-20 transition-transform duration-300 ease-in-out lg:pb-0 pb-[64px]",
          // Dimensions
          "w-full md:w-[380px]",
          // Toggle Logic (Slide in/out)
          showRightSidebar ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="w-full h-full">
          <WorkStreamRightBar onClose={() => setShowRightSidebar(false)} />
        </div>
      </div>
    </div>
  );
}
