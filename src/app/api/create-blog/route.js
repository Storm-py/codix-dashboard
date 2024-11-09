import { NextResponse } from 'next/server'
import dbConnect from '@/app/config/dbConnect'
import { Blog } from '@/app/models/blogmodel'

// Set CORS headers
const setCorsHeaders = (response) => {
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
};

export async function GET(request) {
  // Open DB connection
  await dbConnect()

  try {
    const blogs = await Blog.find({})

    // Create response
    const response = NextResponse.json(blogs)

    // Apply CORS headers to response
    setCorsHeaders(response)

    return response
  } catch (error) {
    console.error('Error fetching blogs:', error)
    const response = NextResponse.json({ message: 'Internal server error' }, { status: 500 })

    // Apply CORS headers to response
    setCorsHeaders(response)

    return response
  }
}

export async function POST(request) {
  // Open DB connection
  await dbConnect()

  try {
    const { title, content, coverImage } = await request.json()

    if (!title || !content || !coverImage) {
      const response = NextResponse.json({ message: 'Title, Cover Image, and content are required' }, { status: 400 })
      
      // Apply CORS headers to response
      setCorsHeaders(response)
      
      return response
    }

    const newBlog = await Blog.create({
      title,
      coverImage,
      content,
    })

    const response = NextResponse.json({ message: 'Blog post created successfully', blog: newBlog }, { status: 201 })

    // Apply CORS headers to response
    setCorsHeaders(response)

    return response
  } catch (error) {
    console.error('Error creating blog post:', error)
    const response = NextResponse.json({ message: 'Internal server error' }, { status: 500 })
    
    // Apply CORS headers to response
    setCorsHeaders(response)
    
    return response
  }
}

export async function OPTIONS(request) {
  // Handle preflight request
  const response = NextResponse.json({}, { status: 200 })
  
  // Apply CORS headers to response
  setCorsHeaders(response)
  
  return response
}
