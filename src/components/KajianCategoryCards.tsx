import React from 'react';
import { Scale, BookOpenCheck, Sparkles, HeartHandshake, LibraryBig, ChevronRight } from 'lucide-react';
import { KajianCategory } from '../types';

interface KajianCategoryCardsProps {
  onSelectCategory: (category: KajianCategory) => void;
  darkMode: boolean;
}

export const KajianCategoryCards: React.FC<KajianCategoryCardsProps> = ({
  onSelectCategory,
  darkMode
}) => {
  const cards = [
    {
      id: 'bahtsul-masail' as KajianCategory,
      title: 'Bahtsul Masail',
      arabic: 'بحث المسائل',
      desc: 'Keputusan hukum fiqih waqi\'iyyah dan maudhu\'iyyah musyawarah santri berbasis kitab mu\'tabarah.',
      icon: Scale,
      color: 'emerald',
      badge: 'Fiqih Salaf'
    },
    {
      id: 'durus' as KajianCategory,
      title: 'Durus Kitab Kuning',
      arabic: 'دروس كتب التراث',
      desc: 'Kajian rutin bandongan dan sorogan: Fathul Qorib, Fathul Mu\'in, Ihya Ulumiddin, dan tafsir.',
      icon: BookOpenCheck,
      color: 'amber',
      badge: 'Mudzakarah'
    },
    {
      id: 'hikmah' as KajianCategory,
      title: 'Hikmah & Tasawuf',
      arabic: 'الحكمة والتصوف',
      desc: 'Tazkiyatun nufus, adab thalabul ilmi, dan teladan kemuliaan akhlak salafus shalih.',
      icon: Sparkles,
      color: 'teal',
      badge: 'Penyejuk Hati'
    },
    {
      id: 'nisaiyat' as KajianCategory,
      title: 'Nisaiyat (Keputrian)',
      arabic: 'نسائيات وفقه المرأة',
      desc: 'Kajian khusus fiqih wanita: haid, nifas, istihadhah, hukum rumah tangga, dan adab muslimah.',
      icon: HeartHandshake,
      color: 'rose',
      badge: 'Khusus Muslimah'
    },
    {
      id: 'resensi-kitab' as KajianCategory,
      title: 'Resensi Kitab Turats',
      arabic: 'عرض الكتب والمخطوطات',
      desc: 'Ulasan mendalam mengenai biografi muallif, metodologi pensyarahan, dan sanad kitab klasik.',
      icon: LibraryBig,
      color: 'indigo',
      badge: 'Maktabah'
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10" aria-label="Kategori Kajian Keislaman">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <span className="text-xs uppercase font-bold tracking-widest text-[#0B5E3A] dark:text-emerald-400">
          Khazanah Keilmuan
        </span>
        <h2 className={`font-serif-heading text-2xl sm:text-3xl font-bold mt-1 ${
          darkMode ? 'text-emerald-100' : 'text-slate-900'
        }`}>
          Jelajahi Portal Kajian Pesantren
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Pilih rubrik kajian sesuai topik yang ingin Anda telaah secara ilmiah dan mendalam.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.id}
              onClick={() => onSelectCategory(card.id)}
              className={`group p-5 rounded-xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer flex flex-col justify-between ${
                darkMode 
                  ? 'bg-[#062417] border-emerald-900 hover:border-[#C9A227]' 
                  : 'bg-white border-amber-900/15 hover:border-[#0B5E3A]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-[#0B5E3A]/10 text-[#0B5E3A] dark:bg-emerald-950 dark:text-[#C9A227] flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 dark:bg-emerald-950 text-slate-600 dark:text-emerald-300">
                    {card.badge}
                  </span>
                </div>

                <span className="font-arabic text-sm text-[#C9A227] font-semibold block" dir="rtl">
                  {card.arabic}
                </span>

                <h3 className={`font-serif-heading font-bold text-base mt-1 group-hover:text-[#0B5E3A] dark:group-hover:text-[#C9A227] transition-colors ${
                  darkMode ? 'text-emerald-100' : 'text-slate-900'
                }`}>
                  {card.title}
                </h3>

                <p className={`text-xs mt-2 line-clamp-3 leading-relaxed ${
                  darkMode ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  {card.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-emerald-950 flex items-center justify-between text-xs font-semibold text-[#0B5E3A] dark:text-[#C9A227]">
                <span>Buka Rubrik</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
