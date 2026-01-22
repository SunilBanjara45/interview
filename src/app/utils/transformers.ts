// utils/transformers.ts - Transform Sportmonks API data to our Match interface
import { SportmonksFixture } from '../types/api';
import { Match } from '../types';
import { getMatchStatus } from '../config/api';

/**
 * Transform Sportmonks fixture to our Match interface
 */
export function transformFixtureToMatch(fixture: SportmonksFixture): Match {
  // Extract team names from the "name" field (format: "Team1 vs Team2")
  const [homeTeam, awayTeam] = fixture.name.split(' vs ').map(team => team.trim());

  // Parse the starting_at timestamp to get time and date
  const startDate = new Date(fixture.starting_at);

  // Format time as HH:MM
  const time = startDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  // Format date as "DD MMM"
  const date = startDate.toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
  }).toLowerCase();

  // Determine match status based on state_id
  const status = getMatchStatus(fixture.state_id);

  // Note: Sportmonks doesn't provide scores in the basic fixture endpoint
  // You might need to use additional includes like 'scores' or 'participants'
  // For now, we'll set scores to null and update this later if needed
  const homeScore = null;
  const awayScore = null;

  return {
    id: fixture.id,
    league: `League ID: ${fixture.league_id}`, // You can fetch league details with includes
    time,
    date,
    status,
    homeTeam: homeTeam || 'Unknown',
    awayTeam: awayTeam || 'Unknown',
    homeScore,
    awayScore,
  };
}

/**
 * Transform array of Sportmonks fixtures to Match array
 */
export function transformFixturesToMatches(fixtures: SportmonksFixture[]): Match[] {
  return fixtures.map(transformFixtureToMatch);
}

/**
 * Filter matches by status
 */
export function filterMatchesByStatus(
  matches: Match[],
  filter: 'all' | 'live' | 'upcoming' | 'finished'
): Match[] {
  if (filter === 'all') {
    return matches;
  }
  return matches.filter(match => match.status === filter);
}
