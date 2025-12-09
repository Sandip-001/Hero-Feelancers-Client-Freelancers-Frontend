"use client"

import { Search, Bell, MessageSquare, ChevronRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import DashboardLayout from "./dashboard-layout"

interface HeaderProps {
  userName?: string
  userRole?: string
  userImage?: string
  collapsed: boolean // 1. Add this new prop
}

export function Header({ 
  userName = "Bhim", 
  userRole = "Vendor", 
  userImage, 
  collapsed // Destructure the new prop
}: HeaderProps) {
  return (
    <header 

      className={`fixed right-0 top-0 z-30 h-16 border-b bg-white transition-all duration-300 ease-in-out ${
        collapsed ? "left-[80px]" : "left-[285px]"
      }`}
    >
      <div className="flex h-full items-center justify-between px-6">
        {/* Search */}
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              type="search"
              placeholder="search for projects"
              className="pl-10 bg-gray-50 border-gray-200"
            />
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-4">
          {/* Post Project Button */}
          <Button className="bg-green-500 hover:bg-green-600">
            Post Project
          </Button>

          {/* Notifications */}
          <div className="relative">
            <Link href="/notifications">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
                3
              </span>
            </Button>
            </Link>
          </div>

          {/* Messages */}
          <div className="relative">
            <Link href="/workstreams">
            <Button variant="ghost" size="icon" className="relative">
              <MessageSquare className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
                5
              </span>
            </Button>
            </Link>
          </div>

          {/* User Profile */}
          <div className="flex items-center space-x-3 pl-4 border-l">
            <Avatar>
              <AvatarImage src={userImage} alt={userName} />
              <AvatarFallback>{userName.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-semibold">{userName}</span>
              <span className="text-xs text-gray-500">{userRole}</span>
            </div>
            <ChevronRight className="h-4 w-4 text-gray-400" />
          </div>
        </div>
      </div>
    </header>
  )
}