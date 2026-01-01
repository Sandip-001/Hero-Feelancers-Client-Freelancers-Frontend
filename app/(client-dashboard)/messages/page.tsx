"use client";

import {
  AlertTriangle,
  ArrowLeft, // Added for mobile back navigation
  Briefcase,
  CalendarCheck,
  CheckCircle,
  CheckCircle2,
  CheckSquare,
  ChevronDown,
  ChevronUp,
  Clock,
  Download,
  Eye,
  FileText,
  MessageCircle,
  MessageSquare,
  PanelRightOpen,
  Paperclip,
  Phone,
  Pin,
  Plus,
  Search,
  Send,
  Star,
  TrendingUp,
  User,
  Video,
  Wallet,
  X,
  Laugh
} from 'lucide-react';
import Link from 'next/link';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

// --- Typescript Data Structures ---
interface FileItem { name: string; size: string; }
interface Milestone { title: string; amount: string; due: string; status: 'Completed' | 'In Progress' | 'Pending'; escrow: 'released' | 'funded' | 'pending'; }
interface Message { from: 'client' | 'freelancer'; text: string; time: string; read?: boolean; }
interface FreelancerSnapshot { name: string; role: string; rating: number; bio: string; avatar: string; }

interface Conversation {
  id: number;
  name: string;
  avatar: string;
  roleType: 'MGR' | 'CLIENT';
  job: string;
  budget: string;
  status: 'Active' | 'In Progress' | 'Completed' | 'Paused';
  unread: number;
  isPinned?: boolean;
  isStarred?: boolean;
  isOnline?: boolean;
  isTyping?: boolean;
  lastMessageStatus?: 'sent' | 'read' | 'delivered';
  contract: string;
  progress: number;
  freelancer: FreelancerSnapshot;
  files: FileItem[];
  milestones: Milestone[];
  messages: Message[];
  time: string;
}

