export type LanguageId = 'java' | 'php';

export interface Language {
  id: LanguageId;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  iconName: string;
  color: string;
  badge: string;
  status: 'active' | 'preview' | 'coming-soon';
  totalTopics: number;
  totalExercises: number;
  totalQuestions: number;
}

export interface CodeSnippet {
  language: 'java' | 'php' | 'bash' | 'sql' | 'text' | 'xml';
  filename?: string;
  code: string;
  output?: string;
  explanation?: string;
}

export interface TopicSection {
  id: string;
  title: string;
  content: string; // Markdown or rich formatted text
  bullets?: string[];
  table?: {
    headers: string[];
    rows: string[][];
  };
  flowDiagram?: {
    title?: string;
    direction?: 'horizontal' | 'vertical';
    steps: {
      stepNumber?: number;
      label: string;
      subtext?: string;
    }[];
  };
  snippet?: CodeSnippet;
  callout?: {
    type: 'tip' | 'warning' | 'note' | 'interview';
    title: string;
    text: string;
  };
  customDiagram?: 'throwable-hierarchy' | 'thread-lifecycle' | 'maven-lifecycle';
}

export interface Topic {
  id: string;
  codeNumber: string; // e.g. "JAVA-001"
  languageId: LanguageId;
  title: string;
  slug: string;
  category: string;
  subcategory?: string;
  summary: string;
  order: number;
  estimatedMinutes: number;
  learningObjectives: string[];
  whyItMatters: string;
  sections: TopicSection[];
  commonMistakes: { mistake: string; fix: string }[];
  keyTakeaways: string[];
  relatedTopicIds: string[];
  exerciseIds: string[];
  interviewQuestionIds: string[];
  keywords: string[];
}

export interface TopicGroup {
  id: string;
  title: string;
  topics: Topic[];
}

export interface ExerciseTestCase {
  description: string;
  expectedOutput: string;
  verifyFnHint?: string;
}

export interface Exercise {
  id: string;
  number: number;
  languageId: LanguageId;
  topicId: string;
  topicTitle: string;
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  task: string;
  starterCode: string;
  solutionCode: string;
  expectedOutput: string;
  explanation: string;
  hints: string[];
  testCases: ExerciseTestCase[];
}

export interface InterviewQuestion {
  id: string;
  number: number;
  languageId: LanguageId;
  topicId: string;
  topicTitle: string;
  question: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  type: 'Conceptual' | 'Coding' | 'Scenario-based';
  shortAnswer: string[]; // Fast high-impact bullet answers
  deepDive: string;
  codeSnippet?: CodeSnippet;
  followUpTip?: string;
  keywords: string[];
}

export interface SearchResultItem {
  id: string;
  title: string;
  type: 'topic' | 'exercise' | 'interview';
  languageId: LanguageId;
  parentCategory: string;
  excerpt: string;
  url: string;
  badge?: string;
}

export interface UserProgressState {
  completedTopics: string[]; // topic IDs
  completedExercises: string[]; // exercise IDs
  reviewedQuestions: string[]; // question IDs
  lastVisitedTopic?: {
    languageId: LanguageId;
    topicId: string;
    title: string;
    timestamp: number;
  };
}
