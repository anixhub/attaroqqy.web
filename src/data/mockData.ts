import { Article, MawaidhItem, VideoItem, GalleryItem } from '../types';

export const PESANTREN_INFO = {
  name: 'Pondok Pesantren At-Taroqqy Sarang',
  arabicName: 'معهد الترقي الإسلامي السلفي بسارانج',
  tagline: 'Mencetak Generasi Mutafaqqih fid-Din, Berakhlaqul Karimah, dan Berpegang Teguh pada Tradisi Salafus Shalih',
  address: 'Jl. Raya Pantura Sarang KM 12, Desa Karangmangu, Kec. Sarang, Kab. Rembang, Jawa Tengah 59274',
  phone: '(0295) 8620-112',
  whatsapp: '+62 812-3456-7890',
  email: 'sekretariat@attaroqqy-sarang.sch.id',
  mapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.341492025686!2d111.637821!3d-6.852028!2m3!1f0!2f0!3f0!3m2!1i1024!2f768!4f13.1!3m3!1m2!1s0x2e773c3333333333%3A0x123456789abcdef!2sSarang%2C%20Rembang!5e0!3m2!1sid!2sid!4v1690000000000!5m2!1sid!2sid',
  socialMedia: {
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
    telegram: 'https://telegram.org',
    twitter: 'https://twitter.com',
    youtube: 'https://youtube.com',
  },
  stats: {
    santri: 4850,
    asatidz: 185,
    alumni: 32000,
    foundedYear: 1958,
  }
};

export const ANNOUNCEMENTS = [
  'Penerimaan Santri Baru (PSB) Tahun Ajaran 1448-1449 H / 2026-2027 M Gelombang I Resmi Dibuka mulai 1 Syawal - 25 Dzulqa\'dah 1447 H.',
  'Musyawarah Kubro Se-Jawa Madura Forum Bahtsul Masail Santri Sarang akan diselenggarakan pada Ahad Kliwon mendatang di Aula Utama.',
  'Jadwal Pengajian Pasaran Ramadhan Kitab Ihya\' Ulumiddin bersama Syaikhina KH. Abdullah Faqih Sarang disiarkan live di YouTube resmi.',
  'Peringatan Haul Akbar Masyayikh Sarang & Reuni Alumni Nasional: Mohon konfirmasi kehadiran ke koordinator wilayah masing-masing.'
];

