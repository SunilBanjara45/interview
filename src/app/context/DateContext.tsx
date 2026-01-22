// context/DateContext.tsx
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface DateContextType {
  selectedDate: string; // Format: YYYY-MM-DD
  setSelectedDate: (date: string) => void;
  formatDisplayDate: (date: string) => string;
}

const DateContext = createContext<DateContextType | undefined>(undefined);

export function DateProvider({ children }: { children: ReactNode }) {
  // Initialize with today's date (avoiding timezone issues)
  const getTodayString = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [selectedDate, setSelectedDate] = useState<string>(getTodayString());

  // Helper to format date for display (e.g., "22 Jan")
  const formatDisplayDate = (date: string) => {
    const d = new Date(date);
    return d.toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
    }).toLowerCase();
  };

  return (
    <DateContext.Provider
      value={{
        selectedDate,
        setSelectedDate,
        formatDisplayDate,
      }}
    >
      {children}
    </DateContext.Provider>
  );
}

export function useDateContext() {
  const context = useContext(DateContext);
  if (context === undefined) {
    throw new Error('useDateContext must be used within a DateProvider');
  }
  return context;
}
