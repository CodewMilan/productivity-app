"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Save, X } from "lucide-react"
import { useNotes } from "@/contexts/notes-context"

interface Note {
  id: string
  title: string
  content: string
  createdAt: Date
  updatedAt: Date
  tags: string[]
}

interface NoteEditorProps {
  note?: Note
  onClose: () => void
}

export function NoteEditor({ note, onClose }: NoteEditorProps) {
  const { addNote, updateNote } = useNotes()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [tagsInput, setTagsInput] = useState("")

  useEffect(() => {
    if (note) {
      setTitle(note.title)
      setContent(note.content)
      setTagsInput(note.tags.join(", "))
    }
  }, [note])

  const handleSave = () => {
    if (!title.trim()) {
      alert("Please enter a title for your note")
      return
    }

    const tags = tagsInput
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0)

    if (note) {
      updateNote(note.id, title, content, tags)
    } else {
      addNote(title, content, tags)
    }

    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl bg-gradient-to-b from-gray-900 to-black border-gray-800/40 max-h-[90vh] overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-mono text-white">{note ? "Edit Note" : "Create New Note"}</CardTitle>
          <Button
            onClick={onClose}
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-white hover:bg-gray-800/50"
          >
            <X className="w-5 h-5" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-4 overflow-y-auto">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-gray-300 font-mono text-sm">
              Title
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-black border-gray-700 text-white font-mono"
              placeholder="Enter note title..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content" className="text-gray-300 font-mono text-sm">
              Content
            </Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="bg-black border-gray-700 text-white font-mono min-h-[300px] resize-none"
              placeholder="Write your note here..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags" className="text-gray-300 font-mono text-sm">
              Tags (comma separated)
            </Label>
            <Input
              id="tags"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              className="bg-black border-gray-700 text-white font-mono"
              placeholder="work, personal, ideas..."
            />
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
              {note ? "Update" : "Save"} Note
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
