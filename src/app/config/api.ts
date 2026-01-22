// config/api.ts - API Configuration

export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_SPORTMONKS_BASE_URL || 'https://api.sportmonks.com/v3/football',
  API_TOKEN: process.env.NEXT_PUBLIC_SPORTMONKS_API_TOKEN || '',
} as const;

export const ENDPOINTS = {
  FIXTURES_BY_DATE: (date: string) => `/fixtures/date/${date}`,
} as const;

// State IDs from Sportmonks
export const MATCH_STATES = {
  NOT_STARTED: 1,
  LIVE: 2, // NS (Not Started) / LIVE / HT (Half Time) / FT (Full Time) / AET / BREAK / PEN_LIVE
  FINISHED: 5,
  CANCELLED: 8,
  POSTPONED: 9,
  INTERRUPTED: 10,
  ABANDONED: 11,
  SUSPENDED: 12,
  AWARDED: 13,
  DELAYED: 14,
  TBA: 15,
  WO: 16, // Walkover
  AU: 17, // Awarded
} as const;

// Helper to determine match status for our UI
export function getMatchStatus(stateId: number): 'live' | 'upcoming' | 'finished' {
  if (stateId === MATCH_STATES.LIVE || stateId === 2 || stateId === 3 || stateId === 4) {
    return 'live';
  }
  if (stateId === MATCH_STATES.FINISHED || stateId >= 5) {
    return 'finished';
  }
  return 'upcoming';
}
