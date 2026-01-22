// components/MatchCard.tsx
import React from 'react';
import { Star } from 'lucide-react';
import { MatchCardProps } from '../types';

const MatchCard: React.FC<MatchCardProps> = ({ match }) => {
  return (
    <div className="bg-gray-900 rounded-lg p-4 hover:bg-gray-850 transition-colors">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-gray-400 uppercase">{match.league}</span>
        {match.status === 'live' && (
          <span className="flex items-center gap-1 text-xs text-red-400">
            <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></span>
            LIVE
          </span>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          <div className="text-center">
            <div className="text-xs text-gray-400">{match.time}</div>
            <div className="text-xs text-gray-500">{match.date}</div>
          </div>

          <div className="flex-1 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-gray-700 rounded-full"></div>
                <span className="text-sm">{match.homeTeam}</span>
              </div>
              {match.homeScore !== null && (
                <span className="text-lg font-bold">{match.homeScore}</span>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-gray-700 rounded-full"></div>
                <span className="text-sm">{match.awayTeam}</span>
              </div>
              {match.awayScore !== null && (
                <span className="text-lg font-bold">{match.awayScore}</span>
              )}
            </div>
          </div>
        </div>

        <button className="ml-4 p-2 hover:bg-gray-800 rounded-lg">
          <Star className="w-5 h-5 text-gray-400 hover:text-yellow-400" />
        </button>
      </div>
    </div>
  );
};

export default MatchCard;