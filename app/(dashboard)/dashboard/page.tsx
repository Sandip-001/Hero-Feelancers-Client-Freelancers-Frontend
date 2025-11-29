"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  FileText,
  DollarSign,
  CheckCircle,
  Calendar,
  MoreVertical,
  Filter,
} from "lucide-react";
import RightSidebar from "@/components/layout/rightsidebar";

const cards = [
  {
    id: 1,
    title: "Construction Project",
    property: "Property A",
    price: "$100 - $800",
    deadline: "25 May",
    progress: 75,
    avatars: [
      "/images/rightsidebar/man.png",
      "/images/rightsidebar/woman.png",
      "/images/rightsidebar/man.png",
    ],
  },

  {
    id: 2,
    title: "Bridge Renovation",
    property: "Property B",
    price: "$200 - $900",
    deadline: "10 June",
    progress: 60,
    avatars: [
      "/images/rightsidebar/woman.png",
      "/images/rightsidebar/man.png",
      "/images/rightsidebar/woman.png",
    ],
  },

  {
    id: 3,
    title: "Road Expansion",
    property: "Property C",
    price: "$150 - $650",
    deadline: "30 April",
    progress: 40,
    avatars: [
      "/images/rightsidebar/man.png",
      "/images/rightsidebar/man.png",
      "/images/rightsidebar/woman.png",
    ],
  },
];

const invoices = [
  {
    id: 1,
    amount: "$137.00",
    status: "Approved",
    user: {
      name: "Erin Gonzales",
      avatar: "/images/rightsidebar/man.png",
    },
    invoiceNumber: "#5331",
    date: "20 May",
  },

  {
    id: 2,
    amount: "$220.00",
    status: "Pending",
    user: {
      name: "Michael Brown",
      avatar: "/images/rightsidebar/woman.png",
    },
    invoiceNumber: "#6242",
    date: "12 June",
  },

  {
    id: 3,
    amount: "$89.50",
    status: "Pending",
    user: {
      name: "Sarah Watson",
      avatar: "/images/rightsidebar/man2.png",
    },
    invoiceNumber: "#7120",
    date: "08 May",
  },
];

export default function DashboardPage() {
  return (
    <div className="flex">
      {/* MAIN CONTENT */}
      <div className="flex-1 px-8 py-6 pt-16 pr-[22rem] space-y-10">
        {/* Welcome Section */}
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">
            Welcome back, Bhim!
          </h1>
          <p className="text-gray-500 mt-1 tracking-wide">
            Have a look at the Quick Progress Bar.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Live Projects */}
          <Card className="relative bg-[#6590FF] text-white rounded-2xl shadow-lg border-none overflow-hidden">
            <CardHeader className="pb-0">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 text-xs bg-[#6481CE] rounded-md backdrop-blur-sm">
                  Live projects
                </span>

                <Button
                  variant="outline"
                  className="text-black bg-[#6481CE] text-xs px-3 py-1 h-auto rounded-md border-none"
                >
                  View All
                </Button>
              </div>
            </CardHeader>

            <CardContent className="pt-4">
              <h2 className="text-4xl font-bold leading-none">5</h2>
              <p className="text-xs mt-2 opacity-80">
                Currently, the projects is in progress.
              </p>
            </CardContent>
          </Card>

          {/* Earnings Card */}
          <Card className="relative bg-[#65CAFF] text-white rounded-2xl shadow-lg border-none ">
            <CardHeader className="pb-0">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 text-xs bg-[#64a9CE] rounded-md backdrop-blur-sm">
                  In Progress
                </span>
              </div>
            </CardHeader>

            <CardContent className="pt-4">
              <h2 className="text-4xl font-bold leading-none">$12400</h2>
              <p className="text-xs mt-2 opacity-80">Earnings (Month)</p>
            </CardContent>
          </Card>

          {/* Completed Projects */}
          <Card className="relative bg-[#AD65FF] text-white rounded-2xl shadow-lg border-none overflow-hidden">
            <CardHeader className="pb-0">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 text-xs bg-[#9664CE] rounded-md backdrop-blur-sm">
                  Completed
                </span>
              </div>
            </CardHeader>

            <CardContent className="pt-4">
              <h2 className="text-4xl font-bold leading-none">24</h2>
              <p className="text-xs mt-2 opacity-80">Completed projects</p>
            </CardContent>
          </Card>
        </div>

        {/* Current Projects */}
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
            Projects that are currently in progress
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cards.map((card) => (
              <Card
                key={card.id}
                className="shadow-sm hover:shadow-md transition"
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-semibold">
                    {card.title}
                  </CardTitle>
                  <p className="text-xs text-gray-500">{card.property}</p>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-gray-700">
                    <span>{card.price}</span>
                    <span className="flex items-center text-gray-600">
                      <Calendar className="h-4 w-4 mr-1" /> Deadline -{" "}
                      {card.deadline}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">Progress</span>
                      <span className="font-medium">{card.progress}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${card.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex -space-x-2">
                      {card.avatars.map((src, index) => (
                        <Avatar
                          key={index}
                          className="h-7 w-7 border-2 border-white"
                        >
                          <AvatarImage src={src} alt="Team member" />
                          <AvatarFallback>A</AvatarFallback>
                        </Avatar>
                      ))}
                    </div>

                    <Button size="sm">View</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Pending Invoice */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            Pending Invoice
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            Invoices that are currently pending
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {invoices.map((item) => (
              <Card
                key={item.id}
                className="shadow-sm hover:shadow-md transition border"
              >
                <CardContent className="p-6">
                  {/* Amount */}
                  <div className="text-3xl font-bold text-gray-900">
                    {item.amount}
                  </div>
                  <p className="text-sm text-gray-500 mb-4">Amount</p>

                  {/* Status Badge */}
                  <Badge
                    variant={
                      item.status === "Approved"
                        ? "success"
                        : item.status === "Pending"
                        ? "secondary"
                        : "outline"
                    }
                  >
                    {item.status}
                  </Badge>

                  {/* User Details */}
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
