"use client";

import {
  IndianRupee,
  TrendingUp,
  Clock,
  CheckCircle,
  Send,
  MoreVertical,
  Paperclip,
  FileText,
  User,
  Eye,
  Star,
  CreditCard,
  Briefcase,
  Calendar
} from "lucide-react";
import { useState } from "react";

export default function ClientDashboardPage() {
  const [message, setMessage] = useState("");

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 bg-slate-50 min-h-screen font-sans text-slate-900">
      
      {/* Welcome Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-2xl font-bold text-slate-800">Welcome back!</h3>
          <p className="text-slate-500 mt-1">Here's what's happening with your projects today.</p>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard 
            title="Active Projects" 
            value="3" 
            trend="+1 this week"
            trendUp={true}
            icon={TrendingUp} 
            color="indigo" 
        />
        <StatCard 
            title="Pending Proposals" 
            value="2" 
            trend="Action needed"
            trendUp={false} // Neutral
            icon={Clock} 
            color="orange"
        />
        <StatCard 
            title="Total Spent" 
            value="₹1.45L" 
            trend="+12% vs last mo"
            trendUp={true}
            icon={IndianRupee} 
            color="emerald"
        />
        <StatCard 
            title="Outstanding" 
            value="₹25k" 
            trend="Due in 3 days"
            trendUp={false} // Warning
            warning
            icon={CheckCircle} 
            color="rose"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
        
        {/* LEFT COLUMN (Wider) - Contains Projects, Proposals, Payments */}
        <div className="xl:col-span-2 space-y-8">
            
            {/* 1. My Projects Section */}
            <section>
                <SectionHeader title="My Projects" />
                <div className="mt-4 space-y-4">
                    <ProjectCard
                        title="E-commerce Spiritual Store"
                        freelancer="Priya Singh"
                        date="12 Nov 2025"
                        status="In Progress"
                        actionType="View"
                    />
                    <ProjectCard
                        title="Mobile App UI Redesign"
                        freelancer="Rohan Patel"
                        date="20 Nov 2025"
                        status="Completed"
                        actionType="Rate"
                    />
                </div>
            </section>

            {/* 2. Proposals Received Section */}
            <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100">
                    <h3 className="text-lg font-bold text-slate-800">Proposals Received</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 text-slate-500 font-medium">
                            <tr>
                                <th className="px-6 py-4">Freelancer</th>
                                <th className="px-6 py-4">Project</th>
                                <th className="px-6 py-4">Budget</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            <ProposalRow 
                                name="Priya Singh"
                                project="UI Overhaul"
                                budget="₹30,000"
                                date="03 Nov"
                                status="Pending"
                            />
                            <ProposalRow 
                                name="Rohan Patel"
                                project="API Integration"
                                budget="₹18,000"
                                date="01 Nov"
                                status="Accepted"
                            />
                        </tbody>
                    </table>
                </div>
            </section>

            {/* 3. Payments & Milestones Section */}
            <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100">
                    <h3 className="text-lg font-bold text-slate-800">Payments & Milestones</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 text-slate-500 font-medium">
                            <tr>
                                <th className="px-6 py-4">Project</th>
                                <th className="px-6 py-4">Milestone</th>
                                <th className="px-6 py-4">Amount</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            <PaymentRow 
                                project="E-commerce Store"
                                milestone="Design Sign-off"
                                amount="₹30,000"
                                status="Pending"
                            />
                        </tbody>
                    </table>
                </div>
            </section>

        </div>

        {/* RIGHT COLUMN (Narrower) - Messages */}
        <div className="xl:col-span-1 flex flex-col h-full sticky top-8">
            <SectionHeader title="Messages" />
            
            <div className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden mt-4 min-h-[600px]">
                {/* Chat Header */}
                <div className="p-4 border-b bg-white flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Priya" className="w-10 h-10 rounded-full bg-indigo-50 border border-slate-100" />
                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                        </div>
                        <div>
                            <p className="font-bold text-sm text-slate-800">Priya Singh</p>
                            <p className="text-xs text-slate-500">E-commerce Project</p>
                        </div>
                    </div>
                    <button className="text-slate-400 hover:text-indigo-600 p-2 hover:bg-slate-50 rounded-full transition">
                        <MoreVertical size={18} />
                    </button>
                </div>

                {/* Chat Messages */}
                <div className="flex-1 p-4 overflow-y-auto space-y-6 bg-slate-50/50 custom-scrollbar">
                    <Bubble text="Hi! Just updated the homepage layout based on your feedback." time="10:30 AM" />
                    <Bubble text="That was quick! Can we adjust the hero section slightly?" me time="10:32 AM" />
                    <Bubble text="Sure, making those tweaks now. Will share a revision shortly." time="10:35 AM" />
                    <div className="text-center my-4">
                        <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 bg-slate-100 px-3 py-1 rounded-full">Today</span>
                    </div>
                    <Bubble text="Here is the updated design file." file="Homepage_v2.fig" time="2:15 PM" />
                </div>

                {/* Chat Input */}
                <div className="p-3 border-t bg-white flex gap-2 items-center">
                    <button className="p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 rounded-full transition-colors">
                        <Paperclip size={20} />
                    </button>
                    <input
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 bg-slate-100 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:bg-white transition-all placeholder:text-slate-400"
                    />
                    <button className="bg-indigo-600 text-white p-2.5 rounded-full hover:bg-indigo-700 shadow-md shadow-indigo-200 transition-all transform active:scale-95">
                        <Send size={18} />
                    </button>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
}

