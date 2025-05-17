"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search, Filter, ArrowUpDown, Lightbulb, Activity, Coffee, Moon, Heart, Zap } from "lucide-react"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// BACKEND INTEGRATION: Fetch actual insights data from the database
const insightsData = [
  {
    id: 1,
    category: "Sleep",
    title: "Screen Time Impact",
    description: "Your sleep quality improves significantly when you avoid screens 1 hour before bedtime.",
    source: "7 journal entries",
    date: "May 15, 2023",
    icon: <Moon className="w-5 h-5" />,
  },
  {
    id: 2,
    category: "Productivity",
    title: "Morning Focus",
    description: "You're most productive in the first 2 hours after waking up, especially after physical activity.",
    source: "12 journal entries",
    date: "May 10, 2023",
    icon: <Zap className="w-5 h-5" />,
  },
  {
    id: 3,
    category: "Stress",
    title: "Meeting Patterns",
    description: "Back-to-back meetings in the afternoon consistently increase your stress levels.",
    source: "9 journal entries",
    date: "May 8, 2023",
    icon: <Activity className="w-5 h-5" />,
  },
  {
    id: 4,
    category: "Mood",
    title: "Social Connection",
    description: "Spending time with friends or family at least twice a week correlates with improved mood.",
    source: "14 journal entries",
    date: "May 5, 2023",
    icon: <Heart className="w-5 h-5" />,
  },
  {
    id: 5,
    category: "Habits",
    title: "Caffeine Sensitivity",
    description: "Consuming caffeine after 2pm negatively affects your sleep quality and evening relaxation.",
    source: "8 journal entries",
    date: "May 1, 2023",
    icon: <Coffee className="w-5 h-5" />,
  },
]

const categories = ["All", "Sleep", "Productivity", "Stress", "Mood", "Habits"]

export function InsightsList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest")

  // Filter and sort insights
  const filteredInsights = insightsData
    .filter(
      (insight) =>
        (selectedCategory === "All" || insight.category === selectedCategory) &&
        (insight.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          insight.description.toLowerCase().includes(searchQuery.toLowerCase())),
    )
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime()
      const dateB = new Date(b.date).getTime()
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB
    })

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-green-800">AI-Generated Insights</CardTitle>
          <CardDescription>Patterns and observations based on your journal entries</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-green-500" />
              <Input
                placeholder="Search insights..."
                className="pl-10 border-green-200"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-green-200 text-green-700">
                  <Filter className="mr-2 h-4 w-4" />
                  {selectedCategory}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {categories.map((category) => (
                  <DropdownMenuItem key={category} onClick={() => setSelectedCategory(category)}>
                    {category}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="outline"
              className="border-green-200 text-green-700"
              onClick={() => setSortOrder(sortOrder === "newest" ? "oldest" : "newest")}
            >
              <ArrowUpDown className="mr-2 h-4 w-4" />
              {sortOrder === "newest" ? "Newest" : "Oldest"}
            </Button>
          </div>

          <div className="space-y-4">
            {filteredInsights.length > 0 ? (
              filteredInsights.map((insight) => (
                <div
                  key={insight.id}
                  className="p-4 border border-green-100 rounded-lg hover:bg-green-50 transition-colors"
                >
                  <div className="flex items-start">
                    <div className="mr-4 mt-1 bg-green-100 p-2 rounded-full text-green-600">{insight.icon}</div>
                    <div>
                      <div className="flex items-center mb-1">
                        <span className="text-xs font-medium bg-green-100 text-green-800 px-2 py-0.5 rounded-full mr-2">
                          {insight.category}
                        </span>
                        <span className="text-xs text-green-600">{insight.date}</span>
                      </div>
                      <h3 className="font-medium text-green-800 mb-1">{insight.title}</h3>
                      <p className="text-green-700 mb-2">{insight.description}</p>
                      <div className="flex items-center">
                        <Lightbulb className="w-3 h-3 text-green-500 mr-1" />
                        <span className="text-xs text-green-600">Based on {insight.source}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 bg-green-50 rounded-lg">
                <p className="text-green-700">No insights found matching your criteria.</p>
                <Button
                  variant="link"
                  className="text-green-600 mt-2"
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedCategory("All")
                  }}
                >
                  Reset filters
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
