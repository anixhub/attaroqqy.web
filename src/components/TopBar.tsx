import React, { useState, useEffect } from 'react';
import { 
  Facebook, 
  Instagram, 
  Send, 
  Twitter, 
  Youtube, 
  UserCheck, 
  LogIn, 
  Moon, 
  Sun,
  Calendar
} from 'lucide-react';
import { PESANTREN_INFO } from '../data/mockData';

interface TopBarProps {
  onOpenLogin: () => void;
  isLoggedIn: boolean;
  userName?: string;
  onLogout: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  onOpenLogin,
  isLoggedIn,
  userName,
  onLogout,
  darkMode,
  onToggleDarkMode
}) => {
  const [currentDateString, setCurrentDateString] = useState<string>('');

  useEffect(() => {
    // Indonesian formatted date
    const now = new Date();
    const days = ['Ahad', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jum\'at', 'Sabtu'];
    const months = [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];
    const dayName = days[now.getDay()];
    const dateNum = now.getDate();
    const monthName = months[now.getMonth()];
    const year = now.getFullYear();

    setCurrentDateString(`${dayName}, ${dateNum} ${monthName} ${year}`);
  }, []);

  return (
    <div className={`w-full text-xs transition-colors border-b ${
      darkMode 
        ? 'bg-[#083521] text-emerald-100/80 border-emerald-900/60' 
        : 'bg-[#0B5E3A] text-emerald-50 border-[#08482c]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-wrap items-center justify-between gap-2">
        {/* Left: Date in Indonesian + Hijri */}
        <div className="flex items-center gap-2 font-medium">
          <Calendar className="w-3.5 h-3.5 text-[#C9A227]" />
          <span>{currentDateString || 'Sabtu, 20 September 2026'}</span>
          <span className="text-[#C9A227]/70">•</span>
          <span className="font-arabic text-sm text-[#C9A227]">٩ ربيع الأول ١٤٤٨ هـ</span>
        </div>

        {/* Right: Social Media & Action Buttons */}
        <div className="flex items-center gap-4">
          {/* Social Icons */}
          <div className="hidden sm:flex items-center gap-2.5">
            <a 
              href={PESANTREN_INFO.socialMedia.facebook} 
              target="_blank" 
              rel="noreferrer"
              className="hover:text-[#C9A227] transition-colors" 
              title="Facebook Resmi"
            >
              <Facebook className="w-3.5 h-3.5" />
            </a>
            <a 
              href={PESANTREN_INFO.socialMedia.instagram} 
              target="_blank" 
              rel="noreferrer"
              className="hover:text-[#C9A227] transition-colors" 
              title="Instagram @attaroqqy_sarang"
            >
              <Instagram className="w-3.5 h-3.5" />
            </a>
            <a 
              href={PESANTREN_INFO.socialMedia.telegram} 
              target="_blank" 
              rel="noreferrer"
              className="hover:text-[#C9A227] transition-colors" 
              title="Kanal Telegram Resmi"
            >
              <Send className="w-3.5 h-3.5" />
            </a>
            <a 
              href={PESANTREN_INFO.socialMedia.twitter} 
              target="_blank" 
              rel="noreferrer"
              className="hover:text-[#C9A227] transition-colors" 
              title="X (Twitter)"
            >
              <Twitter className="w-3.5 h-3.5" />
            </a>
            <a 
              href={PESANTREN_INFO.socialMedia.youtube} 
              target="_blank" 
              rel="noreferrer"
              className="hover:text-[#C9A227] transition-colors" 
              title="YouTube Pengajian"
            >
              <Youtube className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="h-3 w-px bg-emerald-700/50 hidden sm:block" />

          {/* Dark Mode Toggle */}
          <button
            type="button"
            onClick={onToggleDarkMode}
            className="flex items-center gap-1 hover:text-[#C9A227] transition-colors cursor-pointer px-1.5 py-0.5 rounded"
            title={darkMode ? 'Beralih ke Mode Terang' : 'Beralih ke Mode Gelap'}
          >
            {darkMode ? <Sun className="w-3.5 h-3.5 text-amber-300" /> : <Moon className="w-3.5 h-3.5 text-emerald-200" />}
            <span className="hidden md:inline">{darkMode ? 'Terang' : 'Gelap'}</span>
          </button>

          {/* Login / User Status */}
          {isLoggedIn ? (
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 text-[#C9A227] font-medium">
                <UserCheck className="w-3.5 h-3.5" />
                <span className="truncate max-w-[120px]">{userName || 'Wali Santri'}</span>
              </span>
              <button
                type="button"
                onClick={onLogout}
                className="bg-red-800/60 hover:bg-red-700 px-2 py-0.5 rounded text-white font-medium transition cursor-pointer"
              >
                Keluar
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={onOpenLogin}
              className="flex items-center gap-1.5 bg-[#C9A227] hover:bg-[#b8911f] text-slate-900 px-2.5 py-0.5 rounded font-semibold transition shadow-xs cursor-pointer"
            >
              <LogIn className="w-3 h-3 text-slate-950" />
              <span>Masuk / Login</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
