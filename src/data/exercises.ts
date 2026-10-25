import { Exercise } from '../types';

export const EXERCISES: Exercise[] = [
  {
    id: 'ex-001-hello-world',
    number: 1,
    languageId: 'java',
    topicId: 'java-001-jvm-jdk',
    topicTitle: 'Java Execution, JVM, JRE & JDK',
    title: 'Hello World',
    difficulty: 'Beginner',
    task: 'Write a complete Java application with a public class HelloWorld and standard main method that prints "Hello World" to the console.',
    starterCode: `public class HelloWorld {
    public static void main(String[] args) {
        // TODO: Print "Hello World"
    }
}`,
    solutionCode: `public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello World");
    }
}`,
    expectedOutput: 'Hello World',
    explanation: 'System.out.println() prints the text followed by a newline. The class name HelloWorld matches the file name and contains the standard public static void main(String[] args) application entry point.',
    hints: [
      'Use System.out.println(...) to print text with a trailing newline.',
      'Enclose text in double quotes: "Hello World".',
      'Remember to terminate the statement with a semicolon (;).',
    ],
    testCases: [
      {
        description: 'Standard invocation',
        expectedOutput: 'Hello World',
      },
    ],
  },

  {
    id: 'ex-002-primitives',
    number: 2,
    languageId: 'java',
    topicId: 'java-002-primitives-types',
    topicTitle: 'Primitive Types, Variables, Casting & Operators',
    title: 'Primitive Variables Declaration',
    difficulty: 'Beginner',
    task: 'Declare four primitive variables: an int named "age" with value 25, a double named "salary" with value 45000.50, a char named "grade" with value \'A\', and a boolean named "active" with value true. Print each variable on its own line.',
    starterCode: `public class PrimitiveDemo {
    public static void main(String[] args) {
        // TODO: Declare age, salary, grade, active and print them
    }
}`,
    solutionCode: `public class PrimitiveDemo {
    public static void main(String[] args) {
        int age = 25;
        double salary = 45000.50;
        char grade = 'A';
        boolean active = true;

        System.out.println(age);
        System.out.println(salary);
        System.out.println(grade);
        System.out.println(active);
    }
}`,
    expectedOutput: `25
45000.5
A
true`,
    explanation: 'Java primitives store raw values directly. Use single quotes for char and double quotes for String. Java doubles print trailing zeroes cleanly.',
    hints: [
      'Primitive keywords are all lowercase: int, double, char, boolean.',
      'Single quotes \'A\' are required for char, not double quotes.',
    ],
    testCases: [
      {
        description: 'Verifies correct values and types',
        expectedOutput: "25\n45000.5\nA\ntrue",
      },
    ],
  },

  {
    id: 'ex-003-type-casting',
    number: 3,
    languageId: 'java',
    topicId: 'java-002-primitives-types',
    topicTitle: 'Primitive Types, Variables, Casting & Operators',
    title: 'Explicit Narrowing Type Casting',
    difficulty: 'Beginner',
    task: 'Given double num = 100.5, perform explicit narrowing type casting to convert it into an integer named "dig". Print "dig" to the console.',
    starterCode: `public class CastingExercise {
    public static void main(String[] args) {
        double num = 100.5;
        // TODO: Convert num into int dig and print it
    }
}`,
    solutionCode: `public class CastingExercise {
    public static void main(String[] args) {
        double num = 100.5;
        int dig = (int) num;
        System.out.println(dig);
    }
}`,
    expectedOutput: '100',
    explanation: 'Explicit narrowing syntax (int) num converts the floating-point value to an integer by truncating (discarding) the fractional decimal component .5.',
    hints: [
      'Use the cast operator: (int) num.',
      'Notice that casting truncates towards zero; it does not round.',
    ],
    testCases: [
      {
        description: 'Truncates 100.5 to integer',
        expectedOutput: '100',
      },
    ],
  },

  {
    id: 'ex-004-char-arithmetic',
    number: 4,
    languageId: 'java',
    topicId: 'java-002-primitives-types',
    topicTitle: 'Primitive Types, Variables, Casting & Operators',
    title: 'Character Arithmetic & ASCII Shift',
    difficulty: 'Beginner',
    task: 'Initialize a char variable "c" with \'A\'. Add 5 to it using compound assignment (c += 5) and print the resulting character.',
    starterCode: `public class CharMath {
    public static void main(String[] args) {
        // TODO: Initialize char c = 'A', add 5, print c
    }
}`,
    solutionCode: `public class CharMath {
    public static void main(String[] args) {
        char c = 'A';
        c += 5;
        System.out.println(c);
    }
}`,
    expectedOutput: 'F',
    explanation: '\'A\' has Unicode/ASCII value 65. 65 + 5 = 70. Unicode value 70 corresponds to uppercase letter \'F\'. Compound assignment (+=) performs an implicit cast back to char.',
    hints: [
      'char c = \'A\'; initializes character \'A\'.',
      'c += 5 automatically handles type casting back to char.',
    ],
    testCases: [
      {
        description: 'Letter \'A\' shifted by 5 positions',
        expectedOutput: 'F',
      },
    ],
  },

  {
    id: 'ex-005-inventory-condition',
    number: 5,
    languageId: 'java',
    topicId: 'java-002-primitives-types',
    topicTitle: 'Primitive Types, Variables, Casting & Operators',
    title: 'Inventory Stock Availability Condition',
    difficulty: 'Beginner',
    task: 'Given an integer variable "stock", write a condition: if stock is strictly greater than 0, print "Product available"; otherwise, print "Out of stock". Test your code with stock = 5.',
    starterCode: `public class InventoryCheck {
    public static void main(String[] args) {
        int stock = 5;
        // TODO: Check stock availability
    }
}`,
    solutionCode: `public class InventoryCheck {
    public static void main(String[] args) {
        int stock = 5;
        if (stock > 0) {
            System.out.println("Product available");
        } else {
            System.out.println("Out of stock");
        }
    }
}`,
    expectedOutput: 'Product available',
    explanation: 'A simple if-else branch evaluates boolean condition (stock > 0). If true, it prints available; otherwise out of stock.',
    hints: [
      'Use if (stock > 0) { ... } else { ... }',
      'Strings must match exact casing: "Product available" and "Out of stock".',
    ],
    testCases: [
      {
        description: 'Test case 1: stock = 5',
        expectedOutput: 'Product available',
      },
      {
        description: 'Test case 2: stock = 0',
        expectedOutput: 'Out of stock',
      },
    ],
  },

  {
    id: 'ex-006-array-basics',
    number: 6,
    languageId: 'java',
    topicId: 'java-005-arrays',
    topicTitle: 'Arrays: 1D, 2D, 3D & Jagged Arrays',
    title: 'Array Indexing & Access',
    difficulty: 'Beginner',
    task: 'Given an integer array int[] numbers = {10, 20, 30, 40}, access and print the second element of the array.',
    starterCode: `public class ArrayAccess {
    public static void main(String[] args) {
        int[] numbers = {10, 20, 30, 40};
        // TODO: Print the second element
    }
}`,
    solutionCode: `public class ArrayAccess {
    public static void main(String[] args) {
        int[] numbers = {10, 20, 30, 40};
        System.out.println(numbers[1]);
    }
}`,
    expectedOutput: '20',
    explanation: 'Java arrays are zero-indexed. Index 0 accesses the first element (10), while index 1 accesses the second element (20).',
    hints: [
      'Arrays are zero-indexed: first is index 0, second is index 1.',
      'Access using numbers[1].',
    ],
    testCases: [
      {
        description: 'Accesses second element at index 1',
        expectedOutput: '20',
      },
    ],
  },

  {
    id: 'ex-007-method-overloading',
    number: 7,
    languageId: 'java',
    topicId: 'java-012-polymorphism-dispatch',
    topicTitle: 'Method Overloading, Overriding & Dynamic Dispatch',
    title: 'Calculator Method Overloading',
    difficulty: 'Intermediate',
    task: 'Create a Calculator class with three overloaded methods named "add":\n1. add(int a, int b) returning their sum\n2. add(int a, int b, int c) returning their sum\n3. add(double a, double b) returning their sum\nIn the main method, instantiate Calculator and call each version, printing the results.',
    starterCode: `class Calculator {
    // TODO: Define overloaded add methods
}

public class OverloadExercise {
    public static void main(String[] args) {
        Calculator calc = new Calculator();
        // TODO: Call add(10, 20), add(5, 10, 15), add(2.5, 3.5) and print
    }
}`,
    solutionCode: `class Calculator {
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

public class OverloadExercise {
    public static void main(String[] args) {
        Calculator calc = new Calculator();
        System.out.println(calc.add(10, 20));
        System.out.println(calc.add(5, 10, 15));
        System.out.println(calc.add(2.5, 3.5));
    }
}`,
    expectedOutput: `30
30
6.0`,
    explanation: 'Overloading allows multiple methods in the same class to share the same name as long as their parameter lists differ. The compiler matches the call to the appropriate signature based on the argument count and types.',
    hints: [
      'Ensure the method names are identical: "add".',
      'Vary the number of parameters or the parameter types.',
      'Notice that return type differences alone do not constitute a valid overload.',
    ],
    testCases: [
      {
        description: 'Test all 3 overload signatures',
        expectedOutput: "30\n30\n6.0",
      },
    ],
  },

  {
    id: 'ex-008-constructor-chaining',
    number: 8,
    languageId: 'java',
    topicId: 'java-010-inheritance-chaining',
    topicTitle: 'Inheritance & Constructor Chaining with super()',
    title: 'Parent-Child Constructor Chaining',
    difficulty: 'Intermediate',
    task: 'Create parent class A with a parameterized constructor A(int x) printing "A parameterized: " + x. Create child class B extending A with constructor B(int x) that uses super(x) to pass x to the parent, followed by printing "B parameterized: " + x. In main, instantiate new B(10).',
    starterCode: `class A {
    // TODO: Create A(int x)
}

class B extends A {
    // TODO: Create B(int x) calling super(x)
}

public class ChainingExercise {
    public static void main(String[] args) {
        new B(10);
    }
}`,
    solutionCode: `class A {
    A(int x) {
        System.out.println("A parameterized: " + x);
    }
}

class B extends A {
    B(int x) {
        super(x);
        System.out.println("B parameterized: " + x);
    }
}

public class ChainingExercise {
    public static void main(String[] args) {
        new B(10);
    }
}`,
    expectedOutput: `A parameterized: 10
B parameterized: 10`,
    explanation: 'super(x) must be the very first statement inside B\'s constructor. It invokes parent A\'s parameterized constructor before executing B\'s own initialization code.',
    hints: [
      'Class B extends A using the "extends" keyword.',
      'In B(int x), call super(x) on the first line.',
    ],
    testCases: [
      {
        description: 'Executes parent constructor then child constructor',
        expectedOutput: "A parameterized: 10\nB parameterized: 10",
      },
    ],
  },

  {
    id: 'ex-009-string-builder',
    number: 9,
    languageId: 'java',
    topicId: 'java-006-strings',
    topicTitle: 'String, StringBuffer & StringBuilder',
    title: 'StringBuilder Mutation & Append',
    difficulty: 'Beginner',
    task: 'Create a StringBuilder initialized with "Hello". Append " Java" to it using .append(), then print the resulting sequence.',
    starterCode: `public class StringBuilderDemo {
    public static void main(String[] args) {
        // TODO: Initialize StringBuilder with "Hello", append " Java", and print
    }
}`,
    solutionCode: `public class StringBuilderDemo {
    public static void main(String[] args) {
        StringBuilder sb = new StringBuilder("Hello");
        sb.append(" Java");
        System.out.println(sb);
    }
}`,
    expectedOutput: 'Hello Java',
    explanation: 'StringBuilder is a mutable sequence of characters. Calling append(" Java") modifies the internal character buffer in place without creating discardable String objects.',
    hints: [
      'Initialize with new StringBuilder("Hello").',
      'Use sb.append(" Java"); to append the string.',
      'Print with System.out.println(sb);',
    ],
    testCases: [
      {
        description: 'Appends string in-place',
        expectedOutput: 'Hello Java',
      },
    ],
  },

  {
    id: 'ex-010-oop-practice',
    number: 10,
    languageId: 'java',
    topicId: 'java-003-classes-objects',
    topicTitle: 'Classes, Objects & The 4 OOP Pillars',
    title: 'Product Encapsulation & Validation',
    difficulty: 'Intermediate',
    task: 'Create a Product class with private fields: String name and int stock. Provide a constructor Product(String name, int stock), a public getter getStock(), a public setter setStock(int stock) that only updates stock if stock >= 0, and a display() method that prints "Product: " + name + " | Stock: " + stock. Test by creating a Product("Jersey", 10), updating stock to 15, and calling display().',
    starterCode: `class Product {
    // TODO: Declare private fields, constructor, getter, setter, and display
}

public class EncapsulationExercise {
    public static void main(String[] args) {
        Product p = new Product("Jersey", 10);
        p.setStock(15);
        p.display();
    }
}`,
    solutionCode: `class Product {
    private String name;
    private int stock;

    public Product(String name, int stock) {
        this.name = name;
        this.setStock(stock);
    }

    public int getStock() {
        return stock;
    }

    public void setStock(int stock) {
        if (stock >= 0) {
            this.stock = stock;
        }
    }

    public void display() {
        System.out.println("Product: " + name + " | Stock: " + stock);
    }
}

public class EncapsulationExercise {
    public static void main(String[] args) {
        Product p = new Product("Jersey", 10);
        p.setStock(15);
        p.display();
    }
}`,
    expectedOutput: 'Product: Jersey | Stock: 15',
    explanation: 'Encapsulation protects fields with private access. Mutators (setters) enforce business rules, ensuring stock cannot become negative.',
    hints: [
      'Mark fields private: private String name; private int stock;',
      'In setStock(int stock), use if (stock >= 0) { this.stock = stock; }',
    ],
    testCases: [
      {
        description: 'Encapsulates fields and validates setter update',
        expectedOutput: 'Product: Jersey | Stock: 15',
      },
    ],
  },

  {
    id: 'ex-011-enum-status',
    number: 11,
    languageId: 'java',
    topicId: 'java-enum',
    topicTitle: 'Enums in Java',
    title: 'Enum Order Status Iteration',
    difficulty: 'Beginner',
    task: 'Create an OrderStatus enum with constants PLACED, SHIPPED, and DELIVERED. In the main method, iterate through all values using OrderStatus.values() and print each constant on its own line.',
    starterCode: `enum OrderStatus {
    // TODO: Define constants PLACED, SHIPPED, DELIVERED
}

public class EnumExercise {
    public static void main(String[] args) {
        // TODO: Loop through OrderStatus.values() and print each
    }
}`,
    solutionCode: `enum OrderStatus {
    PLACED, SHIPPED, DELIVERED
}

public class EnumExercise {
    public static void main(String[] args) {
        for (OrderStatus status : OrderStatus.values()) {
            System.out.println(status);
        }
    }
}`,
    expectedOutput: `PLACED
SHIPPED
DELIVERED`,
    explanation: 'OrderStatus.values() returns an array containing all declared constants in declaration order. The enhanced for-loop visits each constant and prints its name.',
    hints: [
      'Declare the constants inside the enum separated by commas: PLACED, SHIPPED, DELIVERED.',
      'Use an enhanced for-loop: for (OrderStatus status : OrderStatus.values()) { ... }',
    ],
    testCases: [
      {
        description: 'Iterates and prints all three enum constants',
        expectedOutput: "PLACED\nSHIPPED\nDELIVERED",
      },
    ],
  },

  {
    id: 'ex-012-annotation-override',
    number: 12,
    languageId: 'java',
    topicId: 'java-annotations',
    topicTitle: 'Annotations in Java',
    title: 'Annotation Check with @Override',
    difficulty: 'Beginner',
    task: 'Create a parent class Base with a method void display() printing "Base display". Create a child class Sub extending Base and override display() using the @Override annotation, printing "Child display". In main, call obj.display() using Base obj = new Sub().',
    starterCode: `class Base {
    void display() {
        System.out.println("Base display");
    }
}

class Sub extends Base {
    // TODO: Override display() using @Override annotation
}

public class AnnotationExercise {
    public static void main(String[] args) {
        Base obj = new Sub();
        obj.display();
    }
}`,
    solutionCode: `class Base {
    void display() {
        System.out.println("Base display");
    }
}

class Sub extends Base {
    @Override
    void display() {
        System.out.println("Child display");
    }
}

public class AnnotationExercise {
    public static void main(String[] args) {
        Base obj = new Sub();
        obj.display();
    }
}`,
    expectedOutput: 'Child display',
    explanation: 'The @Override annotation requests the Java compiler to verify that display() actually overrides an inherited instance method. If misspelled, compilation halts immediately.',
    hints: [
      'Place @Override directly above the method declaration in class Sub.',
      'Ensure the method signature void display() matches the parent method exactly.',
    ],
    testCases: [
      {
        description: 'Invokes overridden method through parent reference',
        expectedOutput: 'Child display',
      },
    ],
  },

  {
    id: 'ex-013-functional-calc',
    number: 13,
    languageId: 'java',
    topicId: 'java-lambda-expressions',
    topicTitle: 'Lambda Expressions',
    title: 'Functional Interface & Lambda Addition',
    difficulty: 'Intermediate',
    task: 'Create a functional interface named Calculator with a single abstract method int calculate(int a, int b). In main, implement addition using a lambda expression: (a, b) -> a + b. Call calculate(4, 6) and print the resulting integer.',
    starterCode: `@FunctionalInterface
interface Calculator {
    int calculate(int a, int b);
}

public class LambdaExercise {
    public static void main(String[] args) {
        // TODO: Implement Calculator with a lambda (a, b) -> a + b
        // Call calculate(4, 6) and print result
    }
}`,
    solutionCode: `@FunctionalInterface
interface Calculator {
    int calculate(int a, int b);
}

public class LambdaExercise {
    public static void main(String[] args) {
        Calculator calc = (a, b) -> a + b;
        System.out.println(calc.calculate(4, 6));
    }
}`,
    expectedOutput: '10',
    explanation: 'Because Calculator is a functional interface (SAM), the lambda expression (a, b) -> a + b binds directly to the calculate(int, int) method, returning the sum 10.',
    hints: [
      'Use the arrow operator: Calculator calc = (a, b) -> a + b;',
      'Invoke via calc.calculate(4, 6).',
    ],
    testCases: [
      {
        description: 'Evaluates addition lambda for inputs (4, 6)',
        expectedOutput: '10',
      },
    ],
  },

  {
    id: 'ex-014-anonymous-greeting',
    number: 14,
    languageId: 'java',
    topicId: 'java-anonymous-classes',
    topicTitle: 'Anonymous Classes',
    title: 'Anonymous Class Method Override',
    difficulty: 'Intermediate',
    task: 'Create a class Greeting with a method void sayHello() printing "Hello". In main, instantiate Greeting using an anonymous class that overrides sayHello() to print "Hello from an anonymous class". Call sayHello() on that instance.',
    starterCode: `class Greeting {
    void sayHello() {
        System.out.println("Hello");
    }
}

public class AnonymousExercise {
    public static void main(String[] args) {
        // TODO: Instantiate Greeting with an anonymous class overriding sayHello()
    }
}`,
    solutionCode: `class Greeting {
    void sayHello() {
        System.out.println("Hello");
    }
}

public class AnonymousExercise {
    public static void main(String[] args) {
        Greeting greeting = new Greeting() {
            @Override
            void sayHello() {
                System.out.println("Hello from an anonymous class");
            }
        };
        greeting.sayHello();
    }
}`,
    expectedOutput: 'Hello from an anonymous class',
    explanation: 'An anonymous class is declared and instantiated in a single expression with new Greeting() { ... }. It overrides sayHello() without creating a separate named class.',
    hints: [
      'Use syntax: Greeting greeting = new Greeting() { void sayHello() { ... } };',
      'Remember the semicolon after the closing curly brace of the anonymous class definition.',
    ],
    testCases: [
      {
        description: 'Overrides method via anonymous subclass',
        expectedOutput: 'Hello from an anonymous class',
      },
    ],
  },

  {
    id: 'ex-015-serialization-student',
    number: 15,
    languageId: 'java',
    topicId: 'java-serialization',
    topicTitle: 'Object Serialization & Deserialization',
    title: 'Serialization and Transient Fields',
    difficulty: 'Intermediate',
    task: 'Create a Student class implementing Serializable with serialVersionUID = 1L, having a String name and transient int age. In main, serialize Student("Suhel", 25) to "student.ser" using ObjectOutputStream, then deserialize it using ObjectInputStream. Print the restored student. Observe how transient age resets to 0.',
    starterCode: `import java.io.*;

class Student implements Serializable {
    private static final long serialVersionUID = 1L;
    String name;
    transient int age; // transient fields are skipped during serialization

    Student(String name, int age) {
        this.name = name;
        this.age = age;
    }

    @Override
    public String toString() {
        return "Student{name='" + name + "', age=" + age + "}";
    }
}

public class SerializationExercise {
    public static void main(String[] args) {
        // TODO: Serialize Student("Suhel", 25) to "student.ser"
        // Then deserialize and print the restored object
    }
}`,
    solutionCode: `import java.io.*;

class Student implements Serializable {
    private static final long serialVersionUID = 1L;
    String name;
    transient int age;

    Student(String name, int age) {
        this.name = name;
        this.age = age;
    }

    @Override
    public String toString() {
        return "Student{name='" + name + "', age=" + age + "}";
    }
}

public class SerializationExercise {
    public static void main(String[] args) {
        String file = "student.ser";
        Student s = new Student("Suhel", 25);

        try (ObjectOutputStream out = new ObjectOutputStream(new FileOutputStream(file))) {
            out.writeObject(s);
            System.out.println("Object saved");
        } catch (IOException e) {
            return;
        }

        try (ObjectInputStream in = new ObjectInputStream(new FileInputStream(file))) {
            Student restored = (Student) in.readObject();
            System.out.println("Restored: " + restored);
        } catch (Exception e) {}
    }
}`,
    expectedOutput: `Object saved
Restored: Student{name='Suhel', age=0}`,
    explanation: 'Because age is marked transient, ObjectOutputStream omits it from the byte stream. During deserialization, JVM sets age to its primitive default value 0.',
    hints: [
      'Write the object with out.writeObject(s); inside a try-with-resources block.',
      'Read the object with (Student) in.readObject();',
    ],
    testCases: [
      {
        description: 'Serializes and restores student with transient age reset to 0',
        expectedOutput: "Object saved\nRestored: Student{name='Suhel', age=0}",
      },
    ],
  },

  {
    id: 'ex-016-setup-hello-world',
    number: 16,
    languageId: 'java',
    topicId: 'java-setup-macos',
    topicTitle: 'Java Setup on macOS',
    title: 'Compile & Run First Java Application',
    difficulty: 'Beginner',
    task: 'Write a complete Java application with a public class Hello and standard main method that prints "Hello, World!" to the console. In macOS Terminal, this compiles with "javac Hello.java" generating bytecode Hello.class and executes with "java Hello".',
    starterCode: `public class Hello {
    public static void main(String[] args) {
        // TODO: Print "Hello, World!"
    }
}`,
    solutionCode: `public class Hello {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
    expectedOutput: 'Hello, World!',
    explanation: 'javac Hello.java compiles the source into bytecode in Hello.class. Launching "java Hello" (without .class extension) starts the JVM, loads the bytecode, and executes main().',
    hints: [
      'Use System.out.println("Hello, World!");',
      'The public class name Hello must match the filename Hello.java.',
      'Do not include the .class extension when running with the java command.',
    ],
    testCases: [
      {
        description: 'Compiles and outputs standard Hello World string',
        expectedOutput: 'Hello, World!',
      },
    ],
  },

  {
    id: 'ex-017-fix-errors',
    number: 17,
    languageId: 'java',
    topicId: 'java-errors-classification',
    topicTitle: 'Errors in Java: Compile-Time, Runtime & Logical',
    title: 'Fix Compile-Time, Runtime, and Logical Errors',
    difficulty: 'Beginner',
    task: 'Fix the three distinct errors in the code: (1) Fix the compile-time type mismatch where int age is assigned "twenty", change it to 20. (2) Fix the runtime division-by-zero error where result divides 10 by 0, change the denominator to 2. (3) Fix the logical error where total computes price + quantity instead of price * quantity. Print the corrected values.',
    starterCode: `public class Hello {
    public static void main(String[] args) {
        // 1. Compile-time error: Type mismatch
        int age = "twenty";

        // 2. Runtime error: Division by zero
        int result = 10 / 0;

        // 3. Logical error: Total calculation should be price * quantity
        int price = 100;
        int quantity = 3;
        int total = price + quantity;

        System.out.println("Age: " + age);
        System.out.println("Result: " + result);
        System.out.println("Total: " + total);
    }
}`,
    solutionCode: `public class Hello {
    public static void main(String[] args) {
        int age = 20;
        int result = 10 / 2;
        int price = 100;
        int quantity = 3;
        int total = price * quantity;

        System.out.println("Age: " + age);
        System.out.println("Result: " + result);
        System.out.println("Total: " + total);
    }
}`,
    expectedOutput: `Age: 20
Result: 5
Total: 300`,
    explanation: 'Compile-time errors prevent compilation. Runtime errors crash active threads (e.g. ArithmeticException). Logical errors compile and run cleanly but produce incorrect business calculations.',
    hints: [
      'Change "twenty" to integer 20.',
      'Divide 10 by 2 instead of 0 to avoid ArithmeticException.',
      'Multiply price * quantity to find the correct total of 300.',
    ],
    testCases: [
      {
        description: 'Outputs all 3 corrected values',
        expectedOutput: "Age: 20\nResult: 5\nTotal: 300",
      },
    ],
  },

  {
    id: 'ex-018-arithmetic-safe-division',
    number: 18,
    languageId: 'java',
    topicId: 'java-try-catch-finally',
    topicTitle: 'try, catch, and finally',
    title: 'Safe Division with try-catch-finally',
    difficulty: 'Intermediate',
    task: 'Enclose integer division in a try block where a = 10 and b = 0. Catch the ArithmeticException and print "Arithmetic exception: / by zero". Add a finally block that prints "This block is normally executed.".',
    starterCode: `public class Hello {
    public static void main(String[] args) {
        int a = 10;
        int b = 0;
        // TODO: Wrap division in try-catch-finally
    }
}`,
    solutionCode: `public class Hello {
    public static void main(String[] args) {
        int a = 10;
        int b = 0;
        try {
            int c = a / b;
            System.out.println("Result: " + c);
        } catch (ArithmeticException e) {
            System.out.println("Arithmetic exception: / by zero");
        } finally {
            System.out.println("This block is normally executed.");
        }
    }
}`,
    expectedOutput: `Arithmetic exception: / by zero
This block is normally executed.`,
    explanation: 'When a / b encounters division by zero, it throws ArithmeticException immediately, skipping subsequent lines in the try block. The matching catch block executes, followed by the finally block.',
    hints: [
      'Use try { int c = a / b; } catch (ArithmeticException e) { ... } finally { ... }',
      'The finally block executes whether an exception was thrown or not.',
    ],
    testCases: [
      {
        description: 'Catches ArithmeticException and runs finally block',
        expectedOutput: "Arithmetic exception: / by zero\nThis block is normally executed.",
      },
    ],
  },

  {
    id: 'ex-019-invalid-age-exception',
    number: 19,
    languageId: 'java',
    topicId: 'java-throw-throws-custom',
    topicTitle: 'throw, throws, and Custom Exceptions',
    title: 'Custom Checked InvalidAgeException',
    difficulty: 'Intermediate',
    task: 'Create a custom checked exception class named InvalidAgeException that extends Exception. In the main method, check if int age = 15 is less than 18; if so, throw a new InvalidAgeException("Age must be at least 18."). Catch InvalidAgeException and print "Validation failed: " + e.getMessage().',
    starterCode: `// TODO: Define class InvalidAgeException extends Exception

public class Hello {
    public static void main(String[] args) {
        int age = 15;
        // TODO: Validate age and throw InvalidAgeException if age < 18
    }
}`,
    solutionCode: `class InvalidAgeException extends Exception {
    public InvalidAgeException(String message) {
        super(message);
    }
}

public class Hello {
    public static void main(String[] args) {
        int age = 15;
        try {
            if (age < 18) {
                throw new InvalidAgeException("Age must be at least 18.");
            }
            System.out.println("Allowed");
        } catch (InvalidAgeException e) {
            System.out.println("Validation failed: " + e.getMessage());
        }
    }
}`,
    expectedOutput: 'Validation failed: Age must be at least 18.',
    explanation: 'Because InvalidAgeException extends java.lang.Exception, it is a checked exception. Any method that throws it must either catch it in a try-catch block or declare it with the throws keyword in its signature.',
    hints: [
      'Define class InvalidAgeException extends Exception with a constructor taking (String message) that calls super(message).',
      'Use the throw keyword to instantiate and throw the exception object.',
    ],
    testCases: [
      {
        description: 'Throws and catches custom InvalidAgeException',
        expectedOutput: 'Validation failed: Age must be at least 18.',
      },
    ],
  },

  {
    id: 'ex-020-scanner-input',
    number: 20,
    languageId: 'java',
    topicId: 'java-user-input',
    topicTitle: 'Taking Input from the User',
    title: 'User Input Reading with Scanner & Robust Parsing',
    difficulty: 'Intermediate',
    task: 'Use Scanner wrapped in try-with-resources. Simulate reading user name "Alice" and age 25. Parse the age safely using Integer.parseInt(scanner.nextLine()) to avoid the classic Scanner newline-skipping trap. Print "Name: Alice" and "Age: 25".',
    starterCode: `import java.util.Scanner;

public class Hello {
    public static void main(String[] args) {
        String simulatedInput = "Alice\\n25\\n";
        // TODO: Use try-with-resources with Scanner(simulatedInput)
        // Print Name: Alice and Age: 25
    }
}`,
    solutionCode: `import java.util.Scanner;

public class Hello {
    public static void main(String[] args) {
        String simulatedInput = "Alice\\n25\\n";
        try (Scanner scanner = new Scanner(simulatedInput)) {
            String name = scanner.nextLine();
            int age = Integer.parseInt(scanner.nextLine());

            System.out.println("Name: " + name);
            System.out.println("Age: " + age);
        }
    }
}`,
    expectedOutput: `Name: Alice
Age: 25`,
    explanation: 'Using scanner.nextLine() for all inputs and parsing integers with Integer.parseInt avoids the classic nextInt() newline consumption trap, where a subsequent nextLine() immediately returns an empty string.',
    hints: [
      'Use try (Scanner scanner = new Scanner(simulatedInput)) { ... }',
      'Read name with scanner.nextLine() and parse age with Integer.parseInt(scanner.nextLine()).',
    ],
    testCases: [
      {
        description: 'Reads name and age using Scanner and prints formatted output',
        expectedOutput: "Name: Alice\nAge: 25",
      },
    ],
  },

  {
    id: 'ex-021-runnable-tasks-interleaving',
    number: 21,
    languageId: 'java',
    topicId: 'java-threads-basics',
    topicTitle: 'Threads and Multithreading',
    title: 'Concurrent Execution with Runnable Tasks',
    difficulty: 'Intermediate',
    task: 'Create two Runnable tasks using Java 8 lambdas: demo and remo. Task demo prints "Hi I am Demo class" 5 times; task remo prints "Hi I am Remo class" 5 times. Wrap each in a Thread, start both, and call join() on both to wait for completion. Conclude by printing "Both threads finished successfully".',
    starterCode: `public class Hello {
    public static void main(String[] args) throws InterruptedException {
        // TODO: Create demo and remo Runnables using lambdas
        // Wrap in Thread, start() both, join() both
        // Print "Both threads finished successfully"
    }
}`,
    solutionCode: `public class Hello {
    public static void main(String[] args) throws InterruptedException {
        Runnable demo = () -> {
            for (int i = 0; i < 5; i++) {
                System.out.println("Hi I am Demo class");
            }
        };

        Runnable remo = () -> {
            for (int i = 0; i < 5; i++) {
                System.out.println("Hi I am Remo class");
            }
        };

        Thread t1 = new Thread(demo);
        Thread t2 = new Thread(remo);

        t1.start();
        t2.start();

        t1.join();
        t2.join();

        System.out.println("Both threads finished successfully");
    }
}`,
    expectedOutput: `Both threads finished successfully`,
    explanation: 'start() schedules both threads concurrently on independent execution stacks. join() causes the main thread to suspend until both workers finish, guaranteeing "Both threads finished successfully" prints last.',
    hints: [
      'Define tasks with Runnable demo = () -> { ... };',
      'Pass each Runnable to new Thread(runnable).',
      'Call t1.start() and t2.start(), then t1.join() and t2.join().',
    ],
    testCases: [
      {
        description: 'Starts two threads, joins both, and finishes',
        expectedOutput: 'Both threads finished successfully',
      },
    ],
  },

  {
    id: 'ex-022-synchronized-counter',
    number: 22,
    languageId: 'java',
    topicId: 'java-synchronization-locks',
    topicTitle: 'Synchronization and Race Conditions',
    title: 'Thread-Safe Counter with Synchronization and join()',
    difficulty: 'Advanced',
    task: 'Create a class Counter with an int count = 0 and a synchronized void increment() method. In main, create two threads sharing one Counter instance: thread1 increments 2000 times and thread2 increments 250 times. Start both threads, use join() so main waits for both, and print "Final counter value: " + counter.count (guaranteed deterministic 2250).',
    starterCode: `class Counter {
    int count = 0;
    // TODO: Add synchronized increment() method
}

public class Hello {
    public static void main(String[] args) throws InterruptedException {
        Counter counter = new Counter();
        // TODO: Start two threads (2000 and 250 increments)
        // join() both and print final value
    }
}`,
    solutionCode: `class Counter {
    int count = 0;

    public synchronized void increment() {
        count++;
    }
}

public class Hello {
    public static void main(String[] args) throws InterruptedException {
        Counter counter = new Counter();

        Runnable demo = () -> {
            for (int i = 0; i < 2000; i++) {
                counter.increment();
            }
        };

        Runnable remo = () -> {
            for (int i = 0; i < 250; i++) {
                counter.increment();
            }
        };

        Thread thread1 = new Thread(demo);
        Thread thread2 = new Thread(remo);

        thread1.start();
        thread2.start();

        thread1.join();
        thread2.join();

        System.out.println("Final counter value: " + counter.count);
    }
}`,
    expectedOutput: 'Final counter value: 2250',
    explanation: 'Without synchronized, count++ causes lost updates because read-modify-write bytecode instructions interleave between threads. synchronized acquires the Counter object monitor lock, providing mutual exclusion and ensuring 2000 + 250 = 2250.',
    hints: [
      'Declare public synchronized void increment() { count++; }',
      'Both threads must increment the exact same counter reference.',
      'Use join() on both threads before printing the final counter value.',
    ],
    testCases: [
      {
        description: 'Increments counter across two threads to exact 2250',
        expectedOutput: 'Final counter value: 2250',
      },
    ],
  },

  {
    id: 'ex-023-inspect-thread-states',
    number: 23,
    languageId: 'java',
    topicId: 'java-thread-lifecycle',
    topicTitle: 'Thread Lifecycle and States',
    title: 'Inspect Thread.State Snapshots with getState()',
    difficulty: 'Intermediate',
    task: 'Create a worker thread that sleeps for 300ms. Print its state before start() (State 1: NEW), start it, pause main briefly (50ms) and print its state while sleeping (State 2: TIMED_WAITING), then join() it and print its final state (State 3: TERMINATED).',
    starterCode: `public class Hello {
    public static void main(String[] args) throws InterruptedException {
        Thread worker = new Thread(() -> {
            try {
                Thread.sleep(300);
            } catch (InterruptedException e) {}
        });

        // TODO: Print states at NEW, TIMED_WAITING, and TERMINATED
    }
}`,
    solutionCode: `public class Hello {
    public static void main(String[] args) throws InterruptedException {
        Thread worker = new Thread(() -> {
            try {
                Thread.sleep(300);
            } catch (InterruptedException e) {}
        });

        System.out.println("State 1: " + worker.getState());
        worker.start();
        Thread.sleep(50);
        System.out.println("State 2: " + worker.getState());
        worker.join();
        System.out.println("State 3: " + worker.getState());
    }
}`,
    expectedOutput: `State 1: NEW
State 2: TIMED_WAITING
State 3: TERMINATED`,
    explanation: 'worker.getState() returns an official Thread.State enum constant. Before start(), state is NEW. During sleep(300), state is TIMED_WAITING. Once run() completes, state is TERMINATED.',
    hints: [
      'worker.getState() returns the Thread.State enum value.',
      'Call worker.start(), Thread.sleep(50), and worker.join() in sequence.',
    ],
    testCases: [
      {
        description: 'Inspects NEW, TIMED_WAITING, and TERMINATED states',
        expectedOutput: "State 1: NEW\nState 2: TIMED_WAITING\nState 3: TERMINATED",
      },
    ],
  },

  {
    id: 'ex-024-arraylist-duplicates',
    number: 24,
    languageId: 'java',
    topicId: 'java-list-implementations',
    topicTitle: 'List Implementations: ArrayList, LinkedList, Vector, Stack',
    title: 'ArrayList Duplicates & Dynamic Resizing',
    difficulty: 'Beginner',
    task: 'Store product names in an ArrayList<String>. Add "Laptop", "Keyboard", and "Laptop" (a duplicate). Then print the list followed by its size.',
    starterCode: `import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        // TODO: Create ArrayList, add "Laptop", "Keyboard", "Laptop", print list and size
    }
}`,
    solutionCode: `import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<String> products = new ArrayList<>();
        products.add("Laptop");
        products.add("Keyboard");
        products.add("Laptop");

        System.out.println(products);
        System.out.println(products.size());
    }
}`,
    expectedOutput: `[Laptop, Keyboard, Laptop]\n3`,
    explanation: 'ArrayList maintains insertion order and permits duplicate elements. Both "Laptop" entries are retained, yielding a size of 3.',
    hints: [
      'Declare using the List interface: List<String> products = new ArrayList<>();',
      'Call products.add("Laptop") twice and products.add("Keyboard") once.',
      'Print products and products.size() with System.out.println.',
    ],
    testCases: [
      {
        description: 'Verifies ArrayList allows duplicates and retains size 3',
        expectedOutput: "[Laptop, Keyboard, Laptop]\n3",
      },
    ],
  },

  {
    id: 'ex-025-hashset-deduplication',
    number: 25,
    languageId: 'java',
    topicId: 'java-set-implementations',
    topicTitle: 'Set Implementations: HashSet, LinkedHashSet, TreeSet',
    title: 'HashSet Deduplication',
    difficulty: 'Beginner',
    task: 'Add the integers 1 through 10 to a HashSet<Integer>, then add 8 again. Print "Set size: " followed by the size, and "Contains 8: " followed by whether 8 is present.',
    starterCode: `import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) {
        // TODO: Add 1..10 to a HashSet, add 8 duplicate, and print set size & presence
    }
}`,
    solutionCode: `import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) {
        Set<Integer> ids = new HashSet<>();
        for (int i = 1; i <= 10; i++) ids.add(i);
        ids.add(8);

        System.out.println("Set size: " + ids.size());
        System.out.println("Contains 8: " + ids.contains(8));
    }
}`,
    expectedOutput: `Set size: 10\nContains 8: true`,
    explanation: 'HashSet rejects duplicates using hashCode() and equals(). Adding 8 a second time leaves the set size at 10.',
    hints: [
      'Loop from 1 to 10 and add each integer to a Set<Integer> ids = new HashSet<>();',
      'Add 8 a second time with ids.add(8);',
      'Print "Set size: " + ids.size() and "Contains 8: " + ids.contains(8).',
    ],
    testCases: [
      {
        description: 'Ensures duplicate 8 is silently rejected and size stays 10',
        expectedOutput: "Set size: 10\nContains 8: true",
      },
    ],
  },

  {
    id: 'ex-026-hashmap-orders',
    number: 26,
    languageId: 'java',
    topicId: 'java-map-implementations',
    topicTitle: 'Map: HashMap, LinkedHashMap, TreeMap, ConcurrentHashMap',
    title: 'HashMap Key-Value Storage & Update',
    difficulty: 'Beginner',
    task: 'Store order IDs (Integer) and customer names (String) in a HashMap. Put (101, "Alice") and (102, "Bob"). Update key 101 to "Alicia". Print the value for key 101 and the total map size.',
    starterCode: `import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) {
        // TODO: Create HashMap, insert orders, update order 101, print value and size
    }
}`,
    solutionCode: `import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) {
        Map<Integer, String> orders = new HashMap<>();
        orders.put(101, "Alice");
        orders.put(102, "Bob");
        orders.put(101, "Alicia");

        System.out.println(orders.get(101));
        System.out.println(orders.size());
    }
}`,
    expectedOutput: `Alicia\n2`,
    explanation: 'Map keys are unique. Re-inserting key 101 replaces the old value "Alice" with "Alicia" without increasing map size.',
    hints: [
      'Map<Integer, String> orders = new HashMap<>();',
      'orders.put(101, "Alice"); then orders.put(101, "Alicia");',
      'Print orders.get(101) and orders.size().',
    ],
    testCases: [
      {
        description: 'Tests HashMap key replacement and total size',
        expectedOutput: "Alicia\n2",
      },
    ],
  },

  {
    id: 'ex-027-treeset-sorted-ids',
    number: 27,
    languageId: 'java',
    topicId: 'java-set-implementations',
    topicTitle: 'Set Implementations: HashSet, LinkedHashSet, TreeSet',
    title: 'TreeSet Sorted Unique Elements',
    difficulty: 'Intermediate',
    task: 'Insert numbers 5, 2, 8, 2 into a TreeSet<Integer>. Print the sorted unique set.',
    starterCode: `import java.util.Set;
