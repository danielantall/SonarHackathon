"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Circle } from "lucide-react"

export function CheckInReminder() {
  // BACKEND INTEGRATION: Fetch actual check-in data from the database
  const [checkIns, setCheckIns] = useState([
    { id: 1, text: "Morning walk completed", completed: false },
    { id: 2, text: "Screen-free time before bed", completed: false },
    { id: 3, text: "Mindful breathing exercise", completed: true },
  ])

  const toggleCheckIn = (id: number) => {
    setCheckIns(checkIns.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item)))
    // BACKEND INTEGRATION: Update check-in status in the database
    // BACKEND INTEGRATION: Track habit completion for insights
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-green-800">Today's Check-ins</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 mb-6">
          {checkIns.map((item) => (
            <div
              key={item.id}
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-green-50 transition-colors cursor-pointer"
              onClick={() => toggleCheckIn(item.id)}
            >
              {item.completed ? (
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
              ) : (
                <Circle className="w-5 h-5 text-green-300 flex-shrink-0" />
              )}
              <span className={`text-green-700 ${item.completed ? "line-through" : ""}`}>{item.text}</span>
            </div>
          ))}
        </div>

        <Button className="w-full bg-green-600 hover:bg-green-700">
          {/* BACKEND INTEGRATION: Create new check-in in the database */}
          Add New Check-in
        </Button>
      </CardContent>
    </Card>
  )
}
