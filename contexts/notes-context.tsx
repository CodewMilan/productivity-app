"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface Note {
  id: string
  title: string
  content: string
  createdAt: Date
  updatedAt: Date
  tags: string[]
}

interface NotesContextType {
  notes: Note[]
  addNote: (title: string, content: string, tags?: string[]) => void
  updateNote: (id: string, title: string, content: string, tags?: string[]) => void
  deleteNote: (id: string) => void
  searchNotes: (query: string) => Note[]
}

const NotesContext = createContext<NotesContextType | undefined>(undefined)

export function NotesProvider({ children }: { children: React.ReactNode }) {
  const [notes, setNotes] = useState<Note[]>([])

  useEffect(() => {
    const storedNotes = localStorage.getItem("productivity-app-notes")
    if (storedNotes) {
      const parsedNotes = JSON.parse(storedNotes).map((note: any) => ({
        ...note,
        createdAt: new Date(note.createdAt),
        updatedAt: new Date(note.updatedAt),
      }))
      setNotes(parsedNotes)
    }
  }, [])

  const saveNotes = (updatedNotes: Note[]) => {
    setNotes(updatedNotes)
    localStorage.setItem("productivity-app-notes", JSON.stringify(updatedNotes))
  }

  const addNote = (title: string, content: string, tags: string[] = []) => {
    const newNote: Note = {
      id: Date.now().toString(),
      title,
      content,
      createdAt: new Date(),
      updatedAt: new Date(),
      tags,
    }
    const updatedNotes = [newNote, ...notes]
    saveNotes(updatedNotes)
  }

  const updateNote = (id: string, title: string, content: string, tags: string[] = []) => {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, title, content, tags, updatedAt: new Date() } : note,
    )
    saveNotes(updatedNotes)
  }

  const deleteNote = (id: string) => {
    const updatedNotes = notes.filter((note) => note.id !== id)
    saveNotes(updatedNotes)
  }

  const searchNotes = (query: string): Note[] => {
    if (!query.trim()) return notes
    const lowercaseQuery = query.toLowerCase()
    return notes.filter(
      (note) =>
        note.title.toLowerCase().includes(lowercaseQuery) ||
        note.content.toLowerCase().includes(lowercaseQuery) ||
        note.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery)),
    )
  }

  return (
    <NotesContext.Provider value={{ notes, addNote, updateNote, deleteNote, searchNotes }}>
      {children}
    </NotesContext.Provider>
  )
}

export function useNotes() {
  const context = useContext(NotesContext)
  if (context === undefined) {
    throw new Error("useNotes must be used within a NotesProvider")
  }
  return context
}
