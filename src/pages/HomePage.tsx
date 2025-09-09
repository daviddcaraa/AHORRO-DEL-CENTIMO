import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Target, Share2, Plus, Trash2 } from 'lucide-react';
import { ObjectiveInput } from '../components/ObjectiveInput';
import { ThemeToggle } from '../components/ThemeToggle';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { generateSavingsId } from '../utils/savingsUtils';

interface SavedSaving {
  id: string;
  objective: number;
  createdAt: string;
  progress: {
    completed: number;
    percentage: number;
    completedBoxes: number;
    totalBoxes: number;
  };
}

export function HomePage() {
  const [isDark, setIsDark] = useLocalStorage<boolean>('darkMode', false);
  const [savedSavings, setSavedSavings] = useLocalStorage<SavedSaving[]>('savedSavings', []);
  const [showCreateNew, setShowCreateNew] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  const handleCreateSaving = (objective: number) => {
    const savingsId = generateSavingsId();
    
    // Guardar el objetivo en localStorage antes de navegar
    localStorage.setItem(`savings_${savingsId}_objective`, JSON.stringify(objective));
    localStorage.setItem(`savings_${savingsId}_markedBoxes`, JSON.stringify([]));
    
    const newSaving: SavedSaving = {
      id: savingsId,
      objective,
      createdAt: new Date().toISOString(),
      progress: {
        completed: 0,
        percentage: 0,
        completedBoxes: 0,
        totalBoxes: 0
      }
    };

    setSavedSavings(prev => [...prev, newSaving]);
    navigate(`/savings/${savingsId}`);
  };

  const handleDeleteSaving = (id: string) => {
    setSavedSavings(prev => prev.filter(saving => saving.id !== id));
    // También eliminar los datos específicos del ahorro
    localStorage.removeItem(`savings_${id}_markedBoxes`);
    localStorage.removeItem(`savings_${id}_objective`);
  };

  const copyShareLink = (id: string) => {
    const url = `${window.location.origin}/savings/${id}`;
    navigator.clipboard.writeText(url);
    // Aquí podrías añadir una notificación de "copiado"
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-indigo-100'
    }`}>
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Target className="h-8 w-8 text-blue-600" />
            <h1 className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
              AHORRO DEL CÉNTIMO
            </h1>
          </div>
          <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto mb-8`}>
            Crea objetivos de ahorro únicos que puedes compartir y acceder desde cualquier dispositivo
          </p>
          
          <button
            onClick={() => setShowCreateNew(true)}
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 ${
              isDark 
                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            } shadow-lg hover:shadow-xl`}
          >
            <Plus className="h-5 w-5" />
            Crear nuevo ahorro
          </button>
        </header>

        {/* Lista de ahorros guardados */}
        {savedSavings.length > 0 && (
          <div className="mb-12">
            <h2 className={`text-2xl font-bold mb-6 text-center ${isDark ? 'text-white' : 'text-gray-800'}`}>
              Tus ahorros
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {savedSavings.map((saving) => (
                <div
                  key={saving.id}
                  className={`p-6 rounded-2xl shadow-lg transition-all duration-200 hover:shadow-xl ${
                    isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white'
                  }`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                        Objetivo: {saving.objective.toFixed(2)}€
                      </h3>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        Creado: {new Date(saving.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDeleteSaving(saving.id)}
                      className={`p-2 rounded-lg transition-colors ${
                        isDark ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'
                      }`}
                      title="Eliminar ahorro"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Progreso
                      </span>
                      <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                        {saving.progress.percentage.toFixed(1)}%
                      </span>
                    </div>
                    <div className={`w-full h-2 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
                      <div
                        className="h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min(saving.progress.percentage, 100)}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/savings/${saving.id}`)}
                      className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all duration-200 ${
                        isDark 
                          ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                          : 'bg-blue-500 hover:bg-blue-600 text-white'
                      }`}
                    >
                      Abrir
                    </button>
                    <button
                      onClick={() => copyShareLink(saving.id)}
                      className={`p-2 rounded-lg transition-all duration-200 ${
                        isDark 
                          ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                      }`}
                      title="Copiar enlace para compartir"
                    >
                      <Share2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Modal para crear nuevo ahorro */}
        {showCreateNew && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="max-w-md w-full">
              <ObjectiveInput 
                onSubmit={handleCreateSaving} 
                isDark={isDark}
                onCancel={() => setShowCreateNew(false)}
              />
            </div>
          </div>
        )}

        <div className="fixed top-4 right-4">
          <ThemeToggle isDark={isDark} onToggle={() => setIsDark(!isDark)} />
        </div>
      </div>
    </div>
  );
}