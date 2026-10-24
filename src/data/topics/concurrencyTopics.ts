import { Topic } from '../../types';

export const CONCURRENCY_TOPICS: Topic[] = [
  {
    id: 'java-threads-basics',
    codeNumber: 'JAVA-039',
    languageId: 'java',
    title: 'Threads and Multithreading',
    slug: 'threads-and-multithreading',
    category: 'Multithreading and Concurrency',
    subcategory: 'Core Concurrency',
    summary: 'Master thread creation via Thread class, Runnable interface, and lambdas. Understand start() vs run(), execution stacks, nondeterministic scheduling, and why ExecutorService is preferred in modern production systems.',
    order: 29,
    estimatedMinutes: 16,
    learningObjectives: [
      'Define a thread and explain how multithreading leverages modern multi-core processors.',
      'Create and launch threads by extending Thread and implementing Runnable.',
      'Use modern Java lambdas with Runnable functional interface.',
      'Explain the crucial difference between calling start() vs calling run() directly.',
      'Understand thread sleep, nondeterministic interleaving, and why output order is never guaranteed.',
      'Identify when to use ExecutorService thread pools instead of manually spawning raw threads.',
    ],
    whyItMatters: 'Modern applications handle thousands of concurrent requests, background jobs, and I/O streams simultaneously. Writing correct concurrent code without deadlocks, starvation, or race conditions is one of the highest-value technical interview skills for backend Java engineers.',
    sections: [
      {
        id: 'thread-definition',
        title: 'What is a Thread & Multithreading?',
        content: 'A **thread** is the smallest independent sequence of programmed instructions that can be managed independently by an operating system scheduler. It represents an independent path of execution through application code with its own program counter and private call stack.',
        bullets: [
          '**Process vs Thread:** A process is an executing program instance with its own private virtual memory address space. Threads within the same process share that process\'s JVM Heap memory, open files, and system resources.',
          '**Multithreading:** The ability of a CPU (or multiple CPU cores) to execute multiple threads concurrently or in parallel during overlapping time periods.',
          '**Concurrency vs Parallelism:** Concurrency is dealing with lots of things at once (structuring tasks to make progress interleaved). Parallelism is doing lots of things at the exact same physical moment across multiple CPU hardware cores.',
          '**Shared Heap Warning:** Because threads in a JVM process share the exact same object heap, concurrent writes to shared mutable variables must be synchronized to avoid data corruption.',
        ],
      },
      {
        id: 'thread-class-approach',
        title: 'Approach 1: Extending the Thread Class',
        content: 'The most direct way to define a thread task is to create a subclass of java.lang.Thread and override its run() method. The run() method defines the code that executes on the new thread stack once started.',
        snippet: {
          language: 'java',
          filename: 'Hello.java',
          code: `class Demo extends Thread {
    @Override
    public void run() {
        for (int i = 0; i < 5; i++) {
            System.out.println("Hi I am Demo class");
        }
    }
}

class Remo extends Thread {
    @Override
    public void run() {
        for (int i = 0; i < 5; i++) {
            System.out.println("Hi I am Remo class");
        }
    }
}

public class Hello {
    public static void main(String[] args) throws InterruptedException {
        Demo demo = new Demo();
        Remo remo = new Remo();

        // start() schedules the thread on a new independent call stack
        demo.start();
        Thread.sleep(5); // demonstration delay
        remo.start();
    }
}`,
          output: `Hi I am Demo class
Hi I am Demo class
Hi I am Demo class
Hi I am Demo class
Hi I am Demo class
Hi I am Remo class
Hi I am Remo class
Hi I am Remo class
Hi I am Remo class
Hi I am Remo class`,
          explanation: '1. demo.start() asks the JVM to create a new OS/JVM thread and invoke demo.run() asynchronously.\\n2. Thread.sleep(5) pauses the main thread for approximately 5 milliseconds, allowing demo to begin printing.\\n3. Notice: Output order between threads is NOT strictly guaranteed by the Java language specification; the OS thread scheduler controls exact core allocation.',
        },
      },
      {
        id: 'start-vs-run-critical',
        title: 'CRITICAL INTERVIEW TRAP: start() vs run()',
        content: 'One of the most frequently asked Java interview questions is: "What happens if you call run() directly instead of start()?"',
        callout: {
          type: 'warning',
          title: 'Direct run() Trap',
          text: 'Calling run() directly does NOT create a new thread! It executes run() synchronously on the calling thread (e.g. main thread) just like any standard Java method call. To start a separate asynchronous thread with its own call stack, you MUST invoke start().',
        },
        bullets: [
          '**start():** Creates a new thread of execution with its own call stack, transitions state to RUNNABLE, and instructs the JVM to invoke the run() method asynchronously.',
          '**run():** Contains the business logic code to execute. Invoking it directly is just a regular synchronous method call on the caller thread.',
          '**Calling start() twice on the same Thread:** Throws IllegalThreadStateException immediately because a thread cannot be restarted once initiated.',
        ],
      },
      {
        id: 'runnable-interface-approach',
        title: 'Approach 2: Implementing the Runnable Interface (Recommended)',
        content: 'Because Java does not support multiple class inheritance (a class can extend only one superclass), extending Thread limits your architecture. Implementing java.lang.Runnable is strongly preferred because it separates the task logic from the execution mechanism.',
        snippet: {
          language: 'java',
          filename: 'Hello.java',
          code: `class Demo implements Runnable {
    @Override
    public void run() {
        for (int i = 0; i < 5; i++) {
            System.out.println("Hi I am Demo class");
        }
    }
}

class Remo implements Runnable {
    @Override
    public void run() {
        for (int i = 0; i < 5; i++) {
            System.out.println("Hi I am Remo class");
        }
    }
}

public class Hello {
    public static void main(String[] args) {
        // Pass Runnable instances into Thread constructors
        Thread demoThread = new Thread(new Demo());
        Thread remoThread = new Thread(new Remo());

        demoThread.start();
        remoThread.start();
    }
}`,
          output: `Hi I am Demo class
Hi I am Remo class
Hi I am Demo class
Hi I am Remo class
Hi I am Demo class
... (interleaved output)`,
          explanation: '1. Demo and Remo implement Runnable, leaving them free to extend any domain class.\\n2. Thread objects wrap the Runnable task.\\n3. When demoThread.start() and remoThread.start() execute, both threads run concurrently, interleaving their console prints.',
        },
      },
      {
        id: 'runnable-lambdas',
        title: 'Approach 3: Modern Functional Lambdas with Runnable',
        content: 'java.lang.Runnable is a @FunctionalInterface containing a single abstract method: void run(). In modern Java (Java 8+), you can define thread actions concisely with lambda expressions or method references without boilerplate class declarations.',
        snippet: {
          language: 'java',
          filename: 'Hello.java',
          code: `public class Hello {
    public static void main(String[] args) {
        // Define Runnable tasks with modern concise lambdas
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

        Thread thread1 = new Thread(demo);
        Thread thread2 = new Thread(remo);

        thread1.start();
        thread2.start();
    }
}`,
          output: `Hi I am Demo class
Hi I am Demo class
Hi I am Remo class
... (interleaved execution)`,
          explanation: 'Lambdas eliminate anonymous inner class boilerplate, making concurrent task dispatching clean and readable.',
        },
      },
      {
        id: 'executor-service-note',
        title: 'Production Best Practice: ExecutorService & Thread Pools',
        content: 'While creating raw Thread objects with new Thread(...) is crucial for understanding concurrency fundamentals, production enterprise systems (like Spring Boot microservices) almost NEVER manually spawn raw unmanaged threads. Why?',
        bullets: [
          '**Thread Creation Overhead:** Spawning an OS-level thread allocates approximately 1MB of stack memory and incurs costly kernel context switching overhead.',
          '**Resource Starvation:** Spawning an unbounded number of new threads under high request volume will crash the JVM with OutOfMemoryError: unable to create native thread.',
          '**Thread Pools:** java.util.concurrent.ExecutorService (e.g. Executors.newFixedThreadPool(10)) maintains a pool of pre-allocated, reusable worker threads that process queued tasks efficiently.',
        ],
      },
    ],
    commonMistakes: [
      {
        mistake: 'Calling run() directly instead of start() when launching a background task',
        fix: 'Always call thread.start(). Calling thread.run() executes synchronously on the current thread and will not run concurrently.',
      },
      {
        mistake: 'Assuming Thread.sleep() guarantees execution ordering between threads',
        fix: 'Never use sleep() for thread synchronization. Use synchronization primitives like join(), CountDownLatch, or monitors.',
      },
      {
        mistake: 'Calling start() multiple times on the same Thread object',
        fix: 'A Thread instance can only be started once. Calling start() again throws IllegalThreadStateException. Create a new Thread instance instead.',
      },
      {
        mistake: 'Spawning thousands of raw unmanaged threads in production APIs',
        fix: 'Use an ExecutorService thread pool with a bounded task queue to prevent JVM native thread exhaustion.',
      },
    ],
    keyTakeaways: [
      'A thread is an independent path of execution with its own private call stack.',
      'Threads in the same JVM process share the heap memory.',
      'Always call start() to spawn a new thread; calling run() directly runs synchronously on the current thread.',
      'Prefer implementing Runnable over extending Thread to maintain class inheritance flexibility.',
      'Runnable is a functional interface, enabling concise lambda task definitions.',
      'Output order across concurrent threads is nondeterministic and depends on the OS scheduler.',
      'In production, prefer ExecutorService thread pools over manual thread instantiation.',
    ],
    relatedTopicIds: ['java-thread-lifecycle', 'java-synchronization-locks', 'java-004-stack-heap'],
    exerciseIds: ['ex-021-runnable-tasks-interleaving'],
    interviewQuestionIds: [
      'q-070-what-is-a-thread',
      'q-071-what-is-multithreading',
      'q-072-start-vs-run',
      'q-073-why-runnable-over-thread',
      'q-077-thread-output-order',
      'q-080-concurrency-vs-parallelism',
      'q-081-why-executor-service',
    ],
    keywords: [
      'threads',
      'multithreading',
      'runnable',
      'thread',
      'start vs run',
      'lambda',
      'executorservice',
      'concurrency',
      'parallelism',
      'sleep',
    ],
  },

  {
    id: 'java-thread-lifecycle',
    codeNumber: 'JAVA-040',
    languageId: 'java',
    title: 'Thread Lifecycle and States',
    slug: 'thread-lifecycle-and-states',
    category: 'Multithreading and Concurrency',
    subcategory: 'Thread State Machine',
    summary: 'Master the 6 official Java Thread.State enum constants: NEW, RUNNABLE, BLOCKED, WAITING, TIMED_WAITING, and TERMINATED. Understand why RUNNING is informal, why Thread.stop() is deprecated, and inspect state snapshots with getState().',
    order: 30,
    estimatedMinutes: 18,
    learningObjectives: [
      'Identify and define all 6 official Java Thread.State enum constants.',
      'Explain why RUNNING and DEAD are informal terms, not official Thread.State values.',
      'Trace exact state transitions: wait(), notify(), sleep(), join(), and monitor locks.',
      'Understand why Thread.stop() is deprecated, unsafe, and should never be used.',
      'Inspect thread states at runtime using thread.getState() and understand why it is only a snapshot.',
      'Use join() to guarantee caller thread waits for background worker completion.',
    ],
    whyItMatters: 'Thread dump analysis (analyzing BLOCKED and WAITING threads) is an indispensable skill for diagnosing production server hangs, deadlocks, and performance bottlenecks. Concurrency interviewers test your exact knowledge of the JVM thread state model.',
    sections: [
      {
        id: 'thread-states-official',
        title: 'The 6 Official Java Thread States (Thread.State)',
        content: 'In Java, the lifecycle of a thread is strictly governed by the java.lang.Thread.State enum. At any single instant in time, a thread can exist in exactly ONE of these six official states:',
        bullets: [
          '**NEW:** The Thread object has been instantiated (e.g. Thread t = new Thread(...)), but start() has not yet been invoked.',
          '**RUNNABLE:** The thread is actively executing in the JVM or is ready and waiting for OS CPU scheduling. Note: Java does NOT have a separate official RUNNING state.',
          '**BLOCKED:** The thread is suspended waiting to acquire a Java monitor lock (intrinsic lock) to enter or re-enter a synchronized method or block currently held by another thread.',
          '**WAITING:** The thread is waiting indefinitely for another thread to perform a specific notification or action (e.g. Object.wait() with no timeout, Thread.join() with no timeout, LockSupport.park()).',
          '**TIMED_WAITING:** The thread is waiting for another thread for up to a specified maximum duration (e.g. Thread.sleep(millis), Object.wait(timeout), Thread.join(timeout), LockSupport.parkNanos()).',
          '**TERMINATED:** The thread has completed execution because its run() method returned naturally or terminated abruptly due to an unhandled exception. Once TERMINATED, it can never be restarted.',
        ],
      },
      {
        id: 'thread-states-interactive-diagram',
        title: 'Interactive Thread Lifecycle & Transition State Machine',
        content: 'Explore how a Java thread transitions between the six official states. Click on any state node below to inspect triggers, active methods, and lock acquisition behaviors:',
        customDiagram: 'thread-lifecycle',
      },
      {
        id: 'running-and-dead-misconception',
        title: 'Crucial Interview Clarification: RUNNING and DEAD',
        content: 'Many outdated textbooks and internet tutorials show a simplified lifecycle: NEW → RUNNABLE → RUNNING → WAITING → DEAD. You must clarify this in interviews:',
        callout: {
          type: 'warning',
          title: 'Not Official Enum Values',
          text: 'Neither RUNNING nor DEAD exist in the java.lang.Thread.State enum! Java bundles threads that are ready-to-run and actively executing on a CPU core together into the single official state RUNNABLE. When a thread finishes, its official state is TERMINATED, not DEAD.',
        },
        bullets: [
          '**sleep() vs wait():** Thread.sleep(...) transitions the thread to TIMED_WAITING, retaining all held monitor locks. Object.wait(...) releases the monitor lock and enters WAITING (or TIMED_WAITING if given a timeout).',
          '**Thread.stop() Deprecation:** Thread.stop() was deprecated in Java 1.2 and is permanently disabled in modern Java versions. It forces a thread to die abruptly, releasing all held monitors and leaving objects in corrupt, inconsistent states.',
        ],
      },
      {
        id: 'inspect-thread-states-code',
        title: 'Inspecting Thread States with getState() & join()',
        content: 'Save as Hello.java. Observe how thread states transition across NEW, RUNNABLE, TIMED_WAITING, and TERMINATED:',
        snippet: {
          language: 'java',
          filename: 'Hello.java',
          code: `public class Hello {
    public static void main(String[] args) throws InterruptedException {
        Thread worker = new Thread(() -> {
            try {
                // Thread will be in TIMED_WAITING while sleeping
                Thread.sleep(400);
            } catch (InterruptedException e) {
                System.out.println("Interrupted");
            }
        });

        // 1. Before calling start()
        System.out.println("State 1 (Before start): " + worker.getState());

        worker.start();
        // 2. Immediately after start()
        System.out.println("State 2 (After start): " + worker.getState());

        // Pause main thread slightly so worker enters sleep()
        Thread.sleep(100);
        // 3. While worker is sleeping
        System.out.println("State 3 (During sleep): " + worker.getState());

        // join() pauses main thread until worker finishes completely
        worker.join();
        // 4. After run() has finished
        System.out.println("State 4 (After join/completion): " + worker.getState());
    }
}`,
          output: `State 1 (Before start): NEW
State 2 (After start): RUNNABLE
State 3 (During sleep): TIMED_WAITING
State 4 (After join/completion): TERMINATED`,
          explanation: '1. Before start(), the state is strictly NEW.\\n2. Immediately after start(), the thread is registered with the JVM scheduler and is RUNNABLE.\\n3. While Thread.sleep(400) is executing, getState() returns TIMED_WAITING.\\n4. worker.join() guarantees the main thread halts until worker finishes, after which its state is strictly TERMINATED.',
        },
      },
      {
        id: 'why-getstate-is-a-snapshot',
        title: 'Important Rule: getState() is only a Point-in-Time Snapshot',
        content: 'Thread.getState() is designed for profiling, diagnostics, and debugging (such as generating thread dumps via jstack or visualvm). It should NOT be used for application synchronization logic because by the time your code checks the returned state, the operating system scheduler may have already transitioned the thread to a different state.',
      },
    ],
    commonMistakes: [
      {
        mistake: 'Listing RUNNING or DEAD as official values in Java Thread.State enum',
        fix: 'Remember the 6 official enum values: NEW, RUNNABLE, BLOCKED, WAITING, TIMED_WAITING, TERMINATED.',
      },
      {
        mistake: 'Using Thread.stop() to terminate background threads',
        fix: 'Thread.stop() is deprecated and dangerous. Use cooperative thread interruption (Thread.interrupt() and Thread.currentThread().isInterrupted()) or a volatile boolean shutdown flag.',
      },
      {
        mistake: 'Assuming Thread.sleep() releases object monitor locks',
        fix: 'sleep() pauses the thread but retains all held locks. Object.wait() releases the monitor lock while waiting.',
      },
      {
        mistake: 'Using thread.getState() for flow control and synchronization',
        fix: 'getState() is an asynchronous snapshot for diagnostics. Use proper synchronization primitives (join, locks, latches) instead.',
      },
    ],
    keyTakeaways: [
      'Java Thread.State has exactly 6 official constants: NEW, RUNNABLE, BLOCKED, WAITING, TIMED_WAITING, TERMINATED.',
      'RUNNING is not an official Java thread state; actively running and ready threads are both RUNNABLE.',
      'BLOCKED represents waiting to acquire a monitor lock for a synchronized block.',
      'WAITING is indefinite waiting (wait(), join()), whereas TIMED_WAITING has a timeout (sleep(ms), timed wait/join).',
      'Thread.stop() is deprecated and unsafe; use cooperative interruption instead.',
      'thread.join() pauses the calling thread until the target thread enters TERMINATED.',
      'getState() returns a point-in-time snapshot designed for monitoring and thread dumps.',
    ],
    relatedTopicIds: ['java-threads-basics', 'java-synchronization-locks'],
    exerciseIds: ['ex-023-inspect-thread-states'],
    interviewQuestionIds: [
      'q-074-what-is-a-race-condition',
      'q-076-why-use-join',
      'q-078-sleep-vs-wait',
      'q-079-why-thread-stop-deprecated',
      'q-082-thread-state-enum-values',
    ],
    keywords: [
      'thread.state',
      'thread lifecycle',
      'new',
      'runnable',
      'blocked',
      'waiting',
      'timed_waiting',
      'terminated',
      'getstate',
      'join',
      'thread.stop',
      'thread dump',
    ],
  },

  {
    id: 'java-synchronization-locks',
    codeNumber: 'JAVA-041',
    languageId: 'java',
    title: 'Synchronization and Race Conditions',
    slug: 'synchronization-and-race-conditions',
    category: 'Multithreading and Concurrency',
    subcategory: 'Thread Safety & Synchronization',
    summary: 'Master thread safety, race conditions, monitor locks, and the synchronized keyword. Analyze why count++ is not atomic, how synchronized protects shared mutable state, the role of volatile, and key differences between sleep() and wait().',
    order: 31,
    estimatedMinutes: 20,
    learningObjectives: [
      'Define a race condition and demonstrate why compound operations like count++ are non-atomic.',
      'Explain how Java monitor locks (intrinsic locks) work with the synchronized keyword.',
      'Implement thread-safe shared counters using synchronized methods and verify deterministic results with join().',
      'Define critical sections and explain mutual exclusion.',
      'Compare sleep() vs wait() in relation to monitor lock release.',
      'Understand what volatile achieves (visibility & ordering) and what it does NOT achieve (atomicity).',
      'Answer the 12 core Java concurrency technical interview questions with confidence.',
    ],
    whyItMatters: 'Concurrency bugs are among the most devastating in software engineering because they are nondeterministic, timing-dependent, and almost impossible to reproduce under simple unit tests. Understanding synchronization and monitor locks is essential for writing reliable enterprise software.',
    sections: [
      {
        id: 'race-condition-explained',
        title: 'What is a Race Condition?',
        content: 'A **race condition** occurs when two or more threads concurrently access and mutate shared state without proper coordination, and the final program outcome depends on the exact, unpredictable order in which thread operations are interleaved by the OS CPU scheduler.',
        bullets: [
          '**The count++ Trap:** In Java, writing count++ looks like a single atomic line of code, but at the bytecode level, it compiles down to THREE distinct instructions:',
          '1. **READ:** Read the current value of count from Heap/RAM into a CPU register.',
          '2. **MODIFY:** Add 1 to the register value.',
          '3. **WRITE:** Write the updated register value back to the Heap variable.',
          '**Lost Updates:** If Thread A reads count (value 10), and before Thread A can write back, Thread B also reads count (value 10), both threads compute 11 and write 11 back. Two increments occurred, but the counter only increased by 1! This is a lost update.',
        ],
      },
      {
        id: 'synchronized-keyword-explained',
        title: 'How synchronized and Monitor Locks Work',
        content: 'Java solves race conditions through mutual exclusion using the **synchronized** keyword. Every object in Java has an associated **intrinsic lock** (also known as a **monitor lock**).',
        bullets: [
          'When a thread enters a synchronized instance method or block, it must first acquire that object\'s monitor lock.',
          'If another thread already holds that monitor lock, any other thread attempting to enter a synchronized block protected by the **same object monitor** is moved to the BLOCKED state until the lock is released.',
          '**Critical Section:** A block of code that accesses shared mutable state and must only be executed by one thread at a time.',
          '**Crucial Scope Rule:** synchronized on an instance method locks that specific object instance (this). It does NOT prevent other threads from executing non-synchronized methods on that object, nor does it lock different object instances!',
        ],
      },
      {
        id: 'synchronized-counter-example',
        title: 'Complete Compilable Example: Synchronized Counter Demo (Hello.java)',
        content: 'Save as Hello.java. Notice how two threads (demo running 2000 times, remo running 250 times) share a single Counter object. With synchronized and join(), the final value is guaranteed to be exactly 2250:',
        snippet: {
          language: 'java',
          filename: 'Hello.java',
          code: `class Counter {
    int count = 0;

    // synchronized acquires this Counter object's monitor lock
    public synchronized void increment() {
        count++;
    }
}

public class Hello {
    public static void main(String[] args) throws InterruptedException {
        Counter counter = new Counter();

        // demo task: increments 2000 times
        Runnable demo = () -> {
            for (int i = 0; i < 2000; i++) {
                counter.increment();
            }
        };

        // remo task: increments 250 times
        Runnable remo = () -> {
            for (int i = 0; i < 250; i++) {
                counter.increment();
            }
        };

        Thread thread1 = new Thread(demo);
        Thread thread2 = new Thread(remo);

        thread1.start();
        thread2.start();

        // join() pauses main until both worker threads complete
        thread1.join();
        thread2.join();

        // Deterministic output: 2000 + 250 = 2250
        System.out.println("Final counter value: " + counter.count);
    }
}`,
          output: `Final counter value: 2250`,
          explanation: '1. Both thread1 and thread2 share the exact same Counter reference in Heap memory.\\n2. When thread1 calls counter.increment(), it acquires counter\'s monitor lock. If thread2 tries to call increment() at the same instant, thread2 enters BLOCKED until thread1 exits the method.\\n3. thread1.join() and thread2.join() force the main thread to wait for both workers before printing, guaranteeing an exact final value of 2250.\\n4. If you remove the synchronized keyword, running this code repeatedly will produce inconsistent values lower than 2250 due to lost updates!',
        },
      },
      {
        id: 'sleep-vs-wait-table',
        title: 'Critical Comparison: sleep() vs wait()',
        content: 'Concurrency interviewers frequently test this distinction:',
        table: {
          headers: ['Feature', 'Thread.sleep()', 'Object.wait()'],
          rows: [
            ['Class origin', 'Static method on java.lang.Thread', 'Instance method on java.lang.Object'],
            ['Monitor lock behavior', 'Does NOT release locks held by the thread', 'RELEASES the object\'s monitor lock while waiting'],
            ['Prerequisite', 'Can be called anywhere anytime', 'Must be called from within a synchronized block owning that monitor (else IllegalMonitorStateException)'],
            ['Wake-up mechanism', 'Wakes up after timeout expires or on interrupt', 'Wakes up via notify(), notifyAll(), timeout, or interrupt'],
            ['Target thread state', 'TIMED_WAITING', 'WAITING (or TIMED_WAITING with timeout)'],
          ],
        },
      },
      {
        id: 'volatile-keyword',
        title: 'The volatile Keyword: Visibility vs Atomicity',
        content: 'The volatile keyword in Java is another commonly misunderstood concurrency concept:',
        bullets: [
          '**What volatile DOES do (Visibility):** Modern CPUs cache variable values in per-core L1/L2 caches. If Thread 1 updates a variable, Thread 2 running on a different CPU core might continue reading a stale cached value. Declaring a field volatile guarantees that all reads and writes go directly to and from main memory (establishing a happens-before relationship).',
          '**What volatile DOES NOT do (Atomicity):** Declaring volatile int count = 0; does NOT make count++ thread-safe! Because count++ is a compound 3-step operation (read-modify-write), volatile does not prevent race conditions. For lock-free atomic counters, use java.util.concurrent.atomic.AtomicInteger.',
        ],
      },
      {
        id: 'twelve-interview-questions-summary',
        title: 'Mastering the 12 Concurrency Interview Questions',
        content: 'Review these 12 core questions from the addendum. Expand the Interview Questions tab below to test your answers against complete model solutions:',
        bullets: [
          '1. What is a thread? (Independent execution path with its own call stack)',
          '2. What is multithreading? (Executing multiple threads concurrently to maximize CPU utilization)',
          '3. Difference between start() and run()? (start() allocates a new thread stack; run() is synchronous)',
          '4. Why implement Runnable instead of extending Thread? (Supports single-inheritance flexibility and decouples task from runner)',
          '5. What is a race condition? (Uncoordinated concurrent access to shared mutable data yielding timing-dependent bugs)',
          '6. What does synchronized protect? (The critical section using the specific target object\'s monitor lock)',
          '7. Why use join()? (Blocks caller until target worker thread reaches TERMINATED)',
          '8. Is thread output order guaranteed? (No, execution order is nondeterministic and controlled by the OS scheduler)',
          '9. Difference between sleep() and wait()? (sleep retains locks; wait releases monitor and requires synchronization)',
          '10. Why should Thread.stop() not be used? (Deprecated and unsafe; leaves objects in corrupted partial states)',
          '11. Difference between concurrency and parallelism? (Concurrency is structure/interleaving; parallelism is simultaneous multi-core execution)',
          '12. Why are executor services useful? (Reuses worker thread pools, prevents OOM from unbounded thread creation)',
        ],
      },
    ],
    commonMistakes: [
      {
        mistake: 'Assuming volatile makes compound operations like count++ or index-- thread-safe',
        fix: 'volatile only guarantees memory visibility and ordering. It does NOT provide mutual exclusion or atomicity. Use synchronized or AtomicInteger.',
      },
      {
        mistake: 'Reading shared mutable results before calling join() on worker threads',
        fix: 'Always join() all worker threads before reading aggregated values on the parent thread to prevent reading incomplete partial results.',
      },
      {
        mistake: 'Calling wait() or notify() without owning the object\'s monitor lock',
        fix: 'Calling wait() outside a synchronized(lock) block throws java.lang.IllegalMonitorStateException at runtime.',
      },
      {
        mistake: 'Synchronizing on two different object instances and expecting mutual exclusion',
        fix: 'synchronized only coordinates threads locking the SAME object instance. Synchronizing on different locks provides zero mutual exclusion.',
      },
    ],
    keyTakeaways: [
      'A race condition occurs when concurrent threads interleave on shared mutable state.',
      'count++ is a 3-step non-atomic compound operation (read, modify, write) prone to lost updates.',
      'synchronized instance methods acquire that object\'s intrinsic monitor lock.',
      'Only one thread at a time can execute critical sections protected by the same monitor lock.',
      'join() pauses the calling thread until worker threads terminate, ensuring deterministic final reads.',
      'sleep() pauses without releasing locks; wait() releases the monitor lock.',
      'volatile provides visibility across CPU caches but does not provide atomicity.',
    ],
    relatedTopicIds: ['java-threads-basics', 'java-thread-lifecycle'],
    exerciseIds: ['ex-022-synchronized-counter'],
    interviewQuestionIds: [
      'q-070-what-is-a-thread',
      'q-071-what-is-multithreading',
      'q-072-start-vs-run',
      'q-073-why-runnable-over-thread',
      'q-074-what-is-a-race-condition',
      'q-075-what-does-synchronized-protect',
      'q-076-why-use-join',
      'q-077-thread-output-order',
      'q-078-sleep-vs-wait',
      'q-079-why-thread-stop-deprecated',
      'q-080-concurrency-vs-parallelism',
      'q-081-why-executor-service',
    ],
    keywords: [
      'synchronization',
      'synchronized',
      'race condition',
      'monitor lock',
      'intrinsic lock',
      'critical section',
      'atomic',
      'volatile',
      'join',
      'sleep vs wait',
      'counter',
      'lost updates',
    ],
  },
];
