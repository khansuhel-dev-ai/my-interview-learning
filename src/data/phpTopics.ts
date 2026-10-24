import { Topic } from '../types';

export const PHP_TOPICS: Topic[] = [
  {
    id: 'php-001-getting-started',
    codeNumber: 'PHP-001',
    languageId: 'php',
    title: 'PHP 8+ Overview & Web Request Cycle',
    slug: 'php-overview-and-request-cycle',
    category: 'Getting Started',
    subcategory: 'Architecture',
    summary: 'Preview Track: How modern PHP executes behind Nginx/Apache, FastCGI Process Manager (FPM), and stateless request lifecycles.',
    order: 1,
    estimatedMinutes: 7,
    learningObjectives: [
      'Understand the stateless request-response model of PHP.',
      'Differentiate CLI PHP execution from PHP-FPM web execution.',
      'Write your first modern PHP script with typed declarations.',
    ],
    whyItMatters: 'PHP powers over 75% of server-side websites including WordPress, Laravel, and Wikipedia. Understanding its shared-nothing architecture is essential for web engineering.',
    sections: [
      {
        id: 'request-cycle',
        title: 'Stateless Request Lifecycle',
        content: 'Unlike Java applications which run in a persistent long-lived JVM process, standard PHP runs as a "shared-nothing" architecture. Each incoming HTTP request starts a worker process, executes script logic, sends the HTTP response, and completely releases memory.',
        snippet: {
          language: 'php',
          filename: 'index.php',
          code: `<?php
declare(strict_types=1);

$greeting = "Hello from Modern PHP 8!";
$currentTime = date('Y-m-d H:i:s');

echo "<h1>{$greeting}</h1>";
echo "<p>Generated at: {$currentTime}</p>";`,
          output: `<h1>Hello from Modern PHP 8!</h1>
<p>Generated at: 2026-10-15 12:00:00</p>`,
        },
      },
    ],
    commonMistakes: [
      {
        mistake: 'Assuming variables persist between different web page visits',
        fix: 'PHP is stateless by default; use sessions, cookies, or databases (Redis/MySQL) to persist user state.',
      },
    ],
    keyTakeaways: [
      'PHP executes in a stateless request cycle.',
      'Modern PHP 8+ supports strict typing and JIT compilation.',
    ],
    relatedTopicIds: ['php-002-arrays-associative'],
    exerciseIds: ['ex-php-001-hello'],
    interviewQuestionIds: ['q-php-001-lifecycle'],
    keywords: ['php', 'php-fpm', 'web request', 'stateless', 'php8'],
  },
  {
    id: 'php-002-arrays-associative',
    codeNumber: 'PHP-002',
    languageId: 'php',
    title: 'Arrays, Dictionaries & Associative Arrays',
    slug: 'php-arrays-and-hashmaps',
    category: 'PHP Fundamentals',
    subcategory: 'Data Structures',
    summary: 'Preview Track: Understand how PHP arrays function as ordered maps combining indexed lists and key-value dictionaries into a single flexible structure.',
    order: 2,
    estimatedMinutes: 8,
    learningObjectives: [
      'Create indexed and associative arrays in PHP.',
      'Traverse key-value pairs using foreach ($array as $key => $value).',
      'Compare PHP associative arrays with Java HashMaps.',
    ],
    whyItMatters: 'In PHP, nearly all tabular and structured payload data (JSON APIs, database query results, POST form submissions) is represented using arrays.',
    sections: [
      {
        id: 'associative-arrays',
        title: 'PHP Arrays: Ordered Hash Maps',
        content: 'A PHP array is actually an ordered map. An ordered map is a type that associates values to keys. This type is optimized for several different uses; it can be treated as an array, list (vector), hash table (an implementation of a map), dictionary, collection, stack, queue, and more.',
        snippet: {
          language: 'php',
          filename: 'products.php',
          code: `<?php
$product = [
    'id' => 101,
    'name' => 'Football Jersey',
    'price' => 49.99,
    'in_stock' => true,
    'tags' => ['sports', 'apparel', 'soccer']
];

echo "Product: " . $product['name'] . "\\n";
echo "Price: $" . $product['price'] . "\\n";`,
          output: `Product: Football Jersey
Price: $49.99`,
        },
      },
    ],
    commonMistakes: [
      {
        mistake: 'Using dot operator (.) in other languages but expecting it to access properties',
        fix: 'In PHP, dot (.) is string concatenation. Access array keys via brackets: $product["name"].',
      },
    ],
    keyTakeaways: [
      'PHP arrays combine indexed lists and associative hash maps.',
      'Foreach loops cleanly iterate over keys and values.',
    ],
    relatedTopicIds: ['php-001-getting-started', 'php-003-oop'],
    exerciseIds: ['ex-php-002-associative'],
    interviewQuestionIds: ['q-php-002-arrays'],
    keywords: ['php arrays', 'associative array', 'ordered map', 'hash table'],
  },
  {
    id: 'php-003-oop',
    codeNumber: 'PHP-003',
    languageId: 'php',
    title: 'Object-Oriented PHP: Classes, Constructor Promotion & Types',
    slug: 'oop-in-php',
    category: 'Object-Oriented Programming',
    subcategory: 'Core OOP',
    summary: 'Preview Track: Master PHP 8+ object-oriented features including constructor property promotion, strict typing, and arrow functions.',
    order: 3,
    estimatedMinutes: 9,
    learningObjectives: [
      'Write classes with constructor property promotion in PHP 8.',
      'Enforce type hints on properties, parameters, and return types.',
      'Understand differences between Java OOP and PHP OOP.',
    ],
    whyItMatters: 'Modern enterprise PHP frameworks (like Laravel and Symfony) are strictly typed and heavily object-oriented. Constructor promotion drastically reduces boilerplate.',
    sections: [
      {
        id: 'constructor-promotion',
        title: 'PHP 8 Constructor Property Promotion',
        content: 'PHP 8 introduced constructor property promotion, eliminating repetitive field declarations and assignments:',
        snippet: {
          language: 'php',
          filename: 'Order.php',
          code: `<?php
declare(strict_types=1);

class Order {
    // Constructor Property Promotion
    public function __construct(
        public readonly string $orderId,
        public float $amount,
        public string $status = 'pending'
    ) {}

    public function markCompleted(): void {
        $this->status = 'completed';
    }
}

$order = new Order('ORD-991', 129.50);
$order->markCompleted();
echo "Order {$order->orderId} status: {$order->status}";`,
          output: 'Order ORD-991 status: completed',
        },
      },
    ],
    commonMistakes: [
      {
        mistake: 'Using $this.property instead of $this->property',
        fix: 'PHP uses arrow syntax ($this->property) to access object properties and methods.',
      },
    ],
    keyTakeaways: [
      'Constructor promotion reduces class boilerplate.',
      'Use $this-> to access member properties and methods.',
    ],
    relatedTopicIds: ['php-001-getting-started'],
    exerciseIds: ['ex-php-003-classes'],
    interviewQuestionIds: ['q-php-003-oop'],
    keywords: ['php oop', 'constructor promotion', 'classes', 'strict_types'],
  },
];