export const ARTICLES: Article[] = [
  {
    id: 'art-1',
    title: 'Musyawarah Bahtsul Masail Santri: Tinjauan Fiqih Madzhab Syafi\'i Terhadap Transaksi Paylater dan Pay-Flex',
    slug: 'bahtsul-masail-paylater-fiqih-syafii',
    category: 'bahtsul-masail',
    categoryLabel: 'Bahtsul Masail',
    author: 'LBM (Lembaga Bahtsul Masail) At-Taroqqy',
    authorRole: 'Tim Perumus Fiqih',
    date: '20 September 2026',
    hijriDate: '9 Rabi\'ul Awwal 1448 H',
    readTime: '6 menit',
    thumbnail: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=1200&q=80',
    summary: 'Kajian mendalam terhadap skema talangan pinjaman berjangka paylater yang marak di era digital ditinjau dari bab Qordh dan Dlaman dalam kitab Bughyatul Mustarsyidin dan Fathul Wahhab.',
    content: `Musyawarah Bahtsul Masail Wustho yang dihelat pada Ahad malam di Maktabah Turats membahas fenomena transaksi pembiayaan digital berjangka (Paylater). Dalam tinjauan madzhab Syafi'i, setiap akad pinjaman (qardh) yang mensyaratkan adanya tambahan nilai finansial baik berdalih denda keterlambatan maupun biaya administrasi yang melebihi biaya operasional riil dapat terjerumus pada qardh jarr-a manfa'atan yang diharamkan.

Para musyawirin merujuk ibarat yang termaktub dalam kitab Nihayatul Muhtaj juz 4 halaman 231:
"كل قرض شرط فيه أجل أو نفع للمقرض فهو ربا محرم"
Artinya: Setiap piutang yang dipersyaratkan di dalamnya tempo atau manfaat bagi pihak pemberi piutang, maka ia tergolong riba yang diharamkan.

Namun demikian, apabila skema yang digunakan adalah Murabahah bil Wakalah atau Ijarah bil Khidmah yang terbebas dari klausul bunga dan denda ribawi, maka status keabsahannya dapat ditoleransi dengan syarat terpenuhinya rukun serah terima (qabdh) yang sah menurut syarak.`,
    arabicSnippet: {
      text: 'كُلُّ قَرْضٍ جَرَّ مَنْفَعَةً لِلْمُقْرِضِ فَهُوَ رِبًا مُحَرَّمٌ بِإِجْمَاعِ الْعُلَمَاءِ',
      source: 'Nihayatul Muhtaj Syarah al-Minhaj, Bab al-Qardh',
      translation: 'Setiap akad pinjaman yang mendatangkan kemanfaatan bersyarat bagi pihak yang meminjamkan adalah riba yang diharamkan menurut kesepakatan ulama.'
    },
    tags: ['Bahtsul Masail', 'Fiqih Muamalah', 'Ekonomi Islam', 'Kitab Kuning'],
    views: 3420,
    featured: true,
  },
  {
    id: 'art-2',
    title: 'Keberkahan Mudzakarah Kitab Fathul Qorib: Menjaga Tradisi Ngaji Sorogan di Tengah Arus Modernitas',
    slug: 'keberkahan-mudzakarah-fathul-qorib-sarang',
    category: 'durus',
    categoryLabel: 'Durus',
    author: 'Ust. M. Ridwan As-Sarani',
    authorRole: 'Pengajar Madrasah Tsanawiyah',
    date: '18 September 2026',
    hijriDate: '7 Rabi\'ul Awwal 1448 H',
    readTime: '5 menit',
    thumbnail: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80',
    summary: 'Metode sorogan dan wetonan bukan sekadar transfer ilmu pengetahuan, melainkan transmisi barakah sanad dan penempaan adab santri kepada masayikh.',
    content: `Di pesisir utara Sarang, rembang petang selalu diiringi gumam santri yang melafalkan matan Taqrib dan syarah Fathul Qorib karya Syaikh Ibnu Qasim al-Ghazi. Sorogan adalah jantungnya pesantren salaf. Santri membaca langsung di hadapan kiai, membedah tarkib nahwu, sharaf, dan ketepatan pemaknaan pego gandul.

Kunci dari metode ini adalah ketundukan akal di hadapan sanad. Seorang santri tidak sekadar menghafal teks, melainkan menyerap akhlak guru saat membuka lembaran kitab kuning yang harum bau dupa dan kertas kuning khas timur tengah.`,
    arabicSnippet: {
      text: 'مَنْ تَفَقَّهَ مِنْ غَيْرِ أُسْتَاذٍ كَانَ خَطَؤُهُ أَكْثَرَ مِنْ صَوَابِهِ',
      source: 'Adab al-Alim wa al-Muta\'allim, Hadratusy Syaikh Hasyim Asy\'ari',
      translation: 'Barangsiapa mendalami fiqih tanpa bimbingan guru, maka kesalahannya akan jauh lebih banyak daripada kebenarannya.'
    },
    tags: ['Sorogan', 'Fathul Qorib', 'Salafiyah', 'Pendidikan Pesantren'],
    views: 2840,
    featured: true,
  },
  {
    id: 'art-3',
    title: 'Dawuh Syaikhina: Hakikat Tawadhu\' Santri Ketika Pulang ke Kampung Halaman Membawa Bekal Akhlak',
    slug: 'hakikat-tawadhu-santri-kampung-halaman',
    category: 'hikmah',
    categoryLabel: 'Hikmah',
    author: 'Dewan Redaksi Warta Sarang',
    authorRole: 'Redaksi Buletin',
    date: '15 September 2026',
    hijriDate: '4 Rabi\'ul Awwal 1448 H',
    readTime: '4 menit',
    thumbnail: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=1200&q=80',
    summary: 'Nasehat berharga Syaikhina kepada para santri akhir: ukuran keberhasilan mondok bukanlah titel yang mentereng, melainkan kemanfaatan hidup bagi umat.',
    content: `Dalam pengajian pasaran ba'da Ashar, Syaikhina berwasiat kepada para santri: "Nek mulih nang omah, ojo rumongso wis pinter. Kudhungo kloso, andhap asor marang wong tuwo lan tonggo teparo." Nasehat dalam bahasa Jawa halus ini sarat dengan makna tarbiyah ruhiyyah.

Kepandaian mengurai bait Alfiyah Ibnu Malik tidak ada harganya bila lisan gemar mencela dan hati merasa lebih suci daripada sesama hamba Allah. Ilmu yang berkah adalah ilmu yang membuahkan rasa takut kepada Allah Ta'ala (khasyyah).`,
    arabicSnippet: {
      text: 'إِنَّمَا يَخْشَى اللَّهَ مِنْ عِبَادِهِ الْعُلَمَاءُ',
      source: 'QS. Fathir: 28',
      translation: 'Sesungguhnya yang paling takut kepada Allah di antara hamba-hamba-Nya hanyalah para ulama (orang yang berilmu).'
    },
    tags: ['Mawaidh', 'Akhlak', 'Nasehat Santri', 'Hikmah'],
    views: 4120,
    featured: true,
  },
  {
    id: 'art-4',
    title: 'Nisaiyat: Panduan Menghitung Siklus Haid, Suci, dan Tanda-Tanda Istihadhah Menurut Kitab Sullamul Munajat',
    slug: 'panduan-fiqih-wanita-haid-istihadhah',
    category: 'nisaiyat',
    categoryLabel: 'Nisaiyat',
    author: 'Nyai Hj. Masruroh',
    authorRole: 'Pengasuh Asrama Putri Khodijah',
    date: '12 September 2026',
    hijriDate: '1 Rabi\'ul Awwal 1448 H',
    readTime: '7 menit',
    thumbnail: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80',
    summary: 'Pembedahan praktis kasus darah istihadhah bagi wanita muslimah: cara menetapkan adat, membedakan darah kuat dan lemah (tamyiz), serta kewajiban ibadah shalat dan puasa.',
    content: `Kajian keputrian di pesantren salaf memiliki kurikulum khusus yang mengkaji bab dima'ul jibillah (darah haid, nifas, dan istihadhah). Kitab-kitab rujukan seperti Risalatul Mahidh, Uqudul Lujjayn, dan Sullamul Munajat dikaji secara rinci dengan contoh kalender bulanan.

Bagi seorang mustahadhah, penentuan status darah mengacu pada 7 klasifikasi, apakah ia mubtadi'ah mumayyizah, mu'tadah ghoiru mumayyizah, atau mutahayyirah. Pemahaman ini mutlak dibutuhkan agar ibadah sholat harian tidak terbengkalai akibat keraguan.`,
    arabicSnippet: {
      text: 'أَقَلُّ الْحَيْضِ يَوْمٌ وَلَيْلَةٌ وَأَكْثَرُهُ خَمْسَةَ عَشَرَ يَوْمًا وَغَالِبُهُ سِتٌّ أَوْ سَبْعٌ',
      source: 'Matan Ghoyah wa al-Taqrib, Fiqih Thaharah',
      translation: 'Paling sedikit masa haid adalah sehari semalam (24 jam), paling lama lima belas hari lima belas malam, dan umumnya enam atau tujuh hari.'
    },
    tags: ['Nisaiyat', 'Fiqih Wanita', 'Haid', 'Keputrian'],
    views: 3190,
    featured: false,
  },
  {
    id: 'art-5',
    title: 'Resensi Kitab: Menyelami Samudra Ushul Fiqih Lewat Jam\'ul Jawami\' Karya Imam Tajuddin As-Subki',
    slug: 'resensi-kitab-jamul-jawami-ushul-fiqih',
    category: 'resensi-kitab',
    categoryLabel: 'Resensi Kitab',
    author: 'Agus Ahmad Zainal Muttaqin',
    authorRole: 'Dosen Ma\'had Aly At-Taroqqy',
    date: '10 September 2026',
    hijriDate: '28 Shafar 1448 H',
    readTime: '8 menit',
    thumbnail: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=1200&q=80',
    summary: 'Bedah struktur kitab masterpiece Jam\'ul Jawami\' yang merangkum ratusan kitab ushul fiqih dari madzhab Syafi\'i, Maliki, dan Hanafi menjadi rujukan wajib thalibul ilmi tingkat tinggi.',
    content: `Kitab Jam'ul Jawami' karya al-Imam Tajuddin Abdul Wahhab as-Subki adalah karya puncak dalam khazanah Ushul Fiqih Ahlussunnah wal Jama'ah. Kitab ini menjadi bacaan wajib para santri tingkat marhalah tsaniyah dan kelas musyawarah tinggi di Sarang.

Dengan gaya bahasa yang sangat padat, lugas, dan matang, as-Subki menyintesis pandangan mutakallimin dan fuqaha dengan komparasi dalil yang tajam. Siapa saja yang menguasai kitab ini beserta hasyiyah al-Bannani atau al-Attar, niscaya terbukalah pintu logika istimbath hukum kontemporer.`,
    arabicSnippet: {
      text: 'وَهَذَا كِتَابٌ جَمَعْتُ فِيهِ زُبْدَةَ مَا فِي الْمُخْتَصَرَاتِ وَالْمَبْسُوطَاتِ فِي أُصُولِ الْفِقْهِ',
      source: 'Muqaddimah Jam\'ul Jawami\', Imam Tajuddin As-Subki',
      translation: 'Dan inilah kitab yang kuhimpun di dalamnya inti sari apa yang termuat dalam kitab-kitab ringkasan dan uraian luas dalam ilmu Ushul Fiqih.'
    },
    tags: ['Resensi Kitab', 'Ushul Fiqih', 'Turats', 'Jamul Jawami'],
    views: 1980,
    featured: false,
  },
  {
    id: 'art-6',
    title: 'Pemberitahuan Resmi: Alur Pendaftaran Santri Baru (PSB) Tahun Ajaran 1448-1449 H Melalui Portal Online',
    slug: 'pengumuman-psb-santri-baru-2026',
    category: 'pengumuman',
    categoryLabel: 'Pengumuman',
    author: 'Panitia PSB At-Taroqqy Sarang',
    authorRole: 'Sekretariat PSB',
    date: '5 September 2026',
    hijriDate: '23 Shafar 1448 H',
    readTime: '3 menit',
    thumbnail: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80',
    summary: 'Informasi komprehensif bagi calon santri dan wali santri mengenai pembagian kuota madrasah, batas waktu pengisian formulir online, dan prosedur sowan silaturahmi.',
    content: `Sehubungan dengan tingginya animo masyarakat dari berbagai pelosok negeri untuk menuntut ilmu di Pondok Pesantren At-Taroqqy Sarang Rembang, Panitia Penerimaan Santri Baru mengumumkan bahwa sistem pendaftaran online kini telah terintegrasi penuh.

Calon santri dapat mengisi formulir pada menu "Pendaftaran Online", mengunggah berkas berupa Kartu Keluarga dan Surat Keterangan Lulus, serta mencetak kartu registrasi mandiri untuk dibawa saat sowan pengasuh.`,
    tags: ['PSB', 'Pendaftaran', 'Santri Baru', 'Pengumuman'],
    views: 5210,
    featured: true,
  },
  {
    id: 'art-7',
    title: 'Peringatan Haflah Khotmil Qur\'an wa Kutubit Turats ke-68 Dihadiri Ribuan Jamaah dan Masyayikh Sepuh',
    slug: 'haflah-khotmil-quran-kutubit-turats-ke-68',
    category: 'berita',
    categoryLabel: 'Berita',
    author: 'Lembaga Pers Santri (LPS)',
    authorRole: 'Warta Pesantren',
    date: '2 September 2026',
    hijriDate: '20 Shafar 1448 H',
    readTime: '4 menit',
    thumbnail: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=1200&q=80',
    summary: 'Suasana haru dan khusyuk menyelimuti halaman utama pondok saat wisuda 420 santri penghafal Al-Quran dan 310 khatimin kitab Ihya Ulumiddin dan Shahih Bukhari.',
    content: `Ribuan pasang mata wali santri tak kuasa menahan air mata haru tatkala ratusan wisudawan berbaris rapi mengenakan surban dan jubah putih melantunkan bait-bait syi'ir doa khataman. Acara yang dimulai sejak pagi hari diawali dengan pembacaan tahlil akbar untuk muassis pesantren.

Dalam tausiyahnya, Syaikhina berpesan agar para alumni senantiasa menjaga shalat berjamaah, dawam membaca wirid, dan tidak silau dengan gemerlap materi duniawi.`,
    tags: ['Haflah', 'Wisuda Santri', 'Khotmil Quran', 'Berita'],
    views: 6730,
    featured: false,
  }
];

