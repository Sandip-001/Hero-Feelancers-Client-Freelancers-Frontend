"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { usePostJobGuard } from "../redux/hooks/usePostJobGuard";

const pricingData = {
  client: {
    badge: "Client pricing • 0% commission",
    title: "Free",
    subtitle:
      "Post projects, hire vetted experts, and deliver with a dedicated technical manager — without paying any platform fee.",
    highlights: [
      "Unlimited free job posts",
      "Vetted & verified freelancers only",
      "Dedicated technical manager per project",
      "Milestones, QA & delivery tracking",
      "Escrow-backed secure payments",
    ],
    stats: [
      { label: "Platform fee", value: "0%" },
      { label: "Hidden charges", value: "None" },
      { label: "Manager support", value: "Included" },
    ],
  },

  freelancer: {
    note: "Subscriptions unlock visibility, priority matching, and lower platform deductions. No pressure to choose — upgrade anytime.",
    plans: [
      {
        name: "Starter",
        price: "Free",
        description: "Explore projects and build your presence",
        fee: "Standard",
        visibility: "Basic",
        gradient: "from-slate-100 to-white",
        features: [
          "Profile & portfolio setup",
          "Browse projects",
          "Community access",
        ],
      },
      {
        name: "Basic",
        price: "₹499 / month",
        highlight: true,
        fee: "~5%",
        visibility: "High",
        gradient: "from-purple-50 via-indigo-50 to-white",
        description: "Better visibility & faster matching",
        features: [
          "Priority matching",
          "Verified freelancer badge",
          "More proposal capacity",
          "Faster payouts",
        ],
      },
      {
        name: "Pro",
        price: "₹999 / month",
        fee: "~3%",
        visibility: "Maximum",
        gradient: "from-yellow-50 via-amber-50 to-white",
        description: "Maximum growth & premium exposure",
        features: [
          "Top priority matching",
          "Featured profile placement",
          "Growth & learning programs",
          "Referral bonuses",
        ],
      },
      {
        name: "Enterprise",
        price: "₹1499 / month",
        description: "Built for high-value & scaling freelancers",
        fee: "Lowest",
        visibility: "Maximum",
        gradient: "from-indigo-50 to-white",
        features: [
          "High cap-value projects",
          "Average bid notifications",
          "2 profiles under one account",
          "Growth & learning programs",
        ],
      },
    ],
  },
};

