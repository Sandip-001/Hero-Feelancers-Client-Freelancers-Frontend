"use client";

import React, { useState } from "react";
import {
  MapPin,
  Calendar,
  Star,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Briefcase,
  ExternalLink,
  Globe,
  Twitter,
  Linkedin,
  DollarSign,
  TrendingUp,
  FileText,
  UserCheck,
  Edit,
  Facebook,
  IndianRupee,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useGetMeQuery } from "@/app/redux/api/auth.api";
import EditClientProfileModal from "@/components/layout/EditClientProfileModal";
import { formatMemberSince } from "@/lib/utils/formatMemberSince";
import { useGetMyClientWalletDetailsQuery } from "@/app/redux/api/clientWallet.api";
import { useGetClientJobsQuery } from "@/app/redux/api/jobs.api";
import { getStatusStyles } from "../project/page";
import Image from "next/image";

// --- Mock Data ---
const CLIENT_PROFILE = {
  name: "Jhon Doe",
  founder: "Alex Rivera",
  location: "San Francisco, CA",
  joinedDate: "January 2022",
  website: "https://heroFreelancer.io",
  industry: "Software Development",
  verification: "Payment Verified",
  rating: 0,
  reviewCount: 0,
  bio: "HeroFreelancer is a leading-edge software consultancy specializing in AI-driven B2B platforms. We prioritize high-quality code and long-term partnerships with elite freelancers. Our projects typically involve complex React architectures, Node.js microservices, and specialized UI/UX design systems.",
  stats: {
    totalSpent: "₹85L+",
    activeJobs: 4,
    totalHires: 58,
    hireRate: "0%",
  },
  socials: {
    twitter: "HeroFreelancer",
    linkedin: "HeroFreelancer-solutions",
  },
};

