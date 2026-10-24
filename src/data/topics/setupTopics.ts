import { Topic } from '../../types';

export const SETUP_TOPICS: Topic[] = [
  {
    id: 'java-033-setup-macos',
    codeNumber: 'JAVA-033',
    languageId: 'java',
    title: 'Java Setup on macOS',
    slug: 'java-setup-macos',
    category: 'Setup and First Program',
    subcategory: 'Environment Setup',
    summary:
      'Install a modern JDK on Apple Silicon (ARM64) or Intel (x64) Mac, verify java and javac in Terminal, configure JAVA_HOME in zsh, and compile and execute your first Hello World program.',
    order: 1,
    estimatedMinutes: 10,
    learningObjectives: [
      'Understand the roles of the JDK, JVM, and modern runtime packaging.',
      'Check existing macOS Java versions using Terminal commands and /usr/libexec/java_home.',
      'Select and install a trusted prebuilt JDK distribution (Eclipse Temurin or Oracle JDK) for your CPU architecture.',
      'Configure JAVA_HOME and PATH in ~/.zshrc cleanly without duplicate entries.',
      'Create, compile, and run Hello.java from Terminal and verify Hello.class bytecode.',
    ],
    whyItMatters:
      'A properly configured JDK is essential for all Java development. If javac is missing from your PATH, build tools fail and IDEs cannot locate standard libraries. Understanding the CLI compiler lifecycle builds confidence for technical interviews.',
    sections: [
      {
        id: 'jdk-jre-jvm-overview',
        title: 'Core Concepts: JDK, JVM, and JRE',
        content:
          'Before installing tools, understand the distinct responsibilities of each component in the Java toolchain:\n\n• **JDK (Java Development Kit):** The complete software development package containing developer tools such as `javac` (the compiler), `java` (the application launcher), `jdb` (debugger), and `jar` (archive packager).\n• **JVM (Java Virtual Machine):** The runtime execution engine that loads, verifies, and executes Java bytecode, translating instructions into native CPU machine code via JIT compilation and interpretation.\n• **JRE (Java Runtime Environment):** A traditional term for runtime libraries and the JVM required to run compiled Java applications. Modern JDK distributions (Java 11+) package runtime components directly within the JDK without separate end-user JRE installers; modern JVMs are modular runtime engines, not literally a "library of the JRE".',
        bullets: [
          'JDK = Development Tools (javac, jar, jdb) + Modular Runtime Libraries + JVM',
          'JVM = Executes bytecode (.class) on host operating system with automatic memory management',
          'Modern distributions package the full JDK directly for developers',
        ],
      },
      {
        id: 'check-installation',
        title: '1. Check Existing Installation on macOS',
        content:
          'Open Terminal on macOS (via Spotlight Cmd+Space -> Terminal) and run the following three diagnostic commands:',
        snippet: {
          language: 'bash',
          filename: 'Terminal Commands',
          code: `java -version
javac -version
/usr/libexec/java_home -V`,
          output: `openjdk version "21.0.2" 2024-01-16
OpenJDK Runtime Environment Temurin-21.0.2+13 (build 21.0.2+13)
OpenJDK 64-Bit Server VM Temurin-21.0.2+13 (build 21.0.2+13, mixed mode)
javac 21.0.2
Matching Java Virtual Machines (1):
    21.0.2 (arm64) "Eclipse Adoptium" - "OpenJDK 21.0.2" /Library/Java/JavaVirtualMachines/temurin-21.jdk/Contents/Home`,
          explanation:
            'If java prints a version but javac returns "command not found", you only have a minimal JRE or an incomplete PATH. A full JDK installation is required to compile source code.',
        },
      },
      {
        id: 'install-jdk',
        title: '2. Install a Prebuilt JDK for macOS',
        content:
          'Download a trusted prebuilt macOS installer (.pkg) from a certified vendor such as Eclipse Temurin (Adoptium) or Oracle JDK. Choose your target LTS version (e.g., JDK 21 LTS or JDK 25) matching your project requirements.\n\nBe sure to download the build that matches your Mac hardware architecture:\n• **Apple Silicon (M1, M2, M3, M4):** Choose **ARM64 / AArch64**\n• **Intel Mac:** Choose **x64**\n\nDouble-click the downloaded `.pkg` installer to install into `/Library/Java/JavaVirtualMachines/`. Prebuilt installers do not require a full Xcode installation (which saves 15+ GB of disk space).',
        callout: {
          type: 'tip',
          title: 'Prebuilt Installer vs Package Manager Build',
          text: 'Using a trusted prebuilt .pkg installer from Adoptium/Eclipse Temurin avoids package managers (like Homebrew) attempting to build OpenJDK from source, which would require the full Xcode IDE developer suite.',
        },
      },
      {
        id: 'configure-environment',
        title: '3. Set Environment Variables in zsh',
        content:
          'macOS uses `zsh` as its default shell. To set `JAVA_HOME` for your current Terminal session:',
        snippet: {
          language: 'bash',
          filename: 'Terminal (Current Session)',
          code: `export JAVA_HOME=$(/usr/libexec/java_home)
export PATH="$JAVA_HOME/bin:$PATH"`,
          output: `echo $JAVA_HOME
# /Library/Java/JavaVirtualMachines/temurin-21.jdk/Contents/Home`,
          explanation:
            '/usr/libexec/java_home is an Apple-provided utility that dynamically resolves the location of the active JDK on macOS.',
        },
        bullets: [
          'To persist this configuration across all Terminal windows, append those two export lines to ~/.zshrc.',
          'Reload your configuration using: source ~/.zshrc',
          'Note: If source ~/.zshrc prints "command not found: compdef", that is an existing zsh completion configuration issue, not a Java installation failure. Verify java -version and javac -version independently.',
          'Avoid adding duplicate export lines repeatedly to ~/.zshrc.',
        ],
      },
      {
        id: 'hello-world-nano',
        title: '4. Create, Compile, and Run Hello World',
        content:
          'Create a dedicated directory for your Java practice and create `Hello.java` using nano or your text editor of choice:',
        snippet: {
          language: 'bash',
          filename: 'Terminal Commands',
          code: `mkdir -p ~/JavaPractice
cd ~/JavaPractice
nano Hello.java`,
        },
      },
      {
        id: 'hello-java-code',
        title: 'Hello.java Source Code',
        content:
          'Enter the standard Java entry point in `Hello.java`. Remember: the public class name (`Hello`) must match the file name (`Hello.java`) with exact case sensitivity.',
        snippet: {
          language: 'java',
          filename: 'Hello.java',
          code: `public class Hello {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
          output: `Hello, World!`,
          explanation:
            'Save in nano using Ctrl+O, press Enter to confirm filename, then exit with Ctrl+X.',
        },
      },
      {
        id: 'compile-and-run',
        title: 'Compile with javac and Run with java',
        content:
          'Compile the source file into platform-independent bytecode, then invoke the JVM:',
        snippet: {
          language: 'bash',
          filename: 'Terminal Compilation & Launch',
          code: `javac Hello.java
java Hello`,
          output: `Hello, World!`,
          explanation:
            'javac Hello.java creates Hello.class containing bytecode. Launch the program using "java Hello" without the .class extension.',
        },
        table: {
          headers: ['Command', 'Input File', 'Output / Result', 'Key Rule'],
          rows: [
            ['javac Hello.java', 'Hello.java (source)', 'Hello.class (bytecode)', 'Filename must match public class name'],
            ['java Hello', 'Hello.class (bytecode)', 'Executes main() on host JVM', 'Omit the .class extension when launching'],
            ['/usr/libexec/java_home -V', 'System query', 'Lists all installed JDKs', 'Useful for switching between JDK 17/21'],
          ],
        },
      },
    ],
    commonMistakes: [
      {
        mistake: 'Running "java Hello.class" instead of "java Hello".',
        fix: 'The java command accepts the fully qualified class name, not the filename. Run "java Hello" without the .class extension.',
      },
      {
        mistake: 'Mismatched class name and file name (e.g., public class Main inside Hello.java).',
        fix: 'In Java, a public class must reside in a file with the exact same name (case-sensitive) plus the .java extension.',
      },
      {
        mistake: 'Assuming "command not found: compdef" during zsh reload means Java failed to install.',
        fix: 'compdef is an Oh-My-Zsh / shell autocompletion function. Test java -version and javac -version separately to confirm Java installation.',
      },
    ],
    keyTakeaways: [
      'The JDK contains both the compiler (javac) and execution tools (java); the JVM is the runtime engine.',
      'On Apple Silicon Macs, download ARM64 builds for maximum native CPU performance.',
      'Use /usr/libexec/java_home to dynamically locate the active JDK path on macOS.',
      'javac Hello.java produces bytecode (.class); java Hello executes the bytecode on the JVM.',
    ],
    relatedTopicIds: ['java-001-jvm-jdk', 'java-002-primitives-types'],
    exerciseIds: ['ex-016-setup-hello-world'],
    interviewQuestionIds: ['q-58-jdk-jre-jvm', 'q-59-public-class-file-rule'],
    keywords: [
      'macOS setup',
      'JDK install',
      'javac',
      'JAVA_HOME',
      '/usr/libexec/java_home',
      'zshrc',
      'Hello World',
      'Apple Silicon',
      'ARM64',
      'x64',
      'Temurin',
      'Adoptium',
      'Hello.class',
      'bytecode',
    ],
  },

  {
    id: 'java-001-jvm-jdk',
    codeNumber: 'JAVA-001',
    languageId: 'java',
    title: 'Java Execution, JVM, JRE & JDK',
    slug: 'java-execution-jvm-jre-jdk',
    category: 'Setup and First Program',
    subcategory: 'Architecture',
    summary:
      'Understand how Java code transforms from source code (.java) into bytecode (.class) and runs on any operating system via the JVM execution engine.',
    order: 2,
    estimatedMinutes: 8,
    learningObjectives: [
      'Trace the complete lifecycle of Java code from source to OS execution.',
      'Differentiate clearly between JVM, JRE, and JDK.',
      'Explain how platform independence works via bytecode.',
      'Understand the roles of the Class Loader, Bytecode Verifier, and JIT Compiler.',
    ],
    whyItMatters:
      'Writing efficient Java code requires understanding where your code runs. Grasping the JVM runtime prevents false assumptions about memory, portability, and compilation errors.',
    sections: [
      {
        id: 'lifecycle',
        title: 'The Java Execution Lifecycle',
        content:
          'Java source code is written in `.java` plain text files. The Java compiler (`javac`) reads these files, checks syntax and type constraints, and produces platform-agnostic bytecode saved in `.class` files. When you execute the program, the Java Virtual Machine (JVM) loads the bytecode, verifies its integrity, translates it into machine code (via an Interpreter and Just-In-Time (JIT) compiler), and executes it on the host OS.',
        bullets: [
          'Developer writes readable Java source in App.java',
          'javac App.java compiles source into App.class containing bytecode',
          'JVM class loader loads App.class into JVM memory',
          'Bytecode Verifier ensures security and prevents illegal memory access',
          'Execution Engine (Interpreter + JIT) executes instructions on host OS & CPU',
        ],
      },
      {
        id: 'components',
        title: 'JVM vs JRE vs JDK Breakdown',
        content: 'These three acronyms represent nested layers of the Java ecosystem:',
        bullets: [
          'JVM (Java Virtual Machine): The engine that executes bytecode. It provides memory management, garbage collection, and runtime security.',
          'JRE (Java Runtime Environment): The traditional runtime package containing the JVM plus standard core class libraries. Modern distributions package runtime components directly in the JDK.',
          'JDK (Java Development Kit): The full developer toolkit containing the compiler (javac), launcher (java), debugger (jdb), archiver (jar), and documentation tools.',
        ],
        callout: {
          type: 'note',
          title: 'Modern JDK Packaging',
          text: 'Since Java 11, JDK distributions ship primarily as a complete developer kit. Do not describe the JVM literally as a "library of the JRE"; modern JVMs are modular runtime engines.',
        },
      },
      {
        id: 'platform-independence',
        title: 'Platform Independence: Write Once, Run Anywhere (WORA)',
        content:
          'C and C++ compile directly into CPU-specific machine binaries (x86, ARM, etc.), meaning an executable compiled on macOS will not run natively on Windows. Java achieves portability because the Java compiler targets the standardized JVM virtual instruction set. As long as a compatible JVM exists for Windows, Linux, or macOS, the same `.class` bytecode runs unchanged.',
        callout: {
          type: 'warning',
          title: 'JVM Itself is Platform-Dependent',
          text: 'While Java bytecode is platform-independent, the JVM software itself is platform-specific. You download the macOS JVM for Mac and Windows JVM for PC.',
        },
      },
      {
        id: 'execution-engine',
        title: 'Interpreter vs JIT Compiler',
        content:
          'The JVM execution engine uses a hybrid approach to combine fast startup with maximum sustained execution performance:',
        bullets: [
          'Interpreter: Reads and executes bytecode instructions line by line immediately upon application launch.',
          'JIT (Just-In-Time) Compiler: Identifies "hot spots" (frequently called methods and tight loops) and compiles that bytecode directly into native CPU machine code at runtime.',
          'HotSpot JVM: Balances rapid startup via interpretation with near-C++ execution speeds for long-running server processes.',
        ],
      },
    ],
    commonMistakes: [
      {
        mistake: 'Believing that Java bytecode is executed directly by the CPU.',
        fix: 'Bytecode is an intermediate language for the JVM. The JVM translates bytecode into machine code for your physical CPU.',
      },
      {
        mistake: 'Assuming you need both a separate JRE and a JDK installed.',
        fix: 'The JDK includes the complete runtime engine and libraries. Installing the JDK gives you everything necessary.',
      },
    ],
    keyTakeaways: [
      'javac compiles .java to platform-independent .class bytecode.',
      'JVM translates bytecode into CPU instructions via interpretation and JIT compilation.',
      'Bytecode is portable; the JVM itself is platform-specific.',
      'A JDK is required for developing and compiling; JRE was the historic runtime-only bundle.',
    ],
    relatedTopicIds: ['java-033-setup-macos', 'java-002-primitives-types'],
    exerciseIds: ['ex-001-hello-world'],
    interviewQuestionIds: ['q-001-jvm-role', 'q-002-wora-mechanics', 'q-58-jdk-jre-jvm'],
    keywords: [
      'JVM',
      'JRE',
      'JDK',
      'javac',
      'bytecode',
      '.class',
      'WORA',
      'JIT Compiler',
      'HotSpot',
      'Class Loader',
      'Bytecode Verifier',
    ],
  },
];
