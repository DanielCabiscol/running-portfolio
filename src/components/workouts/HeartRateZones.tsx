import React, { useMemo } from 'react';
import { Heart } from 'lucide-react';
import type { StravaActivity } from '../../types/strava';
import { calculateHeartRateZones } from '../../utils/statistics';
import { formatTotalTime } from '../../utils/formatters';

interface HeartRateZonesProps {
  activities: StravaActivity[];
  isDark: boolean;
  maxHR?: number;
}

const ZONE_COLORS = [
  '#94a3b8', // Zone 1 - gray
  '#22c55e', // Zone 2 - green
  '#eab308', // Zone 3 - yellow
  '#f97316', // Zone 4 - orange
  '#ef4444', // Zone 5 - red
];

export const HeartRateZones: React.FC<HeartRateZonesProps> = ({
  activities,
  isDark,
  maxHR = 190,
}) => {
  const zones = useMemo(
    () => calculateHeartRateZones(activities, maxHR),
    [activities, maxHR]
  );

  const hasHRData = useMemo(
    () => activities.some((a) => a.has_heartrate && a.average_heartrate),
    [activities]
  );

  if (!hasHRData) {
    return null;
  }

  const totalTime = zones.reduce((sum, z) => sum + z.time, 0);

  return (
    <div className={`p-6 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
      <h3 className={`text-xl font-bold mb-6 flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
        <Heart size={24} className="text-red-500" />
        Zonas de Frecuencia Cardiaca
      </h3>

      <div className="space-y-4">
        {zones.map((zone, index) => (
          <div key={zone.zone}>
            <div className="flex justify-between items-center mb-1">
              <div className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: ZONE_COLORS[index] }}
                />
                <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Z{zone.zone}: {zone.name}
                </span>
                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  ({Math.round(zone.min)}-{Math.round(zone.max)} bpm)
                </span>
              </div>
              <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {zone.time > 0 ? formatTotalTime(zone.time) : '--'}
              </div>
            </div>
            <div className={`h-6 rounded-full overflow-hidden ${isDark ? 'bg-gray-600' : 'bg-gray-200'}`}>
              <div
                className="h-full rounded-full transition-all duration-1000"
                style={{
                  width: `${zone.percentage}%`,
                  backgroundColor: ZONE_COLORS[index],
                }}
              />
            </div>
            <div className={`text-right text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {zone.percentage}%
            </div>
          </div>
        ))}
      </div>

      <div className={`mt-6 pt-4 border-t ${isDark ? 'border-gray-600' : 'border-gray-300'}`}>
        <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          <p className="mb-2">
            <strong>Tiempo total analizado:</strong> {formatTotalTime(totalTime)}
          </p>
          <p className="text-xs">
            * Zonas calculadas estimando FC maxima de {maxHR} bpm. Las zonas se basan
            en la FC media de cada actividad.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeartRateZones;
