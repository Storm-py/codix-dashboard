import { NextResponse } from 'next/server'
import User from '@/app/models/User'
import bcrypt from 'bcrypt'

export async function POST(request) {
  try {
    const { name, email, password } = await request.json()

    
    if (!name || !email || !password) {
      return NextResponse.json({ message: 'Name, Email, and Password are required' }, { status: 400 })
    }

    
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    })

    return NextResponse.json({ message: 'User created successfully', User: newUser }, { status: 201 })
  } catch (error) {
    console.error('Error creating User:', error)
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
