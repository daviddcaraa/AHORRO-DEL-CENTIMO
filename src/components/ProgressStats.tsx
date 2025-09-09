import React from 'react';
import { TrendingUp, Target, CheckCircle, Circle } from 'lucide-react';
import { CircularProgress } from './CircularProgress';

interface ProgressStatsProps {
  progress: {
    completed: number;
    total: number;
    percentage: number;
    completedBoxes: number;
    totalBoxes: number;
  };
  isDark: boolean;
}

export function ProgressStats({ progress, isDark }: ProgressStatsProps) {
  const remaining = progress.total - progress.completed;

  return (
    <div className={`p-6 rounded-2xl shadow-lg ${
      isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white'
    }`}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Estadísticas textuales */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="h-6 w-6 text-green-500" />
            <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
              Progreso del ahorro
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-700' : 'bg-green-50'}`}>
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className={`text-xs font-medium ${
                  isDark ? 'text-gray-400' : 'text-green-700'
                }`}>
                  Ahorrado
                </span>
              </div>
              <p className={`text-lg font-bold ${isDark ? 'text-white' : 'text-green-800'}`}>
                {progress.completed.toFixed(2)}€
              </p>
            </div>

            <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-700' : 'bg-blue-50'}`}>
              <div className="flex items-center gap-2 mb-1">
                <Circle className="h-4 w-4 text-blue-500" />
                <span className={`text-xs font-medium ${
                  isDark ? 'text-gray-400' : 'text-blue-700'
                }`}>
                  Restante
                </span>
              </div>
              <p className={`text-lg font-bold ${isDark ? 'text-white' : 'text-blue-800'}`}>
                {remaining.toFixed(2)}€
              </p>
            </div>

            <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-700' : 'bg-purple-50'}`}>
              <div className="flex items-center gap-2 mb-1">
                <Target className="h-4 w-4 text-purple-500" />
                <span className={`text-xs font-medium ${
                  isDark ? 'text-gray-400' : 'text-purple-700'
                }`}>
                  Objetivo
                </span>
              </div>
              <p className={`text-lg font-bold ${isDark ? 'text-white' : 'text-purple-800'}`}>
                {progress.total.toFixed(2)}€
              </p>
            </div>

            <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-700' : 'bg-orange-50'}`}>
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle className="h-4 w-4 text-orange-500" />
                <span className={`text-xs font-medium ${
                  isDark ? 'text-gray-400' : 'text-orange-700'
                }`}>
                  Casillas
                </span>
              </div>
              <p className={`text-lg font-bold ${isDark ? 'text-white' : 'text-orange-800'}`}>
                {progress.completedBoxes}/{progress.totalBoxes}
              </p>
            </div>
          </div>

          {/* Barra de progreso */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <span className={`text-sm font-medium ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Progreso general
              </span>
              <span className={`text-sm font-bold ${
                isDark ? 'text-white' : 'text-gray-800'
              }`}>
                {progress.percentage.toFixed(1)}%
              </span>
            </div>
            <div className={`w-full h-3 rounded-full overflow-hidden ${
              isDark ? 'bg-gray-700' : 'bg-gray-200'
            }`}>
              <div
                className="h-full bg-gradient-to-r from-green-500 to-blue-500 transition-all duration-500 ease-out"
                style={{ width: `${Math.min(progress.percentage, 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Gráfico circular */}
        <div className="flex items-center justify-center">
          <CircularProgress 
            percentage={progress.percentage} 
            isDark={isDark}
          />
        </div>
      </div>
    </div>
  );
}