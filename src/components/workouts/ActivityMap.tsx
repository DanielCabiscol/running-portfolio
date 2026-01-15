import React, { useEffect, useRef } from 'react';
import { decodePolyline, getBounds } from '../../utils/polylineDecode';

interface ActivityMapProps {
  polyline: string;
  isDark: boolean;
  className?: string;
}

export const ActivityMap: React.FC<ActivityMapProps> = ({ polyline, isDark, className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !polyline) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * 2; // Retina support
    canvas.height = rect.height * 2;
    ctx.scale(2, 2);

    const coordinates = decodePolyline(polyline);
    if (coordinates.length === 0) return;

    const bounds = getBounds(coordinates);
    const padding = 15;
    const width = rect.width - padding * 2;
    const height = rect.height - padding * 2;

    // Calculate scale
    const latRange = bounds.maxLat - bounds.minLat || 0.001;
    const lngRange = bounds.maxLng - bounds.minLng || 0.001;
    const scale = Math.min(width / lngRange, height / latRange);

    // Center offset
    const offsetX = padding + (width - lngRange * scale) / 2;
    const offsetY = padding + (height - latRange * scale) / 2;

    // Clear canvas
    ctx.fillStyle = isDark ? '#374151' : '#f3f4f6';
    ctx.fillRect(0, 0, rect.width, rect.height);

    // Draw route
    ctx.beginPath();
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    coordinates.forEach(([lat, lng], index) => {
      const x = offsetX + (lng - bounds.minLng) * scale;
      const y = offsetY + (bounds.maxLat - lat) * scale;

      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });

    ctx.stroke();

    // Draw start point
    const [startLat, startLng] = coordinates[0];
    const startX = offsetX + (startLng - bounds.minLng) * scale;
    const startY = offsetY + (bounds.maxLat - startLat) * scale;
    ctx.beginPath();
    ctx.fillStyle = '#22c55e';
    ctx.arc(startX, startY, 4, 0, Math.PI * 2);
    ctx.fill();

    // Draw end point
    const [endLat, endLng] = coordinates[coordinates.length - 1];
    const endX = offsetX + (endLng - bounds.minLng) * scale;
    const endY = offsetY + (bounds.maxLat - endLat) * scale;
    ctx.beginPath();
    ctx.fillStyle = '#ef4444';
    ctx.arc(endX, endY, 4, 0, Math.PI * 2);
    ctx.fill();
  }, [polyline, isDark]);

  if (!polyline) {
    return (
      <div
        className={`flex items-center justify-center ${isDark ? 'bg-gray-700' : 'bg-gray-200'} ${className}`}
      >
        <span className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>No map data</span>
      </div>
    );
  }

  return <canvas ref={canvasRef} className={`w-full h-full rounded-t-lg ${className}`} />;
};

export default ActivityMap;
