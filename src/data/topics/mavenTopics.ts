import { Topic } from '../../types';

export const MAVEN_TOPICS: Topic[] = [
  {
    id: 'java-maven-build-management',
    codeNumber: 'JAVA-057',
    languageId: 'java',
    title: 'Maven — Build and Dependency Management',
    slug: 'maven-build-and-dependency-management',
    category: 'Build Tools & Project Architecture',
    subcategory: 'Apache Maven & Build Automation',
    summary:
      'Master Apache Maven for Java and Spring Boot applications. Understand pom.xml configuration, standard project layouts, dependency resolution, local vs remote repositories, build lifecycles, and JAR vs WAR packaging.',
    order: 48,
    estimatedMinutes: 24,
    learningObjectives: [
      'Explain what Apache Maven is, why automated dependency management replaced manual JAR downloads, and the exact purpose of pom.xml.',
      'Differentiate JAR vs WAR packaging, including library JARs, executable Spring Boot JARs, and external servlet container WAR deployments.',
      'Navigate and apply the Maven standard directory structure: src/main/java, src/main/resources, src/test/java, and ephemeral target/ output.',
      'Install, verify, and diagnose Maven on macOS and Windows, including PATH and JAVA_HOME configuration, plus cloud/CI build environments.',
      'Generate projects using mvn archetype:generate with complete parameter understanding (groupId, artifactId, archetypeArtifactId, archetypeVersion).',
      'Declare dependencies with proper coordinates and understand scopes (compile, test, runtime, provided) and transitive dependency trees.',
      'Trace repository architecture: Local cache (~/.m2/repository), Maven Central, and private remote repositories.',
      'Execute and distinguish core lifecycle phases and commands: clean, validate, compile, test, package, clean package, verify, install, and deploy.',
      'Run packaged executable JARs (java -jar target/app.jar) and trace a real-world Spring Boot Stock Management System build flow.',
    ],
    whyItMatters:
      'Maven is the enterprise backbone of Java build engineering. Virtually every corporate Java, Spring Boot, and microservice backend relies on Maven (or Gradle) for repeatable compiling, testing, packaging, and CI/CD automation. Technical interviewers frequently test dependency resolution, lifecycle phase sequences, and build failure triage.',
    sections: [
      {
        id: 'maven-overview-benefits',
        title: '1. Definition, Importance, and Enterprise Benefits',
        content:
          'Apache Maven is an open-source build automation and project management tool widely adopted across enterprise Java ecosystems. It uses a declarative Project Object Model represented in an XML file named `pom.xml` to manage every facet of a project: dependencies, plugins, compiler levels, testing harnesses, and artifact packaging.\n\nHistorically, Java developers had to download third-party `.jar` files manually from vendor websites, store them in local `lib/` folders, and configure IDE classpaths by hand. This caused severe production failures:',
        bullets: [
          '**Transitive Dependency Chaos:** If library A requires library B version 2.0, but library C requires library B version 1.2, manual downloads inevitably led to missing class definitions (`NoClassDefFoundError`) or runtime bytecode clashes (`NoSuchMethodError`).',
          '**Inconsistent Team Builds:** "It works on my machine" occurred constantly because developers had differing versions of JARs scattered across local directories.',
          '**Bloated Version Control:** Storing hundreds of megabytes of compiled binary JARs inside Git repositories bloated repository sizes and slowed down cloning.',
          '**Automated Build Discipline:** Maven guarantees that anyone running `mvn clean package` on macOS, Windows, Linux, or a GitHub Actions runner gets the exact same repeatable compiled artifact.',
        ],
        callout: {
          type: 'warning',
          title: 'Realistic Boundaries: What Maven Does NOT Do',
          text: 'Maven automates configured build, test, and packaging steps. It does NOT write unit tests for you, generate business logic, create database tables, or guarantee that your application will execute without runtime bugs.',
        },
      },
      {
        id: 'jar-vs-war',
        title: '2. JAR vs WAR: Packaging, Deployment, and Modern Spring Boot',
        content:
          'Java applications are compiled into compressed archives based on the ZIP file format. The two primary archive types are **JAR** and **WAR**:',
        table: {
          headers: ['Feature', 'JAR (Java Archive)', 'WAR (Web Application Archive)'],
          rows: [
            ['Primary Purpose', 'Reusable Java libraries, CLI tools, & self-contained apps', 'Web applications deployed to servlet containers'],
            ['Internal Layout', 'Compiled `.class` files, `META-INF/MANIFEST.MF`, resources', '`WEB-INF/classes`, `WEB-INF/lib` (bundled JARs), `web.xml`'],
            ['Servlet Container', 'Embedded container (e.g. embedded Tomcat in Spring Boot)', 'External container required (Apache Tomcat, WildFly, Jetty)'],
            ['Execution Command', '`java -jar app.jar` (if executable manifest present)', 'Deployed directly into container `webapps/` directory'],
            ['Spring Boot Usage', 'Modern default (packaging: `jar` with embedded Tomcat)', 'Supported via `SpringBootServletInitializer` for legacy servers'],
            ['Packaging Tag', '`<packaging>jar</packaging>` (Default in Maven)', '`<packaging>war</packaging>` (Requires maven-war-plugin)'],
          ],
        },
        bullets: [
          '**Key Clarification 1:** JAR is NOT only for reusable libraries. In modern Spring Boot cloud-native architecture, production services are almost universally packaged as executable fat JARs containing an embedded servlet container.',
          '**Key Clarification 2:** WAR is NOT required for every web application. You only need a WAR if your organizational policy requires deploying multiple apps into a shared standalone application server.',
        ],
      },
      {
        id: 'standard-directory-structure',
        title: '3. Maven Standard Directory Structure (Convention over Configuration)',
        content:
          'Maven strictly adheres to **Convention over Configuration**. By defining a uniform folder structure, any developer or CI/CD server can immediately navigate and build any Maven project without reading custom scripts:',
        snippet: {
          language: 'text',
          filename: 'Standard Maven Project Hierarchy',
          code: `my-project/
├── pom.xml                     # Central Project Object Model configuration
├── src/
│   ├── main/
│   │   ├── java/               # Application Java source files (com/company/...)
│   │   └── resources/          # Config files (application.properties, XML, SQL)
│   └── test/
│       ├── java/               # Test source code (Unit & Integration tests)
│       └── resources/          # Test-specific properties & mock fixtures
└── target/                     # Ephemeral build output generated by Maven
    ├── classes/                # Compiled .class bytecode from src/main/java
    ├── test-classes/           # Compiled .class bytecode from src/test/java
    ├── surefire-reports/       # Unit test execution reports (XML/TXT)
    └── my-project-1.0.0.jar    # Final packaged deployable artifact`,
          explanation:
            'src/main contains production code; src/test contains test code. The target/ directory contains all compiler outputs and packaged archives; it is completely ephemeral and must be added to .gitignore.',
        },
        bullets: [
          '`src/main/java`: Holds all production Java packages and classes.',
          '`src/main/resources`: Holds configuration files (such as `application.properties`, `logback.xml`) that Maven automatically copies to the root of the classpath in `target/classes`.',
          '`src/test/java`: Holds test classes (e.g. `StockServiceTest.java`). These files are executed during `mvn test` but are NEVER packaged into the final production JAR.',
          '`target/`: The generated build directory. Running `mvn clean` permanently deletes this entire folder.',
        ],
      },
      {
        id: 'installing-maven-local-and-cloud',
        title: '4. Installing & Verifying Maven Locally (macOS, Windows, and Cloud CI)',
        content:
          'Maven is a pure Java application; therefore, it strictly requires a compatible **Java Development Kit (JDK)** installed on your operating system before running.',
        snippet: {
          language: 'bash',
          filename: 'Terminal Installation Commands',
          code: `# 1. Verify JDK is installed and compiler is ready:
java -version
javac -version

# --- macOS Installation (via Homebrew) ---
brew install maven

# Verify Maven installation:
mvn -version

# --- Troubleshooting macOS PATH & JAVA_HOME ---
# If mvn reports "JAVA_HOME is not set", configure in ~/.zshrc:
export JAVA_HOME=$(/usr/libexec/java_home -v 21)
export PATH="/opt/homebrew/bin:$PATH"

# --- Windows Verification ---
# 1. Download Apache Maven Binary ZIP from https://maven.apache.org/download.cgi
# 2. Extract to C:\\Program Files\\apache-maven-3.9.x
# 3. Open System Environment Variables:
#    Set JAVA_HOME = C:\\Program Files\\Java\\jdk-21
#    Append to Path = %MAVEN_HOME%\\bin
# 4. Open fresh CMD or PowerShell:
mvn -version`,
          output: `Apache Maven 3.9.6 (bc0240f3c744dd6b6ec2923b37cbcc54b23e94cd)
Maven home: /opt/homebrew/Cellar/maven/3.9.6/libexec
Java version: 21.0.2, vendor: Homebrew, runtime: /opt/homebrew/Cellar/openjdk@21/21.0.2/libexec/openjdk.jdk/Contents/Home
Default locale: en_US, platform encoding: UTF-8
OS name: "mac os x", version: "14.3.1", arch: "aarch64", family: "mac"`,
          explanation:
            'mvn -version outputs Maven version, Maven installation directory, and the active JDK being utilized. Ensure Java version points to a full JDK, not an incomplete JRE.',
        },
        bullets: [
          '**Cloud / CI / AWS Builds:** In GitHub Actions, Jenkins, or AWS CodeBuild, Maven runs in a headless Linux container. CI pipelines require the exact same prerequisites: a configured JDK step (`actions/setup-java`), Maven CLI access, repository network access, and build credentials.',
          '**Environment Variable Rule:** Never point `JAVA_HOME` to a standalone JRE directory. Maven requires the Java compiler (`javac`) found exclusively within a JDK.',
        ],
      },
      {
        id: 'generating-maven-project',
        title: '5. Generating a Project with mvn archetype:generate',
        content:
          'Maven provides project scaffolding templates called **Archetypes**. Instead of creating files manually, generate a complete standard project in one terminal command:',
        snippet: {
          language: 'bash',
          filename: 'Archetype Generation Command',
          code: `mvn archetype:generate \\
  -DgroupId=com.suhel.stock \\
  -DartifactId=stock-management \\
  -DarchetypeArtifactId=maven-archetype-quickstart \\
  -DarchetypeVersion=1.5 \\
  -DinteractiveMode=false

# Navigate into the newly scaffolded project directory:
cd stock-management

# Run your first clean compile and package:
mvn clean package`,
          output: `[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time:  2.145 s
[INFO] Finished at: 2026-10-24T12:00:00Z
[INFO] ------------------------------------------------------------------------`,
          explanation:
            'Generates a standardized Java project with pom.xml, App.java in src/main/java, and AppTest.java in src/test/java, ready for compilation.',
        },
        bullets: [
          '`archetype:generate`: Tells Maven to invoke the generate goal of the maven-archetype-plugin.',
          '`-DgroupId=com.suhel.stock`: Identifies your organization or domain namespace in reverse-domain notation. Controls package paths.',
          '`-DartifactId=stock-management`: Unique identifier for this specific project or module. Determines root directory name and default artifact filename.',
          '`-DarchetypeArtifactId=maven-archetype-quickstart`: Specifies the starter template to use (standard Java SE application).',
          '`-DarchetypeVersion=1.5`: The version of the archetype template itself (NOT the JDK version or Maven CLI version).',
          '`-DinteractiveMode=false`: Tells Maven to accept all command-line arguments without pausing to prompt the developer with interactive questions.',
        ],
      },
      {
        id: 'pom-xml-and-dependencies',
        title: '6. pom.xml Coordinates, Dependencies, and Scopes',
        content:
          'The `pom.xml` (Project Object Model) file is the single source of truth for your Maven project. Every project and library in the Maven ecosystem is uniquely identified by **GAV coordinates** (GroupId, ArtifactId, Version):',
        snippet: {
          language: 'xml',
          filename: 'pom.xml',
          code: `<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 
         http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <!-- 1. Project Coordinates -->
    <groupId>com.suhel.stock</groupId>
    <artifactId>stock-management</artifactId>
    <version>1.0.0</version>
    <packaging>jar</packaging>

    <properties>
        <maven.compiler.source>21</maven.compiler.source>
        <maven.compiler.target>21</maven.compiler.target>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    </properties>

    <!-- 2. Dependencies Declaration -->
    <dependencies>
        <!-- Requested Spring Core Dependency Example -->
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-core</artifactId>
            <version>6.2.12</version>
            <scope>compile</scope>
        </dependency>

        <!-- Test Scope Dependency -->
        <dependency>
            <groupId>org.junit.jupiter</groupId>
            <artifactId>junit-jupiter</artifactId>
            <version>5.10.2</version>
            <scope>test</scope>
        </dependency>
    </dependencies>
</project>`,
          explanation:
            'Maven automatically resolves spring-core 6.2.12 along with its transitive dependency (commons-logging) and downloads them into the local cache.',
        },
        bullets: [
          '`groupId`: Represents the vendor or organization (e.g. `org.springframework`).',
          '`artifactId`: Represents the specific library module name (e.g. `spring-core`).',
          '`version`: The exact release version being pulled (e.g. `6.2.12`).',
          '**compile (Default Scope):** Available on all classpaths (compilation, testing, runtime). Bundled into the final artifact.',
          '**test Scope:** Available ONLY when compiling and running unit tests (e.g. `junit-jupiter`, `mockito`). Stripped out from the production JAR.',
          '**provided Scope:** Required for compilation but provided by the runtime environment (e.g. `jakarta.servlet-api` provided by Tomcat). Not bundled into the JAR.',
          '**runtime Scope:** Not needed for compilation, but required during execution (e.g. database JDBC drivers like `org.postgresql:postgresql`).',
          '**Transitive Dependencies:** When your project depends on `spring-core`, Maven automatically inspects `spring-core`\'s POM and downloads all libraries it requires (such as `commons-logging`). Inspect full tree with: `mvn dependency:tree`.',
        ],
      },
      {
        id: 'repositories-architecture',
        title: '7. Repository Architecture: Local Cache, Central, and Remote',
        content:
          'Maven uses a three-tier repository hierarchy to manage and resolve dependencies across development teams and production pipelines:',
        bullets: [
          '**Local Repository (`~/.m2/repository`):** A directory on your local workstation that acts as an offline cache. When a library is requested, Maven looks here first. If present, it skips network downloads completely.',
          '**Maven Central Repository:** The canonical, public, open-source repository hosted by the Apache Maven community (`repo.maven.apache.org`). Contains millions of published Java libraries.',
          '**Remote / Enterprise Repositories:** Private internal artifact servers (such as Sonatype Nexus, JFrog Artifactory, or AWS CodeArtifact) hosted behind corporate firewalls to share proprietary organizational libraries securely.',
          '**Critical Publishing Rule:** Maven does NOT automatically upload your locally built JARs to Maven Central. Publishing an artifact to Central requires GPG signature verification, an approved Sonatype OSSRH namespace, and an explicit `mvn deploy` configuration with security credentials in `~/.m2/settings.xml`.',
        ],
        snippet: {
          language: 'bash',
          filename: 'Inspecting Local Repository Cache',
          code: `# Inspect your local Maven cache on macOS/Linux:
ls -la ~/.m2/repository/org/springframework/spring-core/6.2.12/

# On Windows:
dir "%USERPROFILE%\\.m2\\repository\\org\\springframework\\spring-core\\6.2.12"`,
          output: `spring-core-6.2.12.jar
spring-core-6.2.12.pom
_remote.repositories`,
          explanation:
            'Once downloaded, JAR files reside permanently in your local ~/.m2 directory for lightning-fast subsequent builds.',
        },
      },
      {
        id: 'maven-lifecycles-phases-goals',
        title: '8. Build Lifecycles, Phases, Goals, and Core Commands',
        content:
          'A **Lifecycle** in Maven is an ordered sequence of named stages called **Phases**. A **Goal** is a specific, concrete task executed by a plugin (for example, `compiler:compile` or `surefire:test`) bound to a lifecycle phase.\n\nMaven features three built-in lifecycles: **Clean**, **Default**, and **Site**:',
        customDiagram: 'maven-lifecycle',
        bullets: [
          '**Phase vs Goal:** A Phase is an abstract step in the lifecycle (like `compile` or `package`). A Goal is the actual plugin code that does the work (like `maven-compiler-plugin:compile`). Binding goals to phases allows Maven to execute tasks in strict sequence.',
          '**Sequential Precedence Rule:** Invoking any lifecycle phase automatically executes every preceding phase in that lifecycle. Running `mvn package` automatically runs `validate`, `compile`, and `test` first!',
          '`mvn clean`: Deletes the `target/` directory. Does NOT touch source code.',
          '`mvn compile`: Compiles Java source files in `src/main/java` to `target/classes`. Does NOT create a JAR.',
          '`mvn test`: Runs unit tests using the maven-surefire-plugin. Build fails immediately if any test fails.',
          '`mvn package`: Compiles, tests, and packages code into `target/app.jar` or `target/app.war`.',
          '`mvn clean package`: Best practice for fresh builds. Deletes stale build artifacts before compiling and packaging.',
          '`mvn verify`: Runs integration tests (maven-failsafe-plugin) and checks packaging quality criteria.',
          '`mvn install`: Packages the project and installs the resulting JAR into your local `~/.m2/repository` cache so other local projects can depend on it.',
          '`mvn deploy`: Copies the final packaged artifact to the remote repository for team-wide or production release. Requires repository configuration and authentication.',
        ],
      },
      {
        id: 'build-output-and-execution',
        title: '9. Inspecting Build Output & Running Packaged Applications',
        content:
          'When `mvn package` completes successfully, all generated artifacts reside in the `target/` folder:',
        snippet: {
          language: 'bash',
          filename: 'Executing Packaged Artifact',
          code: `# Inspect target directory contents:
ls -lh target/

# Run an executable Spring Boot application or manifest JAR:
java -jar target/stock-management-1.0.0.jar`,
          output: `  .   ____          _            __ _ _
 /\\\\ / ___'_ __ _ _(_)_ __  __ _ \\ \\ \\ \\
( ( )\\___ | '_ | '_| | '_ \\/ _\` | \\ \\ \\ \\
 \\\\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::                (v3.2.3)

2026-10-24 12:05:00 [main] INFO  c.s.s.StockManagementApplication - Started StockManagementApplication in 1.482 seconds`,
          explanation:
            'java -jar reads the embedded META-INF/MANIFEST.MF to find the Main-Class entry point and launches the JVM runtime.',
        },
        callout: {
          type: 'tip',
          title: 'Library JAR vs Executable Fat JAR',
          text: 'Running java -jar only works if the archive contains a valid Main-Class entry in its manifest (or is a Spring Boot fat JAR packaged with spring-boot-maven-plugin). Ordinary library JARs do not contain main entry points and cannot be executed directly.',
        },
      },
      {
        id: 'stock-management-real-world-flow',
        title: '10. Stock Management System: Real-World Enterprise Build Flow',
        content:
          'To understand how Maven functions in commercial microservices, consider our production **Spring Boot Stock Management System**:',
        snippet: {
          language: 'text',
          filename: 'End-to-End Build Pipeline Walkthrough',
          code: `[Step 1: Developer declares dependencies in pom.xml]
  ├── spring-boot-starter-web (REST endpoints)
  ├── spring-boot-starter-data-jpa (Database entities)
  └── postgresql (Database runtime driver)
       │
       ▼
[Step 2: Maven resolves dependencies transitively]
  └── Resolves 40+ transitive JARs (Jackson, Hibernate, HikariCP, Tomcat)
  └── Pulls from ~/.m2/repository (or downloads from Maven Central if missing)
       │
       ▼
[Step 3: Continuous Integration (CI) Pipeline runs: mvn clean verify]
  ├── clean: Wipes old target/ directory
  ├── compile: Compiles 85 Java service and controller classes
  ├── test: Surefire runs 120 unit test assertions
  ├── package: Repackages compiled bytecode into stock-management-1.0.0.jar
  └── verify: Failsafe executes integration tests against test containers
       │
       ▼
[Step 4: Containerization & Deployment]
  └── Dockerfile copies target/stock-management-1.0.0.jar into container
  └── Container entrypoint launches: java -jar /app/stock-management-1.0.0.jar`,
          explanation:
            'Maven handles the entire pipeline deterministically, guaranteeing that local developer laptops and cloud Kubernetes nodes run identical verified bytecode.',
        },
        bullets: [
          '**Clear Responsibility Separation:** Maven packages the application JAR, but your Spring Boot application code and database migration scripts (Flyway/Liquibase) create database tables and execute runtime SQL queries.',
          '**CI/CD Pipeline Standardization:** In modern DevOps, GitHub Actions or Jenkins simply invokes `mvn clean verify`. If any unit test or checkstyle rule fails, the build breaks before deployment.',
        ],
      },
    ],
    commonMistakes: [
      {
        mistake: 'Assuming mvn compile creates the final runnable JAR or WAR archive',
        fix: 'mvn compile only compiles Java source code to target/classes/. You must run mvn package to run tests and bundle the classes into a JAR or WAR archive.',
      },
      {
        mistake: 'Committing the target/ directory into Git source control',
        fix: 'target/ contains ephemeral compiled binaries that bloat Git repositories. Always add target/ to your project .gitignore file.',
      },
      {
        mistake: 'Setting JAVA_HOME to a standalone JRE directory instead of a full JDK',
        fix: 'Maven requires the javac compiler located in a full JDK installation (e.g. /opt/homebrew/opt/openjdk@21 or C:\\Program Files\\Java\\jdk-21).',
      },
      {
        mistake: 'Confusing test scope dependencies with production compile dependencies',
        fix: 'Dependencies declared with <scope>test</scope> (like JUnit or Mockito) are never bundled into the production JAR. Trying to import test classes in src/main/java results in compile errors.',
      },
      {
        mistake: 'Believing that running mvn install publishes your library to Maven Central',
        fix: 'mvn install only copies the artifact into your local machine\'s ~/.m2/repository cache. Publishing to Maven Central requires GPG keys, sonatype credentials, and running mvn deploy.',
      },
    ],
    keyTakeaways: [
      'Apache Maven is an industry-standard build automation tool driven declaratively by pom.xml.',
      'Convention over Configuration enforces standardized layouts: src/main/java, src/main/resources, src/test/java, and target/.',
      'Local repository cache (~/.m2/repository) accelerates builds by avoiding redundant network downloads from Maven Central.',
      'Dependencies are uniquely defined by GAV coordinates: GroupId, ArtifactId, and Version.',
      'Transitive dependencies are resolved automatically; use mvn dependency:tree to audit versions and conflicts.',
      'Lifecycles consist of sequential phases: running a later phase (e.g. package) automatically triggers all earlier phases (validate, compile, test).',
      'mvn clean deletes generated target/ output to guarantee fresh, predictable compilations.',
      'Modern Spring Boot microservices typically package as executable JARs containing embedded servlet containers.',
    ],
    relatedTopicIds: [
      'java-033-macos-jdk-setup',
      'java-001-jvm-jdk-jre-memory',
      'java-054-var-type-inference',
      'java-056-record-classes',
    ],
    exerciseIds: [
      'ex-037-maven-verify-versions',
      'ex-038-maven-archetype-command',
      'ex-039-maven-project-structure',
      'ex-040-maven-add-dependency',
      'ex-041-maven-compile-output',
      'ex-042-maven-run-tests',
      'ex-043-maven-clean-package',
      'ex-044-maven-package-vs-install',
      'ex-045-maven-diagnose-pom-error',
      'ex-046-maven-ci-cd-pipeline',
    ],
    interviewQuestionIds: [
      'q-105-what-is-maven-benefits',
      'q-106-what-is-pom-xml',
      'q-107-dependencies-and-transitive',
      'q-108-phase-vs-goal',
      'q-109-explain-maven-lifecycle-phases',
      'q-110-repositories-local-central-remote',
      'q-111-jar-vs-war-packaging',
      'q-112-mvn-clean-package-importance',
      'q-113-where-is-build-output-stored',
      'q-114-does-compile-create-jar',
      'q-115-does-maven-generate-unit-tests',
      'q-116-dependency-conflict-resolution',
      'q-117-ci-build-fails-local-passes-scenario',
    ],
    keywords: [
      'maven',
      'pom.xml',
      'build automation',
      'jar vs war',
      'dependencies',
      'transitive dependencies',
      'maven lifecycle',
      'clean package',
      'mvn compile',
      'mvn test',
      'local repository',
      'm2 repository',
      'maven central',
      'archetype generate',
      'surefire plugin',
      'stock management system',
    ],
  },
];
