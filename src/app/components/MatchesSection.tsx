// components/MatchesSection.tsx
'use client';

import React, { useState, useMemo } from 'react';
import MatchCard from './MatchCard';
import { Match, FilterType } from '../types';
import { useFixturesByDate } from '../hooks/useFixtures';
import { isSportmonksSuccessResponse } from '../types/api';
import { transformFixturesToMatches, filterMatchesByStatus } from '../utils/transformers';
import { useDateContext } from '../context/DateContext';

const MatchesSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const { selectedDate } = useDateContext();

  const filters: string[] = ['All', 'Live', 'Upcoming', 'Finished'];

  // Fetch fixtures using React Query with selected date
  const { data: fixturesData, isLoading, isError, error } = useFixturesByDate(selectedDate);

  // Transform and filter matches
  const matches: Match[] = useMemo(() => {
    if (!fixturesData || !isSportmonksSuccessResponse(fixturesData)) {
      return [];
    }

    const allMatches = transformFixturesToMatches(fixturesData.data);
    return filterMatchesByStatus(allMatches, activeFilter);
  }, [fixturesData, activeFilter]);

  // Loading state
  if (isLoading) {
    return (
      <div className="bg-gray-800 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
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
          {/* Loading skeletons */}
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-gray-900 rounded-lg p-4 animate-pulse"
            >
              <div className="h-4 bg-gray-700 rounded w-1/3 mb-3"></div>
              <div className="h-16 bg-gray-700 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="bg-gray-800 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
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

        <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-6 text-center">
          <p className="text-red-400 mb-2">Failed to load matches</p>
          <p className="text-sm text-gray-400">
            {error?.message || 'Please try again later'}
          </p>
        </div>
      </div>
    );
  }

  // No matches found
  if (!fixturesData || !isSportmonksSuccessResponse(fixturesData)) {
    return (
      <div className="bg-gray-800 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
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

        <div className="bg-gray-900 rounded-lg p-6 text-center">
          <p className="text-gray-400">
            {fixturesData && 'message' in fixturesData
              ? fixturesData.message
              : 'No matches available for today'}
          </p>
        </div>
      </div>
    );
  }

  // Empty filtered results
  if (matches.length === 0) {
    return (
      <div className="bg-gray-800 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
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

        <div className="bg-gray-900 rounded-lg p-6 text-center">
          <p className="text-gray-400">
            No {activeFilter !== 'all' ? activeFilter : ''} matches found
          </p>
        </div>
      </div>
    );
  }

  // Success state with matches
  return (
    <div className="bg-gray-800 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
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
