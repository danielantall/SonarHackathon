"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function NotificationSettings() {
  // BACKEND INTEGRATION: Fetch user notification preferences from the database
  const [settings, setSettings] = useState({
    morningGuidance: true,
    eveningJournal: true,
    checkIns: true,
    insights: true,
    emailDigest: false,
    notificationTime: "evening",
  })

  const handleToggle = (key: keyof typeof settings) => {
    setSettings({ ...settings, [key]: !settings[key as keyof typeof settings] })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // BACKEND INTEGRATION: Update notification settings in the database
    // BACKEND INTEGRATION: Configure notification schedule based on preferences
    console.log("Notification settings updated:", settings)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-green-800">Notification Settings</CardTitle>
        <CardDescription>Manage how and when you receive notifications</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="morning-guidance" className="text-green-800">
                  Morning Guidance
                </Label>
                <p className="text-sm text-green-700">Receive your personalized morning guidance</p>
              </div>
              <Switch
                id="morning-guidance"
                checked={settings.morningGuidance}
                onCheckedChange={() => handleToggle("morningGuidance")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="evening-journal" className="text-green-800">
                  Evening Journal Reminder
                </Label>
                <p className="text-sm text-green-700">Get reminded to record your daily journal</p>
              </div>
              <Switch
                id="evening-journal"
                checked={settings.eveningJournal}
                onCheckedChange={() => handleToggle("eveningJournal")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="check-ins" className="text-green-800">
                  Check-in Reminders
                </Label>
                <p className="text-sm text-green-700">Receive reminders for your scheduled check-ins</p>
              </div>
              <Switch id="check-ins" checked={settings.checkIns} onCheckedChange={() => handleToggle("checkIns")} />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="insights" className="text-green-800">
                  New Insights
                </Label>
                <p className="text-sm text-green-700">Be notified when new insights are generated</p>
              </div>
              <Switch id="insights" checked={settings.insights} onCheckedChange={() => handleToggle("insights")} />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="email-digest" className="text-green-800">
                  Weekly Email Digest
                </Label>
                <p className="text-sm text-green-700">Receive a weekly summary of your progress</p>
              </div>
              <Switch
                id="email-digest"
                checked={settings.emailDigest}
                onCheckedChange={() => handleToggle("emailDigest")}
              />
            </div>
          </div>

          <div className="space-y-2 pt-4">
            <Label htmlFor="notification-time" className="text-green-700">
              Preferred Notification Time
            </Label>
            <Select
              value={settings.notificationTime}
              onValueChange={(value) => setSettings({ ...settings, notificationTime: value })}
            >
              <SelectTrigger id="notification-time" className="border-green-200">
                <SelectValue placeholder="Select time preference" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="morning">Morning (6am - 10am)</SelectItem>
                <SelectItem value="afternoon">Afternoon (12pm - 4pm)</SelectItem>
                <SelectItem value="evening">Evening (6pm - 10pm)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="pt-2">
            <Button type="submit" className="bg-green-600 hover:bg-green-700">
              Save Preferences
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
