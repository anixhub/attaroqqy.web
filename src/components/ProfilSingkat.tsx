import React from 'react';
import { ArrowRight, BookMarked, ShieldCheck, Heart, Users } from 'lucide-react';
import { PESANTREN_INFO } from '../data/mockData';

interface ProfilSingkatProps {
  onLearnMore: () => void;
  darkMode: boolean;
}

export const ProfilSingkat: React.FC<ProfilSingkatProps> = ({ onLearnMore, darkMode }) => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" aria-label="Profil Singkat Pesantren">
      <div className={`rounded-2xl border p-6 sm:p-10 lg:p-12 relative overflow-hidden ${
        darkMode ? 'bg-[#062417] border-emerald-900/80' : 'bg-white border-amber-900/15 shadow-sm'
      }`}>
        
        {/* Subtle background arabesque watermark */}
        <div className="absolute top-0 right-0 w-96 h-96 opacity-5 pointer-events-none">
          <svg viewBox="0 0 200 200" fill="currentColor" className="text-[#0B5E3A]">
            <path d="M100 0 L130 70 L200 100 L130 130 L100 200 L70 130 L0 100 L70 70 Z" />
          </svg>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#C9A227]" />
              <span className="text-xs uppercase font-bold tracking-wider text-[#0B5E3A] dark:text-emerald-400">
                Mengenal Lembaga
              </span>
            </div>

            <h2 className={`font-serif-heading text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight ${
              darkMode ? 'text-emerald-100' : 'text-slate-900'
            }`}>
              Tradisi Salaf Murni di Pesisir Utara Sarang, Menjaga Sanad dan Adab
            </h2>

            <p className="font-arabic text-lg sm:text-xl text-[#0B5E3A] dark:text-[#C9A227] font-semibold" dir="rtl">
              «الْعِلْمُ مَا كَانَ فِيهِ قَالَ حَدَّثَنَا ، وَمَا سِوَى ذَاكَ وَسْوَاسُ الشَّيَاطِينِ»
            </p>

            <p className={`text-sm leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
              <strong>Pondok Pesantren At-Taroqqy Sarang</strong> didirikan sebagai benteng pemeliharaan ajaran Islam <em>Ahlussunnah wal Jama'ah an-Nahdliyyah</em>. Berakar pada metode transmisi keilmuan klasik melalui <strong>Sorogan</strong>, <strong>Bandongan</strong>, dan <strong>Mudzakarah Fiqih</strong>, ribuan santri dari seluruh penjuru nusantara ditempa agar menjadi ulama yang menguasai khazanah kitab kuning (turats) serta berakhlak mulia.
            </p>

            <p className={`text-sm leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
              Kehidupan pesantren menyatu dengan hembusan angin laut pesisir Sarang Rembang yang teduh, melahirkan jiwa kesederhanaan, kemandirian (tirakat), dan tawadhu' di bawah bimbingan para Masyayikh yang tersambung sanadnya kepada Rasulullah ﷺ.
            </p>

            {/* Core Values / Features */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="flex items-start gap-2.5">
                <div className="p-1.5 rounded bg-emerald-100 dark:bg-emerald-950 text-[#0B5E3A] dark:text-emerald-300 mt-0.5">
                  <BookMarked className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold">100% Kitab Turats</h4>
                  <p className="text-[11px] text-slate-500">Kajian murni naskah ulama salaf mu'tabarah</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="p-1.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold">Sanad Keilmuan Mutashil</h4>
                  <p className="text-[11px] text-slate-500">Ijazah musalsal tersambung hingga pengarang kitab</p>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={onLearnMore}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#0B5E3A] hover:bg-[#08452a] text-white text-xs sm:text-sm font-semibold transition shadow-sm border border-[#C9A227]/40 cursor-pointer"
              >
                <span>Pelajari Selengkapnya Tentang Pesantren</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Right Visual / Photographic composition */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md">
              {/* Decorative Frame */}
              <div className="absolute -inset-2 rounded-2xl border-2 border-[#C9A227]/40 -rotate-2 pointer-events-none" />
              <div className="relative rounded-xl overflow-hidden shadow-xl border-4 border-white dark:border-emerald-950 bg-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=80"
                  alt="Suasana Santri Mengaji Kitab Kuning di Sarang"
                  className="w-full h-80 sm:h-96 object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[11px] font-semibold text-[#C9A227] uppercase tracking-wider block">
                    Khidmah & Barakah
                  </span>
                  <p className="text-xs font-medium text-slate-200 mt-0.5">
                    Mudzakarah kitab kuning ba'da shalat shubuh di bawah naungan menara Masjid Pesantren Sarang.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
