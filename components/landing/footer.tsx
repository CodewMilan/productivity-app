import Link from "next/link"

type FooterProps = {
  githubUrl?: string
  linkedinUrl?: string
}

export function LandingFooter({
  githubUrl = "https://github.com/CodewMilan", 
  linkedinUrl = "https://linkedin.com/in/milan4606", 
}: FooterProps) {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-7xl px-6 py-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-muted-foreground">Built by Milan</p>
        <div className="flex items-center gap-4">
          <Link
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-foreground underline-offset-4 hover:underline"
            aria-label="GitHub profile"
          >
            GitHub
          </Link>
          <Link
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-foreground underline-offset-4 hover:underline"
            aria-label="LinkedIn profile"
          >
            LinkedIn
          </Link>
        </div>
      </div>
    </footer>
  )
}
