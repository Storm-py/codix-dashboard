import { NextResponse } from 'next/server'
import dbConnect from '@/app/config/dbConnect'
import { Blog } from '@/app/models/blogmodel'


export async function GET() {
  await dbConnect()
  try {
    const blogs = await Blog.find({})
    return NextResponse.json(blogs, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    })
  } catch (error) {
    console.error('Error fetching blogs:', error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request) {
  await dbConnect()
  try {
    
    const { title, content,coverImage } = await request.json()

    
    if (!title || !content || !coverImage) {
      return NextResponse.json({ message: 'Title,Cover Image and content are required' }, { status: 400 })
    }
    
    const newBlog = await Blog.create({
      title,
      coverImage,
        content,
    })

    
    return NextResponse.json({ message: 'Blog post created successfully', blog: newBlog }, { status: 201 })

  } catch (error) {
    console.error('Error creating blog post:', error)
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



// export async function POST(request) {
//   await dbConnect()
//   try {
//     const { name, email, password } = await request.json()
//     console.log(email,name,password)

    
//     if (!name || !email || !password) {
//       return NextResponse.json({ message: 'Name, Email, and Password are required' }, { status: 400 })
//     }

    
//     const saltRounds = 10
//     const hashedPassword = await bcrypt.hash(password, saltRounds)

    
//     const newUser = await User.create({
//       name,
//       email,
//       password: hashedPassword,
//     })

//     return NextResponse.json({ message: 'User created successfully', User: newUser }, { status: 201 })
//   } catch (error) {
//     console.error('Error creating User:', error)
//     return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
//   }
// }