// --- Sub Components ---

function SectionHeader({ title }: { title: string }) {
    return (
        <h3 className="text-xl font-bold text-slate-800">{title}</h3>
    )
}

function StatCard({ title, value, trend, trendUp, warning, icon: Icon, color }: any) {
    const colorStyles: any = {
        indigo: "bg-indigo-50 text-indigo-600",
        orange: "bg-orange-50 text-orange-600",
        emerald: "bg-emerald-50 text-emerald-600",
        rose: "bg-rose-50 text-rose-600",
    };

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-xl ${colorStyles[color]} ring-1 ring-inset ring-black/5`}>
            <Icon size={22} />
        </div>
        {warning && <span className="w-2 h-2 bg-rose-500 rounded-full animate-pulse"></span>}
      </div>
      <div>
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <h4 className="text-2xl font-bold text-slate-800 mt-1">{value}</h4>
        
        <div className="flex items-center gap-1 mt-2">
            <span className={`text-xs font-medium ${trendUp === true ? 'text-emerald-600' : trendUp === false && warning !== true ? 'text-rose-500' : 'text-slate-400'}`}>
                {trend}
            </span>
        </div>
      </div>
    </div>
  );
}

// 1. Updated Project Card (Matches "My Projects" image)
function ProjectCard({ title, freelancer, date, status, actionType }: any) {
    const isCompleted = status === "Completed";
    
    return (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-indigo-200 transition-colors">
            <div>
                <h4 className="font-bold text-slate-800 text-lg">{title}</h4>
                <div className="text-sm text-slate-500 mt-1 flex flex-wrap gap-x-2">
                    <span>Freelancer: <span className="text-slate-700 font-medium">{freelancer}</span></span>
                    <span className="text-slate-300">•</span>
                    <span>Due: {date}</span>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    isCompleted ? "bg-emerald-100 text-emerald-700" : "bg-blue-50 text-blue-700"
                }`}>
                    {status}
                </span>

                {actionType === "View" && (
                    <button className="px-4 py-1.5 text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors">
                        View
                    </button>
                )}
                {actionType === "Rate" && (
                    <button className="px-4 py-1.5 text-sm font-medium text-purple-600 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
                        Rate
                    </button>
                )}
            </div>
        </div>
    )
}

// 2. Proposal Row Component (Matches "Proposals Received" image)
function ProposalRow({ name, project, budget, date, status }: any) {
    const isAccepted = status === "Accepted";
    
    return (
        <tr className="hover:bg-slate-50/80 transition-colors">
            <td className="px-6 py-4 font-medium text-slate-700">{name}</td>
            <td className="px-6 py-4 text-slate-600">{project}</td>
            <td className="px-6 py-4 font-semibold text-slate-800">{budget}</td>
            <td className="px-6 py-4 text-slate-500">{date}</td>
            <td className="px-6 py-4">
                <span className={`text-xs font-medium px-2 py-1 rounded-md ${
                    isAccepted ? "text-emerald-700 bg-emerald-50" : "text-slate-600 bg-slate-100"
                }`}>
                    {status}
                </span>
            </td>
            <td className="px-6 py-4 text-right">
                <button className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-colors ${
                    isAccepted 
                    ? "border-purple-200 text-purple-600 hover:bg-purple-50" 
                    : "border-indigo-200 text-indigo-600 hover:bg-indigo-50"
                }`}>
                    {isAccepted ? "Details" : "View"}
                </button>
            </td>
        </tr>
    )
}

// 3. Payment Row Component (Matches "Payments & Milestones" image)
function PaymentRow({ project, milestone, amount, status }: any) {
    return (
        <tr>
            <td className="px-6 py-4 font-medium text-slate-700">{project}</td>
            <td className="px-6 py-4 text-slate-600">{milestone}</td>
            <td className="px-6 py-4 font-semibold text-slate-800">{amount}</td>
            <td className="px-6 py-4 text-slate-500">{status}</td>
            <td className="px-6 py-4 text-right">
                <button className="bg-indigo-600 text-white text-xs font-medium px-4 py-2 rounded-lg hover:bg-indigo-700 shadow-sm shadow-indigo-200 transition-all">
                    Release
                </button>
            </td>
        </tr>
    )
}

function Bubble({ text, me, time, file }: any) {
  return (
    <div className={`flex flex-col ${me ? "items-end" : "items-start"}`}>
        <div
        className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm shadow-sm relative group ${
            me
            ? "bg-indigo-600 text-white rounded-br-sm"
            : "bg-white border border-slate-200 text-slate-700 rounded-bl-sm"
        }`}
        >
        {file && (
            <div className={`flex items-center gap-3 p-2.5 rounded-lg mb-2 ${me ? "bg-indigo-500/50" : "bg-slate-100"}`}>
                <div className="p-2 bg-white/20 rounded-md">
                    <FileText size={18} />
                </div>
                <div>
                    <span className="block text-xs font-bold">{file}</span>
                    <span className="block text-[10px] opacity-80">2.4 MB</span>
                </div>
            </div>
        )}
        <p className="leading-relaxed">{text}</p>
        </div>
        <span className="text-[10px] text-slate-400 mt-1.5 px-1 font-medium">{time}</span>
    </div>
  );
}