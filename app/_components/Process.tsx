"use client";

import { motion, Variants } from "framer-motion";
import { usePostJobGuard } from "../redux/hooks/usePostJobGuard";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants:Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const processData = {
  title: "Simple. Transparent. Secure.",
  subtitle:
    "A clear process designed to reduce risk: free posting, vetted matches, manager supervision, and milestone approvals.",

  steps: [
    {
      step: "1",
      title: "Post Free",
      description: "Share requirements. 0% commission for clients.",
      image:
        "https://images.unsplash.com/photo-1556155092-490a1ba16284?auto=format&fit=crop&w=1200&q=70",
    },
    {
      step: "2",
      title: "Match + Manager",
      description: "Vetted experts + dedicated technical manager assigned.",
      image:
        "https://images.unsplash.com/photo-1556761175-129418cb2dfe?auto=format&fit=crop&w=1200&q=70",
    },
    {
      step: "3",
      title: "Escrow Secure",
      description: "Payments protected until delivery approval.",
      image:
        "https://plus.unsplash.com/premium_photo-1739995619666-7b47645fb2e2?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      step: "4",
      title: "Release & Grow",
      description: "Approve work, release funds, unlock rewards.",
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=70",
    },
  ],
};


export default function ProcessSection() {
  const { handlePostJobClick } = usePostJobGuard();
  return (
    <section
      id="process"
      className="py-20 bg-gradient-to-br from-yellow-50 to-orange-50"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-black mb-4">
            {processData.title}
          </h2>
          <p className="text-lg text-slate-700 max-w-3xl mx-auto">
            {processData.subtitle}
          </p>
        </div>

        {/* STEPS */}
        <motion.ol
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid md:grid-cols-4 gap-6"
        >
          {processData.steps.map((step) => (
            <motion.li
              key={step.step}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              className="group rounded-3xl overflow-hidden border border-amber-200 bg-white/70 shadow-sm hover:shadow-xl transition-all"
            >
              <img
                src={step.image}
                alt={step.title}
                className="h-32 w-full object-cover"
                loading="lazy"
              />

              <div className="p-6 text-center">
                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-yellow-400 to-yellow-500 text-white flex items-center justify-center font-extrabold text-lg shadow-lg group-hover:scale-110 transition-transform">
                  {step.step}
                </div>

                <h3 className="text-lg font-black text-amber-700 mb-2">
                  {step.title}
                </h3>
                <p className="text-slate-700 text-sm">
                  {step.description}
                </p>
              </div>
            </motion.li>
          ))}
        </motion.ol>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <a
            href="/jobpost"
            className="inline-flex items-center justify-center rounded-2xl bg-slate-950 text-white px-8 py-4 font-extrabold shadow hover:opacity-95 transition-all"
          >
            Post a free project
          </a>
        </motion.div>
      </div>
    </section>
  );
}
