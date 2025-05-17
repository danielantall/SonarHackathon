"use client"

import { useState } from "react"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function AppHeader() {
  // BACKEND INTEGRATION: Fetch user notifications from the database
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: "Morning guidance is ready for you",
      time: "5 minutes ago",
    },
    {
      id: 2,
      message: "Time for your evening reflection",
      time: "2 hours ago",
    },
  ])

  // BACKEND INTEGRATION: Mark notification as read
  const markAsRead = (id: number) => {
    // Update notification status in database
  }

  // BACKEND INTEGRATION: Fetch user profile data
  const user = {
    name: "User Name",
    initials: "U",
  }

  // BACKEND INTEGRATION: Implement logout functionality
  const handleLogout = () => {
    // Log out user and redirect to login page
  }

  return (
    <header className="bg-white border-b border-green-100 py-4 px-6 md:px-8 flex items-center justify-end">
      <div className="flex items-center space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5 text-green-700" />
              {notifications.length > 0 && (
                <span className="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <DropdownMenuItem key={notification.id} className="py-3 cursor-pointer">
                  <div>
                    <p className="text-sm font-medium">{notification.message}</p>
                    <p className="text-xs text-muted-foreground">{notification.time}</p>
                  </div>
                </DropdownMenuItem>
              ))
            ) : (
              <div className="py-3 px-2 text-center text-sm text-muted-foreground">No new notifications</div>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="justify-center">
              <Button variant="ghost" size="sm" className="w-full">
                View all notifications
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative flex items-center space-x-2" size="sm">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-green-100 text-green-800">{user.initials}</AvatarFallback>
              </Avatar>
              <span className="text-green-800">{user.name}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
