import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { SITE_CONFIG } from '../config/site';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="space-y-4 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800/60 text-indigo-600 dark:text-indigo-400 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Our Story & Mission</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight leading-tight">
          About {SITE_CONFIG.fullName}
        </h1>

        <p className="text-lg text-zinc-600 dark:text-zinc-300 font-medium">
          {SITE_CONFIG.tagline}
        </p>
      </div>

      {/* Main Philosophy */}
      <section className="p-8 rounded-3xl bg-white dark:bg-[#12131d] border border-zinc-200 dark:border-zinc-800/80 space-y-5 text-sm sm:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed shadow-xs">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
          Why {SITE_CONFIG.fullName} Was Created
        </h2>

        <p>
          {SITE_CONFIG.fullName} began as a focused initiative to solve a persistent frustration in tech education: most online tutorials either stay too shallow (skimming over syntax without explaining what the JVM actually executes) or drown in academic specifications that fail to prepare developers for real technical interview rounds.
        </p>

        <p>
          {SITE_CONFIG.acronym} bridges that gap. It is built from verified production notes and tailored for senior software engineering interviews. Each topic pairs foundational definitions and runtime mechanics with real-world scenarios, pitfalls to avoid, and concise 30-second answers.
        </p>

        <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-[#0c0d12] border border-zinc-200 dark:border-zinc-800 space-y-2">
          <span className="font-bold text-xs uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block">
            Core Learning Principle:
          </span>
          <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 italic">
            &quot;You don&apos;t truly own Java until you can explain where a variable lives in memory, why narrowing casting wraps around at 256, how dynamic dispatch resolves at runtime, and why synchronized locks a specific monitor instead of all methods.&quot;
          </p>
        </div>
      </section>

      {/* The 3 Educational Pillars */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">
          Our Educational Pillars
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-[#12131d] border border-zinc-200 dark:border-zinc-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
              1
            </div>
            <h3 className="font-bold text-base text-zinc-900 dark:text-white">
              Crystal-Clear Mental Models
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              We visualize JVM stacks, Heap allocations, monitor locks, and thread state transitions so you understand runtime mechanics beneath the code.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-[#12131d] border border-zinc-200 dark:border-zinc-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              2
            </div>
            <h3 className="font-bold text-base text-zinc-900 dark:text-white">
              Compilable Code, Zero Stubs
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Every code sample includes exact compile and run instructions, filenames, and deterministic expected outputs verified against standard Java SE.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-[#12131d] border border-zinc-200 dark:border-zinc-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
              3
            </div>
            <h3 className="font-bold text-base text-zinc-900 dark:text-white">
              30-Second Interview Recall
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              We structure key definitions into high-impact bullet answers you can deliver comfortably in technical phone screens and on-site loops.
            </p>
          </div>
        </div>
      </section>

      {/* Platform Status & Roadmap */}
      <section className="p-8 rounded-3xl bg-zinc-50 dark:bg-[#0f1017] border border-zinc-200 dark:border-zinc-800 space-y-5">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
          <ShieldCheck className="w-4 h-4" />
          <span>Platform Integrity & Privacy</span>
        </div>

        <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
          A Pure, Dedicated Learning Environment
        </h2>

        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
          {SITE_CONFIG.fullName} is an independent, static web application designed for focused study. We don&apos;t require accounts, display ads, or track telemetry. All lesson completion markers and exercise submissions are persisted directly in your browser&apos;s localStorage.
        </p>

        <div className="pt-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-3">
            Core Curriculum Coverage:
          </h4>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-600 dark:text-zinc-400 font-medium">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>macOS JDK Installation & Toolchain Verification</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>Java Execution, Stack vs Heap & Memory Layouts</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>OOP Architecture, Access Matrix & Polymorphism</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>Throwable Hierarchy, Checked vs Unchecked & Custom Exceptions</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>Multithreading, Official Thread States & Lifecycle</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>Race Conditions, Synchronized Monitors & Volatile</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>Modern Java: var (Java 10), Records (Java 16) & Sealed Classes (Java 17)</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>Build Automation: Apache Maven & Gradle Groovy DSL with Wrapper Workflows</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>Spring Boot 3: Starters, Auto-Configuration & 13-Step Request Lifecycle</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>Unit Testing: JUnit 5 (Jupiter), AAA Pattern & Complete Annotations Matrix</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>Data Structures & Algorithms: Big-O, Arrays, Searching, Sorting, Stacks, Queues, Trees & Graphs</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Action Footer */}
      <div className="text-center pt-4">
        <Link
          to="/learn/java"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
        >
          <span>Explore Java Curriculum</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
