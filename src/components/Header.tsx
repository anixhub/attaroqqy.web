import React, { useState, useRef, useEffect } from 'react';
import { 
  Menu, 
  X, 
  ChevronDown, 
  Search, 
  BookOpen, 
  GraduationCap, 
  ShieldCheck, 
  FileText, 
  Image as ImageIcon, 
  PhoneCall, 
  Home, 
  HeartHandshake,
  Sparkles
} from 'lucide-react';
import { ActivePage, ProfilSubPage, PendidikanSubPage, SyaikhunaSubPage, KajianCategory } from '../types';

interface HeaderProps {
  activePage: ActivePage;
  onNavigate: (page: ActivePage, subPage?: string) => void;
  onOpenSearch: () => void;
  darkMode: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  activePage,
  onNavigate,
  onOpenSearch,
  darkMode
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileSubMenu, setMobileSubMenu] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (page: ActivePage, subPage?: string) => {
    onNavigate(page, subPage);
    setOpenDropdown(null);
    setMobileMenuOpen(false);
    setMobileSubMenu(null);
  };

  return (
    <header className={`sticky top-0 z-40 transition-colors shadow-md ${
      darkMode ? 'bg-[#062919]/95 backdrop-blur-md border-b border-emerald-900' : 'bg-[#FAF7F0]/95 backdrop-blur-md border-b border-amber-900/15'
    }`}>
      {/* Main Institution Branding Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center justify-between">
          
          {/* Logo & Title */}
          <div 
            onClick={() => handleNavClick('beranda')}
            className="flex items-center gap-3.5 cursor-pointer group"
          >
            {/* Authentic Islamic Seal Emblem */}
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#0B5E3A] border-2 border-[#C9A227] flex items-center justify-center text-[#C9A227] shadow-sm transform group-hover:rotate-6 transition-transform">
              <div className="absolute inset-1 rounded-full border border-dashed border-[#C9A227]/50" />
              {/* Star and Crescent with Minaret Icon */}
              <div className="flex flex-col items-center">
                <span className="font-arabic text-sm font-bold leading-none select-none">الترقي</span>
                <span className="text-[9px] font-serif uppercase tracking-widest text-amber-200 mt-0.5">Sarang</span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className={`font-serif-heading text-lg sm:text-xl font-bold tracking-tight leading-snug ${
                  darkMode ? 'text-emerald-100' : 'text-[#0B5E3A]'
                }`}>
                  PONDOK PESANTREN AT-TAROQQY
                </h1>
                <span className="hidden lg:inline-block px-2 py-0.5 text-[10px] uppercase font-semibold tracking-wider rounded bg-[#C9A227]/20 text-[#0B5E3A] border border-[#C9A227]/40">
                  Salafiyah
                </span>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-arabic text-xs sm:text-sm text-[#C9A227] font-semibold" dir="rtl">
                  معهد الترقي الإسلامي السلفي - سارانج ، ريمبانج
                </span>
                <span className={`text-[11px] hidden md:inline-block ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  | Sarang, Rembang, Jawa Tengah
                </span>
              </div>
            </div>
          </div>

          {/* Search Button & Mobile Toggle */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onOpenSearch}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition cursor-pointer ${
                darkMode 
                  ? 'bg-emerald-950/60 text-emerald-200 border-emerald-800 hover:bg-emerald-900' 
                  : 'bg-white/80 text-slate-700 border-amber-900/20 hover:bg-white shadow-2xs hover:border-[#0B5E3A]'
              }`}
              title="Cari artikel, kitab, atau kajian"
            >
              <Search className="w-3.5 h-3.5 text-[#0B5E3A]" />
              <span className="hidden sm:inline">Cari Kajian / Berita...</span>
              <kbd className="hidden lg:inline-block text-[10px] bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 rounded text-slate-500">⌘K</kbd>
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg lg:hidden transition ${
                darkMode ? 'text-emerald-100 hover:bg-emerald-900' : 'text-[#0B5E3A] hover:bg-amber-100/50'
              }`}
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Sticky Navigation Bar */}
      <nav 
        ref={dropdownRef}
        className={`hidden lg:block border-t ${
          darkMode ? 'bg-[#041c11] border-emerald-900/80' : 'bg-[#0B5E3A] border-[#084a2e]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex items-center justify-between text-[13px] font-medium text-emerald-50">
            
            {/* 1. Beranda */}
            <li>
              <button
                type="button"
                onClick={() => handleNavClick('beranda')}
                className={`py-3 px-3 flex items-center gap-1.5 transition-colors border-b-2 cursor-pointer ${
                  activePage === 'beranda'
                    ? 'text-[#C9A227] border-[#C9A227] font-semibold'
                    : 'border-transparent hover:text-[#C9A227] hover:border-[#C9A227]/50'
                }`}
              >
                <Home className="w-3.5 h-3.5" />
                <span>Beranda</span>
              </button>
            </li>

            {/* 2. Profil (Dropdown) */}
            <li className="relative group">
              <button
                type="button"
                onClick={() => setOpenDropdown(openDropdown === 'profil' ? null : 'profil')}
                className={`py-3 px-3 flex items-center gap-1 transition-colors border-b-2 cursor-pointer ${
                  activePage === 'profil'
                    ? 'text-[#C9A227] border-[#C9A227] font-semibold'
                    : 'border-transparent hover:text-[#C9A227] hover:border-[#C9A227]/50'
                }`}
              >
                <span>Profil</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-80" />
              </button>

              {openDropdown === 'profil' && (
                <div className={`absolute top-full left-0 w-60 py-2 rounded-b-md shadow-xl border border-amber-900/10 z-50 animate-in fade-in slide-in-from-top-1 duration-150 ${
                  darkMode ? 'bg-[#083521] text-emerald-100' : 'bg-white text-slate-800'
                }`}>
                  <button onClick={() => handleNavClick('profil', 'sekilas')} className="w-full text-left px-4 py-2 hover:bg-[#0B5E3A]/10 hover:text-[#0B5E3A] text-xs flex items-center justify-between">
                    <span>Sekilas Tentang Pesantren</span>
                  </button>
                  <button onClick={() => handleNavClick('profil', 'visi-misi')} className="w-full text-left px-4 py-2 hover:bg-[#0B5E3A]/10 hover:text-[#0B5E3A] text-xs flex items-center justify-between">
                    <span>Visi & Misi</span>
                  </button>
                  <button onClick={() => handleNavClick('profil', 'pengasuh')} className="w-full text-left px-4 py-2 hover:bg-[#0B5E3A]/10 hover:text-[#0B5E3A] text-xs flex items-center justify-between">
                    <span>Pengasuh (Majlis Kiai)</span>
                  </button>
                  <button onClick={() => handleNavClick('profil', 'asatidz-santri')} className="w-full text-left px-4 py-2 hover:bg-[#0B5E3A]/10 hover:text-[#0B5E3A] text-xs flex items-center justify-between">
                    <span>Asatidz & Santri</span>
                  </button>
                  <button onClick={() => handleNavClick('profil', 'sarana')} className="w-full text-left px-4 py-2 hover:bg-[#0B5E3A]/10 hover:text-[#0B5E3A] text-xs flex items-center justify-between">
                    <span>Sarana dan Prasarana</span>
                  </button>
                  <button onClick={() => handleNavClick('profil', 'lingkungan')} className="w-full text-left px-4 py-2 hover:bg-[#0B5E3A]/10 hover:text-[#0B5E3A] text-xs flex items-center justify-between">
                    <span>Lingkungan Pesisir Sarang</span>
                  </button>
                </div>
              )}
            </li>

            {/* 3. Pendidikan (Dropdown) */}
            <li className="relative group">
              <button
                type="button"
                onClick={() => setOpenDropdown(openDropdown === 'pendidikan' ? null : 'pendidikan')}
                className={`py-3 px-3 flex items-center gap-1 transition-colors border-b-2 cursor-pointer ${
                  activePage === 'pendidikan'
                    ? 'text-[#C9A227] border-[#C9A227] font-semibold'
                    : 'border-transparent hover:text-[#C9A227] hover:border-[#C9A227]/50'
                }`}
              >
                <span>Pendidikan</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-80" />
              </button>

              {openDropdown === 'pendidikan' && (
                <div className={`absolute top-full left-0 w-64 py-2 rounded-b-md shadow-xl border border-amber-900/10 z-50 animate-in fade-in slide-in-from-top-1 duration-150 ${
                  darkMode ? 'bg-[#083521] text-emerald-100' : 'bg-white text-slate-800'
                }`}>
                  <button onClick={() => handleNavClick('pendidikan', 'kurikulum')} className="w-full text-left px-4 py-2 hover:bg-[#0B5E3A]/10 hover:text-[#0B5E3A] text-xs">
                    Kurikulum Kitab Kuning
                  </button>
                  <button onClick={() => handleNavClick('pendidikan', 'rutinitas')} className="w-full text-left px-4 py-2 hover:bg-[#0B5E3A]/10 hover:text-[#0B5E3A] text-xs">
                    Rutinitas & Jadwal Harian
                  </button>
                  <div className="my-1 border-t border-slate-100 dark:border-emerald-900" />
                  <div className="px-4 py-1 text-[11px] font-semibold text-[#C9A227] uppercase tracking-wider">Jenjang Pendidikan</div>
                  <button onClick={() => handleNavClick('pendidikan', 'ibtidaiyah')} className="w-full text-left px-4 py-1.5 hover:bg-[#0B5E3A]/10 hover:text-[#0B5E3A] text-xs">
                    Madrasah Ibtidaiyah (MIS)
                  </button>
                  <button onClick={() => handleNavClick('pendidikan', 'tsanawiyah')} className="w-full text-left px-4 py-1.5 hover:bg-[#0B5E3A]/10 hover:text-[#0B5E3A] text-xs">
                    Madrasah Tsanawiyah (MTsS)
                  </button>
                  <button onClick={() => handleNavClick('pendidikan', 'aliyah')} className="w-full text-left px-4 py-1.5 hover:bg-[#0B5E3A]/10 hover:text-[#0B5E3A] text-xs">
                    Madrasah Aliyah (MAS)
                  </button>
                  <button onClick={() => handleNavClick('pendidikan', 'mahad-aly')} className="w-full text-left px-4 py-1.5 hover:bg-[#0B5E3A]/10 hover:text-[#0B5E3A] text-xs">
                    Ma'had Aly (S1 Takhassus Fiqh)
                  </button>
                </div>
              )}
            </li>

            {/* 4. Syaikhuna (Dropdown) */}
            <li className="relative group">
              <button
                type="button"
                onClick={() => setOpenDropdown(openDropdown === 'syaikhuna' ? null : 'syaikhuna')}
                className={`py-3 px-3 flex items-center gap-1 transition-colors border-b-2 cursor-pointer ${
                  activePage === 'syaikhuna'
                    ? 'text-[#C9A227] border-[#C9A227] font-semibold'
                    : 'border-transparent hover:text-[#C9A227] hover:border-[#C9A227]/50'
                }`}
              >
                <span>Syaikhuna</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-80" />
              </button>

              {openDropdown === 'syaikhuna' && (
                <div className={`absolute top-full left-0 w-56 py-2 rounded-b-md shadow-xl border border-amber-900/10 z-50 animate-in fade-in slide-in-from-top-1 duration-150 ${
                  darkMode ? 'bg-[#083521] text-emerald-100' : 'bg-white text-slate-800'
                }`}>
                  <button onClick={() => handleNavClick('syaikhuna', 'biografi')} className="w-full text-left px-4 py-2 hover:bg-[#0B5E3A]/10 hover:text-[#0B5E3A] text-xs">
                    Biografi Syaikhina
                  </button>
                  <button onClick={() => handleNavClick('syaikhuna', 'mawaidh')} className="w-full text-left px-4 py-2 hover:bg-[#0B5E3A]/10 hover:text-[#0B5E3A] text-xs">
                    Mawaidh (Untaian Nasihat)
                  </button>
                  <button onClick={() => handleNavClick('syaikhuna', 'keluarga')} className="w-full text-left px-4 py-2 hover:bg-[#0B5E3A]/10 hover:text-[#0B5E3A] text-xs">
                    Dzurriyyah Masayikh
                  </button>
                </div>
              )}
            </li>

            {/* 5. Kajian (Dropdown) */}
            <li className="relative group">
              <button
                type="button"
                onClick={() => setOpenDropdown(openDropdown === 'kajian' ? null : 'kajian')}
                className={`py-3 px-3 flex items-center gap-1 transition-colors border-b-2 cursor-pointer ${
                  activePage === 'kajian'
                    ? 'text-[#C9A227] border-[#C9A227] font-semibold'
                    : 'border-transparent hover:text-[#C9A227] hover:border-[#C9A227]/50'
                }`}
              >
                <span>Kajian</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-80" />
              </button>

              {openDropdown === 'kajian' && (
                <div className={`absolute top-full left-0 w-60 py-2 rounded-b-md shadow-xl border border-amber-900/10 z-50 animate-in fade-in slide-in-from-top-1 duration-150 ${
                  darkMode ? 'bg-[#083521] text-emerald-100' : 'bg-white text-slate-800'
                }`}>
                  <button onClick={() => handleNavClick('kajian', 'bahtsul-masail')} className="w-full text-left px-4 py-2 hover:bg-[#0B5E3A]/10 hover:text-[#0B5E3A] text-xs flex items-center justify-between">
                    <span>Bahtsul Masail</span>
                    <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 px-1.5 py-0.5 rounded font-mono">Fiqih</span>
                  </button>
                  <button onClick={() => handleNavClick('kajian', 'durus')} className="w-full text-left px-4 py-2 hover:bg-[#0B5E3A]/10 hover:text-[#0B5E3A] text-xs">
                    Durus (Ngaji Kitab Kuning)
                  </button>
                  <button onClick={() => handleNavClick('kajian', 'hikmah')} className="w-full text-left px-4 py-2 hover:bg-[#0B5E3A]/10 hover:text-[#0B5E3A] text-xs">
                    Hikmah & Tasawuf
                  </button>
                  <button onClick={() => handleNavClick('kajian', 'nisaiyat')} className="w-full text-left px-4 py-2 hover:bg-[#0B5E3A]/10 hover:text-[#0B5E3A] text-xs flex items-center justify-between">
                    <span>Nisaiyat (Kajian Keputrian)</span>
                    <span className="text-[10px] bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 px-1.5 py-0.5 rounded">Khusus</span>
                  </button>
                  <button onClick={() => handleNavClick('kajian', 'resensi-kitab')} className="w-full text-left px-4 py-2 hover:bg-[#0B5E3A]/10 hover:text-[#0B5E3A] text-xs">
                    Resensi Kitab Turats
                  </button>
                </div>
              )}
            </li>

            {/* 6. Artikel / Berita */}
            <li>
              <button
                type="button"
                onClick={() => handleNavClick('artikel')}
                className={`py-3 px-3 transition-colors border-b-2 cursor-pointer ${
                  activePage === 'artikel'
                    ? 'text-[#C9A227] border-[#C9A227] font-semibold'
                    : 'border-transparent hover:text-[#C9A227] hover:border-[#C9A227]/50'
                }`}
              >
                Artikel & Berita
              </button>
            </li>

            {/* 7. Galeri */}
            <li>
              <button
                type="button"
                onClick={() => handleNavClick('galeri')}
                className={`py-3 px-3 transition-colors border-b-2 cursor-pointer ${
                  activePage === 'galeri'
                    ? 'text-[#C9A227] border-[#C9A227] font-semibold'
                    : 'border-transparent hover:text-[#C9A227] hover:border-[#C9A227]/50'
                }`}
              >
                Galeri
              </button>
            </li>

            {/* 8. Pendaftaran (Special Highlight) */}
            <li>
              <button
                type="button"
                onClick={() => handleNavClick('pendaftaran')}
                className="py-1 px-3.5 my-1.5 rounded-full bg-[#C9A227] text-slate-950 font-bold hover:bg-amber-400 transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-slate-900" />
                <span>Pendaftaran (PSB)</span>
              </button>
            </li>

            {/* 9. Kontak */}
            <li>
              <button
                type="button"
                onClick={() => handleNavClick('kontak')}
                className={`py-3 px-3 transition-colors border-b-2 cursor-pointer ${
                  activePage === 'kontak'
                    ? 'text-[#C9A227] border-[#C9A227] font-semibold'
                    : 'border-transparent hover:text-[#C9A227] hover:border-[#C9A227]/50'
                }`}
              >
                Kontak
              </button>
            </li>

          </ul>
        </div>
      </nav>

      {/* Mobile Menu Overlay & Drawer */}
      {mobileMenuOpen && (
        <div className={`lg:hidden border-t py-3 px-4 shadow-2xl transition-all ${
          darkMode ? 'bg-[#062919] border-emerald-900 text-emerald-100' : 'bg-[#FAF7F0] border-amber-900/20 text-slate-800'
        }`}>
          <div className="space-y-1 text-sm font-medium">
            <button 
              onClick={() => handleNavClick('beranda')}
              className="w-full text-left py-2 px-3 rounded hover:bg-emerald-800/20 flex items-center gap-2"
            >
              <Home className="w-4 h-4 text-[#C9A227]" />
              <span>Beranda</span>
            </button>

            {/* Profil Accordion */}
            <div>
              <button 
                onClick={() => setMobileSubMenu(mobileSubMenu === 'profil' ? null : 'profil')}
                className="w-full text-left py-2 px-3 rounded hover:bg-emerald-800/20 flex items-center justify-between"
              >
                <span>Profil Pesantren</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileSubMenu === 'profil' ? 'rotate-180' : ''}`} />
              </button>
              {mobileSubMenu === 'profil' && (
                <div className="pl-6 py-1 space-y-1 text-xs border-l-2 border-[#C9A227] ml-4 my-1">
                  <button onClick={() => handleNavClick('profil', 'sekilas')} className="block py-1 text-left w-full">Sekilas Tentang Pesantren</button>
                  <button onClick={() => handleNavClick('profil', 'visi-misi')} className="block py-1 text-left w-full">Visi & Misi</button>
                  <button onClick={() => handleNavClick('profil', 'pengasuh')} className="block py-1 text-left w-full">Pengasuh</button>
                  <button onClick={() => handleNavClick('profil', 'asatidz-santri')} className="block py-1 text-left w-full">Asatidz & Santri</button>
                  <button onClick={() => handleNavClick('profil', 'sarana')} className="block py-1 text-left w-full">Sarana dan Prasarana</button>
                  <button onClick={() => handleNavClick('profil', 'lingkungan')} className="block py-1 text-left w-full">Lingkungan</button>
                </div>
              )}
            </div>

            {/* Pendidikan Accordion */}
            <div>
              <button 
                onClick={() => setMobileSubMenu(mobileSubMenu === 'pendidikan' ? null : 'pendidikan')}
                className="w-full text-left py-2 px-3 rounded hover:bg-emerald-800/20 flex items-center justify-between"
              >
                <span>Pendidikan</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileSubMenu === 'pendidikan' ? 'rotate-180' : ''}`} />
              </button>
              {mobileSubMenu === 'pendidikan' && (
                <div className="pl-6 py-1 space-y-1 text-xs border-l-2 border-[#C9A227] ml-4 my-1">
                  <button onClick={() => handleNavClick('pendidikan', 'kurikulum')} className="block py-1 text-left w-full">Kurikulum Kitab Kuning</button>
                  <button onClick={() => handleNavClick('pendidikan', 'rutinitas')} className="block py-1 text-left w-full">Rutinitas & Jadwal Harian</button>
                  <button onClick={() => handleNavClick('pendidikan', 'ibtidaiyah')} className="block py-1 text-left w-full">Madrasah Ibtidaiyah (MIS)</button>
                  <button onClick={() => handleNavClick('pendidikan', 'tsanawiyah')} className="block py-1 text-left w-full">Madrasah Tsanawiyah (MTsS)</button>
                  <button onClick={() => handleNavClick('pendidikan', 'aliyah')} className="block py-1 text-left w-full">Madrasah Aliyah (MAS)</button>
                  <button onClick={() => handleNavClick('pendidikan', 'mahad-aly')} className="block py-1 text-left w-full">Ma'had Aly</button>
                </div>
              )}
            </div>

            {/* Syaikhuna Accordion */}
            <div>
              <button 
                onClick={() => setMobileSubMenu(mobileSubMenu === 'syaikhuna' ? null : 'syaikhuna')}
                className="w-full text-left py-2 px-3 rounded hover:bg-emerald-800/20 flex items-center justify-between"
              >
                <span>Syaikhuna</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileSubMenu === 'syaikhuna' ? 'rotate-180' : ''}`} />
              </button>
              {mobileSubMenu === 'syaikhuna' && (
                <div className="pl-6 py-1 space-y-1 text-xs border-l-2 border-[#C9A227] ml-4 my-1">
                  <button onClick={() => handleNavClick('syaikhuna', 'biografi')} className="block py-1 text-left w-full">Biografi Pengasuh</button>
                  <button onClick={() => handleNavClick('syaikhuna', 'mawaidh')} className="block py-1 text-left w-full">Mawaidh (Nasihat)</button>
                  <button onClick={() => handleNavClick('syaikhuna', 'keluarga')} className="block py-1 text-left w-full">Keluarga</button>
                </div>
              )}
            </div>

            {/* Kajian Accordion */}
            <div>
              <button 
                onClick={() => setMobileSubMenu(mobileSubMenu === 'kajian' ? null : 'kajian')}
                className="w-full text-left py-2 px-3 rounded hover:bg-emerald-800/20 flex items-center justify-between"
              >
                <span>Kajian & Bahtsul Masail</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileSubMenu === 'kajian' ? 'rotate-180' : ''}`} />
              </button>
              {mobileSubMenu === 'kajian' && (
                <div className="pl-6 py-1 space-y-1 text-xs border-l-2 border-[#C9A227] ml-4 my-1">
                  <button onClick={() => handleNavClick('kajian', 'bahtsul-masail')} className="block py-1 text-left w-full">Bahtsul Masail</button>
                  <button onClick={() => handleNavClick('kajian', 'durus')} className="block py-1 text-left w-full">Durus</button>
                  <button onClick={() => handleNavClick('kajian', 'hikmah')} className="block py-1 text-left w-full">Hikmah</button>
                  <button onClick={() => handleNavClick('kajian', 'nisaiyat')} className="block py-1 text-left w-full">Nisaiyat (Keputrian)</button>
                  <button onClick={() => handleNavClick('kajian', 'resensi-kitab')} className="block py-1 text-left w-full">Resensi Kitab</button>
                </div>
              )}
            </div>

            <button 
              onClick={() => handleNavClick('artikel')}
              className="w-full text-left py-2 px-3 rounded hover:bg-emerald-800/20 block"
            >
              Artikel & Berita
            </button>

            <button 
              onClick={() => handleNavClick('galeri')}
              className="w-full text-left py-2 px-3 rounded hover:bg-emerald-800/20 block"
            >
              Galeri Foto & Video
            </button>

            <button 
              onClick={() => handleNavClick('pendaftaran')}
              className="w-full text-left py-2.5 px-3 rounded-lg bg-[#C9A227] text-slate-900 font-bold block my-2"
            >
              Pendaftaran Santri Baru (PSB Online)
            </button>

            <button 
              onClick={() => handleNavClick('kontak')}
              className="w-full text-left py-2 px-3 rounded hover:bg-emerald-800/20 block"
            >
              Kontak & Lokasi Pesantren
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
