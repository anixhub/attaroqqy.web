import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Clock, Tag } from 'lucide-react';
import { Article } from '../types';

interface HeroSliderProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
  darkMode: boolean;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({
  articles,
  onSelectArticle,
  darkMode
}) => {
  const featuredArticles = articles.filter(a => a.featured).slice(0, 5);
  const items = featuredArticles.length > 0 ? featuredArticles : articles.slice(0, 5);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused || items.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused, items.length]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  if (items.length === 0) return null;

  const current = items[currentIndex];

  return (
    <section 
      aria-label="Sorotan Berita Utama"
      className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative rounded-2xl overflow-hidden shadow-2xl h-[360px] sm:h-[460px] md:h-[520px] bg-slate-900 border border-amber-900/20">
        
        {/* Background Image with Rich Overlay */}
        <img
          src={current.thumbnail}
          alt={current.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out transform scale-105"
          loading="lazy"
        />

        {/* Gradient Overlays: Dark emerald & black overlay for pristine text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B5E3A]/80 via-transparent to-transparent" />

        {/* Floating Category Badge & Meta */}
        <div className="absolute top-5 left-5 sm:top-8 sm:left-8 flex items-center gap-2">
          <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-md bg-[#C9A227] text-slate-950 shadow-md">
            {current.categoryLabel}
          </span>
          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-md bg-black/40 text-emerald-100 backdrop-blur-xs border border-white/10">
            <Calendar className="w-3.5 h-3.5 text-[#C9A227]" />
            <span>{current.date}</span>
          </span>
        </div>

        {/* Slide Content at Bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8 md:p-12 text-white max-w-4xl">
          <div className="flex items-center gap-3 text-xs text-amber-200/90 mb-2 sm:mb-3">
            <span className="font-semibold">{current.author}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-[#C9A227]" />
              <span>{current.readTime}</span>
            </span>
          </div>

          <h2 
            onClick={() => onSelectArticle(current)}
            className="font-serif-heading text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight hover:text-[#C9A227] transition-colors cursor-pointer drop-shadow-md line-clamp-3"
          >
            {current.title}
          </h2>

          <p className="mt-2 text-slate-200 text-xs sm:text-sm line-clamp-2 sm:line-clamp-2 max-w-2xl font-light">
            {current.summary}
          </p>

          <div className="mt-4 flex items-center gap-3">
            <button
              type="button"
              onClick={() => onSelectArticle(current)}
              className="px-4 py-2 rounded-md bg-[#0B5E3A] hover:bg-[#08482c] text-white text-xs sm:text-sm font-semibold transition shadow-md border border-[#C9A227]/40 cursor-pointer flex items-center gap-1.5"
            >
              <span>Baca Selengkapnya</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Prev / Next Arrows */}
        <button
          type="button"
          onClick={prevSlide}
          className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 hover:bg-[#0B5E3A] text-white backdrop-blur-xs transition border border-white/10 cursor-pointer"
          aria-label="Berita Sebelumnya"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={nextSlide}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 hover:bg-[#0B5E3A] text-white backdrop-blur-xs transition border border-white/10 cursor-pointer"
          aria-label="Berita Selanjutnya"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Indicator Dots */}
        <div className="absolute bottom-4 right-5 sm:bottom-8 sm:right-8 flex items-center gap-1.5 z-10">
          {items.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                idx === currentIndex ? 'w-7 bg-[#C9A227]' : 'w-2 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Pindah ke slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
