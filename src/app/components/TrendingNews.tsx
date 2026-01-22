// components/TrendingNews.tsx
import React from 'react';
import { ChevronRight, Star } from 'lucide-react';
import { NewsItem } from '../types';

const TrendingNews: React.FC = () => {
  const newsItems: NewsItem[] = [
    {
      id: 1,
      title: "Transfer Talk | Mbappé Real Madrid Move The Premier...",
      image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=200&h=100&fit=crop",
      hasVideo: true
    },
    {
      id: 2,
      title: "How Are The Top 2025 Transfer Fees?",
      image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=200&h=100&fit=crop"
    },
    {
      id: 3,
      title: "Tweets And Events From The Premier League - B",
      image: "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=200&h=100&fit=crop"
    },
    {
      id: 4,
      title: "Jan 06 2023 A The Premier League...",
      image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=200&h=100&fit=crop",
      hasPin: true
    },
    {
      id: 5,
      title: "Results And Events From The Premier League",
      image: "https://images.unsplash.com/photo-1516461240763-822a87484851?w=200&h=100&fit=crop"
    },
    {
      id: 6,
      title: "Results And Events From The Premier League",
      image: "https://images.unsplash.com/photo-1606925797300-0b35e9d1794e?w=200&h=100&fit=crop"
    }
  ];

  return (
    <div className="bg-gray-800 rounded-xl p-4 w-[360px]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Trending News</h3>
        <ChevronRight className="w-5 h-5" />
      </div>
      <div className="space-y-3 max-h-full ">
        {newsItems.map((item) => (
          <div 
            key={item.id} 
            className="flex gap-3 cursor-pointer hover:bg-gray-700 p-2 rounded-lg transition-colors"
          >
            <img src={item.image} alt="" className="w-16 h-12 object-cover rounded" />
            <div className="flex-1">
              <p className="text-xs leading-tight">{item.title}</p>
            </div>
            {item.hasVideo && <Star className="w-4 h-4 text-yellow-400" />}
            {item.hasPin && <Star className="w-4 h-4 text-yellow-400" />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingNews;