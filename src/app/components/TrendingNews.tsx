// components/TrendingNews.tsx
import React from 'react';
import { ChevronRight, Star } from 'lucide-react';
import { NewsItem } from '../types/index';

const TrendingNews: React.FC = () => {
  const newsItems: NewsItem[] = [
    {
      id: 1,
      title: "Here Are The Top 100 Players And Managers",
      image: "/1.jpg",
      hasVideo: true,
      time:"11 Oct 2023, 09:00 PM"
    },
    {
      id: 2,
      title: "Results And Scores From The Premier League....!!",
      image: "/2.jpg",
      time:"12 Oct 2023, 09:00 PM"
    },
    {
      id: 3,
      title: "Join Or Start A Competition Now!",
      image: "/3.jpg",
      time:"11 Oct 2023, 09:00 PM"
    },
    {
      id: 4,
      title: "Results And Scores From The Premier League....!!",
      image: "/4.jpg",
      hasPin: true,
      time:"15 Oct 2023, 09:00 PM"
    },
    {
      id: 5,
      title: "Results And Scores From The Premier League....!!",
      image: "/5.jpg",
      time:"18 Oct 2023, 09:00 PM"
    },
  ];

  return (
    <div className="bg-gray-800 rounded-xl p-4 w-[360px]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Trending News</h3>
        <ChevronRight className="w-5 h-5 text-[#c3cc5a]" />
      </div>
      <div className='w-[327px] h-[200px]'>
        <img src="/news.png" alt="treding news"  className='rounded-[10px]' />
        <p className='pt-2'>Results And Scores From The Premier League....!!</p>
        <p className='text-[11px] text-gray-500'>5 Hours Ago</p>
      </div>
      <div className="space-y-3 max-h-full pt-4 ">
        {newsItems.map((item) => (
          <div 
            key={item.id} 
            className="flex gap-3 cursor-pointer hover:bg-gray-700 p-2 rounded-lg transition-colors"
          >
            <img src={item.image} alt="" className="w-16 h-12 object-cover rounded" />
            <div className="flex-1">
              <p className="text-xs leading-tight">{item.title}</p>
              <p className='text-[11px] text-gray-500'>{item.time}</p>
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