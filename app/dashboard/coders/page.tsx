"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Github, Cable, ExternalLink } from "lucide-react"

type GitHubStats = {
  login: string
  name?: string
  avatar_url?: string
  public_repos: number
  followers: number
  following: number
  html_url: string
}

type LeetCodeStats = {
  totalSolved: number
  easySolved: number
  mediumSolved: number
  hardSolved: number
  ranking?: number
}

export default function CodersPage() {
  const { user } = useAuth()
  const [githubUsername, setGithubUsername] = useState("")
  const [leetcodeUsername, setLeetcodeUsername] = useState("")
  const [ghStats, setGhStats] = useState<GitHubStats | null>(null)
  const [lcStats, setLcStats] = useState<LeetCodeStats | null>(null)
  const [loading, setLoading] = useState(false)
  const storageKey = user ? `productivity-app-coders-${user.id}` : ""

  useEffect(() => {
    if (!user) return
    const saved = localStorage.getItem(storageKey)
    if (saved) {
      const parsed = JSON.parse(saved)
      setGithubUsername(parsed.githubUsername || "")
      setLeetcodeUsername(parsed.leetcodeUsername || "")
    }
  }, [user, storageKey])

  const persistConnections = (next?: Partial<{ githubUsername: string; leetcodeUsername: string }>) => {
    if (!user) return
    const existing = JSON.parse(localStorage.getItem(storageKey) || "{}")
    const merged = { ...existing, ...next }
    localStorage.setItem(storageKey, JSON.stringify(merged))
  }

  const fetchGitHub = async () => {
    if (!githubUsername) return
    setLoading(true)
    try {
      const res = await fetch(`https://api.github.com/users/${githubUsername}`)
      if (!res.ok) throw new Error("GitHub user not found")
      const data = (await res.json()) as GitHubStats
      setGhStats(data)
      persistConnections()
    } catch (e) {
      setGhStats(null)
    } finally {
      setLoading(false)
    }
  }

  const fetchLeetCode = async () => {
    if (!leetcodeUsername) return
    setLoading(true)
    try {
      
      const res = await fetch(`https://leetcode-stats-api.herokuapp.com/${leetcodeUsername}`, { cache: "no-store" })
      if (!res.ok) throw new Error("LeetCode stats unavailable")
      const data = await res.json()
      const mapped: LeetCodeStats = {
        totalSolved: data.totalSolved ?? 0,
        easySolved: data.easySolved ?? 0,
        mediumSolved: data.mediumSolved ?? 0,
        hardSolved: data.hardSolved ?? 0,
        ranking: data.ranking,
      }
      setLcStats(mapped)
      persistConnections()
    } catch (e) {
      setLcStats(null)
    } finally {
      setLoading(false)
    }
  }

  const connectGitHub = async () => {
    persistConnections({ githubUsername })
    await fetchGitHub()
  }

  const connectLeetCode = async () => {
    persistConnections({ leetcodeUsername })
    await fetchLeetCode()
  }

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-8">
        <p className="text-gray-300">Please sign in to connect your coding profiles.</p>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
      <h1 className="text-2xl md:text-3xl font-mono text-white">Coders</h1>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Github className="w-5 h-5" />
              GitHub
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="gh-username">Username</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="gh-username"
                  placeholder="e.g. octocat"
                  value={githubUsername}
                  onChange={(e) => setGithubUsername(e.target.value)}
                  onBlur={() => persistConnections({ githubUsername })}
                />
                <Button onClick={connectGitHub} disabled={loading || !githubUsername}>
                  <Cable className="w-4 h-4 mr-2" />
                  Connect
                </Button>
              </div>
            </div>

            {ghStats ? (
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <div className="text-muted-foreground">Public Repos</div>
                  <div className="text-white text-lg">{ghStats.public_repos}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Followers</div>
                  <div className="text-white text-lg">{ghStats.followers}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Following</div>
                  <div className="text-white text-lg">{ghStats.following}</div>
                </div>
                <div className="col-span-2">
                  <a
                    href={ghStats.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-primary hover:underline"
                  >
                    View Profile <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ) : (
              githubUsername && (
                <p className="text-xs text-muted-foreground">Enter username and click Connect to load stats.</p>
              )
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>LeetCode</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="lc-username">Username</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="lc-username"
                  placeholder="e.g. johndoe"
                  value={leetcodeUsername}
                  onChange={(e) => setLeetcodeUsername(e.target.value)}
                  onBlur={() => persistConnections({ leetcodeUsername })}
                />
                <Button onClick={connectLeetCode} disabled={loading || !leetcodeUsername}>
                  <Cable className="w-4 h-4 mr-2" />
                  Connect
                </Button>
              </div>
            </div>

            {lcStats ? (
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <div className="text-muted-foreground">Total Solved</div>
                  <div className="text-white text-lg">{lcStats.totalSolved}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Ranking</div>
                  <div className="text-white text-lg">{lcStats.ranking ?? "—"}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Easy</div>
                  <div className="text-white text-lg">{lcStats.easySolved}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Medium</div>
                  <div className="text-white text-lg">{lcStats.mediumSolved}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Hard</div>
                  <div className="text-white text-lg">{lcStats.hardSolved}</div>
                </div>
              </div>
            ) : (
              leetcodeUsername && (
                <p className="text-xs text-muted-foreground">
                  Stats may require an external API and could be unavailable due to CORS. We’ll show data when
                  accessible.
                </p>
              )
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
