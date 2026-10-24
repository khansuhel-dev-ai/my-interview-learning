import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, Coffee, FileCheck2, HelpCircle, Info, Mail, Home, Search } from 'lucide-react';
import { SITE_CONFIG } from '../../config/site';
import { LANGUAGES } from '../../data/languages';

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSearch: () => void;
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({ isOpen, onClose, onOpenSearch }) => {
  const location = useLocation();
  const javaLang = LANGUAGES.find((l) => l.id === 'java');

  if (!isOpen) return null;

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="fixed inset-0 z-50 md:hidden bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-white dark:bg-[#12131a] shadow-2xl p-6 flex flex-col justify-between overflow-y-auto border-l border-zinc-200 dark:border-zinc-800">
        <div>
          {/* Top Bar with Close button */}
          <div className="flex items-center justify-between pb-4 border-b border-zinc-200 dark:border-zinc-800 mb-4">
            <span className="font-bold text-base text-zinc-900 dark:text-white">Navigation</span>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Search Button in Drawer */}
          <button
            onClick={() => {
              onClose();
              onOpenSearch();
            }}
            className="w-full mb-4 flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 text-zinc-500 dark:text-zinc-400 text-xs font-medium hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
          >
            <Search className="w-4 h-4 text-zinc-400" />
            <span>Search topics, keywords, exercises...</span>
          </button>

          {/* Clean Java-Only Links List */}
          <nav className="space-y-1.5 text-sm font-medium">
            <Link
              to="/"
              onClick={onClose}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-colors ${
                isActive('/') && location.pathname === '/'
                  ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-semibold'
                  : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/60'
              }`}
            >
              <Home className="w-4 h-4 text-zinc-400" />
              <span>Home</span>
            </Link>

            <Link
              to="/learn/java"
              onClick={onClose}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-colors ${
                isActive('/learn')
                  ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-semibold'
                  : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <Coffee className="w-4 h-4 text-amber-500" />
                <span>Learn Java Curriculum</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/60">
                {javaLang?.totalTopics || 48} Lessons
              </span>
            </Link>

            <Link
              to="/exercises?lang=java"
              onClick={onClose}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-colors ${
                isActive('/exercises')
                  ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-semibold'
                  : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <FileCheck2 className="w-4 h-4 text-emerald-500" />
                <span>Practice Exercises</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60">
                {javaLang?.totalExercises || 46} Tasks
              </span>
            </Link>

            <Link
              to="/interview?lang=java"
              onClick={onClose}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-colors ${
                isActive('/interview')
                  ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-semibold'
                  : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <HelpCircle className="w-4 h-4 text-purple-500" />
                <span>Interview Bank</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60">
                {javaLang?.totalQuestions || 117} Q&As
              </span>
            </Link>

            <Link
              to="/about"
              onClick={onClose}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                isActive('/about')
                  ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-semibold'
                  : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/60'
              }`}
            >
              <Info className="w-4 h-4 text-zinc-400" />
              <span>About {SITE_CONFIG.acronym}</span>
            </Link>

            <Link
              to="/contact"
              onClick={onClose}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                isActive('/contact')
                  ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-semibold'
                  : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/60'
              }`}
            >
              <Mail className="w-4 h-4 text-zinc-400" />
              <span>Contact & Feedback</span>
            </Link>
          </nav>
        </div>

        {/* Footer info in drawer */}
        <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800 text-xs text-zinc-500">
          <p className="font-semibold text-zinc-800 dark:text-zinc-200">{SITE_CONFIG.fullName}</p>
          <p className="text-[11px] text-zinc-400 mt-0.5">{SITE_CONFIG.tagline}</p>
        </div>
      </div>
    </div>
  );
};
