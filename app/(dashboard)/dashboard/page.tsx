"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import {
  FileText, CheckCircle, Calendar, MoreVertical, Filter, Radio, Hourglass, FileCheck, Loader2, Briefcase, AlertCircle
} from "lucide-react";
import RightSidebar from "@/components/layout/rightsidebar";
import { useMemo } from "react";

// --- REDUX HOOKS ---
import { useGetMeQuery } from "@/app/redux/api/auth.api"; // 1. Import Auth Query
import { useGetMyProposalsQuery } from "@/app/redux/api/proposals.api";

// --- SVG Background Component ---
const WaveBackground = ({ color = "fill-white/10" }: { color?: string }) => (
  <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden rounded-2xl">
    <svg className={`absolute bottom-0 left-0 w-[120%] h-full ${color}`} viewBox="0 0 1440 320" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
    </svg>
  </div>
);

export default function DashboardPage() {
  // 2. Fetch Current User ID
  const { data: authData } = useGetMeQuery();
  const freelancerId = authData?.user?._id || authData?.user?.id;

  // 3. Pass ID to Query (skip if not loaded yet)
  const { data: proposals, isLoading, error } = useGetMyProposalsQuery(
    { freelancerId },
    { skip: !freelancerId }
  );

  // 4. Derive Stats & Projects from Proposals
  const { activeProjects, stats } = useMemo(() => {
    // Handle { data: [...] } structure if API returns it that way
    const list = Array.isArray(proposals) ? proposals : (proposals?.data || []);

    if (!list || list.length === 0) {
        return { 
            activeProjects: [], 
            stats: { live: 0, inProgress: 0, completed: 0, earnings: 0 } 
        };
    }

    // Filter for jobs where the proposal was 'Awarded' or 'Accepted'
    const active = list.filter((p: any) => p.status === 'Awarded' || p.status === 'Accepted');
    const completed = list.filter((p: any) => p.status === 'Completed');

    return {
        activeProjects: active.map((p: any) => ({
            id: p.jobId || p.job?._id,
            title: p.job?.title || "Untitled Project",
            clientName: "Client", // Placeholder if client name isn't in proposal
            category: p.job?.category || "Development",
            budget: `₹${p.proposedAmount || p.bidAmount || 0}`,
            delivery: p.duration || "TBD"
        })),
        stats: {
            live: active.length,
            inProgress: active.length,
            completed: completed.length,
            earnings: [...active, ...completed].reduce((acc: number, curr: any) => {
                const val = parseFloat((curr.proposedAmount || curr.bidAmount || "0").toString().replace(/[^0-9.]/g, '') || "0");
                return acc + val;
            }, 0)
        }
    };
  }, [proposals]);

  // Mock Invoices (Since no Invoice API exists yet)
  const invoices = [
    {
      id: 1,
      amount: "$137.00",
      status: "Approved",
      user: { name: "Erin Gonzales", avatar: "/images/rightsidebar/man.jpg" },
      invoiceNumber: "#5331",
      date: "20 May",
    },
    {
        id: 2,
        amount: "$450.00",
        status: "Pending",
        user: { name: "Michael Brown", avatar: "/images/rightsidebar/woman.jpg" },
        invoiceNumber: "#6242",
        date: "12 June",
    },
  ];

  return (
    <div className="flex bg-gray-50 min-h-screen p-3 xl:p-6 lg:pl-10">
      {/* MAIN CONTENT */}
      <div className="flex-1 xl:px-8 pb-24 xl:pr-[22rem] space-y-10">
        
        {/* Welcome Section */}
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">
            Welcome back!
          </h1>
          <p className="text-gray-500 mt-1 tracking-wide">
            Here's an overview of your active projects and earnings.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Live Projects Card */}
          <Card className="relative md:col-span-1 bg-[#6590FF] text-white rounded-2xl shadow-lg border-none overflow-hidden h-50">
            <WaveBackground color="fill-white/10" />
            <CardHeader className="relative z-10 pb-0 pt-6 px-6">
              <div className="flex flex-wrap gap-2 items-center justify-between">
                <span className="flex items-center gap-1 px-4 py-2 text-sm font-medium bg-white/20 rounded-md backdrop-blur-sm">
                  <Radio className="w-4 h-4" /> Live Projects
                </span>
                <Link href="/proposals"> 
                    <Button
                        variant="secondary"
                        className="bg-white/20 hover:bg-white/30 text-white text-xs px-4 py-2 h-auto rounded-md border-none backdrop-blur-md"
                    >
                        View All
                    </Button> 
                </Link>
              </div>
            </CardHeader>
            <CardContent className="relative z-10 pt-6 px-6">
              <h2 className="text-5xl font-bold leading-none">{stats.live}</h2>
              <p className="text-sm mt-3 opacity-90 font-medium">
                Active contracts running.
              </p>
            </CardContent>
          </Card>

          {/* In Progress Card */}
          <Card className="relative md:col-span-1 bg-[#65CAFF] text-white rounded-2xl shadow-lg border-none overflow-hidden h-50">
            <WaveBackground color="fill-white/10" />
            <CardHeader className="relative z-10 pb-0 pt-6 px-6">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-white/20 rounded-md backdrop-blur-sm">
                  <Hourglass className="w-4 h-4" /> Total Earnings
                </span>
              </div>
            </CardHeader>
            <CardContent className="relative z-10 pt-8 px-6">
              <h2 className="text-4xl font-bold leading-none">₹{stats.earnings.toLocaleString()}</h2>
              <p className="text-sm mt-3 opacity-90 font-medium">
                From active & completed jobs
              </p>
            </CardContent>
          </Card>

          {/* Completed Card */}
          <Card className="relative md:col-span-1 bg-[#AD65FF] text-white rounded-2xl shadow-lg border-none overflow-hidden h-50">
            <WaveBackground color="fill-white/10" />
            <CardHeader className="relative z-10 pb-0 pt-6 px-6">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-white/20 rounded-md backdrop-blur-sm">
                  <FileCheck className="w-4 h-4" /> Completed
                </span>
              </div>
            </CardHeader>
            <CardContent className="relative z-10 pt-8 px-6">
              <h2 className="text-5xl font-bold leading-none">{stats.completed}</h2>
              <p className="text-sm mt-3 opacity-90 font-medium">
                Successfully delivered projects
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Current Projects Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Current Projects
            </h2>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <p className="text-sm text-gray-500 mb-4">
            Projects you have been awarded and are currently working on.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {isLoading ? (
                <div className="col-span-3 flex justify-center py-10">
                    <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
                </div>
            ) : error ? (
                <div className="col-span-3 text-center py-10 text-red-500 bg-white rounded-xl border border-red-100">
                    <AlertCircle className="w-8 h-8 mx-auto mb-2" />
                    <p>Failed to load projects.</p>
                </div>
            ) : activeProjects.length > 0 ? (
                activeProjects.map((project: any) => (
                <Card
                    key={project.id}
                    className="shadow-sm hover:shadow-md transition bg-white"
                >
                    <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-semibold line-clamp-1" title={project.title}>
                        {project.title}
                    </CardTitle>
                    <p className="text-xs text-gray-500">{project.clientName} • {project.category}</p>
                    </CardHeader>

                    <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-gray-700">
                        <span className="font-bold text-indigo-600">{project.budget}</span>
                        <span className="flex items-center text-gray-600 text-xs">
                        <Calendar className="h-3 w-3 mr-1" /> Due: {project.delivery}
                        </span>
                    </div>

                    <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500">Progress</span>
                        <span className="font-medium">25%</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-[#6590FF] rounded-full"
                            style={{ width: `25%` }}
                        />
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                        <div className="flex -space-x-2">
                            {/* Placeholder Avatars since API might not return team members yet */}
                            <Avatar className="h-7 w-7 border-2 border-white bg-indigo-100 text-indigo-600 text-[10px] flex items-center justify-center font-bold">
                                {(project.clientName || "C")[0]}
                            </Avatar>
                        </div>

                        <Link href="/proposals">
                            <Button size="sm" className="bg-[#14A9F9] hover:bg-blue-700">Details</Button>
                        </Link>
                    </div>
                    </CardContent>
                </Card>
                ))
            ) : (
                <div className="col-span-3 py-12 text-center bg-white rounded-xl border border-dashed border-gray-300 text-gray-500">
                    <Briefcase className="w-10 h-10 mx-auto mb-3 text-gray-300" />
                    <p>No active projects found.</p>
                    <Link href="/projects" className="text-indigo-600 text-sm font-bold hover:underline mt-2 inline-block">Find Work</Link>
                </div>
            )}
          </div>
        </div>

        {/* Pending Invoice (Mock Data for UI Completeness) */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            Recent Invoices
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            Payment status for your recent work
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {invoices.map((item) => (
              <Card
                key={item.id}
                className="shadow-sm hover:shadow-md transition border bg-white"
              >
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-gray-900">
                    {item.amount}
                  </div>
                  <p className="text-sm text-gray-500 mb-4">Amount</p>

                  <Badge
                    className={`${
                      item.status === "Approved"
                        ? "bg-green-100 text-green-700 hover:bg-green-100"
                        : item.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-100"
                        : "bg-gray-100 text-gray-700"
                    } border-none px-3 py-1`}
                  >
                    {item.status}
                  </Badge>

                  <div className="flex items-center gap-3 mt-5 pt-4 border-t">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={item.user.avatar}
                        alt={item.user.name}
                      />
                      <AvatarFallback>
                        {item.user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                      <p className="text-sm font-medium">{item.user.name}</p>
                      <p className="text-xs text-gray-500">
                        {item.invoiceNumber} · Date: {item.date}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT SIDEBAR */}
      <RightSidebar />
    </div>
  );
}