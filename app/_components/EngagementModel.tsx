"use client";

import { motion } from "framer-motion";
import Link from "next/link";
export const engagementModelsData = {
  note: "Choose what fits your roadmap. Start small, scale up, or run continuous delivery with manager oversight.",
  cards: [
    {
      title: "Dedicated Resource",
      subtitle: "Best for: long-running product work.",
      description: "Embedded dev/design with weekly reporting and manager support.",
      color: "amber",
    },
    {
      title: "Project-Based Delivery",
      subtitle: "Best for: fixed scope builds.",
      description: "Milestone plan, QA checks, and delivery handover.",
      color: "orange",
    },
    {
      title: "Monthly Retainer",
      subtitle: "Best for: continuous improvements.",
      description: "Reserved capacity for features, fixes, and support.",
      color: "emerald",
    },
    {
      title: "Long-Term Partnership",
      subtitle: "Best for: scaling teams.",
      description: "Scale up/down across multiple roles with one contact.",
      color: "purple",
    },
  ],
  table: [
    { model: "Dedicated Resource", bestFor: "Team extension", benefit: "Full-time experts, 0% client commission" },
    { model: "Project-Based", bestFor: "Fixed scope", benefit: "Managed delivery, escrow secure" },
    { model: "Monthly Retainer", bestFor: "Ongoing support", benefit: "Technical manager included" },
    { model: "Long-Term Partnership", bestFor: "Scaling teams", benefit: "Growth rewards + priority matching" },
  ],
};


export default function EngagementModels() {
  return (
    <section id="models" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-black mb-4">Engagement Models</h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">{engagementModelsData.note}</p>
        </div>

        {/* Cards */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {engagementModelsData.cards.map((card, i) => (
            <motion.div
              key={i}
              className={`rounded-3xl border p-6 hover:shadow-lg transition-all bg-${card.color}-50/50 border-${card.color}-200`}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <p className={`text-xs font-extrabold uppercase tracking-wide text-${card.color}-700`}>
                Model
              </p>
              <h3 className="mt-2 font-black text-lg">{card.title}</h3>
              <p className="text-sm text-slate-700 mt-2">{card.subtitle}</p>
              <p className="text-sm text-slate-600 mt-3">{card.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Table */}
        <div className="overflow-x-auto rounded-3xl border border-yellow-100 shadow-xl">
          <table className="min-w-full overflow-hidden">
            <thead className="bg-gradient-to-r from-yellow-400 to-yellow-500">
              <tr>
                <th className="px-6 py-4 text-left font-extrabold text-white">Model</th>
                <th className="px-6 py-4 text-left font-extrabold text-white">Best For</th>
                <th className="px-6 py-4 text-left font-extrabold text-white">Key Benefit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-yellow-100 bg-white">
              {engagementModelsData.table.map((row, i) => (
                <tr key={i} className="hover:bg-yellow-50 transition-colors">
                  <td className="px-6 py-4 font-bold">{row.model}</td>
                  <td className="px-6 py-4">{row.bestFor}</td>
                  <td className="px-6 py-4">{row.benefit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <Link
            href="#consultation"
            className="inline-flex items-center justify-center px-7 py-4 rounded-2xl bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-950 font-extrabold shadow-lg hover:shadow-xl transition-all"
          >
            Book a consultation
          </Link>
        </div>
      </div>
    </section>
  );
}
