import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { MobileNavigation } from '../components/layout/MobileNavigation';
import { GlobalSearchModal } from '../components/search/GlobalSearchModal';

// Pages
import { HomePage } from '../pages/HomePage';
import { LearnPage } from '../pages/LearnPage';
import { TopicPage } from '../pages/TopicPage';
import { ExercisesPage } from '../pages/ExercisesPage';
import { InterviewPage } from '../pages/InterviewPage';
import { AboutPage } from '../pages/AboutPage';
import { ContactPage } from '../pages/ContactPage';
import { SearchPage } from '../pages/SearchPage';
import { NotFoundPage } from '../pages/NotFoundPage';

export const App: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-white dark:bg-[#090a0f] text-zinc-900 dark:text-zinc-100 antialiased font-sans transition-colors duration-200">
        {/* Navigation Header */}
        <Header
          isMobileMenuOpen={isMobileMenuOpen}
          onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        />

        {/* Mobile Navigation Drawer */}
        <MobileNavigation
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          onOpenSearch={() => setIsSearchModalOpen(true)}
        />

        {/* Full-Page Search Modal */}
        <GlobalSearchModal
          isOpen={isSearchModalOpen}
          onClose={() => setIsSearchModalOpen(false)}
        />

        {/* Main Application Body */}
        <div className="flex-1 flex flex-col">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/learn" element={<LearnPage />} />
            <Route path="/learn/:language" element={<TopicPage />} />
            <Route path="/learn/:language/:topicId" element={<TopicPage />} />
            <Route path="/exercises" element={<ExercisesPage />} />
            <Route path="/interview" element={<InterviewPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>

        {/* Global Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
