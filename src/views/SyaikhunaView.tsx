import React, { useState, useEffect } from 'react';
import { User, Sparkles, Heart, Quote, BookOpen, Clock, ChevronRight } from 'lucide-react';
import { SyaikhunaSubPage } from '../types';
import { MAWAIDH_ITEMS } from '../data/mockData';

interface SyaikhunaViewProps {
  initialSubPage?: SyaikhunaSubPage;
  darkMode: boolean;
}

export const SyaikhunaView: React.FC<SyaikhunaViewProps> = ({
  initialSubPage = 'biografi',
  darkMode
}) => {
  const [activeTab, setActiveTab] = useState<SyaikhunaSubPage>(initialSubPage);

  useEffect(() => {
    if (initialSubPage) {
      setActiveTab(initialSubPage);
    }
  }, [initialSubPage]);

  const tabs: { id: SyaikhunaSubPage; label: string; icon: React.ElementType }[] = [
    { id: 'biografi', label: 'Biografi Pengasuh', icon: User },
    { id: 'mawaidh', label: 'Mawaidh & Dawuh Nasihat', icon: Quote },
    { id: 'keluarga', label: 'Dzurriyyah Masayikh', icon: Heart },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <span className="text-xs uppercase font-bold tracking-widest text-[#0B5E3A] dark:text-emerald-400">
          Khadimul Ma'had & Masayikh
        </span>
        <h1 className={`font-serif-heading text-3xl sm:text-4xl font-bold mt-1 ${
          darkMode ? 'text-emerald-100' : 'text-slate-900'
        }`}>
          Syaikhuna wa Murobbi Ruhina
        </h1>
        <p className="font-arabic text-lg text-[#C9A227] mt-1" dir="rtl">
          «الْعُلَمَاءُ وَرَثَةُ الْأَنْبِيَاءِ»
        </p>
        <p className="text-xs sm:text-sm text-slate-500 mt-2">
          Keteladanan hidup, nasab keilmuan, dan untaian mutiara nasehat para masyayikh Sarang Rembang.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-6 border-b border-amber-900/15 scrollbar-none">
        {tabs.map(t => {
          const Icon = t.icon;
          const isActive = activeTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition cursor-pointer ${
                isActive
                  ? 'bg-[#0B5E3A] text-[#C9A227] shadow-md border border-[#C9A227]/40'
                  : darkMode
                    ? 'bg-[#082a1b] text-emerald-200 hover:bg-emerald-900'
                    : 'bg-white text-slate-700 hover:bg-amber-100/50 border border-amber-900/15'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* Content Panels */}
      <div className={`rounded-2xl p-6 sm:p-10 border shadow-xs transition-colors ${
        darkMode ? 'bg-[#062417] border-emerald-900 text-slate-200' : 'bg-white border-amber-900/15 text-slate-800'
      }`}>
        
        {/* 1. Biografi Pengasuh */}
        {activeTab === 'biografi' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              <div className="lg:col-span-4 flex flex-col items-center text-center p-6 rounded-2xl border border-slate-200 dark:border-emerald-900 bg-slate-50 dark:bg-emerald-950/30">
                <div className="w-36 h-36 rounded-full bg-[#0B5E3A] border-4 border-[#C9A227] text-white flex items-center justify-center font-serif text-4xl font-bold shadow-xl mb-4">
                  AF
                </div>
                <h3 className="font-serif-heading font-bold text-lg">Syaikhina KH. Abdullah Faqih</h3>
                <span className="text-xs font-semibold text-[#0B5E3A] dark:text-[#C9A227]">
                  Pengasuh Pondok Pesantren At-Taroqqy Sarang
                </span>
                <span className="text-[11px] text-slate-500 mt-1">
                  Kelahiran Sarang, Rembang
                </span>

                <div className="w-full mt-4 pt-4 border-t border-slate-200 dark:border-emerald-900/60 text-left text-xs space-y-2 text-slate-600 dark:text-slate-300">
                  <div><strong>Mudzakarah Khusus:</strong> Shahih Bukhari & Ihya Ulumiddin</div>
                  <div><strong>Keahlian:</strong> Fiqih Madzhab Syafi'i, Hadits, Tasawuf</div>
                  <div><strong>Sanad Keilmuan:</strong> Silsilah bersambung ke Syaikh Yasin al-Fadani dan Masyayikh Haramain</div>
                </div>
              </div>

              <div className="lg:col-span-8 space-y-4 text-sm leading-relaxed">
                <h2 className="font-serif-heading text-2xl font-bold text-[#0B5E3A] dark:text-emerald-200">
                  Rihlah Thalabul Ilmi & Keteladanan Akhlak
                </h2>

                <p>
                  Syaikhina KH. Abdullah Faqih tumbuh dalam lingkungan pesantren salaf pesisir Sarang yang sarat dengan kultur tirakat. Sejak belia, beliau telah mengkhatamkan matan-matan gramatika Arab dan menghafal Al-Qur'anul Karim di bawah asuhan ayahanda dan para masyayikh sepuh Sarang.
                </p>

                <p>
                  Haus akan kedalaman ilmu syariat membawa beliau bermukim di Tanah Suci Makkah al-Mukarramah selama bertahun-tahun untuk berguru kepada para ulama besar Hijaz, di antaranya Musnidud Dunya Syaikh Muhammad Yasin al-Fadani, Sayyid Muhammad bin Alawi al-Maliki, serta ulama-ulama kibar lainnya.
                </p>

                <h3 className="font-serif-heading text-base font-bold pt-2 text-[#C9A227]">
                  Karakteristik Kepemimpinan & Pengabdian
                </h3>
                <p>
                  Ciri khas kepengasuhan Syaikhina adalah keistiqamahan beliau dalam mengimami shalat berjama'ah dan mengampu pengajian bandongan tanpa pernah libur kecuali saat udzur syar'i. Keramahan dan ketawadhuan beliau kepada para santri dan tamu dari berbagai kalangan menjadi uswah hasanah yang terus hidup di sanubari alumni.
                </p>
              </div>

            </div>
          </div>
        )}

        {/* 2. Mawaidh (Untaian Nasihat) */}
        {activeTab === 'mawaidh' && (
          <div className="space-y-6">
            <div>
              <h2 className="font-serif-heading text-xl sm:text-2xl font-bold">Mawaidh & Dawuh Syaikhina</h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Kumpulan wejangan rohani, fatwa adab, dan petuah kehidupan santri di pondok maupun di tengah masyarakat.
              </p>
            </div>

            <div className="space-y-6">
              {MAWAIDH_ITEMS.map((item, idx) => (
                <div 
                  key={item.id}
                  className={`p-6 rounded-xl border relative overflow-hidden ${
                    darkMode ? 'bg-[#082e1e] border-emerald-800' : 'bg-[#FAF7F0] border-amber-900/20 shadow-xs'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs text-[#C9A227] font-bold mb-3">
                    <span className="uppercase tracking-wider">Dawuh Mutiara #{idx + 1}</span>
                    <span className="text-slate-400 font-normal">Konteks: {item.context}</span>
                  </div>

                  <p className="font-arabic text-2xl sm:text-3xl text-[#0B5E3A] dark:text-[#C9A227] font-bold leading-loose text-right" dir="rtl">
                    {item.arabicText}
                  </p>

                  <p className="font-serif-heading text-sm sm:text-base italic text-slate-700 dark:text-slate-200 mt-4 leading-relaxed">
                    {item.translation}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-200 dark:border-emerald-900 flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#0B5E3A] dark:text-emerald-300">
                      — {item.sourceSpeaker}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. Dzurriyyah Masayikh */}
        {activeTab === 'keluarga' && (
          <div className="space-y-6">
            <div>
              <h2 className="font-serif-heading text-xl sm:text-2xl font-bold">Dzurriyyah Masyayikh Sarang</h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Para putra-putri (Gus dan Ning) yang aktif mengabdi memimpin lembaga dan membina para santri.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 rounded-xl border border-slate-200 dark:border-emerald-900 space-y-2">
                <span className="text-xs font-bold text-[#C9A227] uppercase">Putra Sulung</span>
                <h3 className="font-serif-heading font-bold text-base">Agus H. M. Zainal Muttaqin</h3>
                <p className="text-xs text-slate-500">Direktur Ma'had Aly At-Taroqqy & Pengampu Kajian Ushul Fiqih.</p>
              </div>

              <div className="p-5 rounded-xl border border-slate-200 dark:border-emerald-900 space-y-2">
                <span className="text-xs font-bold text-[#C9A227] uppercase">Putra Kedua</span>
                <h3 className="font-serif-heading font-bold text-base">Agus H. Ahmad Syauqi Faqih</h3>
                <p className="text-xs text-slate-500">Kepala Madrasah Aliyah Salafiyah & Pengasuh Asrama Tahfidz Al-Quran.</p>
              </div>

              <div className="p-5 rounded-xl border border-slate-200 dark:border-emerald-900 space-y-2">
                <span className="text-xs font-bold text-[#C9A227] uppercase">Putri Ketiga</span>
                <h3 className="font-serif-heading font-bold text-base">Ning Hj. Fatimatuz Zahra</h3>
                <p className="text-xs text-slate-500">Wakil Pengasuh Asrama Putri Khadijah & Pembina Kajian Nisaiyat.</p>
              </div>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
