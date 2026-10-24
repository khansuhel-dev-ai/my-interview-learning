import { Topic } from '../../types';

export const MODERN_JAVA_TOPICS: Topic[] = [
  {
    id: 'java-var-local-type-inference',
    codeNumber: 'JAVA-054',
    languageId: 'java',
    title: 'Local Variable Type Inference (var)',
    slug: 'local-variable-type-inference-var',
    category: 'Modern Java Language Features',
    subcategory: 'Type System & Inference',
    summary: 'Master local variable type inference introduced in Java 10. Understand compile-time type deduction, supported vs restricted contexts, and best practices for readability.',
    order: 45,
    estimatedMinutes: 11,
    learningObjectives: [
      'Explain how var infers static types at compile time without making Java dynamically typed.',
      'Identify valid contexts: local variables inside methods, constructors, code blocks, and enhanced for loops.',
      'Recognize restricted contexts: instance/static fields, method parameters, return types, and uninitialized declarations.',
      'Explain why var cannot be initialized with bare null or raw array initializers without target types.',
      'Apply var effectively to eliminate boilerplate without compromising code clarity.',
    ],
    whyItMatters: 'Java 10 var is standard in modern codebases. Interviewers test whether candidates understand that var is strictly compile-time syntactic sugar that preserves 100% static type safety and bytecode compatibility.',
    sections: [
      {
        id: 'var-overview',
        title: 'Static Typing Preserved at Compile Time',
        content: 'Introduced in Java 10, the `var` reserved type name lets the Java compiler infer the concrete type of a local variable from its initialization expression. Java remains completely statically typed:\n\n• The variable receives a fixed, immutable type chosen by javac during compilation.\n• You cannot assign an incompatible type later.\n• `var` is not a keyword (it is a reserved type name), meaning existing variables or methods named `var` remain backward-compatible.',
        bullets: [
          'Compile-Time Inference: `var i = 10;` is compiled into `int i = 10;` in bytecode with zero runtime overhead.',
          'Static Type Locking: Once inferred, the type cannot change. `i = "20";` results in a compile-time error.',
          'Not Dynamic: Unlike JavaScript `let`/`var` or Python variables, Java variables declared with `var` cannot change types at runtime.',
        ],
        snippet: {
          language: 'java',
          filename: 'VarDemo.java',
          code: `public class VarDemo {
    public static void main(String[] args) {
        var count = 10;                      // Inferred as int
        var name = "Suhel";                  // Inferred as String
        var numbers = new int[] {1, 2, 3};   // Inferred as int[]

        // Valid reassignment (same type):
        count = 25;

        // Incompatible reassignment produces compile-time error:
        // count = "Twenty-Five"; // Error: String cannot be converted to int

        System.out.println(name + " has count: " + count);
        System.out.println("Array length: " + numbers.length);
    }
}`,
          output: `Suhel has count: 25
Array length: 3`,
          explanation: 'javac inspects the right-hand expression to infer the exact type. In the compiled .class file, count is a primitive int and name is a java.lang.String.',
        },
      },
      {
        id: 'valid-vs-invalid-contexts',
        title: 'Where var Is Allowed vs Prohibited',
        content: '`var` can only be used where the compiler has immediate, unambiguous local context to determine the type:',
        table: {
          headers: ['Context', 'Allowed?', 'Example / Reason'],
          rows: [
            ['Local variables in methods', 'Yes', '`var total = 99.50;` (inferred as double)'],
            ['Enhanced for loops', 'Yes', '`for (var item : list) { ... }`'],
            ['Traditional for loops', 'Yes', '`for (var i = 0; i < 10; i++) { ... }`'],
            ['Try-with-resources', 'Yes', '`try (var in = new FileInputStream(...)) { ... }`'],
            ['Class instance/static fields', 'No', '`class Order { var total = 0; }` (compile error)'],
            ['Method parameter types', 'No', '`public void process(var data)` (prohibited)'],
            ['Method return types', 'No', '`public var calculate()` (prohibited)'],
            ['Without initializer', 'No', '`var x;` (compiler cannot infer type without a value)'],
            ['Initialized with null', 'No', '`var x = null;` (null has no specific type alone)'],
            ['Array bare initializer', 'No', '`var arr = {1, 2, 3};` (needs `new int[] {1, 2, 3}`)'],
            ['Raw lambda without cast', 'No', '`var task = () -> {};` (lambda needs target SAM interface)'],
          ],
        },
      },
      {
        id: 'best-practices',
        title: 'When to Use and When to Avoid var',
        content: '`var` should enhance readability, not obscure meaning:',
        bullets: [
          '**Use when type is obvious:** `var list = new ArrayList<Map<String, List<Order>>>();` eliminates repetitive type signatures cleanly.',
          '**Use with factory methods:** `var connection = Database.getConnection();` is concise when domain conventions are well understood.',
          '**Avoid when type is opaque:** `var result = service.execute();` makes reviewing code difficult without an IDE. Prefer explicit types when the return type is not readily apparent.',
          '**Avoid with primitive casts:** `var x = (byte) 0;` is less clear than `byte x = 0;`.',
        ],
      },
    ],
    commonMistakes: [
      {
        mistake: 'Assuming var turns Java into a dynamically typed language like JavaScript',
        fix: 'var is purely compile-time static type inference. The bytecode generated is identical to explicitly typed variable declarations.',
      },
      {
        mistake: 'Trying to declare instance variables or method arguments using var',
        fix: 'var is strictly restricted to local variables inside methods, constructors, and blocks.',
      },
      {
        mistake: 'Declaring var without an immediate initializer: var count; count = 10;',
        fix: 'The compiler requires an initializer on the same declaration line to determine the type.',
      },
    ],
    keyTakeaways: [
      'Introduced in Java 10 for local variable type inference.',
      'Java remains 100% statically typed; inferred types cannot change after declaration.',
      'Allowed for local variables, loop counters, and try-with-resources.',
      'Prohibited on class fields, method parameters, and method return types.',
      'Requires an unambiguous initializer; cannot be initialized with bare null or raw lambda without cast.',
    ],
    relatedTopicIds: ['java-002-primitives-types', 'java-enhanced-for-loop', 'java-collection-framework-intro'],
    exerciseIds: ['ex-034-var-type-inference'],
    interviewQuestionIds: ['q-095-does-var-make-java-dynamic', 'q-096-can-var-be-used-on-fields', 'q-097-why-must-var-be-initialized', 'q-104-java-versions-for-modern-features'],
    keywords: ['var', 'local variable type inference', 'java 10', 'static typing', 'compile-time deduction', 'type inference'],
  },

  {
    id: 'java-sealed-classes-interfaces',
    codeNumber: 'JAVA-055',
    languageId: 'java',
    title: 'Sealed Classes and Interfaces',
    slug: 'sealed-classes-and-interfaces',
    category: 'Modern Java Language Features',
    subcategory: 'Type Hierarchies & Pattern Matching',
    summary: 'Understand sealed classes and interfaces finalized in Java 17. Control inheritance hierarchies with precision using permits, final, sealed, and non-sealed modifiers.',
    order: 46,
    estimatedMinutes: 13,
    learningObjectives: [
      'Differentiate final (no subclasses) from sealed (controlled permitted subclasses).',
      'Declare sealed classes and interfaces using the permits clause.',
      'Apply the three mandatory modifier requirements for direct permitted subclasses: final, sealed, or non-sealed.',
      'Explain how sealed types enable compiler-verified exhaustive pattern matching without default branches.',
      'Model closed domain hierarchies such as payment gateways, delivery types, and state machines.',
    ],
    whyItMatters: 'Sealed classes are foundational for modern domain-driven design and algebraic data types (ADTs) in Java. They enable compilers to verify that all possible subtypes are handled in pattern matching switch statements.',
    sections: [
      {
        id: 'sealed-motivation',
        title: 'Why Sealed Classes?',
        content: 'Historically, Java provided only two extremes for class inheritance:\n\n1. **Unrestricted inheritance:** Any class in any package can extend your class (unless package-private).\n2. **Total prohibition (`final`):** No class can extend your class anywhere.\n\n`sealed` introduces the critical middle ground: **controlled inheritance**. A sealed class or interface declares exactly which direct subclasses are permitted to extend or implement it.',
        bullets: [
          '**final:** Zero subclasses permitted.',
          '**sealed:** Only explicitly listed direct subclasses via `permits` are allowed.',
          '**non-sealed:** Explicitly re-opens an inheritance branch for unrestricted extension.',
        ],
      },
      {
        id: 'sealed-syntax-and-rules',
        title: 'Syntax and Subclass Requirements',
        content: 'Every direct permitted subclass of a sealed class MUST declare exactly one of three modifiers:\n\n1. `final`: Prevents any further inheritance down this branch.\n2. `sealed`: Continues sealing and specifies its own permitted direct subtypes.\n3. `non-sealed`: Explicitly opens this branch so any arbitrary class can extend it.',
        snippet: {
          language: 'java',
          filename: 'PaymentSystem.java',
          code: `// Sealed base class specifying allowed payment types:
public sealed class Payment permits CardPayment, WalletPayment, BankTransferPayment {
}

// 1. final subclass: cannot be extended further
public final class CardPayment extends Payment {
}

// 2. non-sealed subclass: re-opened for arbitrary extension
public non-sealed class WalletPayment extends Payment {
}

// Arbitrary class extending the non-sealed branch:
public class ApplePayWallet extends WalletPayment {
}

// 3. sealed subclass: continues restricted inheritance
public sealed class BankTransferPayment extends Payment permits WireTransfer {
}

public final class WireTransfer extends BankTransferPayment {
}

public class Main {
    public static void main(String[] args) {
        Payment p1 = new CardPayment();
        Payment p2 = new ApplePayWallet();

        System.out.println("Payment 1 type: " + p1.getClass().getSimpleName());
        System.out.println("Payment 2 type: " + p2.getClass().getSimpleName());
    }
}`,
          output: `Payment 1 type: CardPayment
Payment 2 type: ApplePayWallet`,
          explanation: 'CardPayment is terminal (final). WalletPayment is non-sealed, enabling ApplePayWallet to extend it cleanly.',
        },
      },
      {
        id: 'sealed-interfaces',
        title: 'Sealed Interfaces & Pattern Matching',
        content: 'Interfaces can also be sealed, restricting which classes or interfaces may implement or extend them:',
        snippet: {
          language: 'java',
          filename: 'Delivery.java',
          code: `public sealed interface Delivery permits HomeDelivery, StorePickup {
}

public final class HomeDelivery implements Delivery {
    public String address() { return "123 Elm St"; }
}

public final class StorePickup implements Delivery {
    public String storeId() { return "STORE-99"; }
}`,
          output: '',
          explanation: 'Sealed interfaces allow modern switch pattern matching (Java 17+) to be exhaustive without requiring an artificial default branch.',
        },
        table: {
          headers: ['Modifier', 'Meaning', 'Subclassing Allowed?'],
          rows: [
            ['final', 'Terminal class; closes hierarchy completely', 'No subclasses allowed'],
            ['sealed', 'Continues controlled inheritance with permits clause', 'Only declared permitted subclasses'],
            ['non-sealed', 'Re-opens hierarchy for that specific branch', 'Any class may extend it'],
          ],
        },
      },
    ],
    commonMistakes: [
      {
        mistake: 'Permitted direct subclass forgetting to declare final, sealed, or non-sealed',
        fix: 'Every direct permitted subclass of a sealed class MUST explicitly declare either final, sealed, or non-sealed. Omitting all three causes a compile error.',
      },
      {
        mistake: 'Placing permitted subclasses in different unnamed packages without module rules',
        fix: 'Permitted subclasses must belong to the same package (if in unnamed module) or same named JPMS module.',
      },
    ],
    keyTakeaways: [
      'Finalized as a permanent feature in Java 17 (JEP 409).',
      'Provides controlled inheritance between open inheritance and final prohibition.',
      'Permitted subtypes are declared via permits clause.',
      'Direct subclasses must be declared final, sealed, or non-sealed.',
      'Enables compiler-enforced exhaustive pattern matching in switch statements without default branches.',
    ],
    relatedTopicIds: ['java-008-inheritance', 'java-017-final-keyword', 'java-013-interfaces'],
    exerciseIds: ['ex-035-sealed-payment-hierarchy'],
    interviewQuestionIds: ['q-098-final-vs-sealed-classes', 'q-099-subclasses-of-sealed-class-modifiers', 'q-100-can-sealed-have-non-sealed-child', 'q-104-java-versions-for-modern-features'],
    keywords: ['sealed classes', 'sealed interfaces', 'permits', 'final', 'non-sealed', 'java 17', 'algebraic data types', 'exhaustive switch'],
  },

  {
    id: 'java-record-classes',
    codeNumber: 'JAVA-056',
    languageId: 'java',
    title: 'Record Classes',
    slug: 'record-classes',
    category: 'Modern Java Language Features',
    subcategory: 'Data-Carrier Types',
    summary: 'Master Java 16 record classes for concise, immutable data-carrier modeling. Understand canonical constructors, generated accessors, custom methods, and shallow vs deep immutability.',
    order: 47,
    estimatedMinutes: 14,
    learningObjectives: [
      'Define records as immutable, transparent data-carrier classes introduced permanently in Java 16.',
      'Explain what Java automatically synthesizes: canonical constructor, private final fields, accessors, equals(), hashCode(), and toString().',
      'Recognize accessor naming convention: component() (e.g. name()) rather than traditional getter getName().',
      'Differentiate shallow immutability from deep immutability when record components reference mutable objects.',
      'Declare static fields, static methods, instance methods, and compact constructors in records.',
    ],
    whyItMatters: 'Records eliminate hundreds of lines of boilerplate POJO code (Lombok replacement) while enforcing shallow immutability and value-based equality. They are central to modern Java API modeling, DTOs, and pattern matching.',
    sections: [
      {
        id: 'record-syntax',
        title: 'Concise Data Modeling with Records',
        content: 'Prior to Java 16, creating a simple immutable data carrier required dozens of lines of repetitive boilerplate: private final fields, constructors, getters, `equals()`, `hashCode()`, and `toString()`.\n\nA `record` defines all of this in a single line:',
        snippet: {
          language: 'java',
          filename: 'AlienRecord.java',
          code: `// Single-line immutable data carrier:
public record Alien(int age, String name) {
}

public class Main {
    public static void main(String[] args) {
        var a1 = new Alien(5, "E.T.");
        var a2 = new Alien(10, "Yoda");
        var a3 = new Alien(5, "E.T.");

        // Generated component accessors (name(), not getName()):
        System.out.println("Name: " + a1.name());
        System.out.println("Age: " + a1.age());

        // Generated toString():
        System.out.println("String representation: " + a1);

        // Value-based equality (equals() and hashCode()):
        System.out.println("a1.equals(a2): " + a1.equals(a2)); // false
        System.out.println("a1.equals(a3): " + a1.equals(a3)); // true
    }
}`,
          output: `Name: E.T.
Age: 5
String representation: Alien[age=5, name=E.T.]
a1.equals(a2): false
a1.equals(a3): true`,
          explanation: 'Notice that accessor methods match component names directly: a1.name() instead of a1.getName().',
        },
      },
      {
        id: 'record-capabilities',
        title: 'Custom Methods, Static Fields, and Compact Constructors',
        content: 'Records can include additional logic, validations, and helper methods:',
        bullets: [
          '**Static Fields & Methods:** Permitted freely (e.g. `static String species = "Unknown";`).',
          '**Instance Methods:** Permitted (e.g. formatted labels or computed business properties).',
          '**Compact Constructor:** Omits parameter lists for clean argument validation or normalization.',
          '**Prohibited:** Records CANNOT declare additional non-static instance fields beyond record components.',
          '**Implicitly Final:** Records extend `java.lang.Record` and are implicitly `final`. They cannot extend other classes or be extended.',
        ],
        snippet: {
          language: 'java',
          filename: 'OrderSummary.java',
          code: `public record OrderSummary(String orderId, double amount, String status) {
    // Static field:
    public static final String CURRENCY = "USD";

    // Compact constructor for input validation:
    public OrderSummary {
        if (amount < 0) {
            throw new IllegalArgumentException("Amount cannot be negative");
        }
        status = status.toUpperCase(); // Normalizes status
    }

    // Instance method:
    public String formattedTotal() {
        return CURRENCY + " " + String.format("%.2f", amount);
    }
}

public class Main {
    public static void main(String[] args) {
        var order = new OrderSummary("ORD-101", 149.99, "confirmed");
        System.out.println(order.formattedTotal());
        System.out.println("Status: " + order.status());
    }
}`,
          output: `USD 149.99
Status: CONFIRMED`,
          explanation: 'The compact constructor automatically assigns normalized fields to record components after validation.',
        },
      },
      {
        id: 'record-vs-class',
        title: 'Record vs Regular Class Comparison',
        content: 'Records are purpose-built to model immutable data carriers concisely, providing key architectural differences compared to general-purpose classes:',
        table: {
          headers: ['Feature', 'Record Class', 'Regular Class'],
          rows: [
            ['Main Purpose', 'Transparent data carrier / immutable state', 'General-purpose state and behavior'],
            ['Boilerplate', 'Constructors, accessors, equals/hashCode generated', 'Manually authored or Lombok required'],
            ['Component Fields', 'Implicitly private and final', 'Can be public/protected/private, mutable or final'],
            ['Accessor Convention', '`name()` (matches component name)', '`getName()` (JavaBeans standard)'],
            ['Class Inheritance', 'Implicitly final; cannot extend another class', 'Can extend another class unless declared final'],
            ['Interfaces', 'Can implement multiple interfaces', 'Can implement multiple interfaces'],
            ['Instance Fields', 'Only record components allowed', 'Any arbitrary non-static fields allowed'],
            ['Immutability', 'Shallow immutability (fields final, referenced objects may mutate)', 'Depends on implementation'],
          ],
        },
      },
      {
        id: 'shallow-immutability',
        title: 'Shallow vs Deep Immutability Catch',
        content: 'A classic senior interview question:\n\nIf a record has a component `List<String> tags`, the reference `tags` cannot be reassigned because it is final. However, if callers mutate the list directly (`tags.add("new")`), the internal state changes! To achieve deep immutability, pass an unmodifiable defensive copy in a compact constructor: `tags = List.copyOf(tags);`.',
      },
    ],
    commonMistakes: [
      {
        mistake: 'Calling order.getOrderId() instead of order.orderId()',
        fix: 'Record accessors match component names directly: order.orderId().',
      },
      {
        mistake: 'Trying to add a private non-static instance variable inside a record body',
        fix: 'Records can only store state in their declared record components; extra instance fields are prohibited by the compiler.',
      },
      {
        mistake: 'Assuming records provide deep immutability for mutable collections or objects',
        fix: 'Records provide shallow immutability (final references). Mutable objects held by references can still be mutated unless defensively copied.',
      },
    ],
    keyTakeaways: [
      'Finalized as a permanent feature in Java 16 (JEP 395).',
      'Synthesizes canonical constructor, accessors, equals(), hashCode(), and toString().',
      'Accessor methods use componentName() syntax (not getName()).',
      'Implicitly final; extends java.lang.Record; cannot extend other classes.',
      'Shallow immutability: use defensive copies (List.copyOf) for deep collection immutability.',
    ],
    relatedTopicIds: ['java-003-classes-objects', 'java-010-constructors', 'java-020-tostring-hashcode-equals', 'java-var-local-type-inference'],
    exerciseIds: ['ex-036-record-data-carrier'],
    interviewQuestionIds: ['q-101-why-use-record-vs-class', 'q-102-can-record-have-methods-and-static-fields', 'q-103-are-records-deeply-immutable', 'q-104-java-versions-for-modern-features'],
    keywords: ['record', 'record classes', 'java 16', 'shallow immutability', 'compact constructor', 'canonical constructor', 'data carrier'],
  },
];
