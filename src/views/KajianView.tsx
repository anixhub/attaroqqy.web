import React, { useState, useEffect } from 'react';
import { 
  Scale, 
  BookOpen, 
  Sparkles, 
  HeartHandshake, 
  LibraryBig, 
  Search, 
  Calendar, 
  Clock, 
  ChevronRight,
  Filter
} from 'lucide-react';
import { KajianCategory, Article } from '../types';

interface KajianViewProps {
  articles: Article[];
  initialCategory?: KajianCategory;
  onSelectArticle: (article: Article) => void;
  darkMode: boolean;
}

export const KajianView: React.FC<KajianViewProps> = ({
  articles,
  initialCategory = 'semua',
  onSelectArticle,
  darkMode
}) => {
  const [selectedCategory, setSelectedCategory] = useState<KajianCategory>(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  const categories = [
    { id: 'semua' as KajianCategory, label: 'Semua Kajian', icon: BookOpen },
    { id: 'bahtsul-masail' as KajianCategory, label: 'Bahtsul Masail', icon: Scale },
    { id: 'durus' as KajianCategory, label: 'Durus Kitab Kuning', icon: BookOpen },
    { id: 'hikmah' as KajianCategory, label: 'Hikmah & Tasawuf', icon: Sparkles },
    { id: 'nisaiyat' as KajianCategory, label: 'Nisaiyat (Keputrian)', icon: HeartHandshake },
    { id: 'resensi-kitab' as KajianCategory, label: 'Resensi Kitab', icon: LibraryBig },
  ];

  // Exclude general announcements/news from pure kajian if category filtered
  const filtered = articles.filter(a => {
    const isKajian = ['bahtsul-masail', 'durus', 'hikmah', 'nisaiyat', 'resensi-kitab'].includes(a.category);
    const matchCategory = selectedCategory === 'semua' ? isKajian : a.category === selectedCategory;
    const matchQuery = !searchQuery || 
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchCategory && matchQuery;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <span className="text-xs uppercase font-bold tracking-widest text-[#0B5E3A] dark:text-emerald-400">
          Khazanah Turats Islam
        </span>
        <h1 className={`font-serif-heading text-3xl sm:text-4xl font-bold mt-1 ${
          darkMode ? 'text-emerald-100' : 'text-slate-900'
        }`}>
          Portal Kajian & Bahtsul Masail
        </h1>
        <p className="font-arabic text-lg text-[#C9A227] mt-1" dir="rtl">
          «مَنْ يُرِدِ اللَّهُ بِهِ خَيْرًا يُفَقِّهْهُ فِي الدِّينِ»
        </p>
        <p className="text-xs sm:text-sm text-slate-500 mt-2">
          Pusat telaah fiqih madzhab Syafi'i, kajian kitab turats klasik, tazkiyatun nufus, dan fiqih keputrian bersanad.
        </p>
      </div>

      {/* Category Tabs & Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-4 border-b border-amber-900/15 mb-6">
        
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto scrollbar-none py-1">
          {categories.map(cat => {
            const Icon = cat.icon;
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                  isActive
                    ? 'bg-[#0B5E3A] text-[#C9A227] shadow-sm'
                    : darkMode
                      ? 'bg-[#082a1b] text-emerald-200 hover:bg-emerald-900'
                      : 'bg-white text-slate-700 hover:bg-amber-100/50 border border-amber-900/15'
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Search Kajian Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari kajian atau ibarat..."
            className={`w-full pl-9 pr-3 py-2 text-xs rounded-xl border focus:outline-hidden focus:border-[#0B5E3A] ${
              darkMode ? 'bg-[#062417] border-emerald-900 text-white' : 'bg-white border-amber-900/20 text-slate-800'
            }`}
          />
        </div>

      </div>

      {/* Kajian Results List */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-[#062417] rounded-2xl border border-dashed border-amber-900/20 text-slate-400 text-xs">
          <BookOpen className="w-8 h-8 mx-auto mb-2 text-slate-300 dark:text-emerald-800" />
          <p>Belum ada artikel kajian dalam kategori atau kata kunci ini.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((article) => (
            <article
              key={article.id}
              onClick={() => onSelectArticle(article)}
              className={`group rounded-2xl overflow-hidden border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col cursor-pointer ${
                darkMode 
                  ? 'bg-[#072416] border-emerald-900 hover:border-[#C9A227]' 
                  : 'bg-white border-amber-900/15 hover:border-[#0B5E3A]'
              }`}
            >
              <div className="relative h-48 w-full overflow-hidden bg-slate-200">
                <img
                  src={article.thumbnail}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <span className="absolute top-3 left-3 px-2.5 py-0.5 text-[11px] font-bold uppercase rounded bg-[#0B5E3A] text-[#C9A227]">
                  {article.categoryLabel}
                </span>
                <span className="absolute bottom-3 right-3 px-2 py-0.5 text-[10px] rounded bg-black/60 text-white backdrop-blur-xs flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#C9A227]" />
                  {article.readTime}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#C9A227]" />
                      {article.date}
                    </span>
                    <span>•</span>
                    <span className="truncate">{article.author}</span>
                  </div>

                  <h3 className={`font-serif-heading font-bold text-base leading-snug group-hover:text-[#0B5E3A] dark:group-hover:text-[#C9A227] transition-colors line-clamp-2 ${
                    darkMode ? 'text-emerald-100' : 'text-slate-900'
                  }`}>
                    {article.title}
                  </h3>

                  {/* Arabic Snippet Preview if exists */}
                  {article.arabicSnippet && (
                    <div className="my-2.5 p-2 rounded bg-[#0B5E3A]/5 dark:bg-emerald-950/60 border border-[#0B5E3A]/15">
                      <p className="font-arabic text-sm text-[#0B5E3A] dark:text-[#C9A227] font-semibold text-right truncate" dir="rtl">
                        {article.arabicSnippet.text}
                      </p>
                    </div>
                  )}

                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 mt-2 leading-relaxed">
                    {article.summary}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-emerald-950 flex items-center justify-between text-xs">
                  <span className="text-[#0B5E3A] dark:text-[#C9A227] font-bold flex items-center gap-1">
                    <span>Buka Kajian Lengkap</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

    </div>
  );
};
