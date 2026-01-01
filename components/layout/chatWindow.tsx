"use client";

import { 
  FileText, 
  Paperclip, 
  Phone, 
  Smile, 
  Video, 
  ArrowLeft, 
  PanelRightClose, 
  PanelRightOpen, 
  Search, 
  SendHorizonal,
  MoreHorizontal, 
  CheckCheck,
  Image as ImageIcon,
  Mic
} from "lucide-react";
import { useState, useRef, useEffect } from "react";

const cn = (...classes: string[]) => classes.filter(Boolean).join(' ');

// --- TYPES ---
interface ChatMessage { 
  id: string; 
  sender: "user" | "contact"; 
  content: string; 
  time: string; 
  type: "text" | "image" | "link"; 
  imageUrl?: string; 
  linkUrl?: string; 
}

interface ChatWindowProps { 
  className?: string; 
  onBack?: () => void; 
  onToggleInfo?: () => void; 
  isSidebarOpen?: boolean; 
}

// --- INITIAL MOCK DATA ---
const initialMessages: ChatMessage[] = [
    { id: "1", sender: "contact", content: "Hi! I uploaded the new wireframes. Take a look.", time: "10:01", type: "text" },
    { id: "2", sender: "user", content: "Got it! Reviewing now. Thanks!", time: "10:02", type: "text" },
    { id: "3", sender: "contact", content: "https://figma.link/project-dashboard", time: "10:05", type: "link", linkUrl: "https://figma.link/project-dashboard" },
    { id: "4", sender: "user", content: "Looks great. Starting integration this afternoon.", time: "10:15", type: "text" },
];

