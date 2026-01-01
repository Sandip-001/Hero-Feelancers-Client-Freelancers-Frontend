"use client";

import React from "react";
import { 
  Mail, 
  Calendar, 
  Phone, 
  ShieldCheck, 
  Search, 
  Briefcase, 
  Clock,
  CheckCircle2,
  ArrowRight
} from "lucide-react";

// Mock Data for the Manager (In a real app, fetch this via API)
const managerProfile = {
  name: "Sarah Jenkins",
  role: "Senior Success Manager",
  email: "sarah.j@herofreelancer.com",
  phone: "+1 (555) 012-3456",
  availability: "Mon-Fri, 9AM - 5PM EST",
  bio: "I'm here to help you find the top 1% of talent, manage your project roadmap, and ensure your experience is seamless.",
  image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&h=200&auto=format&fit=crop",
  stats: {
    projectsManaged: 124,
    talentMatched: 450,
    rating: 4.9
  }
};

export default function RelationshipManagerPage() {
  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Relationship Manager</h1>
        <p className="text-slate-500 mt-2">
          Your dedicated partner for hiring strategy and project success.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: Manager Profile Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            
            <div className="px-6 pb-6 text-center mt-8">
              <img 
                src={managerProfile.image} 
                alt={managerProfile.name} 
                className="w-24 h-24 rounded-full border-4 border-white shadow-md mx-auto object-cover"
              />
              
              <div className="mt-4">
                <h2 className="text-xl font-bold text-slate-900 flex items-center justify-center gap-2">
                  {managerProfile.name}
                  <ShieldCheck className="text-indigo-500" size={20} />
                </h2>
                <p className="text-sm font-medium text-indigo-600">{managerProfile.role}</p>
              </div>

              <p className="mt-4 text-sm text-slate-600 leading-relaxed">
                {managerProfile.bio}
              </p>

              <div className="mt-6 flex flex-col gap-3">
                <button className="flex items-center justify-center gap-2 w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition shadow-sm shadow-indigo-200">
                  <Calendar size={18} />
                  Book Strategy Call
                </button>
                <button className="flex items-center justify-center gap-2 w-full py-2.5 bg-white border border-gray-300 hover:bg-gray-50 text-slate-700 rounded-xl font-semibold transition">
                  <Mail size={18} />
                  Send Message
                </button>
              </div>

              {/* Availability Status */}
              <div className="mt-6 pt-6 border-t border-gray-100 flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-1.5">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                  </span>
                  Online Now
                </div>
                <span>{managerProfile.availability}</span>
              </div>
            </div>
          </div>

          {/* Contact Info Box */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 className="font-bold text-slate-900 mb-4">Direct Contact</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <div className="p-2 bg-slate-100 rounded-lg text-slate-500">
                  <Mail size={16} />
                </div>
                <span className="font-medium hover:text-indigo-600 cursor-pointer">{managerProfile.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <div className="p-2 bg-slate-100 rounded-lg text-slate-500">
                  <Phone size={16} />
                </div>
                <span className="font-medium">{managerProfile.phone}</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Services & Activity */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* How I can help section */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">How Sarah can help you</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Service 1 */}
              <div className="p-4 rounded-xl border border-gray-100 hover:border-indigo-100 hover:bg-indigo-50/50 transition cursor-pointer group">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-blue-100 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition">
                    <Search size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Talent Scouting</h4>
                    <p className="text-xs text-slate-500 mt-1">I'll handpick candidates that match your technical requirements.</p>
                  </div>
                </div>
              </div>

              {/* Service 2 */}
              <div className="p-4 rounded-xl border border-gray-100 hover:border-indigo-100 hover:bg-indigo-50/50 transition cursor-pointer group">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-purple-100 text-purple-600 rounded-lg group-hover:bg-purple-600 group-hover:text-white transition">
                    <Briefcase size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Project Roadmap</h4>
                    <p className="text-xs text-slate-500 mt-1">Strategic planning to ensure your project milestones are realistic.</p>
                  </div>
                </div>
              </div>

              {/* Service 3 */}
              <div className="p-4 rounded-xl border border-gray-100 hover:border-indigo-100 hover:bg-indigo-50/50 transition cursor-pointer group">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-orange-100 text-orange-600 rounded-lg group-hover:bg-orange-600 group-hover:text-white transition">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Dispute Resolution</h4>
                    <p className="text-xs text-slate-500 mt-1">Neutral mediation if issues arise with freelancers.</p>
                  </div>
                </div>
              </div>

              {/* Service 4 */}
              <div className="p-4 rounded-xl border border-gray-100 hover:border-indigo-100 hover:bg-indigo-50/50 transition cursor-pointer group">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-teal-100 text-teal-600 rounded-lg group-hover:bg-teal-600 group-hover:text-white transition">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Time & Budget</h4>
                    <p className="text-xs text-slate-500 mt-1">Analysis of freelancer logs and budget optimization.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Request History / Active Tasks */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-900">Recent Requests</h3>
              <button className="text-sm text-indigo-600 font-semibold hover:underline">View All</button>
            </div>
            
            <div className="space-y-0 divide-y divide-gray-100">
              {[1, 2].map((item) => (
                <div key={item} className="py-4 flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                      <Search size={18} />
                    </div>
                    <div>
                      <h5 className="text-sm font-semibold text-slate-900">Find React Native Dev</h5>
                      <p className="text-xs text-slate-500">Request ID: #8823 • Sent 2 days ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
                      In Progress
                    </span>
                    <ArrowRight size={16} className="text-slate-300 group-hover:text-indigo-600 transition" />
                  </div>
                </div>
              ))}
              
              <div className="py-4 flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                      <Briefcase size={18} />
                    </div>
                    <div>
                      <h5 className="text-sm font-semibold text-slate-900">Q3 Hiring Strategy</h5>
                      <p className="text-xs text-slate-500">Request ID: #8701 • Sent 1 week ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                      Completed
                    </span>
                    <ArrowRight size={16} className="text-slate-300 group-hover:text-indigo-600 transition" />
                  </div>
                </div>
            </div>

            {/* CTA for new request */}
            <button className="mt-4 w-full py-3 border border-dashed border-gray-300 rounded-xl text-slate-500 font-medium hover:border-indigo-400 hover:text-indigo-600 hover:bg-indigo-50 transition flex items-center justify-center gap-2">
               + Create New Request
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}