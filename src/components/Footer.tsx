import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Send, 
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube, 
  Check, 
  Heart,
  ExternalLink 
} from 'lucide-react';
import { PESANTREN_INFO } from '../data/mockData';
import { ActivePage } from '../types';

interface FooterProps {
  onNavigate: (page: ActivePage, subPage?: string) => void;
  darkMode: boolean;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, darkMode }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) return;
    setSubscribed(true);
    setTimeout(() => {
      setNewsletterEmail('');
    }, 2000);
  };

  return (
    <footer className={`border-t transition-colors ${
      darkMode 
        ? 'bg-[#041a10] border-emerald-950 text-slate-300' 
        : 'bg-[#073923] border-[#062c1b] text-emerald-100'
    }`}>
      
      {/* Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          
          {/* Col 1: Brand & Identity (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#0B5E3A] border-2 border-[#C9A227] flex items-center justify-center text-[#C9A227]">
                <span className="font-arabic text-sm font-bold">الترقي</span>
              </div>
              <div>
                <h3 className="font-serif-heading text-lg font-bold text-white leading-tight">
                  PONDOK PESANTREN AT-TAROQQY
                </h3>
                <span className="font-arabic text-xs text-[#C9A227]" dir="rtl">
                  معهد الترقي الإسلامي السلفي بسارانج
                </span>
              </div>
            </div>

            <p className="text-xs leading-relaxed text-emerald-200/80">
              {PESANTREN_INFO.tagline}. Berkhidmat mendidik generasi santri yang kokoh dalam akidah, mutafaqqih fid-din, serta setia mengamalkan nilai-nilai luhur ulama salaf.
            </p>

            {/* Address and Contact info */}
            <div className="space-y-2 text-xs pt-1">
              <div className="flex items-start gap-2.5 text-emerald-100">
                <MapPin className="w-4 h-4 text-[#C9A227] shrink-0 mt-0.5" />
                <span>{PESANTREN_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2.5 text-emerald-100">
                <Phone className="w-4 h-4 text-[#C9A227] shrink-0" />
                <span>Kantor Sekretariat: {PESANTREN_INFO.phone} / WA: {PESANTREN_INFO.whatsapp}</span>
              </div>
              <div className="flex items-center gap-2.5 text-emerald-100">
                <Mail className="w-4 h-4 text-[#C9A227] shrink-0" />
                <span>{PESANTREN_INFO.email}</span>
              </div>
            </div>

            {/* Social media links */}
            <div className="flex items-center gap-2.5 pt-2">
              <a 
                href={PESANTREN_INFO.socialMedia.facebook} 
                target="_blank" 
                rel="noreferrer" 
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#C9A227] hover:text-slate-950 flex items-center justify-center transition"
                title="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href={PESANTREN_INFO.socialMedia.instagram} 
                target="_blank" 
                rel="noreferrer" 
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#C9A227] hover:text-slate-950 flex items-center justify-center transition"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href={PESANTREN_INFO.socialMedia.telegram} 
                target="_blank" 
                rel="noreferrer" 
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#C9A227] hover:text-slate-950 flex items-center justify-center transition"
                title="Telegram"
              >
                <Send className="w-4 h-4" />
              </a>
              <a 
                href={PESANTREN_INFO.socialMedia.twitter} 
                target="_blank" 
                rel="noreferrer" 
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#C9A227] hover:text-slate-950 flex items-center justify-center transition"
                title="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a 
                href={PESANTREN_INFO.socialMedia.youtube} 
                target="_blank" 
                rel="noreferrer" 
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#C9A227] hover:text-slate-950 flex items-center justify-center transition"
                title="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif-heading text-sm font-bold text-white uppercase tracking-wider border-b border-emerald-800/80 pb-2">
              Menu Utama
            </h4>
            <ul className="space-y-1.5 text-xs text-emerald-200/90">
              <li>
                <button onClick={() => onNavigate('beranda')} className="hover:text-[#C9A227] transition">Beranda</button>
              </li>
              <li>
                <button onClick={() => onNavigate('profil', 'sekilas')} className="hover:text-[#C9A227] transition">Profil Pesantren</button>
              </li>
              <li>
                <button onClick={() => onNavigate('pendidikan', 'kurikulum')} className="hover:text-[#C9A227] transition">Kurikulum Salaf</button>
              </li>
              <li>
                <button onClick={() => onNavigate('syaikhuna', 'biografi')} className="hover:text-[#C9A227] transition">Biografi Masyayikh</button>
              </li>
              <li>
                <button onClick={() => onNavigate('kajian', 'bahtsul-masail')} className="hover:text-[#C9A227] transition">Bahtsul Masail</button>
              </li>
              <li>
                <button onClick={() => onNavigate('artikel')} className="hover:text-[#C9A227] transition">Warta & Berita</button>
              </li>
              <li>
                <button onClick={() => onNavigate('galeri')} className="hover:text-[#C9A227] transition">Galeri Kegiatan</button>
              </li>
              <li>
                <button onClick={() => onNavigate('pendaftaran')} className="hover:text-[#C9A227] transition text-[#C9A227] font-semibold">Pendaftaran Santri Baru</button>
              </li>
              <li>
                <button onClick={() => onNavigate('kontak')} className="hover:text-[#C9A227] transition">Kontak & Lokasi</button>
              </li>
            </ul>
          </div>

          {/* Col 3: Rubrik Kajian (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif-heading text-sm font-bold text-white uppercase tracking-wider border-b border-emerald-800/80 pb-2">
              Rubrik Kajian
            </h4>
            <ul className="space-y-1.5 text-xs text-emerald-200/90">
              <li>
                <button onClick={() => onNavigate('kajian', 'bahtsul-masail')} className="hover:text-[#C9A227] transition">Keputusan Bahtsul Masail</button>
              </li>
              <li>
                <button onClick={() => onNavigate('kajian', 'durus')} className="hover:text-[#C9A227] transition">Durus Kitab Kuning</button>
              </li>
              <li>
                <button onClick={() => onNavigate('kajian', 'hikmah')} className="hover:text-[#C9A227] transition">Hikmah & Tasawuf</button>
              </li>
              <li>
                <button onClick={() => onNavigate('kajian', 'nisaiyat')} className="hover:text-[#C9A227] transition">Nisaiyat (Keputrian)</button>
              </li>
              <li>
                <button onClick={() => onNavigate('kajian', 'resensi-kitab')} className="hover:text-[#C9A227] transition">Resensi Kitab Turats</button>
              </li>
              <li>
                <button onClick={() => onNavigate('syaikhuna', 'mawaidh')} className="hover:text-[#C9A227] transition">Mawaidh Syaikhina</button>
              </li>
              <li>
                <button onClick={() => onNavigate('pendidikan', 'rutinitas')} className="hover:text-[#C9A227] transition">Jadwal 24 Jam Santri</button>
              </li>
            </ul>
          </div>

          {/* Col 4: Google Maps Embed & Newsletter (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-serif-heading text-sm font-bold text-white uppercase tracking-wider border-b border-emerald-800/80 pb-2">
              Peta Lokasi Sarang
            </h4>

            {/* Google Maps Embed iframe with fallback */}
            <div className="rounded-lg overflow-hidden border border-white/10 h-36 bg-slate-900 relative">
              <iframe
                title="Peta Lokasi Pondok Pesantren Sarang"
                src="https://maps.google.com/maps?q=Sarang%20Rembang%20Jawa%20Tengah&t=&z=13&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0"
                loading="lazy"
              />
            </div>

            {/* Newsletter Subscription */}
            <div className="pt-2">
              <span className="text-xs font-semibold text-white block mb-1">
                Langganan Buletin Warta Sarang
              </span>
              <p className="text-[11px] text-emerald-200/70 mb-2">
                Dapatkan kiriman ringkasan bahtsul masail & pengumuman resmi ke email Anda.
              </p>
              
              {subscribed ? (
                <div className="flex items-center gap-2 text-xs text-[#C9A227] bg-[#C9A227]/10 p-2 rounded border border-[#C9A227]/30">
                  <Check className="w-4 h-4" />
                  <span>Jazakumullah khair, Anda telah berlangganan buletin warta.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex items-center gap-1.5">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Masukkan alamat email..."
                    required
                    className="flex-1 px-3 py-1.5 text-xs rounded bg-black/30 border border-white/20 text-white placeholder-emerald-200/50 focus:outline-hidden focus:border-[#C9A227]"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-[#C9A227] hover:bg-amber-400 text-slate-950 text-xs font-bold rounded transition cursor-pointer"
                  >
                    Kirim
                  </button>
                </form>
              )}
            </div>

          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="mt-10 pt-6 border-t border-emerald-900 flex flex-col sm:flex-row items-center justify-between text-xs text-emerald-200/70 gap-2">
          <div>
            Pondok Pesantren At-Taroqqy Sarang © 2026. Hak Cipta Dilindungi Undang-Undang.
          </div>
          <div className="flex items-center gap-1">
            <span>Dikelola oleh Tim Multimedia & Lembaga Pers Santri (LPS)</span>
          </div>
        </div>

      </div>

    </footer>
  );
};
