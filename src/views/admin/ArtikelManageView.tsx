import React, { useState, useEffect } from 'react';
import {
  Plus,
  Search,
  Edit3,
  Trash2,
  Eye,
  CheckCircle,
  Clock,
  Archive,
  BookOpen,
  Filter,
  X,
  Save,
  AlertTriangle,
  RefreshCw,
  Sparkles,
} from 'lucide-react';
import { Article, KajianCategory } from '../../types';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';

interface ArtikelManageViewProps {
  initialArticles: Article[];
  onArticlesChange?: (articles: Article[]) => void;
  onPreviewArticle?: (article: Article) => void;
  darkMode?: boolean;
}

export const ArtikelManageView: React.FC<ArtikelManageViewProps> = ({
  initialArticles,
  onArticlesChange,
  onPreviewArticle,
  darkMode = false,
}) => {
  const [articles, setArticles] = useState<Article[]>(() => {
    // Ensure all articles have a status
    return initialArticles.map((art, idx) => ({
      ...art,
      status: art.status || (idx % 4 === 3 ? 'draft' : 'published'),
    }));
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Modal State for Add/Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);

  // Delete confirmation modal
  const [deletingArticle, setDeletingArticle] = useState<Article | null>(null);

  // Form states
  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState<string>('bahtsul-masail');
  const [formAuthor, setFormAuthor] = useState('LBM At-Taroqqy Sarang');
  const [formStatus, setFormStatus] = useState<'published' | 'draft' | 'archived'>('published');
  const [formThumbnail, setFormThumbnail] = useState('https://images.unsplash.com/photo-1585036156171-384164a8c675?w=800&auto=format&fit=crop&q=80');
  const [formSummary, setFormSummary] = useState('');
  const [formContent, setFormContent] = useState('');
  const [formArabicText, setFormArabicText] = useState('');
  const [formArabicSource, setFormArabicSource] = useState('');

  // Fetch from Supabase if configured
  const loadArticlesFromSupabase = async () => {
    if (!isSupabaseConfigured) return;
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data && data.length > 0) {
        // Map database fields to Article format if needed
        const mapped: Article[] = data.map((item) => ({
          id: String(item.id),
          title: item.title,
          slug: item.slug || item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          category: item.category || 'bahtsul-masail',
          categoryLabel: item.category_label || item.category || 'Kajian',
          author: item.author || 'Dewan Asatidz',
          date: item.date || new Date().toISOString().split('T')[0],
          hijriDate: item.hijri_date || '1447 H',
          readTime: item.read_time || '5 mnt baca',
          thumbnail: item.thumbnail || 'https://images.unsplash.com/photo-1585036156171-384164a8c675?w=800&auto=format&fit=crop&q=80',
          summary: item.summary || '',
          content: item.content || '',
          arabicSnippet: item.arabic_text ? {
            text: item.arabic_text,
            source: item.arabic_source || '',
            translation: item.arabic_translation || '',
          } : undefined,
          tags: Array.isArray(item.tags) ? item.tags : ['Pesantren', 'Sarang'],
          views: item.views || 0,
          status: item.status || 'published',
        }));
        setArticles(mapped);
        if (onArticlesChange) onArticlesChange(mapped);
      }
    } catch (err: any) {
      console.warn('Note: Could not query Supabase articles table:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArticlesFromSupabase();
  }, []);

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  // Open Form to Add New Article
  const handleOpenAddModal = () => {
    setEditingArticle(null);
    setFormTitle('');
    setFormCategory('bahtsul-masail');
    setFormAuthor('LBM At-Taroqqy Sarang');
    setFormStatus('published');
    setFormThumbnail('https://images.unsplash.com/photo-1585036156171-384164a8c675?w=800&auto=format&fit=crop&q=80');
    setFormSummary('');
    setFormContent('');
    setFormArabicText('');
    setFormArabicSource('');
    setIsModalOpen(true);
  };

  // Open Form to Edit existing article
  const handleOpenEditModal = (article: Article) => {
    setEditingArticle(article);
    setFormTitle(article.title);
    setFormCategory(article.category);
    setFormAuthor(article.author);
    setFormStatus(article.status || 'published');
    setFormThumbnail(article.thumbnail);
    setFormSummary(article.summary);
    setFormContent(article.content);
    setFormArabicText(article.arabicSnippet?.text || '');
    setFormArabicSource(article.arabicSnippet?.source || '');
    setIsModalOpen(true);
  };

  // Save Article (Create / Update)
  const handleSaveArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) {
      showNotification('error', 'Judul artikel wajib diisi');
      return;
    }

    setLoading(true);

    const categoryLabels: Record<string, string> = {
      'bahtsul-masail': 'Bahtsul Masail',
      'durus': 'Durus Turats',
      'hikmah': 'Untaian Hikmah',
      'nisaiyat': 'Fiqih Nisaiyat',
      'resensi-kitab': 'Resensi Kitab',
      'berita': 'Warta Pesantren',
      'pengumuman': 'Pengumuman',
    };

    const newSlug = formTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const savedArticle: Article = {
      id: editingArticle ? editingArticle.id : `art-${Date.now()}`,
      title: formTitle.trim(),
      slug: newSlug || `artikel-${Date.now()}`,
      category: formCategory as KajianCategory | 'berita' | 'pengumuman',
      categoryLabel: categoryLabels[formCategory] || 'Kajian Salaf',
      author: formAuthor.trim() || 'Redaksi At-Taroqqy',
      date: editingArticle ? editingArticle.date : new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
      hijriDate: editingArticle ? editingArticle.hijriDate : 'Rajab 1447 H',
      readTime: '4 mnt baca',
      thumbnail: formThumbnail.trim() || 'https://images.unsplash.com/photo-1585036156171-384164a8c675?w=800&auto=format&fit=crop&q=80',
      summary: formSummary.trim(),
      content: formContent.trim() || formSummary.trim(),
      arabicSnippet: formArabicText.trim() ? {
        text: formArabicText.trim(),
        source: formArabicSource.trim() || 'Naskah Kitab Turats',
        translation: '',
      } : undefined,
      tags: ['Sarang', 'Turats', 'Fiqih'],
      views: editingArticle ? editingArticle.views : 0,
      status: formStatus,
    };

    try {
      if (isSupabaseConfigured) {
        // Attempt Supabase Upsert
        const dbPayload = {
          title: savedArticle.title,
          slug: savedArticle.slug,
          category: savedArticle.category,
          category_label: savedArticle.categoryLabel,
          author: savedArticle.author,
          summary: savedArticle.summary,
          content: savedArticle.content,
          thumbnail: savedArticle.thumbnail,
          status: savedArticle.status,
          arabic_text: savedArticle.arabicSnippet?.text || null,
          arabic_source: savedArticle.arabicSnippet?.source || null,
          updated_at: new Date().toISOString(),
        };

        if (editingArticle && !editingArticle.id.startsWith('art-')) {
          await supabase.from('articles').update(dbPayload).eq('id', editingArticle.id);
        } else {
          await supabase.from('articles').insert([{ ...dbPayload, created_at: new Date().toISOString() }]);
        }
      }

      // Update Local State
      let updatedList: Article[];
      if (editingArticle) {
        updatedList = articles.map(a => a.id === editingArticle.id ? savedArticle : a);
        showNotification('success', `Artikel "${savedArticle.title}" berhasil diperbarui.`);
      } else {
        updatedList = [savedArticle, ...articles];
        showNotification('success', `Artikel baru "${savedArticle.title}" berhasil diterbitkan.`);
      }

      setArticles(updatedList);
      if (onArticlesChange) onArticlesChange(updatedList);
      setIsModalOpen(false);
    } catch (err: any) {
      console.error('Error saving article:', err);
      showNotification('error', `Gagal menyimpan: ${err.message || 'Periksa koneksi database'}`);
    } finally {
      setLoading(false);
    }
  };

  // Delete Article
  const handleConfirmDelete = async () => {
    if (!deletingArticle) return;
    setLoading(true);

    try {
      if (isSupabaseConfigured && !deletingArticle.id.startsWith('art-')) {
        await supabase.from('articles').delete().eq('id', deletingArticle.id);
      }

      const updatedList = articles.filter(a => a.id !== deletingArticle.id);
      setArticles(updatedList);
      if (onArticlesChange) onArticlesChange(updatedList);
      showNotification('success', `Artikel "${deletingArticle.title}" telah dihapus.`);
    } catch (err: any) {
      console.error('Delete error:', err);
      showNotification('error', `Gagal menghapus: ${err.message}`);
    } finally {
      setLoading(false);
      setDeletingArticle(null);
    }
  };

  // Filtered list
  const filteredArticles = articles.filter((art) => {
    const matchesSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      categoryFilter === 'all' || art.category === categoryFilter;

    const matchesStatus =
      statusFilter === 'all' || (art.status || 'published') === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case 'draft':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
            <Clock className="w-3 h-3" />
            <span>Draf</span>
          </span>
        );
      case 'archived':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-300 dark:border-slate-700">
            <Archive className="w-3 h-3" />
            <span>Arsip</span>
          </span>
        );
      case 'published':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
            <CheckCircle className="w-3 h-3" />
            <span>Terbit</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {notification && (
        <div
          className={`p-4 rounded-xl border flex items-center justify-between text-xs sm:text-sm font-semibold shadow-md transition-all ${
            notification.type === 'success'
              ? 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-200 dark:border-emerald-800'
              : 'bg-red-100 text-red-900 border-red-300 dark:bg-red-950 dark:text-red-200 dark:border-red-800'
          }`}
        >
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>{notification.message}</span>
          </div>
          <button
            type="button"
            onClick={() => setNotification(null)}
            className="p-1 hover:opacity-75 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Top Banner Stats & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold font-serif-heading">
            Daftar Artikel & Kajian Turats
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Total {articles.length} naskah & warta terdaftar ({articles.filter(a => a.status !== 'draft').length} Terbit, {articles.filter(a => a.status === 'draft').length} Draf)
          </p>
        </div>

        <div className="flex items-center gap-2">
          {isSupabaseConfigured && (
            <button
              type="button"
              onClick={loadArticlesFromSupabase}
              disabled={loading}
              title="Sinkronkan dengan Supabase"
              className="p-2.5 rounded-xl border border-slate-300 dark:border-emerald-900/80 hover:bg-slate-100 dark:hover:bg-emerald-950/60 text-slate-600 dark:text-slate-300 transition cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-[#0B5E3A]' : ''}`} />
            </button>
          )}

          <button
            type="button"
            onClick={handleOpenAddModal}
            className="px-4 py-2.5 rounded-xl bg-[#0B5E3A] hover:bg-[#08452a] text-[#C9A227] font-bold text-xs sm:text-sm flex items-center gap-2 cursor-pointer transition shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Artikel Baru</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className={`p-4 rounded-2xl border shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between ${
        darkMode ? 'bg-[#062417] border-emerald-900/60' : 'bg-white border-slate-200'
      }`}>
        {/* Search input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari judul, penulis, atau isi..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-emerald-900/80 bg-slate-50 dark:bg-emerald-950/40 focus:outline-hidden focus:border-[#0B5E3A]"
          />
        </div>

        {/* Filter selects */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 shrink-0">
            <Filter className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Filter:</span>
          </div>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-emerald-900/80 bg-slate-50 dark:bg-emerald-950/40 focus:outline-hidden focus:border-[#0B5E3A]"
          >
            <option value="all">Semua Kategori</option>
            <option value="bahtsul-masail">Bahtsul Masail</option>
            <option value="durus">Durus Turats</option>
            <option value="hikmah">Untaian Hikmah</option>
            <option value="nisaiyat">Fiqih Nisaiyat</option>
            <option value="resensi-kitab">Resensi Kitab</option>
            <option value="berita">Warta Berita</option>
            <option value="pengumuman">Pengumuman</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-emerald-900/80 bg-slate-50 dark:bg-emerald-950/40 focus:outline-hidden focus:border-[#0B5E3A]"
          >
            <option value="all">Semua Status</option>
            <option value="published">Terbit (Published)</option>
            <option value="draft">Draf (Draft)</option>
            <option value="archived">Arsip (Archived)</option>
          </select>
        </div>
      </div>

      {/* Main Table Listing */}
      <div className={`rounded-2xl border shadow-xs overflow-hidden ${
        darkMode ? 'bg-[#062417] border-emerald-900/60' : 'bg-white border-slate-200'
      }`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className={`border-b font-semibold uppercase tracking-wider text-[11px] ${
              darkMode
                ? 'bg-emerald-950/60 text-emerald-300 border-emerald-900/60'
                : 'bg-slate-50 text-slate-600 border-slate-200'
            }`}>
              <tr>
                <th scope="col" className="py-3.5 px-4 sm:px-6">
                  Judul & Penulis
                </th>
                <th scope="col" className="py-3.5 px-4">
                  Kategori
                </th>
                <th scope="col" className="py-3.5 px-4">
                  Tanggal
                </th>
                <th scope="col" className="py-3.5 px-4 text-center">
                  Status
                </th>
                <th scope="col" className="py-3.5 px-4 sm:px-6 text-right">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-emerald-900/40">
              {filteredArticles.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-500 dark:text-slate-400">
                    <BookOpen className="w-8 h-8 mx-auto text-slate-400 mb-2 opacity-60" />
                    <p className="font-semibold">Tidak ada artikel yang sesuai.</p>
                    <p className="text-xs mt-0.5">Coba ubah kata kunci pencarian atau filter kategori.</p>
                  </td>
                </tr>
              ) : (
                filteredArticles.map((article) => (
                  <tr
                    key={article.id}
                    className={`transition hover:bg-slate-50/70 dark:hover:bg-emerald-950/40`}
                  >
                    {/* Judul & Info */}
                    <td className="py-4 px-4 sm:px-6">
                      <div className="flex items-start gap-3 max-w-md">
                        <img
                          src={article.thumbnail}
                          alt={article.title}
                          className="w-12 h-12 rounded-lg object-cover shrink-0 border border-slate-200 dark:border-emerald-900/60"
                        />
                        <div className="min-w-0">
                          <h3 className="font-bold text-slate-900 dark:text-emerald-100 line-clamp-1 leading-snug">
                            {article.title}
                          </h3>
                          <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                            <span>Oleh: <strong className="font-medium text-slate-700 dark:text-slate-300">{article.author}</strong></span>
                            {article.arabicSnippet && (
                              <span className="px-1.5 py-0.2 rounded-sm bg-[#C9A227]/20 text-[#C9A227] text-[10px] font-serif">
                                Turats Arab
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Kategori */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/80 text-[#0B5E3A] dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                        {article.categoryLabel}
                      </span>
                    </td>

                    {/* Tanggal */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="text-xs font-medium">{article.date}</div>
                      <div className="text-[11px] text-slate-400 font-serif">{article.hijriDate}</div>
                    </td>

                    {/* Status */}
                    <td className="py-4 px-4 text-center whitespace-nowrap">
                      {getStatusBadge(article.status)}
                    </td>

                    {/* Aksi */}
                    <td className="py-4 px-4 sm:px-6 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        {onPreviewArticle && (
                          <button
                            type="button"
                            onClick={() => onPreviewArticle(article)}
                            title="Pratinjau Artikel"
                            className="p-1.5 rounded-lg text-slate-500 hover:text-[#0B5E3A] hover:bg-slate-100 dark:hover:bg-emerald-950/60 transition cursor-pointer"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => handleOpenEditModal(article)}
                          title="Edit Artikel"
                          className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/40 transition cursor-pointer"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeletingArticle(article)}
                          title="Hapus Artikel"
                          className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL: Tambah / Edit Artikel */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className={`w-full max-w-3xl rounded-2xl border shadow-2xl overflow-hidden transition-colors ${
            darkMode ? 'bg-[#062417] border-emerald-900 text-slate-200' : 'bg-white border-slate-200 text-slate-800'
          }`}>
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-200 dark:border-emerald-900/60 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#C9A227]" />
                <h3 className="font-serif-heading font-bold text-base sm:text-lg">
                  {editingArticle ? 'Edit Naskah Artikel & Kajian' : 'Tambah Artikel Baru'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSaveArticle} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              <div>
                <label className="block text-xs font-semibold mb-1">
                  Judul Artikel / Kajian *
                </label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="Contoh: Keputusan Bahtsul Masail: Hukum Muamalah Keuangan Digital Kontemporer"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 dark:border-emerald-900/80 bg-slate-50 dark:bg-emerald-950/40 focus:outline-hidden focus:border-[#0B5E3A]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1">Kategori Kajian</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-emerald-900/80 bg-slate-50 dark:bg-emerald-950/40 focus:outline-hidden focus:border-[#0B5E3A]"
                  >
                    <option value="bahtsul-masail">Bahtsul Masail</option>
                    <option value="durus">Durus Turats</option>
                    <option value="hikmah">Untaian Hikmah</option>
                    <option value="nisaiyat">Fiqih Nisaiyat</option>
                    <option value="resensi-kitab">Resensi Kitab</option>
                    <option value="berita">Warta Berita</option>
                    <option value="pengumuman">Pengumuman</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">Penulis / Lajnah</label>
                  <input
                    type="text"
                    required
                    value={formAuthor}
                    onChange={(e) => setFormAuthor(e.target.value)}
                    placeholder="LBM At-Taroqqy Sarang"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-emerald-900/80 bg-slate-50 dark:bg-emerald-950/40 focus:outline-hidden focus:border-[#0B5E3A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">Status Publikasi</label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-emerald-900/80 bg-slate-50 dark:bg-emerald-950/40 focus:outline-hidden focus:border-[#0B5E3A]"
                  >
                    <option value="published">Terbit (Published)</option>
                    <option value="draft">Draf (Draft)</option>
                    <option value="archived">Arsip (Archived)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">URL Gambar Thumbnail</label>
                <input
                  type="url"
                  value={formThumbnail}
                  onChange={(e) => setFormThumbnail(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-emerald-900/80 bg-slate-50 dark:bg-emerald-950/40 focus:outline-hidden focus:border-[#0B5E3A]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Ringkasan / Intisari (Summary) *</label>
                <textarea
                  rows={2}
                  required
                  value={formSummary}
                  onChange={(e) => setFormSummary(e.target.value)}
                  placeholder="Tuliskan intisari pembahasan 1-2 kalimat untuk kartu artikel..."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-emerald-900/80 bg-slate-50 dark:bg-emerald-950/40 focus:outline-hidden focus:border-[#0B5E3A]"
                />
              </div>

              {/* Kutipan Turats Arab (Optional) */}
              <div className="p-4 rounded-xl border border-amber-300/40 dark:border-emerald-900/60 bg-amber-50/40 dark:bg-emerald-950/20 space-y-3">
                <span className="text-xs font-bold text-[#0B5E3A] dark:text-[#C9A227] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Kutipan Naskah Kitab Kuning / Turats Arab (Opsional)</span>
                </span>
                <div>
                  <textarea
                    rows={2}
                    dir="rtl"
                    value={formArabicText}
                    onChange={(e) => setFormArabicText(e.target.value)}
                    placeholder="نَصُّ العِبَارَةِ مِنَ الكِتَابِ..."
                    className="w-full font-serif text-sm px-3 py-2 rounded-xl border border-amber-200 dark:border-emerald-900 bg-white dark:bg-emerald-950/40 focus:outline-hidden focus:border-[#0B5E3A]"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    value={formArabicSource}
                    onChange={(e) => setFormArabicSource(e.target.value)}
                    placeholder="Sumber Maraji': Fathul Wahhab juz 1 hal. 140 / Ianatut Thalibin"
                    className="w-full px-3 py-1.5 text-xs rounded-xl border border-amber-200 dark:border-emerald-900 bg-white dark:bg-emerald-950/40 focus:outline-hidden focus:border-[#0B5E3A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Isi Artikel Lengkap *</label>
                <textarea
                  rows={7}
                  required
                  value={formContent}
                  onChange={(e) => setFormContent(e.target.value)}
                  placeholder="Tuliskan naskah kajian lengkap, dalil, pembahasan, dan kesimpulan hukum..."
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 dark:border-emerald-900/80 bg-slate-50 dark:bg-emerald-950/40 focus:outline-hidden focus:border-[#0B5E3A]"
                />
              </div>

              {/* Modal Footer */}
              <div className="pt-4 border-t border-slate-200 dark:border-emerald-900/60 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 dark:border-emerald-900/80 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-emerald-950/40 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 rounded-xl bg-[#0B5E3A] hover:bg-[#08452a] text-[#C9A227] font-bold text-xs flex items-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  <span>{loading ? 'Menyimpan...' : 'Simpan Naskah'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CONFIRM DELETE MODAL */}
      {deletingArticle && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className={`w-full max-w-md rounded-2xl border p-6 shadow-2xl transition-colors ${
            darkMode ? 'bg-[#062417] border-emerald-900 text-slate-200' : 'bg-white border-slate-200 text-slate-800'
          }`}>
            <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-950/60 text-red-600 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <h3 className="font-serif-heading font-bold text-base text-center">
              Hapus Artikel Ini?
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 text-center mt-1">
              Apakah Anda yakin ingin menghapus artikel <strong>"{deletingArticle.title}"</strong>? Tindakan ini tidak dapat dibatalkan.
            </p>

            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setDeletingArticle(null)}
                className="px-4 py-2 rounded-xl border border-slate-300 dark:border-emerald-900/80 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-emerald-950/40 cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                disabled={loading}
                className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs cursor-pointer shadow-md disabled:opacity-50"
              >
                {loading ? 'Menghapus...' : 'Ya, Hapus'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
