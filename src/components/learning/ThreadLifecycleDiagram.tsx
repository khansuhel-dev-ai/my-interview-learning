import React, { useState } from 'react';
import { Play, Clock, Lock, CheckCircle2, Image as ImageIcon, Sparkles } from 'lucide-react';

interface StateInfo {
  name: string;
  official: boolean;
  tagline: string;
  triggerIn: string;
  triggerOut: string;
  description: string;
  interviewNote: string;
}

const THREAD_STATES: Record<string, StateInfo> = {
  NEW: {
    name: 'NEW',
    official: true,
    tagline: 'Thread instance created, not yet started',
    triggerIn: 'new Thread() instantiated',
    triggerOut: 'thread.start() is invoked',
    description: 'The Thread object exists on the JVM heap, but no OS thread has been allocated and the execution stack has not been initialized.',
    interviewNote: 'Calling run() directly while in NEW runs run() synchronously on the caller thread without entering RUNNABLE or creating an OS thread.',
  },
  RUNNABLE: {
    name: 'RUNNABLE',
    official: true,
    tagline: 'Executing in the JVM or ready in OS thread scheduler queue',
    triggerIn: 'start(), lock acquired, notification received, sleep/timeout elapsed',
    triggerOut: 'Waiting for monitor lock, calling wait/join/sleep, or run() completing',
    description: 'The thread is either executing instructions on a CPU core or ready in the operating system ready queue waiting for its CPU time slice.',
    interviewNote: "CRITICAL: 'RUNNING' is often used informally by engineers, but Java's official Thread.State enum has NO 'RUNNING' constant. Both ready and actively running threads report Thread.State.RUNNABLE.",
  },
  BLOCKED: {
    name: 'BLOCKED',
    official: true,
    tagline: 'Waiting to acquire an intrinsic monitor lock',
    triggerIn: 'Attempting to enter a synchronized block or synchronized method locked by another thread',
    triggerOut: 'The monitor lock is released and acquired by this thread',
    description: 'The thread is suspended specifically waiting to enter a synchronized block or reenter a synchronized method after wait().',
    interviewNote: 'BLOCKED is strictly for monitor locks (synchronized). Waiting for java.util.concurrent.locks.Lock (ReentrantLock) typically reports WAITING or TIMED_WAITING, not BLOCKED.',
  },
  WAITING: {
    name: 'WAITING',
    official: true,
    tagline: 'Waiting indefinitely for another thread to take action',
    triggerIn: 'Object.wait() (no timeout), Thread.join() (no timeout), LockSupport.park()',
    triggerOut: 'Object.notify(), Object.notifyAll(), joined thread terminates',
    description: 'The thread releases any lock it holds with wait() and sleeps indefinitely until another thread signals or completes.',
    interviewNote: 'Difference from BLOCKED: A WAITING thread is explicitly suspended waiting for a signal or completion; a BLOCKED thread is competing to enter a synchronized monitor.',
  },
  TIMED_WAITING: {
    name: 'TIMED_WAITING',
    official: true,
    tagline: 'Waiting for a specified duration or until signaled',
    triggerIn: 'Thread.sleep(millis), Object.wait(timeout), Thread.join(millis), LockSupport.parkNanos()',
    triggerOut: 'Specified time expires, notification received, or thread interrupted',
    description: 'The thread is paused for at most the specified time duration.',
    interviewNote: 'Thread.sleep() holds all locks it acquired while sleeping; Object.wait(ms) releases the monitor lock while waiting.',
  },
  TERMINATED: {
    name: 'TERMINATED',
    official: true,
    tagline: 'Execution completed or ended abnormally',
    triggerIn: 'run() method completes normally or terminates due to an uncaught exception',
    triggerOut: 'Terminal state; cannot transition to any other state',
    description: 'The thread has finished its lifecycle. Its stack memory is deallocated and it cannot be restarted.',
    interviewNote: "Calling start() on a TERMINATED (or already started) thread throws IllegalThreadStateException. Java's enum uses TERMINATED, never 'DEAD'. Also, Thread.stop() is deprecated and unsafe.",
  },
};