import java.util.TreeSet;

public class Main {
    public static void main(String[] args) {
        // TODO: Insert 5, 2, 8, 2 into a TreeSet and print
    }
}`,
    solutionCode: `import java.util.Set;
import java.util.TreeSet;

public class Main {
    public static void main(String[] args) {
        Set<Integer> numbers = new TreeSet<>();
        numbers.add(5);
        numbers.add(2);
        numbers.add(8);
        numbers.add(2);

        System.out.println(numbers);
    }
}`,
    expectedOutput: `[2, 5, 8]`,
    explanation: 'TreeSet stores elements in red-black balanced tree order, sorting them by natural ordering (ascending) and deduplicating 2.',
    hints: [
      'Use Set<Integer> numbers = new TreeSet<>();',
      'Add 5, 2, 8, 2.',
      'System.out.println(numbers); outputs [2, 5, 8].',
    ],
    testCases: [
      {
        description: 'Verifies natural ascending ordering and duplicate elimination',
        expectedOutput: "[2, 5, 8]",
      },
    ],
  },

  {
    id: 'ex-028-enhanced-for-loop',
    number: 28,
    languageId: 'java',
    topicId: 'java-enhanced-for-loop',
    topicTitle: 'Enhanced for Loop: Mechanics, Iterables, and Limitations',
    title: 'Enhanced for Loop Array Accumulator',
    difficulty: 'Beginner',
    task: 'Given an array int[] quantities = {2, 5, 3, 10}, use an enhanced for loop to calculate and print the total sum in the format "Total: 20".',
    starterCode: `public class Main {
    public static void main(String[] args) {
        int[] quantities = {2, 5, 3, 10};
        // TODO: Use enhanced for loop to sum quantities and print "Total: " + total
    }
}`,
    solutionCode: `public class Main {
    public static void main(String[] args) {
        int[] quantities = {2, 5, 3, 10};
        int total = 0;
        for (int qty : quantities) {
            total += qty;
        }
        System.out.println("Total: " + total);
    }
}`,
    expectedOutput: `Total: 20`,
    explanation: 'The enhanced for loop visits each integer element cleanly without requiring index arithmetic or bounds checking.',
    hints: [
      'Declare int total = 0;',
      'Use for (int qty : quantities) { total += qty; }',
      'Print "Total: " + total',
    ],
    testCases: [
      {
        description: 'Computes sum of quantities using enhanced for loop',
        expectedOutput: "Total: 20",
      },
    ],
  },

  {
    id: 'ex-029-iterator-safe-removal',
    number: 29,
    languageId: 'java',
    topicId: 'java-iterator-traversal',
    topicTitle: 'Iterator: Traversal, Safe Removal, and ModCount',
    title: 'Safe Iterator Removal',
    difficulty: 'Intermediate',
    task: 'Create an ArrayList with numbers 1, 2, 3, 4, 5, 6. Use an explicit Iterator<Integer> to safely remove all even numbers. Print the resulting list.',
    starterCode: `import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<Integer> list = new ArrayList<>(Arrays.asList(1, 2, 3, 4, 5, 6));
        // TODO: Use Iterator to remove even numbers safely and print list
    }
}`,
    solutionCode: `import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<Integer> list = new ArrayList<>(Arrays.asList(1, 2, 3, 4, 5, 6));
        Iterator<Integer> it = list.iterator();
        while (it.hasNext()) {
            if (it.next() % 2 == 0) {
                it.remove();
            }
        }
        System.out.println(list);
    }
}`,
    expectedOutput: `[1, 3, 5]`,
    explanation: 'it.remove() updates the iterator expectedModCount in tandem with the ArrayList modCount, avoiding ConcurrentModificationException.',
    hints: [
      'Obtain an iterator with Iterator<Integer> it = list.iterator();',
      'In a while(it.hasNext()) loop, inspect it.next() and call it.remove() if even.',
      'Print the modified list with System.out.println(list);',
    ],
    testCases: [
      {
        description: 'Safely removes even elements via Iterator.remove()',
        expectedOutput: "[1, 3, 5]",
      },
    ],
  },

  {
    id: 'ex-030-comparator-sorting',
    number: 30,
    languageId: 'java',
    topicId: 'java-comparator-sorting',
    topicTitle: 'Comparator and Sorting: Multi-Property and Lambda Sorting',
    title: 'Comparator Sorting Descending',
    difficulty: 'Intermediate',
    task: 'Sort a list of Student objects (Student1 age 25, Student2 age 22, Student3 age 23) in descending order of age using a Comparator lambda. Print each student in "name - age" format.',
    starterCode: `import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

