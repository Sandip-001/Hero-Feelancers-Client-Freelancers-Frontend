"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ChevronDown, 
  ChevronRight, 
  X, 
  Download, 
  FileText, 
  Clock, 
  UserCheck, 
  Briefcase,
  ExternalLink,
  Calendar,
  Wallet,
  CheckCircle2,
  Phone,
  AlertCircle,
  MessageSquare,
  MessageCircle
} from "lucide-react";

const cn = (...classes: string[]) => classes.filter(Boolean).join(' ');

export default function WorkStreamRightBar({ onClose }: { onClose?: () => void }) {
    
    // Manage open/close state
    const [openState, setOpenState] = useState({
        details: true,
        team: true,
        doc: false,
        note: false,
        ms: true,
        act: false,
    });

    const toggleSection = (key: keyof typeof openState) => {
        setOpenState(prev => ({ ...prev, [key]: !prev[key] }));
    };

    // Helper Component for Accordion-style sections
    const SidebarSection = ({ title, icon, children, sectionKey }: { title: string, icon: any, children: React.ReactNode, sectionKey: keyof typeof openState }) => {
        const isOpen = openState[sectionKey];
        return (
            <div className="bg-white border border-slate-200 rounded-lg overflow-hidden mb-3 shadow-sm">
                <button 
                    onClick={() => toggleSection(sectionKey)}
                    className="w-full flex items-center justify-between p-3.5 hover:bg-slate-50 transition-colors bg-white"
                >
                    <div className="flex items-center gap-2.5 text-sm font-semibold text-slate-700">
                        {icon}
                        {title}
                    </div>
                    {isOpen ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronRight className="w-4 h-4 text-slate-400" />}
                </button>
                {isOpen && (
                    <div className="px-4 pb-4 pt-0 border-t border-slate-50">
                        <div className="mt-3 text-sm">
                            {children}
                        </div>
                    </div>
                )}
            </div>
        );
    };

    return (
        <aside className="w-full h-full flex flex-col bg-slate-50 border-l border-slate-200">
            
          {/* Header */}
          <div className="p-4 border-b border-slate-200 bg-white flex items-center justify-between sticky top-0 z-10 shrink-0 h-16">
            <h3 className="font-bold text-slate-800 text-lg">Workstream Details</h3>
            {onClose && (
                <button onClick={onClose} className="p-2 rounded-full text-slate-500 hover:bg-slate-100 transition-colors">
                    <X className="w-5 h-5" />
                </button>
            )}
          </div>
    
          <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
            
            {/* 1. PROJECT HERO CARD */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex items-start justify-between mb-2">
                    <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide border border-emerald-200">
                        Active
                    </span>
                    <span className="text-xs text-slate-400 font-mono">ID: #PROJ-8821</span>
                </div>
                
                <h2 className="text-lg font-bold text-slate-800 leading-tight mb-1">
                    E-Commerce Platform Revamp
                </h2>
                <p className="text-xs text-slate-500 mb-4">
                    Client: TechSolutions Inc.
                </p>

                {/* Main Action Button */}
                <Link href="/proposals">  
                <button className="w-full flex items-center justify-center gap-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 py-2.5 rounded-lg text-sm font-semibold transition-colors">
                    <ExternalLink className="w-4 h-4" />
                    View Original Proposal
                </button>
                </Link>
            </div>

            {/* 2. KEY STATS GRID */}
            <div className="grid grid-cols-2 gap-3">
                <div className="bg-white p-3 rounded-lg border border-slate-200">
                    <div className="flex items-center gap-2 text-slate-400 mb-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span className="text-[10px] font-medium uppercase">Deadline</span>
                    </div>
                    <p className="text-sm font-bold text-slate-700">Dec 20, 2025</p>
                    <p className="text-[10px] text-amber-600 font-medium">25 days left</p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-slate-200">
                     <div className="flex items-center gap-2 text-slate-400 mb-1">
                        <Wallet className="w-3.5 h-3.5" />
                        <span className="text-[10px] font-medium uppercase">Budget</span>
                    </div>
                    <p className="text-sm font-bold text-slate-700">₹ 85,000</p>
                    <p className="text-[10px] text-slate-500">Fixed Price</p>
                </div>
            </div>
    
            {/* 3. PROGRESS & MILESTONE HIGHLIGHT */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-4 rounded-xl text-white shadow-md">
                 <div className="flex justify-between items-center mb-3">
                    <span className="text-xs text-slate-300 font-medium">Completion Status</span>
                    <span className="text-sm font-bold text-white">65%</span>
                 </div>
                 
                 <div className="w-full h-2 bg-slate-600 rounded-full overflow-hidden mb-4">
                    <div className="h-full bg-emerald-500 w-[65%] rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                 </div>

                 <div className="pt-4 border-t border-slate-700">
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">Current Focus</p>
                    <div className="flex items-center justify-between">
                        <span className="font-semibold text-sm">Backend API Integration</span>
                        <Clock className="w-4 h-4 text-emerald-400" />
                    </div>
                 </div>
            </div>
    
            {/* 4. COLLAPSIBLE SECTIONS */}
            <div className="pt-2">
                
                {/* Team & Support (ENHANCED) */}
               <SidebarSection title="Team & Support" icon={<UserCheck className="w-4 h-4 text-indigo-500" />} sectionKey="team">
    <div className="space-y-4">

        {/* Relationship Manager Card - Redesigned */}
        <div className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm">
            
            {/* Blue Header Background */}
            <div className="h-20 bg-blue-500 w-full relative">
                {/* Optional: Add a close X icon here if needed, consistent with the image */}
            </div>

            {/* Content Body */}
            <div className="px-4 pb-4">
                
                {/* Profile Image with Negative Margin to Overlap Header */}
                <div className="relative -mt-10 mb-3 flex justify-center">
                    <div className="relative">
                        <img 
                            src="https://randomuser.me/api/portraits/women/44.jpg" 
                            className="w-20 h-20 rounded-full border-4 border-white shadow-md object-cover" 
                            alt="RM" 
                        />
                        {/* Online Status Dot */}
                        <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
                    </div>
                </div>

                {/* Name & Title */}
                <div className="text-center mb-4">
                    <h3 className="font-bold text-slate-800 text-lg leading-tight">Sophia Williams</h3>
                    <p className="text-blue-500 font-semibold text-sm">Senior Project Manager</p>
                </div>

                {/* Phone Number Display */}
                <div className="bg-slate-50 border border-slate-100 rounded-lg py-2.5 mb-5 flex items-center justify-center text-slate-500 text-sm font-medium gap-2">
                    <Phone className="w-3.5 h-3.5" /> 
                    +1 (555) 123-4567
                </div>

                {/* Action Buttons Grid */}
                <div className="grid grid-cols-3 gap-3">
                    
                    {/* Message Button */}
                   
                    <button 
                            className="flex flex-col items-center justify-center py-3 px-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors gap-1.5"
                    >
                         <Link href="/workstreams">
                        <MessageSquare className="w-5 h-5 ml-2" />
                        <span className="text-[10px] font-medium">Message</span>
                         </Link>
                    </button>
                   
                    

                    {/* WhatsApp Button */}
                    <a 
                        href="https://wa.me/15551234567" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex flex-col items-center justify-center py-3 px-1 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors gap-1.5 no-underline"
                    >
                        {/* Using MessageCircle as generic WhatsApp icon if dedicated icon isn't available */}
                        <MessageCircle className="w-5 h-5" />
                        <span className="text-[10px] font-medium">WhatsApp</span>
                    </a>

                    {/* Call Button */}
                    <a 
                        href="tel:+15551234567"
                        className="flex flex-col items-center justify-center py-3 px-1 bg-white border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors gap-1.5 no-underline"
                    >
                        <Phone className="w-5 h-5" />
                        <span className="text-[10px] font-medium">Call</span>
                    </a>

                </div>
            </div>
        </div>

    </div>
</SidebarSection>

                {/* Project Milestones */}
                <SidebarSection title="Milestones & Payments" icon={<Briefcase className="w-4 h-4 text-indigo-500"/>} sectionKey="ms">
                    <div className="space-y-3">
                         {/* Milestone Item 1 */}
                         <div className="flex items-start gap-3 pb-3 border-b border-slate-50 last:border-0 last:pb-0">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                            <div className="flex-1">
                                <div className="flex justify-between">
                                    <p className="text-sm font-medium text-slate-400 line-through decoration-slate-400 decoration-1">UI/UX Design</p>
                                    <span className="text-xs font-bold text-emerald-600">Paid</span>
                                </div>
                                <p className="text-xs text-slate-400">Released on Aug 12</p>
                            </div>
                         </div>

                         {/* Milestone Item 2 */}
                         <div className="flex items-start gap-3 pb-3 border-b border-slate-50 last:border-0 last:pb-0">
                            <div className="w-4 h-4 rounded-full border-2 border-indigo-500 mt-0.5 shrink-0 animate-pulse"></div>
                            <div className="flex-1">
                                <div className="flex justify-between">
                                    <p className="text-sm font-medium text-slate-800">Backend APIs</p>
                                    <span className="text-xs font-bold text-indigo-600">Active</span>
                                </div>
                                <div className="flex justify-between mt-1">
                                    <span className="text-xs text-slate-500">₹ 25,000</span>
                                    <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">In Escrow</span>
                                </div>
                            </div>
                         </div>

                         {/* Milestone Item 3 */}
                         <div className="flex items-start gap-3 pb-3 border-b border-slate-50 last:border-0 last:pb-0">
                            <div className="w-4 h-4 rounded-full border-2 border-slate-200 mt-0.5 shrink-0"></div>
                            <div className="flex-1">
                                <div className="flex justify-between">
                                    <p className="text-sm font-medium text-slate-400">QA & Deployment</p>
                                    <span className="text-xs font-bold text-slate-400">Pending</span>
                                </div>
                                <p className="text-xs text-slate-400 mt-1">₹ 15,000</p>
                            </div>
                         </div>
                    </div>
                </SidebarSection>

                {/* Project Documents */}
                <SidebarSection title="Documents" icon={<FileText className="w-4 h-4 text-indigo-500"/>} sectionKey="doc">
                    <div className="space-y-2">
                        {[
                            { name: "Project_Specs_v2.pdf", size: "2.4 MB", date: "Aug 10" },
                            { name: "Design_Assets.zip", size: "154 MB", date: "Aug 12" }
                        ].map((doc, i) => (
                            <div key={i} className="flex items-center justify-between p-2.5 rounded-lg border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/30 transition-all group cursor-pointer">
                                <div className="flex items-center gap-3 overflow-hidden">
                                    <div className="bg-white p-1.5 rounded border border-slate-100 shadow-sm text-rose-500">
                                        <FileText className="w-4 h-4" />
                                    </div>
                                    <div className="truncate">
                                        <p className="text-xs font-semibold text-slate-700 truncate max-w-[140px]">{doc.name}</p>
                                        <p className="text-[10px] text-slate-400">{doc.size} • {doc.date}</p>
                                    </div>
                                </div>
                                <button className="text-slate-400 hover:text-indigo-600 transition-colors">
                                    <Download className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                </SidebarSection>
    
                {/* Internal Notes */}
                <SidebarSection title="My Private Notes" icon={<FileText className="w-4 h-4 text-indigo-500"/>} sectionKey="note">
                    <textarea 
                        className="w-full bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-slate-700 focus:ring-2 focus:ring-amber-200 focus:border-amber-400 focus:outline-none min-h-[100px] placeholder-slate-400 resize-none"
                        placeholder="Jot down quick reminders..."
                        defaultValue="Need to double check the API rate limits before deployment."
                    ></textarea>
                    <div className="flex justify-end mt-2">
                        <button className="px-3 py-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-white rounded-md transition-colors shadow-sm">
                            Save Note
                        </button>
                    </div>
                </SidebarSection>

                 {/* Activity Timeline */}
                 <SidebarSection title="Recent Activity" icon={<Clock className="w-4 h-4 text-indigo-500"/>} sectionKey="act">
                    <ol className="border-l border-slate-200 pl-4 space-y-4 my-1">
                        <li className="relative">
                            <div className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-indigo-500 border-2 border-white"></div>
                            <p className="text-xs text-slate-500 mb-0.5">Today, 10:30 AM</p>
                            <p className="text-xs font-medium text-slate-800">Milestone 2 payment released</p>
                        </li>
                        <li className="relative">
                            <div className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-slate-300 border-2 border-white"></div>
                            <p className="text-xs text-slate-500 mb-0.5">Aug 10, 4:00 PM</p>
                            <p className="text-xs font-medium text-slate-700">Contract signed by both parties</p>
                        </li>
                    </ol>
                </SidebarSection>
            </div>
          </div>
        </aside>
      );
}