// components/MatchNavigation.tsx
'use client';

import React, { useState, useMemo } from 'react';
import { Search, Calendar as CalendarIcon, ChevronDown } from 'lucide-react';
import { useDateContext } from '../context/DateContext';
import Calendar from './Calendar';

const MatchNavigation: React.FC = () => {
  const { selectedDate, setSelectedDate } = useDateContext();
  const [showCalendar, setShowCalendar] = useState(false);

  // Generate dates array dynamically based on current date
  const dates = useMemo(() => {
    const today = new Date();
    const result = [];

    // Generate 6 days: 2 days before, today, and 3 days after
    for (let i = -2; i <= 3; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      // Format date manually to avoid timezone issues
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const dateString = `${year}-${month}-${day}`;

      const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
      const displayDate = date.toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'short',
      });

      let label = dayName;
      if (i === -1) label = 'Yesterday';
      if (i === 0) label = 'Today';
      if (i === 1) label = 'Tomorrow';

      result.push({
        id: dateString,
        label,
        date: displayDate,
      });
    }

    return result;
  }, []);

  return (
    <>
      <div className="bg-gray-800 rounded-xl p-4 mb-6">
        {/* Top Section */}
        <div className="flex items-center justify-between mb-4">
          {/* Left - Live indicator */}
          <div className="flex items-center gap-2 ">
            <span className="w-2 h-2 bg-[#c3cc5a] rounded-full"></span>
            <span className="text-sm font-medium text-[#c3cc5a]">Live</span>
            <span className="text-sm font-medium"> [1]</span>
          </div>

          {/* Center - Search input  */}
          <div className="flex items-center bg-gray-700 rounded-lg overflow-hidden">
            <div className="flex items-center px-3 py-2">
              <Search className="w-4 h-4 text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Search For Matches"
                className="bg-transparent text-sm text-gray-300 placeholder-gray-400 focus:outline-none w-64"
              />
            </div> 
          </div>
         
           <div className="flex items-center gap-2 bg-gray-600 px-3 py-2 cursor-pointer hover:bg-gray-500 border-l border-gray-500">
              <span className="text-sm text-white">All Matches</span>
              <ChevronDown className="w-4 h-4 text-white" />
            </div>
        </div>

        {/* Date Navigation */}
        <div className="flex items-center justify-center gap-1">
          {dates.map((dateItem) => (
            <button
              key={dateItem.id}
              onClick={() => setSelectedDate(dateItem.id)}
              className={`px-1 py-2 rounded-lg text-sm transition-colors ${
                selectedDate === dateItem.id
                  ? 'border-2 border-yellow-400 bg-gray-700'
                  : 'hover:bg-gray-700'
              }`}
            >
              <div className="text-center bg-gray-900 px-1 py-2 rounded-[10px] w-[90px]">
                <div className="font-medium text-white">{dateItem.label}</div>
                <div className="text-xs text-gray-400">{dateItem.date}</div>
              </div>
            </button>
          ))}

          {/* View Calendar Button */}
          <button
            onClick={() => setShowCalendar(true)}
            className="flex items-center gap-2 px-3 py-2 border-2 border-yellow-400 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <CalendarIcon className="w-4 h-4 text-yellow-400" />
            <span className="text-sm text-white">View Calendar</span>
          </button>
        </div>
      </div>

      {/* Calendar Modal */}
      {showCalendar && (
        <Calendar
          selectedDate={selectedDate}
          onDateSelect={setSelectedDate}
          onClose={() => setShowCalendar(false)}
        />
      )}
    </>
  );
};

export default MatchNavigation;
