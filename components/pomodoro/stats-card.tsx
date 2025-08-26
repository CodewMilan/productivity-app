"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { usePomodoro } from "@/contexts/pomodoro-context"
import { Timer, Target, Flame, Clock } from "lucide-react"

export function StatsCard() {
  const { stats } = usePomodoro()

  const statItems = [
    {
      title: "Total Sessions",
      value: stats.totalSessions,
      icon: Target,
      color: "text-blue-400",
    },
    {
      title: "Today's Sessions",
      value: stats.todaySessions,
      icon: Timer,
      color: "text-green-400",
    },
    {
      title: "Focus Time",
      value: `${Math.floor(stats.totalFocusTime / 60)}h ${stats.totalFocusTime % 60}m`,
      icon: Clock,
      color: "text-purple-400",
    },
    {
      title: "Current Streak",
      value: `${stats.streak} days`,
      icon: Flame,
      color: "text-orange-400",
    },
  ]

  return (
    <Card className="bg-gradient-to-b from-gray-900 to-black border-gray-800/40">
      <CardHeader>
        <CardTitle className="text-lg font-mono text-white">Productivity Stats</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {statItems.map((item) => (
            <div key={item.title} className="text-center">
              <div className="flex items-center justify-center mb-2">
                <item.icon className={`w-5 h-5 ${item.color}`} />
              </div>
              <div className="text-xl font-mono text-white font-bold mb-1">{item.value}</div>
              <div className="text-xs text-gray-400 font-mono uppercase tracking-wider">{item.title}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
