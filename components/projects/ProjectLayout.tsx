"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  X,
  Zap,
  Phone,
  Mail,
  MessageSquare,
  MessageCircle,
} from "lucide-react";
import { ManagerInfo } from "./data";

import Autoplay from "embla-carousel-autoplay";


import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import type { CarouselApi } from "@/components/ui/carousel";

// If not, paste the Button/Card components here or import them

type ButtonVariant =
  | "default"
  | "outline"
  | "blue"
  | "blueOutline"
  | "destructive"
  | "ghost"
  | "green";

type ButtonSize = "default" | "sm" | "lg" | "icon";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}



function PromoBanner(): JSX.Element {
  // Properly typed autoplay plugin
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  const banners: string[] = [
    "/banner1.png",
    "/banner2.png",
    "/banner3.png",
    
  ];

  // Properly typed state
  const [api, setApi] = React.useState<CarouselApi | null>(null);
  const [current, setCurrent] = React.useState<number>(0);

  React.useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on("select", onSelect);
    onSelect();

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <div className="w-full">
      <Carousel
        setApi={setApi}
        plugins={[plugin.current]}
        className="w-full"
      >
        <CarouselContent>
          {banners.map((src, index) => (
            <CarouselItem key={index}>
              <div className="rounded-xl overflow-hidden shadow-lg">
                <img
                  src={`${src}?auto=format&fit=crop&w=1000&q=80`}
                  alt={`Banner ${index + 1}`}
                  className="w-full h-44 object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-3">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            className={`h-2.5 rounded-full transition-all ${
              current === index
                ? "w-6 bg-[#14A9F9]"
                : "w-2.5 bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}



const Button = ({
  variant = "default",
  size = "default",
  className = "",
  children,
  ...props
}: ButtonProps) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50";
  const variants = {
    default: "bg-[#14A9F9] text-white hover:bg-[#0f8ecf] shadow-sm",
    outline: "border border-gray-300 bg-white hover:bg-gray-50 text-gray-700",
    blue: "bg-[#14A9F9] text-white hover:bg-[#0f8ecf] shadow-sm",
    blueOutline:
      "border border-[#14A9F9] text-[#14A9F9] bg-white hover:bg-blue-50",
    destructive: "bg-red-500 text-white hover:bg-red-600",
    ghost: "hover:bg-gray-100 hover:text-gray-900",
    green: "bg-green-600 text-white hover:bg-green-700 shadow-sm",
  };
  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-8 px-3 text-xs",
    lg: "h-12 px-8 text-base",
    icon: "h-10 w-10",
  };
  // @ts-ignore
  return (
    <button
      className={`${baseStyles} ${variants[variant] || variants.default} ${sizes[size] || sizes.default} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const Card = ({ className = "", children }: any) => (
  <div
    className={`rounded-xl border border-gray-200 bg-white text-gray-950 shadow-sm transition-all ${className}`}
  >
    {children}
  </div>
);
const CardHeader = ({ className = "", children }: any) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>{children}</div>
);
const CardTitle = ({ className = "", children }: any) => (
  <h3 className={`text-xl font-bold leading-none tracking-tight ${className}`}>
    {children}
  </h3>
);
const CardContent = ({ className = "", children }: any) => (
  <div className={`p-6 pt-0 ${className}`}>{children}</div>
);
const CardFooter = ({ className = "", children }: any) => (
  <div className={`flex items-center p-6 pt-0 ${className}`}>{children}</div>
);

// --- MANAGER MODAL & CARD ---
// (Paste the ManagerProfileModal and RelationshipManagerCard code here from previous response)
export const ManagerProfileModal = ({
  isOpen,
  onClose,
  manager,
}: {
  isOpen: boolean;
  onClose: () => void;
  manager: ManagerInfo;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200 relative">
        {/* Header Background */}
        <div className="h-24 bg-gradient-to-r from-[#14A9F9] to-blue-600 relative">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-1.5 bg-white/20 hover:bg-white/40 rounded-full text-white transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Profile Content */}
        <div className="px-6 pb-6 -mt-12 flex flex-col items-center">
          <div className="relative">
            <img
              src={manager.profileImage}
              alt={manager.fullName}
              className="w-24 h-24 rounded-full border-4 border-white shadow-md object-cover"
            />
            <div
              className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full"
              title="Online"
            ></div>
          </div>

          <h3 className="mt-3 text-xl font-bold text-gray-900">
            {manager.fullName}
          </h3>
          <p className="text-sm text-[#14A9F9] font-medium">
            {manager.userType}
          </p>

          <div className="mt-4 w-full space-y-3">
            <div className="flex items-center justify-center p-2 bg-gray-50 rounded-lg border border-gray-100">
              <Phone className="h-4 w-4 text-gray-400 mr-2" />
              <span className="text-sm text-gray-700 font-mono">
                {manager.phone}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <Button
                onClick={() => (window.location.href = `/workstreams`)}
                variant="blue"
                className="flex flex-col items-center justify-center h-auto py-3 gap-1 rounded-xl"
              >
                <MessageSquare className="h-5 w-5" />
                <span className="text-[10px]">Message</span>
              </Button>
              <Button
                onClick={() =>
                  window.open(
                    `https://wa.me/${manager.whatsapp.replace(/[^0-9]/g, "")}`,
                    "_blank",
                  )
                }
                className="flex flex-col items-center justify-center h-auto py-3 gap-1 rounded-xl bg-green-500 hover:bg-green-600 border-transparent text-white"
              >
                <MessageCircle className="h-5 w-5" />
                <span className="text-[10px]">WhatsApp</span>
              </Button>
              <Button
                onClick={() => (window.location.href = `tel:${manager.phone}`)}
                variant="outline"
                className="flex flex-col items-center justify-center h-auto py-3 gap-1 rounded-xl border-gray-200 hover:border-[#14A9F9] hover:text-[#14A9F9]"
              >
                <Phone className="h-5 w-5" />
                <span className="text-[10px]">Call</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const RelationshipManagerCard = () => {
  return (
    <Card className="bg-white shadow-md overflow-hidden rounded-2xl w-full max-w-sm mx-auto font-sans relative">
      {/* Blue Header Section */}
      <div className="h-20 bg-[#14A9F9] relative w-full"></div>

      <div className="px-5 pb-6">
        {/* Profile Image - Negative margin pulls it up into the blue header */}
        <div className="relative -mt-12 mb-3 flex justify-center">
          <div className="relative">
            <div className="h-24 w-24 rounded-full border-[4px] border-white shadow-sm overflow-hidden bg-gray-200">
              <img
                src="/manager.jpeg"
                alt="Manager"
                className="h-full w-full object-cover"
              />
            </div>
            {/* Status Dot */}
            <div className="absolute bottom-1 right-1 h-5 w-5 bg-[#25D366] rounded-full border-[3px] border-white"></div>
          </div>
        </div>

        {/* Name and Title */}
        <div className="text-center mb-6">
          <h4 className="font-bold text-gray-900 text-xl">Hero Freelancers</h4>
          <p className="text-[#14A9F9] font-medium text-sm">
            Senior Project Manager
          </p>
        </div>

        {/* Phone Number Display */}
        <div className="bg-gray-50 rounded-xl py-3 px-4 flex items-center justify-center gap-3 mb-6 border border-gray-100">
          <Mail className="h-4 w-4 text-gray-400" />
          <span className="text-gray-600 font-medium text-sm tracking-wide">
            herofreelancers@gmail.com
          </span>
        </div>

        {/* Action Buttons Grid */}
        {/*<div className="grid grid-cols-3 gap-3">
          {/* Message Button - Applied styling directly to Link for valid HTML /}
          <Link
            href="/workstreams"
            className="flex flex-col items-center justify-center gap-1.5 bg-[#14A9F9] hover:bg-blue-500 text-white py-3 rounded-2xl transition-colors shadow-sm active:scale-95"
          >
            <MessageSquare className="h-5 w-5" />
            <span className="text-[11px] font-medium">Message</span>
          </Link>

          {/* WhatsApp Button - Uses wa.me link /}
          <a
            href="https://wa.me/15551234567"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center gap-1.5 bg-[#25D366] hover:bg-green-500 text-white py-3 rounded-2xl transition-colors shadow-sm active:scale-95 cursor-pointer"
          >
            <MessageCircle className="h-5 w-5" />
            <span className="text-[11px] font-medium">WhatsApp</span>
          </a>

          {/* Call Button - Uses tel: link /}
          <a
            href="tel:+15551234567"
            className="flex flex-col items-center justify-center gap-1.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 py-3 rounded-2xl transition-colors shadow-sm active:scale-95 cursor-pointer"
          >
            <Phone className="h-5 w-5" />
            <span className="text-[11px] font-medium">Call</span>
          </a>
        </div> */}
        <div className="grid grid-cols-3 gap-3">
          {/* Message Button */}
          <div
            className="flex flex-col items-center justify-center gap-1.5 
          bg-[#14A9F9] text-white py-3 rounded-2xl shadow-sm 
            opacity-50 cursor-not-allowed pointer-events-none"
          >
            <MessageSquare className="h-5 w-5" />
            <span className="text-[11px] font-medium">Message</span>
          </div>

          {/* WhatsApp Button */}
          <div
            className="flex flex-col items-center justify-center gap-1.5 
          bg-[#25D366] text-white py-3 rounded-2xl shadow-sm 
           opacity-50 cursor-not-allowed pointer-events-none"
          >
            <MessageCircle className="h-5 w-5" />
            <span className="text-[11px] font-medium">WhatsApp</span>
          </div>

          {/* Call Button */}
          <div
            className="flex flex-col items-center justify-center gap-1.5 
         bg-white border border-gray-200 text-gray-700 py-3 rounded-2xl shadow-sm 
           opacity-50 cursor-not-allowed pointer-events-none"
          >
            <Phone className="h-5 w-5" />
            <span className="text-[11px] font-medium">Call</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

// --- FILTER SIDEBAR ---
// (Paste the FilterSidebar code here)
const FilterSidebar = ({
  filters,
  onFilterChange,
  categories = [],
  onClearFilters,
}: any) => {
  const pathname = usePathname();
  const [search, setSearch] = useState("");

  // Reset search when page changes
  useEffect(() => {
    setSearch("");
  }, [pathname]);

  const handleCheckboxChange = (category: string, value: string) => {
    const currentValues = filters[category] || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v: string) => v !== value)
      : [...currentValues, value];
    onFilterChange(category, newValues);
  };

  // Filter categories by search
  const filteredCategories = useMemo(() => {
    if (!search) return categories;
    return categories.filter((cat: string) =>
      cat.toLowerCase().includes(search.toLowerCase()),
    );
  }, [categories, search]);

  // Check if any filter is active
  const hasActiveFilters =
    (filters.categories?.length || 0) > 0 ||
    (filters.jobTypes?.length || 0) > 0;

  return (
    <div className="hidden lg:block space-y-8 pr-4">
      <div>
        <h3 className="font-bold text-xl text-gray-900 mb-6">Filter By</h3>

        {/* Category */}
        <div className="mb-6">
          <h4 className="text-sm font-bold text-gray-800 mb-3">Category</h4>

          {/* Search box */}
          <div className="mb-3 relative">
            <input
              type="text"
              placeholder="Search categories"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full text-xs p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#14A9F9]/30"
            />
          </div>

          <div className="space-y-2.5 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
            {filteredCategories.length > 0 ? (
              filteredCategories.map((cat: string) => (
                <label
                  key={cat}
                  className="flex items-center space-x-3 text-sm text-gray-600 cursor-pointer hover:text-[#14A9F9]"
                >
                  <input
                    type="checkbox"
                    checked={filters.categories?.includes(cat)}
                    onChange={() => handleCheckboxChange("categories", cat)}
                    className="rounded border-gray-300 text-[#14A9F9] w-4 h-4"
                  />
                  <span>{cat}</span>
                </label>
              ))
            ) : (
              <p className="text-xs text-gray-400">No categories found</p>
            )}
          </div>
        </div>

        {/* Job Type */}
        <div className="mb-6">
          <h4 className="text-sm font-bold text-gray-800 mb-3">Job Type</h4>
          <div className="space-y-2.5">
            {["hourly", "fixed"].map((type) => (
              <label
                key={type}
                className="flex items-center space-x-3 text-sm text-gray-600 cursor-pointer hover:text-[#14A9F9]"
              >
                <input
                  type="checkbox"
                  checked={filters.jobTypes?.includes(type)}
                  onChange={() => handleCheckboxChange("jobTypes", type)}
                  className="rounded border-gray-300 text-[#14A9F9] w-4 h-4"
                />
                <span>
                  {type === "hourly" ? "Hourly Price" : "Fixed Price"}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="w-full mt-4 py-2 text-sm font-medium text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition"
          >
            Clear Filters
          </button>
        )}
      </div>
    </div>
  );
};

// --- MAIN LAYOUT ---
interface ProjectLayoutProps {
  children: React.ReactNode;
  hideSidebars?: boolean;
  filters?: any;
  onFilterChange?: any;
  categories?: string[];
  onClearFilters?: () => void;
}

export default function ProjectLayout({
  children,
  hideSidebars = false,
  filters,
  onFilterChange,
  categories,
  onClearFilters,
}: ProjectLayoutProps) {
  const pathname = usePathname();

  // Tabs Configuration
  const tabs = [
    { label: "New Projects", path: "/projects" },
    { label: "Bookmarks", path: "/bookmark" }, // Changed path to match your folder structure
    { label: "Applied", path: "/applied" },
    { label: "Awarded", path: "/awarded" },
    { label: "Declined", path: "/declined" },
    { label: "Dispute", path: "/dispute" },
  ];

  return (
    <div className="bg-[#f9f9f9] min-h-screen font-sans pb-24">
      <div className="max-w-[1600px] mx-auto p-4 md:p-6 lg:p-8">
        {/* HEADER */}
        {/* We can hide the header search if viewing a proposal to give maximum space, or keep it. 
            Keeping it ensures consistent navigation context. */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Find Work</h1>
            <p className="text-gray-500 mt-1">
              Search for projects that fit your skills.
            </p>
          </div>
          {/*<div className="w-full md:w-auto relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search for jobs..."
              className="w-full md:w-96 pl-10 pr-4 py-2.5 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#14A9F9]/20 focus:border-[#14A9F9] transition-all bg-white"
            />
          </div> */}
        </div>

        {/* LAYOUT GRID */}
        <div
          className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-start ${
            hideSidebars ? "" : "h-[calc(100vh-180px)]"
          }`}
        >
          {/* LEFT SIDEBAR */}
          {!hideSidebars && (
            <div className="hidden lg:block lg:col-span-2.5 xl:col-span-2">
              <div className="sticky top-6">
                <FilterSidebar
                  filters={filters}
                  onFilterChange={onFilterChange}
                  categories={categories}
                  onClearFilters={onClearFilters}
                />
              </div>
            </div>
          )}

          {/* CENTER FEED */}
          <div
            className={`${
              hideSidebars ? "lg:col-span-12" : "lg:col-span-6.5 xl:col-span-7"
            } space-y-6 transition-all duration-300 ${
              hideSidebars ? "" : "h-full overflow-y-auto pr-2"
            }`}
          >
            {!hideSidebars && (
              <div className="bg-white rounded-xl border border-gray-200 p-1.5 flex overflow-x-auto no-scrollbar shadow-sm sticky top-0 z-10">
                {tabs.map((tab) => {
                  const isActive = pathname === tab.path;
                  return (
                    <Link
                      key={tab.path}
                      href={tab.path}
                      className={`flex-shrink-0 px-4 py-2.5 text-sm font-medium rounded-lg transition-all flex items-center gap-2 ${
                        isActive
                          ? "bg-[#14A9F9] text-white shadow-sm"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {tab.label}
                    </Link>
                  );
                })}
              </div>
            )}

            <div className="min-h-[500px]">{children}</div>
          </div>

          {/* RIGHT SIDEBAR */}
          {!hideSidebars && (
            <div className="lg:col-span-3 space-y-6 hidden lg:block">
              <div className="sticky top-6 space-y-6">
                <RelationshipManagerCard />

                <PromoBanner />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
