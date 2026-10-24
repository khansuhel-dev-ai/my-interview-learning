import { Topic } from '../../types';

export const IO_TOPICS: Topic[] = [
  {
    id: 'java-serialization',
    codeNumber: 'JAVA-032',
    languageId: 'java',
    title: 'Serialization & Deserialization',
    slug: 'serialization-and-deserialization',
    category: 'Java I/O and Data Handling',
    subcategory: 'Object Streams & Serialization',
    summary: 'Convert Java object state into byte streams with ObjectOutputStream and reconstruct with ObjectInputStream. Learn Serializable, serialVersionUID, transient fields, and critical security warnings against untrusted deserialization.',
    order: 32,
    estimatedMinutes: 14,
    learningObjectives: [
      'Define serialization (object to byte stream) and deserialization (byte stream to object).',
      'Implement the Serializable marker interface on domain classes.',
      'Use ObjectOutputStream and ObjectInputStream with try-with-resources.',
      'Explain the critical purpose of serialVersionUID and preventing InvalidClassException.',
      'Use the transient keyword to skip sensitive or non-serializable fields.',
      'Understand why deserializing untrusted data is a critical remote code execution (RCE) vulnerability.',
    ],
    whyItMatters: 'Object serialization is essential for distributed systems, session replication, deep caching, and Java RMI. Knowing how serialVersionUID and transient work prevents production data corruption and security breaches.',
    sections: [
      {
        id: 'serialization-definitions',
        title: 'Definitions: Serialization vs Deserialization',
        content: 'Serialization is the process of translating a Java object\'s state (its instance fields and referenced objects) into a binary byte stream that can be written to disk, stored in a database, or transmitted across a network. Deserialization is the reverse process: reading the byte stream and reconstructing the equivalent live object in JVM Heap memory.',
        bullets: [
          'Handled by java.io.ObjectOutputStream (serialization) and java.io.ObjectInputStream (deserialization).',
          'Requires the class to implement the java.io.Serializable marker interface.',
          'Static fields belong to the class and are NOT serialized as part of an individual object state.',
        ],
      },
      {
        id: 'serialization-security',
        title: 'CRITICAL SECURITY WARNING: Untrusted Deserialization',
        content: 'Never deserialize Java byte streams received from untrusted sources (e.g. public network clients)! Native Java deserialization can instantiate arbitrary classes present on the classpath, leading to "gadget chain" Remote Code Execution (RCE) vulnerabilities. For modern network APIs, prefer JSON, Protocol Buffers, or message queues.',
        callout: {
          type: 'warning',
          title: 'Security Vulnerability Alert',
          text: 'Java ObjectInputStream deserialization of untrusted input has caused major real-world CVE exploits. Modern web services almost universally use JSON (Jackson/Gson) instead of native Java serialization.',
        },
      },
      {
        id: 'serialization-example',
        title: 'Complete Save & Restore Student Example (Hello.java)',
        content: 'Save as Hello.java. Notice the use of Serializable, serialVersionUID, and try-with-resources:',
        snippet: {
          language: 'java',
          filename: 'Hello.java',
          code: `import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.Serializable;
import java.io.IOException;

class Student implements Serializable {
    private static final long serialVersionUID = 1L;

    String name;
    int age;

    Student(String name, int age) {
        this.name = name;
        this.age = age;
    }

    @Override
    public String toString() {
        return "Student{name='" + name + "', age=" + age + "}";
    }
}

public class Hello {
    public static void main(String[] args) {
        String fileName = "student.ser";
        Student original = new Student("Suhel", 25);

        // Serialization: write object state to a file
        try (ObjectOutputStream out =
                 new ObjectOutputStream(new FileOutputStream(fileName))) {
            out.writeObject(original);
            System.out.println("Object saved");
        } catch (IOException e) {
            System.out.println("Could not save object: " + e.getMessage());
            return;
        }

        // Deserialization: restore object state from the file
        try (ObjectInputStream in =
                 new ObjectInputStream(new FileInputStream(fileName))) {
            Student restored = (Student) in.readObject();
            System.out.println("Restored: " + restored);
        } catch (IOException | ClassNotFoundException e) {
            System.out.println("Could not restore object: " + e.getMessage());
        }
    }
}`,
          output: `Object saved
Restored: Student{name='Suhel', age=25}`,
          explanation: '1. student.ser is created in the working directory containing binary object metadata and field values.\\n2. ObjectOutputStream.writeObject() serializes the object.\\n3. ObjectInputStream.readObject() reads and reconstructs it (returning Object, requiring a cast to Student).',
        },
      },
      {
        id: 'serialization-core-points',
        title: '7 Crucial Rules of Java Serialization',
        content: 'Master these core behaviors for production and interview success:',
        bullets: [
          '1. Serializable is a marker interface with zero methods.',
          '2. ObjectOutputStream.writeObject() writes; ObjectInputStream.readObject() reads.',
          '3. ObjectInputStream.readObject() returns Object, so casting is standard.',
          '4. serialVersionUID verifies version compatibility between writer and reader. If omitted, the compiler auto-calculates a hash based on class members; any small edit will cause an InvalidClassException!',
          '5. static fields belong to the class and are NEVER serialized as object state.',
          '6. transient fields (e.g. transient String password) are skipped by serialization and restore to their default values (null, 0, false).',
          '7. Object Graph requirement: Every referenced object inside a serializable class must also implement Serializable; otherwise a NotSerializableException is thrown.',
        ],
      },
      {
        id: 'serialization-flowchart',
        title: 'Serialization & Deserialization Architecture Flow',
        content: 'Visualizing how object state travels to storage and back:',
        flowDiagram: {
          title: 'Java Serialization & Deserialization Pipeline',
          steps: [
            { stepNumber: 1, label: 'Create Object', subtext: 'Student in Heap memory' },
            { stepNumber: 2, label: 'ObjectOutputStream', subtext: 'out.writeObject(original)' },
            { stepNumber: 3, label: 'Serialized Bytes', subtext: 'Binary representation' },
            { stepNumber: 4, label: 'File / Storage', subtext: 'student.ser on disk' },
            { stepNumber: 5, label: 'ObjectInputStream', subtext: 'in.readObject()' },
            { stepNumber: 6, label: 'Reconstructed Object', subtext: 'Restored on Heap' },
          ],
        },
      },
    ],
    commonMistakes: [
      {
        mistake: 'Omitted serialVersionUID, causing InvalidClassException after adding a method or modifying a field',
        fix: 'Always explicitly declare: private static final long serialVersionUID = 1L;',
      },
      {
        mistake: 'Expecting transient fields to be restored from serialized file',
        fix: 'transient fields are omitted from serialization and reset to default values upon deserialization.',
      },
      {
        mistake: 'Deserializing untrusted data from remote network streams',
        fix: 'Never deserialize untrusted byte streams; use JSON or strict serialization filters (ObjectInputFilter).',
      },
    ],
    keyTakeaways: [
      'Serialization converts objects to byte streams; Deserialization restores them.',
      'Classes must implement the Serializable marker interface.',
      'Always declare an explicit serialVersionUID.',
      'transient and static fields are not serialized.',
      'Never deserialize untrusted data due to remote code execution risks.',
    ],
    relatedTopicIds: ['java-interface-types', 'java-user-input', 'java-004-stack-heap'],
    exerciseIds: ['ex-015-serialization-student'],
    interviewQuestionIds: [
      'q-046-serialization-definition',
      'q-047-serializable-interface',
      'q-048-serialversionuid',
      'q-049-transient-keyword',
      'q-050-static-fields-serialization',
      'q-051-untrusted-data-security',
      'q-052-java-serialization-vs-json',
      'q-053-non-serializable-reference',
      'q-054-constructor-execution-deserialization',
      'q-055-customizing-serialization',
      'q-056-try-with-resources-io',
    ],
    keywords: [
      'serialization',
      'deserialization',
      'serializable',
      'serialversionuid',
      'transient',
      'objectoutputstream',
      'objectinputstream',
      'security',
      'notserializableexception',
      'io',
    ],
  },
];
