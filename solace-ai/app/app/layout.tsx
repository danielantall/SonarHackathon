import type React from "react"
import { Sidebar } from "@/components/app/sidebar"
import { AppHeader } from "@/components/app/app-header"
import { CursorGradient } from "@/components/cursor-gradient"

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-screen flex flex-col md:flex-row bg-green-50">
      <CursorGradient />
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <AppHeader />
        <div className="p-6 md:p-8">{children}</div>
      </main>
    </div>
  )
}
