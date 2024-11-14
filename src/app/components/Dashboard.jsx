'use client'

import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import {
  ArrowRight,
  Book,
  Briefcase,
  Code,
  Calendar,
  Users,
  BarChart2,
} from 'lucide-react'

export default function Dashboard() {
  const [blogs, setBlogs] = useState([])
  const [portfolios, setPortfolios] = useState([])
  const [services, setServices] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const [blogsResponse, portfoliosResponse, servicesResponse] =
          await Promise.all([
            fetch('/api/create-blog?limit=3'),
            fetch('/api/create-portfolio?limit=2'),
            fetch('/api/create-service?limit=2'),
          ])

        if (!blogsResponse.ok) throw new Error('Failed to fetch blogs')
        if (!portfoliosResponse.ok) throw new Error('Failed to fetch portfolios')
        if (!servicesResponse.ok) throw new Error('Failed to fetch services')

        const [blogsData, portfoliosData, servicesData] = await Promise.all([
          blogsResponse.json(),
          portfoliosResponse.json(),
          servicesResponse.json(),
        ])

        setBlogs(blogsData)
        setPortfolios(portfoliosData)
        setServices(servicesData)
      } catch (err) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-[#0028ff]"></div>
      </div>
    )
  }

  if (error) {
    return <div className="text-center text-red-600 mt-10">Error: {error}</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-[#0028ff] to-[#00a3ff] text-white shadow-md">
        <div className="max-w-8xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-8 md:mb-0">
              <h1 className="text-4xl font-bold mb-2">Welcome back, Admin</h1>
              <p className="text-lg opacity-90">
                Here is what’s happening with your projects today.
              </p>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-8xl mx-auto py-12 px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Latest Blogs Section */}
        <section>
          <h2 className="text-3xl font-semibold text-gray-900 mb-8">
            Latest Blogs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="bg-white overflow-hidden shadow-lg rounded-lg transition-transform transform hover:-translate-y-1 hover:shadow-2xl"
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={blog.coverImage}
                    alt={blog.title}
                    layout="fill"
                    objectFit="cover"
                    unoptimized
                    className="rounded-t-lg"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {blog.title}
                  </h3>
                  <p className="text-gray-500 mb-4">{blog.createdAt}</p>
                  <div className="flex items-center text-sm text-gray-600 mb-4">
                    <Calendar className="h-4 w-4 mr-1" /> {blog.date}
                  </div>
                </div>
                <div className="px-6 py-4 bg-gray-100">
                  <a
                    href={`/blog/${blog.id}`}
                    className="text-[#0028ff] hover:text-[#003ecc] font-semibold flex items-center transition duration-200 ease-in-out"
                  >
                    Read more <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Portfolios Section */}
        <section>
          <h2 className="text-3xl font-semibold text-gray-900 mb-8">
            Featured Portfolios
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {portfolios.map((portfolio) => (
              <div
                key={portfolio.id}
                className="bg-white overflow-hidden shadow-lg rounded-lg transition-transform transform hover:-translate-y-1 hover:shadow-2xl"
              >
                <div className="relative h-64 w-full">
                  <Image
                    src={portfolio.coverImage}
                    alt={portfolio.title}
                    layout="fill"
                    objectFit="cover"
                    unoptimized
                    className="rounded-t-lg"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {portfolio.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{portfolio.description}</p>
                </div>
                <div className="px-6 py-4 bg-gray-100">
                  <a
                    href={`/portfolio/${portfolio.id}`}
                    className="text-[#0028ff] hover:text-[#003ecc] font-semibold flex items-center transition duration-200 ease-in-out"
                  >
                    View Project <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Services Section */}
        <section>
          <h2 className="text-3xl font-semibold text-gray-900 mb-8">
            Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-white overflow-hidden shadow-lg rounded-lg transition-transform transform hover:-translate-y-1 hover:shadow-2xl"
              >
                <div className="relative h-64 w-full">
                  <Image
                    src={service.coverImage}
                    alt={service.title}
                    layout="fill"
                    objectFit="cover"
                    unoptimized
                    className="rounded-t-lg"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-[#0028ff] p-3 rounded-full">
                      <Code className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="ml-4 text-xl font-bold text-gray-800">
                      {service.name}
                    </h3>
                  </div>
                  <p className="text-gray-600">{service.description}</p>
                </div>
                <div className="px-6 py-4 bg-gray-100">
                  <a
                    href={`/service/${service.id}`}
                    className="text-[#0028ff] hover:text-[#003ecc] font-semibold flex items-center transition duration-200 ease-in-out"
                  >
                    Learn More <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
