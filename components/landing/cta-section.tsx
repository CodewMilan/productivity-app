import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function CTASection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-card rounded-3xl p-12 shadow-2xl border border-border">
          <h2 className="text-4xl lg:text-5xl font-mono font-light text-foreground mb-6">
            Ready to Transform Your
            <span className="block text-primary">Productivity?</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of users who have already improved their focus and achieved their goals with our productivity
            suite.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button asChild size="lg" className="text-lg px-8 py-6 group">
              <Link href="/auth">
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>

          <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span>Setup in under 2 minutes</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span>Works on all devices</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span>No installation required</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
