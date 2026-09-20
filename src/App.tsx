import React, { useState, useEffect } from 'react';
import { TopBar } from './components/TopBar';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ArticleModal } from './components/ArticleModal';
import { SearchModal } from './components/SearchModal';
import { LoginModal } from './components/LoginModal';

// Admin CMS Views and Layout
import { AdminLayout, AdminMenuTab } from './components/admin/AdminLayout';
import { LoginView } from './views/admin/LoginView';
import { ArtikelManageView } from './views/admin/ArtikelManageView';
import { DashboardOverview } from './views/admin/DashboardOverview';
import { PsbManageView } from './views/admin/PsbManageView';
import { PengaturanView } from './views/admin/PengaturanView';

// Public Pesantren Views
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
  // Public page state
  const [activePage, setActivePage] = useState<ActivePage>('beranda');
  const [activeSubPage, setActiveSubPage] = useState<string | undefined>(undefined);
  
  // Dynamic articles state (shared between public portal and Admin CMS)
  const [articles, setArticles] = useState<Article[]>(ARTICLES);

  // Modals state
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(false);

  // Router Path State (synchronizes with window.location.pathname)
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  // Admin User Authentication State
  const [adminUser, setAdminUser] = useState<{ email: string; name?: string } | null>(() => {
    try {
      const saved = localStorage.getItem('attaroqqy_admin_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Sync route changes & popstate
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Function to navigate paths (e.g. /admin/login, /admin/artikel, /)
  const navigateTo = (path: string) => {
    window.history.pushState(null, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Sync dark mode class to root HTML element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Handle public page navigation
  const handleNavigate = (page: ActivePage, subPage?: string) => {
    if (currentPath.startsWith('/admin')) {
      navigateTo('/');
    }
    setActivePage(page);
    setActiveSubPage(subPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePublicLoginSuccess = (name: string) => {
    setCurrentUser(name);
  };

  const handlePublicLogout = () => {
    setCurrentUser(null);
  };

  // Admin login handler
  const handleAdminLoginSuccess = (user: { email: string; name?: string }) => {
    setAdminUser(user);
    try {
      localStorage.setItem('attaroqqy_admin_user', JSON.stringify(user));
    } catch (e) {
      console.error(e);
    }
    navigateTo('/admin/artikel');
  };

  // Admin logout handler
  const handleAdminLogout = () => {
    setAdminUser(null);
    try {
      localStorage.removeItem('attaroqqy_admin_user');
    } catch (e) {
      console.error(e);
    }
    navigateTo('/admin/login');
  };

  // Determine which admin tab is active based on path
  const getAdminTabFromPath = (path: string): AdminMenuTab => {
    if (path.includes('/admin/artikel')) return 'artikel';
    if (path.includes('/admin/psb')) return 'psb';
    if (path.includes('/admin/pengaturan')) return 'pengaturan';
    return 'dashboard';
  };

  /* =========================================================================
   * ROUTE 1: /admin/login
   * ========================================================================= */
  if (currentPath === '/admin/login') {
    return (
      <LoginView
        onLoginSuccess={handleAdminLoginSuccess}
        onBackToWebsite={() => navigateTo('/')}
        darkMode={darkMode}
      />
    );
  }

  /* =========================================================================
   * ROUTE 2: /admin/* (e.g. /admin/artikel, /admin/dashboard, etc.)
   * ========================================================================= */
  if (currentPath.startsWith('/admin')) {
    // If not logged in, show LoginView with prompt
    if (!adminUser) {
      return (
        <LoginView
          onLoginSuccess={handleAdminLoginSuccess}
          onBackToWebsite={() => navigateTo('/')}
          darkMode={darkMode}
        />
      );
    }

    const currentTab = getAdminTabFromPath(currentPath);

    return (
      <div className={darkMode ? 'dark' : ''}>
        <AdminLayout
          currentTab={currentTab}
          onSelectTab={(tab) => {
            if (tab === 'artikel') navigateTo('/admin/artikel');
            else if (tab === 'psb') navigateTo('/admin/psb');
            else if (tab === 'pengaturan') navigateTo('/admin/pengaturan');
            else navigateTo('/admin');
          }}
          onLogout={handleAdminLogout}
          onBackToWebsite={() => navigateTo('/')}
          userName={adminUser.name || 'Administrator'}
          userEmail={adminUser.email}
          darkMode={darkMode}
          onToggleDarkMode={() => setDarkMode(!darkMode)}
        >
          {currentTab === 'artikel' && (
            <ArtikelManageView
              initialArticles={articles}
              onArticlesChange={(updated) => setArticles(updated)}
              onPreviewArticle={(art) => setSelectedArticle(art)}
              darkMode={darkMode}
            />
          )}

          {currentTab === 'dashboard' && (
            <DashboardOverview
              articles={articles}
              onNavigateTab={(tab) => {
                if (tab === 'artikel') navigateTo('/admin/artikel');
                else if (tab === 'psb') navigateTo('/admin/psb');
                else navigateTo('/admin/pengaturan');
              }}
              darkMode={darkMode}
            />
          )}

          {currentTab === 'psb' && (
            <PsbManageView darkMode={darkMode} />
          )}

          {currentTab === 'pengaturan' && (
            <PengaturanView darkMode={darkMode} />
          )}
        </AdminLayout>

        {/* Modal preview article from admin */}
        <ArticleModal
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
          onSelectArticle={(art) => setSelectedArticle(art)}
          darkMode={darkMode}
        />
      </div>
    );
  }

  /* =========================================================================
   * ROUTE 3: PUBLIC PESANTREN WEBSITE (/)
   * ========================================================================= */
  return (
    <div className={`min-h-screen font-body transition-colors duration-200 ${
      darkMode ? 'bg-[#03150d] text-slate-100' : 'bg-[#FAF7F0] text-slate-800'
    }`}>
      
      {/* 1. Top Bar */}
      <TopBar
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        onOpenLogin={() => setIsLoginOpen(true)}
        isAdmin={!!adminUser}
        adminName={adminUser?.name || 'Administrator'}
        onOpenAdmin={() => navigateTo('/admin/artikel')}
        onAdminLogout={handleAdminLogout}
        isLoggedIn={!!currentUser}
        userName={currentUser || undefined}
        onLogout={handlePublicLogout}
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
            articles={articles}
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
            articles={articles}
            initialCategory={(activeSubPage as KajianCategory) || 'semua'}
            onSelectArticle={(art) => setSelectedArticle(art)}
            darkMode={darkMode}
          />
        )}

        {activePage === 'artikel' && (
          <ArtikelView
            articles={articles}
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
        isAdmin={!!adminUser}
        onNavigateToAdmin={() => navigateTo('/admin/artikel')}
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
        onLoginSuccess={handlePublicLoginSuccess}
        onOpenAdminLogin={() => navigateTo('/admin/login')}
        darkMode={darkMode}
      />

    </div>
  );
}