// --- Mock Data ---
const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: 1, name: 'John Doe', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John', roleType: 'MGR',
    job: 'Contract Review', budget: '₹1,50,000', status: 'Active', unread: 2, isPinned: true, isOnline: true, time: '16:45',
    contract: 'CTR-2024', progress: 45,
    freelancer: { name: 'John Doe', role: 'Project Manager', rating: 5.0, bio: 'Senior PM with 10 years experience.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John' },
    files: [{ name: 'UI_Mockup.pdf', size: '2.3MB' }, { name: 'Requirements.docx', size: '120KB' }],
    milestones: [
        { title: 'Design Mockups', amount: '₹40,000', due: '2025-11-10', status: 'Completed', escrow: 'released' },
        { title: 'Backend API Setup', amount: '₹60,000', due: '2025-11-20', status: 'In Progress', escrow: 'funded' },
    ],
    messages: [
      { from: 'client', text: 'The contract is ready.', time: '16:45' }
    ]
  },
  {
    id: 2, name: 'Travis Barker', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Travis', roleType: 'CLIENT',
    job: 'API Integration', budget: '$5,000', status: 'In Progress', unread: 0, isPinned: true, lastMessageStatus: 'read', time: '16:45',
    contract: 'FD-1002', progress: 40,
    freelancer: { name: 'Travis Barker', role: 'Backend Lead', rating: 4.8, bio: 'API Specialist', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Travis' },
    files: [{ name: 'API_Docs.pdf', size: '4.1MB' }], 
    milestones: [
        { title: 'Initial Setup', amount: '$1,000', due: '2025-10-15', status: 'Completed', escrow: 'released' }
    ],
    messages: [
      { from: 'freelancer', text: 'I will try the new API endpoint tomorrow.', time: '16:45' }
    ]
  },
  {
    id: 3, name: 'Kate Moss', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kate', roleType: 'MGR',
    job: 'Design Sync', budget: '-', status: 'Active', unread: 0, isStarred: true, isTyping: true, isOnline: true, time: '16:45',
    contract: 'DS-202', progress: 0,
    freelancer: { name: 'Kate Moss', role: 'Design Lead', rating: 5.0, bio: 'UX/UI', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kate' },
    files: [], milestones: [],
    messages: [
      { from: 'client', text: 'typing...', time: '16:45' }
    ]
  },
  {
    id: 4, name: 'Robert Parker', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Robert', roleType: 'CLIENT',
    job: 'Flutter App', budget: '₹2,00,000', status: 'In Progress', unread: 1, lastMessageStatus: 'read', time: 'Yesterday',
    contract: 'FD-1005', progress: 75,
    freelancer: { name: 'Robert Parker', role: 'Product Owner', rating: 4.9, bio: 'Tech Entrepreneur', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Robert' },
    files: [{ name: 'Specs.pdf', size: '2MB'}], 
    milestones: [
        { title: 'Phase 1', amount: '₹50k', due: '2025-10-10', status: 'Completed', escrow: 'released' }
    ],
    messages: [
      { from: 'freelancer', text: 'Awesome!!', time: 'Yesterday' }
    ]
  },
  {
    id: 5, name: 'User 6', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=User6', roleType: 'CLIENT',
    job: 'Consultation', budget: 'Hourly', status: 'Active', unread: 0, isOnline: true, lastMessageStatus: 'read', time: '14:00',
    contract: 'HR-500', progress: 0,
    freelancer: { name: 'User 6', role: 'Client', rating: 0, bio: 'New Client', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=User6' },
    files: [], milestones: [],
    messages: [
      { from: 'client', text: 'Can we schedule a call?', time: '14:00' }
    ]
  }
];

type FilterType = 'All' | 'Unread' | 'Starred' | 'Clients' | 'Managers';

// --- Logic Hook ---
const useClientDashboard = () => {
  const [conversations, setConversations] = useState<Conversation[]>(MOCK_CONVERSATIONS);
  const [activeConversationId, setActiveConversationId] = useState<number | null>(null);
  const [filter, setFilter] = useState<FilterType>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [messageInput, setMessageInput] = useState('');

  const activeConversation = useMemo(() => conversations.find(c => c.id === activeConversationId) || null, [conversations, activeConversationId]);

  const filteredConversations = useMemo(() => {
    return conversations.filter(c => {
      // Search Filter
      if (searchQuery && !c.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      
      // Tab Filters
      if (filter === 'Unread' && c.unread === 0) return false;
      if (filter === 'Starred' && !c.isStarred) return false;
      if (filter === 'Clients' && c.roleType !== 'CLIENT') return false;
      if (filter === 'Managers' && c.roleType !== 'MGR') return false;
      
      return true;
    });
  }, [conversations, filter, searchQuery]);

  const sendMessage = useCallback(() => {
    if (!messageInput.trim() || !activeConversationId) return;
    const newMessage: Message = { from: 'client', text: messageInput.trim(), time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setConversations(prev => prev.map(c => c.id === activeConversationId ? { ...c, messages: [...c.messages, newMessage] } : c));
    setMessageInput('');
  }, [messageInput, activeConversationId]);
  return { conversations: filteredConversations, activeConversation, activeConversationId, setActiveConversationId, filter, setFilter, searchQuery, setSearchQuery, messageInput, setMessageInput, sendMessage };
};

// --- Reusable Accordion for Right Sidebar ---
const AccordionSection: React.FC<{
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
}> = ({ title, icon, children, isOpen, onToggle, className = "" }) => {
  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden ${className}`}>
      <button 
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
      >
        <h4 className="font-bold text-xs text-slate-900 flex items-center gap-2">
          {icon} {title}
        </h4>
        {isOpen ? <ChevronUp className="w-3.5 h-3.5 text-slate-400" /> : <ChevronDown className="w-3.5 h-3.5 text-slate-400" />}
      </button>
      {isOpen && <div className="p-4 pt-0">{children}</div>}
    </div>
  );
};

// --- Helper Renderers ---
const renderMilestone = (m: Milestone, index: number) => {
  const statusColor = m.status === 'Completed' ? 'text-green-600' : m.status === 'In Progress' ? 'text-blue-600' : 'text-amber-600';
  const escrowTag = m.escrow === 'funded' ? 'bg-blue-100 text-blue-700' : m.escrow === 'released' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700';
  const CheckIcon = m.status === 'Completed' ? CheckCircle : m.status === 'In Progress' ? Clock : PanelRightOpen;

  return (
    <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 -mx-2 px-2 rounded-md transition group">
      <div>
        <div className="font-medium text-slate-700 flex items-center gap-2 text-sm">
          <CheckIcon className={`w-4 h-4 ${statusColor}`} /> 
          {m.title}
        </div>
        <div className="text-xs text-slate-500 ml-6 mt-0.5">Due: {m.due}</div>
      </div>
      <div className="text-right flex flex-col items-end">
        <div className="text-sm font-bold text-slate-800">{m.amount}</div>
        <span className={`text-[10px] px-2 py-0.5 mt-1 rounded-full font-medium ${escrowTag}`}>{m.escrow}</span>
      </div>
    </div>
  );
};

const renderFile = (f: FileItem, index: number) => (
  <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-xl bg-white hover:bg-gray-50 transition shadow-sm mb-2 last:mb-0">
    <div className="flex items-center gap-3 text-sm text-slate-700 min-w-0 flex-1">
      <div className="p-1.5 bg-blue-50 rounded-lg text-blue-600">
          <FileText className="w-4 h-4" />
      </div>
      <div className="truncate">
          <div className='font-medium truncate'>{f.name}</div>
          <div className='text-xs text-slate-400'>{f.size}</div>
      </div>
    </div>
    <button className="text-slate-400 hover:text-blue-600 p-2 hover:bg-blue-50 rounded-full transition"><Download className="w-4 h-4" /></button>
  </div>
);

// --- MAIN PAGE COMPONENT ---
export default function MessagesPage() {
  const { 
    conversations, 
    activeConversation, 
    activeConversationId, 
    setActiveConversationId,
    filter, 
    setFilter, 
    searchQuery, 
    setSearchQuery, 
    messageInput, 
    setMessageInput, 
    sendMessage,
  } = useClientDashboard();

  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Right Sidebar State
  const [showRightPanel, setShowRightPanel] = useState(false); 
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    activity: false, freelancer: false, contract: false, milestones: false, files: false, insights: false, manager: false
  });

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  useEffect(() => { 
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); 
  }, [activeConversationId]); 

  // --- HEIGHT FIX: Use calc to subtract header/padding from 100vh to stop whole page scrolling ---
  // Adjusted to 9rem to account for top nav and margins
  return (
    <div className="flex bg-white overflow-hidden relative shadow-sm border border-slate-200 rounded-2xl h-[calc(100vh-9rem)]">
      
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* --- COLUMN 1: MESSAGE LIST SIDEBAR --- */}
      {/* On Mobile: Hidden if chat is open. On Desktop: Always visible. */}
      <div className={`w-full md:w-[320px] lg:w-[380px] flex flex-col border-r border-gray-200 bg-white h-full shrink-0 ${activeConversation ? 'hidden md:flex' : 'flex'}`}>
        
        {/* Header */}
        <div className="p-5 pb-2">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Messages</h1>
          
          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search workstreams..." 
              className="w-full bg-slate-50 border border-slate-100 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Filter Pills */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
            {(['All', 'Unread', 'Starred', 'Clients', 'Managers'] as FilterType[]).map(f => (
              <button 
                key={f} 
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${
                  filter === f 
                  ? 'bg-slate-900 text-white shadow-md shadow-slate-900/10' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
        
        <div className="h-px bg-gray-100 mx-5 mb-2"></div>

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto scrollbar-hide px-3 pb-4 space-y-1">
          {conversations.map(c => (
            <div 
              key={c.id} 
              onClick={() => setActiveConversationId(c.id)}
              className={`group flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-all ${
                activeConversationId === c.id ? 'bg-indigo-50/60' : 'hover:bg-slate-50'
              }`}
            >
              <div className="relative shrink-0">
                <img src={c.avatar} alt={c.name} className="w-12 h-12 rounded-full object-cover bg-gray-200" />
                {c.isOnline && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                )}
              </div>

              <div className="flex-1 min-w-0 pt-0.5">
                <div className="flex justify-between items-start mb-0.5">
                  <div className="flex items-center gap-2">
                    <h3 className={`text-sm font-bold truncate ${c.unread > 0 ? 'text-slate-900' : 'text-slate-700'}`}>{c.name}</h3>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wide ${
                      c.roleType === 'MGR' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {c.roleType}
                    </span>
                  </div>
                  <span className="text-xs text-slate-400 whitespace-nowrap">{c.time}</span>
                </div>

                <div className="flex justify-between items-start">
                  <p className={`text-sm truncate pr-2 ${c.isTyping ? 'text-indigo-600 font-medium italic' : c.unread > 0 ? 'text-slate-900 font-medium' : 'text-slate-500'}`}>
                    {c.isTyping ? 'typing...' : 
                     (c.messages.length > 0 ? 
                        <>
                           {c.lastMessageStatus === 'read' && <CheckCircle2 size={12} className="inline mr-1 text-indigo-600" />}
                           {c.messages[c.messages.length-1].text}
                        </> 
                        : 'No messages yet')}
                  </p>
                  
                  <div className="flex items-center gap-1 shrink-0 pt-0.5">
                     {c.isPinned && <Pin size={14} className="text-slate-400 rotate-45 fill-slate-100" />}
                     {c.isStarred && <Star size={14} className="text-amber-400 fill-amber-400" />}
                     {c.unread > 0 && (
                       <span className="min-w-[18px] h-[18px] bg-indigo-600 text-white rounded-full flex items-center justify-center text-[10px] font-bold px-1 shadow-sm shadow-indigo-200">
                         {c.unread}
                       </span>
                     )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- COLUMN 2: CHAT AREA (Fixed Container) --- */}
      {/* On Mobile: Hidden if NO chat selected. On Desktop: Always visible (empty state or chat). */}
      <div className={`flex-1 flex flex-col bg-slate-50/30 relative h-full overflow-hidden ${!activeConversation ? 'hidden md:flex' : 'flex'}`}>
        
        {activeConversation ? (
          <>
            {/* Chat Header (Sticky) */}
            <div className="h-[73px] bg-white px-4 md:px-6 flex items-center justify-between border-b border-gray-200 shrink-0 sticky top-0 z-20">
              <div className="flex items-center gap-3">
                 {/* Mobile Back Button */}
                 <button className="md:hidden p-2 -ml-2 text-slate-500 hover:bg-slate-100 rounded-full" onClick={() => setActiveConversationId(null)}>
                    <ArrowLeft size={20} />
                 </button>
                 <div className="relative">
                   <img src={activeConversation.freelancer.avatar} alt="Active" className="w-10 h-10 rounded-full object-cover" />
                   {activeConversation.isOnline && <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>}
                 </div>
                 <div>
                   <div className="font-bold text-slate-900 text-sm leading-tight flex items-center gap-2">
                     {activeConversation.name}
                     <span className={`hidden sm:inline text-[10px] font-bold px-1.5 py-0.5 rounded uppercase ${activeConversation.roleType === 'MGR' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                        {activeConversation.roleType}
                     </span>
                   </div>
                   <div className="text-xs text-slate-500 mt-0.5 truncate max-w-[120px] sm:max-w-none">{activeConversation.job}</div>
                 </div>
              </div>

              <div className="flex items-center gap-1 sm:gap-2">
                 <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors hidden sm:block"><Search size={20} /></button>
                 <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors hidden sm:block"><Video size={20} /></button>
                 <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors"><Phone size={20} /></button>
                 <div className="w-px h-6 bg-gray-200 mx-1 hidden sm:block"></div>
                 {/* Right Panel Toggle - ONLY toggles visual state */}
                 <button 
                   className={`p-2 rounded-full transition-colors ${showRightPanel ? 'text-indigo-600 bg-indigo-50' : 'text-slate-400 hover:bg-slate-100'}`} 
                   onClick={() => setShowRightPanel(!showRightPanel)}
                 >
                    <PanelRightOpen size={20} />
                 </button>
              </div>
            </div>

            {/* Chat Messages (Scrollable) */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
              <div className="flex justify-center">
                 <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-full">Today</span>
              </div>

              {activeConversation.messages.map((m, i) => {
                const isClient = m.from === 'client';
                return (
                  <div key={i} className={`flex ${isClient ? 'justify-end' : 'justify-start'} group`}>
                    <div className={`flex flex-col ${isClient ? 'items-end' : 'items-start'} max-w-[85%] sm:max-w-[65%]`}>
                       <div className={`p-3 sm:px-4 sm:py-3 rounded-2xl shadow-sm text-sm leading-relaxed ${
                          isClient 
                          ? 'bg-indigo-600 text-white rounded-tr-none' 
                          : 'bg-white text-slate-800 border border-gray-100 rounded-tl-none'
                        }`}>
                          {m.text}
                       </div>
                       <span className="text-[10px] text-slate-400 mt-1 px-1 opacity-0 group-hover:opacity-100 transition-opacity">{m.time}</span>
                    </div>
                  </div>
                )
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area (Fixed at bottom of flex-col) */}
            <div className="p-3 sm:p-4 bg-white border-t border-gray-200 shrink-0">
               <div className="flex items-end gap-2 bg-slate-50 border border-slate-200 rounded-2xl p-2 focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-500 transition-all shadow-sm">
                  <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-full transition-colors hidden sm:block"><Plus size={20} /></button>
                  <textarea 
                    className="flex-1 bg-transparent border-none focus:ring-0 resize-none max-h-32 min-h-[40px] py-2 text-sm text-slate-800 placeholder:text-slate-400"
                    placeholder="Type a message..."
                    rows={1}
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }}}
                  />
                  <div className="flex items-center gap-1 pb-1">
                     <button className="p-1.5 text-indigo-500 hover:bg-indigo-100 rounded-lg transition-colors" title="AI Suggest">
                       <Laugh size={18} />
                     </button>
                     <button className="p-1.5 text-slate-400 hover:bg-slate-200 rounded-lg transition-colors hidden sm:block">
                       <Paperclip size={18} />
                     </button>
                     <button onClick={sendMessage} className="p-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-200">
                       <Send size={18} />
                     </button>
                  </div>
               </div>
            </div>

            {/* --- RIGHT SIDEBAR (SLIDER OVERLAY) --- */}
            {/* Backdrop for Mobile */}
            {showRightPanel && (
              <div 
                className="absolute inset-0 bg-slate-900/20 z-20 md:hidden"
                onClick={() => setShowRightPanel(false)}
              ></div>
            )}

            <div 
              className={`absolute top-0 right-0 h-full w-full md:w-[320px] bg-white shadow-2xl border-l border-gray-200 z-30 transition-transform duration-300 ease-in-out transform flex flex-col ${
                showRightPanel ? 'translate-x-0' : 'translate-x-full'
              }`}
            >
               <div className="h-[73px] flex items-center justify-between px-5 border-b border-gray-200 shrink-0 bg-white">
                  <span className="font-bold text-slate-800">Project Details</span>
                  <button className="text-slate-400 hover:text-slate-600" onClick={() => setShowRightPanel(false)}><X size={20} /></button>
               </div>

               <div className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-hide bg-slate-50/50">

                  {/* 1. Project Status */}
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                      <div className="flex justify-between items-start mb-3 pb-2 border-b border-gray-100">
                        <div>
                          <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2 mb-2">
                             <FileText className="w-4 h-4 text-indigo-600" /> Project Status
                          </h4>
                          <h4 className="font-extrabold text-sm text-slate-900 tracking-tight truncate max-w-[150px]">{activeConversation.job}</h4>
                          <div className="text-[10px] text-slate-500 mt-1 flex items-center gap-1">
                            <Briefcase className="w-3 h-3" />
                            <span className="truncate max-w-[100px]">{activeConversation.freelancer.role}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-base font-extrabold text-green-600">{activeConversation.budget}</div>
                          <div className="text-[9px] text-slate-400 uppercase tracking-wide font-bold">Total Budget</div>
                        </div>
                      </div>
                      
                      <div className="mb-3">
                        <div className="flex justify-between text-[10px] font-bold text-slate-700 mb-1">
                          <span>Progress</span>
                          <span className="text-green-600">{activeConversation.progress}%</span>
                        </div>
                        <div className="bg-gray-100 h-1.5 rounded-full overflow-hidden">
                          <div className="h-1.5 bg-green-500 rounded-full" style={{ width: `${activeConversation.progress}%` }}></div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Link href="/proposal" className="flex-1">
                          <button className="w-full py-2 rounded-lg border border-gray-300 text-[10px] font-bold text-slate-700 hover:bg-gray-50 transition flex items-center justify-center gap-1">
                             <Eye className="w-3 h-3" /> View Job
                          </button>
                        </Link>
                        <button className="flex-1 py-2 rounded-lg bg-blue-600 text-white text-[10px] font-bold hover:bg-blue-700 transition shadow-sm flex items-center justify-center gap-1">
                           <Wallet className="w-3 h-3" /> Release Funds
                        </button>
                      </div>
                  </div>

                  {/* 2. Recent Activity */}
                  <AccordionSection title="Recent Activity" icon={<Clock className="w-3.5 h-3.5 text-slate-500" />} isOpen={openSections.activity} onToggle={() => toggleSection('activity')}>
                    <ul className="text-[10px] space-y-2 text-slate-600">
                      <li className="flex justify-between items-center"><span className="flex gap-2 items-center"><CheckSquare className="w-3 h-3 text-green-500" /> Proposal received</span><span className="font-medium">2d ago</span></li>
                      <li className="flex justify-between items-center"><span className="flex gap-2 items-center"><Briefcase className="w-3 h-3 text-blue-500" /> Contract started</span><span className="font-medium">1d ago</span></li>
                      <li className="flex justify-between items-center"><span className="flex gap-2 items-center"><Wallet className="w-3 h-3 text-amber-500" /> Funds released</span><span className="font-medium">5h ago</span></li>
                    </ul>
                  </AccordionSection>

                  {/* 3. Freelancer */}
                  <AccordionSection title="Freelancer" icon={<User className="w-3.5 h-3.5 text-amber-600" />} isOpen={openSections.freelancer} onToggle={() => toggleSection('freelancer')}>
                    <div className="flex items-center gap-3 mb-3">
                        <img src={activeConversation.freelancer.avatar} className="w-10 h-10 rounded-full object-cover ring-2 ring-amber-100" />
                        <div>
                            <div className="font-bold text-sm text-slate-900">{activeConversation.freelancer.name}</div>
                            <div className="text-[10px] text-slate-500">{activeConversation.freelancer.role}</div>
                            <div className="text-[10px] font-bold text-amber-500 flex items-center gap-1 mt-0.5">
                               <Star className="w-3 h-3 fill-amber-500" /> {activeConversation.freelancer.rating} Rating
                            </div>
                        </div>
                    </div>
                    <div className="bg-slate-50 p-2 rounded-lg mb-3">
                        <p className="text-[10px] text-slate-600 italic leading-relaxed">"{activeConversation.freelancer.bio}"</p>
                    </div>
                    <button className="w-full py-1.5 text-[10px] font-bold border border-gray-300 text-slate-700 rounded-lg hover:bg-gray-50 transition">View Full Profile</button>
                  </AccordionSection>

                  {/* 4. Contract Overview */}
                  <AccordionSection title="Contract Overview" icon={<FileText className="w-3.5 h-3.5 text-indigo-600" />} isOpen={openSections.contract} onToggle={() => toggleSection('contract')}>
                    <div className="text-[10px] text-slate-600 space-y-1.5 leading-relaxed">
                        <p><strong>ID:</strong> {activeConversation.contract}</p>
                        <p className="line-clamp-3">We are looking for a skilled React developer to build a responsive e-commerce website.</p>
                        <p className="pt-2 border-t border-gray-100 mt-2"><strong>Skills:</strong> React.js, Node.js, Stripe</p>
                    </div>
                  </AccordionSection>

                  {/* 5. Milestones */}
                  <AccordionSection title="Milestones" icon={<CalendarCheck className="w-3.5 h-3.5 text-green-600" />} isOpen={openSections.milestones} onToggle={() => toggleSection('milestones')}>
                    <div className="space-y-0.5">
                      {activeConversation.milestones.map(renderMilestone)}
                    </div>
                    <button className="w-full mt-3 py-1.5 bg-green-50 text-green-700 text-[10px] font-bold rounded-lg hover:bg-green-100 transition">
                      Fund Next Milestone
                    </button>
                  </AccordionSection>

                  {/* 6. Project Files */}
                  <AccordionSection title="Project Files" icon={<Paperclip className="w-3.5 h-3.5 text-blue-600" />} isOpen={openSections.files} onToggle={() => toggleSection('files')}>
                    {activeConversation.files.map(renderFile)}
                    <button className="w-full py-1.5 mt-2 text-[10px] border border-dashed border-gray-300 text-slate-500 font-medium rounded-lg hover:bg-gray-50 transition">
                      + Upload New File
                    </button>
                  </AccordionSection>

                  {/* 7. Smart Insights */}
                  <AccordionSection title="Smart Insights" icon={<TrendingUp className="w-3.5 h-3.5 text-blue-600" />} isOpen={openSections.insights} onToggle={() => toggleSection('insights')}>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2 p-2 rounded-lg bg-green-50 text-[10px]">
                        <CheckCircle className="w-3.5 h-3.5 mt-0.5 text-green-600 shrink-0" />
                        <div>
                            <span className="font-bold text-green-800 block">Highly Reliable</span>
                            <p className="text-slate-600">Past on-time delivery: 92%</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 p-2 rounded-lg bg-amber-50 text-[10px]">
                        <AlertTriangle className="w-3.5 h-3.5 mt-0.5 text-amber-600 shrink-0" />
                        <div>
                            <span className="font-bold text-amber-800 block">Review Needed</span>
                            <p className="text-slate-600">2 milestones pending.</p>
                        </div>
                      </div>
                    </div>
                  </AccordionSection>

                  {/* 8. Relationship Manager - Accordion (REDESIGNED CARD) */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                      <button 
                         onClick={() => toggleSection('manager')}
                         className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                      >
                         <h4 className="font-bold text-xs text-slate-900 flex items-center gap-2">
                            <User className="w-3.5 h-3.5 text-indigo-500" /> Relationship Manager
                         </h4>
                         {openSections.manager ? <ChevronUp className="w-3.5 h-3.5 text-slate-400" /> : <ChevronDown className="w-3.5 h-3.5 text-slate-400" />}
                      </button>
                      
                      {openSections.manager && (
                         <div className="pb-6">
                             {/* Fancy Card Design Inside Accordion */}
                             <div className="h-20 bg-indigo-500 w-full relative"></div>

                             <div className="px-4">
                                 <div className="relative -mt-10 mb-3 flex justify-center">
                                     <div className="relative">
                                         <img 
                                             src="https://i.pravatar.cc/150?img=11" 
                                             className="w-20 h-20 rounded-full border-4 border-white shadow-lg object-cover" 
                                             alt="Manager" 
                                         />
                                         <span className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></span>
                                     </div>
                                 </div>

                                 <div className="text-center mb-4">
                                     <h3 className="font-bold text-slate-800 text-lg">Rohan Malhotra</h3>
                                     <p className="text-indigo-500 font-semibold text-sm">Relationship Manager</p>
                                 </div>

                                 <div className="bg-slate-50 border border-slate-100 rounded-lg py-2.5 mb-5 flex items-center justify-center text-slate-500 text-sm font-medium gap-2">
                                     <Phone className="w-3.5 h-3.5" /> 
                                     +1 (555) 000-0000
                                 </div>

                                 <div className="grid grid-cols-3 gap-2">
                                     <button onClick={() => console.log('Chat')} className="flex flex-col items-center justify-center py-3 px-1 bg-indigo-500 text-white rounded-xl hover:bg-indigo-600 transition-colors gap-1.5 shadow-sm">
                                         <MessageSquare className="w-5 h-5" />
                                         <span className="text-[10px] font-medium">Chat</span>
                                     </button>

                                     <a href="https://wa.me/15550000000" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center py-3 px-1 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-colors gap-1.5 shadow-sm">
                                         <MessageCircle className="w-5 h-5" />
                                         <span className="text-[10px] font-medium">WhatsApp</span>
                                     </a>

                                     <a href="tel:+15550000000" className="flex flex-col items-center justify-center py-3 px-1 bg-white border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors gap-1.5 shadow-sm">
                                         <Phone className="w-5 h-5" />
                                         <span className="text-[10px] font-medium">Call</span>
                                     </a>
                                 </div>
                             </div>
                         </div>
                      )}
                  </div>

               </div>
            </div>

          </>
        ) : (
          // --- EMPTY STATE ---
          <div className="flex-1 flex flex-col items-center justify-center bg-slate-50/50">
             <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100/60 mb-6">
                <div className="w-20 h-20 bg-gradient-to-tr from-indigo-50 to-purple-50 rounded-2xl flex items-center justify-center text-indigo-300 transform rotate-3">
                   <MessageSquare size={40} className="transform -rotate-3 fill-current" />
                </div>
             </div>
             <h2 className="text-xl font-bold text-slate-800 mb-2">Select a Workstream</h2>
             <p className="text-slate-500 text-sm">Choose a conversation to view details.</p>
          </div>
        )}
      </div>

    </div>
  );
}