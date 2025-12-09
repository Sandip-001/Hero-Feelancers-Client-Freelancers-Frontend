"use client";

import ChatWindow from "@/components/layout/chatWindow";
import MessagesList from "@/components/layout/messagesList";
import WorkStreamRightBar from "@/components/layout/workstreamRightBar";



export default function WorkstreamsPage() {
  return (
    <div className="flex h-screen bg-[#f7f8fa] overflow-hidden mt-[-1.5rem]">
      <div className="grid grid-cols-10 w-full">

        {/* Left Sidebar (Messages List) */}
        <div className="col-span-2 border-r bg-white h-screen overflow-y-auto">
          <MessagesList />
        </div>

        {/* Middle Chat Window */}
        <div className="col-span-5  border-r bg-white h-full overflow-y-auto">
          <ChatWindow />
        </div>

        {/* Right Sidebar (WorkStream Sidebar) */}
        <div className="col-span-3  bg-white h-screen overflow-y-auto">
          <WorkStreamRightBar />
        </div>

      </div>
    </div>
  );
}
