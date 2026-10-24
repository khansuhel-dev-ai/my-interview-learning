import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  Circle,
  Search,
  Coffee,
  Layers,
} from 'lucide-react';
import { LanguageId, TopicGroup } from '../../types';
import { useProgress } from '../../hooks/useProgress';

interface TopicSidebarProps {
  languageId: LanguageId;
  groups: TopicGroup[];
  currentTopicId?: string;
  onSelectTopic?: () => void;
}

export const TopicSidebar: React.FC<TopicSidebarProps> = ({
  languageId,
  groups,
  currentTopicId,
  onSelectTopic,
}) => {
  const { isTopicCompleted, getLanguageStats } = useProgress();
  const [filterText, setFilterText] = useState('');

  // Track expanded category groups; by default keep all open or current category open
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    for (const group of groups) {
      initial[group.id] = true;
    }
    return initial;
  });

  const toggleGroup = (groupId: string) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [groupId]: !prev[groupId],
    }));
  };

  const { total, completedCount, percentage } = getLanguageStats(languageId);

  // Filter topics by quick-search
  const filteredGroups = useMemo(() => {
    if (!filterText.trim()) return groups;
    const q = filterText.toLowerCase();

    return groups
      .map((group) => {
        const matchingTopics = group.topics.filter(
          (t) =>
            t.title.toLowerCase().includes(q) ||
            t.codeNumber.toLowerCase().includes(q) ||
            t.summary.toLowerCase().includes(q)
        );
        return {
          ...group,
          topics: matchingTopics,
        };
      })
      .filter((group) => group.topics.length > 0);
  }, [groups, filterText]);

  return (
    <aside className="w-full h-full flex flex-col bg-white dark:bg-[#0e0f15] border-r border-zinc-200 dark:border-zinc-800/80 select-none">
      {/* Top Header / Progress Bar */}
      <div className="p-4 border-b border-zinc-200 dark:border-zinc-800/80">
        <div className="flex items-center justify-between mb-2">
            <Coffee className="w-4 h-4 text-amber-500" />
            <span className="font-bold text-sm text-zinc-900 dark:text-white">
              Java Curriculum
            </span>

          <span className="text-xs font-mono font-semibold text-indigo-600 dark:text-indigo-400">
            {percentage}% Done
          </span>
        </div>

        {/* Progress meter */}
        <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-2 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-indigo-500 to-emerald-500 h-full transition-all duration-500 rounded-full"
            style={{ width: `${percentage}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-[11px] text-zinc-400 mt-1.5 font-medium">
          <span>{completedCount} of {total} topics completed</span>
        </div>

        {/* Quick Filter */}
        <div className="relative mt-3">
          <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            placeholder="Filter topics..."
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-zinc-50 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-800 dark:text-zinc-200 placeholder:text-zinc-400 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Topics Hierarchy Navigation */}
      <div className="flex-1 overflow-y-auto p-3 space-y-4 scrollbar-thin">
        {filteredGroups.map((group) => {
          const isExpanded = expandedGroups[group.id] !== false;

          return (
            <div key={group.id} className="space-y-1">
              {/* Group Accordion Header */}
              <button
                onClick={() => toggleGroup(group.id)}
                className="w-full flex items-center justify-between px-2 py-1.5 rounded-lg text-xs font-semibold text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition-colors uppercase tracking-wider"
              >
                <div className="flex items-center gap-1.5 truncate">
                  <Layers className="w-3.5 h-3.5 shrink-0 text-indigo-500" />
                  <span className="truncate">{group.title}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-mono font-normal text-zinc-400">
                    {group.topics.length}
                  </span>
                  {isExpanded ? (
                    <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
                  )}
                </div>
              </button>

              {/* Nested Topics List */}
              {isExpanded && (
                <div className="space-y-0.5 ml-2 pl-2 border-l border-zinc-200 dark:border-zinc-800">
                  {group.topics.map((topic) => {
                    const isActive = currentTopicId === topic.id;
                    const isDone = isTopicCompleted(topic.id);

                    return (
                      <Link
                        key={topic.id}
                        to={`/learn/${languageId}/${topic.id}`}
                        onClick={onSelectTopic}
                        className={`group flex items-start gap-2 px-2.5 py-2 rounded-lg text-xs font-medium transition-all ${
                          isActive
                            ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 font-semibold shadow-xs'
                            : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100/70 dark:hover:bg-zinc-800/40'
                        }`}
                      >
                        {/* Status Checkmark / Circle */}
                        <div className="mt-0.5 shrink-0">
                          {isDone ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                          ) : (
                            <Circle className="w-3.5 h-3.5 text-zinc-300 dark:text-zinc-600 group-hover:text-zinc-400" />
                          )}
                        </div>

                        {/* Title and Code */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500">
                              {topic.codeNumber}
                            </span>
                          </div>
                          <p className="truncate leading-tight mt-0.5">{topic.title}</p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
};
