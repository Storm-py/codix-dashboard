'use client'
import React, { useState, useRef } from 'react'
import dynamic from 'next/dynamic'
import { PenTool } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect } from "react";
import { useSession } from "next-auth/react"

// Import JoditEditor dynamically to disable SSR
const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false })

export default function BlogCreationForm() {
  const [title, setTitle] = useState('')
  const [coverImage, setCoverImage] = useState('')
  const [content, setContent] = useState('')
  const editor = useRef(null)

  const router = useRouter()
  const { data: session } = useSession()

  useEffect(() => {
    if (!session) {
        router.push("/signin")
    }
}, [session, router])

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      const response = await fetch('/api/create-blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content,coverImage }),
      })

      if (response.ok) {
        alert('Blog post created successfully!')
        setTitle('')
        setContent('')
        setCoverImage('')
      } else {
        alert('Failed to create blog post. Please try again.')
      }
    } catch (error) {
      console.error('Error creating blog post:', error)
      alert('An error occurred. Please try again.')
    }
  }

  return (
    <div className="min-h-screen w-full flex justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="w-full bg-white shadow-xl">
        <div className="bg-[#0028ff] p-4 sm:p-6 text-white">
          <h1 className="text-2xl sm:text-3xl font-bold flex items-center justify-center sm:justify-start">
            <PenTool className="mr-2" />
            Create Your Blog
          </h1>
          <p className="mt-2 text-purple-100 text-center sm:text-left">Share your thoughts with the world</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4 sm:p-8">
          <div className="mb-6">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">Blog Title</label>
            <input 
              type="text" 
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter an engaging title"
              className="w-full px-4 py-3 rounded-md bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-[#0028ff] focus:border-transparent transition duration-200 ease-in-out text-gray-900 placeholder-gray-500"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700 mb-2">Cover Image</label>
            <input 
              type="text" 
              id="coverImage"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              placeholder="Enter an engaging Cover Image"
              className="w-full px-4 py-3 rounded-md bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-[#0028ff] focus:border-transparent transition duration-200 ease-in-out text-gray-900 placeholder-gray-500"
              required
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">Blog Content</label>
            <div className="bg-gray-100 rounded-md p-4">
              <JoditEditor
                ref={editor}
                value={content}
                onChange={newContent => setContent(newContent)}
              />
            </div>
          </div>
          
          <button 
            type="submit"
            className="w-full py-3 bg-[#0028ff] rounded-md text-white font-semibold text-xl shadow-md hover:bg-[#0F9A8E] transition duration-300 ease-in-out transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0028ff]"
          >
            Publish Blog
          </button>
        </form>
      </div>
    </div>
  )
}
