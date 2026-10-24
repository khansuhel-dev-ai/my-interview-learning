# My Interview Learning (MIL)

<p align="center">
  <img src="/logo.svg" alt="My Interview Learning Logo" width="380" />
</p>

<p align="center">
  <strong>Master Enterprise Java, JVM Internals, Multithreading, Apache Maven, and Technical Interview Preparation.</strong>
</p>

<p align="center">
  <a href="#-curriculum-overview"><img src="https://img.shields.io/badge/Lessons-48%20Comprehensive%20Topics-blue?style=for-the-badge&logo=java" alt="48 Lessons" /></a>
  <a href="#-hands-on-exercises"><img src="https://img.shields.io/badge/Exercises-46%20Interactive%20Labs-emerald?style=for-the-badge&logo=codewars" alt="46 Exercises" /></a>
  <a href="#-technical-interview-question-bank"><img src="https://img.shields.io/badge/Interview%20Bank-117%20Real--World%20Q%26As-amber?style=for-the-badge&logo=interview-cake" alt="117 Questions" /></a>
  <a href="#-data-immutability--security-guarantee"><img src="https://img.shields.io/badge/Architecture-100%25%20Static%20%7C%20Immutable-purple?style=for-the-badge&logo=shield" alt="Static Immutable" /></a>
  <a href="#-deploying-to-vercel"><img src="https://img.shields.io/badge/Deploy-Vercel%20Ready-black?style=for-the-badge&logo=vercel" alt="Vercel Ready" /></a>
</p>

---

## 📖 Overview

**My Interview Learning (MIL)** is a fast, modern, and interview-oriented web platform built with **React 19**, **TypeScript**, **Vite**, and **Tailwind CSS**. It is purpose-built for software engineers, backend developers, and computer science candidates preparing for high-bar technical interviews at top engineering organizations.

Unlike generic tutorials that teach only basic syntax, MIL dives straight into:
- **JVM Runtime Mechanics**: Bytecode execution, Stack vs Heap memory allocation, Garbage Collection phases, and String Constant Pool intern tables.
- **Deep Concurrency**: The 6 official `Thread.State` enum states, nondeterministic interleaving, race conditions, CPU cache coherence, `synchronized` monitor locks, and `volatile` memory visibility.
- **Enterprise Build Systems**: Complete Apache Maven architectural model, POM inheritance, dependency mediation (`nearest-definition`), multi-module reactor builds, and build lifecycle phase-to-goal bindings.
- **Modern Java Evolutions**: Deep coverage of Java 8 through Java 21, including Streams, Lambdas, Records, Sealed Classes, Pattern Matching, and Virtual Threads (Project Loom).

---

## 🔒 Data Immutability & Security Guarantee

> **Crucial Guarantee for Website Content Integrity:**
> **No end-user, visitor, or external actor can alter or mutate the tutorial content of this website.**

1. **Static Build Architecture**:
   - All educational topics, exercises, code snippets, and interview questions are defined as strongly-typed static TypeScript constants and compiled directly into minified JavaScript client bundles at build time.
2. **Zero Backend / Database Attack Surface**:
   - The platform has **no backend server, no database, no REST mutation endpoints, and no administrative authentication portals**. There are no write channels that could allow anyone to alter the site content.
3. **Runtime Freezing (`Object.freeze`)**:
   - In `src/data/index.ts`, all exported topic collections, exercise sets, and interview banks are wrapped with `Object.freeze()`. Even if a user attempts to run script mutations or prototype pollution via browser developer tools, the JavaScript engine enforces runtime immutability.
4. **Client-Side Progress Isolation**:
   - Personal user progress (read lessons, completed exercises, bookmarked interview questions) is saved exclusively inside the individual visitor's own browser `localStorage` (`mil_progress_v1`). This data stays on the user's local device, is never transmitted to any server, and cannot affect any other user's view of the site.

---

## 🚀 Quick Start & Local Setup

### Prerequisites
- **Node.js**: `v18.0.0` or later (tested on Node 20 & 22)
- **npm**: `v9.0.0` or later

