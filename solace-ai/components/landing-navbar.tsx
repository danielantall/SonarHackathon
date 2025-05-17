"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export function LandingNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="w-full py-4 px-6 md:px-12 flex items-center justify-between bg-transparent">
      <Link href="/" className="flex items-center space-x-2">
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-400 to-teal-500"></div>
        <span className="text-xl font-semibold text-green-800">SolaceAI</span>
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-8">
        <Link href="#features" className="text-green-700 hover:text-green-500 transition-colors">
          Features
        </Link>
        <Link href="#journal" className="text-green-700 hover:text-green-500 transition-colors">
          Journal
        </Link>
      </div>

      <div className="hidden md:flex items-center space-x-4">
        <Link href="/login">
          <Button variant="ghost" className="text-green-700 hover:text-green-500">
            {/* BACKEND INTEGRATION: Implement user authentication */}
            Log in
          </Button>
        </Link>
        <Link href="/app/dashboard">
          <Button className="bg-green-600 hover:bg-green-700 text-white">Get Started</Button>
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button className="md:hidden text-green-700" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-md p-4 z-50">
          <div className="flex flex-col space-y-4">
            <Link
              href="#features"
              className="text-green-700 hover:text-green-500 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="#journal"
              className="text-green-700 hover:text-green-500 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Journal
            </Link>
            <Link href="/login" onClick={() => setIsMenuOpen(false)}>
              <Button variant="ghost" className="text-green-700 hover:text-green-500 w-full justify-start">
                {/* BACKEND INTEGRATION: Implement user authentication */}
                Log in
              </Button>
            </Link>
            <Link href="/app/dashboard" onClick={() => setIsMenuOpen(false)}>
              <Button className="bg-green-600 hover:bg-green-700 text-white w-full">Get Started</Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
