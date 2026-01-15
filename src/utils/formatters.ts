/**
 * Converts speed in m/s to pace in mm:ss format per kilometer
 */
export function formatPace(speedMps: number): string {
  if (speedMps <= 0) return '--:--';
  const paceSecondsPerKm = 1000 / speedMps;
  const minutes = Math.floor(paceSecondsPerKm / 60);
  const seconds = Math.round(paceSecondsPerKm % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

/**
 * Converts pace in mm:ss format to decimal minutes
 */
export function paceToDecimal(pace: string): number {
  const [minutes, seconds] = pace.split(':').map(Number);
  return minutes + seconds / 60;
}

/**
 * Formats duration in seconds to HH:mm:ss or mm:ss
 */
export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Formats total time in seconds to human-readable format
 */
export function formatTotalTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
}

/**
 * Formats distance in meters to kilometers with 2 decimal places
 */
export function formatDistance(meters: number): string {
  return (meters / 1000).toFixed(2);
}

/**
 * Formats distance in meters to kilometers with 0 decimal places
 */
export function formatDistanceRound(meters: number): string {
  return Math.round(meters / 1000).toString();
}

/**
 * Formats a date string to localized format
 */
export function formatDate(dateString: string, locale = 'es-ES'): string {
  return new Date(dateString).toLocaleDateString(locale, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

/**
 * Formats a date string to full localized format
 */
export function formatDateFull(dateString: string, locale = 'es-ES'): string {
  return new Date(dateString).toLocaleDateString(locale, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Gets week start date (Monday) for a given date
 */
export function getWeekStart(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  d.setDate(diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

/**
 * Formats elevation in meters
 */
export function formatElevation(meters: number): string {
  return `${Math.round(meters)}m`;
}

/**
 * Formats heart rate
 */
export function formatHeartRate(bpm: number): string {
  return `${Math.round(bpm)} bpm`;
}

/**
 * Gets activity type emoji
 */
export function getActivityEmoji(type: string): string {
  switch (type) {
    case 'Run':
      return '🏃';
    case 'TrailRun':
      return '⛰️';
    case 'VirtualRun':
      return '🏠';
    case 'Walk':
      return '🚶';
    case 'Hike':
      return '🥾';
    case 'Ride':
      return '🚴';
    default:
      return '🏃';
  }
}
