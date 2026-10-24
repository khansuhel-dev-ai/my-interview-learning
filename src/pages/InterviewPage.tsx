import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  HelpCircle,
  Search,
  RotateCcw,
  ChevronsUpDown,
} from 'lucide-react';
import { INTERVIEW_QUESTIONS, LANGUAGES } from '../data';
import { QuestionCard } from '../components/interview/QuestionCard';
import { useProgress } from '../hooks/useProgress';
import { LanguageComingSoon } from '../components/common/LanguageComingSoon';
import { Pagination } from '../components/common/Pagination';

export const InterviewPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { progress } = useProgress();
  const listTopRef = useRef<HTMLDivElement>(null);

  const langParam = searchParams.get('lang') || 'all';
  const idParam = searchParams.get('id');

  const [selectedLanguage, setSelectedLanguage] = useState<string>(langParam);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandAll, setExpandAll] = useState(false);

  // Pagination state
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    if (langParam) setSelectedLanguage(langParam);
  }, [langParam]);

  // Reset page when filters or page size change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedLanguage, selectedDifficulty, selectedType, searchQuery, pageSize]);

  const filteredQuestions = useMemo(() => {
    return INTERVIEW_QUESTIONS.filter((q) => {
      // Language
      if (selectedLanguage !== 'all' && q.languageId !== selectedLanguage) {
        return false;
      }
      // Difficulty
      if (selectedDifficulty !== 'all' && q.difficulty !== selectedDifficulty) {
        return false;
      }
      // Type
      if (selectedType !== 'all' && q.type !== selectedType) {
        return false;
      }
      // If direct ID passed in URL
      if (idParam && q.id === idParam) {
        return true;
      }
      // Text search
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const inQuestion = q.question.toLowerCase().includes(query);
        const inAnswers = q.shortAnswer.some((a) => a.toLowerCase().includes(query));
        const inDeepDive = q.deepDive.toLowerCase().includes(query);
        const inTopic = q.topicTitle.toLowerCase().includes(query);
        const inKeywords = q.keywords.some((k) => k.toLowerCase().includes(query));

        if (!inQuestion && !inAnswers && !inDeepDive && !inTopic && !inKeywords) {
          return false;
        }
      }

      return true;
    });
  }, [selectedLanguage, selectedDifficulty, selectedType, searchQuery, idParam]);

  const totalQuestions = INTERVIEW_QUESTIONS.length;
  const reviewedCount = progress.reviewedQuestions.length;
  const totalPages = Math.max(1, Math.ceil(filteredQuestions.length / pageSize));

  // Paginated slice
  const paginatedQuestions = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredQuestions.slice(startIndex, startIndex + pageSize);
  }, [filteredQuestions, currentPage, pageSize]);

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
    setSelectedType('all');
    setSearchQuery('');
    setSearchParams({});
    setCurrentPage(1);
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header Bar with Reviewed Count */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-zinc-200 dark:border-zinc-800">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800/60 text-amber-700 dark:text-amber-300 text-xs font-semibold">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Technical Interview Question Bank</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            Interview Preparation Bank
          </h1>

          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Curated, high-frequency interview questions for senior Java and software engineering roles. Each question provides a 30-second elevator answer, deep-dive JVM mechanics, and follow-up interviewer scenarios.
          </p>
        </div>

        {/* Reviewed Progress Card */}
        <div className="p-4 rounded-2xl bg-white dark:bg-[#12131d] border border-zinc-200 dark:border-zinc-800 shrink-0 w-full md:w-64 space-y-2 shadow-xs">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-zinc-600 dark:text-zinc-300">Questions Reviewed</span>
            <span className="font-mono text-amber-600 dark:text-amber-400">
              {reviewedCount} / {totalQuestions}
            </span>
          </div>
          <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-2 rounded-full overflow-hidden">
            <div
              className="bg-amber-500 h-full rounded-full transition-all duration-500"
              style={{
                width: `${totalQuestions > 0 ? (reviewedCount / totalQuestions) * 100 : 0}%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Filter Controls Bar */}
      <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-[#0f1017] border border-zinc-200 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          {/* Language / Track Filter */}
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
                  {l.name} {l.status === 'coming-soon' ? '(Coming Soon)' : `(${l.totalQuestions})`}
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
              <option value="all">All Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          {/* Type Filter */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-zinc-500 dark:text-zinc-400 font-medium">Type:</span>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-medium focus:outline-none cursor-pointer"
            >
              <option value="all">All Types</option>
              <option value="Conceptual">Conceptual</option>
              <option value="Coding">Coding</option>
              <option value="Scenario-based">Scenario-based</option>
            </select>
          </div>
        </div>

        {/* Search input and Expand Toggle */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search interview questions..."
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-800 dark:text-zinc-200 placeholder:text-zinc-400 focus:outline-none"
            />
          </div>

          <button
            onClick={() => setExpandAll(!expandAll)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-medium hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
            title="Expand or collapse all questions"
          >
            <ChevronsUpDown className="w-3.5 h-3.5 text-zinc-400" />
            <span className="hidden sm:inline">{expandAll ? 'Collapse All' : 'Expand All'}</span>
          </button>

          {(selectedLanguage !== 'all' ||
            selectedDifficulty !== 'all' ||
            selectedType !== 'all' ||
            searchQuery.trim() !== '') && (
            <button
              onClick={resetFilters}
              className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-xs cursor-pointer"
              title="Reset all filters"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Scroll anchor */}
      <div ref={listTopRef} />

      {/* Question Cards List */}
      {selectedLanguage === 'php' ? (
        <LanguageComingSoon languageName="PHP" context="interview" />
      ) : filteredQuestions.length === 0 ? (
        <div className="p-12 text-center rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#12131d] space-y-3">
          <HelpCircle className="w-8 h-8 text-zinc-400 mx-auto" />
          <h3 className="font-bold text-base text-zinc-900 dark:text-white">
            No questions found
          </h3>
          <p className="text-xs text-zinc-500 max-w-sm mx-auto">
            No interview questions match your current filters or search query.
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
          <div className="space-y-4">
            {paginatedQuestions.map((question) => (
              <QuestionCard
                key={question.id}
                question={question}
                defaultExpanded={expandAll || question.id === idParam}
              />
            ))}
          </div>

          {/* Pagination Controls (10-20 per page) */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filteredQuestions.length}
            pageSize={pageSize}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
            pageSizeOptions={[10, 15, 20]}
            itemLabel="questions"
          />
        </div>
      )}
    </div>
  );
};
