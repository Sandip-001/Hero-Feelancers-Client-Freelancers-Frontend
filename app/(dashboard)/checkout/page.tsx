"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, Lock, CreditCard, CheckCircle, Loader2 } from "lucide-react";

// 1. Move the main logic into a separate component
function CheckoutContent() {
  const searchParams = useSearchParams();
  const plan = searchParams.get('plan') || 'pro';
  const billing = searchParams.get('billing') || 'monthly';
  
  // Dynamic Pricing based on URL params
  const price = billing === 'monthly' ? 49 : 39;
  const period = billing === 'monthly' ? 'month' : 'month (billed yearly)';
  const total = billing === 'monthly' ? 49 : 468; // 39 * 12

  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      alert("Payment Successful! Welcome to Pro.");
      setIsProcessing(false);
      // In a real app, redirect to dashboard here
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row pb-24 md:pb-0">
      
      {/* Left Column: Order Summary (Visible first on Mobile) */}
      <div className="w-full md:w-1/2 bg-slate-900 text-white p-8 md:p-12 flex flex-col justify-between">
        <div>
          <Link href="/subscription" className="inline-flex items-center text-slate-400 hover:text-white transition gap-2 text-sm mb-8">
            <ArrowLeft size={16} /> Back to Plans
          </Link>
          <div className="mt-4">
             <h2 className="text-slate-400 text-sm uppercase tracking-wider font-semibold">Subscribe to</h2>
             <h1 className="text-3xl md:text-4xl font-bold mt-2">HeroFreelancer {plan === 'pro' ? 'Pro' : 'Business'}</h1>
             <div className="mt-6 flex items-baseline gap-2">
               <span className="text-5xl font-bold">${price}</span>
               <span className="text-slate-400">/ per {period}</span>
             </div>
          </div>

          <div className="mt-12 space-y-4">
            <div className="flex items-center gap-3 text-slate-300">
               <CheckCircle className="text-indigo-400" size={20} />
               <span>Unlimited Active Projects</span>
            </div>
            <div className="flex items-center gap-3 text-slate-300">
               <CheckCircle className="text-indigo-400" size={20} />
               <span>Dedicated Relationship Manager</span>
            </div>
            <div className="flex items-center gap-3 text-slate-300">
               <CheckCircle className="text-indigo-400" size={20} />
               <span>0% Processing Fees</span>
            </div>
          </div>
        </div>
        
        <div className="mt-12 text-sm text-slate-500">
          Powered by Stripe • Secure SSL Encryption
        </div>
      </div>

      {/* Right Column: Payment Form */}
      <div className="w-full md:w-1/2 bg-white p-8 md:p-12 overflow-y-auto">
        <h3 className="text-xl font-bold text-slate-900 mb-6">Payment Details</h3>
        
        <form onSubmit={handlePayment} className="space-y-6">
          
          {/* Cardholder Name */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Cardholder Name</label>
            <input 
              required
              type="text" 
              placeholder="John Doe"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
            />
          </div>

          {/* Card Number */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Card Information</label>
            <div className="relative">
              <input 
                required
                type="text" 
                placeholder="0000 0000 0000 0000"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 pl-12 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              />
              <CreditCard className="absolute left-4 top-3.5 text-gray-400" size={20} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             {/* Expiry */}
             <div>
               <label className="block text-sm font-medium text-slate-700 mb-2">Expiry Date</label>
               <input 
                 required
                 type="text" 
                 placeholder="MM / YY"
                 className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
               />
             </div>
             {/* CVC */}
             <div>
               <label className="block text-sm font-medium text-slate-700 mb-2">CVC / CWW</label>
               <div className="relative">
                 <input 
                   required
                   type="text" 
                   placeholder="123"
                   className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                 />
                 <Lock className="absolute right-4 top-3.5 text-gray-400" size={16} />
               </div>
             </div>
          </div>

          <div className="bg-indigo-50 p-4 rounded-lg flex items-start gap-3">
             <Lock className="text-indigo-600 mt-0.5" size={18} />
             <p className="text-xs text-indigo-800 leading-relaxed">
               Your subscription will start immediately. You can cancel anytime from your dashboard settings to avoid future charges.
             </p>
          </div>

          <button 
            type="submit"
            disabled={isProcessing}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-200 transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            {isProcessing ? 'Processing...' : `Pay $${total} Now`}
          </button>
        </form>
      </div>
    </div>
  );
}

// 2. Wrap the component in Suspense for the default export
export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="animate-spin text-indigo-600" size={32} />
          <p className="text-slate-500 font-medium">Loading checkout...</p>
        </div>
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}