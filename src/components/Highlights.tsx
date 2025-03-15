import React from 'react';
import type { Race } from '../types';

interface HighlightsProps {
  races: Race[];
}

export const Highlights: React.FC<HighlightsProps> = ({ races }) => {
  const getBestTime = (distanceType: Race['distanceType']) => {
    const filteredRaces = races.filter(race => race.distanceType === distanceType);
    if (!filteredRaces.length) return null;
    
    return filteredRaces.reduce((best, current) => 
      best.time < current.time ? best : current
    );
  };

  const categories = ['5K', '10K', 'half-marathon', 'trail'] as const;

  return (
    <div className="bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Personal Records</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map(category => {
            const bestRace = getBestTime(category);
            return (
              <div key={category} className="bg-gray-800 rounded-lg p-6 text-center">
                <h3 className="text-xl font-semibold text-white mb-4">🥇{category}</h3>
                {bestRace ? (
                  <div className="space-y-2 text-gray-300">
                    <p className="text-2xl font-bold text-blue-400">{bestRace.time}</p>
                    <p className="text-sm">Pace: {bestRace.pace} min/km</p>
                    <p className="text-sm">{new Date(bestRace.date).toLocaleDateString()}</p>
                  </div>
                ) : (
                  <p className="text-gray-400">No record yet</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};