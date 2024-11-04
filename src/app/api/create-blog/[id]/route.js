import { Blog } from '@/app/models/blogmodel';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: corsHeaders,
  });
}

export async function GET(req, { params }) {
  const { id } = params;

  console.log(id);
  try {
    const blog = await Blog.findById(id);
    if (!blog) return new Response(JSON.stringify({ message: "Blog not found" }), { status: 404 });

    return new Response(JSON.stringify(blog), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Server error" }), { status: 500 });
  }
}
