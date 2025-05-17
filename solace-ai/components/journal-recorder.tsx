"use client"

import { useState, useEffect } from "react"
import { Mic, MicOff, AudioWaveformIcon as Waveform } from "lucide-react"
import { Button } from "@/components/ui/button"

export function JournalRecorder() {
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(null)

  // Handle recording state
  useEffect(() => {
    if (isRecording) {
      const interval = setInterval(() => {
        setRecordingTime((prev) => prev + 1)
      }, 1000)
      setTimerInterval(interval)
    } else {
      if (timerInterval) {
        clearInterval(timerInterval)
        setTimerInterval(null)
      }
    }

    return () => {
      if (timerInterval) {
        clearInterval(timerInterval)
      }
    }
  }, [isRecording, timerInterval])

  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false)
      // BACKEND INTEGRATION: Save the recorded audio to the server
      // BACKEND INTEGRATION: Process the audio with speech-to-text API (e.g., OpenAI Whisper)
      // BACKEND INTEGRATION: Send the transcribed text to AI for analysis
    } else {
      setIsRecording(true)
      setRecordingTime(0)
      // BACKEND INTEGRATION: Initialize audio recording using Web Audio API or MediaRecorder API
    }
  }

  // Format seconds to mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <section id="journal" className="py-32 px-6 flex flex-col items-center justify-center min-h-screen">
      <div className="max-w-md w-full mx-auto text-center">
        <h2 className="text-3xl font-light text-green-800 mb-6">
          Start your <span className="font-medium">voice journal</span>
        </h2>
        <p className="text-green-700 mb-12">
          Speak freely about your day, thoughts, and feelings. Our AI will listen and provide personalized insights.
        </p>

        <div className="relative">
          <div
            className={`w-48 h-48 mx-auto rounded-full flex items-center justify-center transition-all duration-300 ${
              isRecording
                ? "bg-red-50 border-4 border-red-400 shadow-lg shadow-red-100"
                : "bg-green-50 border-4 border-green-200 hover:border-green-300"
            }`}
          >
            <Button
              onClick={toggleRecording}
              className={`w-32 h-32 rounded-full transition-all duration-300 ${
                isRecording ? "bg-red-500 hover:bg-red-600 text-white" : "bg-green-600 hover:bg-green-700 text-white"
              }`}
            >
              {isRecording ? <MicOff className="w-12 h-12" /> : <Mic className="w-12 h-12" />}
            </Button>
          </div>

          {isRecording && (
            <>
              <div className="mt-8 text-center">
                <div className="text-2xl font-mono text-green-800">{formatTime(recordingTime)}</div>
                <div className="mt-4 h-8 flex items-center justify-center">
                  {/* BACKEND INTEGRATION: Replace with actual audio visualization using Web Audio API */}
                  <Waveform className="w-32 h-8 text-green-500" />
                </div>
              </div>
              <p className="mt-6 text-green-700">
                Speak naturally about your day. Tap the microphone again when you're finished.
              </p>
            </>
          )}

          {!isRecording && (
            <p className="mt-6 text-green-700">Tap the microphone to start recording your journal entry.</p>
          )}
        </div>
      </div>
    </section>
  )
}
