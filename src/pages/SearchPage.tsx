import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, ArrowRight } from 'lucide-react';
import { searchAll } from '../data';

export const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const qParam = searchParams.get('q') || '';

  const [query, setQuery] = useState(qParam);
  const [activeFilter, setActiveFilter] = useState<'all' | 'topic' | 'exercise' | 'interview'>('all');

  useEffect(() => {
    setQuery(qParam);
  }, [qParam]);

  const allResults = useMemo(() => {
    if (!query.trim()) return [];
    return searchAll(query.trim());
  }, [query]);

  const filteredResults = useMemo(() => {
    if (activeFilter === 'all') return allResults;
    return allResults.filter((r) => r.type === activeFilter);
  }, [allResults, activeFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setSearchParams({ q: query.trim() });
    } else {
      setSearchParams({});
    }
  };

  const topicCount = allResults.filter((r) => r.type === 'topic').length;
  const exerciseCount = allResults.filter((r) => r.type === 'exercise').length;
  const interviewCount = allResults.filter((r) => r.type === 'interview').length;

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Search Header Form */}
      <div className="space-y-4">
        <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
          Search Curriculum & Bank
        </h1>

        <form onSubmit={handleSearchSubmit} className="relative flex items-center">
          <Search className="w-5 h-5 text-zinc-400 absolute left-4" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search topics, keywords, exercises, interview questions..."
            className="w-full pl-12 pr-28 py-3.5 rounded-2xl bg-white dark:bg-[#12131d] border border-zinc-200 dark:border-zinc-800 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:border-indigo-500 shadow-xs"
          />
          <button
            type="submit"
            className="absolute right-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm transition-all cursor-pointer"
          >
            Search
          </button>
        </form>
      </div>

      {/* Filter Tabs */}
      {query.trim() && (
        <div className="flex flex-wrap items-center gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-3 text-xs">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
              activeFilter === 'all'
                ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900'
                : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
            }`}
          >
            All Results ({allResults.length})
          </button>

          <button
            onClick={() => setActiveFilter('topic')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
              activeFilter === 'topic'
                ? 'bg-indigo-600 text-white'
                : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
            }`}
          >
            Topics ({topicCount})
          </button>

          <button
            onClick={() => setActiveFilter('exercise')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
              activeFilter === 'exercise'
                ? 'bg-emerald-600 text-white'
                : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
            }`}
          >
            Exercises ({exerciseCount})
          </button>

          <button
            onClick={() => setActiveFilter('interview')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
              activeFilter === 'interview'
                ? 'bg-amber-600 text-white'
                : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
            }`}
          >
            Interview Q&A ({interviewCount})
          </button>
        </div>
      )}

      {/* Results List */}
      {!query.trim() ? (
        <div className="py-16 text-center space-y-4">
          <Search className="w-10 h-10 text-zinc-400 mx-auto" />
          <h3 className="text-base font-bold text-zinc-800 dark:text-zinc-200">
            Type a query to search across My Interview Learning (MIL)
          </h3>
          <p className="text-xs text-zinc-500 max-w-sm mx-auto">
            Try searching for &quot;Throwable&quot;, &quot;ArithmeticException&quot;, &quot;synchronized&quot;, &quot;Scanner&quot;, or &quot;Thread.State&quot;.
          </p>
        </div>
      ) : filteredResults.length === 0 ? (
        <div className="py-16 text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mx-auto text-zinc-400">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-zinc-800 dark:text-zinc-200">
            No matches found for &quot;{query}&quot;
          </h3>
          <p className="text-xs text-zinc-500 max-w-sm mx-auto">
            Try searching with broader terms like &quot;primitives&quot;, &quot;static&quot;, &quot;arrays&quot;, or &quot;inheritance&quot;.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-xs text-zinc-500">
            Showing {filteredResults.length} matching items for &quot;{query}&quot;
          </p>

          <div className="space-y-3">
            {filteredResults.map((item) => (
              <Link
                key={`${item.type}-${item.id}`}
                to={item.url}
                className="block p-5 rounded-2xl bg-white dark:bg-[#12131d] border border-zinc-200 dark:border-zinc-800 hover:border-indigo-500/50 hover:shadow-sm transition-all group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-zinc-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {item.title}
                      </span>
                      {item.badge && (
                        <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-mono">
                          {item.badge}
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                      {item.excerpt}
                    </p>

                    <div className="text-[11px] text-zinc-400 dark:text-zinc-500 font-medium">
                      {item.parentCategory} • {item.languageId.toUpperCase()}
                    </div>
                  </div>

                  <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 shrink-0 self-center transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
