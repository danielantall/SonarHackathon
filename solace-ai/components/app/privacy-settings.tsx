"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Shield, Download, Trash } from "lucide-react"

export function PrivacySettings() {
  // BACKEND INTEGRATION: Fetch user privacy settings from the database
  const [settings, setSettings] = useState({
    storeRecordings: false,
    anonymizeData: true,
    shareInsights: false,
    usageAnalytics: true,
  })

  const handleToggle = (key: keyof typeof settings) => {
    setSettings({ ...settings, [key]: !settings[key as keyof typeof settings] })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // BACKEND INTEGRATION: Update privacy settings in the database
    console.log("Privacy settings updated:", settings)
  }

  // BACKEND INTEGRATION: Implement data export functionality
  const exportData = () => {
    // Generate and download user data
    console.log("Exporting user data")
  }

  // BACKEND INTEGRATION: Implement data deletion functionality
  const deleteData = () => {
    // Delete user data after confirmation
    console.log("Deleting user data")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-green-800">Privacy Settings</CardTitle>
        <CardDescription>Control how your data is stored and used</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="store-recordings" className="text-green-800">
                  Store Voice Recordings
                </Label>
                <p className="text-sm text-green-700">Keep your voice journal recordings for future reference</p>
              </div>
              <Switch
                id="store-recordings"
                checked={settings.storeRecordings}
                onCheckedChange={() => handleToggle("storeRecordings")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="anonymize-data" className="text-green-800">
                  Anonymize Data
                </Label>
                <p className="text-sm text-green-700">Remove personal identifiers from your data</p>
              </div>
              <Switch
                id="anonymize-data"
                checked={settings.anonymizeData}
                onCheckedChange={() => handleToggle("anonymizeData")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="share-insights" className="text-green-800">
                  Share Anonymous Insights
                </Label>
                <p className="text-sm text-green-700">Contribute to improving the AI with anonymous data</p>
              </div>
              <Switch
                id="share-insights"
                checked={settings.shareInsights}
                onCheckedChange={() => handleToggle("shareInsights")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="usage-analytics" className="text-green-800">
                  Usage Analytics
                </Label>
                <p className="text-sm text-green-700">Allow collection of app usage data to improve experience</p>
              </div>
              <Switch
                id="usage-analytics"
                checked={settings.usageAnalytics}
                onCheckedChange={() => handleToggle("usageAnalytics")}
              />
            </div>
          </div>

          <div className="pt-4 space-y-4">
            <div className="bg-green-50 p-4 rounded-lg flex items-start">
              <Shield className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-green-800 mb-1">Our Privacy Commitment</h4>
                <p className="text-xs text-green-700">
                  SolaceAI is committed to protecting your privacy. We never sell your data to third parties, and we use
                  industry-standard encryption to keep your information secure. You can delete your data at any time.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                type="button"
                variant="outline"
                className="flex-1 border-green-200 text-green-700 hover:bg-green-50 flex items-center justify-center"
                onClick={exportData}
              >
                <Download className="w-4 h-4 mr-2" />
                Download My Data
              </Button>
              <Button
                type="button"
                variant="outline"
                className="flex-1 border-red-200 text-red-500 hover:bg-red-50 flex items-center justify-center"
                onClick={deleteData}
              >
                <Trash className="w-4 h-4 mr-2" />
                Delete All My Data
              </Button>
            </div>
          </div>

          <div className="pt-2">
            <Button type="submit" className="bg-green-600 hover:bg-green-700">
              Save Privacy Settings
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
