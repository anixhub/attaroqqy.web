import React, { useState } from 'react';
import { Calendar, Clock, Eye, ChevronRight, BookOpen } from 'lucide-react';
import { Article } from '../types';

interface BeritaGridProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
  onViewAllNews: () => void;
  darkMode: boolean;
}

export const BeritaGrid: React.FC<BeritaGridProps> = ({
  articles,
  onSelectArticle,
  onViewAllNews,
  darkMode
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('semua');

  const categories = [
    { id: 'semua', label: 'Semua Warta' },
    { id: 'bahtsul-masail', label: 'Bahtsul Masail' },
    { id: 'durus', label: 'Durus' },
    { id: 'hikmah', label: 'Hikmah' },
    { id: 'nisaiyat', label: 'Nisaiyat' },
    { id: 'berita', label: 'Berita & Kegiatan' },
  ];

  const filteredArticles = selectedCategory === 'semua'
    ? articles
    : articles.filter(a => a.category === selectedCategory);

  const displayedArticles = filteredArticles.slice(0, 6);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" aria-label="Warta dan Kajian Terbaru">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-amber-900/15">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0B5E3A]" />
            <span className="text-xs uppercase font-bold tracking-widest text-[#0B5E3A] dark:text-emerald-400">
              Warta & Kajian Turats
            </span>
          </div>
          <h2 className={`font-serif-heading text-2xl sm:text-3xl font-bold mt-1 ${
            darkMode ? 'text-emerald-100' : 'text-slate-900'
          }`}>
            Berita & Artikel Terbaru
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
            Kumpulan artikel fiqih salaf, ulasan kitab turats, serta warta kegiatan santri Pondok Pesantren Sarang.
          </p>
        </div>

        {/* View All Button */}
        <button
          type="button"
          onClick={onViewAllNews}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0B5E3A] hover:text-[#C9A227] dark:text-emerald-300 transition cursor-pointer self-start sm:self-auto"
        >
          <span>Lihat Semua Arsip</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Category Pills Filter */}
      <div className="flex items-center gap-2 overflow-x-auto py-4 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition cursor-pointer ${
              selectedCategory === cat.id
                ? 'bg-[#0B5E3A] text-white shadow-xs'
                : darkMode
                  ? 'bg-emerald-950/60 text-emerald-200 hover:bg-emerald-900/60 border border-emerald-900'
                  : 'bg-white text-slate-700 hover:bg-amber-100/50 border border-amber-900/15'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-2">
        {displayedArticles.map((article) => (
          <article
            key={article.id}
            onClick={() => onSelectArticle(article)}
            className={`group rounded-xl overflow-hidden border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col cursor-pointer ${
              darkMode 
                ? 'bg-[#072416] border-emerald-900/80 hover:border-[#C9A227]/50' 
                : 'bg-white border-amber-900/15 hover:border-[#0B5E3A]/40'
            }`}
          >
            {/* Thumbnail */}
            <div className="relative h-48 w-full overflow-hidden bg-slate-200">
              <img
                src={article.thumbnail}
                alt={article.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <span className="absolute top-3 left-3 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider rounded bg-[#0B5E3A] text-[#C9A227] shadow-xs">
                {article.categoryLabel}
              </span>
              <span className="absolute bottom-3 right-3 px-2 py-0.5 text-[10px] font-medium rounded bg-black/60 text-white backdrop-blur-xs flex items-center gap-1">
                <Clock className="w-3 h-3 text-[#C9A227]" />
                {article.readTime}
              </span>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
              <div>
                {/* Meta */}
                <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 mb-2">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#C9A227]" />
                    {article.date}
                  </span>
                  <span>•</span>
                  <span className="truncate">{article.author}</span>
                </div>

                {/* Title */}
                <h3 className={`font-serif-heading font-bold text-base sm:text-lg leading-snug group-hover:text-[#0B5E3A] dark:group-hover:text-[#C9A227] transition-colors line-clamp-2 ${
                  darkMode ? 'text-emerald-100' : 'text-slate-900'
                }`}>
                  {article.title}
                </h3>

                {/* 2-line Excerpt */}
                <p className={`text-xs mt-2.5 line-clamp-2 leading-relaxed ${
                  darkMode ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  {article.summary}
                </p>
              </div>

              {/* Bottom Card Footer */}
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-emerald-950/60 flex items-center justify-between text-xs">
                <span className="text-[#0B5E3A] dark:text-[#C9A227] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Baca Kajian</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>

                <span className="flex items-center gap-1 text-[11px] text-slate-400">
                  <Eye className="w-3 h-3" />
                  <span>{article.views.toLocaleString('id-ID')}</span>
                </span>
              </div>

            </div>
          </article>
        ))}
      </div>

    </section>
  );
};
