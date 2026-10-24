import { useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { UserProgressState, LanguageId } from '../types';
import { getTopicsByLanguage } from '../data';

const PROGRESS_STORAGE_KEY = 'mil_user_progress_data';
const LEGACY_PROGRESS_STORAGE_KEY = 'mjl_user_progress_data';

const defaultState: UserProgressState = {
  completedTopics: [],
  completedExercises: [],
  reviewedQuestions: [],
  lastVisitedTopic: undefined,
};

function triggerCelebration() {
  try {
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#aa3bff', '#3b82f6', '#10b981', '#f59e0b'],
    });
  } catch (err) {
    // Graceful fallback if canvas is unavailable
    console.debug('Confetti effect skipped', err);
  }
}

export function useProgress() {
  const [progress, setProgress] = useState<UserProgressState>(() => {
    if (typeof window === 'undefined') return defaultState;
    try {
      const saved = localStorage.getItem(PROGRESS_STORAGE_KEY) || localStorage.getItem(LEGACY_PROGRESS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : defaultState;
    } catch {
      return defaultState;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      console.warn('Could not save progress to localStorage', e);
    }
  }, [progress]);

  const isTopicCompleted = useCallback(
    (topicId: string) => progress.completedTopics.includes(topicId),
    [progress.completedTopics]
  );

  const isExerciseCompleted = useCallback(
    (exerciseId: string) => progress.completedExercises.includes(exerciseId),
    [progress.completedExercises]
  );

  const isQuestionReviewed = useCallback(
    (questionId: string) => progress.reviewedQuestions.includes(questionId),
    [progress.reviewedQuestions]
  );

  const toggleTopicCompletion = useCallback(
    (topicId: string) => {
      setProgress((prev) => {
        const exists = prev.completedTopics.includes(topicId);
        if (!exists) {
          triggerCelebration();
          return {
            ...prev,
            completedTopics: [...prev.completedTopics, topicId],
          };
        } else {
          return {
            ...prev,
            completedTopics: prev.completedTopics.filter((id) => id !== topicId),
          };
        }
      });
    },
    []
  );

  const toggleExerciseCompletion = useCallback(
    (exerciseId: string) => {
      setProgress((prev) => {
        const exists = prev.completedExercises.includes(exerciseId);
        if (!exists) {
          triggerCelebration();
          return {
            ...prev,
            completedExercises: [...prev.completedExercises, exerciseId],
          };
        } else {
          return {
            ...prev,
            completedExercises: prev.completedExercises.filter((id) => id !== exerciseId),
          };
        }
      });
    },
    []
  );

  const toggleQuestionReviewed = useCallback(
    (questionId: string) => {
      setProgress((prev) => {
        const exists = prev.reviewedQuestions.includes(questionId);
        return {
          ...prev,
          reviewedQuestions: exists
            ? prev.reviewedQuestions.filter((id) => id !== questionId)
            : [...prev.reviewedQuestions, questionId],
        };
      });
    },
    []
  );

  const recordTopicVisit = useCallback(
    (languageId: LanguageId, topicId: string, title: string) => {
      setProgress((prev) => ({
        ...prev,
        lastVisitedTopic: {
          languageId,
          topicId,
          title,
          timestamp: Date.now(),
        },
      }));
    },
    []
  );

  const getLanguageStats = useCallback(
    (languageId: LanguageId) => {
      const allTopics = getTopicsByLanguage(languageId);
      const total = allTopics.length;
      const completedCount = allTopics.filter((t) => progress.completedTopics.includes(t.id)).length;
      const percentage = total > 0 ? Math.round((completedCount / total) * 100) : 0;
      return { total, completedCount, percentage };
    },
    [progress.completedTopics]
  );

  const resetAllProgress = useCallback(() => {
    setProgress(defaultState);
  }, []);

  return {
    progress,
    isTopicCompleted,
    isExerciseCompleted,
    isQuestionReviewed,
    toggleTopicCompletion,
    toggleExerciseCompletion,
    toggleQuestionReviewed,
    recordTopicVisit,
    getLanguageStats,
    resetAllProgress,
  };
}
