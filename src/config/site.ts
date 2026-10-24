export interface SiteConfig {
  name: string;
  acronym: string;
  fullName: string;
  tagline: string;
  subTagline: string;
  description: string;
  version: string;
  author: string;
  navLinks: {
    name: string;
    path: string;
    badge?: string;
  }[];
}

export const SITE_CONFIG: SiteConfig = {
  name: 'My Interview Learning',
  acronym: 'MIL',
  fullName: 'My Interview Learning (MIL)',
  tagline: 'Practical Java & Technical Interview Mastery',
  subTagline: 'Master Java from first principles, JVM mechanics, and memory models to senior technical interview readiness.',
  description:
    'A dedicated Java-only, practical, and interview-oriented learning platform. Master JVM execution, memory layouts, OOP architecture, exception handling, multithreading, synchronization, and 60+ real-world interview challenges.',
  version: '2.0.0',
  author: 'My Interview Learning Team',
  navLinks: [
    { name: 'Home', path: '/' },
    { name: 'Curriculum', path: '/learn' },
    { name: 'Exercises', path: '/exercises' },
    { name: 'Interview Bank', path: '/interview' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ],
};
