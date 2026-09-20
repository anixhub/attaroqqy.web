import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  User, 
  Share2, 
  Check, 
  Eye, 
  Tag, 
  ChevronRight, 
  BookOpen, 
  Copy,
  Send,
  Facebook
} from 'lucide-react';
import { Article } from '../types';
import { ARTICLES } from '../data/mockData';

interface ArticleModalProps {
  article: Article | null;
  onClose: () => void;
  onSelectArticle: (article: Article) => void;
  darkMode: boolean;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  article,
  onClose,
  onSelectArticle,
  darkMode
}) => {
  const [copied, setCopied] = useState(false);

  if (!article) return null;

  // Filter related articles (same category, excluding current)
  const relatedArticles = ARTICLES
    .filter(a => a.id !== article.id && (a.category === article.category || a.category === 'berita'))
    .slice(0, 3);

  const shareUrl = window.location.href;
  const shareText = `${article.title} - Pondok Pesantren At-Taroqqy Sarang`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareWA = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareText}\n\n${shareUrl}`)}`;
    window.open(url, '_blank');
  };

  const handleShareFB = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank');
  };

  const handleShareTG = () => {
    const url = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank');
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex justify-center p-3 sm:p-6"
      onClick={onClose}
    >
      <div 
        className={`relative w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden border my-auto transition-colors ${
          darkMode ? 'bg-[#062417] border-emerald-900 text-slate-200' : 'bg-white border-amber-900/20 text-slate-800'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Top Header with Breadcrumbs & Close */}
        <div className={`sticky top-0 z-20 flex items-center justify-between px-6 py-3 border-b backdrop-blur-md ${
          darkMode ? 'bg-[#062417]/90 border-emerald-900/80' : 'bg-white/90 border-amber-900/10'
        }`}>
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-1.5 text-xs text-slate-500 overflow-hidden truncate">
            <span className="hover:text-[#0B5E3A] cursor-pointer" onClick={onClose}>Beranda</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#0B5E3A] dark:text-[#C9A227] font-semibold">{article.categoryLabel}</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="truncate max-w-[200px]">{article.title}</span>
          </nav>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-200 dark:hover:bg-emerald-900 text-slate-500 hover:text-slate-900 dark:hover:text-white transition cursor-pointer"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body Container */}
        <div className="p-6 sm:p-8 lg:p-10 max-h-[80vh] overflow-y-auto">
          
          {/* Category & Tags */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-3 py-0.5 rounded-md text-xs font-bold uppercase tracking-wider bg-[#0B5E3A] text-[#C9A227]">
              {article.categoryLabel}
            </span>
            <span className="text-xs text-slate-500 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-[#C9A227]" />
              <span>{article.date}</span>
              <span className="text-slate-400 font-arabic text-xs">({article.hijriDate})</span>
            </span>
          </div>

          {/* Semantic Heading (H1) */}
          <h1 className={`font-serif-heading text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight ${
            darkMode ? 'text-emerald-100' : 'text-slate-900'
          }`}>
            {article.title}
          </h1>

          {/* Author & Meta Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-4 my-4 border-y border-slate-200 dark:border-emerald-900/60 text-xs">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#0B5E3A] text-white flex items-center justify-center font-bold">
                {article.author.charAt(0)}
              </div>
              <div>
                <span className="font-bold block text-sm">{article.author}</span>
                <span className="text-slate-500 text-[11px]">{article.authorRole || 'Pondok Pesantren Sarang'}</span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-slate-500">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#C9A227]" />
                <span>{article.readTime}</span>
              </span>
              <span className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5 text-[#C9A227]" />
                <span>{article.views.toLocaleString('id-ID')} Kali Dibaca</span>
              </span>
            </div>
          </div>

          {/* Hero Featured Image */}
          <div className="rounded-xl overflow-hidden mb-6 max-h-96 w-full bg-slate-100">
            <img
              src={article.thumbnail}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Arabic Snippet Box (if provided) */}
          {article.arabicSnippet && (
            <div className={`my-6 p-5 sm:p-6 rounded-xl border ${
              darkMode ? 'bg-[#08301f] border-emerald-800 text-white' : 'bg-[#FAF7F0] border-amber-900/20'
            }`}>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#C9A227] block mb-2">
                Ibarat Naskah Kitab Kuning
              </span>
              
              <p className="font-arabic text-xl sm:text-2xl text-[#0B5E3A] dark:text-[#C9A227] font-bold leading-loose text-right" dir="rtl">
                {article.arabicSnippet.text}
              </p>

              <div className="mt-3 pt-3 border-t border-amber-900/15 text-xs text-slate-600 dark:text-slate-300">
                <p className="italic">{article.arabicSnippet.translation}</p>
                <span className="block mt-1 font-semibold text-[#0B5E3A] dark:text-emerald-400">
                  — {article.arabicSnippet.source}
                </span>
              </div>
            </div>
          )}

          {/* Main Article Content */}
          <div className="prose prose-slate dark:prose-invert max-w-none text-sm sm:text-base leading-relaxed space-y-4 font-normal">
            {article.content.split('\n\n').map((paragraph, idx) => (
              <p key={idx} className="leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Tags */}
          <div className="mt-8 pt-4 border-t border-slate-200 dark:border-emerald-900/60 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold flex items-center gap-1 text-slate-500">
              <Tag className="w-3.5 h-3.5 text-[#C9A227]" />
              <span>Tag:</span>
            </span>
            {article.tags.map((tag, idx) => (
              <span 
                key={idx}
                className="px-2.5 py-1 text-xs rounded-md bg-slate-100 dark:bg-emerald-950 text-slate-700 dark:text-emerald-200 border border-slate-200 dark:border-emerald-900"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Social Share Buttons */}
          <div className="mt-6 p-4 rounded-xl bg-slate-50 dark:bg-emerald-950/60 border border-slate-200 dark:border-emerald-900 flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs font-bold flex items-center gap-1.5 text-[#0B5E3A] dark:text-emerald-400">
              <Share2 className="w-4 h-4" />
              <span>Bagikan Kajian / Warta Ini:</span>
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleShareWA}
                className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium flex items-center gap-1.5 transition cursor-pointer"
              >
                <span>WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={handleShareTG}
                className="px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-700 text-white text-xs font-medium flex items-center gap-1.5 transition cursor-pointer"
              >
                <Send className="w-3 h-3" />
                <span>Telegram</span>
              </button>

              <button
                type="button"
                onClick={handleShareFB}
                className="px-3 py-1.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-xs font-medium flex items-center gap-1.5 transition cursor-pointer"
              >
                <Facebook className="w-3 h-3" />
                <span>Facebook</span>
              </button>

              <button
                type="button"
                onClick={handleCopyLink}
                className="px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-800 text-white text-xs font-medium flex items-center gap-1.5 transition cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Tersalin' : 'Salin Tautan'}</span>
              </button>
            </div>
          </div>

          {/* Related Articles Section */}
          {relatedArticles.length > 0 && (
            <div className="mt-10 pt-6 border-t border-slate-200 dark:border-emerald-900">
              <h3 className="font-serif-heading text-lg font-bold mb-4 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#C9A227]" />
                <span>Artikel Terkait</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedArticles.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => onSelectArticle(rel)}
                    className={`p-3 rounded-lg border transition-all hover:shadow-md cursor-pointer flex flex-col justify-between ${
                      darkMode ? 'bg-[#082a1b] border-emerald-900 hover:border-[#C9A227]' : 'bg-white border-slate-200 hover:border-[#0B5E3A]'
                    }`}
                  >
                    <div>
                      <span className="text-[10px] font-bold uppercase text-[#C9A227]">{rel.categoryLabel}</span>
                      <h4 className="font-serif-heading text-xs font-bold line-clamp-2 mt-1 hover:text-[#0B5E3A]">
                        {rel.title}
                      </h4>
                    </div>
                    <span className="text-[10px] text-slate-500 mt-2 block">{rel.date}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
