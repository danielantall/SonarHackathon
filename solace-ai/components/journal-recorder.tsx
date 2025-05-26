"use client"

import { useState, useEffect, useRef } from "react"
import { Mic, MicOff, Speech, AudioWaveformIcon as Waveform } from "lucide-react"
import { Button } from "@/components/ui/button"
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition"
import { SonarClient } from "@/lib/openai-client"
import { send } from "process"
import { useUser, useClerk } from "@clerk/nextjs"
import { useRouter } from "next/navigation"

export function JournalRecorder() {
  const { isSignedIn, user } = useUser()
  const { redirectToSignUp } = useClerk()
  const router = useRouter()
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const timerInterval = useRef<NodeJS.Timeout | null>(null)
  const {transcript, listening, resetTranscript, browserSupportsSpeechRecognition} = useSpeechRecognition()
  const client = new SonarClient(process.env.SONAR_API_KEY as string)
  // Handle recording state
  useEffect(() => {
    const cached = localStorage.getItem("cachedTracnscript")
    if (cached) {
      sendMessage(cached).then((response) => {
        console.log("Response from AI:", response)
      })
      localStorage.removeItem("cachedTranscript")
    }
  }, [isSignedIn])
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
  const toggleRecording = () => {
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

  useEffect(() => {
    if (!isRecording && transcript) {
      console.log("Transcript:", transcript)
      if (!isSignedIn) {
        localStorage.setItem("cachedTranscript", transcript)
        redirectToSignUp()
        return
      } else {
        sendMessage(transcript).then((response) => {
          console.log("Response from AI:", response)
        })
      }
    }
  }, [isRecording, transcript])

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

async function sendMessage(message : string) {
  try {
    const response = await fetch('http://localhost:5001/api/journalentry', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: message,
        strategy: 'emotion_severity'
      } ),
    });
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    return { error: 'Failed to get response' };
  }
}
