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
  distance: number;
  time: number;
  pace: number;
  heartrate?: number;
  elevation: number;
}

export interface StatsSummary {
  totalDistance: number;
  totalActivities: number;
  averagePace: number;
  weeklyAverage: {
    distance: number;
    activities: number;
  };
  monthlyTrend: 'increasing' | 'stable' | 'decreasing';
}

export interface ChatSuggestion {
  label: string;
  prompt: string;
  icon: string;
}
