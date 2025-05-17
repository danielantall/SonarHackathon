"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Bell, Clock } from "lucide-react"

export function CreateCheckIn() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [time, setTime] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // BACKEND INTEGRATION: Save new check-in to the database
    console.log({ title, description, time })
    // Reset form
    setTitle("")
    setDescription("")
    setTime("")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-green-800">Create New Check-in</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-green-700">
              Title
            </Label>
            <Input
              id="title"
              placeholder="e.g., Morning meditation"
              className="border-green-200"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-green-700">
              Description (optional)
            </Label>
            <Input
              id="description"
              placeholder="e.g., 10 minutes of mindfulness"
              className="border-green-200"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="time" className="text-green-700">
              Reminder Time
            </Label>
            <div className="relative">
              <Clock className="absolute left-3 top-3 h-4 w-4 text-green-500" />
              <Input
                id="time"
                type="time"
                className="pl-10 border-green-200"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="pt-2">
            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
              Create Check-in
            </Button>
          </div>

          <div className="bg-green-50 p-4 rounded-lg mt-6">
            <div className="flex items-start">
              <Bell className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-green-800 mb-1">About Check-ins</h4>
                <p className="text-xs text-green-700">
                  Check-ins help you build consistent habits by sending gentle reminders at specific times. They're
                  designed to support your personal growth journey with minimal disruption.
                </p>
              </div>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
