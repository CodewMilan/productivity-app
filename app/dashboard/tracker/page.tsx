"use client"

import { ActivityChart } from "@/components/tab-tracker/activity-chart"
import { InsightsPanel } from "@/components/tab-tracker/insights-panel"

export default function TrackerPage() {
  return (
    <div className="p-6 min-h-[calc(100vh-5rem)]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-mono font-light text-white tracking-[0.3em] uppercase mb-4">Tab Tracker</h1>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mx-auto mb-4"></div>
          <p className="text-gray-400 font-mono text-sm max-w-2xl mx-auto">
            Monitor your tab switching behavior and focus patterns to improve productivity and reduce digital
            distractions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Activity Chart */}
          <div className="lg:col-span-2">
            <ActivityChart />
          </div>

          {/* Insights Panel */}
          <div>
            <InsightsPanel />
          </div>
        </div>
      </div>
    </div>
  )
}
