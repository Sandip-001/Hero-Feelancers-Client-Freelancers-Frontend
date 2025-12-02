"use client";

import ChatWindow from "@/components/layout/chatWindow";
import MessagesList from "@/components/layout/messagesList";
import WorkStreamRightBar from "@/components/layout/workStreamRightBar";

export default function WorkstreamsPage() {
  return (
    <div className="flex h-full bg-[#f7f8fa] overflow-hidden">
      <div className="grid grid-cols-12 w-full">

        {/* Left Sidebar (Messages List) */}
        <div className="col-span-3 border-r bg-white h-screen overflow-y-auto">
          <MessagesList />
        </div>

        {/* Middle Chat Window */}
        <div className="col-span-6  border-r bg-white h-full overflow-y-auto">
          <ChatWindow />
        </div>

        {/* Right Sidebar (WorkStream Sidebar) */}
        <div className="col-span-3 mt-10 p-1 bg-white h-screen overflow-y-auto">
          <WorkStreamRightBar />
        </div>

      </div>
    </div>
  );
}