class Student {
    String name;
    int age;
    Student(String name, int age) { this.name = name; this.age = age; }
}

public class Main {
    public static void main(String[] args) {
        List<Student> students = new ArrayList<>();
        students.add(new Student("Student1", 25));
        students.add(new Student("Student2", 22));
        students.add(new Student("Student3", 23));

        // TODO: Sort descending by age and print "name - age"
    }
}`,
    solutionCode: `import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

class Student {
    String name;
    int age;
    Student(String name, int age) { this.name = name; this.age = age; }
}

public class Main {
    public static void main(String[] args) {
        List<Student> students = new ArrayList<>();
        students.add(new Student("Student1", 25));
        students.add(new Student("Student2", 22));
        students.add(new Student("Student3", 23));

        students.sort((s1, s2) -> Integer.compare(s2.age, s1.age));

        for (Student s : students) {
            System.out.println(s.name + " - " + s.age);
        }
    }
}`,
    expectedOutput: `Student1 - 25\nStudent3 - 23\nStudent2 - 22`,
    explanation: 'Integer.compare(s2.age, s1.age) yields negative when s2 < s1, reversing natural ascending order to place highest age first.',
    hints: [
      'Call students.sort((s1, s2) -> Integer.compare(s2.age, s1.age));',
      'Or use Comparator.comparingInt((Student s) -> s.age).reversed()',
      'Loop with an enhanced for loop and print s.name + " - " + s.age',
    ],
    testCases: [
      {
        description: 'Sorts students descending by age correctly',
        expectedOutput: "Student1 - 25\nStudent3 - 23\nStudent2 - 22",
      },
    ],
  },

  {
    id: 'ex-031-stream-filter-map',
    number: 31,
    languageId: 'java',
    topicId: 'java-stream-api-pipeline',
    topicTitle: 'Stream API: Pipeline, Lazy Evaluation, and Collectors',
    title: 'Stream Filter and Transform',
    difficulty: 'Intermediate',
    task: 'Given a list of names ["Alice", "Bob", "Charlie", "David"], use Stream API to filter names with length > 4, map them to uppercase, and print each.',
    starterCode: `import java.util.Arrays;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("Alice", "Bob", "Charlie", "David");
        // TODO: Use stream filter (> 4 chars) and map to uppercase, print each
    }
}`,
    solutionCode: `import java.util.Arrays;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("Alice", "Bob", "Charlie", "David");
        names.stream()
                .filter(name -> name.length() > 4)
                .map(String::toUpperCase)
                .forEach(System.out::println);
    }
}`,
    expectedOutput: `ALICE\nCHARLIE\nDAVID`,
    explanation: 'Intermediate operations filter() and map() are lazy; terminal forEach() consumes items matching the predicate and prints them.',
    hints: [
      'Call names.stream().filter(name -> name.length() > 4)',
      '.map(String::toUpperCase) or .map(name -> name.toUpperCase())',
      '.forEach(System.out::println);',
    ],
    testCases: [
      {
        description: 'Filters names > 4 characters and converts to uppercase',
        expectedOutput: "ALICE\nCHARLIE\nDAVID",
      },
    ],
  },

  {
    id: 'ex-032-constructor-reference',
    number: 32,
    languageId: 'java',
    topicId: 'java-constructor-references',
    topicTitle: 'Constructor References: ClassName::new',
    title: 'Constructor Reference Student::new',
    difficulty: 'Intermediate',
    task: 'Given a list of names ["Alice", "Bob", "Charlie"], use a constructor reference (Student::new) in stream().map() to transform them into Student objects, then print each with forEach(System.out::println).',
    starterCode: `import java.util.List;

