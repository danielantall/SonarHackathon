"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function ProgressSummary() {
  // BACKEND INTEGRATION: Fetch actual user progress data from the database
  const progressData = {
    journalStreak: 5,
    habitsImproved: 2,
    checkInsCompleted: 12,
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-green-800">Your Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mb-6">
          <div className="flex justify-between items-center">
            <span className="text-green-700">Journal Streak</span>
            <span className="text-green-800 font-medium">{progressData.journalStreak} days</span>
          </div>
          <div className="w-full bg-green-100 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full"
              style={{ width: `${(progressData.journalStreak / 7) * 100}%` }}
            ></div>
          </div>

          <div className="flex justify-between items-center mt-4">
            <span className="text-green-700">Habits Improved</span>
            <span className="text-green-800 font-medium">{progressData.habitsImproved}</span>
          </div>

          <div className="flex justify-between items-center mt-4">
            <span className="text-green-700">Check-ins Completed</span>
            <span className="text-green-800 font-medium">{progressData.checkInsCompleted}</span>
          </div>
        </div>

        <Link href="/app/progress">
          <Button variant="outline" className="w-full border-green-200 text-green-700 hover:bg-green-50">
            View Detailed Progress
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}
