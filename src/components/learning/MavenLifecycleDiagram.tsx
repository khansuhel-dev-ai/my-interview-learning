import React, { useState } from 'react';
import {
  Layers,
  HardDrive,
  Workflow,
  CheckCircle2,
  Terminal,
  FileCode,
  Cloud,
  ArrowRight,
  RefreshCw,
  Maximize2,
  X,
  Sparkles,
  Info,
} from 'lucide-react';

export const MavenLifecycleDiagram: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'lifecycle' | 'repository' | 'pipeline' | 'infographic'>('lifecycle');
  const [selectedPhase, setSelectedPhase] = useState<string>('package');
  const [showImageModal, setShowImageModal] = useState(false);

  const phases = [
    {
      id: 'validate',
      name: 'validate',
      type: 'default',
      summary: 'Validates that the project POM is correct and all required configuration is available.',
      command: 'mvn validate',
      output: 'Validates POM XML syntax, coordinate schema, and environment readiness.',
      badge: 'Step 1',
    },
    {
      id: 'compile',
      name: 'compile',
      type: 'default',
      summary: 'Compiles the application source code from src/main/java into bytecode .class files.',
      command: 'mvn compile',
      output: 'Output generated in target/classes/. Does NOT produce final JAR.',
      badge: 'Step 2',
    },
    {
      id: 'test',
      name: 'test',
      type: 'default',
      summary: 'Executes configured unit tests using test frameworks (JUnit / Mockito) via Surefire plugin.',
      command: 'mvn test',
      output: 'Runs tests in src/test/java. Build fails if any unit test assertion fails.',
      badge: 'Step 3',
    },
    {
      id: 'package',
      name: 'package',
      type: 'default',
      summary: 'Runs validate, compile, test, then bundles compiled code into configured artifact (JAR/WAR).',
      command: 'mvn package',
      output: 'Produces executable or library artifact in target/ (e.g. target/app-1.0.jar).',
      badge: 'Step 4',
    },
    {
      id: 'verify',
      name: 'verify',
      type: 'default',
      summary: 'Runs integration tests and quality checks to verify the package meets quality criteria.',
      command: 'mvn verify',
      output: 'Executes Failsafe integration tests and static analysis plugins.',
      badge: 'Step 5',
    },
    {
      id: 'install',
      name: 'install',
      type: 'default',
      summary: 'Installs the packaged JAR/WAR into the local repository cache (~/.m2/repository).',
      command: 'mvn install',
      output: 'Allows other local projects on your machine to depend on this artifact.',
      badge: 'Step 6',
    },
    {
      id: 'deploy',
      name: 'deploy',
      type: 'default',
      summary: 'Copies the final package to the configured remote repository (Nexus / Artifactory / Central).',
      command: 'mvn deploy',
      output: 'Requires remote server credentials and <distributionManagement> in POM.',
      badge: 'Step 7',
    },
  ];

  const currentPhaseData = phases.find((p) => p.id === selectedPhase) || phases[3];

  return (
    <div className="my-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0f1017] overflow-hidden shadow-xs">
      {/* Card Header with Tabs */}
      <div className="p-4 sm:p-5 border-b border-zinc-200 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-3 bg-zinc-50/70 dark:bg-[#12131d]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/60">
              ARCHITECTURE & LIFECYCLE
            </span>
            <span className="text-xs text-zinc-400">•</span>
            <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
              Interactive Explorer
            </span>
          </div>
          <h3 className="text-lg font-bold text-zinc-900 dark:text-white mt-1">
            Maven Build Lifecycles, Repository Flow & Artifact Pipeline
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
            Switch tabs to inspect the 7 core build phases, repository dependency resolution, or the infographic overview.
          </p>
        </div>

        {/* View Infographic Button */}
        <button
          onClick={() => setShowImageModal(true)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/60 dark:hover:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/60 transition-colors cursor-pointer"
          title="Open high-resolution Maven build lifecycle infographic"
          aria-label="View Infographic Asset"
        >
          <Maximize2 className="w-3.5 h-3.5" />
          <span>View Full Infographic</span>
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center border-b border-zinc-200 dark:border-zinc-800 bg-zinc-100/50 dark:bg-zinc-900/40 px-4 gap-2 overflow-x-auto text-xs font-semibold">
        <button
          onClick={() => setActiveTab('lifecycle')}
          className={`py-2.5 px-3 border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
            activeTab === 'lifecycle'
              ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400'
              : 'border-transparent text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200'
          }`}
        >
          <Workflow className="w-3.5 h-3.5" />
          <span>Build Lifecycle (Clean + 7 Phases)</span>
        </button>

        <button
          onClick={() => setActiveTab('repository')}
          className={`py-2.5 px-3 border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
            activeTab === 'repository'
              ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400'
              : 'border-transparent text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200'
          }`}
        >
          <HardDrive className="w-3.5 h-3.5" />
          <span>Repository Architecture</span>
        </button>

        <button
          onClick={() => setActiveTab('pipeline')}
          className={`py-2.5 px-3 border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
            activeTab === 'pipeline'
              ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400'
              : 'border-transparent text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Source-to-Artifact Pipeline</span>
        </button>

        <button
          onClick={() => setActiveTab('infographic')}
          className={`py-2.5 px-3 border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
            activeTab === 'infographic'
              ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400'
              : 'border-transparent text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Infographic Overview</span>
        </button>
      </div>

      {/* Tab 1: Interactive Build Lifecycle */}
      {activeTab === 'lifecycle' && (
        <div className="p-4 sm:p-6 space-y-6">
          {/* Separate Clean Lifecycle Banner */}
          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <RefreshCw className="w-4 h-4 text-amber-500 shrink-0" />
              <div>
                <span className="text-xs font-bold text-amber-700 dark:text-amber-400">
                  Clean Lifecycle (Separate):
                </span>
                <span className="text-xs text-zinc-600 dark:text-zinc-300 ml-1.5">
                  <code className="px-1.5 py-0.5 bg-white dark:bg-zinc-800 rounded font-mono font-bold text-zinc-800 dark:text-zinc-200">mvn clean</code> deletes generated <code className="font-mono text-amber-600 dark:text-amber-300">target/</code> directory without touching source code.
                </span>
              </div>
            </div>
            <span className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400 shrink-0">
              pre-clean → clean → post-clean
            </span>
          </div>

          {/* Sequential Default Lifecycle Horizontal Sequence */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-zinc-500 uppercase tracking-wider">
              <span>Default Lifecycle Sequence (Sequential Execution)</span>
              <span className="text-[11px] font-normal normal-case text-zinc-400">Click any phase to inspect details</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
              {phases.map((phase) => {
                const isSelected = selectedPhase === phase.id;
                return (
                  <button
                    key={phase.id}
                    onClick={() => setSelectedPhase(phase.id)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/70 dark:bg-indigo-950/50 shadow-xs ring-2 ring-indigo-500/40'
                        : 'border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40 hover:border-zinc-300 dark:hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-zinc-400">
                        {phase.badge}
                      </span>
                      {isSelected && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                      )}
                    </div>
                    <div className="mt-2">
                      <span className="font-mono font-bold text-xs sm:text-sm text-zinc-900 dark:text-white block">
                        {phase.name}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Phase Inspection Card */}
          <div className="p-4 sm:p-5 rounded-2xl bg-zinc-50 dark:bg-[#12131d] border border-zinc-200 dark:border-zinc-800/80 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-sm sm:text-base text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-200 dark:border-indigo-800/60">
                  Phase: {currentPhaseData.name}
                </span>
                <span className="text-xs text-zinc-500">({currentPhaseData.badge} in Default Lifecycle)</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-600 dark:text-zinc-300 bg-white dark:bg-zinc-800/80 px-2.5 py-1 rounded-lg border border-zinc-200 dark:border-zinc-700">
                <Terminal className="w-3 h-3 text-zinc-400" />
                <span>Command: {currentPhaseData.command}</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
              {currentPhaseData.summary}
            </p>

            <div className="p-3 rounded-xl bg-white dark:bg-[#0c0d12] border border-zinc-200 dark:border-zinc-800 font-mono text-xs text-zinc-700 dark:text-zinc-300">
              <span className="text-zinc-400 block text-[10px] uppercase font-bold tracking-wider mb-1">
                Execution Outcome:
              </span>
              <span>{currentPhaseData.output}</span>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-zinc-500 dark:text-zinc-400">
              <Info className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
              <span>
                Running <code className="font-mono text-zinc-700 dark:text-zinc-300">{currentPhaseData.command}</code> automatically executes all preceding phases first.
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Repository Architecture */}
      {activeTab === 'repository' && (
        <div className="p-4 sm:p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Box 1: Local Project */}
            <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40 space-y-3">
              <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                <FileCode className="w-5 h-5" />
                <h4 className="font-bold text-sm text-zinc-900 dark:text-white">1. Project & POM</h4>
              </div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Your application code with <code className="font-mono">pom.xml</code> declaring dependencies (e.g. Spring Boot, JUnit).
              </p>
              <div className="text-[11px] font-mono p-2 rounded bg-white dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300">
                &lt;dependency&gt;...&lt;/dependency&gt;
              </div>
            </div>

            {/* Box 2: Local Cache (~/.m2) */}
            <div className="p-4 rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/30 dark:bg-emerald-950/20 space-y-3">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                <HardDrive className="w-5 h-5" />
                <h4 className="font-bold text-sm text-zinc-900 dark:text-white">2. Local Cache (~/.m2)</h4>
              </div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Stored on developer machine. Checked FIRST. If JAR exists locally, zero network latency.
              </p>
              <div className="text-[11px] font-mono p-2 rounded bg-white dark:bg-zinc-800/80 border border-emerald-200 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-300">
                ~/.m2/repository/
              </div>
            </div>

            {/* Box 3: Remote / Central */}
            <div className="p-4 rounded-xl border border-blue-200 dark:border-blue-900/60 bg-blue-50/30 dark:bg-blue-950/20 space-y-3">
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                <Cloud className="w-5 h-5" />
                <h4 className="font-bold text-sm text-zinc-900 dark:text-white">3. Remote & Central</h4>
              </div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Maven Central (public) or Corporate Nexus/Artifactory. Downloaded once, then cached locally.
              </p>
              <div className="text-[11px] font-mono p-2 rounded bg-white dark:bg-zinc-800/80 border border-blue-200 dark:border-blue-800/60 text-blue-700 dark:text-blue-300">
                repo.maven.apache.org
              </div>
            </div>
          </div>

          {/* Resolution Logic Step-by-Step */}
          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-[#12131d] border border-zinc-200 dark:border-zinc-800 space-y-2 text-xs text-zinc-700 dark:text-zinc-300">
            <h5 className="font-bold text-zinc-900 dark:text-white text-xs uppercase tracking-wider mb-2">
              Maven Dependency Resolution Algorithm:
            </h5>
            <div className="flex items-start gap-2">
              <span className="font-bold font-mono text-indigo-600 dark:text-indigo-400">1.</span>
              <span>Developer runs <code className="font-mono">mvn compile</code> or <code className="font-mono">mvn package</code>.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-bold font-mono text-indigo-600 dark:text-indigo-400">2.</span>
              <span>Maven checks local cache in <code className="font-mono">~/.m2/repository</code>. If present, it binds the JAR immediately.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-bold font-mono text-indigo-600 dark:text-indigo-400">3.</span>
              <span>If absent, Maven queries configured Remote Repositories / Maven Central, downloads JAR + POM metadata + transitive dependencies.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-bold font-mono text-indigo-600 dark:text-indigo-400">4.</span>
              <span>Downloaded libraries are cached into <code className="font-mono">~/.m2/repository</code> so subsequent builds run 100% offline.</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Source to Artifact Pipeline */}
      {activeTab === 'pipeline' && (
        <div className="p-4 sm:p-6 space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-center">
            {/* Step 1: Java Source */}
            <div className="flex-1 w-full p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 space-y-1">
              <div className="text-[10px] font-mono text-zinc-400 uppercase font-bold">Input</div>
              <div className="font-mono font-bold text-xs sm:text-sm text-zinc-900 dark:text-white">src/main/java</div>
              <p className="text-[11px] text-zinc-500">Human-readable Java source files (.java)</p>
            </div>

            <ArrowRight className="w-5 h-5 text-zinc-400 shrink-0 rotate-90 md:rotate-0" />

            {/* Step 2: Bytecode */}
            <div className="flex-1 w-full p-4 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/60 space-y-1">
              <div className="text-[10px] font-mono text-indigo-500 uppercase font-bold">Compiled</div>
              <div className="font-mono font-bold text-xs sm:text-sm text-zinc-900 dark:text-white">target/classes</div>
              <p className="text-[11px] text-zinc-500">Compiled JVM bytecode files (.class)</p>
            </div>

            <ArrowRight className="w-5 h-5 text-zinc-400 shrink-0 rotate-90 md:rotate-0" />

            {/* Step 3: Tests */}
            <div className="flex-1 w-full p-4 rounded-xl bg-amber-50/50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 space-y-1">
              <div className="text-[10px] font-mono text-amber-500 uppercase font-bold">Verified</div>
              <div className="font-mono font-bold text-xs sm:text-sm text-zinc-900 dark:text-white">src/test/java</div>
              <p className="text-[11px] text-zinc-500">Surefire executes test suites</p>
            </div>

            <ArrowRight className="w-5 h-5 text-zinc-400 shrink-0 rotate-90 md:rotate-0" />

            {/* Step 4: Final Archive */}
            <div className="flex-1 w-full p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/60 space-y-1">
              <div className="text-[10px] font-mono text-emerald-500 uppercase font-bold">Packaged</div>
              <div className="font-mono font-bold text-xs sm:text-sm text-zinc-900 dark:text-white">target/*.jar</div>
              <p className="text-[11px] text-zinc-500">Deployable JAR/WAR archive</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-[#12131d] border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-600 dark:text-zinc-400">
            <strong className="text-zinc-900 dark:text-white">Execution Command:</strong> For executable Spring Boot applications or JARs with a manifest main class, run:
            <pre className="mt-2 p-2.5 rounded-lg bg-zinc-900 text-zinc-100 font-mono text-xs overflow-x-auto">
              java -jar target/your-project-name-1.0.0.jar
            </pre>
          </div>
        </div>
      )}

      {/* Tab 4: Infographic Overview */}
      {activeTab === 'infographic' && (
        <div className="p-4 sm:p-6 space-y-4">
          <div className="relative rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-950 group">
            <img
              src="/images/MIL_Maven_Build_Lifecycle.png"
              alt="Maven Build Lifecycle Infographic Diagram"
              className="w-full h-auto max-h-[500px] object-contain mx-auto"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button
                onClick={() => setShowImageModal(true)}
                className="px-4 py-2 rounded-xl bg-white text-zinc-900 font-bold text-xs shadow-lg flex items-center gap-2 cursor-pointer hover:bg-zinc-100"
              >
                <Maximize2 className="w-4 h-4" />
                <span>Open Full-Screen Infographic</span>
              </button>
            </div>
          </div>
          <p className="text-center text-xs text-zinc-500 dark:text-zinc-400">
            High-resolution visual reference: Maven Clean vs Default Lifecycle phases and artifacts.
          </p>
        </div>
      )}

      {/* Full Screen Image Modal */}
      {showImageModal && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setShowImageModal(false)}
        >
          <div
            className="relative max-w-5xl w-full max-h-[90vh] bg-zinc-900 rounded-2xl p-4 overflow-hidden border border-zinc-800 shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <span className="font-bold text-sm text-white">
                Maven Build Lifecycle Infographic
              </span>
              <button
                onClick={() => setShowImageModal(false)}
                className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
                aria-label="Close image modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-2 overflow-auto flex-1 flex items-center justify-center">
              <img
                src="/images/MIL_Maven_Build_Lifecycle.png"
                alt="Full resolution Maven Build Lifecycle"
                className="max-h-[80vh] w-auto object-contain rounded-lg"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
