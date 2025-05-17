"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Leaf, Home, Mic, BarChart, Calendar, Settings, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navItems = [
  {
    label: "Dashboard",
    href: "/app/dashboard",
    icon: <Home className="w-5 h-5" />,
  },
  {
    label: "Journal",
    href: "/app/journal",
    icon: <Mic className="w-5 h-5" />,
  },
  {
    label: "Progress",
    href: "/app/progress",
    icon: <BarChart className="w-5 h-5" />,
  },
  {
    label: "Check-ins",
    href: "/app/check-ins",
    icon: <Calendar className="w-5 h-5" />,
  },
  {
    label: "Settings",
    href: "/app/settings",
    icon: <Settings className="w-5 h-5" />,
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="bg-white/80 backdrop-blur-sm shadow-sm"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
      </div>

      {/* Sidebar for desktop and mobile */}
      <aside
        className={cn(
          "bg-white w-64 border-r border-green-100 flex flex-col",
          "fixed inset-y-0 left-0 z-40 transition-transform duration-300 ease-in-out",
          "md:relative md:translate-x-0",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="p-6">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-400 to-teal-500 flex items-center justify-center">
              <Leaf className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-semibold text-green-800">SolaceAI</span>
          </Link>
        </div>

        <nav className="flex-1 px-4 py-4">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors",
                    pathname === item.href ? "bg-green-100 text-green-800" : "text-green-700 hover:bg-green-50",
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 mt-auto">
          <div className="bg-green-50 rounded-lg p-4">
            <p className="text-sm text-green-700 mb-3">Ready for your evening reflection?</p>
            <Link href="/app/journal">
              <Button
                className="w-full bg-green-600 hover:bg-green-700 text-white"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Start Journaling
              </Button>
            </Link>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black/20 z-30" onClick={() => setIsMobileMenuOpen(false)} />
      )}
    </>
  )
}
