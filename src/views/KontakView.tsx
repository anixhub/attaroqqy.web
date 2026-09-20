import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, MessageSquare } from 'lucide-react';
import { PESANTREN_INFO } from '../data/mockData';

interface KontakViewProps {
  darkMode: boolean;
}

export const KontakView: React.FC<KontakViewProps> = ({ darkMode }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Informasi Pendaftaran Santri');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitted(true);
    setTimeout(() => {
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
      setSubmitted(false);
    }, 5000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <span className="text-xs uppercase font-bold tracking-widest text-[#0B5E3A] dark:text-emerald-400">
          Pusat Informasi & Pelayanan
        </span>
        <h1 className={`font-serif-heading text-3xl sm:text-4xl font-bold mt-1 ${
          darkMode ? 'text-emerald-100' : 'text-slate-900'
        }`}>
          Kontak & Lokasi Pondok Pesantren
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-2">
          Hubungi sekretariat kantor pusat Pondok Pesantren At-Taroqqy Sarang untuk keperluan sowan, informasi pendaftaran, maupun konfirmasi waqaf/infaq.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Col Left: Informasi & Kontak (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className={`p-6 rounded-2xl border shadow-xs ${
            darkMode ? 'bg-[#062417] border-emerald-900 text-slate-200' : 'bg-white border-amber-900/15 text-slate-800'
          }`}>
            <h2 className="font-serif-heading text-xl font-bold mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#0B5E3A] dark:text-[#C9A227]" />
              <span>Kantor Sekretariat Utama</span>
            </h2>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#C9A227] shrink-0 mt-0.5" />
                <div>
                  <strong>Alamat Lembaga:</strong>
                  <p className="text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                    {PESANTREN_INFO.address}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#C9A227] shrink-0 mt-0.5" />
                <div>
                  <strong>Telepon & WhatsApp:</strong>
                  <p className="text-slate-500 dark:text-slate-400 mt-0.5">
                    Telepon Kantor: {PESANTREN_INFO.phone}<br />
                    Hotline WhatsApp: {PESANTREN_INFO.whatsapp}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#C9A227] shrink-0 mt-0.5" />
                <div>
                  <strong>Email Resmi:</strong>
                  <p className="text-slate-500 dark:text-slate-400 mt-0.5">
                    {PESANTREN_INFO.email}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#C9A227] shrink-0 mt-0.5" />
                <div>
                  <strong>Jam Layanan Kantor:</strong>
                  <p className="text-slate-500 dark:text-slate-400 mt-0.5">
                    Setiap Hari: 08.00 - 16.30 WIB<br />
                    (Istirahat shalat Dzuhur & Ashar)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Google Maps Interactive Embed */}
          <div className="rounded-2xl overflow-hidden border border-amber-900/15 shadow-xs h-64 bg-slate-900">
            <iframe
              title="Peta Lokasi Pesantren Sarang"
              src="https://maps.google.com/maps?q=Sarang%20Rembang%20Jawa%20Tengah&t=&z=14&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full border-0"
              loading="lazy"
            />
          </div>

        </div>

        {/* Col Right: Form Kirim Pesan (7 cols) */}
        <div className="lg:col-span-7">
          <div className={`p-6 sm:p-8 rounded-2xl border shadow-xs ${
            darkMode ? 'bg-[#062417] border-emerald-900 text-slate-200' : 'bg-white border-amber-900/15 text-slate-800'
          }`}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-[#0B5E3A]/10 text-[#0B5E3A] dark:text-[#C9A227] flex items-center justify-center">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-serif-heading text-xl font-bold">Kirim Pesan / Pengaduan Layanan</h2>
                <span className="text-xs text-slate-500">Pesan akan diteruskan ke sekretariat pengurus pondok</span>
              </div>
            </div>

            {submitted ? (
              <div className="p-6 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200 text-center space-y-2 border border-emerald-300 dark:border-emerald-800">
                <CheckCircle2 className="w-10 h-10 mx-auto text-emerald-600 dark:text-emerald-300" />
                <h3 className="font-serif-heading font-bold text-base">Alhamdulillah, Pesan Anda Telah Terkirim!</h3>
                <p className="text-xs">
                  Jazakumullah khair telah menghubungi kami. Petugas sekretariat akan membalas melalui email atau WhatsApp dalam 1x24 jam kerja.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold mb-1">Nama Lengkap *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Contoh: H. Ahmad Subhan"
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-emerald-900 bg-slate-50 dark:bg-emerald-950/40 focus:outline-hidden focus:border-[#0B5E3A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1">Alamat Email *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="email@domain.com"
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-emerald-900 bg-slate-50 dark:bg-emerald-950/40 focus:outline-hidden focus:border-[#0B5E3A]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold mb-1">Nomor Telepon / WhatsApp</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="081234567890"
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-emerald-900 bg-slate-50 dark:bg-emerald-950/40 focus:outline-hidden focus:border-[#0B5E3A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1">Kategori Keperluan</label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-emerald-900 bg-slate-50 dark:bg-emerald-950/40 focus:outline-hidden focus:border-[#0B5E3A]"
                    >
                      <option value="Informasi Pendaftaran Santri">Informasi Pendaftaran Santri (PSB)</option>
                      <option value="Jadwal Sowan Pengasuh">Jadwal Sowan Pengasuh</option>
                      <option value="Konfirmasi Wakaf / Infaq Santri">Konfirmasi Wakaf / Infaq Pembangunan</option>
                      <option value="Pertanyaan Fiqih / Bahtsul Masail">Pertanyaan Fiqih / Bahtsul Masail</option>
                      <option value="Hubungan Alumni & Iksan">Hubungan Alumni & Iksan</option>
                      <option value="Lainnya">Lainnya</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">Isi Pesan / Pertanyaan *</label>
                  <textarea
                    rows={5}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tuliskan pesan, permohonan informasi, atau pengaduan Anda di sini secara jelas..."
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-emerald-900 bg-slate-50 dark:bg-emerald-950/40 focus:outline-hidden focus:border-[#0B5E3A]"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#0B5E3A] hover:bg-[#08452a] text-[#C9A227] font-bold text-xs sm:text-sm flex items-center gap-2 cursor-pointer transition shadow-md"
                >
                  <Send className="w-4 h-4" />
                  <span>Kirimkan Pesan Sekarang</span>
                </button>

              </form>
            )}

          </div>
        </div>

      </div>

    </div>
  );
};
