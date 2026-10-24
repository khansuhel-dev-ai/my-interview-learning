import React from 'react';
import { Link } from 'react-router-dom';
import { Coffee, ArrowRight, CheckCircle2, Circle, Clock, Sparkles } from 'lucide-react';
import { getGroupedTopics, getTopicsByLanguage } from '../data';
import { useProgress } from '../hooks/useProgress';

export const LearnPage: React.FC = () => {
  const { getLanguageStats, isTopicCompleted } = useProgress();
  const { total, completedCount, percentage } = getLanguageStats('java');
  const groups = getGroupedTopics('java');
  const allTopics = getTopicsByLanguage('java');
  const firstTopic = allTopics[0];

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Page Title & Track Overview */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800/60 text-amber-600 dark:text-amber-400 text-xs font-semibold">
            <Coffee className="w-3.5 h-3.5" />
            <span>Core Java & Interview Track</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            Java Curriculum & Study Notes
          </h1>

          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
            From macOS setup and JVM memory models to multithreading synchronization and technical interview questions. Structured progressively from first principles to senior engineering topics.
          </p>
        </div>

        {/* Action Button */}
        {firstTopic && (
          <div className="shrink-0">
            <Link
              to={`/learn/java/${firstTopic.id}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
            >
              <span>{completedCount > 0 ? 'Continue Curriculum' : 'Start Curriculum (JAVA-033)'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>

      {/* Track Progress Card */}
      <div className="p-6 rounded-3xl bg-zinc-50 dark:bg-[#11121a] border border-zinc-200 dark:border-zinc-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            <Sparkles className="w-4 h-4" />
            <span>Track Progress</span>
          </div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
            {completedCount} of {total} lessons completed
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Progress is tracked automatically and saved locally on your machine.
          </p>
        </div>

        <div className="w-full md:w-80 space-y-2">
          <div className="flex justify-between text-xs font-bold font-mono">
            <span className="text-zinc-500">Mastery</span>
            <span className="text-indigo-600 dark:text-indigo-400">{percentage}%</span>
          </div>
          <div className="w-full bg-zinc-200 dark:bg-zinc-800 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-indigo-500 to-emerald-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Curriculum Module Groups in Learning Order */}
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white tracking-tight">
            Curriculum Modules ({groups.length} Structured Phases)
          </h2>
          <span className="text-xs text-zinc-500 font-mono">Recommended Order</span>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {groups.map((group, groupIdx) => {
            const completedInGroup = group.topics.filter((t) => isTopicCompleted(t.id)).length;
            const isGroupDone = completedInGroup === group.topics.length && group.topics.length > 0;

            return (
              <div
                key={group.id}
                className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#12131d] overflow-hidden shadow-xs"
              >
                {/* Group Header */}
                <div className="p-5 sm:p-6 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-[#0f1017] flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-mono font-bold text-xs flex items-center justify-center border border-indigo-200 dark:border-indigo-800/60">
                      0{groupIdx + 1}
                    </span>
                    <div>
                      <h3 className="font-bold text-base sm:text-lg text-zinc-900 dark:text-white">
                        {group.title}
                      </h3>
                      <span className="text-xs text-zinc-500 dark:text-zinc-400">
                        {group.topics.length} Lessons • {completedInGroup} of {group.topics.length} completed
                      </span>
                    </div>
                  </div>

                  {isGroupDone && (
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Module Complete</span>
                    </span>
                  )}
                </div>

                {/* Topics in this group */}
                <div className="divide-y divide-zinc-100 dark:divide-zinc-800/60">
                  {group.topics.map((topic) => {
                    const done = isTopicCompleted(topic.id);

                    return (
                      <Link
                        key={topic.id}
                        to={`/learn/java/${topic.id}`}
                        className="p-4 sm:p-5 flex items-start sm:items-center justify-between gap-4 hover:bg-zinc-50/80 dark:hover:bg-zinc-800/30 transition-colors group"
                      >
                        <div className="flex items-start sm:items-center gap-3.5 min-w-0">
                          <div className="mt-0.5 sm:mt-0 shrink-0">
                            {done ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                            ) : (
                              <Circle className="w-4 h-4 text-zinc-300 dark:text-zinc-600 group-hover:text-zinc-400" />
                            )}
                          </div>

                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">
                                {topic.codeNumber}
                              </span>
                              <span className="font-bold text-sm sm:text-base text-zinc-900 dark:text-zinc-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                {topic.title}
                              </span>
                            </div>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-1 mt-0.5">
                              {topic.summary}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 shrink-0 self-center">
                          <span className="hidden sm:flex items-center gap-1 text-xs text-zinc-400">
                            <Clock className="w-3 h-3" />
                            <span>{topic.estimatedMinutes}m</span>
                          </span>
                          <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-transform group-hover:translate-x-1" />
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
