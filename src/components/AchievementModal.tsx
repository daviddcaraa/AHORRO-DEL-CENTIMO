import React, { useEffect } from 'react';
import { X, Sparkles } from 'lucide-react';

interface AchievementModalProps {
  title: string;
  message: string;
  emoji: string;
  onClose: () => void;
  isDark: boolean;
}

export function AchievementModal({ title, message, emoji, onClose, isDark }: AchievementModalProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className={`
        max-w-md w-full p-8 rounded-2xl shadow-2xl transform animate-pulse
        ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white'}
      `}>
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce">
            {emoji}
          </div>
          
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="h-5 w-5 text-yellow-500" />
            <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
              {title}
            </h2>
            <Sparkles className="h-5 w-5 text-yellow-500" />
          </div>
          
          <p className={`text-lg mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            {message}
          </p>
          
          <button
            onClick={onClose}
            className={`
              px-6 py-3 rounded-xl font-semibold transition-all duration-200
              ${isDark 
                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'bg-blue-500 hover:bg-blue-600 text-white'
              }
              transform hover:scale-105
            `}
          >
            ¡Genial!
          </button>
        </div>
        
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${
            isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
          }`}
        >
          <X className={`h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
        </button>
      </div>
    </div>
  );
}