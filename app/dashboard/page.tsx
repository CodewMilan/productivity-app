"use client"

import type React from "react"
import { Play, Pause, RotateCcw, Clock, SkipForward } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { usePomodoro } from "@/contexts/pomodoro-context"
import { StatsCard } from "@/components/pomodoro/stats-card"

function TimerDisplay({
  timeLeft,
  isBreak,
  progress,
  displayStyle,
}: { timeLeft: number; isBreak: boolean; progress: number; displayStyle: "modern" | "retro" }) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  if (displayStyle === "retro") {
    return (
      <div className="relative bg-gradient-to-b from-gray-900 to-black rounded-3xl shadow-2xl border border-gray-700/30 p-6 mb-8 hover:shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:border-gray-600/40 transition-all duration-500 hover:scale-[1.02] transform">
        <div className="absolute inset-1 bg-gradient-to-b from-white/5 to-transparent rounded-3xl pointer-events-none hover:from-white/8 transition-all duration-500"></div>

        <div className="relative bg-gradient-to-b from-white/3 to-transparent rounded-2xl p-8 shadow-inner">
          <div className="bg-black rounded-xl p-6 shadow-inner border border-white/10 hover:border-white/20 transition-all duration-300">
            <div className="text-center">
              <div
                className="text-6xl font-mono font-black text-white tracking-tighter mb-4 drop-shadow-[0_0_25px_rgba(255,255,255,0.4)] animate-pulse hover:drop-shadow-[0_0_35px_rgba(255,255,255,0.6)] hover:scale-105 transition-all duration-300"
                style={{
                  fontFamily: "var(--font-kode-mono), monospace",
                  fontVariantNumeric: "tabular-nums",
                  letterSpacing: "-0.05em",
                }}
              >
                {formatTime(timeLeft)}
              </div>
              <div className="text-sm text-gray-300/90 uppercase tracking-[0.2em] font-mono font-medium hover:text-gray-200 hover:tracking-[0.25em] transition-all duration-300">
                {isBreak ? "Break Time" : "Focus Mode"}
              </div>
            </div>

            <div className="mt-8 px-1">
              <div className="w-full h-2 bg-gray-900 rounded-full shadow-inner border border-white/10 hover:border-white/20 transition-all duration-300">
                <div
                  className="h-full bg-gradient-to-r from-white/80 to-white/60 rounded-full transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:shadow-[0_0_25px_rgba(255,255,255,0.5)]"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative bg-gradient-to-b from-gray-900 to-black rounded-3xl shadow-xl border border-gray-800/40 p-6 mb-8 hover:shadow-[0_0_35px_rgba(255,255,255,0.08)] hover:border-gray-700/50 transition-all duration-500 hover:scale-[1.02] transform">
      <div className="absolute inset-1 bg-gradient-to-b from-white/8 to-transparent rounded-3xl pointer-events-none hover:from-white/12 transition-all duration-500"></div>

      <div className="relative bg-gradient-to-b from-gray-900/80 to-black rounded-2xl p-8 shadow-inner">
        <div className="bg-black rounded-xl p-6 shadow-inner border border-white/10 hover:border-white/15 transition-all duration-300">
          <div className="text-center">
            <div
              className="text-6xl font-mono font-black text-white tracking-tighter mb-4 drop-shadow-[0_0_20px_rgba(255,255,255,0.4)] hover:drop-shadow-[0_0_30px_rgba(255,255,255,0.6)] hover:scale-105 transition-all duration-300"
              style={{
                fontFamily: "var(--font-kode-mono), monospace",
                fontVariantNumeric: "tabular-nums",
                letterSpacing: "-0.05em",
              }}
            >
              {formatTime(timeLeft)}
            </div>
            <div className="text-sm text-gray-300/80 uppercase tracking-[0.2em] font-mono font-medium hover:text-gray-200 hover:tracking-[0.25em] transition-all duration-300">
              {isBreak ? "Break Time" : "Focus Mode"}
            </div>
          </div>

          <div className="mt-8 px-1">
            <div className="w-full h-1.5 bg-gray-900 rounded-full shadow-inner hover:h-2 transition-all duration-300">
              <div
                className="h-full bg-gradient-to-r from-white/70 to-white/50 rounded-full transition-all duration-1000 ease-out shadow-[0_0_12px_rgba(255,255,255,0.3)] hover:shadow-[0_0_20px_rgba(255,255,255,0.5)]"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ControlButton({
  onClick,
  children,
  className = "",
}: { onClick: () => void; children: React.ReactNode; className?: string }) {
  return (
    <button
      onClick={onClick}
      className={`relative w-14 h-14 bg-gradient-to-b from-gray-800 to-black rounded-full shadow-lg border border-gray-700/60 hover:from-gray-700 hover:to-gray-900 hover:shadow-[0_0_25px_rgba(255,255,255,0.1)] hover:border-gray-600/70 hover:scale-110 active:shadow-inner active:from-black active:to-gray-900 active:scale-95 transition-all duration-200 transform ${className}`}
    >
      <div className="absolute inset-0.5 bg-gradient-to-b from-white/8 to-transparent rounded-full pointer-events-none hover:from-white/15 transition-all duration-200"></div>
      <div className="relative flex items-center justify-center text-gray-200 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] transition-all duration-200">
        {children}
      </div>
    </button>
  )
}

function SessionCounter({ sessions }: { sessions: number }) {
  return (
    <div className="relative bg-gradient-to-b from-gray-900 to-black rounded-2xl p-6 shadow-inner border border-gray-800/40 hover:border-gray-700/50 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:scale-[1.02] transition-all duration-300 transform">
      <div className="absolute inset-1 bg-gradient-to-b from-white/5 to-transparent rounded-2xl pointer-events-none hover:from-white/8 transition-all duration-300"></div>
      <div className="text-center relative">
        <div className="text-xs text-gray-400/90 uppercase tracking-[0.15em] font-mono font-medium mb-3 hover:text-gray-300 hover:tracking-[0.2em] transition-all duration-300">
          Sessions Today
        </div>
        <div className="text-4xl font-mono font-light text-gray-100 drop-shadow-sm hover:text-white hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:scale-110 transition-all duration-300 transform">
          {sessions}
        </div>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  const { user } = useAuth()
  const {
    timeLeft,
    isActive,
    isBreak,
    sessions,
    displayStyle,
    toggleTimer,
    resetTimer,
    toggleDisplayStyle,
    skipSession,
  } = usePomodoro()

  const FOCUS_TIME = 25 * 60
  const BREAK_TIME = 5 * 60
  const progress = isBreak ? ((BREAK_TIME - timeLeft) / BREAK_TIME) * 100 : ((FOCUS_TIME - timeLeft) / FOCUS_TIME) * 100

  return (
    <div className="p-6 min-h-[calc(100vh-5rem)]">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 flex items-center justify-center">
            <div className="w-full max-w-sm">
              <div className="text-center mb-12 hover:scale-105 transition-all duration-300 transform">
                <h1 className="text-lg font-mono font-light text-gray-200 tracking-[0.3em] uppercase hover:text-white hover:tracking-[0.35em] hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.2)] transition-all duration-300">
                  Pomodoro Timer
                </h1>
                <div className="w-16 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mx-auto mt-4 hover:w-24 hover:via-white/50 transition-all duration-500"></div>
              </div>

              <TimerDisplay timeLeft={timeLeft} isBreak={isBreak} progress={progress} displayStyle={displayStyle} />

              <div className="flex justify-center gap-6 mb-8">
                <ControlButton onClick={toggleTimer}>
                  {isActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                </ControlButton>

                <ControlButton onClick={toggleDisplayStyle}>
                  <Clock className="w-5 h-5" />
                </ControlButton>

                <ControlButton onClick={skipSession}>
                  <SkipForward className="w-5 h-5" />
                </ControlButton>

                <ControlButton onClick={resetTimer}>
                  <RotateCcw className="w-5 h-5" />
                </ControlButton>
              </div>

              <SessionCounter sessions={sessions} />
            </div>
          </div>

         
          <div className="space-y-6">
            <StatsCard />

            <div className="text-center">
              <p className="text-xs text-gray-500/70 font-mono tracking-wider hover:text-gray-400 hover:tracking-widest transition-all duration-300">
                FOCUS & PRODUCTIVITY
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
