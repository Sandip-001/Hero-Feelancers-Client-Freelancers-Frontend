"use client"

import ChatWindow from "@/components/layout/chatWindow"
import MessagesList from "@/components/layout/messagesList"

export default function WorkstreamsPage() {

  return (
    <div className="flex oiverflow-hidden h-screen bg-[#f7f8fa]">
    <div className="flex w-full">
        <MessagesList />
        <ChatWindow />
      </div>
    </div>
    
  )
}
