import React, { useState } from 'react';
import { AlertOctagon, AlertTriangle, ShieldAlert, Info, Image as ImageIcon } from 'lucide-react';

export const ThrowableHierarchyDiagram: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<string | null>('hierarchy');
  const [showImageModal, setShowImageModal] = useState(false);

  return (
    <div className="my-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0f1017] overflow-hidden shadow-xs">
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-zinc-200 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-3 bg-zinc-50/70 dark:bg-[#12131d]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/60">
              ARCHITECTURE DIAGRAM
            </span>
            <span className="text-xs text-zinc-400">•</span>
            <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
              Interactive & Accessible
            </span>
          </div>
          <h3 className="text-lg font-bold text-zinc-900 dark:text-white mt-1">
            Java Throwable Class Hierarchy
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
            Click any node to explore compiler rules, recovery strategies, and interview distinctions.
          </p>
        </div>

        <button
          onClick={() => setShowImageModal(true)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 transition-colors cursor-pointer"
          title="View rendered infographic image"
          aria-label="View infographic asset"
        >
          <ImageIcon className="w-3.5 h-3.5 text-indigo-500" />
          <span>View Infographic Asset</span>
        </button>
      </div>

      {/* Interactive Visual Hierarchy Tree */}
      <div className="p-4 sm:p-6 overflow-x-auto">
        <div className="min-w-[640px] flex flex-col items-center gap-4 py-2">
          {/* Root: Object */}
          <div className="flex flex-col items-center">
            <button
              onClick={() => setSelectedNode('object')}
              className={`px-6 py-2 rounded-xl text-xs sm:text-sm font-bold font-mono border transition-all cursor-pointer ${
                selectedNode === 'object'
                  ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 ring-2 ring-indigo-500 shadow-md'
                  : 'bg-zinc-100 dark:bg-zinc-800/80 text-zinc-800 dark:text-zinc-200 border-zinc-200 dark:border-zinc-700 hover:border-zinc-400'
              }`}
            >
              java.lang.Object
            </button>
            <div className="w-0.5 h-4 bg-zinc-300 dark:bg-zinc-700" />
          </div>

          {/* Throwable */}
          <div className="flex flex-col items-center">
            <button
              onClick={() => setSelectedNode('throwable')}
              className={`px-7 py-2.5 rounded-xl text-xs sm:text-sm font-bold font-mono border transition-all cursor-pointer ${
                selectedNode === 'throwable'
                  ? 'bg-amber-500 text-white dark:bg-amber-400 dark:text-zinc-950 ring-2 ring-amber-400 shadow-md'
                  : 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800 hover:border-amber-400'
              }`}
            >
              Throwable
            </button>
            <div className="w-0.5 h-4 bg-zinc-300 dark:bg-zinc-700" />
          </div>

          {/* Branch Split: Error vs Exception */}
          <div className="w-full flex items-start justify-center gap-6 sm:gap-10">
            {/* Left Branch: Error */}
            <div className="flex-1 max-w-[320px] flex flex-col items-center space-y-3">
              <button
                onClick={() => setSelectedNode('error')}
                className={`w-full p-3 rounded-xl text-center border transition-all cursor-pointer ${
                  selectedNode === 'error'
                    ? 'bg-rose-600 text-white ring-2 ring-rose-400 shadow-md'
                    : 'bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900/60 text-rose-700 dark:text-rose-300 hover:border-rose-400'
                }`}
              >
                <div className="flex items-center justify-center gap-1.5 font-bold font-mono text-sm">
                  <AlertOctagon className="w-4 h-4 text-rose-500" />
                  <span>Error</span>
                </div>
                <span className="text-[11px] block mt-0.5 opacity-90">
                  JVM / Environment Failures (Unrecoverable)
                </span>
              </button>

              <div className="w-full space-y-2 pl-3 border-l-2 border-rose-200 dark:border-rose-900/40 text-left">
                <button
                  onClick={() => setSelectedNode('oom')}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-mono font-medium border transition-colors cursor-pointer ${
                    selectedNode === 'oom'
                      ? 'bg-rose-100 dark:bg-rose-900/50 border-rose-400 text-rose-900 dark:text-rose-100 font-bold'
                      : 'bg-white dark:bg-[#12131d] border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-rose-300'
                  }`}
                >
                  OutOfMemoryError
                </button>
                <button
                  onClick={() => setSelectedNode('stackoverflow')}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-mono font-medium border transition-colors cursor-pointer ${
                    selectedNode === 'stackoverflow'
                      ? 'bg-rose-100 dark:bg-rose-900/50 border-rose-400 text-rose-900 dark:text-rose-100 font-bold'
                      : 'bg-white dark:bg-[#12131d] border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-rose-300'
                  }`}
                >
                  StackOverflowError
                </button>
                <button
                  onClick={() => setSelectedNode('noclassdef')}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-mono font-medium border transition-colors cursor-pointer ${
                    selectedNode === 'noclassdef'
                      ? 'bg-rose-200 dark:bg-rose-900/70 border-rose-500 text-rose-950 dark:text-white font-bold ring-1 ring-rose-400'
                      : 'bg-white dark:bg-[#12131d] border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-rose-300'
                  }`}
                >
                  NoClassDefFoundError ⚠️
                </button>
              </div>
            </div>

            {/* Right Branch: Exception */}
            <div className="flex-[2] max-w-[560px] flex flex-col items-center space-y-3">
              <button
                onClick={() => setSelectedNode('exception')}
                className={`w-full p-3 rounded-xl text-center border transition-all cursor-pointer ${
                  selectedNode === 'exception'
                    ? 'bg-indigo-600 text-white ring-2 ring-indigo-400 shadow-md'
                    : 'bg-indigo-50 dark:bg-indigo-950/30 border-indigo-200 dark:border-indigo-900/60 text-indigo-700 dark:text-indigo-300 hover:border-indigo-400'
                }`}
              >
                <div className="flex items-center justify-center gap-1.5 font-bold font-mono text-sm">
                  <ShieldAlert className="w-4 h-4 text-indigo-500" />
                  <span>Exception</span>
                </div>
                <span className="text-[11px] block mt-0.5 opacity-90">
                  Application conditions that can be handled
                </span>
              </button>

              {/* Sub-split: Checked vs Unchecked RuntimeException */}
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {/* Checked Exceptions */}
                <div className="space-y-2">
                  <div className="px-2.5 py-1 rounded bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 text-[11px] font-bold uppercase tracking-wider border border-amber-200 dark:border-amber-900/40 text-center">
                    Checked Exceptions (Compile enforced)
                  </div>
                  <div className="space-y-1.5">
                    <button
                      onClick={() => setSelectedNode('ioexception')}
                      className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-mono border transition-colors cursor-pointer ${
                        selectedNode === 'ioexception'
                          ? 'bg-amber-100 dark:bg-amber-900/50 border-amber-400 font-bold text-amber-950 dark:text-white'
                          : 'bg-white dark:bg-[#12131d] border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-amber-300'
                      }`}
                    >
                      IOException
                    </button>
                    <button
                      onClick={() => setSelectedNode('sqlexception')}
                      className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-mono border transition-colors cursor-pointer ${
                        selectedNode === 'sqlexception'
                          ? 'bg-amber-100 dark:bg-amber-900/50 border-amber-400 font-bold text-amber-950 dark:text-white'
                          : 'bg-white dark:bg-[#12131d] border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-amber-300'
                      }`}
                    >
                      SQLException
                    </button>
                    <button
                      onClick={() => setSelectedNode('classnotfound')}
                      className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-mono border transition-colors cursor-pointer ${
                        selectedNode === 'classnotfound'
                          ? 'bg-amber-200 dark:bg-amber-900/70 border-amber-500 font-bold text-amber-950 dark:text-white ring-1 ring-amber-400'
                          : 'bg-white dark:bg-[#12131d] border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-amber-300'
                      }`}
                    >
                      ClassNotFoundException ⚠️
                    </button>
                  </div>
                </div>

                {/* Unchecked Exceptions (RuntimeException) */}
                <div className="space-y-2">
                  <div className="px-2.5 py-1 rounded bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-[11px] font-bold uppercase tracking-wider border border-emerald-200 dark:border-emerald-900/40 text-center">
                    Unchecked RuntimeException
                  </div>
                  <div className="space-y-1.5">
                    <button
                      onClick={() => setSelectedNode('arithmetic')}
                      className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-mono border transition-colors cursor-pointer ${
                        selectedNode === 'arithmetic'
                          ? 'bg-emerald-100 dark:bg-emerald-900/50 border-emerald-400 font-bold text-emerald-950 dark:text-white'
                          : 'bg-white dark:bg-[#12131d] border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-emerald-300'
                      }`}
                    >
                      ArithmeticException
                    </button>
                    <button
                      onClick={() => setSelectedNode('npe')}
                      className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-mono border transition-colors cursor-pointer ${
                        selectedNode === 'npe'
                          ? 'bg-emerald-100 dark:bg-emerald-900/50 border-emerald-400 font-bold text-emerald-950 dark:text-white'
                          : 'bg-white dark:bg-[#12131d] border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-emerald-300'
                      }`}
                    >
                      NullPointerException
                    </button>
                    <button
                      onClick={() => setSelectedNode('arraybounds')}
                      className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-mono border transition-colors cursor-pointer ${
                        selectedNode === 'arraybounds'
                          ? 'bg-emerald-100 dark:bg-emerald-900/50 border-emerald-400 font-bold text-emerald-950 dark:text-white'
                          : 'bg-white dark:bg-[#12131d] border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-emerald-300'
                      }`}
                    >
                      ArrayIndexOutOfBounds
                    </button>
                    <button
                      onClick={() => setSelectedNode('illegalarg')}
                      className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-mono border transition-colors cursor-pointer ${
                        selectedNode === 'illegalarg'
                          ? 'bg-emerald-100 dark:bg-emerald-900/50 border-emerald-400 font-bold text-emerald-950 dark:text-white'
                          : 'bg-white dark:bg-[#12131d] border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-emerald-300'
                      }`}
                    >
                      IllegalArgumentException
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Explanatory Details Box */}
      <div className="p-4 sm:p-5 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-[#0c0d13] text-xs sm:text-sm">
        {selectedNode === 'noclassdef' || selectedNode === 'classnotfound' ? (
          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200 space-y-2">
            <div className="flex items-center gap-2 font-bold text-amber-800 dark:text-amber-300">
              <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
              <span>Crucial Interview Distinction: NoClassDefFoundError vs ClassNotFoundException</span>
            </div>
            <p>
              • <strong>NoClassDefFoundError</strong> is an <code>Error</code>. It occurs when a class was available during compilation, but when the JVM attempts to load it at runtime, the <code>.class</code> file cannot be found in the classpath (e.g. missing JAR or dependency conflict). Applications typically cannot and should not recover.
            </p>
            <p>
              • <strong>ClassNotFoundException</strong> is a <strong>checked Exception</strong>. It occurs when dynamic reflection or string loading is performed (e.g. <code>Class.forName(&quot;com.mysql.cj.jdbc.Driver&quot;)</code>) and the string name cannot be resolved. The Java compiler forces callers to handle or declare it.
            </p>
          </div>
        ) : selectedNode === 'error' || selectedNode === 'oom' || selectedNode === 'stackoverflow' ? (
          <div className="space-y-1.5 text-zinc-700 dark:text-zinc-300">
            <strong className="text-rose-600 dark:text-rose-400 font-semibold block">
              Java Error Branch:
            </strong>
            <p>
              Represents catastrophic environment or JVM resource exhaustion (e.g., native memory exhausted, execution stack overflow from unbounded recursion). Applications should generally terminate rather than attempt recovery.
            </p>
          </div>
        ) : selectedNode === 'exception' || selectedNode === 'ioexception' || selectedNode === 'sqlexception' ? (
          <div className="space-y-1.5 text-zinc-700 dark:text-zinc-300">
            <strong className="text-indigo-600 dark:text-indigo-400 font-semibold block">
              Checked Exceptions:
            </strong>
            <p>
              Direct subclasses of <code>Exception</code> (excluding <code>RuntimeException</code>). The Java compiler verifies that callers either handle them using <code>try-catch</code> or declare them in the method signature using <code>throws</code>.
            </p>
          </div>
        ) : selectedNode === 'arithmetic' || selectedNode === 'npe' || selectedNode === 'arraybounds' || selectedNode === 'illegalarg' ? (
          <div className="space-y-1.5 text-zinc-700 dark:text-zinc-300">
            <strong className="text-emerald-600 dark:text-emerald-400 font-semibold block">
              Unchecked Exceptions (RuntimeException):
            </strong>
            <p>
              Subclasses of <code>RuntimeException</code>. Usually caused by logic flaws or invalid arguments (e.g. dividing by zero, indexing beyond array length, dereferencing null). The compiler does not enforce try-catch; the clean solution is to write defensive code to avoid them.
            </p>
          </div>
        ) : (
          <div className="flex items-start gap-2 text-zinc-600 dark:text-zinc-400">
            <Info className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
            <span>
              Select any class in the diagram above to inspect whether it is checked or unchecked, why it occurs, and how senior Java engineers handle it in production code.
            </span>
          </div>
        )}
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
              <span className="font-bold">Java Throwable Hierarchy Infographic</span>
              <button
                onClick={() => setShowImageModal(false)}
                className="px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 cursor-pointer"
              >
                Close (ESC)
              </button>
            </div>
            <div className="p-2">
              <img
                src="/images/java-throwable-hierarchy.png"
                alt="Java Throwable Hierarchy Diagram showing Object to Throwable to Error and Exception"
                className="w-full h-auto rounded-lg max-h-[75vh] object-contain mx-auto"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
