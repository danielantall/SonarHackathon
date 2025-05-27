"use client"

import { useEffect, useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition"
import { Button } from "@/components/ui/button"
import { Mic, MicOff } from "lucide-react"
import { SonarClient } from "@/lib/openai-client"
import { } from "openai"
import Link from "next/link"

export function JournalPrompt() {
  const [prompt, setPrompt] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const timerInterval = useRef<NodeJS.Timeout | null>(null)
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const {transcript, listening, resetTranscript, browserSupportsSpeechRecognition} = useSpeechRecognition()


  useEffect(() => {
      if (!isRecording && transcript) {
        
        sendMessage(transcript).then((response) => {
          console.log("Response from AI:", response) //replace  with proper api call to model          
        })
        
      }
    }, [isRecording, transcript])
  useEffect(() => {
    if (isRecording) {
      timerInterval.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1)
      }, 1000)
    } else {
      if (timerInterval.current) {
        clearInterval(timerInterval.current)
        timerInterval.current = null
      }
    }
    return () => {
      if (timerInterval.current) {
        clearInterval(timerInterval.current)
        timerInterval.current = null
      }
    }
  }, [isRecording])
  useEffect(() => {
    const cachedPrompt = localStorage.getItem("journalPrompt")
    const cachedDate = localStorage.getItem("journalPromptDate")
    const today = new Date().toISOString().slice(0, 10) // "YYYY-MM-DD"

    if (cachedPrompt && cachedDate === today) {
      setPrompt(cachedPrompt)
    } else {
      setLoading(true)
      setError(null)
      fetch("http://localhost:5001/api/dailyprompt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({})
      })
        .then(res => res.json())
        .then(data => {
          setPrompt(data.response)
          localStorage.setItem("journalPrompt", data.response)
          localStorage.setItem("journalPromptDate", today)
          setLoading(false)
        })
        .catch(() => {
          setError("Failed to load prompt")
          setLoading(false)
        })
    }
  }, [])
  const toggleRecording = () => {
    setIsRecording(!isRecording)
    // BACKEND INTEGRATION: Start/stop recording audio
    // BACKEND INTEGRATION: Process audio with speech-to-text
    // BACKEND INTEGRATION: Send transcribed text to AI for analysis
    if (!browserSupportsSpeechRecognition) {
      alert("Your browser does not support speech recognition.")
      return
    }
    if (isRecording) {
      setIsRecording(false)
      SpeechRecognition.stopListening()
    } else {
      setIsRecording(true)
      setRecordingTime(0)
      resetTranscript()
      SpeechRecognition.startListening({ continuous: true, language: "en-US" })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-green-800">Evening Journal</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <p className="text-green-700 mb-4">Today's prompt:</p> 
          <p className="text-green-800 font-medium italic">
            {loading
              ? "Loading prompt..."
              : error
                ? error
                : prompt || "No prompt available today."}
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
