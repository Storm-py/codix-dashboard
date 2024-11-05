import { NextResponse } from 'next/server'
import dbConnect from '@/app/config/dbConnect'
import { Service } from "@/app/models/servicemodel"

export async function GET() {
  await dbConnect()
  try {
    const services = await Service.find({})
    return NextResponse.json(services, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    })
  } catch (error) {
    console.error('Error fetching services:', error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request) {
  await dbConnect()
  try {
    const { title, coverImage, description } = await request.json()

    if (!title || !coverImage || !description) {
      return NextResponse.json({ message: 'Title, Cover Image and Description are required' }, { status: 400 })
    }
    
    const newService = await Service.create({
      title,
      description,
      coverImage,
    })

    return NextResponse.json({ message: 'Service created successfully', service: newService }, { status: 201 })
  } catch (error) {
    console.error('Error creating Service:', error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}

export async function OPTIONS() {
  return NextResponse.json({}, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}