import React from 'react';
import { Link } from 'react-router-dom';
import { Code, ArrowUp, Coffee, ShieldCheck } from 'lucide-react';
import { SITE_CONFIG } from '../../config/site';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full border-t border-zinc-200 dark:border-zinc-800/80 bg-zinc-50 dark:bg-[#090a0f] text-zinc-600 dark:text-zinc-400 text-sm transition-colors mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand Column */}
          <div className="md:col-span-1 space-y-3">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 via-rose-500 to-indigo-600 flex items-center justify-center text-white">
                <Code className="w-4 h-4 stroke-[2.5]" />
              </div>
              <span className="font-bold text-base text-zinc-900 dark:text-white tracking-tight">
                {SITE_CONFIG.fullName}
              </span>
            </Link>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              A dedicated Java-only, practical, and interview-oriented learning platform. Master JVM execution, memory layouts, OOP design, exception handling, multithreading, and concurrency.
            </p>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider mb-3">
              Curriculum & Practice
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Home Overview
                </Link>
              </li>
              <li>
                <Link to="/learn" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Java Curriculum Track
                </Link>
              </li>
              <li>
                <Link to="/exercises" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Practice Exercises
                </Link>
              </li>
              <li>
                <Link to="/interview" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Interview Question Bank (60+)
                </Link>
              </li>
            </ul>
          </div>

          {/* Learning Tracks */}
          <div>
            <h4 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider mb-3">
              Core Modules
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  to="/learn/java/java-033-setup-macos"
                  className="flex items-center gap-1.5 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  <Coffee className="w-3.5 h-3.5 text-amber-500" />
                  <span>Setup & Hello World</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/learn/java/java-034-errors-in-java"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Errors & Exception Hierarchy
                </Link>
              </li>
              <li>
                <Link
                  to="/learn/java/java-039-threads-multithreading"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Multithreading & Synchronization
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  About {SITE_CONFIG.acronym}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Feedback & Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform Status & Disclaimer */}
          <div>
            <h4 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider mb-3">
              Standards & Local Progress
            </h4>
            <div className="space-y-2 text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>All code examples verified against standard Java SE. Progress stored locally on your device.</span>
              </div>
              <p className="text-[11px] text-zinc-400 dark:text-zinc-500">
                Created for technical interview preparation, concept revision, and deep JVM understanding.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-zinc-200 dark:border-zinc-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-zinc-500 dark:text-zinc-400">
            © {currentYear} {SITE_CONFIG.fullName}. Built for programmers who want to truly understand how Java runs.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-zinc-500 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400 transition-colors cursor-pointer"
            aria-label="Scroll back to top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
