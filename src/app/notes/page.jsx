'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from "next-auth/react"

export default function NotesPage() {
  const [notes, setNotes] = useState([])
  const [currentNote, setCurrentNote] = useState({ id: null, title: '', content: '' })

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('notes') || '[]')
    setNotes(savedNotes)
  }, [])
  const router = useRouter()
  const { data: session } = useSession()

  useEffect(() => {
    if (!session) {
        router.push("/signin")
    }
}, [session, router])

  const saveNote = () => {
    if (currentNote.title.trim() === '' && currentNote.content.trim() === '') return

    let updatedNotes
    if (currentNote.id) {
      updatedNotes = notes.map(note => 
        note.id === currentNote.id ? { ...currentNote } : note
      )
    } else {
      const newNote = { ...currentNote, id: Date.now() }
      updatedNotes = [...notes, newNote]
    }

    setNotes(updatedNotes)
    localStorage.setItem('notes', JSON.stringify(updatedNotes))
    setCurrentNote({ id: null, title: '', content: '' })
  }

  const deleteNote = (id) => {
    const updatedNotes = notes.filter(note => note.id !== id)
    setNotes(updatedNotes)
    localStorage.setItem('notes', JSON.stringify(updatedNotes))
    if (currentNote.id === id) {
      setCurrentNote({ id: null, title: '', content: '' })
    }
  }

  return (
    <div className="min-h-screen bg-gray-100  py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900  mb-8">My Notes</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Note List */}
          <div className="md:col-span-1 space-y-4">
            <button
              onClick={() => setCurrentNote({ id: null, title: '', content: '' })}
              className="w-full bg-white  rounded-lg shadow p-4 text-left hover:shadow-md transition duration-300 ease-in-out"
            >
              <span className="text-blue-500 ">+ New Note</span>
            </button>
            {notes.map(note => (
              <div
                key={note.id}
                className="bg-white  rounded-lg shadow p-4 cursor-pointer hover:shadow-md transition duration-300 ease-in-out"
                onClick={() => setCurrentNote(note)}
              >
                <h3 className="font-semibold text-gray-800  mb-2 truncate">{note.title || 'Untitled'}</h3>
                <p className="text-gray-600  text-sm truncate">{note.content}</p>
              </div>
            ))}
          </div>

          {/* Note Editor */}
          <div className="md:col-span-2">
            <div className="bg-white  rounded-lg shadow p-6">
              <input
                type="text"
                placeholder="Note Title"
                value={currentNote.title}
                onChange={(e) => setCurrentNote({ ...currentNote, title: e.target.value })}
                className="w-full text-2xl font-bold mb-4 bg-transparent border-none focus:outline-none text-gray-800  placeholder-gray-400 "
              />
              <textarea
                placeholder="Start typing your note here..."
                value={currentNote.content}
                onChange={(e) => setCurrentNote({ ...currentNote, content: e.target.value })}
                className="w-full h-64 text-gray-800  bg-transparent border-none resize-none focus:outline-none placeholder-gray-400 "
              />
              <div className="flex justify-between mt-4">
                <button
                  onClick={saveNote}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition duration-300 ease-in-out"
                >
                  Save Note
                </button>
                {currentNote.id && (
                  <button
                    onClick={() => deleteNote(currentNote.id)}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded transition duration-300 ease-in-out"
                  >
                    Delete Note
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}