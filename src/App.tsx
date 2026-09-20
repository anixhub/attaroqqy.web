import React, { useState, useEffect } from 'react';
import { TopBar } from './components/TopBar';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ArticleModal } from './components/ArticleModal';
import { SearchModal } from './components/SearchModal';
import { LoginModal } from './components/LoginModal';

import { BerandaView } from './views/BerandaView';
import { ProfilView } from './views/ProfilView';
import { PendidikanView } from './views/PendidikanView';
import { SyaikhunaView } from './views/SyaikhunaView';
import { KajianView } from './views/KajianView';
import { ArtikelView } from './views/ArtikelView';
import { GaleriView } from './views/GaleriView';
import { PendaftaranView } from './views/PendaftaranView';
import { KontakView } from './views/KontakView';

import { ARTICLES } from './data/mockData';
import { ActivePage, Article, ProfilSubPage, PendidikanSubPage, SyaikhunaSubPage, KajianCategory } from './types';

export default function App() {
  const [activePage, setActivePage] = useState<ActivePage>('beranda');
  const [activeSubPage, setActiveSubPage] = useState<string | undefined>(undefined);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(false);

  // Sync dark mode class to root HTML element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Handle page navigation
  const handleNavigate = (page: ActivePage, subPage?: string) => {
    setActivePage(page);
    setActiveSubPage(subPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoginSuccess = (name: string) => {
    setCurrentUser(name);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <div className={`min-h-screen font-body transition-colors duration-200 ${
      darkMode ? 'bg-[#03150d] text-slate-100' : 'bg-[#FAF7F0] text-slate-800'
    }`}>
      
      {/* 1. Top Bar */}
      <TopBar
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        onOpenLogin={() => setIsLoginOpen(true)}
        isLoggedIn={!!currentUser}
        userName={currentUser || undefined}
        onLogout={handleLogout}
      />


      {/* 2. Main Navigation Header */}
      <Header
        activePage={activePage}
        onNavigate={handleNavigate}
        onOpenSearch={() => setIsSearchOpen(true)}
        darkMode={darkMode}
      />

      {/* 3. Main Dynamic Content Views */}
      <main className="min-h-[70vh]">
        {activePage === 'beranda' && (
          <BerandaView
            articles={ARTICLES}
            onSelectArticle={(art) => setSelectedArticle(art)}
            onNavigate={handleNavigate}
            darkMode={darkMode}
          />
        )}

        {activePage === 'profil' && (
          <ProfilView
            initialSubPage={(activeSubPage as ProfilSubPage) || 'sekilas'}
            darkMode={darkMode}
          />
        )}

        {activePage === 'pendidikan' && (
          <PendidikanView
            initialSubPage={(activeSubPage as PendidikanSubPage) || 'kurikulum'}
            darkMode={darkMode}
          />
        )}

        {activePage === 'syaikhuna' && (
          <SyaikhunaView
            initialSubPage={(activeSubPage as SyaikhunaSubPage) || 'biografi'}
            darkMode={darkMode}
          />
        )}

        {activePage === 'kajian' && (
          <KajianView
            articles={ARTICLES}
            initialCategory={(activeSubPage as KajianCategory) || 'semua'}
            onSelectArticle={(art) => setSelectedArticle(art)}
            darkMode={darkMode}
          />
        )}

        {activePage === 'artikel' && (
          <ArtikelView
            articles={ARTICLES}
            onSelectArticle={(art) => setSelectedArticle(art)}
            darkMode={darkMode}
          />
        )}

        {activePage === 'galeri' && (
          <GaleriView darkMode={darkMode} />
        )}

        {activePage === 'pendaftaran' && (
          <PendaftaranView darkMode={darkMode} />
        )}

        {activePage === 'kontak' && (
          <KontakView darkMode={darkMode} />
        )}
      </main>

      {/* 4. Global Footer */}
      <Footer
        onNavigate={handleNavigate}
        darkMode={darkMode}
      />

      {/* 5. Modals */}
      <ArticleModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
        onSelectArticle={(art) => setSelectedArticle(art)}
        darkMode={darkMode}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectArticle={(art) => setSelectedArticle(art)}
        darkMode={darkMode}
      />

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        darkMode={darkMode}
      />

    </div>
  );
}

