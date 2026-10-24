import React from 'react';
import { Link } from 'react-router-dom';
import {
  Server,
  Sparkles,
  ArrowRight,
  Clock,
  Coffee,
  Code2,
} from 'lucide-react';

interface LanguageComingSoonProps {
  languageName?: string;
  context?: 'learn' | 'exercises' | 'interview';
}

export const LanguageComingSoon: React.FC<LanguageComingSoonProps> = ({
  languageName = 'PHP',
  context = 'learn',
}) => {
  const contextTitles = {
    learn: `${languageName} Curriculum`,
    exercises: `${languageName} Practice Exercises`,
    interview: `${languageName} Interview Questions`,
  };

  const contextDescriptions = {
    learn: `Comprehensive, structured lessons for modern ${languageName} 8+ are currently being authored. Get ready for deep-dive coverage on the stateless request lifecycle, FastCGI (FPM), associative arrays, OOP with constructor promotion, strict typing, and modern web architectures.`,
    exercises: `Interactive ${languageName} coding challenges with in-browser syntax verification and solution explanations are being prepared.`,
    interview: `High-frequency ${languageName} technical interview questions with 30-second speaking bullets and architectural deep dives are under active curation.`,
  };

  const upcomingModules = [
    {
      title: 'Modern PHP 8+ Architecture',
      desc: 'Stateless request cycle, Nginx + PHP-FPM, JIT compilation, strict types',
      status: 'In Review',
    },
    {
      title: 'Arrays as Ordered Hash Maps',
      desc: 'Combining indexed lists and dictionaries, array functions, algorithmic complexity',
      status: 'Planned',
    },
    {
      title: 'PHP 8 OOP & Constructor Promotion',
      desc: 'Constructor property promotion, readonly properties, typed properties, interfaces',
      status: 'Planned',
    },
    {
      title: 'Web Architecture, PSR Standards & Security',
      desc: 'Composer autoloading, PSR-4/12, PDO prepared statements, SQLi & XSS prevention',
      status: 'Planned',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 space-y-8 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-gradient-to-b from-indigo-50/50 via-white to-zinc-50 dark:from-[#131522] dark:via-[#10111a] dark:to-[#0c0d14] p-8 sm:p-10 shadow-xs relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative space-y-4">
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
              <Server className="w-5 h-5" />
            </div>
            <span className="text-xs uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>Content to be added</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            {contextTitles[context]}
          </h1>

          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl">
            {contextDescriptions[context]}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link
              to="/learn/java"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
            >
              <Coffee className="w-4 h-4 text-amber-300" />
              <span>Explore Active Java Track (44 Topics)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              to="/exercises?lang=java"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 font-semibold text-xs sm:text-sm border border-zinc-200 dark:border-zinc-700 transition-all cursor-pointer"
            >
              <Code2 className="w-4 h-4 text-emerald-500" />
              <span>Practice Java Exercises</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Curriculum Roadmap Preview */}
      <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#12131d] p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            <Sparkles className="w-4 h-4" />
            <span>Planned Curriculum Roadmap</span>
          </div>
          <span className="text-xs font-mono text-zinc-400">PHP 8.2+ Modern Spec</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {upcomingModules.map((mod, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/60 dark:bg-[#0f1017] space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-zinc-900 dark:text-white">
                  {idx + 1}. {mod.title}
                </span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                  {mod.status}
                </span>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                {mod.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
