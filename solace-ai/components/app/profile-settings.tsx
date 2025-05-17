"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Camera } from "lucide-react"

export function ProfileSettings() {
  // BACKEND INTEGRATION: Fetch user profile data from the database
  const [user, setUser] = useState({
    name: "User Name",
    email: "user@example.com",
    avatar: "/placeholder.svg?height=100&width=100",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // BACKEND INTEGRATION: Update user profile in the database
    console.log("Profile updated:", user)
  }

  // BACKEND INTEGRATION: Implement avatar upload functionality
  const handleAvatarUpload = () => {
    // Open file picker and upload avatar
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-green-800">Profile Settings</CardTitle>
        <CardDescription>Manage your account information</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                <AvatarFallback className="bg-green-100 text-green-800 text-xl">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <Button
                variant="outline"
                size="icon"
                className="absolute bottom-0 right-0 bg-white border-green-200 text-green-700 hover:bg-green-50"
                onClick={handleAvatarUpload}
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm text-green-700">Upload a profile picture</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-green-700">
                Full Name
              </Label>
              <Input
                id="name"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                className="border-green-200"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-green-700">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                className="border-green-200"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-green-700">
                Password
              </Label>
              <Input id="password" type="password" placeholder="••••••••" className="border-green-200" />
              <p className="text-xs text-green-600">Leave blank to keep your current password</p>
            </div>
          </div>

          <div className="pt-2">
            <Button type="submit" className="bg-green-600 hover:bg-green-700">
              Save Changes
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
