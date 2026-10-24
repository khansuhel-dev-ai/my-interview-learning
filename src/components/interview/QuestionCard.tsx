import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronDown,
  ChevronUp,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  BookOpen,
  Sparkles,
} from 'lucide-react';
import { InterviewQuestion } from '../../types';
import { useProgress } from '../../hooks/useProgress';
import { CodeBlock } from '../learning/CodeBlock';

interface QuestionCardProps {
  question: InterviewQuestion;
  defaultExpanded?: boolean;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({ question, defaultExpanded = false }) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const { isQuestionReviewed, toggleQuestionReviewed } = useProgress();
  const isReviewed = isQuestionReviewed(question.id);

  return (
    <div
      className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
        isExpanded
          ? 'bg-white dark:bg-[#12131d] border-indigo-200 dark:border-indigo-900/60 shadow-md'
          : 'bg-white dark:bg-[#101118] border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
      }`}
    >
      {/* Clickable Header */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="p-5 flex items-start justify-between gap-4 cursor-pointer select-none"
      >
        <div className="flex items-start gap-3">
          <span className="shrink-0 mt-0.5 w-7 h-7 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-bold font-mono text-xs flex items-center justify-center border border-indigo-200 dark:border-indigo-800/60">
            Q{question.number}
          </span>

          <div>
            <h3 className="font-bold text-base sm:text-lg text-zinc-900 dark:text-white leading-snug">
              {question.question}
            </h3>

            <div className="flex flex-wrap items-center gap-2 mt-2">
              <span className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium">
                {question.topicTitle}
              </span>

              <span className="text-zinc-300 dark:text-zinc-700">•</span>

              {/* Difficulty */}
              <span
                className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                  question.difficulty === 'Beginner'
                    ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400'
                    : question.difficulty === 'Intermediate'
                    ? 'bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400'
                    : 'bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400'
                }`}
              >
                {question.difficulty}
              </span>

              {/* Type Badge */}
              <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                {question.type}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {/* Bookmark / Reviewed Action */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleQuestionReviewed(question.id);
            }}
            className={`p-2 rounded-xl transition-colors cursor-pointer ${
              isReviewed
                ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/40'
                : 'text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800'
            }`}
            title={isReviewed ? 'Reviewed' : 'Mark as reviewed'}
            aria-label="Bookmark question"
          >
            {isReviewed ? <BookmarkCheck className="w-4 h-4 fill-current" /> : <Bookmark className="w-4 h-4" />}
          </button>

          {/* Chevron */}
          <div className="p-1.5 text-zinc-400">
            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </div>
        </div>
      </div>

      {/* Expandable Body */}
      {isExpanded && (
        <div className="px-5 pb-5 pt-2 border-t border-zinc-100 dark:border-zinc-800/80 text-sm leading-relaxed space-y-4 animate-in fade-in duration-150">
          {/* Interview-Ready Concise Answer (What to say out loud) */}
          <div className="p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400 mb-2">
              <Sparkles className="w-4 h-4 text-indigo-500" />
              <span>Interview-Ready 30-Second Answer:</span>
            </div>
            <ul className="space-y-1.5 text-xs sm:text-sm text-zinc-800 dark:text-zinc-200">
              {question.shortAnswer.map((point, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Deep-Dive Technical Explanation */}
          <div>
            <span className="font-bold text-zinc-900 dark:text-white block mb-1 text-xs uppercase tracking-wider">
              Deep-Dive Technical Detail:
            </span>
            <p className="text-zinc-700 dark:text-zinc-300 text-xs sm:text-sm">{question.deepDive}</p>
          </div>

          {/* Optional Code Snippet */}
          {question.codeSnippet && (
            <div>
              <CodeBlock code={question.codeSnippet.code} language={question.codeSnippet.language} />
            </div>
          )}

          {/* Follow-up Interview Tip */}
          {question.followUpTip && (
            <div className="p-3.5 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 text-xs text-amber-900 dark:text-amber-200">
              <strong className="block font-bold text-amber-800 dark:text-amber-300 mb-0.5">
                Pro-Tip / Follow-Up Question:
              </strong>
              <span>{question.followUpTip}</span>
            </div>
          )}

          {/* Footer Link to Lesson */}
          <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-xs">
            <Link
              to={`/learn/${question.languageId}/${question.topicId}`}
              className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Revise Related Lesson: {question.topicTitle}</span>
            </Link>

            <button
              onClick={() => toggleQuestionReviewed(question.id)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium cursor-pointer ${
                isReviewed
                  ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40'
                  : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{isReviewed ? 'Reviewed' : 'Mark as Reviewed'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