### Installation & Run

```bash
# 1. Clone the repository
git clone https://github.com/khansuhel-dev-ai/my-interview-learning.git
cd my-interview-learning

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
# -> Local server starts at http://localhost:5173/

# 4. Check for linting issues
npm run lint

# 5. Build production bundle
npm run build

# 6. Preview production build locally
npm run preview
```

---

## ☁️ Deploying to Vercel

This repository is pre-configured for seamless 1-click deployment on **Vercel**.

### Automatic SPA Routing (`vercel.json`)
The included `vercel.json` provides:
- **Single Page Application (SPA) Rewrites**: Deep routes like `/learn/java/java-maven-build-management`, `/exercises`, `/interview`, and `/about` are routed to `index.html` to eliminate 404s on browser refresh.
- **Aggressive CDN Caching**: Immutable static assets (`/assets/*`) are cached for 1 year (`max-age=31536000, immutable`).
- **Security Headers**: Includes `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, and `X-XSS-Protection: 1; mode=block`.

### Deploy in 3 Steps:
1. Log in to your [Vercel Dashboard](https://vercel.com).
2. Click **Add New Project** and select your GitHub repository: `khansuhel-dev-ai/my-interview-learning`.
3. Vercel will automatically detect the **Vite** framework:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
4. Click **Deploy**. Your site will be live with full global CDN distribution and SSL.

---

## 📚 Curriculum Overview (48 Lessons)

The curriculum is structured into 9 progressive learning modules:

```text
Module 1: Setup and First Program (2 Lessons)
├── JAVA-033: Java Setup on macOS (Apple Silicon ARM64 vs Intel x64, JDK, javac, bytecode)
└── JAVA-001: Java Execution, JVM, JRE & JDK (WORA, ClassLoaders, Execution Engine, JIT)

Module 2: Java Fundamentals (5 Lessons)
├── JAVA-002: Primitive Types, Variables, Casting & Operators (The 8 primitives, overflow)
├── JAVA-038: Taking Input from the User (System.in.read, BufferedReader, Scanner traps)
├── JAVA-004: JVM Memory Management: Stack vs Heap (Stack frames, Reference pointers, GC)
├── JAVA-005: Arrays: 1D, Multi-Dimensional & Jagged Arrays (Memory layouts, heap arrays)
└── JAVA-006: String, StringBuffer & StringBuilder (Immutability, SCP, thread-safety)

Module 3: Object-Oriented Programming (17 Lessons)
├── JAVA-007: Classes & Objects (State, behavior, object instantiation)
├── JAVA-008: Methods & Method Overloading (Stack allocation, signature resolution)
├── JAVA-009: static Keyword (Static variables, static methods, static blocks, class loading)
├── JAVA-010: Constructors & this Keyword (Default vs parameterized, constructor chaining)
├── JAVA-011: Inheritance & super Keyword (IS-A relationships, method overriding, super calls)
├── JAVA-012: Polymorphism (Compile-time overloading vs runtime dynamic method dispatch)
├── JAVA-013: Encapsulation & Getters/Setters (Data hiding, defensive copying)
├── JAVA-014: Access Modifiers (public, protected, package-private default, private matrix)
├── JAVA-015: Abstraction & Abstract Classes (Partial abstraction, template method pattern)
├── JAVA-016: Interfaces & Multiple Inheritance (Contracts, default & static methods, conflict resolution)
├── JAVA-017: final Keyword (Final variables, immutability, final methods, final classes)
├── JAVA-018: Object Class: toString, equals & hashCode (Contract rules, HashMap bucket lookups)
├── JAVA-019: Upcasting & Downcasting (Widening, narrowing, instanceof operator)
├── JAVA-020: Inner Classes & Anonymous Classes (Member inner, local, anonymous classes)
├── JAVA-021: Wrapper Classes & Autoboxing (Primitive boxing, unboxing, caching pool)
├── JAVA-022: Enums in Java (Type-safe enums, custom constructors, values(), ordinal())
└── JAVA-023: Annotations (@Override, @Deprecated, custom retention & target policies)

