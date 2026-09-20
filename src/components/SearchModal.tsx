import React, { useState, useEffect, useMemo } from 'react';
import { Search, X, Calendar, Clock, ChevronRight, BookOpen } from 'lucide-react';
import { Article } from '../types';
import { ARTICLES } from '../data/mockData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectArticle: (article: Article) => void;
  darkMode: boolean;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectArticle,
  darkMode
}) => {
  const [query, setQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        // toggle handled externally
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Extract all unique tags
  const allTags = useMemo(() => {
    const set = new Set<string>();
    ARTICLES.forEach(a => a.tags.forEach(t => set.add(t)));
    return Array.from(set);
  }, []);

  // Filtered results
  const results = useMemo(() => {
    return ARTICLES.filter(a => {
      const matchQuery = !query || 
        a.title.toLowerCase().includes(query.toLowerCase()) ||
        a.summary.toLowerCase().includes(query.toLowerCase()) ||
        a.author.toLowerCase().includes(query.toLowerCase()) ||
        a.tags.some(t => t.toLowerCase().includes(query.toLowerCase()));
      
      const matchTag = !selectedTag || a.tags.includes(selectedTag);

      return matchQuery && matchTag;
    });
  }, [query, selectedTag]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-start justify-center pt-16 px-4 pb-6 overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className={`w-full max-w-2xl rounded-2xl shadow-2xl border overflow-hidden transition-all duration-200 ${
          darkMode ? 'bg-[#062417] border-emerald-900 text-white' : 'bg-white border-amber-900/20 text-slate-800'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-200 dark:border-emerald-900 flex items-center gap-3">
          <Search className="w-5 h-5 text-[#0B5E3A] dark:text-[#C9A227] shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari kajian fiqih, kitab turats, berita santri, atau dawuh masyayikh..."
            className="w-full text-sm font-medium bg-transparent focus:outline-hidden placeholder-slate-400"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2 py-1 text-xs rounded bg-slate-100 dark:bg-emerald-900 text-slate-600 dark:text-emerald-200 hover:bg-slate-200 cursor-pointer"
          >
            ESC
          </button>
        </div>

        {/* Popular Tags */}
        <div className="px-4 py-2.5 bg-slate-50 dark:bg-emerald-950/40 border-b border-slate-200 dark:border-emerald-900/60 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-slate-400 font-semibold shrink-0 text-[11px]">Tag Populer:</span>
          {selectedTag && (
            <button
              onClick={() => setSelectedTag(null)}
              className="px-2 py-0.5 rounded-full bg-red-600 text-white text-[11px] font-medium shrink-0 cursor-pointer"
            >
              Reset Tag ✕
            </button>
          )}
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
              className={`px-2.5 py-0.5 rounded-full text-[11px] whitespace-nowrap transition cursor-pointer ${
                selectedTag === tag
                  ? 'bg-[#0B5E3A] text-white font-bold'
                  : 'bg-white dark:bg-emerald-900/60 text-slate-600 dark:text-emerald-200 hover:bg-emerald-100 border border-slate-200 dark:border-emerald-800'
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>

        {/* Search Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-2">
          {results.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-xs">
              <BookOpen className="w-8 h-8 mx-auto mb-2 text-slate-300 dark:text-emerald-800" />
              <p>Tidak ditemukan artikel atau kajian yang sesuai dengan kata kunci.</p>
              <p className="mt-1 text-[11px]">Coba cari dengan kata kunci seperti: "Fiqih", "Paylater", "Sarang", "Haid", atau "Alfiyah".</p>
            </div>
          ) : (
            results.map((article) => (
              <div
                key={article.id}
                onClick={() => {
                  onSelectArticle(article);
                  onClose();
                }}
                className={`p-3.5 rounded-xl border transition-all hover:translate-x-1 cursor-pointer flex items-center justify-between gap-4 ${
                  darkMode 
                    ? 'bg-[#082a1b] border-emerald-900/70 hover:border-[#C9A227]' 
                    : 'bg-white border-slate-200 hover:border-[#0B5E3A] hover:bg-emerald-50/20'
                }`}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-[#0B5E3A] text-[#C9A227]">
                      {article.categoryLabel}
                    </span>
                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#C9A227]" />
                      {article.date}
                    </span>
                  </div>

                  <h4 className="font-serif-heading font-bold text-sm leading-snug line-clamp-1">
                    {article.title}
                  </h4>

                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                    {article.summary}
                  </p>
                </div>

                <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
              </div>
            ))
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-slate-50 dark:bg-emerald-950/60 border-t border-slate-200 dark:border-emerald-900/60 text-[11px] text-slate-400 flex items-center justify-between">
          <span>Menampilkan {results.length} hasil pencarian</span>
          <span>Portal Warta Resmi PP At-Taroqqy Sarang</span>
        </div>

      </div>
    </div>
  );
};
