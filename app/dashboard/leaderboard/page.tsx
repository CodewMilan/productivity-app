"use client"

import { useEffect, useMemo, useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { useTabTracker } from "@/contexts/tab-tracker-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowUpDown } from "lucide-react"

type LeaderRow = {
  id: string
  name: string
  email: string
  age?: number
  score: number
  updatedAt?: string
}

const LB_KEY = "productivity-app-leaderboard"

export default function LeaderboardPage() {
  const { user } = useAuth()
  const { stats } = useTabTracker()
  const [rows, setRows] = useState<LeaderRow[]>([])
  const [sortDesc, setSortDesc] = useState(true)

 
  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("auth-users") || "[]")
    const scores = JSON.parse(localStorage.getItem(LB_KEY) || "{}")
    const mapped: LeaderRow[] = users.map((u: any) => ({
      id: u.id,
      name: u.name,
      email: u.email,
      age: u.age,
      score: scores[u.id]?.score ?? 0,
      updatedAt: scores[u.id]?.updatedAt,
    }))
    setRows(mapped)
  }, [])

  const sorted = useMemo(() => {
    return [...rows].sort((a, b) => (sortDesc ? b.score - a.score : a.score - b.score))
  }, [rows, sortDesc])

  const syncMyScore = () => {
    if (!user) return
    const current = JSON.parse(localStorage.getItem(LB_KEY) || "{}")
    current[user.id] = {
      score: stats.productivityScore ?? 0,
      updatedAt: new Date().toISOString(),
    }
    localStorage.setItem(LB_KEY, JSON.stringify(current))
    setRows((prev) =>
      prev.map((r) =>
        r.id === user.id ? { ...r, score: current[user.id].score, updatedAt: current[user.id].updatedAt } : r,
      ),
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-mono text-white">Leaderboard</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => setSortDesc((s) => !s)}>
            <ArrowUpDown className="w-4 h-4 mr-1" />
            Sort
          </Button>
          {user && <Button onClick={syncMyScore}>Sync my score</Button>}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Top Productivity Scores</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Age</TableHead>
                <TableHead className="text-right">Prod Score</TableHead>
                <TableHead className="text-right">Updated</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sorted.map((r, idx) => (
                <TableRow key={r.id}>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>{r.name}</TableCell>
                  <TableCell className="text-muted-foreground">{r.email}</TableCell>
                  <TableCell>{r.age ?? "—"}</TableCell>
                  <TableCell className="text-right font-medium">{r.score}</TableCell>
                  <TableCell className="text-right text-xs text-muted-foreground">
                    {r.updatedAt ? new Date(r.updatedAt).toLocaleString() : "—"}
                  </TableCell>
                </TableRow>
              ))}
              {sorted.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground">
                    No users yet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}