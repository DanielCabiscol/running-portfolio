import type { StravaActivity, StravaTokens } from '../types/strava';

const API_BASE = '/api/strava';

export const stravaApi = {
  /**
   * Returns the URL to initiate OAuth flow
   */
  getAuthUrl(): string {
    return `${API_BASE}/authorize`;
  },

  /**
   * Fetches user activities from Strava
   */
  async getActivities(token: string, page = 1, perPage = 50): Promise<StravaActivity[]> {
    const response = await fetch(`${API_BASE}/activities?page=${page}&per_page=${perPage}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Unknown error' }));
      if (error.needsRefresh) {
        throw new Error('TOKEN_EXPIRED');
      }
      throw new Error(error.error || 'Failed to fetch activities');
    }

    return response.json();
  },

  /**
   * Fetches all activities with pagination
   */
  async getAllActivities(
    token: string,
    maxPages = 10,
    onProgress?: (loaded: number) => void
  ): Promise<StravaActivity[]> {
    const allActivities: StravaActivity[] = [];
    let page = 1;
    let hasMore = true;

    while (hasMore && page <= maxPages) {
      const activities = await this.getActivities(token, page, 100);
      allActivities.push(...activities);

      if (onProgress) {
        onProgress(allActivities.length);
      }

      if (activities.length < 100) {
        hasMore = false;
      } else {
        page++;
      }
    }

    return allActivities;
  },

  /**
   * Refreshes the access token using the refresh token
   */
  async refreshToken(refreshToken: string): Promise<StravaTokens> {
    const response = await fetch(`${API_BASE}/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });

    if (!response.ok) {
      throw new Error('Failed to refresh token');
    }

    const data = await response.json();
    return JSON.parse(atob(data.token));
  },
};

export default stravaApi;
