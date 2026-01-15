export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface ChatContext {
  recentActivities: ActivitySummary[];
  stats: StatsSummary | null;
}

export interface ActivitySummary {
  name: string;
  type: string;
  date: string;
  distance: number; // meters
  time: number; // seconds
  pace: string; // "mm:ss" per km
  heartrate?: number;
  elevation: number; // meters
}

export interface StatsSummary {
  totalDistance: number; // meters
  totalActivities: number;
  averagePace: string; // "mm:ss" per km
  weeklyAverage: {
    distance: number; // km
    activities: number;
  };
  monthlyTrend: 'increasing' | 'stable' | 'decreasing';
}

export interface ChatSuggestion {
  label: string;
  prompt: string;
  icon: string;
}