export const MAWAIDH_ITEMS: MawaidhItem[] = [
  {
    id: 'maw-1',
    arabicText: 'تَعَلَّمْ فَإِنَّ الْعِلْمَ زَيْنٌ لِأَهْلِهِ # وَفَضْلٌ وَعُنْوَانٌ لِكُلِّ مَحَامِدِ ، وَكُنْ مُسْتَفِيدًا كُلَّ يَوْمٍ زِيَادَةً # مِنَ الْعِلْمِ وَاسْبَحْ فِي بُحُورِ الْفَوَائِدِ',
    translation: '"Belajarlah, sesungguhnya ilmu adalah perhiasan bagi pemiliknya, keutamaan dan tanda bagi setiap hal yang terpuji. Jadilah engkau orang yang setiap hari mengambil faidah tambahan ilmu dan berenanglah di samudra faedah."',
    sourceSpeaker: 'Kutipan Nadzom Ta\'limul Muta\'allim (Sering didawuhkan Syaikhina)',
    context: 'Disampaikan saat pembukaan Tahun Ajaran Baru di hadapan ribuan santri Sarang',
    audioDuration: '02:45'
  },
  {
    id: 'maw-2',
    arabicText: 'مَنْ لَمْ يَذُقْ ذُلَّ التَّعَلُّمِ سَاعَةً # تَجَرَّعَ ذُلَّ الْجَهْلِ طُولَ حَيَاتِهِ',
    translation: '"Barangsiapa yang tidak mau merasakan hinanya menuntut ilmu walau sesaat, maka ia akan meneguk hinanya kebodohan sepanjang hayatnya."',
    sourceSpeaker: 'Imam Asy-Syafi\'i rahimahullah - Wejangan Syaikhul Ma\'had',
    context: 'Nasehat penyemangat bagi santri tingkat Ibtidaiyah yang baru belajar makna gandul',
    audioDuration: '01:50'
  },
  {
    id: 'maw-3',
    arabicText: 'لَا يُدْرَكُ الْعِلْمُ إِلَّا بِالصَّبْرِ عَلَى الْمَشَقَّةِ ، وَمَنْ جَاهَدَ نَفْسَهُ فِي سَبِيلِ اللَّهِ هَدَاهُ اللَّهُ سُبُلَ الرَّشَادِ',
    translation: '"Ilmu tidak akan diraih kecuali dengan kesabaran atas segala kepayahan hidup di pondok. Dan barangsiapa yang bersungguh-sungguh memerangi hawa nafsunya di jalan Allah, niscaya Allah akan membimbingnya ke jalan petunjuk."',
    sourceSpeaker: 'KH. Abdullah Faqih Sarang (Pengasuh Pondok Pesantren At-Taroqqy)',
    context: 'Wejangan khusus saat pengajian kilatan pasaran bulan suci Ramadhan',
    audioDuration: '03:15'
  }
];

