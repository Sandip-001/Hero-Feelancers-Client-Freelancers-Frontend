"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative bg-slate-950 text-slate-300 overflow-hidden">
      {/* Subtle top divider */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="text-center md:text-left">
            <p className="text-sm font-bold text-white tracking-wide">
              © {new Date().getFullYear()} Hero Freelancers
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Managed freelance delivery you can trust
            </p>
          </div>

          {/* Value proposition */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs">
            <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10">
              0% Client Commission
            </span>
            <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10">
              Freelancer Subscriptions
            </span>
            <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10">
              Managed Delivery
            </span>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
