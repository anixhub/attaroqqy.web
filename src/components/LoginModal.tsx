import React, { useState } from 'react';
import { X, Lock, Mail, User, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (name: string) => void;
  onOpenAdminLogin?: () => void;
  darkMode: boolean;
}

type AuthTab = 'login' | 'register' | 'forgot';

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  onOpenAdminLogin,
  darkMode
}) => {
  const [activeTab, setActiveTab] = useState<AuthTab>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (activeTab === 'login') {
      if (!email || !password) {
        setStatusMessage('Harap lengkapi email dan kata sandi.');
        return;
      }
      setStatusMessage(null);
      onLoginSuccess(name || 'Wali Santri');
      onClose();
    } else if (activeTab === 'register') {
      if (!name || !email || !password) {
        setStatusMessage('Harap lengkapi seluruh formulir registrasi.');
        return;
      }
      setStatusMessage('Pendaftaran akun wali santri berhasil! Anda telah masuk.');
      setTimeout(() => {
        onLoginSuccess(name);
        onClose();
      }, 1000);
    } else if (activeTab === 'forgot') {
      if (!email) {
        setStatusMessage('Harap masukkan alamat email akun Anda.');
        return;
      }
      setStatusMessage(`Tautan pemulihan kata sandi telah dikirim ke ${email}.`);
      setTimeout(() => {
        setActiveTab('login');
        setStatusMessage(null);
      }, 2500);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className={`w-full max-w-md rounded-2xl shadow-2xl border overflow-hidden transition-all ${
          darkMode ? 'bg-[#062417] border-emerald-900 text-white' : 'bg-white border-amber-900/20 text-slate-800'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-emerald-900">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#0B5E3A] text-[#C9A227] flex items-center justify-center font-bold text-xs">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif-heading font-bold text-base">
                {activeTab === 'login' && 'Masuk Portal Santri / Wali'}
                {activeTab === 'register' && 'Buat Akun Portal Baru'}
                {activeTab === 'forgot' && 'Pemulihan Kata Sandi'}
              </h3>
              <span className="text-[11px] text-slate-500 block">Sistem Informasi Pondok Pesantren Sarang</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-200 dark:border-emerald-900 text-xs font-semibold">
          <button
            type="button"
            onClick={() => { setActiveTab('login'); setStatusMessage(null); }}
            className={`flex-1 py-2.5 text-center transition cursor-pointer ${
              activeTab === 'login'
                ? 'border-b-2 border-[#0B5E3A] dark:border-[#C9A227] text-[#0B5E3A] dark:text-[#C9A227]'
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            Masuk
          </button>
          <button
            type="button"
            onClick={() => { setActiveTab('register'); setStatusMessage(null); }}
            className={`flex-1 py-2.5 text-center transition cursor-pointer ${
              activeTab === 'register'
                ? 'border-b-2 border-[#0B5E3A] dark:border-[#C9A227] text-[#0B5E3A] dark:text-[#C9A227]'
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            Daftar Akun
          </button>
          <button
            type="button"
            onClick={() => { setActiveTab('forgot'); setStatusMessage(null); }}
            className={`flex-1 py-2.5 text-center transition cursor-pointer ${
              activeTab === 'forgot'
                ? 'border-b-2 border-[#0B5E3A] dark:border-[#C9A227] text-[#0B5E3A] dark:text-[#C9A227]'
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            Lupa Sandi
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {statusMessage && (
            <div className="p-3 rounded-lg text-xs bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{statusMessage}</span>
            </div>
          )}

          {activeTab === 'register' && (
            <div>
              <label className="block text-xs font-semibold mb-1 text-slate-700 dark:text-emerald-200">
                Nama Lengkap Wali / Santri
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Contoh: H. Abdul Wahid"
                  required
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-emerald-900 bg-slate-50 dark:bg-emerald-950/40 focus:outline-hidden focus:border-[#0B5E3A]"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold mb-1 text-slate-700 dark:text-emerald-200">
              Alamat Email Aktif
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@domain.com"
                required
                className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-emerald-900 bg-slate-50 dark:bg-emerald-950/40 focus:outline-hidden focus:border-[#0B5E3A]"
              />
            </div>
          </div>

          {activeTab === 'register' && (
            <div>
              <label className="block text-xs font-semibold mb-1 text-slate-700 dark:text-emerald-200">
                Nomor WhatsApp Aktif
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="081234567890"
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-emerald-900 bg-slate-50 dark:bg-emerald-950/40 focus:outline-hidden focus:border-[#0B5E3A]"
              />
            </div>
          )}

          {activeTab !== 'forgot' && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-emerald-200">
                  Kata Sandi
                </label>
                {activeTab === 'login' && (
                  <button
                    type="button"
                    onClick={() => setActiveTab('forgot')}
                    className="text-[11px] text-[#0B5E3A] dark:text-[#C9A227] hover:underline cursor-pointer"
                  >
                    Lupa sandi?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-emerald-900 bg-slate-50 dark:bg-emerald-950/40 focus:outline-hidden focus:border-[#0B5E3A]"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2.5 rounded-lg bg-[#0B5E3A] hover:bg-[#08452a] text-[#C9A227] font-bold text-xs sm:text-sm transition shadow-sm border border-[#C9A227]/40 flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            <span>
              {activeTab === 'login' && 'Masuk ke Akun'}
              {activeTab === 'register' && 'Daftar Akun Sekarang'}
              {activeTab === 'forgot' && 'Kirim Link Reset Sandi'}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Footer info */}
        <div className="px-6 py-3 bg-slate-50 dark:bg-emerald-950/60 border-t border-slate-200 dark:border-emerald-900/60 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500 dark:text-emerald-300/80">
          <span>Portal wali santri & alumni pesantren</span>
          {onOpenAdminLogin && (
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenAdminLogin();
              }}
              className="text-[#0B5E3A] dark:text-[#C9A227] font-semibold hover:underline cursor-pointer flex items-center gap-1"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Login Pengurus (Admin CMS)</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
