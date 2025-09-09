import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Target, Home, Share2, Copy, Check } from 'lucide-react';
import { ProgressStats } from '../components/ProgressStats';
import { CentBoxGrid } from '../components/CentBoxGrid';
import { FilterControls } from '../components/FilterControls';
import { AchievementModal } from '../components/AchievementModal';
import { ThemeToggle } from '../components/ThemeToggle';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useCelebrations } from '../hooks/useCelebrations';
import { generateCentAmounts } from '../utils/calculations';

export type FilterType = 'all' | 'completed' | 'pending' | 'range';
export type RangeType = '0-10' | '10-50' | '50-100' | '100+';

export function SavingsPage() {
  const { savingsId } = useParams<{ savingsId: string }>();
  const navigate = useNavigate();
  
  const [isDark, setIsDark] = useLocalStorage<boolean>('darkMode', false);
  const [objective] = useLocalStorage<number>(`savings_${savingsId}_objective`, 0);
  const [markedBoxes, setMarkedBoxes] = useLocalStorage<Set<number>>(`savings_${savingsId}_markedBoxes`, new Set());
  const [filter, setFilter] = useState<FilterType>('all');
  const [selectedRange, setSelectedRange] = useState<RangeType>('0-10');
  const [showCopied, setShowCopied] = useState(false);

  const { achievement, showCelebration, triggerCelebration, closeCelebration } = useCelebrations();

  const centAmounts = useMemo(() => 
    objective > 0 ? generateCentAmounts(objective) : [], 
    [objective]
  );

  const progress = useMemo(() => {
    const completed = Array.from(markedBoxes).reduce((sum, index) => {
      return sum + (centAmounts[index] || 0);
    }, 0);
    
    const progressData = {
      completed,
      total: objective,
      percentage: objective > 0 ? (completed / objective) * 100 : 0,
      completedBoxes: markedBoxes.size,
      totalBoxes: centAmounts.length
    };

    // Actualizar el progreso en la lista de ahorros guardados
    const savedSavings = JSON.parse(localStorage.getItem('savedSavings') || '[]');
    const updatedSavings = savedSavings.map((saving: any) => 
      saving.id === savingsId 
        ? { ...saving, progress: progressData }
        : saving
    );
    localStorage.setItem('savedSavings', JSON.stringify(updatedSavings));

    return progressData;
  }, [markedBoxes, centAmounts, objective, savingsId]);

  const filteredBoxes = useMemo(() => {
    const indices = centAmounts.map((_, index) => index);
    
    if (filter === 'completed') {
      return indices.filter(index => markedBoxes.has(index));
    }
    
    if (filter === 'pending') {
      return indices.filter(index => !markedBoxes.has(index));
    }
    
    if (filter === 'range') {
      return indices.filter(index => {
        const amount = centAmounts[index];
        switch (selectedRange) {
          case '0-10': return amount <= 10;
          case '10-50': return amount > 10 && amount <= 50;
          case '50-100': return amount > 50 && amount <= 100;
          case '100+': return amount > 100;
          default: return true;
        }
      });
    }
    
    return indices;
  }, [centAmounts, markedBoxes, filter, selectedRange]);

  const handleBoxToggle = (index: number) => {
    if (markedBoxes.has(index)) return;
    
    const newMarkedBoxes = new Set(markedBoxes);
    newMarkedBoxes.add(index);
    setMarkedBoxes(newMarkedBoxes);
    
    const newCompleted = Array.from(newMarkedBoxes).reduce((sum, idx) => {
      return sum + (centAmounts[idx] || 0);
    }, 0);
    
    const newPercentage = objective > 0 ? (newCompleted / objective) * 100 : 0;
    
    if (newPercentage >= 25 && progress.percentage < 25) {
      triggerCelebration('¡25% alcanzado!', 'Has completado un cuarto de tu objetivo. ¡Sigue así!', '🎉');
    } else if (newPercentage >= 50 && progress.percentage < 50) {
      triggerCelebration('¡Mitad del camino!', 'Has alcanzado el 50% de tu objetivo. ¡Increíble progreso!', '🔥');
    } else if (newPercentage >= 75 && progress.percentage < 75) {
      triggerCelebration('¡75% completado!', 'Solo te queda un último empujón. ¡Ya casi lo tienes!', '⭐');
    } else if (newPercentage >= 100 && progress.percentage < 100) {
      triggerCelebration('¡OBJETIVO CUMPLIDO!', '¡Felicidades! Has alcanzado tu meta de ahorro. ¡Eres increíble!', '🏆');
    }
  };

  const handleShare = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    } catch (err) {
      console.error('Error al copiar:', err);
    }
  };

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  // Si no hay objetivo, redirigir a home
  if (objective === 0) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-indigo-100'
      }`}>
        <div className={`text-center p-8 rounded-2xl ${
          isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
        } shadow-2xl`}>
          <Target className="h-16 w-16 mx-auto mb-4 text-blue-600" />
          <h2 className="text-2xl font-bold mb-4">Ahorro no encontrado</h2>
          <p className="mb-6">Este enlace de ahorro no existe o ha sido eliminado.</p>
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-semibold transition-all duration-200"
          >
            <Home className="h-5 w-5" />
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-indigo-100'
    }`}>
      <div className="container mx-auto px-4 py-6">
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Target className="h-6 w-6 text-blue-600" />
            <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
              AHORRO DEL CÉNTIMO
            </h1>
          </div>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
            Objetivo: {objective.toFixed(2)}€
          </p>
          
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => navigate('/')}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                isDark 
                  ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                  : 'bg-white hover:bg-gray-50 text-gray-700'
              } shadow-md hover:shadow-lg`}
            >
              <Home className="h-4 w-4" />
              Inicio
            </button>
            
            <button
              onClick={handleShare}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                showCopied
                  ? 'bg-green-500 text-white'
                  : isDark 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
              } shadow-md hover:shadow-lg`}
            >
              {showCopied ? (
                <>
                  <Check className="h-4 w-4" />
                  ¡Copiado!
                </>
              ) : (
                <>
                  <Share2 className="h-4 w-4" />
                  Compartir
                </>
              )}
            </button>
          </div>
        </header>

        <div className="mb-8">
          <ProgressStats progress={progress} isDark={isDark} />
        </div>

        <div className="mb-6">
          <FilterControls
            filter={filter}
            onFilterChange={setFilter}
            selectedRange={selectedRange}
            onRangeChange={setSelectedRange}
            isDark={isDark}
          />
        </div>

        <CentBoxGrid
          centAmounts={centAmounts}
          markedBoxes={markedBoxes}
          filteredIndices={filteredBoxes}
          onBoxToggle={handleBoxToggle}
          isDark={isDark}
        />

        <div className="fixed bottom-6 right-6">
          <ThemeToggle isDark={isDark} onToggle={() => setIsDark(!isDark)} />
        </div>

        {showCelebration && achievement && (
          <AchievementModal
            title={achievement.title}
            message={achievement.message}
            emoji={achievement.emoji}
            onClose={closeCelebration}
            isDark={isDark}
          />
        )}
      </div>
    </div>
  );
}