class Student {
    String name;
    Student(String name) { this.name = name; }
    public String toString() { return "Student: " + name; }
}

public class Main {
    public static void main(String[] args) {
        List<String> names = List.of("Alice", "Bob", "Charlie");
        // TODO: Map names to Student using Student::new and print each
    }
}`,
    solutionCode: `import java.util.List;

class Student {
    String name;
    Student(String name) { this.name = name; }
    public String toString() { return "Student: " + name; }
}

public class Main {
    public static void main(String[] args) {
        List<String> names = List.of("Alice", "Bob", "Charlie");
        List<Student> students = names.stream()
                .map(Student::new)
                .toList();

        students.forEach(System.out::println);
    }
}`,
    expectedOutput: `Student: Alice\nStudent: Bob\nStudent: Charlie`,
    explanation: 'Student::new is equivalent to name -> new Student(name), matching the Function<String, Student> parameter profile cleanly.',
    hints: [
      'Use names.stream().map(Student::new).toList()',
      'Then invoke students.forEach(System.out::println);',
    ],
    testCases: [
      {
        description: 'Constructs student objects using constructor reference',
        expectedOutput: "Student: Alice\nStudent: Bob\nStudent: Charlie",
      },
    ],
  },

  {
    id: 'ex-033-optional-sku-lookup',
    number: 33,
    languageId: 'java',
    topicId: 'java-optional-type',
    topicTitle: 'Optional<T>: Value Presence, Absence, and Null Safety',
    title: 'Optional Lookup with Fallback',
    difficulty: 'Beginner',
    task: 'Write a helper findProductName(String sku) returning Optional<String>. If sku is "SKU-101", return Optional.of("Wireless Mouse"); otherwise return Optional.empty(). In main(), look up "SKU-999" with .orElse("Product not found") and print the result.',
    starterCode: `import java.util.Optional;

