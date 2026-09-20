import React, { useState } from 'react';
import {
  LayoutDashboard,
  FileText,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  ExternalLink,
  Moon,
  Sun,
  Shield,
  Database,
  ChevronRight,
} from 'lucide-react';
import { isSupabaseConfigured } from '../../lib/supabase';

export type AdminMenuTab = 'dashboard' | 'artikel' | 'psb' | 'pengaturan';

interface AdminLayoutProps {
  currentTab: AdminMenuTab;
  onSelectTab: (tab: AdminMenuTab) => void;
  onLogout: () => void;
  onBackToWebsite: () => void;
  userName?: string;
  userEmail?: string;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  currentTab,
  onSelectTab,
  onLogout,
  onBackToWebsite,
  userName = 'Administrator',
  userEmail = 'admin@attaroqqy.sch.id',
  darkMode,
  onToggleDarkMode,
  children,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    {
      id: 'dashboard' as AdminMenuTab,
      label: 'Dashboard',
      icon: LayoutDashboard,
      desc: 'Ringkasan & statistik',
    },
    {
      id: 'artikel' as AdminMenuTab,
      label: 'Artikel & Kajian',
      icon: FileText,
      desc: 'Kelola warta & turats',
      badge: 'Utama',
    },
    {
      id: 'psb' as AdminMenuTab,
      label: 'Pendaftaran PSB',
      icon: Users,
      desc: 'Data pendaftar santri',
    },
    {
      id: 'pengaturan' as AdminMenuTab,
      label: 'Pengaturan',
      icon: Settings,
      desc: 'Supabase & website',
    },
  ];

  const getPageTitle = () => {
    switch (currentTab) {
      case 'dashboard':
        return 'Ringkasan Dashboard';
      case 'artikel':
        return 'Manajemen Artikel & Kajian';
      case 'psb':
        return 'Pendaftaran Santri Baru (PSB)';
      case 'pengaturan':
        return 'Pengaturan Sistem & Database';
      default:
        return 'Admin Panel';
    }
  };

  return (
    <div className={`min-h-screen flex flex-col md:flex-row transition-colors ${
      darkMode ? 'bg-[#03150d] text-slate-100' : 'bg-[#F4F1EA] text-slate-800'
    }`}>
      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 md:hidden backdrop-blur-xs"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* 1. SIDEBAR */}
      <aside
        className={`fixed md:sticky top-0 z-50 h-screen w-72 flex flex-col justify-between shrink-0 transition-all duration-300 ease-in-out border-r ${
          darkMode
            ? 'bg-[#051e13] border-emerald-900/60 text-slate-200'
            : 'bg-[#0B5E3A] border-[#07472c] text-white'
        } ${
          isMobileMenuOpen ? 'left-0' : '-left-72 md:left-0'
        }`}
      >
        {/* Sidebar Header */}
        <div>
          <div className="p-5 flex items-center justify-between border-b border-white/10 dark:border-emerald-900/60">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#C9A227] text-slate-900 flex items-center justify-center font-bold shadow-md">
                <Shield className="w-5 h-5 text-[#0B5E3A]" />
              </div>
              <div>
                <span className="font-serif-heading font-bold text-sm block tracking-wide text-[#C9A227]">
                  AT-TAROQQY CMS
                </span>
                <span className="text-[11px] text-emerald-200 dark:text-emerald-400 block">
                  Pesantren Sarang Rembang
                </span>
              </div>
            </div>

            {/* Mobile Close Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(false)}
              className="md:hidden p-1.5 rounded-lg text-emerald-200 hover:text-white hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Database indicator pill */}
          <div className="mx-4 my-3 p-2.5 rounded-xl bg-black/20 text-xs flex items-center justify-between border border-white/10">
            <div className="flex items-center gap-2">
              <Database className="w-3.5 h-3.5 text-[#C9A227]" />
              <span className="text-[11px] font-medium text-white/90">
                {isSupabaseConfigured ? 'Supabase Connected' : 'Supabase (Placeholder)'}
              </span>
            </div>
            <span className={`w-2 h-2 rounded-full ${
              isSupabaseConfigured ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
            }`} />
          </div>

          {/* Nav Items */}
          <nav className="px-3 py-2 space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    onSelectTab(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-semibold transition cursor-pointer ${
                    isActive
                      ? 'bg-[#C9A227] text-slate-900 font-bold shadow-sm'
                      : 'text-emerald-100 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-slate-900' : 'text-[#C9A227]'}`} />
                    <div className="text-left">
                      <span className="block leading-none">{item.label}</span>
                      <span className={`text-[10px] mt-0.5 block ${
                        isActive ? 'text-slate-800' : 'text-emerald-300/80 dark:text-emerald-500'
                      }`}>
                        {item.desc}
                      </span>
                    </div>
                  </div>
                  {item.badge ? (
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-bold uppercase ${
                      isActive ? 'bg-[#0B5E3A] text-white' : 'bg-[#C9A227]/20 text-[#C9A227]'
                    }`}>
                      {item.badge}
                    </span>
                  ) : (
                    <ChevronRight className={`w-3.5 h-3.5 opacity-60 ${isActive ? 'text-slate-900' : 'text-emerald-200'}`} />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-white/10 dark:border-emerald-900/60 space-y-2">
          <button
            type="button"
            onClick={onBackToWebsite}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/15 text-emerald-100 hover:text-white transition cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#C9A227]" />
            <span>Lihat Website Publik</span>
          </button>
        </div>
      </aside>

      {/* 2. MAIN BODY & TOPBAR */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* TOPBAR */}
        <header className={`sticky top-0 z-30 h-16 border-b px-4 sm:px-6 flex items-center justify-between backdrop-blur-md transition-colors ${
          darkMode
            ? 'bg-[#051e13]/90 border-emerald-900/60 text-slate-100'
            : 'bg-white/90 border-slate-200 text-slate-800'
        }`}>
          {/* Left: Mobile Toggle & Breadcrumb */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-emerald-950 cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#0B5E3A] dark:text-[#C9A227] font-bold block">
                Panel Administrasi
              </span>
              <h1 className="text-base sm:text-lg font-bold font-serif-heading leading-none">
                {getPageTitle()}
              </h1>
            </div>
          </div>

          {/* Right: Actions & User Info */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Dark mode toggle */}
            <button
              type="button"
              onClick={onToggleDarkMode}
              title="Toggle Mode Terang/Gelap"
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-emerald-900/40 cursor-pointer transition"
            >
              {darkMode ? <Sun className="w-4 h-4 text-[#C9A227]" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>

            {/* User profile preview */}
            <div className="hidden sm:flex items-center gap-2.5 pl-2 border-l border-slate-200 dark:border-emerald-900/60">
              <div className="w-8 h-8 rounded-full bg-[#0B5E3A] text-[#C9A227] font-bold text-xs flex items-center justify-center border border-[#C9A227]/40 shadow-xs">
                {userName.charAt(0).toUpperCase()}
              </div>
              <div className="text-left leading-tight">
                <span className="text-xs font-semibold block">{userName}</span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block max-w-[130px] truncate">
                  {userEmail}
                </span>
              </div>
            </div>

            {/* Logout button */}
            <button
              type="button"
              onClick={onLogout}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 border border-red-200 dark:border-red-900/60 transition cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Keluar</span>
            </button>
          </div>
        </header>

        {/* Dynamic Children Content */}
        <main className="p-4 sm:p-6 lg:p-8 flex-1">
          {children}
        </main>
      </div>
    </div>
  );
};
