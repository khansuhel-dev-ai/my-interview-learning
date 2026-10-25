import { InterviewQuestion } from '../types';

export const INTERVIEW_QUESTIONS: InterviewQuestion[] = [
  {
    id: 'q-001-jvm',
    number: 1,
    languageId: 'java',
    topicId: 'java-001-jvm-jdk',
    topicTitle: 'Java Execution, JVM, JRE & JDK',
    question: 'What is the JVM?',
    difficulty: 'Beginner',
    type: 'Conceptual',
    shortAnswer: [
      'JVM stands for Java Virtual Machine.',
      'It is an abstract computing machine that provides a runtime execution environment for Java bytecode.',
      'It handles class loading, bytecode verification, execution (via Interpreter + JIT compiler), memory allocation, and automatic garbage collection.',
      'The JVM is platform-dependent, but enables Java bytecode to be platform-independent.',
    ],
    deepDive: 'The JVM does not understand Java source code directly; it only reads .class files containing standardized bytecode instructions. The core subsystems of the JVM are: (1) Class Loader Subsystem (Loading, Linking, Initialization), (2) Runtime Data Areas (Method Area/Metaspace, Heap, JVM Stacks, PC Registers, Native Method Stacks), and (3) Execution Engine (Interpreter, JIT Compiler, Garbage Collector). Modern JVMs use HotSpot technology to identify frequently executed code paths ("hot spots") and compile them into optimized native CPU instructions.',
    followUpTip: 'Interviewers often follow up with: "Is the JVM platform-independent?" The answer is NO. The JVM software itself is platform-dependent (different binaries for macOS, Linux, Windows), but the bytecode it executes is platform-independent.',
    keywords: ['jvm', 'virtual machine', 'runtime', 'jit', 'bytecode', 'execution engine'],
  },

  {
    id: 'q-002-jdk-jre-jvm',
    number: 2,
    languageId: 'java',
    topicId: 'java-001-jvm-jdk',
    topicTitle: 'Java Execution, JVM, JRE & JDK',
    question: 'What is the difference between JDK, JRE, and JVM?',
    difficulty: 'Beginner',
    type: 'Conceptual',
    shortAnswer: [
      'JVM (Java Virtual Machine): The execution engine that runs compiled bytecode.',
      'JRE (Java Runtime Environment): JVM + core Java class libraries necessary to run Java applications.',
      'JDK (Java Development Kit): JRE + development tools (compiler `javac`, debugger `jdb`, archiver `jar`, `javadoc`).',
      'Relationship: JDK contains JRE; JRE contains JVM.',
    ],
    deepDive: 'A developer needs the JDK to write and compile source code. An end-user or production server originally only needed the JRE to run an already-compiled application. Since Java 11, Oracle and OpenJDK no longer provide separate standalone JRE downloads; instead, tools like `jlink` are used to build custom lightweight runtimes containing only the required JVM modules.',
    followUpTip: 'Remember the formula: JDK = JRE + Developer Tools; JRE = JVM + Standard Libraries.',
    keywords: ['jdk', 'jre', 'jvm', 'javac', 'development kit', 'runtime environment'],
  },

  {
    id: 'q-003-platform-independence',
    number: 3,
    languageId: 'java',
    topicId: 'java-001-jvm-jdk',
    topicTitle: 'Java Execution, JVM, JRE & JDK',
    question: 'How does Java achieve platform independence?',
    difficulty: 'Beginner',
    type: 'Conceptual',
    shortAnswer: [
      'Java achieves platform independence through an intermediate representation known as bytecode (.class files).',
      'The compiler (`javac`) does not compile into native CPU machine code; it compiles into JVM bytecode.',
      'Compatible JVM implementations exist for all major operating systems (Windows, Linux, macOS).',
      'Any operating system with a compatible JVM can execute the identical bytecode without recompilation.',
    ],
    deepDive: 'In native languages like C/C++, code is compiled directly into machine instructions tailored to a specific CPU architecture and OS ABI. Java decouples the language from the underlying machine. The motto is "Write Once, Run Anywhere" (WORA). While bytecode is 100% portable, platform-specific code (such as JNI native bindings or hardcoded file separators) can still impact portability if not handled with care.',
    followUpTip: 'Mention that the JVM itself is NOT platform independent; it is the bridge that makes Java code platform independent.',
    keywords: ['platform independence', 'wora', 'bytecode', 'portability', 'javac'],
  },

  {
    id: 'q-004-primitive-vs-reference',
    number: 4,
    languageId: 'java',
    topicId: 'java-002-primitives-types',
    topicTitle: 'Primitive Types, Variables, Casting & Operators',
    question: 'What is the difference between primitive types and reference types?',
    difficulty: 'Beginner',
    type: 'Conceptual',
    shortAnswer: [
      'Primitives (8 types: byte, short, int, long, float, double, char, boolean) store raw values directly in memory.',
      'Reference types (Classes, Interfaces, Arrays, Enums) store memory addresses pointing to objects on the Heap.',
      'Primitives cannot be null and have default values (e.g., 0, false); reference types default to null.',
      'Primitives are stored directly on the stack frame when declared locally; objects referenced by reference types live on the heap.',
    ],
    deepDive: 'Java provides wrapper classes (Integer, Double, Boolean, etc.) to bridge primitives with object-oriented collections via autoboxing and unboxing. Primitives offer superior performance and zero heap allocation overhead, making them ideal for high-throughput numeric crunching.',
    followUpTip: 'Be prepared for autoboxing questions: "What happens when you add an int to a List<Integer>?" Autoboxing converts int to Integer via Integer.valueOf().',
    keywords: ['primitives', 'reference types', 'stack', 'heap', 'null', 'autoboxing', 'wrapper classes'],
  },

  {
    id: 'q-005-type-casting',
    number: 5,
    languageId: 'java',
    topicId: 'java-002-primitives-types',
    topicTitle: 'Primitive Types, Variables, Casting & Operators',
    question: 'What is type casting? Explain narrowing conversion.',
    difficulty: 'Beginner',
    type: 'Conceptual',
    shortAnswer: [
      'Type casting is converting a value of one data type into another data type.',
      'Widening Casting (implicit): Converting a smaller type to a larger type (e.g. int -> double). Safe; done automatically.',
      'Narrowing Casting (explicit): Converting a larger type to a smaller type (e.g. double -> int). Requires explicit `(type)` syntax.',
      'Narrowing may cause loss of precision (discarding decimals) or data overflow/wraparound.',
    ],
    deepDive: 'Widening conversions preserve magnitude because the destination type has equal or greater bit capacity: byte -> short -> int -> long -> float -> double. Narrowing conversions truncate the higher-order bits or discard the fractional floating-point component without rounding.',
    codeSnippet: {
      language: 'java',
      code: `double salary = 45000.85;
int truncated = (int) salary; // 45000 (.85 discarded)

int largeVal = 130;
byte b = (byte) largeVal; // -126 (overflow wraparound)`,
    },
    followUpTip: 'Highlight that narrowing floating point to int does NOT round to the nearest integer; it truncates directly towards zero.',
    keywords: ['type casting', 'narrowing', 'widening', 'truncation', 'precision loss'],
  },

  {
    id: 'q-006-byte-257',
    number: 6,
    languageId: 'java',
    topicId: 'java-002-primitives-types',
    topicTitle: 'Primitive Types, Variables, Casting & Operators',
    question: 'Why does (byte) 257 produce 1?',
    difficulty: 'Intermediate',
    type: 'Coding',
    shortAnswer: [
      'A `byte` in Java is an 8-bit signed two\'s complement integer with range -128 to 127 (256 distinct values).',
      'The integer 257 in 32-bit binary is `00000000 00000000 00000001 00000001`.',
      'Casting to byte truncates the upper 24 bits, leaving only the lowest 8 bits: `00000001`.',
      '`00000001` in decimal is 1. The wraparound period is 256 (2^8), so 257 - 256 = 1.',
    ],
    deepDive: 'A common misconception is that the formula is `257 % 128`. That is incorrect because an 8-bit byte represents 256 states (from -128 up to +127). The arithmetic wraparound period is 256. For example: `(byte) 128` becomes `-128`, `(byte) 129` becomes `-127`, `(byte) 256` becomes `0`, and `(byte) 257` becomes `1`.',
    codeSnippet: {
      language: 'java',
      code: `int a = 257;
byte b = (byte) a;
System.out.println(b); // Output: 1`,
    },
    followUpTip: 'Impress the interviewer by explaining the binary bit-masking equivalent: `257 & 0xFF = 1`.',
    keywords: ['byte', '257', 'wraparound', 'narrowing', 'two\'s complement', '8-bit truncation'],
  },

  {
    id: 'q-007-string-buffer-builder',
    number: 7,
    languageId: 'java',
    topicId: 'java-006-strings',
    topicTitle: 'String, StringBuffer & StringBuilder',
    question: 'What is the difference between String, StringBuffer, and StringBuilder?',
    difficulty: 'Intermediate',
    type: 'Conceptual',
    shortAnswer: [
      '`String`: Immutable character sequence. Stored in String Pool. Any modification creates a new object.',
      '`StringBuffer`: Mutable sequence. Thread-safe (methods are synchronized). Slower overhead for single-threaded tasks.',
      '`StringBuilder`: Mutable sequence. NOT thread-safe (unsynchronized). Fast; the recommended default for single-threaded string construction.',
      'Buffer default capacity is 16 characters (or initial string length + 16).',
    ],
    deepDive: 'Because String is immutable, concatenating in a loop (`str += i`) creates O(n^2) temporary objects that overload the Garbage Collector. StringBuilder provides dynamic internal character array resizing (initial size * 2 + 2 when exceeded). Use StringBuilder in 95% of application code; reserve StringBuffer for multi-threaded shared buffers.',
    followUpTip: 'Remember: capacity is measured in characters (UTF-16 code units), NOT bytes.',
    keywords: ['string', 'stringbuffer', 'stringbuilder', 'immutability', 'thread safety', 'synchronized', 'capacity'],
  },

  {
    id: 'q-008-class-vs-object',
    number: 8,
    languageId: 'java',
    topicId: 'java-003-classes-objects',
    topicTitle: 'Classes, Objects & The 4 OOP Pillars',
    question: 'What is a class and what is an object?',
    difficulty: 'Beginner',
    type: 'Conceptual',
    shortAnswer: [
      'Class: A user-defined template or blueprint that defines state (fields) and behavior (methods). No heap memory is allocated for instance data when declared.',
      'Object: An active, concrete instance created from a class in heap memory using the `new` keyword.',
      'Analogy: A class is an architectural blueprint of a house; an object is the actual physical house built from that blueprint.',
    ],
    deepDive: 'Classes are loaded into Metaspace/Class area memory once. Objects are dynamically allocated on the Heap with independent memory addresses and independent copies of instance variables. A single class can spawn millions of distinct objects.',
    followUpTip: 'Add: "An object possesses identity, state (attributes), and behavior (methods)."',
    keywords: ['class', 'object', 'blueprint', 'instance', 'heap allocation'],
  },

  {
    id: 'q-009-four-pillars',
    number: 9,
    languageId: 'java',
    topicId: 'java-003-classes-objects',
    topicTitle: 'Classes, Objects & The 4 OOP Pillars',
    question: 'Explain the four pillars of OOP.',
    difficulty: 'Beginner',
    type: 'Conceptual',
    shortAnswer: [
      '1. Encapsulation: Bundling data and methods into a single class and restricting direct external field access using private modifiers and validated getters/setters.',
      '2. Inheritance: Mechanism where a child subclass derives fields and methods from a parent superclass, enabling code reuse (IS-A relationship).',
      '3. Polymorphism: "Many forms". Allows an action or method call to behave differently based on the object executing it (overloading at compile time, overriding at runtime).',
      '4. Abstraction: Hiding internal implementation complexities and exposing only the essential interface to the user (via abstract classes and interfaces).',
    ],
    deepDive: 'In enterprise systems, these pillars work synchronously. For instance, in an E-Commerce system: Encapsulation protects order item quantities from negative values; Inheritance allows Book and Electronic products to reuse Product properties; Polymorphism allows payment.process() to work with both CreditCard and PayPal; and Abstraction lets the checkout service call PaymentGateway without knowing bank network protocol details.',
    followUpTip: 'Give a concrete e-commerce or banking example when explaining the 4 pillars to demonstrate practical engineering experience.',
    keywords: ['oop pillars', 'encapsulation', 'inheritance', 'polymorphism', 'abstraction'],
  },

  {
    id: 'q-010-inheritance',
    number: 10,
    languageId: 'java',
    topicId: 'java-010-inheritance-chaining',
    topicTitle: 'Inheritance & Constructor Chaining with super()',
    question: 'What is inheritance?',
    difficulty: 'Beginner',
    type: 'Conceptual',
    shortAnswer: [
      'Inheritance is an OOP mechanism where one class (child/subclass) derives state and behavior from another class (parent/superclass) using the `extends` keyword.',
      'It creates an "IS-A" relationship (e.g. Dog IS-A Animal).',
      'Promotes code reusability, modularity, and establishes the foundation for runtime polymorphism.',
      'Constructors, private members, and static members are NOT inherited in the traditional polymorphic sense.',
    ],
    deepDive: 'In Java, all classes ultimately inherit from `java.lang.Object`. Subclasses can add new fields and methods or override inherited methods to customize behavior. Parent private members are inherited in memory, but can only be accessed through parent public/protected methods.',
    followUpTip: 'Always mention that inheritance represents an "IS-A" relationship, whereas composition represents a "HAS-A" relationship.',
    keywords: ['inheritance', 'extends', 'is-a', 'subclass', 'superclass', 'reusability'],
  },

  {
    id: 'q-011-multiple-inheritance',
    number: 11,
    languageId: 'java',
    topicId: 'java-011-inheritance-types',
    topicTitle: 'Inheritance Types & Why Java Avoids Multiple Inheritance with Classes',
    question: 'Why does Java not support multiple inheritance through classes?',
    difficulty: 'Intermediate',
    type: 'Conceptual',
    shortAnswer: [
      'To prevent ambiguity known as the "Diamond Problem".',
      'If class D extends both class B and class C, and both B and C override a method from class A, the compiler cannot determine which version D should inherit.',
      'It simplifies language architecture and eliminates complex method resolution order (MRO) rules found in C++.',
      'Multiple inheritance of type and behavior is supported cleanly through interfaces.',
    ],
    deepDive: 'In C++, multiple inheritance can create duplicate copies of base class state unless virtual inheritance is used. James Gosling and the Java designers intentionally prohibited multiple class inheritance to keep Java simple and robust. With Java 8 default interface methods, if two interfaces provide the same default method, the implementing class is required to explicitly resolve the conflict via `InterfaceName.super.method()`.',
    followUpTip: 'Contrast multiple class inheritance (banned) with multiple interface implementation (allowed).',
    keywords: ['multiple inheritance', 'diamond problem', 'ambiguity', 'interfaces', 'class hierarchy'],
  },

  {
    id: 'q-012-constructor-chaining',
    number: 12,
    languageId: 'java',
    topicId: 'java-010-inheritance-chaining',
    topicTitle: 'Inheritance & Constructor Chaining with super()',
    question: 'What is constructor chaining?',
    difficulty: 'Intermediate',
    type: 'Conceptual',
    shortAnswer: [
      'Constructor chaining is the process of calling one constructor from another constructor in succession.',
      'Within the same class: Achieved using `this(...)`.',
      'From a subclass to superclass: Achieved using `super(...)`.',
      'Execution order: Superclass constructor always executes before the subclass constructor body.',
      'Calling `this()` or `super()` must always be the very first statement inside the constructor.',
    ],
    deepDive: 'When constructing a child object, the JVM ensures the superclass state is fully initialized first. If a child constructor does not explicitly include `super(...)` or `this(...)`, Java automatically injects an implicit `super()` no-arg call on line 1. If the parent class does not have an accessible no-arg constructor, a compilation error occurs unless an explicit `super(args)` is called.',
    codeSnippet: {
      language: 'java',
      code: `class Parent {
    Parent() { System.out.println("Parent initialized"); }
}
class Child extends Parent {
    Child() {
        // Implicit super() called here
        System.out.println("Child initialized");
    }
}`,
    },
    followUpTip: 'Be sure to state that `super()` and `this()` cannot both be placed in the same constructor because each requires being the first line.',
    keywords: ['constructor chaining', 'this()', 'super()', 'initialization order', 'first statement'],
  },

  {
    id: 'q-013-this-vs-super',
    number: 13,
    languageId: 'java',
    topicId: 'java-010-inheritance-chaining',
    topicTitle: 'Inheritance & Constructor Chaining with super()',
    question: 'What is the difference between this() and super()?',
    difficulty: 'Beginner',
    type: 'Conceptual',
    shortAnswer: [
      '`this()` invokes an overloaded constructor in the SAME class.',
      '`super()` invokes a constructor in the immediate SUPERCLASS.',
      'Both must be the very first statement in a constructor body if used.',
      'You cannot call both `this()` and `super()` inside the same constructor.',
    ],
    deepDive: '`this` as a keyword is also a reference pointing to the current object instance (e.g. `this.name = name`). `super` as a keyword is a reference pointing to the immediate parent class members (e.g. `super.display()`). As constructor calls, `this(...)` and `super(...)` handle internal initialization delegation.',
    followUpTip: 'Differentiate between the keyword reference (`this.field` / `super.method()`) and constructor calls (`this()` / `super()`).',
    keywords: ['this()', 'super()', 'constructor delegation', 'superclass', 'overloaded constructor'],
  },

  {
    id: 'q-014-overloading',
    number: 14,
    languageId: 'java',
    topicId: 'java-012-polymorphism-dispatch',
    topicTitle: 'Method Overloading, Overriding & Dynamic Dispatch',
    question: 'What is method overloading?',
    difficulty: 'Beginner',
    type: 'Conceptual',
    shortAnswer: [
      'Method overloading occurs when multiple methods in the same class share the exact same name but have different parameter lists.',
      'Parameter differences include: number of parameters, types of parameters, or order of parameter types.',
      'It is resolved at compile time (Static Polymorphism).',
      'Changing ONLY the return type is NOT a valid overload and causes a compile error.',
    ],
    deepDive: 'The compiler matches the method call based on the static reference type and argument types during compilation. If multiple overloaded methods match with widening or autoboxing, Java applies strict precedence rules (Exact match -> Primitive widening -> Autoboxing -> Varargs).',
    codeSnippet: {
      language: 'java',
      code: `int add(int a, int b) { return a + b; }
double add(double a, double b) { return a + b; }
int add(int a, int b, int c) { return a + b + c; }`,
    },
    followUpTip: 'Emphasize that method signature consists of method name and parameter types only. Return type is NOT part of the signature.',
    keywords: ['method overloading', 'compile-time polymorphism', 'static polymorphism', 'method signature', 'parameter list'],
  },

  {
    id: 'q-015-overriding',
    number: 15,
    languageId: 'java',
    topicId: 'java-012-polymorphism-dispatch',
    topicTitle: 'Method Overloading, Overriding & Dynamic Dispatch',
    question: 'What is method overriding?',
    difficulty: 'Beginner',
    type: 'Conceptual',
    shortAnswer: [
      'Method overriding occurs when a subclass provides its own specific implementation of an instance method already defined in its superclass.',
      'The method name, parameter list, and return type (or covariant subtype) must match.',
      'Access modifier cannot be made more restrictive (e.g., protected cannot become private).',
      'It is resolved at runtime (Dynamic Method Dispatch / Runtime Polymorphism).',
      'Marked with the `@Override` annotation for compile-time safety.',
    ],
    deepDive: 'Overriding allows customized polymorphic behavior. If an exception is thrown, the overriding method cannot declare broader checked exceptions than the parent method. Static methods, private methods, and final methods cannot be overridden.',
    followUpTip: 'Mention that `@Override` is optional but best practice because it catches accidental typo bugs at compile time.',
    keywords: ['method overriding', 'runtime polymorphism', '@override', 'covariant return', 'checked exceptions'],
  },

  {
    id: 'q-016-dynamic-dispatch',
    number: 16,
    languageId: 'java',
    topicId: 'java-012-polymorphism-dispatch',
    topicTitle: 'Method Overloading, Overriding & Dynamic Dispatch',
    question: 'What is dynamic method dispatch?',
    difficulty: 'Intermediate',
    type: 'Conceptual',
    shortAnswer: [
      'Dynamic Method Dispatch is the runtime mechanism by which a call to an overridden method is resolved based on the actual Heap object, rather than the reference type.',
      'It is how Java implements Runtime Polymorphism.',
      'Example: `Animal a = new Dog(); a.makeSound();` calls `Dog`\'s makeSound(), not `Animal`\'s.',
    ],
    deepDive: 'The JVM execution engine uses an internal Virtual Method Table (vtable) associated with each class. At runtime, when an instance method is called on a reference, the JVM looks up the method in the vtable of the concrete object instance on the Heap, executing the overridden version.',
    codeSnippet: {
      language: 'java',
      code: `Notification n = new EmailNotification();
n.send(); // At runtime, executes EmailNotification.send()`,
    },
    followUpTip: 'Clarify that dynamic method dispatch applies strictly to non-static, non-private, non-final instance methods.',
    keywords: ['dynamic method dispatch', 'runtime polymorphism', 'vtable', 'method resolution', 'upcasting'],
  },

  {
    id: 'q-017-compile-vs-runtime-polymorphism',
    number: 17,
    languageId: 'java',
    topicId: 'java-012-polymorphism-dispatch',
    topicTitle: 'Method Overloading, Overriding & Dynamic Dispatch',
    question: 'What is the difference between compile-time and runtime polymorphism?',
    difficulty: 'Intermediate',
    type: 'Conceptual',
    shortAnswer: [
      'Compile-time (Static) Polymorphism: Achieved via Method Overloading. Method call is resolved by the compiler based on method signature.',
      'Runtime (Dynamic) Polymorphism: Achieved via Method Overriding. Method call is resolved by JVM at runtime based on actual object type.',
      'Speed: Compile-time resolution is slightly faster as no runtime vtable lookup is needed.',
      'Flexibility: Runtime polymorphism offers higher architectural flexibility and decoupling.',
    ],
    deepDive: 'In compile-time polymorphism, bytecode instructions (such as `invokestatic` or `invokespecial`) bind early. In runtime polymorphism, the `invokevirtual` or `invokeinterface` bytecode instructions perform dynamic dispatch at execution time.',
    followUpTip: 'Use a table or quick summary: Overloading = Static/Compile-time; Overriding = Dynamic/Runtime.',
    keywords: ['compile-time polymorphism', 'runtime polymorphism', 'static binding', 'dynamic binding', 'overloading vs overriding'],
  },

  {
    id: 'q-018-access-modifiers',
    number: 18,
    languageId: 'java',
    topicId: 'java-014-access-modifiers',
    topicTitle: 'Access Modifiers: The Complete 4x4 Matrix',
    question: 'Explain access modifiers in Java with a table.',
    difficulty: 'Beginner',
    type: 'Conceptual',
    shortAnswer: [
      '`private`: Accessible only within the same class.',
      '`default` (package-private): Accessible within the same package.',
      '`protected`: Accessible within the same package AND subclasses in other packages.',
      '`public`: Accessible everywhere across all packages.',
    ],
    deepDive: 'Top-level classes can only be public or default (package-private). Only member/nested classes can be private or protected. Protected access in another package allows access only through inheritance (using `super` or within the subclass code on subclass references).',
    codeSnippet: {
      language: 'text',
      code: `Modifier    | Same Class | Same Package | Subclass (Diff Pkg) | World
-------------------------------------------------------------------
private     |    YES     |      NO      |         NO          |   NO
default     |    YES     |     YES      |         NO          |   NO
protected   |    YES     |     YES      |        YES          |   NO
public      |    YES     |     YES      |        YES          |  YES`,
    },
    followUpTip: 'Be sure to mention that "default" is the absence of an access modifier keyword, not a keyword itself in field declarations.',
    keywords: ['access modifiers', 'private', 'default', 'package-private', 'protected', 'public', 'visibility'],
  },

  {
    id: 'q-019-final-keyword',
    number: 19,
    languageId: 'java',
    topicId: 'java-015-final-keyword',
    topicTitle: 'The final Keyword: Variables, Methods & Classes',
    question: 'What is the final keyword and can a final object be modified?',
    difficulty: 'Intermediate',
    type: 'Conceptual',
    shortAnswer: [
      'Final variable: Cannot be reassigned once assigned a value. Acts as a constant.',
      'Final method: Cannot be overridden by any subclass.',
      'Final class: Cannot be subclassed/extended (e.g., String, Integer).',
      'Can a final object be modified? YES! The reference variable cannot point to another object, but the internal state/fields of the object can still be mutated.',
    ],
    deepDive: 'For example, `final List<String> items = new ArrayList<>();` prevents reassigning `items = new LinkedList<>();`, but `items.add("Java")` is completely valid because the list itself is mutable. To make an object genuinely immutable, its class must be final, its fields private and final, with no mutators (setters).',
    codeSnippet: {
      language: 'java',
      code: `final Product p = new Product();
p.stock = 50; // Allowed! Object state mutated
// p = new Product(); // COMPILE ERROR: Cannot reassign final reference`,
    },
    followUpTip: 'This is a favorite trick question: "Does final make an object immutable?" Answer: "No, final makes the reference immutable, not the object itself."',
    keywords: ['final', 'immutability', 'final reference', 'final method', 'final class', 'constants'],
  },

  {
    id: 'q-020-static-vs-instance',
    number: 20,
    languageId: 'java',
    topicId: 'java-008-static-members',
    topicTitle: 'Static Variables, Methods & Static Initialization Blocks',
    question: 'What is the difference between static variables and instance variables?',
    difficulty: 'Beginner',
    type: 'Conceptual',
    shortAnswer: [
      'Static variables belong to the class; only one copy exists in memory (Metaspace/Class area) shared by all instances.',
      'Instance variables belong to an individual object; each instance created on the heap gets its own separate copy.',
      'Static variables are created when the class is loaded; instance variables are created when an object is instantiated with `new`.',
      'Access static via `ClassName.var`; access instance via `objectReference.var`.',
    ],
    deepDive: 'Static variables are suitable for class-wide constants (`public static final double PI`), counters (e.g. tracking total instances created), and shared cache singletons. Care must be taken in multi-threaded environments, as concurrent mutation of static variables requires synchronization.',
    followUpTip: 'Mention memory locations: static variables reside in Metaspace/Class Area, while instance variables reside inside their object on the Heap.',
    keywords: ['static variable', 'instance variable', 'metaspace', 'heap', 'class level', 'shared memory'],
  },

  {
    id: 'q-021-static-access-instance',
    number: 21,
    languageId: 'java',
    topicId: 'java-008-static-members',
    topicTitle: 'Static Variables, Methods & Static Initialization Blocks',
    question: 'Can a static method access instance variables directly?',
    difficulty: 'Beginner',
    type: 'Conceptual',
    shortAnswer: [
      'NO. A static method cannot access instance variables or instance methods directly.',
      'Reason: Static methods are executed in the class context without an instantiated object. There is no implicit `this` reference.',
      'Solution: To access an instance variable inside a static method, you must explicitly create or pass an object reference.',
    ],
    deepDive: 'The compiler raises the error: "non-static variable cannot be referenced from a static context". Since static methods can be called before any object is created (`ClassName.method()`), the JVM would have no way to know which object\'s instance variable to read or write.',
    codeSnippet: {
      language: 'java',
      code: `class Demo {
    int count = 10;
    static void test() {
        // System.out.println(count); // Error!
        Demo d = new Demo();
        System.out.println(d.count); // Valid via explicit reference
    }
}`,
    },
    followUpTip: 'Explain that the absence of the hidden `this` pointer argument in bytecode is the technical reason static methods cannot access instance fields directly.',
    keywords: ['static context', 'instance variable', 'this pointer', 'non-static variable', 'compiler error'],
  },

  {
    id: 'q-022-stack-vs-heap',
    number: 22,
    languageId: 'java',
    topicId: 'java-004-stack-heap',
    topicTitle: 'JVM Memory: Stack vs Heap',
    question: 'What is the difference between stack and heap memory in Java?',
    difficulty: 'Intermediate',
    type: 'Conceptual',
    shortAnswer: [
      'Stack: Thread-private memory. Stores method execution frames, local primitives, and object reference pointers. Follows LIFO. Fast allocation; automatically cleared when method returns.',
      'Heap: Globally shared memory across all threads. Stores all objects and arrays. Managed by the Garbage Collector.',
      'Errors: Exhausted stack produces `StackOverflowError` (e.g. infinite recursion); exhausted heap produces `OutOfMemoryError: Java heap space`.',
    ],
    deepDive: 'Stack memory operations are fast because memory allocation is simply moving a CPU stack pointer up and down. Heap memory involves dynamic allocation, fragmentation handling, and periodic Garbage Collection pauses (Young Generation Eden/Survivor, Old Generation).',
    followUpTip: 'Summarize with: "Stack holds execution state and local references; Heap holds all objects and arrays."',
    keywords: ['stack', 'heap', 'jvm memory', 'stackoverflowerror', 'outofmemoryerror', 'garbage collection'],
  },

  {
    id: 'q-023-arrays-jagged',
    number: 23,
    languageId: 'java',
    topicId: 'java-005-arrays',
    topicTitle: 'Arrays: 1D, 2D, 3D & Jagged Arrays',
    question: 'Explain 1D, 2D, 3D, and jagged arrays in Java.',
    difficulty: 'Intermediate',
    type: 'Conceptual',
    shortAnswer: [
      '1D Array: A linear sequence of fixed elements accessed by a single index: `int[] a = {1, 2, 3};`.',
      '2D Array: An array of 1D array references, representing rows and columns: `int[][] m = {{1, 2}, {3, 4}};`.',
      '3D Array: An array of 2D arrays, representing cubes/tensors: `int[][][] cube;`.',
      'Jagged (Ragged) Array: A multi-dimensional array whose member arrays have different lengths (e.g. row 0 has 2 elements, row 1 has 5 elements).',
    ],
    deepDive: 'Because Java does not allocate true contiguous 2D memory blocks (unlike C/C++), a 2D array is literally an array of pointers to other independent 1D arrays on the Heap. This makes jagged arrays natural in Java, saving memory when row lengths are uneven (such as monthly days or order items per cart).',
    codeSnippet: {
      language: 'java',
      code: `int[][] jagged = new int[3][];
jagged[0] = new int[2]; // 2 elements
jagged[1] = new int[5]; // 5 elements
jagged[2] = new int[1]; // 1 element`,
    },
    followUpTip: 'Note that the first dimension size is mandatory at allocation: `new int[3][]` is valid, but `new int[][3]` is a compile error.',
    keywords: ['arrays', '1d', '2d', '3d', 'jagged array', 'ragged array', 'matrix'],
  },

  {
    id: 'q-024-packages',
    number: 24,
    languageId: 'java',
    topicId: 'java-013-packages',
    topicTitle: 'Packages, Directory Structures & Imports',
    question: 'What is a package and why do we use it?',
    difficulty: 'Beginner',
    type: 'Conceptual',
    shortAnswer: [
      'A package is a container or namespace that groups related classes, interfaces, and subpackages.',
      'Prevents naming conflicts (e.g., `java.util.Date` vs `java.sql.Date`).',
      'Controls access via package-private (default) and protected visibility.',
      'Organizes large codebases into modular directory structures.',
      'Facilitates easier distribution and JAR packaging.',
    ],
    deepDive: 'The package statement must be the first line of a Java source file. When compiled with `javac -d out`, the compiler creates matching folders on disk corresponding to package dots (e.g., `package com.ecommerce.orders;` generates `com/ecommerce/orders`). Classes in `java.lang` are implicitly imported everywhere.',
    followUpTip: 'Remember that `import java.util.*;` imports types directly inside `java.util`, but does NOT import subpackages like `java.util.concurrent.*`.',
    keywords: ['packages', 'namespace', 'naming collision', 'imports', 'directory structure'],
  },

  {
    id: 'q-025-override-tostring',
    number: 25,
    languageId: 'java',
    topicId: 'java-016-object-tostring',
    topicTitle: 'The Object Class & Overriding toString()',
    question: 'Why do we override toString()?',
    difficulty: 'Beginner',
    type: 'Conceptual',
    shortAnswer: [
      'The default `Object.toString()` returns `ClassName@hexHashCode` (e.g., `Student@1b6d3586`), which is unreadable for debugging.',
      'Overriding `toString()` provides human-readable textual representation showing the object\'s field values.',
      '`System.out.println(obj)`, string concatenation, and loggers automatically invoke `toString()`.',
    ],
    deepDive: 'Overriding toString() is crucial for logs, exception diagnostic traces, and interactive debugging in IDEs. Modern record classes (Java 14+) and libraries like Lombok (@ToString) generate clear toString() implementations automatically.',
    codeSnippet: {
      language: 'java',
      code: `@Override
public String toString() {
    return "Product[name=" + name + ", stock=" + stock + "]";
}`,
    },
    followUpTip: 'Add that the hex suffix in the default implementation is an identity hash code, NOT an exact physical memory address.',
    keywords: ['tostring', 'object class', 'string representation', 'logging', 'debugging'],
  },

  {
    id: 'q-026-override-constructors',
    number: 26,
    languageId: 'java',
    topicId: 'java-007-constructors',
    topicTitle: 'Constructors & Constructor Overloading',
    question: 'Can constructors be overridden?',
    difficulty: 'Beginner',
    type: 'Conceptual',
    shortAnswer: [
      'NO, constructors cannot be overridden.',
      'Constructors are NOT members of a class and are NOT inherited by subclasses.',
      'Overriding requires inheritance; since a subclass does not inherit parent constructors, it cannot override them.',
      'A constructor must have the exact name of its declaring class, while a subclass has a different name.',
      'Constructors CAN be overloaded within the same class.',
    ],
    deepDive: 'While a child class cannot override a parent constructor, it can invoke parent constructors using `super()` or `super(args)`. Subclasses must define their own constructors or accept the compiler-generated default constructor.',
    followUpTip: 'State clearly: "Constructors can be overloaded, but NEVER overridden."',
    keywords: ['constructors', 'overriding', 'inheritance', 'overloading', 'super()'],
  },

  {
    id: 'q-027-multiple-public-classes',
    number: 27,
    languageId: 'java',
    topicId: 'java-017-public-classes',
    topicTitle: 'Public Classes & Java Source File Rules',
    question: 'Can one Java source file contain multiple public top-level classes?',
    difficulty: 'Beginner',
    type: 'Conceptual',
    shortAnswer: [
      'NO. Under standard file-based Java compilation, a source file can have at most ONE public top-level class.',
      'The name of the public top-level class MUST match the file name exactly (e.g. `public class App` in `App.java`).',
      'A single `.java` file CAN contain multiple non-public (package-private) top-level classes.',
      'Nested/inner classes can have multiple public declarations inside a single file.',
    ],
    deepDive: 'This rule enables the Java compiler to quickly locate class definitions on the classpath without parsing every single file in a project. When javac searches for `com.example.Order`, it directly inspects `Order.java`.',
    codeSnippet: {
      language: 'java',
      code: `// Allowed in App.java:
public class App { } // Matches App.java
class HelperOne { }  // Package-private
class HelperTwo { }  // Package-private`,
    },
    followUpTip: 'Clarify that this restriction applies only to TOP-LEVEL classes; multiple public static inner/nested classes are fully permitted.',
    keywords: ['public class', 'source file rules', 'file naming', 'top-level class', 'package-private'],
  },

  {
    id: 'q-028-class-forname',
    number: 28,
    languageId: 'java',
    topicId: 'java-009-class-forname',
    topicTitle: 'Class.forName() & Dynamic Class Loading',
    question: 'What does Class.forName() do?',
    difficulty: 'Intermediate',
    type: 'Conceptual',
    shortAnswer: [
      '`Class.forName(String className)` dynamically loads and initializes a class at runtime using its fully qualified name.',
      'It triggers the class loader and executes the class\'s `static` initialization blocks.',
      'Historically famous in JDBC to load database drivers (e.g., `Class.forName("com.mysql.cj.jdbc.Driver")`).',
      'Throws `ClassNotFoundException` if the class cannot be found on the classpath.',
    ],
    deepDive: 'Classes in Java are loaded lazily. `Class.forName` is overloaded: `Class.forName(name, initialize, classLoader)` allows you to specify whether static blocks should execute immediately (`initialize = true`) or wait. In modern JDBC 4.0+, manual `Class.forName` is rarely required due to Java SPI `java.sql.Driver` service provider configuration.',
    codeSnippet: {
      language: 'java',
      code: `try {
    Class<?> c = Class.forName("com.mysql.cj.jdbc.Driver");
    System.out.println("Driver loaded: " + c.getName());
} catch (ClassNotFoundException e) {
    e.printStackTrace();
}`,
    },
    followUpTip: 'Explain that `Class.forName()` does NOT instantiate an object; it loads the `java.lang.Class` representation and initializes static state.',
    keywords: ['class.forname', 'reflection', 'class loader', 'dynamic loading', 'jdbc', 'initialization'],
  },

  {
    id: 'q-029-enum-definition',
    number: 29,
    languageId: 'java',
    topicId: 'java-enum',
    topicTitle: 'Enums in Java',
    question: 'What is an enum in Java and when would you use it?',
    difficulty: 'Beginner',
    type: 'Conceptual',
    shortAnswer: [
      'An enum (enumeration) is a special Java data type representing a fixed, known set of named constants.',
      'Provides compile-time type safety over arbitrary strings or integers, eliminating typos and invalid states.',
      'Commonly used for order statuses, payment modes, user roles, days of the week, and application modes.',
      'Enums are full classes in Java: they can have instance fields, constructors, and methods.',
    ],
    deepDive: 'Under the hood, every enum is compiled into a final class that implicitly extends java.lang.Enum<E>. Because Java does not permit multiple class inheritance, an enum cannot extend any other class, but it can implement interfaces. Each constant is a public static final instance initialized during class loading.',
    codeSnippet: {
      language: 'java',
      code: `enum OrderStatus {
    PLACED, PACKED, SHIPPED, DELIVERED, CANCELLED
}

OrderStatus status = OrderStatus.SHIPPED;
switch (status) {
    case SHIPPED -> System.out.println("On the way!");
    case DELIVERED -> System.out.println("Delivered!");
    default -> System.out.println("Processing...");
}`,
    },
    followUpTip: 'Mention that enum constructors are implicitly private to prevent unauthorized instantiation outside the declared constants.',
    keywords: ['enum', 'enumeration', 'type safety', 'constants', 'OrderStatus', 'values'],
  },

  {
    id: 'q-030-enum-values-method',
    number: 30,
    languageId: 'java',
    topicId: 'java-enum',
    topicTitle: 'Enums in Java',
    question: 'What does the enum values() method return, and why does printing an enum array directly show [LStatus;@...?',
    difficulty: 'Beginner',
    type: 'Conceptual',
    shortAnswer: [
      'Status.values() returns an array containing all declared constants in their declaration order.',
      'In Java, arrays do not override Object.toString(); printing an array directly outputs its type signature and identity hash code like [LStatus;@7ad041f3.',
      'To display array elements, iterate with an enhanced for loop or use Arrays.toString(Status.values()).',
    ],
    deepDive: 'The values() method is synthesized by the javac compiler into every enum class at compile time (it is not inherited from java.lang.Enum). Calling values() creates a defensive shallow copy of the internal constant array to prevent caller modifications.',
    codeSnippet: {
      language: 'java',
      code: `Status[] statuses = Status.values();
// Printing array directly prints memory hash: [LStatus;@...
System.out.println(statuses); 

// Correct: Loop or Arrays.toString()
for (Status s : statuses) {
    System.out.println(s);
}
System.out.println(Arrays.toString(Status.values()));`,
    },
    followUpTip: 'Point out that calling values() allocates a new array each time; in performance-critical hot loops, cache the array in a local variable.',
    keywords: ['values()', 'enum array', 'Arrays.toString', '[LStatus', 'compiler generated', 'loop'],
  },

  {
    id: 'q-031-enum-valueof',
    number: 31,
    languageId: 'java',
    topicId: 'java-enum',
    topicTitle: 'Enums in Java',
    question: 'What does Enum.valueOf() do and what happens if the constant name is not found?',
    difficulty: 'Intermediate',
    type: 'Conceptual',
    shortAnswer: [
      'Status.valueOf(String name) returns the enum constant matching the exact case-sensitive string identifier.',
      'If the provided name does not match any declared constant, it throws an unchecked IllegalArgumentException.',
      'If the provided string argument is null, it throws a NullPointerException.',
    ],
    deepDive: 'When parsing untrusted user input or query strings into enum values, wrap the valueOf call in a try-catch block for IllegalArgumentException or maintain a static Map<String, Status> cache for case-insensitive lookup.',
    codeSnippet: {
      language: 'java',
      code: `try {
    Status s = Status.valueOf("Success"); // Exact match
    System.out.println("Parsed: " + s);
} catch (IllegalArgumentException e) {
    System.out.println("Invalid constant name provided!");
}`,
    },
    followUpTip: 'Explain how you would write a safe lookup method that returns Optional<Status> instead of throwing an exception.',
    keywords: ['valueOf()', 'IllegalArgumentException', 'lookup', 'case-sensitive', 'string parsing'],
  },

  {
    id: 'q-032-enum-ordinal',
    number: 32,
    languageId: 'java',
    topicId: 'java-enum',
    topicTitle: 'Enums in Java',
    question: 'What does ordinal() return and why should it NOT be stored in a database as an ID?',
    difficulty: 'Intermediate',
    type: 'Conceptual',
    shortAnswer: [
      'status.ordinal() returns the zero-based declaration index of the constant in the enum declaration.',
      'Never use ordinal as a database ID or wire protocol key: reordering, inserting, or deleting enum constants silently alters ordinal positions.',
      'A stored database value 1 that previously meant Failed could silently mean Running if a developer inserts Pending first.',
      'Best practice: store status.name() or an explicit immutable code field in persistence layers.',
    ],
    deepDive: 'The ordinal() method was created exclusively for high-performance internal bit-vector data structures like EnumSet and EnumMap. In JPA/Hibernate, always annotate enum entity mappings with @Enumerated(EnumType.STRING) rather than the default EnumType.ORDINAL.',
    codeSnippet: {
      language: 'java',
      code: `enum Status { Running, Failed } // Running=0, Failed=1
// If someone reorders or adds Pending:
enum Status { Pending, Running, Failed } // Running=1, Failed=2!
// All historical database rows with ordinal=1 now point to the wrong status!`,
    },
    followUpTip: 'Mention that JPA defaults to ORDINAL if @Enumerated is omitted, which has historically caused serious production database corruptions.',
    keywords: ['ordinal()', 'database persistence', 'JPA', 'EnumType.STRING', 'EnumSet', 'EnumMap'],
  },

  {
    id: 'q-033-enum-fields-and-methods',
    number: 33,
    languageId: 'java',
    topicId: 'java-enum',
    topicTitle: 'Enums in Java',
    question: 'Can an enum have fields, constructors, and custom methods in Java?',
    difficulty: 'Intermediate',
    type: 'Conceptual',
    shortAnswer: [
      'YES! Enums in Java are full-fledged class types.',
      'They can have instance variables, private constructors, getters, setters, and business logic methods.',
      'Enum constructors are always private and run once per constant during class loading.',
      'Constants must be defined first at the top of the enum body, followed by a semicolon ; before members.',
    ],
    deepDive: 'Enums can also implement interfaces and define constant-specific method bodies where each constant overrides an abstract method. For example, an Operation enum can declare an abstract double apply(double x, double y) implemented differently by PLUS, MINUS, MULTIPLY, and DIVIDE.',
    codeSnippet: {
      language: 'java',
      code: `enum HttpStatus {
    OK(200, "Success"),
    NOT_FOUND(404, "Page Not Found");

    private final int code;
    private final String description;

    HttpStatus(int code, String description) { // Private constructor
        this.code = code;
        this.description = description;
    }
    public int getCode() { return code; }
    public String getDescription() { return description; }
}`,
    },
    followUpTip: 'Confirm that you cannot use new HttpStatus() anywhere in code; instances are strictly managed by the JVM.',
    keywords: ['enum constructor', 'fields', 'methods', 'HttpStatus', 'type-safe constants'],
  },

  {
    id: 'q-034-annotation-definition',
    number: 34,
    languageId: 'java',
    topicId: 'java-annotations',
    topicTitle: 'Annotations in Java',
    question: 'What is an annotation in Java and what does it do?',
    difficulty: 'Beginner',
    type: 'Conceptual',
    shortAnswer: [
      'An annotation is a structured form of metadata attached to declarations (classes, methods, fields, parameters, etc.).',
      'It begins with the @ symbol (e.g., @Override, @Deprecated, @FunctionalInterface).',
      'Annotations do NOT execute code or alter program semantics by themselves simply by being present.',
      'They are processed by compilers (to detect errors), build tools, code generators, or runtime frameworks using Reflection.',
    ],
    deepDive: 'Java includes standard built-in annotations in java.lang and meta-annotations in java.lang.annotation. Modern Java frameworks like Spring Boot, Quarkus, and JUnit 5 rely on annotations to replace verbose XML configuration with declarative code attributes.',
    codeSnippet: {
      language: 'java',
      code: `@Entity
@Table(name = "users")
public class User {
    @Id @GeneratedValue
    private Long id;
}`,
    },
    followUpTip: 'Emphasize that annotations are passive data markers; without an active processor or reflection reader, they perform no actions.',
    keywords: ['annotation', 'metadata', 'reflection', 'compiler', 'framework', '@Override'],
  },

  {
    id: 'q-035-override-annotation',
    number: 35,
    languageId: 'java',
    topicId: 'java-annotations',
    topicTitle: 'Annotations in Java',
    question: 'How does @Override help catch errors at compile time, and does it prevent method overloading?',
    difficulty: 'Beginner',
    type: 'Conceptual',
    shortAnswer: [
      '@Override instructs the compiler to verify that the annotated method actually overrides a superclass method or implements an interface method.',
      'If there is a typo in method name or parameter signature, the compiler throws a compile-time error rather than treating it as an unintentional new method.',
      'Does it prevent overloading? NO! You can freely overload methods with different parameter lists in the same or subclass.',
      '@Override solely validates that this specific annotated method is a valid override.',
    ],
    deepDive: 'Without @Override, if a parent class has void calculate(int x) and a subclass writes void calculate(long x), Java compiles it as a new overloaded method. Runtime calls on the parent interface will bypass the child implementation. @Override immediately flags the signature mismatch as a compilation failure.',
    codeSnippet: {
      language: 'java',
      code: `class Parent {
    public void showData() { System.out.println("Parent"); }
}

class Child extends Parent {
    @Override
    public void showData() { System.out.println("Child"); } // Verified override!

    // Overloading is still 100% permitted:
    public void showData(String extra) { System.out.println(extra); }
}`,
    },
    followUpTip: 'Always remember: Overloading = same method name with different parameters. Overriding = subclass providing identical signature of an inherited instance method.',
    keywords: ['@Override', 'overloading vs overriding', 'compile-time check', 'signature mismatch'],
  },

  {
    id: 'q-036-deprecated-annotation',
    number: 36,
    languageId: 'java',
    topicId: 'java-annotations',
    topicTitle: 'Annotations in Java',
    question: 'What is the purpose of @Deprecated and how should it be used?',
    difficulty: 'Beginner',
    type: 'Conceptual',
    shortAnswer: [
      '@Deprecated marks a program element (class, method, field) as obsolete, discouraged, and potentially dangerous.',
      'The compiler issues a warning whenever code references a deprecated element.',
      'Java 9 added two attributes: since (the version when deprecated) and forRemoval (boolean flag indicating if it will be deleted in a future release).',
      'Should always be accompanied by a Javadoc @deprecated tag explaining the replacement API.',
    ],
    deepDive: 'When designing public libraries or microservice contracts, deprecating old methods before removal gives consumers a clean migration path. You can suppress warnings in legacy callers with @SuppressWarnings("deprecation").',
    codeSnippet: {
      language: 'java',
      code: `/**
 * @deprecated Replaced by {@link #fetchUserById(UUID)}
 */
@Deprecated(since = "2.0", forRemoval = true)
public User getUser(int legacyId) {
    return fetchUserById(UUID.nameUUIDFromBytes(String.valueOf(legacyId).getBytes()));
}`,
    },
    followUpTip: 'Mention the forRemoval flag: if true, it signals a hard deadline where the API will be deleted in subsequent releases.',
    keywords: ['@Deprecated', 'deprecation', 'forRemoval', 'since', 'compiler warning'],
  },

  {
    id: 'q-037-suppresswarnings',
    number: 37,
    languageId: 'java',
    topicId: 'java-annotations',
    topicTitle: 'Annotations in Java',
    question: 'What is @SuppressWarnings and when should it be used?',
    difficulty: 'Intermediate',
    type: 'Conceptual',
    shortAnswer: [
      '@SuppressWarnings instructs the javac compiler to silence specific compiler warning categories in the annotated scope.',
      'Common warning categories include "unchecked" (raw types/casts), "deprecation" (using deprecated APIs), and "unused" (unused variables).',
      'Best practice: Apply to the smallest possible scope (a local variable or helper method) rather than the entire class.',
      'Always include a code comment justifying why suppressing the warning is safe.',
    ],
    deepDive: 'Overusing @SuppressWarnings("all") masks critical bugs, dead code, and memory leaks. Use it only when performing safe operations that the Java type system cannot formally verify, such as casting from an ObjectInputStream or generic array reflection.',
    codeSnippet: {
      language: 'java',
      code: `// Good: scoped to single assignment
@SuppressWarnings("unchecked")
List<String> items = (List<String>) in.readObject();`,
    },
    followUpTip: 'Explain that @SuppressWarnings has RetentionPolicy.SOURCE; it is stripped by the compiler and not present in .class files.',
    keywords: ['@SuppressWarnings', 'unchecked', 'deprecation', 'compiler warnings', 'suppress'],
  },

  {
    id: 'q-038-functional-interface-annotation',
    number: 38,
    languageId: 'java',
    topicId: 'java-annotations',
    topicTitle: 'Annotations in Java',
    question: 'What does @FunctionalInterface check and is it mandatory?',
    difficulty: 'Intermediate',
    type: 'Conceptual',
    shortAnswer: [
      '@FunctionalInterface verifies at compile time that the annotated interface contains EXACTLY ONE abstract method.',
      'If the interface contains zero abstract methods or more than one, the compiler emits a compilation error.',
      'Is it mandatory? NO. Any interface with exactly one abstract method is automatically a functional interface (SAM), even without the annotation.',
      'Using the annotation is strongly advised to prevent future developers from adding a second abstract method and breaking lambdas.',
    ],
    deepDive: 'Default methods and static methods with concrete bodies do not count toward the single abstract method count. Furthermore, abstract methods that override public methods of java.lang.Object (like boolean equals(Object obj)) do not count against the SAM rule.',
    codeSnippet: {
      language: 'java',
      code: `@FunctionalInterface
interface Calculator {
    int calculate(int a, int b); // Exactly one abstract method

    default void log(int result) { System.out.println("Result: " + result); }
    static Calculator addition() { return (a, b) -> a + b; }
}`,
    },
    followUpTip: 'Cite standard functional interfaces in java.util.function like Predicate, Function, Consumer, and Supplier.',
    keywords: ['@FunctionalInterface', 'SAM', 'single abstract method', 'lambda target', 'default methods'],
  },

  {
    id: 'q-039-meta-annotations',
    number: 39,
    languageId: 'java',
    topicId: 'java-annotations',
    topicTitle: 'Annotations in Java',
    question: 'What do @Retention and @Target configure in custom Java annotations?',
    difficulty: 'Intermediate',
    type: 'Conceptual',
    shortAnswer: [
      '@Retention defines the lifespan of the annotation metadata: SOURCE (compiler only), CLASS (in bytecode, ignored at runtime), or RUNTIME (inspectable via Reflection).',
      '@Target restricts where the annotation may be applied (ElementType.METHOD, TYPE, FIELD, PARAMETER, CONSTRUCTOR, etc.).',
      'For runtime reflection frameworks (Spring, Hibernate, Jackson), @Retention(RetentionPolicy.RUNTIME) is mandatory.',
    ],
    deepDive: 'The default retention policy if omitted is RetentionPolicy.CLASS. Omitting RUNTIME on custom annotations is a frequent developer mistake: calling method.getAnnotation(...) returns null if retention was left as CLASS.',
    codeSnippet: {
      language: 'java',
      code: `import java.lang.annotation.*;

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
public @interface AuditLog {
    String action() default "DEFAULT_ACTION";
}`,
    },
    followUpTip: 'Remember the 3 policies: SOURCE (Lombok, @Override), CLASS (bytecode tools), RUNTIME (Spring, Reflection).',
    keywords: ['@Retention', '@Target', 'RetentionPolicy', 'ElementType', 'meta-annotations', 'reflection'],
  },

  {
    id: 'q-040-custom-annotation-execution',
    number: 40,
    languageId: 'java',
    topicId: 'java-annotations',
    topicTitle: 'Annotations in Java',
    question: 'Do custom annotations automatically execute logic when placed on a class or method?',
    difficulty: 'Intermediate',
    type: 'Conceptual',
    shortAnswer: [
      'NO. Custom annotations are strictly passive metadata containers.',
      'Writing @Important or @Transactional on a method does nothing on its own during program execution.',
      'An external processor, such as Spring AOP, a bytecode enhancer, or custom Reflection code, must scan for the annotation and execute the intended behavior.',
    ],
    deepDive: 'For example, Spring achieves transactional behavior by creating dynamic proxies around beans. When a method is called, the proxy checks if @Transactional is present, opens a database transaction, executes the method, and commits or rolls back based on exceptions.',
    codeSnippet: {
      language: 'java',
      code: `Method method = Report.class.getMethod("generate");
if (method.isAnnotationPresent(Important.class)) {
    System.out.println("Found @Important! Executing special logging...");
}`,
    },
    followUpTip: 'Distinguish between compile-time annotation processors (APT) like MapStruct/Lombok and runtime reflection processors like Spring/Jackson.',
    keywords: ['custom annotation', 'AOP', 'reflection', 'isAnnotationPresent', 'passive metadata'],
  },

  {
    id: 'q-041-interface-categories',
    number: 41,
    languageId: 'java',
    topicId: 'java-interface-types',
    topicTitle: 'Types of Interfaces',
    question: 'What are the differences between Normal, Functional, and Marker interfaces in Java?',
    difficulty: 'Beginner',
    type: 'Conceptual',
    shortAnswer: [
      'Normal Interface: Declares multiple (usually 2 or more) abstract methods specifying a full capability contract (e.g., List, Map).',
      'Functional Interface (SAM): Declares exactly ONE abstract method; serves as the target for lambda expressions and method references (e.g., Runnable, Consumer).',
      'Marker Interface: Contains ZERO abstract methods and no fields; acts as a type tag signaling a runtime capability to the JVM or API (e.g., Serializable, Cloneable).',
    ],
    deepDive: 'These groupings are design and pedagogical patterns rather than separate keywords: all three use the interface keyword. In modern Java, custom marker interfaces are mostly superseded by custom annotations with runtime retention, but core JVM markers remain foundational.',
    codeSnippet: {
      language: 'text',
      code: `Type        | Abstract Methods | Primary Usage
--------------------------------------------------------------
Normal      | >= 2             | Multi-operation contract (List, Map)
Functional  | Exactly 1        | Lambdas & method references (Runnable)
Marker      | 0                | JVM / API capability tag (Serializable)`,
    },
    followUpTip: 'Remind interviewers that functional interfaces can have any number of default and static methods alongside their single abstract method.',
    keywords: ['normal interface', 'functional interface', 'marker interface', 'SAM', 'Serializable', 'Cloneable'],
  },

  {
    id: 'q-042-marker-interface-mechanism',
    number: 42,
    languageId: 'java',
    topicId: 'java-interface-types',
    topicTitle: 'Types of Interfaces',
    question: 'What is a marker interface and how does the JVM or API verify it at runtime?',
    difficulty: 'Intermediate',
    type: 'Conceptual',
    shortAnswer: [
      'A marker interface declares no methods; implementing it tags a class with an authorized type.',
      'The JVM or library checks it at runtime using the instanceof operator.',
      'Example: ObjectOutputStream checks if (obj instanceof Serializable). If false, it throws NotSerializableException.',
      'Similarly, Object.clone() checks if (obj instanceof Cloneable); otherwise it throws CloneNotSupportedException.',
    ],
    deepDive: 'Why use marker interfaces instead of annotations? Marker interfaces define a distinct Java compile-time type. A method signature can enforce public void save(Serializable s), ensuring only marked classes compile. Annotations cannot be used as method parameter types.',
    codeSnippet: {
      language: 'java',
      code: `public class Student implements Serializable {
    private static final long serialVersionUID = 1L;
    // No methods needed to satisfy interface, but tags class for JVM serialization!
}`,
    },
    followUpTip: 'Name the two most prominent marker interfaces in java.lang / java.io: Cloneable and Serializable.',
    keywords: ['marker interface', 'instanceof', 'NotSerializableException', 'Serializable', 'Cloneable'],
  },

  {
    id: 'q-043-lambda-requirements',
    number: 43,
    languageId: 'java',
    topicId: 'java-lambda-expressions',
    topicTitle: 'Lambda Expressions',
    question: 'What is a Lambda Expression in Java and what are its requirements?',
    difficulty: 'Intermediate',
    type: 'Conceptual',
    shortAnswer: [
      'A lambda expression is an anonymous function (code without a declared name) passed as data.',
      'Syntax: (parameters) -> expression or (parameters) -> { statements; }.',
      'Requirement: A lambda REQUIRES a functional interface (SAM) as its target type.',
      'Cannot be assigned directly to an abstract class or an interface with multiple abstract methods.',
    ],
    deepDive: 'Introduced in Java 8, lambdas do not compile into inner class files. Instead, javac emits the invokedynamic bytecode instruction. The JVM bootstraps the call site via LambdaMetafactory, which reduces memory footprint and class loading overhead.',
    codeSnippet: {
      language: 'java',
      code: `List<String> names = Arrays.asList("Suhel", "Aman", "Zoya");
// Lambda implements Comparator<String>
names.sort((first, second) -> first.compareTo(second));
System.out.println(names); // [Aman, Suhel, Zoya]`,
    },
    followUpTip: 'Explain that lambdas can reference effectively final local variables from their enclosing scope.',
    keywords: ['lambda expression', 'functional interface', 'invokedynamic', 'arrow operator', 'comparator'],
  },

  {
    id: 'q-044-anonymous-class-vs-lambda',
    number: 44,
    languageId: 'java',
    topicId: 'java-anonymous-classes',
    topicTitle: 'Anonymous Classes',
    question: 'What is an Anonymous Class and when should you prefer it over a Lambda?',
    difficulty: 'Intermediate',
    type: 'Conceptual',
    shortAnswer: [
      'An anonymous class is an inner class declared and instantiated in a single expression using new SuperType() { ... } without an explicit class name.',
      'Prefer an Anonymous Class when: (1) You need to extend a class (abstract or concrete); (2) You need to implement an interface with multiple abstract methods; (3) You need to declare private state fields.',
      'Prefer a Lambda when: Implementing a single abstract method of a functional interface concisely.',
    ],
    deepDive: 'Anonymous classes create distinct .class files during compilation (e.g., Hello$1.class). They have their own distinct this reference and can define mutable instance state fields. Lambdas are purely lightweight functional expressions with no independent class identity.',
    codeSnippet: {
      language: 'java',
      code: `// Anonymous subclass overriding a concrete class method:
Greeting greeting = new Greeting() {
    @Override
    void sayHello() {
        System.out.println("Hello from an anonymous subclass!");
    }
};
greeting.sayHello();`,
    },
    followUpTip: 'Clarify that lambdas CANNOT extend classes; if you must subclass an existing class on the fly, an anonymous class is mandatory.',
    keywords: ['anonymous class', 'anonymous inner class', 'subclassing', 'lambda comparison', 'bytecode'],
  },

  {
    id: 'q-045-this-keyword-lambda-vs-anonymous',
    number: 45,
    languageId: 'java',
    topicId: 'java-anonymous-classes',
    topicTitle: 'Anonymous Classes',
    question: 'How does the this keyword behave differently in a Lambda vs an Anonymous Class?',
    difficulty: 'Intermediate',
    type: 'Conceptual',
    shortAnswer: [
      'In an Anonymous Class: this refers to the instance of the anonymous class itself.',
      'In a Lambda Expression: this refers to the enclosing instance of the outer class (lexical scoping).',
      'Lambdas do not introduce a new scope for this or super.',
    ],
    deepDive: 'This difference is crucial in UI event handlers or asynchronous tasks. Inside a lambda, calling this.myMethod() calls the outer enclosing class method directly. In an anonymous inner class, calling this refers to the inner class, requiring OuterClass.this to reach the outer scope.',
    codeSnippet: {
      language: 'java',
      code: `class Demo {
    void run() {
        Runnable anon = new Runnable() {
            public void run() {
                System.out.println(this.getClass().getName()); // Demo$1
            }
        };
        Runnable lambda = () -> {
            System.out.println(this.getClass().getName()); // Demo (outer class!)
        };
    }
}`,
    },
    followUpTip: 'Remember the buzzword: "Lambdas are lexically scoped, whereas anonymous classes define their own distinct lexical scope."',
    keywords: ['this keyword', 'lexical scope', 'anonymous class this', 'lambda this', 'enclosing instance'],
  },

  {
    id: 'q-046-serialization-definition',
    number: 46,
    languageId: 'java',
    topicId: 'java-serialization',
    topicTitle: 'Object Serialization and Deserialization',
    question: 'What is Serialization and Deserialization in Java?',
    difficulty: 'Beginner',
    type: 'Conceptual',
    shortAnswer: [
      'Serialization is the process of converting an in-memory Java object graph into a portable sequence of bytes.',
      'Deserialization is the reverse process: reading the byte stream to reconstruct the exact object graph in heap memory.',
      'Standard Java serialization uses ObjectOutputStream and ObjectInputStream.',
      'Used for persisting session states, writing objects to disk, or network transmission (RMI).',
    ],
    deepDive: 'During serialization, Java traverses the entire object graph reachable from the root object. Every referenced object must also implement Serializable; otherwise a NotSerializableException is thrown midway through execution.',
    codeSnippet: {
      language: 'java',
      code: `// Write (Serialize):
try (ObjectOutputStream out = new ObjectOutputStream(new FileOutputStream("student.ser"))) {
    out.writeObject(new Student("Suhel", 25));
}

// Read (Deserialize):
try (ObjectInputStream in = new ObjectInputStream(new FileInputStream("student.ser"))) {
    Student restored = (Student) in.readObject();
}`,
    },
    followUpTip: 'Note that deserialization instantiates objects without invoking any constructor of the serialized class.',
    keywords: ['serialization', 'deserialization', 'ObjectOutputStream', 'ObjectInputStream', 'byte stream'],
  },

  {
    id: 'q-047-serializable-interface',
    number: 47,
    languageId: 'java',
    topicId: 'java-serialization',
    topicTitle: 'Object Serialization and Deserialization',
    question: 'Why does a class implement the java.io.Serializable interface?',
    difficulty: 'Beginner',
    type: 'Conceptual',
    shortAnswer: [
      'Serializable is a marker interface that authorizes Java\'s serialization engine to serialize instances of the class.',
      'If a class does NOT implement Serializable, calling ObjectOutputStream.writeObject(obj) throws java.io.NotSerializableException.',
      'It serves as an explicit opt-in security mechanism to prevent accidental leakage of sensitive internal object state.',
    ],
    deepDive: 'Making a class serializable makes its private fields part of an exported API contract. Subclasses of a serializable parent class are automatically serializable by inheritance, even if they do not explicitly declare implements Serializable.',
    codeSnippet: {
      language: 'java',
      code: `public class Student implements Serializable {
    private static final long serialVersionUID = 1L;
    private String name;
    private int age;
}`,
    },
    followUpTip: 'Mention that java.lang.Object does not implement Serializable, so classes must explicitly choose to implement it.',
    keywords: ['Serializable', 'marker interface', 'NotSerializableException', 'opt-in', 'object graph'],
  },

  {
    id: 'q-048-serialversionuid',
    number: 48,
    languageId: 'java',
    topicId: 'java-serialization',
    topicTitle: 'Object Serialization and Deserialization',
    question: 'What is serialVersionUID and what happens if you do not define it?',
    difficulty: 'Intermediate',
    type: 'Conceptual',
    shortAnswer: [
      'serialVersionUID is a unique 64-bit version identifier for a Serializable class.',
      'Deserialization compares the stream\'s serialVersionUID against the currently loaded class\'s serialVersionUID.',
      'If they mismatch, Java aborts deserialization and throws java.io.InvalidClassException.',
      'If omitted, javac automatically computes one based on class fields, methods, and signatures; any minor code edit changes the hash and breaks backwards compatibility.',
    ],
    deepDive: 'Always explicitly declare private static final long serialVersionUID = 1L;. This protects your application from deserialization failures when non-breaking enhancements (like adding a helper method) are made to the class.',
    codeSnippet: {
      language: 'java',
      code: `private static final long serialVersionUID = 1L;`,
    },
    followUpTip: 'Explain that changing serialVersionUID is how you deliberately invalidate old persisted objects when incompatible structural changes are introduced.',
    keywords: ['serialVersionUID', 'InvalidClassException', 'versioning', 'compatibility', 'SHA hash'],
  },

  {
    id: 'q-049-transient-keyword',
    number: 49,
    languageId: 'java',
    topicId: 'java-serialization',
    topicTitle: 'Object Serialization and Deserialization',
    question: 'What does the transient keyword do during serialization?',
    difficulty: 'Intermediate',
    type: 'Conceptual',
    shortAnswer: [
      'Marking an instance variable transient instructs Java serialization to SKIP that field during writing.',
      'The field\'s state is not written to the serialized byte stream.',
      'Upon deserialization, transient fields are initialized to their default Java values (null for objects, 0 for numbers, false for booleans).',
      'Used for sensitive data (passwords, encryption keys) or transient runtime resources (database connections, open file handles).',
    ],
    deepDive: 'If a transient field must be re-initialized after deserialization, the class can implement a private void readObject(ObjectInputStream in) method to execute custom reconstruction logic.',
    codeSnippet: {
      language: 'java',
      code: `public class UserAccount implements Serializable {
    private String username;
    private transient String password; // Will NOT be written to stream!
    private transient Connection dbConn; // Non-serializable resource
}`,
    },
    followUpTip: 'Emphasize that transient only affects Java serialization; it has no effect on database ORMs unless mapped with @Transient.',
    keywords: ['transient', 'sensitive data', 'passwords', 'default values', 'skip serialization'],
  },

  {
    id: 'q-050-static-fields-serialization',
    number: 50,
    languageId: 'java',
    topicId: 'java-serialization',
    topicTitle: 'Object Serialization and Deserialization',
    question: 'Are static fields serialized as part of each individual object?',
    difficulty: 'Beginner',
    type: 'Conceptual',
    shortAnswer: [
      'NO. Static variables belong to the class (Metaspace/Class area), not to any individual object instance.',
      'Serialization records only the individual state of an instance on the heap.',
      'When an object is deserialized in another JVM, static fields reflect whatever value is currently loaded in that destination JVM.',
    ],
    deepDive: 'Because static fields are shared class state, saving them inside individual object streams would lead to ambiguities when multiple objects with different static historical states were deserialized. The JVM therefore excludes static fields entirely from serialization.',
    codeSnippet: {
      language: 'java',
      code: `public class BankAccount implements Serializable {
    public static String bankName = "HDFC"; // NOT saved in stream
    private String accountNumber;            // Saved in stream
}`,
    },
    followUpTip: 'Note that serialVersionUID is static and final; it is serialized as part of the class descriptor, not as an instance field.',
    keywords: ['static fields', 'class level', 'instance state', 'serialization rules'],
  },

  {
    id: 'q-051-untrusted-data-security',
    number: 51,
    languageId: 'java',
    topicId: 'java-serialization',
    topicTitle: 'Object Serialization and Deserialization',
    question: 'Why is deserializing untrusted Java serialized data considered extremely dangerous?',
    difficulty: 'Advanced',
    type: 'Conceptual',
    shortAnswer: [
      'Java native deserialization constructs objects and triggers execution paths (like readObject) before the application can validate the data.',
      'Attackers craft malicious serialized byte streams containing "gadget chains" from libraries present on the classpath (e.g., Apache Commons Collections).',
      'This can lead directly to Remote Code Execution (RCE), Denial of Service (DoS), or file system destruction.',
      'Golden Rule: NEVER deserialize raw Java byte streams received from untrusted clients or open networks.',
    ],
    deepDive: 'Java 9 introduced Serialization Filtering (ObjectInputFilter) to whitelist or blacklist allowable classes before instantiation. However, industry consensus strongly favors migrating public API payloads to JSON, Protocol Buffers, or FlatBuffers.',
    codeSnippet: {
      language: 'text',
      code: `Untrusted Byte Stream -> ObjectInputStream.readObject() -> Gadget Chain -> Remote Shell / Arbitrary Code Execution!`,
    },
    followUpTip: 'Reference OWASP Top 10: Insecure Deserialization (A08: Software and Data Integrity Failures).',
    keywords: ['security', 'gadget chains', 'untrusted input', 'RCE', 'remote code execution', 'ObjectInputFilter'],
  },

  {
    id: 'q-052-java-serialization-vs-json',
    number: 52,
    languageId: 'java',
    topicId: 'java-serialization',
    topicTitle: 'Object Serialization and Deserialization',
    question: 'How does Java native serialization differ from JSON serialization?',
    difficulty: 'Intermediate',
    type: 'Conceptual',
    shortAnswer: [
      'Java native serialization outputs a proprietary binary byte stream tied strictly to Java JVMs and class structures.',
      'JSON is a text-based, human-readable, cross-platform standard supported across all programming languages (JS, Python, Go, C#).',
      'Java serialization stores JVM metadata, type signatures, and class hierarchy details; JSON serializes clean structural attribute data.',
      'Modern web applications and microservices universally use JSON (via Jackson/Gson) over native Java serialization.',
    ],
    deepDive: 'Native Java serialization is fragile across class changes, opaque to debug, and carries severe security liabilities. JSON payloads are easy to validate with schemas, inspect in browser dev tools, and compress efficiently over HTTP/2.',
    codeSnippet: {
      language: 'text',
      code: `Feature          | Java Native Serialization       | JSON Serialization
-------------------------------------------------------------------------
Format           | Binary proprietary bytecode     | Plain text (UTF-8)
Language Support | Java only                      | Universal (All languages)
Readability      | Unreadable binary blob          | Human-readable
Security Risk    | High (Gadget chains / RCE)     | Low / Medium
Common Tools     | ObjectOutputStream             | Jackson, Gson, Fastjson`,
    },
    followUpTip: 'Cite JSON libraries in Java such as Jackson ObjectMapper and Google Gson.',
    keywords: ['JSON vs serialization', 'Jackson', 'cross-language', 'binary blob', 'REST API'],
  },

  {
    id: 'q-053-non-serializable-reference',
    number: 53,
    languageId: 'java',
    topicId: 'java-serialization',
    topicTitle: 'Object Serialization and Deserialization',
    question: 'What happens if a Serializable class contains a reference to a non-serializable object?',
    difficulty: 'Intermediate',
    type: 'Conceptual',
    shortAnswer: [
      'Java attempts to serialize the complete object graph reachable from the root object.',
      'When it encounters an instance field pointing to an object that does NOT implement Serializable, it throws java.io.NotSerializableException.',
      'Serialization terminates immediately, and the output stream is corrupted or incomplete.',
      'Remedy: Either make the referenced class implement Serializable, or mark the field transient.',
    ],
    deepDive: 'If an un-serializable third-party class must be preserved, mark the field transient and implement custom writeObject() and readObject() methods in the container class to serialize its primitive attributes manually.',
    codeSnippet: {
      language: 'java',
      code: `class Engine { } // Does NOT implement Serializable

class Car implements Serializable {
    // Engine engine = new Engine(); // Throws NotSerializableException!
    transient Engine engine = new Engine(); // FIXED: Skipped by serialization
}`,
    },
    followUpTip: 'Remind interviewers that both the outer class AND every nested object reference in the graph must implement Serializable.',
    keywords: ['NotSerializableException', 'object graph', 'transient fix', 'nested objects'],
  },

  {
    id: 'q-054-constructor-execution-deserialization',
    number: 54,
    languageId: 'java',
    topicId: 'java-serialization',
    topicTitle: 'Object Serialization and Deserialization',
    question: 'Are constructors invoked during object deserialization in Java?',
    difficulty: 'Advanced',
    type: 'Conceptual',
    shortAnswer: [
      'For the Serializable class itself: NO constructors are executed during deserialization.',
      'The JVM allocates memory for the instance and restores field values directly from the serialized byte stream.',
      'For non-serializable superclasses: The JVM DOES invoke the zero-argument (no-arg) constructor of the first non-serializable superclass in the hierarchy.',
      'If that non-serializable superclass lacks an accessible no-arg constructor, an InvalidClassException is thrown.',
    ],
    deepDive: 'Because constructors are bypassed during deserialization, any invariants or defensive checks inside constructors (like validating positive balances) are not executed. To enforce invariants on deserialized data, implement readObject() or the Serialization Proxy Pattern.',
    codeSnippet: {
      language: 'java',
      code: `public class Student implements Serializable {
    public Student(String name, int age) {
        System.out.println("Constructor running!"); // Will NOT run on readObject()!
        this.name = name;
        this.age = age;
    }
}`,
    },
    followUpTip: 'This is a favorite trivia question in senior Java interviews to test deep knowledge of JVM object allocation.',
    keywords: ['constructor execution', 'no-arg constructor', 'superclass', 'object instantiation', 'invariants'],
  },

  {
    id: 'q-055-customizing-serialization',
    number: 55,
    languageId: 'java',
    topicId: 'java-serialization',
    topicTitle: 'Object Serialization and Deserialization',
    question: 'How can you customize the default serialization and deserialization process in Java?',
    difficulty: 'Advanced',
    type: 'Conceptual',
    shortAnswer: [
      '1. Implement private void writeObject(ObjectOutputStream out) and private void readObject(ObjectInputStream in) in the class.',
      '2. Use out.defaultWriteObject() and in.defaultReadObject() to handle non-transient fields automatically, then add custom byte writing.',
      '3. Implement java.io.Externalizable for total manual control over every single byte (writeExternal / readExternal).',
      '4. Implement readResolve() to preserve Singleton instances during deserialization.',
    ],
    deepDive: 'The readResolve() method is vital for singletons. Without readResolve(), deserializing a serialized singleton creates a duplicate object in memory, violating the design pattern. Returning the existing singleton instance from readResolve() guarantees single-instance identity.',
    codeSnippet: {
      language: 'java',
      code: `public class SingletonDatabase implements Serializable {
    private static final SingletonDatabase INSTANCE = new SingletonDatabase();
    private Object readResolve() {
        return INSTANCE; // Replaces deserialized object with the existing singleton!
    }
}`,
    },
    followUpTip: 'Mention that enums handle serialization and singleton safety automatically without needing readResolve().',
    keywords: ['custom serialization', 'defaultWriteObject', 'readResolve', 'singleton', 'Externalizable'],
  },

  {
    id: 'q-056-try-with-resources-io',
    number: 56,
    languageId: 'java',
    topicId: 'java-serialization',
    topicTitle: 'Object Serialization and Deserialization',
    question: 'Why is try-with-resources critical when working with ObjectOutputStream and ObjectInputStream?',
    difficulty: 'Beginner',
    type: 'Conceptual',
    shortAnswer: [
      'ObjectOutputStream and ObjectInputStream wrap native OS file descriptors and buffered streams.',
      'Try-with-resources ensures flush() and close() are guaranteed to execute even if an IOException is thrown.',
      'Prevents OS resource leaks, file locking, and corrupted .ser files caused by unflushed memory buffers.',
      'Both stream classes implement AutoCloseable.',
    ],
    deepDive: 'Closing the outer ObjectOutputStream automatically flushes its buffer and closes the underlying FileOutputStream. Prior to Java 7, developers had to write cumbersome nested try-finally blocks that were prone to suppressed exception bugs.',
    codeSnippet: {
      language: 'java',
      code: `try (ObjectOutputStream out = new ObjectOutputStream(new FileOutputStream("student.ser"))) {
    out.writeObject(original);
    System.out.println("Saved safely with auto-flush and auto-close!");
} catch (IOException e) {
    System.err.println("IO Error: " + e.getMessage());
}`,
    },
    followUpTip: 'Always remind interviewers that buffers must be flushed to ensure all bytes reach disk before process exit.',
    keywords: ['try-with-resources', 'AutoCloseable', 'resource leak', 'close()', 'flush()', 'file streams'],
  },

  {
    id: 'q-57-bytecode-verification',
    number: 57,
    languageId: 'java',
    topicId: 'java-001-jvm-jdk',
    topicTitle: 'Java Execution, JVM, JRE & JDK',
    question: 'What is bytecode verification in the JVM, and why is it crucial for security?',
    difficulty: 'Intermediate',
    type: 'Conceptual',
    shortAnswer: [
      'Bytecode verification is a security subsystem within the JVM class loader linking phase.',
      'It inspects loaded .class files before execution to confirm bytecode conforms to JVM specification rules.',
      'Checks include: operand stack overflows/underflows, legal parameter types, valid memory access, and branch target safety.',
      'Guarantees that malicious or corrupted bytecode cannot bypass Java type safety or forge pointers.',
    ],
    deepDive: 'Because Java compiles into portable bytecode, anyone could construct a malicious .class file manually with a hex editor. The Bytecode Verifier prevents such binaries from executing, safeguarding the host operating system from memory corruption or unauthorized memory jumps.',
    followUpTip: 'You can disable verification in development using -Xverify:none, but NEVER do this in production.',
    keywords: ['bytecode verification', 'class loader', 'security', 'jvm', 'type safety'],
  },

  {
    id: 'q-58-jdk-jre-jvm',
    number: 58,
    languageId: 'java',
    topicId: 'java-setup-macos',
    topicTitle: 'Java Setup on macOS',
    question: 'What is the relationship between JDK, JRE, and JVM on modern macOS, and how do you manage JDK versions?',
    difficulty: 'Beginner',
    type: 'Conceptual',
    shortAnswer: [
      'JVM is the runtime execution engine; JDK is the complete development kit including javac, java, and jcmd.',
      'Modern Java (JDK 11+) no longer ships separate standalone JRE downloads; runtimes are packaged directly inside the JDK or tailored with jlink.',
      'On macOS, use "/usr/libexec/java_home -V" to inspect all installed JDKs and architectures (ARM64 vs x64).',
      'Set JAVA_HOME via "export JAVA_HOME=$(/usr/libexec/java_home -v 21)" in ~/.zshrc.',
    ],
    deepDive: 'On Apple Silicon Macs (M1/M2/M3/M4), running an x64 Intel JDK incurs Rosetta 2 emulation translation overhead. Always install native ARM64 (AArch64) builds (such as Eclipse Temurin or Oracle JDK) for peak performance.',
    followUpTip: 'Mention that compdef errors during source ~/.zshrc are zsh autocompletion issues, not JDK failure.',
    keywords: ['jdk', 'jre', 'jvm', 'macos', '/usr/libexec/java_home', 'arm64', 'temurin'],
  },

  {
    id: 'q-59-public-class-file-rule',
    number: 59,
    languageId: 'java',
    topicId: 'java-setup-macos',
    topicTitle: 'Java Setup on macOS',
    question: 'Why does Java enforce that a public class must match its filename exactly?',
    difficulty: 'Beginner',
    type: 'Conceptual',
    shortAnswer: [
      'A public class named Hello MUST be saved in a file named Hello.java.',
      'This strict rule allows the Java compiler (javac) and classloader to find and load classes efficiently without scanning every source file.',
      'Enforces modularity: exactly one public class per compilation unit (.java file).',
      'Mismatched filenames produce compile-time error: "class Hello is public, should be declared in a file named Hello.java".',
    ],
    deepDive: 'When javac compiles a source file that references other classes, it translates package and class names directly into file paths (e.g. com/example/User.java). If public classes could have arbitrary file names, the compiler would be forced to parse the contents of every file in the project just to locate symbols.',
    followUpTip: 'A single .java file CAN have multiple package-private (non-public) classes, but only ONE public class.',
    keywords: ['public class', 'filename matching', 'compilation unit', 'javac', 'classloader'],
  },

  {
    id: 'q-60-three-error-categories',
    number: 60,
    languageId: 'java',
    topicId: 'java-errors-classification',
    topicTitle: 'Errors in Java: Compile-Time, Runtime & Logical',
    question: 'What are the three main categories of errors in Java, and when are they detected?',
    difficulty: 'Beginner',
    type: 'Conceptual',
    shortAnswer: [
      '1. Compile-Time Errors: Detected before execution by javac (syntax errors, type mismatches, missing semicolons).',
      '2. Runtime Errors: Occur during program execution, causing exceptions (e.g., 10 / 0 throws ArithmeticException, NullPointerException).',
      '3. Logical Errors: The program compiles and runs without crashing, but produces incorrect results due to flawed algorithms (e.g. price + quantity instead of price * quantity).',
    ],
    deepDive: 'Compile-time errors are cheapest to fix because the compiler prevents binary bytecode creation. Logical errors are the most insidious because compilers and automated linters cannot detect human business logic flaws without unit tests.',
    followUpTip: 'Emphasize that in Java, not every runtime failure is an Exception; some are non-recoverable Errors (e.g. OutOfMemoryError).',
    keywords: ['compile-time error', 'runtime error', 'logical error', 'arithmeticexception', 'syntax error'],
  },

  {
    id: 'q-61-error-vs-exception',
    number: 61,
    languageId: 'java',
    topicId: 'java-throwable-hierarchy',
    topicTitle: 'Throwable, Errors, and Exceptions',
    question: 'What is the architectural difference between Error and Exception under java.lang.Throwable?',
    difficulty: 'Intermediate',
    type: 'Conceptual',
    shortAnswer: [
      'java.lang.Throwable is the root class of all errors and exceptions in Java.',
      'Error: Represents fatal conditions external to normal application control (e.g., OutOfMemoryError, StackOverflowError). Applications should NOT attempt to catch or recover from Errors.',
      'Exception: Represents conditions that a well-written application might want to catch and recover from (e.g., FileNotFoundException, SQLException).',
      'RuntimeException is a subclass of Exception representing programming bugs (e.g., NullPointerException).',
    ],
    deepDive: 'Errors indicate that the JVM itself is in a compromised or resource-exhausted state. Catching Error (or catching raw Throwable) is an anti-pattern because the JVM may be incapable of continuing safe execution after an OutOfMemoryError or VirtualMachineError.',
    followUpTip: 'Draw the hierarchy: Object -> Throwable -> (Error, Exception).',
    keywords: ['throwable', 'error', 'exception', 'outofmemoryerror', 'stackoverflowerror', 'recovery'],
  },

  {
    id: 'q-62-checked-vs-unchecked',
    number: 62,
    languageId: 'java',
    topicId: 'java-throwable-hierarchy',
    topicTitle: 'Throwable, Errors, and Exceptions',
    question: 'What is the difference between checked and unchecked exceptions in Java?',
    difficulty: 'Intermediate',
    type: 'Conceptual',
    shortAnswer: [
      'Checked Exceptions: Subclasses of Exception (excluding RuntimeException). Verified at compile-time. The compiler enforces that methods must either catch them or declare them with "throws". Examples: IOException, SQLException, ClassNotFoundException.',
      'Unchecked Exceptions: Subclasses of RuntimeException (and Error). Not checked at compile-time. Caused by programmatic flaws. Examples: NullPointerException, ArithmeticException, ArrayIndexOutOfBoundsException.',
    ],
    deepDive: 'Checked exceptions force API consumers to consider error recovery scenarios (e.g. reconnecting to database or reporting missing file). Modern frameworks (e.g. Spring Framework) often wrap checked exceptions into unchecked equivalents (e.g. DataAccessException) to reduce boilerplate method declarations.',
    followUpTip: 'Interviewers often ask: "Is NullPointerException checked or unchecked?" It is unchecked because it extends RuntimeException.',
    keywords: ['checked exception', 'unchecked exception', 'runtimeexception', 'ioexception', 'throws', 'try-catch'],
  },

  {
    id: 'q-63-classnotfound-vs-noclassdef',
    number: 63,
    languageId: 'java',
    topicId: 'java-throwable-hierarchy',
    topicTitle: 'Throwable, Errors, and Exceptions',
    question: 'What is the difference between ClassNotFoundException and NoClassDefFoundError?',
    difficulty: 'Advanced',
    type: 'Conceptual',
    shortAnswer: [
      'ClassNotFoundException is a CHECKED Exception: Occurs at runtime when an application dynamically tries to load a class by name (e.g., Class.forName("com.mysql.Driver") or ClassLoader.loadClass()) and no definition is found on the classpath.',
      'NoClassDefFoundError is an ERROR: Occurs when a class was successfully present at compile-time, but the JVM is unable to find or load its definition during runtime execution (e.g., missing JAR in deployment, or static initializer failure).',
      'Key distinction: ClassNotFoundException is dynamic reflection lookup; NoClassDefFoundError is runtime link failure for statically referenced classes.',
    ],
    deepDive: 'NoClassDefFoundError frequently strikes in production deployments when a dependent JAR was packaged during maven build but omitted from the Docker container runtime classpath, or when a class failed inside its <clinit> static initializer block.',
    followUpTip: 'Point out that similar names do NOT mean same type: one is an Exception, the other is an Error.',
    keywords: ['classnotfoundexception', 'noclassdeffounderror', 'classpath', 'reflection', 'dynamic linking', 'error vs exception'],
  },

  {
    id: 'q-64-finally-execution-rules',
    number: 64,
    languageId: 'java',
    topicId: 'java-try-catch-finally',
    topicTitle: 'try, catch, and finally',
    question: 'Does the finally block always execute in Java? Are there situations where it will NOT run?',
    difficulty: 'Intermediate',
    type: 'Conceptual',
    shortAnswer: [
      'Normally, YES: finally always executes when control leaves try or catch, even if a return statement or unhandled exception occurs.',
      'Situations where finally does NOT run:',
      '1. Explicit termination: System.exit(0) terminates the JVM immediately.',
      '2. Fatal JVM crash / OS kill: kill -9, hardware power cut, or fatal OutOfMemoryError in OS process.',
      '3. Thread death: Thread running the try block is forcibly killed or enters an infinite loop before reaching finally.',
    ],
    deepDive: 'If both the try block and finally block contain a return statement, the return statement in the finally block OVERWRITES the return statement from the try block! This is considered bad practice because it can silently discard exceptions.',
    followUpTip: 'Mention that for closing I/O resources, try-with-resources is cleaner and safer than manual finally closing.',
    keywords: ['finally', 'system.exit', 'jvm crash', 'infinite loop', 'try-with-resources', 'cleanup'],
  },

  {
    id: 'q-65-throw-vs-throws',
    number: 65,
    languageId: 'java',
    topicId: 'java-throw-throws-custom',
    topicTitle: 'throw, throws, and Custom Exceptions',
    question: 'What is the difference between the throw and throws keywords in Java?',
    difficulty: 'Beginner',
    type: 'Conceptual',
    shortAnswer: [
      'throw: An action statement used inside a method body to explicitly throw an exception object (e.g. throw new IllegalArgumentException("Invalid")).',
      'throws: A clause in a method declaration signature used to declare which exceptions may propagate out of the method to its caller (e.g. void readFile() throws IOException).',
      'throw is followed by an exception instance; throws is followed by exception class names (comma-separated).',
    ],
    deepDive: 'Using throws is mandatory for checked exceptions if the method does not catch them internally. For unchecked (RuntimeException) classes, declaring them with throws is optional documentation.',
    followUpTip: 'Remember: throw causes the exception; throws advertises the exception.',
    keywords: ['throw', 'throws', 'method signature', 'exception propagation', 'custom exception'],
  },

  {
    id: 'q-66-custom-exception-checked',
    number: 66,
    languageId: 'java',
    topicId: 'java-throw-throws-custom',
    topicTitle: 'throw, throws, and Custom Exceptions',
    question: 'When should you create a custom checked exception vs a custom unchecked exception in Java?',
    difficulty: 'Intermediate',
    type: 'Conceptual',
    shortAnswer: [
      'Extend Exception (Checked): When the caller is reasonably expected to anticipate and recover from the failure condition (e.g. InsufficientFundsException, UserAlreadyExistsException).',
      'Extend RuntimeException (Unchecked): When the condition represents a programming bug, precondition violation, or unrecoverable system failure (e.g. InvalidConfigurationException, DatabaseConnectionTimeoutException).',
      'Always provide standard constructors: (String message) and (String message, Throwable cause).',
    ],
    deepDive: 'Modern software engineering principles (including Spring and Java standard libraries) strongly favor unchecked exceptions for most business services because checked exceptions pollute method signatures across architecture layers with throws clauses.',
    followUpTip: 'Always pass the cause exception to super(message, cause) to preserve the original stack trace.',
    keywords: ['custom exception', 'business exceptions', 'runtimeexception', 'caller recovery'],
  },

  {
    id: 'q-67-input-methods',
    number: 67,
    languageId: 'java',
    topicId: 'java-user-input',
    topicTitle: 'Taking Input from the User',
    question: 'What are the key differences between System.in.read(), BufferedReader, and Scanner?',
    difficulty: 'Intermediate',
    type: 'Conceptual',
    shortAnswer: [
      'System.in.read(): Reads raw input one byte at a time (0-255, or -1 at EOF). Slow and lacks token/line parsing.',
      'BufferedReader: Synchronized, memory-buffered character reader. Best for reading full lines (readLine()) and high-volume text fast.',
      'Scanner: Utility parser with built-in regex tokenization and type conversion (nextInt(), nextDouble(), nextLine()). Slower due to parsing overhead, but most convenient for interactive console apps.',
    ],
    deepDive: 'BufferedReader uses an internal 8KB buffer, making it orders of magnitude faster than Scanner for competitive programming and large file I/O. However, BufferedReader only reads Strings, requiring manual parsing (Integer.parseInt).',
    followUpTip: 'Remember: Scanner handles primitive parsing; BufferedReader is best for raw line speed.',
    keywords: ['system.in.read', 'bufferedreader', 'scanner', 'byte input', 'line input', 'token parsing'],
  },

  {
    id: 'q-68-scanner-newline-trap',
    number: 68,
    languageId: 'java',
    topicId: 'java-user-input',
    topicTitle: 'Taking Input from the User',
    question: 'What is the Scanner nextInt() / nextLine() newline trap, and how do you resolve it?',
    difficulty: 'Beginner',
    type: 'Conceptual',
    shortAnswer: [
      'The trap: Calling scanner.nextInt() reads only the integer digits, leaving the trailing newline character (\\n) in the input stream buffer.',
      'When you subsequently call scanner.nextLine(), it immediately consumes that leftover newline and returns an empty string without waiting for user input!',
      'Solution 1: Add a dummy scanner.nextLine() after scanner.nextInt() to consume the leftover newline.',
      'Solution 2 (Best Practice): Always read full lines with scanner.nextLine() and parse explicitly using Integer.parseInt(scanner.nextLine().trim()).',
    ],
    deepDive: 'This is one of the most common beginner bugs in Java. Explicitly reading full lines with nextLine() and using Integer.parseInt inside a try-catch for NumberFormatException also provides robust validation against invalid non-numeric user inputs.',
    followUpTip: 'Demonstrate Solution 2 to show senior-level defensive programming practices.',
    keywords: ['scanner', 'nextint', 'nextline', 'newline trap', 'integer.parseint', 'input parsing'],
  },

  {
    id: 'q-69-system-in-read-byte',
    number: 69,
    languageId: 'java',
    topicId: 'java-user-input',
    topicTitle: 'Taking Input from the User',
    question: 'Why does System.in.read() return an int instead of a byte or char?',
    difficulty: 'Intermediate',
    type: 'Conceptual',
    shortAnswer: [
      'System.in.read() returns an int to represent all possible byte values (0 to 255) AND the special End-Of-File (EOF) signal -1.',
      'In Java, primitive byte is signed (-128 to 127). If read() returned a byte, a valid byte value of 0xFF (-1) would be indistinguishable from the EOF signal (-1).',
      'Returning int allows 0-255 for valid bytes and -1 exclusively for end of stream.',
    ],
    deepDive: 'This design matches C/C++ fgetc() / getchar() functions. To convert the returned int back to a character, cast it with (char) value.',
    followUpTip: 'This is a favorite JVM trivia question that tests understanding of signed numeric primitives.',
    keywords: ['system.in.read', 'end of stream', '-1', 'byte range 0-255', 'ioexception'],
  },

  {
    id: 'q-070-what-is-a-thread',
    number: 70,
    languageId: 'java',
    topicId: 'java-threads-basics',
    topicTitle: 'Threads and Multithreading',
    question: '1. What is a thread in Java?',
    difficulty: 'Beginner',
    type: 'Conceptual',
    shortAnswer: [
      'A thread is the smallest independent unit of CPU execution within a process.',
      'Every Java application starts with at least one thread: the "main" thread executing public static void main(String[] args).',
      'Each thread has its own private Program Counter (PC) register and private Call Stack (storing local variables and method call frames).',
      'All threads within the same JVM process share the Heap memory and Metaspace.',
    ],
    deepDive: 'Because threads share heap memory, communication between threads is extremely fast. However, sharing mutable state introduces the danger of race conditions, deadlocks, and memory visibility issues if not synchronized.',
    followUpTip: 'Mention that OS-level platform threads consume approximately 1MB of stack memory by default.',
    keywords: ['thread', 'process', 'call stack', 'program counter', 'shared heap', 'lightweight'],
  },

  {
    id: 'q-071-what-is-multithreading',
    number: 71,
    languageId: 'java',
    topicId: 'java-threads-basics',
    topicTitle: 'Threads and Multithreading',
    question: '2. What is multithreading, and why is it important?',
    difficulty: 'Beginner',
    type: 'Conceptual',
    shortAnswer: [
      'Multithreading is a programming technique allowing multiple threads to execute concurrently within a single program.',
      'Maximizes CPU core utilization by preventing idle CPU cycles during blocking I/O operations (network, disk, database).',
      'Improves application throughput and user interface responsiveness.',
      'Enables background task processing without freezing the primary user request thread.',
    ],
    deepDive: 'In a single-threaded server, one slow database query would block every other incoming user. Multithreading allows thousands of client requests to make progress concurrently on server runtimes like Tomcat or Netty.',
    followUpTip: 'Highlight the distinction between CPU-bound tasks and I/O-bound tasks in multithreaded design.',
    keywords: ['multithreading', 'cpu utilization', 'throughput', 'responsiveness', 'concurrent'],
  },

  {
    id: 'q-072-start-vs-run',
    number: 72,
    languageId: 'java',
    topicId: 'java-threads-basics',
    topicTitle: 'Threads and Multithreading',
    question: '3. What is the difference between start() and run() on a Thread?',
    difficulty: 'Beginner',
    type: 'Conceptual',
    shortAnswer: [
      'thread.start(): Instructs the JVM to allocate a new independent call stack and schedule a new OS thread, which then invokes run() asynchronously.',
      'thread.run(): A standard synchronous method call that executes on the CURRENT calling thread. It does NOT spawn a new thread!',
      'Calling start() twice on the same Thread object throws IllegalThreadStateException.',
    ],
    deepDive: 'Calling run() directly bypasses multithreading entirely. The code runs sequentially on the caller thread (e.g. main), blocking until run() finishes. Always call start() to achieve concurrent execution.',
    followUpTip: 'A classic trap: "What happens if you invoke thread.run()?" Answer: It runs synchronously on the current thread.',
    keywords: ['start vs run', 'call stack', 'new thread', 'synchronous method call', 'illegalthreadstateexception'],
  },

  {
    id: 'q-073-why-runnable-over-thread',
    number: 73,
    languageId: 'java',
    topicId: 'java-threads-basics',
    topicTitle: 'Threads and Multithreading',
    question: '4. Why is implementing Runnable preferred over extending Thread?',
    difficulty: 'Intermediate',
    type: 'Conceptual',
    shortAnswer: [
      '1. Single Inheritance: Java allows a class to extend only one superclass. Implementing Runnable leaves your class free to extend other domain classes.',
      '2. Separation of Concerns: Runnable represents the task to be executed; Thread represents the worker engine. Decoupling task from runner follows clean architecture.',
      '3. Reusability: Runnable tasks can be submitted to thread pools (ExecutorService) without tying the task to raw Thread lifecycle.',
      '4. Functional Interface: Runnable is a @FunctionalInterface, allowing concise Java 8 lambda expressions: () -> { ... }.',
    ],
    deepDive: 'Extending Thread inherits dozens of Thread methods that your class does not need. Implementing Runnable provides maximum architectural flexibility and is the foundation for java.util.concurrent frameworks.',
    followUpTip: 'Always recommend Runnable + ExecutorService as the modern production standard.',
    keywords: ['runnable', 'thread', 'single inheritance', 'separation of concerns', 'lambdas', 'functional interface'],
  },

  {
    id: 'q-074-what-is-a-race-condition',
    number: 74,
    languageId: 'java',
    topicId: 'java-synchronization-locks',
    topicTitle: 'Synchronization and Race Conditions',
    question: '5. What is a race condition, and why is count++ not thread-safe?',
    difficulty: 'Intermediate',
    type: 'Conceptual',
    shortAnswer: [
      'A race condition occurs when multiple threads concurrently read and mutate shared mutable state, and the final result depends on unpredictable execution timing.',
      'Why count++ fails: In Java, count++ looks like a single line, but it compiles down to THREE distinct bytecode instructions:',
      '1. Read current count into a CPU register.',
      '2. Increment register by 1.',
      '3. Write register back to count in memory.',
      'If two threads interleave between step 1 and step 3, both threads write the same incremented value, causing lost updates.',
    ],
    deepDive: 'To fix race conditions, enforce mutual exclusion using synchronized blocks/methods, or use lock-free atomic primitives from java.util.concurrent.atomic (like AtomicInteger.incrementAndGet()).',
    followUpTip: 'Emphasize that the "volatile" keyword alone does NOT fix count++ because volatile does not provide atomicity.',
    keywords: ['race condition', 'count++', 'atomicity', 'read modify write', 'lost update', 'thread safety'],
  },

  {
    id: 'q-075-what-does-synchronized-protect',
    number: 75,
    languageId: 'java',
    topicId: 'java-synchronization-locks',
    topicTitle: 'Synchronization and Race Conditions',
    question: '6. What does the synchronized keyword actually protect?',
    difficulty: 'Intermediate',
    type: 'Conceptual',
    shortAnswer: [
      'The synchronized keyword protects a critical section by requiring threads to acquire a specific object\'s intrinsic monitor lock.',
      'Only ONE thread at a time can execute synchronized code protected by the SAME monitor lock.',
      'Synchronized instance methods lock the specific object instance (this).',
      'Synchronized static methods lock the Class object (e.g. Counter.class).',
      'Crucial Scope Rule: It does NOT stop threads from running non-synchronized methods, nor does it coordinate threads holding different object locks.',
    ],
    deepDive: 'When Thread A enters a synchronized(lock) block, it acquires the monitor. If Thread B attempts to enter a block synchronized on that same lock, Thread B transitions to the BLOCKED state until Thread A exits and releases the monitor.',
    followUpTip: 'Clarify that synchronizing on two different object instances provides zero thread coordination.',
    keywords: ['synchronized', 'monitor lock', 'intrinsic lock', 'critical section', 'mutual exclusion', 'object level lock'],
  },

  {
    id: 'q-076-why-use-join',
    number: 76,
    languageId: 'java',
    topicId: 'java-synchronization-locks',
    topicTitle: 'Synchronization and Race Conditions',
    question: '7. Why is Thread.join() used?',
    difficulty: 'Beginner',
    type: 'Conceptual',
    shortAnswer: [
      'Thread.join() causes the calling thread (e.g. main) to pause execution until the target thread finishes and enters TERMINATED state.',
      'Ensures deterministic completion: Guarantees that background calculations or data processing complete before the parent thread reads aggregated results.',
      'Overloaded variants: thread.join(millis) waits for up to a specified maximum duration (TIMED_WAITING).',
    ],
    deepDive: 'In our Counter example, if the main thread prints counter.count immediately after worker.start() without calling worker.join(), it would print a partial count because the workers are still running in the background. join() guarantees final state visibility.',
    followUpTip: 'join() internally coordinates with Object.wait() on the Thread instance until isAlive() is false.',
    keywords: ['join', 'thread coordination', 'waiting', 'terminated', 'aggregation'],
  },

  {
    id: 'q-077-thread-output-order',
    number: 77,
    languageId: 'java',
    topicId: 'java-threads-basics',
    topicTitle: 'Threads and Multithreading',
    question: '8. Is thread execution output order guaranteed in Java?',
    difficulty: 'Beginner',
    type: 'Conceptual',
    shortAnswer: [
      'NO. Thread execution order is completely nondeterministic.',
      'The operating system kernel thread scheduler decides which thread runs on which CPU core and for how long.',
      'Thread.sleep(5) or thread priorities are only hints to the scheduler; they do NOT guarantee execution order.',
      'Never write application logic that relies on threads executing in a specific order without explicit synchronization primitives.',
    ],
    deepDive: 'Because hardware core scheduling, CPU cache flushes, and OS context switching are dynamic, running the exact same multithreaded program twice can produce completely different interleaving orders on the console.',
    followUpTip: 'To enforce strict ordering, use synchronization primitives like CountDownLatch, CyclicBarrier, or queues.',
    keywords: ['nondeterministic', 'os scheduler', 'thread priority', 'sleep', 'interleaving'],
  },

  {
    id: 'q-078-sleep-vs-wait',
    number: 78,
    languageId: 'java',
    topicId: 'java-synchronization-locks',
    topicTitle: 'Synchronization and Race Conditions',
    question: '9. What are the key differences between Thread.sleep() and Object.wait()?',
    difficulty: 'Intermediate',
    type: 'Conceptual',
    shortAnswer: [
      '1. Origin: Thread.sleep() is a static method on java.lang.Thread; Object.wait() is an instance method on java.lang.Object.',
      '2. Lock Release: Thread.sleep() pauses the thread but retains all held monitor locks. Object.wait() RELEASES the object\'s monitor lock while waiting.',
      '3. Prerequisite: sleep() can be called anywhere; wait() MUST be called from within a synchronized block/method owning that monitor lock (otherwise throws IllegalMonitorStateException).',
      '4. Wake-up: sleep() wakes up after timeout expires or on interrupt; wait() wakes up via notify(), notifyAll(), timeout, or interrupt.',
    ],
    deepDive: 'Because wait() releases the monitor lock, other threads can enter synchronized methods on that object and update shared state before calling notify(). sleep() holding the lock can cause other threads waiting on that monitor to block.',
    followUpTip: 'Remember the golden rule: "sleep holds the lock; wait gives up the lock."',
    keywords: ['sleep vs wait', 'monitor lock release', 'timed_waiting', 'waiting', 'notify', 'synchronization requirement'],
  },

  {
    id: 'q-079-why-thread-stop-deprecated',
    number: 79,
    languageId: 'java',
    topicId: 'java-thread-lifecycle',
    topicTitle: 'Thread Lifecycle and States',
    question: '10. Why should Thread.stop() not be used, and what should be used instead?',
    difficulty: 'Intermediate',
    type: 'Conceptual',
    shortAnswer: [
      'Thread.stop() was deprecated in Java 1.2 and is permanently disabled in modern Java.',
      'Why unsafe: It forcibly kills a thread mid-execution, causing the thread to unlock all monitor locks it holds instantaneously.',
      'This leaves shared objects in damaged, inconsistent partial states (e.g., money debited from Account A but not yet credited to Account B).',
      'What to use instead: Cooperative thread cancellation via Thread.interrupt() and checking Thread.currentThread().isInterrupted(), or a volatile boolean flag.',
    ],
    deepDive: 'Cooperative cancellation allows the worker thread to detect the cancellation signal at clean boundaries, finish active database transactions, flush I/O streams, and terminate gracefully.',
    followUpTip: 'Cite cooperative interruption: thread.interrupt() and catching InterruptedException.',
    keywords: ['thread.stop', 'deprecated', 'unsafe', 'corrupt state', 'interrupt', 'cooperative cancellation'],
  },

  {
    id: 'q-080-concurrency-vs-parallelism',
    number: 80,
    languageId: 'java',
    topicId: 'java-threads-basics',
    topicTitle: 'Threads and Multithreading',
    question: '11. What is the difference between concurrency and parallelism?',
    difficulty: 'Intermediate',
    type: 'Conceptual',
    shortAnswer: [
      'Concurrency: Structuring a program into multiple independent tasks that can run in overlapping time periods. Dealing with lots of things at once (can happen on a single CPU core via time-slicing).',
      'Parallelism: The simultaneous physical execution of multiple tasks at the exact same instant across multiple physical CPU hardware cores. Doing lots of things at once.',
      'Concurrency is about composition and structure; parallelism is about hardware execution.',
    ],
    deepDive: 'Rob Pike famously summarized: "Concurrency is about structure, parallelism is about execution. Concurrency is about dealing with a lot of things at once. Parallelism is about doing a lot of things at once." A single-core CPU can be concurrent, but cannot be parallel.',
    followUpTip: 'Use the analogy of a juggler (concurrency with one person juggling multiple balls) vs multiple workers on an assembly line (parallelism).',
    keywords: ['concurrency vs parallelism', 'multi-core', 'time-slicing', 'interleaving', 'simultaneous execution'],
  },

  {
    id: 'q-081-why-executor-service',
    number: 81,
    languageId: 'java',
    topicId: 'java-threads-basics',
    topicTitle: 'Threads and Multithreading',
    question: '12. Why are ExecutorService thread pools useful in production systems?',
    difficulty: 'Intermediate',
    type: 'Conceptual',
    shortAnswer: [
      '1. Thread Reuse: Eliminates the high CPU and memory overhead of creating and destroying OS threads per request.',
      '2. Resource Management: Bounding thread pool size prevents OutOfMemoryError: unable to create native thread during request spikes.',
      '3. Task Queueing: Incoming tasks are queued safely (BlockingQueue) when all worker threads are busy.',
      '4. Lifecycle Management: Simplifies graceful shutdown and task cancellation.',
    ],
    deepDive: 'Spawning an unmanaged new Thread() per HTTP request can crash a production server with just a few thousand concurrent users. ExecutorService (e.g. Executors.newFixedThreadPool(20)) caps thread count and queues surplus requests.',
    followUpTip: 'In production, prefer constructing ThreadPoolExecutor directly over Executors.newCachedThreadPool() to avoid unbounded thread creation.',
    keywords: ['executorservice', 'thread pools', 'reusability', 'resource management', 'oom prevention', 'task queue'],
  },

  {
    id: 'q-082-thread-state-enum-values',
    number: 82,
    languageId: 'java',
    topicId: 'java-thread-lifecycle',
    topicTitle: 'Thread Lifecycle and States',
    question: 'What are the 6 official values in java.lang.Thread.State, and why is RUNNING not an official state?',
    difficulty: 'Intermediate',
    type: 'Conceptual',
    shortAnswer: [
      'The 6 official constants in java.lang.Thread.State enum are:',
      '1. NEW: Thread created, start() not yet called.',
      '2. RUNNABLE: Executing in JVM or ready waiting for OS CPU scheduling.',
      '3. BLOCKED: Waiting to acquire a monitor lock for a synchronized block/method.',
      '4. WAITING: Waiting indefinitely for another thread (wait(), join()).',
      '5. TIMED_WAITING: Waiting for up to a specified time (sleep(), timed wait/join).',
      '6. TERMINATED: run() method completed or terminated by uncaught exception.',
      'RUNNING is not an official state: The JVM groups both active CPU execution and ready-to-run into the single official state RUNNABLE.',
    ],
    deepDive: 'The operating system kernel handles the rapid context switching between ready and executing states on CPU cores. Java does not expose a separate RUNNING state because tracking OS context switches at the JVM level would incur massive performance penalties.',
    followUpTip: 'Clarify that DEAD is also informal; the official state is TERMINATED.',
    keywords: ['thread.state', 'new', 'runnable', 'blocked', 'waiting', 'timed_waiting', 'terminated', 'running informal'],
  },

  {
    id: 'q-083-collection-vs-collections',
    number: 83,
    languageId: 'java',
    topicId: 'java-collection-framework-intro',
    topicTitle: 'Collection vs Collections vs Collections Framework',
    question: 'What is the difference between Collection, Collections, and the Collections Framework in Java?',
    difficulty: 'Beginner',
    type: 'Conceptual',
    shortAnswer: [
      'Collection is a root interface (java.util.Collection) representing a group of objects. Its primary child interfaces are List, Set, and Queue.',
      'Collections is a utility class (java.util.Collections) containing only static helper methods that operate on or return collections.',
      'Common Collections methods include Collections.sort(), Collections.reverse(), Collections.shuffle(), and Collections.unmodifiableList().',
      'The Collections Framework is the complete architecture comprising interfaces, implementations, and algorithms across java.util.',
    ],
    deepDive: 'Remember that Collection is singular (the interface) and Collections is plural (the utility helper). Collections has a private constructor to prevent instantiation, and all its methods are public static.',
    codeSnippet: {
      language: 'java',
      code: `// Collection (interface):
Collection<String> list = new ArrayList<>();

// Collections (utility class):
Collections.sort((List<String>) list);
List<String> readOnly = Collections.unmodifiableList((List<String>) list);`,
    },
    followUpTip: 'Always mention that Map belongs to the Collections Framework but does NOT implement Collection.',
    keywords: ['collection interface', 'collections utility', 'static helper methods', 'unmodifiablelist', 'collections.sort'],
  },

  {
    id: 'q-084-is-map-a-collection',
    number: 84,
    languageId: 'java',
    topicId: 'java-collection-framework-intro',
    topicTitle: 'Collection vs Collections vs Collections Framework',
    question: 'Is Map a child or sub-interface of Collection in the Java Collections Framework?',
    difficulty: 'Beginner',
    type: 'Conceptual',
    shortAnswer: [
      'No. Map does NOT extend or implement java.util.Collection.',
      'Collection models single-element sequences (add(E), iterator()). Map models key-value pair associations (put(K, V), get(K)).',
      'Map is an essential part of the Java Collections Framework architecture, but it sits on a completely distinct branch.',
      'You can view a Map through Collection views via entrySet(), keySet(), and values().',
    ],
    deepDive: 'The fundamental method signatures incompatible with Collection: Collection defines add(E element) and iterator(), while Map defines put(K key, V value). Attempting to make Map implement Collection would force either awkward Pair wrapping or unsupported operation exceptions.',
    codeSnippet: {
      language: 'java',
      code: `Map<Integer, String> map = new HashMap<>();
map.put(1, "One");

// Accessing Map via Collection views:
Set<Integer> keys = map.keySet();               // Set extends Collection
Collection<String> vals = map.values();         // Collection
Set<Map.Entry<Integer, String>> entries = map.entrySet(); // Set extends Collection`,
    },
    followUpTip: 'Highlight how entrySet(), keySet(), and values() act as bridges connecting Map to the Collection ecosystem.',
    keywords: ['map hierarchy', 'not a collection', 'key-value pairs', 'entryset', 'keyset', 'collection view'],
  },

  {
    id: 'q-085-arraylist-vs-linkedlist',
    number: 85,
    languageId: 'java',
    topicId: 'java-list-implementations',
    topicTitle: 'List Implementations: ArrayList, LinkedList, Vector, Stack',
    question: 'How do ArrayList and LinkedList compare in memory layout and operational performance?',
    difficulty: 'Intermediate',
    type: 'Conceptual',
    shortAnswer: [
      'ArrayList uses a contiguous dynamically resizing array. Random index access get(i) is O(1). Inserting/removing near beginning/middle is O(n) due to element shifting.',
      'LinkedList is a doubly linked list of node objects. Random access get(i) is O(n). Inserting/removing at head or tail is O(1) once node is located.',
      'LinkedList has heavy memory overhead (24-32 bytes extra per node for references) and poor CPU cache locality.',
      'In modern Java, ArrayList is almost always preferred for lists; ArrayDeque is preferred for queue/stack needs.',
    ],
    deepDive: 'Hardware CPU caches favor contiguous memory blocks like those in ArrayList arrays. Iterating an ArrayList triggers hardware prefetching, whereas traversing LinkedList pointer-chases across random heap memory addresses, causing frequent CPU cache misses.',
    codeSnippet: {
      language: 'java',
      code: `List<String> arrayList = new ArrayList<>(); // Contiguous array in memory: [E][E][E]
List<String> linkedList = new LinkedList<>(); // Dispersed nodes: [prev|data|next] <-> [prev|data|next]`,
    },
    followUpTip: 'If an interviewer asks what to use for a FIFO queue or LIFO stack, recommend ArrayDeque rather than LinkedList.',
    keywords: ['arraylist vs linkedlist', 'random access', 'node overhead', 'cache locality', 'arraydeque', 'memory layout'],
  },

  {
    id: 'q-086-hashset-vs-treeset',
    number: 86,
    languageId: 'java',
    topicId: 'java-set-implementations',
    topicTitle: 'Set Implementations: HashSet, LinkedHashSet, TreeSet',
    question: 'What are the key differences between HashSet and TreeSet?',
    difficulty: 'Intermediate',
    type: 'Conceptual',
    shortAnswer: [
      'HashSet is backed by a HashMap and provides O(1) average time complexity for add, remove, and contains. It offers no ordering guarantees.',
      'TreeSet is backed by a NavigableMap (Red-Black self-balancing tree) and provides O(log n) time complexity. Elements are maintained in sorted order (natural Comparable or custom Comparator).',
      'HashSet allows one null element; TreeSet throws NullPointerException if null is inserted when using natural ordering.',
      'HashSet relies on equals() and hashCode(); TreeSet relies on compareTo() or compare() to determine uniqueness and order.',
    ],
    deepDive: 'A critical interview catch: If two objects have compareTo() == 0, TreeSet treats them as duplicates and rejects the second object, even if equals() would return false! Objects stored in TreeSet must maintain a comparator consistent with equals.',
    codeSnippet: {
      language: 'java',
      code: `Set<Integer> hashSet = new HashSet<>();
hashSet.add(5); hashSet.add(2); hashSet.add(8);
System.out.println(hashSet); // Order NOT guaranteed

Set<Integer> treeSet = new TreeSet<>();
treeSet.add(5); treeSet.add(2); treeSet.add(8);
System.out.println(treeSet); // Guaranteed sorted: [2, 5, 8]`,
    },
    followUpTip: 'Mention LinkedHashSet as the middle ground: O(1) performance like HashSet with predictable insertion-order iteration.',
    keywords: ['hashset vs treeset', 'red-black tree', 'o(1) vs o(log n)', 'sorted order', 'comparable vs hashcode', 'null handling'],
  },

  {
    id: 'q-087-hashmap-vs-treemap',
    number: 87,
    languageId: 'java',
    topicId: 'java-map-implementations',
    topicTitle: 'Map: HashMap, LinkedHashMap, TreeMap, ConcurrentHashMap',
    question: 'Compare HashMap and TreeMap in terms of performance, key ordering, and null tolerance.',
    difficulty: 'Intermediate',
    type: 'Conceptual',
    shortAnswer: [
      'HashMap offers O(1) average time for get() and put(), has no guaranteed order, and permits one null key and multiple null values.',
      'TreeMap provides guaranteed O(log n) time complexity, maintains keys in sorted order, and prohibits null keys when using natural ordering.',
      'HashMap determines key equivalence via hashCode() and equals(). TreeMap determines key equivalence strictly via compareTo() == 0 or compare() == 0.',
      'Use HashMap for high-throughput lookup; use TreeMap when sorted key iteration or range queries (subMap, headMap, tailMap) are required.',
    ],
    deepDive: 'In Java 8+, HashMap buckets degrade from linked lists to red-black tree bins (TreeNode) when bucket size reaches TREEIFY_THRESHOLD (8) and table capacity >= 64, providing worst-case O(log n) lookup under hash collision attacks.',
    codeSnippet: {
      language: 'java',
      code: `Map<String, Integer> hashMap = new HashMap<>();
hashMap.put(null, 0); // Allowed in HashMap!

Map<String, Integer> treeMap = new TreeMap<>();
// treeMap.put(null, 0); // Throws NullPointerException in natural order!`,
    },
    followUpTip: 'Also contrast with LinkedHashMap, which maintains insertion order or access order (for LRU caches) at O(1) speed.',
    keywords: ['hashmap vs treemap', 'o(1) vs o(log n)', 'sorted keys', 'null keys', 'navigablemap', 'treeify'],
  },

  {
    id: 'q-088-what-is-iterator',
    number: 88,
    languageId: 'java',
    topicId: 'java-iterator-traversal',
    topicTitle: 'Iterator: Traversal, Safe Removal, and ModCount',
    question: 'What is an Iterator in Java and how does it prevent ConcurrentModificationException during element removal?',
    difficulty: 'Intermediate',
    type: 'Conceptual',
    shortAnswer: [
      'An Iterator<T> is an object that traverses elements of a collection sequentially via hasNext() and next().',
      'It supports safe element deletion during traversal using its iterator.remove() method.',
      'Directly calling collection.remove() inside a loop causes modCount != expectedModCount, throwing ConcurrentModificationException (fail-fast behavior).',
      'iterator.remove() synchronizes expectedModCount with collection modCount, allowing safe removal without throwing.',
    ],
    deepDive: 'Fail-fast iterators are designed to immediately surface concurrent mutation bugs rather than risking nondeterministic data corruption later. However, fail-fast behavior is not guaranteed in concurrent multi-threaded scenarios without synchronization; use ConcurrentHashMap or CopyOnWriteArrayList for thread safety.',
    codeSnippet: {
      language: 'java',
      code: `List<Integer> list = new ArrayList<>(List.of(1, 2, 3, 4));
Iterator<Integer> it = list.iterator();
while (it.hasNext()) {
    if (it.next() % 2 == 0) {
        it.remove(); // SAFE! Updates expectedModCount.
    }
}`,
    },
    followUpTip: 'Mention Java 8+ Collection.removeIf(Predicate) as the modern functional alternative to writing manual Iterator loops.',
    keywords: ['iterator', 'hasnext', 'next', 'remove', 'concurrentmodificationexception', 'fail-fast', 'modcount'],
  },

  {
    id: 'q-089-enhanced-for-loop',
    number: 89,
    languageId: 'java',
    topicId: 'java-enhanced-for-loop',
    topicTitle: 'Enhanced for Loop: Mechanics, Iterables, and Limitations',
    question: 'How does the enhanced for loop (for-each) work under the hood, and what are its limitations?',
    difficulty: 'Beginner',
    type: 'Conceptual',
    shortAnswer: [
      'For arrays, the compiler translates the enhanced for loop into a standard index-based loop: int i = 0; i < len; i++.',
      'For collections implementing Iterable<T>, the compiler translates it into an Iterator traversal: Iterator it = c.iterator(); while (it.hasNext()).',
      'Limitations: (1) No access to current index, (2) cannot step in reverse or skip steps, (3) cannot modify collection structure (calling list.remove() throws ConcurrentModificationException), (4) cannot replace array primitive values in-place.',
      'A Map is not directly Iterable; you must iterate over map.entrySet(), map.keySet(), or map.values().',
    ],
    deepDive: 'Reassigning a primitive loop variable (e.g. for (int x : arr) x = 0;) modifies only the temporary local copy, not the source array. For objects, reassigning the loop variable reference does not alter the collection, but invoking setter methods on the referenced object will mutate it.',
    codeSnippet: {
      language: 'java',
      code: `// What you write:
for (String item : list) { System.out.println(item); }

// What the compiler bytecode generates:
for (Iterator<String> it = list.iterator(); it.hasNext(); ) {
    String item = it.next();
    System.out.println(item);
}`,
    },
    followUpTip: 'If you need the index or need to remove items, stick to standard for(int i=0;...) or an explicit Iterator/removeIf.',
    keywords: ['enhanced for loop', 'for-each', 'iterable', 'bytecode desugaring', 'no index', 'concurrentmodificationexception'],
  },

  {
    id: 'q-090-what-is-comparator',
    number: 90,
    languageId: 'java',
    topicId: 'java-comparator-sorting',
    topicTitle: 'Comparator and Sorting: Multi-Property and Lambda Sorting',
    question: 'What is a Comparator, and how does it differ from Comparable?',
    difficulty: 'Intermediate',
    type: 'Conceptual',
    shortAnswer: [
      'Comparable is implemented by the class itself (e.g. String, Integer) using compareTo(T o), defining the single natural ordering.',
      'Comparator is an external functional interface @FunctionalInterface with compare(T o1, T o2), allowing multiple flexible sorting strategies without altering class code.',
      'Modern Java provides utility factory methods: Comparator.comparing(), .thenComparing(), .reversed().',
      'Always use Integer.compare(a, b) or Double.compare(a, b) rather than subtraction to prevent integer overflow bugs.',
    ],
    deepDive: 'Writing (a, b) -> a - b fails when a = Integer.MIN_VALUE and b = 1 due to 32-bit integer underflow (wraps to positive Integer.MAX_VALUE), reversing the sort order. Integer.compare(a, b) is branch-based and completely immune to underflow/overflow.',
    codeSnippet: {
      language: 'java',
      code: `// Multi-tier sorting with Comparator methods:
List<Employee> staff = getEmployees();
staff.sort(
    Comparator.comparing(Employee::getDepartment)
              .thenComparing(Employee::getSalary, Comparator.reverseOrder())
              .thenComparing(Employee::getName)
);`,
    },
    followUpTip: 'Explain that Comparable belongs to java.lang while Comparator belongs to java.util.',
    keywords: ['comparator vs comparable', 'natural order', 'functional interface', 'integer.compare', 'overflow safety', 'thencomparing'],
  },

  {
    id: 'q-091-what-is-a-stream',
    number: 91,
    languageId: 'java',
    topicId: 'java-stream-api-pipeline',
    topicTitle: 'Stream API: Pipeline, Lazy Evaluation, and Collectors',
    question: 'What is a Stream in Java, and why are intermediate operations described as lazy?',
    difficulty: 'Intermediate',
    type: 'Conceptual',
    shortAnswer: [
      'A Stream is a sequence of elements supporting declarative data processing pipelines (filtering, mapping, reducing) from a data source.',
      'Streams do not store data and do not mutate the underlying data source.',
      'Intermediate operations (filter, map, sorted) are lazy: they do not process elements until a terminal operation (collect, count, forEach) is triggered.',
      'A stream pipeline cannot be consumed more than once; calling another terminal operation throws IllegalStateException.',
    ],
    deepDive: 'Lazy evaluation enables short-circuiting optimizations. In stream.filter(predicate).findFirst(), the filter does not execute over all 1,000,000 elements; it halts immediately after finding the first matching element, achieving O(1) performance instead of O(n).',
    codeSnippet: {
      language: 'java',
      code: `List<String> names = List.of("Aisha", "Bilal", "Sara", "Zayd");

// Filter and map are NOT executed here:
Stream<String> stream = names.stream()
    .filter(n -> n.length() > 4)
    .map(String::toUpperCase);

// Terminal operation triggers execution:
List<String> result = stream.toList();`,
    },
    followUpTip: 'Be sure to highlight that streams should never be reused: create a fresh stream pipeline from the source collection each time.',
    keywords: ['stream api', 'lazy evaluation', 'intermediate operations', 'terminal operations', 'short-circuiting', 'illegalstateexception'],
  },

  {
    id: 'q-092-what-is-method-reference',
    number: 92,
    languageId: 'java',
    topicId: 'java-method-references',
    topicTitle: 'Method References: Syntax, Forms, and Practical Usage',
    question: 'What is a method reference in Java and what are its four primary forms?',
    difficulty: 'Intermediate',
    type: 'Conceptual',
    shortAnswer: [
      'A method reference is a compact, syntactic shorthand for a lambda expression that does nothing other than call an existing named method.',
      'The four forms are:',
      '1. Static method reference: ContainingClass::staticMethod (e.g. Math::max, String::valueOf).',
      '2. Bound instance method reference: instanceRef::instanceMethod (e.g. System.out::println).',
      '3. Unbound instance method reference: ContainingType::instanceMethod (e.g. String::toUpperCase).',
      '4. Constructor reference: ClassName::new (e.g. ArrayList::new, Student::new).',
    ],
    deepDive: 'Method references are not merely cleaner syntax; the JVM compiles method references using invokedynamic (similar to lambdas), caching call sites for high execution speed and zero unnecessary anonymous inner class allocations.',
    codeSnippet: {
      language: 'java',
      code: `// Lambda vs Method Reference:
names.forEach(s -> System.out.println(s)); // Lambda
names.forEach(System.out::println);        // Bound instance method reference

names.stream().map(s -> s.toUpperCase());  // Lambda
names.stream().map(String::toUpperCase);   // Unbound instance method reference`,
    },
    followUpTip: 'Mention constructor references ClassName::new as the foundation for factory patterns with Supplier or Function.',
    keywords: ['method reference', 'double colon', 'static method', 'instance method', 'constructor reference', 'invokedynamic'],
  },

  {
    id: 'q-093-what-is-optional',
    number: 93,
    languageId: 'java',
    topicId: 'java-optional-type',
    topicTitle: 'Optional<T>: Value Presence, Absence, and Null Safety',
    question: 'What is the purpose of Optional<T> in Java, and what are the best practices for using it?',
    difficulty: 'Intermediate',
    type: 'Conceptual',
    shortAnswer: [
      'Optional<T> is a single-value container that either holds a non-null reference or is empty.',
      'It was designed primarily as a return type for methods where a "no result" outcome is normal and expected, making missing values explicit in the API contract.',
      'Best practices:',
      '1. Prefer orElse(), orElseGet(), and ifPresent() over calling get() blindly.',
      '2. Never use Optional as method parameters, class fields, or collection elements (it is not Serializable and adds pointer chasing overhead).',
      '3. Never return null from a method whose return type is Optional; return Optional.empty().',
    ],
    deepDive: 'Calling optional.get() without checking isPresent() throws NoSuchElementException, defeating the entire purpose of Optional by replacing NullPointerException with another runtime error. orElseGet(supplier) is lazy and avoids computing default values unless the optional is truly empty.',
    codeSnippet: {
      language: 'java',
      code: `Optional<User> userOpt = findUserById("user-123");

// Good practice:
User user = userOpt.orElseGet(() -> createDefaultUser());

// Bad practice:
User dangerous = userOpt.get(); // Throws NoSuchElementException if empty!`,
    },
    followUpTip: 'Explain the difference between orElse(defaultObj) (eagerly evaluates argument) and orElseGet(supplier) (lazily evaluates only if empty).',
    keywords: ['optional', 'nullpointerexception', 'orelse', 'orelseget', 'return type best practices', 'nosuchelementexception'],
  },

  {
    id: 'q-094-program-to-interfaces',
    number: 94,
    languageId: 'java',
    topicId: 'java-collection-framework-intro',
    topicTitle: 'Collection vs Collections vs Collections Framework',
    question: 'Why should you program to interfaces such as List or Set rather than concrete classes like ArrayList or HashSet?',
    difficulty: 'Beginner',
    type: 'Conceptual',
    shortAnswer: [
      '1. Loose Coupling: Isolates calling code from the specific internal collection implementation.',
      '2. Flexibility to Swap: Allows changing the backing implementation (e.g. from ArrayList to CopyOnWriteArrayList or Collections.synchronizedList) with zero changes to downstream consumer code.',
      '3. Readability & Contract Clarity: Declares intent using general contracts (List for ordered sequences, Set for uniqueness) rather than implementation details.',
      '4. Testability: Simplifies passing mocks, stubs, or immutable wrappers (List.of()).',
    ],
    deepDive: 'This adheres directly to the Dependency Inversion Principle (the "D" in SOLID): depend upon abstractions, not concretions. If a method parameter is List<T>, callers can pass ArrayList, LinkedList, Arrays.asList(), or List.of() freely.',
    codeSnippet: {
      language: 'java',
      code: `// Recommended (Programming to interface):
List<String> items = new ArrayList<>();
public void processItems(List<String> items) { ... }

// Anti-pattern (Rigid coupling to concrete class):
ArrayList<String> rigidItems = new ArrayList<>();
public void processItems(ArrayList<String> items) { ... }`,
    },
    followUpTip: 'Connect this to the Liskov Substitution Principle and Dependency Inversion in object-oriented design.',
    keywords: ['program to interfaces', 'loose coupling', 'polymorphism', 'swappable implementation', 'api design', 'solid principles'],
  },

  {
    id: 'q-095-does-var-make-java-dynamic',
    number: 95,
    languageId: 'java',
    topicId: 'java-var-local-type-inference',
    topicTitle: 'Local Variable Type Inference (var)',
    question: 'Does var make Java a dynamically typed language?',
    difficulty: 'Beginner',
    type: 'Conceptual',
    shortAnswer: [
      'No. Java remains completely statically typed at compile time.',
      'The var keyword tells javac to infer the concrete static type of a local variable from its right-hand initialization expression during compilation.',
      'Once inferred, the variable type is fixed in bytecode and can never change. Reassigning a value of an incompatible type causes a compile-time error.',
      'var is a reserved type name, not a dynamic object type or keyword.',
    ],
    deepDive: 'Unlike dynamically typed languages like JavaScript or Python where variables can hold values of varying types across runtime execution, Java var compiles down to the exact inferred bytecode representation (e.g. var count = 10 compiles identically to int count = 10). There is zero performance cost or dynamic lookup overhead.',
    codeSnippet: {
      language: 'java',
      code: `var i = 10;      // Inferred as int
i = 20;          // Valid: same type
// i = "20";     // Compile-time error: String cannot be converted to int`,
    },
    followUpTip: 'Emphasize that var is purely a syntactic convenience for the developer; the JVM bytecode is 100% statically typed.',
    keywords: ['var', 'dynamic typing', 'static typing', 'compile-time type inference', 'type safety', 'java 10'],
  },

  {
    id: 'q-096-can-var-be-used-on-fields',
    number: 96,
    languageId: 'java',
    topicId: 'java-var-local-type-inference',
    topicTitle: 'Local Variable Type Inference (var)',
    question: 'Can var be used for an instance variable, static field, or method parameter?',
    difficulty: 'Beginner',
    type: 'Conceptual',
    shortAnswer: [
      'No. var can ONLY be used for local variable declarations inside methods, constructors, and initialization blocks, and in supported loop variables (for / enhanced-for) and try-with-resources.',
      'It CANNOT be used for instance fields or static fields of a class.',
      'It CANNOT be used for method parameters or constructor parameters.',
      'It CANNOT be used for method return types.',
    ],
    deepDive: 'Allowing var on public API contracts (fields, parameters, return types) would undermine Java API readability and binary compatibility. Javadoc generation, separate compilation, and class contracts require explicit, declared types so consumers can understand APIs without inspecting internal implementation details.',
    codeSnippet: {
      language: 'java',
      code: `class Example {
    // var count = 10; // ERROR: fields cannot use var

    // public void calculate(var x) {} // ERROR: parameters cannot use var
    // public var getResult() {}       // ERROR: return types cannot use var

    public void show() {
        var count = 10;        // Valid: local variable inside method
        var message = "Hello"; // Valid: local variable inside method
        System.out.println(message + " " + count);
    }
}`,
    },
    followUpTip: 'A common trick question: "Can var be used in lambda expressions?" Java 11 added var support for explicitly typed lambda parameters (e.g. (var x, var y) -> x + y) to allow annotations on parameters.',
    keywords: ['var scope', 'local variables', 'fields prohibited', 'parameters prohibited', 'return types prohibited', 'api contracts'],
  },

  {
    id: 'q-097-why-must-var-be-initialized',
    number: 97,
    languageId: 'java',
    topicId: 'java-var-local-type-inference',
    topicTitle: 'Local Variable Type Inference (var)',
    question: 'Why must a var variable always be initialized on declaration, and why are null and raw array initializers rejected?',
    difficulty: 'Intermediate',
    type: 'Conceptual',
    shortAnswer: [
      'The Java compiler needs an initializer expression on the declaration line to deduce the static type. Declaring var count; without a value gives the compiler zero type information.',
      'var value = null; is rejected because null matches any reference type, making unambiguous type inference impossible.',
      'var nums = {1, 2, 3}; is rejected because array initializer syntax requires an explicit target type; use var nums = new int[] {1, 2, 3}; instead.',
      'Similarly, bare lambdas like var task = () -> {}; fail without a target functional interface type cast.',
    ],
    deepDive: 'In Java, type inference works strictly from the right-hand side initializer to the left-hand side variable. If the right-hand side has no type (uninitialized), ambiguous type (null), or requires a target type from the left (array literal or lambda), javac rejects it with a compilation error.',
    codeSnippet: {
      language: 'java',
      code: `// var number;                   // ERROR: cannot use 'var' on variable without initializer
// var value = null;             // ERROR: cannot infer type for local variable initialized to 'null'
// var nums = {1, 2, 3};         // ERROR: array initializer needs an explicit target-type
var nums = new int[] {1, 2, 3};  // VALID: inferred as int[]

// var task = () -> System.out.println("Hello"); // ERROR: lambda needs target functional type
Runnable task = () -> System.out.println("Hello"); // VALID`,
    },
    followUpTip: 'Remember: var nums = new int[] {1, 2, 3}; works because new int[] provides the explicit target array type.',
    keywords: ['var initialization', 'null inference', 'array initializer', 'target type', 'lambda target type', 'compile-time deduction'],
  },

  {
    id: 'q-098-final-vs-sealed-classes',
    number: 98,
    languageId: 'java',
    topicId: 'java-sealed-classes-interfaces',
    topicTitle: 'Sealed Classes and Interfaces',
    question: 'What is the key difference between final and sealed classes in Java?',
    difficulty: 'Intermediate',
    type: 'Conceptual',
    shortAnswer: [
      'A final class permits ZERO subclasses. No class anywhere in any package or module can extend it.',
      'A sealed class allows controlled inheritance. It permits only an explicitly declared set of direct subtypes listed in its permits clause (or co-located in the same source file).',
      'final is an all-or-nothing restriction, whereas sealed provides fine-grained architectural control over domain model variants.',
      'Sealed types enable compilers to verify exhaustive pattern matching without artificial default branches.',
    ],
    deepDive: 'Before Java 17, developers who wanted to restrict inheritance had to use package-private constructors, which only restricted subclasses to the same package and prevented public consumption. Sealed classes provide language-level control: the superclass and subclasses can be public while strictly controlling the permitted hierarchy.',
    codeSnippet: {
      language: 'java',
      code: `// Final: NO subclasses allowed anywhere
public final class ImmutableToken {}
// class SubToken extends ImmutableToken {} // COMPILE ERROR!

// Sealed: ONLY explicitly permitted direct subtypes allowed
public sealed class Payment permits CardPayment, WalletPayment {}

public final class CardPayment extends Payment {}
public non-sealed class WalletPayment extends Payment {}`,
    },
    followUpTip: 'Connect sealed classes to Algebraic Data Types (sum types) in languages like Haskell, Scala, or Rust.',
    keywords: ['final vs sealed', 'permits', 'inheritance restriction', 'algebraic data types', 'pattern matching', 'java 17'],
  },

  {
    id: 'q-099-subclasses-of-sealed-class-modifiers',
    number: 99,
    languageId: 'java',
    topicId: 'java-sealed-classes-interfaces',
    topicTitle: 'Sealed Classes and Interfaces',
    question: 'What must every direct permitted subclass of a sealed class declare in Java?',
    difficulty: 'Intermediate',
    type: 'Conceptual',
    shortAnswer: [
      'Every direct permitted subclass or sub-interface of a sealed type MUST explicitly declare exactly one of three modifiers:',
      '1. final: Prevents any further inheritance down that branch completely.',
      '2. sealed: Continues restricted inheritance, requiring its own permits clause.',
      '3. non-sealed: Explicitly breaks the seal, opening that branch for unrestricted extension by any subclass.',
      'Failing to specify one of these three modifiers results in a compile-time error.',
    ],
    deepDive: 'Java enforces this tri-state rule so every author of a subclass explicitly decides the inheritance contract for that branch. In addition, all permitted subclasses must be accessible to the sealed class (same module or same package if unnamed module) and directly extend the sealed class.',
    codeSnippet: {
      language: 'java',
      code: `sealed class Payment permits CardPayment, WalletPayment, BankPayment {}

// 1. final: terminal subclass
final class CardPayment extends Payment {}

// 2. non-sealed: open subclass for arbitrary extension
non-sealed class WalletPayment extends Payment {}
class GiftCardWallet extends WalletPayment {} // Permitted!

// 3. sealed: continues restricted hierarchy
sealed class BankPayment extends Payment permits WirePayment {}
final class WirePayment extends BankPayment {}`,
    },
    followUpTip: 'Note that non-sealed is the first hyphenated keyword introduced in Java.',
    keywords: ['sealed subclass modifiers', 'final', 'sealed', 'non-sealed', 'hyphenated keyword', 'permits clause'],
  },

  {
    id: 'q-100-can-sealed-have-non-sealed-child',
    number: 100,
    languageId: 'java',
    topicId: 'java-sealed-classes-interfaces',
    topicTitle: 'Sealed Classes and Interfaces',
    question: 'Can a sealed class have a child class that allows further unrestricted inheritance?',
    difficulty: 'Beginner',
    type: 'Conceptual',
    shortAnswer: [
      'Yes. A permitted direct child class declared with the non-sealed modifier removes the sealed restriction for that entire branch.',
      'Any arbitrary class can then extend the non-sealed subclass without needing to be listed in any permits clause.',
      'This provides flexibility when certain domain branches need open extension (e.g. plugins or third-party wallets) while the root hierarchy remains controlled.',
    ],
    deepDive: 'In a payment processing system, Payment may permit CardPayment (final) and WalletPayment (non-sealed). CardPayment stays strictly locked, but third-party developers or client modules can freely create subclasses of WalletPayment (like ApplePayWallet, GooglePayWallet, or PayPalWallet).',
    codeSnippet: {
      language: 'java',
      code: `sealed class Payment permits CardPayment, WalletPayment {}

final class CardPayment extends Payment {} // Locked branch

non-sealed class WalletPayment extends Payment {} // Open branch

// Any external class can freely extend WalletPayment:
class CryptoWallet extends WalletPayment {}
class StoreCreditWallet extends WalletPayment {}`,
    },
    followUpTip: 'Highlight how non-sealed acts as an intentional escape hatch for modularity and plugin architectures.',
    keywords: ['non-sealed', 'unrestricted inheritance', 'open hierarchy', 'subclassing', 'plugin architecture'],
  },

  {
    id: 'q-101-why-use-record-vs-class',
    number: 101,
    languageId: 'java',
    topicId: 'java-record-classes',
    topicTitle: 'Record Classes',
    question: 'Why use a record instead of a normal class in Java?',
    difficulty: 'Beginner',
    type: 'Conceptual',
    shortAnswer: [
      'Use records when a class\'s primary purpose is acting as a transparent, immutable data carrier.',
      'Eliminates repetitive boilerplate: Java automatically generates private final fields, canonical constructor, accessors, equals(), hashCode(), and toString().',
      'Value-based semantics: equals() and hashCode() compare component values rather than object memory identities.',
      'Clear design intent: Signals to developers and frameworks (Jackson, JPA, Spring) that the object represents pure state.',
      'Notice accessor syntax: Records use component() (e.g. alien.name()), not traditional JavaBeans getComponent().',
    ],
    deepDive: 'Writing a standard POJO data class requires 50+ lines of error-prone boilerplate: constructor, getters, equals(), hashCode(), and toString(). Records condense this into a single line: record Alien(int age, String name) {}. Furthermore, record components are guaranteed to be final, enforcing shallow immutability by default.',
    codeSnippet: {
      language: 'java',
      code: `// In a single line:
record Alien(int age, String name) {}

public class Main {
    public static void main(String[] args) {
        var a1 = new Alien(5, "E.T.");
        var a2 = new Alien(5, "E.T.");

        System.out.println(a1.name());      // Accessor: "E.T." (not getName())
        System.out.println(a1);             // toString(): Alien[age=5, name=E.T.]
        System.out.println(a1.equals(a2));  // true (value-based equality)
    }
}`,
    },
    followUpTip: 'Make sure to mention that record accessors do NOT use the "get" prefix: use name(), not getName().',
    keywords: ['records vs pojo', 'data carrier', 'boilerplate reduction', 'value-based equality', 'canonical constructor', 'accessors'],
  },

  {
    id: 'q-102-can-record-have-methods-and-static-fields',
    number: 102,
    languageId: 'java',
    topicId: 'java-record-classes',
    topicTitle: 'Record Classes',
    question: 'Can a record class contain methods, constructors, and static fields?',
    difficulty: 'Intermediate',
    type: 'Conceptual',
    shortAnswer: [
      'Yes. Records can declare static fields, static methods, instance methods, and constructors (including compact constructors).',
      'They can also declare local variables inside their methods and implement interfaces.',
      'CRITICAL RESTRICTION: Records CANNOT declare additional non-static instance fields beyond their record header components.',
      'All instance state must reside exclusively in the record header components.',
      'Records are implicitly final and implicitly extend java.lang.Record; they cannot extend any other class.',
    ],
    deepDive: 'Compact constructors are a unique feature of records: they omit parameter lists and this assignments, allowing developers to execute validation and defensive copying cleanly before fields are initialized: public Alien { if (age < 0) throw new IllegalArgumentException(); }.',
    codeSnippet: {
      language: 'java',
      code: `record Alien(int age, String name) {
    // Valid: static field
    static String species = "Unknown";

    // Valid: compact constructor for validation
    public Alien {
        if (age < 0) throw new IllegalArgumentException("Age cannot be negative");
    }

    // Valid: custom instance method
    public String description() {
        var label = name + " is " + age + " years old";
        return label;
    }

    // ERROR: non-static instance fields are prohibited:
    // private int health; // Compile-time error!
}`,
    },
    followUpTip: 'Compact constructors do not use parentheses: public RecordName { ... } rather than public RecordName(...) { ... }.',
    keywords: ['record methods', 'static fields in records', 'compact constructor', 'instance field restriction', 'implicitly final'],
  },

  {
    id: 'q-103-are-records-deeply-immutable',
    number: 103,
    languageId: 'java',
    topicId: 'java-record-classes',
    topicTitle: 'Record Classes',
    question: 'Are Java records deeply immutable?',
    difficulty: 'Intermediate',
    type: 'Conceptual',
    shortAnswer: [
      'No. Records provide shallow immutability, not automatic deep immutability.',
      'Component fields are implicitly private final, meaning references or primitive values cannot be reassigned after construction.',
      'However, if a component refers to a mutable object (such as an ArrayList, Date, or custom POJO), the contents of that object can still be modified directly via its mutator methods!',
      'To achieve true deep immutability, make defensive unmodifiable copies in the compact constructor and/or return unmodifiable views.',
    ],
    deepDive: 'This is a favorite senior interview trick. If record Team(String name, List<String> members) is created with a mutable ArrayList, calling team.members().add("Bob") succeeds and modifies the internal state of the record. To prevent this, use defensive copying: public Team { members = List.copyOf(members); }.',
    codeSnippet: {
      language: 'java',
      code: `// Mutable reference allows internal state change (Shallow immutability):
record Team(String name, List<String> members) {}

List<String> list = new ArrayList<>();
list.add("Alice");
Team team = new Team("Alpha", list);
team.members().add("Bob"); // Mutates internal list!

// Fix with defensive copying in compact constructor (Deep immutability):
record SecureTeam(String name, List<String> members) {
    public SecureTeam {
        members = List.copyOf(members); // Unmodifiable defensive copy!
    }
}`,
    },
    followUpTip: 'Always recommend List.copyOf() or Collections.unmodifiableList() inside compact constructors when records contain collection components.',
    keywords: ['shallow immutability', 'deep immutability', 'defensive copying', 'list.copyof', 'mutable reference', 'final components'],
  },

  {
    id: 'q-104-java-versions-for-modern-features',
    number: 104,
    languageId: 'java',
    topicId: 'java-var-local-type-inference',
    topicTitle: 'Modern Java Language Features',
    question: 'Which Java versions introduced local variable type inference (var), record classes, and sealed classes as permanent features?',
    difficulty: 'Beginner',
    type: 'Conceptual',
    shortAnswer: [
      'Local Variable Type Inference (var): Java 10 (JEP 286, March 2018).',
      'Record Classes: Java 16 (JEP 395, March 2021) as a permanent feature (previewed in Java 14 and 15).',
      'Sealed Classes and Interfaces: Java 17 LTS (JEP 409, September 2021) as a permanent feature (previewed in Java 15 and 16).',
    ],
    deepDive: 'Java moved to a 6-month release cadence in 2018 with LTS (Long-Term Support) versions every 2 to 3 years. Java 17 was a major LTS milestone combining sealed classes, finalized records, enhanced switch expressions, and pattern matching for instanceof.',
    codeSnippet: {
      language: 'java',
      code: `// Modern Java timeline:
// Java 10:  var i = 10;
// Java 16:  record Point(int x, int y) {}
// Java 17:  sealed class Shape permits Circle, Square {}`,
    },
    followUpTip: 'Reciting JEP numbers or exact release milestones shows deep familiarity with modern enterprise Java evolution.',
    keywords: ['java versions', 'java 10 var', 'java 16 records', 'java 17 sealed classes', 'jep milestones', 'lts release'],
  },

  {
    id: 'q-105-what-is-maven-benefits',
    number: 105,
    languageId: 'java',
    topicId: 'java-maven-build-management',
    topicTitle: 'Maven — Build and Dependency Management',
    question: 'What is Apache Maven and what problems does it solve in Java development?',
    difficulty: 'Beginner',
    type: 'Conceptual',
    shortAnswer: [
      'Apache Maven is an open-source build automation and project management tool driven by a declarative XML configuration file named pom.xml.',
      'It solves manual dependency management by automatically downloading libraries and their transitive dependencies from central repositories.',
      'It enforces standard project directory structures (Convention over Configuration), ensuring any developer or CI tool can build the project without custom scripts.',
      'It provides uniform build lifecycles (clean, compile, test, package, install, deploy) for repeatable, cross-platform compilation.',
    ],
    deepDive: 'Before Maven, teams manually downloaded vendor JARs into a lib/ directory and committed them to version control. If a library had 15 underlying transitive dependencies, developers had to track down each JAR manually. Version mismatches triggered NoClassDefFoundError and NoSuchMethodError at runtime. Maven eliminates this completely by resolving entire dependency trees deterministically.',
    followUpTip: 'Mention that while Maven automates compilation, testing, and packaging, it does not write unit tests for you or guarantee deployment success.',
    keywords: ['maven', 'build automation', 'pom.xml', 'dependency management', 'convention over configuration', 'transitive dependencies'],
  },

  {
    id: 'q-106-what-is-pom-xml',
    number: 106,
    languageId: 'java',
    topicId: 'java-maven-build-management',
    topicTitle: 'Maven — Build and Dependency Management',
    question: 'What is pom.xml and what core configurations does it define?',
    difficulty: 'Beginner',
    type: 'Conceptual',
    shortAnswer: [
      'pom.xml (Project Object Model) is the central declarative configuration file at the root of every Maven project.',
      'Project Coordinates (GAV): GroupId, ArtifactId, Version, and Packaging format (JAR/WAR).',
      'Dependencies: External libraries required for compilation, testing, or runtime execution.',
      'Plugins & Compiler Properties: Java version targets (e.g. source/target 21), build plugins, and test harnesses.',
      'Build Profiles & Distribution: Environment-specific configurations and remote deployment target servers.',
    ],
    deepDive: 'The Project Object Model forms an inheritance hierarchy. Every project implicitly inherits from the Maven Super POM, which defines standard directory layouts, default plugin versions, and the Maven Central repository URL. In multi-module projects, submodules inherit settings from a parent POM.',
    codeSnippet: {
      language: 'xml',
      code: `<project xmlns="http://maven.apache.org/POM/4.0.0">
    <modelVersion>4.0.0</modelVersion>
    <groupId>com.suhel.stock</groupId>
    <artifactId>stock-management</artifactId>
    <version>1.0.0</version>
    <packaging>jar</packaging>
</project>`,
    },
    followUpTip: 'Explain that the GAV coordinates uniquely identify an artifact in the global Maven universe.',
    keywords: ['pom.xml', 'project object model', 'gav coordinates', 'super pom', 'parent pom', 'dependencies'],
  },

  {
    id: 'q-107-dependencies-and-transitive',
    number: 107,
    languageId: 'java',
    topicId: 'java-maven-build-management',
    topicTitle: 'Maven — Build and Dependency Management',
    question: 'What are direct vs transitive dependencies in Maven, and how do you inspect them?',
    difficulty: 'Intermediate',
    type: 'Conceptual',
    shortAnswer: [
      'Direct Dependency: A library explicitly declared in your project\'s pom.xml inside <dependencies>.',
      'Transitive Dependency: A library required by one of your direct dependencies, which Maven resolves and downloads automatically.',
      'For example: If you declare Spring Core, Maven automatically downloads its transitive dependency commons-logging.',
      'Inspect Command: Run `mvn dependency:tree` in the terminal to display the complete hierarchical dependency graph.',
    ],
    deepDive: 'Transitive dependencies can create version clashes if two different libraries pull incompatible versions of the same third library. Maven uses the "Nearest Definition Wins" rule (the dependency closest to your project root in the tree is chosen). Developers can override versions using <dependencyManagement> or <exclusions>.',
    codeSnippet: {
      language: 'bash',
      code: `# Inspect full dependency tree in terminal:
mvn dependency:tree

# Filter for a specific library:
mvn dependency:tree -Dincludes=org.springframework`,
    },
    followUpTip: 'Remember: mvn dependency:tree is the number one diagnostic tool for resolving classpath conflicts in enterprise Java.',
    keywords: ['direct dependencies', 'transitive dependencies', 'dependency tree', 'dependency:tree', 'version conflict', 'exclusions'],
  },

  {
    id: 'q-108-phase-vs-goal',
    number: 108,
    languageId: 'java',
    topicId: 'java-maven-build-management',
    topicTitle: 'Maven — Build and Dependency Management',
    question: 'What is the difference between a Maven build phase and a plugin goal?',
    difficulty: 'Intermediate',
    type: 'Conceptual',
    shortAnswer: [
      'Lifecycle Phase: An abstract, ordered stage in a build lifecycle representing a milestone (e.g. compile, test, package). Phases do not contain execution code themselves.',
      'Plugin Goal: A specific, concrete executable task implemented by a Maven plugin (e.g. compiler:compile, surefire:test).',
      'Binding: Maven binds plugin goals to lifecycle phases. When a phase is invoked, all goals bound to that phase execute in sequence.',
      'Direct Execution: You can invoke a phase (mvn test) or execute an individual goal directly without running a full lifecycle (mvn dependency:tree).',
    ],
    deepDive: 'Think of a phase as an interface or milestone in a checklist, and a goal as the implementation. When you run `mvn compile`, Maven executes `maven-compiler-plugin:compile` because that plugin goal is bound by default to the compile phase.',
    followUpTip: 'A common interview question: "Can a phase have multiple goals bound to it?" Yes! Multiple plugins can bind goals to the same phase (e.g. package phase executing jar:jar and spring-boot:repackage).',
    keywords: ['phase vs goal', 'lifecycle phase', 'plugin goal', 'binding', 'compiler:compile', 'surefire:test'],
  },

  {
    id: 'q-109-explain-maven-lifecycle-phases',
    number: 109,
    languageId: 'java',
    topicId: 'java-maven-build-management',
    topicTitle: 'Maven — Build and Dependency Management',
    question: 'Explain the core Maven lifecycle phases: compile, test, package, install, and deploy.',
    difficulty: 'Intermediate',
    type: 'Conceptual',
    shortAnswer: [
      'compile: Compiles the source code of the project (src/main/java) into bytecode .class files in target/classes/.',
      'test: Runs unit tests (src/test/java) using a test framework (JUnit) via maven-surefire-plugin.',
      'package: Takes the compiled code and packages it into its distributable format (JAR or WAR) in the target/ directory.',
      'install: Installs the packaged artifact into the local cache repository (~/.m2/repository) for local project reuse.',
      'deploy: Copies the final package to an enterprise remote repository (Nexus, Artifactory, Central) for sharing across teams.',
    ],
    deepDive: 'Sequential execution is paramount: Invoking a later phase in the Default Lifecycle automatically triggers all earlier phases. Running `mvn install` automatically runs `validate`, `compile`, `test`, `package`, `verify`, and `install` in strict order.',
    followUpTip: 'Be sure to highlight that compile does NOT create a JAR, and install does NOT deploy to production.',
    keywords: ['compile', 'test', 'package', 'install', 'deploy', 'lifecycle phases', 'surefire', 'target directory'],
  },

  {
    id: 'q-110-repositories-local-central-remote',
    number: 110,
    languageId: 'java',
    topicId: 'java-maven-build-management',
    topicTitle: 'Maven — Build and Dependency Management',
    question: 'What are local, Central, and remote repositories, and where is the local repository stored on your machine?',
    difficulty: 'Beginner',
    type: 'Conceptual',
    shortAnswer: [
      'Local Repository: A directory on your computer acting as a local cache. Stored at `~/.m2/repository` on macOS/Linux and `%USERPROFILE%\\.m2\\repository` on Windows.',
      'Maven Central: The canonical public repository provided by the Apache Maven community containing millions of open-source artifacts (repo.maven.apache.org).',
      'Remote Repository: Any network repository, including internal corporate servers (Sonatype Nexus, JFrog Artifactory, AWS CodeArtifact).',
      'Resolution Flow: Maven checks local cache first; if missing, it downloads from remote/Central and caches locally for future offline builds.',
    ],
    deepDive: 'Maven Central is technically a remote repository. Corporate environments often use an internal proxy repository (Nexus/Artifactory) that mirrors Maven Central to enforce enterprise security scans and cache approved third-party libraries.',
    codeSnippet: {
      language: 'bash',
      code: `# Default local repository path:
# macOS / Linux:  ~/.m2/repository/
# Windows:        C:\\Users\\<username>\\.m2\\repository\\`,
    },
    followUpTip: 'Note that Maven never automatically uploads your project to Maven Central; publishing to Central requires GPG keys, Sonatype OSSRH credentials, and running mvn deploy.',
    keywords: ['local repository', 'maven central', 'remote repository', '~/.m2/repository', 'nexus', 'artifactory'],
  },

  {
    id: 'q-111-jar-vs-war-packaging',
    number: 111,
    languageId: 'java',
    topicId: 'java-maven-build-management',
    topicTitle: 'Maven — Build and Dependency Management',
    question: 'What is the difference between a JAR and a WAR file in Java?',
    difficulty: 'Intermediate',
    type: 'Conceptual',
    shortAnswer: [
      'JAR (Java Archive): Compressed zip archive containing compiled .class files, metadata, and resources. Used for libraries, CLI tools, and modern executable Spring Boot microservices.',
      'WAR (Web Application Archive): Specialized archive containing web assets, WEB-INF/classes, WEB-INF/lib, and web.xml designed for deployment to external servlet containers (Tomcat, WildFly).',
      'Servlet Container: JARs in Spring Boot run with an embedded servlet container; WARs require an external standalone application server.',
      'Packaging Tag in pom.xml: `<packaging>jar</packaging>` (default) vs `<packaging>war</packaging>`.',
    ],
    deepDive: 'A common misconception is that JAR is only for libraries. In modern cloud-native architectures (Docker, Kubernetes, AWS), virtually all Spring Boot services are packaged as self-contained executable fat JARs (with embedded Tomcat) and launched with `java -jar app.jar`.',
    followUpTip: 'Clarify that WAR is only necessary when corporate policy requires deploying multiple apps into a single shared application server.',
    keywords: ['jar vs war', 'embedded tomcat', 'packaging', 'web-inf', 'manifest.mf', 'spring boot fat jar'],
  },

  {
    id: 'q-112-mvn-clean-package-importance',
    number: 112,
    languageId: 'java',
    topicId: 'java-maven-build-management',
    topicTitle: 'Maven — Build and Dependency Management',
    question: 'What does mvn clean package do and why is it preferred over running mvn package alone?',
    difficulty: 'Beginner',
    type: 'Conceptual',
    shortAnswer: [
      'mvn clean: Deletes the target/ directory, removing all previous compilation bytecode, test reports, and packaged archives.',
      'mvn package: Compiles src/main/java, runs tests in src/test/java, and packages the code into the configured artifact in target/.',
      'Why combined: Running mvn package alone may retain stale or deleted class files from previous builds, causing subtle bugs or outdated behavior.',
      'mvn clean package guarantees a fresh, deterministic, clean-room build from the current source code.',
    ],
    deepDive: 'If you rename or delete a Java class file, the old .class file remains in target/classes if you only run `mvn package`. Running `mvn clean package` ensures that target/ is completely removed first, eliminating orphan classes.',
    followUpTip: 'Always recommend running `mvn clean package` or `mvn clean test` before pushing commits to Git.',
    keywords: ['mvn clean package', 'stale classes', 'clean lifecycle', 'target directory', 'deterministic build'],
  },

  {
    id: 'q-113-where-is-build-output-stored',
    number: 113,
    languageId: 'java',
    topicId: 'java-maven-build-management',
    topicTitle: 'Maven — Build and Dependency Management',
    question: 'Where is Maven build output stored, and should it be committed to source control?',
    difficulty: 'Beginner',
    type: 'Conceptual',
    shortAnswer: [
      'All build output is generated in the `target/` directory located in the project root folder.',
      'It contains `classes/` (production bytecode), `test-classes/` (test bytecode), `surefire-reports/` (test logs), and the packaged JAR/WAR.',
      'NO, target/ should NEVER be committed to Git source control.',
      'Always add `target/` to the project\'s `.gitignore` file because it is completely ephemeral and can be regenerated at any time with `mvn package`.',
    ],
    deepDive: 'Committing compiled binaries to Git bloats repository size, creates merge conflicts on binary files, and undermines build reproducibility. Version control should store source code and configuration (pom.xml), never compiled artifacts.',
    followUpTip: 'Mention that running `mvn clean` permanently removes the target/ folder without touching source code.',
    keywords: ['target directory', '.gitignore', 'build output', 'ephemeral', 'classes', 'surefire-reports'],
  },

  {
    id: 'q-114-does-compile-create-jar',
    number: 114,
    languageId: 'java',
    topicId: 'java-maven-build-management',
    topicTitle: 'Maven — Build and Dependency Management',
    question: 'Does the mvn compile command generate the final JAR file?',
    difficulty: 'Beginner',
    type: 'Conceptual',
    shortAnswer: [
      'NO. mvn compile only compiles Java source code in src/main/java into bytecode (.class files) in target/classes/.',
      'It does NOT run unit tests (that happens in the test phase).',
      'It does NOT package the .class files into a JAR or WAR archive.',
      'To generate the final JAR/WAR, you must execute the package phase (or later): `mvn package`.',
    ],
    deepDive: 'This is one of the most common beginner interview traps. Remember the order: validate -> compile -> test -> package. Compilation converts .java to .class; packaging archives the .class files into a .jar.',
    followUpTip: 'A quick follow-up: "Does mvn test create a JAR?" Answer: No, mvn test stops after executing unit tests; packaging requires mvn package.',
    keywords: ['mvn compile', 'does not create jar', 'target/classes', 'mvn package', 'bytecode'],
  },

  {
    id: 'q-115-does-maven-generate-unit-tests',
    number: 115,
    languageId: 'java',
    topicId: 'java-maven-build-management',
    topicTitle: 'Maven — Build and Dependency Management',
    question: 'Does Maven automatically generate unit tests for your application code?',
    difficulty: 'Beginner',
    type: 'Conceptual',
    shortAnswer: [
      'NO. Maven does NOT generate unit test code or business assertions for you.',
      'Developers must write their own unit tests in src/test/java using testing frameworks like JUnit 5 or Mockito.',
      'Maven\'s responsibility is automation: it discovers test classes (matching *Test.java), executes them via maven-surefire-plugin, reports results, and fails the build if any test fails.',
    ],
    deepDive: 'Build tools handle workflow automation, not source code authoring. While archetypes might scaffold a sample test class like AppTest.java, creating comprehensive test suites for business services is strictly the developer\'s responsibility.',
    followUpTip: 'Highlight how maven-surefire-plugin integrates into CI/CD pipelines to prevent broken code from being deployed.',
    keywords: ['unit tests', 'surefire plugin', 'junit', 'build automation boundaries', 'test execution'],
  },

  {
    id: 'q-116-dependency-conflict-resolution',
    number: 116,
    languageId: 'java',
    topicId: 'java-maven-build-management',
    topicTitle: 'Maven — Build and Dependency Management',
    question: 'How does Maven resolve dependency version conflicts, and what is the "Nearest Wins" rule?',
    difficulty: 'Intermediate',
    type: 'Conceptual',
    shortAnswer: [
      'Maven resolves transitive dependency version conflicts using the "Nearest Wins" (dependency mediation) rule.',
      'The version chosen is the one closest to your project root in the dependency tree hierarchy.',
      'If project A -> B -> C 1.0, and A -> D -> E -> C 2.0, Maven chooses C 1.0 because it is 2 hops away, compared to 3 hops for C 2.0.',
      'If two versions are at the same depth, the first declared in pom.xml wins.',
      'To override this behavior, explicitly declare the desired version in your project\'s <dependencyManagement> or use <exclusions>.',
    ],
    deepDive: 'Because "Nearest Wins" is depth-based rather than semantic version-based, it can sometimes select an older version that lacks required methods. Running `mvn dependency:tree` reveals the conflicting paths, allowing developers to add an explicit dependency or exclusion tag to force the correct version.',
    codeSnippet: {
      language: 'xml',
      code: `<!-- Excluding an unwanted transitive dependency: -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
    <exclusions>
        <exclusion>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-tomcat</artifactId>
        </exclusion>
    </exclusions>
</dependency>`,
    },
    followUpTip: 'Explain that Gradle uses "Newest Wins" by default, whereas Maven uses "Nearest Wins".',
    keywords: ['nearest wins', 'dependency mediation', 'dependency conflict', 'exclusions', 'dependencyManagement'],
  },

  {
    id: 'q-117-ci-build-fails-local-passes-scenario',
    number: 117,
    languageId: 'java',
    topicId: 'java-maven-build-management',
    topicTitle: 'Maven — Build and Dependency Management',
    question: 'Scenario: A teammate\'s local build succeeds, but the CI/CD pipeline fails with a missing dependency error. What do you investigate?',
    difficulty: 'Advanced',
    type: 'Scenario-based',
    shortAnswer: [
      '1. Local-Only Dependency (mvn install): The teammate likely built another project locally using `mvn install`, placing the dependency into their local ~/.m2 cache without publishing it to the remote repository.',
      '2. Missing Remote Repository Authentication: The CI server may lack credentials or configuration in settings.xml to access the private enterprise repository (Nexus/Artifactory).',
      '3. Network / Firewall Restrictions: The CI runner may be blocked from reaching Maven Central or the corporate artifact server.',
      '4. Uncommitted pom.xml Changes: The teammate may have added a dependency in their local pom.xml or parent POM but forgot to commit and push the file to Git.',
      '5. Different JDK or Maven Versions: The CI runner might be running an older JDK or Maven version that does not support the project\'s compiler target.',
    ],
    deepDive: 'The "installed locally but never deployed" scenario is the single most common cause of this production issue. To reproduce the CI failure locally, run `mvn clean package -Dmaven.repo.local=/tmp/clean-repo` to simulate a completely fresh machine without the developer\'s local ~/.m2 cache.',
    codeSnippet: {
      language: 'bash',
      code: `# Test build with a clean isolated local repository cache:
mvn clean package -Dmaven.repo.local=/tmp/test-m2-cache`,
    },
    followUpTip: 'Always recommend checking ~/.m2/settings.xml and verifying whether the artifact was published via `mvn deploy`.',
    keywords: ['ci failure', 'missing dependency', 'mvn install trap', 'nexus authentication', 'settings.xml', 'clean repo test'],
  },

  {
    id: 'q-118-spring-boot-auto-configuration',
    number: 118,
    languageId: 'java',
    topicId: 'java-spring-boot-overview',
    topicTitle: 'Spring Boot Overview & Initializr Setup',
    question: 'How does Spring Boot Auto-Configuration work under the hood, and how does it differ from traditional Spring Framework XML/JavaConfig?',
    difficulty: 'Intermediate',
    type: 'Conceptual',
    shortAnswer: [
      'Spring Boot auto-configuration analyzes the runtime classpath (JARs present), existing bean definitions, and configured application properties to automatically instantiate and wire necessary beans.',
      'Enabled via @EnableAutoConfiguration (bundled inside @SpringBootApplication).',
      'Powered by conditional annotations such as @ConditionalOnClass, @ConditionalOnMissingBean, and @ConditionalOnProperty.',
      'In traditional Spring, developers had to manually write hundreds of lines of XML or @Configuration boilerplate for ViewResolvers, DataSource, and DispatcherServlet.',
    ],
    deepDive: 'In Spring Boot 3+, auto-configurations are registered via META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports rather than legacy spring.factories. Custom user beans always take precedence over auto-configured beans because of @ConditionalOnMissingBean.',
    codeSnippet: {
      language: 'java',
      code: `@Configuration(proxyBeanMethods = false)
@ConditionalOnClass(DataSource.class)
@ConditionalOnMissingBean(DataSource.class)
public class DataSourceAutoConfiguration {
    @Bean
    public DataSource dataSource() { ... }
}`,
    },
    followUpTip: 'Highlight that custom user beans ALWAYS take precedence over auto-configured beans because of @ConditionalOnMissingBean.',
    keywords: ['auto-configuration', '@conditionalonmissingbean', '@conditionalonclass', 'spring.factories', 'autoconfigure', 'spring boot vs spring'],
  },

  {
    id: 'q-119-spring-request-response-lifecycle',
    number: 119,
    languageId: 'java',
    topicId: 'java-spring-boot-overview',
    topicTitle: 'Spring Boot Overview & Initializr Setup',
    question: 'Walk through the 13-step lifecycle of an HTTP request reaching a Spring Boot REST application from the browser to the response.',
    difficulty: 'Advanced',
    type: 'Conceptual',
    shortAnswer: [
      '1-4: Browser initiates DNS lookup -> TCP/TLS handshake -> HTTP request dispatched across network wire -> Received by Embedded Tomcat Connector thread pool.',
      '5-7: Request passes through Servlet Filters (Security/CORS) -> Reaches DispatcherServlet front controller -> HandlerMapping matches URI to controller method.',
      '8-10: HandlerAdapter binds parameters -> Invokes @RestController method -> Method delegates business logic to @Service and Spring Data @Repository.',
      '11-13: Controller returns Java DTO -> HttpMessageConverter (Jackson) serializes to JSON -> HttpServletResponse streams headers and JSON bytes back across TCP to the browser.',
    ],
    deepDive: 'The DispatcherServlet coordinates the entire pipeline using the Front Controller architectural pattern. If an exception occurs at any point, HandlerExceptionResolver intercepts it and maps it to an @ExceptionHandler response.',
    followUpTip: 'Emphasize that servlet filters execute BEFORE the DispatcherServlet, whereas interceptors execute inside the Spring MVC context.',
    keywords: ['request lifecycle', 'dispatcherservlet', 'handlermapping', 'handleradapter', 'httpmessageconverter', 'embedded tomcat', 'front controller'],
  },

  {
    id: 'q-120-gradle-vs-maven-architecture',
    number: 120,
    languageId: 'java',
    topicId: 'java-gradle-build-tool',
    topicTitle: 'Gradle — Modern Build Tool & Groovy DSL',
    question: 'What are the architectural differences between Gradle and Maven, and why is Gradle significantly faster?',
    difficulty: 'Intermediate',
    type: 'Conceptual',
    shortAnswer: [
      '1. Build Model: Maven uses a rigid, linear lifecycle (validate -> compile -> test -> package) with declarative XML. Gradle uses a Directed Acyclic Graph (DAG) of tasks with expressive Groovy/Kotlin DSL.',
      '2. Gradle Daemon: A background JVM process that keeps compiler caches and JIT optimizations warm between builds.',
      '3. Incremental Builds & Build Cache: Gradle tracks input/output checksums per task and marks unchanged tasks as UP-TO-DATE or pulls from remote cache.',
      '4. Dependency Conflict Strategy: Gradle uses "Newest Wins" by default; Maven uses "Nearest Wins" (tree depth).',
    ],
    deepDive: 'Gradle\'s compile avoidance feature ensures that if class A changes private method implementation without altering its ABI (public signature), downstream dependent classes B and C are NOT recompiled.',
    followUpTip: 'Mention the Gradle wrapper (./gradlew) as standard practice to ensure identical builds across local and CI environments without pre-installing Gradle.',
    keywords: ['gradle vs maven', 'directed acyclic graph', 'gradle daemon', 'incremental build', 'compile avoidance', 'groovy dsl'],
  },

  {
    id: 'q-121-junit5-architecture-and-lifecycle',
    number: 121,
    languageId: 'java',
    topicId: 'java-junit5-testing',
    topicTitle: 'Unit Testing with JUnit 5 (Jupiter)',
    question: 'Explain JUnit 5\'s three-tier architecture (Platform, Jupiter, Vintage) and default test instance lifecycle.',
    difficulty: 'Intermediate',
    type: 'Conceptual',
    shortAnswer: [
      '1. JUnit Platform: Foundation for launching testing frameworks on the JVM, providing TestEngine API for IDEs and build tools.',
      '2. JUnit Jupiter: Modern programming and extension model containing @Test, new assertions, and Jupiter TestEngine.',
      '3. JUnit Vintage: TestEngine backward-compatibility layer executing JUnit 3 and JUnit 4 legacy tests.',
      'Default Lifecycle: @TestInstance(Lifecycle.PER_METHOD). JUnit creates a fresh instance of the test class for EVERY @Test method to ensure complete test isolation and prevent side-effect leakage.',
    ],
    deepDive: 'If you need to share state across tests (e.g., expensive database container initializations), you can annotate the class with @TestInstance(Lifecycle.PER_CLASS), allowing non-static @BeforeAll methods.',
    followUpTip: 'Highlight that JUnit 5 @Test methods and classes do NOT need to be public (package-private is preferred).',
    keywords: ['junit 5 architecture', 'junit platform', 'junit jupiter', 'junit vintage', 'per_method', 'per_class', 'test isolation'],
  },

  {
    id: 'q-122-time-vs-space-complexity',
    number: 122,
    languageId: 'java',
    topicId: 'java-dsa-big-o-complexity',
    topicTitle: 'Big-O Notation & Complexity Analysis',
    question: 'What is the difference between Time Complexity, Total Space Complexity, and Auxiliary Space Complexity?',
    difficulty: 'Beginner',
    type: 'Conceptual',
    shortAnswer: [
      'Time Complexity: Quantifies how algorithm execution time grows asymptotically as input size n approaches infinity.',
      'Total Space Complexity: Total memory consumed by the program, including input data, compiler call stack, and newly allocated structures.',
      'Auxiliary Space Complexity: EXTRA or temporary memory allocated exclusively by the algorithm during execution, EXCLUDING the input space.',
      'In-place algorithms (like In-Place QuickSort or BubbleSort) have O(1) auxiliary space even though they process an O(n) input array.',
    ],
    deepDive: 'When interviewers ask for "space complexity", they almost always mean auxiliary space. In recursive algorithms, compiler call stack frames DO count toward auxiliary space (e.g., O(log n) for balanced tree recursion).',
    followUpTip: 'Cite Big-O (upper bound), Big-Omega (lower bound), and Big-Theta (tight bound).',
    keywords: ['time complexity', 'space complexity', 'auxiliary space', 'in-place', 'asymptotic analysis', 'call stack space'],
  },

  {
    id: 'q-123-binary-search-overflow-trap',
    number: 123,
    languageId: 'java',
    topicId: 'java-dsa-searching-algorithms',
    topicTitle: 'Searching Algorithms: Linear vs Binary Search',
    question: 'Why does int mid = (low + high) / 2 fail in Binary Search for large arrays, and what is the mathematical fix?',
    difficulty: 'Intermediate',
    type: 'Conceptual',
    shortAnswer: [
      'When low + high exceeds Integer.MAX_VALUE (2,147,483,647), 32-bit signed integer addition overflows and wraps around into a negative number.',
      'Dividing a negative number by 2 produces a negative mid index, causing ArrayIndexOutOfBoundsException.',
      'Fix 1: int mid = low + (high - low) / 2; (mathematically identical, avoids overflow).',
      'Fix 2: Bitwise unsigned right shift: int mid = (low + high) >>> 1;.',
    ],
    deepDive: 'This famous bug existed in Java\'s standard java.util.Arrays.binarySearch implementation for over 9 years until Joshua Bloch fixed it in 2006.',
    followUpTip: 'Mention that binary search requires a sorted array and operates in O(log n) time.',
    keywords: ['binary search', 'integer overflow', 'midpoint calculation', 'joshua bloch', 'arrayindexoutofboundsexception', 'low + (high - low) / 2'],
  },

  {
    id: 'q-124-sorting-stability',
    number: 124,
    languageId: 'java',
    topicId: 'java-dsa-sorting-algorithms',
    topicTitle: 'Sorting Algorithms: Elementary to Advanced',
    question: 'What does "algorithm stability" mean in sorting, and which standard algorithms are stable vs unstable?',
    difficulty: 'Intermediate',
    type: 'Conceptual',
    shortAnswer: [
      'A sorting algorithm is STABLE if it preserves the original relative order of elements that have equal keys.',
      'Stable Algorithms: Merge Sort, Insertion Sort, Bubble Sort, TimSort.',
      'Unstable Algorithms: Quick Sort, Heap Sort, Selection Sort.',
      'Why it matters: In multi-level sorting (e.g., sort users by First Name, then sort by Last Name), a stable sort preserves the previous first-name ordering for identical last names.',
    ],
    deepDive: 'Java\'s standard library uses TimSort (stable, adaptive O(n log n)) for Arrays.sort(Object[]) because stability is desirable for domain objects, but uses Dual-Pivot Quicksort (unstable, O(n log n)) for Arrays.sort(primitive[]) because primitive values have no secondary attributes.',
    followUpTip: 'Explain why Selection Sort is unstable: swapping the minimum element to the front can jump over an identical element earlier in the array.',
    keywords: ['stability', 'stable sorting', 'merge sort', 'quick sort', 'timsort', 'arrays.sort'],
  },

  {
    id: 'q-125-array-vs-linkedlist-cache-locality',
    number: 125,
    languageId: 'java',
    topicId: 'java-dsa-linked-lists',
    topicTitle: 'Linked Lists: Singly, Doubly, and Circular',
    question: 'Why is Array traversal drastically faster than LinkedList traversal in modern CPUs despite both having O(n) algorithmic time complexity?',
    difficulty: 'Intermediate',
    type: 'Conceptual',
    shortAnswer: [
      '1. CPU Cache Locality: Array elements are stored in contiguous physical memory addresses. Modern CPUs prefetch contiguous memory lines into L1/L2 caches ahead of time.',
      '2. LinkedList Pointer Chasing: LinkedList nodes are scattered randomly across the heap memory. Each traversal step requires dereferencing node.next, causing frequent CPU cache misses.',
      '3. Memory Overhead: Each LinkedList node requires 24-32 bytes of JVM object header and reference overhead in addition to the data payload.',
      '4. Arrays allow O(1) random index access; LinkedList requires O(n) linear pointer stepping.',
    ],
    deepDive: 'On modern hardware, memory latency dominates CPU execution time. A CPU cache miss costs up to 200 CPU cycles waiting for RAM, making contiguous array iteration 5x to 10x faster than linked node iteration in practice.',
    followUpTip: 'Conclude that ArrayList should almost always be chosen over LinkedList, even when inserting/deleting elements, unless list sizes are huge and deletions are strictly at the head.',
    keywords: ['cache locality', 'contiguous memory', 'pointer chasing', 'l1/l2 cache', 'cpu prefetching', 'array vs linkedlist'],
  },

  {
    id: 'q-126-stack-queue-arraydeque-over-legacy-stack',
    number: 126,
    languageId: 'java',
    topicId: 'java-dsa-stacks',
    topicTitle: 'Stacks: LIFO Principle & Applications',
    question: 'Why does the Java official documentation recommend ArrayDeque over java.util.Stack for implementing LIFO stacks?',
    difficulty: 'Intermediate',
    type: 'Conceptual',
    shortAnswer: [
      '1. Unnecessary Synchronization Overhead: java.util.Stack extends legacy java.util.Vector, where every method (push, pop, peek) is synchronized, causing massive lock contention overhead in single-threaded contexts.',
      '2. Broken Encapsulation: Because Stack extends Vector, it inherits index-based operations like insertElementAt(item, 5) or remove(0), violating the fundamental LIFO abstraction contract.',
      '3. ArrayDeque Performance: ArrayDeque is backed by a circular resizable array without synchronization, offering superior cache locality, lower memory footprint, and faster operations.',
    ],
    deepDive: 'The Deque interface (ArrayDeque implementation) provides explicit stack methods: push(e), pop(), and peek(). When thread safety is needed, concurrent structures like ConcurrentLinkedDeque or explicit locks should be used instead of legacy Vector/Stack.',
    followUpTip: 'Mention common applications: Stack for DFS, backtrack, call stack, undo operations; Queue for BFS, request buffers, rate limiters.',
    keywords: ['arraydeque', 'java.util.stack', 'vector synchronization', 'broken encapsulation', 'lifo', 'deque interface'],
  },

  {
    id: 'q-127-bst-worst-case-and-balancing',
    number: 127,
    languageId: 'java',
    topicId: 'java-dsa-trees-and-bst',
    topicTitle: 'Trees & Binary Search Trees (BST)',
    question: 'When does a Binary Search Tree (BST) degrade to O(n) worst-case time complexity, and how do self-balancing trees prevent this?',
    difficulty: 'Intermediate',
    type: 'Conceptual',
    shortAnswer: [
      'Degradation: When elements are inserted in already sorted (or reverse-sorted) order (e.g., 10, 20, 30, 40, 50), each new node is added as a single child, turning the tree into a skewed linear linked list with height h = n.',
      'In a skewed BST, search, insert, and delete operations degrade from average O(log n) to worst-case O(n).',
      'Self-Balancing Trees: AVL Trees and Red-Black Trees maintain tree height at h = O(log n) using tree rotations (Left Rotation, Right Rotation) upon insertions and deletions.',
      'Java Standard Library: Java\'s TreeMap and TreeSet are backed by Red-Black Trees, guaranteeing strict O(log n) time complexity.',
    ],
    deepDive: 'In an AVL tree, the balance factor (height(left) - height(right)) cannot exceed 1. In a Red-Black tree, nodes are colored Red or Black with invariants ensuring that no path from root to leaf is more than twice as long as any other path, balancing rebalancing cost against lookup speed.',
    followUpTip: 'Remember that an in-order traversal on any valid BST always yields elements in ascending sorted order.',
    keywords: ['bst degradation', 'skewed tree', 'o(n) worst-case', 'self-balancing', 'red-black tree', 'avl tree', 'rotations', 'treemap'],
  },
];