public class Main {
    static Optional<String> findProductName(String sku) {
        // TODO: Return Optional.of(...) for "SKU-101", else Optional.empty()
        return Optional.empty();
    }

    public static void main(String[] args) {
        // TODO: Look up "SKU-999" with orElse("Product not found") and print
    }
}`,
    solutionCode: `import java.util.Optional;

public class Main {
    static Optional<String> findProductName(String sku) {
        if ("SKU-101".equals(sku)) {
            return Optional.of("Wireless Mouse");
        }
        return Optional.empty();
    }

    public static void main(String[] args) {
        String result = findProductName("SKU-999").orElse("Product not found");
        System.out.println(result);
    }
}`,
    expectedOutput: `Product not found`,
    explanation: 'Optional explicitly declares potential absence. findProductName("SKU-999") returns Optional.empty(), triggering orElse() fallback cleanly.',
    hints: [
      'Check if "SKU-101".equals(sku) then return Optional.of("Wireless Mouse"), else return Optional.empty().',
      'Call findProductName("SKU-999").orElse("Product not found"); and print.',
    ],
    testCases: [
      {
        description: 'Invokes orElse fallback for missing SKU key',
        expectedOutput: "Product not found",
      },
    ],
  },

  {
    id: 'ex-034-var-type-inference',
    number: 34,
    languageId: 'java',
    topicId: 'java-var-local-type-inference',
    topicTitle: 'Local Variable Type Inference (var)',
    title: 'Local Variable Type Inference with var',
    difficulty: 'Beginner',
    task: 'Declare an integer count = 10, a String name = "Suhel", and an int[] nums = new int[]{1, 2, 3} using var. Reassign count to 25. Print count, name, and nums.length on separate lines.',
    starterCode: `public class Main {
    public static void main(String[] args) {
        // TODO: Use var for count, name, and nums, update count to 25, print them
    }
}`,
    solutionCode: `public class Main {
    public static void main(String[] args) {
        var count = 10;
        var name = "Suhel";
        var nums = new int[] {1, 2, 3};

        count = 25;

        System.out.println(count);
        System.out.println(name);
        System.out.println(nums.length);
    }
}`,
    expectedOutput: `25\nSuhel\n3`,
    explanation: 'var infers int, String, and int[] statically at compile time. count can be reassigned to 25 because it matches the inferred int type.',
    hints: [
      'Use var count = 10;',
      'Use var name = "Suhel"; and var nums = new int[] {1, 2, 3};',
      'Reassign count = 25; and print with System.out.println.',
    ],
    testCases: [
      {
        description: 'Verifies static type inference with var and type preservation',
        expectedOutput: "25\nSuhel\n3",
      },
    ],
  },

  {
    id: 'ex-035-sealed-payment-hierarchy',
    number: 35,
    languageId: 'java',
    topicId: 'java-sealed-classes-interfaces',
    topicTitle: 'Sealed Classes and Interfaces',
    title: 'Sealed Class Hierarchy Implementation',
    difficulty: 'Intermediate',
    task: 'Declare a sealed class Payment that permits CardPayment and WalletPayment. Implement CardPayment as final and WalletPayment as non-sealed. Instantiate a CardPayment and print payment.getClass().getSimpleName().',
    starterCode: `// TODO: Define sealed class Payment, final CardPayment, and non-sealed WalletPayment

