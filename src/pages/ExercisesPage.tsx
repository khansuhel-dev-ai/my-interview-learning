import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  FileCode2,
  Search,
  RotateCcw,
  Layers,
} from 'lucide-react';
import { EXERCISES, LANGUAGES } from '../data';
import { ExerciseCard } from '../components/exercises/ExerciseCard';
import { useProgress } from '../hooks/useProgress';
import { LanguageComingSoon } from '../components/common/LanguageComingSoon';
import { Pagination } from '../components/common/Pagination';

export const ExercisesPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { progress } = useProgress();
  const listTopRef = useRef<HTMLDivElement>(null);

  const langParam = searchParams.get('lang') || 'all';
  const idParam = searchParams.get('id');

  const [selectedLanguage, setSelectedLanguage] = useState<string>(langParam);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Pagination state
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    if (langParam) setSelectedLanguage(langParam);
  }, [langParam]);

  // Reset to first page when any filter or page size changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedLanguage, selectedDifficulty, selectedStatus, searchQuery, pageSize]);

  const filteredExercises = useMemo(() => {
    return EXERCISES.filter((ex) => {
      // If direct id requested
      if (idParam && ex.id === idParam) {
        return true;
      }
      // Language filter
      if (selectedLanguage !== 'all' && ex.languageId !== selectedLanguage) {
        return false;
      }
      // Difficulty filter
      if (selectedDifficulty !== 'all' && ex.difficulty !== selectedDifficulty) {
        return false;
      }
      // Status filter
      const isDone = progress.completedExercises.includes(ex.id);
      if (selectedStatus === 'completed' && !isDone) return false;
      if (selectedStatus === 'incomplete' && isDone) return false;

      // Text query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = ex.title.toLowerCase().includes(q);
        const matchTask = ex.task.toLowerCase().includes(q);
        const matchTopic = ex.topicTitle.toLowerCase().includes(q);
        if (!matchTitle && !matchTask && !matchTopic) return false;
      }

      return true;
    });
  }, [selectedLanguage, selectedDifficulty, selectedStatus, searchQuery, progress.completedExercises, idParam]);

  const totalExercises = EXERCISES.length;
  const completedCount = progress.completedExercises.length;
  const percentage = Math.round((completedCount / totalExercises) * 100);
  const totalPages = Math.max(1, Math.ceil(filteredExercises.length / pageSize));

  // Paginated slice
  const paginatedExercises = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredExercises.slice(startIndex, startIndex + pageSize);
  }, [filteredExercises, currentPage, pageSize]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    if (listTopRef.current) {
      listTopRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setSelectedLanguage('all');
    setSelectedDifficulty('all');
    setSelectedStatus('all');
    setSearchQuery('');
    setSearchParams({});
    setCurrentPage(1);
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header Bar with Progress */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-zinc-200 dark:border-zinc-800">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
            <FileCode2 className="w-3.5 h-3.5" />
            <span>Interactive Code Exercises & Practice</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            Practice Exercises
          </h1>

          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Verify your mastery of primitives, narrowing wraparound, conditionals, jagged arrays, method overloading, and constructor chaining with interactive practice tasks.
          </p>
        </div>

        {/* Progress Badge Card */}
        <div className="p-4 rounded-2xl bg-white dark:bg-[#12131d] border border-zinc-200 dark:border-zinc-800 shrink-0 w-full md:w-64 space-y-2 shadow-xs">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-zinc-600 dark:text-zinc-300">Exercises Solved</span>
            <span className="font-mono text-emerald-600 dark:text-emerald-400">
              {completedCount} / {totalExercises} ({percentage}%)
            </span>
          </div>
          <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-2 rounded-full overflow-hidden">
            <div
              className="bg-emerald-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Filter Controls Bar */}
      <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-[#0f1017] border border-zinc-200 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          {/* Language Filter */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-zinc-500 dark:text-zinc-400 font-medium">Track:</span>
            <select
              value={selectedLanguage}
              onChange={(e) => {
                setSelectedLanguage(e.target.value);
                setSearchParams(e.target.value === 'all' ? {} : { lang: e.target.value });
              }}
              className="px-2.5 py-1.5 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-medium focus:outline-none cursor-pointer"
            >
              <option value="all">All Tracks</option>
              {LANGUAGES.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.name} {l.status === 'coming-soon' ? '(Coming Soon)' : `(${l.totalExercises})`}
                </option>
              ))}
            </select>
          </div>

          {/* Difficulty Filter */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-zinc-500 dark:text-zinc-400 font-medium">Difficulty:</span>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-medium focus:outline-none cursor-pointer"
            >
              <option value="all">All Difficulties</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-zinc-500 dark:text-zinc-400 font-medium">Status:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-medium focus:outline-none cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="completed">Solved Only</option>
              <option value="incomplete">Unsolved Only</option>
            </select>
          </div>
        </div>

        {/* Search input in exercises */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by keyword..."
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-800 dark:text-zinc-200 placeholder:text-zinc-400 focus:outline-none"
            />
          </div>

          {(selectedLanguage !== 'all' ||
            selectedDifficulty !== 'all' ||
            selectedStatus !== 'all' ||
            searchQuery.trim() !== '') && (
            <button
              onClick={resetFilters}
              className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-xs flex items-center gap-1 cursor-pointer"
              title="Reset all filters"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Scroll anchor */}
      <div ref={listTopRef} />

      {/* Exercises List */}
      {selectedLanguage === 'php' ? (
        <LanguageComingSoon languageName="PHP" context="exercises" />
      ) : filteredExercises.length === 0 ? (
        <div className="p-12 text-center rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#12131d] space-y-3">
          <Layers className="w-8 h-8 text-zinc-400 mx-auto" />
          <h3 className="font-bold text-base text-zinc-900 dark:text-white">
            No exercises match your filter criteria
          </h3>
          <p className="text-xs text-zinc-500 max-w-sm mx-auto">
            Try adjusting your difficulty or status filter, or reset all active filters.
          </p>
          <button
            onClick={resetFilters}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="space-y-6">
            {paginatedExercises.map((exercise) => (
              <ExerciseCard key={exercise.id} exercise={exercise} />
            ))}
          </div>

          {/* Pagination Controls (10-20 per page) */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filteredExercises.length}
            pageSize={pageSize}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
            pageSizeOptions={[10, 15, 20]}
            itemLabel="exercises"
          />
        </div>
      )}
    </div>
  );
};