export default function PricingSection() {
  const [tab, setTab] = useState<"client" | "freelancer">("client");

  const { handlePostJobClick } = usePostJobGuard();
  const [selectedPlan, setSelectedPlan] = useState(
    pricingData.freelancer.plans.find((p) => p.highlight)?.name ||
      pricingData.freelancer.plans[0].name
  );

  return (
    <section
      id="plans"
      className="py-20 bg-gradient-to-br from-amber-50 via-yellow-50 to-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-black mb-4">
            Plans & Pricing
          </h2>
          <p className="text-lg text-slate-700 max-w-3xl mx-auto">
            Clients pay nothing. Freelancers choose subscriptions only when they
            want to grow faster.
          </p>
        </div>

        {/* Tabs */}
        <div className="max-w-xl mx-auto mb-12">
          <div className="grid grid-cols-2 rounded-2xl bg-white/80 border border-amber-200 p-1 shadow-sm">
            <button
              onClick={() => setTab("client")}
              className={`rounded-xl px-4 py-3 font-extrabold transition ${
                tab === "client"
                  ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow"
                  : "text-slate-700 hover:bg-amber-50"
              }`}
            >
              Client (0% fee)
            </button>
            <button
              onClick={() => setTab("freelancer")}
              className={`rounded-xl px-4 py-3 font-extrabold transition ${
                tab === "freelancer"
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow"
                  : "text-slate-700 hover:bg-amber-50"
              }`}
            >
              Freelancer
            </button>
          </div>
        </div>

        {/* Panels */}
        <AnimatePresence mode="wait">
          {tab === "client" && (
            <motion.div
              key="client"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4 }}
              className="grid lg:grid-cols-2 gap-8"
            >
              {/* Client Card */}
              <Card className="rounded-3xl border-emerald-200 shadow-xl">
                <CardContent className="p-8">
                  <span className="inline-block mb-4 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-extrabold">
                    {pricingData.client.badge}
                  </span>

                  <h3 className="text-3xl font-black mb-2">
                    {pricingData.client.title}
                  </h3>
                  <p className="text-slate-700 mb-6">
                    {pricingData.client.subtitle}
                  </p>

                  <ul className="space-y-3 mb-6">
                    {pricingData.client.highlights.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-slate-700"
                      >
                        <span className="mt-2 h-2 w-2 rounded-full bg-emerald-500" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {pricingData.client.stats.map((stat) => (
                      <div
                        key={stat.label}
                        className="rounded-2xl bg-emerald-50 border border-emerald-200 p-4 text-center"
                      >
                        <p className="text-xs text-slate-500 font-bold">
                          {stat.label}
                        </p>
                        <p className="text-lg font-black">{stat.value}</p>
                      </div>
                    ))}
                  </div>

                  <Button
                    size="lg"
                    className="w-full rounded-2xl font-extrabold shadow-lg hover:shadow-xl"
                    variant={"gold"}
                    onClick={handlePostJobClick}
                  >
                    Post a free project
                  </Button>
                </CardContent>
              </Card>

              {/* Visual */}
              <div className="rounded-3xl overflow-hidden shadow-xl border border-amber-100 bg-white">
                <img
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692"
                  alt="Client collaboration"
                  className="h-72 w-full object-cover"
                />
                <div className="p-8">
                  <h4 className="text-2xl font-black mb-2">
                    What 0% commission really means
                  </h4>
                  <p className="text-slate-700">
                    Every rupee you budget goes to delivery. We make money by
                    helping freelancers grow — not by cutting your project cost.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {tab === "freelancer" && (
            <motion.div
              key="freelancer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4 }}
            >
              <p className="text-center text-slate-700 max-w-3xl mx-auto mb-12">
                {pricingData.freelancer.note}
              </p>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
                {pricingData.freelancer.plans.map((plan) => {
                  const isActive = selectedPlan === plan.name;

                  return (
                    <motion.div
                      key={plan.name}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedPlan(plan.name)}
                      className="cursor-pointer h-full"
                    >
                      <Card
                        className={`h-full rounded-3xl border transition-all shadow-xl bg-gradient-to-br ${
                          plan.gradient
                        }
              ${
                isActive
                  ? "ring-4 ring-purple-500 shadow-2xl"
                  : "border-amber-100 hover:shadow-2xl"
              }`}
                      >
                        <CardContent className="p-7 relative flex flex-col h-full">
                          {plan.highlight && (
                            <span className="absolute -top-3 left-6 px-3 py-1 rounded-full bg-purple-600 text-white text-xs font-extrabold shadow">
                              Most popular
                            </span>
                          )}

                          <h3 className="text-2xl font-black mb-1">
                            {plan.name}
                          </h3>
                          <p className="text-xl font-extrabold">{plan.price}</p>
                          <p className="text-sm text-slate-600 mt-2">
                            {plan.description}
                          </p>

                          {/* Metrics */}
                          <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                            <div className="rounded-xl bg-white/70 border p-3">
                              <p className="text-xs text-slate-500 font-bold">
                                Platform fee
                              </p>
                              <p className="font-extrabold">{plan.fee}</p>
                            </div>
                            <div className="rounded-xl bg-white/70 border p-3">
                              <p className="text-xs text-slate-500 font-bold">
                                Visibility
                              </p>
                              <p className="font-extrabold">
                                {plan.visibility}
                              </p>
                            </div>
                          </div>

                          {/* Features */}
                          <ul className="mt-5 space-y-2 text-sm text-slate-700 flex-1">
                            {plan.features.map((f) => (
                              <li key={f} className="flex gap-2">
                                <span className="mt-1 h-2 w-2 rounded-full bg-purple-500" />
                                {f}
                              </li>
                            ))}
                          </ul>

                          {/*isActive && (
                            <div className="mt-5 rounded-xl bg-purple-600/10 border border-purple-300 px-4 py-2 text-sm font-extrabold text-purple-700 text-center">
                              Selected plan
                            </div>
                          )*/}
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>

              {/* CTA */}
              <div className="mt-14 text-center">
                <Link href="/registration">
                  <Button
                    size="lg"
                    className="rounded-2xl px-12 py-6 text-lg font-extrabold bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-xl hover:shadow-2xl"
                  >
                    Join as a freelancer
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
