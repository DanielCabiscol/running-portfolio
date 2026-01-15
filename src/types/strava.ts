export interface StravaAthlete {
  id: number;
  firstname: string;
  lastname: string;
  profile: string;
  city: string;
  country: string;
}

export interface StravaActivity {
  id: number;
  name: string;
  type: 'Run' | 'TrailRun' | 'VirtualRun' | 'Walk' | 'Hike' | 'Ride' | 'Workout';
  sport_type: string;
  start_date: string;
  start_date_local: string;
  timezone: string;
  distance: number;
  moving_time: number;
  elapsed_time: number;
  total_elevation_gain: number;
  average_speed: number;
  max_speed: number;
  average_heartrate?: number;
  max_heartrate?: number;
  average_cadence?: number;
  has_heartrate: boolean;
  map: {
    id: string;
    summary_polyline: string;
    polyline?: string;
  };
  start_latlng: [number, number] | null;
  end_latlng: [number, number] | null;
  kudos_count: number;
  achievement_count: number;
  suffer_score?: number;
}

export interface StravaTokens {
  access_token: string;
  refresh_token: string;
  expires_at: number;
  athlete?: StravaAthlete;
}

export interface WorkoutStats {
  totalDistance: number;
  totalTime: number;
  totalActivities: number;
  totalElevation: number;
  averagePace: number;
  averageHeartRate: number;
  weeklyStats: WeeklyStats[];
  monthlyStats: MonthlyStats[];
  activityTypeBreakdown: ActivityTypeBreakdown[];
}

export interface WeeklyStats {
  weekStart: string;
  distance: number;
  time: number;
  activities: number;
  elevation: number;
  averagePace: number;
}

export interface MonthlyStats {
  month: string;
  distance: number;
  time: number;
  activities: number;
  elevation: number;
}

export interface ActivityTypeBreakdown {
  type: string;
  count: number;
  distance: number;
  time: number;
}

export interface HeartRateZone {
  zone: number;
  name: string;
  min: number;
  max: number;
  time: number;
  percentage: number;
}

export interface DayHeatmapData {
  day: number;
  hour: number;
  count: number;
}
