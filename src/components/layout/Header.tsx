import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Code,
  Search,
  Sun,
  Moon,
  Menu,
  X,
  ChevronDown,
  Coffee,
  Server,
  ArrowRight,
} from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { GlobalSearchModal } from '../search/GlobalSearchModal';
import { SITE_CONFIG } from '../../config/site';
import { LANGUAGES } from '../../data/languages';

interface HeaderProps {
  onMobileMenuToggle?: () => void;
  isMobileMenuOpen?: boolean;
}

type DropdownMenu = 'learn' | 'exercises' | 'interview' | null;

export const Header: React.FC<HeaderProps> = ({ onMobileMenuToggle, isMobileMenuOpen }) => {
  const { theme, toggleTheme } = useTheme();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<DropdownMenu>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const location = useLocation();

  const handleMouseEnter = (menu: DropdownMenu) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(menu);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 180);
  };

  const toggleDropdown = (menu: DropdownMenu) => {
    setActiveDropdown((prev) => (prev === menu ? null : menu));
  };

  useEffect(() => {
    setActiveDropdown(null);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setActiveDropdown(null);
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      } else if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-zinc-200/80 dark:border-zinc-800/80 bg-white/80 dark:bg-[#0c0d12]/80 backdrop-blur-md transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Left: Brand Identity */}
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/10 group-hover:scale-105 transition-transform">
                <Code className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-base sm:text-lg tracking-tight text-zinc-900 dark:text-white font-sans">
                    {SITE_CONFIG.name}
                  </span>
                  <span className="text-[10px] uppercase font-mono font-bold tracking-wider px-1.5 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/60">
                    {SITE_CONFIG.acronym}
                  </span>
                </div>
                <span className="text-[10px] text-zinc-500 dark:text-zinc-400 tracking-tight hidden sm:inline">
                  Learn · Practice · Grow
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links with Dynamic Sub-Menus */}
            <nav ref={navRef} className="hidden md:flex items-center gap-1 text-sm font-medium">
              <Link
                to="/"
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  isActive('/') && location.pathname === '/'
                    ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/60 dark:bg-indigo-950/40 font-semibold'
                    : 'text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/60'
                }`}
              >
                Home
              </Link>

              {/* 1. Learn Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter('learn')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  type="button"
                  onClick={() => toggleDropdown('learn')}
                  className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
                    isActive('/learn')
                      ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/60 dark:bg-indigo-950/40 font-semibold'
                      : 'text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/60'
                  }`}
                  aria-expanded={activeDropdown === 'learn'}
                >
                  <span>Learn</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      activeDropdown === 'learn' ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {activeDropdown === 'learn' && (
                  <div className="absolute top-full left-0 mt-1.5 w-76 p-2 rounded-2xl bg-white dark:bg-[#12131d] border border-zinc-200 dark:border-zinc-800 shadow-xl shadow-black/10 dark:shadow-black/40 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                    <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                      Curriculum Tracks
                    </div>
                    <div className="space-y-1">
                      {LANGUAGES.map((lang) => {
                        const isJava = lang.id === 'java';
                        const url = `/learn/${lang.id}`;
                        return (
                          <Link
                            key={lang.id}
                            to={url}
                            onClick={() => setActiveDropdown(null)}
                            className="flex items-center justify-between p-2.5 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800/80 transition-colors group"
                          >
                            <div className="flex items-center gap-2.5">
                              <div
                                className="w-8 h-8 rounded-lg flex items-center justify-center text-white"
                                style={{ backgroundColor: lang.color }}
                              >
                                {isJava ? <Coffee className="w-4 h-4" /> : <Server className="w-4 h-4" />}
                              </div>
                              <div>
                                <div className="text-sm font-semibold text-zinc-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                                  {lang.name}
                                </div>
                                <div className="text-[11px] text-zinc-500 dark:text-zinc-400 line-clamp-1">
                                  {isJava ? `${lang.totalTopics} Lessons · Core Track` : 'Content to be added'}
                                </div>
                              </div>
                            </div>
                            <span
                              className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full shrink-0 ${
                                isJava
                                  ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60'
                                  : 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60'
                              }`}
                            >
                              {isJava ? `${lang.totalTopics}` : 'Coming Soon'}
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                    <div className="mt-2 pt-2 border-t border-zinc-100 dark:border-zinc-800/80">
                      <Link
                        to="/learn"
                        onClick={() => setActiveDropdown(null)}
                        className="flex items-center justify-between px-3 py-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                      >
                        <span>View All Curriculum Modules</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* 2. Exercises Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter('exercises')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  type="button"
                  onClick={() => toggleDropdown('exercises')}
                  className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
                    isActive('/exercises')
                      ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/60 dark:bg-indigo-950/40 font-semibold'
                      : 'text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/60'
                  }`}
                  aria-expanded={activeDropdown === 'exercises'}
                >
                  <span>Exercises</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      activeDropdown === 'exercises' ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {activeDropdown === 'exercises' && (
                  <div className="absolute top-full left-0 mt-1.5 w-76 p-2 rounded-2xl bg-white dark:bg-[#12131d] border border-zinc-200 dark:border-zinc-800 shadow-xl shadow-black/10 dark:shadow-black/40 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                    <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                      Practice by Language
                    </div>
                    <div className="space-y-1">
                      {LANGUAGES.map((lang) => {
                        const isJava = lang.id === 'java';
                        const url = `/exercises?lang=${lang.id}`;
                        return (
                          <Link
                            key={lang.id}
                            to={url}
                            onClick={() => setActiveDropdown(null)}
                            className="flex items-center justify-between p-2.5 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800/80 transition-colors group"
                          >
                            <div className="flex items-center gap-2.5">
                              <div
                                className="w-8 h-8 rounded-lg flex items-center justify-center text-white"
                                style={{ backgroundColor: lang.color }}
                              >
                                {isJava ? <Coffee className="w-4 h-4" /> : <Server className="w-4 h-4" />}
                              </div>
                              <div>
                                <div className="text-sm font-semibold text-zinc-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                                  {lang.name} Exercises
                                </div>
                                <div className="text-[11px] text-zinc-500 dark:text-zinc-400 line-clamp-1">
                                  {isJava ? `${lang.totalExercises} In-browser Labs` : 'Content to be added'}
                                </div>
                              </div>
                            </div>
                            <span
                              className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full shrink-0 ${
                                isJava
                                  ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60'
                                  : 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60'
                              }`}
                            >
                              {isJava ? `${lang.totalExercises}` : 'Coming Soon'}
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                    <div className="mt-2 pt-2 border-t border-zinc-100 dark:border-zinc-800/80">
                      <Link
                        to="/exercises"
                        onClick={() => setActiveDropdown(null)}
                        className="flex items-center justify-between px-3 py-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                      >
                        <span>All Practice Exercises</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* 3. Interview Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter('interview')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  type="button"
                  onClick={() => toggleDropdown('interview')}
                  className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
                    isActive('/interview')
                      ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/60 dark:bg-indigo-950/40 font-semibold'
                      : 'text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/60'
                  }`}
                  aria-expanded={activeDropdown === 'interview'}
                >
                  <span>Interview</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      activeDropdown === 'interview' ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {activeDropdown === 'interview' && (
                  <div className="absolute top-full left-0 mt-1.5 w-76 p-2 rounded-2xl bg-white dark:bg-[#12131d] border border-zinc-200 dark:border-zinc-800 shadow-xl shadow-black/10 dark:shadow-black/40 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                    <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                      Technical Question Bank
                    </div>
                    <div className="space-y-1">
                      {LANGUAGES.map((lang) => {
                        const isJava = lang.id === 'java';
                        const url = `/interview?lang=${lang.id}`;
                        return (
                          <Link
                            key={lang.id}
                            to={url}
                            onClick={() => setActiveDropdown(null)}
                            className="flex items-center justify-between p-2.5 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800/80 transition-colors group"
                          >
                            <div className="flex items-center gap-2.5">
                              <div
                                className="w-8 h-8 rounded-lg flex items-center justify-center text-white"
                                style={{ backgroundColor: lang.color }}
                              >
                                {isJava ? <Coffee className="w-4 h-4" /> : <Server className="w-4 h-4" />}
                              </div>
                              <div>
                                <div className="text-sm font-semibold text-zinc-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                                  {lang.name} Questions
                                </div>
                                <div className="text-[11px] text-zinc-500 dark:text-zinc-400 line-clamp-1">
                                  {isJava ? `${lang.totalQuestions} Curated Q&As` : 'Content to be added'}
                                </div>
                              </div>
                            </div>
                            <span
                              className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full shrink-0 ${
                                isJava
                                  ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60'
                                  : 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60'
                              }`}
                            >
                              {isJava ? `${lang.totalQuestions}` : 'Coming Soon'}
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                    <div className="mt-2 pt-2 border-t border-zinc-100 dark:border-zinc-800/80">
                      <Link
                        to="/interview"
                        onClick={() => setActiveDropdown(null)}
                        className="flex items-center justify-between px-3 py-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                      >
                        <span>Explore Full Question Bank</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <Link
                to="/about"
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  isActive('/about')
                    ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/60 dark:bg-indigo-950/40 font-semibold'
                    : 'text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/60'
                }`}
              >
                About Us
              </Link>

              <Link
                to="/contact"
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  isActive('/contact')
                    ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/60 dark:bg-indigo-950/40 font-semibold'
                    : 'text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/60'
                }`}
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Right Controls: Search button, Theme toggle, Mobile hamburger */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Global Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800/70 hover:bg-zinc-200/70 dark:hover:bg-zinc-700/60 text-zinc-500 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700/60 transition-all text-xs cursor-pointer group"
              aria-label="Search learning topics"
            >
              <Search className="w-3.5 h-3.5 text-zinc-400 group-hover:text-indigo-500 transition-colors" />
              <span className="hidden sm:inline">Search docs...</span>
              <kbd className="hidden lg:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono bg-white dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 rounded border border-zinc-200 dark:border-zinc-700">
                ⌘K
              </kbd>
            </button>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors border border-zinc-200 dark:border-zinc-800 cursor-pointer"
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400 rotate-0 transition-transform hover:rotate-45" />
              ) : (
                <Moon className="w-4 h-4 text-indigo-600 rotate-0 transition-transform hover:-rotate-12" />
              )}
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={onMobileMenuToggle}
              className="p-2 md:hidden rounded-xl text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 cursor-pointer"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Global Search Modal */}
      <GlobalSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};
