import type { StravaActivity } from '../types/strava';

const API_BASE = '/api/strava';

export const stravaApi = {
  /**
   * Fetches activities - no auth needed, uses server-side credentials
   */
  async getActivities(page = 1, perPage = 100): Promise<StravaActivity[]> {
    const response = await fetch(`${API_BASE}/activities?page=${page}&per_page=${perPage}`);

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(error.error || 'Failed to fetch activities');
    }

    return response.json();
  },

  /**
   * Fetches all activities with pagination
   */
  async getAllActivities(
    maxPages = 5,
    onProgress?: (loaded: number) => void
  ): Promise<StravaActivity[]> {
    const allActivities: StravaActivity[] = [];
    let page = 1;
    let hasMore = true;

    while (hasMore && page <= maxPages) {
      const activities = await this.getActivities(page, 100);
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
};

export default stravaApi;
