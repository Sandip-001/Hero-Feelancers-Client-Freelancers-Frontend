"use client";

import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const faqData = [
  {
    question: "Why is client commission 0%?",
    answer:
      "Clients pay 0%. The platform is supported through freelancer subscription plans and value-added services, so your budget stays fully for delivery.",
  },
  {
    question: "What does the technical manager do?",
    answer:
      "Planning, milestone breakdown, coordination, progress updates, quality review, and ensuring the right expert is assigned to the right task.",
  },
  {
    question: "How do payments work?",
    answer:
      "Use milestone-based payments. Funds are held securely and released after work is delivered and approved.",
  },
  {
    question: "Which engagement models are available?",
    answer:
      "Dedicated resource, project-based delivery, monthly retainer, and long-term partnership — choose what fits your roadmap and scale.",
  },
  {
    question: "Can I start small?",
    answer:
      "Yes. Start with a small task or MVP milestone first. Scale to a bigger team once delivery quality is proven.",
  },
];


export default function FAQ() {
  return (
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h2
            className="text-4xl sm:text-5xl font-black mb-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p
            className="text-lg text-slate-600"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Quick answers to help you start faster.
          </motion.p>
        </div>

        {/* Accordion */}
        <motion.div
          className="space-y-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: { transition: { staggerChildren: 0.15 } },
            hidden: {},
          }}
        >
          {faqData.map((faq, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
              }}
            >
              <Accordion type="single" collapsible>
                <AccordionItem value={`item-${i}`} className="group rounded-2xl border border-amber-100 bg-amber-50/40 shadow-sm p-3 pl-5 hover:shadow-md transition-all">
                  <AccordionTrigger className="font-extrabold text-lg group-open:text-gold-700">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-slate-700 mt-2">{faq.answer}</AccordionContent>
                </AccordionItem>
              </Accordion>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
