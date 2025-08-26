"use client"

import { usePomodoro } from "@/contexts/pomodoro-context"
import { Button } from "@/components/ui/button"
import { Play, Pause, RotateCcw } from "lucide-react"

export function MiniTimer() {
  const { timeLeft, isActive, isBreak, toggleTimer, resetTimer } = usePomodoro()

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="fixed bottom-4 right-4 bg-gradient-to-b from-gray-900 to-black rounded-2xl p-4 border border-gray-800/40 shadow-2xl backdrop-blur-sm z-40">
      <div className="flex items-center space-x-3">
        <div className="text-center">
          <div className="text-lg font-mono text-white font-bold">{formatTime(timeLeft)}</div>
          <div className="text-xs text-gray-400 font-mono uppercase tracking-wider">{isBreak ? "Break" : "Focus"}</div>
        </div>
        <div className="flex space-x-2">
          <Button
            onClick={toggleTimer}
            size="sm"
            variant="ghost"
            className="text-gray-400 hover:text-white hover:bg-gray-800/50 p-2"
          >
            {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </Button>
          <Button
            onClick={resetTimer}
            size="sm"
            variant="ghost"
            className="text-gray-400 hover:text-white hover:bg-gray-800/50 p-2"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
