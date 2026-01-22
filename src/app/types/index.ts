// types/index.ts
export interface MenuItem {
  id: string;
  icon: any;
  label: string;
}

export interface CompetitionItem {
  id: string;
  label: string;
  count: number;
}

export interface NewsItem {
  id: number;
  title: string;
  image: string;
  hasVideo?: boolean;
  hasPin?: boolean;
}

export interface Match {
  id: number;
  league: string;
  time: string;
  date: string;
  status: 'live' | 'upcoming' | 'finished';
  homeTeam: string;
  awayTeam: string;
  homeScore: number | null;
  awayScore: number | null;
}

export interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export interface MatchCardProps {
  match: Match;
}

export type FilterType = 'all' | 'live' | 'upcoming' | 'finished';