"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Volume2, Play, Pause } from "lucide-react"

export function VoiceSettings() {
  // BACKEND INTEGRATION: Fetch user voice preferences from the database
  const [settings, setSettings] = useState({
    voiceType: "calm",
    voiceSpeed: 50,
    voiceVolume: 70,
  })

  const [isPlaying, setIsPlaying] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // BACKEND INTEGRATION: Update voice settings in the database
    // BACKEND INTEGRATION: Configure text-to-speech parameters based on preferences
    console.log("Voice settings updated:", settings)
  }

  // BACKEND INTEGRATION: Implement voice sample playback
  const playVoiceSample = () => {
    setIsPlaying(!isPlaying)
    // Play voice sample with current settings
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-green-800">Voice Settings</CardTitle>
        <CardDescription>Customize the voice used for guidance and feedback</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label className="text-green-800 mb-3 block">Voice Type</Label>
              <RadioGroup
                value={settings.voiceType}
                onValueChange={(value) => setSettings({ ...settings, voiceType: value })}
                className="space-y-3"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="calm" id="calm" className="text-green-600" />
                  <Label htmlFor="calm" className="text-green-700">
                    Calm (Gentle and soothing)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="neutral" id="neutral" className="text-green-600" />
                  <Label htmlFor="neutral" className="text-green-700">
                    Neutral (Balanced and clear)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="upbeat" id="upbeat" className="text-green-600" />
                  <Label htmlFor="upbeat" className="text-green-700">
                    Upbeat (Energetic and motivating)
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2 pt-2">
              <div className="flex justify-between">
                <Label htmlFor="voice-speed" className="text-green-700">
                  Speaking Speed
                </Label>
                <span className="text-sm text-green-600">{settings.voiceSpeed}%</span>
              </div>
              <Slider
                id="voice-speed"
                min={25}
                max={100}
                step={5}
                value={[settings.voiceSpeed]}
                onValueChange={(value) => setSettings({ ...settings, voiceSpeed: value[0] })}
                className="py-2"
              />
              <div className="flex justify-between text-xs text-green-600">
                <span>Slower</span>
                <span>Faster</span>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <div className="flex justify-between">
                <Label htmlFor="voice-volume" className="text-green-700">
                  Volume
                </Label>
                <span className="text-sm text-green-600">{settings.voiceVolume}%</span>
              </div>
              <Slider
                id="voice-volume"
                min={0}
                max={100}
                step={5}
                value={[settings.voiceVolume]}
                onValueChange={(value) => setSettings({ ...settings, voiceVolume: value[0] })}
                className="py-2"
              />
              <div className="flex justify-between text-xs text-green-600">
                <span>Quieter</span>
                <span>Louder</span>
              </div>
            </div>
          </div>

          <div className="bg-green-50 p-4 rounded-lg flex items-center justify-between">
            <div className="flex items-center">
              <Volume2 className="w-5 h-5 text-green-600 mr-3" />
              <span className="text-green-700">Listen to sample</span>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="border-green-200 text-green-700 hover:bg-green-100"
              onClick={playVoiceSample}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3 h-3 mr-2" />
                  Stop
                </>
              ) : (
                <>
                  <Play className="w-3 h-3 mr-2" />
                  Play
                </>
              )}
            </Button>
          </div>

          <div className="pt-2">
            <Button type="submit" className="bg-green-600 hover:bg-green-700">
              Save Voice Settings
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
