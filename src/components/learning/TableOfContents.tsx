import React, { useState, useEffect } from 'react';
import { AlignLeft } from 'lucide-react';
import { TopicSection } from '../../types';

interface TableOfContentsProps {
  sections: TopicSection[];
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ sections }) => {
  const [activeSectionId, setActiveSectionId] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const el = document.getElementById(section.id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSectionId(section.id);
          return;
        }
      }

      if (sections.length > 0) {
        setActiveSectionId(sections[0].id);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const topOffset = el.getBoundingClientRect().top + window.scrollY - 85;
      window.scrollTo({ top: topOffset, behavior: 'smooth' });
    }
  };

  if (!sections || sections.length === 0) return null;

  return (
    <div className="hidden xl:block w-64 shrink-0 pl-6 sticky top-24 self-start max-h-[calc(100vh-7rem)] overflow-y-auto">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-3">
        <AlignLeft className="w-3.5 h-3.5" />
        <span>On this page</span>
      </div>

      <nav className="space-y-1 text-xs">
        {sections.map((sec) => {
          const isActive = activeSectionId === sec.id;
          return (
            <button
              key={sec.id}
              onClick={() => scrollToSection(sec.id)}
              className={`block w-full text-left py-1 px-2 rounded-md transition-colors leading-snug cursor-pointer ${
                isActive
                  ? 'text-indigo-600 dark:text-indigo-400 font-semibold bg-indigo-50/60 dark:bg-indigo-950/40 border-l-2 border-indigo-600 dark:border-indigo-400'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800/40'
              }`}
            >
              {sec.title}
            </button>
          );
        })}
      </nav>
    </div>
  );
};
