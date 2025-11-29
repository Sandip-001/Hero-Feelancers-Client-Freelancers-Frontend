import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Bell } from "lucide-react"

const notifications = [
  {
    id: 1,
    title: "New project invitation",
    message: "You have been invited to work on the CAB APP DEVELOPMENT project",
    time: "2 hours ago",
    read: false,
  },
  {
    id: 2,
    title: "Payment received",
    message: "You received $1,000 payment for milestone completion",
    time: "5 hours ago",
    read: false,
  },
  {
    id: 3,
    title: "Project deadline approaching",
    message: "Your project Construction Project is due in 2 days",
    time: "1 day ago",
    read: true,
  },
  {
    id: 4,
    title: "New message from client",
    message: "Travis Barker sent you a message",
    time: "2 days ago",
    read: true,
  },
  {
    id: 5,
    title: "Proposal accepted",
    message: "Your proposal for Mobile App Design has been accepted",
    time: "3 days ago",
    read: true,
  },
]

export default function NotificationsPage() {
  return (
    <div className="p-8 pt-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
        <p className="text-gray-500 mt-1">Stay updated with your latest activities</p>
      </div>

      <div className="max-w-4xl space-y-4">
        {notifications.map((notification) => (
          <Card
            key={notification.id}
            className={`hover:shadow-md transition-shadow ${!notification.read ? "border-l-4 border-l-primary" : ""}`}
          >
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-full ${notification.read ? "bg-gray-100" : "bg-blue-100"}`}>
                  <Bell className={`h-5 w-5 ${notification.read ? "text-gray-600" : "text-primary"}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">{notification.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                      <p className="text-xs text-gray-400 mt-2">{notification.time}</p>
                    </div>
                    {!notification.read && (
                      <Badge variant="default" className="ml-4">
                        New
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
