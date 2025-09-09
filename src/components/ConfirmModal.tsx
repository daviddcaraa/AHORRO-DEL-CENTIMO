import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface ConfirmModalProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  isDark: boolean;
}

export function ConfirmModal({ title, message, onConfirm, onCancel, isDark }: ConfirmModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className={`
        max-w-md w-full p-6 rounded-2xl shadow-2xl
        ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white'}
      `}>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-full bg-orange-100">
            <AlertTriangle className="h-6 w-6 text-orange-600" />
          </div>
          <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
            {title}
          </h2>
        </div>
        
        <p className={`text-sm mb-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          {message}
        </p>
        
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className={`
              flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-200
              ${isDark 
                ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }
            `}
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-3 px-4 rounded-xl font-medium bg-red-500 hover:bg-red-600 text-white transition-all duration-200"
          >
            Confirmar
          </button>
        </div>
        
        <button
          onClick={onCancel}
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