Module 4: Errors and Exception Handling (4 Lessons)
├── JAVA-034: Errors in Java (Compile-time, runtime, and logical errors with triage)
├── JAVA-035: Throwable, Errors, and Exceptions (Throwable hierarchy, ClassNotFound vs NoClassDefFound)
├── JAVA-036: try, catch, and finally (Control flow, multiple catches, try-with-resources)
└── JAVA-037: throw, throws, and Custom Exceptions (Checked vs unchecked exceptions)

Module 5: Multithreading and Concurrency (3 Lessons)
├── JAVA-039: Threads and Multithreading (Thread vs Runnable, lambdas, start vs run)
├── JAVA-040: Thread Lifecycle and States (Official 6 Thread.State enum states, valid transitions)
└── JAVA-041: Synchronization & Race Conditions (Critical sections, monitor locks, volatile)

Module 6: Java I/O and Data Handling (1 Lesson)
└── JAVA-032: Object Serialization (Serializable, serialVersionUID, transient fields, security)

Module 7: Collections Framework (5 Lessons)
├── JAVA-024: Java Collections Framework Overview (Collection hierarchy, List vs Set vs Map)
├── JAVA-025: List Interface: ArrayList vs LinkedList (Array resizing vs node pointers)
├── JAVA-026: Set Interface: HashSet, LinkedHashSet & TreeSet (Hashing vs Red-Black trees)
├── JAVA-027: Map Interface: HashMap Internals (Array buckets, collision chaining, treeification)
└── JAVA-028: Comparable vs Comparator (Natural sorting vs custom comparator strategies)

Module 8: Modern Java (Java 8 to 21) (10 Lessons)
├── JAVA-047: Java 8 Lambdas & Functional Interfaces (@FunctionalInterface, Predicate, Function)
├── JAVA-048: Java 8 Streams API (filter, map, reduce, collectors, parallel streams)
├── JAVA-049: Java 8 Optional Class (Avoiding NullPointerException, orElse vs orElseGet)
├── JAVA-050: Java 9 Modular System (JPMS, module-info.java, exports, requires)
├── JAVA-051: Java 10 Local Variable Type Inference (var keyword, limitations and best practices)
├── JAVA-052: Java 11 New Features (HTTP/2 client, String methods, Files.readString)
├── JAVA-053: Java 14 Switch Expressions (Arrow syntax, yield keyword, exhaustive switching)
├── JAVA-054: Java 16 Records (Compact data carriers, canonical constructors, immutability)
├── JAVA-055: Java 17 Sealed Classes (sealed, permits, non-sealed, final domain modeling)
└── JAVA-056: Java 21 Virtual Threads & Loom (Carrier threads, continuations, million-thread scale)

