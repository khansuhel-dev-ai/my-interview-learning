import React, { useState } from 'react';
import {
  Layers,
  ArrowRight,
  Zap,
  Terminal,
  Maximize2,
  X,
  FileCode,
  FolderTree,
  GitBranch,
} from 'lucide-react';

export const GradleWorkflowDiagram: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'workflow' | 'tasks' | 'comparison' | 'infographic'>('workflow');
  const [selectedPhase, setSelectedPhase] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const workflowSteps = [
    {
      id: 'init',
      stepNum: 1,
      title: 'Initialization Phase',
      tagline: 'Settings & Multi-Project Evaluation',
      badge: 'Evaluation',
      desc: 'Gradle determines which projects will take part in the build. It evaluates settings.gradle (or settings.gradle.kts) and instantiates Project descriptor objects for the root and each subproject.',
      keyPoints: [
        'Executes settings.gradle file first',
        'Identifies root project and subprojects in multi-module builds',
        'Instantiates a Project instance for each subproject',
        'Initializes build cache and project-level properties',
      ],
      command: './gradlew projects',
    },
    {
      id: 'config',
      stepNum: 2,
      title: 'Configuration Phase',
      tagline: 'Constructing the Task DAG',
      badge: 'DAG Generation',
      desc: 'Gradle executes the build script (build.gradle) of each project participating in the build. It configures plugins, evaluates dependencies, and builds an in-memory Directed Acyclic Graph (DAG) of tasks to execute.',
      keyPoints: [
        'Executes build.gradle configuration blocks',
        'Resolves declared plugins and external repositories (Maven Central)',
        'Computes task dependencies and constructs the execution DAG',
        'Identifies UP-TO-DATE tasks based on input/output hash comparisons',
      ],
      command: './gradlew tasks --all',
    },
    {
      id: 'exec',
      stepNum: 3,
      title: 'Execution Phase',
      tagline: 'Task Execution & Incremental Processing',
      badge: 'Build Execution',
      desc: 'Gradle executes the selected tasks in order according to their topological sort in the DAG. Incremental build caching skips tasks whose inputs and outputs have not changed (marked UP-TO-DATE or FROM-CACHE).',
      keyPoints: [
        'Executes compileJava, processResources, classes, test, and bootJar in exact DAG order',
        'Leverages Gradle Daemon to keep worker JVM warm for 5x–10x faster builds',
        'Executes parallel task execution across multiple project modules',
        'Outputs compiled artifacts to the build/ directory',
      ],
      command: './gradlew clean build',
    },
  ];

  const coreTasks = [
    { name: 'clean', desc: 'Deletes the project build/ directory and previous compile artifacts.', dependsOn: '-' },
    { name: 'compileJava', desc: 'Compiles production Java source code using configured JDK toolchain into build/classes/java/main.', dependsOn: '-' },
    { name: 'processResources', desc: 'Copies and filters application resources (application.properties, templates) into build/resources/main.', dependsOn: '-' },
    { name: 'classes', desc: 'Aggregate task packaging compiled bytecode classes and processed resources.', dependsOn: 'compileJava, processResources' },
    { name: 'compileTestJava', desc: 'Compiles test classes from src/test/java into build/classes/java/test.', dependsOn: 'classes' },
    { name: 'processTestResources', desc: 'Copies test resources into build/resources/test.', dependsOn: '-' },
    { name: 'testClasses', desc: 'Aggregate task combining compiled test classes and test resources.', dependsOn: 'compileTestJava, processTestResources' },
    { name: 'test', desc: 'Runs automated unit & integration tests using JUnit Platform and generates reports in build/reports/tests/test/.', dependsOn: 'testClasses, classes' },
    { name: 'bootJar / jar', desc: 'Packages compiled bytecode, bundled dependencies, and Spring Boot loader into an executable fat JAR in build/libs/.', dependsOn: 'classes' },
    { name: 'assemble', desc: 'Assembles all binary distributions without running automated tests.', dependsOn: 'jar, bootJar' },
    { name: 'build', desc: 'Full lifecycle aggregate task: performs assemble and runs all automated tests.', dependsOn: 'assemble, test' },
    { name: 'bootRun', desc: 'Runs the Spring Boot application directly from source code with live dev environment.', dependsOn: 'classes' },
  ];

  const comparisonData = [
    {
      feature: 'Configuration Paradigm',
      gradle: 'Programmatic Domain Specific Language (Groovy DSL or Kotlin DSL)',
      maven: 'Declarative, rigid XML (pom.xml)',
    },
    {
      feature: 'Execution Model',
      gradle: 'Dynamic Directed Acyclic Graph (DAG) of task dependencies',
      maven: 'Strict, linear sequential phases (validate → compile → test → package)',
    },
    {
      feature: 'Performance & Caching',
      gradle: 'Persistent background Gradle Daemon, incremental compile, build cache',
      maven: 'Cold JVM per command invocation by default; relies on incremental plugins',
    },
    {
      feature: 'Dependency Mediation',
      gradle: 'Default: "Newest version" conflict resolution strategy',
      maven: 'Default: "Nearest definition" in the POM tree hierarchy',
    },
    {
      feature: 'Flexibility & Custom Logic',
      gradle: 'Highly customizable: tasks can be scripted directly in code',
      maven: 'Strict convention over configuration: custom logic requires dedicated plugins',
    },
    {
      feature: 'Wrapper Tooling',
      gradle: 'Gradle Wrapper (gradlew / gradlew.bat) generated via Initializr',
      maven: 'Maven Wrapper (mvnw / mvnw.cmd) bootstrapped via wrapper plugin',
    },
  ];

  return (
    <div className="my-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#12131d] shadow-sm overflow-hidden">
      {/* Top Header */}
      <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-[#0f1017] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white shadow-xs">
            <GitBranch className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-sm sm:text-base text-zinc-900 dark:text-white">
              Gradle Build Automation & Workflow Explorer
            </h3>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
              Interactive 3-Phase Lifecycle, Task Dependency DAG, and Maven Comparison
            </p>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1 p-1 bg-zinc-200/70 dark:bg-zinc-800/80 rounded-xl text-xs font-semibold">
          <button
            onClick={() => setActiveTab('workflow')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'workflow'
                ? 'bg-white dark:bg-zinc-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            Build Lifecycle
          </button>
          <button
            onClick={() => setActiveTab('tasks')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'tasks'
                ? 'bg-white dark:bg-zinc-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            Core Tasks
          </button>
          <button
            onClick={() => setActiveTab('comparison')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'comparison'
                ? 'bg-white dark:bg-zinc-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            Gradle vs Maven
          </button>
          <button
            onClick={() => setActiveTab('infographic')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'infographic'
                ? 'bg-white dark:bg-zinc-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            Infographic
          </button>
        </div>
      </div>

      {/* Tab 1: Build Lifecycle */}
      {activeTab === 'workflow' && (
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {workflowSteps.map((step, idx) => (
              <button
                key={step.id}
                onClick={() => setSelectedPhase(idx)}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden ${
                  selectedPhase === idx
                    ? 'border-indigo-500 bg-indigo-50/40 dark:bg-indigo-950/20 shadow-xs'
                    : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#11121a] hover:border-zinc-300 dark:hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300">
                    Phase {step.stepNum}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-400">
                    {step.badge}
                  </span>
                </div>
                <h4 className="font-bold text-sm text-zinc-900 dark:text-white">
                  {step.title}
                </h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-1">
                  {step.tagline}
                </p>
              </button>
            ))}
          </div>

          {/* Phase Detail Inspector */}
          {workflowSteps[selectedPhase] && (
            <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-[#0f1017] border border-zinc-200 dark:border-zinc-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-200/80 dark:border-zinc-800 pb-3">
                <div>
                  <h4 className="font-bold text-base text-zinc-900 dark:text-white">
                    Phase {workflowSteps[selectedPhase].stepNum}: {workflowSteps[selectedPhase].title}
                  </h4>
                  <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">
                    {workflowSteps[selectedPhase].tagline}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-zinc-900 text-zinc-200 font-mono text-xs">
                  <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{workflowSteps[selectedPhase].command}</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                {workflowSteps[selectedPhase].desc}
              </p>

              <div>
                <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block mb-2">
                  Key Operations in this Phase:
                </span>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {workflowSteps[selectedPhase].keyPoints.map((pt, pIdx) => (
                    <li
                      key={pIdx}
                      className="p-2.5 rounded-xl bg-white dark:bg-[#141522] border border-zinc-200/80 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 flex items-start gap-2"
                    >
                      <span className="text-indigo-500 font-bold shrink-0">✓</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Core Tasks */}
      {activeTab === 'tasks' && (
        <div className="p-6 space-y-4">
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
            Gradle executes builds through tasks organized into an in-memory dependency graph. Running an aggregate task automatically executes all prerequisites:
          </p>
          <div className="overflow-x-auto rounded-2xl border border-zinc-200 dark:border-zinc-800">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-zinc-100 dark:bg-zinc-800/80 text-zinc-900 dark:text-white font-bold border-b border-zinc-200 dark:border-zinc-800">
                <tr>
                  <th className="px-4 py-3">Task Name</th>
                  <th className="px-4 py-3">Dependencies</th>
                  <th className="px-4 py-3">Description & Output</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/60 bg-white dark:bg-[#11121a]">
                {coreTasks.map((t, idx) => (
                  <tr key={idx} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30">
                    <td className="px-4 py-3 font-mono font-bold text-indigo-600 dark:text-indigo-400 whitespace-nowrap">
                      ./gradlew {t.name}
                    </td>
                    <td className="px-4 py-3 font-mono text-[11px] text-zinc-500 dark:text-zinc-400">
                      {t.dependsOn}
                    </td>
                    <td className="px-4 py-3 text-zinc-700 dark:text-zinc-300">
                      {t.desc}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Comparison */}
      {activeTab === 'comparison' && (
        <div className="p-6 space-y-4">
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
            Architectural trade-offs between Apache Maven and Gradle for enterprise Java projects:
          </p>
          <div className="overflow-x-auto rounded-2xl border border-zinc-200 dark:border-zinc-800">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-zinc-100 dark:bg-zinc-800/80 text-zinc-900 dark:text-white font-bold border-b border-zinc-200 dark:border-zinc-800">
                <tr>
                  <th className="px-4 py-3">Dimension</th>
                  <th className="px-4 py-3 text-indigo-600 dark:text-indigo-400">Gradle</th>
                  <th className="px-4 py-3 text-amber-600 dark:text-amber-400">Apache Maven</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/60 bg-white dark:bg-[#11121a]">
                {comparisonData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30">
                    <td className="px-4 py-3 font-bold text-zinc-900 dark:text-zinc-100 whitespace-nowrap">
                      {row.feature}
                    </td>
                    <td className="px-4 py-3 text-zinc-700 dark:text-zinc-300">
                      {row.gradle}
                    </td>
                    <td className="px-4 py-3 text-zinc-700 dark:text-zinc-300">
                      {row.maven}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 4: Infographic */}
      {activeTab === 'infographic' && (
        <div className="p-6 space-y-4">
          <div className="relative rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-900 group">
            <img
              src="/images/MIL_Gradle_Workflow_Diagram.png"
              alt="MIL Gradle Build Automation and Workflow Architecture Diagram"
              className="w-full h-auto object-contain max-h-[500px] mx-auto cursor-pointer group-hover:scale-[1.01] transition-transform duration-300"
              onClick={() => setIsModalOpen(true)}
            />
            <button
              onClick={() => setIsModalOpen(true)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-black/60 hover:bg-black/80 text-white backdrop-blur-md transition-colors cursor-pointer"
              title="Open full size"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-zinc-500 text-center">
            Click image or button above to inspect high-resolution architecture blueprint.
          </p>
        </div>
      )}

      {/* Full-Screen Infographic Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-6xl w-full max-h-[90vh] bg-zinc-900 rounded-3xl p-4 overflow-hidden border border-zinc-700">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-zinc-800 text-white hover:bg-zinc-700 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="overflow-auto max-h-[82vh] flex items-center justify-center">
              <img
                src="/images/MIL_Gradle_Workflow_Diagram.png"
                alt="MIL Gradle Build Automation and Workflow Architecture Diagram"
                className="w-auto h-auto max-w-full"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
