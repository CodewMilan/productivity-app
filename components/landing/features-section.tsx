import { Clock, FileText, Calendar, BarChart3 } from "lucide-react"

const features = [
  {
    icon: Clock,
    title: "Pomodoro Timer",
    description:
      "Stay focused with customizable work and break intervals. Track your productivity sessions and build consistent habits.",
  },
  {
    icon: FileText,
    title: "Smart Notes",
    description:
      "Capture ideas instantly with our intuitive note-taking system. Search, tag, and organize your thoughts effortlessly.",
  },
  {
    icon: Calendar,
    title: "Calendar & Reminders",
    description:
      "Never miss important tasks with our integrated calendar. Set reminders and stay on top of your schedule.",
  },
  {
    icon: BarChart3,
    title: "Focus Tracking",
    description:
      "Monitor your digital habits and tab usage. Get insights into your focus patterns and improve your productivity.",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-mono font-light text-foreground mb-6">
            Everything You Need to
            <span className="block text-primary">Stay Productive</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our comprehensive suite of productivity tools works together seamlessly to help you focus, organize, and
            achieve your goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-card rounded-2xl p-8 shadow-lg border border-border hover:shadow-xl hover:border-primary/20 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-mono font-medium text-foreground mb-4">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