export const VIDEOS: VideoItem[] = [
  {
    id: 'vid-1',
    title: 'Ngaji Bandongan Kitab Ihya\' Ulumiddin Bab Adab Thalabul Ilmi bersama Syaikhina',
    speaker: 'Syaikhina KH. Abdullah Faqih Sarang',
    kitab: 'Ihya Ulumiddin - Imam Al-Ghazali',
    duration: '1:14:20',
    youtubeId: 'dQw4w9WgXcQ',
    date: '19 September 2026',
    thumbnail: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'vid-2',
    title: 'Kajian Fathul Wahhab: Syarah Matan Minhajut Thullab - Bab Peradilan dan Saksi',
    speaker: 'KH. M. Syakir Shodiq (Wakil Pengasuh)',
    kitab: 'Fathul Wahhab - Syaikh Zakariya al-Anshari',
    duration: '58:45',
    youtubeId: 'dQw4w9WgXcQ',
    date: '16 September 2026',
    thumbnail: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'vid-3',
    title: 'Dokumenter Haflah Khotmil Qur\'an wa Kutubit Turats Pondok Pesantren Sarang',
    speaker: 'Lembaga Pers Santri & Multimedia',
    kitab: 'Dokumenter Resmi',
    duration: '24:10',
    youtubeId: 'dQw4w9WgXcQ',
    date: '10 September 2026',
    thumbnail: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'vid-4',
    title: 'Musyawarah Kubro Bahtsul Masail Se-Jawa Madura: Diskusi Fiqih Kontemporer',
    speaker: 'Forum Bahtsul Masail As-Salafi',
    kitab: 'Kumpulan Kitab Mu\'tabarah',
    duration: '1:45:00',
    youtubeId: 'dQw4w9WgXcQ',
    date: '4 September 2026',
    thumbnail: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=800&q=80'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Pengajian Bandongan Akbar Kitab Shahih Bukhari Ba\'da Shubuh di Masjid Jami\'',
    category: 'Ngaji',
    imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=80',
    caption: 'Ratusan santri tekun menyimak dan memberi makna pegon gandul pada lembaran kitab turats.',
    date: 'September 2026'
  },
  {
    id: 'gal-2',
    title: 'Wisuda Haflah Akhir Sanah Santri Tahfidzul Qur\'an dan Kutubit Turats',
    category: 'Haflah',
    imageUrl: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=900&q=80',
    caption: 'Para wisudawan berbaris khidmat menerima syahadah sanad dari Masayikh Sarang.',
    date: 'Agustus 2026'
  },
  {
    id: 'gal-3',
    title: 'Kegiatan Ro\'an Akbar (Kerja Bakti Bersih Lingkungan) Santri Pesisir Sarang',
    category: 'Roan',
    imageUrl: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=900&q=80',
    caption: 'Tradisi gotong royong dan menjaga kesucian sarana ibadah menjadi pilar penempaan akhlak santri.',
    date: 'September 2026'
  },
  {
    id: 'gal-4',
    title: 'Musyawarah Wustho Bahtsul Masail Kitab Fathul Qorib Malam Hari',
    category: 'Kegiatan',
    imageUrl: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=900&q=80',
    caption: 'Adu argumen ilmiah menggunakan ibarat kitab mu\'tabarah dalam memecahkan problematika kekinian.',
    date: 'Agustus 2026'
  },
  {
    id: 'gal-5',
    title: 'Maktabah Turats: Perpustakaan Kitab Salaf dengan Koleksi Manuskrip Kuno',
    category: 'Fasilitas',
    imageUrl: 'https://images.unsplash.com/photo-1507842229450-76905959e3f5?auto=format&fit=crop&w=900&q=80',
    caption: 'Ruang riset santri memuat ribuan jilid kitab kuning dari berbagai disiplin keilmuan Islam.',
    date: 'Juli 2026'
  },
  {
    id: 'gal-6',
    title: 'Lalaran Nadzom Alfiyah Ibnu Malik Santri Madrasah Aliyah Menjelang Ujian',
    category: 'Kegiatan',
    imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=900&q=80',
    caption: 'Suara ritmis pelantunan 1000 bait nahwu sharaf bergema di serambi asrama santri.',
    date: 'September 2026'
  }
];

