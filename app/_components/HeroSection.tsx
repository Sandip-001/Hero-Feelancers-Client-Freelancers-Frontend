"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import Image from "next/image";

const slides = [
  {
    key: "client",
    theme: "amber",
    bgImage:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=2400&q=70",
    badge: "Hire with 0% Commission — Pay only for real work",
    title: "Your budget, 100% yours.",
    highlight: "We charge clients nothing.",
    value: 0,
    description:
      "Post a project for free, get matched with vetted experts, and ship faster with a dedicated relationship manager.",
    primaryCta: {
      text: "Start risk-free",
      href: "/post-job",
    },
    secondaryCta: {
      text: "See how it works",
      href: "#how-works",
    },
    stats: [
      { title: "0% client fees", desc: "No hidden platform cut." },
      { title: "Dedicated manager", desc: "Quality + tracking." },
      { title: "Secure payments", desc: "Milestones + escrow." },
    ],
    card: {
      label: "Cost clarity",
      title: "No platform cut",
      subtitle: "Clients pay 0% commission",
      leftLabel: "Client budget",
      leftValue: "₹100,000",
      rightLabel: "Freelancer receives",
      rightValue: "₹100,000",
      footer: [
        "Dedicated relationship manager for coordination and QA.",
        "Transparent milestones and delivery tracking.",
        "Verified clients & freelancers (no spam / no scam).",
      ],
    },
  },
  {
    key: "freelancer",
    theme: "purple",
    bgImage:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2400&q=70",
    badge: "Keep 95% of your earnings — Low platform fees",
    title: "Your skills, your profit.",
    highlight: "Keep most of what you earn.",
    value: 5,
    description:
      "Win better projects with priority matching, subscriptions, and long‑term client relationships.",
    primaryCta: {
      text: "Start earning now",
      href: "/registration",
    },
    secondaryCta: {
      text: "View subscriptions",
      href: "#plans",
    },
    stats: [
      { title: "95% earnings", desc: "Minimal deductions." },
      { title: "Priority matching", desc: "Pro badge + visibility." },
      { title: "Fast payouts", desc: "Weekly + instant options." },
    ],
    card: {
      label: "Take‑home pay",
      title: "Keep 95%+",
      subtitle: "Other platforms take 10–20%",
      leftLabel: "Project value",
      leftValue: "₹100,000",
      rightLabel: "You receive",
      rightValue: "₹95,000",
      footer: [
        "Priority proposals and better matching.",
        "Verified Pro badge + featured placement.",
        "Referral bonuses and growth resources.",
      ],
    },
  },
];

export default function HeroSction() {
  const [active, setActive] = useState(0);
  const slide = slides[active];
  const router = useRouter();

  return (
    <section className="relative overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.key}
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <Image
            src={slide.bgImage}
            alt="Hero background"
            fill
            sizes="100vw"
            priority={slide.key === "client"} // only first slide priority
            className="object-cover"
          />

          {/* Overlay */}
          <div
            className={cn(
              "absolute inset-0",
              slide.theme === "amber"
                ? "bg-gradient-to-br from-amber-50/95 via-yellow-50/90 to-orange-50/85"
                : "bg-gradient-to-br from-purple-50/95 via-indigo-50/90 to-amber-50/85"
            )}
          />
        </motion.div>
      </AnimatePresence>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* LEFT CONTENT */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <span
              className={cn(
                "inline-block rounded-full border px-4 py-2 text-sm font-bold mt-6 mb-6",
                slide.theme === "amber"
                  ? "border-amber-400/30 text-amber-700 bg-amber-100"
                  : "border-purple-400/30 text-purple-700 bg-purple-100"
              )}
            >
              {slide.badge}
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-5">
              {slide.title}
              <br />
              <span
                className={cn(
                  "bg-clip-text text-transparent",
                  slide.theme === "amber"
                    ? "bg-gradient-to-r from-amber-700 to-orange-600"
                    : "bg-gradient-to-r from-purple-700 to-indigo-600"
                )}
              >
                {slide.highlight}
              </span>
            </h1>

            <p className="text-lg text-slate-700 max-w-xl mb-8">
              {slide.description}
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              <Button
                size="lg"
                className="rounded-2xl font-extrabold"
                variant={"gold"}
                onClick={() => router.push(slide.primaryCta.href)}
              >
                {slide.primaryCta.text}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-2xl font-bold"
                onClick={() => router.push(slide.secondaryCta.href)}
              >
                {slide.secondaryCta.text}
              </Button>
            </div>

            <div className="grid sm:grid-cols-3 gap-3">
              {slide.stats.map((s) => (
                <Card key={s.title} className="bg-white/70">
                  <CardContent className="p-4">
                    <p className="font-extrabold">{s.title}</p>
                    <p className="text-sm text-slate-600">{s.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* RIGHT CARD */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Card className="rounded-3xl shadow-2xl">
              <CardContent className="p-6 sm:p-8 space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-amber-700">
                      {slide.card.label}
                    </p>
                    <h2 className="text-2xl font-black">{slide.card.title}</h2>
                    <p className="text-sm text-slate-600">
                      {slide.card.subtitle}
                    </p>
                  </div>
                  <div className="h-12 w-12 rounded-2xl bg-yellow-400 text-white flex items-center justify-center font-black ">
                    {slide.value}%
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between p-4 rounded-2xl bg-yellow-50">
                    <span>{slide.card.leftLabel}</span>
                    <span className="font-black text-yellow-700">
                      {slide.card.leftValue}
                    </span>
                  </div>
                  <div className="flex justify-between p-4 rounded-2xl bg-emerald-50">
                    <span>{slide.card.rightLabel}</span>
                    <span className="font-black text-emerald-700">
                      {slide.card.rightValue}
                    </span>
                  </div>
                </div>

                <ul className="text-sm text-slate-700 space-y-1">
                  {slide.card.footer.map((f) => (
                    <li key={f}>• {f}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* DOT NAVIGATION */}
        <div className="flex justify-center gap-2 mt-10">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={cn(
                "h-3 w-3 rounded-full transition",
                active === i ? "bg-slate-900" : "bg-slate-400/50"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
