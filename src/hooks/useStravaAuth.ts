import { useState, useEffect, useCallback } from 'react';
import { stravaApi } from '../services/stravaApi';
import type { StravaAthlete, StravaTokens } from '../types/strava';

const TOKEN_KEY = 'strava_auth_token';

interface UseStravaAuthReturn {
  isAuthenticated: boolean;
  athlete: StravaAthlete | null;
  isLoading: boolean;
  error: string | null;
  login: () => void;
  logout: () => void;
  getToken: () => string | null;
  getTokenData: () => StravaTokens | null;
}

export function useStravaAuth(): UseStravaAuthReturn {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [athlete, setAthlete] = useState<StravaAthlete | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check for token in URL on callback
    const params = new URLSearchParams(window.location.search);
    const token = params.get('strava_token');
    const authError = params.get('auth_error');

    if (authError) {
      setError(decodeURIComponent(authError));
      // Clean URL
      window.history.replaceState({}, '', window.location.pathname);
      setIsLoading(false);
      return;
    }

    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
      // Clean URL
      window.history.replaceState({}, '', window.location.pathname);
    }

    // Check stored token
    const storedToken = localStorage.getItem(TOKEN_KEY);
    if (storedToken) {
      try {
        const decoded: StravaTokens = JSON.parse(atob(storedToken));

        // Check if token is expired
        const now = Math.floor(Date.now() / 1000);
        if (decoded.expires_at && decoded.expires_at < now) {
          // Token expired, try to refresh
          if (decoded.refresh_token) {
            stravaApi
              .refreshToken(decoded.refresh_token)
              .then((newTokens) => {
                const newToken = btoa(JSON.stringify(newTokens));
                localStorage.setItem(TOKEN_KEY, newToken);
                if (newTokens.athlete) {
                  setAthlete(newTokens.athlete);
                }
                setIsAuthenticated(true);
              })
              .catch(() => {
                localStorage.removeItem(TOKEN_KEY);
                setError('Session expired. Please login again.');
              })
              .finally(() => setIsLoading(false));
            return;
          } else {
            localStorage.removeItem(TOKEN_KEY);
            setError('Session expired. Please login again.');
          }
        } else {
          if (decoded.athlete) {
            setAthlete(decoded.athlete);
          }
          setIsAuthenticated(true);
        }
      } catch {
        localStorage.removeItem(TOKEN_KEY);
      }
    }

    setIsLoading(false);
  }, []);

  const login = useCallback(() => {
    window.location.href = stravaApi.getAuthUrl();
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem('strava_activities_cache');
    setIsAuthenticated(false);
    setAthlete(null);
    setError(null);
  }, []);

  const getToken = useCallback((): string | null => {
    return localStorage.getItem(TOKEN_KEY);
  }, []);

  const getTokenData = useCallback((): StravaTokens | null => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) return null;
    try {
      return JSON.parse(atob(token));
    } catch {
      return null;
    }
  }, []);

  return {
    isAuthenticated,
    athlete,
    isLoading,
    error,
    login,
    logout,
    getToken,
    getTokenData,
  };
}

export default useStravaAuth;
