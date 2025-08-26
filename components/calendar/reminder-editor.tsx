"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Save, X } from "lucide-react"
import { useCalendar } from "@/contexts/calendar-context"

interface Reminder {
  id: string
  title: string
  description: string
  date: string
  time: string
  createdAt: Date
}

interface ReminderEditorProps {
  reminder?: Reminder
  selectedDate?: string
  onClose: () => void
}

export function ReminderEditor({ reminder, selectedDate, onClose }: ReminderEditorProps) {
  const { addReminder, updateReminder } = useCalendar()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")

  useEffect(() => {
    if (reminder) {
      setTitle(reminder.title)
      setDescription(reminder.description)
      setDate(reminder.date)
      setTime(reminder.time)
    } else if (selectedDate) {
      setDate(selectedDate)
      setTime("09:00")
    }
  }, [reminder, selectedDate])

  const handleSave = () => {
    if (!title.trim()) {
      alert("Please enter a title for your reminder")
      return
    }

    if (!date) {
      alert("Please select a date")
      return
    }

    if (!time) {
      alert("Please select a time")
      return
    }

    if (reminder) {
      updateReminder(reminder.id, title, description, date, time)
    } else {
      addReminder(title, description, date, time)
    }

    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md bg-gradient-to-b from-gray-900 to-black border-gray-800/40">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-mono text-white">
            {reminder ? "Edit Reminder" : "Create Reminder"}
          </CardTitle>
          <Button
            onClick={onClose}
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-white hover:bg-gray-800/50"
          >
            <X className="w-5 h-5" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-gray-300 font-mono text-sm">
              Title
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-black border-gray-700 text-white font-mono"
              placeholder="Enter reminder title..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-gray-300 font-mono text-sm">
              Description (optional)
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-black border-gray-700 text-white font-mono min-h-[80px] resize-none"
              placeholder="Add description..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date" className="text-gray-300 font-mono text-sm">
                Date
              </Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="bg-black border-gray-700 text-white font-mono"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="time" className="text-gray-300 font-mono text-sm">
                Time
              </Label>
              <Input
                id="time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="bg-black border-gray-700 text-white font-mono"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              onClick={onClose}
              variant="ghost"
              className="text-gray-400 hover:text-white hover:bg-gray-800/50 font-mono"
            >
              Cancel
            </Button>
            <Button onClick={handleSave} className="bg-white text-black hover:bg-gray-200 font-mono">
              <Save className="w-4 h-4 mr-2" />
              {reminder ? "Update" : "Save"} Reminder
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