public class Main {
    public static void main(String[] args) {
        // TODO: Instantiate Payment payment = new CardPayment(); and print getSimpleName()
    }
}`,
    solutionCode: `sealed class Payment permits CardPayment, WalletPayment {}
final class CardPayment extends Payment {}
non-sealed class WalletPayment extends Payment {}

public class Main {
    public static void main(String[] args) {
        Payment payment = new CardPayment();
        System.out.println(payment.getClass().getSimpleName());
    }
}`,
    expectedOutput: `CardPayment`,
    explanation: 'Sealed classes require permitted direct subclasses to declare final, sealed, or non-sealed. CardPayment is final, preventing further inheritance.',
    hints: [
      'Declare sealed class Payment permits CardPayment, WalletPayment {}',
      'Declare final class CardPayment extends Payment {} and non-sealed class WalletPayment extends Payment {}',
      'Print payment.getClass().getSimpleName();',
    ],
    testCases: [
      {
        description: 'Validates sealed class declaration and permitted subclass modifiers',
        expectedOutput: "CardPayment",
      },
    ],
  },

  {
    id: 'ex-036-record-data-carrier',
    number: 36,
    languageId: 'java',
    topicId: 'java-record-classes',
    topicTitle: 'Record Classes',
    title: 'Record Data Carrier Definition',
    difficulty: 'Beginner',
    task: 'Define a record Alien with components (int age, String name). In main, create an Alien with age 5 and name "E.T.". Print alien.name(), followed by alien.age(), and then the toString() representation.',
    starterCode: `// TODO: Define record Alien

public class Main {
    public static void main(String[] args) {
        // TODO: Create Alien, print name(), age(), and alien
    }
}`,
    solutionCode: `record Alien(int age, String name) {}

