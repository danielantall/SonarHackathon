import { Mic, Brain, Calendar, Volume2 } from "lucide-react"
import Link from "next/link"

const features = [
  {
    icon: <Mic className="w-10 h-10 text-green-600" />,
    title: "Voice Journal",
    description:
      "Record your thoughts and feelings through natural conversation. Our AI listens and learns from your daily reflections.",
  },
  {
    icon: <Brain className="w-10 h-10 text-green-600" />,
    title: "AI Reflection Engine",
    description:
      "Our intelligent system analyzes your journal entries to identify patterns and suggest personalized improvements.",
  },
  {
    icon: <Volume2 className="w-10 h-10 text-green-600" />,
    title: "Morning Voice Guidance",
    description: "Start your day with personalized voice guidance based on your reflections and goals.",
  },
  {
    icon: <Calendar className="w-10 h-10 text-green-600" />,
    title: "Daily Check-ins",
    description: "Gentle reminders and check-ins to help you stay on track with your personal growth journey.",
  },
]

export function FeatureSection() {
  return (
    <section id="features" className="py-20 px-6 md:px-12 bg-green-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-light text-green-800 mb-4">
            Features designed for <span className="font-medium">mindful growth</span>
          </h2>
          <p className="text-lg text-green-700 max-w-2xl mx-auto">
            SolaceAI combines voice technology with thoughtful AI to create a truly personalized growth experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="mb-4 bg-green-50 w-16 h-16 rounded-full flex items-center justify-center">
                {feature.icon}
              </div>
              <h3 className="text-xl font-medium text-green-800 mb-3">{feature.title}</h3>
              <p className="text-green-700">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="#journal" className="text-green-600 hover:text-green-700 font-medium">
            Try it now ↓
          </Link>
        </div>
      </div>
    </section>
  )
}
