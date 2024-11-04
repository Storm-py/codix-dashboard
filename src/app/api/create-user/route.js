import { NextResponse } from 'next/server'
import dbConnect from '@/app/config/dbConnect'
import User from '@/app/models/User'
import bcrypt from 'bcrypt'

export async function POST(req) {
  await dbConnect()
  console.time("API Execution Time");

  try {
   
    const { name, email, password } = await req.json()
    console.log(email, name, password)

    // Check if required fields are present
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: 'Name, Email, and Password are required' },
        { status: 400 }
      )
    }

    // Hash the password
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    // Create new user in the database
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    })

    // Return success response
    return NextResponse.json({ message: 'User created successfully' }, { status: 201 })

  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  } finally {
    console.timeEnd("API Execution Time")
  }
}

// Handle pre-flight OPTIONS request
export async function OPTIONS() {
  return NextResponse.json({}, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}
