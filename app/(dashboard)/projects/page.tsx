"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DollarSign, Calendar, Star } from "lucide-react"

const projects = [
  {
    id: 1,
    title: "CAB APP DEVELOPMENT",
    category: "FLUTTER",
    description:
      "I will design UI UX for mobile app with figma for ios Adarsh Group is venturing into homes Inspired by the millennial generation- Adarsh Greens, offering new Lifestyle, with the same Trust, Quality & Consistency.....",
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
      "I will design UI UX for mobile app with figma for ios Adarsh Group is venturing into homes Inspired by the millennial generation- Adarsh Greens, offering new Lifestyle, with the same Trust, Quality & Consistency.....",
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
]

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState("new")

  return (
    <div className="p-8 pt-16">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Your projects</h1>
        <p className="text-gray-500 mt-1">Here is a list of all the projects on which you have been working.</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="new">New Project</TabsTrigger>
          <TabsTrigger value="bookmarks">Bookmarks</TabsTrigger>
          <TabsTrigger value="applied">Applied</TabsTrigger>
          <TabsTrigger value="awarded">Awarded</TabsTrigger>
          <TabsTrigger value="declined">Declined</TabsTrigger>
          <TabsTrigger value="dispute">Dispute</TabsTrigger>
        </TabsList>

        <TabsContent value="new" className="space-y-6">
          {projects
            .filter((p) => p.status === "Pending")
            .map((project) => (
              <Card key={project.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">{project.title}</CardTitle>
                      <Badge variant="outline" className="mt-2">
                        {project.category}
                      </Badge>
                    </div>
                    <span className="text-sm text-gray-500">{project.proposals} Proposals</span>
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
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center space-x-4">
                      <span className="text-sm font-medium">${project.budget.replace("$", "")}</span>
                      <span className="text-sm text-gray-500">Amount</span>
                      <Badge variant="pending">Pending</Badge>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline">Send Message</Button>
                      <Button>View Your apply</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </TabsContent>

        <TabsContent value="applied" className="space-y-6">
          {projects
            .filter((p) => p.status === "Pending")
            .map((project) => (
              <Card key={project.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">{project.title}</CardTitle>
                      <Badge variant="outline" className="mt-2">
                        {project.category}
                      </Badge>
                    </div>
                    <span className="text-sm text-gray-500">{project.proposals} Proposals</span>
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
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center space-x-4">
                      <span className="text-sm font-medium">${project.budget.replace("$", "")}</span>
                      <span className="text-sm text-gray-500">Amount</span>
                      <Badge variant="pending">Pending</Badge>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline">Send Message</Button>
                      <Button>View Your apply</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </TabsContent>

       <TabsContent value="awarded" className="space-y-6">
  {projects
    .filter((p) => p.status === "Awarded")
    .map((project) => {
      const [showMilestones, setShowMilestones] = useState(false)

      return (
        <div key={project.id} className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                  <Badge variant="outline" className="mt-2">
                    {project.category}
                  </Badge>
                </div>
                <span className="text-sm text-gray-500">{project.proposals} Proposals</span>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">{project.description}</p>

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
                  {showMilestones ? "Hide Payment Details" : "Check Payment Details"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* SHOW MILESTONES ONLY WHEN TOGGLED */}
          {showMilestones && project.milestones && (
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {project.milestones.map((milestone, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-4 rounded-lg ${
                        milestone.completed
                          ? "bg-green-100 border-2 border-green-500"
                          : "bg-red-100 border-2 border-red-400"
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="h-3 w-3 rounded-full bg-gray-400" />
                        <div>
                          <h4
                            className={`font-semibold ${
                              milestone.completed ? "text-green-800" : "text-red-800"
                            }`}
                          >
                            {milestone.name}
                          </h4>
                          <p
                            className={`text-sm ${
                              milestone.completed ? "text-green-700" : "text-red-700"
                            }`}
                          >
                            {milestone.description}
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <p
                          className={`font-semibold ${
                            milestone.completed ? "text-green-800" : "text-red-800"
                          }`}
                        >
                          {milestone.amount}
                        </p>
                        <p
                          className={`text-sm ${
                            milestone.completed ? "text-green-700" : "text-red-700"
                          }`}
                        >
                          {milestone.date}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )
    })}
</TabsContent>


        <TabsContent value="declined" className="flex flex-col items-center justify-center py-20">
          <div className="text-center">
            <div className="inline-block p-8 bg-blue-50 rounded-full mb-4">
              <div className="text-6xl">📋</div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">NO DATA</h3>
            <p className="text-gray-500">You don't have any declined projects</p>
          </div>
        </TabsContent>

        <TabsContent value="dispute" className="flex flex-col items-center justify-center py-20">
          <div className="text-center">
            <div className="inline-block p-8 bg-blue-50 rounded-full mb-4">
              <div className="text-6xl">📋</div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">NO DATA</h3>
            <p className="text-gray-500">You don't have any projects in dispute</p>
          </div>
        </TabsContent>

        <TabsContent value="bookmarks" className="flex flex-col items-center justify-center py-20">
          <div className="text-center">
            <div className="inline-block p-8 bg-blue-50 rounded-full mb-4">
              <div className="text-6xl">⭐</div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">NO DATA</h3>
            <p className="text-gray-500">You haven't bookmarked any projects yet</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
