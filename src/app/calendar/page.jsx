'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'
import { useEffect } from "react";
import { useSession } from "next-auth/react"

const Calendar = () => {

  const router = useRouter()
  const { data: session } = useSession()

  useEffect(() => {
    if (!session) {
        router.push("/signin")
    }
}, [session, router])

  const [currentDate, setCurrentDate] = useState(new Date());
  const [reminders, setReminders] = useState({});
  const [newReminder, setNewReminder] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const goToToday = () => setCurrentDate(new Date());
  const goToPreviousMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const goToNextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

  const addReminder = () => {
    if (selectedDate && newReminder) {
      setReminders(prev => ({
        ...prev,
        [selectedDate]: [...(prev[selectedDate] || []), newReminder]
      }));
      setNewReminder('');
      setSelectedDate(null);
    }
  };

  const getRandomColor = () => {
    const colors = ['bg-blue-500', 'bg-green-500', 'bg-red-500', 'bg-yellow-500', 'bg-purple-500'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Calendar</h1>
      <div className="mb-4 flex justify-between items-center">
        <div>
          <button onClick={goToToday} className="px-4 py-2 bg-gray-200 rounded-l-lg">Today</button>
          <button onClick={goToPreviousMonth} className="px-4 py-2 bg-gray-200">Back</button>
          <button onClick={goToNextMonth} className="px-4 py-2 bg-gray-200 rounded-r-lg">Next</button>
        </div>
        <h2 className="text-xl font-semibold">{months[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
        <div>
          <button className="px-4 py-2 bg-gray-200 rounded-l-lg">Month</button>
          <button className="px-4 py-2 bg-gray-200">Week</button>
          <button className="px-4 py-2 bg-gray-200">Day</button>
          <button className="px-4 py-2 bg-gray-200 rounded-r-lg">Agenda</button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {days.map(day => (
          <div key={day} className="text-center font-semibold">{day}</div>
        ))}
        {[...Array(firstDayOfMonth).keys()].map(i => (
          <div key={`empty-${i}`} className="h-24 bg-gray-100 rounded-lg"></div>
        ))}
        {[...Array(daysInMonth).keys()].map(i => {
          const date = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${(i + 1).toString().padStart(2, '0')}`;
          return (
            <div
              key={i}
              className="h-24 bg-white border rounded-lg p-1 overflow-hidden cursor-pointer"
              onClick={() => setSelectedDate(date)}
            >
              <div className="text-right">{i + 1}</div>
              {reminders[date]?.map((reminder, index) => (
                <div key={index} className={`text-xs text-white p-1 mb-1 rounded ${getRandomColor()} truncate`}>
                  {reminder}
                </div>
              ))}
            </div>
          );
        })}
      </div>
      {selectedDate && (
        <div className="mt-4">
          <input
            type="text"
            value={newReminder}
            onChange={(e) => setNewReminder(e.target.value)}
            placeholder="Add a reminder"
            className="border rounded-l-lg p-2 w-64"
          />
          <button onClick={addReminder} className="bg-blue-500 text-white rounded-r-lg p-2">Add Reminder</button>
        </div>
      )}
    </div>
  );
};

export default Calendar;