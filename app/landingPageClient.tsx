"use client";

import { type ClassValue, clsx } from "clsx";
import { AnimatePresence, motion, Variants } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import Link from "next/link";
import HeroFreelancersLanding from "./HeroFreelancerLanding";





import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Facebook,
  FileText,
  Instagram,
  Mail,
  MapPin,
  Monitor,
  Phone,
  Save,
  Search,
  TrendingUp,
  Twitter,
  User,
} from "lucide-react";

// --- Utility for tw-merge ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Animation Variants ---
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const hoverScale = {
  scale: 1.05,
  transition: { duration: 0.2 },
};

const tapScale = {
  scale: 0.95,
};

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
};

// --- Data & Constants ---
const CATEGORIES = [
  { name: "Graphics Design", img: "https://images.unsplash.com/photo-1690228254548-31ef53e40cd1?w=600&auto=format&fit=crop&q=60" },
  { name: "Cartoon Animation", img: "https://images.unsplash.com/photo-1753301037302-db30ae8e0146?w=600&auto=format&fit=crop&q=60" },
  { name: "Illustration", img: "https://images.unsplash.com/photo-1615184697985-c9bde1b07da7?auto=format&fit=crop&q=80&w=600" },
  { name: "Flyers & Vouchers", img: "https://images.unsplash.com/photo-1583407723467-9b2d22504831?w=600&auto=format&fit=crop&q=60" },
  { name: "Logo Design", img: "https://images.unsplash.com/photo-1498075702571-ecb018f3752d?w=600&auto=format&fit=crop&q=60" },
  { name: "Social Graphics", img: "https://images.unsplash.com/photo-1637416067365-2b5e7e8fe8fa?w=600&auto=format&fit=crop&q=60" },
  { name: "Article Writing", img: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=600" },
  { name: "Video Editing", img: "https://images.unsplash.com/photo-1574717025058-2f8737d2e2b7?w=600&auto=format&fit=crop&q=60" },
];

const BASE_WORKS = [
  {
    icon: <Monitor className="w-8 h-8 text-blue-500" />,
    title: "Logo Design",
    desc: "Need a professional logo for our writing studio/jewelry company.",
    bid: "$ 500",
    color: "bg-blue-50",
  },
  {
    icon: <FileText className="w-8 h-8 text-green-500" />,
    title: "Graphic Design",
    desc: "We need a graphic designer with UI/UX skills for our furniture company.",
    bid: "$ 500",
    color: "bg-green-50",
  },
  {
    icon: <TrendingUp className="w-8 h-8 text-orange-500" />,
    title: "Need a SEO",
    desc: "Need an SEO for our company who will let our company to a higher level.",
    bid: "$ 300",
    color: "bg-orange-50",
  },
];

const RECENT_WORKS = [...BASE_WORKS, ...BASE_WORKS.map(w => ({ ...w, title: w.title + " (II)" })), ...BASE_WORKS.map(w => ({ ...w, title: w.title + " (III)" }))];

const BASE_PORTFOLIOS = [
  { name: "Bunny.design", role: "UI/UX Designer", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200" },
  { name: "Bhaskar Tiwari", role: "Graphic Designer", img: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=80&w=200" },
  { name: "Aksara Joshi", role: "Graphic Designer", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200" },
];

const PORTFOLIOS = [...BASE_PORTFOLIOS, ...BASE_PORTFOLIOS.map(p => ({ ...p, name: p.name + " 2" })), ...BASE_PORTFOLIOS.map(p => ({ ...p, name: p.name + " 3" }))];

export default function LandingPageClient() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden font-sans">
      <HeroFreelancersLanding />
    </main>
  );
}