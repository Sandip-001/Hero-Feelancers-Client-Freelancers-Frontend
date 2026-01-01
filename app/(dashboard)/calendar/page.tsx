"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ChevronLeft, ChevronRight, Plus, Edit2, MoreVertical } from "lucide-react"

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

const meetings = [
  {
    id: 1,
    title: "Project Discovery call",
    duration: "30-minute call with clients",
    date: "Feb 21, 2021",
    time: "09:20 am",
    attendees: ["A", "B", "C", "+2"],
  },
  {
    id: 2,
    title: "Project Discovery call",
    duration: "30-minute call with clients",
    date: "Feb 21, 2021",
    time: "09:20 am",
    attendees: ["A", "B", "C", "+2"],
  },
  {
    id: 3,
    title: "Project Discovery call",
    duration: "30-minute call with clients",
    date: "Feb 21, 2021",
    time: "09:20 am",
    attendees: ["A", "B", "C", "+2"],
  },
]

const recentEvents = [
  {
    title: "Project Discovery call",
    duration: "30-minute call with clients",
    date: "Feb 21, 2021",
    time: "09:20 am",
    attendees: ["A", "B", "C", "+2"],
  },
]

export default function CalendarPage() {
  const [currentMonth, setCurrentMonth] = useState(1) // February = 1 (0-indexed)
  const [currentYear, setCurrentYear] = useState(2021)
  const [selectedDate, setSelectedDate] = useState(18)

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (month: number, year: number) => {
    const day = new Date(year, month, 1).getDay()
    return day === 0 ? 6 : day - 1 // Convert Sunday (0) to 6
  }

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear)
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear)
    const days = []

    // Empty cells for days before the first day of month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-12" />)
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected = day === selectedDate
      const isEvent = day === 18 || day === 21
      days.push(
        <button
          key={day}
          onClick={() => setSelectedDate(day)}
          className={`h-12 rounded-lg flex items-center justify-center text-sm font-medium transition-colors ${
            isSelected
              ? "bg-green-500 text-white"
              : isEvent
              ? "bg-green-50 text-green-700 border border-green-200"
              : "hover:bg-gray-100"
          }`}
        >
          {day}
        </button>
      )
    }

    return days
  }

  const previousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }

  return (
    <div className="p-4 md:p-12 md:pb-24 md:mt-[-40px] pb-24">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Calendar</h1>
        <p className="text-gray-500 mt-1">
          Here is a list of all the projects on which you have been working.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Calendar Section */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-bold">
                  {months[currentMonth]} {currentYear}
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Button size="icon" variant="outline" onClick={previousMonth}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="outline" onClick={nextMonth}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2 mb-2">
                {daysOfWeek.map((day) => (
                  <div
                    key={day}
                    className="h-10 flex items-center justify-center text-sm font-semibold text-gray-600"
                  >
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-2">{renderCalendar()}</div>
              <div className="flex items-center space-x-4 mt-6 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                  <span className="text-gray-600">Event dates</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-3 w-3 rounded-full bg-blue-500" />
                  <span className="text-gray-600">Selected date</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recently Events */}
          <div className="mt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Recently Events</h2>
            <p className="text-sm text-gray-500 mb-4">
              Reminders that have been added recently will be displayed here.
            </p>

            {recentEvents.map((event, index) => (
              <Card key={index} className="mb-4">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-xs text-primary mb-1">{event.duration}</p>
                      <h3 className="font-semibold text-gray-900 mb-2">{event.title}</h3>
                      <p className="text-xs text-gray-500">
                        {event.date} · {event.time}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="icon">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t">
                    <div className="flex -space-x-2">
                      {event.attendees.map((attendee, i) => (
                        <Avatar key={i} className="h-7 w-7 border-2 border-white">
                          <AvatarFallback className="text-xs">{attendee}</AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                    <Button size="sm">Invite</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Reminders Section */}
        <div>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Reminders</CardTitle>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-1" />
                  Create
                </Button>
              </div>
              <p className="text-sm text-gray-500">
                This is where you'll see reminders of the selected date.
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {meetings.map((meeting) => (
                <Card key={meeting.id} className="border-l-4 border-l-primary">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-xs text-primary mb-1">{meeting.duration}</p>
                        <h3 className="font-semibold text-gray-900">{meeting.title}</h3>
                      </div>
                      <div className="flex space-x-1">
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <Edit2 className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <MoreVertical className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mb-3">
                      {meeting.date} · {meeting.time}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex -space-x-2">
                        {meeting.attendees.map((attendee, i) => (
                          <Avatar key={i} className="h-6 w-6 border-2 border-white">
                            <AvatarFallback className="text-xs">{attendee}</AvatarFallback>
                          </Avatar>
                        ))}
                      </div>
                      <Button size="sm" className="h-7 text-xs">
                        Invite
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>

          <div className="mt-6">
            <Button className="w-full">Schedule Meeting</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
