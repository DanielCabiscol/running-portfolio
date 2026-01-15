import { useState, useEffect, useCallback } from 'react';
import { stravaApi } from '../services/stravaApi';
import { calculateStats } from '../utils/statistics';
import type { StravaActivity, WorkoutStats } from '../types/strava';

const CACHE_KEY = 'strava_activities_cache';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

interface CacheEntry {
  data: StravaActivity[];
  timestamp: number;
}

interface UseStravaActivitiesReturn {
  activities: StravaActivity[];
  stats: WorkoutStats | null;
  isLoading: boolean;
  loadingProgress: number;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useStravaActivities(): UseStravaActivitiesReturn {
  const [activities, setActivities] = useState<StravaActivity[]>([]);
  const [stats, setStats] = useState<WorkoutStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const fetchActivities = useCallback(async (forceRefresh = false) => {
    // Check cache first
    if (!forceRefresh) {
      try {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const { data, timestamp }: CacheEntry = JSON.parse(cached);
          if (Date.now() - timestamp < CACHE_DURATION) {
            setActivities(data);
            setStats(calculateStats(data));
            setIsLoading(false);
            return;
          }
        }
      } catch {
        // Cache parse error, continue with fetch
      }
    }

    setIsLoading(true);
    setLoadingProgress(0);
    setError(null);

    try {
      const data = await stravaApi.getAllActivities(5, (loaded) => {
        setLoadingProgress(loaded);
      });

      setActivities(data);
      setStats(calculateStats(data));

      // Update cache
      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({
          data,
          timestamp: Date.now(),
        })
      );
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch activities';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  const refetch = useCallback(async () => {
    await fetchActivities(true);
  }, [fetchActivities]);

  return {
    activities,
    stats,
    isLoading,
    loadingProgress,
    error,
    refetch,
  };
}

export default useStravaActivities;