public class Main {
    public static void main(String[] args) {
        var alien = new Alien(5, "E.T.");
        System.out.println(alien.name());
        System.out.println(alien.age());
        System.out.println(alien);
    }
}`,
    expectedOutput: `E.T.\n5\nAlien[age=5, name=E.T.]`,
    explanation: 'Java records synthesize canonical constructors, component accessors matching component names (alien.name()), and an informative toString().',
    hints: [
      'Define record Alien(int age, String name) {}',
      'Call alien.name() and alien.age() (no "get" prefix)',
      'System.out.println(alien) prints Alien[age=5, name=E.T.]',
    ],
    testCases: [
      {
        description: 'Tests record syntax, synthesized accessors, and toString representation',
        expectedOutput: "E.T.\n5\nAlien[age=5, name=E.T.]",
      },
    ],
  },

  {
    id: 'ex-037-maven-verify-versions',
    number: 37,
    languageId: 'java',
    topicId: 'java-maven-build-management',
    topicTitle: 'Maven — Build and Dependency Management',
    title: 'Verify Maven & JDK Environment',
    difficulty: 'Beginner',
    task: 'Write a Java simulator class MavenEnvCheck that verifies the command to inspect Apache Maven version and active JDK. In main, print the exact command used to check Maven version, followed by the environment variable that Maven requires pointing to the JDK.',
    starterCode: `public class MavenEnvCheck {
    public static void main(String[] args) {
        // TODO: Print the Maven version command (e.g. "mvn -version")
        // TODO: Print the required environment variable name (e.g. "JAVA_HOME")
    }
}`,
    solutionCode: `public class MavenEnvCheck {
    public static void main(String[] args) {
        System.out.println("mvn -version");
        System.out.println("JAVA_HOME");
    }
}`,
    expectedOutput: `mvn -version\nJAVA_HOME`,
    explanation: 'Running mvn -version outputs the Maven build, Java version, and OS architecture. Maven requires JAVA_HOME to locate the JDK compiler.',
    hints: [
      'Print "mvn -version" first.',
      'Print "JAVA_HOME" on the second line.',
    ],
    testCases: [
      {
        description: 'Validates CLI command and environment variable name',
        expectedOutput: "mvn -version\nJAVA_HOME",
      },
    ],
  },

  {
    id: 'ex-038-maven-archetype-command',
    number: 38,
    languageId: 'java',
    topicId: 'java-maven-build-management',
    topicTitle: 'Maven — Build and Dependency Management',
    title: 'Maven Archetype Scaffolding Generator',
    difficulty: 'Beginner',
    task: 'Write a class ArchetypeValidator that prints the archetype parameter used to supply the project module name (artifactId), followed by the flag used to disable interactive prompts.',
    starterCode: `public class ArchetypeValidator {
    public static void main(String[] args) {
        // TODO: Print the parameter flag for artifactId (e.g. "-DartifactId")
        // TODO: Print the flag used to run non-interactively (e.g. "-DinteractiveMode=false")
    }
}`,
    solutionCode: `public class ArchetypeValidator {
    public static void main(String[] args) {
        System.out.println("-DartifactId");
        System.out.println("-DinteractiveMode=false");
    }
}`,
    expectedOutput: `-DartifactId\n-DinteractiveMode=false`,
    explanation: '-DartifactId sets the project directory and artifact prefix. -DinteractiveMode=false executes scaffolding without prompting.',
    hints: [
      'Line 1: -DartifactId',
      'Line 2: -DinteractiveMode=false',
    ],
    testCases: [
      {
        description: 'Validates archetype CLI generation flags',
        expectedOutput: "-DartifactId\n-DinteractiveMode=false",
      },
    ],
  },

  {
    id: 'ex-039-maven-project-structure',
    number: 39,
    languageId: 'java',
    topicId: 'java-maven-build-management',
    topicTitle: 'Maven — Build and Dependency Management',
    title: 'Standard Directory Structure Paths',
    difficulty: 'Beginner',
    task: 'Write a class DirectoryStructureCheck that prints the standard Maven path for production Java source code, the standard path for application resources, and the ephemeral output directory generated during builds.',
    starterCode: `public class DirectoryStructureCheck {
    public static void main(String[] args) {
        // TODO: Print path for main java sources (src/main/java)
        // TODO: Print path for main resources (src/main/resources)
        // TODO: Print ephemeral build output directory (target/)
    }
}`,
    solutionCode: `public class DirectoryStructureCheck {
    public static void main(String[] args) {
        System.out.println("src/main/java");
        System.out.println("src/main/resources");
        System.out.println("target/");
    }
}`,
    expectedOutput: `src/main/java\nsrc/main/resources\ntarget/`,
    explanation: 'Maven convention-over-configuration defines src/main/java for code, src/main/resources for properties/configs, and target/ for build artifacts.',
    hints: [
      'Line 1: src/main/java',
      'Line 2: src/main/resources',
      'Line 3: target/',
    ],
    testCases: [
      {
        description: 'Validates standard Maven folder structure paths',
        expectedOutput: "src/main/java\nsrc/main/resources\ntarget/",
      },
    ],
  },

  {
    id: 'ex-040-maven-add-dependency',
    number: 40,
    languageId: 'java',
    topicId: 'java-maven-build-management',
    topicTitle: 'Maven — Build and Dependency Management',
    title: 'Declare Spring Core Dependency Coordinates',
    difficulty: 'Intermediate',
    task: 'In DependencyValidator, define variables for the requested Spring Core dependency: groupId "org.springframework", artifactId "spring-core", and version "6.2.12". Print them joined by colons in standard GAV coordinate format (groupId:artifactId:version).',
    starterCode: `public class DependencyValidator {
    public static void main(String[] args) {
        // TODO: Declare groupId, artifactId, and version for spring-core 6.2.12
        // TODO: Print joined as "groupId:artifactId:version"
    }
}`,
    solutionCode: `public class DependencyValidator {
    public static void main(String[] args) {
        String groupId = "org.springframework";
        String artifactId = "spring-core";
        String version = "6.2.12";
        System.out.println(groupId + ":" + artifactId + ":" + version);
    }
}`,
    expectedOutput: `org.springframework:spring-core:6.2.12`,
    explanation: 'Maven uniquely identifies libraries using GAV coordinates: GroupId:ArtifactId:Version.',
    hints: [
      'groupId is "org.springframework"',
      'artifactId is "spring-core"',
      'version is "6.2.12"',
      'Format output as: org.springframework:spring-core:6.2.12',
    ],
    testCases: [
      {
        description: 'Validates Spring Core GAV coordinate formatting',
        expectedOutput: "org.springframework:spring-core:6.2.12",
      },
    ],
  },

  {
    id: 'ex-041-maven-compile-output',
    number: 41,
    languageId: 'java',
    topicId: 'java-maven-build-management',
    topicTitle: 'Maven — Build and Dependency Management',
    title: 'Analyze mvn compile Execution Target',
    difficulty: 'Beginner',
    task: 'Create a class CompilePhaseCheck that prints the exact directory where compiled .class bytecode is placed by mvn compile, and prints "false" answering whether mvn compile creates the final .jar package.',
    starterCode: `public class CompilePhaseCheck {
    public static void main(String[] args) {
        // TODO: Print directory where .class files are compiled (target/classes)
        // TODO: Print whether compile creates the final .jar (false)
    }
}`,
    solutionCode: `public class CompilePhaseCheck {
    public static void main(String[] args) {
        System.out.println("target/classes");
        System.out.println("false");
    }
}`,
    expectedOutput: `target/classes\nfalse`,
    explanation: 'mvn compile compiles Java classes into target/classes/. It does NOT create the final JAR; creating a JAR requires running mvn package.',
    hints: [
      'Line 1: target/classes',
      'Line 2: false',
    ],
    testCases: [
      {
        description: 'Verifies compilation target directory and phase boundaries',
        expectedOutput: "target/classes\nfalse",
      },
    ],
  },

  {
    id: 'ex-042-maven-run-tests',
    number: 42,
    languageId: 'java',
    topicId: 'java-maven-build-management',
    topicTitle: 'Maven — Build and Dependency Management',
    title: 'Surefire Test Phase Execution',
    difficulty: 'Intermediate',
    task: 'Create TestPhaseCheck that prints the Maven command used to execute unit tests (mvn test), followed by the default Maven plugin responsible for running tests (maven-surefire-plugin).',
    starterCode: `public class TestPhaseCheck {
    public static void main(String[] args) {
        // TODO: Print test phase command (mvn test)
        // TODO: Print test plugin name (maven-surefire-plugin)
    }
}`,
    solutionCode: `public class TestPhaseCheck {
    public static void main(String[] args) {
        System.out.println("mvn test");
        System.out.println("maven-surefire-plugin");
    }
}`,
    expectedOutput: `mvn test\nmaven-surefire-plugin`,
    explanation: 'mvn test executes the test lifecycle phase. The maven-surefire-plugin is bound by default to execute unit tests found in src/test/java.',
    hints: [
      'Print "mvn test"',
      'Print "maven-surefire-plugin"',
    ],
    testCases: [
      {
        description: 'Verifies test command and Surefire plugin name',
        expectedOutput: "mvn test\nmaven-surefire-plugin",
      },
    ],
  },

  {
    id: 'ex-043-maven-clean-package',
    number: 43,
    languageId: 'java',
    topicId: 'java-maven-build-management',
    topicTitle: 'Maven — Build and Dependency Management',
    title: 'Clean Package Build Command',
    difficulty: 'Beginner',
    task: 'Write a class CleanPackageCheck that prints the best-practice command to perform a fresh build from scratch by deleting stale artifacts and producing a new package (mvn clean package).',
    starterCode: `public class CleanPackageCheck {
    public static void main(String[] args) {
        // TODO: Print command to clean and package
    }
}`,
    solutionCode: `public class CleanPackageCheck {
    public static void main(String[] args) {
        System.out.println("mvn clean package");
    }
}`,
    expectedOutput: `mvn clean package`,
    explanation: 'mvn clean package first invokes the clean lifecycle to delete target/, then executes validate, compile, and test before packaging.',
    hints: [
      'Print: "mvn clean package"',
    ],
    testCases: [
      {
        description: 'Verifies clean package command',
        expectedOutput: "mvn clean package",
      },
    ],
  },

  {
    id: 'ex-044-maven-package-vs-install',
    number: 44,
    languageId: 'java',
    topicId: 'java-maven-build-management',
    topicTitle: 'Maven — Build and Dependency Management',
    title: 'Compare package vs install Destinations',
    difficulty: 'Intermediate',
    task: 'Write PackageVsInstallCheck that prints the destination directory of the artifact when running mvn package (target/), followed by the destination directory when running mvn install (~/.m2/repository).',
    starterCode: `public class PackageVsInstallCheck {
    public static void main(String[] args) {
        // TODO: Print destination for mvn package (target/)
        // TODO: Print destination for mvn install (~/.m2/repository)
    }
}`,
    solutionCode: `public class PackageVsInstallCheck {
    public static void main(String[] args) {
        System.out.println("target/");
        System.out.println("~/.m2/repository");
    }
}`,
    expectedOutput: `target/\n~/.m2/repository`,
    explanation: 'mvn package outputs the archive into the project-local target/ directory. mvn install copies it into the local user cache ~/.m2/repository so other local projects can consume it.',
    hints: [
      'Line 1: target/',
      'Line 2: ~/.m2/repository',
    ],
    testCases: [
      {
        description: 'Validates destination difference between package and install',
        expectedOutput: "target/\n~/.m2/repository",
      },
    ],
  },

  {
    id: 'ex-045-maven-diagnose-pom-error',
    number: 45,
    languageId: 'java',
    topicId: 'java-maven-build-management',
    topicTitle: 'Maven — Build and Dependency Management',
    title: 'Diagnose Missing Dependency & Scope Trap',
    difficulty: 'Intermediate',
    task: 'Create PomDiagnosisCheck. Print the dependency scope that causes compilation errors if imported into production code in src/main/java (test), followed by the Maven command to print the full dependency resolution tree (mvn dependency:tree).',
    starterCode: `public class PomDiagnosisCheck {
    public static void main(String[] args) {
        // TODO: Print scope that is excluded from production classpath (test)
        // TODO: Print command to inspect transitive dependencies (mvn dependency:tree)
    }
}`,
    solutionCode: `public class PomDiagnosisCheck {
    public static void main(String[] args) {
        System.out.println("test");
        System.out.println("mvn dependency:tree");
    }
}`,
    expectedOutput: `test\nmvn dependency:tree`,
    explanation: 'Dependencies with <scope>test</scope> are isolated from src/main/java. mvn dependency:tree displays the complete hierarchy of direct and transitive dependencies.',
    hints: [
      'Line 1: test',
      'Line 2: mvn dependency:tree',
    ],
    testCases: [
      {
        description: 'Verifies scope isolation and dependency:tree diagnosis tool',
        expectedOutput: "test\nmvn dependency:tree",
      },
    ],
  },

  {
    id: 'ex-046-maven-ci-cd-pipeline',
    number: 46,
    languageId: 'java',
    topicId: 'java-maven-build-management',
    topicTitle: 'Maven — Build and Dependency Management',
    title: 'Stock Management CI/CD Build Command',
    difficulty: 'Intermediate',
    task: 'In StockCiPipelineCheck, print the Maven lifecycle phase typically executed by CI/CD pipelines to run all unit tests, packaging, and integration verification before deployment (verify), followed by the command to execute the packaged Spring Boot fat JAR (java -jar target/stock-management-1.0.0.jar).',
    starterCode: `public class StockCiPipelineCheck {
    public static void main(String[] args) {
        // TODO: Print the CI lifecycle phase (verify)
        // TODO: Print the execution command (java -jar target/stock-management-1.0.0.jar)
    }
}`,
    solutionCode: `public class StockCiPipelineCheck {
    public static void main(String[] args) {
        System.out.println("verify");
        System.out.println("java -jar target/stock-management-1.0.0.jar");
    }
}`,
    expectedOutput: `verify\njava -jar target/stock-management-1.0.0.jar`,
    explanation: 'mvn verify runs all checks and integration tests in CI. java -jar launches the packaged executable Spring Boot application.',
    hints: [
      'Line 1: verify',
      'Line 2: java -jar target/stock-management-1.0.0.jar',
    ],
    testCases: [
      {
        description: 'Validates CI pipeline phase and java -jar execution command',
        expectedOutput: "verify\njava -jar target/stock-management-1.0.0.jar",
      },
    ],
  },

  {
    id: 'ex-047-gradle-bootrun-command',
    number: 47,
    languageId: 'java',
    topicId: 'java-gradle-build-tool',
    topicTitle: 'Gradle — Modern Build Tool & Groovy DSL',
    title: 'Execute Gradle BootRun & Inspect State',
    difficulty: 'Beginner',
    task: 'Write a class GradleBootRunSim that simulates executing a Spring Boot application using the Gradle wrapper. In main(), print the exact CLI command on Linux/macOS to start the development server using Gradle wrapper (./gradlew bootRun), followed by the Gradle task state when execution succeeds without re-compilation (:bootRun UP-TO-DATE).',
    starterCode: `public class GradleBootRunSim {
    public static void main(String[] args) {
        // TODO: Print the wrapper command to run a Spring Boot app (./gradlew bootRun)
        // TODO: Print the UP-TO-DATE task output state (:bootRun UP-TO-DATE)
    }
}`,
    solutionCode: `public class GradleBootRunSim {
    public static void main(String[] args) {
        System.out.println("./gradlew bootRun");
        System.out.println(":bootRun UP-TO-DATE");
    }
}`,
    expectedOutput: `./gradlew bootRun\n:bootRun UP-TO-DATE`,
    explanation: 'The Gradle wrapper ensures consistent builds across environments. When task inputs and outputs have not changed, Gradle marks the task as UP-TO-DATE and avoids redundant work.',
    hints: [
      'Line 1: ./gradlew bootRun',
      'Line 2: :bootRun UP-TO-DATE',
    ],
    testCases: [
      {
        description: 'Verifies Gradle wrapper bootRun command and task status',
        expectedOutput: "./gradlew bootRun\n:bootRun UP-TO-DATE",
      },
    ],
  },

  {
    id: 'ex-048-spring-boot-rest-controller',
    number: 48,
    languageId: 'java',
    topicId: 'java-spring-boot-overview',
    topicTitle: 'Spring Boot Overview & Initializr Setup',
    title: 'Spring Boot REST Controller Simulation',
    difficulty: 'Beginner',
    task: 'Create a class HelloControllerSim that simulates a Spring Boot REST endpoint. Implement a public String hello() method that returns "Hello, Spring Boot World!". In main(), instantiate HelloControllerSim, call hello(), and print the response.',
    starterCode: `public class HelloControllerSim {
    public String hello() {
        // TODO: Return "Hello, Spring Boot World!"
        return "";
    }

    public static void main(String[] args) {
        // TODO: Instantiate and print result of hello()
    }
}`,
    solutionCode: `public class HelloControllerSim {
    public String hello() {
        return "Hello, Spring Boot World!";
    }

    public static void main(String[] args) {
        HelloControllerSim controller = new HelloControllerSim();
        System.out.println(controller.hello());
    }
}`,
    expectedOutput: `Hello, Spring Boot World!`,
    explanation: 'In Spring Boot, methods annotated with @GetMapping inside a @RestController return response bodies directly serialized to the HTTP client (defaulting to Jackson JSON or plain text).',
    hints: [
      'Return "Hello, Spring Boot World!" from hello()',
      'In main, create new HelloControllerSim() and print controller.hello()',
    ],
    testCases: [
      {
        description: 'Simulates invoking a Spring Boot REST controller endpoint',
        expectedOutput: "Hello, Spring Boot World!",
      },
    ],
  },

  {
    id: 'ex-049-junit5-assertions',
    number: 49,
    languageId: 'java',
    topicId: 'java-junit5-testing',
    topicTitle: 'Unit Testing with JUnit 5 (Jupiter)',
    title: 'JUnit 5 Assertion Pattern Simulator',
    difficulty: 'Beginner',
    task: 'Write a class CalculatorTestSim that simulates JUnit 5\'s Assertions.assertEquals(expected, actual). Implement a static int add(int a, int b) method. In main(), compute int actual = add(15, 25), and int expected = 40. If expected equals actual, print "ASSERTION PASSED: 40 == 40", otherwise print "ASSERTION FAILED".',
    starterCode: `public class CalculatorTestSim {
    static int add(int a, int b) {
        // TODO: Return sum of a and b
        return 0;
    }

    public static void main(String[] args) {
        // TODO: Verify add(15, 25) == 40 and print "ASSERTION PASSED: 40 == 40"
    }
}`,
    solutionCode: `public class CalculatorTestSim {
    static int add(int a, int b) {
        return a + b;
    }

    public static void main(String[] args) {
        int expected = 40;
        int actual = add(15, 25);
        if (expected == actual) {
            System.out.println("ASSERTION PASSED: " + expected + " == " + actual);
        } else {
            System.out.println("ASSERTION FAILED");
        }
    }
}`,
    expectedOutput: `ASSERTION PASSED: 40 == 40`,
    explanation: 'JUnit 5 Assertions.assertEquals(expected, actual) compares the expected test specification with the actual execution result, throwing AssertionFailedError on divergence.',
    hints: [
      'Implement add to return a + b;',
      'Check if expected == actual and print "ASSERTION PASSED: 40 == 40"',
    ],
    testCases: [
      {
        description: 'Simulates standard AAA assertion behavior with expected vs actual',
        expectedOutput: "ASSERTION PASSED: 40 == 40",
      },
    ],
  },

  {
    id: 'ex-050-dsa-binary-search',
    number: 50,
    languageId: 'java',
    topicId: 'java-dsa-searching-algorithms',
    topicTitle: 'Searching Algorithms: Linear vs Binary Search',
    title: 'Binary Search with Overflow-Safe Midpoint',
    difficulty: 'Intermediate',
    task: 'Implement binary search to find target 42 in sorted array {5, 12, 19, 27, 42, 68, 91}. Use the overflow-safe midpoint calculation int mid = low + (high - low) / 2. Print "Found target 42 at index: " + index.',
    starterCode: `public class BinarySearchSim {
    static int binarySearch(int[] arr, int target) {
        // TODO: Implement binary search with low + (high - low) / 2
        return -1;
    }

    public static void main(String[] args) {
        int[] sorted = {5, 12, 19, 27, 42, 68, 91};
        int index = binarySearch(sorted, 42);
        System.out.println("Found target 42 at index: " + index);
    }
}`,
    solutionCode: `public class BinarySearchSim {
    static int binarySearch(int[] arr, int target) {
        int low = 0;
        int high = arr.length - 1;

        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (arr[mid] == target) {
                return mid;
            } else if (arr[mid] < target) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        return -1;
    }

    public static void main(String[] args) {
        int[] sorted = {5, 12, 19, 27, 42, 68, 91};
        int index = binarySearch(sorted, 42);
        System.out.println("Found target 42 at index: " + index);
    }
}`,
    expectedOutput: `Found target 42 at index: 4`,
    explanation: 'Binary search halves the search space each iteration, running in O(log n) time. Using low + (high - low) / 2 prevents 32-bit signed integer overflow when low + high exceeds Integer.MAX_VALUE.',
    hints: [
      'Initialize low = 0, high = arr.length - 1',
      'Loop while low <= high',
      'Compute mid = low + (high - low) / 2',
      'Adjust low or high accordingly',
    ],
    testCases: [
      {
        description: 'Locates element in sorted array using binary search',
        expectedOutput: "Found target 42 at index: 4",
      },
    ],
  },

  {
    id: 'ex-051-dsa-array-traversal',
    number: 51,
    languageId: 'java',
    topicId: 'java-dsa-arrays',
    topicTitle: 'Arrays: Memory Model & Operations',
    title: 'Array Linear Traversal & Maximum Element',
    difficulty: 'Beginner',
    task: 'Write a class ArrayMaxFinder. Given the array {15, 82, 34, 99, 47, 61}, iterate through the elements to find the maximum integer. Print "Maximum element: " + max.',
    starterCode: `public class ArrayMaxFinder {
    public static void main(String[] args) {
        int[] numbers = {15, 82, 34, 99, 47, 61};
        // TODO: Find maximum element and print "Maximum element: 99"
    }
}`,
    solutionCode: `public class ArrayMaxFinder {
    public static void main(String[] args) {
        int[] numbers = {15, 82, 34, 99, 47, 61};
        int max = numbers[0];
        for (int i = 1; i < numbers.length; i++) {
            if (numbers[i] > max) {
                max = numbers[i];
            }
        }
        System.out.println("Maximum element: " + max);
    }
}`,
    expectedOutput: `Maximum element: 99`,
    explanation: 'A linear scan touches every element exactly once in O(n) time and O(1) auxiliary space, comparing against the running maximum.',
    hints: [
      'Initialize max = numbers[0]',
      'Iterate through the array and update max if numbers[i] > max',
      'Print "Maximum element: " + max',
    ],
    testCases: [
      {
        description: 'Finds maximum integer in an array',
        expectedOutput: "Maximum element: 99",
      },
    ],
  },

  {
    id: 'ex-052-dsa-linked-list-insert',
    number: 52,
    languageId: 'java',
    topicId: 'java-dsa-linked-lists',
    topicTitle: 'Linked Lists: Singly, Doubly, and Circular',
    title: 'Singly Linked List Prepend Operation',
    difficulty: 'Intermediate',
    task: 'Implement a singly linked list with Node(int val, Node next). Write an insertAtHead(int val) method. Insert 30, then 20, then 10 at the head. Traverse and print all elements joined by " -> " ending with "null" (10 -> 20 -> 30 -> null).',
    starterCode: `public class SinglyLinkedListSim {
    static class Node {
        int val;
        Node next;
        Node(int val) { this.val = val; }
    }

    static Node head = null;

    static void insertAtHead(int val) {
        // TODO: Insert node with val at the head of the list
    }

    public static void main(String[] args) {
        insertAtHead(30);
        insertAtHead(20);
        insertAtHead(10);

        // TODO: Traverse and print: "10 -> 20 -> 30 -> null"
    }
}`,
    solutionCode: `public class SinglyLinkedListSim {
    static class Node {
        int val;
        Node next;
        Node(int val) { this.val = val; }
    }

    static Node head = null;

    static void insertAtHead(int val) {
        Node newNode = new Node(val);
        newNode.next = head;
        head = newNode;
    }

    public static void main(String[] args) {
        insertAtHead(30);
        insertAtHead(20);
        insertAtHead(10);

        Node curr = head;
        StringBuilder sb = new StringBuilder();
        while (curr != null) {
            sb.append(curr.val).append(" -> ");
            curr = curr.next;
        }
        sb.append("null");
        System.out.println(sb.toString());
    }
}`,
    expectedOutput: `10 -> 20 -> 30 -> null`,
    explanation: 'Prepending a node to the head of a linked list takes O(1) constant time, requiring only pointing the new node\'s next pointer to the current head and updating the head reference.',
    hints: [
      'In insertAtHead: Node newNode = new Node(val); newNode.next = head; head = newNode;',
      'Traverse using a while loop: curr != null',
      'Append " -> " after each element and terminate with "null"',
    ],
    testCases: [
      {
        description: 'Prepends elements to linked list head and prints traversal',
        expectedOutput: "10 -> 20 -> 30 -> null",
      },
    ],
  },

  {
    id: 'ex-053-dsa-stack-parentheses',
    number: 53,
    languageId: 'java',
    topicId: 'java-dsa-stacks',
    topicTitle: 'Stacks: LIFO Principle & Applications',
    title: 'Balanced Parentheses with ArrayDeque',
    difficulty: 'Intermediate',
    task: 'Use java.util.ArrayDeque as a LIFO stack to determine if bracket strings are balanced. In main(), check "({[]})" and "([)]". Print true for the first and false for the second on separate lines.',
    starterCode: `import java.util.ArrayDeque;
