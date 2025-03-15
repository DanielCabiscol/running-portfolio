import React, { useState } from 'react';
import { Search, Filter, LayoutGrid, Table } from 'lucide-react';
import { Race, TerrainType, RaceDistance } from '../types';
import { RaceCard } from './RaceCard';
import { RaceTable } from './RaceTable';
import { motion, AnimatePresence } from 'framer-motion';

interface RaceListProps {
  races: Race[];
  isDark: boolean;
}

type ViewMode = 'cards' | 'table';

const filterRaces =(racesToFilter: Race[], search: string, selectedTerrain: TerrainType | 'all', selectedDistance: RaceDistance | 'all')=> racesToFilter.filter(race => {
  const matchesSearch = race.name?.toLowerCase().includes(search.toLowerCase()) ||
                       race.location?.toLowerCase().includes(search.toLowerCase());
  const matchesTerrain = selectedTerrain === 'all' || race.terrain === selectedTerrain;
  const matchesDistance = selectedDistance === 'all' || race.distanceType === selectedDistance;
  
  return matchesSearch && matchesTerrain && matchesDistance;
});

const sortRacesByDate = (races: Race[]) => {
  return races.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  })
};

export const RaceList: React.FC<RaceListProps> = ({ races, isDark }) => {
  const [search, setSearch] = useState('');
  const [selectedTerrain, setSelectedTerrain] = useState<TerrainType | 'all'>('all');
  const [selectedDistance, setSelectedDistance] = useState<RaceDistance | 'all'>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('cards');
  const anyFilterEnabled = selectedTerrain !== 'all' || selectedDistance !== 'all' || search !== '';

  const filteredRaces = anyFilterEnabled ? sortRacesByDate(filterRaces(races, search, selectedTerrain, selectedDistance)) : sortRacesByDate(races); 

  return (
    <div className={`py-12 ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
      <div className="container mx-auto px-4">
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} size={20} />
              <input
                type="text"
                placeholder="Search races..."
                className={`w-full pl-10 pr-4 py-2 ${
                  isDark 
                    ? 'bg-gray-700 text-white focus:ring-blue-500' 
                    : 'bg-white text-gray-900 focus:ring-blue-400'
                } rounded-lg focus:outline-none focus:ring-2`}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex gap-4">
              <select
                className={`px-4 py-2 rounded-lg focus:outline-none focus:ring-2 ${
                  isDark 
                    ? 'bg-gray-700 text-white focus:ring-blue-500' 
                    : 'bg-white text-gray-900 focus:ring-blue-400'
                }`}
                value={selectedTerrain}
                onChange={(e) => setSelectedTerrain(e.target.value as TerrainType | 'all')}
              >
                <option value="all">All Terrains</option>
                <option value="road">Road</option>
                <option value="trail">Trail</option>
                <option value="track">Track</option>
                <option value="mixed">Mixed</option>
              </select>
              <select
                className={`px-4 py-2 rounded-lg focus:outline-none focus:ring-2 ${
                  isDark 
                    ? 'bg-gray-700 text-white focus:ring-blue-500' 
                    : 'bg-white text-gray-900 focus:ring-blue-400'
                }`}
                value={selectedDistance}
                onChange={(e) => setSelectedDistance(e.target.value as RaceDistance | 'all')}
              >
                <option value="all">All Distances</option>
                <option value="5K">5K</option>
                <option value="10K">10K</option>
                <option value="half-marathon">Half Marathon</option>
                <option value="trail">Trail</option>
              </select>
            </div>
          </div>
          
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setViewMode('cards')}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                viewMode === 'cards'
                  ? 'bg-amber-500 text-white'
                  : isDark
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              <LayoutGrid size={20} />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                viewMode === 'table'
                  ? 'bg-amber-500 text-white'
                  : isDark
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Table size={20} />
            </button>
          </div>
        </div>
        
        <AnimatePresence mode="wait">
          {viewMode === 'cards' ? (
            <motion.div
              key="cards"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredRaces.map(race => (
                <RaceCard key={race.id} race={race} isDark={isDark} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="table"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <RaceTable races={filteredRaces} isDark={isDark} />
            </motion.div>
          )}
        </AnimatePresence>
        
        {filteredRaces.length === 0 && (
          <div className={`text-center ${isDark ? 'text-gray-400' : 'text-gray-500'} py-12`}>
            No races found matching your criteria
          </div>
        )}
      </div>
    </div>
  );
};