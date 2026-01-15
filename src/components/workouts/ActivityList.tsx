import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, RefreshCw, Loader2 } from 'lucide-react';
import type { StravaActivity } from '../../types/strava';
import { ActivityCard } from './ActivityCard';

interface ActivityListProps {
  activities: StravaActivity[];
  isDark: boolean;
  isLoading: boolean;
  loadingProgress?: number;
  onRefresh?: () => void;
}

type ActivityType = 'all' | 'Run' | 'TrailRun' | 'VirtualRun' | 'Walk' | 'Ride';

export const ActivityList: React.FC<ActivityListProps> = ({
  activities,
  isDark,
  isLoading,
  loadingProgress = 0,
  onRefresh,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<ActivityType>('all');
  const [showFilters, setShowFilters] = useState(false);

  const activityTypes: { value: ActivityType; label: string }[] = [
    { value: 'all', label: 'Todas' },
    { value: 'Run', label: 'Running' },
    { value: 'TrailRun', label: 'Trail' },
    { value: 'VirtualRun', label: 'Virtual' },
    { value: 'Walk', label: 'Caminata' },
    { value: 'Ride', label: 'Ciclismo' },
  ];

  const filteredActivities = useMemo(() => {
    return activities.filter((activity) => {
      const matchesSearch =
        searchQuery === '' ||
        activity.name.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType = typeFilter === 'all' || activity.type === typeFilter;

      return matchesSearch && matchesType;
    });
  }, [activities, searchQuery, typeFilter]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="w-12 h-12 text-amber-500 animate-spin mb-4" />
        <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          Cargando actividades...
        </p>
        {loadingProgress > 0 && (
          <p className={`text-sm mt-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            {loadingProgress} actividades cargadas
          </p>
        )}
      </div>
    );
  }

  if (activities.length === 0) {
    return (
      <div className="text-center py-20">
        <p className={`text-xl ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          No hay actividades disponibles
        </p>
        <p className={`text-sm mt-2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
          Conecta con Strava para ver tus entrenamientos
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search
            className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
              isDark ? 'text-gray-400' : 'text-gray-500'
            }`}
            size={20}
          />
          <input
            type="text"
            placeholder="Buscar actividades..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 ${
              isDark
                ? 'bg-gray-700 text-white placeholder-gray-400'
                : 'bg-white text-gray-900 placeholder-gray-500 border border-gray-200'
            }`}
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
              showFilters
                ? 'bg-amber-500 text-white'
                : isDark
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            <Filter size={20} />
            Filtros
          </button>
          {onRefresh && (
            <button
              onClick={onRefresh}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                isDark
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              <RefreshCw size={20} />
            </button>
          )}
        </div>
      </div>

      {/* Filters Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}
          >
            <div className="flex flex-wrap gap-2">
              {activityTypes.map((type) => (
                <button
                  key={type.value}
                  onClick={() => setTypeFilter(type.value)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    typeFilter === type.value
                      ? 'bg-amber-500 text-white'
                      : isDark
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        : 'bg-white text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results count */}
      <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
        {filteredActivities.length} de {activities.length} actividades
      </div>

      {/* Activities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredActivities.map((activity, index) => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              isDark={isDark}
              index={index}
            />
          ))}
        </AnimatePresence>
      </div>

      {filteredActivities.length === 0 && (
        <div className="text-center py-10">
          <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            No se encontraron actividades con esos filtros
          </p>
        </div>
      )}
    </div>
  );
};

export default ActivityList;
