// types/api.ts - Sportmonks API Response Types

export interface SportmonksFixture {
  id: number;
  sport_id: number;
  league_id: number;
  season_id: number;
  stage_id: number;
  group_id: number | null;
  aggregate_id: number | null;
  round_id: number;
  state_id: number;
  venue_id: number;
  name: string;
  starting_at: string;
  result_info: string | null;
  leg: string;
  details: string | null;
  length: number;
  placeholder: boolean;
  has_odds: boolean;
  has_premium_odds: boolean;
  starting_at_timestamp: number;
}

export interface Pagination {
  count: number;
  per_page: number;
  current_page: number;
  next_page: number | null;
  has_more: boolean;
}

export interface Plan {
  plan: string;
  sport: string;
  category: string;
}

export interface Subscription {
  meta: any[];
  plans: Plan[];
  add_ons: any[];
  widgets: any[];
}

export interface RateLimit {
  resets_in_seconds: number;
  remaining: number;
  requested_entity: string;
}

export interface SportmonksSuccessResponse {
  data: SportmonksFixture[];
  pagination: Pagination;
  subscription: Subscription[];
  rate_limit: RateLimit;
  timezone: string;
}

export interface SportmonksErrorResponse {
  message: string;
  subscription: Subscription[];
  rate_limit: RateLimit;
}

export type SportmonksResponse = SportmonksSuccessResponse | SportmonksErrorResponse;

// Helper type guard
export function isSportmonksSuccessResponse(
  response: SportmonksResponse
): response is SportmonksSuccessResponse {
  return 'data' in response;
}
