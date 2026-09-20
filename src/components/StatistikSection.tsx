import React, { useState, useEffect, useRef } from 'react';
import { Users, GraduationCap, Award, Landmark } from 'lucide-react';
import { PESANTREN_INFO } from '../data/mockData';

interface StatistikSectionProps {
  darkMode: boolean;
}

export const StatistikSection: React.FC<StatistikSectionProps> = ({ darkMode }) => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [counts, setCounts] = useState({
    santri: 0,
    asatidz: 0,
    alumni: 0,
    year: 1900
  });

  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          const duration = 2000;
          const frameDuration = 1000 / 60;
          const totalFrames = Math.round(duration / frameDuration);
          let frame = 0;

          const timer = setInterval(() => {
            frame++;
            const progress = frame / totalFrames;
            const easeOutQuad = 1 - (1 - progress) * (1 - progress);

            setCounts({
              santri: Math.floor(easeOutQuad * PESANTREN_INFO.stats.santri),
              asatidz: Math.floor(easeOutQuad * PESANTREN_INFO.stats.asatidz),
              alumni: Math.floor(easeOutQuad * PESANTREN_INFO.stats.alumni),
              year: Math.floor(1900 + easeOutQuad * (PESANTREN_INFO.stats.foundedYear - 1900))
            });

            if (frame === totalFrames) {
              clearInterval(timer);
              setCounts({
                santri: PESANTREN_INFO.stats.santri,
                asatidz: PESANTREN_INFO.stats.asatidz,
                alumni: PESANTREN_INFO.stats.alumni,
                year: PESANTREN_INFO.stats.foundedYear
              });
            }
          }, frameDuration);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const statsList = [
    {
      label: 'Santri Mukim Aktif',
      value: `${counts.santri.toLocaleString('id-ID')}+`,
      subtext: 'Berasal dari 38 Provinsi di Indonesia',
      icon: Users,
    },
    {
      label: 'Dewan Asatidz & Masyayikh',
      value: `${counts.asatidz.toLocaleString('id-ID')}+`,
      subtext: 'Alumni Masyhur & Pemegang Sanad Kitab',
      icon: GraduationCap,
    },
    {
      label: 'Alumni se-Nusantara',
      value: `${counts.alumni.toLocaleString('id-ID')}+`,
      subtext: 'Mengasuh Pesantren & Penggerak Ummat',
      icon: Award,
    },
    {
      label: 'Tahun Berdiri',
      value: `${counts.year} M`,
      subtext: '1378 H / Lebih dari 68 Tahun Mengabdi',
      icon: Landmark,
    },
  ];

  return (
    <section 
      ref={sectionRef} 
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" 
      aria-label="Statistik Pesantren"
    >
      <div className={`rounded-2xl p-6 sm:p-10 border transition-colors shadow-sm ${
        darkMode ? 'bg-[#082a1b] border-emerald-900 text-white' : 'bg-[#0B5E3A] border-[#08482c] text-white'
      }`}>
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs uppercase font-bold tracking-widest text-[#C9A227]">
            Khidmah Ilmiah Berkelanjutan
          </span>
          <h3 className="font-serif-heading text-xl sm:text-2xl font-bold mt-1">
            Kiprah Pondok Pesantren dalam Membangun Peradaban Santri
          </h3>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {statsList.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div 
                key={idx}
                className="flex flex-col items-center text-center p-4 rounded-xl bg-black/15 border border-white/10 backdrop-blur-2xs"
              >
                <div className="w-11 h-11 rounded-full bg-[#C9A227]/20 border border-[#C9A227]/60 flex items-center justify-center text-[#C9A227] mb-3">
                  <Icon className="w-5 h-5" />
                </div>
                
                <span className="font-serif-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#C9A227] tracking-tight">
                  {stat.value}
                </span>

                <span className="font-semibold text-xs sm:text-sm mt-1 text-emerald-100">
                  {stat.label}
                </span>

                <span className="text-[11px] text-emerald-200/70 mt-0.5">
                  {stat.subtext}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
