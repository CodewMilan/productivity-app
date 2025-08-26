"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useTabTracker } from "@/contexts/tab-tracker-context"
import { Eye, EyeOff, RotateCcw, AlertTriangle, CheckCircle, Info } from "lucide-react"

export function InsightsPanel() {
  const { stats, isTracking, toggleTracking, resetDailyStats } = useTabTracker()

  const getInsights = () => {
    const insights = []
    const { tabSwitches, focusTime } = stats.todayActivity

    if (tabSwitches > 100) {
      insights.push({
        type: "warning",
        icon: AlertTriangle,
        title: "High Tab Activity",
        message: "You've switched tabs frequently today. Consider using focus techniques to maintain concentration.",
        color: "text-yellow-400",
      })
    } else if (tabSwitches < 20) {
      insights.push({
        type: "success",
        icon: CheckCircle,
        title: "Great Focus",
        message: "Low tab switching indicates good focus and concentration today!",
        color: "text-green-400",
      })
    }

    if (focusTime > 3600) {
      insights.push({
        type: "success",
        icon: CheckCircle,
        title: "Excellent Focus Time",
        message: "You've maintained focus for over an hour. Keep up the great work!",
        color: "text-green-400",
      })
    }

    if (stats.productivityScore < 50) {
      insights.push({
        type: "warning",
        icon: AlertTriangle,
        title: "Productivity Alert",
        message: "Your productivity score is low. Try reducing distractions and using the Pomodoro timer.",
        color: "text-red-400",
      })
    }

    if (insights.length === 0) {
      insights.push({
        type: "info",
        icon: Info,
        title: "Keep Going",
        message: "Your activity looks normal. Stay focused and maintain your productivity momentum!",
        color: "text-blue-400",
      })
    }

    return insights
  }

  const insights = getInsights()

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    if (hours > 0) {
      return `${hours}h ${minutes}m`
    }
    return `${minutes}m`
  }

  return (
    <div className="space-y-6">
      {/* Tracking Controls */}
      <Card className="bg-gradient-to-b from-gray-900 to-black border-gray-800/40">
        <CardHeader>
          <CardTitle className="text-lg font-mono text-white">Tracking Controls</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-mono text-white">Tab Tracking</p>
              <p className="text-xs text-gray-400">Monitor your tab switching behavior</p>
            </div>
            <Button
              onClick={toggleTracking}
              variant="ghost"
              size="sm"
              className={`${
                isTracking ? "text-green-400 hover:text-green-300" : "text-gray-400 hover:text-gray-300"
              } hover:bg-gray-800/50`}
            >
              {isTracking ? <Eye className="w-4 h-4 mr-2" /> : <EyeOff className="w-4 h-4 mr-2" />}
              {isTracking ? "Tracking" : "Paused"}
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-mono text-white">Reset Daily Stats</p>
              <p className="text-xs text-gray-400">Clear today's tracking data</p>
            </div>
            <Button
              onClick={resetDailyStats}
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white hover:bg-gray-800/50"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Comparison */}
      <Card className="bg-gradient-to-b from-gray-900 to-black border-gray-800/40">
        <CardHeader>
          <CardTitle className="text-lg font-mono text-white">Weekly Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-mono text-gray-300">Today's Switches</span>
              <span className="text-sm font-mono text-white">{stats.todayActivity.tabSwitches}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-mono text-gray-300">Weekly Average</span>
              <span className="text-sm font-mono text-white">{Math.round(stats.weeklyAverage)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-mono text-gray-300">Difference</span>
              <span
                className={`text-sm font-mono ${
                  stats.todayActivity.tabSwitches > stats.weeklyAverage ? "text-red-400" : "text-green-400"
                }`}
              >
                {stats.todayActivity.tabSwitches > stats.weeklyAverage ? "+" : ""}
                {Math.round(stats.todayActivity.tabSwitches - stats.weeklyAverage)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Insights */}
      <Card className="bg-gradient-to-b from-gray-900 to-black border-gray-800/40">
        <CardHeader>
          <CardTitle className="text-lg font-mono text-white">Insights</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {insights.map((insight, index) => (
            <div key={index} className="flex items-start space-x-3">
              <insight.icon className={`w-5 h-5 ${insight.color} flex-shrink-0 mt-0.5`} />
              <div>
                <p className="text-sm font-mono text-white font-medium">{insight.title}</p>
                <p className="text-xs text-gray-400 leading-relaxed">{insight.message}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
