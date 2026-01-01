"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Check, 
  X, 
  HelpCircle, 
  Sparkles, 
  Zap, 
  ShieldCheck,
  Building2,
  Crown
} from "lucide-react";

export default function SubscriptionPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      id: "starter",
      name: "Starter",
      price: 0,
      description: "Perfect for posting your first project.",
      features: [
        "Up to 3 active projects",
        "Basic proposal viewing",
        "Standard payment processing",
        "Email support",
      ],
      cta: "Current Plan",
      href: "#",
      highlight: false,
    },
    {
      id: "pro",
      name: "Pro",
      price: billingCycle === 'monthly' ? 49 : 39,
      description: "For serious clients scaling their workforce.",
      features: [
        "Unlimited active projects",
        "Dedicated Relationship Manager",
        "0% Payment Processing Fees",
        "Verified Talent Badge",
        "Priority 24/7 Support",
        "NDA & IP Protection Contracts"
      ],
      cta: "Upgrade to Pro",
      href: `/checkout?plan=pro&billing=${billingCycle}`,
      highlight: true, // This triggers the Dark Mode card
    },
    {
      id: "business",
      name: "Business",
      price: billingCycle === 'monthly' ? 199 : 169,
      description: "Custom solutions for large agencies.",
      features: [
        "Everything in Pro",
        "Multiple Team Seats (5)",
        "API Access",
        "Custom Invoicing",
        "White-label Reports",
        "Dedicated Slack Channel"
      ],
      cta: "Contact Sales",
      href: "/contact-sales",
      highlight: false,
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 md:pb-24 font-sans">
      
      {/* Header Section */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium mb-4">
          <Sparkles size={16} />
          <span>New Features Available</span>
        </div>
        <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl mb-4">
          Simple pricing, <span className="text-indigo-600">expert results.</span>
        </h2>
        <p className="text-xl text-slate-500">
          Unlock the top 1% of talent and let our Relationship Managers handle the hiring logistics for you.
        </p>

        {/* Billing Toggle */}
        <div className="mt-8 flex justify-center items-center gap-4">
            <span className={`text-sm font-medium ${billingCycle === 'monthly' ? 'text-slate-900' : 'text-slate-500'}`}>Monthly</span>
            <button 
                onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
                className="relative inline-flex h-8 w-14 items-center rounded-full bg-indigo-600 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
                <span className={`${billingCycle === 'yearly' ? 'translate-x-7' : 'translate-x-1'} inline-block h-6 w-6 transform rounded-full bg-white transition-transform duration-200 shadow-sm`} />
            </button>
            <span className={`text-sm font-medium ${billingCycle === 'yearly' ? 'text-slate-900' : 'text-slate-500'}`}>
                Yearly <span className="text-green-600 font-bold ml-1">(-20%)</span>
            </span>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-8 items-start">
        {plans.map((plan) => (
          <div 
            key={plan.name}
            className={`relative flex flex-col rounded-3xl transition-all duration-300 ${
              plan.highlight 
                ? 'bg-slate-900 text-white shadow-2xl scale-105 z-10 ring-1 ring-white/10' 
                : 'bg-white text-slate-900 shadow-lg border border-slate-100 hover:border-indigo-200'
            }`}
          >
            {/* "Most Popular" Badge */}
            {plan.highlight && (
              <div className="absolute -top-5 left-0 right-0 mx-auto w-max rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-1.5 text-center text-sm font-bold text-white shadow-lg flex items-center gap-2">
                <Crown size={16} fill="white" />
                Most Popular
              </div>
            )}

            <div className="p-8 flex-1">
              <div className="flex items-center justify-between">
                  <h3 className={`text-xl font-bold ${plan.highlight ? 'text-white' : 'text-slate-900'}`}>{plan.name}</h3>
                  {plan.id === 'business' && <Building2 className="text-slate-400" />}
              </div>
              <p className={`mt-2 text-sm h-10 ${plan.highlight ? 'text-slate-300' : 'text-slate-500'}`}>{plan.description}</p>
              
              <div className="mt-6 flex items-baseline">
                <span className="text-5xl font-extrabold tracking-tight">${plan.price}</span>
                <span className={`ml-1 text-xl font-semibold ${plan.highlight ? 'text-slate-400' : 'text-slate-500'}`}>/mo</span>
              </div>
              
              <div className="mt-8 pt-8 border-t border-slate-200/10">
                <ul className="space-y-4">
                    {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                        <div className="flex-shrink-0">
                        <Check className={`h-5 w-5 ${plan.highlight ? 'text-indigo-400' : 'text-indigo-600'}`} aria-hidden="true" />
                        </div>
                        <p className={`ml-3 text-sm ${plan.highlight ? 'text-slate-300' : 'text-slate-700'}`}>{feature}</p>
                    </li>
                    ))}
                </ul>
              </div>
            </div>

            {/* CTA Button */}
            <div className="p-8 pt-0">
              {plan.id === 'starter' ? (
                 <button disabled className="w-full py-4 px-6 rounded-xl text-center text-sm font-bold bg-slate-100 text-slate-400 cursor-not-allowed">
                    Current Plan
                 </button>
              ) : (
                <Link href={plan.href} className="w-full">
                    <button
                        className={`w-full block rounded-xl py-4 px-6 text-center text-sm font-bold transition-all duration-200 ${
                        plan.highlight
                            ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50'
                            : 'bg-white border-2 border-slate-200 hover:border-indigo-600 hover:text-indigo-600 text-slate-700'
                        }`}
                    >
                        {plan.cta}
                    </button>
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Trust Badges */}
      <div className="mt-20 flex flex-wrap justify-center gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          {/* You can replace these with real logos */}
          <span className="text-2xl font-bold text-slate-400">Microsoft</span>
          <span className="text-2xl font-bold text-slate-400">Airbnb</span>
          <span className="text-2xl font-bold text-slate-400">Spotify</span>
          <span className="text-2xl font-bold text-slate-400">Stripe</span>
      </div>
    </div>
  );
}