export const ThreadLifecycleDiagram: React.FC = () => {
  const [activeState, setActiveState] = useState<string>('RUNNABLE');
  const [showImageModal, setShowImageModal] = useState(false);

  const currentInfo = THREAD_STATES[activeState] || THREAD_STATES.RUNNABLE;

  return (
    <div className="my-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0f1017] overflow-hidden shadow-xs">
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-zinc-200 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-3 bg-zinc-50/70 dark:bg-[#12131d]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800/60">
              OFFICIAL JAVA Thread.State
            </span>
            <span className="text-xs text-zinc-400">•</span>
            <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
              Interactive State Machine
            </span>
          </div>
          <h3 className="text-lg font-bold text-zinc-900 dark:text-white mt-1">
            Java Thread Lifecycle & State Transitions
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
            Click any official thread state box below to inspect its trigger conditions and interview traps.
          </p>
        </div>

        <button
          onClick={() => setShowImageModal(true)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 transition-colors cursor-pointer"
          title="View rendered infographic asset"
          aria-label="View infographic asset"
        >
          <ImageIcon className="w-3.5 h-3.5 text-amber-500" />
          <span>View Infographic Asset</span>
        </button>
      </div>

      {/* Responsive Visual Diagram Canvas */}
      <div className="p-4 sm:p-6 overflow-x-auto">
        <div className="min-w-[680px] max-w-4xl mx-auto space-y-6">
          {/* Main Execution Line: NEW -> RUNNABLE -> TERMINATED */}
          <div className="flex items-center justify-between gap-3">
            {/* NEW */}
            <div className="flex-1 max-w-[200px]">
              <button
                onClick={() => setActiveState('NEW')}
                className={`w-full p-3.5 rounded-2xl border text-center transition-all cursor-pointer ${
                  activeState === 'NEW'
                    ? 'bg-amber-500 text-white dark:bg-amber-400 dark:text-zinc-950 ring-2 ring-amber-400 shadow-lg scale-102'
                    : 'bg-zinc-100 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 hover:border-amber-400'
                }`}
              >
                <span className="font-mono font-bold text-sm block">NEW</span>
                <span className="text-[11px] opacity-80 block mt-0.5">Thread object created</span>
              </button>
            </div>

            {/* Transition: start() */}
            <div className="flex-1 flex flex-col items-center px-1 text-center">
              <span className="text-[11px] font-mono font-bold text-amber-600 dark:text-amber-400 mb-0.5">
                start()
              </span>
              <div className="w-full flex items-center">
                <div className="flex-1 h-0.5 bg-amber-400 dark:bg-amber-500" />
                <span className="text-amber-500 font-bold ml-[-2px]">▶</span>
              </div>
            </div>

            {/* RUNNABLE */}
            <div className="flex-[1.4] max-w-[260px]">
              <button
                onClick={() => setActiveState('RUNNABLE')}
                className={`w-full p-4 rounded-2xl border text-center transition-all cursor-pointer ${
                  activeState === 'RUNNABLE'
                    ? 'bg-indigo-600 text-white ring-2 ring-indigo-400 shadow-lg scale-102'
                    : 'bg-zinc-100 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 hover:border-indigo-400'
                }`}
              >
                <div className="flex items-center justify-center gap-1.5">
                  <Play className="w-4 h-4 fill-current" />
                  <span className="font-mono font-bold text-base">RUNNABLE</span>
                </div>
                <span className="text-[11px] opacity-85 block mt-0.5">
                  Ready to run / Executing in JVM
                </span>
              </button>
            </div>

            {/* Transition: run() completes */}
            <div className="flex-1 flex flex-col items-center px-1 text-center">
              <span className="text-[11px] font-mono font-bold text-zinc-500 dark:text-zinc-400 mb-0.5">
                run() completes
              </span>
              <div className="w-full flex items-center">
                <div className="flex-1 h-0.5 bg-zinc-400 dark:bg-zinc-600" />
                <span className="text-zinc-400 dark:text-zinc-500 font-bold ml-[-2px]">▶</span>
              </div>
            </div>

            {/* TERMINATED */}
            <div className="flex-1 max-w-[200px]">
              <button
                onClick={() => setActiveState('TERMINATED')}
                className={`w-full p-3.5 rounded-2xl border text-center transition-all cursor-pointer ${
                  activeState === 'TERMINATED'
                    ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 ring-2 ring-zinc-400 shadow-lg scale-102'
                    : 'bg-zinc-100 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 hover:border-zinc-400'
                }`}
              >
                <div className="flex items-center justify-center gap-1 font-mono font-bold text-sm">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>TERMINATED</span>
                </div>
                <span className="text-[11px] opacity-80 block mt-0.5">Thread finished / dead</span>
              </button>
            </div>
          </div>

          {/* Connectors Down to Waiting States */}
          <div className="grid grid-cols-3 gap-4 pt-2">
            {/* BLOCKED State Card */}
            <div className="flex flex-col items-center space-y-2">
              <div className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400 text-center">
                ↕ Waiting for monitor lock / Lock acquired
              </div>
              <button
                onClick={() => setActiveState('BLOCKED')}
                className={`w-full p-3.5 rounded-2xl border text-center transition-all cursor-pointer ${
                  activeState === 'BLOCKED'
                    ? 'bg-rose-600 text-white ring-2 ring-rose-400 shadow-lg scale-102'
                    : 'bg-rose-50/70 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/50 text-rose-800 dark:text-rose-200 hover:border-rose-400'
                }`}
              >
                <div className="flex items-center justify-center gap-1.5 font-mono font-bold text-sm">
                  <Lock className="w-3.5 h-3.5" />
                  <span>BLOCKED</span>
                </div>
                <span className="text-[11px] opacity-80 block mt-0.5">
                  Waiting to acquire monitor lock
                </span>
              </button>
            </div>

            {/* WAITING State Card */}
            <div className="flex flex-col items-center space-y-2">
              <div className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400 text-center">
                ↕ wait() / join() ↔ notify() / completes
              </div>
              <button
                onClick={() => setActiveState('WAITING')}
                className={`w-full p-3.5 rounded-2xl border text-center transition-all cursor-pointer ${
                  activeState === 'WAITING'
                    ? 'bg-amber-600 text-white ring-2 ring-amber-400 shadow-lg scale-102'
                    : 'bg-amber-50/70 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/50 text-amber-800 dark:text-amber-200 hover:border-amber-400'
                }`}
              >
                <div className="flex items-center justify-center gap-1.5 font-mono font-bold text-sm">
                  <Clock className="w-3.5 h-3.5" />
                  <span>WAITING</span>
                </div>
                <span className="text-[11px] opacity-80 block mt-0.5">
                  Waiting indefinitely
                </span>
              </button>
            </div>

            {/* TIMED_WAITING State Card */}
            <div className="flex flex-col items-center space-y-2">
              <div className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400 text-center">
                ↕ sleep(time) / wait(time) ↔ Timeout
              </div>
              <button
                onClick={() => setActiveState('TIMED_WAITING')}
                className={`w-full p-3.5 rounded-2xl border text-center transition-all cursor-pointer ${
                  activeState === 'TIMED_WAITING'
                    ? 'bg-emerald-600 text-white ring-2 ring-emerald-400 shadow-lg scale-102'
                    : 'bg-emerald-50/70 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/50 text-emerald-800 dark:text-emerald-200 hover:border-emerald-400'
                }`}
              >
                <div className="flex items-center justify-center gap-1.5 font-mono font-bold text-sm">
                  <Clock className="w-3.5 h-3.5" />
                  <span>TIMED_WAITING</span>
                </div>
                <span className="text-[11px] opacity-80 block mt-0.5">
                  Waiting for a specified time
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Selected State Detailed Breakdown */}
      <div className="p-4 sm:p-5 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-[#0c0d13]">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-mono font-extrabold text-sm sm:text-base text-zinc-900 dark:text-white">
                Thread.State.{currentInfo.name}
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold font-mono">
                Official Enum
              </span>
            </div>
            <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium hidden sm:inline">
              {currentInfo.tagline}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
            {currentInfo.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
            <div className="p-3 rounded-xl bg-white dark:bg-[#12131d] border border-zinc-200 dark:border-zinc-800">
              <span className="font-bold text-indigo-600 dark:text-indigo-400 block mb-0.5">
                How It Enters:
              </span>
              <span className="text-zinc-700 dark:text-zinc-300 font-mono text-[11px]">
                {currentInfo.triggerIn}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-white dark:bg-[#12131d] border border-zinc-200 dark:border-zinc-800">
              <span className="font-bold text-emerald-600 dark:text-emerald-400 block mb-0.5">
                How It Leaves:
              </span>
              <span className="text-zinc-700 dark:text-zinc-300 font-mono text-[11px]">
                {currentInfo.triggerOut}
              </span>
            </div>
          </div>

          {/* Key Interview Traps Callout */}
          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200 text-xs sm:text-sm flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <strong className="block font-bold text-amber-800 dark:text-amber-300 mb-0.5">
                Senior Interview Recall:
              </strong>
              <span>{currentInfo.interviewNote}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal for Infographic Asset */}
      {showImageModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150"
          onClick={() => setShowImageModal(false)}
        >
          <div
            className="relative max-w-4xl w-full bg-zinc-950 rounded-2xl overflow-hidden border border-zinc-800 p-2 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-3 border-b border-zinc-800 text-xs text-zinc-300">
              <span className="font-bold">Java Thread Lifecycle Infographic</span>
              <button
                onClick={() => setShowImageModal(false)}
                className="px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 cursor-pointer"
              >
                Close (ESC)
              </button>
            </div>
            <div className="p-2">
              <img
                src="/images/java-thread-lifecycle.png"
                alt="Java Thread Lifecycle and Official States Diagram"
                className="w-full h-auto rounded-lg max-h-[75vh] object-contain mx-auto"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