export default function ClientProfilePage() {
  const [activeTab, setActiveTab] = useState("overview");

  const { data } = useGetMeQuery();

  const { data: walletData } = useGetMyClientWalletDetailsQuery();

  const { data: jobs } = useGetClientJobsQuery();

  const [openEdit, setOpenEdit] = useState(false);

  const isIndia = data?.user?.countryName === "India";

  const CurrencyIcon = isIndia ? IndianRupee : DollarSign;

  const isAccountVerified = data?.user?.accountVerify === true;

  return (
    <>
      <div className="min-h-screen bg-slate-50/50 px-0 py-6 sm:px-6 lg:p-10 space-y-8 font-sans">
        <div className="max-w-7xl mx-auto">
          {/* --- PROFILE HEADER --- */}
          <div className="relative mb-8 px-4 sm:px-0">
            <Card className="border-none shadow-md overflow-hidden rounded-2xl">
              {/* Banner Background */}
              <div className="h-32 sm:h-48 bg-gradient-to-r from-yellow-500 to-amber-500 w-full" />

              <CardContent className="relative pt-0 pb-6 px-6">
                <div className="flex flex-col md:flex-row md:items-end -mt-12 md:-mt-16 gap-6">
                  {/* Avatar */}
                  <div className="relative shrink-0 mx-auto md:mx-0">
                    <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl bg-white p-1 shadow-xl">
                      <div className="w-full h-full rounded-xl overflow-hidden border border-slate-100 flex items-center justify-center bg-slate-100">
                        {data?.user?.profileImage ? (
                          <Image
                            src={data?.user?.profileImage}
                            alt={data?.user?.fullName || "Client"}
                            width={128}
                            height={128}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-indigo-600 font-bold text-3xl">
                            {data?.user?.fullName?.charAt(0)?.toUpperCase() ||
                              "U"}
                          </span>
                        )}
                      </div>
                    </div>

                    <div
                      className="absolute -bottom-1 -right-1 bg-emerald-500 p-1.5 rounded-full border-4 border-white shadow-lg"
                      title="Online"
                    >
                      <UserCheck className="w-3 h-3 text-white" />
                    </div>
                  </div>

                  {/* Info Area */}
                  <div className="flex-1 text-center md:text-left space-y-2">
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                      <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">
                        {data?.user?.fullName}
                      </h1>
                      <Badge
                        className={`px-3 py-1 shadow-none flex items-center gap-1 border
                        ${
                           isAccountVerified
                           ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                           : "bg-red-50 text-red-700 border-red-200"
                         }
                      `}
                      >
                        <ShieldCheck className="w-3.5 h-3.5" />
                        {isAccountVerified
                          ? "Payment Verified"
                          : "Not Verified"}
                      </Badge>
                    </div>

                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-y-2 gap-x-4 text-sm text-slate-500 font-medium">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4" /> {data?.user?.address}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" /> Joined{" "}
                        {formatMemberSince(data?.user?.createdAt)}
                      </span>
                      <span className="flex items-center gap-1.5 text-amber-500">
                        <Star className="w-4 h-4 fill-amber-500" />{" "}
                        {CLIENT_PROFILE.rating} ({CLIENT_PROFILE.reviewCount}{" "}
                        reviews)
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-center">
                    <Button
                      variant="outline"
                      className="rounded-xl border-slate-200"
                      onClick={() => setOpenEdit(true)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* --- MAIN CONTENT GRID --- */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 px-4 sm:px-0">
            {/* Left Column: Details & History */}
            <div className="lg:col-span-8 space-y-8">
              {/* KPI Stats Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <StatItem
                  icon={CurrencyIcon}
                  label="Total Spent"
                  value={walletData?.totalPayment || 0}
                  color="text-emerald-600 bg-emerald-50"
                />
                <StatItem
                  icon={Briefcase}
                  label="Active Jobs"
                  value={jobs?.total || 0}
                  color="text-indigo-600 bg-indigo-50"
                />
                <StatItem
                  icon={TrendingUp}
                  label="Hire Rate"
                  value={CLIENT_PROFILE.stats.hireRate}
                  color="text-blue-600 bg-blue-50"
                />
                <StatItem
                  icon={Clock}
                  label="Avg. Response"
                  value="0"
                  color="text-orange-600 bg-orange-50"
                />
              </div>

              {/* About Section */}
              <Card className="rounded-2xl border-slate-200 shadow-sm">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-indigo-600" /> About the
                    Company
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {data?.user?.companyAbout ||
                      "No company description provided yet."}
                  </p>
                </CardContent>
              </Card>

              {/* Job History Tabs */}
              <div className="space-y-4">
                <div className="flex items-center gap-6 border-b border-slate-200">
                  {["Recent History" /*"Open Jobs"*/].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab.toLowerCase())}
                      className={`pb-3 text-sm font-bold transition-all border-b-2 ${
                        activeTab === tab.toLowerCase()
                          ? "border-indigo-600 text-indigo-600"
                          : "border-transparent text-slate-500 hover:text-slate-700"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <div className="space-y-4">
                  {jobs?.data?.slice(0, 2).map((job: any) => (
                    <Card
                      key={job.id}
                      className="rounded-xl border-slate-200 shadow-sm hover:border-indigo-200 transition-colors"
                    >
                      <CardContent className="p-5">
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="font-bold text-slate-800 hover:text-indigo-600 cursor-pointer">
                            {job.title}
                          </h4>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold h-fit capitalize ${getStatusStyles(
                              job.status,
                            )}`}
                          >
                            {job.status.replace(/_/g, " ")}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-slate-500 font-medium mb-4">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" /> {job.createdAt}
                          </span>
                        </div>
                        {job.priceType && (
                          <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 italic text-sm text-slate-600">
                            "
                            {job.priceType === "fixed"
                              ? "Fixed Price"
                              : "Hourly Rate"}{" "}
                            - {job.projectValue}"
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Sidebar Details */}
            <div className="lg:col-span-4 space-y-6">
              <Card className="rounded-2xl border-slate-200 shadow-sm">
                <CardContent className="p-6 space-y-6">
                  <div>
                    <h3 className="font-bold text-slate-900 mb-4">
                      Verifications
                    </h3>
                    <ul className="space-y-3">
                      <VerificationItem
                        label="Email Address"
                        verified={data?.user?.isEmailVerified}
                      />

                      <VerificationItem
                        label="Phone Number"
                        verified={data?.user?.isEmailVerified}
                      />

                      <VerificationItem
                        label="Identity Verified"
                        verified={data?.user?.accountVeirfy}
                      />

                      <VerificationItem
                        label="Payment Method"
                        verified={data?.user?.accountVeirfy}
                      />
                    </ul>
                  </div>

                  <div className="pt-6 border-t border-slate-100">
                    <h3 className="font-bold text-slate-900 mb-4">
                      Company Details
                    </h3>
                    <div className="space-y-4">
                      <DetailRow
                        icon={Globe}
                        label="Website"
                        value={data?.user?.companyWebsite || "Not provided"}
                        link={data?.user?.companyWebsite}
                      />
                      <DetailRow
                        icon={Briefcase}
                        label="Industry"
                        value={data?.user?.companyName || "Not provided"}
                      />
                      <div className="flex items-center justify-between py-1">
                        <span className="flex items-center gap-2 text-slate-500 text-sm font-medium">
                          <Twitter className="w-4 h-4" /> Twitter
                        </span>
                        <a
                          href="#"
                          className="text-indigo-600 font-bold text-sm hover:underline"
                        >
                          {data?.user?.twitterUrl}
                        </a>
                      </div>
                      <div className="flex items-center justify-between py-1">
                        <span className="flex items-center gap-2 text-slate-500 text-sm font-medium">
                          <Linkedin className="w-4 h-4" /> LinkedIn
                        </span>
                        <a
                          href="#"
                          className="text-indigo-600 font-bold text-sm hover:underline"
                        >
                          {data?.user?.linkedinUrl}
                        </a>
                      </div>
                      <div className="flex items-center justify-between py-1">
                        <span className="flex items-center gap-2 text-slate-500 text-sm font-medium">
                          <Facebook className="w-4 h-4" /> Facebook
                        </span>
                        <a
                          href="#"
                          className="text-indigo-600 font-bold text-sm hover:underline"
                        >
                          {data?.user?.facebookUrl}
                        </a>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/*<div className="bg-indigo-900 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
                <div className="relative z-10">
                  <h4 className="font-bold text-lg mb-2">Invite to Job</h4>
                  <p className="text-indigo-200 text-sm mb-4">
                    Have a private project in mind? Direct hire this client's
                    preferred developers.
                  </p>
                  <Button
                    variant="secondary"
                    className="w-full bg-white text-indigo-900 hover:bg-indigo-50 font-bold"
                  >
                    Learn More
                  </Button>
                </div>
                <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-indigo-500/20 rounded-full blur-2xl" />
              </div>*/}
            </div>
          </div>
        </div>
      </div>

      <EditClientProfileModal
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        client={data?.user}
      />
    </>
  );
}

