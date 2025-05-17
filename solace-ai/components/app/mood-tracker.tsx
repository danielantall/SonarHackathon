"use client"

import { useState } from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SmilePlus, Smile, Meh, Frown, FrownIcon as FrownPlus, CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"

// BACKEND INTEGRATION: Fetch actual mood data from the database
const moodData = [
  { date: new Date(2023, 4, 15), mood: 4, note: "Felt energized and productive" },
  { date: new Date(2023, 4, 14), mood: 3, note: "Average day, some stress from work" },
  { date: new Date(2023, 4, 13), mood: 5, note: "Great day! Family dinner and relaxation" },
  { date: new Date(2023, 4, 12), mood: 2, note: "Difficult day with project challenges" },
  { date: new Date(2023, 4, 11), mood: 3, note: "Neutral day, nothing special" },
  { date: new Date(2023, 4, 10), mood: 4, note: "Good progress on personal goals" },
  { date: new Date(2023, 4, 9), mood: 3, note: "Mixed feelings about work situation" },
]

const moodIcons = [
  <FrownPlus className="w-6 h-6" key="1" />,
  <Frown className="w-6 h-6" key="2" />,
  <Meh className="w-6 h-6" key="3" />,
  <Smile className="w-6 h-6" key="4" />,
  <SmilePlus className="w-6 h-6" key="5" />,
]

const moodLabels = ["Very Low", "Low", "Neutral", "Good", "Excellent"]

export function MoodTracker() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [selectedMood, setSelectedMood] = useState<number | null>(null)
  const [moodNote, setMoodNote] = useState("")

  // Get mood for selected date
  const getMoodForDate = (date: Date | undefined) => {
    if (!date) return null

    const mood = moodData.find((m) => m.date.toDateString() === date.toDateString())

    return mood || null
  }

  const selectedDateMood = getMoodForDate(date)

  // BACKEND INTEGRATION: Save mood data to the database
  const saveMood = () => {
    if (selectedMood) {
      // Save mood data to database
      console.log("Saving mood:", { date: new Date(), mood: selectedMood, note: moodNote })
      // Reset form
      setSelectedMood(null)
      setMoodNote("")
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-green-800">Mood Calendar</CardTitle>
          <CardDescription>Track how you've been feeling over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal border-green-200 text-green-700 mb-4"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
              </Popover>

              {selectedDateMood ? (
                <div className="bg-green-50 p-6 rounded-lg">
                  <div className="flex items-center mb-4">
                    <div className="mr-3 text-green-600">{moodIcons[selectedDateMood.mood - 1]}</div>
                    <div>
                      <div className="font-medium text-green-800">{moodLabels[selectedDateMood.mood - 1]} Mood</div>
                      <div className="text-sm text-green-700">{format(selectedDateMood.date, "MMMM d, yyyy")}</div>
                    </div>
                  </div>
                  <p className="text-green-700">{selectedDateMood.note}</p>
                </div>
              ) : (
                <div className="bg-green-50 p-6 rounded-lg text-center">
                  <p className="text-green-700 mb-4">No mood recorded for this date.</p>
                  <div className="flex justify-center space-x-2">
                    {moodIcons.map((icon, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="icon"
                        className="bg-white text-green-600 hover:bg-green-100"
                        onClick={() => setSelectedMood(index + 1)}
                      >
                        {icon}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex-1">
              <h3 className="font-medium text-green-800 mb-4">Mood Trends</h3>
              <div className="space-y-3">
                {moodData.slice(0, 5).map((entry, index) => (
                  <div
                    key={index}
                    className="flex items-center p-3 rounded-lg hover:bg-green-50 transition-colors cursor-pointer"
                    onClick={() => setDate(entry.date)}
                  >
                    <div className="mr-3 text-green-600">{moodIcons[entry.mood - 1]}</div>
                    <div>
                      <div className="font-medium text-green-800">{format(entry.date, "MMM d")}</div>
                      <div className="text-sm text-green-700 truncate max-w-[200px]">{entry.note}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-green-800">Record Today's Mood</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-green-800 mb-2">How are you feeling today?</label>
              <div className="flex justify-between">
                {moodIcons.map((icon, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <Button
                      variant="outline"
                      size="icon"
                      className={`bg-white hover:bg-green-50 ${
                        selectedMood === index + 1 ? "border-green-500 ring-2 ring-green-200" : "border-green-200"
                      }`}
                      onClick={() => setSelectedMood(index + 1)}
                    >
                      <div className="text-green-600">{icon}</div>
                    </Button>
                    <span className="text-xs text-green-700 mt-1">{moodLabels[index]}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-green-800 mb-2">Add a note (optional)</label>
              <textarea
                className="w-full p-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-500"
                rows={3}
                placeholder="What made you feel this way today?"
                value={moodNote}
                onChange={(e) => setMoodNote(e.target.value)}
              />
            </div>

            <Button className="w-full bg-green-600 hover:bg-green-700" onClick={saveMood} disabled={!selectedMood}>
              Save Today's Mood
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
