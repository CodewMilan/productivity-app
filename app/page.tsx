"use client"

import { useAuth } from "@/contexts/auth-context"
import { LandingHeader } from "@/components/landing/header"
import { HeroSection } from "@/components/landing/hero-section"
import { FeaturesSection } from "@/components/landing/features-section"
import { CTASection } from "@/components/landing/cta-section"

export default function HomePage() {
  const { isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-foreground font-mono">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <LandingHeader />
      <main>
        <HeroSection />
        <FeaturesSection />
        <CTASection />
      </main>
    </div>
  )
}
