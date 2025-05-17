"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mic, MicOff } from "lucide-react"
import Link from "next/link"

export function JournalPrompt() {
  const [isRecording, setIsRecording] = useState(false)

  // BACKEND INTEGRATION: Fetch personalized journal prompt from AI
  // BACKEND INTEGRATION: Implement audio recording functionality

  const toggleRecording = () => {
    setIsRecording(!isRecording)
    // BACKEND INTEGRATION: Start/stop recording audio
    // BACKEND INTEGRATION: Process audio with speech-to-text
    // BACKEND INTEGRATION: Send transcribed text to AI for analysis
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-green-800">Evening Journal</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <p className="text-green-700 mb-4">Today's prompt:</p>
          {/* BACKEND INTEGRATION: Display AI-generated prompt based on user's history */}
          <p className="text-green-800 font-medium italic">
            "What moments brought you peace today, and what situations felt challenging?"
          </p>
        </div>

        <div className="space-y-3">
          <Button
            className={`w-full flex items-center justify-center space-x-2 ${
              isRecording ? "bg-red-500 hover:bg-red-600" : "bg-green-600 hover:bg-green-700"
            }`}
            onClick={toggleRecording}
          >
            {isRecording ? (
              <>
                <MicOff className="w-4 h-4" />
                <span>Stop Recording</span>
              </>
            ) : (
              <>
                <Mic className="w-4 h-4" />
                <span>Start Recording</span>
              </>
            )}
          </Button>

          <Link href="/app/journal">
            <Button variant="outline" className="w-full border-green-200 text-green-700 hover:bg-green-50">
              View Journal History
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
