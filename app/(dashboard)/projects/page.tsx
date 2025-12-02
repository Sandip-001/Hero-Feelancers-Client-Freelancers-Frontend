"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DollarSign, Calendar, Star, Filter } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "CAB APP DEVELOPMENT",
    category: "FLUTTER",
    description:
      "I will design UI UX for mobile app with figma for ios Adarsh Group is venturing into homes Inspired by the millennial generation...",
    budget: "$4500",
    dateRange: "22-01-22 to 22-01-22",
    proposals: 12,
    status: "Pending",
    closed: null,
    rating: null,
    milestones: null,
  },
  {
    id: 2,
    title: "CAB APP DEVELOPMENT",
    category: "FLUTTER",
    description:
      "I will design UI UX for mobile app with figma for ios Adarsh Group is venturing into homes Inspired by the millennial generation...",
    budget: "$4500",
    dateRange: "22-01-22 to 22-01-22",
    proposals: 12,
    status: "Awarded",
    closed: "12.05.2025",
    rating: 5,
    milestones: [
      {
        name: "1st Milestone",
        description: "Application Front-end Complete",
        amount: "$1,000",
        date: "31th June",
        completed: true,
      },
      {
        name: "2nd Milestone",
        description: "Admin Dashboard Front-end Complete",
        amount: "$1,000",
        date: "31th July",
        completed: true,
      },
      {
        name: "3rd Milestone",
        description: "Back-end Complete",
        amount: "$1,000",
        date: "7th August",
        completed: true,
      },
      {
        name: "4th Milestone",
        description: "API Implementation Complete",
        amount: "$1,000",
        date: "31th August",
        completed: false,
      },
    ],
  },
];

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState("new");
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    budget: "",
    status: "",
  });
  const [showFilterPanel, setShowFilterPanel] = useState(false);

  const handleFilterChange = (key: string, value: string) => {
    setFilters({ ...filters, [key]: value });
  };

  const getFilteredProjects = (statusFilter: string) => {
    return projects
      .filter((p) => (statusFilter ? p.status === statusFilter : true))
      .filter((p) =>
        p.title.toLowerCase().includes(filters.search.toLowerCase())
      )
      .filter((p) =>
        filters.category ? p.category === filters.category : true
      )
      .filter((p) => {
        if (!filters.budget) return true;
        return Number(p.budget.replace("$", "")) <= Number(filters.budget);
      });
  };

  return (
    <div className="p-8 pt-16 relative">
      {/* ---------------- HEADER ---------------- */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Your projects</h1>
          <p className="text-gray-500 mt-1">
            Here is a list of all the projects on which you have been working.
          </p>
        </div>

        {/* ---------------- FILTER ICON ---------------- */}
        <div className="relative">
          <Button
            variant="outline"
            className="flex items-center space-x-2"
            onClick={() => setShowFilterPanel(!showFilterPanel)}
          >
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </Button>

          {showFilterPanel && (
            <div className="absolute right-0 mt-2 w-72 bg-white shadow-lg border rounded-lg p-4 z-50">
              <h2 className="font-semibold mb-3">Filter Projects</h2>

              <div className="space-y-3">
                {/* Search */}
                <div>
                  <label className="text-sm font-medium">Search</label>
                  <input
                    type="text"
                    placeholder="Search project..."
                    value={filters.search}
                    onChange={(e) =>
                      handleFilterChange("search", e.target.value)
                    }
                    className="w-full mt-1 px-3 py-2 border rounded-md"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="text-sm font-medium">Category</label>
                  <select
                    value={filters.category}
                    onChange={(e) =>
                      handleFilterChange("category", e.target.value)
                    }
                    className="w-full mt-1 px-3 py-2 border rounded-md"
                  >
                    <option value="">All</option>
                    <option value="FLUTTER">Flutter</option>
                    <option value="REACT">React</option>
                    <option value="FIGMA">Figma</option>
                  </select>
                </div>

                {/* Budget */}
                <div>
                  <label className="text-sm font-medium">Budget</label>
                  <select
                    value={filters.budget}
                    onChange={(e) =>
                      handleFilterChange("budget", e.target.value)
                    }
                    className="w-full mt-1 px-3 py-2 border rounded-md"
                  >
                    <option value="">Any</option>
                    <option value="1000">Below $1000</option>
                    <option value="5000">Below $5000</option>
                    <option value="10000">Below $10000</option>
                  </select>
                </div>

                {/* Status */}
                <div>
                  <label className="text-sm font-medium">Status</label>
                  <select
                    value={filters.status}
                    onChange={(e) =>
                      handleFilterChange("status", e.target.value)
                    }
                    className="w-full mt-1 px-3 py-2 border rounded-md"
                  >
                    <option value="">All</option>
                    <option value="Pending">Pending</option>
                    <option value="Awarded">Awarded</option>
                    <option value="Declined">Declined</option>
                  </select>
                </div>

                {/* Apply Button */}
                <div className="flex justify-end mt-2">
                  <Button
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={() => setShowFilterPanel(false)}
                  >
                    Apply
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ---------------- TABS ---------------- */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="border-b mb-4 bg-transparent shadow-none">
          <TabsTrigger value="new"
           className="relative background-none px-3 py-2 text-gray-600 font-medium after:absolute after:-bottom-0.5 after:left-0 after:w-0 after:h-0.5 after:bg-green-500 after:transition-all data-[state=active]:after:w-full data-[state=active]:text-green-600 bg-transparent shadow-none">New Project</TabsTrigger>
          <TabsTrigger value="bookmarks" className="relative background-none px-3 py-2 text-gray-600 font-medium after:absolute after:-bottom-0.5 after:left-0 after:w-0 after:h-0.5 after:bg-green-500 after:transition-all data-[state=active]:after:w-full data-[state=active]:text-green-600 bg-transparent shadow-none" >Bookmarks</TabsTrigger>
          <TabsTrigger value="applied" className="relative background-none px-3 py-2 text-gray-600 font-medium after:absolute after:-bottom-0.5 after:left-0 after:w-0 after:h-0.5 after:bg-green-500 after:transition-all data-[state=active]:after:w-full data-[state=active]:text-green-600 bg-transparent shadow-none" >Applied</TabsTrigger>
          <TabsTrigger value="awarded" className="relative background-none px-3 py-2 text-gray-600 font-medium after:absolute after:-bottom-0.5 after:left-0 after:w-0 after:h-0.5 after:bg-green-500 after:transition-all data-[state=active]:after:w-full data-[state=active]:text-green-600 bg-transparent shadow-none" >Awarded</TabsTrigger>
          <TabsTrigger value="declined" className="relative background-none px-3 py-2 text-gray-600 font-medium after:absolute after:-bottom-0.5 after:left-0 after:w-0 after:h-0.5 after:bg-green-500 after:transition-all data-[state=active]:after:w-full data-[state=active]:text-green-600 bg-transparent shadow-none" >Declined</TabsTrigger>
          <TabsTrigger value="dispute" className="relative background-none px-3 py-2 text-gray-600 font-medium after:absolute after:-bottom-0.5 after:left-0 after:w-0 after:h-0.5 after:bg-green-500 after:transition-all data-[state=active]:after:w-full data-[state=active]:text-green-600 bg-transparent shadow-none" >Dispute</TabsTrigger>
        </TabsList>

        {/* ---------------- NEW PROJECT TAB ---------------- */}
        <TabsContent value="new" className="space-y-6 bg-transparent shadow-none p-0">
          {getFilteredProjects("Pending").length ? (
            getFilteredProjects("Pending").map((project) => (
              <Card key={project.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">{project.title}</CardTitle>
                      <Badge variant="outline" className="mt-2">
                        {project.category}
                      </Badge>
                    </div>
                    <span className="text-sm text-gray-500">
                      {project.proposals} Proposals
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600">{project.description}</p>
                  <div className="flex items-center space-x-6 text-sm">
                    <div className="flex items-center text-gray-600">
                      <DollarSign className="h-4 w-4 mr-1" />
                      {project.budget}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Calendar className="h-4 w-4 mr-1" />
                      {project.dateRange}
                    </div>
                    <Badge variant="pending">{project.status}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-20 text-gray-500">
              No projects found.
            </div>
          )}
        </TabsContent>

        {/* ---------------- AWARDED TAB ---------------- */}
        <TabsContent value="awarded" className="space-y-6">
          {getFilteredProjects("Awarded").length ? (
            getFilteredProjects("Awarded").map((project) => {
              const [showMilestones, setShowMilestones] = useState(false);
              return (
                <div key={project.id} className="space-y-6">
                  <Card>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-xl">
                            {project.title}
                          </CardTitle>
                          <Badge variant="outline" className="mt-2">
                            {project.category}
                          </Badge>
                        </div>
                        <span className="text-sm text-gray-500">
                          {project.proposals} Proposals
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-gray-600">
                        {project.description}
                      </p>
                      <div className="flex items-center space-x-6 text-sm">
                        <div className="flex items-center text-gray-600">
                          <Calendar className="h-4 w-4 mr-1" />
                          Closed - {project.closed}
                        </div>
                        <div className="flex items-center text-yellow-500">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-current" />
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t">
                        <Button variant="outline">Send Message</Button>
                        <Button
                          className="bg-green-500 hover:bg-green-600"
                          onClick={() => setShowMilestones(!showMilestones)}
                        >
                          {showMilestones
                            ? "Hide Payment Details"
                            : "Check Payment Details"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* ------------------------- MILESTONES TIMELINE ------------------------- */}
                  {showMilestones && project.milestones && (
                    <Card>
                      <CardContent className="p-6 relative">
                        {/* Vertical line */}
                        <div
                          className="absolute left-12 top-4 bottom-4 w-1"
                          style={{
                            background: `linear-gradient(to bottom, ${project.milestones
                              .map((m) => (m.completed ? "#22c55e" : "#ef4444"))
                              .join(", ")})`,
                          }}
                        ></div>

                        <div className="flex flex-col space-y-8">
                          {project.milestones.map((m, index) => (
                            <div key={index} className="relative pl-12">
                              {/* Circle */}
                              <div
                                className={`absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 rounded-full border-2`}
                                style={{
                                  backgroundColor: m.completed
                                    ? "#22c55e"
                                    : "#ef4444",
                                  borderColor: m.completed
                                    ? "#15803d"
                                    : "#b91c1c",
                                }}
                              ></div>

                              {/* Milestone Card */}
                              <div
                                className={`flex flex-col w-full p-4 rounded-lg border`}
                                style={{
                                  backgroundColor: m.completed
                                    ? "#dcfce7"
                                    : "#fee2e2",
                                  borderColor: m.completed
                                    ? "#22c55e"
                                    : "#ef4444",
                                }}
                              >
                                <div className="flex items-center justify-between">
                                  <h4
                                    className="font-semibold"
                                    style={{
                                      color: m.completed
                                        ? "#15803d"
                                        : "#b91c1c",
                                    }}
                                  >
                                    {m.name}
                                  </h4>
                                  <p
                                    className="font-semibold"
                                    style={{
                                      color: m.completed
                                        ? "#15803d"
                                        : "#b91c1c",
                                    }}
                                  >
                                    {m.amount}
                                  </p>
                                </div>
                                <p
                                  className="text-sm mt-1"
                                  style={{
                                    color: m.completed ? "#166534" : "#b91c1c",
                                  }}
                                >
                                  {m.description}
                                </p>
                                <p
                                  className="text-xs mt-1"
                                  style={{
                                    color: m.completed ? "#15803d" : "#b91c1c",
                                  }}
                                >
                                  {m.date}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-20 text-gray-500">
              No projects found.
            </div>
          )}
        </TabsContent>

        {/* ---------------- OTHER TABS ---------------- */}
        {["declined", "dispute", "bookmarks", "applied"].map((tab) => (
          <TabsContent
            key={tab}
            value={tab}
           className="flex flex-col items-center justify-center py-20 "
          >
            <div className="text-center">
              <h3 className="text-2xl font-bold">NO DATA</h3>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
