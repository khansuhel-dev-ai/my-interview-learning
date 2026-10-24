import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BookOpen,
  FileCode2,
  HelpCircle,
  Coffee,
  Server,
  Sparkles,
  Zap,
  Compass,
  Cpu,
  Layers,
  CheckCircle2,
  GitBranch,
} from 'lucide-react';
import { getPlatformStats, EXERCISES, INTERVIEW_QUESTIONS, LANGUAGES } from '../data';
import { useProgress } from '../hooks/useProgress';
import { SITE_CONFIG } from '../config/site';
import { RevealOnScroll } from '../components/common/RevealOnScroll';

export const HomePage: React.FC = () => {
  const stats = getPlatformStats();
  const { progress, getLanguageStats } = useProgress();

  const lastVisited = progress.lastVisitedTopic;
  const resumeUrl = lastVisited
    ? `/learn/${lastVisited.languageId}/${lastVisited.topicId}`
    : '/learn/java/java-033-setup-macos';

  const resumeTitle = lastVisited ? lastVisited.title : 'JAVA-033: Java Setup on macOS';

  return (
    <div className="space-y-16 py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* 1. Hero Section with Scroll Reveal */}
      <RevealOnScroll direction="fade" delay={0}>
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-zinc-50 via-white to-zinc-50/50 dark:from-[#12131d] dark:via-[#0e0f16] dark:to-[#0a0b10] border border-zinc-200/90 dark:border-zinc-800/90 p-8 sm:p-12 lg:p-16 shadow-xs">
          {/* Decorative background glow */}
          <div className="absolute top-0 right-1/4 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 translate-y-1/2 w-96 h-96 bg-amber-500/10 dark:bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative max-w-3xl space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800/60 text-indigo-600 dark:text-indigo-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Practical Developer Learning & Technical Interview Preparation</span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-zinc-900 dark:text-white tracking-tight leading-[1.1]">
              {SITE_CONFIG.name}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-600">
                ({SITE_CONFIG.acronym})
              </span>
            </h1>

            {/* Tagline */}
            <p className="text-xl sm:text-2xl font-medium text-zinc-700 dark:text-zinc-200 tracking-tight">
              {SITE_CONFIG.tagline}
            </p>

            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
              Turn complex runtime mechanics, memory models, exception handling, multithreading synchronization, and build pipelines into crystal-clear mental models. Complete with interactive diagrams, in-browser labs, and 117+ technical interview solutions.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to={resumeUrl}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md shadow-indigo-600/20 hover:shadow-indigo-600/30 transition-all active:scale-95 cursor-pointer"
              >
                <span>{lastVisited ? 'Continue Learning' : 'Start with Lesson 1 (macOS Setup)'}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/learn"
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white dark:bg-zinc-800/80 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-100 font-bold text-sm border border-zinc-200 dark:border-zinc-700 transition-all cursor-pointer"
              >
                <Compass className="w-4 h-4 text-zinc-400" />
                <span>Explore All Tracks</span>
              </Link>
            </div>
          </div>
        </section>
      </RevealOnScroll>

      {/* 2. Live Platform Stats Row with Staggered Scroll Reveal */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <RevealOnScroll direction="up" delay={0}>
          <div className="p-5 rounded-2xl bg-white dark:bg-[#12131c] border border-zinc-200 dark:border-zinc-800/80 hover:border-indigo-500/40 transition-colors">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1">
              <Compass className="w-4 h-4 text-indigo-500" />
              <span>Language Tracks</span>
            </div>
            <div className="text-3xl font-black text-zinc-900 dark:text-white font-mono">
              {stats.languagesCount}
            </div>
            <p className="text-[11px] text-zinc-400 mt-1">
              {LANGUAGES.filter((l) => l.status === 'active').map((l) => l.name).join(', ')} (Active) + Upcoming
            </p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll direction="up" delay={100}>
          <div className="p-5 rounded-2xl bg-white dark:bg-[#12131c] border border-zinc-200 dark:border-zinc-800/80 hover:border-emerald-500/40 transition-colors">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1">
              <BookOpen className="w-4 h-4 text-emerald-500" />
              <span>Total Lessons</span>
            </div>
            <div className="text-3xl font-black text-zinc-900 dark:text-white font-mono">
              {stats.totalTopicsCount}
            </div>
            <p className="text-[11px] text-zinc-400 mt-1">Across 9 structured modules</p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll direction="up" delay={200}>
          <div className="p-5 rounded-2xl bg-white dark:bg-[#12131c] border border-zinc-200 dark:border-zinc-800/80 hover:border-amber-500/40 transition-colors">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1">
              <FileCode2 className="w-4 h-4 text-amber-500" />
              <span>Practice Exercises</span>
            </div>
            <div className="text-3xl font-black text-zinc-900 dark:text-white font-mono">
              {stats.totalExercisesCount}
            </div>
            <p className="text-[11px] text-zinc-400 mt-1">With in-browser test validation</p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll direction="up" delay={300}>
          <div className="p-5 rounded-2xl bg-white dark:bg-[#12131c] border border-zinc-200 dark:border-zinc-800/80 hover:border-purple-500/40 transition-colors">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1">
              <HelpCircle className="w-4 h-4 text-purple-500" />
              <span>Interview Bank</span>
            </div>
            <div className="text-3xl font-black text-zinc-900 dark:text-white font-mono">
              {stats.totalQuestionsCount}
            </div>
            <p className="text-[11px] text-zinc-400 mt-1">30-second answers & deep dives</p>
          </div>
        </RevealOnScroll>
      </section>

      {/* 3. Continue Learning Banner with Scroll Reveal */}
      <RevealOnScroll direction="up" delay={100}>
        <section className="p-6 rounded-2xl bg-gradient-to-r from-indigo-50/70 via-white to-purple-50/40 dark:from-indigo-950/30 dark:via-[#11121a] dark:to-purple-950/20 border border-indigo-100 dark:border-indigo-900/40 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              <Zap className="w-4 h-4" />
              <span>Quick Resume</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white">
              {resumeTitle}
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              {lastVisited ? 'Pick up right where you left off' : 'Start your journey with macOS JDK installation and Hello World'}
            </p>
          </div>

          <Link
            to={resumeUrl}
            className="shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm shadow-sm transition-all"
          >
            <span>Jump In</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </section>
      </RevealOnScroll>

      {/* 4. Dynamic Curriculum Tracks by Language (Java & PHP) */}
      <RevealOnScroll direction="up" delay={150}>
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">
                Curriculum Tracks by Language
              </h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                Explore active curriculum tracks and upcoming language roadmaps dynamically
              </p>
            </div>
            <Link
              to="/learn"
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
            >
              <span>View All Modules</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {LANGUAGES.map((lang, index) => {
              const isActiveTrack = lang.status === 'active';
              const langProgress = getLanguageStats(lang.id);

              return (
                <div
                  key={lang.id}
                  className={`rounded-3xl border bg-white dark:bg-[#12131c] p-6 space-y-5 transition-all flex flex-col justify-between shadow-xs hover:shadow-md ${
                    isActiveTrack
                      ? 'border-zinc-200 dark:border-zinc-800 hover:border-indigo-500/50'
                      : 'border-dashed border-zinc-300 dark:border-zinc-800 bg-zinc-50/40 dark:bg-[#101119]'
                  }`}
                >
                  <div className="space-y-4">
                    {/* Card Header with Icon and Badge */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className="p-3 rounded-2xl flex items-center justify-center text-white shadow-sm"
                          style={{ backgroundColor: lang.color }}
                        >
                          {lang.id === 'java' ? (
                            <Coffee className="w-6 h-6" />
                          ) : (
                            <Server className="w-6 h-6" />
                          )}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
                            {lang.name}
                          </h3>
                          <span className="text-xs text-zinc-500 dark:text-zinc-400">
                            {lang.shortName} Track
                          </span>
                        </div>
                      </div>

                      <span
                        className={`text-xs font-mono font-bold px-2.5 py-1 rounded-full border ${
                          isActiveTrack
                            ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/60'
                            : 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 border-amber-200 dark:border-amber-800/60'
                        }`}
                      >
                        {lang.badge}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      {lang.description}
                    </p>

                    {/* Active vs Coming-Soon Content */}
                    {isActiveTrack ? (
                      <div className="space-y-3 pt-2">
                        <div className="grid grid-cols-3 gap-2 text-center">
                          <div className="p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800">
                            <span className="text-xs text-zinc-400 block">Lessons</span>
                            <span className="text-base font-bold font-mono text-zinc-900 dark:text-white">
                              {lang.totalTopics}
                            </span>
                          </div>
                          <div className="p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800">
                            <span className="text-xs text-zinc-400 block">Exercises</span>
                            <span className="text-base font-bold font-mono text-zinc-900 dark:text-white">
                              {lang.totalExercises}
                            </span>
                          </div>
                          <div className="p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800">
                            <span className="text-xs text-zinc-400 block">Questions</span>
                            <span className="text-base font-bold font-mono text-zinc-900 dark:text-white">
                              {lang.totalQuestions}
                            </span>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div>
                          <div className="flex justify-between text-xs font-semibold mb-1">
                            <span className="text-zinc-500 dark:text-zinc-400">Curriculum Mastery</span>
                            <span className="text-indigo-600 dark:text-indigo-400 font-mono">
                              {langProgress.percentage}% ({langProgress.completedCount}/{langProgress.total})
                            </span>
                          </div>
                          <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-2 rounded-full overflow-hidden">
                            <div
                              className="bg-gradient-to-r from-amber-500 to-indigo-600 h-full rounded-full transition-all duration-500"
                              style={{ width: `${langProgress.percentage}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2 pt-1">
                        <div className="p-3 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/30 text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
                          <strong>Roadmap:</strong> Stateless request cycle, PHP-FPM, associative ordered maps, OOP constructor property promotion, strict typing, and PSR standards.
                        </div>
                        <p className="text-[11px] text-zinc-400 italic">
                          Authoring in progress — lessons and interactive exercises will appear here once ready.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-4 flex flex-wrap items-center gap-2">
                    <Link
                      to={`/learn/${lang.id}`}
                      className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all ${
                        isActiveTrack
                          ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm'
                          : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                      }`}
                    >
                      <span>{isActiveTrack ? 'Explore Curriculum' : 'Preview Roadmap'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    {isActiveTrack && (
                      <>
                        <Link
                          to={`/exercises?lang=${lang.id}`}
                          className="px-3 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 text-xs font-semibold"
                          title="Practice Exercises"
                        >
                          Exercises
                        </Link>
                        <Link
                          to={`/interview?lang=${lang.id}`}
                          className="px-3 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 text-xs font-semibold"
                          title="Interview Questions"
                        >
                          Interview
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </RevealOnScroll>

      {/* 5. Interactive Architecture Explorers Showcase */}
      <RevealOnScroll direction="up" delay={200}>
        <section className="p-8 rounded-3xl bg-gradient-to-tr from-zinc-50 via-white to-indigo-50/30 dark:from-[#11121c] dark:via-[#0e0f17] dark:to-[#141525] border border-zinc-200 dark:border-zinc-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-1">
                <GitBranch className="w-4 h-4" />
                <span>Visual Mental Models</span>
              </div>
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
                Interactive Architecture Visualizers
              </h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                Understand complex enterprise mechanisms with interactive diagrams built into lessons
              </p>
            </div>
            <Link
              to="/learn/java/java-maven-build-management"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              <span>Explore Maven Lesson (JAVA-057)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Visualizer 1: Maven Build Lifecycle */}
            <Link
              to="/learn/java/java-maven-build-management"
              className="p-5 rounded-2xl bg-white dark:bg-[#151624] border border-zinc-200 dark:border-zinc-800/80 hover:border-indigo-500/50 hover:shadow-md transition-all group space-y-3"
            >
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <GitBranch className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-zinc-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                  Maven Build Lifecycle & Pipeline
                </h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">
                  Interactive 4-tab explorer: clean, default, site lifecycles, and local vs remote repository resolution.
                </p>
              </div>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 pt-1">
                <span>View Interactive Explorer</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>

            {/* Visualizer 2: Thread State Machine */}
            <Link
              to="/learn/java/java-040-thread-states"
              className="p-5 rounded-2xl bg-white dark:bg-[#151624] border border-zinc-200 dark:border-zinc-800/80 hover:border-amber-500/50 hover:shadow-md transition-all group space-y-3"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-zinc-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400">
                  Thread Lifecycle & 6 States
                </h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">
                  Interactive state machine detailing NEW, RUNNABLE, BLOCKED, WAITING, TIMED_WAITING, and TERMINATED.
                </p>
              </div>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-600 dark:text-amber-400 pt-1">
                <span>View State Machine</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>

            {/* Visualizer 3: Throwable Hierarchy */}
            <Link
              to="/learn/java/java-035-throwable-errors-exceptions"
              className="p-5 rounded-2xl bg-white dark:bg-[#151624] border border-zinc-200 dark:border-zinc-800/80 hover:border-rose-500/50 hover:shadow-md transition-all group space-y-3"
            >
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-zinc-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400">
                  Java Throwable Hierarchy
                </h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">
                  Interactive tree contrasting Error vs Exception, checked vs unchecked, and ClassNotFound vs NoClassDefFound.
                </p>
              </div>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-600 dark:text-rose-400 pt-1">
                <span>View Hierarchy Diagram</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </div>
        </section>
      </RevealOnScroll>

      {/* 6. Featured Exercises & Interview Questions Preview */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Featured Exercises */}
        <RevealOnScroll direction="left" delay={100}>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileCode2 className="w-5 h-5 text-emerald-500" />
                <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
                  Practice Exercises
                </h2>
              </div>
              <Link
                to="/exercises"
                className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
              >
                <span>All ({EXERCISES.length})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-3">
              {EXERCISES.slice(0, 4).map((ex) => (
                <Link
                  key={ex.id}
                  to={`/exercises?id=${ex.id}`}
                  className="block p-4 rounded-2xl bg-white dark:bg-[#12131d] border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500/50 hover:shadow-xs transition-all group"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                      Exercise {ex.number}: {ex.title}
                    </span>
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-mono">
                      {ex.difficulty}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-1">
                    {ex.task}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </RevealOnScroll>

        {/* Featured Questions */}
        <RevealOnScroll direction="right" delay={200}>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-amber-500" />
                <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
                  Interview Questions
                </h2>
              </div>
              <Link
                to="/interview"
                className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
              >
                <span>Question Bank ({INTERVIEW_QUESTIONS.length})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-3">
              {INTERVIEW_QUESTIONS.slice(0, 4).map((q) => (
                <Link
                  key={q.id}
                  to={`/interview?id=${q.id}`}
                  className="block p-4 rounded-2xl bg-white dark:bg-[#12131d] border border-zinc-200 dark:border-zinc-800 hover:border-amber-500/50 hover:shadow-xs transition-all group"
                >
                  <div className="flex items-center justify-between mb-1 gap-2">
                    <span className="font-semibold text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 line-clamp-1">
                      Q{q.number}: {q.question}
                    </span>
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-mono shrink-0">
                      {q.type}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-1">
                    {q.shortAnswer[0]}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </RevealOnScroll>
      </section>

      {/* 7. How MIL Works with Scroll Reveal */}
      <RevealOnScroll direction="up" delay={150}>
        <section className="p-8 rounded-3xl bg-zinc-50 dark:bg-[#0f1017] border border-zinc-200 dark:border-zinc-800/80">
          <div className="text-center max-w-xl mx-auto mb-8 space-y-1">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
              How {SITE_CONFIG.fullName} Works
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              A three-step active learning loop designed for lasting recall and technical interview success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-white dark:bg-[#13141f] border border-zinc-200 dark:border-zinc-800 text-center space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto font-bold font-mono">
                1
              </div>
              <h3 className="font-bold text-sm text-zinc-900 dark:text-white">
                Learn Principles & Internals
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Read concise, real-world notes free of academic bloat. Focus on memory models, code execution lifecycles, and JVM execution mechanics.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-[#13141f] border border-zinc-200 dark:border-zinc-800 text-center space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto font-bold font-mono">
                2
              </div>
              <h3 className="font-bold text-sm text-zinc-900 dark:text-white">
                Solve Exercises
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Verify your understanding with hands-on practice code, validation hints, and revealable solutions with instant feedback.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-[#13141f] border border-zinc-200 dark:border-zinc-800 text-center space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto font-bold font-mono">
                3
              </div>
              <h3 className="font-bold text-sm text-zinc-900 dark:text-white">
                Ace Technical Interviews
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Practice 117+ real interview questions with high-impact 30-second speaking answers and deep-dive technical detail.
              </p>
            </div>
          </div>
        </section>
      </RevealOnScroll>
    </div>
  );
};
