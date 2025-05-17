"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Circle, Plus } from "lucide-react"

// BACKEND INTEGRATION: Fetch actual habit data from the database
const habitData = [
  {
    id: 1,
    name: "Morning walk",
    description: "10-15 minute walk to start the day",
    streak: 5,
    target: 7,
    days: [true, true, true, true, true, false, false],
  },
  {
    id: 2,
    name: "Screen-free evening",
    description: "No screens 1 hour before bed",
    streak: 3,
    target: 7,
    days: [true, true, true, false, false, false, false],
  },
  {
    id: 3,
    name: "Mindful breathing",
    description: "5 minutes of focused breathing",
    streak: 7,
    target: 7,
    days: [true, true, true, true, true, true, true],
  },
]

export function HabitTracker() {
  const [habits, setHabits] = useState(habitData)

  // Get day names for the last 7 days
  const getDayNames = () => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    const today = new Date().getDay()
    const result = []

    for (let i = 6; i >= 0; i--) {
      const index = (today - i + 7) % 7
      result.push(days[index])
    }

    return result
  }

  const dayNames = getDayNames()

  // BACKEND INTEGRATION: Implement habit creation functionality
  const addHabit = () => {
    // Show modal or form to create a new habit
    // Save new habit to database
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-medium text-green-800">Your Habits</h2>
        <Button className="bg-green-600 hover:bg-green-700 flex items-center space-x-2" onClick={addHabit}>
          <Plus className="w-4 h-4" />
          <span>Add Habit</span>
        </Button>
      </div>

      <div className="space-y-4">
        {habits.map((habit) => (
          <Card key={habit.id}>
            <CardHeader className="pb-2">
              <CardTitle className="text-green-800">{habit.name}</CardTitle>
              <CardDescription>{habit.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-green-700">
                    Current streak: <span className="font-medium text-green-800">{habit.streak} days</span>
                  </div>
                  <div className="text-green-700">
                    Target: <span className="font-medium text-green-800">{habit.target} days</span>
                  </div>
                </div>

                <div className="w-full bg-green-100 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${(habit.streak / habit.target) * 100}%` }}
                  ></div>
                </div>

                <div className="grid grid-cols-7 gap-2 pt-2">
                  {dayNames.map((day, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div className="text-xs text-green-600 mb-1">{day}</div>
                      <div className="flex justify-center">
                        {/* BACKEND INTEGRATION: Update habit completion status in database */}
                        {habit.days[index] ? (
                          <CheckCircle className="w-6 h-6 text-green-500" />
                        ) : (
                          <Circle className="w-6 h-6 text-green-200" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
