import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { LanguageId } from '../../types';

interface BreadcrumbsProps {
  languageId: LanguageId;
  languageName: string;
  category: string;
  subcategory?: string;
  topicTitle: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  languageId,
  languageName,
  category,
  subcategory,
  topicTitle,
}) => {
  return (
    <nav className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400 overflow-x-auto py-2 whitespace-nowrap scrollbar-none" aria-label="Breadcrumb">
      <Link
        to="/"
        className="flex items-center gap-1 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
      >
        <Home className="w-3.5 h-3.5" />
        <span className="sr-only">Home</span>
      </Link>

      <ChevronRight className="w-3 h-3 text-zinc-400 shrink-0" />

      <Link
        to={`/learn/${languageId}`}
        className="hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors"
      >
        {languageName}
      </Link>

      <ChevronRight className="w-3 h-3 text-zinc-400 shrink-0" />

      <span className="text-zinc-600 dark:text-zinc-300 font-medium">
        {category}
      </span>

      {subcategory && (
        <>
          <ChevronRight className="w-3 h-3 text-zinc-400 shrink-0" />
          <span className="text-zinc-600 dark:text-zinc-300 font-medium">
            {subcategory}
          </span>
        </>
      )}

      <ChevronRight className="w-3 h-3 text-zinc-400 shrink-0" />

      <span className="text-zinc-900 dark:text-zinc-100 font-semibold truncate max-w-[200px] sm:max-w-none">
        {topicTitle}
      </span>
    </nav>
  );
};