// --- SUB-COMPONENTS ---

function StatItem({ icon: Icon, label, value, color }: any) {
  return (
    <div
      className={`p-4 rounded-2xl flex flex-col items-center justify-center border border-transparent hover:border-slate-200 transition-all shadow-sm bg-white`}
    >
      <div className={`p-2 rounded-xl mb-2 ${color}`}>
        <Icon className="w-4 h-4" />
      </div>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
        {label}
      </p>
      <p className="text-xl font-black text-slate-900 mt-1">{value}</p>
    </div>
  );
}

function VerificationItem({
  label,
  verified,
}: {
  label: string;
  verified: boolean;
}) {
  return (
    <li className="flex items-center justify-between text-sm">
      <span className="text-slate-600 font-medium">{label}</span>
      {verified ? (
        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
      ) : (
        <Badge variant="outline" className="text-[10px] text-red-400">
          Not Verified
        </Badge>
      )}
    </li>
  );
}

function DetailRow({ icon: Icon, label, value, link }: any) {
  return (
    <div className="flex items-center justify-between py-1">
      <span className="flex items-center gap-2 text-slate-500 text-sm font-medium">
        <Icon className="w-4 h-4" /> {label}
      </span>
      {link ? (
        <a
          href={link}
          target="_blank"
          className="flex items-center gap-1 text-indigo-600 font-bold text-sm hover:underline"
        >
          {value} <ExternalLink className="w-3 h-3" />
        </a>
      ) : (
        <span className="text-slate-800 font-bold text-sm">{value}</span>
      )}
    </div>
  );
}
