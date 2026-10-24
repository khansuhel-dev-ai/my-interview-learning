import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Clock,
  Target,
  Lightbulb,
  AlertTriangle,
  CheckCircle,
  Circle,
  ArrowLeft,
  ArrowRight,
  HelpCircle,
  FileCode2,
  BookMarked,
  Sparkles,
} from 'lucide-react';
import { Topic } from '../../types';
import { CodeBlock } from './CodeBlock';
import { useProgress } from '../../hooks/useProgress';
import { EXERCISES, INTERVIEW_QUESTIONS, getAdjacentTopics, getTopicById } from '../../data';
import { ThrowableHierarchyDiagram } from './ThrowableHierarchyDiagram';
import { ThreadLifecycleDiagram } from './ThreadLifecycleDiagram';
import { MavenLifecycleDiagram } from './MavenLifecycleDiagram';

interface TopicContentProps {
  topic: Topic;
}

export const TopicContent: React.FC<TopicContentProps> = ({ topic }) => {
  const { isTopicCompleted, toggleTopicCompletion } = useProgress();
  const isDone = isTopicCompleted(topic.id);
  const { prev, next } = getAdjacentTopics(topic.id);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Track dynamic reading scroll percentage
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const current = window.scrollY;
        const progress = Math.min(100, Math.max(0, (current / totalScroll) * 100));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Find linked exercises and questions
  const linkedExercises = EXERCISES.filter((ex) => topic.exerciseIds.includes(ex.id));
  const linkedQuestions = INTERVIEW_QUESTIONS.filter((q) => topic.interviewQuestionIds.includes(q.id));
  const relatedTopics = topic.relatedTopicIds
    .map((id) => getTopicById(id))
    .filter((t): t is Topic => t !== undefined);

  return (
    <>
      {/* Sticky Reading Progress Bar across top */}
      <div className="sticky top-16 left-0 right-0 h-1 bg-zinc-100 dark:bg-zinc-800/80 z-30">
        <div
          className="h-full bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-600 transition-all duration-100"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <article className="max-w-4xl mx-auto py-6 px-4 sm:px-6">
        {/* Topic Meta Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            <span className="px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-bold border border-indigo-200 dark:border-indigo-800/60">
              {topic.codeNumber}
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-medium border border-zinc-200/80 dark:border-zinc-700">
              {topic.category}
            </span>
            {topic.subcategory && (
              <span className="text-zinc-400 dark:text-zinc-500 hidden sm:inline">
                / {topic.subcategory}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400 text-xs">
              <Clock className="w-3.5 h-3.5" />
              <span>{topic.estimatedMinutes} min read</span>
            </span>

            {/* Quick Header Completion Toggle */}
            <button
              onClick={() => toggleTopicCompletion(topic.id)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                isDone
                  ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white border border-zinc-200 dark:border-zinc-700'
              }`}
              title={isDone ? 'Mark topic incomplete' : 'Mark topic complete'}
            >
              {isDone ? (
                <>
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Done</span>
                </>
              ) : (
                <>
                  <Circle className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Mark Done</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Main Lesson Title */}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight leading-tight mb-4">
          {topic.title}
        </h1>

        {/* Overview & Core Definition */}
        <p className="text-base sm:text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6 font-normal">
          {topic.summary}
        </p>

        {/* Quick Jump Action Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-8 pb-4 border-b border-zinc-200 dark:border-zinc-800 text-xs">
          <span className="text-zinc-400 font-medium mr-1">Jump to:</span>
          <a
            href="#concept-sections"
            className="px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            📖 Core Concepts
          </a>
          {linkedExercises.length > 0 && (
            <a
              href="#practice-exercises"
              className="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 transition-colors flex items-center gap-1 font-semibold"
            >
              <FileCode2 className="w-3 h-3" />
              <span>{linkedExercises.length} Practice {linkedExercises.length === 1 ? 'Task' : 'Tasks'}</span>
            </a>
          )}
          {linkedQuestions.length > 0 && (
            <a
              href="#interview-questions"
              className="px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 hover:bg-amber-100 transition-colors flex items-center gap-1 font-semibold"
            >
              <HelpCircle className="w-3 h-3" />
              <span>{linkedQuestions.length} Interview Q&A</span>
            </a>
          )}
          {topic.keyTakeaways && topic.keyTakeaways.length > 0 && (
            <a
              href="#key-takeaways"
              className="px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 hover:text-indigo-600 transition-colors"
            >
              💡 Key Takeaways
            </a>
          )}
        </div>

        {/* Why It Matters Callout */}
        {topic.whyItMatters && (
          <aside
            aria-label="Why this concept matters"
            className="my-6 pl-4 py-2 border-l-3 border-indigo-500 dark:border-indigo-400 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed bg-zinc-50/50 dark:bg-zinc-900/30 rounded-r-xl"
          >
            <div className="flex items-center gap-2 font-bold text-zinc-900 dark:text-white text-xs uppercase tracking-wider mb-1">
              <Lightbulb className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
              <span>Why This Matters In Technical Interviews</span>
            </div>
            <p className="text-zinc-600 dark:text-zinc-400">{topic.whyItMatters}</p>
          </aside>
        )}

        {/* Learning Objectives */}
        {topic.learningObjectives && topic.learningObjectives.length > 0 && (
          <section aria-label="Learning Objectives" className="my-6 p-4 rounded-2xl bg-zinc-50/70 dark:bg-zinc-900/40 border border-zinc-200/80 dark:border-zinc-800/80">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-2">
              <Target className="w-3.5 h-3.5 text-indigo-500" />
              <span>Learning Objectives</span>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
              {topic.learningObjectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0" />
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Topic Content Sections */}
        <div id="concept-sections" className="space-y-10 my-8">
        {topic.sections.map((section) => (
          <section key={section.id} id={section.id} className="scroll-mt-24">
            <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white tracking-tight mb-3">
              {section.title}
            </h2>

            {/* Direct Explanation Text */}
            <div className="prose dark:prose-invert max-w-none text-sm sm:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed space-y-3">
              <p className="whitespace-pre-line">{section.content}</p>

              {section.bullets && (
                <ul className="space-y-1.5 pl-4 list-disc text-sm text-zinc-700 dark:text-zinc-300">
                  {section.bullets.map((b, bIdx) => (
                    <li key={bIdx} className="leading-relaxed">
                      {b}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Custom Interactive Architecture Diagram */}
            {section.customDiagram === 'throwable-hierarchy' && (
              <ThrowableHierarchyDiagram />
            )}
            {section.customDiagram === 'thread-lifecycle' && (
              <ThreadLifecycleDiagram />
            )}
            {section.customDiagram === 'maven-lifecycle' && (
              <MavenLifecycleDiagram />
            )}

            {/* Code Snippet with Copy Button and Terminal Output */}
            {section.snippet && (
              <CodeBlock
                code={section.snippet.code}
                language={section.snippet.language}
                filename={section.snippet.filename}
                output={section.snippet.output}
                explanation={section.snippet.explanation}
              />
            )}

            {/* Structured Table */}
            {section.table && (
              <div className="my-5 overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-xs">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-zinc-100 dark:bg-zinc-800/80 text-zinc-900 dark:text-zinc-100 font-bold border-b border-zinc-200 dark:border-zinc-800">
                    <tr>
                      {section.table.headers.map((h, hIdx) => (
                        <th key={hIdx} className="px-4 py-3 whitespace-nowrap">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/60 bg-white dark:bg-[#11121a]">
                    {section.table.rows.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors">
                        {row.map((cell, cIdx) => (
                          <td key={cIdx} className="px-4 py-3 text-zinc-700 dark:text-zinc-300">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Process Flow Diagram */}
            {section.flowDiagram && (
              <div className="my-5 p-4 rounded-xl bg-zinc-50 dark:bg-[#11121a] border border-zinc-200 dark:border-zinc-800">
                {section.flowDiagram.title && (
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 block mb-3">
                    {section.flowDiagram.title}
                  </span>
                )}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 overflow-x-auto py-1">
                  {section.flowDiagram.steps.map((step, sIdx, arr) => (
                    <React.Fragment key={sIdx}>
                      <div className="flex-1 p-3 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-center min-w-[130px]">
                        <span className="text-[10px] font-mono font-bold text-indigo-600 dark:text-indigo-400 block mb-0.5">
                          Step {step.stepNumber ?? sIdx + 1}
                        </span>
                        <span className="font-bold text-xs sm:text-sm text-zinc-900 dark:text-white block">
                          {step.label}
                        </span>
                        {step.subtext && (
                          <span className="text-[11px] text-zinc-500 dark:text-zinc-400 block mt-1">
                            {step.subtext}
                          </span>
                        )}
                      </div>
                      {sIdx < arr.length - 1 && (
                        <div className="flex items-center justify-center text-zinc-400 dark:text-zinc-600 shrink-0">
                          <span className="hidden sm:inline text-base font-bold">→</span>
                          <span className="sm:hidden text-base font-bold">↓</span>
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            )}

            {/* Restrained In-Context Note / Callout */}
            {section.callout && (
              <div
                className={`my-4 p-3.5 rounded-xl border text-xs sm:text-sm leading-relaxed flex items-start gap-3 ${
                  section.callout.type === 'warning'
                    ? 'bg-rose-50/50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/40 text-rose-900 dark:text-rose-200'
                    : section.callout.type === 'interview'
                    ? 'bg-indigo-50/50 dark:bg-indigo-950/20 border-indigo-200 dark:border-indigo-900/40 text-indigo-900 dark:text-indigo-200'
                    : 'bg-zinc-50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200'
                }`}
              >
                {section.callout.type === 'warning' ? (
                  <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                ) : section.callout.type === 'interview' ? (
                  <Sparkles className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                ) : (
                  <Lightbulb className="w-4 h-4 text-zinc-500 shrink-0 mt-0.5" />
                )}
                <div>
                  <strong className="block mb-0.5">{section.callout.title}</strong>
                  <span>{section.callout.text}</span>
                </div>
              </div>
            )}
          </section>
        ))}
      </div>

      {/* Common Mistakes & Gotchas (Grouped Comparison) */}
      {topic.commonMistakes && topic.commonMistakes.length > 0 && (
        <section aria-label="Common Pitfalls & Mistakes" className="my-8 p-5 rounded-2xl bg-zinc-50 dark:bg-[#111219] border border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 mb-3">
            <AlertTriangle className="w-4 h-4" />
            <span>Common Pitfalls & Interview Mistakes</span>
          </div>

          <div className="space-y-3">
            {topic.commonMistakes.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs sm:text-sm"
              >
                <div className="text-rose-600 dark:text-rose-400 font-medium mb-1">
                  ✕ Mistake: {item.mistake}
                </div>
                <div className="text-emerald-700 dark:text-emerald-400 font-medium">
                  ✓ Correct: {item.fix}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Key Takeaways */}
      {topic.keyTakeaways && topic.keyTakeaways.length > 0 && (
        <section id="key-takeaways" aria-label="Key Takeaways" className="my-8 p-5 rounded-2xl bg-zinc-50 dark:bg-[#111219] border border-zinc-200 dark:border-zinc-800 scroll-mt-24">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-2.5">
            <CheckCircle className="w-4 h-4" />
            <span>Key Takeaways for Senior Interviews</span>
          </div>
          <ul className="space-y-1.5 text-xs sm:text-sm text-zinc-800 dark:text-zinc-200">
            {topic.keyTakeaways.map((point, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Linked Exercises Section */}
      {linkedExercises.length > 0 && (
        <section id="practice-exercises" aria-label="Practice Exercises" className="my-8 pt-6 border-t border-zinc-200 dark:border-zinc-800 scroll-mt-24">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-sm font-bold text-zinc-900 dark:text-white">
              <FileCode2 className="w-4 h-4 text-indigo-500" />
              <span>Practice Exercises for this Topic</span>
            </div>
            <Link
              to={`/exercises?lang=${topic.languageId}`}
              className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-semibold"
            >
              View all exercises →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {linkedExercises.map((ex) => (
              <Link
                key={ex.id}
                to={`/exercises?lang=${ex.languageId}&id=${ex.id}`}
                className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 hover:border-indigo-500 transition-all group"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                    Exercise {ex.number}: {ex.title}
                  </span>
                  <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-mono">
                    {ex.difficulty}
                  </span>
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2">{ex.task}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Linked Interview Questions Section */}
      {linkedQuestions.length > 0 && (
        <section id="interview-questions" aria-label="Interview Questions" className="my-8 pt-6 border-t border-zinc-200 dark:border-zinc-800 scroll-mt-24">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-sm font-bold text-zinc-900 dark:text-white">
              <HelpCircle className="w-4 h-4 text-amber-500" />
              <span>Related Interview Questions</span>
            </div>
            <Link
              to={`/interview?lang=${topic.languageId}`}
              className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-semibold"
            >
              View question bank →
            </Link>
          </div>
          <div className="space-y-2">
            {linkedQuestions.map((q) => (
              <Link
                key={q.id}
                to={`/interview?lang=${q.languageId}&id=${q.id}`}
                className="block p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 hover:border-amber-500/60 transition-all group"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 line-clamp-1">
                    Q{q.number}: {q.question}
                  </span>
                  <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 shrink-0 font-mono">
                    {q.type}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Related Concepts / Hyperlinks */}
      {relatedTopics.length > 0 && (
        <section aria-label="Related Topics" className="my-8 pt-6 border-t border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-2 text-sm font-bold text-zinc-900 dark:text-white mb-3">
            <BookMarked className="w-4 h-4 text-indigo-500" />
            <span>Next Steps & Related Topics</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {relatedTopics.map((rel) => (
              <Link
                key={rel.id}
                to={`/learn/${rel.languageId}/${rel.id}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs font-medium text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-900 hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                <span>{rel.codeNumber}: {rel.title}</span>
                <ArrowRight className="w-3 h-3 text-zinc-400" />
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Mark As Completed Action Banner */}
      <div className={`my-10 p-6 rounded-3xl border transition-all ${
        isDone
          ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/60'
          : 'bg-zinc-50 dark:bg-[#111219] border-zinc-200 dark:border-zinc-800'
      }`}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              {isDone && <span className="text-sm">🎉</span>}
              <h3 className="font-bold text-sm sm:text-base text-zinc-900 dark:text-white">
                {isDone ? 'Lesson Mastered & Saved!' : 'Finished reviewing this topic?'}
              </h3>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              {isDone
                ? 'Your curriculum progress is saved locally. You are ready for the next challenge!'
                : 'Mark it as completed to track your curriculum progress.'}
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => toggleTopicCompletion(topic.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-xs active:scale-95 ${
                isDone
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white'
              }`}
              aria-label={isDone ? 'Mark as incomplete' : 'Mark as complete'}
            >
              {isDone ? (
                <>
                  <CheckCircle className="w-4 h-4" />
                  <span>Lesson Completed</span>
                </>
              ) : (
                <>
                  <Circle className="w-4 h-4" />
                  <span>Mark as Completed</span>
                </>
              )}
            </button>

            {isDone && next && (
              <Link
                to={`/learn/${next.languageId}/${next.id}`}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-semibold shadow-xs transition-all"
              >
                <span>Next Lesson</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Previous / Next Navigation Controls */}
      <nav aria-label="Topic pagination" className="pt-6 border-t border-zinc-200 dark:border-zinc-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {prev ? (
          <Link
            to={`/learn/${prev.languageId}/${prev.id}`}
            className="flex items-center gap-3 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-indigo-500 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/50 transition-all group"
          >
            <ArrowLeft className="w-4 h-4 text-zinc-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 shrink-0 transition-transform group-hover:-translate-x-1" />
            <div className="text-left min-w-0">
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">
                Previous Lesson
              </span>
              <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 truncate block">
                {prev.codeNumber}: {prev.title}
              </span>
            </div>
          </Link>
        ) : (
          <div />
        )}

        {next ? (
          <Link
            to={`/learn/${next.languageId}/${next.id}`}
            className="flex items-center justify-between sm:justify-end gap-3 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-indigo-500 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/50 transition-all group text-right"
          >
            <div className="min-w-0">
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">
                Next Lesson
              </span>
              <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 truncate block">
                {next.codeNumber}: {next.title}
              </span>
            </div>
            <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 shrink-0 transition-transform group-hover:translate-x-1" />
          </Link>
        ) : (
          <div />
        )}
      </nav>
    </article>
    </>
  );
};

