import React, { useState, useEffect } from 'react';
import { Megaphone, ChevronRight, Pause, Play } from 'lucide-react';
import { ANNOUNCEMENTS } from '../data/mockData';

interface TickerProps {
  darkMode: boolean;
}

export const Ticker: React.FC<TickerProps> = ({ darkMode }) => {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
      <div className={`flex items-center rounded-lg border text-xs overflow-hidden shadow-2xs ${
        darkMode ? 'bg-[#082b1c] border-emerald-900 text-emerald-100' : 'bg-white border-amber-900/15 text-slate-700'
      }`}>
        
        {/* Left Badge */}
        <div className="flex items-center gap-1.5 px-3 py-2 bg-[#0B5E3A] text-[#C9A227] font-bold shrink-0 tracking-wide uppercase text-[11px]">
          <Megaphone className="w-3.5 h-3.5 animate-pulse" />
          <span className="hidden sm:inline">Warta Pengumuman</span>
          <span className="sm:hidden">Warta</span>
        </div>

        {/* Text area */}
        <div 
          className="flex-1 px-3 py-2 overflow-hidden truncate cursor-pointer"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <span className="font-medium text-[#C9A227] mr-2">[{index + 1}/{ANNOUNCEMENTS.length}]</span>
          <span className="hover:underline transition-all">{ANNOUNCEMENTS[index]}</span>
        </div>

        {/* Controls */}
        <div className="flex items-center px-2 shrink-0 gap-1 border-l border-emerald-900/20">
          <button
            type="button"
            onClick={() => setIsPaused(!isPaused)}
            className="p-1 text-slate-500 hover:text-[#0B5E3A] transition cursor-pointer"
            title={isPaused ? 'Lanjutkan Ticker' : 'Jeda Ticker'}
          >
            {isPaused ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
          </button>
          <button
            type="button"
            onClick={() => setIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length)}
            className="p-1 text-slate-500 hover:text-[#0B5E3A] transition cursor-pointer"
            title="Pengumuman Berikutnya"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
