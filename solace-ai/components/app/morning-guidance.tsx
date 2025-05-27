"use client"

import { useEffect, useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"

export function MorningGuidance() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [prompt, setPrompt] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)


  useEffect(() => {
    const cachedPrompt = localStorage.getItem("guidancePrompt")
    const cachedDate = localStorage.getItem("guidancePromptDate")
    const today = new Date().toISOString().slice(0, 10) // "YYYY-MM-DD"

    if (cachedPrompt && cachedDate === today) {
      setPrompt(cachedPrompt)
      // Only fetch audio for the cached prompt
      fetch("http://localhost:5001/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: cachedPrompt })
      })
        .then(res => res.blob())
        .then(blob => {
          const url = URL.createObjectURL(blob)
          setAudioUrl(url)
        })
        .catch(() => {
          setError("Failed to generate audio")
        })
    } else {
      setLoading(true)
      setError(null)
      fetch("http://localhost:5001/api/morningguidance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({})
      })
        .then(res => res.json())
        .then(data => {
          setPrompt(data.response)
          localStorage.setItem("guidancePrompt", data.response)
          localStorage.setItem("guidancePromptDate", today)
          setLoading(false)
          // Fetch audio for the new prompt
          return fetch("http://localhost:5001/api/tts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: data.response })
          })
        })
        .then(res => res && res.blob && res.blob())
        .then(blob => {
          if (blob) {
            const url = URL.createObjectURL(blob)
            setAudioUrl(url)
          }
        })
        .catch(() => {
          setError("Failed to load prompt or generate audio")
          setLoading(false)
        })
    }
  } , [])

  const togglePlayback = () => {
  if (!audioRef.current) return
  if (isPlaying) {
    audioRef.current.pause()
  } else {
    audioRef.current.play()
  }
  setIsPlaying(!isPlaying)
}

const toggleMute = () => {
  if (!audioRef.current) return
  audioRef.current.muted = !isMuted
  setIsMuted(!isMuted)
}

useEffect(() => {
  if (!audioRef.current) return
  const handleEnded = () => setIsPlaying(false)
  audioRef.current.addEventListener('ended', handleEnded)
  return () => {
    audioRef.current && audioRef.current.removeEventListener('ended', handleEnded)
  }
}, [audioUrl])


  return (
    <Card className="bg-gradient-to-r from-green-50 to-teal-50 border-none shadow-md">
      <CardHeader>
        <CardTitle className="text-green-800 flex items-center">
          <Volume2 className="w-5 h-5 mr-2" />
          Today's Morning Guidance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <p className="text-green-700 mb-4">
            {loading ? "Loading guidance..." : error ? error : prompt || "No guidance available for today."}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              className="bg-white text-green-700 hover:bg-green-50"
              onClick={togglePlayback}
            >
              <audio ref={audioRef} src={audioUrl || undefined} style={{ display: "none" }}/>
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="bg-white text-green-700 hover:bg-green-50"
              onClick={toggleMute}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </Button>
          </div>

          <div className="text-sm text-green-700">{isPlaying ? "Playing audio..." : "Click play to listen"}</div>
        </div>
      </CardContent>
    </Card>
  )
}
