import React from 'react';
import { motion } from 'framer-motion';
import { Race } from '../types';

interface RaceCardProps {
  race: Race;
  isDark: boolean;
}

const getTerrainEmoji = (terrain: Race['terrain']) => {
  switch (terrain) {
    case 'road': return '🛣️';
    case 'trail': return '⛰️';
    case 'track': return '🏃';
    case 'mixed': return '🌲';
    default: return '';
  }
};

export const RaceCard: React.FC<RaceCardProps> = ({ race, isDark }) => {
  return (
    <motion.div 
      className={`${
        isDark ? 'bg-gray-800' : 'bg-white'
      } rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300`}
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {race.name}
        </h3>
        <span className="px-3 py-1 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-full text-sm">
          {race.distanceType}
        </span>
      </div>
      <div className={`space-y-3 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
        <div className="flex items-center gap-2">
          <span className="text-lg">📅</span>
          <span>{new Date(race.date).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-lg">⏱️</span>
          <span>{race.time} (Pace: {race.pace} min/km)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-lg">{getTerrainEmoji(race.terrain)}</span>
          <span className="capitalize">{race.terrain} - {race.location}</span>
        </div>
      </div>
    </motion.div>
  );
};