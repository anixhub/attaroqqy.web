import React, { useState } from 'react';
import { 
  FileText, 
  HelpCircle, 
  Phone, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  DollarSign, 
  Printer, 
  Download, 
  User, 
  MapPin, 
  GraduationCap, 
  ShieldCheck, 
  AlertCircle,
  Calendar
} from 'lucide-react';
import { REGISTRATION_FAQ, PESANTREN_INFO } from '../data/mockData';
import { RegistrationFormData } from '../types';

interface PendaftaranViewProps {
  darkMode: boolean;
}

export const PendaftaranView: React.FC<PendaftaranViewProps> = ({ darkMode }) => {
  const [activeTab, setActiveTab] = useState<'syarat' | 'alur' | 'biaya' | 'daftar' | 'faq' | 'kontak'>('daftar');
  
  // Multi-step Registration Form State
  const [formStep, setFormStep] = useState<number>(1);
  const [formData, setFormData] = useState<RegistrationFormData>({
    fullName: '',
    nik: '',
    gender: 'putra',
    birthPlace: '',
    birthDate: '',
    jenjang: 'tsanawiyah',
    fatherName: '',
    motherName: '',
    parentPhone: '',
    address: '',
    previousSchool: '',
    healthNotes: '',
    roomChoice: 'salaf',
  });

  const [registrationCode, setRegistrationCode] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (field: keyof RegistrationFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    const fieldKey = String(field);
    if (formErrors[fieldKey]) {
      setFormErrors((prev: Record<string, string>) => {
        const next = { ...prev };
        delete next[fieldKey];
        return next;
      });
    }
  };


  const validateStep1 = () => {
    const errors: { [key: string]: string } = {};
    if (!formData.fullName.trim()) errors.fullName = 'Nama lengkap wajib diisi';
    if (!formData.nik.trim() || formData.nik.length < 16) errors.nik = 'NIK harus 16 digit angka';
    if (!formData.birthPlace.trim()) errors.birthPlace = 'Tempat lahir wajib diisi';
    if (!formData.birthDate.trim()) errors.birthDate = 'Tanggal lahir wajib diisi';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateStep2 = () => {
    const errors: { [key: string]: string } = {};
    if (!formData.fatherName.trim()) errors.fatherName = 'Nama ayah wajib diisi';
    if (!formData.motherName.trim()) errors.motherName = 'Nama ibu wajib diisi';
    if (!formData.parentPhone.trim() || formData.parentPhone.length < 10) errors.parentPhone = 'Nomor WhatsApp valid wajib diisi';
    if (!formData.address.trim()) errors.address = 'Alamat lengkap wajib diisi';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (formStep === 1 && validateStep1()) {
      setFormStep(2);
    } else if (formStep === 2 && validateStep2()) {
      setFormStep(3);
    }
  };

  const handlePrev = () => {
    if (formStep > 1) setFormStep(prev => prev - 1);
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Generate Registration Code: e.g. PSB-SRG-2026-XXXX
    const randomCode = `PSB-SRG-26-${Math.floor(1000 + Math.random() * 9000)}`;
    setRegistrationCode(randomCode);
    setFormStep(4); // Success step
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <span className="text-xs uppercase font-bold tracking-widest text-[#0B5E3A] dark:text-emerald-400">
          Penerimaan Santri Baru (PSB) Tahun Ajaran 1447-1448 H / 2026-2027 M
        </span>
        <h1 className={`font-serif-heading text-3xl sm:text-4xl font-bold mt-1 ${
          darkMode ? 'text-emerald-100' : 'text-slate-900'
        }`}>
          Pendaftaran Santri Baru At-Taroqqy Sarang
        </h1>
        <p className="font-arabic text-lg text-[#C9A227] mt-1" dir="rtl">
          «طَلَبُ الْعِلْمِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِمٍ»
        </p>
        <p className="text-xs sm:text-sm text-slate-500 mt-2">
          Selamat datang calon penuntut ilmu syariat. Daftarkan putra-putri Anda untuk menimba sanad ilmu salaf di Sarang Rembang.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-6 border-b border-amber-900/15 scrollbar-none">
        <button
          onClick={() => setActiveTab('daftar')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'daftar'
              ? 'bg-[#0B5E3A] text-[#C9A227] shadow-sm border border-[#C9A227]/40'
              : darkMode
                ? 'bg-[#082a1b] text-emerald-200 hover:bg-emerald-900'
                : 'bg-white text-slate-700 hover:bg-amber-100/50 border border-amber-900/15'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Formulir Daftar Online</span>
        </button>

        <button
          onClick={() => setActiveTab('syarat')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'syarat'
              ? 'bg-[#0B5E3A] text-[#C9A227] shadow-sm border border-[#C9A227]/40'
              : darkMode
                ? 'bg-[#082a1b] text-emerald-200 hover:bg-emerald-900'
                : 'bg-white text-slate-700 hover:bg-amber-100/50 border border-amber-900/15'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Syarat & Berkas</span>
        </button>

        <button
          onClick={() => setActiveTab('alur')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'alur'
              ? 'bg-[#0B5E3A] text-[#C9A227] shadow-sm border border-[#C9A227]/40'
              : darkMode
                ? 'bg-[#082a1b] text-emerald-200 hover:bg-emerald-900'
                : 'bg-white text-slate-700 hover:bg-amber-100/50 border border-amber-900/15'
          }`}
        >
          <ArrowRight className="w-4 h-4" />
          <span>Alur & Prosedur</span>
        </button>

        <button
          onClick={() => setActiveTab('biaya')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'biaya'
              ? 'bg-[#0B5E3A] text-[#C9A227] shadow-sm border border-[#C9A227]/40'
              : darkMode
                ? 'bg-[#082a1b] text-emerald-200 hover:bg-emerald-900'
                : 'bg-white text-slate-700 hover:bg-amber-100/50 border border-amber-900/15'
          }`}
        >
          <DollarSign className="w-4 h-4" />
          <span>Rincian Biaya</span>
        </button>

        <button
          onClick={() => setActiveTab('faq')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'faq'
              ? 'bg-[#0B5E3A] text-[#C9A227] shadow-sm border border-[#C9A227]/40'
              : darkMode
                ? 'bg-[#082a1b] text-emerald-200 hover:bg-emerald-900'
                : 'bg-white text-slate-700 hover:bg-amber-100/50 border border-amber-900/15'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>Tanya Jawab (FAQ)</span>
        </button>

        <button
          onClick={() => setActiveTab('kontak')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'kontak'
              ? 'bg-[#0B5E3A] text-[#C9A227] shadow-sm border border-[#C9A227]/40'
              : darkMode
                ? 'bg-[#082a1b] text-emerald-200 hover:bg-emerald-900'
                : 'bg-white text-slate-700 hover:bg-amber-100/50 border border-amber-900/15'
          }`}
        >
          <Phone className="w-4 h-4" />
          <span>Kontak Panitia</span>
        </button>
      </div>

      {/* Tab Panels */}
      <div className={`rounded-2xl p-6 sm:p-10 border shadow-xs transition-colors ${
        darkMode ? 'bg-[#062417] border-emerald-900 text-slate-200' : 'bg-white border-amber-900/15 text-slate-800'
      }`}>
        
        {/* 1. FORM PENDAFTARAN ONLINE MULTI-STEP */}
        {activeTab === 'daftar' && (
          <div>
            
            {/* Step Indicators */}
            {formStep < 4 && (
              <div className="mb-8">
                <div className="flex items-center justify-between max-w-lg mx-auto">
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                      formStep >= 1 ? 'bg-[#0B5E3A] text-[#C9A227]' : 'bg-slate-200 text-slate-600'
                    }`}>
                      1
                    </div>
                    <span className="text-[11px] font-semibold mt-1">Data Calon Santri</span>
                  </div>

                  <div className={`flex-1 h-0.5 mx-2 ${formStep >= 2 ? 'bg-[#0B5E3A]' : 'bg-slate-200'}`} />

                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                      formStep >= 2 ? 'bg-[#0B5E3A] text-[#C9A227]' : 'bg-slate-200 text-slate-600'
                    }`}>
                      2
                    </div>
                    <span className="text-[11px] font-semibold mt-1">Orang Tua / Wali</span>
                  </div>

                  <div className={`flex-1 h-0.5 mx-2 ${formStep >= 3 ? 'bg-[#0B5E3A]' : 'bg-slate-200'}`} />

                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                      formStep >= 3 ? 'bg-[#0B5E3A] text-[#C9A227]' : 'bg-slate-200 text-slate-600'
                    }`}>
                      3
                    </div>
                    <span className="text-[11px] font-semibold mt-1">Pilihan Jenjang</span>
                  </div>
                </div>
              </div>
            )}

            {/* Step 1: Data Calon Santri */}
            {formStep === 1 && (
              <div className="max-w-2xl mx-auto space-y-4">
                <h3 className="font-serif-heading text-lg font-bold border-b pb-2 border-amber-900/15">
                  Langkah 1: Identitas Calon Santri
                </h3>

                <div>
                  <label className="block text-xs font-semibold mb-1">Nama Lengkap (Sesuai Akta / Ijazah) *</label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    placeholder="Contoh: Muhammad Ihsanuddin"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-emerald-900 bg-slate-50 dark:bg-emerald-950/40 focus:outline-hidden focus:border-[#0B5E3A]"
                  />
                  {formErrors.fullName && <p className="text-[11px] text-red-500 mt-1">{formErrors.fullName}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold mb-1">Nomor Induk Kependudukan (NIK) *</label>
                    <input
                      type="text"
                      maxLength={16}
                      value={formData.nik}
                      onChange={(e) => handleInputChange('nik', e.target.value)}
                      placeholder="16 digit NIK KK"
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-emerald-900 bg-slate-50 dark:bg-emerald-950/40 focus:outline-hidden focus:border-[#0B5E3A]"
                    />
                    {formErrors.nik && <p className="text-[11px] text-red-500 mt-1">{formErrors.nik}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1">Jenis Santri *</label>
                    <select
                      value={formData.gender}
                      onChange={(e) => handleInputChange('gender', e.target.value as 'putra' | 'putri')}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-emerald-900 bg-slate-50 dark:bg-emerald-950/40 focus:outline-hidden focus:border-[#0B5E3A]"
                    >
                      <option value="putra">Santri Putra (Baniin)</option>
                      <option value="putri">Santri Putri (Banaat)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold mb-1">Tempat Lahir *</label>
                    <input
                      type="text"
                      value={formData.birthPlace}
                      onChange={(e) => handleInputChange('birthPlace', e.target.value)}
                      placeholder="Contoh: Kudus"
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-emerald-900 bg-slate-50 dark:bg-emerald-950/40 focus:outline-hidden focus:border-[#0B5E3A]"
                    />
                    {formErrors.birthPlace && <p className="text-[11px] text-red-500 mt-1">{formErrors.birthPlace}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1">Tanggal Lahir *</label>
                    <input
                      type="date"
                      value={formData.birthDate}
                      onChange={(e) => handleInputChange('birthDate', e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-emerald-900 bg-slate-50 dark:bg-emerald-950/40 focus:outline-hidden focus:border-[#0B5E3A]"
                    />
                    {formErrors.birthDate && <p className="text-[11px] text-red-500 mt-1">{formErrors.birthDate}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">Asal Sekolah Sebelumnya</label>
                  <input
                    type="text"
                    value={formData.previousSchool}
                    onChange={(e) => handleInputChange('previousSchool', e.target.value)}
                    placeholder="Contoh: MTs Sunan Kudus / SMPN 1 Rembang"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-emerald-900 bg-slate-50 dark:bg-emerald-950/40 focus:outline-hidden focus:border-[#0B5E3A]"
                  />
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-6 py-2 rounded-xl bg-[#0B5E3A] hover:bg-[#08452a] text-[#C9A227] font-bold text-xs flex items-center gap-2 cursor-pointer transition shadow-xs"
                  >
                    <span>Lanjut ke Data Wali</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Data Orang Tua / Wali */}
            {formStep === 2 && (
              <div className="max-w-2xl mx-auto space-y-4">
                <h3 className="font-serif-heading text-lg font-bold border-b pb-2 border-amber-900/15">
                  Langkah 2: Identitas Orang Tua / Wali Santri
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold mb-1">Nama Ayah Kandung *</label>
                    <input
                      type="text"
                      value={formData.fatherName}
                      onChange={(e) => handleInputChange('fatherName', e.target.value)}
                      placeholder="Contoh: H. Abdul Ghofur"
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-emerald-900 bg-slate-50 dark:bg-emerald-950/40 focus:outline-hidden focus:border-[#0B5E3A]"
                    />
                    {formErrors.fatherName && <p className="text-[11px] text-red-500 mt-1">{formErrors.fatherName}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1">Nama Ibu Kandung *</label>
                    <input
                      type="text"
                      value={formData.motherName}
                      onChange={(e) => handleInputChange('motherName', e.target.value)}
                      placeholder="Contoh: Hj. Siti Fatimah"
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-emerald-900 bg-slate-50 dark:bg-emerald-950/40 focus:outline-hidden focus:border-[#0B5E3A]"
                    />
                    {formErrors.motherName && <p className="text-[11px] text-red-500 mt-1">{formErrors.motherName}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">Nomor WhatsApp Aktif Wali Santri *</label>
                  <input
                    type="tel"
                    value={formData.parentPhone}
                    onChange={(e) => handleInputChange('parentPhone', e.target.value)}
                    placeholder="081234567890 (Wajib aktif untuk konfirmasi panitia)"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-emerald-900 bg-slate-50 dark:bg-emerald-950/40 focus:outline-hidden focus:border-[#0B5E3A]"
                  />
                  {formErrors.parentPhone && <p className="text-[11px] text-red-500 mt-1">{formErrors.parentPhone}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">Alamat Lengkap Asal (RT/RW/Desa/Kecamatan/Kabupaten/Provinsi) *</label>
                  <textarea
                    rows={3}
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="Contoh: Dusun Kauman RT 03/RW 02, Desa Karangmangu, Kec. Sarang, Kab. Rembang, Jawa Tengah"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-emerald-900 bg-slate-50 dark:bg-emerald-950/40 focus:outline-hidden focus:border-[#0B5E3A]"
                  />
                  {formErrors.address && <p className="text-[11px] text-red-500 mt-1">{formErrors.address}</p>}
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="px-4 py-2 rounded-xl border border-slate-300 dark:border-emerald-900 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Kembali</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-6 py-2 rounded-xl bg-[#0B5E3A] hover:bg-[#08452a] text-[#C9A227] font-bold text-xs flex items-center gap-2 cursor-pointer transition shadow-xs"
                  >
                    <span>Lanjut ke Pilihan Jenjang</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Pilihan Jenjang & Konfirmasi */}
            {formStep === 3 && (
              <form onSubmit={handleFinalSubmit} className="max-w-2xl mx-auto space-y-4">
                <h3 className="font-serif-heading text-lg font-bold border-b pb-2 border-amber-900/15">
                  Langkah 3: Pilihan Jenjang Madrasah & Asrama
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold mb-1">Pilihan Jenjang Pendidikan *</label>
                    <select
                      value={formData.jenjang}
                      onChange={(e) => handleInputChange('jenjang', e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-emerald-900 bg-slate-50 dark:bg-emerald-950/40 focus:outline-hidden focus:border-[#0B5E3A]"
                    >
                      <option value="ibtidaiyah">Madrasah Ibtidaiyah Salafiyah (MIS)</option>
                      <option value="tsanawiyah">Madrasah Tsanawiyah Salafiyah (MTsS)</option>
                      <option value="aliyah">Madrasah Aliyah Salafiyah (MAS)</option>
                      <option value="mahad-aly">Ma'had Aly Takhassus Fiqh (S1)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1">Tipe Asrama</label>
                    <select
                      value={formData.roomChoice}
                      onChange={(e) => handleInputChange('roomChoice', e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-emerald-900 bg-slate-50 dark:bg-emerald-950/40 focus:outline-hidden focus:border-[#0B5E3A]"
                    >
                      <option value="salaf">Asrama Salafiyah Reguler (Mukim)</option>
                      <option value="tahfidz">Asrama Khusus Tahfidz Al-Qur'an</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">Riwayat Alergi / Catatan Kesehatan (Opsional)</label>
                  <input
                    type="text"
                    value={formData.healthNotes}
                    onChange={(e) => handleInputChange('healthNotes', e.target.value)}
                    placeholder="Contoh: Asma ringan, tidak ada alergi makanan"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-emerald-900 bg-slate-50 dark:bg-emerald-950/40 focus:outline-hidden focus:border-[#0B5E3A]"
                  />
                </div>

                {/* Surat Pernyataan */}
                <div className="p-3.5 rounded-xl border border-amber-900/20 bg-amber-500/5 text-xs space-y-2">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0B5E3A] shrink-0 mt-0.5" />
                    <p className="text-[11px] leading-relaxed text-slate-600 dark:text-slate-300">
                      Dengan menekan tombol kirim pendaftaran, orang tua/wali santri menyatakan telah bersedia menaati seluruh tata tertib pesantren salaf Sarang, mendukung sistem pendidikan salafiyah, dan membimbing santri dengan ikhlas.
                    </p>
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="px-4 py-2 rounded-xl border border-slate-300 dark:border-emerald-900 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Kembali</span>
                  </button>

                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[#C9A227] hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 cursor-pointer transition shadow-md"
                  >
                    <span>Kirim Formulir Pendaftaran</span>
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

            {/* Step 4: SUCCESS / BUKTI PENDAFTARAN TERCETAK */}
            {formStep === 4 && registrationCode && (
              <div className="max-w-2xl mx-auto text-center space-y-6">
                <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-300 flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0B5E3A] dark:text-emerald-400">
                    Alhamdulillah, Formulir Berhasil Dikirim!
                  </span>
                  <h2 className="font-serif-heading text-2xl font-bold mt-1">
                    Bukti Tanda Registrasi Santri Baru
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Simpan nomor registrasi di bawah ini untuk dibawa saat sowan pengasuh dan verifikasi berkas fisik.
                  </p>
                </div>

                {/* Printable Card */}
                <div className={`p-6 rounded-2xl border-2 border-dashed text-left space-y-3 ${
                  darkMode ? 'bg-[#082e1e] border-emerald-800' : 'bg-[#FAF7F0] border-amber-900/30'
                }`}>
                  <div className="flex items-center justify-between border-b pb-3 border-amber-900/15">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#C9A227]">Kode Registrasi Santri</span>
                      <h4 className="font-mono text-xl font-bold tracking-wider text-[#0B5E3A] dark:text-[#C9A227]">
                        {registrationCode}
                      </h4>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-[#0B5E3A] text-white flex items-center justify-center font-arabic text-xs font-bold">
                      سارانج
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div><strong>Nama Santri:</strong> {formData.fullName}</div>
                    <div><strong>NIK:</strong> {formData.nik}</div>
                    <div><strong>Jenis:</strong> {formData.gender === 'putra' ? 'Santri Putra' : 'Santri Putri'}</div>
                    <div><strong>Jenjang:</strong> {formData.jenjang.toUpperCase()}</div>
                    <div><strong>Wali Santri:</strong> {formData.fatherName}</div>
                    <div><strong>Kontak Wali:</strong> {formData.parentPhone}</div>
                  </div>

                  <div className="pt-2 border-t border-amber-900/15 text-[11px] text-slate-500">
                    Waktu Pendaftaran: {new Date().toLocaleDateString('id-ID', { dateStyle: 'full' })}
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="px-4 py-2 rounded-xl bg-[#0B5E3A] text-[#C9A227] font-bold text-xs flex items-center gap-1.5 cursor-pointer hover:bg-[#08452a] transition"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Cetak Bukti Pendaftaran</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setFormStep(1);
                      setRegistrationCode(null);
                    }}
                    className="px-4 py-2 rounded-xl border border-slate-300 dark:border-emerald-900 text-xs font-semibold cursor-pointer hover:bg-slate-100 dark:hover:bg-emerald-900"
                  >
                    Daftar Santri Lainnya
                  </button>
                </div>
              </div>
            )}

          </div>
        )}

        {/* 2. SYARAT & BERKAS PENDAFTARAN */}
        {activeTab === 'syarat' && (
          <div className="space-y-6">
            <h2 className="font-serif-heading text-xl sm:text-2xl font-bold">Persyaratan & Berkas Pendaftaran</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
              <div className="p-5 rounded-xl border border-slate-200 dark:border-emerald-900 space-y-3">
                <h3 className="font-bold text-[#0B5E3A] dark:text-[#C9A227] flex items-center gap-2 text-base">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Persyaratan Umum</span>
                </h3>
                <ul className="space-y-2 text-slate-600 dark:text-slate-300">
                  <li>• Beragama Islam dan berakhlakul karimah.</li>
                  <li>• Sanggup mematuhi undang-undang dan tata tertib pesantren salaf Sarang.</li>
                  <li>• Datang didampingi oleh orang tua/wali saat sowan pengasuh.</li>
                  <li>• Siap bertempat tinggal (mukim) di asrama pondok pesantren.</li>
                  <li>• Bersedia mengikuti kurikulum madrasah diniyah salafiyah secara berjenjang.</li>
                </ul>
              </div>

              <div className="p-5 rounded-xl border border-slate-200 dark:border-emerald-900 space-y-3">
                <h3 className="font-bold text-[#0B5E3A] dark:text-[#C9A227] flex items-center gap-2 text-base">
                  <FileText className="w-4 h-4" />
                  <span>Kelengkapan Berkas Fisik</span>
                </h3>
                <ul className="space-y-2 text-slate-600 dark:text-slate-300">
                  <li>• Fotokopi Kartu Keluarga (KK) 3 lembar.</li>
                  <li>• Fotokopi Akta Kelahiran 3 lembar.</li>
                  <li>• Fotokopi Ijazah / Surat Keterangan Lulus (SKL) legalisir 3 lembar.</li>
                  <li>• Pas foto ukuran 3x4 (berkopyah hitam bagi putra, berkerudung putih bagi putri) 4 lembar.</li>
                  <li>• Bukti cetak registrasi online / formulir pendaftaran fisik.</li>
                  <li>• Surat Keterangan Sehat dari dokter / Puskesmas.</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* 3. ALUR & PROSEDUR */}
        {activeTab === 'alur' && (
          <div className="space-y-6">
            <h2 className="font-serif-heading text-xl sm:text-2xl font-bold">Alur & Prosedur Pendaftaran</h2>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-xl border border-slate-200 dark:border-emerald-900">
                <div className="w-8 h-8 rounded-full bg-[#0B5E3A] text-white flex items-center justify-center font-bold text-xs shrink-0">1</div>
                <div>
                  <h4 className="font-bold text-sm">Pendaftaran Online / Mengisi Formulir</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Wali santri mengisi formulir pendaftaran online di website ini atau hadir langsung di kantor sekretariat PSB Sarang.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl border border-slate-200 dark:border-emerald-900">
                <div className="w-8 h-8 rounded-full bg-[#0B5E3A] text-white flex items-center justify-center font-bold text-xs shrink-0">2</div>
                <div>
                  <h4 className="font-bold text-sm">Sowan Khadimul Ma'had (Masyayikh)</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Calon santri dan wali hadir ke kediaman Masyayikh untuk meminta doa restu, penyerahan santri, dan akad tarbiyah salafiyah.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl border border-slate-200 dark:border-emerald-900">
                <div className="w-8 h-8 rounded-full bg-[#0B5E3A] text-white flex items-center justify-center font-bold text-xs shrink-0">3</div>
                <div>
                  <h4 className="font-bold text-sm">Verifikasi Berkas & Tes Penempatan Kelas (Tahdidul Mustawa)</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Tes membaca kitab gundul, Al-Qur'an, dan dasar tajwid untuk penentuan kelas madrasah (Ibtidaiyah, Tsanawiyah, atau Aliyah).</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl border border-slate-200 dark:border-emerald-900">
                <div className="w-8 h-8 rounded-full bg-[#0B5E3A] text-white flex items-center justify-center font-bold text-xs shrink-0">4</div>
                <div>
                  <h4 className="font-bold text-sm">Pembayaran Administrasi & Pengambilan Perlengkapan</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Penyelesaian infaq pangkal, seragam madrasah, kitab pegangan, dan pembagian kamar asrama.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 4. RINCIAN BIAYA */}
        {activeTab === 'biaya' && (
          <div className="space-y-6">
            <h2 className="font-serif-heading text-xl sm:text-2xl font-bold">Rincian Biaya Pendaftaran & Syahriyah</h2>
            <p className="text-xs text-slate-500">Prinsip biaya pesantren salaf adalah barakah dan terjangkau bagi seluruh lapisan umat.</p>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="bg-[#0B5E3A] text-white">
                    <th className="py-2.5 px-4 font-bold">Uraian Komponen</th>
                    <th className="py-2.5 px-4 font-bold w-48 text-right">Nominal (Rp)</th>
                    <th className="py-2.5 px-4 font-bold">Keterangan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-emerald-900">
                  <tr>
                    <td className="py-2 px-4 font-medium">Infaq Pendaftaran & Kartu Tanda Santri (KTS)</td>
                    <td className="py-2 px-4 text-right font-mono font-semibold">Rp 150.000</td>
                    <td className="py-2 px-4 text-slate-500">Satu kali saat pendaftaran</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 font-medium">Infaq Pembangunan Sarana & Gedung Asrama</td>
                    <td className="py-2 px-4 text-right font-mono font-semibold">Rp 1.200.000</td>
                    <td className="py-2 px-4 text-slate-500">Satu kali selama masa mukim</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 font-medium">Paket Kitab Turats Lengkap 1 Tahun Ajaran</td>
                    <td className="py-2 px-4 text-right font-mono font-semibold">Rp 450.000</td>
                    <td className="py-2 px-4 text-slate-500">Kitab kuning cetakan Maktabah Sarang</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 font-medium">Syahriyah Bulanan (Makan 3x sehari, listrik, air, madrasah)</td>
                    <td className="py-2 px-4 text-right font-mono font-semibold">Rp 400.000</td>
                    <td className="py-2 px-4 text-slate-500">Dibayarkan setiap awal bulan hijriyah</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 5. FAQ */}
        {activeTab === 'faq' && (
          <div className="space-y-6">
            <h2 className="font-serif-heading text-xl sm:text-2xl font-bold">Pertanyaan yang Sering Diajukan (FAQ)</h2>
            <div className="space-y-3">
              {REGISTRATION_FAQ.map((faq, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-slate-200 dark:border-emerald-900 space-y-1">
                  <h4 className="font-serif-heading font-bold text-sm text-[#0B5E3A] dark:text-[#C9A227]">
                    Q: {faq.question}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    A: {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6. KONTAK PANITIA */}
        {activeTab === 'kontak' && (
          <div className="space-y-6">
            <h2 className="font-serif-heading text-xl sm:text-2xl font-bold">Layanan Hotline Panitia PSB</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-5 rounded-xl border border-slate-200 dark:border-emerald-900 space-y-2">
                <span className="font-bold text-[#C9A227] uppercase">Hotline Panitia Putra (Baniin)</span>
                <p className="text-sm font-semibold">Ust. Ahmad Muzammil: 0812-3456-7890</p>
                <p className="text-slate-500">Melayani konsultasi berkas santri putra, sowan pengasuh, dan kamar asrama.</p>
              </div>
              <div className="p-5 rounded-xl border border-slate-200 dark:border-emerald-900 space-y-2">
                <span className="font-bold text-[#C9A227] uppercase">Hotline Panitia Putri (Banaat)</span>
                <p className="text-sm font-semibold">Usth. Siti Khadijah: 0813-9876-5432</p>
                <p className="text-slate-500">Melayani konsultasi asrama putri, aturan keputrian, dan jadwal tilik wali santri.</p>
              </div>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
