import React, { useState } from 'react';
import { Target, Calculator } from 'lucide-react';
import { calculateCentsNeeded } from '../utils/calculations';

interface ObjectiveInputProps {
  onSubmit: (objective: number) => void;
  isDark: boolean;
  onCancel?: () => void;
}

export function ObjectiveInput({ onSubmit, isDark, onCancel }: ObjectiveInputProps) {
  const [inputValue, setInputValue] = useState('');
  const [preview, setPreview] = useState<{
    centsNeeded: number;
    totalSum: number;
  } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    
    const numValue = parseFloat(value);
    if (numValue > 0) {
      const result = calculateCentsNeeded(numValue);
      setPreview(result);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const objective = parseFloat(inputValue);
    if (objective > 0) {
      onSubmit(objective);
    }
  };

  return (
    <div className={`p-8 rounded-2xl shadow-2xl backdrop-blur-sm ${
      isDark 
        ? 'bg-gray-800/90 border border-gray-700' 
        : 'bg-white/90 border border-white/50'
    }`}>
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
          <Calculator className="h-8 w-8 text-blue-600" />
        </div>
        <h2 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>
          Define tu objetivo
        </h2>
        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Introduce la cantidad que quieres ahorrar
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className={`block text-sm font-medium mb-2 ${
            isDark ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Objetivo de ahorro (€)
          </label>
          <input
            type="number"
            value={inputValue}
            onChange={handleInputChange}
            min="0.01"
            step="0.01"
            placeholder="Ej: 3000.00"
            className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 text-lg font-semibold text-center ${
              isDark
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500'
                : 'bg-white border-gray-200 text-gray-800 placeholder-gray-400 focus:border-blue-500'
            } focus:outline-none focus:ring-4 focus:ring-blue-500/20`}
            required
          />
        </div>

        {preview && (
          <div className={`p-4 rounded-xl ${
            isDark ? 'bg-gray-700/50' : 'bg-blue-50'
          }`}>
            <h3 className={`font-semibold mb-2 ${isDark ? 'text-blue-400' : 'text-blue-800'}`}>
              Vista previa:
            </h3>
            <div className="space-y-1 text-sm">
              <p className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                <span className="font-medium">Casillas necesarias:</span> {preview.centsNeeded}
              </p>
              <p className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                <span className="font-medium">Suma total:</span> {preview.totalSum.toFixed(2)}€
              </p>
              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Desde 0,01€ hasta {(preview.centsNeeded * 0.01).toFixed(2)}€
              </p>
            </div>
          </div>
        )}

        <div className="flex gap-3">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className={`flex-1 py-4 rounded-xl font-semibold text-lg transition-all duration-200 ${
                isDark 
                  ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              }`}
            >
              Cancelar
            </button>
          )}
          <button
            type="submit"
            disabled={!preview}
            className={`${onCancel ? 'flex-1' : 'w-full'} py-4 rounded-xl font-semibold text-lg transition-all duration-200 ${
              preview
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02]'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Target className="h-5 w-5" />
              Comenzar ahorro
            </div>
          </button>
        </div>
      </form>
    </div>
  );
}