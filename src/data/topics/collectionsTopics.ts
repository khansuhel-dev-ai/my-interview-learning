import { Topic } from '../../types';

export const COLLECTIONS_TOPICS: Topic[] = [
  {
    id: 'java-collection-framework-intro',
    codeNumber: 'JAVA-042',
    languageId: 'java',
    title: 'Collection vs Collections vs Collections Framework',
    slug: 'collection-vs-collections-framework',
    category: 'Collections Framework and Stream API',
    subcategory: 'Architecture & Foundations',
    summary: 'Distinguish the Collection interface, Collections utility class, and the Java Collections Framework. Understand the hierarchy across List, Set, Queue, and why Map forms a separate branch.',
    order: 33,
    estimatedMinutes: 14,
    learningObjectives: [
      'Define Collection interface, Collections utility class, and Collections Framework.',
      'Trace the hierarchy from Iterable to Collection, List, Set, and Queue.',
      'Explain why Map belongs to the Collections Framework but does NOT extend Collection.',
      'Contrast dynamic collection resizing with fixed-length Java arrays.',
      'Apply standard Collections utility methods: sort(), reverse(), shuffle(), and unmodifiableList().',
    ],
    whyItMatters: 'Almost every Java technical screening begins with collection architecture fundamentals. Understanding interface inheritance vs utility helpers and why Map is partitioned separately proves solid structural knowledge of the JDK.',
    sections: [
      {
        id: 'definitions-comparison',
        title: 'Collection vs Collections vs Framework',
        content: 'Master the three distinct terms that interviewers frequently test:',
        bullets: [
          '**Collection (Interface):** The root interface for individual element sequences (java.util.Collection). Extended by List, Set, and Queue.',
          '**Collections (Utility Class):** A helper class (java.util.Collections) consisting exclusively of static methods that operate on or return collections (e.g. Collections.sort(), Collections.reverse(), Collections.unmodifiableList()).',
          '**Collections Framework:** The unified architecture representing and manipulating collections across interfaces, concrete classes, and algorithms.',
          '**The Map Exception:** Map (java.util.Map) stores key-value pairs rather than individual elements. Therefore, Map does NOT implement or extend java.util.Collection, although it is an integral part of the Collections Framework.',
        ],
      },
      {
        id: 'hierarchy-overview',
        title: 'The Collections Framework Hierarchy',
        content: 'Notice how Iterable anchors individual collections, while Map forms an independent branch:',
        flowDiagram: {
          title: 'Java Collections Framework Hierarchy',
          steps: [
            { stepNumber: 1, label: 'Iterable<T>', subtext: 'Root of all traversable groups' },
            { stepNumber: 2, label: 'Collection<T>', subtext: 'Common element operations' },
            { stepNumber: 3, label: 'List / Set / Queue', subtext: 'Specialized behavior branches' },
            { stepNumber: 4, label: 'Map<K, V>', subtext: 'Independent key-value branch' },
          ],
        },
      },
      {
        id: 'collections-side-by-side',
        title: 'Side-by-Side Code Comparison: List vs Set Behavior',
        content: 'Save as Main.java. Observe how Collection interface references decouple code from concrete storage:',
        snippet: {
          language: 'java',
          filename: 'Main.java',
          code: `import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class Main {
    public static void main(String[] args) {
        // 1. Program to the Collection interface
        Collection<Integer> collection = new ArrayList<>();
        for (int i = 1; i <= 5; i++) collection.add(i);
        collection.add(3); // Duplicates allowed in List-backed collection
        System.out.println("List-backed Collection: " + collection);

        // 2. Set enforces uniqueness
        Set<Integer> set = new HashSet<>(collection);
        System.out.println("Set (duplicates removed): " + set);

        // 3. Using Collections utility class
        List<Integer> list = new ArrayList<>(collection);
        Collections.reverse(list);
        System.out.println("Reversed with Collections utility: " + list);
    }
}`,
          output: `List-backed Collection: [1, 2, 3, 4, 5, 3]
Set (duplicates removed): [1, 2, 3, 4, 5]
Reversed with Collections utility: [3, 5, 4, 3, 2, 1]`,
          explanation: '1. ArrayList maintains insertion order and permits duplicate 3.\\n2. HashSet discards duplicate 3 based on equals() and hashCode().\\n3. Collections.reverse() operates on the List in place.',
        },
      },
    ],
    commonMistakes: [
      {
        mistake: 'Saying Map extends Collection in an interview',
        fix: 'Map is part of the Collections Framework, but it has key-value semantics and does NOT extend Collection.',
      },
      {
        mistake: 'Trying to instantiate Collections with new Collections()',
        fix: 'Collections is a non-instantiable utility class with private constructor and static helper methods.',
      },
    ],
    keyTakeaways: [
      'Collection is an interface; Collections is a utility class.',
      'Map stores key-value pairs and does not extend Collection.',
      'Declare variables using interfaces (List, Set, Map) to minimize implementation coupling.',
    ],
    relatedTopicIds: ['java-list-implementations', 'java-map-implementations'],
    exerciseIds: ['ex-024-arraylist-duplicates'],
    interviewQuestionIds: ['q-083-collection-vs-collections', 'q-084-is-map-a-collection', 'q-094-program-to-interfaces'],
    keywords: ['collection', 'collections', 'collections framework', 'iterable', 'map', 'list', 'set', 'queue'],
  },

  {
    id: 'java-list-implementations',
    codeNumber: 'JAVA-043',
    languageId: 'java',
    title: 'List Implementations: ArrayList, LinkedList, Vector & Stack',
    slug: 'list-arraylist-linkedlist-vector-stack',
    category: 'Collections Framework and Stream API',
    subcategory: 'Ordered Sequences',
    summary: 'Analyze List implementations. Compare ArrayList dynamic array resizing with LinkedList doubly-linked nodes. Understand O(1) random access vs O(n) shifts and why Vector/Stack are legacy.',
    order: 34,
    estimatedMinutes: 16,
    learningObjectives: [
      'Contrast ArrayList (dynamic array) with LinkedList (doubly-linked nodes).',
      'Explain algorithmic time complexities for get(), add(), and remove() at indices.',
      'Identify the default initial capacity (10) and 1.5x growth factor of ArrayList.',
      'Understand why Vector and Stack are considered legacy in modern Java.',
      'Choose ArrayDeque over LinkedList and Stack for LIFO/FIFO stacks and queues.',
    ],
    whyItMatters: 'ArrayList vs LinkedList is one of the most classic Java interview questions. Explaining memory locality, cache line invalidation, and shifting costs shows true engineering depth beyond theoretical big-O notation.',
    sections: [
      {
        id: 'arraylist-vs-linkedlist',
        title: 'ArrayList vs LinkedList: Internal Mechanics',
        content: 'A List maintains element insertion order, allows duplicates, and supports index-based operations. The two primary implementations differ fundamentally in memory layout:',
        bullets: [
          '**ArrayList:** Backed by a contiguous Object[] array. Default initial capacity is 10. When full, it allocates a new array ~1.5x larger and copies elements. get(index) is O(1) instantaneous calculation. Inserting or removing from the middle requires array copying (O(n)).',
          '**LinkedList:** Backed by doubly-linked Node objects containing data, next pointer, and prev pointer. Implements both List and Deque. get(index) requires traversing nodes (O(n)). Adding at head/tail is O(1) pointer adjustment.',
          '**CPU Cache Locality:** ArrayList elements reside contiguously in memory, yielding exceptional CPU L1/L2 cache prefetching. LinkedList nodes are scattered across Heap memory, incurring pointer dereferencing and cache misses.',
        ],
      },
      {
        id: 'list-code-example',
        title: 'ArrayList in Practice: Product Catalog Example',
        content: 'Save as Main.java. Observe basic additions, indexing, and removals:',
        snippet: {
          language: 'java',
          filename: 'Main.java',
          code: `import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<String> products = new ArrayList<>();
        products.add("Laptop");
        products.add("Keyboard");
        products.add("Laptop"); // Duplicates permitted

        System.out.println("All Products: " + products);
        System.out.println("First Product: " + products.get(0));

        // Removing an element shifts trailing items left
        products.remove("Keyboard");
        System.out.println("After Removal: " + products);
        System.out.println("Size: " + products.size());
    }
}`,
          output: `All Products: [Laptop, Keyboard, Laptop]
First Product: Laptop
After Removal: [Laptop, Laptop]
Size: 2`,
          explanation: 'ArrayList allows duplicate elements. Removing "Keyboard" shifts trailing elements one index to the left.',
        },
      },
      {
        id: 'legacy-lists',
        title: 'Vector and Stack: Legacy Classes',
        content: 'Why you should generally avoid Vector and Stack in modern code:',
        bullets: [
          '**Vector:** A legacy dynamic array from Java 1.0. Every method is individually synchronized, adding synchronization locking overhead even in single-threaded contexts.',
          '**Stack:** Extends Vector, inheriting non-stack methods like insertElementAt(). In modern Java, prefer Deque (ArrayDeque) for stack operations: deque.push() and deque.pop().',
        ],
      },
    ],
    commonMistakes: [
      {
        mistake: 'Using LinkedList because "insertions are O(1)" without measuring lookup traversal',
        fix: 'LinkedList insertion at an index still requires traversing to that index (O(n)). ArrayList is faster in practice for 95% of business applications due to CPU caching.',
      },
      {
        mistake: 'Using java.util.Stack for modern LIFO stack operations',
        fix: 'Use Deque<T> stack = new ArrayDeque<>() which is faster, non-synchronized, and structurally sound.',
      },
    ],
    keyTakeaways: [
      'ArrayList is backed by an array; get() is O(1); default capacity is 10.',
      'LinkedList is doubly-linked; index access is O(n); implements Deque.',
      'ArrayList is almost always preferred due to contiguous memory and CPU cache locality.',
      'Prefer ArrayDeque over Stack and LinkedList for queue/stack workflows.',
    ],
    relatedTopicIds: ['java-collection-framework-intro', 'java-queue-deque'],
    exerciseIds: ['ex-024-arraylist-duplicates'],
    interviewQuestionIds: ['q-085-arraylist-vs-linkedlist'],
    keywords: ['arraylist', 'linkedlist', 'vector', 'stack', 'capacity', 'cpu cache', 'list'],
  },

  {
    id: 'java-set-implementations',
    codeNumber: 'JAVA-044',
    languageId: 'java',
    title: 'Set Implementations: HashSet, LinkedHashSet & TreeSet',
    slug: 'set-hashset-linkedhashset-treeset',
    category: 'Collections Framework and Stream API',
    subcategory: 'Unique Collections',
    summary: 'Master duplicate elimination with Set. Contrast HashSet (hash table, O(1)), LinkedHashSet (insertion order preserved), and TreeSet (Red-Black tree, O(log n) natural ordering).',
    order: 35,
    estimatedMinutes: 16,
    learningObjectives: [
      'Understand the Set contract: elements must be unique according to equals().',
      'Compare HashSet (O(1) average), LinkedHashSet (order preserved), and TreeSet (O(log n) sorted).',
      'Explain how HashSet internally delegates to a private HashMap instance.',
      'Implement equals() and hashCode() correctly for custom objects in hash-based sets.',
      'Understand why TreeSet relies on Comparable or Comparator rather than equals().',
    ],
    whyItMatters: 'Deduplicating incoming business data (user IDs, tags, transaction hashes) is a standard backend requirement. Interviewers test whether you know how HashSet works under the hood and why broken hashCode() contracts cause memory leaks.',
    sections: [
      {
        id: 'set-comparison-table',
        title: 'HashSet vs LinkedHashSet vs TreeSet',
        content: 'Choose the appropriate Set based on performance and ordering requirements:',
        table: {
          headers: ['Feature', 'HashSet', 'LinkedHashSet', 'TreeSet'],
          rows: [
            ['Underlying structure', 'HashMap (hash table)', 'LinkedHashMap (hash table + linked list)', 'TreeMap (Red-Black tree)'],
            ['Element ordering', 'No guarantee (unpredictable)', 'Insertion order preserved', 'Sorted (natural or Comparator)'],
            ['Time complexity (add/contains)', 'O(1) average', 'O(1) average', 'O(log n)'],
            ['Null elements allowed', 'Yes (one null)', 'Yes (one null)', 'No (throws NullPointerException in natural order)'],
            ['Equality check', 'hashCode() & equals()', 'hashCode() & equals()', 'compareTo() or compare() == 0'],
          ],
        },
      },
      {
        id: 'set-code-demo',
        title: 'TreeSet vs HashSet in Action',
        content: 'Save as Main.java. Notice how TreeSet sorts elements automatically while HashSet order varies:',
        snippet: {
          language: 'java',
          filename: 'Main.java',
          code: `import java.util.HashSet;
import java.util.Set;
import java.util.TreeSet;

public class Main {
    public static void main(String[] args) {
        // 1. HashSet: ignores duplicates, order not guaranteed
        Set<Integer> hashSet = new HashSet<>();
        hashSet.add(5);
        hashSet.add(2);
        hashSet.add(8);
        hashSet.add(2); // Duplicate ignored
        System.out.println("HashSet (size " + hashSet.size() + "): " + hashSet);

        // 2. TreeSet: sorted ascending natural order
        Set<Integer> treeSet = new TreeSet<>();
        treeSet.add(5);
        treeSet.add(2);
        treeSet.add(8);
        treeSet.add(2); // Duplicate ignored
        System.out.println("TreeSet (sorted): " + treeSet);
    }
}`,
          output: `HashSet (size 3): [2, 5, 8]
TreeSet (sorted): [2, 5, 8]`,
          explanation: 'Duplicate 2 is rejected by both sets. TreeSet guarantees ascending natural sort [2, 5, 8], whereas HashSet ordering is arbitrary.',
        },
      },
    ],
    commonMistakes: [
      {
        mistake: 'Adding custom objects to HashSet without overriding equals() and hashCode()',
        fix: 'Default Object.equals() compares memory addresses. Two objects with identical fields will both be added unless equals() and hashCode() are overridden.',
      },
      {
        mistake: 'Adding null to a TreeSet with natural ordering',
        fix: 'TreeSet calls compareTo() on elements. Passing null causes NullPointerException.',
      },
    ],
    keyTakeaways: [
      'HashSet provides O(1) average time without ordering guarantees.',
      'LinkedHashSet maintains insertion order.',
      'TreeSet maintains sorted order with O(log n) complexity.',
      'HashSet is internally backed by a HashMap using dummy PRESENT values.',
    ],
    relatedTopicIds: ['java-list-implementations', 'java-map-implementations'],
    exerciseIds: ['ex-025-hashset-deduplication', 'ex-027-treeset-sorted-ids'],
    interviewQuestionIds: ['q-086-hashset-vs-treeset'],
    keywords: ['hashset', 'linkedhashset', 'treeset', 'set', 'deduplication', 'unique', 'red-black tree'],
  },

  {
    id: 'java-queue-deque',
    codeNumber: 'JAVA-045',
    languageId: 'java',
    title: 'Queue and Deque: ArrayDeque & PriorityQueue',
    slug: 'queue-deque-arraydeque-priorityqueue',
    category: 'Collections Framework and Stream API',
    subcategory: 'Queues & Buffers',
    summary: 'Master FIFO processing and priority heaps. Learn ArrayDeque as an efficient circular array buffer for queues and stacks, and PriorityQueue for min/max heap scheduling.',
    order: 36,
    estimatedMinutes: 14,
    learningObjectives: [
      'Define Queue (FIFO) and Deque (double-ended queue) semantics.',
      'Compare offer/poll/peek (safe return) vs add/remove/element (throw exceptions).',
      'Use ArrayDeque as both a queue and modern replacement for Stack.',
      'Explain PriorityQueue min-heap mechanics and comparator ordering.',
    ],
    whyItMatters: 'Queues underpin background task processors, thread pools, rate limiters, and graph traversal algorithms (BFS). ArrayDeque is one of the highest-performance data structures in the JDK.',
    sections: [
      {
        id: 'arraydeque-overview',
        title: 'ArrayDeque: High-Performance Double-Ended Queue',
        content: 'ArrayDeque implements Deque backed by a resizable circular array with no capacity restrictions. It does not allow null elements and is not thread-safe.',
        snippet: {
          language: 'java',
          filename: 'Main.java',
          code: `import java.util.ArrayDeque;
import java.util.Deque;

public class Main {
    public static void main(String[] args) {
        Deque<String> orders = new ArrayDeque<>();
        // Enqueue orders at tail
        orders.offerLast("Order-101");
        orders.offerLast("Order-102");
        orders.offerLast("Order-103");

        // Dequeue from head (FIFO)
        System.out.println("Processing: " + orders.pollFirst()); // Order-101
        System.out.println("Next in line: " + orders.peekFirst()); // Order-102
        System.out.println("Remaining count: " + orders.size());  // 2
    }
}`,
          output: `Processing: Order-101
Next in line: Order-102
Remaining count: 2`,
          explanation: 'ArrayDeque.offerLast() adds to the end; pollFirst() retrieves and removes from the front. Constant time O(1) amortized.',
        },
      },
      {
        id: 'priority-queue-overview',
        title: 'PriorityQueue: Priority-Based Heap Scheduling',
        content: 'PriorityQueue orders elements according to their natural ordering or a Comparator provided at construction. Elements are stored in a binary min-heap; peek() or poll() returns the smallest element.',
        bullets: [
          '**Min-Heap default:** The head of the queue is the least element with respect to the specified ordering.',
          '**Iteration Warning:** Iterating over a PriorityQueue via for-each does NOT guarantee sorted order! Only poll() repeatedly extracts in strict priority order.',
        ],
      },
    ],
    commonMistakes: [
      {
        mistake: 'Assuming for-each iteration over PriorityQueue prints sorted elements',
        fix: 'for-each iterates over internal heap array indices. To process in sorted order, repeatedly call poll() until empty.',
      },
      {
        mistake: 'Adding null to an ArrayDeque or PriorityQueue',
        fix: 'Both throw NullPointerException because null is used as a sentinel return value by poll() and peek().',
      },
    ],
    keyTakeaways: [
      'ArrayDeque is faster than LinkedList for queues and stacks due to contiguous circular buffer.',
      'PriorityQueue implements a binary heap with O(log n) offer and poll.',
      'poll() returns null when empty, while remove() throws NoSuchElementException.',
    ],
    relatedTopicIds: ['java-list-implementations', 'java-collection-framework-intro'],
    exerciseIds: ['ex-026-hashmap-orders'],
    interviewQuestionIds: ['q-085-arraylist-vs-linkedlist'],
    keywords: ['queue', 'deque', 'arraydeque', 'priorityqueue', 'fifo', 'lifo', 'heap', 'min-heap'],
  },

  {
    id: 'java-map-implementations',
    codeNumber: 'JAVA-046',
    languageId: 'java',
    title: 'Map: HashMap, LinkedHashMap, TreeMap & ConcurrentHashMap',
    slug: 'map-hashmap-linkedhashmap-treemap-concurrenthashmap',
    category: 'Collections Framework and Stream API',
    subcategory: 'Key-Value Storage',
    summary: 'Master key-value storage. Understand HashMap hash buckets and treeification, LinkedHashMap LRU caching, TreeMap key sorting, ConcurrentHashMap thread-safety, and map sorting techniques.',
    order: 37,
    estimatedMinutes: 18,
    learningObjectives: [
      'Explain how HashMap calculates bucket index: (n - 1) & hash.',
      'Understand Java 8 treeification: buckets switch from linked list to TreeNode when length exceeds 8.',
      'Compare HashMap, LinkedHashMap, TreeMap, and ConcurrentHashMap.',
      'Sort maps by key using TreeMap and sort by value using Stream API.',
      'Explain why ConcurrentHashMap does not allow null keys or null values.',
    ],
    whyItMatters: 'HashMap internal mechanics (buckets, collisions, load factor 0.75, treeification threshold 8) is tested in almost every senior Java technical interview.',
    sections: [
      {
        id: 'hashmap-internals',
        title: 'HashMap Internal Architecture (Java 8+)',
        content: 'HashMap stores key-value pairs in an internal array of Node<K, V> buckets. When put(key, value) is called:',
        bullets: [
          '1. key.hashCode() is hashed to spread bits evenly.',
          '2. Bucket index is determined by index = (capacity - 1) & hash.',
          '3. If multiple keys land in the same bucket (collision), they form a singly-linked list.',
          '4. **Treeification (Java 8+):** If a single bucket exceeds 8 nodes (TREEIFY_THRESHOLD) and total table capacity is at least 64, the linked list converts into a balanced Red-Black tree (TreeNode), improving worst-case search from O(n) to O(log n).',
          '5. **Load Factor (0.75):** When size > capacity * 0.75, the table doubles in size (rehashing).',
        ],
      },
      {
        id: 'map-code-example',
        title: 'HashMap in Action & Value Replacement',
        content: 'Save as Main.java. Notice entrySet() iteration and value replacement:',
        snippet: {
          language: 'java',
          filename: 'Main.java',
          code: `import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) {
        Map<Integer, String> words = new HashMap<>();
        words.put(1, "One");
        words.put(2, "Two");
        words.put(3, "Three");
        words.put(2, "Deux"); // Replaces value for existing key 2

        for (Map.Entry<Integer, String> entry : words.entrySet()) {
            System.out.println("Key: " + entry.getKey() + " -> " + entry.getValue());
        }

        System.out.println("Lookup key 1: " + words.get(1));
        System.out.println("Contains key 3: " + words.containsKey(3));
    }
}`,
          output: `Key: 1 -> One
Key: 2 -> Deux
Key: 3 -> Three
Lookup key 1: One
Contains key 3: true`,
          explanation: 'Putting key 2 with "Deux" replaces "Two" and returns the previous value.',
        },
      },
      {
        id: 'sorting-maps',
        title: 'How to Sort a Map by Key and Value',
        content: 'Maps do not guarantee sorted order by default. Here is how to sort them:',
        bullets: [
          '**Sort by Key:** Pass the map into a TreeMap: Map<K, V> sorted = new TreeMap<>(originalMap);',
          '**Sort by Value:** Stream the entrySet() with sorted(Map.Entry.comparingByValue()):',
        ],
        snippet: {
          language: 'java',
          filename: 'SortMap.java',
          code: `import java.util.HashMap;
import java.util.Map;

public class SortMap {
    public static void main(String[] args) {
        Map<Integer, String> words = new HashMap<>();
        words.put(3, "Three");
        words.put(1, "One");
        words.put(2, "Two");

        // Sort by value using Stream API
        words.entrySet().stream()
            .sorted(Map.Entry.comparingByValue())
            .forEach(e -> System.out.println(e.getKey() + " -> " + e.getValue()));
    }
}`,
          output: `1 -> One
3 -> Three
2 -> Two`,
          explanation: 'Sorted alphabetically by value: "One", "Three", "Two".',
        },
      },
    ],
    commonMistakes: [
      {
        mistake: 'Using mutable objects as HashMap keys and modifying their fields after insertion',
        fix: 'Mutating key fields changes its hashCode(), making the entry impossible to find in the bucket table (a silent memory leak). Always use immutable keys (String, Integer).',
      },
      {
        mistake: 'Assuming ConcurrentHashMap allows null keys or values',
        fix: 'ConcurrentHashMap throws NullPointerException on null keys or null values to prevent ambiguity in multithreaded lookups.',
      },
    ],
    keyTakeaways: [
      'HashMap is O(1) average; converts buckets to Red-Black trees when collision count exceeds 8.',
      'LinkedHashMap maintains insertion order; supports LRU cache access ordering.',
      'TreeMap orders entries by key using Red-Black trees in O(log n).',
      'ConcurrentHashMap provides thread-safe operations without locking the entire table.',
    ],
    relatedTopicIds: ['java-set-implementations', 'java-collection-framework-intro'],
    exerciseIds: ['ex-026-hashmap-orders'],
    interviewQuestionIds: ['q-087-hashmap-vs-treemap', 'q-084-is-map-a-collection'],
    keywords: ['hashmap', 'linkedhashmap', 'treemap', 'concurrenthashmap', 'treeification', 'buckets', 'load factor', 'sorting map'],
  },

  {
    id: 'java-iterator-traversal',
    codeNumber: 'JAVA-047',
    languageId: 'java',
    title: 'Iterator: Traversal, Safe Removal & ConcurrentModificationException',
    slug: 'iterator-safe-removal-concurrentmodificationexception',
    category: 'Collections Framework and Stream API',
    subcategory: 'Iteration & Traversal',
    summary: 'Master Iterator traversal with hasNext(), next(), and safe remove(). Understand fail-fast iterators, modCount tracking, and how to avoid ConcurrentModificationException.',
    order: 38,
    estimatedMinutes: 14,
    learningObjectives: [
      'Understand the Iterator interface methods: hasNext(), next(), and remove().',
      'Explain how fail-fast iterators detect structural modifications via modCount.',
      'Safely remove elements during traversal without throwing ConcurrentModificationException.',
      'Compare Iterator with ListIterator for bidirectional navigation and element replacement.',
    ],
    whyItMatters: 'Attempting to remove elements from a collection inside a standard for-each loop is a notorious rookie mistake that crashes production with ConcurrentModificationException. Knowing how Iterator.remove() coordinates with collection state is essential.',
    sections: [
      {
        id: 'iterator-basics',
        title: 'The Iterator Interface',
        content: 'An Iterator allows traversing any Collection element by element without exposing its underlying internal data structure:',
        bullets: [
          '**hasNext():** Returns true if more elements exist in the iteration.',
          '**next():** Returns the next element; throws NoSuchElementException if exhausted.',
          '**remove():** Removes the last element returned by next() from the underlying collection. This is the ONLY safe way to remove elements while actively iterating.',
        ],
      },
      {
        id: 'iterator-safe-removal-code',
        title: 'Safe Removal with Iterator vs The for-each Trap',
        content: 'Save as Main.java. Compare safe removal via iterator with the classic loop trap:',
        snippet: {
          language: 'java',
          filename: 'Main.java',
          code: `import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<Integer> numbers = new ArrayList<>();
        for (int i = 1; i <= 6; i++) numbers.add(i);

        // Safe removal using Iterator.remove()
        Iterator<Integer> iterator = numbers.iterator();
        while (iterator.hasNext()) {
            int value = iterator.next();
            if (value % 2 == 0) {
                iterator.remove(); // Safely updates both collection and iterator state
            }
        }

        System.out.println("Remaining odd numbers: " + numbers);
    }
}`,
          output: `Remaining odd numbers: [1, 3, 5]`,
          explanation: 'iterator.remove() synchronizes the internal expectedModCount with the list\'s modCount, avoiding ConcurrentModificationException.',
        },
      },
      {
        id: 'fail-fast-mechanics',
        title: 'Why list.remove() Crashes in a for-each Loop',
        content: 'Java collections maintain an internal counter named modCount tracking structural changes. When an iterator is created, it records expectedModCount = modCount. If you call list.remove() directly inside a loop, modCount increments, but expectedModCount is not updated. On the next iteration, next() detects expectedModCount != modCount and immediately throws ConcurrentModificationException.',
      },
    ],
    commonMistakes: [
      {
        mistake: 'Calling list.remove() inside an enhanced for loop',
        fix: 'Use iterator.remove(), or use modern Collection.removeIf(n -> n % 2 == 0) in Java 8+.',
      },
      {
        mistake: 'Calling iterator.remove() twice in a row without calling next() in between',
        fix: 'remove() can only be called once per call to next(). Calling it consecutively throws IllegalStateException.',
      },
    ],
    keyTakeaways: [
      'Iterator provides sequential one-way traversal.',
      'iterator.remove() is the safe way to delete items during iteration.',
      'modCount mismatches trigger fail-fast ConcurrentModificationException.',
      'Collection.removeIf() provides a concise functional alternative.',
    ],
    relatedTopicIds: ['java-enhanced-for-loop', 'java-collection-framework-intro'],
    exerciseIds: ['ex-029-iterator-remove-evens'],
    interviewQuestionIds: ['q-088-what-is-an-iterator'],
    keywords: ['iterator', 'hasnext', 'next', 'remove', 'concurrentmodificationexception', 'fail-fast', 'modcount'],
  },

  {
    id: 'java-enhanced-for-loop',
    codeNumber: 'JAVA-048',
    languageId: 'java',
    title: 'Enhanced for Loop (For-Each): Mechanics, Iterables & Limitations',
    slug: 'enhanced-for-loop-for-each-mechanics',
    category: 'Collections Framework and Stream API',
    subcategory: 'Iteration & Traversal',
    summary: 'Analyze the enhanced for loop. Understand how compiler bytecode transforms for-each over arrays vs Iterable collections, direct index limitations, and map iteration strategies.',
    order: 39,
    estimatedMinutes: 12,
    learningObjectives: [
      'Understand how the enhanced for loop operates over arrays and Iterable objects.',
      'Contrast enhanced for loop with traditional indexed for loop.',
      'Explain why modifying loop variables does not mutate primitive array values.',
      'Iterate over Maps using entrySet(), keySet(), and values().',
    ],
    whyItMatters: 'The enhanced for loop is the everyday workhorse of Java code. Understanding its bytecode lowering and why it cannot replace indexed manipulation or structural mutations prevents common logic errors.',
    sections: [
      {
        id: 'for-each-syntax-comparison',
        title: 'Enhanced for vs Traditional for',
        content: 'The enhanced for loop (introduced in Java 5) provides clean syntax for sequential reading:',
        table: {
          headers: ['Feature', 'Enhanced for loop', 'Traditional indexed for loop'],
          rows: [
            ['Best for', 'Reading every element sequentially', 'Index-based access, custom steps, backwards traversal'],
            ['Direct index access', 'No (must maintain separate counter)', 'Yes (i variable available)'],
            ['Structural modification', 'Unsafe (throws ConcurrentModificationException)', 'Possible if indices are handled with care'],
            ['Target types', 'Arrays and any java.lang.Iterable', 'Any condition-based counting logic'],
          ],
        },
      },
      {
        id: 'for-each-code-demo',
        title: 'Array and Map Iteration Examples',
        content: 'Save as Main.java. Notice how maps require iterating over their entrySet():',
        snippet: {
          language: 'java',
          filename: 'Main.java',
          code: `import java.util.List;
import java.util.Map;

public class Main {
    public static void main(String[] args) {
        // 1. Array iteration
        int[] quantities = {2, 5, 3};
        int total = 0;
        for (int q : quantities) {
            total += q;
        }
        System.out.println("Total quantity: " + total);

        // 2. Collection iteration
        List<String> items = List.of("Laptop", "Mouse", "Keyboard");
        for (String item : items) {
            System.out.println("Item: " + item);
        }

        // 3. Map iteration via entrySet()
        Map<Integer, String> codes = Map.of(200, "OK", 404, "Not Found");
        for (Map.Entry<Integer, String> entry : codes.entrySet()) {
            System.out.println(entry.getKey() + " -> " + entry.getValue());
        }
    }
}`,
          output: `Total quantity: 10
Item: Laptop
Item: Mouse
Item: Keyboard
200 -> OK
404 -> Not Found`,
          explanation: 'Behind the scenes, the compiler converts Iterable for-each loops into standard Iterator while loops.',
        },
      },
    ],
    commonMistakes: [
      {
        mistake: 'Trying to iterate directly over a Map with "for (Object o : map)"',
        fix: 'Map does not implement Iterable. Iterate over map.entrySet(), map.keySet(), or map.values().',
      },
      {
        mistake: 'Reassigning a loop variable expecting it to modify the source array',
        fix: 'The loop variable for primitives receives a copy of the value. Reassigning it has zero effect on the array.',
      },
    ],
    keyTakeaways: [
      'Enhanced for loop requires target to be an array or Iterable.',
      'Compiler rewrites Iterable loops using an internal Iterator.',
      'Use entrySet() to traverse Map keys and values cleanly.',
    ],
    relatedTopicIds: ['java-iterator-traversal', 'java-collection-framework-intro'],
    exerciseIds: ['ex-028-enhanced-for-loop'],
    interviewQuestionIds: ['q-089-enhanced-for-loop-internals'],
    keywords: ['enhanced for loop', 'for-each', 'iterable', 'entryset', 'keyset', 'array iteration'],
  },

  {
    id: 'java-comparator-sorting',
    codeNumber: 'JAVA-049',
    languageId: 'java',
    title: 'Comparator and Sorting: Custom Ordering & Lambda Chaining',
    slug: 'comparator-custom-sorting-lambda-chaining',
    category: 'Collections Framework and Stream API',
    subcategory: 'Sorting & Ordering',
    summary: 'Master custom object sorting with Comparator. Compare natural Comparable with flexible Comparator, avoid comparator contract violations, and chain sorting rules with comparingInt and reversed.',
    order: 40,
    estimatedMinutes: 16,
    learningObjectives: [
      'Distinguish Comparable (internal natural sort) from Comparator (external custom sort).',
      'Implement custom sorting using modern Java lambdas and method references.',
      'Explain why ternary (s1 > s2 ? -1 : 1) violates the comparator contract for equal values.',
      'Use Comparator.comparingInt(), thenComparing(), and reversed() for declarative multi-level sorting.',
    ],
    whyItMatters: 'Sorting collections of domain models (sorting products by rating, price descending, or creation date) is fundamental to every application and interview coding challenge.',
    sections: [
      {
        id: 'comparable-vs-comparator',
        title: 'Comparable vs Comparator',
        content: 'Understand when to implement Comparable vs when to supply a Comparator:',
        bullets: [
          '**Comparable<T>:** Implemented by the domain class itself (single natural sort order via compareTo(T o)). Examples: Integer, String.',
          '**Comparator<T>:** A separate functional interface ((o1, o2) -> int) enabling multiple different sort strategies on the same class without modifying the class source code.',
          '**Contract Rule:** compare(a, b) must return negative if a < b, zero if a == b, and positive if a > b. Returning non-zero for equal items causes sorting anomalies.',
        ],
      },
      {
        id: 'comparator-code-example',
        title: 'Sorting Students by Age Descending',
        content: 'Save as Main.java. Notice the use of Integer.compare() and Comparator.comparingInt():',
        snippet: {
          language: 'java',
          filename: 'Main.java',
          code: `import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

class Student {
    String name;
    int age;

    Student(String name, int age) {
        this.name = name;
        this.age = age;
    }

    @Override
    public String toString() {
        return name + " (" + age + ")";
    }
}

public class Main {
    public static void main(String[] args) {
        List<Student> students = new ArrayList<>();
        students.add(new Student("Alice", 25));
        students.add(new Student("Bob", 22));
        students.add(new Student("Charlie", 23));

        // 1. Lambda comparator: descending age
        students.sort((s1, s2) -> Integer.compare(s2.age, s1.age));
        System.out.println("Sorted descending by age: " + students);

        // 2. Modern declarative Comparator chaining
        students.sort(Comparator.comparingInt((Student s) -> s.age).reversed());
        System.out.println("Using comparingInt().reversed(): " + students);
    }
}`,
          output: `Sorted descending by age: [Alice (25), Charlie (23), Bob (22)]
Using comparingInt().reversed(): [Alice (25), Charlie (23), Bob (22)]`,
          explanation: 'Integer.compare(s2.age, s1.age) safely returns -1, 0, or 1 without arithmetic overflow risks.',
        },
      },
    ],
    commonMistakes: [
      {
        mistake: 'Using subtraction (s1.age - s2.age) or ternary (? -1 : 1)',
        fix: 'Direct subtraction can cause integer overflow if values are negative/large. Always use Integer.compare(a, b).',
      },
      {
        mistake: 'Failing to return 0 when elements are equal',
        fix: 'A comparator that never returns 0 violates transitivity and causes TimSort to throw IllegalArgumentException: Comparison method violates its general contract.',
      },
    ],
    keyTakeaways: [
      'Comparable provides single natural sort; Comparator enables multiple external sort orders.',
      'Always use Integer.compare() / Double.compare() instead of raw subtraction.',
      'Chain comparators declaratively with comparing(), thenComparing(), and reversed().',
    ],
    relatedTopicIds: ['java-list-implementations', 'java-stream-api'],
    exerciseIds: ['ex-030-comparator-student-age'],
    interviewQuestionIds: ['q-090-what-is-a-comparator'],
    keywords: ['comparator', 'comparable', 'compareto', 'comparingint', 'reversed', 'sorting', 'timsort'],
  },

  {
    id: 'java-stream-api',
    codeNumber: 'JAVA-050',
    languageId: 'java',
    title: 'Stream API: Data Pipeline, Operations & Lazy Evaluation',
    slug: 'stream-api-pipeline-operations-lazy-evaluation',
    category: 'Collections Framework and Stream API',
    subcategory: 'Functional Processing',
    summary: 'Master functional data transformation with Java Streams. Learn intermediate vs terminal operations, lazy execution, filter, map, distinct, sorted, and why streams cannot be reused.',
    order: 41,
    estimatedMinutes: 18,
    learningObjectives: [
      'Define a Stream as a non-mutating data computation pipeline.',
      'Differentiate intermediate operations (lazy) from terminal operations (eager).',
      'Apply core stream operations: filter(), map(), sorted(), distinct(), and toList().',
      'Explain lazy evaluation and why terminal operations are required to trigger execution.',
      'Understand why reusing a closed stream throws IllegalStateException.',
    ],
    whyItMatters: 'The Stream API (introduced in Java 8) revolutionized Java backend development. Enterprise codebases rely heavily on declarative stream pipelines for querying, mapping, and aggregating collections.',
    sections: [
      {
        id: 'stream-concepts',
        title: 'Core Concepts of Java Streams',
        content: 'A **Stream** is a sequence of elements supporting sequential and parallel aggregate operations. Key characteristics:',
        bullets: [
          '**No Storage:** A stream does not store elements; it conveys elements from a source (collection, array, I/O channel) through a pipeline of computational steps.',
          '**Functional in Nature:** An operation on a stream produces a result but does NOT modify its underlying source.',
          '**Lazy Evaluation:** Intermediate operations (filter, map) are lazy; they are not evaluated until a terminal operation (toList, forEach, count) is invoked. This allows optimizations like short-circuiting.',
          '**Consumable Once:** A stream can only be traversed once. After a terminal operation finishes, the stream is closed.',
        ],
      },
      {
        id: 'stream-code-example',
        title: 'Filter and Map Students Pipeline',
        content: 'Save as Main.java. Observe filtering, mapping, and collecting into an unmodifiable list:',
        snippet: {
          language: 'java',
          filename: 'Main.java',
          code: `import java.util.ArrayList;
import java.util.List;

class Student {
    String name;
    int age;

    Student(String name, int age) {
        this.name = name;
        this.age = age;
    }
}

public class Main {
    public static void main(String[] args) {
        List<Student> students = new ArrayList<>();
        students.add(new Student("Aisha", 25));
        students.add(new Student("Bilal", 22));
        students.add(new Student("Sara", 23));

        // Stream pipeline: filter older than 22, map to uppercase names, collect
        List<String> result = students.stream()
                .filter(s -> s.age > 22)
                .map(s -> s.name.toUpperCase())
                .toList(); // Modern Java 16+ terminal operation

        System.out.println("Matching Student Names: " + result);
    }
}`,
          output: `Matching Student Names: [AISHA, SARA]`,
          explanation: '1. filter() keeps Aisha and Sara (age > 22).\\n2. map() transforms Student objects to uppercase String values.\\n3. toList() is the terminal operation that triggers the pipeline and gathers results.',
        },
      },
      {
        id: 'stream-reuse-trap',
        title: 'CRITICAL TRAP: Do NOT Reuse a Consumed Stream',
        content: 'Once a terminal operation is executed on a stream, that stream is considered consumed and closed:',
        callout: {
          type: 'warning',
          title: 'IllegalStateException Alert',
          text: 'Attempting to operate on a stream after invoking a terminal operation throws java.lang.IllegalStateException: stream has already been operated upon or closed. Always obtain a fresh stream from the source collection!',
        },
      },
    ],
    commonMistakes: [
      {
        mistake: 'Reusing a stream instance after calling a terminal operation',
        fix: 'Always create a new stream from the source collection: students.stream()...',
      },
      {
        mistake: 'Expecting intermediate operations to execute without a terminal operation',
        fix: 'Streams are lazy. Without a terminal operation (like toList(), collect(), forEach()), zero elements are processed.',
      },
    ],
    keyTakeaways: [
      'Streams do not store data and do not mutate their source collection.',
      'Intermediate operations are lazy; terminal operations trigger execution.',
      'toList() produces an unmodifiable List in Java 16+.',
      'A stream cannot be reused after a terminal operation.',
    ],
    relatedTopicIds: ['java-method-references', 'java-optional-type', 'java-comparator-sorting'],
    exerciseIds: ['ex-031-streams-filter-map'],
    interviewQuestionIds: ['q-091-what-is-a-stream'],
    keywords: ['stream api', 'filter', 'map', 'tolist', 'lazy evaluation', 'terminal operation', 'intermediate operation'],
  },

  {
    id: 'java-method-references',
    codeNumber: 'JAVA-051',
    languageId: 'java',
    title: 'Method References: Syntax, Forms & Practical Usage',
    slug: 'method-references-syntax-forms',
    category: 'Collections Framework and Stream API',
    subcategory: 'Functional Processing',
    summary: 'Master method references in Java. Learn the 4 distinct syntactic forms (static, bound instance, unbound instance, constructor) that make lambda expressions ultra-concise.',
    order: 42,
    estimatedMinutes: 12,
    learningObjectives: [
      'Explain what a method reference is and how it relates to lambda expressions.',
      'Identify the 4 standard method reference types.',
      'Refactor verbose lambdas like s -> s.toUpperCase() into String::toUpperCase.',
      'Use System.out::println as a bound instance method reference.',
    ],
    whyItMatters: 'Method references make functional Java clean and readable, eliminating redundant argument boilerplate while preserving compile-time type safety.',
    sections: [
      {
        id: 'four-forms-table',
        title: 'The 4 Kinds of Method References',
        content: 'A method reference (::) is shorthand for a lambda that invokes an existing named method:',
        table: {
          headers: ['Kind', 'Syntax Example', 'Equivalent Lambda'],
          rows: [
            ['Reference to a static method', 'String::valueOf', 'x -> String.valueOf(x)'],
            ['Reference to an instance method of an arbitrary object', 'String::toUpperCase', 's -> s.toUpperCase()'],
            ['Reference to an instance method of an existing object', 'System.out::println', 'x -> System.out.println(x)'],
            ['Reference to a constructor', 'ArrayList::new', '() -> new ArrayList<>()'],
          ],
        },
      },
      {
        id: 'method-ref-code-example',
        title: 'Method References with Stream API',
        content: 'Save as Main.java. Compare verbose lambdas with concise method references:',
        snippet: {
          language: 'java',
          filename: 'Main.java',
          code: `import java.util.Arrays;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("Alice", "Bob", "Charlie");

        // String::toUpperCase is equivalent to name -> name.toUpperCase()
        List<String> upperNames = names.stream()
                .map(String::toUpperCase)
                .toList();

        // System.out::println is equivalent to s -> System.out.println(s)
        upperNames.forEach(System.out::println);
    }
}`,
          output: `ALICE
BOB
CHARLIE`,
          explanation: 'Method references pass method pointers directly to the functional interface without declaring parameter names.',
        },
      },
    ],
    commonMistakes: [
      {
        mistake: 'Trying to pass arguments inside a method reference: String::toUpperCase()',
        fix: 'Do not write parentheses (). Method references use only the class/instance name and method name: String::toUpperCase.',
      },
    ],
    keyTakeaways: [
      'Method references are shorthand syntax for lambdas that call existing methods.',
      'Syntax uses the :: double colon operator.',
      'No parentheses or arguments are specified.',
    ],
    relatedTopicIds: ['java-constructor-references', 'java-stream-api'],
    exerciseIds: ['ex-031-streams-filter-map'],
    interviewQuestionIds: ['q-092-method-references'],
    keywords: ['method reference', 'double colon', 'system.out::println', 'lambda shorthand', 'stream api'],
  },

  {
    id: 'java-constructor-references',
    codeNumber: 'JAVA-052',
    languageId: 'java',
    title: 'Constructor References: ClassName::new & Object Instantiation',
    slug: 'constructor-references-classname-new',
    category: 'Collections Framework and Stream API',
    subcategory: 'Functional Processing',
    summary: 'Master constructor references using ClassName::new. Learn how functional interfaces match constructor signatures for factory patterns and stream pipeline transformations.',
    order: 43,
    estimatedMinutes: 12,
    learningObjectives: [
      'Understand the syntax and behavior of ClassName::new.',
      'Explain how the compiler maps constructor parameters to functional interface arguments.',
      'Transform collections of raw data into domain objects using map(Student::new).',
      'Compare constructor references with Supplier and Function functional interfaces.',
    ],
    whyItMatters: 'Constructor references are widely used in clean architecture, DTO-to-entity mapping, and factory builders in modern Spring Boot and microservice pipelines.',
    sections: [
      {
        id: 'constructor-ref-mechanics',
        title: 'How ClassName::new Operates',
        content: 'A constructor reference is a specialized method reference that creates new object instances using the **new** keyword. The target functional interface must match the parameter signature of the desired constructor.',
        bullets: [
          'Supplier<List<String>> s = ArrayList::new; matches new ArrayList<>() (zero arguments).',
          'Function<String, Student> f = Student::new; matches new Student(String name) (one argument).',
          'BiFunction<String, Integer, Student> bf = Student::new; matches new Student(String name, int age) (two arguments).',
        ],
      },
      {
        id: 'constructor-ref-code-example',
        title: 'Transforming Names to Student Objects',
        content: 'Save as Main.java. Notice how names are mapped to domain models with Student::new:',
        snippet: {
          language: 'java',
          filename: 'Main.java',
          code: `import java.util.List;

class Student {
    String name;

    // Single-argument constructor matching Function<String, Student>
    Student(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "Student{name='" + name + "'}";
    }
}

public class Main {
    public static void main(String[] args) {
        List<String> names = List.of("Alice", "Bob", "Charlie");

        // Student::new is equivalent to name -> new Student(name)
        List<Student> students = names.stream()
                .map(Student::new)
                .toList();

        students.forEach(System.out::println);
    }
}`,
          output: `Student{name='Alice'}
Student{name='Bob'}
Student{name='Charlie'}`,
          explanation: 'Stream.map(Student::new) passes each String element directly into the Student(String name) constructor.',
        },
      },
    ],
    commonMistakes: [
      {
        mistake: 'Using ClassName::new when no constructor matches the functional interface parameters',
        fix: 'Ensure the class contains a constructor whose parameter types and count match the functional interface argument signature.',
      },
    ],
    keyTakeaways: [
      'ClassName::new references an object constructor.',
      'Function parameters automatically pass to the matching constructor.',
      'Eliminates factory boilerplate in Stream.map() object instantiation.',
    ],
    relatedTopicIds: ['java-method-references', 'java-stream-api'],
    exerciseIds: ['ex-032-constructor-reference'],
    interviewQuestionIds: ['q-092-method-references'],
    keywords: ['constructor reference', 'classname::new', 'factory', 'stream map', 'object instantiation'],
  },

  {
    id: 'java-optional-type',
    codeNumber: 'JAVA-053',
    languageId: 'java',
    title: 'Optional<T>: Representing Value Presence or Absence Safely',
    slug: 'optional-presence-absence-safety',
    category: 'Collections Framework and Stream API',
    subcategory: 'Defensive Programming',
    summary: 'Master java.util.Optional. Understand how to eliminate NullPointerExceptions gracefully using Optional.of, ofNullable, empty, orElse, orElseGet, and stream integration.',
    order: 44,
    estimatedMinutes: 16,
    learningObjectives: [
      'Understand the purpose of Optional: explicit representation of value presence or absence.',
      'Differentiate Optional.of() (throws NPE on null) from Optional.ofNullable() (safe).',
      'Apply safe fallback strategies: orElse(), orElseGet(), and orElseThrow().',
      'Explain why stream operations like findFirst() and findAny() return Optional.',
      'Identify best practices: use Optional primarily as a method return type, not for fields or parameters.',
    ],
    whyItMatters: 'NullPointerException (NPE) is historically the #1 runtime exception in Java production systems. Optional provides a clear, type-safe API contract signaling that a value may be absent.',
    sections: [
      {
        id: 'optional-factory-methods',
        title: 'Creating and Inspecting Optional Instances',
        content: 'Three factory methods create Optional wrappers:',
        bullets: [
          '**Optional.of(value):** Wraps a known non-null value. Throws NullPointerException immediately if value is null.',
          '**Optional.ofNullable(value):** Returns an Optional with the value if non-null, or Optional.empty() if value is null.',
          '**Optional.empty():** Represents an explicit empty result.',
        ],
      },
      {
        id: 'optional-code-example',
        title: 'Product Catalog Lookup with orElse Fallback',
        content: 'Save as Main.java. Observe how SKU lookups return Optional and fallback gracefully:',
        snippet: {
          language: 'java',
          filename: 'Main.java',
          code: `import java.util.Optional;

public class Main {
    static Optional<String> findProductName(String sku) {
        if ("SKU-101".equals(sku)) {
            return Optional.of("Wireless Mouse");
        }
        return Optional.empty(); // Explicit absence
    }

    public static void main(String[] args) {
        // Known SKU
        String p1 = findProductName("SKU-101").orElse("Product not found");
        System.out.println("SKU-101: " + p1);

        // Unknown SKU triggers fallback
        String p2 = findProductName("SKU-999").orElse("Product not found");
        System.out.println("SKU-999: " + p2);
    }
}`,
          output: `SKU-101: Wireless Mouse
SKU-999: Product not found`,
          explanation: 'findProductName returns Optional.empty() for SKU-999, which orElse() handles cleanly without throwing NullPointerException.',
        },
      },
      {
        id: 'optional-best-practices',
        title: 'Interview Best Practices for Optional',
        content: 'Senior engineering interviewers look for these modern practices:',
        bullets: [
          '**Never call optional.get() without checking:** Calling get() on an empty Optional throws NoSuchElementException. Prefer orElse(), orElseGet(), or orElseThrow().',
          '**Use as Return Types Only:** Optional is designed for method returns. Do not use Optional for class fields (it is not Serializable) or method parameters (it complicates caller code).',
          '**Streams & Optional:** Stream terminal operations like findFirst(), findAny(), min(), and max() return Optional because the stream might be empty.',
        ],
      },
    ],
    commonMistakes: [
      {
        mistake: 'Calling optional.get() directly without verifying presence',
        fix: 'Use optional.orElse(fallback), optional.ifPresent(action), or optional.orElseThrow().',
      },
      {
        mistake: 'Passing null into Optional.of(null)',
        fix: 'Optional.of() immediately throws NullPointerException. Use Optional.ofNullable(value) if the value may be null.',
      },
      {
        mistake: 'Using Optional<T> as a class field or collection element',
        fix: 'Optional is not Serializable and adds wrapper overhead. Use it exclusively as a method return type.',
      },
    ],
    keyTakeaways: [
      'Optional makes missing values explicit in API contracts.',
      'Use ofNullable() for values that might be null; use empty() for absence.',
      'orElseGet() calculates fallback lazily via a Supplier.',
      'Designed primarily for method return types, not fields or parameters.',
    ],
    relatedTopicIds: ['java-stream-api', 'java-method-references'],
    exerciseIds: ['ex-033-optional-sku-lookup'],
    interviewQuestionIds: ['q-093-what-is-optional'],
    keywords: ['optional', 'nullpointerexception', 'ofnullable', 'orelse', 'orelseget', 'findfirst', 'defensive programming'],
  },
];
