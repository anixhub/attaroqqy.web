export type ActivePage = 
  | 'beranda'
  | 'profil'
  | 'pendidikan'
  | 'syaikhuna'
  | 'kajian'
  | 'artikel'
  | 'galeri'
  | 'pendaftaran'
  | 'kontak';

export type ProfilSubPage = 
  | 'sekilas'
  | 'visi-misi'
  | 'pengasuh'
  | 'asatidz-santri'
  | 'sarana'
  | 'lingkungan';

export type PendidikanSubPage = 
  | 'kurikulum'
  | 'rutinitas'
  | 'ibtidaiyah'
  | 'tsanawiyah'
  | 'aliyah'
  | 'mahad-aly';

export type SyaikhunaSubPage = 
  | 'biografi'
  | 'mawaidh'
  | 'keluarga';

export type KajianCategory = 
  | 'semua'
  | 'bahtsul-masail'
  | 'durus'
  | 'hikmah'
  | 'nisaiyat'
  | 'resensi-kitab';

export interface Article {
  id: string;
  title: string;
  slug: string;
  category: KajianCategory | 'berita' | 'pengumuman';
  categoryLabel: string;
  author: string;
  authorRole?: string;
  date: string;
  hijriDate: string;
  readTime: string;
  thumbnail: string;
  summary: string;
  content: string;
  arabicSnippet?: {
    text: string;
    source: string;
    translation: string;
  };
  tags: string[];
  views: number;
  featured?: boolean;
  status?: 'published' | 'draft' | 'archived';
}

export interface MawaidhItem {
  id: string;
  arabicText: string;
  translation: string;
  sourceSpeaker: string;
  context: string;
  audioDuration?: string;
}

export interface VideoItem {
  id: string;
  title: string;
  speaker: string;
  kitab: string;
  duration: string;
  youtubeId: string;
  date: string;
  thumbnail: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Kegiatan' | 'Ngaji' | 'Fasilitas' | 'Haflah' | 'Roan';
  imageUrl: string;
  caption: string;
  date: string;
}

export interface SantriRegistration {
  regNumber: string;
  fullName: string;
  nik: string;
  pob: string;
  dob: string;
  gender: 'Laki-laki' | 'Perempuan';
  phone: string;
  previousSchool: string;
  chosenProgram: 'Ibtidaiyah' | 'Tsanawiyah' | 'Aliyah' | 'Ma\'had Aly';
  asramaChoice: 'Asrama Putra Pusat' | 'Asrama Tahfidz' | 'Asrama Putri Khodijah' | 'Asrama Ma\'had Aly';
  fatherName: string;
  fatherOccupation: string;
  motherName: string;
  parentPhone: string;
  address: string;
  village: string;
  district: string;
  regency: string;
  province: string;
  submittedAt: string;
  status: 'Menunggu Verifikasi' | 'Terverifikasi' | 'Diterima';
}

export interface RegistrationFormData {
  fullName: string;
  nik: string;
  gender: 'putra' | 'putri';
  birthPlace: string;
  birthDate: string;
  jenjang: 'ibtidaiyah' | 'tsanawiyah' | 'aliyah' | 'mahad-aly';
  fatherName: string;
  motherName: string;
  parentPhone: string;
  address: string;
  previousSchool: string;
  healthNotes: string;
  roomChoice: 'salaf' | 'tahfidz';
}

