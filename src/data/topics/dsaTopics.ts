import { Topic } from '../../types';

export const DSA_TOPICS: Topic[] = [
  // 1. DSA Overview & Big-O Foundations
  {
    id: 'java-dsa-big-o-complexity-foundations',
    codeNumber: 'JAVA-061',
    languageId: 'java',
    title: 'Data Structures & Algorithms Overview: Big-O Complexity & Memory Foundations',
    slug: 'java-dsa-big-o-complexity-foundations',
    category: 'Data Structures & Algorithms',
    subcategory: 'Foundations',
    order: 52,
    estimatedMinutes: 25,
    summary:
      'Understand asymptotic analysis, Big-O notation, time complexity vs auxiliary space complexity, best/average/worst case bounds, and algorithmic scalability.',
    whyItMatters:
      'Every technical interview at top-tier software companies evaluates candidate code on time and space efficiency. Understanding why an algorithm scales gracefully or degrades exponentially is the foundation of high-performance engineering.',
    keyTakeaways: [
      'Big-O notation describes the upper bound on time or space growth as the input size n approaches infinity.',
      'Time complexity measures execution steps relative to input size n; Auxiliary space measures extra memory allocated beyond the input itself.',
      'Best Case (Omega Ω), Average Case (Theta Θ), and Worst Case (Big-O O) must be distinguished based on input permutations.',
      'Common orders of growth from fastest to slowest: O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2ⁿ) < O(n!).',
    ],
    sections: [
      {
        id: 'big-o-definition',
        title: '1. What is Big-O Notation & Asymptotic Analysis',
        content:
          '**Big-O notation** is a mathematical notation used in computer science to classify algorithms according to how their run time or memory requirements grow as the input size $n$ grows.\n\nRather than measuring real-world clock time (which fluctuates across hardware, CPU clock speeds, and JVM garbage collection pauses), Big-O measures the **growth rate of elementary operations**.\n\n### The Hierarchy of Growth Rates:\n- **$O(1)$ Constant Time**: Hash map lookup, array index access, stack push/pop.\n- **$O(\\log n)$ Logarithmic Time**: Binary search in a sorted array, balanced BST search.\n- **$O(n)$ Linear Time**: Single traversal of an array or linked list, linear search.\n- **$O(n \\log n)$ Linearithmic Time**: Merge Sort, Quick Sort (average), heap operations.\n- **$O(n^2)$ Quadratic Time**: Nested loops, Bubble Sort, Selection Sort, Insertion Sort.\n- **$O(2^n)$ Exponential Time**: Naive recursive Fibonacci, subsets generation.\n- **$O(n!)$ Factorial Time**: Generating all permutations of an array (Travelling Salesperson brute force).',
        bullets: [
          'Drop low-order terms: O(3n² + 5n + 100) simplifies to O(n²).',
          'Drop constant multipliers: O(2n) simplifies to O(n).',
          'Multiple inputs: An algorithm taking an array of length n and another of length m is O(n + m), not O(n).',
        ],
      },
      {
        id: 'time-vs-auxiliary-space',
        title: '2. Time Complexity vs Auxiliary Space Complexity',
        content:
          'In technical interviews, interviewers distinguish between **Total Space Complexity** and **Auxiliary Space Complexity**:\n\n- **Total Space**: Total memory required by the algorithm, including the space occupied by the input itself.\n- **Auxiliary Space**: Extra or temporary memory allocated by the algorithm to solve the problem (excluding the input data).\n\nFor example, reversing an array in-place requires $O(1)$ auxiliary space because it only uses a temporary swap variable. Creating a brand new array of size $n$ to store the reversed elements requires $O(n)$ auxiliary space.',
        bullets: [
          'Stack memory: Recursive calls consume call stack memory frames. A recursive algorithm of depth n has O(n) auxiliary space on the call stack.',
          'Primitive variables (int temp = a): O(1) auxiliary space.',
          'Dynamic data structures (new ArrayList(), int[] copy): O(n) auxiliary space.',
        ],
      },
      {
        id: 'common-mistakes',
        title: '3. Common Complexity Mistakes in Interviews',
        content:
          'Watch out for these common interview traps when analyzing algorithmic complexity:',
        bullets: [
          'Confusing average and worst cases: Quick Sort is O(n log n) average, but O(n²) worst case when poorly partitioned.',
          'Ignoring string concatenation: In Java, "str += c" inside a loop of length n creates a new string each iteration, taking O(n²) time. Use StringBuilder for O(n).',
          'Forgetting recursion call stack space: Binary search implemented iteratively uses O(1) auxiliary space; implemented recursively it uses O(log n) call stack space.',
          'Assuming Hash Maps are always O(1): Hash collisions can degrade HashMap lookups to O(log n) (treeified bucket) or O(n) (linked chain).',
        ],
      },
    ],
    exerciseIds: [],
    interviewQuestionIds: ['q-122-time-vs-space-complexity'],
    relatedTopicIds: ['java-dsa-arrays', 'java-dsa-searching-algorithms', 'java-dsa-sorting-algorithms'],
  },

  // 2. Arrays
  {
    id: 'java-dsa-arrays',
    codeNumber: 'JAVA-062',
    languageId: 'java',
    title: 'Arrays: Memory Layout, Insertion, Deletion & Scanner Input',
    slug: 'java-dsa-arrays',
    category: 'Data Structures & Algorithms',
    subcategory: 'Linear Data Structures',
    order: 53,
    estimatedMinutes: 30,
    summary:
      'Master Java primitive and reference arrays: contiguous heap allocation, zero-based indexing, Scanner console input, in-place traversals, and why insertion and deletion require element shifting.',
    whyItMatters:
      'Arrays are the foundational contiguous data structure underpinning ArrayLists, HashMaps, Ring Buffers, and Matrix representations. Understanding memory locality and cache lines is essential for high-throughput Java programming.',
    keyTakeaways: [
      'Java arrays are fixed-length objects allocated in contiguous heap memory; length cannot change after instantiation.',
      'Access by index is instant O(1) time because memory address is calculated directly: base_address + (index * element_size).',
      'Insertion and deletion at arbitrary index i require shifting n - i elements, resulting in O(n) time complexity.',
      'Primitive arrays are initialized with default values (0 for numbers, false for boolean, null for object references).',
    ],
    sections: [
      {
        id: 'array-definition',
        title: '1. Array Memory Model & Contiguous Allocation',
        content:
          'An **Array** is a linear data structure storing fixed-size collections of homogeneous elements in **contiguous memory locations**. In Java, arrays are true objects allocated on the JVM Heap.\n\n### Index Calculation Formula:\nBecause elements are stored contiguously in memory, the JVM calculates the physical memory address of any element in $O(1)$ constant time using the formula:\n\n$$\\text{Address}(A[i]) = \\text{Base Address} + (i \\times \\text{Size of Data Type})$$\n\nFor example, an `int[]` array at base address `1000` with 4-byte integers stores `A[3]` at $1000 + (3 \\times 4) = 1012$.',
        bullets: [
          'Fixed capacity: An array created as new int[5] cannot grow to hold a 6th element. Resizing requires allocating a larger array and copying elements.',
          'Zero-based indexing: Valid indices range strictly from 0 to length - 1. Accessing index >= length throws ArrayIndexOutOfBoundsException.',
          'Cache-friendly: Contiguous storage maximizes CPU L1/L2 cache locality, making array traversals significantly faster than linked pointer structures.',
        ],
      },
      {
        id: 'scanner-array-input',
        title: '2. User Input with Scanner & Array Processing',
        content:
          'Here is the standard, interview-approved pattern for reading array inputs from `System.in` using `java.util.Scanner`:',
        snippet: {
          language: 'java',
          filename: 'ArrayInputDemo.java',
          code: `import java.util.Arrays;
import java.util.Scanner;

public class ArrayInputDemo {
    public static void main(String[] args) {
        int[] values = new int[5];
        Scanner scanner = new Scanner(System.in);

        System.out.println("Enter 5 integers:");
        for (int i = 0; i < values.length; i++) {
            values[i] = scanner.nextInt();
        }

        System.out.println("Array contents: " + Arrays.toString(values));
        Arrays.sort(values);
        System.out.println("Sorted array: " + Arrays.toString(values));
        scanner.close();
    }
}`,
          output: `Enter 5 integers:
42 17 89 5 23
Array contents: [42, 17, 89, 5, 23]
Sorted array: [5, 17, 23, 42, 89]`,
          explanation:
            '- Arrays.toString(arr) formats array elements as a clean bracketed list [e1, e2, ...].\n- Arrays.sort(arr) sorts primitives using Dual-Pivot Quicksort in O(n log n) average time.\n- While standard libraries are used in production, understanding manual algorithms is essential for interview problem solving.',
        },
        githubLink: {
          url: 'https://github.com/khansuhel-dev-ai/core-java-practice/blob/main/datastructures/array/ArrayOperations.java',
          title: 'Explore the full implementation in my GitHub repository (ArrayOperations.java)',
        },
      },
      {
        id: 'operations-complexity',
        title: '3. Array Operations Complexity Matrix',
        content:
          'Analysis of time and auxiliary space complexity for standard array operations:',
        table: {
          headers: ['Operation', 'Best Case', 'Average Case', 'Worst Case', 'Auxiliary Space'],
          rows: [
            ['Index Access arr[i]', 'O(1)', 'O(1)', 'O(1)', 'O(1)'],
            ['Search (Unsorted)', 'O(1)', 'O(n)', 'O(n)', 'O(1)'],
            ['Search (Sorted / Binary)', 'O(1)', 'O(log n)', 'O(log n)', 'O(1)'],
            ['Insert at End (with space)', 'O(1)', 'O(1)', 'O(1)', 'O(1)'],
            ['Insert at Beginning/Middle', 'O(n)', 'O(n)', 'O(n)', 'O(1)'],
            ['Delete from Beginning/Middle', 'O(n)', 'O(n)', 'O(n)', 'O(1)'],
          ],
        },
        bullets: [
          'Insert/Delete require shifting: Inserting at index 0 requires shifting all n elements one position to the right.',
          'Deleting at index i requires shifting elements from i + 1 to n - 1 one position to the left.',
        ],
      },
    ],
    exerciseIds: ['ex-051-dsa-array-traversal'],
    interviewQuestionIds: ['q-125-array-vs-linkedlist-cache-locality'],
    relatedTopicIds: ['java-dsa-searching-algorithms', 'java-dsa-sorting-algorithms', 'java-dsa-linked-lists'],
  },

  // 3. Searching
  {
    id: 'java-dsa-searching-algorithms',
    codeNumber: 'JAVA-063',
    languageId: 'java',
    title: 'Searching Algorithms: Linear Search vs Binary Search',
    slug: 'java-dsa-searching-algorithms',
    category: 'Data Structures & Algorithms',
    subcategory: 'Algorithms',
    order: 54,
    estimatedMinutes: 25,
    summary:
      'Compare Linear Search and Binary Search: prerequisites (sorted input), iterative vs recursive execution, dry runs, and time/space complexity analysis.',
    whyItMatters:
      'Binary search is one of the most frequently tested concepts in technical coding interviews. Its logarithmic O(log n) efficiency enables searching billions of records in just 30 comparisons.',
    keyTakeaways: [
      'Linear Search checks elements sequentially; works on unsorted collections in O(n) average/worst time.',
      'Binary Search requires sorted input; repeatedly halves the search space by comparing against the middle element in O(log n) time.',
      'To prevent integer overflow in mid calculation, use "int mid = low + (high - low) / 2" instead of "(low + high) / 2".',
      'Iterative Binary Search uses O(1) auxiliary space; recursive Binary Search uses O(log n) call stack space.',
    ],
    sections: [
      {
        id: 'searching-comparison',
        title: '1. Linear Search vs Binary Search Mechanics',
        content:
          'Searching is the algorithmic process of locating a specific target key within a collection of elements:\n\n### 1. Linear Search\n- **Mechanism**: Inspects each element sequentially from index `0` to `n - 1` until the target is found or the array ends.\n- **Prerequisites**: None. Operates on unsorted and sorted arrays alike.\n- **Complexity**: Best $O(1)$ (target is at index 0), Average/Worst $O(n)$, Auxiliary Space $O(1)$.\n\n### 2. Binary Search\n- **Mechanism**: Divides the search interval in half. Compares the target against the middle element. If target is smaller, search continues in the left half; if larger, search continues in the right half.\n- **Prerequisites**: **Input array must be sorted in ascending order.**\n- **Complexity**: Best $O(1)$ (middle element is target), Average/Worst $O(\\log n)$.',
        bullets: [
          'Logarithmic scaling: Searching 1,000,000 elements with Linear Search takes up to 1,000,000 checks. Binary Search takes at most 20 checks.',
          'Searching 1,000,000,000 elements with Binary Search takes at most 30 checks.',
        ],
      },
      {
        id: 'binary-search-implementation',
        title: '2. Compilable Binary Search & Integer Overflow Prevention',
        content:
          'Here is the production implementation of iterative binary search in Java:',
        snippet: {
          language: 'java',
          filename: 'BinarySearch.java',
          code: `public class BinarySearch {

    public static int binarySearch(int[] arr, int target) {
        int low = 0;
        int high = arr.length - 1;

        while (low <= high) {
            // Prevent integer overflow: low + (high - low) / 2
            int mid = low + (high - low) / 2;

            if (arr[mid] == target) {
                return mid; // Target found at index mid
            } else if (arr[mid] < target) {
                low = mid + 1; // Search right half
            } else {
                high = mid - 1; // Search left half
            }
        }

        return -1; // Target not present in array
    }
}`,
          explanation:
            'Critical Interview Trap: Writing (low + high) / 2 can fail when low + high exceeds Integer.MAX_VALUE (2,147,483,647), causing negative integer overflow. Using low + (high - low) / 2 is mathematically equivalent and guaranteed overflow-safe.',
        },
        githubLink: {
          url: 'https://github.com/khansuhel-dev-ai/core-java-practice/blob/main/algorithms/searching/SearchAlgorithms.java',
          title: 'Explore the full implementation in my GitHub repository (SearchAlgorithms.java)',
        },
      },
      {
        id: 'search-complexity-table',
        title: '3. Searching Complexity Comparison',
        content:
          'Comparison table of search algorithm characteristics:',
        table: {
          headers: ['Algorithm', 'Sorted Req.', 'Best Time', 'Avg/Worst Time', 'Iterative Space', 'Recursive Space'],
          rows: [
            ['Linear Search', 'No', 'O(1)', 'O(n)', 'O(1)', 'O(n) call stack'],
            ['Binary Search', 'Yes', 'O(1)', 'O(log n)', 'O(1)', 'O(log n) call stack'],
          ],
        },
      },
    ],
    exerciseIds: ['ex-050-dsa-binary-search'],
    interviewQuestionIds: ['q-123-binary-search-overflow-trap'],
    relatedTopicIds: ['java-dsa-arrays', 'java-dsa-sorting-algorithms'],
  },

  // 4. Sorting
  {
    id: 'java-dsa-sorting-algorithms',
    codeNumber: 'JAVA-064',
    languageId: 'java',
    title: 'Sorting Algorithms: Bubble, Selection, Insertion & Quick Sort',
    slug: 'java-dsa-sorting-algorithms',
    category: 'Data Structures & Algorithms',
    subcategory: 'Algorithms',
    order: 55,
    estimatedMinutes: 35,
    summary:
      'Comprehensive study of fundamental sorting algorithms: Bubble Sort (with early exit), Selection Sort, Insertion Sort, and Quick Sort (partitioning). Includes stability, in-place classification, and time/space complexity analysis.',
    whyItMatters:
      'Sorting is a fundamental building block of algorithmic design. Interviewers evaluate candidates on understanding algorithmic stability, divide-and-conquer recursion, worst-case pivot degradation, and auxiliary memory trade-offs.',
    keyTakeaways: [
      'A sorting algorithm is STABLE if it preserves the relative order of equal keys (e.g. Insertion Sort is stable; standard Selection Sort and Quick Sort are not).',
      'Bubble Sort: Repeatedly swaps adjacent out-of-order elements; achieves O(n) best time ONLY with a boolean swapped early-exit optimization.',
      'Selection Sort: Finds minimum element and swaps it to current index; always O(n²) comparisons even if input is already sorted.',
      'Insertion Sort: Builds sorted subarray by inserting elements into correct position; O(n) best time and highly efficient for small or nearly sorted arrays.',
      'Quick Sort: Divide-and-conquer using a pivot; average O(n log n), worst case O(n²) when pivot selection is poor (e.g. sorted array with first element pivot).',
    ],
    sections: [
      {
        id: 'sorting-foundations',
        title: '1. Stability & In-Place Concepts Explained',
        content:
          'Before examining individual sorting algorithms, two core properties must be mastered:\n\n1. **In-Place Sorting**: An algorithm is *in-place* if it requires only $O(1)$ auxiliary memory beyond the input array to reorder elements (e.g. Bubble, Selection, Insertion, and Quick Sort in-place partitioning).\n2. **Algorithmic Stability**: An algorithm is *stable* if elements with duplicate keys retain their original relative order after sorting. For example, sorting an order list first by timestamp and then stably by customer ID guarantees that each customer\'s orders remain chronologically sorted.',
        bullets: [
          'Stable algorithms: Insertion Sort, Merge Sort, TimSort, Bubble Sort.',
          'Unstable algorithms: Selection Sort, Quick Sort (standard in-place partition), Heap Sort.',
          'Production Note: In production, java.util.Arrays.sort() uses Dual-Pivot Quicksort for primitives and TimSort for objects.',
        ],
      },
      {
        id: 'algorithms-breakdown',
        title: '2. Deep Dive: Bubble, Selection, Insertion & Quick Sort',
        content:
          '### 1. Bubble Sort\nCompares adjacent pairs and swaps them if `arr[j] > arr[j + 1]`. The largest element "bubbles up" to the end each pass.\n- **Early Exit Optimization**: Use a boolean flag `swapped`. If no swaps occur in a pass, break early. Best case becomes $O(n)$.\n\n### 2. Selection Sort\nDivides array into sorted and unsorted regions. Repeatedly searches the unsorted region for the minimum element and swaps it to the front.\n- **Characteristics**: Always performs $n(n - 1)/2$ comparisons. Best, average, and worst cases are all $O(n^2)$. Unstable in standard swap implementation.\n\n### 3. Insertion Sort\nMaintains a sorted subarray on the left. Takes the next element and shifts larger elements to the right to insert it into place.\n- **Characteristics**: Best case $O(n)$ when already sorted. Highly efficient for small datasets ($n < 30$) and nearly sorted collections. Stable.\n\n### 4. Quick Sort\nSelects a **pivot** element, partitions the array such that all elements $< \\text{pivot}$ are to its left and all elements $> \\text{pivot}$ are to its right, then recursively sorts both partitions.\n- **Characteristics**: Average $O(n \\log n)$, Worst $O(n^2)$. Average call stack $O(\\log n)$, worst call stack $O(n)$.',
        snippet: {
          language: 'java',
          filename: 'QuickSortDemo.java',
          code: `public class QuickSortDemo {

    public static void quickSort(int[] arr, int low, int high) {
        if (low < high) {
            int pivotIndex = partition(arr, low, high);
            quickSort(arr, low, pivotIndex - 1);
            quickSort(arr, pivotIndex + 1, high);
        }
    }

    private static int partition(int[] arr, int low, int high) {
        int pivot = arr[high]; // Choosing last element as pivot
        int i = low - 1;

        for (int j = low; j < high; j++) {
            if (arr[j] <= pivot) {
                i++;
                swap(arr, i, j);
            }
        }
        swap(arr, i + 1, high);
        return i + 1;
    }

    private static void swap(int[] arr, int i, int j) {
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
}`,
          explanation:
            'Lomuto partition scheme: Places smaller elements to the left of the pivot. The pivot is placed at index i + 1, which is returned as the partition boundary.',
        },
        githubLink: {
          url: 'https://github.com/khansuhel-dev-ai/core-java-practice/blob/main/algorithms/sorting/SortingAlgorithms.java',
          title: 'Explore the full implementation in my GitHub repository (SortingAlgorithms.java)',
        },
      },
      {
        id: 'sorting-complexity-matrix',
        title: '3. Sorting Complexity & Stability Reference',
        content:
          'Comparison matrix of the 4 fundamental sorting algorithms:',
        table: {
          headers: ['Algorithm', 'Best Time', 'Average Time', 'Worst Time', 'Auxiliary Space', 'Stable?'],
          rows: [
            ['Bubble Sort', 'O(n) (with flag)', 'O(n²)', 'O(n²)', 'O(1)', 'Yes'],
            ['Selection Sort', 'O(n²)', 'O(n²)', 'O(n²)', 'O(1)', 'No'],
            ['Insertion Sort', 'O(n)', 'O(n²)', 'O(n²)', 'O(1)', 'Yes'],
            ['Quick Sort', 'O(n log n)', 'O(n log n)', 'O(n²)', 'O(log n) avg stack', 'No (standard)'],
          ],
        },
      },
    ],
    exerciseIds: [],
    interviewQuestionIds: ['q-124-sorting-stability'],
    relatedTopicIds: ['java-dsa-arrays', 'java-dsa-searching-algorithms'],
  },

  // 5. Linked Lists
  {
    id: 'java-dsa-linked-lists',
    codeNumber: 'JAVA-065',
    languageId: 'java',
    title: 'Linked Lists: Singly, Doubly & Circular Linked Lists',
    slug: 'java-dsa-linked-lists',
    category: 'Data Structures & Algorithms',
    subcategory: 'Linear Data Structures',
    order: 56,
    estimatedMinutes: 35,
    summary:
      'Master dynamic node-based linked data structures: Singly Linked Lists, Doubly Linked Lists, and Circular Linked Lists. Covers node pointer models, insertion at start/end/index, deletion, and boundary edge cases.',
    whyItMatters:
      'Linked lists are the quintessential pointer-manipulation data structure tested in software engineering interviews. Mastering node traversal, edge cases (empty lists, single elements, cycle detection), and memory trade-offs is essential.',
    keyTakeaways: [
      'Linked list nodes consist of data and pointer references (next, and prev for Doubly Linked Lists).',
      'Dynamic allocation: Does not require contiguous memory blocks or pre-allocated capacities.',
      'Insertion and deletion at the head are instant O(1) operations; accessing an arbitrary index i requires O(i) sequential traversal.',
      'Always guard against NullPointerExceptions by checking for empty list (head == null) and single-element edge cases.',
    ],
    sections: [
      {
        id: 'linked-list-architectures',
        title: '1. Node Model: Singly, Doubly & Circular Lists',
        content:
          'A **Linked List** is a linear data structure where elements are stored in standalone **nodes**. Unlike arrays, nodes are dynamically allocated anywhere in heap memory and linked via reference pointers:\n\n1. **Singly Linked List**: Each node contains `data` and a single reference pointer `next` pointing to the subsequent node. The last node points to `null`.\n2. **Doubly Linked List**: Each node contains `data`, `next`, and a `prev` pointer pointing to the preceding node. Allows bidirectional traversal and $O(1)$ deletion when the node reference is already known.\n3. **Circular Linked List**: The `next` pointer of the final node loops back to reference the `head` node rather than terminating at `null`.',
        bullets: [
          'Head reference: Entry point pointer to the first node in the list.',
          'Tail reference: Pointer to the last node. Maintaining a tail pointer enables O(1) append operations at the end.',
          'Memory overhead: Each node incurs object overhead plus 8 bytes per reference pointer (next, prev).',
        ],
      },
      {
        id: 'linked-list-code-snippets',
        title: '2. Node Definition & Key Operations (insertAt, delete)',
        content:
          'Here is the standard node structure and insertion implementation with zero-based index bounds checking:',
        snippet: {
          language: 'java',
          filename: 'SinglyLinkedList.java',
          code: `public class SinglyLinkedList {

    static class Node {
        int data;
        Node next;

        Node(int data) {
            this.data = data;
            this.next = null;
        }
    }

    private Node head;
    private int size = 0;

    // Insert at beginning: O(1) time
    public void insertAtStart(int value) {
        Node newNode = new Node(value);
        newNode.next = head;
        head = newNode;
        size++;
    }

    // Insert at specific zero-based index: O(n) traversal
    public void insertAt(int index, int value) {
        if (index < 0 || index > size) {
            throw new IndexOutOfBoundsException("Invalid index: " + index);
        }
        if (index == 0) {
            insertAtStart(value);
            return;
        }
        Node current = head;
        for (int i = 0; i < index - 1; i++) {
            current = current.next;
        }
        Node newNode = new Node(value);
        newNode.next = current.next;
        current.next = newNode;
        size++;
    }
}`,
          explanation:
            'Shows proper edge case handling: index 0 re-wires head pointer in O(1) time. Arbitrary index traverses to index - 1 and updates pointer references.',
        },
        githubLink: {
          url: 'https://github.com/khansuhel-dev-ai/core-java-practice/blob/main/datastructures/linkedlist/SinglyLinkedList.java',
          title: 'Explore SinglyLinkedList.java in my GitHub repository',
        },
      },
      {
        id: 'doubly-and-circular-links',
        title: '3. Doubly and Circular Implementations',
        content:
          'Explore full implementations of Doubly Linked Lists, Circular Linked Lists, and shared node classes in the core-java-practice repository:',
        githubLink: {
          url: 'https://github.com/khansuhel-dev-ai/core-java-practice/blob/main/datastructures/linkedlist/DoublyLinkedList.java',
          title: 'Explore DoublyLinkedList.java in my GitHub repository',
        },
        bullets: [
          'Doubly Linked List implementation: Bidirectional traversal and O(1) deletion given a node reference.',
          'Circular Linked List: Ring buffer semantics where tail.next == head.',
          'Shared node classes available at: https://github.com/khansuhel-dev-ai/core-java-practice/tree/main/datastructures/common',
        ],
      },
      {
        id: 'linked-list-complexity',
        title: '4. Linked List Operations Complexity Matrix',
        content:
          'Time and space complexity under standard implementation assumptions:',
        table: {
          headers: ['Operation', 'Singly (No Tail)', 'Singly (With Tail)', 'Doubly Linked List', 'Auxiliary Space'],
          rows: [
            ['Insert at Head', 'O(1)', 'O(1)', 'O(1)', 'O(1)'],
            ['Insert at Tail', 'O(n)', 'O(1)', 'O(1)', 'O(1)'],
            ['Delete Head', 'O(1)', 'O(1)', 'O(1)', 'O(1)'],
            ['Delete Tail', 'O(n)', 'O(n) (needs prev)', 'O(1) (tail.prev)', 'O(1)'],
            ['Search / Access by Index', 'O(n)', 'O(n)', 'O(n)', 'O(1)'],
          ],
        },
      },
    ],
    exerciseIds: ['ex-052-dsa-linked-list-insert'],
    interviewQuestionIds: ['q-125-array-vs-linkedlist-cache-locality'],
    relatedTopicIds: ['java-dsa-arrays', 'java-dsa-stacks', 'java-dsa-queues'],
  },

  // 6. Stacks
  {
    id: 'java-dsa-stacks',
    codeNumber: 'JAVA-066',
    languageId: 'java',
    title: 'Stacks: LIFO Abstract Data Type & ArrayDeque',
    slug: 'java-dsa-stacks',
    category: 'Data Structures & Algorithms',
    subcategory: 'Linear Data Structures',
    order: 57,
    estimatedMinutes: 25,
    summary:
      'Master the Stack Abstract Data Type (LIFO): push, pop, peek operations, stack overflow/underflow, expression parsing, browser navigation, and why ArrayDeque is preferred over java.util.Stack.',
    whyItMatters:
      'Stacks manage method invocation frames in the JVM call stack, evaluate arithmetic expressions, power undo/redo buffers, and drive Depth-First Search (DFS) graph traversals.',
    keyTakeaways: [
      'A Stack is a Last-In, First-Out (LIFO) Abstract Data Type (ADT).',
      'Core operations push(item), pop(), and peek() operate in O(1) constant time.',
      'Popping from an empty stack triggers Stack Underflow (EmptyStackException); pushing to a full fixed-capacity array stack causes Stack Overflow.',
      'Java\'s legacy java.util.Stack extends Vector and incurs thread synchronization overhead; production code should use Deque / ArrayDeque instead.',
    ],
    sections: [
      {
        id: 'stack-mechanics',
        title: '1. The LIFO Abstract Data Type & Use Cases',
        content:
          'A **Stack** is an Abstract Data Type (ADT) that enforces a strict **Last-In, First-Out (LIFO)** access discipline. Elements can only be added or removed from a single designated end called the **top**.\n\n### Core Operations:\n- `push(item)`: Adds an element to the top of the stack ($O(1)$).\n- `pop()`: Removes and returns the top element ($O(1)$).\n- `peek()`: Returns the top element without removing it ($O(1)$) — *spelled peek, not peak*.\n- `isEmpty()`: Checks if the stack contains zero elements ($O(1)$).\n- `size()`: Returns current element count ($O(1)$).\n\n### Real-World Use Cases:\n1. **JVM Call Stack**: Tracks method execution frames, local variables, and return addresses.\n2. **Undo/Redo Operations**: Text editors push user keystrokes onto an undo stack.\n3. **Expression Evaluation & Syntax Parsing**: Matching parentheses `({[]})` in compilers and math parsers.\n4. **Browser History**: The "Back" button pops the most recently visited URL from a navigation stack.',
        bullets: [
          'Stack Underflow: Attempting to pop() or peek() when isEmpty() is true.',
          'Stack Overflow: Attempting to push() to an array-based stack that has reached maximum fixed capacity.',
        ],
      },
      {
        id: 'arraydeque-vs-legacy-stack',
        title: '2. Modern Java Best Practice: ArrayDeque vs java.util.Stack',
        content:
          'In Java, `java.util.Stack` was created in JDK 1.0 and extends `java.util.Vector`. Every method in `Stack` is `synchronized`, causing unnecessary thread lock contention in single-threaded application code.\n\n**Modern Best Practice**: Use `java.util.ArrayDeque` as a LIFO stack implementation:',
        snippet: {
          language: 'java',
          filename: 'StackBestPractice.java',
          code: `import java.util.ArrayDeque;
import java.util.Deque;

public class StackBestPractice {
    public static void main(String[] args) {
        // Preferred modern stack implementation
        Deque<String> stack = new ArrayDeque<>();

        // Push elements to top of stack
        stack.push("Page A");
        stack.push("Page B");
        stack.push("Page C");

        // Inspect top element without removing
        System.out.println("Top of stack (peek): " + stack.peek()); // Page C

        // Pop elements in LIFO order
        while (!stack.isEmpty()) {
            System.out.println("Popped: " + stack.pop());
        }
    }
}`,
          output: `Top of stack (peek): Page C
Popped: Page C
Popped: Page B
Popped: Page A`,
          explanation:
            'ArrayDeque is faster than Stack (no synchronized overhead) and faster than LinkedList (cache locality on contiguous array buffer).',
        },
        githubLink: {
          url: 'https://github.com/khansuhel-dev-ai/core-java-practice/blob/main/datastructures/stack/Stack.java',
          title: 'Explore custom Stack.java in my GitHub repository',
        },
      },
    ],
    exerciseIds: ['ex-053-dsa-stack-parentheses'],
    interviewQuestionIds: ['q-126-stack-queue-arraydeque-over-legacy-stack'],
    relatedTopicIds: ['java-dsa-queues', 'java-dsa-linked-lists'],
  },

  // 7. Queues
  {
    id: 'java-dsa-queues',
    codeNumber: 'JAVA-067',
    languageId: 'java',
    title: 'Queues: FIFO Abstract Data Type & Circular Queues',
    slug: 'java-dsa-queues',
    category: 'Data Structures & Algorithms',
    subcategory: 'Linear Data Structures',
    order: 58,
    estimatedMinutes: 25,
    summary:
      'Master the Queue Abstract Data Type (FIFO): enqueue, dequeue, peek, circular queue modulo wraparound, print spoolers, request buffering, and Breadth-First Search (BFS).',
    whyItMatters:
      'Queues provide fair, ordered processing in message brokers (RabbitMQ, Kafka), asynchronous thread pool executors, web server request buffers, and graph BFS algorithms.',
    keyTakeaways: [
      'A Queue is a First-In, First-Out (FIFO) Abstract Data Type.',
      'Enqueue adds to the rear/tail; Dequeue removes from the front/head in O(1) time.',
      'Circular Queues use modulo arithmetic "(rear + 1) % capacity" to wrap around and reuse vacated array slots without shifting elements.',
      'Primary applications: Breadth-First Search (BFS), asynchronous job scheduling, and IO rate buffering.',
    ],
    sections: [
      {
        id: 'queue-mechanics',
        title: '1. The FIFO Model & Circular Queue Modulo Wraparound',
        content:
          'A **Queue** is an Abstract Data Type enforcing a strict **First-In, First-Out (FIFO)** order. Elements are inserted at the **rear** (enqueue) and removed from the **front** (dequeue).\n\n### The Linear Array Queue Problem:\nIn a naive array queue, dequeueing an element from index 0 leaves an empty slot. Shifting all remaining elements left takes $O(n)$ time.\n\n### The Circular Queue Solution:\nA **Circular Queue** solves this by treating the array as a ring using modulo arithmetic. When `rear` reaches `capacity - 1`, the next element wraps around to index `0` if empty:\n\n$$\\text{rear} = (\\text{rear} + 1) \\pmod{\\text{capacity}}$$',
        bullets: [
          'Enqueue: Adds item at rear pointer in O(1) time.',
          'Dequeue: Removes and returns item at front pointer in O(1) time.',
          'Use cases: CPU task scheduling, print job spooling, web server socket backlogs, and graph Breadth-First Search.',
        ],
        githubLink: {
          url: 'https://github.com/khansuhel-dev-ai/core-java-practice/blob/main/datastructures/queue/Queue.java',
          title: 'Explore Queue.java in my GitHub repository',
        },
      },
    ],
    exerciseIds: [],
    interviewQuestionIds: ['q-126-stack-queue-arraydeque-over-legacy-stack'],
    relatedTopicIds: ['java-dsa-stacks', 'java-dsa-graphs', 'java-dsa-trees-binary-search-trees'],
  },

  // 8. Trees and BST
  {
    id: 'java-dsa-trees-binary-search-trees',
    codeNumber: 'JAVA-068',
    languageId: 'java',
    title: 'Trees & Binary Search Trees (BST): Traversals & Balancing',
    slug: 'java-dsa-trees-binary-search-trees',
    category: 'Data Structures & Algorithms',
    subcategory: 'Hierarchical Data Structures',
    order: 59,
    estimatedMinutes: 35,
    summary:
      'Master non-linear hierarchical data structures: tree terminology (root, edge, height in edges vs nodes), strict vs perfect vs complete binary trees, BST ordering property, and the 4 traversals (In-order, Pre-order, Post-order, Level-order).',
    whyItMatters:
      'Trees power relational database indexes (B+ Trees), file systems, compiler ASTs, Java HashMap treeified buckets (Red-Black Trees), and priority queues.',
    keyTakeaways: [
      'Binary Search Tree (BST) Ordering Property: For every node N, all values in N\'s left subtree must be < N.value, and all values in N\'s right subtree must be > N.value.',
      'In-order traversal (Left → Node → Right) of a BST ALWAYS visits nodes in ascending sorted order.',
      'Pre-order (Node → Left → Right) is used for cloning trees; Post-order (Left → Right → Node) is used for deleting/freeing tree nodes.',
      'BST search, insertion, and deletion are O(log n) on average, but degrade to O(n) worst case if the tree becomes skewed into a linked list.',
    ],
    sections: [
      {
        id: 'tree-terminology',
        title: '1. Tree Terminology & Binary Tree Classifications',
        content:
          'A **Tree** is a non-linear hierarchical data structure composed of nodes connected by directed or undirected edges:\n\n- **Root**: The topmost node with no parent.\n- **Parent / Child**: Directed edge connection between nodes.\n- **Leaf**: A node with zero children.\n- **Subtree**: Any node in the tree together with all its descendants.\n- **Height**: The number of edges (or nodes depending on convention) on the longest downward path from that node to a leaf. *In standard algorithm textbooks, height is defined as the number of edges; a leaf node has height 0*.\n\n### Three Critical Binary Tree Classifications:\n1. **Full / Strict Binary Tree**: Every node has either exactly 0 or 2 children.\n2. **Perfect Binary Tree**: All internal nodes have 2 children, and all leaf nodes reside at the exact same depth.\n3. **Complete Binary Tree**: Every level, except possibly the last, is completely filled, and all nodes in the last level are as far left as possible (the basis for Binary Heaps).',
        bullets: [
          'Binary Tree: Every node has at most 2 children (left and right).',
          'BST Duplicate Policy: Typically duplicate keys are either disallowed or mapped into counter fields in production.',
        ],
      },
      {
        id: 'tree-traversals',
        title: '2. The 4 Essential Tree Traversals',
        content:
          'Tree traversal is the process of visiting every node in the tree exactly once:\n\n1. **In-order Traversal (Left → Node → Right)**: Produces keys in ascending sorted order for any valid BST.\n2. **Pre-order Traversal (Node → Left → Right)**: Visits root first. Used to serialize or duplicate a tree hierarchy.\n3. **Post-order Traversal (Left → Right → Node)**: Visits children before parent. Used for bottom-up operations like calculating directory disk usage or memory deallocation.\n4. **Level-order Traversal (Breadth-First Search)**: Visits nodes level by level from top to bottom, left to right, implemented using an auxiliary `Queue`.',
        snippet: {
          language: 'java',
          filename: 'BSTTraversals.java',
          code: `// In-order traversal: Left -> Node -> Right
public void inOrder(TreeNode root) {
    if (root == null) return;
    inOrder(root.left);
    System.out.print(root.val + " ");
    inOrder(root.right);
}

// Level-order traversal using Queue: O(n) time, O(w) space
public void levelOrder(TreeNode root) {
    if (root == null) return;
    Queue<TreeNode> queue = new LinkedList<>();
    queue.offer(root);

    while (!queue.isEmpty()) {
        TreeNode current = queue.poll();
        System.out.print(current.val + " ");
        if (current.left != null) queue.offer(current.left);
        if (current.right != null) queue.offer(current.right);
    }
}`,
          explanation:
            'In-order produces sorted order for BSTs. Level-order uses an auxiliary FIFO Queue to visit nodes level-by-level.',
        },
        githubLink: {
          url: 'https://github.com/khansuhel-dev-ai/core-java-practice/blob/main/datastructures/tree/BinarySearchTree.java',
          title: 'Explore BinarySearchTree.java in my GitHub repository',
        },
      },
      {
        id: 'bst-complexity',
        title: '3. BST Complexity & Balancing Concepts',
        content:
          'Complexity comparison between balanced and skewed Binary Search Trees:',
        table: {
          headers: ['Operation', 'Average (Balanced)', 'Worst Case (Skewed / Degenerate)', 'Auxiliary Space'],
          rows: [
            ['Search', 'O(log n)', 'O(n)', 'O(h) recursion stack'],
            ['Insert', 'O(log n)', 'O(n)', 'O(h) recursion stack'],
            ['Delete', 'O(log n)', 'O(n)', 'O(h) recursion stack'],
          ],
        },
        bullets: [
          'Skewed Tree: Inserting sorted data [1, 2, 3, 4, 5] into an unbalanced BST causes it to degenerate into a linked list of height n, degrading search to O(n).',
          'Self-Balancing Trees (AVL Trees, Red-Black Trees): Perform tree rotations on insert/delete to maintain O(log n) height guarantees.',
        ],
      },
    ],
    exerciseIds: ['ex-054-dsa-bst-inorder-traversal'],
    interviewQuestionIds: ['q-127-bst-worst-case-and-balancing'],
    relatedTopicIds: ['java-dsa-graphs', 'java-dsa-stacks', 'java-dsa-queues'],
  },

  // 9. Graphs
  {
    id: 'java-dsa-graphs',
    codeNumber: 'JAVA-069',
    languageId: 'java',
    title: 'Graphs: Adjacency List, Matrix, BFS & DFS Traversals',
    slug: 'java-dsa-graphs',
    category: 'Data Structures & Algorithms',
    subcategory: 'Non-Linear Data Structures',
    order: 60,
    estimatedMinutes: 35,
    summary:
      'Master graph data structures: vertices, edges, directed vs undirected, weighted vs unweighted, cycle detection, connected components, Adjacency Matrix vs Adjacency List representations, and Breadth-First Search (BFS) vs Depth-First Search (DFS) with visited sets.',
    whyItMatters:
      'Graphs model real-world interconnected networks: social connections, GPS road routes, supply chain fulfillment pipelines, microservice dependency trees, and package manager conflict resolvers.',
    keyTakeaways: [
      'A Graph G = (V, E) consists of a set of vertices (V) connected by edges (E).',
      'Adjacency List uses O(V + E) space and is optimal for sparse graphs; Adjacency Matrix uses O(V²) space and provides O(1) edge existence checks.',
      'Breadth-First Search (BFS) uses a Queue and visited set to find the shortest path in unweighted graphs.',
      'Depth-First Search (DFS) uses recursion or a Stack to explore deeply along each branch, used for cycle detection and topological sorting.',
    ],
    sections: [
      {
        id: 'graph-foundations',
        title: '1. Graph Core Concepts & Representations',
        content:
          'A **Graph** is a non-linear data structure consisting of a finite set of **vertices (nodes)** and **edges (links)** connecting pairs of vertices:\n\n- **Directed Graph (Digraph)**: Edges have an assigned direction ($u \\to v$). Example: Web page hyperlinks or Twitter follows.\n- **Undirected Graph**: Edges are bidirectional ($u \\leftrightarrow v$). Example: Facebook friendships.\n- **Weighted Graph**: Edges carry numerical costs, distances, or capacities. Example: Flight routes with airfares.\n\n### Representations: Adjacency Matrix vs Adjacency List\n1. **Adjacency Matrix**: A 2D array `matrix[V][V]` where `matrix[u][v] = 1` if an edge exists. Space complexity is $O(V^2)$. Best for dense graphs ($E \\approx V^2$).\n2. **Adjacency List**: An array or `Map<Integer, List<Integer>>` where each vertex stores a list of its direct neighbors. Space complexity is $O(V + E)$. Best for sparse graphs ($E \\ll V^2$).',
        bullets: [
          'Sparse graph preference: Most real-world graphs (social networks, roads) are sparse. Adjacency lists are the standard industry choice.',
          'Edge existence check: Matrix is O(1); List is O(degree(u)).',
        ],
      },
      {
        id: 'bfs-and-dfs-algorithms',
        title: '2. Graph Traversals: BFS vs DFS with Visited Sets',
        content:
          'Because graphs can contain cycles, traversals must maintain a `boolean[] visited` or `Set<Integer> visited` to avoid infinite loops:',
        snippet: {
          language: 'java',
          filename: 'GraphTraversals.java',
          code: `import java.util.*;

public class GraphTraversals {

    // Breadth-First Search: explores neighbors level-by-level
    public static void bfs(int start, Map<Integer, List<Integer>> adj) {
        Set<Integer> visited = new HashSet<>();
        Queue<Integer> queue = new LinkedList<>();

        visited.add(start);
        queue.offer(start);

        while (!queue.isEmpty()) {
            int node = queue.poll();
            System.out.print(node + " ");

            for (int neighbor : adj.getOrDefault(node, Collections.emptyList())) {
                if (!visited.contains(neighbor)) {
                    visited.add(neighbor);
                    queue.offer(neighbor);
                }
            }
        }
    }
}`,
          explanation:
            'Time complexity of BFS and DFS using an Adjacency List is O(V + E) because every vertex and edge is examined at most once.',
        },
        githubLink: {
          url: 'https://github.com/khansuhel-dev-ai/core-java-practice/blob/main/datastructures/graph/Graph.java',
          title: 'Explore Graph.java in my GitHub repository',
        },
      },
    ],
    exerciseIds: [],
    interviewQuestionIds: [],
    relatedTopicIds: ['java-dsa-trees-binary-search-trees', 'java-dsa-queues'],
  },

  // 10. Complexity Matrix
  {
    id: 'java-dsa-complexity-reference-matrix',
    codeNumber: 'JAVA-070',
    languageId: 'java',
    title: 'Algorithmic Complexity Reference & Data Structures Matrix',
    slug: 'java-dsa-complexity-reference-matrix',
    category: 'Data Structures & Algorithms',
    subcategory: 'Reference & Synthesis',
    order: 61,
    estimatedMinutes: 20,
    summary:
      'Master reference cheat sheet comparing time and space complexities across Arrays, Linked Lists, Stacks, Queues, Binary Search Trees, Graphs (BFS/DFS), and Sorting Algorithms.',
    whyItMatters:
      'Quick reference summary table consolidating operations, complexities, and real-world trade-offs for rapid revision before technical phone screens and on-site algorithmic rounds.',
    keyTakeaways: [
      'Choose the right data structure based on the dominant access, search, and mutation patterns of your problem.',
      'Arrays are optimal for index access and cache locality; Linked Lists are optimal for frequent head insertions and dynamic allocations.',
      'HashMaps provide average O(1) operations, while BSTs provide guaranteed sorted traversals in O(log n) time.',
    ],
    sections: [
      {
        id: 'master-data-structures-table',
        title: '1. Master Data Structures Complexity Matrix',
        content:
          'Summary of operational complexities across all core data structures:',
        table: {
          headers: ['Data Structure', 'Access', 'Search', 'Insertion', 'Deletion', 'Auxiliary Space'],
          rows: [
            ['Array', 'O(1)', 'O(n)', 'O(n)', 'O(n)', 'O(1)'],
            ['Singly Linked List', 'O(n)', 'O(n)', 'O(1) (head)', 'O(1) (head)', 'O(1)'],
            ['Doubly Linked List', 'O(n)', 'O(n)', 'O(1) (ends)', 'O(1) (given node)', 'O(1)'],
            ['Stack (ArrayDeque)', 'O(n)', 'O(n)', 'O(1) (push)', 'O(1) (pop)', 'O(n)'],
            ['Queue (Circular / Deque)', 'O(n)', 'O(n)', 'O(1) (enqueue)', 'O(1) (dequeue)', 'O(n)'],
            ['Binary Search Tree (Avg)', 'O(log n)', 'O(log n)', 'O(log n)', 'O(log n)', 'O(h)'],
            ['Binary Search Tree (Worst)', 'O(n)', 'O(n)', 'O(n)', 'O(n)', 'O(n)'],
            ['Hash Table (Avg)', 'N/A', 'O(1)', 'O(1)', 'O(1)', 'O(n)'],
          ],
        },
      },
      {
        id: 'master-algorithms-table',
        title: '2. Master Algorithms Complexity Matrix',
        content:
          'Summary of searching, sorting, and graph traversal algorithms:',
        table: {
          headers: ['Algorithm', 'Best Time', 'Average Time', 'Worst Time', 'Auxiliary Space', 'Key Assumption'],
          rows: [
            ['Linear Search', 'O(1)', 'O(n)', 'O(n)', 'O(1)', 'None'],
            ['Binary Search', 'O(1)', 'O(log n)', 'O(log n)', 'O(1)', 'Array must be sorted'],
            ['Bubble Sort', 'O(n)', 'O(n²)', 'O(n²)', 'O(1)', 'Requires early-exit flag'],
            ['Selection Sort', 'O(n²)', 'O(n²)', 'O(n²)', 'O(1)', 'Unstable'],
            ['Insertion Sort', 'O(n)', 'O(n²)', 'O(n²)', 'O(1)', 'Stable'],
            ['Quick Sort', 'O(n log n)', 'O(n log n)', 'O(n²)', 'O(log n) stack', 'Unstable in-place partition'],
            ['Graph BFS', 'O(V + E)', 'O(V + E)', 'O(V + E)', 'O(V) queue & visited', 'Adjacency List'],
            ['Graph DFS', 'O(V + E)', 'O(V + E)', 'O(V + E)', 'O(V) stack & visited', 'Adjacency List'],
          ],
        },
        githubLink: {
          url: 'https://github.com/khansuhel-dev-ai/core-java-practice',
          title: 'Explore the full repository on GitHub: core-java-practice',
        },
      },
    ],
    exerciseIds: [],
    interviewQuestionIds: ['q-122-time-vs-space-complexity'],
    relatedTopicIds: ['java-dsa-big-o-complexity-foundations', 'java-dsa-arrays', 'java-dsa-sorting-algorithms'],
  },
];
