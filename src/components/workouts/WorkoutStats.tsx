import React from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { TrendingUp, Clock, Mountain, Activity, Calendar, Zap } from 'lucide-react';
import type { WorkoutStats as WorkoutStatsType, StravaActivity } from '../../types/strava';
import { HeatmapChart } from './HeatmapChart';
import { HeartRateZones } from './HeartRateZones';
import { formatTotalTime, formatPace } from '../../utils/formatters';
import { preparePaceData } from '../../utils/statistics';

interface WorkoutStatsProps {
  stats: WorkoutStatsType;
  activities: StravaActivity[];
  isDark: boolean;
}

interface StatCardProps {
  label: string;
  value: string;
  subValue?: string;
  icon: React.ReactNode;
  isDark: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, subValue, icon, isDark }) => (
  <div
    className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}
  >
    <div className="flex items-center gap-3 mb-2">
      <div className="text-amber-500">{icon}</div>
      <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{label}</span>
    </div>
    <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{value}</div>
    {subValue && (
      <div className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{subValue}</div>
    )}
  </div>
);

export const WorkoutStats: React.FC<WorkoutStatsProps> = ({ stats, activities, isDark }) => {
  const chartColors = {
    grid: isDark ? '#374151' : '#e5e7eb',
    text: isDark ? '#9CA3AF' : '#6b7280',
    tooltip: isDark ? '#1F2937' : '#ffffff',
    accent: '#F59E0B',
    accentSecondary: '#EF4444',
  };

  const paceData = preparePaceData(activities);

  // Prepare weekly data for chart
  const weeklyChartData = stats.weeklyStats.slice(-12).map((week) => ({
    week: new Date(week.weekStart).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' }),
    distance: week.distance,
    activities: week.activities,
  }));

  return (
    <div className="space-y-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <StatCard
          label="Distancia Total"
          value={`${Math.round(stats.totalDistance / 1000)} km`}
          icon={<TrendingUp size={20} />}
          isDark={isDark}
        />
        <StatCard
          label="Tiempo Total"
          value={formatTotalTime(stats.totalTime)}
          icon={<Clock size={20} />}
          isDark={isDark}
        />
        <StatCard
          label="Actividades"
          value={stats.totalActivities.toString()}
          icon={<Activity size={20} />}
          isDark={isDark}
        />
        <StatCard
          label="Desnivel"
          value={`${Math.round(stats.totalElevation).toLocaleString()}m`}
          icon={<Mountain size={20} />}
          isDark={isDark}
        />
        <StatCard
          label="Ritmo Medio"
          value={formatPace(stats.averagePace)}
          subValue="/km"
          icon={<Zap size={20} />}
          isDark={isDark}
        />
        <StatCard
          label="FC Media"
          value={stats.averageHeartRate > 0 ? `${Math.round(stats.averageHeartRate)}` : '--'}
          subValue="bpm"
          icon={<Activity size={20} />}
          isDark={isDark}
        />
      </div>

      {/* Weekly Distance Chart */}
      <div className={`p-6 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
        <h3 className={`text-xl font-bold mb-6 flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          <Calendar size={24} className="text-amber-500" />
          Distancia Semanal
        </h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
              <XAxis dataKey="week" stroke={chartColors.text} fontSize={12} />
              <YAxis stroke={chartColors.text} fontSize={12} unit=" km" />
              <Tooltip
                contentStyle={{
                  backgroundColor: chartColors.tooltip,
                  border: 'none',
                  borderRadius: '8px',
                }}
                labelStyle={{ color: chartColors.text }}
                formatter={(value: number) => [`${value.toFixed(1)} km`, 'Distancia']}
              />
              <Bar dataKey="distance" fill={chartColors.accent} radius={[4, 4, 0, 0]} animationDuration={1500} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Pace Evolution Chart */}
      {paceData.length > 0 && (
        <div className={`p-6 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
          <h3 className={`text-xl font-bold mb-6 flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            <Zap size={24} className="text-amber-500" />
            Evolucion del Ritmo
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={paceData}>
                <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
                <XAxis dataKey="date" stroke={chartColors.text} fontSize={12} />
                <YAxis
                  stroke={chartColors.text}
                  fontSize={12}
                  reversed
                  domain={['dataMin - 0.5', 'dataMax + 0.5']}
                  tickFormatter={(value) => `${Math.floor(value)}:${String(Math.round((value % 1) * 60)).padStart(2, '0')}`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: chartColors.tooltip,
                    border: 'none',
                    borderRadius: '8px',
                  }}
                  labelStyle={{ color: chartColors.text }}
                  formatter={(value: number) => {
                    const minutes = Math.floor(value);
                    const seconds = Math.round((value % 1) * 60);
                    return [`${minutes}:${String(seconds).padStart(2, '0')} /km`, 'Ritmo'];
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="pace"
                  stroke={chartColors.accent}
                  strokeWidth={2}
                  dot={{ fill: chartColors.accent, r: 3 }}
                  activeDot={{ r: 5 }}
                  animationDuration={2000}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className={`text-sm mt-4 text-center ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Menor es mejor - muestra las ultimas 30 actividades
          </p>
        </div>
      )}

      {/* Monthly Distance */}
      <div className={`p-6 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
        <h3 className={`text-xl font-bold mb-6 flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          <TrendingUp size={24} className="text-amber-500" />
          Distancia Mensual
        </h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stats.monthlyStats.slice(-12)}>
              <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
              <XAxis
                dataKey="month"
                stroke={chartColors.text}
                fontSize={12}
                tickFormatter={(value) => {
                  const [year, month] = value.split('-');
                  return `${month}/${year.slice(2)}`;
                }}
              />
              <YAxis stroke={chartColors.text} fontSize={12} unit=" km" />
              <Tooltip
                contentStyle={{
                  backgroundColor: chartColors.tooltip,
                  border: 'none',
                  borderRadius: '8px',
                }}
                formatter={(value: number) => [`${value.toFixed(1)} km`, 'Distancia']}
              />
              <Bar dataKey="distance" fill={chartColors.accent} radius={[4, 4, 0, 0]} animationDuration={1500} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Activity Type Breakdown */}
      {stats.activityTypeBreakdown.length > 1 && (
        <div className={`p-6 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
          <h3 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Tipos de Actividad
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.activityTypeBreakdown.map((breakdown) => (
              <div
                key={breakdown.type}
                className={`p-4 rounded-lg text-center ${isDark ? 'bg-gray-600' : 'bg-white'}`}
              >
                <div className="text-3xl mb-2">
                  {breakdown.type === 'Run' && '🏃'}
                  {breakdown.type === 'TrailRun' && '⛰️'}
                  {breakdown.type === 'VirtualRun' && '🏠'}
                  {breakdown.type === 'Walk' && '🚶'}
                  {breakdown.type === 'Ride' && '🚴'}
                  {breakdown.type === 'Hike' && '🥾'}
                </div>
                <div className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {breakdown.type === 'TrailRun' ? 'Trail' : breakdown.type}
                </div>
                <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {breakdown.count} actividades
                </div>
                <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {Math.round(breakdown.distance / 1000)} km
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Heart Rate Zones */}
      <HeartRateZones activities={activities} isDark={isDark} />

      {/* Activity Heatmap */}
      <HeatmapChart activities={activities} isDark={isDark} />
    </div>
  );
};

export default WorkoutStats;
