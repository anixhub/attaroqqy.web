import React from 'react';
import {
  FileText,
  Users,
  BookOpen,
  TrendingUp,
  Clock,
  Sparkles,
  ArrowRight,
  Database,
  CheckCircle2,
} from 'lucide-react';
import { Article } from '../../types';
import { isSupabaseConfigured } from '../../lib/supabase';

interface DashboardOverviewProps {
  articles: Article[];
  onNavigateTab: (tab: 'artikel' | 'psb' | 'pengaturan') => void;
  darkMode?: boolean;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  articles,
  onNavigateTab,
  darkMode = false,
}) => {
  const publishedCount = articles.filter(a => a.status !== 'draft').length;
  const draftCount = articles.filter(a => a.status === 'draft').length;
  const bahtsulMasailCount = articles.filter(a => a.category === 'bahtsul-masail').length;

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className={`p-6 sm:p-8 rounded-2xl border relative overflow-hidden shadow-xs ${
        darkMode
          ? 'bg-linear-to-r from-[#062417] to-[#041910] border-emerald-900 text-slate-100'
          : 'bg-linear-to-r from-[#0B5E3A] to-[#063b24] text-white border-[#0B5E3A]'
      }`}>
        <div className="relative z-10 max-w-2xl">
          <span className="text-xs font-serif font-bold text-[#C9A227] tracking-widest uppercase block mb-1">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </span>
          <h2 className="text-xl sm:text-2xl font-serif-heading font-bold">
            Selamat Datang di Portal Admin At-Taroqqy
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100/90 mt-2 leading-relaxed">
            Pusat manajemen konten publikasi dakwah, khazanah kajian turats salafiyah, warta pesantren Sarang, dan data registrasi santri baru.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => onNavigateTab('artikel')}
              className="px-4 py-2 rounded-xl bg-[#C9A227] text-slate-900 font-bold text-xs flex items-center gap-2 hover:bg-[#e0b938] transition cursor-pointer shadow-sm"
            >
              <FileText className="w-4 h-4 text-[#0B5E3A]" />
              <span>Kelola Artikel & Kajian</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={() => onNavigateTab('pengaturan')}
              className="px-4 py-2 rounded-xl bg-white/15 text-white font-semibold text-xs flex items-center gap-2 hover:bg-white/25 transition cursor-pointer"
            >
              <Database className="w-4 h-4 text-[#C9A227]" />
              <span>Status Database Supabase</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className={`p-5 rounded-2xl border shadow-xs ${
          darkMode ? 'bg-[#062417] border-emerald-900/60' : 'bg-white border-slate-200'
        }`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Total Artikel & Warta</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-[#0B5E3A] dark:text-emerald-300 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold font-serif-heading mt-3">{articles.length}</div>
          <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>{publishedCount} naskah telah tayang publik</span>
          </div>
        </div>

        <div className={`p-5 rounded-2xl border shadow-xs ${
          darkMode ? 'bg-[#062417] border-emerald-900/60' : 'bg-white border-slate-200'
        }`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Naskah Draf</span>
            <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold font-serif-heading mt-3">{draftCount}</div>
          <div className="text-[11px] text-slate-500 mt-1">
            <span>Menunggu telaah dewan asatidz</span>
          </div>
        </div>

        <div className={`p-5 rounded-2xl border shadow-xs ${
          darkMode ? 'bg-[#062417] border-emerald-900/60' : 'bg-white border-slate-200'
        }`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Bahtsul Masail</span>
            <div className="w-9 h-9 rounded-xl bg-[#C9A227]/20 text-[#C9A227] flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold font-serif-heading mt-3">{bahtsulMasailCount}</div>
          <div className="text-[11px] text-slate-500 mt-1">
            <span>Keputusan maraji' turats salaf</span>
          </div>
        </div>

        <div className={`p-5 rounded-2xl border shadow-xs ${
          darkMode ? 'bg-[#062417] border-emerald-900/60' : 'bg-white border-slate-200'
        }`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Database Engine</span>
            <div className="w-9 h-9 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-300 flex items-center justify-center">
              <Database className="w-4 h-4" />
            </div>
          </div>
          <div className="text-base font-bold font-serif-heading mt-3 flex items-center gap-2">
            <span>Supabase</span>
            <span className={`text-[10px] px-2 py-0.5 rounded-md font-sans ${
              isSupabaseConfigured ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
            }`}>
              {isSupabaseConfigured ? 'Connected' : 'Placeholder'}
            </span>
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            <span>PostgreSQL REST & Auth</span>
          </div>
        </div>
      </div>

      {/* Quick recent articles list */}
      <div className={`p-6 rounded-2xl border shadow-xs ${
        darkMode ? 'bg-[#062417] border-emerald-900/60' : 'bg-white border-slate-200'
      }`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-serif-heading font-bold text-base">
            Artikel Terbaru
          </h3>
          <button
            type="button"
            onClick={() => onNavigateTab('artikel')}
            className="text-xs font-semibold text-[#0B5E3A] dark:text-[#C9A227] hover:underline"
          >
            Lihat Semua ({articles.length}) →
          </button>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-emerald-900/40">
          {articles.slice(0, 4).map((art) => (
            <div key={art.id} className="py-3 flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-100 truncate">
                  {art.title}
                </p>
                <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-500">
                  <span>{art.categoryLabel}</span>
                  <span>•</span>
                  <span>{art.author}</span>
                  <span>•</span>
                  <span>{art.date}</span>
                </div>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-md font-semibold shrink-0 ${
                art.status === 'draft'
                  ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                  : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
              }`}>
                {art.status === 'draft' ? 'Draf' : 'Terbit'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
