// components/HeroSection.tsx
import React from 'react';
import TrendingNews from './TrendingNews';

const HeroSection: React.FC = () => {
  return (
    <div className="flex  gap-4 mb-6">
      <div className="col-span-2">
        <div className="relative rounded-xl overflow-hidden w-full h-[270px]">
          <img 
            src="/hero.png" 
            alt="Real Madrid"
            className="w-full  object-cover "
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;