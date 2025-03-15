import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Race } from '../types';

interface StatisticsProps {
  races: Race[];
}

export const Statistics: React.FC<StatisticsProps> = ({ races }) => {
  // Calculate pace evolution data
  const paceData = races
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map(race => ({
      date: new Date(race.date).toLocaleDateString(),
      pace: parseFloat(race.pace.replace(':', '.')),
      name: race.name
    }));

  // Calculate monthly distance data
  const monthlyDistance = races.reduce((acc, race) => {
    const date = new Date(race.date);
    const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;
    acc[monthYear] = (acc[monthYear] || 0) + race.distance;
    return acc;
  }, {} as Record<string, number>);

  const monthlyData = Object.entries(monthlyDistance).map(([month, distance]) => ({
    month,
    distance: Math.round(distance)
  }));

  return (
    <div className="bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <div className="space-y-12">
          <div>
            <h2 className="text-3xl font-bold text-white mb-8">Pace Evolution</h2>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={paceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="date" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1F2937', border: 'none' }}
                    labelStyle={{ color: '#9CA3AF' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="pace"
                    stroke="#F59E0B"
                    strokeWidth={2}
                    dot={{ fill: '#F59E0B' }}
                    animationDuration={2000}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-white mb-8">Monthly Distance</h2>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1F2937', border: 'none' }}
                    labelStyle={{ color: '#9CA3AF' }}
                  />
                  <Bar
                    dataKey="distance"
                    fill="#F59E0B"
                    animationDuration={2000}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};