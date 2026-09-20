import React from 'react';
import { HeroSlider } from '../components/HeroSlider';
import { Ticker } from '../components/Ticker';
import { BeritaGrid } from '../components/BeritaGrid';
import { ProfilSingkat } from '../components/ProfilSingkat';
import { StatistikSection } from '../components/StatistikSection';
import { MawaidhSection } from '../components/MawaidhSection';
import { VideoSection } from '../components/VideoSection';
import { KajianCategoryCards } from '../components/KajianCategoryCards';
import { PendaftaranCTA } from '../components/PendaftaranCTA';
import { IslamicDivider } from '../components/IslamicDivider';
import { Article, KajianCategory, ActivePage } from '../types';

interface BerandaViewProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
  onNavigate: (page: ActivePage, subPage?: string) => void;
  darkMode: boolean;
}

export const BerandaView: React.FC<BerandaViewProps> = ({
  articles,
  onSelectArticle,
  onNavigate,
  darkMode
}) => {
  return (
    <div className="space-y-4">
      {/* 1. Hero Slider (3-5 headline news) */}
      <HeroSlider 
        articles={articles} 
        onSelectArticle={onSelectArticle} 
        darkMode={darkMode} 
      />

      {/* 2. Ticker running text pengumuman */}
      <Ticker darkMode={darkMode} />

      <IslamicDivider darkMode={darkMode} />

      {/* 3. Grid Berita Terbaru */}
      <BeritaGrid 
        articles={articles} 
        onSelectArticle={onSelectArticle} 
        onViewAllNews={() => onNavigate('artikel')} 
        darkMode={darkMode} 
      />

      <IslamicDivider darkMode={darkMode} />

      {/* 4. Section Profil Singkat Pesantren */}
      <ProfilSingkat 
        onLearnMore={() => onNavigate('profil', 'sekilas')} 
        darkMode={darkMode} 
      />

      {/* 5. Section Statistik (Animated Count-Up) */}
      <StatistikSection darkMode={darkMode} />

      {/* 6. Section Mawaidh Syaikhuna */}
      <MawaidhSection darkMode={darkMode} />

      <IslamicDivider darkMode={darkMode} />

      {/* 7. Section Video YouTube Kajian/Live */}
      <VideoSection darkMode={darkMode} />

      {/* 8. Section Kategori Kajian (Hikmah, Durus, Bahtsul Masail, Nisaiyat, Resensi Kitab) */}
      <KajianCategoryCards 
        onSelectCategory={(cat: KajianCategory) => onNavigate('kajian', cat)} 
        darkMode={darkMode} 
      />

      {/* 9. CTA Pendaftaran Santri Baru */}
      <PendaftaranCTA 
        onRegisterNow={() => onNavigate('pendaftaran')} 
        onViewRequirements={() => onNavigate('pendaftaran')} 
        darkMode={darkMode} 
      />
    </div>
  );
};
