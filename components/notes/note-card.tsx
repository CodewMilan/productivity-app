"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Edit, Trash2, Tag } from "lucide-react"
import { useNotes } from "@/contexts/notes-context"

interface Note {
  id: string
  title: string
  content: string
  createdAt: Date
  updatedAt: Date
  tags: string[]
}

interface NoteCardProps {
  note: Note
  onEdit: (note: Note) => void
}

export function NoteCard({ note, onEdit }: NoteCardProps) {
  const { deleteNote } = useNotes()
  const [showFullContent, setShowFullContent] = useState(false)

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this note?")) {
      deleteNote(note.id)
    }
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  const truncateContent = (content: string, maxLength = 150) => {
    if (content.length <= maxLength) return content
    return content.substring(0, maxLength) + "..."
  }

  return (
    <Card className="bg-gradient-to-b from-gray-900 to-black border-gray-800/40 hover:border-gray-700/50 transition-all duration-300 hover:scale-[1.02] transform">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-mono text-white font-medium truncate pr-2">{note.title}</h3>
          <div className="flex items-center space-x-2 flex-shrink-0">
            <Button
              onClick={() => onEdit(note)}
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white hover:bg-gray-800/50 p-2"
            >
              <Edit className="w-4 h-4" />
            </Button>
            <Button
              onClick={handleDelete}
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-red-400 hover:bg-gray-800/50 p-2"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <p className="text-xs text-gray-500 font-mono">{formatDate(note.updatedAt)}</p>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="mb-4">
          <p className="text-gray-300 font-mono text-sm leading-relaxed whitespace-pre-wrap">
            {showFullContent ? note.content : truncateContent(note.content)}
          </p>
          {note.content.length > 150 && (
            <button
              onClick={() => setShowFullContent(!showFullContent)}
              className="text-white/70 hover:text-white font-mono text-xs mt-2 transition-colors"
            >
              {showFullContent ? "Show less" : "Show more"}
            </button>
          )}
        </div>
        {note.tags.length > 0 && (
          <div className="flex items-center flex-wrap gap-2">
            <Tag className="w-3 h-3 text-gray-500" />
            {note.tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-800/50 text-gray-300 font-mono text-xs rounded-md border border-gray-700/50"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
