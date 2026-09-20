import React, { useState, useMemo } from 'react';
import { Search, Calendar, Clock, Eye, ChevronLeft, ChevronRight, Newspaper, Tag } from 'lucide-react';
import { Article } from '../types';

interface ArtikelViewProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
  darkMode: boolean;
}

export const ArtikelView: React.FC<ArtikelViewProps> = ({
  articles,
  onSelectArticle,
  darkMode
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const categories = [
    { id: 'semua', label: 'Semua Kategori' },
    { id: 'berita', label: 'Berita & Kegiatan' },
    { id: 'pengumuman', label: 'Pengumuman Resmi' },
    { id: 'bahtsul-masail', label: 'Bahtsul Masail' },
    { id: 'durus', label: 'Durus Kitab' },
    { id: 'hikmah', label: 'Hikmah & Mawaidh' },
    { id: 'nisaiyat', label: 'Nisaiyat' },
    { id: 'resensi-kitab', label: 'Resensi Kitab' },
  ];

  const filteredArticles = useMemo(() => {
    return articles.filter(a => {
      const matchCategory = selectedCategory === 'semua' || a.category === selectedCategory;
      const matchQuery = !searchQuery ||
        a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchCategory && matchQuery;
    });
  }, [articles, selectedCategory, searchQuery]);

  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage) || 1;
  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 150, behavior: 'smooth' });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <span className="text-xs uppercase font-bold tracking-widest text-[#0B5E3A] dark:text-emerald-400">
          Warta Informasi
        </span>
        <h1 className={`font-serif-heading text-3xl sm:text-4xl font-bold mt-1 ${
          darkMode ? 'text-emerald-100' : 'text-slate-900'
        }`}>
          Arsip Berita & Warta Pesantren
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-2">
          Pusat publikasi agenda kegiatan, laporan haflah, rilis pers, serta catatan keilmuan Pondok Pesantren Sarang.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-4 border-b border-amber-900/15 mb-6">
        
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto scrollbar-none py-1">
          {categories.map(c => (
            <button
              key={c.id}
              onClick={() => {
                setSelectedCategory(c.id);
                setCurrentPage(1);
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                selectedCategory === c.id
                  ? 'bg-[#0B5E3A] text-[#C9A227] shadow-xs'
                  : darkMode
                    ? 'bg-[#082a1b] text-emerald-200 hover:bg-emerald-900'
                    : 'bg-white text-slate-700 hover:bg-amber-100/50 border border-amber-900/15'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Cari dalam arsip berita..."
            className={`w-full pl-9 pr-3 py-2 text-xs rounded-xl border focus:outline-hidden focus:border-[#0B5E3A] ${
              darkMode ? 'bg-[#062417] border-emerald-900 text-white' : 'bg-white border-amber-900/20 text-slate-800'
            }`}
          />
        </div>

      </div>

      {/* Grid of Articles */}
      {paginatedArticles.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-[#062417] rounded-2xl border border-dashed border-amber-900/20 text-slate-400 text-xs">
          <Newspaper className="w-8 h-8 mx-auto mb-2 text-slate-300 dark:text-emerald-800" />
          <p>Tidak ada warta yang sesuai dengan penyaringan saat ini.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedArticles.map(article => (
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

                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 mt-2 leading-relaxed">
                    {article.summary}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-emerald-950 flex items-center justify-between text-xs">
                  <span className="text-[#0B5E3A] dark:text-[#C9A227] font-semibold flex items-center gap-1">
                    <span>Baca Warta</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-10 flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-lg border border-amber-900/20 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-emerald-800/10 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {Array.from({ length: totalPages }).map((_, idx) => {
            const pageNum = idx + 1;
            return (
              <button
                key={pageNum}
                type="button"
                onClick={() => handlePageChange(pageNum)}
                className={`w-8 h-8 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  currentPage === pageNum
                    ? 'bg-[#0B5E3A] text-white shadow-xs'
                    : darkMode
                      ? 'bg-[#082a1b] text-emerald-200 hover:bg-emerald-900'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-amber-900/15'
                }`}
              >
                {pageNum}
              </button>
            );
          })}

          <button
            type="button"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg border border-amber-900/20 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-emerald-800/10 cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

    </div>
  );
};