export default function ChatWindow({ className, onBack, onToggleInfo, isSidebarOpen }: ChatWindowProps) {
  // State for Messages and Input
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new message
  useEffect(() => {
    if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // FUNCTION: Format current time
  const getCurrentTime = () => {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // FUNCTION: Handle Sending Message
  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      content: inputValue,
      time: getCurrentTime(),
      type: "text"
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputValue("");

    // Simulate "Typing" and "Reply" from the contact
    simulateResponse();
  };

  // FUNCTION: Simulate a bot response (Micro-functionality)
  const simulateResponse = () => {
    setIsTyping(true);
    setTimeout(() => {
        const reply: ChatMessage = {
            id: (Date.now() + 1).toString(),
            sender: "contact",
            content: "That sounds perfect! Let me know if you need any assets.",
            time: getCurrentTime(),
            type: "text"
        };
        setMessages((prev) => [...prev, reply]);
        setIsTyping(false);
    }, 2000); // 2 second delay
  };

  // Handle Enter Key
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
        handleSendMessage();
    }
  };

  return (
    <div className={cn("flex flex-col h-full bg-slate-50", className??"")}>
      
      {/* ---------------- HEADER ---------------- */}
      <div className="h-16 flex-shrink-0 px-4 md:px-6 flex items-center justify-between bg-white border-b border-slate-200 z-10 shadow-sm">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="lg:hidden p-2 -ml-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 cursor-pointer group" onClick={onToggleInfo}>
            <div className="w-10 h-10 rounded-full bg-slate-200 border border-slate-100 overflow-hidden relative">
               <img src="/avatars/travis.jpg" alt="user" className="w-full h-full object-cover" />
               <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></span>
            </div>
            <div>
                <h2 className="font-bold text-slate-800 text-sm md:text-base leading-tight group-hover:text-indigo-600 transition-colors">Travis Barker</h2>
                {isTyping ? (
                    <p className="text-xs text-indigo-600 font-medium animate-pulse">typing...</p>
                ) : (
                    <p className="text-xs text-slate-500 font-medium">Active Project</p>
                )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1 md:gap-2 text-slate-400">
            <button title="Search Chat" className="p-2 hover:bg-slate-50 hover:text-indigo-600 rounded-lg hidden sm:block transition-colors"><Search className="w-5 h-5" /></button>
            <button title="Voice Call" className="p-2 hover:bg-slate-50 hover:text-indigo-600 rounded-lg hidden sm:block transition-colors"><Phone className="w-5 h-5" /></button>
            <button title="Video Call" className="p-2 hover:bg-slate-50 hover:text-indigo-600 rounded-lg hidden sm:block transition-colors"><Video className="w-5 h-5" /></button>
            
            <div className="h-6 w-px bg-slate-200 mx-2 hidden sm:block"></div>

            <button 
                onClick={onToggleInfo}
                className={cn(
                    "p-2 rounded-lg transition-all duration-200",
                    isSidebarOpen ? "bg-indigo-50 text-indigo-600" : "text-slate-500 hover:bg-slate-100"
                )}
                title={isSidebarOpen ? "Close Details" : "Open Details"}
            >
                {isSidebarOpen ? <PanelRightClose className="w-5 h-5" /> : <PanelRightOpen className="w-5 h-5" />}
            </button>
        </div>
      </div>

      {/* ---------------- MESSAGES AREA ---------------- */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 scroll-smooth"
      >
        <div className="max-w-4xl mx-auto flex flex-col gap-4">
            {/* Date Divider */}
            <div className="flex justify-center my-4">
                <span className="bg-slate-200/60 text-slate-500 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wide">Today</span>
            </div>

            {messages.map((msg) => (
            <div
                key={msg.id}
                className={cn(
                "flex w-full animate-in slide-in-from-bottom-2 duration-300",
                msg.sender === "user" ? "justify-end" : "justify-start"
                )}
            >
                <div className={cn(
                    "max-w-[85%] sm:max-w-[70%] rounded-2xl px-5 py-3 text-sm shadow-sm leading-relaxed relative group",
                    // User: Indigo Solid | Contact: White Card
                    msg.sender === "user" 
                        ? "bg-indigo-600 text-white rounded-br-sm" 
                        : "bg-white text-slate-700 border border-slate-200 rounded-bl-sm"
                )}>
                    {msg.type === "text" && <p className="whitespace-pre-wrap">{msg.content}</p>}
                    {msg.type === "link" && <a href={msg.linkUrl} target="_blank" rel="noopener noreferrer" className={cn("underline break-all font-medium", msg.sender === 'user' ? "text-indigo-100" : "text-indigo-600")}>{msg.linkUrl}</a>}
                    
                    <div className={cn(
                        "text-[10px] flex items-center justify-end gap-1 mt-1 opacity-70",
                        msg.sender === "user" ? "text-indigo-100" : "text-slate-400"
                    )}>
                        {msg.time}
                        {msg.sender === "user" && <CheckCheck className="w-3 h-3" />}
                    </div>
                </div>
            </div>
            ))}

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

      {/* ---------------- INPUT AREA ---------------- */}
      <div className="bg-white px-4 py-4 border-t border-slate-200 z-10">
         <div className="max-w-4xl mx-auto flex items-end gap-2">
             {/* Attachments Menu */}
             <div className="flex gap-1">
                <button title="Add File" className="text-slate-400 hover:text-indigo-600 p-2.5 rounded-full hover:bg-slate-50 transition-colors hidden sm:block">
                    <Paperclip className="w-5 h-5" />
                </button>
                <button title="Add Image" className="text-slate-400 hover:text-indigo-600 p-2.5 rounded-full hover:bg-slate-50 transition-colors hidden sm:block">
                    <ImageIcon className="w-5 h-5" />
                </button>
             </div>
             
             {/* Text Input */}
             <div className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl flex items-center px-4 focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-500 transition-all">
                <input 
                    className="flex-1 py-3 bg-transparent border-none focus:outline-none placeholder-slate-400 text-sm text-slate-700"
                    placeholder="Type your message..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    autoFocus
                />
                <button title="Add Emoji" className="text-slate-400 hover:text-amber-500 p-2 transition-colors">
                    <Smile className="w-5 h-5" />
                </button>
             </div>
             
             {/* Dynamic Action Button */}
             {inputValue.trim() ? (
                 <button 
                    onClick={handleSendMessage}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-full shadow-lg shadow-indigo-200 transition-all transform hover:scale-105 active:scale-95 flex-shrink-0"
                 >
                    <SendHorizonal className="w-5 h-5" />
                 </button>
             ) : (
                <button 
                    title="Voice Message"
                    className="text-slate-400 hover:text-indigo-600 p-3 rounded-full hover:bg-slate-50 transition-colors flex-shrink-0"
                >
                    <Mic className="w-5 h-5" />
                </button>
             )}
         </div>
      </div>
    </div>
  );
}