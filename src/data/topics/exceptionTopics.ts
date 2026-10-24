import { Topic } from '../../types';

export const EXCEPTION_TOPICS: Topic[] = [
  {
    id: 'java-034-errors-in-java',
    codeNumber: 'JAVA-034',
    languageId: 'java',
    title: 'Errors in Java: Compile-Time, Runtime & Logical',
    slug: 'errors-in-java-compile-runtime-logical',
    category: 'Errors and Exception Handling',
    subcategory: 'Error Fundamentals',
    summary:
      'Categorize and debug the three foundational categories of software flaws: compile-time syntax and type violations, runtime exceptions that abort execution, and silent logical bugs.',
    order: 25,
    estimatedMinutes: 10,
    learningObjectives: [
      'Define what constitutes a software error in Java.',
      'Differentiate compile-time errors, runtime errors, and logical bugs.',
      'Understand how javac detects type incompatibilities before code runs.',
      'Identify common runtime exceptions like ArithmeticException and ArrayIndexOutOfBoundsException.',
      'Explain why not every runtime failure is an Exception (Error vs Exception under Throwable).',
    ],
    whyItMatters:
      'Interviewers evaluate how systematically you diagnose problems. Being able to pinpoint whether a defect is caught by the compiler, thrown by the JVM at runtime, or caused by faulty algorithmic logic demonstrates seasoned engineering maturity.',
    sections: [
      {
        id: 'what-is-an-error',
        title: 'What is an Error in Java?',
        content:
          'In Java, an **error** is a problem that prevents source compilation, interrupts application execution, or causes a program to compute an incorrect result.\n\nFor learning and diagnostic purposes, programming problems are grouped into three primary categories: compile-time errors, runtime errors, and logical errors.',
      },
      {
        id: 'compile-time-error',
        title: '1. Compile-Time Errors',
        content:
          'A compile-time error is detected by `javac` before the bytecode is generated. Common examples include syntax errors, missing semicolons, undeclared identifiers, and assigning incompatible types (such as assigning a String literal to an integer variable).',
        snippet: {
          language: 'java',
          filename: 'Hello.java',
          code: `public class Hello {
    public static void main(String[] args) {
        int age = "twenty"; // Compile-time type error
        System.out.println(age);
    }
}`,
          output: `Hello.java:3: error: incompatible types: String cannot be converted to int
        int age = "twenty";
                  ^
1 error`,
          explanation:
            'The Java compiler enforces static typing. Because "twenty" is a String literal, javac refuses to generate Hello.class and halts the build process.',
        },
      },
      {
        id: 'runtime-error',
        title: '2. Runtime Errors',
        content:
          'A runtime error occurs while the program executes inside the JVM. The syntax and static types are completely valid, so `javac` compiles the file without errors. However, an invalid operation (such as integer division by zero, dereferencing a null pointer, or accessing an invalid array index) triggers a runtime failure.',
        snippet: {
          language: 'java',
          filename: 'Hello.java',
          code: `public class Hello {
    public static void main(String[] args) {
        int result = 10 / 0; // Compiles cleanly, fails at runtime
        System.out.println(result);
    }
}`,
          output: `Exception in thread "main" java.lang.ArithmeticException: / by zero
        at Hello.main(Hello.java:3)`,
          explanation:
            'This program compiles successfully into Hello.class. Upon running "java Hello", the JVM execution engine attempts to compute integer division by zero and throws an ArithmeticException, aborting the main thread.',
        },
      },
      {
        id: 'logical-error',
        title: '3. Logical Errors',
        content:
          'A logical error occurs when code compiles cleanly and executes without any crash or exception, but produces an incorrect result because the developer\'s underlying logic or mathematical formula is flawed.',
        snippet: {
          language: 'java',
          filename: 'Hello.java',
          code: `public class Hello {
    public static void main(String[] args) {
        int price = 100;
        int quantity = 3;
        int total = price + quantity; // Wrong logic! Intended price * quantity
        System.out.println(total);
    }
}`,
          output: `103`,
          explanation:
            'The compiler accepts the addition; the JVM computes 100 + 3 = 103 without throwing an exception. However, 103 is incorrect for an order total of 3 items at $100. The correct logic is price * quantity = 300.',
        },
      },
      {
        id: 'error-comparison-table',
        title: 'Summary Comparison Matrix',
        content: 'Comparing the three error categories across discovery phase, tools, and remediation:',
        table: {
          headers: ['Error Category', 'When Found', 'Example', 'Detection & Fix'],
          rows: [
            ['Compile-time', 'During compilation (javac)', 'Assigning String to int', 'Compiler halts; fix syntax/types'],
            ['Runtime', 'While executing in JVM', '10 / 0 or arr[10]', 'JVM throws Exception/Error; add validation/handling'],
            ['Logical', 'When inspecting program output', 'price + quantity instead of *', 'Discovered via unit testing and code review'],
          ],
        },
        callout: {
          type: 'note',
          title: 'Not Every Runtime Failure is an Exception',
          text: 'In Java, runtime failures belong to the java.lang.Throwable family. While recoverable situations are represented by Exception, serious environment or JVM resource failures belong to Error (e.g. OutOfMemoryError).',
        },
      },
    ],
    commonMistakes: [
      {
        mistake: 'Assuming that if code compiles cleanly, it contains no bugs.',
        fix: 'The compiler only checks syntax and type constraints. Runtime errors (null pointers, division by zero) and logical errors can still occur.',
      },
      {
        mistake: 'Confusing a compile-time type mismatch with a runtime ClassCastException.',
        fix: 'Assigning incompatible literal types is rejected at compile time. ClassCastException occurs at runtime when downcasting an object reference to an incompatible subtype.',
      },
      {
        mistake: 'Using try-catch to mask logical errors.',
        fix: 'Logical errors never throw exceptions. They must be caught by automated unit tests (JUnit) comparing actual vs expected outputs.',
      },
    ],
    keyTakeaways: [
      'Compile-time errors prevent bytecode generation (detected by javac).',
      'Runtime errors occur during JVM execution (throwing Exceptions or Errors).',
      'Logical errors run without throwing exceptions but compute incorrect business results.',
      'Java separates Throwable into Error (unrecoverable environment failures) and Exception (application conditions).',
    ],
    relatedTopicIds: ['java-035-throwable-hierarchy', 'java-036-try-catch-finally'],
    exerciseIds: ['ex-017-fix-errors'],
    interviewQuestionIds: ['q-60-three-error-categories', 'q-61-error-vs-exception'],
    keywords: [
      'Compile-time error',
      'Runtime error',
      'Logical error',
      'javac',
      'ArithmeticException',
      'syntax error',
      'type error',
      'Throwable',
      'Error',
      'Exception',
    ],
  },

  {
    id: 'java-035-throwable-hierarchy',
    codeNumber: 'JAVA-035',
    languageId: 'java',
    title: 'Throwable, Errors, and Exceptions',
    slug: 'throwable-errors-exceptions-hierarchy',
    category: 'Errors and Exception Handling',
    subcategory: 'Architecture & Hierarchy',
    summary:
      'Master the complete java.lang.Throwable class hierarchy. Understand the architectural separation between Error and Exception, checked vs unchecked exceptions, and the critical difference between ClassNotFoundException and NoClassDefFoundError.',
    order: 26,
    estimatedMinutes: 14,
    learningObjectives: [
      'Draw and explain the java.lang.Throwable class hierarchy from Object downward.',
      'Differentiate between java.lang.Error and java.lang.Exception.',
      'Distinguish checked exceptions (compile-time enforced) from unchecked RuntimeExceptions.',
      'Explain the interview-critical distinction: ClassNotFoundException vs NoClassDefFoundError.',
      'Apply proper catch and recovery strategies according to exception categories.',
    ],
    whyItMatters:
      'The Throwable class hierarchy is one of the top five most frequently asked Java interview topics. Interviewers probe whether you understand checked exception declarations, why Errors should not be caught, and the exact difference between ClassNotFoundException and NoClassDefFoundError.',
    sections: [
      {
        id: 'throwable-root',
        title: 'java.lang.Throwable: The Root of Throwables',
        content:
          '`Throwable` is the superclass of all errors and exceptions in the Java language. Only instances of `Throwable` (or one of its subclasses) can be thrown by the JVM or via Java\'s `throw` statement, and only these types can be declared in a `catch` clause.\n\nThe two direct subclasses of `Throwable` are:\n\n• **Error:** Indicates serious problems that a reasonable application should not try to catch. Most represent abnormal JVM or environment conditions (e.g. running out of memory or stack space).\n• **Exception:** Indicates conditions that a reasonable application might want to catch and handle (e.g., file not found, network timeout, invalid user input).\n• **RuntimeException:** A major subclass of `Exception` designating **unchecked exceptions**, which typically represent programming defects or invalid arguments.',
      },
      {
        id: 'hierarchy-diagram',
        title: 'Interactive Throwable Class Hierarchy Diagram',
        content:
          'Below is the official Java Throwable architecture diagram. Click any node to review its compiler enforcement rules and real-world recovery options:',
        customDiagram: 'throwable-hierarchy',
      },
      {
        id: 'checked-vs-unchecked',
        title: 'Checked vs Unchecked Exceptions',
        content:
          'Java divides exceptions into two distinct categories based on whether the compiler enforces handling:',
        table: {
          headers: ['Dimension', 'Checked Exceptions', 'Unchecked Exceptions (RuntimeException)'],
          rows: [
            ['Compiler Enforcement', 'Mandatory: Must catch with try-catch or declare with throws', 'Optional: Compiler does not enforce handling or declaration'],
            ['Class Hierarchy', 'Direct subclasses of Exception (excluding RuntimeException)', 'RuntimeException and all its subclasses'],
            ['Typical Cause', 'External conditions (file missing, database network failure)', 'Programming bugs or illegal arguments (null dereference, 10/0)'],
            ['Examples', 'IOException, SQLException, ClassNotFoundException', 'NullPointerException, ArithmeticException, IllegalArgumentException'],
            ['Best Practice Fix', 'Provide fallback recovery, retry, or user-friendly error message', 'Fix the underlying bug with defensive checks (e.g. if (obj != null))'],
          ],
        },
      },
      {
        id: 'noclassdef-vs-classnotfound',
        title: 'Interview Focus: ClassNotFoundException vs NoClassDefFoundError',
        content:
          'A classic senior interview question is explaining why these two similarly named failures belong to completely different branches of Throwable:',
        bullets: [
          'ClassNotFoundException [Checked Exception]: Thrown when an application attempts to load a class through its string name (e.g. Class.forName("com.mysql.cj.jdbc.Driver") or ClassLoader.loadClass()) but no definition for the specified name could be found in the classpath. Because it is checked, your code must handle or declare it.',
          'NoClassDefFoundError [Error]: Thrown when the JVM execution engine or a ClassLoader tries to load the definition of a class (often as part of normal method call or object instantiation) that was present when the currently executing class was compiled, but cannot be found at runtime. This indicates a broken deployment, missing JAR, or build path mismatch.',
        ],
        callout: {
          type: 'warning',
          title: 'Remember the Distinction',
          text: 'ClassNotFoundException = explicit dynamic lookup failed (checked Exception). NoClassDefFoundError = compiled dependency missing from runtime classpath (unrecoverable Error).',
        },
      },
      {
        id: 'representative-errors',
        title: 'Representative Error Subclasses',
        content:
          'Understanding why applications should not catch Error subclasses:',
        bullets: [
          'OutOfMemoryError: The JVM has exhausted its allocated Heap memory and the Garbage Collector cannot free sufficient space.',
          'StackOverflowError: The executing thread has exceeded its stack frame capacity, almost always due to infinite or excessively deep recursive method calls.',
          'InternalError / VirtualMachineError: A physical or low-level JVM malfunction occurred.',
        ],
      },
    ],
    commonMistakes: [
      {
        mistake: 'Catching java.lang.Error in application try-catch blocks: catch (Error e).',
        fix: 'Never catch Error. Errors signal unrecoverable JVM states. Attempting to swallow them leaves the application in an unpredictable, corrupted state.',
      },
      {
        mistake: 'Assuming ClassNotFoundException and NoClassDefFoundError are the same exception.',
        fix: 'ClassNotFoundException is a checked Exception for dynamic string lookups. NoClassDefFoundError is an Error for missing compiled classes at runtime.',
      },
      {
        mistake: 'Treating RuntimeException as a checked exception that must be declared with throws.',
        fix: 'RuntimeExceptions are unchecked. You may catch them if recovery makes sense, but you are never required to declare them in method signatures.',
      },
    ],
    keyTakeaways: [
      'Throwable is the common root for Error and Exception.',
      'Error indicates serious JVM or environment issues (OutOfMemoryError, StackOverflowError, NoClassDefFoundError).',
      'Checked exceptions extend Exception (excluding RuntimeException) and require try-catch or throws.',
      'Unchecked exceptions extend RuntimeException (NullPointerException, ArithmeticException, IllegalArgumentException).',
      'ClassNotFoundException is a checked Exception; NoClassDefFoundError is an Error.',
    ],
    relatedTopicIds: ['java-034-errors-in-java', 'java-036-try-catch-finally', 'java-037-throw-throws-custom'],
    exerciseIds: ['ex-017-fix-errors'],
    interviewQuestionIds: [
      'q-61-error-vs-exception',
      'q-62-checked-vs-unchecked',
      'q-66-classnotfound-vs-noclassdef',
    ],
    keywords: [
      'Throwable',
      'Error',
      'Exception',
      'RuntimeException',
      'checked exception',
      'unchecked exception',
      'OutOfMemoryError',
      'StackOverflowError',
      'NoClassDefFoundError',
      'ClassNotFoundException',
      'IOException',
      'SQLException',
      'ArithmeticException',
      'NullPointerException',
    ],
  },

  {
    id: 'java-036-try-catch-finally',
    codeNumber: 'JAVA-036',
    languageId: 'java',
    title: 'try, catch, and finally',
    slug: 'try-catch-and-finally',
    category: 'Errors and Exception Handling',
    subcategory: 'Exception Handling',
    summary:
      'Master the try-catch-finally control flow. Understand exact block skipping behavior upon exception throw, multi-catch ordering rules, finally block execution guarantees, and try-with-resources.',
    order: 27,
    estimatedMinutes: 13,
    learningObjectives: [
      'Understand how try blocks monitor code and route exceptions to matching catch blocks.',
      'Explain why later statements inside a try block are skipped once an exception is thrown.',
      'Enforce proper catch hierarchy: specific subclasses must precede broader superclasses.',
      'Explain when and why finally blocks execute, and identify rare scenarios where finally does not run.',
      'Compare standard finally cleanup with modern try-with-resources (AutoCloseable).',
    ],
    whyItMatters:
      'Robust enterprise applications must maintain uptime and prevent resource leaks. Interviewers regularly present tricky try-catch-finally code snippets with multiple exceptions to test your grasp of execution order and cleanup semantics.',
    sections: [
      {
        id: 'block-mechanics',
        title: 'Core Mechanics: try, catch, and finally',
        content:
          'Java\'s structured exception handling consists of three primary keywords:\n\n• **try:** Encloses statements that might throw an exception. If an exception occurs, normal linear execution in the try block immediately terminates and control jumps to a matching catch block.\n• **catch:** Declares an exception type and handles matching occurrences. Multiple catch blocks can follow a single try block.\n• **finally:** Encloses cleanup code that normally executes whenever control leaves the try-catch construct, whether execution completed normally, threw a caught exception, or threw an uncaught exception.',
      },
      {
        id: 'execution-order-example',
        title: 'Complete Execution Order Walkthrough',
        content:
          'Save and analyze the following program to observe what happens when multiple potential exception lines exist inside a single try block:',
        snippet: {
          language: 'java',
          filename: 'Hello.java',
          code: `public class Hello {
    public static void main(String[] args) {
        try {
            int a = 10;
            int b = 0;
            int c = a / b;
            System.out.println("Result: " + c);

            int[] arr = new int[5];
            arr[10] = 50;

            String str = null;
            System.out.println(str.length());
        } catch (ArithmeticException e) {
            System.out.println("Arithmetic exception: " + e.getMessage());
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("Array exception: " + e.getMessage());
        } catch (Exception e) {
            System.out.println("Other exception: " + e.getMessage());
        } finally {
            System.out.println("This block is normally executed.");
        }
    }
}`,
          output: `Arithmetic exception: / by zero
This block is normally executed.`,
          explanation:
            'Critical insight: Only the first exception is reached! Once "a / b" throws ArithmeticException, execution jumps immediately to the matching catch block. The rest of the try block (the array assignment and the str.length() call) is completely skipped. To test each exception individually, separate try-catch blocks are required.',
        },
      },
      {
        id: 'catch-ordering-rules',
        title: 'Catch Block Ordering: Specific Before General',
        content:
          'Java evaluates catch blocks sequentially from top to bottom. You must always order **specific subclass exceptions before broader parent exceptions**.',
        callout: {
          type: 'warning',
          title: 'Unreachable Code Compile Error',
          text: 'If you place "catch (Exception e)" above "catch (ArithmeticException e)", the compiler rejects the program with an "unreachable catch block" error because ArithmeticException is a subclass of Exception and would never be reached.',
        },
      },
      {
        id: 'finally-guarantees',
        title: 'When Does the finally Block Execute?',
        content:
          'The `finally` block is designed for cleanup (closing sockets, releasing database locks, or writing audit trails). It executes:\n\n1. When the try block completes normally.\n2. When an exception is caught and handled in a catch block.\n3. Even if a return statement is encountered inside try or catch (finally runs before the method actually returns to caller!).\n4. Even if an uncaught exception propagates out of the method.',
        bullets: [
          'Does finally ALWAYS run? Almost always, but NOT if the JVM abruptly halts via System.exit(0), native crash, process SIGKILL, or OS power failure.',
        ],
      },
      {
        id: 'try-with-resources',
        title: 'Modern Alternative: try-with-resources',
        content:
          'Introduced in Java 7, try-with-resources automatically closes any resource implementing `java.lang.AutoCloseable` (such as FileInputStream or Connection). It is cleaner, safer, and avoids verbose null-checks in finally blocks:',
        snippet: {
          language: 'java',
          filename: 'AutoCloseableDemo.java',
          code: `import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class AutoCloseableDemo {
    public static void main(String[] args) {
        // reader is automatically closed when exiting the try block
        try (BufferedReader reader = new BufferedReader(new FileReader("data.txt"))) {
            System.out.println(reader.readLine());
        } catch (IOException e) {
            System.out.println("I/O error: " + e.getMessage());
        }
    }
}`,
          explanation:
            'try-with-resources closes resources in reverse order of declaration and suppresses secondary exceptions rather than masking primary exceptions.',
        },
      },
    ],
    commonMistakes: [
      {
        mistake: 'Placing catch (Exception e) before catch (ArithmeticException e).',
        fix: 'Always order specific subclasses before general superclasses; otherwise the compiler throws an "unreachable catch block" error.',
      },
      {
        mistake: 'Assuming lines after an exception inside a try block will still execute.',
        fix: 'An exception causes control to immediately exit the try block. Downstream lines inside the same try block are never executed.',
      },
      {
        mistake: 'Using finally to close resources without checking for null or handling nested exceptions.',
        fix: 'Use modern try-with-resources with AutoCloseable instead of manual close() calls in finally.',
      },
    ],
    keyTakeaways: [
      'try monitors code; matching catch handles the exception; finally executes cleanup.',
      'Only the first thrown exception in a try block is processed; remaining lines are skipped.',
      'Catch specific exceptions before broader ones to prevent unreachable code errors.',
      'finally executes before method returns, but can be bypassed by System.exit(0) or JVM crash.',
      'try-with-resources is the modern standard for closing AutoCloseable resources.',
    ],
    relatedTopicIds: ['java-034-errors-in-java', 'java-035-throwable-hierarchy', 'java-037-throw-throws-custom'],
    exerciseIds: ['ex-018-arithmetic-safe-division'],
    interviewQuestionIds: [
      'q-63-catch-ordering-rule',
      'q-64-finally-bypass-conditions',
      'q-024-try-catch-finally',
    ],
    keywords: [
      'try',
      'catch',
      'finally',
      'ArithmeticException',
      'ArrayIndexOutOfBoundsException',
      'Exception',
      'try-with-resources',
      'AutoCloseable',
      'System.exit',
      'resource cleanup',
      'unreachable catch',
    ],
  },

  {
    id: 'java-037-throw-throws-custom',
    codeNumber: 'JAVA-037',
    languageId: 'java',
    title: 'throw, throws, and Custom Exceptions',
    slug: 'throw-throws-and-custom-exceptions',
    category: 'Errors and Exception Handling',
    subcategory: 'Exception Design',
    summary:
      'Differentiate the throw statement from the throws clause, define domain-specific checked and unchecked custom exceptions, and propagate exceptions cleanly across application layers.',
    order: 28,
    estimatedMinutes: 12,
    learningObjectives: [
      'Understand the exact purpose and syntax of the throw statement.',
      'Use the throws clause in method declarations to declare checked exceptions to callers.',
      'Create custom checked exceptions extending java.lang.Exception.',
      'Create custom unchecked exceptions extending java.lang.RuntimeException.',
      'Distinguish throw, throws, and Throwable in technical interviews.',
    ],
    whyItMatters:
      'Production systems use domain-specific exceptions (e.g., InsufficientFundsException, OrderNotFoundException) to communicate domain failures cleanly. Knowing whether to make them checked or unchecked is a foundational software design skill.',
    sections: [
      {
        id: 'throw-statement',
        title: '1. The throw Statement',
        content:
          '`throw` is an action keyword used to explicitly throw an exception object *at that specific moment in code*. It is typically invoked when input validation or business rules detect an illegal state.',
        snippet: {
          language: 'java',
          filename: 'Hello.java',
          code: `public class Hello {
    public static void main(String[] args) {
        int age = 15;
        try {
            if (age < 18) {
                throw new IllegalArgumentException("Age must be at least 18.");
            }
            System.out.println("Allowed");
        } catch (IllegalArgumentException e) {
            System.out.println("Validation failed: " + e.getMessage());
        }
    }
}`,
          output: `Validation failed: Age must be at least 18.`,
          explanation:
            'The throw keyword instantiates and throws a new IllegalArgumentException instance. Execution halts immediately and jumps to the matching catch block.',
        },
      },
      {
        id: 'throws-clause',
        title: '2. The throws Clause',
        content:
          '`throws` is part of a method signature declaration. It informs callers that this method may propagate one or more listed checked exceptions. It does not throw an exception by itself—it delegates responsibility to the caller.',
        snippet: {
          language: 'java',
          filename: 'Hello.java',
          code: `import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

public class Hello {
    // Declares that readFile may pass an IOException up to its caller
    static String readFile(String fileName) throws IOException {
        return Files.readString(Path.of(fileName));
    }

    public static void main(String[] args) {
        try {
            System.out.println(readFile("message.txt"));
        } catch (IOException e) {
            System.out.println("Could not read file: " + e.getMessage());
        }
    }
}`,
          explanation:
            'Because Files.readString() throws checked IOException, readFile() must either catch it internally or declare "throws IOException" in its header.',
        },
      },
      {
        id: 'custom-checked-exception',
        title: '3. Creating a Custom Checked Exception',
        content:
          'To create a custom checked exception, declare a class that extends `java.lang.Exception`. Callers must either catch it or declare it in their method signature with `throws`.',
        snippet: {
          language: 'java',
          filename: 'Hello.java',
          code: `// Custom Checked Exception
class MyException extends Exception {
    public MyException(String message) {
        super(message);
    }
}

public class Hello {
    public static void main(String[] args) {
        int c = 5;
        try {
            if (c > 0) {
                throw new MyException("Result is greater than zero.");
            }
            System.out.println("Result is zero or negative.");
        } catch (MyException e) {
            System.out.println("Exception: " + e.getMessage());
        }
    }
}`,
          output: `Exception: Result is greater than zero.`,
          explanation:
            'Because MyException extends Exception (and NOT RuntimeException), it is a checked exception. If you remove the try-catch block without declaring "throws MyException" on main(), the program will not compile.',
        },
      },
      {
        id: 'custom-unchecked-exception',
        title: '4. Creating a Custom Unchecked Exception',
        content:
          'To create a custom unchecked exception, extend `java.lang.RuntimeException`. Callers are not required to declare it in method headers or wrap calls in try-catch.',
        snippet: {
          language: 'java',
          filename: 'InvalidAgeException.java',
          code: `public class InvalidAgeException extends RuntimeException {
    public InvalidAgeException(String message) {
        super(message);
    }
}`,
          explanation:
            'Modern Java frameworks (e.g. Spring Boot) heavily favor unchecked custom exceptions because they avoid cluttering method signatures with checked exception throws clauses.',
        },
      },
      {
        id: 'terminology-summary',
        title: 'Summary: Key Exception Terminology',
        content: 'Quick reference matrix for technical interview distinction:',
        table: {
          headers: ['Term', 'Nature', 'Role & Meaning'],
          rows: [
            ['throw', 'Keyword / Statement', 'Explicitly throws a single exception object at runtime'],
            ['throws', 'Keyword / Method Header', 'Declares possible checked exceptions in a method signature'],
            ['Throwable', 'Base Class', 'Root superclass of Error and Exception in java.lang'],
            ['try', 'Keyword / Block', 'Encloses code to monitor for exceptions'],
            ['catch', 'Keyword / Block', 'Handles a matching thrown exception object'],
            ['finally', 'Keyword / Block', 'Encloses cleanup code that normally executes on exit'],
          ],
        },
      },
    ],
    commonMistakes: [
      {
        mistake: 'Confusing throw and throws in technical interview questions.',
        fix: 'throw is an action inside a method body (throw new Exception()); throws is a declaration in the method signature (void run() throws IOException).',
      },
      {
        mistake: 'Extending Throwable directly when creating a custom exception.',
        fix: 'Never extend Throwable directly. Extend Exception for checked exceptions or RuntimeException for unchecked exceptions.',
      },
      {
        mistake: 'Creating checked exceptions for recoverable programming bugs.',
        fix: 'Use unchecked exceptions (RuntimeException) for programming bugs and validation errors. Use checked exceptions when the caller can realistically recover.',
      },
    ],
    keyTakeaways: [
      'throw explicitly triggers an exception now.',
      'throws declares that a method may pass an exception up the call stack.',
      'Extending Exception creates a checked custom exception; extending RuntimeException creates an unchecked custom exception.',
      'Pass descriptive error messages to super(message) to preserve diagnostic context.',
    ],
    relatedTopicIds: ['java-034-errors-in-java', 'java-035-throwable-hierarchy', 'java-036-try-catch-finally'],
    exerciseIds: ['ex-019-invalid-age-exception'],
    interviewQuestionIds: ['q-65-throw-vs-throws', 'q-62-checked-vs-unchecked'],
    keywords: [
      'throw',
      'throws',
      'custom exception',
      'Exception',
      'RuntimeException',
      'checked exception',
      'unchecked exception',
      'IllegalArgumentException',
      'MyException',
      'InvalidAgeException',
    ],
  },
];
