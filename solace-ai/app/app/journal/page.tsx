import { VoiceJournal } from "@/components/app/voice-journal"
import { JournalHistory } from "@/components/app/journal-history"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function JournalPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-light text-green-800 mb-2">Voice Journal</h1>
        <p className="text-green-700">Record your thoughts and receive personalized insights.</p>
      </div>

      <Tabs defaultValue="record" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="record">Record Journal</TabsTrigger>
          <TabsTrigger value="history">Journal History</TabsTrigger>
        </TabsList>
        <TabsContent value="record" className="mt-6">
          <VoiceJournal />
        </TabsContent>
        <TabsContent value="history" className="mt-6">
          <JournalHistory />
        </TabsContent>
      </Tabs>
    </div>
  )
}
