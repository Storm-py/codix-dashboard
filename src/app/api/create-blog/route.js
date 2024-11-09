import { NextResponse } from 'next/server';
import dbConnect from '@/app/config/dbConnect';
import { Blog } from '@/app/models/blogmodel';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function GET() {
  await dbConnect();
  try {
    const blogs = await Blog.find({});
    return NextResponse.json(blogs, { headers: corsHeaders });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function POST(request) {
  await dbConnect();
  try {
    const { title, content, coverImage } = await request.json();

    if (!title || !content || !coverImage) {
      return NextResponse.json(
        { message: 'Title, Cover Image, and content are required' },
        { status: 400, headers: corsHeaders }
      );
    }

    const newBlog = await Blog.create({ title, coverImage, content });

    return NextResponse.json(
      { message: 'Blog post created successfully', blog: newBlog },
      { status: 201, headers: corsHeaders }
    );
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}