export const DAILY_ROUTINE = [
  { time: '03.30 - 04.30', activity: 'Bangun Tidur, Shalat Tahajjud, Qiyamul Lail & Dzikir Pagi', location: 'Masjid & Kamar Masing-masing' },
  { time: '04.30 - 05.15', activity: 'Shalat Shubuh Berjamaah & Wirid Ratib al-Haddad', location: 'Masjid Jami\' Pesantren' },
  { time: '05.15 - 06.45', activity: 'Pengajian Bandongan Kitab Hadits / Tafsir bersama Pengasuh', location: 'Serambi Masjid Utama' },
  { time: '06.45 - 07.30', activity: 'Makan Pagi, Mandi, Ro\'an Ringan & Persiapan Masuk Kelas', location: 'Dapur & Asrama' },
  { time: '07.30 - 11.45', activity: 'KBM Madrasah Diniyah Salafiyah (Sesuai Tingkatan Kelas)', location: 'Gedung Madrasah' },
  { time: '11.45 - 12.45', activity: 'Shalat Dhuhur Berjamaah & Wetonan Kitab Fiqih', location: 'Masjid Jami\'' },
  { time: '12.45 - 14.30', activity: 'Qoilulah (Istirahat Siang) & Muthala\'ah Kitab Mandiri', location: 'Kamar Asrama' },
  { time: '14.30 - 15.00', activity: 'Persiapan Shalat Ashar Berjamaah', location: 'Masjid' },
  { time: '15.00 - 16.45', activity: 'Pengajian Sorogan Al-Qur\'an / Kitab Kuning per Kelompok Asatidz', location: 'Serambi & Aula' },
  { time: '16.45 - 17.30', activity: 'Olahraga Sore, Mandi, & Persiapan Menuju Maghrib', location: 'Halaman Pondok' },
  { time: '17.30 - 18.30', activity: 'Shalat Maghrib Berjamaah & Pengajian Bandongan Akbar Syaikhina', location: 'Masjid Jami\'' },
  { time: '18.30 - 19.30', activity: 'Makan Malam & Shalat Isya\' Berjamaah', location: 'Asrama & Masjid' },
  { time: '19.30 - 21.00', activity: 'Lalaran Nadzom (Jurumiyah, Imrithi, Alfiyah) Bersama', location: 'Halaman & Gedung Sekolah' },
  { time: '21.00 - 23.00', activity: 'Musyawarah Kelas / Bahtsul Masail / Bedah Mas\'alah Fiqhiyyah', location: 'Bilik Musyawarah' },
  { time: '23.00 - 03.30', activity: 'Tidur Malam (Wajib Matikan Lampu & Hening)', location: 'Kamar Asrama' }
];

