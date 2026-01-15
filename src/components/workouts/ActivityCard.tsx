import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Heart, Mountain, Zap } from 'lucide-react';
import type { StravaActivity } from '../../types/strava';
import { ActivityMap } from './ActivityMap';
import {
  formatPace,
  formatDuration,
  formatDistance,
  formatDateFull,
  getActivityEmoji,
} from '../../utils/formatters';

interface ActivityCardProps {
  activity: StravaActivity;
  isDark: boolean;
  index?: number;
}

export const ActivityCard: React.FC<ActivityCardProps> = ({ activity, isDark, index = 0 }) => {
  const pace = formatPace(activity.average_speed);

  return (
    <motion.div
      className={`${
        isDark ? 'bg-gray-700' : 'bg-white'
      } rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300`}
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      {/* Map Preview */}
      <div className="h-36">
        <ActivityMap polyline={activity.map?.summary_polyline || ''} isDark={isDark} />
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          <h3
            className={`text-lg font-semibold truncate flex-1 mr-2 ${isDark ? 'text-white' : 'text-gray-900'}`}
          >
            {getActivityEmoji(activity.type)} {activity.name}
          </h3>
          <span className="px-2 py-1 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-full text-xs whitespace-nowrap">
            {activity.type === 'TrailRun' ? 'Trail' : activity.type}
          </span>
        </div>

        <div className={`grid grid-cols-2 gap-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          <div className="flex items-center gap-2">
            <MapPin size={14} className="text-amber-500 flex-shrink-0" />
            <span>{formatDistance(activity.distance)} km</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={14} className="text-amber-500 flex-shrink-0" />
            <span>{formatDuration(activity.moving_time)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap size={14} className="text-amber-500 flex-shrink-0" />
            <span>{pace} /km</span>
          </div>
          {activity.has_heartrate && activity.average_heartrate ? (
            <div className="flex items-center gap-2">
              <Heart size={14} className="text-red-500 flex-shrink-0" />
              <span>{Math.round(activity.average_heartrate)} bpm</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Mountain size={14} className="text-green-500 flex-shrink-0" />
              <span>{Math.round(activity.total_elevation_gain)}m</span>
            </div>
          )}
        </div>

        {activity.total_elevation_gain > 0 && activity.has_heartrate && (
          <div
            className={`flex items-center gap-2 mt-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
          >
            <Mountain size={14} className="text-green-500 flex-shrink-0" />
            <span>{Math.round(activity.total_elevation_gain)}m elevation</span>
          </div>
        )}

        <div className={`mt-3 pt-3 border-t ${isDark ? 'border-gray-600' : 'border-gray-200'}`}>
          <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            {formatDateFull(activity.start_date_local)}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default ActivityCard;
