"use client"

import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'

const revenueData = [
  { date: '16/08', earnings: 0, expense: 0 },
  { date: '17/08', earnings: 5, expense: 4 },
  { date: '18/08', earnings: 6, expense: 1 },
  { date: '19/08', earnings: 8, expense: 2 },
  { date: '20/08', earnings: 25, expense: 8 },
  { date: '21/08', earnings: 9, expense: 1 },
  { date: '22/08', earnings: 11, expense: 5 },
  { date: '23/08', earnings: 24, expense: 1 },
]

const monthlyEarningsData = [
  { month: 'Jan', earnings: 20 },
  { month: 'Feb', earnings: 30 },
  { month: 'Mar', earnings: 25 },
  { month: 'Apr', earnings: 35 },
  { month: 'May', earnings: 28 },
  { month: 'Jun', earnings: 32 },
  { month: 'Jul', earnings: 40 },
  { month: 'Aug', earnings: 38 },
  { month: 'Sep', earnings: 42 },
  { month: 'Oct', earnings: 35 },
  { month: 'Nov', earnings: 45 },
  { month: 'Dec', earnings: 50 },
]

const customersData = [
  { month: 'Jan', customers: 500 },
  { month: 'Feb', customers: 600 },
  { month: 'Mar', customers: 550 },
  { month: 'Apr', customers: 700 },
  { month: 'May', customers: 650 },
  { month: 'Jun', customers: 750 },
]

export default function Dashboard() {
  return (
    <div className="p-6 flex items-center justify-between bg-gray-100 gap-4">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6 w-[70%]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-black">Revenue Updates</h2>
          <select className="border rounded px-2 py-1">
            <option>May 2021</option>
          </select>
        </div>
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="earnings" stroke="#06b6d4" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="expense" stroke="#f97316" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="grid gap-2 my-auto">
        <div className="bg-cyan-500 rounded-lg shadow-md p-6 text-white">
          <h3 className="text-lg font-semibold mb-2">Monthly Earnings</h3>
          <ResponsiveContainer width="101%" height={45}>
            <BarChart data={monthlyEarningsData} isAnimationActive={false}>
              <Bar dataKey="earnings" fill="#ffffff" />
            </BarChart>
          </ResponsiveContainer>
          <p className="text-3xl font-bold mt-2">$39,358</p>
          <p className="text-sm">+9 this week</p>
        </div>
        <div className="bg-orange-400 rounded-lg shadow-md p-6 text-white mb-6">
          <h3 className="text-lg font-semibold mb-2">Customers</h3>
          <ResponsiveContainer width="101%" height={45}>
            <LineChart data={customersData}>
              <Line type="monotone" dataKey="customers" stroke="#ffffff" strokeWidth={2} dot={false} isAnimationActive={false} />
            </LineChart>
          </ResponsiveContainer>
          <p className="text-3xl font-bold mt-2">750</p>
          <p className="text-sm">+9 this week</p>
        </div>
      </div>
    </div>
  )
}
