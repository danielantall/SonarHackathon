"use client"

import { useEffect, useState } from "react"
import { useMobile } from "@/hooks/use-mobile"

export function CursorGradient() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const isMobile = useMobile()

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    const handleScroll = () => {
      setPosition((prev) => ({ ...prev, y: prev.y + window.scrollY }))
    }

    if (!isMobile) {
      window.addEventListener("mousemove", handleMouseMove)
      window.addEventListener("scroll", handleScroll)
    }

    return () => {
      if (!isMobile) {
        window.removeEventListener("mousemove", handleMouseMove)
        window.removeEventListener("scroll", handleScroll)
      }
    }
  }, [isMobile])

  if (isMobile) return null

  return (
    <div
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
      style={{
        background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(34, 197, 94, 0.15), transparent 80%)`,
      }}
    />
  )
}