Module 9: Build Tools & DevOps (1 In-Depth Lesson)
└── JAVA-057: Apache Maven & Build Management (10 comprehensive sections + interactive diagrams)
```

---

## 🛠️ Apache Maven Deep Dive (`JAVA-057`)

The Maven curriculum covers production build pipelines from first principles:
1. **Core Problem Statement**: Why manual `javac -cp` compilation and JAR hell fail at enterprise scale.
2. **Standard Directory Layout**: `src/main/java`, `src/main/resources`, `src/test/java`, `src/test/resources`, `target/`.
3. **Anatomy of `pom.xml`**: `groupId`, `artifactId`, `version` (GAV coordinate system), packaging, and properties.
4. **Three Built-In Lifecycles**:
   - `clean`: `pre-clean` → `clean` → `post-clean`
   - `default`: `validate` → `compile` → `test` → `package` → `verify` → `install` → `deploy`
   - `site`: `pre-site` → `site` → `post-site` → `site-deploy`
5. **Phase vs Goal Binding**: How Maven delegates work to plugin goals (e.g. `compiler:compile`, `surefire:test`, `jar:jar`).
6. **Repository Architecture**: Local Cache (`~/.m2/repository`) vs Central Repository vs Corporate Remote Mirrors (Nexus/Artifactory).
7. **Dependency Scopes**: `compile`, `provided`, `runtime`, `test`, `system`, and `import`.
8. **Transitive Dependencies & Conflict Resolution**: The `nearest-definition` rule, `<exclusions>`, and dependency trees (`mvn dependency:tree`).
9. **Multi-Module Enterprise Builds**: Parent POM, `<modules>`, `<dependencyManagement>`, and `<pluginManagement>`.
10. **The Maven Wrapper (`mvnw`)**: Reproducible CI/CD execution without pre-installed host binaries.

### Interactive Visual Architectures
- **Interactive Maven Lifecycle & Pipeline Explorer**: 4 dynamic tabs with real-time phase highlighting, artifact flow visualization, and interactive goal inspectability.
- **High-Resolution Maven Build Lifecycle Diagram**: Embedded infographic modal exploring standard pipelines.
- **Java Throwable Hierarchy & Java Thread State Machine**: Interactive visualizers for memory, exception handling, and concurrent states.

---

## 💻 Hands-On Exercises (46 Labs)

46 interactive browser-based labs with real-time test verification:
- **`ex-001` - `ex-015`**: Fundamental syntax, type casting, conditions, loops, array allocation, OOP, enums, lambdas, and object serialization.
- **`ex-016` - `ex-023`**: macOS setup verification, 3-category bug triage, `try-catch-finally`, custom checked exceptions, `Scanner` input, multithreading with lambdas, `synchronized` counter (`2250` increment demo), and thread state inspection (`Thread.State`).
- **`ex-024` - `ex-036`**: Collections, Streams, Optional, Records, Sealed classes, and Virtual Threads.
- **`ex-037` - `ex-046` (Maven Labs)**:
  - `ex-037`: Create standard Maven project layout via CLI.
  - `ex-038`: Author valid POM with GAV coordinates and Java 21 compilation properties.
  - `ex-039`: Add JUnit 5 Jupiter dependency with `<scope>test</scope>`.
  - `ex-040`: Run clean compilation and packaging (`mvn clean package`).
  - `ex-041`: Skip test execution safely during emergency builds (`-DskipTests`).
  - `ex-042`: Resolve dependency version conflicts using `mvn dependency:tree` and `<exclusions>`.
  - `ex-043`: Author Multi-Module POM with `<modules>` and `<packaging>pom</packaging>`.
  - `ex-044`: Centralize versions with `<dependencyManagement>`.
  - `ex-045`: Configure Maven Shade Plugin to build executable fat Uber-JARs.
  - `ex-046`: Bootstrap Maven Wrapper (`mvn wrapper:wrapper`) for portable CI/CD.

---

## 🎯 Technical Interview Question Bank (117 Questions)

117 high-frequency interview questions with:
- **30-Second Screening Summary**: Clear, concise elevator answers for recruiters and phone screens.
- **Deep-Dive JVM Architecture**: Under-the-hood bytecode mechanics, memory layout, and runtime considerations.
- **Follow-up Gotchas**: Common traps, edge cases, and architectural trade-offs.

Includes full coverage of:
- **JVM & Memory**: ClassLoader delegation, Stack vs Heap, Metaspace, GC algorithms, JIT compiler optimizations.
- **OOP & Core Java**: Polymorphism internals, abstract class vs interface, immutability, `equals()` and `hashCode()` contract.
- **Exceptions**: Checked vs unchecked, `NoClassDefFoundError` vs `ClassNotFoundException`, try-with-resources.
- **Concurrency**: Thread states, race conditions, atomic variables, monitor locks, `volatile`, deadlocks, and virtual threads.
- **Collections**: `HashMap` treeification, `ConcurrentHashMap` segment locks, `ArrayList` geometric growth.
- **Maven Architecture (`q-105` to `q-117`)**:
  - `q-105`: Phase vs Goal difference in Maven.
  - `q-106`: Three standard lifecycles and phase ordering.
  - `q-107`: Maven repository resolution sequence (Local → Central → Remote Mirrors).
  - `q-108`: Complete breakdown of all 6 dependency scopes.
  - `q-109`: Transitive dependency mediation and the "nearest-definition" rule.
  - `q-110`: Maven SNAPSHOT vs Release builds.
  - `q-111`: Parent POM inheritance vs Multi-Module reactor builds.
  - `q-112`: `<dependencyManagement>` vs direct `<dependencies>`.
  - `q-113`: Maven Wrapper (`mvnw`) purpose in enterprise CI/CD.
  - `q-114`: Difference between `mvn install` and `mvn deploy`.
  - `q-115`: Packaging executable Uber-JARs (Shade vs Assembly vs Spring Boot plugins).
  - `q-116`: Offline building (`mvn -o`) and dependency purge resolution.
  - `q-117`: Comprehensive architectural comparison: Maven vs Gradle.

---

## 🔍 Instant Global Search (`Cmd+K` or `/`)

The platform features an instant, client-side indexing engine:
- Press `Cmd+K` (macOS), `Ctrl+K` (Windows/Linux), or `/` anywhere on the site.
- Searches across all **48 topics**, **46 exercises**, and **117 interview questions**.
- Matches titles, summaries, keywords, explanation paragraphs, code blocks, bullet points, and key takeaways in real-time.

---

## 📂 Project Architecture

```text
my-interview-learning/
├── public/
│   ├── favicon.svg               # Brand-aligned SVG favicon
│   ├── logo.svg                  # Brand SVG emblem and logo
│   └── images/
│       ├── MIL_Maven_Build_Lifecycle.png   # Maven architecture infographic
│       └── ...
├── src/
│   ├── components/
│   │   ├── exercises/            # Interactive exercise runner and validation
│   │   ├── interview/            # Interview question cards and filters
│   │   ├── layout/               # Header, Footer, Sidebar, Navigation
│   │   ├── learning/             # Topic content reader, code blocks, diagrams
│   │   │   ├── MavenLifecycleDiagram.tsx   # Interactive Maven architecture explorer
│   │   │   ├── ThreadLifecycleDiagram.tsx  # Interactive Thread state explorer
│   │   │   └── ThrowableDiagram.tsx        # Interactive Exception hierarchy explorer
│   │   └── search/               # Global search modal and results
│   ├── config/
│   │   └── site.ts               # Brand constants and platform configuration
│   ├── data/
│   │   ├── topics/               # Modular topic definitions (OOP, Maven, Concurrency, etc.)
│   │   ├── exercises.ts          # 46 Interactive exercise definitions
│   │   ├── interviewQuestions.ts # 117 Real-world technical interview Q&As
│   │   ├── javaTopics.ts         # Java curriculum registry (48 topics)
│   │   └── index.ts              # Aggregated frozen immutable data exports
│   ├── hooks/
│   │   ├── useProgress.ts        # Client-side localStorage progress tracker
│   │   └── useTheme.ts           # Light / Dark mode switcher
│   ├── pages/
│   │   ├── HomePage.tsx          # Dynamic hero, features, tracks, quick start
│   │   ├── LearnPage.tsx         # Curriculum navigator & reader
│   │   ├── ExercisesPage.tsx     # Practice playground
│   │   ├── InterviewPage.tsx     # Question bank explorer
│   │   └── AboutPage.tsx         # Platform philosophy and architecture notes
│   ├── types/                    # TypeScript interfaces and domain models
│   ├── App.tsx                   # Main router and layout shell
│   └── main.tsx                  # React DOM root entry
├── index.html                    # SEO tags, theme flash prevention, favicon links
├── vercel.json                   # Vercel SPA rewrites and security headers
├── package.json                  # Dependencies and scripts
├── tsconfig.json                 # Strict TypeScript configuration
└── vite.config.ts                # Optimized Vite bundler configuration
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

<p align="center">
  Built with ❤️ for developers leveling up their Java expertise and acing technical interviews.
</p>
