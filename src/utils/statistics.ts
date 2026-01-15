import type {
  StravaActivity,
  WorkoutStats,
  WeeklyStats,
  MonthlyStats,
  ActivityTypeBreakdown,
  HeartRateZone,
  DayHeatmapData,
} from '../types/strava';
import { getWeekStart } from './formatters';

const RUN_TYPES = ['Run', 'TrailRun', 'VirtualRun'];

/**
 * Filters activities to only include running activities
 */
export function filterRunActivities(activities: StravaActivity[]): StravaActivity[] {
  return activities.filter((a) => RUN_TYPES.includes(a.type));
}

/**
 * Calculates comprehensive statistics from activities
 */
export function calculateStats(activities: StravaActivity[]): WorkoutStats {
  const runActivities = filterRunActivities(activities);

  const totalDistance = runActivities.reduce((sum, a) => sum + a.distance, 0);
  const totalTime = runActivities.reduce((sum, a) => sum + a.moving_time, 0);
  const totalElevation = runActivities.reduce((sum, a) => sum + a.total_elevation_gain, 0);

  const activitiesWithHR = runActivities.filter((a) => a.has_heartrate && a.average_heartrate);
  const averageHeartRate =
    activitiesWithHR.length > 0
      ? activitiesWithHR.reduce((sum, a) => sum + (a.average_heartrate || 0), 0) /
        activitiesWithHR.length
      : 0;

  const averagePace = totalTime > 0 ? totalDistance / totalTime : 0;

  return {
    totalDistance,
    totalTime,
    totalActivities: runActivities.length,
    totalElevation,
    averagePace,
    averageHeartRate,
    weeklyStats: calculateWeeklyStats(runActivities),
    monthlyStats: calculateMonthlyStats(runActivities),
    activityTypeBreakdown: calculateActivityTypeBreakdown(activities),
  };
}

/**
 * Calculates weekly aggregated statistics
 */
export function calculateWeeklyStats(activities: StravaActivity[]): WeeklyStats[] {
  const weekMap = new Map<string, WeeklyStats>();

  activities.forEach((activity) => {
    const date = new Date(activity.start_date_local);
    const weekStart = getWeekStart(date);
    const key = weekStart.toISOString().split('T')[0];

    const existing = weekMap.get(key) || {
      weekStart: key,
      distance: 0,
      time: 0,
      activities: 0,
      elevation: 0,
      averagePace: 0,
    };

    existing.distance += activity.distance / 1000;
    existing.time += activity.moving_time;
    existing.activities += 1;
    existing.elevation += activity.total_elevation_gain;

    weekMap.set(key, existing);
  });

  // Calculate average pace for each week
  const result = Array.from(weekMap.values()).map((week) => ({
    ...week,
    averagePace: week.time > 0 ? (week.distance * 1000) / week.time : 0,
    distance: Math.round(week.distance * 10) / 10,
    elevation: Math.round(week.elevation),
  }));

  return result.sort((a, b) => a.weekStart.localeCompare(b.weekStart));
}

/**
 * Calculates monthly aggregated statistics
 */
export function calculateMonthlyStats(activities: StravaActivity[]): MonthlyStats[] {
  const monthMap = new Map<string, MonthlyStats>();

  activities.forEach((activity) => {
    const date = new Date(activity.start_date_local);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

    const existing = monthMap.get(key) || {
      month: key,
      distance: 0,
      time: 0,
      activities: 0,
      elevation: 0,
    };

    existing.distance += activity.distance / 1000;
    existing.time += activity.moving_time;
    existing.activities += 1;
    existing.elevation += activity.total_elevation_gain;

    monthMap.set(key, existing);
  });

  const result = Array.from(monthMap.values()).map((month) => ({
    ...month,
    distance: Math.round(month.distance * 10) / 10,
    elevation: Math.round(month.elevation),
  }));

  return result.sort((a, b) => a.month.localeCompare(b.month));
}

/**
 * Calculates activity type breakdown
 */
