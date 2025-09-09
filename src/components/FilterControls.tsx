import React from 'react';
import { Filter, CheckCircle, Circle, BarChart3 } from 'lucide-react';
import { FilterType, RangeType } from '../App';

interface FilterControlsProps {
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  selectedRange: RangeType;
  onRangeChange: (range: RangeType) => void;
  isDark: boolean;
}

export function FilterControls({ 
  filter, 
  onFilterChange, 
  selectedRange, 
  onRangeChange, 
  isDark 
}: FilterControlsProps) {
  const filterOptions = [
    { value: 'all' as FilterType, label: 'Todas', icon: Filter },
    { value: 'completed' as FilterType, label: 'Completadas', icon: CheckCircle },
    { value: 'pending' as FilterType, label: 'Pendientes', icon: Circle },
    { value: 'range' as FilterType, label: 'Por rango', icon: BarChart3 },
  ];

  const rangeOptions = [
    { value: '0-10' as RangeType, label: '0-10€' },
    { value: '10-50' as RangeType, label: '10-50€' },
    { value: '50-100' as RangeType, label: '50-100€' },
    { value: '100+' as RangeType, label: '100€+' },
  ];

  return (
    <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Filtros principales */}
        <div className="flex flex-wrap gap-2">
          {filterOptions.map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              onClick={() => onFilterChange(value)}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm
                transition-all duration-200
                ${filter === value
                  ? 'bg-blue-500 text-white shadow-md'
                  : isDark
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }
              `}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </div>

        {/* Selector de rango */}
        {filter === 'range' && (
          <div className="flex flex-wrap gap-2">
            {rangeOptions.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => onRangeChange(value)}
                className={`
                  px-3 py-2 rounded-lg font-medium text-sm
                  transition-all duration-200
                  ${selectedRange === value
                    ? 'bg-purple-500 text-white shadow-md'
                    : isDark
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }
                `}
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}