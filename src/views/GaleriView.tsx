import React, { useState } from 'react';
import { Image as ImageIcon, Video, X, Calendar, Eye, Play } from 'lucide-react';
import { GALLERY_ITEMS, VIDEOS } from '../data/mockData';
import { GalleryItem, VideoItem } from '../types';

interface GaleriViewProps {
  darkMode: boolean;
}

export const GaleriView: React.FC<GaleriViewProps> = ({ darkMode }) => {
  const [activeTab, setActiveTab] = useState<'foto' | 'video'>('foto');
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('Semua');

  const photoCategories = ['Semua', 'Ngaji', 'Haflah', 'Roan', 'Kegiatan', 'Fasilitas'];

  const filteredPhotos = filterCategory === 'Semua'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(g => g.category === filterCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <span className="text-xs uppercase font-bold tracking-widest text-[#0B5E3A] dark:text-emerald-400">
          Dokumentasi Visual
        </span>
        <h1 className={`font-serif-heading text-3xl sm:text-4xl font-bold mt-1 ${
          darkMode ? 'text-emerald-100' : 'text-slate-900'
        }`}>
          Galeri Kegiatan & Pengajian Santri
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-2">
          Potret khidmah, kesederhanaan tirakat, dan kebersamaan santri di pesisir Sarang Rembang.
        </p>
      </div>

      {/* Main Tab Switch: Foto vs Video */}
      <div className="flex justify-center mb-6">
        <div className="inline-flex p-1 rounded-xl bg-slate-200 dark:bg-emerald-950 border border-slate-300 dark:border-emerald-900 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('foto')}
            className={`flex items-center gap-1.5 px-5 py-2 rounded-lg transition cursor-pointer ${
              activeTab === 'foto'
                ? 'bg-[#0B5E3A] text-[#C9A227] shadow-sm'
                : 'text-slate-600 dark:text-emerald-300 hover:text-slate-900'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Koleksi Foto Kegiatan</span>
          </button>

          <button
            onClick={() => setActiveTab('video')}
            className={`flex items-center gap-1.5 px-5 py-2 rounded-lg transition cursor-pointer ${
              activeTab === 'video'
                ? 'bg-[#0B5E3A] text-[#C9A227] shadow-sm'
                : 'text-slate-600 dark:text-emerald-300 hover:text-slate-900'
            }`}
          >
            <Video className="w-4 h-4" />
            <span>Rekaman Video Pengajian</span>
          </button>
        </div>
      </div>

      {/* Photo Category Sub-filter */}
      {activeTab === 'foto' && (
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
          {photoCategories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition cursor-pointer ${
                filterCategory === cat
                  ? 'bg-[#C9A227] text-slate-950 font-bold shadow-2xs'
                  : darkMode
                    ? 'bg-emerald-950 text-emerald-200 hover:bg-emerald-900'
                    : 'bg-white text-slate-700 hover:bg-amber-100/50 border border-amber-900/15'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Foto Grid */}
      {activeTab === 'foto' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              className={`group rounded-2xl overflow-hidden border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer flex flex-col ${
                darkMode ? 'bg-[#072416] border-emerald-900' : 'bg-white border-amber-900/15'
              }`}
            >
              <div className="relative h-56 w-full overflow-hidden bg-slate-900">
                <img
                  src={photo.imageUrl}
                  alt={photo.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-3 py-1.5 rounded-full bg-black/60 text-white text-xs font-semibold backdrop-blur-xs flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-[#C9A227]" />
                    <span>Perbesar Foto</span>
                  </span>
                </div>
                <span className="absolute top-3 left-3 px-2.5 py-0.5 text-[10px] font-bold uppercase rounded bg-[#0B5E3A] text-[#C9A227]">
                  {photo.category}
                </span>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className={`font-serif-heading font-bold text-sm leading-snug line-clamp-2 ${
                    darkMode ? 'text-emerald-100' : 'text-slate-900'
                  }`}>
                    {photo.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                    {photo.caption}
                  </p>
                </div>
                <span className="text-[11px] text-slate-400 mt-3 pt-2 border-t border-slate-100 dark:border-emerald-950 flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-[#C9A227]" />
                  <span>{photo.date}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Video Grid */}
      {activeTab === 'video' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {VIDEOS.map((vid) => (
            <div
              key={vid.id}
              onClick={() => setSelectedVideo(vid)}
              className={`group rounded-2xl overflow-hidden border transition-all duration-200 hover:-translate-y-1 hover:shadow-md cursor-pointer flex flex-col ${
                darkMode ? 'bg-[#072416] border-emerald-900' : 'bg-white border-amber-900/15'
              }`}
            >
              <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
                <img
                  src={vid.thumbnail}
                  alt={vid.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 fill-white ml-0.5" />
                  </div>
                </div>
                <span className="absolute bottom-2 right-2 px-2 py-0.5 text-[10px] font-mono rounded bg-black/80 text-white">
                  {vid.duration}
                </span>
              </div>

              <div className="p-3.5 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-semibold text-[#0B5E3A] dark:text-[#C9A227] line-clamp-1">
                    {vid.kitab}
                  </span>
                  <h3 className={`font-serif-heading text-xs sm:text-sm font-bold leading-snug line-clamp-2 mt-1 ${
                    darkMode ? 'text-emerald-100' : 'text-slate-900'
                  }`}>
                    {vid.title}
                  </h3>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-100 dark:border-emerald-950 text-[11px] text-slate-400 flex items-center justify-between">
                  <span className="truncate">{vid.speaker}</span>
                  <span>{vid.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Photo Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="max-w-3xl w-full bg-slate-950 rounded-2xl overflow-hidden border border-white/20 shadow-2xl text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img
                src={selectedPhoto.imageUrl}
                alt={selectedPhoto.title}
                className="w-full max-h-[70vh] object-contain bg-black"
              />
              <button
                type="button"
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-3 right-3 p-2 rounded-full bg-black/60 hover:bg-red-600 text-white transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 bg-slate-900">
              <span className="text-xs font-bold uppercase text-[#C9A227] tracking-wider">{selectedPhoto.category}</span>
              <h3 className="font-serif-heading font-bold text-base sm:text-lg mt-0.5">{selectedPhoto.title}</h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">{selectedPhoto.caption}</p>
              <span className="text-[11px] text-slate-500 block mt-2">{selectedPhoto.date}</span>
            </div>
          </div>
        </div>
      )}

      {/* Video Lightbox Modal */}
      {selectedVideo && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <div
            className="max-w-3xl w-full bg-slate-950 rounded-2xl overflow-hidden border border-white/20 shadow-2xl text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <div>
                <span className="text-xs text-[#C9A227] font-semibold">{selectedVideo.kitab}</span>
                <h4 className="font-serif-heading text-sm sm:text-base font-bold line-clamp-1">{selectedVideo.title}</h4>
              </div>
              <button
                type="button"
                onClick={() => setSelectedVideo(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white transition cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="aspect-video w-full bg-black">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${selectedVideo.youtubeId}?autoplay=1`}
                title={selectedVideo.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="p-4 text-xs text-slate-300 bg-slate-900 flex items-center justify-between">
              <span>Narasumber: {selectedVideo.speaker}</span>
              <span>Durasi: {selectedVideo.duration}</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