export function calculateActivityTypeBreakdown(
  activities: StravaActivity[]
): ActivityTypeBreakdown[] {
  const typeMap = new Map<string, ActivityTypeBreakdown>();

  activities.forEach((activity) => {
    const existing = typeMap.get(activity.type) || {
      type: activity.type,
      count: 0,
      distance: 0,
      time: 0,
    };

    existing.count += 1;
    existing.distance += activity.distance;
    existing.time += activity.moving_time;

    typeMap.set(activity.type, existing);
  });

  return Array.from(typeMap.values()).sort((a, b) => b.count - a.count);
}

/**
 * Estimates heart rate zones distribution based on max HR
 */
export function calculateHeartRateZones(
  activities: StravaActivity[],
  maxHR = 190
): HeartRateZone[] {
  const zones: HeartRateZone[] = [
    { zone: 1, name: 'Recovery', min: 0.5 * maxHR, max: 0.6 * maxHR, time: 0, percentage: 0 },
    { zone: 2, name: 'Aerobic', min: 0.6 * maxHR, max: 0.7 * maxHR, time: 0, percentage: 0 },
    { zone: 3, name: 'Tempo', min: 0.7 * maxHR, max: 0.8 * maxHR, time: 0, percentage: 0 },
    { zone: 4, name: 'Threshold', min: 0.8 * maxHR, max: 0.9 * maxHR, time: 0, percentage: 0 },
    { zone: 5, name: 'VO2max', min: 0.9 * maxHR, max: maxHR, time: 0, percentage: 0 },
  ];

  const activitiesWithHR = activities.filter((a) => a.has_heartrate && a.average_heartrate);
  let totalTime = 0;

  activitiesWithHR.forEach((activity) => {
    const hr = activity.average_heartrate!;
    const time = activity.moving_time;
    totalTime += time;

    for (const zone of zones) {
      if (hr >= zone.min && hr < zone.max) {
        zone.time += time;
        break;
      }
    }
  });

  // Calculate percentages
  zones.forEach((zone) => {
    zone.percentage = totalTime > 0 ? Math.round((zone.time / totalTime) * 100) : 0;
  });

  return zones;
}

/**
 * Generates heatmap data for activities by day of week and hour
 */
export function calculateDayHeatmap(activities: StravaActivity[]): DayHeatmapData[] {
  const heatmap: DayHeatmapData[] = [];

  // Initialize all cells
  for (let day = 0; day < 7; day++) {
    for (let hour = 0; hour < 24; hour++) {
      heatmap.push({ day, hour, count: 0 });
    }
  }

  activities.forEach((activity) => {
    const date = new Date(activity.start_date_local);
    const day = date.getDay();
    const hour = date.getHours();

    const cell = heatmap.find((h) => h.day === day && h.hour === hour);
    if (cell) {
      cell.count += 1;
    }
  });

  return heatmap;
}

/**
 * Prepares pace trend data for charting
 */
export function preparePaceData(
  activities: StravaActivity[]
): { date: string; pace: number; name: string }[] {
  return filterRunActivities(activities)
    .slice()
    .reverse()
    .map((activity) => ({
      date: new Date(activity.start_date_local).toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'short',
      }),
      pace: activity.average_speed > 0 ? 1000 / activity.average_speed / 60 : 0,
      name: activity.name,
    }))
    .slice(-30); // Last 30 activities
}

/**
 * Calculates monthly trend (increasing, stable, decreasing)
 */
export function calculateMonthlyTrend(
  monthlyStats: MonthlyStats[]
): 'increasing' | 'stable' | 'decreasing' {
  if (monthlyStats.length < 2) return 'stable';

  const last3Months = monthlyStats.slice(-3);
  if (last3Months.length < 2) return 'stable';

  const first = last3Months[0].distance;
  const last = last3Months[last3Months.length - 1].distance;

  const change = ((last - first) / first) * 100;

  if (change > 10) return 'increasing';
  if (change < -10) return 'decreasing';
  return 'stable';
}
