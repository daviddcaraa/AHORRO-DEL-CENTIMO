import React from 'react';
import { Check } from 'lucide-react';

interface CentBoxProps {
  amount: number;
  index: number;
  isMarked: boolean;
  onToggle: () => void;
  isDark: boolean;
}

export function CentBox({ amount, index, isMarked, onToggle, isDark }: CentBoxProps) {
  const getBoxColor = () => {
    if (isMarked) return 'from-green-500 to-emerald-600';
    
    if (amount <= 1) return 'from-red-400 to-red-500';
    if (amount <= 5) return 'from-orange-400 to-orange-500';
    if (amount <= 10) return 'from-yellow-400 to-yellow-500';
    if (amount <= 25) return 'from-blue-400 to-blue-500';
    if (amount <= 50) return 'from-indigo-400 to-indigo-500';
    if (amount <= 100) return 'from-purple-400 to-purple-500';
    return 'from-pink-400 to-pink-500';
  };

  const getTextColor = () => {
    if (isMarked) return 'text-white';
    return 'text-white';
  };

  return (
    <button
      onClick={onToggle}
      disabled={isMarked}
      className={`
        relative h-16 w-full rounded-xl font-semibold text-sm
        transition-all duration-200 shadow-md
        ${isMarked 
          ? 'cursor-not-allowed transform scale-95' 
          : 'hover:scale-105 hover:shadow-lg active:scale-95'
        }
        bg-gradient-to-br ${getBoxColor()} ${getTextColor()}
      `}
      title={`${amount.toFixed(2)}€ - Casilla ${index + 1}`}
    >
      <div className="flex flex-col items-center justify-center h-full">
        {isMarked && (
          <Check className="h-4 w-4 mb-1" />
        )}
        <span className="text-xs font-bold">
          {amount.toFixed(2)}€
        </span>
      </div>
    </button>
  );
}