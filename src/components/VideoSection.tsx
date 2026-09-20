import React, { useState } from 'react';
import { Play, Clock, BookOpen, User, X, ExternalLink } from 'lucide-react';
import { VIDEOS } from '../data/mockData';
import { VideoItem } from '../types';

interface VideoSectionProps {
  darkMode: boolean;
}

export const VideoSection: React.FC<VideoSectionProps> = ({ darkMode }) => {
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10" aria-label="Kanal Video Pengajian">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-amber-900/15">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" />
            <span className="text-xs uppercase font-bold tracking-widest text-[#0B5E3A] dark:text-emerald-400">
              Multimedia Pesantren
            </span>
          </div>
          <h2 className={`font-serif-heading text-2xl sm:text-3xl font-bold mt-1 ${
            darkMode ? 'text-emerald-100' : 'text-slate-900'
          }`}>
            Siaran Pengajian & Dokumenter Kegiatan
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
            Saksikan rekaman pengajian bandongan kitab kuning dan liputan siaran langsung dari Masjid Jami' Sarang.
          </p>
        </div>

        <a
          href="https://youtube.com"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-600 hover:text-red-700 transition"
        >
          <span>Kunjungi Kanal YouTube Resmi</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-6">
        {VIDEOS.map((video) => (
          <div
            key={video.id}
            onClick={() => setActiveVideo(video)}
            className={`group rounded-xl overflow-hidden border transition-all duration-200 hover:-translate-y-1 hover:shadow-md cursor-pointer flex flex-col ${
              darkMode 
                ? 'bg-[#072517] border-emerald-900 hover:border-red-500/50' 
                : 'bg-white border-amber-900/15 hover:border-red-500/50'
            }`}
          >
            {/* Thumbnail with Play Button */}
            <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Play className="w-5 h-5 fill-white ml-0.5" />
                </div>
              </div>

              {/* Duration Badge */}
              <span className="absolute bottom-2 right-2 px-2 py-0.5 text-[10px] font-mono font-semibold rounded bg-black/80 text-white">
                {video.duration}
              </span>
            </div>

            {/* Meta & Title */}
            <div className="p-3.5 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-semibold text-[#0B5E3A] dark:text-[#C9A227] flex items-center gap-1 line-clamp-1 mb-1">
                  <BookOpen className="w-3 h-3 shrink-0" />
                  <span>{video.kitab}</span>
                </span>

                <h3 className={`font-serif-heading text-xs sm:text-sm font-bold leading-snug line-clamp-2 group-hover:text-red-600 transition-colors ${
                  darkMode ? 'text-emerald-100' : 'text-slate-900'
                }`}>
                  {video.title}
                </h3>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-100 dark:border-emerald-900/60 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1 truncate max-w-[150px]">
                  <User className="w-3 h-3 shrink-0" />
                  <span className="truncate">{video.speaker}</span>
                </span>
                <span>{video.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Video Modal Player */}
      {activeVideo && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setActiveVideo(null)}
        >
          <div 
            className="bg-slate-950 rounded-2xl overflow-hidden max-w-3xl w-full border border-white/20 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10 text-white">
              <div className="pr-4">
                <span className="text-xs text-[#C9A227] font-semibold uppercase">{activeVideo.kitab}</span>
                <h4 className="font-serif-heading text-sm sm:text-base font-bold line-clamp-1">{activeVideo.title}</h4>
              </div>
              <button
                type="button"
                onClick={() => setActiveVideo(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Video Player */}
            <div className="aspect-video w-full bg-black relative">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${activeVideo.youtubeId}?autoplay=1`}
                title={activeVideo.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Details Footer */}
            <div className="p-4 text-xs text-slate-300 flex items-center justify-between bg-slate-900">
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4 text-[#C9A227]" />
                <span>Narasumber: {activeVideo.speaker}</span>
              </span>
              <span className="text-slate-400">Durasi: {activeVideo.duration}</span>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
