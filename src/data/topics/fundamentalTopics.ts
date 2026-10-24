import { Topic } from '../../types';

export const FUNDAMENTAL_TOPICS: Topic[] = [
{
    id: 'java-002-primitives-types',
    codeNumber: 'JAVA-002',
    languageId: 'java',
    title: 'Primitive Types, Variables, Casting & Operators',
    slug: 'primitive-types-variables-casting-operators',
    category: 'Java Fundamentals',
    subcategory: 'Data & Control',
    summary: 'Master Java eight primitive types, bit sizes, explicit type casting wraparounds, character math, and conditional decision making.',
    order: 3,
    estimatedMinutes: 12,
    learningObjectives: [
      'List all 8 primitive types with exact memory sizes and ranges.',
      'Differentiate widening (implicit) and narrowing (explicit) type casting.',
      'Understand the 8-bit wraparound formula when casting to byte.',
      'Work with character arithmetic based on ASCII/UTF-16 code units.',
      'Apply operators and conditional control flow (if-else, switch, ternary).',
    ],
    whyItMatters: 'Every algorithm, inventory stock check, or financial calculation in Java begins with variables and primitives. Understanding memory boundaries prevents silent arithmetic overflow and precision loss.',
    sections: [
      {
        id: 'eight-primitives',
        title: 'The 8 Primitive Data Types',
        content: 'Java is strongly typed. Variables must be declared with a data type before assignment. Primitives store raw binary values directly in memory (often in stack frames), unlike objects which hold memory references.',
        bullets: [
          'byte: 1 byte (8 bits) [-128 to 127]',
          'short: 2 bytes (16 bits) [-32,768 to 32,767]',
          'int: 4 bytes (32 bits) [-2,147,483,648 to 2,147,483,647] — Default for whole numbers',
          'long: 8 bytes (64 bits) [-2^63 to 2^63 - 1] — Suffix with L (e.g., 8000000000L)',
          'float: 4 bytes (32 bits) [~6-7 significant decimal digits] — Suffix with f (e.g., 99.5f)',
          'double: 8 bytes (64 bits) [~15-16 significant decimal digits] — Default for floating point',
          'char: 2 bytes (16 bits) [0 to 65,535] — Single UTF-16 code unit, enclosed in single quotes \'A\'',
          'boolean: JVM-dependent storage [true or false]',
        ],
      },
      {
        id: 'variable-declarations',
        title: 'Declaring Variables with Literals',
        content: 'Demonstrating clean declarations in an e-commerce context:',
        snippet: {
          language: 'java',
          filename: 'ECommerceVariables.java',
          code: `public class ECommerceVariables {
    public static void main(String[] args) {
        int age = 25;
        double salary = 45000.50;
        char grade = 'A';
        boolean active = true;
        long population = 8000000000L; // Suffix 'L' required for long literals
        float price = 99.5f;           // Suffix 'f' required for float literals

        System.out.println("Customer Age: " + age);
        System.out.println("Product Price: $" + price);
        System.out.println("Account Active: " + active);
    }
}`,
          output: `Customer Age: 25
Product Price: $99.5
Account Active: true`,
        },
      },
      {
        id: 'type-casting',
        title: 'Type Casting: Widening vs Narrowing & The Byte Wraparound',
        content: 'Widening casting (e.g. int -> double) is automatic because larger types safely contain smaller types. Narrowing casting (e.g. double -> int or int -> byte) requires explicit syntax (targetType) value and can lose information.',
        snippet: {
          language: 'java',
          filename: 'CastingDemo.java',
          code: `public class CastingDemo {
    public static void main(String[] args) {
        double num = 100.5;
        int dig = (int) num; // Fractional portion discarded
        System.out.println("Truncated int: " + dig); // 100

        // Bitwise Narrowing & Wraparound
        int a = 257;
        byte b = (byte) a;
        System.out.println("Narrowed byte: " + b); // 1
    }
}`,
          output: `Truncated int: 100
Narrowed byte: 1`,
          explanation: 'Why does (byte) 257 produce 1? A byte holds only 8 bits. 257 in binary is 00000001 00000001. Narrowing discards the upper 24 bits, leaving lowest 8 bits: 00000001 = 1. The wraparound period is 256 (2^8), not 128! 257 - 256 = 1.',
        },
        callout: {
          type: 'interview',
          title: 'Frequent Interview Question: Why (byte) 257 == 1?',
          text: 'Be ready to explain that byte has a 256-value range (-128 to 127). Discarding upper bits truncates the integer into the lower 8 bits.',
        },
      },
      {
        id: 'character-math',
        title: 'Character Arithmetic',
        content: 'In Java, char stores an unsigned 16-bit numeric Unicode/ASCII value. You can perform arithmetic on characters:',
        snippet: {
          language: 'java',
          filename: 'CharArithmetic.java',
          code: `public class CharArithmetic {
    public static void main(String[] args) {
        char c = 'A'; // ASCII/Unicode 65
        c += 5;       // 65 + 5 = 70, which maps to 'F'
        System.out.println("Shifted char: " + c); // F
    }
}`,
          output: 'Shifted char: F',
        },
      },
      {
        id: 'operators-conditions',
        title: 'Operators & Conditional Flow',
        content: 'Java supports comprehensive operators: Arithmetic (+, -, *, /, %), Relational (==, !=, >, <, >=, <=), Logical (&&, ||, !), Ternary (cond ? val1 : val2), Bitwise (&, |, ^, ~), Shift (<<, >>, >>>), and type test (instanceof).',
        snippet: {
          language: 'java',
          filename: 'InventoryCheck.java',
          code: `public class InventoryCheck {
    public static void main(String[] args) {
        int stock = 5;

        // Standard if-else
        if (stock > 0) {
            System.out.println("Product available");
        } else {
            System.out.println("Out of stock");
        }

        // Integer division truncation
        int units = 10;
        int packs = units / 3; // 10 / 3 = 3 (fractional part discarded)
        System.out.println("Full 3-packs: " + packs);

        // Concise ternary operator
        String status = (stock > 0) ? "In Stock" : "Unavailable";
        System.out.println("Status: " + status);
    }
}`,
          output: `Product available
Full 3-packs: 3
Status: In Stock`,
        },
      },
    ],
    commonMistakes: [
      {
        mistake: 'Forgetting L for large numbers: long x = 8000000000;',
        fix: 'By default whole number literals are treated as 32-bit int. Add L suffix: 8000000000L.',
      },
      {
        mistake: 'Expecting 10 / 3 to give 3.3333 in Java',
        fix: 'When both operands are int, integer division truncates to 3. Use 10.0 / 3 to obtain floating-point 3.3333333333333335.',
      },
      {
        mistake: 'Using double quotes for char: char c = "A";',
        fix: 'Single quotes \'A\' are for char literals; double quotes "A" create a java.lang.String object.',
      },
    ],
    keyTakeaways: [
      'Java provides 8 primitives: byte, short, int, long, float, double, char, boolean.',
      'Explicit casting (narrowing) truncates upper bits or decimal fractions.',
      'Wraparound for byte occurs modulo 256 (8 bits).',
      'Integer division always discards the fractional remainder.',
    ],
    relatedTopicIds: ['java-001-jvm-jdk', 'java-004-stack-heap', 'java-005-arrays'],
    exerciseIds: ['ex-002-primitives', 'ex-003-type-casting', 'ex-004-char-arithmetic', 'ex-005-inventory-condition'],
    interviewQuestionIds: ['q-004-primitive-vs-reference', 'q-005-type-casting', 'q-006-byte-257'],
    keywords: ['primitives', 'variables', 'casting', 'narrowing', 'widening', 'byte wraparound', 'operators', 'char arithmetic', 'conditions'],
  },
  {
    id: 'java-038-user-input',
    codeNumber: 'JAVA-038',
    languageId: 'java',
    title: 'Taking Input from the User (System.in, BufferedReader & Scanner)',
    slug: 'taking-input-user-scanner-bufferedreader',
    category: 'Java Fundamentals',
    subcategory: 'Input & I/O',
    summary:
      'Explore standard user input mechanisms in Java: byte-level reading via System.in.read(), efficient character stream parsing using BufferedReader and InputStreamReader, and convenient token parsing with Scanner.',
    order: 4,
    estimatedMinutes: 11,
    learningObjectives: [
      'Understand byte-level input reading via System.in.read() and why it returns integer bytes (0-255 or -1).',
      'Use BufferedReader with InputStreamReader for high-throughput, thread-safe line reading.',
      'Parse primitives and strings using java.util.Scanner with try-with-resources.',
      'Avoid and debug the infamous Scanner newline skipping trap when mixing nextInt() and nextLine().',
      'Compare performance, exception handling, and memory characteristics of all three input approaches.',
    ],
    whyItMatters:
      'Technical interviews and coding challenges frequently involve reading user input. Knowing when to choose Scanner for convenience versus BufferedReader for high-performance I/O is a hallmark of a knowledgeable Java engineer.',
    sections: [
      {
        id: 'system-in-read',
        title: '1. Reading Byte Input with System.in.read()',
        content:
          'System.in is the standard input stream (an instance of InputStream). The read() method reads the next single byte of data from standard input, returning an int from 0 to 255 representing the byte value, or -1 if the end of stream has been reached.\n\nBecause it reads a single byte, it cannot directly read multi-digit numbers or entire words. It is not a general Unicode character solution and throws a checked IOException.',
        snippet: {
          language: 'java',
          filename: 'Hello.java',
          code: 'import java.io.IOException;\n\npublic class Hello {\n    public static void main(String[] args) throws IOException {\n        System.out.print("Enter one character: ");\n        int value = System.in.read();\n        System.out.println("Character: " + (char) value);\n    }\n}',
          output: 'Enter one character: A\nCharacter: A',
          explanation:
            'When the user enters "A", System.in.read() reads the ASCII byte 65. Casting (char) 65 prints "A". Non-ASCII characters spanning multiple bytes will be truncated or corrupted.',
        },
      },
      {
        id: 'buffered-reader',
        title: '2. High-Efficiency Line Input with BufferedReader & InputStreamReader',
        content:
          'BufferedReader wraps an existing Reader (such as InputStreamReader which bridges the byte-stream System.in to a character-stream) to provide efficient buffering of characters, lines, and arrays.\n\nreadLine() reads an entire line of text until a newline or carriage return is encountered. Numbers must be manually parsed using wrapper methods such as Integer.parseInt() or Double.parseDouble().',
        snippet: {
          language: 'java',
          filename: 'Hello.java',
          code: 'import java.io.BufferedReader;\nimport java.io.IOException;\nimport java.io.InputStreamReader;\n\npublic class Hello {\n    public static void main(String[] args) throws IOException {\n        BufferedReader reader =\n            new BufferedReader(new InputStreamReader(System.in));\n\n        System.out.print("Enter your name: ");\n        String name = reader.readLine();\n\n        System.out.print("Enter your age: ");\n        int age = Integer.parseInt(reader.readLine());\n\n        System.out.println("Name: " + name);\n        System.out.println("Age: " + age);\n    }\n}',
          output: 'Enter your name: Alex\nEnter your age: 28\nName: Alex\nAge: 28',
          explanation:
            'BufferedReader is synchronized and significantly faster than Scanner because it does not run regex matching. If non-numeric text is provided for age, Integer.parseInt() throws an unchecked NumberFormatException.',
        },
      },
      {
        id: 'scanner-class',
        title: '3. Convenient Parsing with java.util.Scanner',
        content:
          'Scanner is a high-level text scanner located in java.util that parses primitive types and strings using regular expressions. It provides convenient methods such as nextLine(), nextInt(), nextDouble(), and nextBoolean(). It should be managed using try-with-resources to ensure proper cleanup.',
        snippet: {
          language: 'java',
          filename: 'Hello.java',
          code: 'import java.util.Scanner;\n\npublic class Hello {\n    public static void main(String[] args) {\n        try (Scanner scanner = new Scanner(System.in)) {\n            System.out.print("Enter your name: ");\n            String name = scanner.nextLine();\n\n            System.out.print("Enter your age: ");\n            int age = scanner.nextInt();\n\n            System.out.println("Name: " + name);\n            System.out.println("Age: " + age);\n        }\n    }\n}',
          output: 'Enter your name: Priya\nEnter your age: 24\nName: Priya\nAge: 24',
        },
      },
      {
        id: 'scanner-newline-trap',
        title: 'The Infamous Scanner Newline Trap',
        content:
          'A classic Java bug occurs when calling nextLine() immediately after nextInt() or nextDouble().\n\nMethods like nextInt() read numeric tokens but leave the trailing newline character (\\n) unconsumed in the buffer. When nextLine() is subsequently called, it reads the leftover newline and returns an empty string immediately without waiting for user input!',
        callout: {
          type: 'warning',
          title: 'Scanner Newline Tip',
          text: 'nextInt() followed by nextLine() can leave the newline for nextLine() to consume. Add an extra scanner.nextLine() after nextInt() when you need to read a subsequent full line.',
        },
        snippet: {
          language: 'java',
          filename: 'ScannerTrapFix.java',
          code: 'import java.util.Scanner;\n\npublic class ScannerTrapFix {\n    public static void main(String[] args) {\n        try (Scanner scanner = new Scanner(System.in)) {\n            System.out.print("Enter item ID: ");\n            int id = scanner.nextInt();\n            scanner.nextLine(); // Consumes the leftover newline!\n\n            System.out.print("Enter item description: ");\n            String description = scanner.nextLine(); // Now reads correctly\n\n            System.out.println("Item: #" + id + " - " + description);\n        }\n    }\n}',
          output: 'Enter item ID: 101\nEnter item description: Wireless Mechanical Keyboard\nItem: #101 - Wireless Mechanical Keyboard',
        },
      },
      {
        id: 'comparison-table',
        title: 'Comparison: System.in.read() vs BufferedReader vs Scanner',
        content: 'Summary comparison of the three primary user input approaches in standard Java:',
        table: {
          headers: ['Feature', 'System.in.read()', 'BufferedReader', 'Scanner'],
          rows: [
            ['Best For', 'Single raw byte inspection', 'High-throughput line input', 'Convenient primitive & token parsing'],
            ['Full Line Support', 'No (reads 1 byte)', 'readLine() returns full line', 'nextLine() returns full line'],
            ['Number Conversion', 'Manual bit/char mapping', 'Manual parsing (Integer.parseInt)', 'Built-in methods (nextInt, nextDouble)'],
            ['Checked Exception', 'IOException required', 'IOException required', 'Standard token reads do not require checked handling'],
            ['Synchronization', 'Synchronized on stream', 'Synchronized (thread-safe)', 'Not synchronized (not thread-safe)'],
            ['Typical Use Case', 'Low-level byte streams', 'Competitive programming / file reading', 'Beginner programs / console utilities'],
          ],
        },
      },
    ],
    commonMistakes: [
      {
        mistake: 'Calling scanner.nextLine() immediately after scanner.nextInt() without consuming the trailing newline.',
        fix: 'Add an extra scanner.nextLine() after nextInt() to consume the leftover newline character in the stream buffer.',
      },
      {
        mistake: 'Using Scanner for large data sets (e.g. 100,000+ lines in competitive programming) and getting Time Limit Exceeded (TLE).',
        fix: 'Use BufferedReader and StringTokenizer for competitive programming and high-volume I/O to avoid regex overhead.',
      },
      {
        mistake: 'Closing a Scanner wrapping System.in inside a helper method.',
        fix: 'Closing a Scanner wrapping System.in closes standard input for the entire JVM. Only close Scanner in main() or manage standard input at the top level.',
      },
    ],
    keyTakeaways: [
      'System.in.read() reads one byte (0-255) and is unsuitable for Unicode or multi-digit parsing.',
      'BufferedReader is fast, thread-safe, and buffered, but requires manual parsing of numbers.',
      'Scanner provides convenient tokenization but has regex overhead and the trailing newline trap.',
      'Always validate and catch NumberFormatException when parsing numeric strings from user input.',
    ],
    relatedTopicIds: ['java-002-primitives-types', 'java-034-errors-in-java'],
    exerciseIds: ['ex-020-scanner-input'],
    interviewQuestionIds: ['q-67-input-methods', 'q-68-scanner-newline-trap'],
    keywords: [
      'Scanner',
      'BufferedReader',
      'InputStreamReader',
      'System.in.read',
      'System.in',
      'readLine',
      'nextInt',
      'nextLine',
      'NumberFormatException',
      'IOException',
      'newline trap',
      'user input',
    ],
  },
{
    id: 'java-004-stack-heap',
    codeNumber: 'JAVA-004',
    languageId: 'java',
    title: 'JVM Memory: Stack vs Heap',
    slug: 'jvm-stack-and-heap-memory',
    category: 'Java Fundamentals',
    subcategory: 'Memory Internals',
    summary: 'Demystify JVM memory organization. Understand thread stack frames, heap object allocation, reference variables, and garbage collection.',
    order: 5,
    estimatedMinutes: 10,
    learningObjectives: [
      'Compare JVM Stack memory and JVM Heap memory across lifecycle, sharing, and speed.',
      'Understand how method invocations push and pop Stack Frames.',
      'Differentiate primitive variable values from object reference pointers.',
      'Recognize where static members belong in memory.',
    ],
    whyItMatters: 'Memory leaks, OutOfMemoryError, and StackOverflowError all stem from misunderstandings of Stack vs Heap. Knowing where data lives is essential for high-performance engineering.',
    sections: [
      {
        id: 'memory-overview',
        title: 'Stack vs Heap Architectural Comparison',
        content: 'The JVM partitions runtime memory into distinct regions:',
        bullets: [
          'Stack Memory: Each thread receives its own private stack. Method invocations create a stack frame storing method parameters, local variables, and execution state. Extremely fast, LIFO (Last In First Out), automatically deallocated when the method returns.',
          'Heap Memory: A single shared memory pool accessible by all threads. All objects and array elements are allocated on the Heap. Managed automatically by the Garbage Collector (GC).',
        ],
      },
      {
        id: 'code-breakdown',
        title: 'Step-by-Step Memory Walkthrough',
        content: 'Consider what happens during main() execution:',
        snippet: {
          language: 'java',
          filename: 'MemoryTrace.java',
          code: `class Product {
    int stock = 10; // Instance field lives on the Heap inside the object
}

public class MemoryTrace {
    public static void main(String[] args) {
        int quantity = 5;       // Local primitive -> main() stack frame
        Product p = new Product(); // p reference -> stack frame; new Product() -> heap
    }
}`,
          explanation: '1. JVM creates a stack frame for main().\\n2. quantity holds raw binary 5 directly in the stack frame.\\n3. new Product() allocates memory on the Heap for the object and initializes stock = 10.\\n4. p is a local reference stored in the stack frame that holds a pointer/handle to the Heap object.',
        },
      },
      {
        id: 'reference-mechanics',
        title: 'Are References Raw C-style Memory Addresses?',
        content: 'No. Java references are not inspectable or manipulable physical RAM memory addresses. The JVM encapsulates references to allow the Garbage Collector to compact and move objects in memory without breaking application code.',
        bullets: [
          'Static fields belong to the Class metadata (in the Metaspace/Class area), shared across all objects.',
          'Instance fields belong to the object and reside inside that object on the Heap.',
          'Local variables belong to the specific executing thread\'s stack frame.',
        ],
      },
    ],
    commonMistakes: [
      {
        mistake: 'Assuming the object itself is stored on the Stack if declared in a method',
        fix: 'Only the reference variable (p) is on the stack; the object instance is always on the Heap.',
      },
      {
        mistake: 'Thinking StackOverflowError is caused by too many large objects',
        fix: 'StackOverflowError is caused by deep/infinite recursion filling stack frames. Too many objects causes OutOfMemoryError: Java heap space.',
      },
    ],
    keyTakeaways: [
      'Stack: Thread-private, stores method stack frames and local primitives/references.',
      'Heap: Shared across all threads, stores all objects and arrays.',
      'Garbage Collector cleans unreachable Heap objects; Stack frames pop automatically on method exit.',
    ],
    relatedTopicIds: ['java-003-classes-objects', 'java-005-arrays', 'java-008-static-members'],
    exerciseIds: ['ex-002-primitives'],
    interviewQuestionIds: ['q-022-stack-vs-heap', 'q-004-primitive-vs-reference'],
    keywords: ['stack', 'heap', 'jvm memory', 'stack frame', 'garbage collection', 'references', 'outofmemoryerror', 'stackoverflowerror'],
  },
{
    id: 'java-005-arrays',
    codeNumber: 'JAVA-005',
    languageId: 'java',
    title: 'Arrays: 1D, 2D, 3D & Jagged Arrays',
    slug: 'arrays-1d-2d-3d-jagged',
    category: 'Java Fundamentals',
    subcategory: 'Data Structures',
    summary: 'Work with fixed-size indexed collections in Java. Explore single-dimensional, multi-dimensional matrices, and non-uniform jagged arrays.',
    order: 6,
    estimatedMinutes: 11,
    learningObjectives: [
      'Declare, instantiate, and initialize 1D, 2D, and 3D arrays.',
      'Understand zero-based indexing and Array bounds checking.',
      'Construct and traverse Jagged (ragged) arrays with varying inner lengths.',
      'Learn how Java arrays are represented as objects in heap memory.',
    ],
    whyItMatters: 'Arrays are the most fundamental contiguous data structure in computer science. They form the underlying backing structure for ArrayList, HashMaps, and buffers.',
    sections: [
      {
        id: 'array-basics',
        title: 'Single-Dimensional (1D) Arrays',
        content: 'An array is a container object that holds a fixed number of values of a single declared type. Elements are indexed starting at 0.',
        snippet: {
          language: 'java',
          filename: 'OneDimArray.java',
          code: `public class OneDimArray {
    public static void main(String[] args) {
        int[] numbers = {10, 20, 30, 40};
        System.out.println("First element: " + numbers[0]); // 10
        System.out.println("Second element: " + numbers[1]); // 20
        System.out.println("Array length: " + numbers.length); // 4
    }
}`,
          output: `First element: 10
Second element: 20
Array length: 4`,
        },
      },
      {
        id: 'multidimensional',
        title: '2D & 3D Arrays (Matrices & Cubes)',
        content: 'In Java, a multi-dimensional array is literally an "array of arrays". Each element of the outer array holds a reference to an inner array.',
        snippet: {
          language: 'java',
          filename: 'MultiDimArray.java',
          code: `public class MultiDimArray {
    public static void main(String[] args) {
        // 2D Array (2 rows x 2 columns warehouse stock)
        int[][] stock = {
            {10, 20}, // Row 0
            {30, 40}  // Row 1
        };
        System.out.println("Row 0, Col 1: " + stock[0][1]); // 20

        // 3D Array
        int[][][] data = {
            {{1, 2}, {3, 4}},
            {{5, 6}, {7, 8}}
        };
        System.out.println("Element [1][0][1]: " + data[1][0][1]); // 6
    }
}`,
          output: `Row 0, Col 1: 20
Element [1][0][1]: 6`,
        },
      },
      {
        id: 'jagged-arrays',
        title: 'Jagged Arrays: Non-Uniform Inner Arrays',
        content: 'Because a 2D array is an array of array references, each row can have a completely different length. This is known as a Jagged or Ragged array, highly efficient for representing varying customer order quantities:',
        snippet: {
          language: 'java',
          filename: 'JaggedOrders.java',
          code: `public class JaggedOrders {
    public static void main(String[] args) {
        // Customer 1 bought 2 items, Customer 2 bought 3 items, Customer 3 bought 1 item
        int[][] orders = {
            {101, 102},
            {201, 202, 203},
            {301}
        };

        System.out.println("Cust 2, Item 3: " + orders[1][2]); // 203
        System.out.println("Cust 1 order count: " + orders[0].length); // 2
        System.out.println("Cust 2 order count: " + orders[1].length); // 3
    }
}`,
          output: `Cust 2, Item 3: 203
Cust 1 order count: 2
Cust 2 order count: 3`,
        },
      },
    ],
    commonMistakes: [
      {
        mistake: 'Accessing index == length: numbers[numbers.length]',
        fix: 'Java indices range from 0 to length - 1. Accessing index == length throws ArrayIndexOutOfBoundsException.',
      },
      {
        mistake: 'Trying to resize an array after creation',
        fix: 'Java array size is fixed at allocation. To expand capacity, allocate a new larger array or use java.util.ArrayList.',
      },
    ],
    keyTakeaways: [
      'Arrays are fixed-size, zero-indexed objects stored in Heap memory.',
      'Multi-dimensional arrays in Java are arrays of array references.',
      'Jagged arrays have inner arrays with differing lengths, saving memory.',
    ],
    relatedTopicIds: ['java-002-primitives-types', 'java-004-stack-heap'],
    exerciseIds: ['ex-006-array-basics'],
    interviewQuestionIds: ['q-023-arrays-jagged'],
    keywords: ['arrays', '1d array', '2d array', '3d array', 'jagged array', 'ragged array', 'matrix', 'indexing'],
  },
{
    id: 'java-006-strings',
    codeNumber: 'JAVA-006',
    languageId: 'java',
    title: 'String, StringBuffer & StringBuilder',
    slug: 'string-stringbuffer-stringbuilder',
    category: 'Java Fundamentals',
    subcategory: 'Text Processing',
    summary: 'Compare immutable Strings with mutable StringBuffer and StringBuilder. Learn about the String Pool, thread-safety, and buffer capacity mechanics.',
    order: 7,
    estimatedMinutes: 13,
    learningObjectives: [
      'Explain why java.lang.String is immutable and how the String Constant Pool functions.',
      'Compare String vs StringBuffer vs StringBuilder across performance and thread safety.',
      'Calculate buffer capacity formulas: default 16 characters vs initial string length + 16.',
      'Select the right string builder mechanism for concurrent vs single-threaded code.',
    ],
    whyItMatters: 'Strings are the most heavily used object in Java. Inefficient string concatenation in loops creates thousands of discardable heap objects, severely hurting GC performance.',
    sections: [
      {
        id: 'string-immutability',
        title: 'String Immutability & The String Constant Pool',
        content: 'String objects in Java are immutable: once created, their character sequence can never be altered in memory. When you modify a String, Java allocates a brand-new String object with the new text.',
        snippet: {
          language: 'java',
          filename: 'StringImmutability.java',
          code: `public class StringImmutability {
    public static void main(String[] args) {
        String name = "Suhel";
        name = name + " Khan"; // Does NOT alter original "Suhel"
        System.out.println(name); // Suhel Khan

        // String Pool vs Heap Object
        String s1 = "Suhel";                 // Stored in String Pool
        String s2 = "Suhel";                 // Reuses pooled literal s1
        String s3 = new String("Suhel");     // Forces new object in Heap

        System.out.println(s1 == s2); // true (same pool reference)
        System.out.println(s1 == s3); // false (different memory locations)
        System.out.println(s1.equals(s3)); // true (equivalent content)
    }
}`,
          output: `Suhel Khan
true
false
true`,
        },
      },
      {
        id: 'buffer-and-builder',
        title: 'StringBuffer & StringBuilder: Mutable Sequences',
        content: 'When appending text repeatedly (e.g. constructing JSON or SQL), use mutable character sequences:',
        bullets: [
          'StringBuffer: Thread-safe with synchronized methods. Introduced in Java 1.0. Synchronization overhead makes it slightly slower for single-threaded usage.',
          'StringBuilder: Introduced in Java 5. Fast, NOT thread-safe (methods are unsynchronized). The recommended standard choice for local, single-threaded string building.',
        ],
        snippet: {
          language: 'java',
          filename: 'BufferBuilderDemo.java',
          code: `public class BufferBuilderDemo {
    public static void main(String[] args) {
        // StringBuilder example
        StringBuilder sb = new StringBuilder("Hello");
        sb.append(" Java");
        System.out.println("StringBuilder output: " + sb); // Hello Java

        // Capacity mechanics:
        StringBuilder emptySb = new StringBuilder(); // Default capacity = 16 characters
        StringBuilder customSb = new StringBuilder("Hello"); // Capacity = 5 + 16 = 21 characters

        System.out.println("emptySb capacity: " + emptySb.capacity());
        System.out.println("customSb capacity: " + customSb.capacity());
    }
}`,
          output: `StringBuilder output: Hello Java
emptySb capacity: 16
customSb capacity: 21`,
        },
        callout: {
          type: 'warning',
          title: 'Capacity is in Characters, Not Bytes!',
          text: 'Notice that default capacity is 16 characters, not 16 bytes. Java characters are 2-byte UTF-16 code units (or compressed bytes in modern Compact Strings).',
        },
      },
      {
        id: 'synchronization-caveat',
        title: 'Important Synchronization Caveat with StringBuffer',
        content: 'While individual methods of StringBuffer (such as append or delete) are synchronized, composite multi-step operations are NOT automatically atomic. If two threads check buffer length and then append, they still need external synchronization blocks.',
      },
    ],
    commonMistakes: [
      {
        mistake: 'Using == to compare string content instead of .equals()',
        fix: '== compares memory references. Always use .equals() or .equalsIgnoreCase() to compare string textual values.',
      },
      {
        mistake: 'Concatenating strings inside loops using the + operator',
        fix: 'Use StringBuilder inside loops to prevent creating O(n^2) intermediate discardable String objects.',
      },
    ],
    keyTakeaways: [
      'String is immutable and reuses literals from the String Constant Pool.',
      'StringBuilder is fast, unsynchronized, and preferred for single-threaded tasks.',
      'StringBuffer is synchronized and thread-safe for shared multithreaded buffers.',
      'Default buffer capacity is 16 characters (or initial string length + 16).',
    ],
    relatedTopicIds: ['java-002-primitives-types', 'java-004-stack-heap', 'java-016-object-tostring'],
    exerciseIds: ['ex-009-string-builder'],
    interviewQuestionIds: ['q-007-string-buffer-builder'],
    keywords: ['string', 'stringbuffer', 'stringbuilder', 'immutability', 'string pool', 'capacity', 'thread safety', 'synchronized'],
  },
];
