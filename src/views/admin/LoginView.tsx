import React, { useState } from 'react';
import { Lock, Mail, ArrowLeft, ShieldCheck, Eye, EyeOff, AlertCircle, Sparkles } from 'lucide-react';
import { supabase, isSupabaseConfigured, supabaseConfigWarning } from '../../lib/supabase';

interface LoginViewProps {
  onLoginSuccess: (user: { email: string; name?: string }) => void;
  onBackToWebsite: () => void;
  darkMode?: boolean;
}

export const LoginView: React.FC<LoginViewProps> = ({
  onLoginSuccess,
  onBackToWebsite,
  darkMode = false,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setLoading(true);

    try {
      if (isSupabaseConfigured) {
        // Authenticate with Supabase Auth
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          throw error;
        }

        onLoginSuccess({
          email: data.user?.email || email,
          name: data.user?.user_metadata?.name || 'Administrator',
        });
      } else {
        // Fallback demo login when Supabase credentials are in placeholder state
        if (email.trim() && password.length >= 4) {
          onLoginSuccess({
            email,
            name: email.split('@')[0] || 'Admin Pesantren',
          });
        } else {
          setErrorMessage('Harap masukkan email yang valid dan password minimal 4 karakter.');
        }
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Gagal masuk. Periksa kembali email dan password Anda.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemoLogin = () => {
    setEmail('admin@attaroqqy.sch.id');
    setPassword('sarang1926');
  };

  return (
    <div className={`min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 transition-colors ${
      darkMode ? 'bg-[#03150d] text-slate-100' : 'bg-[#FAF7F0] text-slate-800'
    }`}>
      {/* Top back button */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4 mb-4">
        <button
          type="button"
          onClick={onBackToWebsite}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#0B5E3A] dark:text-emerald-400 hover:underline cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Portal Publik Pesantren</span>
        </button>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4">
        {/* Brand Header */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#0B5E3A] border-2 border-[#C9A227] shadow-lg mb-3">
            <ShieldCheck className="w-9 h-9 text-[#C9A227]" />
          </div>
          <span className="block text-xs font-serif font-bold text-[#C9A227] tracking-widest uppercase">
            معهد التَرَقي الإسلامي بسارانج
          </span>
          <h1 className={`text-2xl font-bold font-serif-heading mt-1 ${
            darkMode ? 'text-emerald-100' : 'text-slate-900'
          }`}>
            Portal Admin CMS Pesantren
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Pondok Pesantren At-Taroqqy Sarang — Pengelolaan Artikel, Kajian Turats & Data
          </p>
        </div>

        {/* Card Box */}
        <div className={`mt-6 py-8 px-6 sm:px-10 rounded-2xl border shadow-xl ${
          darkMode ? 'bg-[#062417] border-emerald-900/60 text-slate-200' : 'bg-white border-amber-900/15 text-slate-800'
        }`}>

          {/* Supabase Status Banner */}
          <div className={`p-3 rounded-xl mb-6 text-xs flex items-start gap-2.5 border ${
            isSupabaseConfigured
              ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200'
              : 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800 text-amber-800 dark:text-amber-200'
          }`}>
            <Sparkles className="w-4 h-4 shrink-0 mt-0.5 text-[#C9A227]" />
            <div>
              <p className="font-semibold">
                {isSupabaseConfigured
                  ? 'Koneksi Supabase Aktif'
                  : 'Mode Pratayang (Supabase Demo)'}
              </p>
              <p className="text-[11px] opacity-90 mt-0.5">
                {isSupabaseConfigured
                  ? 'Autentikasi terhubung langsung ke project Supabase Anda.'
                  : supabaseConfigWarning
                  ? supabaseConfigWarning
                  : 'Anda dapat masuk dengan akun demo atau memasukkan kredensial admin.'}
              </p>
            </div>
          </div>

          {errorMessage && (
            <div className="p-3.5 mb-5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">
                Alamat Email Pengurus *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@attaroqqy.sch.id"
                  className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-slate-300 dark:border-emerald-900/80 bg-slate-50 dark:bg-emerald-950/40 focus:outline-hidden focus:border-[#0B5E3A] focus:ring-1 focus:ring-[#0B5E3A]"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Kata Sandi *
                </label>
                <button
                  type="button"
                  onClick={handleQuickDemoLogin}
                  className="text-[11px] text-[#0B5E3A] dark:text-[#C9A227] hover:underline"
                >
                  Gunakan Akun Demo
                </button>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-10 py-2.5 text-xs rounded-xl border border-slate-300 dark:border-emerald-900/80 bg-slate-50 dark:bg-emerald-950/40 focus:outline-hidden focus:border-[#0B5E3A] focus:ring-1 focus:ring-[#0B5E3A]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-slate-600 dark:text-slate-400">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded border-slate-300 text-[#0B5E3A] focus:ring-[#0B5E3A]"
                />
                <span>Ingat saya</span>
              </label>
              <span className="text-slate-400 text-[11px]">Sistem Aman SSL</span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-3 py-2.5 px-4 rounded-xl bg-[#0B5E3A] hover:bg-[#08452a] text-[#C9A227] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer transition shadow-md disabled:opacity-50"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{loading ? 'Memverifikasi...' : 'Masuk ke Dashboard Admin'}</span>
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-slate-200 dark:border-emerald-900/60 text-center">
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Hak Akses Terbatas untuk Dewan Redaksi & Pengurus Kantor Sekretariat Pesantren Sarang.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
