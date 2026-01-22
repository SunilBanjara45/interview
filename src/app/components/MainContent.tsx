// components/MainContent.tsx
import React from 'react';
import HeroSection from './HeroSection';
import MatchesSection from './MatchesSection';
import TrendingNews from './TrendingNews';

const MainContent: React.FC = () => {
  return (
    <div className="flex overflow-y-auto">
      <div className="p-6">
        <HeroSection />
       <MatchesSection/>
      </div>
    </div>
  );
};

export default MainContent;