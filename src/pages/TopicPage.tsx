import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Menu, X, AlertCircle } from 'lucide-react';
import { LanguageId } from '../types';
import {
  getTopicById,
  getTopicsByLanguage,
  getGroupedTopics,
  LANGUAGES,
} from '../data';
import { TopicSidebar } from '../components/learning/TopicSidebar';
import { TopicContent } from '../components/learning/TopicContent';
import { TableOfContents } from '../components/learning/TableOfContents';
import { Breadcrumbs } from '../components/learning/Breadcrumbs';
import { useProgress } from '../hooks/useProgress';

import { LanguageComingSoon } from '../components/common/LanguageComingSoon';

export const TopicPage: React.FC = () => {
  const { language = 'java', topicId } = useParams<{ language: string; topicId?: string }>();
  const navigate = useNavigate();
  const { recordTopicVisit } = useProgress();

  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const isPhp = language === 'php';

  const langId: LanguageId = 'java';
  const languageMeta = LANGUAGES[0];
  const allLanguageTopics = getTopicsByLanguage(langId);
  const groups = getGroupedTopics(langId);

  // If no topicId provided in URL, redirect to first topic of language
  useEffect(() => {
    if (!isPhp && !topicId && allLanguageTopics.length > 0) {
      navigate(`/learn/${langId}/${allLanguageTopics[0].id}`, { replace: true });
    }
  }, [isPhp, topicId, langId, allLanguageTopics, navigate]);

  const currentTopic = topicId ? getTopicById(topicId) : allLanguageTopics[0];

  // Record visit for continue learning card
  useEffect(() => {
    if (!isPhp && currentTopic) {
      recordTopicVisit(currentTopic.languageId, currentTopic.id, `${currentTopic.codeNumber}: ${currentTopic.title}`);
      // Scroll to top upon topic change
      window.scrollTo(0, 0);
    }
  }, [isPhp, currentTopic, recordTopicVisit]);

  // If user selected PHP (coming-soon track)
  if (isPhp) {
    return <LanguageComingSoon languageName="PHP" context="learn" />;
  }

  if (!currentTopic) {
    return (
      <div className="max-w-2xl mx-auto py-16 px-4 text-center space-y-4">
        <AlertCircle className="w-12 h-12 text-rose-500 mx-auto" />
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
          Topic Not Found
        </h1>
        <p className="text-sm text-zinc-500">
          The requested topic &quot;{topicId}&quot; could not be located in the {languageMeta.name} track.
        </p>
        <div className="pt-4 flex justify-center gap-3">
          <Link
            to={`/learn/${langId}`}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold"
          >
            Back to {languageMeta.name} Track
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col">
      {/* Mobile Sidebar Trigger Bar */}
      <div className="lg:hidden sticky top-16 z-30 flex items-center justify-between px-4 py-2.5 bg-zinc-50 dark:bg-[#111219] border-b border-zinc-200 dark:border-zinc-800 text-xs">
        <button
          onClick={() => setIsMobileSidebarOpen(true)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200 font-semibold"
        >
          <Menu className="w-3.5 h-3.5" />
          <span>Curriculum Outline</span>
        </button>

        <span className="font-mono text-[11px] text-zinc-500 truncate max-w-[180px]">
          {currentTopic.codeNumber}
        </span>
      </div>

      {/* Main Container: 3-column layout */}
      <div className="flex-1 flex max-w-7xl mx-auto w-full">
        {/* Desktop Left Sidebar */}
        <div className="hidden lg:block w-72 xl:w-80 shrink-0 sticky top-16 h-[calc(100vh-4rem)] overflow-hidden">
          <TopicSidebar
            languageId={langId}
            groups={groups}
            currentTopicId={currentTopic.id}
          />
        </div>

        {/* Mobile Slide-Out Drawer for Sidebar */}
        {isMobileSidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
            <div className="fixed inset-y-0 left-0 w-80 max-w-[85vw] bg-white dark:bg-[#0e0f15] shadow-2xl flex flex-col z-50">
              <div className="flex items-center justify-between p-3.5 border-b border-zinc-200 dark:border-zinc-800">
                <span className="font-bold text-sm text-zinc-900 dark:text-white">Curriculum Outline</span>
                <button
                  onClick={() => setIsMobileSidebarOpen(false)}
                  className="p-1 rounded-lg text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-1 overflow-hidden">
                <TopicSidebar
                  languageId={langId}
                  groups={groups}
                  currentTopicId={currentTopic.id}
                  onSelectTopic={() => setIsMobileSidebarOpen(false)}
                />
              </div>
            </div>
          </div>
        )}

        {/* Center Main Reading Content */}
        <main className="flex-1 min-w-0 py-6 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Breadcrumbs
              languageId={langId}
              languageName={languageMeta.name}
              category={currentTopic.category}
              subcategory={currentTopic.subcategory}
              topicTitle={currentTopic.title}
            />

            <TopicContent topic={currentTopic} />
          </div>
        </main>

        {/* Right In-Page Table of Contents */}
        <TableOfContents sections={currentTopic.sections} />
      </div>
    </div>
  );
};
