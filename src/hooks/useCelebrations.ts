import { useState, useCallback } from 'react';

interface Achievement {
  title: string;
  message: string;
  emoji: string;
}

export function useCelebrations() {
  const [achievement, setAchievement] = useState<Achievement | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);

  const triggerCelebration = useCallback((title: string, message: string, emoji: string) => {
    setAchievement({ title, message, emoji });
    setShowCelebration(true);
  }, []);

  const closeCelebration = useCallback(() => {
    setShowCelebration(false);
    setTimeout(() => setAchievement(null), 300);
  }, []);

  return {
    achievement,
    showCelebration,
    triggerCelebration,
    closeCelebration,
  };
}