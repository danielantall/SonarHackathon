import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Leaf, ChevronDown } from "lucide-react"

export function HeroSection() {
  return (
    <section className="py-20 px-6 md:px-12 flex flex-col items-center text-center min-h-[90vh] justify-center">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 flex justify-center">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
            <Leaf className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <h1 className="text-4xl md:text-6xl font-light text-green-800 mb-6">
          Find your inner peace with <span className="font-medium">SolaceAI</span>
        </h1>
        <p className="text-lg md:text-xl text-green-700 mb-10 max-w-2xl mx-auto">
          A voice-based therapeutic AI companion for daily reflection, habit healing, and holistic life improvement.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/app/dashboard">
            <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg rounded-full">
              Start Journaling
            </Button>
          </Link>
          <Link href="#features">
            <Button
              variant="outline"
              className="border-green-600 text-green-700 hover:bg-green-50 px-8 py-6 text-lg rounded-full"
            >
              Learn How It Works
            </Button>
          </Link>
        </div>
      </div>

      <div className="absolute bottom-10 animate-bounce">
        <Link href="#features">
          <Button variant="ghost" size="icon" className="rounded-full h-12 w-12 text-green-600">
            <ChevronDown className="h-6 w-6" />
          </Button>
        </Link>
      </div>
    </section>
  )
}
