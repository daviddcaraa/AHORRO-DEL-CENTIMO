import React from 'react';
import { CentBox } from './CentBox';

interface CentBoxGridProps {
  centAmounts: number[];
  markedBoxes: Set<number>;
  filteredIndices: number[];
  onBoxToggle: (index: number) => void;
  isDark: boolean;
}

export function CentBoxGrid({ 
  centAmounts, 
  markedBoxes, 
  filteredIndices, 
  onBoxToggle, 
  isDark 
}: CentBoxGridProps) {
  if (filteredIndices.length === 0) {
    return (
      <div className={`text-center py-12 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
        <p className="text-lg">No hay casillas que coincidan con los filtros seleccionados.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3 max-h-96 overflow-y-auto p-4">
      {filteredIndices.map((index) => (
        <CentBox
          key={index}
          amount={centAmounts[index]}
          index={index}
          isMarked={markedBoxes.has(index)}
          onToggle={() => onBoxToggle(index)}
          isDark={isDark}
        />
      ))}
    </div>
  );
}