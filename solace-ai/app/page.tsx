import { LandingNavbar } from "@/components/landing-navbar"
import { HeroSection } from "@/components/hero-section"
import { FeatureSection } from "@/components/feature-section"
import { JournalRecorder } from "@/components/journal-recorder"
import { Footer } from "@/components/footer"
import { CursorGradient } from "@/components/cursor-gradient"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <CursorGradient />
      <LandingNavbar />
      <main>
        <HeroSection />
        <FeatureSection />
        <JournalRecorder />
      </main>
      <Footer />
    </div>
  )
}
