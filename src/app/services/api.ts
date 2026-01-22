// services/api.ts - API Service Functions
import { API_CONFIG, ENDPOINTS } from '../config/api';
import { SportmonksResponse, isSportmonksSuccessResponse } from '../types/api';

class ApiService {
  private baseURL: string;
  private apiToken: string;

  constructor() {
    this.baseURL = API_CONFIG.BASE_URL;
    this.apiToken = API_CONFIG.API_TOKEN;
  }

  private async fetchData<T>(endpoint: string): Promise<T> {
    const url = `${this.baseURL}${endpoint}?api_token=${this.apiToken}`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        // Remove headers to avoid CORS preflight issues
        // Sportmonks API doesn't require these headers for GET requests
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API Fetch Error:', error);
      throw error;
    }
  }

  /**
   * Fetch fixtures by date
   * @param date - Date in format YYYY-MM-DD (e.g., "2022-07-24")
   * @returns Promise with Sportmonks API response
   */
  async getFixturesByDate(date: string): Promise<SportmonksResponse> {
    const endpoint = ENDPOINTS.FIXTURES_BY_DATE(date);
    return this.fetchData<SportmonksResponse>(endpoint);
  }

  /**
   * Get today's fixtures
   */
  async getTodayFixtures(): Promise<SportmonksResponse> {
    const today = this.formatDate(new Date());
    return this.getFixturesByDate(today);
  }

  /**
   * Format Date object to YYYY-MM-DD
   */
  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  /**
   * Get fixtures by relative date
   * @param daysOffset - Number of days from today (negative for past, positive for future)
   */
  async getFixturesByOffset(daysOffset: number): Promise<SportmonksResponse> {
    const date = new Date();
    date.setDate(date.getDate() + daysOffset);
    return this.getFixturesByDate(this.formatDate(date));
  }
}

// Export singleton instance
export const apiService = new ApiService();
