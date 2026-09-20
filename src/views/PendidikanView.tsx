import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Clock, 
  GraduationCap, 
  Award, 
  CheckCircle2, 
  Calendar,
  Layers,
  ChevronRight,
  BookMarked
} from 'lucide-react';
import { PendidikanSubPage } from '../types';
import { DAILY_ROUTINE, EDUCATION_LEVELS } from '../data/mockData';

interface PendidikanViewProps {
  initialSubPage?: PendidikanSubPage;
  darkMode: boolean;
}

export const PendidikanView: React.FC<PendidikanViewProps> = ({
  initialSubPage = 'kurikulum',
  darkMode
}) => {
  const [activeTab, setActiveTab] = useState<PendidikanSubPage>(initialSubPage);

  useEffect(() => {
    if (initialSubPage) {
      setActiveTab(initialSubPage);
    }
  }, [initialSubPage]);

  const tabs: { id: PendidikanSubPage; label: string; icon: React.ElementType }[] = [
    { id: 'kurikulum', label: 'Kurikulum Kitab', icon: BookOpen },
    { id: 'rutinitas', label: 'Jadwal Harian 24 Jam', icon: Clock },
    { id: 'ibtidaiyah', label: 'Madrasah Ibtidaiyah', icon: GraduationCap },
    { id: 'tsanawiyah', label: 'Madrasah Tsanawiyah', icon: GraduationCap },
    { id: 'aliyah', label: 'Madrasah Aliyah', icon: GraduationCap },
    { id: 'mahad-aly', label: 'Ma\'had Aly (S1 Fiqih)', icon: Award },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <span className="text-xs uppercase font-bold tracking-widest text-[#0B5E3A] dark:text-emerald-400">
          Sistem Pendidikan Salafiyah
        </span>
        <h1 className={`font-serif-heading text-3xl sm:text-4xl font-bold mt-1 ${
          darkMode ? 'text-emerald-100' : 'text-slate-900'
        }`}>
          Jenjang Madrasah & Kurikulum Turats
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-2">
          Pendidikan berjenjang berbasis kitab mu'tabarah dengan metode pengajaran orisinal ulama salaf.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 border-b border-amber-900/15 scrollbar-none">
        {tabs.map(t => {
          const Icon = t.icon;
          const isActive = activeTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition cursor-pointer ${
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

      {/* Content Container */}
      <div className={`rounded-2xl p-6 sm:p-10 border shadow-xs transition-colors ${
        darkMode ? 'bg-[#062417] border-emerald-900 text-slate-200' : 'bg-white border-amber-900/15 text-slate-800'
      }`}>
        
        {/* 1. Kurikulum Kitab */}
        {activeTab === 'kurikulum' && (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#0B5E3A]/10 text-[#0B5E3A] dark:text-[#C9A227] flex items-center justify-center">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-serif-heading text-xl sm:text-2xl font-bold">Metodologi & Kurikulum Salaf</h2>
                <span className="text-xs text-slate-500">Pilar Transmisi Keilmuan Kitab Kuning</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl border border-slate-200 dark:border-emerald-900 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#C9A227]">1. Sorogan</span>
                <h3 className="font-serif-heading font-bold text-sm">Talaqqi Fardiyyah</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Santri membaca teks kitab Arab gundul secara langsung di hadapan Ustadz. Kesalahan harakat, nahwu, sharaf, dan terjemahan langsung dikoreksi secara teliti.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 dark:border-emerald-900 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#C9A227]">2. Bandongan</span>
                <h3 className="font-serif-heading font-bold text-sm">Majelis Jamaiyyah</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Pengasuh membacakan, menerjemahkan dengan makna pego, dan menguraikan syarah kitab di hadapan ratusan santri yang mencatat secara serentak di naskah masing-masing.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 dark:border-emerald-900 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#C9A227]">3. Lalaran Nadzom</span>
                <h3 className="font-serif-heading font-bold text-sm">Hafalan Berirama</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Pelantunan bait-bait matan ilmiah secara berirama setiap malam (Jurumiyah, Imrithi, Alfiyah, Maqshud) agar kaidah gramatika melekat erat di dalam ingatan.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 dark:border-emerald-900 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#C9A227]">4. Bahtsul Masail</span>
                <h3 className="font-serif-heading font-bold text-sm">Mudzakarah Fiqhiyyah</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Forum musyawarah ilmiah santri tingkat wustho dan ulya untuk mendiskusikan problematika hukum kontemporer dengan mencari ibarat kitab mu'tabarah.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 2. Rutinitas 24 Jam Santri */}
        {activeTab === 'rutinitas' && (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#0B5E3A]/10 text-[#0B5E3A] dark:text-[#C9A227] flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-serif-heading text-xl sm:text-2xl font-bold">Jadwal Rutinitas Santri 24 Jam</h2>
                <span className="text-xs text-slate-500">Irama Kehidupan Tirakat dan Mudzakarah Santri Sarang</span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-emerald-800 bg-[#0B5E3A] text-white">
                    <th className="py-3 px-4 font-bold w-36">Waktu (WIB)</th>
                    <th className="py-3 px-4 font-bold">Kegiatan Santri</th>
                    <th className="py-3 px-4 font-bold w-64">Tempat Pelaksanaan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-emerald-900">
                  {DAILY_ROUTINE.map((item, idx) => (
                    <tr key={idx} className="hover:bg-emerald-50/40 dark:hover:bg-emerald-950/40 transition">
                      <td className="py-2.5 px-4 font-mono font-semibold text-[#0B5E3A] dark:text-[#C9A227]">
                        {item.time}
                      </td>
                      <td className="py-2.5 px-4 font-medium">
                        {item.activity}
                      </td>
                      <td className="py-2.5 px-4 text-slate-500 dark:text-slate-400">
                        {item.location}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 3. Jenjang Ibtidaiyah */}
        {activeTab === 'ibtidaiyah' && (
          <div className="space-y-4">
            <h2 className="font-serif-heading text-2xl font-bold text-[#0B5E3A] dark:text-[#C9A227]">
              Madrasah Ibtidaiyah Salafiyah (MIS)
            </h2>
            <span className="inline-block px-3 py-1 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-semibold">
              Masa Pendidikan: 6 Tahun | Tingkat Dasar
            </span>
            <p className="text-sm leading-relaxed">
              Fokus pada pembentukan pondasi membaca Al-Qur'an dengan tartil, tahsin makharijul huruf, penulisan Arab pegon (makna gandul), dasar nahwu-sharaf, dan aqidah tauhid dasar.
            </p>
            <div className="p-4 rounded-xl border border-slate-200 dark:border-emerald-900 bg-slate-50 dark:bg-emerald-950/20">
              <h4 className="font-bold text-xs uppercase text-[#C9A227] mb-2">Kitab Pegangan Utama:</h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <li>• Matan al-Ajurrumiyyah (Nahwu)</li>
                <li>• Matan al-Bina wal Asas (Sharaf)</li>
                <li>• Safinatun Najah & Mabadi Fiqhiyyah (Fiqih)</li>
                <li>• Aqidatul Awam & Tijan ad-Darari (Tauhid)</li>
                <li>• Taisirul Khalaq & Akhlaq lil Banin (Adab)</li>
                <li>• Hidayatus Shibyan & Tuhfatul Athfal (Tajwid)</li>
              </ul>
            </div>
          </div>
        )}

        {/* 4. Jenjang Tsanawiyah */}
        {activeTab === 'tsanawiyah' && (
          <div className="space-y-4">
            <h2 className="font-serif-heading text-2xl font-bold text-[#0B5E3A] dark:text-[#C9A227]">
              Madrasah Tsanawiyah Salafiyah (MTsS)
            </h2>
            <span className="inline-block px-3 py-1 rounded bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 text-xs font-semibold">
              Masa Pendidikan: 3 Tahun | Tingkat Menengah Pertama
            </span>
            <p className="text-sm leading-relaxed">
              Santri mulai memperdalam tata bahasa Arab tingkat menengah, mengkaji fiqih muamalah dan munakahat, serta melatih nalar logika melalui matan sullamul munawroq.
            </p>
            <div className="p-4 rounded-xl border border-slate-200 dark:border-emerald-900 bg-slate-50 dark:bg-emerald-950/20">
              <h4 className="font-bold text-xs uppercase text-[#C9A227] mb-2">Kitab Pegangan Utama:</h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <li>• Nadzom al-Imrithi & Syarah Kafrawi (Nahwu)</li>
                <li>• Nadzom al-Maqshud & Qawa\'idul I\'lal (Sharaf)</li>
                <li>• Fathul Qorib al-Mujib (Fiqih Ibadah & Muamalah)</li>
                <li>• Jawahirul Kalamiyah & Sanusiyyah (Tauhid)</li>
                <li>• Ta\'limul Muta\'allim Thariqut Ta\'allum (Akhlak)</li>
                <li>• Khulashah Nurul Yaqin Juz 1-3 (Tarikh Nabawi)</li>
              </ul>
            </div>
          </div>
        )}

        {/* 5. Jenjang Aliyah */}
        {activeTab === 'aliyah' && (
          <div className="space-y-4">
            <h2 className="font-serif-heading text-2xl font-bold text-[#0B5E3A] dark:text-[#C9A227]">
              Madrasah Aliyah Salafiyah (MAS)
            </h2>
            <span className="inline-block px-3 py-1 rounded bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 text-xs font-semibold">
              Masa Pendidikan: 3 Tahun | Tingkat Menengah Atas
            </span>
            <p className="text-sm leading-relaxed">
              Puncak pembelajaran gramatika nahwu-sharaf melalui hafalan dan syarah 1.000 bait Alfiyah Ibnu Malik, pendalaman fiqih komprehensif Fathul Wahhab, Ushul Fiqih, dan Balaghah.
            </p>
            <div className="p-4 rounded-xl border border-slate-200 dark:border-emerald-900 bg-slate-50 dark:bg-emerald-950/20">
              <h4 className="font-bold text-xs uppercase text-[#C9A227] mb-2">Kitab Pegangan Utama:</h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <li>• Alfiyah Ibnu Malik & Syarah Ibnu Aqil (1000 Bait)</li>
                <li>• Fathul Wahhab bi Syarhi Minhajit Thullab (Fiqih)</li>
                <li>• Fathul Mu\'in bi Syarhi Qurratil \'Ain (Fiqih Madzhab Syafi\'i)</li>
                <li>• Lathaiful Isyarat & Al-Waraqat (Ushul Fiqh)</li>
                <li>• Al-Jauharul Maknun (Balaghah: Ma\'ani, Bayan, Badi\')</li>
                <li>• Al-Manzhumah al-Baiquniyyah (Musthalahul Hadits)</li>
              </ul>
            </div>
          </div>
        )}

        {/* 6. Ma'had Aly */}
        {activeTab === 'mahad-aly' && (
          <div className="space-y-4">
            <h2 className="font-serif-heading text-2xl font-bold text-[#0B5E3A] dark:text-[#C9A227]">
              Ma'had Aly At-Taroqqy Sarang
            </h2>
            <span className="inline-block px-3 py-1 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300 text-xs font-semibold">
              Jenjang Pendidikan Tinggi Pesantren | Takhassus Fiqh & Ushul Fiqh (Marhalah Ula - Setara S1)
            </span>
            <p className="text-sm leading-relaxed">
              Lembaga pendidikan tinggi khas pesantren salaf yang mencetak kader fuqaha, mutafaqqih fid-din, serta peneliti turats Islam. Mahasantri dilatih menulis risalah ilmiah berbahasa Arab (bahts ilmi) dan memecahkan problematika kemasyarakatan melalui metodologi ushul fiqih dan qawa'id fiqhiyyah.
            </p>
            <div className="p-4 rounded-xl border border-slate-200 dark:border-emerald-900 bg-slate-50 dark:bg-emerald-950/20">
              <h4 className="font-bold text-xs uppercase text-[#C9A227] mb-2">Kurikulum Tingkat Mahasantri:</h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <li>• Jam'ul Jawami' karya Imam Tajuddin As-Subki</li>
                <li>• Al-Asybah wan Nazhair karya Imam As-Suyuthi</li>
                <li>• Al-Majmu' Syarah al-Muhadzdzab karya Imam An-Nawawi</li>
                <li>• Nihayatul Muhtaj karya Imam Ar-Ramli</li>
                <li>• Qawa'idul Ahkam fi Mashalihil Anam (Sultanul Ulama Izzuddin bin Abdis Salam)</li>
                <li>• Metodologi Riset & Tahqiq Manuskrip Naskah Kuno</li>
              </ul>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
