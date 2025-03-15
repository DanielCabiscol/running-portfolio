import React from 'react';
import { Race } from '../types';

interface RaceTableProps {
  races: Race[];
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

export const RaceTable: React.FC<RaceTableProps> = ({ races, isDark }) => {
  return (
    <div className="overflow-x-auto">
      <table className={`w-full ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
        <thead>
          <tr className={`${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
            <th className="px-4 py-3 text-left">Date</th>
            <th className="px-4 py-3 text-left">Race</th>
            <th className="px-4 py-3 text-left">Distance</th>
            <th className="px-4 py-3 text-left">Time</th>
            <th className="px-4 py-3 text-left">Pace</th>
            <th className="px-4 py-3 text-left">Terrain</th>
            <th className="px-4 py-3 text-left">Location</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {races.map((race) => (
            <tr
              key={race.id}
              className={`${
                isDark
                  ? 'hover:bg-gray-700'
                  : 'hover:bg-gray-50'
              } transition-colors duration-150`}
            >
              <td className="px-4 py-3">
                {new Date(race.date).toLocaleDateString()}
              </td>
              <td className="px-4 py-3 font-medium">
                {race.name}
              </td>
              <td className="px-4 py-3">
                <span className="px-2 py-1 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-full text-sm">
                  {race.distanceType}
                </span>
              </td>
              <td className="px-4 py-3">
                {race.time}
              </td>
              <td className="px-4 py-3">
                {race.pace} min/km
              </td>
              <td className="px-4 py-3">
                <span className="flex items-center gap-2">
                  {getTerrainEmoji(race.terrain)}
                  <span className="capitalize">{race.terrain}</span>
                </span>
              </td>
              <td className="px-4 py-3">
                {race.location}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};