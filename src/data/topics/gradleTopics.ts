import { Topic } from '../../types';

export const GRADLE_TOPICS: Topic[] = [
  {
    id: 'java-gradle-build-automation',
    codeNumber: 'JAVA-058',
    languageId: 'java',
    title: 'Gradle Build Automation, Groovy DSL & Spring Boot Workflow',
    slug: 'java-gradle-build-automation',
    category: 'Build Tools & DevOps',
    subcategory: 'Build Systems',
    order: 49,
    estimatedMinutes: 25,
    summary:
      'Master Gradle build automation from first principles: Groovy DSL build.gradle, the Gradle Wrapper (gradlew), dependency resolution, task dependency graphs (DAG), and packaging executable Spring Boot JARs.',
    whyItMatters:
      'Gradle powers the build pipelines of modern enterprise microservices, Android applications, and high-performance CI/CD systems. Its incremental compilation, in-memory Daemon, and Directed Acyclic Graph (DAG) deliver builds up to 10x faster than traditional build tools.',
    keyTakeaways: [
      'Gradle uses a Directed Acyclic Graph (DAG) of task dependencies, enabling granular incremental builds.',
      'Always use the Gradle Wrapper (./gradlew or gradlew.bat) to ensure byte-for-byte reproducible builds without requiring a pre-installed host binary.',
      'build.gradle (Groovy DSL) configures plugins, repositories (mavenCentral), dependency configurations (implementation vs testImplementation), and Java toolchains.',
      'The Gradle Daemon runs as a background process to avoid cold JVM startup overhead during repeated local development builds.',
      'Running ./gradlew bootRun spins up the embedded server at http://localhost:8080, while ./gradlew build packages a production executable fat JAR under build/libs/.',
    ],
    sections: [
      {
        id: 'gradle-foundations',
        title: '1. What is Gradle & Why Modern Teams Choose It',
        content:
          'Gradle is an open-source, high-performance build automation and dependency management system designed for multi-language, multi-project software engineering. Unlike Apache Maven, which uses declarative and rigid XML (`pom.xml`), Gradle provides expressive, programmatic Domain-Specific Languages: **Groovy DSL** (`build.gradle`) and **Kotlin DSL** (`build.gradle.kts`).\n\nGradle does not install frameworks globally on your operating system; instead, it resolves declared dependencies per-project into a local cache and orchestrates compiling, testing, static analysis, and artifact packaging.\n\n### Core Capabilities of Gradle:\n- **Repeatable & Deterministic Builds**: Ensures every developer and CI/CD agent builds identical artifacts regardless of environment differences.\n- **Granular Incremental Compilation**: Tracks exact cryptographic hashes of inputs and outputs for every task. If inputs have not changed, tasks execute in 0 milliseconds and are marked `UP-TO-DATE` or `FROM-CACHE`.\n- **Multi-Project Reactor Support**: Efficiently orchestrates enterprise monolithic repositories containing dozens of shared domain libraries and web services.\n- **Extensible Task Model**: Any custom pipeline step (Docker image generation, database schema migration, security scanning) can be declared as a first-class task.',
        bullets: [
          'Groovy DSL (build.gradle) offers flexible, concise syntax with optional parentheses and string interpolation.',
          'Kotlin DSL (build.gradle.kts) provides static typing, IDE autocompletion, and compile-time script safety.',
          'Maven vs Gradle: Maven uses strict sequential lifecycle phases; Gradle constructs an in-memory Directed Acyclic Graph (DAG) of task dependencies.',
          'Default dependency cache location: ~/.gradle/caches on macOS/Linux and %USERPROFILE%\\.gradle\\caches on Windows.',
        ],
        callout: {
          type: 'note',
          title: 'Architectural Difference from Maven',
          text: 'Maven binds plugin goals to a fixed linear lifecycle (validate → compile → test → package). Gradle models the build as a Directed Acyclic Graph (DAG) where tasks declare explicitly which other tasks they depend on. This allows Gradle to parallelize independent tasks and skip unchanged work.',
        },
      },
      {
        id: 'gradle-workflow-architecture',
        title: '2. The 3 Phases of the Gradle Build Lifecycle',
        content:
          'Every Gradle execution passes through three distinct phases: **Initialization**, **Configuration**, and **Execution**. Understanding these three phases is essential for debugging builds and writing custom tasks.',
        customDiagram: 'gradle-workflow',
        bullets: [
          'Phase 1: Initialization — Executes settings.gradle, identifies root project and subprojects, and creates Project descriptor instances.',
          'Phase 2: Configuration — Executes build.gradle for each project, evaluates plugins, configures dependencies, and constructs the execution DAG.',
          'Phase 3: Execution — Executes only the tasks required by the CLI invocation in topological order. Checks task cache before running work.',
        ],
        image: {
          src: '/images/MIL_Gradle_Workflow_Diagram.png',
          alt: 'MIL Gradle Build Automation and Workflow Architecture Diagram',
          caption: 'Figure 58.1: Full Gradle Build Workflow — Source to Execution Pipeline and Daemon Architecture',
        },
      },
      {
        id: 'gradle-wrapper',
        title: '3. The Gradle Wrapper (gradlew) — Zero Host Dependency',
        content:
          'The **Gradle Wrapper** (`gradlew` for macOS/Linux and `gradlew.bat` for Windows) is the industry standard for invoking Gradle builds. It is committed directly into the project source code repository alongside a small wrapper properties file.\n\n### Why Teams Must Prefer the Wrapper:\n1. **Identical Distribution**: Guarantees that every developer, build server, and CI/CD runner executes the exact same Gradle version, eliminating *"works on my machine"* anomalies.\n2. **Zero Setup**: Developers and automated pipelines do not need Gradle pre-installed on the host machine. The wrapper automatically downloads, unpacks, and caches the configured Gradle binary upon first execution.\n3. **Frictionless Upgrades**: Upgrading Gradle across the entire engineering team requires only updating `gradle/wrapper/gradle-wrapper.properties` in a single Git commit.',
        snippet: {
          language: 'bash',
          filename: 'Terminal — Gradle Wrapper Verification',
          code: `# Verify installed JDK toolchain on your machine
java -version

# Check the Gradle Wrapper version (downloads Gradle distribution on first run)
# On macOS / Linux:
./gradlew --version

# On Windows PowerShell or Command Prompt:
.\\gradlew.bat --version`,
          output: `------------------------------------------------------------
Gradle 8.7
------------------------------------------------------------

Build time:   2024-03-22 15:52:46 UTC
Revision:     650af95ecd95288a2277daec1942e160436422f3

Kotlin:       1.9.23
Groovy:       3.0.21
Ant:          Apache Ant(TM) version 1.10.13
JVM:          21.0.2 (Homebrew 21.0.2)
OS:           Mac OS X 14.4.1 aarch64`,
          explanation:
            'The wrapper detects whether the required distribution exists in ~/.gradle/wrapper/dists. If absent, it downloads the zip, verifies the hash, and invokes the build transparently.',
        },
        bullets: [
          'Wrapper files: gradlew (UNIX shell script), gradlew.bat (Windows batch file), gradle/wrapper/gradle-wrapper.jar, and gradle-wrapper.properties.',
          'To generate or upgrade wrapper: ./gradlew wrapper --gradle-version 8.7',
          'For optional standalone host install, consult official installation docs at https://gradle.org/install/.',
        ],
      },
      {
        id: 'build-gradle-anatomy',
        title: '4. Anatomy of build.gradle (Groovy DSL) for Spring Boot',
        content:
          'A standard Spring Boot application generated via Spring Initializr (`start.spring.io`) with the **Gradle - Groovy** option produces a clean, declarative `build.gradle` file. Here is the reference configuration for Java 21 with Spring Web:',
        snippet: {
          language: 'groovy',
          filename: 'build.gradle',
          code: `plugins {
    id 'java'
    id 'org.springframework.boot' version '3.3.0'
    id 'io.spring.dependency-management' version '1.1.5'
}

group = 'com.suhel'
version = '0.0.1-SNAPSHOT'

java {
    toolchain {
        languageVersion = JavaLanguageVersion.of(21)
    }
}

repositories {
    mavenCentral()
}

dependencies {
    // Production dependency for embedded Tomcat, Spring MVC, and Jackson REST
    implementation 'org.springframework.boot:spring-boot-starter-web'

    // Testing starter with JUnit 5 Jupiter, AssertJ, and Mockito
    testImplementation 'org.springframework.boot:spring-boot-starter-test'
}

tasks.named('test') {
    useJUnitPlatform()
}`,
          explanation:
            'Breakdown of configuration blocks:\n- plugins: Applies the Java compilation plugin and Spring Boot plugin which configures the bootJar and bootRun tasks.\n- toolchain: Enforces JDK 21 compilation regardless of the host machine default Java version.\n- repositories: Declares Maven Central as the artifact registry for downloading external JARs.\n- implementation: Library is compiled into code and bundled into the runtime classpath, but not exposed transitively to consumers.\n- useJUnitPlatform: Instructs the test task to launch tests using the modern JUnit 5 Jupiter engine.',
        },
        callout: {
          type: 'warning',
          title: 'Version Sensitivity Notice',
          text: 'Do not copy the version numbers literally from tutorials. When initializing your project on https://start.spring.io/, keep the latest stable production versions generated by Spring Initializr to ensure compatibility with your JDK.',
        },
      },
      {
        id: 'essential-gradle-commands',
        title: '5. Essential Gradle CLI Commands & Output Directory',
        content:
          'The table below summarizes the core commands every developer uses daily when building, testing, and debugging Gradle applications:',
        table: {
          headers: ['Command', 'Lifecycle Stage', 'Purpose & Output'],
          rows: [
            ['./gradlew tasks', 'Introspection', 'Lists all available tasks categorized by group (build, verification, application).'],
            ['./gradlew clean', 'Clean', 'Deletes the project build/ directory, forcing a fresh recompilation.'],
            ['./gradlew compileJava', 'Compile', 'Compiles production Java source code into build/classes/java/main.'],
            ['./gradlew test', 'Verification', 'Runs automated unit tests and outputs HTML reports to build/reports/tests/test/index.html.'],
            ['./gradlew assemble', 'Packaging', 'Compiles and packages artifacts without executing automated test suites.'],
            ['./gradlew build', 'Full Pipeline', 'Executes assemble and test. Generates production fat JAR in build/libs/.'],
            ['./gradlew bootRun', 'Execution', 'Launches the Spring Boot application locally with active console logs on port 8080.'],
            ['./gradlew bootJar', 'Packaging', 'Packages the executable Spring Boot fat JAR with nested BOOT-INF classes and lib dependencies.'],
            ['./gradlew dependencies', 'Diagnostics', 'Prints the complete hierarchical dependency tree with resolved version conflict details.'],
          ],
        },
        bullets: [
          'On Windows, use gradlew.bat <task> (e.g., gradlew.bat bootRun). On macOS and Linux, use ./gradlew <task>.',
          'Output directory: All generated bytecode, resources, test reports, and JAR binaries are stored in build/. Never commit build/ to Git.',
          'To pass arguments to the application: ./gradlew bootRun --args="--server.port=9090"',
          'To run a single test class: ./gradlew test --tests "com.example.demo.CalculatorTest"',
        ],
      },
      {
        id: 'hello-world-browser',
        title: '6. Building & Running Hello World in the Browser',
        content:
          'Let us follow the step-by-step workflow to bootstrap a Gradle project and verify it running in your web browser:\n\n### Step 1: Generate Project on Spring Initializr\n- Navigate to [https://start.spring.io/](https://start.spring.io/).\n- **Project**: Gradle - Groovy\n- **Language**: Java\n- **Spring Boot**: 3.3.x (Latest stable)\n- **Project Metadata**: Group = `com.example`, Artifact = `demo`\n- **Java**: 21\n- **Dependencies**: Add **Spring Web**\n- Click **Generate** (Ctrl+Enter / Cmd+Enter), download the `.zip`, and extract it into your workspace.\n\n### Step 2: Add REST HelloController\nUnder `src/main/java/com/example/demo/`, add `HelloController.java`:',
        snippet: {
          language: 'java',
          filename: 'src/main/java/com/example/demo/HelloController.java',
          code: `package com.example.demo;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    @GetMapping("/")
    public String hello() {
        return "Hello World from Gradle + Spring Boot!";
    }
}`,
          explanation:
            '@RestController marks the class as a web controller where return values are written directly into the HTTP response body. @GetMapping("/") maps HTTP GET requests at the root path.',
        },
        bullets: [
          'Step 3: Run the application via terminal: ./gradlew bootRun (Windows: gradlew.bat bootRun)',
          'Step 4: Open your browser and navigate to http://localhost:8080/. You will see "Hello World from Gradle + Spring Boot!".',
          'Step 5: Stop the server by pressing Ctrl + C in your terminal.',
          'Step 6: Build the production artifact with ./gradlew clean build. Locate the executable JAR in build/libs/demo-0.0.1-SNAPSHOT.jar.',
          'Step 7: Run the standalone JAR directly with java -jar build/libs/demo-0.0.1-SNAPSHOT.jar.',
        ],
      },
      {
        id: 'enterprise-scenario',
        title: '7. Real-World Enterprise Scenario: Warehouse Management (WMS)',
        content:
          'In an enterprise Warehouse Management System (WMS), Gradle multi-project builds are used to orchestrate complex logistics workflows:\n- `:wms-common`: Shared domain models (SKU, Pallet, StorageBin).\n- `:wms-core`: Inventory allocation algorithms and database persistence.\n- `:wms-api`: Spring Boot REST microservice exposing warehouse picking endpoints.\n\nUsing Gradle task caching, if an engineer modifies only a picking algorithm in `:wms-core`, running `./gradlew :wms-api:build` re-compiles only `:wms-core` and `:wms-api`, while retrieving pre-compiled artifacts for unchanged shared modules from the Gradle build cache.',
        snippet: {
          language: 'groovy',
          filename: 'settings.gradle — Multi-Project Reactor',
          code: `rootProject.name = 'enterprise-wms'

include 'wms-common'
include 'wms-core'
include 'wms-api'`,
          explanation:
            'settings.gradle evaluates first in the Initialization phase, configuring the subprojects participating in the reactor build.',
        },
        bullets: [
          'Enables modular microservice architecture with fast parallel compiles.',
          'Centralizes dependency versions across multiple sub-modules.',
        ],
      },
      {
        id: 'common-mistakes',
        title: '8. Common Mistakes & Gotchas',
        content:
          'Watch out for these common Gradle and Spring Boot pitfalls encountered in production environments:',
        bullets: [
          'Hardcoding global Gradle: Never invoke raw "gradle build" if gradlew is present. Raw gradle may execute an incompatible global version.',
          'Missing useJUnitPlatform(): If you omit tasks.named("test") { useJUnitPlatform() }, Gradle will not discover or execute JUnit 5 tests, reporting 0 tests executed.',
          'Placing Controller outside Application package: If HelloController is in com.example.controllers while DemoApplication is in com.example.demo, Spring Boot component scanning will skip the controller, resulting in 404 Not Found.',
          'Committing the build/ directory: Always ensure build/ and .gradle/ are listed in your .gitignore.',
          'Assuming Gradle replaces Maven repositories: Gradle is a build tool; it still downloads artifacts from Maven Central and corporate Nexus/Artifactory repositories.',
        ],
      },
    ],
    exerciseIds: ['ex-047-gradle-bootrun-command'],
    interviewQuestionIds: ['q-120-gradle-vs-maven-architecture'],
    relatedTopicIds: ['java-maven-build-management', 'java-spring-boot-overview-lifecycle'],
    learningObjectives: [
      'Understand the architecture of Gradle and how it differs from Apache Maven',
      'Master the 3 phases of the Gradle build lifecycle (Initialization, Configuration, Execution)',
      'Use the Gradle Wrapper (./gradlew) for reproducible builds across machines',
      'Configure build.gradle using Groovy DSL with repositories, dependencies, and plugins',
      'Run and package Spring Boot applications using bootRun and build tasks',
    ],
    commonMistakes: [
      {
        mistake: 'Invoking global "gradle build" directly instead of the wrapper "./gradlew build"',
        fix: 'Always use "./gradlew" or "gradlew.bat" so all developers and CI runners use the exact bundled Gradle version.',
      },
      {
        mistake: 'Omitting "useJUnitPlatform()" in the test task block',
        fix: 'Add tasks.named("test") { useJUnitPlatform() } to build.gradle; otherwise JUnit 5 tests will be skipped silently.',
      },
      {
        mistake: 'Committing the build/ or .gradle/ directories to Git version control',
        fix: 'Add build/ and .gradle/ to your repository .gitignore.',
      },
    ],
    keywords: [
      'gradle',
      'gradle wrapper',
      'gradlew',
      'build.gradle',
      'groovy dsl',
      'dag',
      'directed acyclic graph',
      'daemon',
      'bootrun',
      'up-to-date',
      'incremental build',
    ],
  },
];
