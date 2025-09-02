"use client"

import { ArrowRight, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side - Content */}
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl lg:text-7xl font-mono font-light text-foreground tracking-tight leading-tight">
              Unlock Your
              <span className="block text-primary font-medium">Productivity</span>
              <span className="block">Potential</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-lg leading-relaxed">
              Master your time with our all-in-one productivity suite. Pomodoro timer, smart notes, calendar reminders,
              and focus tracking - all in one beautiful app.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="text-lg px-8 py-6 group">
              <Link href="/auth">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>

          <div className="flex items-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span>Free forever plan</span>
            </div>
          </div>
        </div>

        {/* Right Side - App Preview */}
        <div className="relative">
          <div className="relative bg-card rounded-3xl p-8 shadow-2xl border border-border">
            <div className="bg-background rounded-2xl p-6 shadow-inner">
              {/* Mock Timer Display */}
              <div className="text-center mb-6">
                <div className="text-6xl font-mono font-light text-foreground mb-2">25:00</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider">Focus Mode</div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 bg-muted rounded-full mb-6">
                <div className="h-full bg-primary rounded-full w-3/4 transition-all duration-1000"></div>
              </div>

              {/* Control Buttons */}
              <div className="flex justify-center gap-4 mb-6">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <Play className="w-5 h-5 text-primary-foreground ml-0.5" />
                </div>
                <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-muted-foreground rounded"></div>
                </div>
              </div>

              {/* Sessions Counter */}
              <div className="text-center">
                <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Sessions Today</div>
                <div className="text-2xl font-mono text-foreground">3</div>
              </div>
            </div>
          </div>

          {/* Floating Elements */}
          <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium shadow-lg">
            🎯 Focused
          </div>
          <div className="absolute -bottom-4 -left-4 bg-card border border-border px-4 py-2 rounded-full text-sm shadow-lg">
            📝 3 notes today
          </div>
        </div>
      </div>
    </section>
  )
}
