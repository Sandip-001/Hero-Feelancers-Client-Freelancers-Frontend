"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ChevronDown, MoreVertical } from "lucide-react";

export default function RightSidebar() {
  return (
    <aside
      className="
        fixed 
        top-0 
        right-0 
        h-full 
        w-65   /* === 20rem */
        border-l 
        bg-white 
        px-5 
        pt-6
        overflow-y-auto
      "
    >
      {/* -------------- UPCOMING MEETING TITLE -------------- */}
      <div className="flex items-center justify-between mb-2 mt-14">
        <h2 className="text-sm font-semibold">Upcoming Meeting</h2>
        <MoreVertical className="h-4 w-4 text-gray-500" />
      </div>

      {/* -------------- TODAY’S MEETINGS TITLE -------------- */}
      <div className="flex items-center justify-between text-xs text-gray-400 mb-2 mt-4">
        <span>Today's Meetings</span>
        <div className="flex items-center space-x-2">
          <ChevronDown className="h-4 w-4 text-gray-500" />
        </div>
      </div>

      {/* ---------------- MEETING 1 ---------------- */}
      <div className="p-3 border rounded-lg bg-gray-50 mb-3 relative">
        {/* More Icon */}
        <MoreVertical className="h-4 w-4 text-gray-500 absolute top-3 right-3 cursor-pointer" />

        <p className="text-[10px] text-blue-600 mb-1">
          30 mins call with clients
        </p>
        <p className="text-sm font-semibold">Project Discovery Call</p>

        <p className="text-[11px] text-gray-500 mb-2">
          Due soon: <span className="font-medium">09:20 AM</span>
        </p>

        <div className="flex items-center justify-between">
          {/* Avatars Group */}
          <div className="flex -space-x-3">
            {/* Avatar 1 */}
            <Avatar className="h-9 w-9 border-2 border-white">
              <AvatarImage src="/images/rightsidebar/man.jpg" alt="Man" />
              
            </Avatar>

            {/* Avatar 2 */}
            <Avatar className="h-9 w-9 border-2 border-white">
              <AvatarImage src="/images/rightsidebar/woman.jpg" alt="Woman" />
              <AvatarFallback>W</AvatarFallback>
            </Avatar>

            {/* Avatar 3 */}
            <Avatar className="h-9 w-9 border-2 border-white">
              <AvatarImage src="/images/rightsidebar/man.jpg" alt="Another" />
              <AvatarFallback>A</AvatarFallback>
            </Avatar>

            {/* +5 Indicator */}
            <div className="h-9 w-9 flex items-center justify-center rounded-full border-2 border-gray-300 bg-white text-sm font-semibold text-gray-500 z-10">
              5+
            </div>
          </div>

          {/* Invite Button */}
          <Button className="bg-blue-600 hover:bg-blue-700 text-xs px-3 py-1 h-7">
            Invite
          </Button>
        </div>
      </div>
      {/* ---------------- MEETING 2 (Duplicate Block) ---------------- */}
      <div className="p-3 border rounded-lg bg-gray-50 mb-3 relative">
        {/* More Icon */}
        <MoreVertical className="h-4 w-4 text-gray-500 absolute top-3 right-3 cursor-pointer" />

        <p className="text-[10px] text-blue-600 mb-1">
          30 mins call with clients
        </p>
        <p className="text-sm font-semibold">Project Discovery Call</p>

        <p className="text-[11px] text-gray-500 mb-2">
          Due soon: <span className="font-medium">09:20 AM</span>
        </p>

         <div className="flex items-center justify-between">
          {/* Avatars Group */}
          <div className="flex -space-x-3">
            {/* Avatar 1 */}
            <Avatar className="h-9 w-9 border-2 border-white">
              <AvatarImage src="/images/rightsidebar/man.jpg" alt="Man" />
              <AvatarFallback>M</AvatarFallback>
            </Avatar>

            {/* Avatar 2 */}
            <Avatar className="h-9 w-9 border-2 border-white">
              <AvatarImage src="/images/rightsidebar/woman.jpg" alt="Woman" />
              <AvatarFallback>W</AvatarFallback>
            </Avatar>

            {/* Avatar 3 */}
            <Avatar className="h-9 w-9 border-2 border-white">
              <AvatarImage src="/images/rightsidebar/man.jpg" alt="Another" />
              <AvatarFallback>A</AvatarFallback>
            </Avatar>

            {/* +5 Indicator */}
            <div className="h-9 w-9 flex items-center justify-center rounded-full border-2 border-gray-300 bg-white text-sm font-semibold text-gray-500 z-10">
              5+
            </div>
          </div>

          {/* Invite Button */}
          <Button className="bg-blue-600 hover:bg-blue-700 text-xs px-3 py-1 h-7">
            Invite
          </Button>
        </div>
      </div>

      {/* ---------------- RECENT ACTIVITY ---------------- */}
      <div className="flex items-center justify-between mb-2 mt-4">
        <h2 className="text-sm font-semibold">Recent Activity</h2>
        <div className="flex space-x-2">
          <MoreVertical className="h-4 w-4 text-gray-500" />
          <ChevronDown className="h-4 w-4 text-gray-500" />
        </div>
      </div>

      {/* Activity item */}
      <div className="mb-4">
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

      <div className="mb-4">
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
    </aside>
  );
}
