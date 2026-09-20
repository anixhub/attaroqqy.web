import React, { useState } from 'react';
import { Users, Search, CheckCircle, Clock, Eye, X } from 'lucide-react';
import { SantriRegistration } from '../../types';

interface PsbManageViewProps {
  darkMode?: boolean;
}

export const PsbManageView: React.FC<PsbManageViewProps> = ({ darkMode = false }) => {
  const [registrations, setRegistrations] = useState<SantriRegistration[]>([
    {
      regNumber: 'PSB-1447-0012',
      fullName: 'Muhammad Hilmi Al-Bantani',
      nik: '3201234567890001',
      pob: 'Serang',
      dob: '2008-05-14',
      gender: 'Laki-laki',
      phone: '081298765432',
      previousSchool: 'SMP Islam Terpadu Nurul Iman',
      chosenProgram: 'Aliyah',
      asramaChoice: 'Asrama Putra Pusat',
      fatherName: 'H. Abdul Ghofur',
      fatherOccupation: 'Wiraswasta',
      motherName: 'Hj. Siti Mariam',
      parentPhone: '081298765432',
      address: 'Jl. Raya Anyer KM 5',
      village: 'Cibeber',
      district: 'Cilegon',
      regency: 'Cilegon',
      province: 'Banten',
      submittedAt: '18 Jan 2026',
      status: 'Terverifikasi',
    },
    {
      regNumber: 'PSB-1447-0013',
      fullName: 'Ahmad Faiz Mubarok',
      nik: '3317123456780002',
      pob: 'Rembang',
      dob: '2010-08-22',
      gender: 'Laki-laki',
      phone: '085234567890',
      previousSchool: 'MI Salafiyah Sarang',
      chosenProgram: 'Tsanawiyah',
      asramaChoice: 'Asrama Tahfidz',
      fatherName: 'K.H. Masruhin',
      fatherOccupation: 'Pendidik / Tokoh Agama',
      motherName: 'Ustadzah Aminah',
      parentPhone: '085234567890',
      address: 'Jl. Karangmangu No. 12',
      village: 'Karangmangu',
      district: 'Sarang',
      regency: 'Rembang',
      province: 'Jawa Tengah',
      submittedAt: '19 Jan 2026',
      status: 'Diterima',
    },
    {
      regNumber: 'PSB-1447-0014',
      fullName: 'Zainal Abidin Robbani',
      nik: '3524123456780003',
      pob: 'Lamongan',
      dob: '2004-11-10',
      gender: 'Laki-laki',
      phone: '087812345678',
      previousSchool: 'Pondok Pesantren Al-Falah Ploso',
      chosenProgram: "Ma'had Aly",
      asramaChoice: "Asrama Ma'had Aly",
      fatherName: 'Drs. Subhan Hadi',
      fatherOccupation: 'PNS',
      motherName: 'Fatimah Az-Zahra',
      parentPhone: '087812345678',
      address: 'Desa Paciran Gang 4',
      village: 'Paciran',
      district: 'Paciran',
      regency: 'Lamongan',
      province: 'Jawa Timur',
      submittedAt: '20 Jan 2026',
      status: 'Menunggu Verifikasi',
    },
  ]);

  const [search, setSearch] = useState('');
  const [selectedReg, setSelectedReg] = useState<SantriRegistration | null>(null);

  const filtered = registrations.filter(r =>
    r.fullName.toLowerCase().includes(search.toLowerCase()) ||
    r.regNumber.toLowerCase().includes(search.toLowerCase()) ||
    r.chosenProgram.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold font-serif-heading">
            Data Pendaftaran Santri Baru (PSB Online)
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Penerimaan Santri Baru Tahun Ajaran 1447–1448 H / 2026–2027 M
          </p>
        </div>
      </div>

      {/* Filter */}
      <div className={`p-4 rounded-2xl border shadow-xs ${
        darkMode ? 'bg-[#062417] border-emerald-900/60' : 'bg-white border-slate-200'
      }`}>
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari No. Registrasi atau Nama Santri..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-emerald-900/80 bg-slate-50 dark:bg-emerald-950/40 focus:outline-hidden focus:border-[#0B5E3A]"
          />
        </div>
      </div>

      {/* Table */}
      <div className={`rounded-2xl border shadow-xs overflow-hidden ${
        darkMode ? 'bg-[#062417] border-emerald-900/60' : 'bg-white border-slate-200'
      }`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className={`border-b font-semibold uppercase tracking-wider text-[11px] ${
              darkMode ? 'bg-emerald-950/60 text-emerald-300 border-emerald-900/60' : 'bg-slate-50 text-slate-600 border-slate-200'
            }`}>
              <tr>
                <th className="py-3 px-4 sm:px-6">No. Registrasi</th>
                <th className="py-3 px-4">Nama Lengkap</th>
                <th className="py-3 px-4">Jenjang Diniyah</th>
                <th className="py-3 px-4">Asrama</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Detail</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-emerald-900/40">
              {filtered.map(item => (
                <tr key={item.regNumber} className="hover:bg-slate-50/70 dark:hover:bg-emerald-950/40">
                  <td className="py-3.5 px-4 sm:px-6 font-mono font-bold text-slate-900 dark:text-emerald-200">
                    {item.regNumber}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-slate-800 dark:text-slate-100">
                    {item.fullName}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200 text-xs font-medium">
                      {item.chosenProgram}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-xs text-slate-500">
                    {item.asramaChoice}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      item.status === 'Diterima'
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        : item.status === 'Terverifikasi'
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                        : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      type="button"
                      onClick={() => setSelectedReg(item)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-[#0B5E3A] hover:bg-slate-100 dark:hover:bg-emerald-950 cursor-pointer"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Detail */}
      {selectedReg && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className={`w-full max-w-lg rounded-2xl border p-6 shadow-2xl transition-colors ${
            darkMode ? 'bg-[#062417] border-emerald-900 text-slate-200' : 'bg-white border-slate-200 text-slate-800'
          }`}>
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-emerald-900/60 mb-4">
              <h3 className="font-serif-heading font-bold text-base">Detail Calon Santri</h3>
              <button
                type="button"
                onClick={() => setSelectedReg(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-slate-400 block">No. Registrasi:</span>
                  <span className="font-mono font-bold">{selectedReg.regNumber}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Tanggal Daftar:</span>
                  <span>{selectedReg.submittedAt}</span>
                </div>
              </div>

              <div>
                <span className="text-slate-400 block">Nama Lengkap:</span>
                <span className="font-bold text-sm">{selectedReg.fullName}</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-slate-400 block">Tempat, Tanggal Lahir:</span>
                  <span>{selectedReg.pob}, {selectedReg.dob}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">NIK:</span>
                  <span className="font-mono">{selectedReg.nik}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-slate-400 block">Nama Ayah / Wali:</span>
                  <span>{selectedReg.fatherName} ({selectedReg.fatherOccupation})</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Nomor Telepon:</span>
                  <span>{selectedReg.parentPhone}</span>
                </div>
              </div>

              <div>
                <span className="text-slate-400 block">Alamat Asal:</span>
                <span>{selectedReg.address}, {selectedReg.village}, {selectedReg.district}, {selectedReg.regency}, {selectedReg.province}</span>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedReg(null)}
                className="px-4 py-2 rounded-xl bg-[#0B5E3A] text-[#C9A227] font-bold text-xs cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
