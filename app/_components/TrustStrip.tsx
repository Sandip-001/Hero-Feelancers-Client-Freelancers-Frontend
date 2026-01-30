"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Wallet, Users, CheckCircle } from "lucide-react";

// Trust items data
const trustItems = [
  {
    icon: ShieldCheck,
    label: "Milestone delivery",
    desc: "Track progress with clear checkpoints",
  },
  {
    icon: Wallet,
    label: "Escrow payments",
    desc: "Funds protected until work is approved",
  },
  {
    icon: Users,
    label: "Dedicated managers",
    desc: "Single point of accountability",
  },
  {
    icon: CheckCircle,
    label: "0% client commission",
    desc: "Pay freelancers, not platforms",
  },
];

// Animation variants for stagger effect
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function TrustStrip() {
  return (
    <section className="relative ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
            Why Teams Trust Us
          </h2>
          <p className="text-sm md:text-base text-slate-600 max-w-2xl mx-auto">
            Built for{" "}
            <span className="font-semibold text-yellow-600">startups</span>,{" "}
            <span className="font-semibold text-yellow-600">agencies</span>, and{" "}
            <span className="font-semibold text-yellow-600">product teams</span>{" "}
            that want speed, trust, and accountability.
          </p>
        </motion.div>

        {/* Trust Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {trustItems.map((item) => (
            <motion.div
              key={item.label}
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group relative bg-white rounded-xl p-6 shadow-sm hover:shadow-xl border border-yellow-100 hover:border-yellow-300 transition-all duration-300"
            >
              {/* Icon with gradient background */}
              <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-gradient-to-br from-yellow-400 to-amber-500 group-hover:from-yellow-500 group-hover:to-amber-600 transition-all duration-300">
                <item.icon className="w-6 h-6 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                {item.label}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {item.desc}
              </p>

              {/* Hover decoration */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-yellow-100/50 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA (Optional) */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-center mt-10"
        >
          <p className="text-xs md:text-sm text-slate-500">
            Join <span className="font-semibold text-yellow-600">10,000+</span>{" "}
            businesses working smarter
          </p>
        </motion.div>
      </div>
    </section>
  );
}