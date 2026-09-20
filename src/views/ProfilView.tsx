import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Target, 
  UserCheck, 
  Users, 
  Trees, 
  ShieldCheck, 
  BookOpen, 
  Compass, 
  Award,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { ProfilSubPage } from '../types';
import { PESANTREN_INFO } from '../data/mockData';

interface ProfilViewProps {
  initialSubPage?: ProfilSubPage;
  darkMode: boolean;
}

export const ProfilView: React.FC<ProfilViewProps> = ({
  initialSubPage = 'sekilas',
  darkMode
}) => {
  const [activeTab, setActiveTab] = useState<ProfilSubPage>(initialSubPage);

  useEffect(() => {
    if (initialSubPage) {
      setActiveTab(initialSubPage);
    }
  }, [initialSubPage]);

  const tabs: { id: ProfilSubPage; label: string; icon: React.ElementType }[] = [
    { id: 'sekilas', label: 'Sekilas Pesantren', icon: Building2 },
    { id: 'visi-misi', label: 'Visi & Misi', icon: Target },
    { id: 'pengasuh', label: 'Majelis Pengasuh', icon: UserCheck },
    { id: 'asatidz-santri', label: 'Asatidz & Santri', icon: Users },
    { id: 'sarana', label: 'Sarana & Prasarana', icon: ShieldCheck },
    { id: 'lingkungan', label: 'Lingkungan Pesisir', icon: Trees },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <span className="text-xs uppercase font-bold tracking-widest text-[#0B5E3A] dark:text-emerald-400">
          Profil Kelembagaan
        </span>
        <h1 className={`font-serif-heading text-3xl sm:text-4xl font-bold mt-1 ${
          darkMode ? 'text-emerald-100' : 'text-slate-900'
        }`}>
          Pondok Pesantren At-Taroqqy Sarang
        </h1>
        <p className="font-arabic text-lg text-[#C9A227] mt-1" dir="rtl">
          معهد الترقي الإسلامي السلفي - سارانج ريمبانج
        </p>
        <p className="text-xs sm:text-sm text-slate-500 mt-2">
          Lembaga pendidikan Islam salafiyah murni yang berdedikasi menjaga sanad keilmuan kitab kuning Ahlussunnah wal Jama'ah di jalur Pantura Sarang.
        </p>
      </div>

      {/* Tabs Row */}
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

      {/* Content Panels */}
      <div className={`rounded-2xl p-6 sm:p-10 border shadow-xs transition-colors ${
        darkMode ? 'bg-[#062417] border-emerald-900 text-slate-200' : 'bg-white border-amber-900/15 text-slate-800'
      }`}>
        
        {/* 1. Sekilas Tentang Pesantren */}
        {activeTab === 'sekilas' && (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#0B5E3A]/10 text-[#0B5E3A] dark:text-[#C9A227] flex items-center justify-center">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-serif-heading text-xl sm:text-2xl font-bold">Sekilas Tentang Pesantren</h2>
                <span className="text-xs text-slate-500">Sejarah, Karakteristik Salafiyah, dan Akar Tradisi di Sarang</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4 text-sm leading-relaxed">
                <p>
                  <strong>Pondok Pesantren At-Taroqqy Sarang</strong> didirikan pada tahun 1958 M (1378 H) di kawasan pesisir Desa Karangmangu, Kecamatan Sarang, Kabupaten Rembang. Sarang sejak lebih dari satu abad silam dikenal sebagai salah satu poros utama keilmuan salaf di tanah Jawa.
                </p>
                <p>
                  Di bawah bimbingan para ulama sepuh, At-Taroqqy mempertahankan sistem pendidikan <em>salafiyah murni</em>. Di sini, kitab-kitab turats warisan para fuqaha dan mutakallimin abad pertengahan dibedah kata demi kata melalui sistem bandongan (kiai membacakan dan mengurai makna), sorogan (santri membaca di depan ustadz), serta mudzakarah atau bahtsul masail malam hari.
                </p>
                <p>
                  Bahasa Arab pego (huruf Arab bertatabahasa Jawa/Indonesia) tetap dipelihara sebagai media transmisi gramatika nahwu-sharaf (tarkib), karena terbukti sangat presisi dalam mengurai kedudukan i'rab dan makna mendalam dari setiap naskah kitab kuning.
                </p>
              </div>

              <div className="lg:col-span-5">
                <div className="rounded-xl overflow-hidden shadow-lg border border-amber-900/20">
                  <img
                    src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80"
                    alt="Tradisi Ngaji Salaf Sarang"
                    className="w-full h-72 object-cover"
                  />
                  <div className="p-3 bg-slate-900 text-white text-xs">
                    Mudzakarah kitab fiqih santri di teras Masjid Utama Sarang
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. Visi & Misi */}
        {activeTab === 'visi-misi' && (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#0B5E3A]/10 text-[#0B5E3A] dark:text-[#C9A227] flex items-center justify-center">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-serif-heading text-xl sm:text-2xl font-bold">Visi & Misi Pesantren</h2>
                <span className="text-xs text-slate-500">Arah Perjuangan dan Orientasi Pendidikan Keagamaan</span>
              </div>
            </div>

            {/* Visi Box */}
            <div className={`p-6 rounded-xl border ${
              darkMode ? 'bg-[#08301f] border-emerald-800' : 'bg-[#FAF7F0] border-[#0B5E3A]/30'
            }`}>
              <span className="text-xs font-bold uppercase tracking-wider text-[#C9A227] block mb-1">
                Visi Utama
              </span>
              <p className="font-serif-heading text-lg sm:text-xl font-bold text-[#0B5E3A] dark:text-emerald-200 leading-snug">
                "Terwujudnya insan mutafaqqih fid-din yang berakhlak mulia, kokoh dalam aqidah Ahlussunnah wal Jama'ah, cakap membaca dan mengamalkan kitab turats, serta berjiwa ikhlas dalam khidmah kemasyarakatan."
              </p>
            </div>

            {/* Misi List */}
            <div>
              <h3 className="font-serif-heading text-base sm:text-lg font-bold mb-3">Misi Pesantren:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="p-4 rounded-xl border border-slate-200 dark:border-emerald-900 space-y-1">
                  <span className="font-bold text-[#0B5E3A] dark:text-[#C9A227]">1. Menjaga Transmisi Sanad</span>
                  <p className="text-slate-600 dark:text-slate-300">Menyelenggarakan pembelajaran kitab turats secara berjenjang dan bersanad muttashil sampai muallif.</p>
                </div>
                <div className="p-4 rounded-xl border border-slate-200 dark:border-emerald-900 space-y-1">
                  <span className="font-bold text-[#0B5E3A] dark:text-[#C9A227]">2. Pembentukan Karakter Tirakat</span>
                  <p className="text-slate-600 dark:text-slate-300">Membiasakan santri hidup qana'ah, disiplin shalat berjamaah, tahajjud, dan menjaga kebersihan sarana umum.</p>
                </div>
                <div className="p-4 rounded-xl border border-slate-200 dark:border-emerald-900 space-y-1">
                  <span className="font-bold text-[#0B5E3A] dark:text-[#C9A227]">3. Penajaman Dialektika Bahtsul Masail</span>
                  <p className="text-slate-600 dark:text-slate-300">Menumbuhkan tradisi musyawarah ilmiah untuk menjawab tantangan problematika umat dengan ibarat kitab mu'tabarah.</p>
                </div>
                <div className="p-4 rounded-xl border border-slate-200 dark:border-emerald-900 space-y-1">
                  <span className="font-bold text-[#0B5E3A] dark:text-[#C9A227]">4. Khidmah Dakwah & Pengabdian</span>
                  <p className="text-slate-600 dark:text-slate-300">Mempersiapkan alumni yang siap terjun ke pelosok nusantara sebagai pembimbing umat dan juru dakwah yang santun.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. Pengasuh */}
        {activeTab === 'pengasuh' && (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#0B5E3A]/10 text-[#0B5E3A] dark:text-[#C9A227] flex items-center justify-center">
                <UserCheck className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-serif-heading text-xl sm:text-2xl font-bold">Majelis Pengasuh (Khadimul Ma'had)</h2>
                <span className="text-xs text-slate-500">Masyayikh Pembimbing Rohani dan Pengampu Ngaji Bandongan</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Kiai 1 */}
              <div className="rounded-xl border border-slate-200 dark:border-emerald-900 overflow-hidden p-5 flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-[#0B5E3A] border-4 border-[#C9A227] text-white flex items-center justify-center font-serif text-2xl font-bold mb-3 shadow-md">
                  AF
                </div>
                <h3 className="font-serif-heading font-bold text-base">KH. Abdullah Faqih Sarang</h3>
                <span className="text-xs font-semibold text-[#0B5E3A] dark:text-[#C9A227]">Khadimul Ma'had / Pengasuh Utama</span>
                <p className="text-xs text-slate-500 mt-2">
                  Pengampu kitab Shahih Bukhari, Ihya Ulumiddin, dan tafsir Jalalain. Murid langsung Masyayikh sepuh Sarang dan Mekkah Al-Mukarramah.
                </p>
              </div>

              {/* Kiai 2 */}
              <div className="rounded-xl border border-slate-200 dark:border-emerald-900 overflow-hidden p-5 flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-slate-800 border-4 border-[#C9A227] text-white flex items-center justify-center font-serif text-2xl font-bold mb-3 shadow-md">
                  SS
                </div>
                <h3 className="font-serif-heading font-bold text-base">KH. M. Syakir Shodiq</h3>
                <span className="text-xs font-semibold text-[#0B5E3A] dark:text-[#C9A227]">Wakil Pengasuh Bidang Ma'hadi</span>
                <p className="text-xs text-slate-500 mt-2">
                  Pengampu Fathul Wahhab dan Fathul Mu'in. Koordinator Lembaga Bahtsul Masail santri Jawa Madura.
                </p>
              </div>

              {/* Nyai 3 */}
              <div className="rounded-xl border border-slate-200 dark:border-emerald-900 overflow-hidden p-5 flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-emerald-900 border-4 border-[#C9A227] text-white flex items-center justify-center font-serif text-2xl font-bold mb-3 shadow-md">
                  MM
                </div>
                <h3 className="font-serif-heading font-bold text-base">Nyai Hj. Masruroh</h3>
                <span className="text-xs font-semibold text-[#0B5E3A] dark:text-[#C9A227]">Pengasuh Asrama Putri Khadijah</span>
                <p className="text-xs text-slate-500 mt-2">
                  Pembimbing kajian keputrian Nisaiyat, kitab Risalatul Mahidh, dan Uqudul Lujjayn bagi ribuan santriwati.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 4. Asatidz & Santri */}
        {activeTab === 'asatidz-santri' && (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#0B5E3A]/10 text-[#0B5E3A] dark:text-[#C9A227] flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-serif-heading text-xl sm:text-2xl font-bold">Asatidz & Santri</h2>
                <span className="text-xs text-slate-500">Keluarga Besar Civitas Akademika Pesantren</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
              <div className="p-4 rounded-xl border border-slate-200 dark:border-emerald-900 bg-slate-50 dark:bg-emerald-950/40">
                <span className="text-2xl font-bold text-[#0B5E3A] dark:text-[#C9A227] font-serif">3.200+</span>
                <span className="block text-xs font-semibold mt-1">Santri Putra (Baniin)</span>
                <span className="text-[11px] text-slate-500">Mukim di 12 Komplek Asrama</span>
              </div>
              <div className="p-4 rounded-xl border border-slate-200 dark:border-emerald-900 bg-slate-50 dark:bg-emerald-950/40">
                <span className="text-2xl font-bold text-[#0B5E3A] dark:text-[#C9A227] font-serif">1.650+</span>
                <span className="block text-xs font-semibold mt-1">Santri Putri (Banaat)</span>
                <span className="text-[11px] text-slate-500">Asrama Putri Khadijah & Aisyah</span>
              </div>
              <div className="p-4 rounded-xl border border-slate-200 dark:border-emerald-900 bg-slate-50 dark:bg-emerald-950/40">
                <span className="text-2xl font-bold text-[#0B5E3A] dark:text-[#C9A227] font-serif">185+</span>
                <span className="block text-xs font-semibold mt-1">Dewan Asatidz & Ustadzah</span>
                <span className="text-[11px] text-slate-500">Alumni Pilihan Sarang & Timur Tengah</span>
              </div>
              <div className="p-4 rounded-xl border border-slate-200 dark:border-emerald-900 bg-slate-50 dark:bg-emerald-950/40">
                <span className="text-2xl font-bold text-[#0B5E3A] dark:text-[#C9A227] font-serif">38</span>
                <span className="block text-xs font-semibold mt-1">Sebaran Provinsi Santri</span>
                <span className="text-[11px] text-slate-500">Dari Aceh sampai Papua</span>
              </div>
            </div>

            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              Pengelolaan kegiatan santri dijalankan secara mandiri melalui <strong>Organisasi Santri At-Taroqqy (OSAT)</strong> yang membawahi bidang keamanan maktab, ketertiban shalat jama'ah, kebersihan lingkungan (ro'an), dapur santri, dan Lembaga Pers Santri.
            </p>
          </div>
        )}

        {/* 5. Sarana & Prasarana */}
        {activeTab === 'sarana' && (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#0B5E3A]/10 text-[#0B5E3A] dark:text-[#C9A227] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-serif-heading text-xl sm:text-2xl font-bold">Sarana dan Prasarana</h2>
                <span className="text-xs text-slate-500">Fasilitas Penunjang Ibadah dan Ta'allum Santri</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs sm:text-sm">
              <div className="p-4 rounded-xl border border-slate-200 dark:border-emerald-900">
                <h4 className="font-bold text-[#0B5E3A] dark:text-[#C9A227]">Masjid Jami' Pesantren</h4>
                <p className="text-slate-500 mt-1">Pusat shalat fardhu berjamaah 5 waktu dan majelis bandongan akbar kitab kuning.</p>
              </div>
              <div className="p-4 rounded-xl border border-slate-200 dark:border-emerald-900">
                <h4 className="font-bold text-[#0B5E3A] dark:text-[#C9A227]">Gedung Madrasah Diniyah</h4>
                <p className="text-slate-500 mt-1">42 ruang kelas bertingkat untuk kegiatan KBM pagi MIS, MTsS, MAS, dan Ma'had Aly.</p>
              </div>
              <div className="p-4 rounded-xl border border-slate-200 dark:border-emerald-900">
                <h4 className="font-bold text-[#0B5E3A] dark:text-[#C9A227]">Maktabah Turats (Perpustakaan)</h4>
                <p className="text-slate-500 mt-1">Koleksi lebih dari 7.000 jilid kitab kuning rujukan fiqih, tafsir, hadits, dan manuskrip kuno.</p>
              </div>
              <div className="p-4 rounded-xl border border-slate-200 dark:border-emerald-900">
                <h4 className="font-bold text-[#0B5E3A] dark:text-[#C9A227]">Aula Syurafa & Bilik Musyawarah</h4>
                <p className="text-slate-500 mt-1">Tempat perhelatan Bahtsul Masail Kubro, seminar keagamaan, dan lalaran nadzom bersama.</p>
              </div>
              <div className="p-4 rounded-xl border border-slate-200 dark:border-emerald-900">
                <h4 className="font-bold text-[#0B5E3A] dark:text-[#C9A227]">Poskestren (Pos Kesehatan Santri)</h4>
                <p className="text-slate-500 mt-1">Layanan pertolongan medis pertama bekerja sama dengan Puskesmas dan RSUD setempat.</p>
              </div>
              <div className="p-4 rounded-xl border border-slate-200 dark:border-emerald-900">
                <h4 className="font-bold text-[#0B5E3A] dark:text-[#C9A227]">Dapur Santri Higienis & Koperasi</h4>
                <p className="text-slate-500 mt-1">Penyediaan makan santri 3 kali sehari serta kebutuhan kitab, sarung, dan perlengkapan mondok.</p>
              </div>
            </div>
          </div>
        )}

        {/* 6. Lingkungan Pesisir Sarang */}
        {activeTab === 'lingkungan' && (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#0B5E3A]/10 text-[#0B5E3A] dark:text-[#C9A227] flex items-center justify-center">
                <Trees className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-serif-heading text-xl sm:text-2xl font-bold">Lingkungan Pesantren & Masyarakat Pesisir</h2>
                <span className="text-xs text-slate-500">Harmonisasi Kehidupan Santri dengan Warga Nelayan Pantura</span>
              </div>
            </div>

            <p className="text-sm leading-relaxed">
              Pesantren Sarang memiliki keunikan geografis dan sosiologis yang sangat khas. Berada tepat di pesisir Laut Jawa, deburan ombak dan desau angin laut menjadi saksi bisu ribuan santri melantunkan bait-bait Alfiyah dan ayat-ayat suci Al-Qur'an setiap malam.
            </p>

            <p className="text-sm leading-relaxed">
              Hubungan santri dengan masyarakat nelayan Sarang terjalin amat erat. Santri terbiasa berbaur, menggelar shalat ghaib saat ada pelaut tertimpa musibah, mengadakan ro'an membersihkan pantai, serta menghidupkan majelis dzikir manaqib di kampung-kampung pesisir.
            </p>
          </div>
        )}

      </div>

    </div>
  );
};
