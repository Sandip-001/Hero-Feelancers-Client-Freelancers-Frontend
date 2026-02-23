"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative bg-slate-950 text-slate-300 overflow-hidden">
      {/* Top Gradient Divider */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#14A9F9] to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center">
          
          {/* Logo & Brand */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-3">
              <Image
                src="/logo.png"   // Replace with your actual logo path
                alt="Hero Freelancer Logo"
                width={40}
                height={40}
              />
              <h2 className="text-xl font-bold text-white tracking-wide">
                Hero Freelancers
              </h2>
            </div>

            <p className="text-sm text-slate-400 mt-3 max-w-xs">
              Managed freelance delivery you can trust. Secure. Reliable.
              Transparent.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center">
            <h3 className="text-white font-semibold mb-4">
              Legal & Policies
            </h3>
            <div className="flex flex-col gap-2 text-sm">
              <Link
                href="/terms-and-conditions"
                className="hover:text-[#14A9F9] transition"
              >
                Terms & Conditions
              </Link>
              <Link
                href="/refund-policy"
                className="hover:text-[#14A9F9] transition"
              >
                Refund Policy
              </Link>
              <Link
                href="/privacy-policy"
                className="hover:text-[#14A9F9] transition"
              >
                Privacy Policy
              </Link>
            </div>
          </div>

          {/* Value Badges */}
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-3 text-xs">
            <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:border-[#14A9F9]/40 transition">
              0% Client Commission
            </span>
            <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:border-[#14A9F9]/40 transition">
              Freelancer Subscriptions
            </span>
            <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:border-[#14A9F9]/40 transition">
              Managed Delivery
            </span>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="mt-12 pt-6 border-t border-white/10 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} Hero Freelancers. All rights reserved.
        </div>
      </motion.div>
    </footer>
  );
}