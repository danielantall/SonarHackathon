"use client"

import { useState, useEffect, useRef } from "react"
import { Mic, MicOff, Speech, AudioWaveformIcon as Waveform } from "lucide-react"
import { Button } from "@/components/ui/button"
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition"
import { SonarClient } from "@/lib/openai-client"

export function JournalRecorder() {
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const timerInterval = useRef<NodeJS.Timeout | null>(null)
  const {transcript, listening, resetTranscript, browserSupportsSpeechRecognition} = useSpeechRecognition()
  const client = new SonarClient(process.env.NEXT_PUBLIC_PERPLEXITY_API as string)
  // Handle recording state
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
      client.createChatCompletion({
        model: "sonar-pro",
        messages: [
          { 
            role: "system", 
            content: "You are a supportive and empathetic AI companion designed to listen to users, offer helpful reflections, and encourage positive coping mechanisms for voice-related concerns. You are not a medical professional and cannot provide diagnoses or treatment advice. Respond in an encouraging, understanding, and non-judgmental tone. Use active listening techniques such as paraphrasing and summarizing to show you're engaged. Keep responses concise and focused on the user's immediate concerns. Guidelines for your responses: - Use emotionally sensitive language that acknowledges the user's feelings - Maintain cultural neutrality in your suggestions and reflections - Ask open-ended questions to encourage user reflection - Focus on active listening rather than immediate solutions - Avoid clinical terminology that might create unrealistic expectations - Encourage users to seek professional help when appropriate." 
          },
          { 
            role: "user", 
            content: transcript 
          }
        ]
      }).then((response) => {
        // debugging statement
        const summary = response.choices[0].message.content
        console.log("Summary:", summary)
      })
      // BACKEND INTEGRATION: Save the recorded audio to the server/local storage 
      // Display the journa to the user
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
