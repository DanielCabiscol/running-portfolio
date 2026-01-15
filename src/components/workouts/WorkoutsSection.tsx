import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, BarChart2, MessageSquare } from 'lucide-react';
import { ActivityList } from './ActivityList';
import { WorkoutStats } from './WorkoutStats';
import { ChatInterface } from '../chat/ChatInterface';
import { useStravaActivities } from '../../hooks/useStravaActivities';
import type { ChatContext, ActivitySummary, StatsSummary } from '../../types/chat';
import { calculateMonthlyTrend } from '../../utils/statistics';
import { formatPace } from '../../utils/formatters';

interface WorkoutsSectionProps {
  isDark: boolean;
}

type Tab = 'activities' | 'statistics' | 'chat';

export const WorkoutsSection: React.FC<WorkoutsSectionProps> = ({ isDark }) => {
  const [activeTab, setActiveTab] = useState<Tab>('activities');
  const { activities, stats, isLoading, loadingProgress, error, refetch } = useStravaActivities();

  const tabs = [
    { id: 'activities' as Tab, label: 'Actividades', icon: Activity },
    { id: 'statistics' as Tab, label: 'Estadisticas', icon: BarChart2 },
    { id: 'chat' as Tab, label: 'AI Coach', icon: MessageSquare },
  ];

  // Prepare chat context
  const chatContext: ChatContext = useMemo(() => {
    const recentActivities: ActivitySummary[] = activities.slice(0, 20).map((a) => ({
      name: a.name,
      type: a.type,
      date: a.start_date_local,
      distance: Math.round(a.distance),
      time: a.moving_time,
      pace: formatPace(a.average_speed), // Convert m/s to "mm:ss" per km
      heartrate: a.average_heartrate ? Math.round(a.average_heartrate) : undefined,
      elevation: Math.round(a.total_elevation_gain),
    }));

    const statsSummary: StatsSummary | null = stats
      ? {
          totalDistance: stats.totalDistance,
          totalActivities: stats.totalActivities,
          averagePace: formatPace(stats.averagePace),
          weeklyAverage: {
            distance:
              stats.weeklyStats.length > 0
                ? stats.weeklyStats.reduce((sum, w) => sum + w.distance, 0) / stats.weeklyStats.length
                : 0,
            activities:
              stats.weeklyStats.length > 0
                ? stats.weeklyStats.reduce((sum, w) => sum + w.activities, 0) /
                  stats.weeklyStats.length
                : 0,
          },
          monthlyTrend: calculateMonthlyTrend(stats.monthlyStats),
        }
      : null;

    return {
      recentActivities,
      stats: statsSummary,
    };
  }, [activities, stats]);

  return (
    <div id="workouts" className={`py-12 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h2 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Entrenamientos Strava
          </h2>
        </div>

        {/* Error display */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500">
            {error}
          </div>
        )}

        {/* Tab Navigation */}
        <div className={`flex gap-2 mb-8 border-b pb-4 ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-amber-500 text-white'
                  : isDark
                    ? 'text-gray-300 hover:bg-gray-700'
                    : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <tab.icon size={20} />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'activities' && (
            <motion.div
              key="activities"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <ActivityList
                activities={activities}
                isDark={isDark}
                isLoading={isLoading}
                loadingProgress={loadingProgress}
                onRefresh={refetch}
              />
            </motion.div>
          )}
          {activeTab === 'statistics' && (
            <motion.div
              key="statistics"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              {stats ? (
                <WorkoutStats stats={stats} activities={activities} isDark={isDark} />
              ) : isLoading ? (
                <div className="text-center py-20">
                  <p className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                    Cargando estadisticas...
                  </p>
                </div>
              ) : null}
            </motion.div>
          )}
          {activeTab === 'chat' && (
            <motion.div
              key="chat"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <ChatInterface
                context={chatContext}
                isDark={isDark}
                isDataLoading={isLoading}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default WorkoutsSection;
