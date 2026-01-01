"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Send, Check } from "lucide-react";

export default function ContactSalesPage() {
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <Check className="text-green-600" size={32} />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Request Received</h1>
            <p className="text-slate-500 text-center max-w-md">
                Thanks for your interest in the Business Plan. Our Enterprise team will contact you within 24 hours.
            </p>
            <Link href="/client-dashboard" className="mt-8 text-indigo-600 font-semibold hover:underline">
                Return to Dashboard
            </Link>
        </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 pb-24">
      <div className="bg-white max-w-2xl w-full rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
        
        {/* Header */}
        <div className="bg-slate-900 p-8 text-center relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-600/20 to-purple-600/20"></div>
           <Link href="/subscription" className="absolute top-6 left-6 text-white/60 hover:text-white transition">
             <ArrowLeft size={24} />
           </Link>
           <h1 className="text-3xl font-bold text-white relative z-10">Talk to Sales</h1>
           <p className="text-slate-300 mt-2 relative z-10">We'll help you find the right custom solution for your agency.</p>
        </div>

        {/* Form */}
        <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">First Name</label>
                        <input required type="text" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Last Name</label>
                        <input required type="text" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition" />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Work Email</label>
                    <input required type="email" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition" />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Company Size</label>
                    <select className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition bg-white">
                        <option>1-10 employees</option>
                        <option>11-50 employees</option>
                        <option>50-200 employees</option>
                        <option>200+ employees</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">How can we help?</label>
                    <textarea rows={4} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"></textarea>
                </div>

                <button type="submit" className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl transition flex items-center justify-center gap-2">
                    <Send size={18} />
                    Submit Request
                </button>
            </form>
        </div>

      </div>
    </div>
  );
}