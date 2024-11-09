// next.config.mjs
import { defineConfig } from 'next'

export default defineConfig({
  // Enabling React Strict Mode (Optional)
  reactStrictMode: true,

  // CORS headers configuration
  async headers() {
    return [
      {
        // Apply these headers to all API routes
        source: "/api/:path*", // Matches all API routes
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*",  // You can replace '*' with specific domains if needed
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization",
          },
        ],
      },
    ]
  },

  // Additional Next.js settings (if any)
  // For example, to handle image domains (if you're using external image sources)
  images: {
    domains: ['example.com'],  // Add your image domains here
  },

  // Optional: Custom webpack configuration or other Next.js options
  webpack(config, options) {
    return config;
  },
})
