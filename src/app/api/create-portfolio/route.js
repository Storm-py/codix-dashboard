import { NextResponse } from 'next/server'
import {Portfolio} from "@/app/models/portfoliomodel"

export async function GET() {
  try {
    const portfolios = await Portfolio.find({})
    return NextResponse.json(portfolios, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    })
  } catch (error) {
    console.error('Error fetching portfolios:', error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request) {

  try {
    
    const { title, content,coverImage,description } = await request.json()

    
    if (!title || !content || !coverImage || !description) {
      return NextResponse.json({ message: 'Title,Cover Image,Description and content are required' }, { status: 400 })
    }
    
    const newPortfolio = await Portfolio.create({
      title,
      description,
      coverImage,
        content,
    })

    
    return NextResponse.json({ message: 'Portfolio created successfully', blog: newPortfolio }, { status: 201 })

  } catch (error) {
    console.error('Error creating Portfolio:', error)
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