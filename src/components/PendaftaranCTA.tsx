import React from 'react';
import { Sparkles, ArrowRight, Download, CheckCircle2, Calendar } from 'lucide-react';

interface PendaftaranCTAProps {
  onRegisterNow: () => void;
  onViewRequirements: () => void;
  darkMode: boolean;
}

export const PendaftaranCTA: React.FC<PendaftaranCTAProps> = ({
  onRegisterNow,
  onViewRequirements,
  darkMode
}) => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10" aria-label="Ajakan Pendaftaran Santri Baru">
      <div className={`relative rounded-3xl p-8 sm:p-12 overflow-hidden border shadow-xl ${
        darkMode ? 'bg-gradient-to-br from-[#062417] via-[#083521] to-[#041910] border-emerald-800' : 'bg-gradient-to-br from-[#0B5E3A] via-[#094e30] to-[#063b24] border-[#C9A227]/30 text-white'
      }`}>
        
        {/* Decorative Gold Rings in Background */}
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full border-8 border-[#C9A227]/20 pointer-events-none" />
        <div className="absolute right-40 -bottom-20 w-60 h-60 rounded-full border-4 border-dashed border-[#C9A227]/20 pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C9A227] text-slate-950 text-xs font-extrabold uppercase tracking-wider mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Penerimaan Santri Baru (PSB) 1448-1449 H / 2026-2027 M</span>
          </div>

          <h2 className="font-serif-heading text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight">
            Menempa Jiwa Santri, Menjaga Tradisi Keilmuan Ulama Salaf
          </h2>

          <p className="mt-3 text-emerald-100 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl font-light">
            Pendaftaran santri putra dan putri untuk seluruh jenjang (Madrasah Ibtidaiyah, Tsanawiyah, Aliyah, dan Ma'had Aly) telah dibuka. Formulir dapat diisi secara langsung melalui portal resmi.
          </p>

          {/* Quick Checkpoints */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-6 text-xs text-emerald-50">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#C9A227] shrink-0" />
              <span>Pendaftaran Online 24 Jam</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#C9A227] shrink-0" />
              <span>Biaya Terjangkau & Transparan</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#C9A227] shrink-0" />
              <span>Asrama Putra & Putri Terpisah</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              type="button"
              onClick={onRegisterNow}
              className="px-6 py-3 rounded-xl bg-[#C9A227] hover:bg-amber-400 text-slate-950 font-bold text-sm transition shadow-lg flex items-center gap-2 cursor-pointer transform hover:scale-105"
            >
              <span>Daftar Online Sekarang</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={onViewRequirements}
              className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm transition border border-white/20 flex items-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4 text-[#C9A227]" />
              <span>Syarat & Rincian Biaya</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
