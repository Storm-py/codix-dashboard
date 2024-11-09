import { NextResponse } from 'next/server';

export function middleware(req) {
  const response = NextResponse.next(); // Proceed with the request

  // Set CORS headers
  response.headers.set('Access-Control-Allow-Origin', '*'); // Allow all origins
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // Allowed methods
  response.headers.set('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept, Authorization, X-Requested-With'); // Allowed headers

  // Handle preflight requests (OPTIONS method)
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: response.headers,
    });
  }

  return response;
}

// Apply this middleware to all API routes
export const config = {
  matcher: '/api/*', // This applies the middleware to all API routes
};
