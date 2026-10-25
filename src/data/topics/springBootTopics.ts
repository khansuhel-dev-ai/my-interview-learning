import { Topic } from '../../types';

export const SPRING_BOOT_TOPICS: Topic[] = [
  {
    id: 'java-spring-boot-overview-lifecycle',
    codeNumber: 'JAVA-059',
    languageId: 'java',
    title: 'Spring Boot Overview, Initializr & Browser Request-to-Response Lifecycle',
    slug: 'java-spring-boot-overview-lifecycle',
    category: 'Spring Boot & Microservices',
    subcategory: 'Enterprise Architecture',
    order: 50,
    estimatedMinutes: 30,
    summary:
      'Understand Spring vs Spring Boot architecture, bootstrap production services via Spring Initializr, and master the complete 13-step browser request-to-response lifecycle through DispatcherServlet, HandlerMapping, and Jackson JSON serialization.',
    whyItMatters:
      'Spring Boot is the standard backend framework for enterprise Java web applications and microservices. Mastering its internal request execution lifecycle is a mandatory requirement for backend and full-stack software engineering technical interviews.',
    keyTakeaways: [
      'Spring Boot does NOT replace Spring; it builds on top of the Spring Framework to eliminate boilerplate configuration via starters and auto-configuration.',
      'Spring Initializr (start.spring.io) generates a pre-configured project scaffold with chosen build tool (Maven or Gradle), Java 21, and starter dependencies.',
      'DispatcherServlet is the Front Controller of Spring Web, coordinating servlet filters, HandlerMapping, argument resolvers, and response converters.',
      'A @RestController serializes returned Java objects directly into HTTP response bodies (typically JSON via Jackson), contrasting with Spring MVC view template resolvers.',
      'Controllers must be placed in or under the root package of your @SpringBootApplication class to be discovered by automatic component scanning.',
    ],
    sections: [
      {
        id: 'spring-vs-spring-boot',
        title: '1. Spring Framework vs Spring Boot: Core Paradigm Shift',
        content:
          'To understand Spring Boot, one must first understand the **Spring Framework** ecosystem. Spring is an enterprise Java framework providing Inversion of Control (IoC), Dependency Injection (DI), transaction management, web APIs, database access, security, and integration.\n\nHistorically, configuring Spring required hundreds of lines of complex XML descriptors or verbose Java configuration classes, manually configuring DispatcherServlet, view resolvers, and database connection pools.\n\n### What is Spring Boot?\n**Spring Boot does NOT replace the Spring Framework.** Instead, it is an opinionated layer built on top of Spring that radically simplifies development through four core pillars:\n\n1. **Auto-Configuration**: Inspects the classpath dependencies and automatically configures beans. If `spring-boot-starter-web` is present, it automatically configures an embedded Tomcat server and DispatcherServlet.\n2. **Starter Dependencies (`starter-poms`)**: Aggregates verified, mutually compatible dependency sets into single imports (e.g. `spring-boot-starter-web` pulls in Spring MVC, Tomcat, and Jackson).\n3. **Embedded Servlet Containers**: Packages Tomcat, Jetty, or Undertow directly inside the executable JAR. Applications run as standalone Java processes via `java -jar app.jar` without requiring a separate web application server installation.\n4. **Production-Ready Features (Spring Boot Actuator)**: Provides production metrics, health checks, environment inspection, and thread dumps out of the box.',
        bullets: [
          'Spring provides core features: IoC container, Dependency Injection, AOP, transaction abstractions.',
          'Spring Boot provides productivity features: auto-configuration, starters, embedded server, Actuator metrics.',
          'Externalized configuration: application.properties or application.yml allows overriding ports, database URLs, and credentials without recompiling code.',
        ],
        callout: {
          type: 'tip',
          title: 'Interview Definition to Remember',
          text: 'Do not tell an interviewer that "Spring Boot replaced Spring". The accurate answer is: "Spring Boot is an opinionated extension of the Spring Framework that provides auto-configuration, starter dependencies, and embedded servlet containers to eliminate boilerplate setup."',
        },
      },
      {
        id: 'spring-initializr-walkthrough',
        title: '2. Project Bootstrapping via Spring Initializr (start.spring.io)',
        content:
          'The official way to bootstrap any modern Spring Boot application is using **Spring Initializr** at [https://start.spring.io/](https://start.spring.io/):\n\n### Step-by-Step Generation Guide:\n1. **Project**: Choose **Maven** or **Gradle - Groovy** depending on your team build system.\n2. **Language**: Select **Java**.\n3. **Spring Boot Version**: Select the current stable production release shown on Initializr (e.g. 3.3.x). Avoid M (Milestone) or RC (Release Candidate) builds in production.\n4. **Project Metadata**:\n   - **Group**: Reverse domain convention (e.g., `com.suhel` or `com.example`).\n   - **Artifact**: Application name in lowercase kebab-case (e.g., `order-service` or `demo`).\n   - **Packaging**: Select **JAR** (the modern standard for microservices with embedded servers).\n   - **Java**: Select **Java 21 LTS** for modern pattern matching, records, and virtual threads.\n5. **Dependencies**: Add **Spring Web** (`spring-boot-starter-web`).\n6. Click **Generate** (or press Ctrl/Cmd + Enter) to download the `.zip` archive.\n7. Extract the archive and open the project directory in your preferred IDE (IntelliJ IDEA, VS Code, or Eclipse).',
        bullets: [
          'Inspect project files: pom.xml or build.gradle, DemoApplication.java in src/main/java, application.properties in src/main/resources, and DemoApplicationTests.java in src/test/java.',
          'Component Scanning Rule: Always keep your controllers, services, and repositories in sub-packages under the main application package (e.g., com.example.demo.controller) so @ComponentScan detects them automatically.',
        ],
      },
      {
        id: 'hello-controller-example',
        title: '3. Building Your First REST Controller',
        content:
          'Create a new class `HelloController.java` inside your package (e.g., `com.example.demo`):',
        snippet: {
          language: 'java',
          filename: 'src/main/java/com/example/demo/HelloController.java',
          code: `package com.example.demo;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    @GetMapping("/hello")
    public String hello() {
        return "Hello from Spring Boot!";
    }
}`,
          explanation:
            '- @RestController: Combines @Controller and @ResponseBody. Tells Spring that any data returned by handler methods should be written directly into the HTTP response body rather than being interpreted as a view template name.\n- @GetMapping("/hello"): Shorthand annotation mapping HTTP GET requests on "/hello" to the hello() method.\n- Method return value: The returned String "Hello from Spring Boot!" is serialized directly as the HTTP response payload with Content-Type: text/plain;charset=UTF-8.',
        },
        bullets: [
          'Default port: Spring Boot listens on port 8080 by default.',
          'To change port: Add "server.port=9090" in src/main/resources/application.properties.',
          'Run via Maven wrapper: ./mvnw spring-boot:run (Windows: mvnw.cmd spring-boot:run)',
          'Run via Gradle wrapper: ./gradlew bootRun (Windows: gradlew.bat bootRun)',
          'Verify in browser: Navigate to http://localhost:8080/hello to see "Hello from Spring Boot!".',
        ],
      },
      {
        id: 'browser-request-lifecycle',
        title: '4. The Full Browser Request-to-Response Execution Lifecycle',
        content:
          'When a user opens a URL or a frontend client sends an HTTP request to a Spring Boot service, the request traverses a strict, multi-layered pipeline. Here is the complete numbered 13-step sequence:',
        customDiagram: 'spring-lifecycle',
        bullets: [
          'Step 1 (Client): User submits form, enters URL, or frontend fetch() dispatches HTTP request.',
          'Step 2 (DNS): Public hostname resolves to IP via DNS infrastructure (bypassed for localhost).',
          'Step 3 (Network): TCP 3-way handshake and TLS/SSL cryptographic negotiation establish HTTPS tunnel.',
          'Step 4 (Wire): HTTP request packet arrives with method (GET, POST), path, headers, cookies, and optional body.',
          'Step 5 (Server): Embedded Tomcat servlet container accepts socket, creates HttpServletRequest and HttpServletResponse.',
          'Step 6 (Filters): Servlet Filter Chain executes cross-cutting concerns (CORS, logging, Spring Security authentication).',
          'Step 7 (Front Controller): DispatcherServlet intercepts request as the central coordinating brain of Spring Web.',
          'Step 8 (Routing): RequestMappingHandlerMapping matches request URI path and HTTP verb to the target controller method.',
          'Step 9 (Binding): HandlerMethodArgumentResolver binds @PathVariable, @RequestParam, headers, and deserializes JSON @RequestBody.',
          'Step 10 (Controller): @RestController method executes, performs validation, and delegates business logic to @Service.',
          'Step 11 (Business & Data): @Service executes domain logic; queries DB via @Repository/Spring Data JPA within transactions.',
          'Step 12 (Serialization): HttpMessageConverter (Jackson ObjectMapper) serializes returned Java DTOs into JSON format.',
          'Step 13 (Delivery): HTTP status code (200 OK), response headers, and JSON body travel back through filters and network to browser.',
        ],
        callout: {
          type: 'note',
          title: 'Architectural Clarification',
          text: 'Not every HTTP request touches a database (e.g. static resources, health checks, or caching layers). Furthermore, a @RestController producing JSON is distinct from a traditional Spring MVC controller that returns a String view name resolved by a Thymeleaf or JSP ViewResolver into HTML.',
        },
      },
      {
        id: 'enterprise-ecommerce-scenario',
        title: '5. Real-World Enterprise Scenario: Order Management System (OMS)',
        content:
          'In an enterprise Order Management System (OMS), when a customer places an order on an e-commerce storefront, the request lifecycle operates across distinct architectural tiers:',
        snippet: {
          language: 'java',
          filename: 'OrderController.java — REST Endpoint with DTO Binding',
          code: `package com.example.oms.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;

    // Constructor Dependency Injection (Recommended over field injection)
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    public ResponseEntity<OrderResponse> placeOrder(@RequestBody CreateOrderRequest request) {
        // Step 1: Jackson deserializes incoming JSON into CreateOrderRequest DTO
        // Step 2: Controller delegates business execution to transactional service
        OrderResponse response = orderService.processOrder(request);

        // Step 3: Return 201 Created status with serialized response DTO
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}`,
          explanation:
            'Shows constructor-based dependency injection (Spring Best Practice), clean REST path scoping via @RequestMapping, and explicit HTTP status code semantics via ResponseEntity.',
        },
        bullets: [
          'Service Layer: OrderService validates inventory, calls payment gateway microservice, and saves entity inside @Transactional boundary.',
          'Repository Layer: Spring Data JPA automatically writes order record to PostgreSQL/MySQL database.',
          'Global Exception Handling: If inventory is insufficient, a custom OutOfStockException is thrown and caught by @RestControllerAdvice, returning a clean 409 Conflict JSON payload to the customer.',
        ],
      },
      {
        id: 'common-mistakes',
        title: '6. Common Mistakes & Production Pitfalls',
        content:
          'Avoid these frequent errors encountered when building Spring Boot applications:',
        bullets: [
          'Using @Controller instead of @RestController: In REST APIs, returning an object from @Controller causes Spring to look for an HTML view template of that name, triggering a 404 or Circular view path exception.',
          'Missing @RequestBody: Forgetting @RequestBody on POST endpoints causes the DTO parameters to remain null because Spring will look for query parameters instead of parsing the JSON payload.',
          'Package structure misplacement: Placing controllers in a package that is not a child of the @SpringBootApplication package causes component scan to skip the controller.',
          'Blocking I/O on Tomcat thread pool: Heavy synchronous blocking operations without connection pooling or asynchronous processing can quickly exhaust the standard 200 Tomcat worker threads.',
          'Hardcoding configuration: Never hardcode database passwords or port numbers in Java code. Use src/main/resources/application.properties and environment variables.',
        ],
      },
    ],
    exerciseIds: ['ex-048-spring-boot-rest-controller'],
    interviewQuestionIds: ['q-118-spring-boot-auto-configuration', 'q-119-spring-request-response-lifecycle'],
    relatedTopicIds: ['java-gradle-build-automation', 'java-maven-build-management', 'java-junit-5-jupiter-testing'],
    learningObjectives: [
      'Understand what Spring Boot is and how it eliminates Spring XML/JavaConfig boilerplate',
      'Use start.spring.io (Spring Initializr) to generate enterprise project skeletons',
      'Learn how auto-configuration works under the hood with @Conditional annotations',
      'Trace the complete 13-step HTTP request-response lifecycle through DispatcherServlet',
      'Build and run a working HelloController REST endpoint returning JSON/text',
    ],
    commonMistakes: [
      {
        mistake: 'Using @Controller instead of @RestController for JSON REST APIs',
        fix: 'Use @RestController (or add @ResponseBody to @Controller methods) so return values serialize directly to HTTP response bodies.',
      },
      {
        mistake: 'Placing Controller classes outside the @SpringBootApplication package tree',
        fix: 'Ensure controllers reside in the same package or subpackages of the main application class so component scanning discovers them.',
      },
      {
        mistake: 'Forgetting @RequestBody on POST/PUT endpoints receiving JSON payloads',
        fix: 'Annotate DTO parameters with @RequestBody to trigger Jackson deserialization of HTTP request bodies.',
      },
    ],
    keywords: [
      'spring boot',
      'spring initializr',
      'start.spring.io',
      'restcontroller',
      'dispatcherservlet',
      'embedded tomcat',
      'auto-configuration',
      'starters',
      'request lifecycle',
      'httpmessageconverter',
    ],
  },
];