export const EDUCATION_LEVELS = [
  {
    level: 'Madrasah Ibtidaiyah Salafiyah (MIS)',
    duration: '6 Tahun',
    target: 'Santri Pemula (Tingkat Dasar)',
    curriculum: 'Penguasaan baca tulis Al-Quran bil tartil, hafalan juz 30, dasar nahwu (Jurumiyah, Matan Bina), fiqih ibadah (Mabadi Fiqhiyyah, Safinatun Najah), akhlak (Taisirul Khalaq).',
    color: 'emerald'
  },
  {
    level: 'Madrasah Tsanawiyah Salafiyah (MTsS)',
    duration: '3 Tahun',
    target: 'Tingkat Menengah Pertama',
    curriculum: 'Pendalaman tata bahasa Arab (Nadzom Imrithi, Maqshud), fiqih muamalah (Fathul Qorib al-Mujib), tarikh Islam (Khulashah Nurul Yaqin), tauhid (Aqidatul Awam, Tijan ad-Darari), hadits (Arba\'in Nawawiyah).',
    color: 'amber'
  },
  {
    level: 'Madrasah Aliyah Salafiyah (MAS)',
    duration: '3 Tahun',
    target: 'Tingkat Menengah Atas',
    curriculum: 'Penguasaan gramatika tingkat mahir (Alfiyah Ibnu Malik 1000 bait), fiqih komprehensif (Fathul Wahhab, Fathul Mu\'in), ushul fiqih (Al-Waraqat, Lathaiful Isyarat), balaghah (Jauharul Maknun), musthalahul hadits (Baiquniyah).',
    color: 'teal'
  },
  {
    level: 'Ma\'had Aly At-Taroqqy (Pendidikan Tinggi Pesantren)',
    duration: '4 Tahun (S1/Marhalah Ula)',
    target: 'Takhassus Fiqh & Ushul Fiqh',
    curriculum: 'Kajian kitab standar mufti dan mujtahid: Jam\'ul Jawami\', Al-Majmu\' Syarah al-Muhadzdzab, Nihayatul Muhtaj, Qawaidul Fiqhiyyah (Al-Asybah wan Nazhair karya Imam As-Suyuthi), serta penulisan risalah ilmiah turats.',
    color: 'indigo'
  }
];

