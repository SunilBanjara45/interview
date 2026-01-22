// components/MainContent.tsx
import React from 'react';
import HeroSection from './HeroSection';
import MatchNavigation from './MatchNavigation';
import MatchesSection from './MatchesSection';
import TrendingNews from './TrendingNews';

const MainContent: React.FC = () => {
  return (
    <div className="flex overflow-y-auto">
      <div className="p-6">
        <HeroSection />
        <MatchNavigation />
        <MatchesSection/>
      </div>
    </div>
  );
};

export default MainContent;