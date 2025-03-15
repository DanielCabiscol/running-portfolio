import React from 'react';
import { motion } from 'framer-motion';
import { Race } from '../types';

interface UpcomingRacesProps {
  races: Race[];
}

export const UpcomingRaces: React.FC<UpcomingRacesProps> = ({ races }) => {
  return (
    <div className="bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-2">
          <span>Upcoming Races</span>
          <span className="text-2xl">📅</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {races.map((race, index) => (
            <motion.div
              key={race.id}
              className="bg-gray-800 rounded-lg p-6 border-2 border-amber-500"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-white">{race.name}</h3>
                <span className="px-3 py-1 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-full text-sm">
                  {race.distanceType}
                </span>
              </div>
              <div className="space-y-3 text-gray-300">
                <p className="flex items-center gap-2">
                  <span className="text-lg">📅</span>
                  <span>{new Date(race.date).toLocaleDateString()}</span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-lg">📍</span>
                  <span>{race.location}</span>
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};