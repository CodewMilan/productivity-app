"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function ProfilePopover() {
  const { user, updateProfile } = useAuth()
  const [open, setOpen] = useState(false)
  const [name, setName] = useState(user?.name ?? "")
  const [age, setAge] = useState<number | undefined>(user?.age)

  useEffect(() => {
    setName(user?.name ?? "")
    setAge(user?.age)
  }, [user])

  const initials = (user?.name || user?.email || "?")
    .split(" ")
    .map((s) => s[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  const onSave = async () => {
    await updateProfile({ name, age: Number.isFinite(age as number) ? Number(age) : undefined })
    setOpen(false)
  }

  if (!user) return null

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-gray-800/50 text-gray-200"
          aria-label="Open profile"
        >
          <Avatar className="size-8">
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <span className="hidden sm:inline text-sm">{user.name}</span>
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80">
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium">Profile</h3>
            <p className="text-xs text-muted-foreground">Manage your personal information</p>
          </div>
          <div className="grid gap-3">
            <div className="grid gap-1.5">
              <Label htmlFor="email">Email (read-only)</Label>
              <Input id="email" value={user.email} readOnly className="opacity-80" />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                min={0}
                value={age ?? ""}
                onChange={(e) => setAge(e.target.value ? Number(e.target.value) : undefined)}
                placeholder="Your age"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button size="sm" onClick={onSave}>
              Save
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
