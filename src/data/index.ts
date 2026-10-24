import { LanguageId, Topic, TopicGroup, SearchResultItem } from '../types';
import { JAVA_TOPICS } from './javaTopics';
import { EXERCISES } from './exercises';
import { INTERVIEW_QUESTIONS } from './interviewQuestions';

export * from './languages';
export * from './javaTopics';
export * from './phpTopics';
export * from './exercises';
export * from './interviewQuestions';

/**
 * Data Immutability Guarantee:
 * All educational content (topics, exercises, and interview Q&As) is statically compiled
 * into immutable client bundles. The platform has no write APIs, database endpoints,
 * or administrative mutation channels. Object.freeze is applied here to prevent any
 * runtime tampering or prototype pollution via browser developer tools.
 */
export const ALL_TOPICS: Topic[] = Object.freeze([...JAVA_TOPICS]) as unknown as Topic[];

export function getTopicsByLanguage(languageId: LanguageId): Topic[] {
  return ALL_TOPICS.filter((t) => t.languageId === languageId).sort((a, b) => a.order - b.order);
}

export function getTopicById(topicId: string): Topic | undefined {
  return ALL_TOPICS.find((t) => t.id === topicId || t.slug === topicId);
}

export function getGroupedTopics(languageId: LanguageId): TopicGroup[] {
  const topics = getTopicsByLanguage(languageId);
  const groupsMap = new Map<string, Topic[]>();

  for (const topic of topics) {
    const cat = topic.category || 'General';
    if (!groupsMap.has(cat)) {
      groupsMap.set(cat, []);
    }
    groupsMap.get(cat)!.push(topic);
  }

  const result: TopicGroup[] = [];
  groupsMap.forEach((groupTopics, categoryTitle) => {
    result.push({
      id: categoryTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      title: categoryTitle,
      topics: groupTopics,
    });
  });

  return result;
}

export function getAdjacentTopics(currentTopicId: string): { prev?: Topic; next?: Topic } {
  const current = getTopicById(currentTopicId);
  if (!current) return {};

  const list = getTopicsByLanguage(current.languageId);
  const index = list.findIndex((t) => t.id === current.id);
  if (index === -1) return {};

  return {
    prev: index > 0 ? list[index - 1] : undefined,
    next: index < list.length - 1 ? list[index + 1] : undefined,
  };
}

export function getPlatformStats() {
  return {
    languagesCount: 1,
    activeLanguagesCount: 1,
    javaTopicsCount: JAVA_TOPICS.length,
    phpTopicsCount: 0,
    totalTopicsCount: JAVA_TOPICS.length,
    totalExercisesCount: EXERCISES.length,
    totalQuestionsCount: INTERVIEW_QUESTIONS.length,
  };
}

export function searchAll(query: string): SearchResultItem[] {
  const cleanQuery = query.trim().toLowerCase();
  if (!cleanQuery) return [];

  const results: SearchResultItem[] = [];

  // Search Topics
  for (const topic of ALL_TOPICS) {
    const inTitle = topic.title.toLowerCase().includes(cleanQuery);
    const inSummary = topic.summary.toLowerCase().includes(cleanQuery);
    const inKeywords = topic.keywords.some((k) => k.toLowerCase().includes(cleanQuery));
    const inCode = topic.codeNumber.toLowerCase().includes(cleanQuery);
    const inWhy = topic.whyItMatters.toLowerCase().includes(cleanQuery);
    const inTakeaways = topic.keyTakeaways.some((k) => k.toLowerCase().includes(cleanQuery));
    const inSections = topic.sections.some(
      (s) =>
        s.title.toLowerCase().includes(cleanQuery) ||
        s.content.toLowerCase().includes(cleanQuery) ||
        (s.snippet?.code && s.snippet.code.toLowerCase().includes(cleanQuery)) ||
        (s.snippet?.explanation && s.snippet.explanation.toLowerCase().includes(cleanQuery)) ||
        (s.bullets && s.bullets.some((b) => b.toLowerCase().includes(cleanQuery))) ||
        (s.callout?.text && s.callout.text.toLowerCase().includes(cleanQuery))
    );

    if (inTitle || inSummary || inKeywords || inCode || inWhy || inTakeaways || inSections) {
      let excerpt = topic.summary;
      if (!inSummary && inSections) {
        const matchingSection = topic.sections.find(
          (s) =>
            s.title.toLowerCase().includes(cleanQuery) ||
            s.content.toLowerCase().includes(cleanQuery) ||
            (s.snippet?.code && s.snippet.code.toLowerCase().includes(cleanQuery)) ||
            (s.bullets && s.bullets.some((b) => b.toLowerCase().includes(cleanQuery)))
        );
        if (matchingSection) {
          excerpt = matchingSection.content.slice(0, 140) + '...';
        }
      }

      results.push({
        id: topic.id,
        title: `${topic.codeNumber}: ${topic.title}`,
        type: 'topic',
        languageId: topic.languageId,
        parentCategory: topic.category,
        excerpt,
        url: `/learn/${topic.languageId}/${topic.id}`,
        badge: topic.category,
      });
    }
  }

  // Search Exercises
  for (const ex of EXERCISES) {
    const inTitle = ex.title.toLowerCase().includes(cleanQuery);
    const inTask = ex.task.toLowerCase().includes(cleanQuery);
    const inExplanation = ex.explanation.toLowerCase().includes(cleanQuery);
    const inHints = ex.hints.some((h) => h.toLowerCase().includes(cleanQuery));
    const inStarter = ex.starterCode.toLowerCase().includes(cleanQuery);
    const inSolution = ex.solutionCode.toLowerCase().includes(cleanQuery);

    if (inTitle || inTask || inExplanation || inHints || inStarter || inSolution) {
      results.push({
        id: ex.id,
        title: `Exercise: ${ex.title}`,
        type: 'exercise',
        languageId: ex.languageId,
        parentCategory: ex.topicTitle,
        excerpt: ex.task.slice(0, 140) + '...',
        url: `/exercises?lang=${ex.languageId}&id=${ex.id}`,
        badge: ex.difficulty,
      });
    }
  }

  // Search Interview Questions
  for (const q of INTERVIEW_QUESTIONS) {
    const inQuestion = q.question.toLowerCase().includes(cleanQuery);
    const inAnswers = q.shortAnswer.some((a) => a.toLowerCase().includes(cleanQuery));
    const inDeepDive = q.deepDive.toLowerCase().includes(cleanQuery);
    const inKeywords = q.keywords.some((k) => k.toLowerCase().includes(cleanQuery));
    const inCode = q.codeSnippet?.code.toLowerCase().includes(cleanQuery) || false;

    if (inQuestion || inAnswers || inDeepDive || inKeywords || inCode) {
      results.push({
        id: q.id,
        title: `Q${q.number}: ${q.question}`,
        type: 'interview',
        languageId: q.languageId,
        parentCategory: q.topicTitle,
        excerpt: q.shortAnswer[0] || q.deepDive.slice(0, 140) + '...',
        url: `/interview?lang=${q.languageId}&id=${q.id}`,
        badge: q.type,
      });
    }
  }

  return results;
}
