import React, { useState } from 'react';
import { Quote, Volume2, VolumeX, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { MAWAIDH_ITEMS } from '../data/mockData';

interface MawaidhSectionProps {
  darkMode: boolean;
}

export const MawaidhSection: React.FC<MawaidhSectionProps> = ({ darkMode }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const current = MAWAIDH_ITEMS[currentIndex];

  const handleToggleAudio = () => {
    setIsPlayingAudio(!isPlayingAudio);
  };

  const handleNext = () => {
    setIsPlayingAudio(false);
    setCurrentIndex((prev) => (prev + 1) % MAWAIDH_ITEMS.length);
  };

  const handlePrev = () => {
    setIsPlayingAudio(false);
    setCurrentIndex((prev) => (prev - 1 + MAWAIDH_ITEMS.length) % MAWAIDH_ITEMS.length);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10" aria-label="Mawaidh Syaikhuna">
      <div className={`relative rounded-2xl overflow-hidden border p-6 sm:p-12 transition-all shadow-md ${
        darkMode 
          ? 'bg-[#052114] border-emerald-900/80 text-white' 
          : 'bg-[#0B5E3A] border-[#08482c] text-white'
      }`}>
        
        {/* Islamic arabesque pattern overlay */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C9A227_1.5px,transparent_1.5px)] [background-size:20px_20px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C9A227]/20 border border-[#C9A227]/50 text-[#C9A227] text-xs font-bold uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Mawaidh & Dawuh Syaikhuna</span>
          </div>

          {/* Large Quote Mark */}
          <Quote className="w-10 h-10 text-[#C9A227]/40 mb-4 rotate-180" />

          {/* Arabic Calligraphic Text */}
          <div className="w-full my-3 px-2 sm:px-6">
            <p 
              className="font-arabic text-2xl sm:text-3xl md:text-4xl text-[#C9A227] font-bold leading-loose sm:leading-loose drop-shadow-xs"
              dir="rtl"
            >
              {current.arabicText}
            </p>
          </div>

          {/* Indonesian Translation */}
          <p className="font-serif-heading text-base sm:text-lg text-emerald-50 max-w-3xl mt-4 leading-relaxed font-normal italic">
            {current.translation}
          </p>

          {/* Speaker & Context Attribution */}
          <div className="mt-6 pt-4 border-t border-white/15 w-full flex flex-col items-center">
            <span className="font-bold text-sm text-[#C9A227] tracking-wide">
              {current.sourceSpeaker}
            </span>
            <span className="text-xs text-emerald-200/80 mt-0.5">
              {current.context}
            </span>
          </div>

          {/* Audio Simulation & Slider Navigation Controls */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={handleToggleAudio}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition border cursor-pointer ${
                isPlayingAudio 
                  ? 'bg-[#C9A227] text-slate-950 border-[#C9A227]' 
                  : 'bg-black/25 hover:bg-black/40 text-emerald-100 border-white/20'
              }`}
            >
              {isPlayingAudio ? (
                <>
                  <Volume2 className="w-4 h-4 animate-bounce" />
                  <span>Memutar Rekaman Dawuh ({current.audioDuration || '02:30'})</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 text-[#C9A227]" />
                  <span>Dengarkan Rekaman Tausiyah</span>
                </>
              )}
            </button>

            {/* Pagination Controls */}
            <div className="flex items-center gap-2 bg-black/30 px-3 py-1.5 rounded-full border border-white/10">
              <button
                type="button"
                onClick={handlePrev}
                className="p-1 text-emerald-200 hover:text-[#C9A227] transition cursor-pointer"
                title="Dawuh Sebelumnya"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <span className="text-[11px] font-mono text-emerald-200 px-1">
                {currentIndex + 1} / {MAWAIDH_ITEMS.length}
              </span>

              <button
                type="button"
                onClick={handleNext}
                className="p-1 text-emerald-200 hover:text-[#C9A227] transition cursor-pointer"
                title="Dawuh Selanjutnya"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
