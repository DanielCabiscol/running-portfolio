import React, { useMemo } from 'react';
import type { StravaActivity } from '../../types/strava';
import { calculateDayHeatmap } from '../../utils/statistics';

interface HeatmapChartProps {
  activities: StravaActivity[];
  isDark: boolean;
}

const DAYS = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'];
const HOURS = Array.from({ length: 24 }, (_, i) => i);

export const HeatmapChart: React.FC<HeatmapChartProps> = ({ activities, isDark }) => {
  const heatmapData = useMemo(() => calculateDayHeatmap(activities), [activities]);

  const maxCount = useMemo(
    () => Math.max(...heatmapData.map((h) => h.count), 1),
    [heatmapData]
  );

  const getColor = (count: number): string => {
    if (count === 0) {
      return isDark ? '#374151' : '#e5e7eb';
    }
    const intensity = count / maxCount;
    if (intensity < 0.25) return '#fef3c7';
    if (intensity < 0.5) return '#fcd34d';
    if (intensity < 0.75) return '#f59e0b';
    return '#d97706';
  };

  const getCell = (day: number, hour: number) => {
    const cell = heatmapData.find((h) => h.day === day && h.hour === hour);
    return cell?.count || 0;
  };

  // Only show hours that have at least one activity
  const activeHours = useMemo(() => {
    const hoursWithData = new Set<number>();
    heatmapData.forEach((h) => {
      if (h.count > 0) {
        hoursWithData.add(h.hour);
      }
    });
    // If no data, show typical running hours (6-22)
    if (hoursWithData.size === 0) {
      return HOURS.filter((h) => h >= 6 && h <= 22);
    }
    // Expand range a bit for context
    const min = Math.max(0, Math.min(...hoursWithData) - 1);
    const max = Math.min(23, Math.max(...hoursWithData) + 1);
    return HOURS.filter((h) => h >= min && h <= max);
  }, [heatmapData]);

  if (activities.length === 0) {
    return null;
  }

  return (
    <div className={`p-6 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
      <h3 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
        Cuando Entrenas
      </h3>
      <div className="overflow-x-auto">
        <div className="min-w-[500px]">
          {/* Hour labels */}
          <div className="flex mb-2">
            <div className="w-12" />
            {activeHours.map((hour) => (
              <div
                key={hour}
                className={`flex-1 text-center text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
              >
                {hour}h
              </div>
            ))}
          </div>

          {/* Heatmap grid */}
          {DAYS.map((dayName, dayIndex) => (
            <div key={dayName} className="flex mb-1">
              <div
                className={`w-12 text-sm flex items-center ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
              >
                {dayName}
              </div>
              <div className="flex flex-1 gap-1">
                {activeHours.map((hour) => {
                  const count = getCell(dayIndex, hour);
                  return (
                    <div
                      key={`${dayIndex}-${hour}`}
                      className="flex-1 h-6 rounded-sm transition-colors cursor-default"
                      style={{ backgroundColor: getColor(count) }}
                      title={`${dayName} ${hour}:00 - ${count} actividades`}
                    />
                  );
                })}
              </div>
            </div>
          ))}

          {/* Legend */}
          <div className="flex items-center justify-end mt-4 gap-2">
            <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Menos</span>
            <div className="flex gap-1">
              {[0, 0.25, 0.5, 0.75, 1].map((intensity) => (
                <div
                  key={intensity}
                  className="w-4 h-4 rounded-sm"
                  style={{ backgroundColor: getColor(intensity * maxCount) }}
                />
              ))}
            </div>
            <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Mas</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeatmapChart;
