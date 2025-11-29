import React, { useState } from "react";
import {
  Send,
  Paperclip,
  Smile,
  Video,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ChatMessage {
  id: string;
  sender: "user" | "contact";
  content: string;
  time: string;
  type: "text" | "image" | "link";
  imageUrl?: string;
  linkUrl?: string;
  linkPreview?: {
    title: string;
    description: string;
    image: string;
  };
}

interface ChatWindowProps {
  className?: string;
}

const chatMessages: ChatMessage[] = [
  {
    id: "1",
    sender: "contact",
    content: "Hi! i made new UI-kit for project, check it late",
    time: "16:42",
    type: "text",
  },
  {
    id: "2",
    sender: "contact",
    content: "",
    time: "16:42",
    type: "image",
    imageUrl: "/chat-preview.jpg",
    linkPreview: {
      title: "Car sharing service Mobile App",
      description: "Jan V1",
      image: "/car-sharing-preview.jpg",
    },
  },
  {
    id: "3",
    sender: "user",
    content: "Thank you for work, see you!",
    time: "16:42",
    type: "text",
  },
  {
    id: "4",
    sender: "contact",
    content: "https://dribbble.com/shots/17752251-ui-kit-design/am",
    time: "16:42",
    type: "link",
    linkUrl: "https://dribbble.com/shots/17752251-ui-kit-design/am",
  },
];

export default function ChatWindow({ className }: ChatWindowProps) {
  const [message, setMessage] = useState("");
  const [isOnline, setIsOnline] = useState(true);

  // 👉 INFO DRAWER STATE
  const [showInfo, setShowInfo] = useState(false);

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log("Sending message:", message);
      setMessage("");
    }
  };

  return (
    <div className={cn("flex-1 pt-12 bg-white flex flex-col h-screen", className)}>
      
      {/* ---------------------- CHAT HEADER ---------------------- */}
      <div className="h-16 border-b border-gray-200 px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Avatar className="w-10 h-10">
              <AvatarImage src="/avatars/travis.jpg" />
              <AvatarFallback className="bg-gradient-to-br from-orange-400 to-pink-500 text-white">
                TB
              </AvatarFallback>
            </Avatar>
            {isOnline && (
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            )}
          </div>

          <div>
            <h2 className="font-semibold text-gray-800">Travis Barker</h2>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span>travis@stratalite</span>
              <span>•</span>
              <span>65520</span>
              <span>•</span>
              <span>22~01, 32 to 22~5~22</span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE BUTTONS */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-green-500">Online</span>

          <div className="flex items-center gap-1 ml-4">
            {/* Video Button */}
            <Button variant="ghost" size="icon" className="w-9 h-9">
              <Video className="w-4 h-4 text-gray-600" />
            </Button>

            {/* 👉 Info Button */}
            <Button
              onClick={() => setShowInfo(true)}
              variant="ghost"
              size="icon"
              className="w-5 h-5 border border-gray-200 text-black rounded-full font-semibold text-[15px]"
            >
              <p className="mt-1">i</p>
            </Button>
          </div>
        </div>
      </div>

      {/* ---------------------- MESSAGES AREA ---------------------- */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
        {chatMessages.map((msg) => (
          <div
            key={msg.id}
            className={cn(
              "flex gap-3",
              msg.sender === "user" ? "justify-end" : "justify-start"
            )}
          >
            {msg.sender === "contact" && (
              <Avatar className="w-8 h-8 flex-shrink-0">
                <AvatarImage src="/avatars/travis.jpg" />
                <AvatarFallback className="bg-gradient-to-br from-orange-400 to-pink-500 text-white text-xs">
                  TB
                </AvatarFallback>
              </Avatar>
            )}

            {/* EACH MESSAGE BUBBLE */}
            <div
              className={cn(
                "max-w-[60%] space-y-1",
                msg.sender === "user" && "items-end"
              )}
            >
              {msg.type === "text" && (
                <div
                  className={cn(
                    "rounded-2xl px-4 py-2",
                    msg.sender === "user"
                      ? "bg-blue-500 text-white rounded-tr-sm"
                      : "bg-white text-gray-800 rounded-tl-sm shadow-sm"
                  )}
                >
                  <p className="text-sm">{msg.content}</p>
                </div>
              )}

              {msg.type === "link" && (
                <div className="bg-white rounded-2xl px-4 py-2 shadow-sm rounded-tl-sm">
                  <a
                    href={msg.linkUrl}
                    className="text-sm text-blue-600 hover:underline break-all"
                  >
                    {msg.content || msg.linkUrl}
                  </a>
                </div>
              )}

              <div
                className={cn(
                  "flex items-center gap-2 px-2",
                  msg.sender === "user" ? "justify-end" : "justify-start"
                )}
              >
                <span className="text-xs text-gray-500">{msg.time}</span>
                {msg.sender === "user" && (
                  <span className="text-xs text-blue-500">✓✓</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ---------------------- INPUT AREA ---------------------- */}
      <div className="border-t border-gray-200 p-4 bg-white">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="w-9 h-9 flex-shrink-0">
            <Paperclip className="w-5 h-5 text-gray-500" />
          </Button>

          <div className="flex-1 relative">
            <Input
              type="text"
              placeholder="Type your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              className="pr-10 h-10 bg-blue-50 border-0 focus-visible:ring-1 focus-visible:ring-blue-500"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8"
            >
              <Smile className="w-4 h-4 text-gray-500" />
            </Button>
          </div>

          <Button
            onClick={handleSendMessage}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 h-10"
          >
            Send message
          </Button>
        </div>
      </div>

      {/* ---------------------- INFO DRAWER ---------------------- */}
      {showInfo && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-end z-50">
          <div className="w-[380px] h-full bg-white shadow-xl p-6 flex flex-col">

            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Project Information</h2>
              <button
                onClick={() => setShowInfo(false)}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <div className="space-y-5">

              <div className="p-4 bg-gray-50 rounded-lg border">
                <h3 className="font-medium mb-1">Project Documents</h3>
                <p className="text-sm text-gray-600">
                  All project-related documents will be available here.
                </p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg border">
                <h3 className="font-medium mb-1">Relationship Manager</h3>
                <p className="text-sm text-gray-600">
                  Relationship Manager can access and review all documents.
                </p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg border">
                <h3 className="font-medium mb-2">Awards & Milestones</h3>
                <p className="text-sm text-gray-600 mb-3">
                  View project milestones and payment breakdowns.
                </p>

                <Button
                  onClick={() => {
                    window.location.href = "/awards"; // redirect
                  }}
                  className="bg-blue-500 hover:bg-blue-600 text-white w-full"
                >
                  Go to Awards Section
                </Button>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
