"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search } from "lucide-react"
import { useNotes } from "@/contexts/notes-context"
import { NoteCard } from "@/components/notes/note-card"
import { NoteEditor } from "@/components/notes/note-editor"

interface Note {
  id: string
  title: string
  content: string
  createdAt: Date
  updatedAt: Date
  tags: string[]
}

export default function NotesPage() {
  const { notes, searchNotes } = useNotes()
  const [searchQuery, setSearchQuery] = useState("")
  const [showEditor, setShowEditor] = useState(false)
  const [editingNote, setEditingNote] = useState<Note | undefined>(undefined)

  const displayedNotes = searchQuery ? searchNotes(searchQuery) : notes

  const handleCreateNote = () => {
    setEditingNote(undefined)
    setShowEditor(true)
  }

  const handleEditNote = (note: Note) => {
    setEditingNote(note)
    setShowEditor(true)
  }

  const handleCloseEditor = () => {
    setShowEditor(false)
    setEditingNote(undefined)
  }

  return (
    <div className="p-6 min-h-[calc(100vh-5rem)]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-mono font-light text-white tracking-[0.3em] uppercase mb-4">Notes</h1>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mx-auto"></div>
        </div>

        {/* Search and Create Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-black border-gray-700 text-white font-mono pl-10"
              placeholder="Search notes by title, content, or tags..."
            />
          </div>
          <Button onClick={handleCreateNote} className="bg-white text-black hover:bg-gray-200 font-mono">
            <Plus className="w-4 h-4 mr-2" />
            New Note
          </Button>
        </div>

        {/* Notes Grid */}
        {displayedNotes.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-gradient-to-b from-gray-900 to-black rounded-2xl p-12 border border-gray-800/40">
              <p className="text-gray-400 font-mono text-lg mb-4">
                {searchQuery ? "No notes found matching your search" : "No notes yet"}
              </p>
              <p className="text-gray-500 font-mono text-sm mb-6">
                {searchQuery ? "Try a different search term" : "Create your first note to get started"}
              </p>
              {!searchQuery && (
                <Button onClick={handleCreateNote} className="bg-white text-black hover:bg-gray-200 font-mono">
                  <Plus className="w-4 h-4 mr-2" />
                  Create First Note
                </Button>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedNotes.map((note) => (
              <NoteCard key={note.id} note={note} onEdit={handleEditNote} />
            ))}
          </div>
        )}

        {/* Note Editor Modal */}
        {showEditor && <NoteEditor note={editingNote} onClose={handleCloseEditor} />}
      </div>
    </div>
  )
}
