"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useTabTracker } from "@/contexts/tab-tracker-context"
import { BarChart3, TrendingUp, TrendingDown } from "lucide-react"

export function ActivityChart() {
  const { stats } = useTabTracker()

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    if (hours > 0) {
      return `${hours}h ${minutes}m`
    }
    return `${minutes}m`
  }

  const getProductivityColor = (score: number) => {
    if (score >= 80) return "text-green-400"
    if (score >= 60) return "text-yellow-400"
    return "text-red-400"
  }

  const getProductivityIcon = (score: number) => {
    if (score >= 70) return TrendingUp
    return TrendingDown
  }

  const ProductivityIcon = getProductivityIcon(stats.productivityScore)


  const hourlyData = Array.from({ length: 24 }, (_, hour) => ({
    hour,
    activity: hour === stats.todayActivity.mostActiveHour ? stats.todayActivity.tabSwitches : Math.random() * 10,
  }))

  return (
    <div className="space-y-6">
      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-b from-gray-900 to-black border-gray-800/40">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400 font-mono uppercase tracking-wider">Tab Switches</p>
                <p className="text-2xl font-mono text-white font-bold">{stats.todayActivity.tabSwitches}</p>
              </div>
              <BarChart3 className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-b from-gray-900 to-black border-gray-800/40">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400 font-mono uppercase tracking-wider">Focus Time</p>
                <p className="text-2xl font-mono text-white font-bold">{formatTime(stats.todayActivity.focusTime)}</p>
              </div>
              <div className="w-8 h-8 bg-green-400/20 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-green-400 rounded-full"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-b from-gray-900 to-black border-gray-800/40">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400 font-mono uppercase tracking-wider">Avg Focus</p>
                <p className="text-2xl font-mono text-white font-bold">{formatTime(stats.averageFocusTime)}</p>
              </div>
              <div className="w-8 h-8 bg-purple-400/20 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-purple-400 rounded-full"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-b from-gray-900 to-black border-gray-800/40">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400 font-mono uppercase tracking-wider">Productivity</p>
                <p className={`text-2xl font-mono font-bold ${getProductivityColor(stats.productivityScore)}`}>
                  {stats.productivityScore}%
                </p>
              </div>
              <ProductivityIcon className={`w-8 h-8 ${getProductivityColor(stats.productivityScore)}`} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity Timeline */}
      <Card className="bg-gradient-to-b from-gray-900 to-black border-gray-800/40">
        <CardHeader>
          <CardTitle className="text-lg font-mono text-white">Daily Activity Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm font-mono text-gray-400">
              <span>00:00</span>
              <span>06:00</span>
              <span>12:00</span>
              <span>18:00</span>
              <span>24:00</span>
            </div>
            <div className="flex items-end space-x-1 h-32">
              {hourlyData.map((data, index) => (
                <div
                  key={index}
                  className="flex-1 bg-gray-800 rounded-t-sm relative group cursor-pointer hover:bg-gray-700 transition-colors"
                  style={{
                    height: `${Math.max(4, (data.activity / Math.max(...hourlyData.map((d) => d.activity))) * 100)}%`,
                  }}
                >
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black rounded text-xs font-mono text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {data.hour}:00 - {Math.round(data.activity)} switches
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
