import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, BarChart2, MessageSquare, LogOut, User } from 'lucide-react';
import { ActivityList } from './ActivityList';
import { WorkoutStats } from './WorkoutStats';
import { ChatInterface } from '../chat/ChatInterface';
import { useStravaAuth } from '../../hooks/useStravaAuth';
import { useStravaActivities } from '../../hooks/useStravaActivities';
import type { ChatContext, ActivitySummary, StatsSummary } from '../../types/chat';
import { calculateMonthlyTrend } from '../../utils/statistics';

interface WorkoutsSectionProps {
  isDark: boolean;
}

type Tab = 'activities' | 'statistics' | 'chat';

export const WorkoutsSection: React.FC<WorkoutsSectionProps> = ({ isDark }) => {
  const [activeTab, setActiveTab] = useState<Tab>('activities');
  const { isAuthenticated, athlete, isLoading: authLoading, error: authError, login, logout, getToken } = useStravaAuth();
  const token = isAuthenticated ? getToken() : null;
  const { activities, stats, isLoading, loadingProgress, error, refetch } = useStravaActivities(token);

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
      distance: a.distance,
      time: a.moving_time,
      pace: a.average_speed,
      heartrate: a.average_heartrate,
      elevation: a.total_elevation_gain,
    }));

    const statsSummary: StatsSummary | null = stats
      ? {
          totalDistance: stats.totalDistance,
          totalActivities: stats.totalActivities,
          averagePace: stats.averagePace,
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

  // Unauthenticated state
  if (!isAuthenticated && !authLoading) {
    return (
      <div id="workouts" className={`py-16 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="container mx-auto px-4">
          <h2 className={`text-3xl font-bold mb-8 text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Entrenamientos Strava
          </h2>
          <div className="max-w-md mx-auto text-center">
            <div
              className={`p-8 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}
            >
              <div className="text-6xl mb-4">🏃</div>
              <h3 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Conecta con Strava
              </h3>
              <p className={`mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Vincula tu cuenta de Strava para ver todos tus entrenamientos, estadisticas detalladas
                y obtener recomendaciones de un coach IA.
              </p>
              {authError && (
                <p className="text-red-500 text-sm mb-4">{authError}</p>
              )}
              <motion.button
                onClick={login}
                className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg text-white font-semibold inline-flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7 13.828h4.169" />
                </svg>
                Conectar con Strava
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Loading auth state
  if (authLoading) {
    return (
      <div id="workouts" className={`py-16 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="container mx-auto px-4 text-center">
          <div className="animate-pulse">
            <div className={`h-8 w-64 mx-auto rounded ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="workouts" className={`py-12 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h2 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Entrenamientos Strava
          </h2>
          {athlete && (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                {athlete.profile ? (
                  <img
                    src={athlete.profile}
                    alt={athlete.firstname}
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <User size={20} className={isDark ? 'text-gray-400' : 'text-gray-500'} />
                )}
                <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {athlete.firstname} {athlete.lastname}
                </span>
              </div>
              <button
                onClick={logout}
                className={`p-2 rounded-lg transition-colors ${
                  isDark ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'
                }`}
                title="Desconectar"
              >
                <LogOut size={18} />
              </button>
            </div>
          )}
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
              ) : (
                <div className="text-center py-20">
                  <p className={isDark ? 'text-gray-400' : 'text-gray-500'}>
                    Cargando estadisticas...
                  </p>
                </div>
              )}
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
