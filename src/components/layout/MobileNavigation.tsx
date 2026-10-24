import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  X,
  Coffee,
  Server,
  FileCheck2,
  HelpCircle,
  Info,
  Mail,
  Home,
  Search,
  ChevronDown,
  BookOpen,
} from 'lucide-react';
import { SITE_CONFIG } from '../../config/site';
import { LANGUAGES } from '../../data/languages';

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSearch: () => void;
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({
  isOpen,
  onClose,
  onOpenSearch,
}) => {
  const location = useLocation();
  const [expandedSection, setExpandedSection] = useState<'learn' | 'exercises' | 'interview' | null>('learn');

  if (!isOpen) return null;

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const toggleSection = (section: 'learn' | 'exercises' | 'interview') => {
    setExpandedSection((prev) => (prev === section ? null : section));
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

          {/* Nav Links with Dynamic Submenus */}
          <nav className="space-y-1 text-sm font-medium">
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

            {/* 1. Learn Accordion */}
            <div className="space-y-1">
              <button
                type="button"
                onClick={() => toggleSection('learn')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-colors cursor-pointer ${
                  isActive('/learn')
                    ? 'bg-indigo-50/60 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 font-semibold'
                    : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <BookOpen className="w-4 h-4 text-indigo-500" />
                  <span>Learn</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    expandedSection === 'learn' ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {expandedSection === 'learn' && (
                <div className="pl-4 pr-1 py-1 space-y-1">
                  {LANGUAGES.map((lang) => {
                    const isJava = lang.id === 'java';
                    return (
                      <Link
                        key={lang.id}
                        to={`/learn/${lang.id}`}
                        onClick={onClose}
                        className="flex items-center justify-between px-3 py-2 rounded-lg text-xs hover:bg-zinc-100 dark:hover:bg-zinc-800/80 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          {isJava ? (
                            <Coffee className="w-3.5 h-3.5 text-amber-500" />
                          ) : (
                            <Server className="w-3.5 h-3.5 text-indigo-400" />
                          )}
                          <span className="font-medium text-zinc-800 dark:text-zinc-200">{lang.name}</span>
                        </div>
                        <span
                          className={`text-[9px] font-mono px-2 py-0.5 rounded-full ${
                            isJava
                              ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400'
                              : 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300'
                          }`}
                        >
                          {isJava ? `${lang.totalTopics} Lessons` : 'Coming Soon'}
                        </span>
                      </Link>
                    );
                  })}
                  <Link
                    to="/learn"
                    onClick={onClose}
                    className="block px-3 py-1.5 text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    View All Modules →
                  </Link>
                </div>
              )}
            </div>

            {/* 2. Exercises Accordion */}
            <div className="space-y-1">
              <button
                type="button"
                onClick={() => toggleSection('exercises')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-colors cursor-pointer ${
                  isActive('/exercises')
                    ? 'bg-indigo-50/60 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 font-semibold'
                    : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <FileCheck2 className="w-4 h-4 text-emerald-500" />
                  <span>Exercises</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    expandedSection === 'exercises' ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {expandedSection === 'exercises' && (
                <div className="pl-4 pr-1 py-1 space-y-1">
                  {LANGUAGES.map((lang) => {
                    const isJava = lang.id === 'java';
                    return (
                      <Link
                        key={lang.id}
                        to={`/exercises?lang=${lang.id}`}
                        onClick={onClose}
                        className="flex items-center justify-between px-3 py-2 rounded-lg text-xs hover:bg-zinc-100 dark:hover:bg-zinc-800/80 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          {isJava ? (
                            <Coffee className="w-3.5 h-3.5 text-amber-500" />
                          ) : (
                            <Server className="w-3.5 h-3.5 text-indigo-400" />
                          )}
                          <span className="font-medium text-zinc-800 dark:text-zinc-200">{lang.name}</span>
                        </div>
                        <span
                          className={`text-[9px] font-mono px-2 py-0.5 rounded-full ${
                            isJava
                              ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400'
                              : 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300'
                          }`}
                        >
                          {isJava ? `${lang.totalExercises} Tasks` : 'Coming Soon'}
                        </span>
                      </Link>
                    );
                  })}
                  <Link
                    to="/exercises"
                    onClick={onClose}
                    className="block px-3 py-1.5 text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    All Practice Exercises →
                  </Link>
                </div>
              )}
            </div>

            {/* 3. Interview Accordion */}
            <div className="space-y-1">
              <button
                type="button"
                onClick={() => toggleSection('interview')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-colors cursor-pointer ${
                  isActive('/interview')
                    ? 'bg-indigo-50/60 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 font-semibold'
                    : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <HelpCircle className="w-4 h-4 text-purple-500" />
                  <span>Interview Bank</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    expandedSection === 'interview' ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {expandedSection === 'interview' && (
                <div className="pl-4 pr-1 py-1 space-y-1">
                  {LANGUAGES.map((lang) => {
                    const isJava = lang.id === 'java';
                    return (
                      <Link
                        key={lang.id}
                        to={`/interview?lang=${lang.id}`}
                        onClick={onClose}
                        className="flex items-center justify-between px-3 py-2 rounded-lg text-xs hover:bg-zinc-100 dark:hover:bg-zinc-800/80 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          {isJava ? (
                            <Coffee className="w-3.5 h-3.5 text-amber-500" />
                          ) : (
                            <Server className="w-3.5 h-3.5 text-indigo-400" />
                          )}
                          <span className="font-medium text-zinc-800 dark:text-zinc-200">{lang.name}</span>
                        </div>
                        <span
                          className={`text-[9px] font-mono px-2 py-0.5 rounded-full ${
                            isJava
                              ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300'
                              : 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300'
                          }`}
                        >
                          {isJava ? `${lang.totalQuestions} Q&As` : 'Coming Soon'}
                        </span>
                      </Link>
                    );
                  })}
                  <Link
                    to="/interview"
                    onClick={onClose}
                    className="block px-3 py-1.5 text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    All Interview Questions →
                  </Link>
                </div>
              )}
            </div>

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
