import { CheckInList } from "@/components/app/check-in-list"
import { CreateCheckIn } from "@/components/app/create-check-in"

export default function CheckInsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-light text-green-800 mb-2">Daily Check-ins</h1>
        <p className="text-green-700">Track your habits and receive timely reminders.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CheckInList />
        </div>
        <div>
          <CreateCheckIn />
        </div>
      </div>
    </div>
  )
}
