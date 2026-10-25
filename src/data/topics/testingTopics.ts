import { Topic } from '../../types';

export const TESTING_TOPICS: Topic[] = [
  {
    id: 'java-junit-5-jupiter-testing',
    codeNumber: 'JAVA-060',
    languageId: 'java',
    title: 'JUnit 5 (Jupiter) Testing Architecture, Assertions & Annotations',
    slug: 'java-junit-5-jupiter-testing',
    category: 'Testing & Quality Assurance',
    subcategory: 'Unit & Integration Testing',
    order: 51,
    estimatedMinutes: 30,
    summary:
      'Master modern Java unit testing with JUnit 5: Platform, Jupiter, and Vintage architectures, the Arrange-Act-Assert test lifecycle, all core assertions (assertThrows, assertAll, assertTimeout), parameterized testing, and distinguishing JUnit from Spring Boot test annotations.',
    whyItMatters:
      'Writing automated, deterministic unit tests is non-negotiable in production engineering. Senior technical interviewers rigorously test candidates on assertion accuracy, exception validation, test isolation lifecycles (PER_METHOD vs PER_CLASS), and mocking strategies.',
    keyTakeaways: [
      'JUnit 5 is composed of three distinct sub-projects: JUnit Platform (runner foundation), JUnit Jupiter (test programming model & engine), and JUnit Vintage (backward compatibility for JUnit 3/4).',
      'The Arrange-Act-Assert (AAA) pattern structures clean tests: Arrange inputs → Act (invoke method) → Assert outputs.',
      'In assertEquals(expected, actual), the expected value MUST always come first so failure messages correctly report expected vs actual.',
      'By default, JUnit creates a new test class instance for every single @Test method (PER_METHOD) to guarantee state isolation between tests.',
      'Distinguish core JUnit annotations (@Test, @BeforeEach) from Spring integration annotations (@SpringBootTest, @WebMvcTest) and Mockito bean replacement APIs (@MockBean / @MockitoBean).',
    ],
    sections: [
      {
        id: 'junit-architecture',
        title: '1. What is JUnit 5 & The Three-Tier Architecture',
        content:
          '**JUnit 5** is the current generation of the industry-standard unit testing framework for Java. Unlike previous monolithic versions (such as JUnit 4), JUnit 5 was redesigned from the ground up as a modular, three-tier architecture:\n\n```text\nJUnit 5 = JUnit Platform + JUnit Jupiter + JUnit Vintage\n```\n\n### The Three Sub-Projects Explained:\n1. **JUnit Platform**: The foundation layer. Defines the `TestEngine` API used by IDEs (IntelliJ IDEA, Eclipse, VS Code) and build tools (Gradle, Maven) to discover and launch test suites.\n2. **JUnit Jupiter**: The modern programming model and extension engine for writing tests in JUnit 5. Contains annotations like `@Test`, `@ParameterizedTest`, and assertions in `org.junit.jupiter.api.Assertions`.\n3. **JUnit Vintage**: A backward-compatibility engine that allows legacy JUnit 3 and JUnit 4 tests to execute seamlessly on the modern JUnit Platform alongside Jupiter tests.',
        bullets: [
          'Naming clarification: Do not say JUnit 5 literally stands for "Jupiter unit testing framework". Jupiter is specifically the sub-project within JUnit 5 providing the new API and test engine.',
          'Starter dependency: In Spring Boot, adding spring-boot-starter-test automatically pulls in JUnit Jupiter, AssertJ, and Mockito.',
          'Build integration: Gradle requires tasks.named("test") { useJUnitPlatform() } in build.gradle; Maven uses the maven-surefire-plugin with JUnit 5 provider.',
        ],
      },
      {
        id: 'test-lifecycle-aaa',
        title: '2. The Arrange-Act-Assert (AAA) Test Pattern',
        content:
          'Every unit test should follow the standard **Arrange-Act-Assert (AAA)** structure to remain readable, maintainable, and deterministic:\n\n1. **Arrange**: Set up test fixtures, instantiate objects, and prepare input arguments.\n2. **Act**: Invoke the specific method under test and capture the returned value or state change.\n3. **Assert**: Verify that the actual result matches the expected outcome.\n\nHere is a complete, compilable test demonstrating the pattern for an OMS order discount calculator:',
        snippet: {
          language: 'java',
          filename: 'src/test/java/com/example/demo/OrderCalculatorTest.java',
          code: `package com.example.demo;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class OrderCalculatorTest {

    @Test
    @DisplayName("Should apply 10% discount for orders exceeding $100")
    void shouldApplyDiscountForLargeOrders() {
        // 1. Arrange: instantiate system under test and inputs
        OrderCalculator calculator = new OrderCalculator();
        double orderTotal = 150.00;

        // 2. Act: invoke method under test
        double discountedPrice = calculator.applyDiscount(orderTotal);

        // 3. Assert: verify expected outcome (expected comes FIRST)
        // Note: For floating point comparisons, provide an epsilon delta tolerance
        assertEquals(135.00, discountedPrice, 0.001, "Expected 10% discount to reduce $150 to $135");
    }
}`,
          explanation:
            'Critical Rule: In assertEquals(expected, actual), the expected value comes first. If the test fails, JUnit outputs: "expected: <135.0> but was: <140.0>". Swapping them makes failure logs confusing and misleading.',
        },
      },
      {
        id: 'core-assertions',
        title: '3. Essential JUnit 5 Assertions',
        content:
          'JUnit Jupiter provides a comprehensive suite of static assertion methods in `org.junit.jupiter.api.Assertions`. A failed assertion immediately aborts the test method with an `AssertionError`:\n\n' +
          '- `assertEquals(expected, actual)` / `assertNotEquals(unexpected, actual)`: Value equality via `equals()`.\n' +
          '- `assertTrue(condition)` / `assertFalse(condition)`: Boolean flag verification.\n' +
          '- `assertNull(object)` / `assertNotNull(object)`: Nullability verification.\n' +
          '- `assertSame(expected, actual)` / `assertNotSame(...)`: Strict reference identity (`==`), confirming both pointers reference the exact same memory address.\n' +
          '- `assertArrayEquals(expectedArray, actualArray)` / `assertIterableEquals(expectedList, actualList)`: Deep array/collection element-by-element equality.\n' +
          '- `assertThrows(ExpectedException.class, executable)`: Verifies that executing a lambda throws the expected exception type.\n' +
          '- `assertDoesNotThrow(executable)`: Verifies code runs to completion without unhandled exceptions.\n' +
          '- `assertAll(heading, executables...)`: Grouped assertions where ALL assertions execute and report failures together, rather than stopping on the first failure.\n' +
          '- `assertTimeout(duration, executable)`: Verifies execution finishes before timeout (runs on same thread).\n' +
          '- `assertTimeoutPreemptively(duration, executable)`: Aborts execution preemptively on a separate thread if timeout exceeded (caution: can cause thread safety or transaction leak issues).',
        snippet: {
          language: 'java',
          filename: 'AssertionExamplesTest.java',
          code: `import org.junit.jupiter.api.Test;
import java.time.Duration;
import java.util.List;
import static org.junit.jupiter.api.Assertions.*;

class AssertionExamplesTest {

    @Test
    void testGroupedAndExceptionAssertions() {
        // Grouped assertions: asserts all fields even if one fails
        User user = new User("Suhel", 25, "admin@example.com");
        assertAll("User profile fields",
            () -> assertEquals("Suhel", user.getName()),
            () -> assertTrue(user.getAge() >= 18),
            () -> assertNotNull(user.getEmail())
        );

        // Exception testing: verify invalid age throws IllegalArgumentException
        IllegalArgumentException ex = assertThrows(
            IllegalArgumentException.class,
            () -> new User("Invalid", -5, "test@test.com")
        );
        assertEquals("Age cannot be negative", ex.getMessage());

        // Timeout assertion
        assertTimeout(Duration.ofMillis(500), () -> {
            Thread.sleep(50); // Simulates fast in-memory operation
        });
    }
}`,
          explanation:
            'assertAll groups multiple assertions together. If age is invalid, JUnit still checks email and reports all discrepancies in a unified failure report.',
        },
      },
      {
        id: 'junit-annotations-matrix',
        title: '4. Comprehensive JUnit 5 Annotations Reference',
        content:
          'Below is a complete reference of the standard JUnit 5 annotations and their execution semantics:',
        table: {
          headers: ['Annotation', 'Scope & Purpose', 'Example Usage'],
          rows: [
            ['@Test', 'Marks method as a runnable unit test.', '@Test void testCalculate()'],
            ['@DisplayName', 'Declares a custom, readable test name for IDEs and reports.', '@DisplayName("User registration should reject weak passwords")'],
            ['@BeforeEach', 'Executes before EVERY @Test method in the class.', 'Resets mock state or clears test databases.'],
            ['@AfterEach', 'Executes after EVERY @Test method in the class.', 'Cleans up temporary resources or file handles.'],
            ['@BeforeAll', 'Executes ONCE before all tests in the class (must be static by default).', 'Spins up test containers or shared server pools.'],
            ['@AfterAll', 'Executes ONCE after all tests complete (must be static by default).', 'Shuts down shared test fixtures.'],
            ['@ParameterizedTest', 'Executes the same test logic across multiple input data sets.', 'Requires an input source like @ValueSource or @CsvSource.'],
            ['@ValueSource', 'Provides an array of literal values (strings, ints, etc.).', '@ValueSource(ints = {1, 3, 5, 7})'],
            ['@CsvSource', 'Provides comma-delimited input records with expected outputs.', '@CsvSource({"10, 2, 5", "100, 4, 25"})'],
            ['@MethodSource', 'References a static factory method returning Stream<Arguments>.', '@MethodSource("provideOrderTestCases")'],
            ['@NullSource / @EmptySource', 'Passes null, empty strings, or empty collections to parameterized tests.', 'Tests input boundary validation.'],
            ['@Disabled', 'Skips test execution with an optional reason.', '@Disabled("Pending bug fix #428")'],
            ['@Nested', 'Organizes hierarchical BDD-style inner test classes.', 'class OrderPlacement { @Nested class WhenPaymentFails {...} }'],
            ['@Tag', 'Categorizes tests for selective execution via build tools.', '@Tag("fast"), @Tag("integration")'],
            ['@RepeatedTest(n)', 'Executes the test method n times consecutively.', '@RepeatedTest(10) for flaky/concurrency checks.'],
            ['@Timeout', 'Fails the test if execution exceeds specified duration.', '@Timeout(value = 2, unit = TimeUnit.SECONDS)'],
            ['@TempDir', 'Injects a temporary directory deleted automatically after the test.', '@TempDir Path tempDir'],
            ['@ExtendWith', 'Registers custom JUnit extensions (e.g. MockitoExtension.class).', '@ExtendWith(MockitoExtension.class)'],
          ],
        },
        bullets: [
          'Default Test Lifecycle (PER_METHOD): JUnit instantiates a brand new instance of the test class for every @Test method. This isolates state and prevents cross-test contamination.',
          'Class Lifecycle (PER_CLASS): Declaring @TestInstance(Lifecycle.PER_CLASS) creates only one instance of the test class. This permits @BeforeAll and @AfterAll methods to be non-static, but developers must be careful not to leak mutable state between tests.',
          'Dynamic Tests (@TestFactory): Generates test cases dynamically at runtime from a Collection, Iterable, or Stream of DynamicTest objects.',
        ],
      },
      {
        id: 'parameterized-tests-example',
        title: '5. Parameterized Tests in Action (@ValueSource & @CsvSource)',
        content:
          'Parameterized tests eliminate redundant test methods by running the exact same assertion logic against an array of test inputs:',
        snippet: {
          language: 'java',
          filename: 'ParameterizedValidationTest.java',
          code: `import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.junit.jupiter.params.provider.CsvSource;
import static org.junit.jupiter.api.Assertions.*;

class ParameterizedValidationTest {

    @ParameterizedTest
    @ValueSource(strings = {"racecar", "radar", "level", "deified"})
    void shouldRecognizePalindromes(String candidate) {
        assertTrue(StringUtils.isPalindrome(candidate));
    }

    @ParameterizedTest(name = "Tax on {0} at {1}% rate should equal {2}")
    @CsvSource({
        "100.0, 0.05, 5.0",
        "200.0, 0.10, 20.0",
        "50.0,  0.08, 4.0"
    })
    void shouldCalculateSalesTaxAccurately(double amount, double rate, double expectedTax) {
        double actualTax = TaxCalculator.calculate(amount, rate);
        assertEquals(expectedTax, actualTax, 0.001);
    }
}`,
          explanation:
            '@CsvSource parses comma-separated string literals into typed method arguments (double, double, double). The custom name attribute renders descriptive entries in test reports.',
        },
      },
      {
        id: 'spring-testing-annotations',
        title: '6. Distinguishing JUnit Core vs Spring Test Annotations',
        content:
          'A frequent point of confusion in technical interviews is blurring the line between **core JUnit annotations** and **Spring Boot testing annotations**:\n\n### Core JUnit 5 Annotations (Pure Unit Tests):\n- Provided by `org.junit.jupiter.api.*`.\n- Run purely in-memory without starting a Spring ApplicationContext.\n- Fast, lightweight (sub-millisecond execution). Examples: `@Test`, `@BeforeEach`, `@ExtendWith(MockitoExtension.class)`.\n\n### Spring Boot Test Annotations (Integration & Slice Tests):\n- Provided by `org.springframework.boot.test.context.*`.\n- Spin up Spring containers, inject beans, and configure test databases:\n  - `@SpringBootTest`: Loads the complete Spring application context with all beans. Best for full integration testing.\n  - `@WebMvcTest(OrderController.class)`: Slices only the web layer (DispatcherServlet, controllers, filters) without loading JPA repositories or database connections. Uses `MockMvc`.\n  - `@DataJpaTest`: Slices only JPA repositories, entities, and configures an embedded in-memory database (H2) with transactional rollback.\n  - **Mockito Bean Replacement APIs**: In standard/older Spring Boot versions, `@MockBean` replaces a bean in the Spring ApplicationContext with a Mockito mock. In newer Spring Boot 3.4+ versions, `@MockitoBean` is introduced as the modern standard. Do not present version-sensitive APIs as universal.',
        bullets: [
          'Rule of thumb: Write 80% fast, isolated JUnit unit tests with Mockito mocks, and 20% Spring slice/integration tests.',
          'Command execution: ./gradlew test or mvn test runs all automated tests.',
          'HTML Report locations: Gradle generates reports under build/reports/tests/test/index.html; Maven Surefire generates reports under target/surefire-reports/.',
        ],
      },
      {
        id: 'common-mistakes',
        title: '7. Common Testing Mistakes & Anti-Patterns',
        content:
          'Avoid these high-impact mistakes when authoring automated test suites:',
        bullets: [
          'Swapping expected and actual: Writing assertEquals(actual, expected) flips failure diagnostics and confuses CI logs.',
          'Missing useJUnitPlatform(): If Gradle runs without useJUnitPlatform() configured on the test task, it skips all JUnit 5 tests.',
          'Overusing @SpringBootTest: Starting a full Spring ApplicationContext for simple utility or domain logic makes test suites slow (seconds vs milliseconds). Use pure JUnit tests wherever possible.',
          'Relying on test execution order: Unit tests must never depend on each other. Do not assume test A runs before test B.',
          'Ignoring floating point epsilon deltas: Comparing floats or doubles with assertEquals(expected, actual) without an epsilon delta leads to intermittent precision failures (e.g. 0.30000000000000004 != 0.3).',
        ],
      },
    ],
    exerciseIds: ['ex-049-junit5-assertions'],
    interviewQuestionIds: ['q-121-junit5-architecture-and-lifecycle'],
    relatedTopicIds: ['java-spring-boot-overview-lifecycle', 'java-gradle-build-automation', 'java-maven-build-management'],
    learningObjectives: [
      'Understand JUnit 5 three-tier architecture: Platform, Jupiter, and Vintage',
      'Apply the Arrange-Act-Assert (AAA) pattern to write clean, deterministic unit tests',
      'Master core Jupiter assertions: assertEquals, assertThrows, assertAll, and assertTimeout',
      'Differentiate between JUnit 5 core unit testing and Spring testing slices (@SpringBootTest, @WebMvcTest)',
      'Use parameterized tests with @ValueSource and @CsvSource to eliminate duplicate tests',
    ],
    commonMistakes: [
      {
        mistake: 'Writing assertEquals(actual, expected) with swapped parameter order',
        fix: 'JUnit 5 assertEquals syntax is always assertEquals(expected, actual), unlike some legacy or custom assertion tools.',
      },
      {
        mistake: 'Comparing floating point double/float values without an epsilon delta tolerance',
        fix: 'Always pass a delta tolerance, e.g., assertEquals(expected, actual, 0.0001), to prevent IEEE 754 precision failures.',
      },
      {
        mistake: 'Launching full @SpringBootTest for pure algorithmic or utility unit tests',
        fix: 'Keep unit tests isolated and fast using pure JUnit 5 with Mockito mocks, reserving @SpringBootTest for integration slices.',
      },
    ],
    keywords: [
      'junit 5',
      'jupiter',
      'vintage',
      'aaa pattern',
      'arrange act assert',
      'assertall',
      'assertthrows',
      'springboottest',
      'webmvctest',
      'mockbean',
      'mockitobean',
      'parameterizedtest',
    ],
  },
];
