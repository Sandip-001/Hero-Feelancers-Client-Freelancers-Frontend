"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { usePostJobGuard } from "../redux/hooks/usePostJobGuard";

const clientSteps = [
  {
    step: 1,
    title: "Share your requirement",
    desc: "Write a brief, set budget, timeline, and tech stack.",
    note: "Optional: NDA + milestone plan",
  },
  {
    step: 2,
    title: "Get matched with experts",
    desc: "Receive proposals or curated matches by our team.",
    note: "Dedicated relationship manager helps shortlisting",
  },
  {
    step: 3,
    title: "Execute with full tracking",
    desc: "Milestones, QA checks, progress updates, delivery reviews.",
    note: "Pay securely & release after approval",
  },
];

const freelancerSteps = [
  {
    step: 1,
    title: "Build a strong profile",
    desc: "Showcase skills, portfolio, services, and experience.",
    note: "Pro badge boosts visibility",
  },
  {
    step: 2,
    title: "Apply & send proposals",
    desc: "Define scope, timeline, and pricing (milestones).",
    note: "Subscriptions boost priority",
  },
  {
    step: 3,
    title: "Deliver & get paid",
    desc: "Work with manager support and secure payouts.",
    note: "Keep more earnings with low fees",
  },
];

export default function HowItWorks() {
  const [mode, setMode] = useState<"client" | "freelancer">("client");

  const { handlePostJobClick } = usePostJobGuard();
  const router = useRouter();

  return (
    <section
      id="how-works"
      className="py-20 bg-yellow-50/20 backdrop-blur border-t border-amber-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-black mb-5">How it works</h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Switch between Client and Freelancer flows. See what you do, what we
            manage, and what you get.
          </p>
        </div>

        {/* TABS */}
        <div className="max-w-xl mx-auto mb-12">
          <div className="grid grid-cols-2 bg-slate-900/5 rounded-2xl p-1 border border-amber-100">
            <button
              onClick={() => setMode("client")}
              className={cn(
                "rounded-xl px-4 py-3 font-extrabold text-sm sm:text-base transition",
                mode === "client"
                  ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow"
                  : "text-slate-800 hover:bg-white"
              )}
            >
              For clients
            </button>
            <button
              onClick={() => setMode("freelancer")}
              className={cn(
                "rounded-xl px-4 py-3 font-extrabold text-sm sm:text-base transition",
                mode === "freelancer"
                  ? "bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow"
                  : "text-slate-800 hover:bg-white"
              )}
            >
              For freelancers
            </button>
          </div>
        </div>

        {/* PANELS */}
        <AnimatePresence mode="wait">
          {mode === "client" && (
            <motion.div
              key="client"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid lg:grid-cols-2 gap-10 items-center"
            >
              {/* LEFT */}
              <div>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-extrabold text-sm mb-5">
                  Client flow • 0% commission
                </span>
                <h3 className="text-3xl font-black mb-4">
                  Post → Match → Deliver
                </h3>

                <ol className="space-y-4">
                  {clientSteps.map((s) => (
                    <li
                      key={s.step}
                      className="rounded-2xl border border-amber-100 bg-yellow-50/50 p-5"
                    >
                      <div className="flex gap-3">
                        <div className="h-9 w-9 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-black">
                          {s.step}
                        </div>
                        <div>
                          <p className="font-extrabold">{s.title}</p>
                          <p className="text-sm text-slate-600 mt-1">
                            {s.desc}
                          </p>
                          <p className="text-xs text-slate-500 mt-2">
                            {s.note}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Button
                    className="rounded-2xl font-extrabold"
                    variant={"gold"}
                    onClick={handlePostJobClick}
                  >
                    Post free project
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="rounded-2xl font-extrabold"
                  >
                    <Link href="#plans">See pricing</Link>
                  </Button>
                </div>
              </div>

              {/* RIGHT */}
              <Card className="rounded-3xl overflow-hidden shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1600&q=70"
                  alt="Project planning board"
                  className="h-64 sm:h-80 w-full object-cover"
                />
                <CardContent className="p-6">
                  <h4 className="font-black text-xl mb-2">
                    What the manager handles
                  </h4>
                  <ul className="text-sm text-slate-700 space-y-2">
                    <li>• Project plan, milestones & timeline</li>
                    <li>• Progress tracking & updates</li>
                    <li>• Quality control & delivery review</li>
                    <li>• Client–freelancer coordination</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {mode === "freelancer" && (
            <motion.div
              key="freelancer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid lg:grid-cols-2 gap-10 items-center"
            >
              {/* LEFT */}
              <div>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 border border-purple-200 text-purple-700 font-extrabold text-sm mb-5">
                  Freelancer flow • subscriptions unlock growth
                </span>
                <h3 className="text-3xl font-black mb-4">
                  Find → Propose → Earn
                </h3>

                <ol className="space-y-4">
                  {freelancerSteps.map((s) => (
                    <li
                      key={s.step}
                      className="rounded-2xl border border-amber-100 bg-yellow-50/50 p-5"
                    >
                      <div className="flex gap-3">
                        <div className="h-9 w-9 rounded-2xl bg-purple-600 text-white flex items-center justify-center font-black">
                          {s.step}
                        </div>
                        <div>
                          <p className="font-extrabold">{s.title}</p>
                          <p className="text-sm text-slate-600 mt-1">
                            {s.desc}
                          </p>
                          <p className="text-xs text-slate-500 mt-2">
                            {s.note}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Button
                    asChild
                    className="rounded-2xl font-extrabold"
                    variant={"gold"}
                  >
                    <Link href="#plans">View subscriptions</Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="rounded-2xl font-extrabold"
                    onClick={() => router.push("/registration")}
                  >
                    Explore projects
                  </Button>
                </div>
              </div>

              {/* RIGHT */}
              <Card className="rounded-3xl overflow-hidden shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=70"
                  alt="Remote team working"
                  className="h-64 sm:h-80 w-full object-cover"
                />
                <CardContent className="p-6">
                  <h4 className="font-black text-xl mb-2">
                    Freelancer growth perks
                  </h4>
                  <ul className="text-sm text-slate-700 space-y-2">
                    <li>• Referral bonuses & community rewards</li>
                    <li>• Pro badge & priority visibility</li>
                    <li>• Learn, earn & level-up programs</li>
                    <li>• More control, less interference</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
