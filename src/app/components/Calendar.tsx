// components/Calendar.tsx
'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, X } from 'lucide-react';

interface CalendarProps {
  selectedDate: string; // Format: YYYY-MM-DD
  onDateSelect: (date: string) => void;
  onClose: () => void;
}

const Calendar: React.FC<CalendarProps> = ({ selectedDate, onDateSelect, onClose }) => {
  const [currentMonth, setCurrentMonth] = useState(() => {
    const date = new Date(selectedDate);
    return new Date(date.getFullYear(), date.getMonth(), 1);
  });
  const [showMonthPicker, setShowMonthPicker] = useState(false);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const shortMonthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek, year, month };
  };

  const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentMonth);

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const previousYear = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear() - 1, currentMonth.getMonth(), 1));
  };

  const nextYear = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear() + 1, currentMonth.getMonth(), 1));
  };

  const selectMonth = (monthIndex: number) => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), monthIndex, 1));
    setShowMonthPicker(false);
  };

  const selectYear = (selectedYear: number) => {
    setCurrentMonth(new Date(selectedYear, currentMonth.getMonth(), 1));
  };

  const handleDateClick = (day: number) => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    // Format date manually to avoid timezone issues
    const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    onDateSelect(dateString);
    onClose();
  };

  const isSelectedDate = (day: number) => {
    // Format date manually to avoid timezone issues
    const dateToCheck = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return dateToCheck === selectedDate;
  };

  const isToday = (day: number) => {
    const today = new Date();
    const dateToCheck = new Date(year, month, day);
    return (
      dateToCheck.getDate() === today.getDate() &&
      dateToCheck.getMonth() === today.getMonth() &&
      dateToCheck.getFullYear() === today.getFullYear()
    );
  };

  const renderDays = () => {
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(
        <div key={`empty-${i}`} className="aspect-square"></div>
      );
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const selected = isSelectedDate(day);
      const today = isToday(day);

      days.push(
        <button
          key={day}
          onClick={() => handleDateClick(day)}
          className={`aspect-square rounded-lg flex items-center justify-center text-sm transition-colors ${
            selected
              ? 'bg-yellow-400 text-gray-900 font-bold'
              : today
              ? 'bg-gray-700 text-white font-semibold border-2 border-yellow-400'
              : 'hover:bg-gray-700 text-white'
          }`}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  const renderMonthPicker = () => {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 11 }, (_, i) => currentYear - 5 + i);

    return (
      <div className="absolute inset-0 bg-gray-800 rounded-xl p-6 z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Select Month & Year</h3>
          <button
            onClick={() => setShowMonthPicker(false)}
            className="p-1 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Year selector */}
        <div className="mb-4">
          <label className="text-xs text-gray-400 mb-2 block">Year</label>
          <div className="grid grid-cols-3 gap-2 max-h-32 overflow-y-auto">
            {years.map((y) => (
              <button
                key={y}
                onClick={() => selectYear(y)}
                className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                  y === year
                    ? 'bg-yellow-400 text-gray-900 font-semibold'
                    : 'bg-gray-700 hover:bg-gray-600 text-white'
                }`}
              >
                {y}
              </button>
            ))}
          </div>
        </div>

        {/* Month grid */}
        <div>
          <label className="text-xs text-gray-400 mb-2 block">Month</label>
          <div className="grid grid-cols-3 gap-2">
            {monthNames.map((monthName, index) => (
              <button
                key={monthName}
                onClick={() => selectMonth(index)}
                className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                  index === month
                    ? 'bg-yellow-400 text-gray-900 font-semibold'
                    : 'bg-gray-700 hover:bg-gray-600 text-white'
                }`}
              >
                {shortMonthNames[index]}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-xl p-6 w-96 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 hover:bg-gray-700 rounded-lg transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {showMonthPicker ? (
          renderMonthPicker()
        ) : (
          <>
            {/* Header with year navigation */}
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={previousYear}
                className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                title="Previous Year"
              >
                <ChevronsLeft className="w-5 h-5" />
              </button>

              <button
                onClick={previousMonth}
                className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                title="Previous Month"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={() => setShowMonthPicker(true)}
                className="text-lg font-semibold hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors"
              >
                {monthNames[month]} {year}
              </button>

              <button
                onClick={nextMonth}
                className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                title="Next Month"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              <button
                onClick={nextYear}
                className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                title="Next Year"
              >
                <ChevronsRight className="w-5 h-5" />
              </button>
            </div>

            {/* Day names */}
            <div className="grid grid-cols-7 gap-2 mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div
                  key={day}
                  className="text-center text-xs font-semibold text-gray-400"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-2">
              {renderDays()}
            </div>

            {/* Footer with quick actions */}
            <div className="mt-4 pt-4 border-t border-gray-700 flex gap-2">
              <button
                onClick={() => {
                  const now = new Date();
                  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
                  onDateSelect(today);
                  onClose();
                }}
                className="flex-1 py-2 bg-yellow-400 text-gray-900 font-semibold hover:bg-yellow-500 rounded-lg text-sm transition-colors"
              >
                Today
              </button>
              <button
                onClick={() => setShowMonthPicker(true)}
                className="flex-1 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm transition-colors"
              >
                Pick Month
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Calendar;
