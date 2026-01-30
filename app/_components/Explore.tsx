"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { usePostJobGuard } from "../redux/hooks/usePostJobGuard";

const categories = [
  {
    title: "AI Services",
    desc: "LLMs, chatbots, automation, computer vision, NLP, machine learning",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=70",
  },
  {
    title: "Development & IT",
    desc: "React, Next.js, Node.js, Laravel, APIs, full-stack development",
    image:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=70",
  },
  {
    title: "Design & Creative",
    desc: "UI/UX, product design, branding, graphic design, illustrations",
    image:
      "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1200&q=70",
  },
  {
    title: "Sales & Marketing",
    desc: "Digital marketing, SEO, social media, content strategy, campaigns",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=70",
  },
  {
    title: "Writing & Translation",
    desc: "Blogs, copywriting, technical docs, translation, content writing",
    image:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=70",
  },
  {
    title: "Admin & Support",
    desc: "Virtual assistance, data entry, customer service, office support",
    image:
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1200&q=70",
  },
  {
    title: "Finance & Accounting",
    desc: "Bookkeeping, financial analysis, tax preparation, auditing",
    image:
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=70",
  },
  {
    title: "Legal",
    desc: "Contract law, corporate law, legal consulting, compliance",
    image:
      "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=70",
  },
  {
    title: "HR & Training",
    desc: "Recruitment, training programs, employee development, HR consulting",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=70",
  },
  {
    title: "Engineering & Architecture",
    desc: "CAD design, structural engineering, 3D modeling, architecture",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=70",
  },
];

export default function ExploreSection() {
  const { handlePostJobClick } = usePostJobGuard();

  return (
    <section id="explore" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl sm:text-5xl font-black mb-5">
            Explore millions of pros
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Browse high‑demand talent categories. Post your project once and get
            matched fast, or explore profiles and invite pros directly.
          </p>
        </motion.div>

        {/* CATEGORY GRID - 5 per row on large screens */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Link href="#consultation">
                <Card className="group h-full rounded-3xl overflow-hidden border-amber-100 bg-gradient-to-b from-amber-50 to-white shadow-sm hover:shadow-2xl transition-all">
                  <div className="overflow-hidden">
                    <img
                      src={cat.image}
                      alt={cat.title}
                      className="h-40 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-5">
                    <h3 className="font-black text-lg text-slate-900">
                      {cat.title}
                    </h3>
                    <p className="text-sm text-slate-600 mt-1 line-clamp-2">
                      {cat.desc}
                    </p>
                    <div className="flex items-center gap-1 mt-4 text-sm font-bold text-amber-700">
                      Explore experts <ArrowRight className="h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA BUTTONS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 flex flex-col sm:flex-row gap-4 items-center justify-center"
        >
          <Button
            asChild
            size="lg"
            variant="slate"
            className="rounded-2xl font-extrabold"
          >
            <Link href="#categories">View all categories</Link>
          </Button>
          <Button
            size="lg"
            variant="gold"
            className="rounded-2xl font-extrabold shadow-lg"
            onClick={handlePostJobClick}
          >
            Post a free project
          </Button>
        </motion.div>
      </div>
    </section>
  );
}