export const PSB_FEES = [
  { item: 'Infaq Pembangunan Asrama & Sarana (Sekali selama masa mondok)', amount: 'Rp 1.500.000' },
  { item: 'Pendaftaran & Ujian Penempatan Kelas Madrasah', amount: 'Rp 150.000' },
  { item: 'Kitab Pegangan Semester 1 & Buku Santri', amount: 'Rp 450.000' },
  { item: 'Seragam Resmi Pondok & Kain Sarung Pesantren (2 Stel)', amount: 'Rp 350.000' },
  { item: 'Syahriyah (Iuran Bulanan Pendidikan & Fasilitas)', amount: 'Rp 120.000 / bulan' },
  { item: 'Konsumsi Dapur Santri (Makan 3x sehari sehat higienis)', amount: 'Rp 450.000 / bulan' },
];

export const FAQ_ITEMS = [
  {
    q: 'Apakah santri baru diwajibkan sudah bisa membaca tulisan Arab pegon?',
    a: 'Tidak diwajibkan. Bagi santri baru yang belum menguasai Arab pegon (makna gandul Jawa), pesantren menyediakan kelas matrikulasi khusus I\'dad Lughawi selama 2 bulan pertama.'
  },
  {
    q: 'Bagaimana prosedur sowan kepada Pengasuh untuk calon santri baru?',
    a: 'Calon santri didampingi orang tua/wali wajib sowan ke ndalem Pengasuh setelah mengisi formulir online dan mencetak bukti registrasi, berpakaian sopan (putra: sarung, koko putih, peci hitam; putri: gamis longgar, jilbab syar\'i).'
  },
  {
    q: 'Apakah santri diperbolehkan membawa gawai (handphone/laptop)?',
    a: 'Sesuai tata tertib salaf demi kekhusyukan mudzakarah ilmu, santri dilarang keras membawa gawai. Komunikasi dengan wali santri difasilitasi melalui sambungan wartel kantor pesantren setiap jadwal sambangan.'
  },
  {
    q: 'Kapan jadwal sambangan (kunjungan orang tua/wali santri)?',
    a: 'Kunjungan wali santri dibuka sebulan dua kali pada hari Jum\'at Pahing dan Jum\'at Kliwon, mulai pukul 08.00 hingga 16.30 WIB.'
  }
];

export const REGISTRATION_FAQ = FAQ_ITEMS.map(f => ({
  question: f.q,
  answer: f.a
}));

