import React from 'react';

interface CircularProgressProps {
  percentage: number;
  isDark: boolean;
}

export function CircularProgress({ percentage, isDark }: CircularProgressProps) {
  const radius = 80;
  const strokeWidth = 12;
  const normalizedRadius = radius - strokeWidth * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDasharray = `${circumference} ${circumference}`;
  const strokeDashoffset = circumference - (Math.min(percentage, 100) / 100) * circumference;

  const getColor = () => {
    if (percentage >= 100) return '#10B981'; // green-500
    if (percentage >= 75) return '#3B82F6'; // blue-500
    if (percentage >= 50) return '#8B5CF6'; // violet-500
    if (percentage >= 25) return '#F59E0B'; // amber-500
    return '#EF4444'; // red-500
  };

  return (
    <div className="relative">
      <svg
        height={radius * 2}
        width={radius * 2}
        className="transform -rotate-90"
      >
        {/* Círculo de fondo */}
        <circle
          stroke={isDark ? '#374151' : '#E5E7EB'}
          fill="transparent"
          strokeWidth={strokeWidth}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        {/* Círculo de progreso */}
        <circle
          stroke={getColor()}
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          className="transition-all duration-500 ease-out"
        />
      </svg>
      
      {/* Texto central */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
          {percentage.toFixed(1)}%
        </span>
        <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          completado
        </span>
      </div>
    </div>
  );
}