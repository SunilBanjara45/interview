// components/MatchesSection.tsx
import React, { useState } from 'react';
import MatchCard from './MatchCard';
import { Match, FilterType } from '../types';

const MatchesSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  
  const filters: string[] = ['All', 'Live', 'Upcoming', 'Finished'];
  
  const matches: Match[] = [
    {
      id: 1,
      league: 'SPAIN. LA LIGA - 1ST ROUND QUARTER FINAL',
      time: '20:00',
      date: '25 oct',
      status: 'live',
      homeTeam: 'Villarreal',
      awayTeam: 'Barcelona',
      homeScore: null,
      awayScore: null
    },
    {
      id: 2,
      league: 'SPAIN. LA LIGA',
      time: '00:06',
      date: '25 oct',
      status: 'live',
      homeTeam: 'Cadiz',
      awayTeam: 'Girona',
      homeScore: 1,
      awayScore: 0
    },
    {
      id: 3,
      league: 'UEFA',
      time: '01:45',
      date: '26 oct',
      status: 'upcoming',
      homeTeam: 'Inter Lagos',
      awayTeam: 'Benfica',
      homeScore: null,
      awayScore: null
    },
    {
      id: 4,
      league: 'SPAIN. LA LIGA',
      time: '00:06',
      date: '25 oct',
      status: 'finished',
      homeTeam: 'Juve',
      awayTeam: 'Girona',
      homeScore: 2,
      awayScore: 1
    },
    {
      id: 5,
      league: 'UEFA',
      time: '01:45',
      date: '26 oct',
      status: 'upcoming',
      homeTeam: 'Inter Lagos',
      awayTeam: 'Benfica',
      homeScore: null,
      awayScore: null
    }
  ];

  return (
    <div className="bg-gray-800 rounded-xl p-6 ">
      <div className="flex items-center justify-between mb-6 ">
        <h2 className="text-xl font-bold">Matches</h2>
        <div className="flex gap-2">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter.toLowerCase() as FilterType)}
              className={`px-4 py-1.5 rounded-lg text-sm transition-colors ${
                activeFilter === filter.toLowerCase()
                  ? 'bg-yellow-400 text-gray-900 font-semibold'
                  : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {matches.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>
    </div>
  );
};

export default MatchesSection;