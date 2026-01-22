// app/page.tsx
'use client';

import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import TrendingNews from './components/TrendingNews';

const FootballScoreApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('home');

  return (
    <div >
       <div className="flex items-center gap-2">
        <span className="w-3 h-3 rounded-full bg-red-500"></span>
        <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
        <span className="w-3 h-3 rounded-full bg-green-500"></span>
      </div>
    <div className="flex h-screen bg-[#303030] text-white justify-center p-4">
     
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <MainContent />
      <TrendingNews />
    </div>
    </div>
  );
};

export default FootballScoreApp;