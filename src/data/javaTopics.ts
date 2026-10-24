import { Topic } from '../types';
import { SETUP_TOPICS } from './topics/setupTopics';
import { FUNDAMENTAL_TOPICS } from './topics/fundamentalTopics';
import { OOP_TOPICS } from './topics/oopTopics';
import { EXCEPTION_TOPICS } from './topics/exceptionTopics';
import { CONCURRENCY_TOPICS } from './topics/concurrencyTopics';
import { IO_TOPICS } from './topics/ioTopics';
import { COLLECTIONS_TOPICS } from './topics/collectionsTopics';
import { MODERN_JAVA_TOPICS } from './topics/modernJavaTopics';
import { MAVEN_TOPICS } from './topics/mavenTopics';

export { SETUP_TOPICS } from './topics/setupTopics';
export { FUNDAMENTAL_TOPICS } from './topics/fundamentalTopics';
export { OOP_TOPICS } from './topics/oopTopics';
export { EXCEPTION_TOPICS } from './topics/exceptionTopics';
export { CONCURRENCY_TOPICS } from './topics/concurrencyTopics';
export { IO_TOPICS } from './topics/ioTopics';
export { COLLECTIONS_TOPICS } from './topics/collectionsTopics';
export { MODERN_JAVA_TOPICS } from './topics/modernJavaTopics';
export { MAVEN_TOPICS } from './topics/mavenTopics';

/**
 * Complete Java curriculum for My Interview Learning (MIL).
 * Reorganized into 9 structured learning modules with sequential ordering:
 * 1. Setup and First Program (JAVA-033, JAVA-001)
 * 2. Java Fundamentals (JAVA-002, JAVA-038, JAVA-004, JAVA-005, JAVA-006)
 * 3. Object-Oriented Programming (JAVA-003 through JAVA-028)
 * 4. Errors and Exception Handling (JAVA-034, JAVA-035, JAVA-036, JAVA-037)
 * 5. Multithreading and Concurrency (JAVA-039, JAVA-040, JAVA-041)
 * 6. Java I/O and Data Handling (JAVA-032)
 * 7. Collections Framework and Stream API (JAVA-042 through JAVA-053)
 * 8. Modern Java Language Features (JAVA-054, JAVA-055, JAVA-056)
 * 9. Build Tools & Project Architecture: Maven (JAVA-057)
 */
export const JAVA_TOPICS: Topic[] = [
  ...SETUP_TOPICS,
  ...FUNDAMENTAL_TOPICS,
  ...OOP_TOPICS,
  ...EXCEPTION_TOPICS,
  ...CONCURRENCY_TOPICS,
  ...IO_TOPICS,
  ...COLLECTIONS_TOPICS,
  ...MODERN_JAVA_TOPICS,
  ...MAVEN_TOPICS,
].sort((a, b) => a.order - b.order);


