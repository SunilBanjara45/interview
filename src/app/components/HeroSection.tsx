// components/HeroSection.tsx
import React from 'react';
import TrendingNews from './TrendingNews';

const HeroSection: React.FC = () => {
  return (
    <div className="flex  gap-4 mb-6">
      <div className="col-span-2">
        <div className="relative bg-gradient-to-r from-blue-900 to-blue-700 rounded-xl overflow-hidden w-[730px] h-[270px]">
          <img 
            src="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&h=400&fit=crop" 
            alt="Real Madrid"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 p-6 flex flex-col justify-end">
            <div className="flex gap-4 mb-4">
              <span className="bg-yellow-400 text-gray-900 px-3 py-1 rounded text-xs font-semibold">1st LEG</span>
              <span className="bg-gray-800 px-3 py-1 rounded text-xs">4th FEB</span>
            </div>
            <h2 className="text-2xl font-bold mb-2">REAL MADRID VS BARCELONA</h2>
            <p className="text-sm text-gray-300">SEE MATCH SCHEDULE</p>
          </div>
        </div>
      </div>
      

    </div>
  );
};

export default HeroSection;