import java.util.Deque;

public class BalancedParenthesesSim {
    static boolean isBalanced(String s) {
        // TODO: Implement balanced parentheses validation using Deque
        return false;
    }

    public static void main(String[] args) {
        System.out.println(isBalanced("({[]})"));
        System.out.println(isBalanced("([)]"));
    }
}`,
    solutionCode: `import java.util.ArrayDeque;
import java.util.Deque;

public class BalancedParenthesesSim {
    static boolean isBalanced(String s) {
        Deque<Character> stack = new ArrayDeque<>();
        for (char ch : s.toCharArray()) {
            if (ch == '(' || ch == '{' || ch == '[') {
                stack.push(ch);
            } else {
                if (stack.isEmpty()) return false;
                char top = stack.pop();
                if ((ch == ')' && top != '(') ||
                    (ch == '}' && top != '{') ||
                    (ch == ']' && top != '[')) {
                    return false;
                }
            }
        }
        return stack.isEmpty();
    }

    public static void main(String[] args) {
        System.out.println(isBalanced("({[]})"));
        System.out.println(isBalanced("([)]"));
    }
}`,
    expectedOutput: `true\nfalse`,
    explanation: 'A stack validates nested bracket structures in O(n) time and O(n) space. Java\'s ArrayDeque is non-synchronized and faster than legacy Stack.',
    hints: [
      'Push opening brackets onto stack',
      'When seeing a closing bracket, check if stack is empty or top does not match',
      'Return stack.isEmpty() at the end',
    ],
    testCases: [
      {
        description: 'Tests balanced vs unbalanced bracket sequences with ArrayDeque',
        expectedOutput: "true\nfalse",
      },
    ],
  },

  {
    id: 'ex-054-dsa-bst-inorder-traversal',
    number: 54,
    languageId: 'java',
    topicId: 'java-dsa-trees-and-bst',
    topicTitle: 'Trees & Binary Search Trees (BST)',
    title: 'BST In-Order Traversal (Sorted Sequence)',
    difficulty: 'Intermediate',
    task: 'Construct a Binary Search Tree with root 50, left child 30 (with children 20 and 40), and right child 70 (with children 60 and 80). Implement an in-order traversal (Left, Root, Right) and print the numbers separated by spaces on a single line.',
    starterCode: `public class BstInOrderSim {
    static class TreeNode {
        int val;
        TreeNode left, right;
        TreeNode(int val) { this.val = val; }
    }

    static void inOrder(TreeNode root) {
        // TODO: In-order traversal (Left, Root, Right) printing val + " "
    }

    public static void main(String[] args) {
        TreeNode root = new TreeNode(50);
        root.left = new TreeNode(30);
        root.right = new TreeNode(70);
        root.left.left = new TreeNode(20);
        root.left.right = new TreeNode(40);
        root.right.left = new TreeNode(60);
        root.right.right = new TreeNode(80);

        inOrder(root);
        System.out.println();
    }
}`,
    solutionCode: `public class BstInOrderSim {
    static class TreeNode {
        int val;
        TreeNode left, right;
        TreeNode(int val) { this.val = val; }
    }

    static void inOrder(TreeNode root) {
        if (root == null) return;
        inOrder(root.left);
        System.out.print(root.val + " ");
        inOrder(root.right);
    }

    public static void main(String[] args) {
        TreeNode root = new TreeNode(50);
        root.left = new TreeNode(30);
        root.right = new TreeNode(70);
        root.left.left = new TreeNode(20);
        root.left.right = new TreeNode(40);
        root.right.left = new TreeNode(60);
        root.right.right = new TreeNode(80);

        inOrder(root);
        System.out.println();
    }
}`,
    expectedOutput: `20 30 40 50 60 70 80 `,
    explanation: 'An in-order traversal on a Binary Search Tree always visits elements in ascending sorted order: Left Subtree (< root), Root, Right Subtree (> root).',
    hints: [
      'Base condition: if (root == null) return;',
      'Recurse on root.left, print root.val + " ", recurse on root.right',
    ],
    testCases: [
      {
        description: 'Visits BST nodes in ascending sorted order via in-order traversal',
        expectedOutput: "20 30 40 50 60 70 80 \n",
      },
    ],
  },
];





