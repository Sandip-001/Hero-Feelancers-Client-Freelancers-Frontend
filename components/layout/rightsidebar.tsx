"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, MoreVertical, Plus } from "lucide-react";

export default function RightSidebar() {
  // State for collapsible sections
  const [showTodaysMeetings, setShowTodaysMeetings] = useState(true);
  const [showScheduleMeetings, setShowScheduleMeetings] = useState(false);
  const [showRecentActivity, setShowRecentActivity] = useState(true);

  return (
    <aside
      className="
        hidden          /* Hidden by default on mobile/tablet */
        xl:block        /* Visible only on Extra Large screens */
        fixed 
        top-0 
        right-0 
        h-full 
        w-[22rem]            /* w-80 = 20rem, matching the dashboard padding */
        border-l 
        bg-white 
        px-5 
        pt-6
        overflow-y-auto
        z-20
      "
    >
      {/* -------------- UPCOMING MEETING HEADER -------------- */}
      <div className="flex items-center justify-between mb-2 mt-14">
        <h2 className="text-sm font-semibold">Upcoming Meeting</h2>
        <button className="text-gray-500 hover:text-gray-700">
          <MoreVertical className="h-4 w-4" />
        </button>
      </div>
      <hr className="mb-4" />

      {/* -------------- TODAY’S MEETINGS SECTION -------------- */}
      <div>
        <button 
          onClick={() => setShowTodaysMeetings(!showTodaysMeetings)}
          className="flex items-center justify-between w-full text-xs text-gray-400 mb-2 hover:text-gray-600 transition-colors"
        >
          <span>Today's Meetings</span>
          <div className="flex items-center space-x-2">
            {showTodaysMeetings ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </div>
        </button>

        {/* Collapsible Content */}
        {showTodaysMeetings && (
          <div className="animate-in slide-in-from-top-2 duration-200">
            {/* MEETING 1 */}
            <div className="p-3 border rounded-lg bg-gray-50 mb-3 relative">
              <MoreVertical className="h-4 w-4 text-gray-500 absolute top-3 right-3 cursor-pointer hover:text-gray-700" />

              <p className="text-[10px] text-blue-600 mb-1">30 mins call with clients</p>
              <p className="text-sm font-semibold">Project Discovery Call</p>
              <p className="text-[11px] text-gray-500 mb-2">
                Due soon: <span className="font-medium">09:20 AM</span>
              </p>

              <div className="flex items-center justify-between">
                <div className="flex -space-x-3">
                  <Avatar className="h-9 w-9 border-2 border-white">
                    <AvatarImage src="/images/rightsidebar/man.jpg" alt="Man" />
                    <AvatarFallback>M</AvatarFallback>
                  </Avatar>
                  <Avatar className="h-9 w-9 border-2 border-white">
                    <AvatarImage src="/images/rightsidebar/woman.jpg" alt="Woman" />
                    <AvatarFallback>W</AvatarFallback>
                  </Avatar>
                  <Avatar className="h-9 w-9 border-2 border-white">
                    <AvatarImage src="/images/rightsidebar/man.jpg" alt="Another" />
                    <AvatarFallback>A</AvatarFallback>
                  </Avatar>
                  <div className="h-9 w-9 pl-1 flex items-center justify-center rounded-full border-2 border-gray-300 bg-white text-sm font-semibold text-gray-500">
                    5+
                  </div>
                </div>
                <Button className="bg-[#14A9F9] hover:bg-blue-600 text-xs px-3 py-1 h-7">
                  <Plus className="w-4 h-4 mr-1"/>Invite
                </Button>
              </div>
            </div>

            {/* MEETING 2 */}
            <div className="p-3 border rounded-lg bg-gray-50 mb-3 relative">
              <MoreVertical className="h-4 w-4 text-gray-500 absolute top-3 right-3 cursor-pointer hover:text-gray-700" />

              <p className="text-[10px] text-blue-600 mb-1">30 mins call with clients</p>
              <p className="text-sm font-semibold">Project Discovery Call</p>
              <p className="text-[11px] text-gray-500 mb-2">
                Due soon: <span className="font-medium">09:20 AM</span>
              </p>

              <div className="flex items-center justify-between">
                <div className="flex -space-x-3">
                  <Avatar className="h-9 w-9 border-2 border-white">
                    <AvatarImage src="/images/rightsidebar/man.jpg" alt="Man" />
                    <AvatarFallback>M</AvatarFallback>
                  </Avatar>
                  <Avatar className="h-9 w-9 border-2 border-white">
                    <AvatarImage src="/images/rightsidebar/woman.jpg" alt="Woman" />
                    <AvatarFallback>W</AvatarFallback>
                  </Avatar>
                  <Avatar className="h-9 w-9 border-2 border-white">
                    <AvatarImage src="/images/rightsidebar/man.jpg" alt="Another" />
                    <AvatarFallback>A</AvatarFallback>
                  </Avatar>
                  <div className="h-9 w-9 pl-1 flex items-center justify-center rounded-full border-2 border-gray-300 bg-white text-sm font-semibold text-gray-500">
                    5+
                  </div>
                </div>
                <Button className="bg-[#14A9F9] hover:bg-blue-600 text-xs px-3 py-1 h-7">
                   <Plus className="w-4 h-4 mr-1"/>Invite
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* -------------- SCHEDULE MEETINGS SECTION -------------- */}
      <div className="mt-4">
        <button 
          onClick={() => setShowScheduleMeetings(!showScheduleMeetings)}
          className="flex items-center justify-between w-full mb-2"
        >
          <h2 className="text-sm font-semibold">Schedule Meetings</h2>
          <div className="flex space-x-2 text-gray-500 hover:text-gray-700">
            {showScheduleMeetings ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </div>
        </button>
        <hr className="mb-4" />
        
        {showScheduleMeetings && (
           <div className="mb-4 p-4 text-center border border-dashed rounded-lg bg-gray-50 animate-in slide-in-from-top-2">
              <p className="text-xs text-gray-500">No new schedules pending.</p>
              <Button variant="outline" size="sm" className="mt-2 text-xs h-8">
                 <Plus className="w-3 h-3 mr-1"/> Add New
              </Button>
           </div>
        )}
      </div>

      {/* -------------- RECENT ACTIVITY SECTION -------------- */}
      <div className="mt-2">
        <button 
          onClick={() => setShowRecentActivity(!showRecentActivity)}
          className="flex items-center justify-between w-full mb-2"
        >
          <h2 className="text-sm font-semibold">Recent Activity</h2>
          <div className="flex space-x-2 text-gray-500 hover:text-gray-700">
            <MoreVertical className="h-4 w-4" />
            {showRecentActivity ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </div>
        </button>

        {showRecentActivity && (
          <div className="space-y-4 animate-in slide-in-from-top-2 duration-200">
            {/* Activity item 1 */}
            <div>
              <p className="text-sm">
                <span className="font-medium">
                  Thanks you for booking a meeting with us,
                </span>
                <br />
                <span className="text-xs text-gray-500">Kevin Dunkon</span>
              </p>
              <p className="text-[10px] text-gray-400 mt-1">
                Jun 14, 2021 at 5:31 PM
              </p>
            </div>

            {/* Activity item 2 */}
            <div>
              <p className="text-sm">
                <span className="font-medium">
                  Thanks you for booking a meeting with us,
                </span>
                <br />
                <span className="text-xs text-gray-500">Kevin Dunkon</span>
              </p>
              <p className="text-[10px] text-gray-400 mt-1">
                Jun 14, 2021 at 5:31 PM
              </p>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}