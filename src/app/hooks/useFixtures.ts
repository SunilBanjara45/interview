// hooks/useFixtures.ts - React Query Hooks for Fixtures
import { useQuery } from '@tanstack/react-query';
import { apiService } from '../services/api';
import { SportmonksResponse } from '../types/api';

/**
 * Hook to fetch fixtures by specific date
 */
export function useFixturesByDate(date: string) {
  return useQuery<SportmonksResponse, Error>({
    queryKey: ['fixtures', date],
    queryFn: () => apiService.getFixturesByDate(date),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 60 * 1000, // Refetch every minute for live updates
  });
}

/**
 * Hook to fetch today's fixtures
 */
export function useTodayFixtures() {
  const today = new Date().toISOString().split('T')[0];
  return useFixturesByDate(today);
}

/**
 * Hook to fetch fixtures by offset from today
 */
export function useFixturesByOffset(daysOffset: number) {
  return useQuery<SportmonksResponse, Error>({
    queryKey: ['fixtures', 'offset', daysOffset],
    queryFn: () => apiService.getFixturesByOffset(daysOffset),
    staleTime: 5 * 60 * 1000,
    refetchInterval: daysOffset === 0 ? 60 * 1000 : undefined, // Only auto-refetch for today
  });
}
