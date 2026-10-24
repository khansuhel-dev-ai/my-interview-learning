import { Topic } from '../../types';

export const OOP_TOPICS: Topic[] = [
{
    id: 'java-003-classes-objects',
    codeNumber: 'JAVA-003',
    languageId: 'java',
    title: 'Classes, Objects & The 4 OOP Pillars',
    slug: 'classes-objects-oop-pillars',
    category: 'Object-Oriented Programming',
    subcategory: 'Core OOP',
    summary: 'Discover how classes act as blueprints for runtime objects and dive deep into the 4 pillars: Encapsulation, Inheritance, Polymorphism, and Abstraction.',
    order: 8,
    estimatedMinutes: 14,
    learningObjectives: [
      'Define the precise relationship between a Class and an Object.',
      'Model real-world entities using state (fields) and behavior (methods).',
      'Explain and demonstrate each of the 4 OOP pillars with clean Java code.',
      'Implement encapsulation with private fields, getters, and validated setters.',
    ],
    whyItMatters: 'Object-Oriented Programming is the foundational architecture of enterprise Java. Mastering OOP enables scalable, modular systems like payment gateways, order processors, and user registries.',
    sections: [
      {
        id: 'class-vs-object',
        title: 'Class vs Object: The Blueprint & The House',
        content: 'A Class is a user-defined template or blueprint that defines what data fields and methods its instances will have. An Object is a concrete, tangible instance created from that class residing in heap memory with its own distinct state.',
        bullets: [
          'Class: Declared once in code; defines structure and logic.',
          'Object: Instantiated via "new" keyword multiple times; each has independent field values.',
        ],
        snippet: {
          language: 'java',
          filename: 'ProductDemo.java',
          code: `class Product {
    String name;
    int stock;

    void display() {
        System.out.println(name + ": " + stock);
    }
}

public class ProductDemo {
    public static void main(String[] args) {
        Product p = new Product();
        p.name = "Football Jersey";
        p.stock = 10;
        p.display();
    }
}`,
          output: 'Football Jersey: 10',
        },
      },
      {
        id: 'four-pillars',
        title: 'The Four Pillars of Object-Oriented Programming',
        content: 'Every robust Java system is engineered on four pillars:',
        bullets: [
          '1. Encapsulation: Bundles data (fields) and methods operating on that data within a class while restricting direct external access to prevent corrupted states.',
          '2. Inheritance: Allows a child subclass to inherit accessible fields and methods from a parent superclass, promoting code reuse and establishing an IS-A relationship.',
          '3. Polymorphism: "Many forms". Allows one interface or method name to execute different behaviors depending on whether compile-time overloading or runtime overriding is active.',
          '4. Abstraction: Hiding internal implementation complexities while exposing only the necessary operational interface (using abstract classes or interfaces).',
        ],
      },
      {
        id: 'encapsulation-example',
        title: 'Pillar 1: Encapsulation in Action',
        content: 'Keep fields private and enforce business constraints inside public setters:',
        snippet: {
          language: 'java',
          filename: 'EncapsulatedProduct.java',
          code: `class SecureProduct {
    private String name;
    private int stock;

    public void setStock(int stock) {
        if (stock >= 0) {
            this.stock = stock;
        } else {
            System.out.println("Invalid stock quantity: cannot be negative");
        }
    }

    public int getStock() {
        return stock;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}`,
          explanation: 'Direct field manipulation (e.g. p.stock = -50) is blocked by the compiler. Business invariants are safeguarded.',
        },
      },
      {
        id: 'abstraction-example',
        title: 'Pillar 4: Abstraction with Interfaces',
        content: 'A Payment interface specifies the contract without dictating how individual gateways work:',
        snippet: {
          language: 'java',
          filename: 'PaymentSystem.java',
          code: `interface Payment {
    void pay(double amount);
}

class UpiPayment implements Payment {
    @Override
    public void pay(double amount) {
        System.out.println("Processing UPI payment of $" + amount);
    }
}

class CardPayment implements Payment {
    @Override
    public void pay(double amount) {
        System.out.println("Charging Credit Card $" + amount);
    }
}

public class PaymentSystem {
    public static void main(String[] args) {
        Payment method = new UpiPayment();
        method.pay(49.99); // Processing UPI payment of $49.99
    }
}`,
          output: 'Processing UPI payment of $49.99',
        },
      },
    ],
    commonMistakes: [
      {
        mistake: 'Leaving fields public in production classes',
        fix: 'Always mark fields private and expose getters/setters with validation to maintain encapsulation.',
      },
      {
        mistake: 'Confusing a class definition with an instantiated object',
        fix: 'A class does not allocate object memory until you invoke "new ClassName()".',
      },
    ],
    keyTakeaways: [
      'Class is the blueprint; Object is the instance created in heap memory.',
      'Encapsulation hides internal state and validates data mutations.',
      'Inheritance shares behavior; Polymorphism varies behavior; Abstraction simplifies the interface.',
    ],
    relatedTopicIds: ['java-007-constructors', 'java-010-inheritance-chaining', 'java-012-polymorphism-dispatch'],
    exerciseIds: ['ex-010-oop-practice'],
    interviewQuestionIds: ['q-008-class-vs-object', 'q-009-four-pillars', 'q-010-inheritance'],
    keywords: ['oop', 'class', 'object', 'encapsulation', 'inheritance', 'polymorphism', 'abstraction', 'getter', 'setter', 'interface'],
  },

{
    id: 'java-007-constructors',
    codeNumber: 'JAVA-007',
    languageId: 'java',
    title: 'Constructors & Constructor Overloading',
    slug: 'constructors-and-overloading',
    category: 'Object-Oriented Programming',
    subcategory: 'Core OOP',
    summary: 'Discover how constructors initialize object state, the default no-argument constructor rule, constructor overloading, and chaining via this().',
    order: 9,
    estimatedMinutes: 11,
    learningObjectives: [
      'Define the syntax rules of Java constructors (same name as class, no return type).',
      'Explain when the compiler auto-generates a default constructor and when it stops.',
      'Overload constructors with varying parameter signatures.',
      'Chain constructors within the same class using this(...) as the first statement.',
    ],
    whyItMatters: 'Constructors guarantee that objects never enter an uninitialized, invalid, or corrupt state. Mastering constructor chaining keeps code DRY (Don\'t Repeat Yourself).',
    sections: [
      {
        id: 'constructor-basics',
        title: 'What is a Constructor?',
        content: 'A constructor is a special block of code that initializes a newly created object. It has the exact same name as the class and has NO return type (not even void).',
        bullets: [
          'If NO constructor is written, the Java compiler automatically inserts a default no-argument constructor.',
          'If you define ANY constructor (e.g. parameterized), Java suppresses the automatic default constructor.',
          'Constructors can be overloaded, but cannot be overridden because they are not inherited by subclasses.',
        ],
      },
      {
        id: 'constructor-chaining',
        title: 'Constructor Overloading & Chaining with this()',
        content: 'Use this(...) to call another constructor within the same class. This prevents duplicate initialization logic:',
        snippet: {
          language: 'java',
          filename: 'ProductConstructor.java',
          code: `class Product {
    String name;
    int stock;

    // No-arg constructor chains to parameterized constructor
    Product() {
        this("Unknown", 0); // Must be the FIRST statement!
    }

    // Parameterized constructor
    Product(String name, int stock) {
        this.name = name;
        this.stock = stock;
    }

    void display() {
        System.out.println("Product: " + name + " | Stock: " + stock);
    }
}

public class ProductConstructor {
    public static void main(String[] args) {
        Product p1 = new Product();
        Product p2 = new Product("Running Shoes", 45);

        p1.display();
        p2.display();
    }
}`,
          output: `Product: Unknown | Stock: 0
Product: Running Shoes | Stock: 45`,
          explanation: 'Notice this.name disambiguates the instance field from the method parameter. this("Unknown", 0) invokes the 2-argument constructor.',
        },
        callout: {
          type: 'warning',
          title: 'Rule: this() Must Be the First Statement',
          text: 'In standard constructor syntax, calling this(...) or super(...) must always be the very first line of executable code inside the constructor body.',
        },
      },
    ],
    commonMistakes: [
      {
        mistake: 'Adding a return type like void Product()',
        fix: 'If you add a return type, Java treats it as a standard method, not a constructor. The compiler will still expect a constructor.',
      },
      {
        mistake: 'Assuming new Product() works after writing a custom Product(String name)',
        fix: 'Once you define any constructor, the compiler removes the default no-arg constructor. If you still need new Product(), define Product() explicitly.',
      },
    ],
    keyTakeaways: [
      'Constructors initialize object state and have no return type.',
      'Explicit constructors suppress the default no-arg constructor.',
      'this(...) calls another constructor in the same class and must be the first statement.',
      'Constructors cannot be overridden.',
    ],
    relatedTopicIds: ['java-003-classes-objects', 'java-010-inheritance-chaining'],
    exerciseIds: ['ex-008-constructor-chaining', 'ex-010-oop-practice'],
    interviewQuestionIds: ['q-012-constructor-chaining', 'q-013-this-vs-super', 'q-026-override-constructors'],
    keywords: ['constructors', 'overloading', 'this', 'chaining', 'default constructor', 'parameterized constructor'],
  },

{
    id: 'java-010-inheritance-chaining',
    codeNumber: 'JAVA-010',
    languageId: 'java',
    title: 'Inheritance & Constructor Chaining with super()',
    slug: 'inheritance-and-constructor-chaining',
    category: 'Object-Oriented Programming',
    subcategory: 'Core OOP',
    summary: 'Master inheritance using extends, observe parent-child constructor execution order, and leverage implicit and explicit super() calls.',
    order: 10,
    estimatedMinutes: 12,
    learningObjectives: [
      'Implement class inheritance using the extends keyword.',
      'Predict the exact execution order of superclass and subclass constructors.',
      'Use super() and super(arguments) to invoke specific parent constructors.',
      'Differentiate this() (same class) from super() (parent class).',
    ],
    whyItMatters: 'Understanding constructor chaining prevents initialization bugs where child state attempts to use uninitialized parent state.',
    sections: [
      {
        id: 'inheritance-concept',
        title: 'Inheritance Mechanics with extends',
        content: 'Inheritance enables a subclass to inherit accessible fields and methods from a superclass, modeling an "IS-A" hierarchy. In Java, constructor methods are NOT inherited by subclasses.',
      },
      {
        id: 'chaining-execution',
        title: 'Default Constructor Chaining Order',
        content: 'When an instance of a child class is constructed, Java ALWAYS executes a parent constructor first before executing the child constructor body. If not explicitly specified, Java implicitly inserts super() on the first line:',
        snippet: {
          language: 'java',
          filename: 'InheritanceChainingDemo.java',
          code: `class A {
    A() {
        System.out.println("A default");
    }

    A(int x) {
        System.out.println("A parameterized: " + x);
    }
}

class B extends A {
    B() {
        // Implicitly calls super() -> A()
        System.out.println("B default");
    }

    B(int x) {
        // If no super(...) call is written, super() is invoked automatically!
        System.out.println("B parameterized: " + x);
    }
}

public class InheritanceChainingDemo {
    public static void main(String[] args) {
        new B(10);
    }
}`,
          output: `A default
B parameterized: 10`,
          explanation: 'Even though we called new B(10), because class B did not explicitly call super(x), the Java compiler inserted an implicit super(), which triggered A\'s default constructor first!',
        },
      },
      {
        id: 'explicit-super',
        title: 'Explicit Parameterized super(x) Call',
        content: 'To invoke the parent\'s parameterized constructor instead, write super(x) as the first statement in the child constructor:',
        snippet: {
          language: 'java',
          filename: 'ExplicitSuperDemo.java',
          code: `class BExplicit extends A {
    BExplicit(int x) {
        super(x); // Explicit call to parent parameterized constructor
        System.out.println("B parameterized: " + x);
    }
}

public class ExplicitSuperDemo {
    public static void main(String[] args) {
        new BExplicit(10);
    }
}`,
          output: `A parameterized: 10
B parameterized: 10`,
        },
      },
    ],
    commonMistakes: [
      {
        mistake: 'Putting code before super(...) in a constructor',
        fix: 'super() or this() must be the very first statement inside a constructor.',
      },
      {
        mistake: 'Believing child classes inherit parent constructors',
        fix: 'Constructors are not members and are not inherited. A child class must declare its own constructors or use the default one.',
      },
    ],
    keyTakeaways: [
      'Subclass extends superclass.',
      'Parent constructor always executes before the child constructor body.',
      'Java automatically injects super() if no explicit super(...) or this(...) is written.',
      'Use super(args) to call parent parameterized constructors.',
    ],
    relatedTopicIds: ['java-003-classes-objects', 'java-007-constructors', 'java-011-inheritance-types'],
    exerciseIds: ['ex-008-constructor-chaining'],
    interviewQuestionIds: ['q-010-inheritance', 'q-012-constructor-chaining', 'q-013-this-vs-super'],
    keywords: ['inheritance', 'extends', 'super', 'constructor chaining', 'subclass', 'superclass'],
  },

{
    id: 'java-011-inheritance-types',
    codeNumber: 'JAVA-011',
    languageId: 'java',
    title: 'Inheritance Types & Why Java Avoids Multiple Inheritance with Classes',
    slug: 'inheritance-types-and-multiple-inheritance',
    category: 'Object-Oriented Programming',
    subcategory: 'Core OOP',
    summary: 'Examine Single, Multilevel, and Hierarchical inheritance, and understand why Java bans multiple class inheritance to prevent Diamond Problem ambiguities.',
    order: 11,
    estimatedMinutes: 9,
    learningObjectives: [
      'Distinguish Single, Multilevel, and Hierarchical class inheritance.',
      'Explain the "Diamond Problem" of multiple inheritance with classes.',
      'Understand how Java achieves multiple inheritance of type through interfaces.',
    ],
    whyItMatters: 'Designing inheritance trees cleanly prevents brittle base-class problems and tight coupling. Multiple inheritance through classes is a notorious source of bugs in languages like C++.',
    sections: [
      {
        id: 'inheritance-categories',
        title: 'Supported Class Inheritance Types',
        content: 'Java supports three primary forms of class inheritance:',
        bullets: [
          'Single Inheritance: One subclass extends exactly one superclass (e.g., class Dog extends Animal).',
          'Multilevel Inheritance: A chain of inheritance (e.g., class Puppy extends Dog extends Animal).',
          'Hierarchical Inheritance: Multiple distinct subclasses extend one common superclass (e.g., class Dog extends Animal and class Cat extends Animal).',
        ],
      },
      {
        id: 'diamond-problem',
        title: 'Why Doesn\'t Java Support Multiple Inheritance with Classes?',
        content: 'Consider the classic "Diamond Problem": Suppose Class B and Class C both extend Class A and override a method display(). If Class D were allowed to extend BOTH B and C simultaneously (class D extends B, C), which display() method should D inherit?',
        bullets: [
          'Should it execute B\'s version or C\'s version?',
          'How should conflicting instance variable states be resolved?',
          'Java solves this ambiguity by forbidding a class from extending more than one class.',
        ],
        callout: {
          type: 'interview',
          title: 'Multiple Inheritance via Interfaces',
          text: 'Java allows a class to implement MULTIPLE interfaces (e.g. class PaymentService implements Loggable, Auditable, Serializable). Interfaces define contracts without conflicting class instance state.',
        },
      },
    ],
    commonMistakes: [
      {
        mistake: 'Trying to write: class Child extends Parent1, Parent2',
        fix: 'Java will fail compilation. Extend one parent class and implement additional interfaces: class Child extends Parent1 implements InterfaceA, InterfaceB.',
      },
    ],
    keyTakeaways: [
      'Java supports Single, Multilevel, and Hierarchical class inheritance.',
      'Java disallows multiple class inheritance to avoid the Diamond Problem.',
      'A class can implement unlimited interfaces.',
    ],
    relatedTopicIds: ['java-010-inheritance-chaining', 'java-012-polymorphism-dispatch'],
    exerciseIds: ['ex-008-constructor-chaining'],
    interviewQuestionIds: ['q-011-multiple-inheritance'],
    keywords: ['single inheritance', 'multilevel', 'hierarchical', 'multiple inheritance', 'diamond problem', 'interfaces'],
  },

{
    id: 'java-012-polymorphism-dispatch',
    codeNumber: 'JAVA-012',
    languageId: 'java',
    title: 'Method Overloading, Overriding & Dynamic Dispatch',
    slug: 'overloading-overriding-dynamic-dispatch',
    category: 'Object-Oriented Programming',
    subcategory: 'Core OOP',
    summary: 'Compare compile-time polymorphism (overloading) with runtime polymorphism (overriding). Understand Dynamic Method Dispatch and method hiding.',
    order: 12,
    estimatedMinutes: 13,
    learningObjectives: [
      'Define method overloading rules (parameter list differences; return type alone is invalid).',
      'Define method overriding rules with the @Override annotation.',
      'Trace Dynamic Method Dispatch at runtime based on the actual object instance.',
      'Differentiate method overriding from static method hiding and private method scope.',
    ],
    whyItMatters: 'Dynamic dispatch enables clean architecture: write code against abstract contracts or parent references, and the JVM automatically invokes the correct subclass logic at runtime.',
    sections: [
      {
        id: 'overloading',
        title: 'Method Overloading: Compile-Time (Static) Polymorphism',
        content: 'Method Overloading occurs when methods in the same class share the exact same name but have different parameter lists (different number of parameters, different types, or different ordering). The compiler determines which method to invoke at compile time.',
        snippet: {
          language: 'java',
          filename: 'Calculator.java',
          code: `class Calculator {
    int add(int a, int b) {
        return a + b;
    }

    int add(int a, int b, int c) {
        return a + b + c;
    }

    double add(double a, double b) {
        return a + b;
    }
}

public class OverloadingDemo {
    public static void main(String[] args) {
        Calculator calc = new Calculator();
        System.out.println(calc.add(5, 10));       // 15
        System.out.println(calc.add(5, 10, 20));   // 35
        System.out.println(calc.add(2.5, 4.5));    // 7.0
    }
}`,
          output: `15
35
7.0`,
        },
        callout: {
          type: 'warning',
          title: 'Return Type Alone Is Not Enough!',
          text: 'Changing only the return type (e.g. double add(int a, int b)) is NOT a valid overload and will fail compilation.',
        },
      },
      {
        id: 'overriding-and-dispatch',
        title: 'Method Overriding & Dynamic Method Dispatch: Runtime Polymorphism',
        content: 'Method Overriding occurs when a subclass provides a specific implementation of an instance method already declared in its superclass. Dynamic Method Dispatch is the mechanism where a call to an overridden method is resolved at runtime based on the actual object being pointed to, rather than the reference type:',
        snippet: {
          language: 'java',
          filename: 'NotificationDemo.java',
          code: `class Notification {
    void send() {
        System.out.println("Generic notification");
    }
}

class EmailNotification extends Notification {
    @Override
    void send() {
        System.out.println("Sending email");
    }
}

public class NotificationDemo {
    public static void main(String[] args) {
        // Parent reference pointing to child object
        Notification n = new EmailNotification();
        n.send(); // Dynamic Method Dispatch executes EmailNotification's send()
    }
}`,
          output: 'Sending email',
          explanation: 'At compile time, javac checks if Notification has a send() method. At runtime, the JVM inspects the actual heap object (EmailNotification) and executes its overridden implementation.',
        },
      },
      {
        id: 'hiding-vs-overriding',
        title: 'Method Hiding vs Overriding',
        content: 'Can static methods be overridden? No. Static methods are bound at compile time based on the reference type. If a subclass declares a static method with the same signature, it HIDES the parent method, rather than overriding it.',
        bullets: [
          'Instance methods: Overridden (polymorphic dynamic dispatch).',
          'Static methods: Hidden (resolved by reference type at compile time).',
          'Private methods: Cannot be overridden because they are not visible outside their declaring class.',
        ],
      },
    ],
    commonMistakes: [
      {
        mistake: 'Thinking static methods can be polymorphically overridden',
        fix: 'Static methods belong to the class, not instances. They are hidden, not overridden.',
      },
      {
        mistake: 'Trying to overload by changing only the return type',
        fix: 'Method signatures consist of method name + parameter types. Return type is not part of the signature.',
      },
    ],
    keyTakeaways: [
      'Overloading = Same name, different parameters, resolved at compile-time.',
      'Overriding = Same signature in subclass, resolved at runtime.',
      'Dynamic Method Dispatch selects the method based on the actual Heap object.',
      'Static methods cannot be overridden; they are hidden.',
    ],
    relatedTopicIds: ['java-003-classes-objects', 'java-008-static-members', 'java-010-inheritance-chaining'],
    exerciseIds: ['ex-007-method-overloading'],
    interviewQuestionIds: ['q-014-overloading', 'q-015-overriding', 'q-016-dynamic-dispatch', 'q-017-compile-vs-runtime-polymorphism'],
    keywords: ['overloading', 'overriding', 'dynamic method dispatch', 'polymorphism', 'method hiding', '@override'],
  },

{
    id: 'java-014-access-modifiers',
    codeNumber: 'JAVA-014',
    languageId: 'java',
    title: 'Access Modifiers: The Complete 4x4 Matrix',
    slug: 'access-modifiers-matrix',
    category: 'Object-Oriented Programming',
    subcategory: 'Encapsulation & Access',
    summary: 'Master the 4 Java access levels: private, default (package-private), protected, and public across all package and subclass contexts.',
    order: 13,
    estimatedMinutes: 11,
    learningObjectives: [
      'Memorize and apply the 4x4 access modifier visibility matrix.',
      'Understand default (package-private) accessibility.',
      'Explain protected access rules including cross-package subclass references.',
      'Determine permitted access modifiers for top-level classes vs nested classes.',
    ],
    whyItMatters: 'Proper access modifiers are the primary defense against illegal state modifications and leaky API abstractions in Java libraries.',
    sections: [
      {
        id: 'matrix-table',
        title: 'The 4x4 Access Modifier Visibility Matrix',
        content: 'Java defines four access levels (three explicit keywords plus default/package-private):',
        bullets: [
          'private: Visible ONLY within the declared class.',
          'Default (no keyword): Visible within the declared class and any other class in the SAME package.',
          'protected: Visible within the same package, plus subclasses in DIFFERENT packages (via inheritance).',
          'public: Visible everywhere across all packages.',
        ],
      },
      {
        id: 'matrix-breakdown',
        title: 'Visual Comparison Matrix',
        content: `
| Access Modifier | Same Class | Same Package (Other Class) | Subclass (Diff Package) | Non-Subclass (Diff Package) |
|---|:---:|:---:|:---:|:---:|
| **private** | **Yes** | No | No | No |
| **Default (package-private)** | **Yes** | **Yes** | No | No |
| **protected** | **Yes** | **Yes** | **Yes** (subclass rules) | No |
| **public** | **Yes** | **Yes** | **Yes** | **Yes** |
`,
      },
      {
        id: 'top-level-rules',
        title: 'Top-Level Class vs Member Access Rules',
        content: 'A top-level class (declared directly in a file) can ONLY be public or package-private (default). It CANNOT be private or protected. Nested/inner classes, however, can use all four access modifiers.',
      },
    ],
    commonMistakes: [
      {
        mistake: 'Trying to declare a top-level class as private class Product',
        fix: 'Top-level classes cannot be private or protected. Only nested inner classes can be private.',
      },
      {
        mistake: 'Confusing default with protected',
        fix: 'Default has NO access outside the package. Protected grants access to subclasses in other packages.',
      },
    ],
    keyTakeaways: [
      'Private: same class only.',
      'Default: same package.',
      'Protected: same package + subclasses in other packages.',
      'Public: everywhere.',
      'Top-level classes can only be public or default.',
    ],
    relatedTopicIds: ['java-003-classes-objects', 'java-013-packages', 'java-017-public-classes'],
    exerciseIds: ['ex-010-oop-practice'],
    interviewQuestionIds: ['q-018-access-modifiers'],
    keywords: ['access modifiers', 'private', 'default', 'package-private', 'protected', 'public', 'encapsulation'],
  },

{
    id: 'java-013-packages',
    codeNumber: 'JAVA-013',
    languageId: 'java',
    title: 'Packages, Directory Structures & Imports',
    slug: 'packages-and-imports',
    category: 'Object-Oriented Programming',
    subcategory: 'Architecture',
    summary: 'Organize code into modular namespaces, understand the package declaration, multi-file compilation commands, and wildcard import rules.',
    order: 14,
    estimatedMinutes: 9,
    learningObjectives: [
      'Organize classes into packages to avoid naming collisions and control access.',
      'Compile multi-package projects using javac -d out.',
      'Run packaged classes using java -cp out package.Main.',
      'Understand wildcard imports (java.util.* does not import subpackages).',
    ],
    whyItMatters: 'Large enterprise projects contain thousands of classes. Packages keep source code maintainable, provide clean module separation, and govern package-private access.',
    sections: [
      {
        id: 'package-concept',
        title: 'What is a Package?',
        content: 'A package in Java is a namespace that groups related classes, interfaces, and subpackages. Package declarations must always be the very first non-comment line in a .java file.',
        snippet: {
          language: 'java',
          filename: 'src/models/Product.java',
          code: `package models;

public class Product {
    public void display() {
        System.out.println("Product details from models package");
    }
}`,
        },
      },
      {
        id: 'using-packages',
        title: 'Importing & Executing Across Packages',
        content: 'In your application entry point, import the package:',
        snippet: {
          language: 'java',
          filename: 'src/app/Main.java',
          code: `package app;

import models.Product;

public class Main {
    public static void main(String[] args) {
        Product p = new Product();
        p.display();
    }
}`,
          output: 'Product details from models package',
        },
      },
      {
        id: 'compilation-commands',
        title: 'Compiling & Running Packaged Code via CLI',
        content: 'Use the -d flag to specify destination directory and -cp (classpath) to run:',
        snippet: {
          language: 'bash',
          filename: 'Terminal',
          code: `# Compile classes into the 'out' directory
javac -d out src/models/Product.java src/app/Main.java

# Run the application specifying classpath and fully qualified class name
java -cp out app.Main`,
          output: 'Product details from models package',
        },
      },
      {
        id: 'wildcard-rules',
        title: 'Wildcard Import Rules',
        content: '`import java.util.*;` imports all public classes declared directly inside `java.util` (such as ArrayList, Scanner). However, it does NOT import subpackages like `java.util.concurrent.*` or `java.util.regex.*`. Subpackages must be imported explicitly.',
        callout: {
          type: 'note',
          title: 'java.lang Is Automatically Imported',
          text: 'Types in java.lang (like System, String, Math, Object, Integer) are implicitly imported into every Java source file.',
        },
      },
    ],
    commonMistakes: [
      {
        mistake: 'Putting package declaration after import statements',
        fix: 'package declaration must be the very first statement in a Java source file.',
      },
      {
        mistake: 'Expecting import java.util.* to import java.util.concurrent.ConcurrentHashMap',
        fix: 'Wildcard imports only import classes directly in that package, not subpackages.',
      },
    ],
    keyTakeaways: [
      'Packages group related classes and prevent naming collisions.',
      'javac -d out compiles into proper package folder hierarchies.',
      'Wildcards do not import subpackages.',
      'java.lang package is imported automatically.',
    ],
    relatedTopicIds: ['java-001-jvm-jdk', 'java-014-access-modifiers', 'java-017-public-classes'],
    exerciseIds: [],
    interviewQuestionIds: ['q-024-packages'],
    keywords: ['package', 'import', 'classpath', 'javac -d', 'java -cp', 'namespace', 'java.lang'],
  },

{
    id: 'java-017-public-classes',
    codeNumber: 'JAVA-017',
    languageId: 'java',
    title: 'Public Classes & Java Source File Rules',
    slug: 'public-classes-and-source-files',
    category: 'Object-Oriented Programming',
    subcategory: 'Compilation Rules',
    summary: 'Learn the strict Java file naming rules: why at most one top-level class can be public in a file, and how nested classes differ.',
    order: 15,
    estimatedMinutes: 8,
    learningObjectives: [
      'Master the rule: at most one public top-level class per .java file.',
      'Verify that the public class name must match the filename exactly.',
      'Include multiple package-private top-level classes in a single file.',
      'Understand how nested classes differ from top-level classes.',
    ],
    whyItMatters: 'Violating file naming constraints causes immediate compilation failures. Knowing these rules allows clean multi-class helper files.',
    sections: [
      {
        id: 'file-naming-rules',
        title: 'The Core Source File Rules',
        content: 'Under standard file-based Java compilation:',
        bullets: [
          'At most ONE top-level class per .java file can be declared public.',
          'If a top-level class is public, the filename MUST match the class name exactly (case-sensitive) with the .java extension.',
          'A source file can contain multiple package-private (default) top-level classes.',
          'If a file has NO public top-level classes, the filename does not need to match any class name.',
        ],
        snippet: {
          language: 'java',
          filename: 'ECommerceApp.java',
          code: `// File name MUST be ECommerceApp.java because ECommerceApp is public
public class ECommerceApp {
    public static void main(String[] args) {
        Helper helper = new Helper();
        helper.assist();
    }
}

// Package-private class (allowed in the same file)
class Helper {
    void assist() {
        System.out.println("Helper class assisting ECommerceApp");
    }
}`,
          output: 'Helper class assisting ECommerceApp',
        },
      },
    ],
    commonMistakes: [
      {
        mistake: 'Putting two public classes in one file: public class A {} public class B {}',
        fix: 'Java will reject this. Split them into A.java and B.java, or make one package-private.',
      },
    ],
    keyTakeaways: [
      'At most one public top-level class per .java file.',
      'Public class name must match the filename.',
      'Multiple package-private top-level classes can share one file.',
    ],
    relatedTopicIds: ['java-001-jvm-jdk', 'java-013-packages', 'java-014-access-modifiers'],
    exerciseIds: ['ex-001-hello-world'],
    interviewQuestionIds: ['q-027-multiple-public-classes'],
    keywords: ['source file', 'public class', 'file naming', 'compilation rules', 'package-private'],
  },

{
    id: 'java-008-static-members',
    codeNumber: 'JAVA-008',
    languageId: 'java',
    title: 'Static Variables, Methods & Static Initialization Blocks',
    slug: 'static-variables-methods-and-blocks',
    category: 'Object-Oriented Programming',
    subcategory: 'Language Keywords',
    summary: 'Understand class-level static members, static methods vs instance methods, and static initialization blocks that execute upon class loading.',
    order: 16,
    estimatedMinutes: 10,
    learningObjectives: [
      'Distinguish static (class-level) members from instance-level members.',
      'Understand why static methods cannot access this or instance variables directly.',
      'Implement static utility methods and shared class constants.',
      'Identify when static initialization blocks run in the class lifecycle.',
    ],
    whyItMatters: 'Using static improperly can cause multi-threaded race conditions or memory leaks in shared application containers. Mastering static ensures clean utility classes and thread-safe configs.',
    sections: [
      {
        id: 'static-variables',
        title: 'Static Variables & Methods',
        content: 'The static keyword indicates that a member belongs to the class itself, rather than to any specific instance of that class. There is only one copy of a static variable in memory regardless of how many objects are instantiated.',
        snippet: {
          language: 'java',
          filename: 'StaticDemo.java',
          code: `class Product {
    static String category = "Sports"; // Shared across all products
    String name;                       // Specific to each product
}

class Calculator {
    static int add(int a, int b) {
        return a + b;
    }
}

public class StaticDemo {
    public static void main(String[] args) {
        // Access static members directly via Class Name
        System.out.println("Category: " + Product.category);
        System.out.println("Sum: " + Calculator.add(10, 20));
    }
}`,
          output: `Category: Sports
Sum: 30`,
        },
      },
      {
        id: 'static-rules',
        title: 'Crucial Rules for Static Methods',
        content: 'Why can\'t static methods access instance variables directly?',
        bullets: [
          'A static method has no implicit "this" reference because it is called on the class, not an object.',
          'To access instance fields inside a static method, you must explicitly create or pass an object instance.',
          'Static methods can directly access other static methods and static variables.',
        ],
      },
      {
        id: 'static-block',
        title: 'Static Initialization Blocks',
        content: 'A static block executes once when the class is first loaded and initialized by the JVM class loader, before any constructors run:',
        snippet: {
          language: 'java',
          filename: 'AppConfigDemo.java',
          code: `class AppConfig {
    static String environment;

    // Static initialization block
    static {
        environment = "Development";
        System.out.println("AppConfig static block executed (Class initialized)");
    }

    AppConfig() {
        System.out.println("AppConfig constructor executed");
    }
}

public class AppConfigDemo {
    public static void main(String[] args) {
        System.out.println("Main method started");
        System.out.println("Environment: " + AppConfig.environment);
        new AppConfig();
        new AppConfig();
    }
}`,
          output: `Main method started
AppConfig static block executed (Class initialized)
Environment: Development
AppConfig constructor executed
AppConfig constructor executed`,
          explanation: 'Notice the static block ran only ONCE when AppConfig was loaded, while the constructor ran each time a new object was created.',
        },
      },
    ],
    commonMistakes: [
      {
        mistake: 'Trying to use this.someField inside a static method',
        fix: 'Static context has no this reference. Access instance members via an instantiated object reference.',
      },
      {
        mistake: 'Thinking static blocks run every time an object is constructed',
        fix: 'Static blocks run once per class loader during class initialization; constructors run for every object.',
      },
    ],
    keyTakeaways: [
      'Static members belong to the class, not instances.',
      'Access static members using ClassName.member.',
      'Static methods cannot access this or instance fields directly.',
      'Static blocks execute once when the class is initialized.',
    ],
    relatedTopicIds: ['java-003-classes-objects', 'java-009-class-forname', 'java-012-polymorphism-dispatch'],
    exerciseIds: ['ex-007-method-overloading'],
    interviewQuestionIds: ['q-020-static-vs-instance', 'q-021-static-access-instance'],
    keywords: ['static', 'class variable', 'static method', 'static block', 'initialization', 'metaspace'],
  },

{
    id: 'java-009-class-forname',
    codeNumber: 'JAVA-009',
    languageId: 'java',
    title: 'Class.forName() & Dynamic Class Loading',
    slug: 'class-forname-dynamic-loading',
    category: 'Object-Oriented Programming',
    subcategory: 'Reflection & JVM Internals',
    summary: 'Learn how Class.forName() dynamically loads and initializes classes at runtime, historically used for JDBC drivers and plugin architectures.',
    order: 17,
    estimatedMinutes: 8,
    learningObjectives: [
      'Understand how dynamic class loading works via Class.forName().',
      'Explain the difference between class loading and class initialization.',
      'Relate Class.forName() to JDBC driver registration and static blocks.',
      'Recognize ordinary JVM class loading triggers.',
    ],
    whyItMatters: 'Dynamic class loading is the foundation of dependency injection frameworks (like Spring), JDBC drivers, and plugin architectures where class names are loaded from configuration files.',
    sections: [
      {
        id: 'dynamic-loading',
        title: 'Dynamic Loading with Class.forName()',
        content: 'Ordinarily, the JVM loads classes lazily when referenced in code (such as creating an instance or invoking a static method). `Class.forName(String className)` allows programmatic loading of a class by its fully qualified string name at runtime.',
        snippet: {
          language: 'java',
          filename: 'DynamicLoadingDemo.java',
          code: `public class DynamicLoadingDemo {
    public static void main(String[] args) {
        try {
            // Loads and initializes the class dynamically
            Class<?> clazz = Class.forName("com.mysql.cj.jdbc.Driver");
            System.out.println("Loaded class: " + clazz.getName());
        } catch (ClassNotFoundException e) {
            System.out.println("Driver class not found on classpath: " + e.getMessage());
        }
    }
}`,
        },
      },
      {
        id: 'jdbc-connection',
        title: 'Why Was Class.forName() Common in JDBC?',
        content: 'In older JDBC patterns (prior to JDBC 4.0 SPI ServiceLoader auto-registration), calling Class.forName("com.mysql.jdbc.Driver") loaded the driver class. The driver\'s static initialization block automatically executed and registered the driver with DriverManager.registerDriver(new Driver()).',
        callout: {
          type: 'note',
          title: 'Class Loading vs Object Construction',
          text: 'Classes are NOT loaded only when objects are created. Calling a static method, accessing a static field, or calling Class.forName() loads and initializes the class without instantiating any object.',
        },
      },
    ],
    commonMistakes: [
      {
        mistake: 'Passing a simple class name like "Driver" instead of fully qualified name',
        fix: 'Class.forName() requires the full package path, e.g. "com.mysql.cj.jdbc.Driver".',
      },
      {
        mistake: 'Assuming Class.forName creates an object instance',
        fix: 'It loads the Class object and runs static initializers. To create an instance, you would need reflection clazz.getDeclaredConstructor().newInstance().',
      },
    ],
    keyTakeaways: [
      'Class.forName() dynamically loads and initializes a class by name.',
      'Triggers execution of static initialization blocks.',
      'Historically famous for JDBC driver registration.',
    ],
    relatedTopicIds: ['java-008-static-members', 'java-013-packages'],
    exerciseIds: [],
    interviewQuestionIds: ['q-028-class-forname'],
    keywords: ['class.forname', 'reflection', 'classloader', 'jdbc', 'dynamic loading', 'initialization'],
  },

{
    id: 'java-015-final-keyword',
    codeNumber: 'JAVA-015',
    languageId: 'java',
    title: 'The final Keyword: Variables, Methods & Classes',
    slug: 'the-final-keyword',
    category: 'Object-Oriented Programming',
    subcategory: 'Language Keywords',
    summary: 'Learn what final means when applied to variables, references, methods, and classes, including mutable objects with final references.',
    order: 18,
    estimatedMinutes: 9,
    learningObjectives: [
      'Apply final to variables (constants) and object references.',
      'Explain why a final reference does NOT make an object immutable.',
      'Use final methods to prevent overriding.',
      'Use final classes to prevent inheritance (e.g., java.lang.String).',
    ],
    whyItMatters: 'Immutability and safety in multi-threaded programming depend heavily on final variables. The final keyword also aids JVM JIT compiler inlining optimizations.',
    sections: [
      {
        id: 'final-three-levels',
        title: 'The Three Applications of final',
        content: 'The final keyword in Java can be applied in three distinct contexts:',
        bullets: [
          '1. Final Variable: Value cannot be reassigned once initialized. Acts as a constant (e.g. final double PI = 3.14159;).',
          '2. Final Method: Cannot be overridden by any subclass.',
          '3. Final Class: Cannot be extended/subclassed by any class (e.g. java.lang.String, java.lang.Integer).',
        ],
      },
      {
        id: 'final-references',
        title: 'Can a final Object Be Modified? (Critical Interview Question)',
        content: 'YES! Marking an object reference as final means the variable cannot be reassigned to point to another object. However, the internal fields/state of the referenced object CAN still be mutated if the object is mutable:',
        snippet: {
          language: 'java',
          filename: 'FinalReferenceDemo.java',
          code: `class Item {
    int stock = 10;
}

public class FinalReferenceDemo {
    public static void main(String[] args) {
        final Item item = new Item();

        // VALID: Internal state can be modified!
        item.stock = 25;
        System.out.println("Modified stock: " + item.stock); // 25

        // COMPILE ERROR: Cannot reassign final reference variable!
        // item = new Item(); // Error: cannot assign a value to final variable item
    }
}`,
          output: 'Modified stock: 25',
        },
      },
    ],
    commonMistakes: [
      {
        mistake: 'Believing final list = new ArrayList() prevents adding items',
        fix: 'The list reference is final (cannot reassign list = otherList), but elements can freely be added or removed.',
      },
    ],
    keyTakeaways: [
      'Final variable: Cannot be reassigned.',
      'Final reference: Pointer is fixed, but internal object state remains mutable.',
      'Final method: Prevents subclass overriding.',
      'Final class: Prevents subclass inheritance.',
    ],
    relatedTopicIds: ['java-006-strings', 'java-012-polymorphism-dispatch'],
    exerciseIds: [],
    interviewQuestionIds: ['q-019-final-keyword'],
    keywords: ['final', 'constants', 'final method', 'final class', 'immutability', 'final reference'],
  },

{
    id: 'java-016-object-tostring',
    codeNumber: 'JAVA-016',
    languageId: 'java',
    title: 'The Object Class & Overriding toString()',
    slug: 'object-class-and-tostring',
    category: 'Object-Oriented Programming',
    subcategory: 'Core OOP',
    summary: 'Examine java.lang.Object as the root of the Java class hierarchy, default toString() behavior, and custom string representations.',
    order: 19,
    estimatedMinutes: 9,
    learningObjectives: [
      'Recognize java.lang.Object as the universal superclass of all Java classes.',
      'Identify key Object methods: toString(), equals(), hashCode(), and getClass().',
      'Explain what the default Object.toString() output represents.',
      'Override toString() to provide meaningful debug and log output.',
    ],
    whyItMatters: 'Whenever an object is printed with System.out.println() or logged, Java calls its toString() method. Overriding toString() makes debugging fast and readable.',
    sections: [
      {
        id: 'object-root',
        title: 'java.lang.Object: The Root of All Classes',
        content: 'Every class in Java directly or indirectly inherits from java.lang.Object. If a class does not explicitly extend another superclass, the Java compiler automatically makes it extend Object.',
      },
      {
        id: 'tostring-override',
        title: 'Overriding toString() for Meaningful Output',
        content: 'The default implementation of toString() in Object returns getClass().getName() + "@" + Integer.toHexString(hashCode()). Overriding it provides descriptive details:',
        snippet: {
          language: 'java',
          filename: 'StudentDemo.java',
          code: `class Student {
    String name;
    int age;

    Student(String name, int age) {
        this.name = name;
        this.age = age;
    }

    @Override
    public String toString() {
        return "Student[name=" + name + ", age=" + age + "]";
    }
}

public class StudentDemo {
    public static void main(String[] args) {
        Student s1 = new Student("John", 20);
        Student s2 = new Student("Alice", 22);

        // System.out.println automatically invokes toString()
        System.out.println(s1);
        System.out.println(s2);
    }
}`,
          output: `Student[name=John, age=20]
Student[name=Alice, age=22]`,
        },
      },
      {
        id: 'hashcode-clarification',
        title: 'Is the Default Hash Code an Exact Memory Address?',
        content: 'No. While often derived from internal memory representations in some JVM implementations, the hex suffix produced by default toString() is a hash code, not an inspectable raw physical RAM memory address.',
      },
    ],
    commonMistakes: [
      {
        mistake: 'Thinking printing an object outputs a memory address',
        fix: 'Default output is ClassName@hexHashCode, which is an identity hash code, not a physical pointer address.',
      },
    ],
    keyTakeaways: [
      'Object is the parent of every class.',
      'System.out.println(obj) automatically triggers obj.toString().',
      'Override toString() to output readable diagnostic details.',
    ],
    relatedTopicIds: ['java-003-classes-objects', 'java-006-strings'],
    exerciseIds: ['ex-010-oop-practice'],
    interviewQuestionIds: ['q-025-override-tostring'],
    keywords: ['object', 'tostring', 'equals', 'hashcode', 'superclass', 'root class'],
  },

{
    id: 'java-interface-types',
    codeNumber: 'JAVA-029',
    languageId: 'java',
    title: 'Types of Interfaces: Normal, Functional & Marker',
    slug: 'types-of-interfaces',
    category: 'Object-Oriented Programming',
    subcategory: 'Abstraction',
    summary: 'Explore the 3 conceptual categories of Java interfaces: Normal (multiple methods), Functional / SAM (single abstract method for lambdas), and Marker interfaces (tagging without methods).',
    order: 20,
    estimatedMinutes: 11,
    learningObjectives: [
      'Categorize interfaces into Normal, Functional (SAM), and Marker interfaces.',
      'Write and implement normal interfaces with multiple abstract contracts.',
      'Identify Functional Interfaces and relate them to lambda expressions.',
      'Explain Marker Interfaces like Serializable and Cloneable and how JVM engines check them.',
      'Compare all 3 interface types in an accessible reference table.',
    ],
    whyItMatters: 'Interface classification is one of the most frequently tested topics in technical interviews. Understanding SAM interfaces unlocks modern functional Java (Lambdas and Streams).',
    sections: [
      {
        id: 'interface-categories-overview',
        title: 'The Three Conceptual Interface Categories',
        content: 'In Java, an interface is a reference type that defines a contract. In learning and software architecture, interfaces are commonly classified into three primary design categories based on their abstract method count:',
        bullets: [
          '1. Normal Interface: Declares multiple abstract operations (e.g. 2 or more methods).',
          '2. Functional Interface (SAM): Declares EXACTLY ONE abstract method; serves as the target for Lambda expressions.',
          '3. Marker Interface: Declares ZERO methods; used to tag or mark a class for runtime treatment.',
        ],
      },
      {
        id: 'interface-normal',
        title: '1. Normal Interface (Multiple Methods)',
        content: 'A normal interface represents a multi-operation capability contract. Implementing classes must implement all abstract methods:',
        snippet: {
          language: 'java',
          filename: 'SmartDeviceDemo.java',
          code: `interface SmartDevice {
    void turnOn();
    void turnOff();
    void showStatus();
}

class SmartLight implements SmartDevice {
    private boolean on;

    public void turnOn() {
        on = true;
        System.out.println("Light is on");
    }

    public void turnOff() {
        on = false;
        System.out.println("Light is off");
    }

    public void showStatus() {
        System.out.println(on ? "ON" : "OFF");
    }
}

public class SmartDeviceDemo {
    public static void main(String[] args) {
        SmartDevice device = new SmartLight();
        device.turnOn();
        device.showStatus();
        device.turnOff();
    }
}`,
          output: `Light is on
ON
Light is off`,
        },
      },
      {
        id: 'interface-functional',
        title: '2. Functional Interface (SAM — Single Abstract Method)',
        content: 'A Functional Interface has exactly one abstract method. Because it has only one method, the compiler can unambiguously bind it to a concise lambda expression:',
        snippet: {
          language: 'java',
          filename: 'FunctionalInterfaceDemo.java',
          code: `@FunctionalInterface
interface Test {
    void show(int a, int b);
}

public class FunctionalInterfaceDemo {
    public static void main(String[] args) {
        // Implemented concisely with a Lambda expression!
        Test test = (a, b) -> System.out.println("Sum: " + (a + b));

        test.show(1, 2);
    }
}`,
          output: 'Sum: 3',
          explanation: 'The lambda (a, b) -> ... provides the implementation for the single abstract method show(int a, int b). Note that functional interfaces CAN contain default methods and static methods; only the count of abstract methods must be exactly one.',
        },
      },
      {
        id: 'interface-marker',
        title: '3. Marker Interface (Tagging with Zero Methods)',
        content: 'A Marker Interface (also known as a tagging interface) contains zero fields and zero methods. Implementing it signals to the JVM or an API that the class is eligible for special runtime treatment:',
        bullets: [
          'Serializable: Signals that the JVM ObjectOutputStream is allowed to serialize objects of this class.',
          'Cloneable: Signals that Object.clone() may make a field-by-field copy without throwing CloneNotSupportedException.',
          'Remote (RMI): Signals that methods can be invoked from a non-local virtual machine.',
        ],
        snippet: {
          language: 'java',
          filename: 'MarkerDemo.java',
          code: `import java.io.Serializable;

// Marker interface implementation: no methods to override!
class Student implements Serializable {
    private static final long serialVersionUID = 1L;
    String name;

    Student(String name) {
        this.name = name;
    }
}`,
          explanation: 'Notice that Student does not have to implement any methods from Serializable because Serializable is empty. The JVM checks if (obj instanceof Serializable) before allowing file serialization.',
        },
      },
      {
        id: 'interface-comparison-table',
        title: 'Comprehensive Interface Comparison Chart',
        content: 'A quick side-by-side summary of the 3 interface categories:',
        table: {
          headers: ['Category', 'Abstract Methods', 'Primary Purpose', 'Can Use Lambdas?', 'Classic Java Examples'],
          rows: [
            ['Normal', 'Usually 2 or more', 'Define multi-method contracts', 'No', 'List, SmartDevice, Map'],
            ['Functional (SAM)', 'Exactly 1', 'Lambda expression / method reference target', 'YES (Core Purpose)', 'Runnable, Callable, Comparator, Test'],
            ['Marker', '0 (Empty)', 'Mark/tag a class for JVM or framework processing', 'No (No method to invoke)', 'Serializable, Cloneable, Remote'],
          ],
        },
      },
    ],
    commonMistakes: [
      {
        mistake: 'Assuming a marker interface provides bytecode methods automatically',
        fix: 'Marker interfaces are completely empty. An external processor checks (obj instanceof Marker) to decide behavior.',
      },
      {
        mistake: 'Thinking default or static methods prevent an interface from being functional',
        fix: 'A functional interface can have unlimited default or static methods, provided it has exactly ONE abstract method.',
      },
    ],
    keyTakeaways: [
      'Normal: 2+ abstract methods for multi-step contracts.',
      'Functional (SAM): Exactly 1 abstract method, target for lambda expressions.',
      'Marker: 0 methods, used as a type tag (e.g. Serializable, Cloneable).',
    ],
    relatedTopicIds: ['java-003-classes-objects', 'java-011-inheritance-types', 'java-lambda-expressions', 'java-serialization'],
    exerciseIds: ['ex-013-functional-calc'],
    interviewQuestionIds: ['q-042-functional-interface-sam', 'q-043-marker-interface', 'q-039-functional-interface-check'],
    keywords: ['interfaces', 'normal interface', 'functional interface', 'sam', 'marker interface', 'serializable', 'cloneable', 'lambda'],
  },

{
    id: 'java-anonymous-classes',
    codeNumber: 'JAVA-031',
    languageId: 'java',
    title: 'Anonymous Classes in Java',
    slug: 'anonymous-classes',
    category: 'Object-Oriented Programming',
    subcategory: 'Nested Classes',
    summary: 'Declare and instantiate classes in a single expression without giving them a name. Compare anonymous subclasses, interface implementations, and lambdas.',
    order: 21,
    estimatedMinutes: 10,
    learningObjectives: [
      'Define what an anonymous inner class is in Java.',
      'Extend a class anonymously and override its methods.',
      'Implement an interface anonymously without writing a standalone class.',
      'Compare Anonymous Classes vs Lambda Expressions across scope, this pointer, and capabilities.',
      'Know when to choose a lambda vs an anonymous class.',
    ],
    whyItMatters: 'Anonymous classes enable quick local overrides and multi-method customizations without cluttering your codebase with dozens of one-time class files.',
    sections: [
      {
        id: 'anonymous-definition',
        title: 'What is an Anonymous Class?',
        content: 'An anonymous class is an inner class without a name. It is declared and instantiated at the same time in a single expression using the "new" operator. Anonymous classes can either extend an existing concrete or abstract class, or implement an interface.',
      },
      {
        id: 'anonymous-subclass',
        title: 'Example 1: Anonymous Subclass',
        content: 'Overriding a method of a class on the fly:',
        snippet: {
          language: 'java',
          filename: 'AnonymousSubclassDemo.java',
          code: `class Greeting {
    void sayHello() {
        System.out.println("Hello");
    }
}

public class AnonymousSubclassDemo {
    public static void main(String[] args) {
        // Declaring and instantiating an anonymous subclass of Greeting
        Greeting greeting = new Greeting() {
            @Override
            void sayHello() {
                System.out.println("Hello from an anonymous class");
            }
        };

        greeting.sayHello();
    }
}`,
          output: 'Hello from an anonymous class',
        },
      },
      {
        id: 'anonymous-interface',
        title: 'Example 2: Anonymous Interface Implementation',
        content: 'Implementing an interface without declaring a formal named class:',
        snippet: {
          language: 'java',
          filename: 'AnonymousInterfaceDemo.java',
          code: `interface Task {
    void run();
}

public class AnonymousInterfaceDemo {
    public static void main(String[] args) {
        Task task = new Task() {
            @Override
            public void run() {
                System.out.println("Task is running");
            }
        };

        task.run();
    }
}`,
          output: 'Task is running',
        },
      },
      {
        id: 'anonymous-vs-lambda-table',
        title: 'Detailed Comparison: Anonymous Class vs Lambda',
        content: 'Understanding when each tool is appropriate:',
        table: {
          headers: ['Feature', 'Anonymous Inner Class', 'Lambda Expression'],
          rows: [
            ['Target', 'Can extend a class (concrete/abstract) OR implement any interface', 'Can ONLY implement a Functional Interface (SAM)'],
            ['Number of Methods', 'Can implement multiple methods and add custom fields', 'Implements exactly one method'],
            ['"this" Keyword Reference', '"this" refers to the anonymous class instance itself', '"this" refers to the enclosing outer class instance'],
            ['Syntax Verbosity', 'More verbose (boilerplate class declaration)', 'Extremely concise (arrow syntax)'],
            ['Bytecode Generation', 'Creates an extra .class file (e.g. Demo$1.class)', 'Uses invokedynamic bytecode; no separate .class file'],
          ],
        },
      },
      {
        id: 'anonymous-when-to-use',
        title: 'Decision Guide: Which Should You Use?',
        content: 'Follow this simple rule of thumb:',
        bullets: [
          'Choose a Lambda: Whenever you need to implement a single functional method (e.g. Runnable, Comparator, callbacks).',
          'Choose an Anonymous Class: Whenever you need to override multiple methods, extend an abstract/concrete class, or declare custom instance fields with internal "this" references.',
        ],
      },
    ],
    commonMistakes: [
      {
        mistake: 'Using "this" in a lambda expecting it to refer to the lambda',
        fix: 'In a lambda, "this" refers to the enclosing outer class. In an anonymous class, "this" refers to the anonymous class instance.',
      },
      {
        mistake: 'Using an anonymous class for a single-method functional interface',
        fix: 'A lambda is cleaner, shorter, and avoids generating an extra .class file.',
      },
    ],
    keyTakeaways: [
      'Anonymous classes are instantiated and declared in a single expression without a name.',
      'Can extend a class or implement an interface with multiple methods.',
      'Lambdas are preferred for single-method functional interfaces.',
    ],
    relatedTopicIds: ['java-interface-types', 'java-lambda-expressions'],
    exerciseIds: ['ex-014-anonymous-greeting'],
    interviewQuestionIds: ['q-046-anonymous-class-vs-lambda'],
    keywords: ['anonymous class', 'anonymous inner class', 'lambda vs anonymous', 'nested classes', 'this reference'],
  },

{
    id: 'java-lambda-expressions',
    codeNumber: 'JAVA-030',
    languageId: 'java',
    title: 'Lambda Expressions in Java',
    slug: 'lambda-expressions',
    category: 'Object-Oriented Programming',
    subcategory: 'Functional Programming',
    summary: 'Write concise, expressive Java code using lambda expressions. Implement Single Abstract Method (SAM) functional interfaces for callbacks, sorting, and event handling.',
    order: 22,
    estimatedMinutes: 11,
    learningObjectives: [
      'Understand lambda syntax: (params) -> expression vs (params) -> { statements }.',
      'Explain why lambdas require a functional interface target type.',
      'Implement multi-statement lambdas and pass arguments.',
      'Use lambdas for in-place sorting of collections (List.sort with Comparator).',
      'Contrast lambdas with traditional anonymous inner classes.',
    ],
    whyItMatters: 'Introduced in Java 8, lambda expressions brought functional programming to Java. They eliminate verbose anonymous inner classes and power the modern Java Stream API.',
    sections: [
      {
        id: 'lambda-definition',
        title: 'What is a Lambda Expression?',
        content: 'A lambda expression is an anonymous function—a block of code that accepts parameters and returns a value without needing a class name or method identifier. In Java, lambda expressions are used to provide the inline implementation of the single abstract method of a Functional Interface.',
        bullets: [
          'Single expression syntax: (parameters) -> expression',
          'Block body syntax: (parameters) -> { statements; }',
          'Parameter types can be inferred automatically by the compiler.',
          'Parentheses can be omitted if there is exactly one parameter without explicit type: x -> x * 2.',
        ],
      },
      {
        id: 'lambda-demo',
        title: 'Multi-Statement Lambda Example',
        content: 'When a lambda performs multiple statements, wrap the body in curly braces:',
        snippet: {
          language: 'java',
          filename: 'HelloLambda.java',
          code: `@FunctionalInterface
interface Test {
    void show(int a, int b);
}

public class HelloLambda {
    public static void main(String[] args) {
        Test test = (a, b) -> {
            System.out.println("First value: " + a);
            System.out.println("Second value: " + b);
            System.out.println("Sum: " + (a + b));
        };

        test.show(1, 2);
    }
}`,
          output: `First value: 1
Second value: 2
Sum: 3`,
          explanation: '(a, b) defines the parameters. The arrow "->" separates parameters from the execution block. The block implements show(int a, int b).',
        },
      },
      {
        id: 'lambda-sorting',
        title: 'Practical Real-World Example: Collections Sorting',
        content: 'Before lambdas, sorting a list required an entire verbose Comparator anonymous class. With lambdas, it is a single readable line:',
        snippet: {
          language: 'java',
          filename: 'SortingDemo.java',
          code: `import java.util.Arrays;
import java.util.List;

public class SortingDemo {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("Suhel", "Aman", "Zoya");

        // Single-line lambda implementing Comparator<String>
        names.sort((first, second) -> first.compareTo(second));

        System.out.println(names);
    }
}`,
          output: '[Aman, Suhel, Zoya]',
        },
      },
      {
        id: 'lambda-target-type',
        title: 'Target Type Requirement',
        content: 'A lambda expression cannot exist in a vacuum; Java is strongly typed. Every lambda must have a "Target Type" that is a Functional Interface. You cannot assign a lambda to an Object or an abstract class directly.',
        callout: {
          type: 'note',
          title: 'When to Use Lambdas',
          text: 'Use lambdas for short, self-contained behavior passed into methods. If your lambda spans more than 5-8 lines, consider extracting it to a named private helper method or class for readability.',
        },
      },
    ],
    commonMistakes: [
      {
        mistake: 'Trying to assign a lambda to an abstract class: AbstractClass a = () -> {};',
        fix: 'Lambdas require a functional interface, not an abstract class.',
      },
      {
        mistake: 'Modifying a non-final local variable inside a lambda',
        fix: 'Local variables referenced inside a lambda must be final or effectively final.',
      },
    ],
    keyTakeaways: [
      'Lambdas provide concise inline implementations for functional interfaces (SAM).',
      'Syntax: (parameters) -> expression or (parameters) -> { statements }.',
      'Heavily used for collections sorting, threads, and streams.',
    ],
    relatedTopicIds: ['java-interface-types', 'java-anonymous-classes'],
    exerciseIds: ['ex-013-functional-calc'],
    interviewQuestionIds: ['q-044-lambda-concept', 'q-045-lambda-target-type', 'q-046-anonymous-class-vs-lambda'],
    keywords: ['lambda', 'lambda expression', 'functional interface', 'sam', 'arrow operator', 'sorting', 'comparator'],
  },

{
    id: 'java-enum',
    codeNumber: 'JAVA-027',
    languageId: 'java',
    title: 'Enums in Java',
    slug: 'enums-in-java',
    category: 'Object-Oriented Programming',
    subcategory: 'Special Types',
    summary: 'Master Java enums: type-safe sets of named constants. Explore values(), valueOf(), ordinal(), the array representation caveat, and switch routing.',
    order: 23,
    estimatedMinutes: 11,
    learningObjectives: [
      'Define an enum to represent a fixed set of constants.',
      'Explain why enums are superior to arbitrary String or integer constants.',
      'Iterate over all enum constants using the static values() method.',
      'Explain the [LStatus;@... array identity representation when printing arrays directly.',
      'Use enums in switch statements for clean state management.',
      'Understand methods: name(), ordinal(), and valueOf(), and why ordinal() should not be used as a database ID.',
    ],
    whyItMatters: 'Using raw strings for statuses (like "shipped" vs "SHIPPED") introduces silent runtime bugs and typos. Enums provide compile-time safety, autocompletion, and can bundle business logic.',
    sections: [
      {
        id: 'enum-definition',
        title: 'What is an Enum in Java?',
        content: 'An enum (short for enumeration) is a special Java data type that represents a fixed group of named constants. Common examples include order status, payment status, user roles, delivery states, and days of the week. Enums make code safer and clearer than arbitrary strings because the compiler guarantees that a variable of an enum type can only hold one of its predefined constants.',
        bullets: [
          'Declared using the "enum" keyword instead of "class".',
          'Enum constants are implicitly public, static, and final.',
          'Enum constants are conventionally written in UPPERCASE, though mixed case is syntactically permitted.',
          'Enums can contain fields, constructors (private), and methods.',
        ],
      },
      {
        id: 'enum-demo',
        title: 'The Core Screenshot Example: Status Enum & values()',
        content: 'Here is the canonical Status enumeration example. We declare four statuses and iterate over them using Status.values():',
        snippet: {
          language: 'java',
          filename: 'Demo.java',
          code: `enum Status {
    Running, Failed, Pending, Success
}

public class Demo {
    public static void main(String[] args) {
        Status[] statuses = Status.values();

        for (Status status : statuses) {
            System.out.println(status);
        }
    }
}`,
          output: `Running
Failed
Pending
Success`,
          explanation: '1. enum Status declares the enum type containing 4 constants.\\n2. Status.values() returns an array containing all constants in the exact order they were declared.\\n3. The enhanced for-loop iterates through the array and prints each constant.',
        },
      },
      {
        id: 'enum-array-representation',
        title: 'The [LStatus;@... Array Output Explained',
        content: 'What happens if you print the array directly without looping? If you execute System.out.println(Status.values()), Java prints something like [LStatus;@7ad041f3. Why?',
        bullets: [
          '[LStatus; means: a 1D Array ("[") of Objects of type "Status" ("LStatus;").',
          '@7ad041f3 is the identity hash code of the array object on the Heap.',
          'In Java, standard arrays do not override toString() to display element contents.',
          'To display array elements without an explicit loop, use Arrays.toString(Status.values()).',
        ],
        callout: {
          type: 'tip',
          title: 'Printing Arrays Properly',
          text: 'Never use System.out.println(array) expecting readable values. Either iterate with an enhanced for-loop or use java.util.Arrays.toString(Status.values()).',
        },
      },
      {
        id: 'enum-order-status',
        title: 'Practical E-Commerce Example: OrderStatus & switch',
        content: 'In production e-commerce applications, enums seamlessly power clean switch statements without needing break or string comparison boilerplate:',
        snippet: {
          language: 'java',
          filename: 'OrderStatusDemo.java',
          code: `enum OrderStatus {
    PLACED, PACKED, SHIPPED, DELIVERED, CANCELLED
}

public class OrderStatusDemo {
    public static void main(String[] args) {
        OrderStatus status = OrderStatus.SHIPPED;

        switch (status) {
            case PLACED:
                System.out.println("Order received");
                break;
            case PACKED:
                System.out.println("Order packed in warehouse");
                break;
            case SHIPPED:
                System.out.println("Order is on the way");
                break;
            case DELIVERED:
                System.out.println("Order delivered to customer");
                break;
            case CANCELLED:
                System.out.println("Order cancelled");
                break;
        }
    }
}`,
          output: 'Order is on the way',
        },
      },
      {
        id: 'enum-methods-table',
        title: 'Useful Built-In Enum Methods',
        content: 'Every Java enum automatically inherits from java.lang.Enum and provides these built-in methods:',
        table: {
          headers: ['Method', 'Return Type', 'Purpose', 'Critical Caveat'],
          rows: [
            ['values()', 'Status[]', 'Returns all constants in declaration order as an array.', 'Creates a fresh clone of the array on every call.'],
            ['valueOf(String name)', 'Status', 'Returns the enum constant matching the exact string name.', 'Throws IllegalArgumentException if the string does not match any constant!'],
            ['name()', 'String', 'Returns the exact declared name of the constant.', 'Guaranteed to return the declared identifier; prefer over toString() in persistent checks.'],
            ['ordinal()', 'int', 'Returns the zero-based position in the enum declaration.', 'AVOID using as a database ID! If someone reorders or inserts a constant, ordinal values shift!'],
          ],
        },
        callout: {
          type: 'warning',
          title: 'Why Never Use ordinal() as a Database Key',
          text: 'If you store ordinal 2 in a database for SHIPPED, and later another developer inserts ON_HOLD before SHIPPED, all existing database records will quietly corrupt into the wrong state. Store status.name() in databases instead.',
        },
      },
      {
        id: 'enum-flowchart',
        title: 'Enum Lifecycle & Execution Flow',
        content: 'How enums flow from declaration to runtime evaluation:',
        flowDiagram: {
          title: 'Java Enum Decision Workflow',
          steps: [
            { stepNumber: 1, label: 'Declare Enum Type', subtext: 'e.g. enum Status { Running, Failed }' },
            { stepNumber: 2, label: 'Compiler Generates Class', subtext: 'Subclasses java.lang.Enum' },
            { stepNumber: 3, label: 'Assign Constant', subtext: 'Status s = Status.Running' },
            { stepNumber: 4, label: 'Type-Safe Evaluation', subtext: 'switch (s) or Status.values()' },
          ],
        },
      },
    ],
    commonMistakes: [
      {
        mistake: 'Using status.ordinal() as a database foreign key or persistent integer',
        fix: 'Reordering or inserting enum constants changes ordinal numbers. Save status.name() or define an explicit custom code field.',
      },
      {
        mistake: 'Printing Status.values() directly: System.out.println(Status.values());',
        fix: 'Arrays in Java print [LStatus;@hashcode. Use Arrays.toString(Status.values()) or a for-each loop.',
      },
      {
        mistake: 'Passing wrong casing to Status.valueOf("running") when declared as "Running"',
        fix: 'valueOf() is strictly case-sensitive and throws IllegalArgumentException if not an exact match.',
      },
    ],
    keyTakeaways: [
      'Enums represent a closed, type-safe set of constants.',
      'Status.values() returns an array of all constants in declaration order.',
      'Direct array printing outputs type descriptor [LStatus;@hash, not elements.',
      'Never use ordinal() as a persistent database identifier.',
    ],
    relatedTopicIds: ['java-002-primitives-types', 'java-003-classes-objects', 'java-008-static-members'],
    exerciseIds: ['ex-011-enum-status'],
    interviewQuestionIds: ['q-030-enum-basics', 'q-031-enum-values', 'q-032-enum-valueof-unknown', 'q-033-enum-ordinal-db', 'q-034-enum-fields-methods'],
    keywords: ['enum', 'enumeration', 'values()', 'valueOf()', 'ordinal()', 'name()', 'status', 'orderstatus', 'constants', 'type safety'],
  },

{
    id: 'java-annotations',
    codeNumber: 'JAVA-028',
    languageId: 'java',
    title: 'Annotations in Java',
    slug: 'annotations-in-java',
    category: 'Object-Oriented Programming',
    subcategory: 'Annotations',
    summary: 'Understand Java annotations: structured metadata for compilers, tools, and runtime frameworks. Master @Override, @Deprecated, @FunctionalInterface, and custom annotations.',
    order: 24,
    estimatedMinutes: 12,
    learningObjectives: [
      'Define what an annotation is and recognize that annotations do not change logic automatically.',
      'Use @Override to catch method signature errors at compile time.',
      'Clarify why @Override does NOT prevent method overloading.',
      'Understand built-in annotations: @Deprecated, @SuppressWarnings, and @FunctionalInterface.',
      'Explain meta-annotations: @Retention and @Target.',
      'Declare custom annotations using @interface and understand how frameworks inspect them.',
    ],
    whyItMatters: 'Annotations form the core configuration model of modern Java, Spring Boot, JUnit, and Hibernate. Knowing how annotations work prevents confusing compilation bugs and framework misconfigurations.',
    sections: [
      {
        id: 'annotation-definition',
        title: 'What is an Annotation in Java?',
        content: 'An annotation is a form of syntactic metadata that can be added to Java code: classes, interfaces, methods, fields, parameters, and packages. Annotations have NO direct effect on the operations of the code they annotate simply by being present. Instead, they provide structured information that compilers, code analyzers, and runtime frameworks (such as Spring, JUnit, and Hibernate) can read.',
        bullets: [
          'Prefixed with the "@" character (e.g. @Override, @Deprecated).',
          'Compiler checks: Detect errors or suppress warnings at build time.',
          'Build-time tools: Generate boilerplate code or documentation.',
          'Runtime processing: Inspected via Reflection (java.lang.reflect) by frameworks to apply dependency injection, security, or routing.',
        ],
      },
      {
        id: 'annotation-override',
        title: 'The @Override Annotation: Catching Typos Early',
        content: 'The most common built-in annotation is @Override. It instructs the compiler to verify that the annotated method actually overrides a method from a superclass or interface:',
        snippet: {
          language: 'java',
          filename: 'Hello.java',
          code: `class A {
    public void showData() {
        System.out.println("This is class A");
    }
}

class B extends A {
    @Override
    public void showData() {
        System.out.println("This is class B");
    }
}

public class Hello {
    public static void main(String[] args) {
        A obj = new B();
        obj.showData();
    }
}`,
          output: 'This is class B',
          explanation: 'If a developer accidentally misnamed the method as public void showdata() (lowercase "d"), without @Override the compiler would treat it as a brand-new method in B, causing the parent showData() to run unexpectedly. With @Override, the compiler halts immediately: "method does not override or implement a method from a supertype".',
        },
      },
      {
        id: 'annotation-override-clarification',
        title: 'Crucial Correction: Does @Override Prevent Overloading?',
        content: 'NO! A common misconception is that @Override prevents method overloading. It does NOT prevent overloading at all.',
        bullets: [
          'Overloading means: The same class has multiple methods with the same name but DIFFERENT parameter lists.',
          'Overriding means: A subclass provides its own compatible implementation of an inherited method with the IDENTICAL parameter list.',
          '@Override simply checks that an overriding signature is valid; it has nothing to do with preventing overloading.',
        ],
        callout: {
          type: 'interview',
          title: 'Key Interview Fact',
          text: '@Override ensures a method is a true override. You can still freely overload methods in the same subclass without any conflict.',
        },
      },
      {
        id: 'annotation-useful-table',
        title: 'Standard Built-In & Meta-Annotations Table',
        content: 'Java provides built-in annotations for code quality and meta-annotations for defining custom annotations:',
        table: {
          headers: ['Annotation', 'Target', 'Purpose', 'Common Use Case'],
          rows: [
            ['@Override', 'Method', 'Verifies that a method overrides an inherited method.', 'Subclass method implementations.'],
            ['@Deprecated', 'Any declaration', 'Marks an API as obsolete and discouraged for new code.', 'Signaling old methods/classes prior to removal.'],
            ['@SuppressWarnings("...")', 'Any declaration', 'Requests the compiler to suppress specific warnings (e.g. "unchecked", "deprecation").', 'Carefully handling known legacy warnings.'],
            ['@FunctionalInterface', 'Interface', 'Verifies that an interface has exactly one abstract method (SAM).', 'Lambda expression target contracts.'],
            ['@SafeVarargs', 'Method / Constructor', 'Suppresses unchecked warnings related to generic varargs arrays.', 'Static/final generic varargs methods.'],
            ['@Retention', 'Annotation type', 'Meta-annotation: Specifies how long metadata is kept (SOURCE, CLASS, RUNTIME).', 'Setting whether runtime reflection can read it.'],
            ['@Target', 'Annotation type', 'Meta-annotation: Restricts where annotation can be placed (METHOD, FIELD, TYPE, etc.).', 'Preventing placing method annotations on classes.'],
          ],
        },
      },
      {
        id: 'annotation-custom',
        title: 'Custom Annotations & Reflection Mechanics',
        content: 'You can declare custom annotations using the @interface keyword. Notice that the annotation itself does not execute logic; code inspection logic does:',
        snippet: {
          language: 'java',
          filename: 'CustomAnnotationDemo.java',
          code: `import java.lang.annotation.*;

@Retention(RetentionPolicy.RUNTIME) // Kept in memory so reflection can inspect it
@Target(ElementType.METHOD)         // Can only be placed on methods
@interface Important {
}

class Report {
    @Important
    public void generate() {
        System.out.println("Report generated");
    }
}

public class CustomAnnotationDemo {
    public static void main(String[] args) {
        new Report().generate();
    }
}`,
          output: 'Report generated',
          explanation: '@Important simply attaches metadata. A framework (or custom reflection code using method.isAnnotationPresent(Important.class)) reads that metadata to apply extra behavior like logging, profiling, or transaction management.',
        },
      },
    ],
    commonMistakes: [
      {
        mistake: 'Thinking custom annotations automatically run code without any processor or reflection',
        fix: 'Annotations are pure metadata. A framework, compiler plugin, or reflection code must explicitly read and act on them.',
      },
      {
        mistake: 'Omitting @Retention(RetentionPolicy.RUNTIME) when using reflection',
        fix: 'Default retention is RetentionPolicy.CLASS, which discards metadata at JVM load time. Use RUNTIME if you need reflection access.',
      },
      {
        mistake: 'Believing @Override prevents method overloading',
        fix: '@Override checks overriding validity; overloading is completely permitted in the same class.',
      },
    ],
    keyTakeaways: [
      'Annotations are metadata attached to code elements.',
      '@Override checks that a method correctly overrides an inherited method.',
      '@FunctionalInterface enforces exactly one abstract method.',
      '@Retention(RUNTIME) is required for reflection inspection.',
    ],
    relatedTopicIds: ['java-012-polymorphism-dispatch', 'java-interface-types'],
    exerciseIds: ['ex-012-annotation-override'],
    interviewQuestionIds: ['q-035-annotation-concept', 'q-036-override-catch-errors', 'q-037-override-vs-overloading', 'q-038-deprecated-purpose', 'q-039-functional-interface-check', 'q-040-retention-target', 'q-041-custom-annotation-logic'],
    keywords: ['annotation', '@Override', '@Deprecated', '@SuppressWarnings', '@FunctionalInterface', '@Retention', '@Target', '@interface', 'metadata', 'reflection'],
  }
];
