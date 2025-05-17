import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HabitTracker } from "@/components/app/habit-tracker"
import { MoodTracker } from "@/components/app/mood-tracker"
import { InsightsList } from "@/components/app/insights-list"

export default function ProgressPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-light text-green-800 mb-2">Your Progress</h1>
        <p className="text-green-700">Track your journey and see your growth over time.</p>
      </div>

      <Tabs defaultValue="habits" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="habits">Habits</TabsTrigger>
          <TabsTrigger value="mood">Mood</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>
        <TabsContent value="habits" className="mt-6">
          <HabitTracker />
        </TabsContent>
        <TabsContent value="mood" className="mt-6">
          <MoodTracker />
        </TabsContent>
        <TabsContent value="insights" className="mt-6">
          <InsightsList />
        </TabsContent>
      </Tabs>
    </div>
  )
}
