import { useState } from "react";
import { Plus, Edit2, Trash2, Briefcase, Calendar } from "lucide-react";
import { useExperiences } from "../hooks/useExperiences";
import type { ExperiencePayload } from "../api/experience.api";

export default function ExperienceCard() {
  const { experiences, loading, error, addExperience, editExperience, removeExperience } = useExperiences();
  const [showModal, setShowModal] = useState(false);
  const [editingExpId, setEditingExpId] = useState<number | null>(null);
  const [formData, setFormData] = useState<ExperiencePayload>({
    job_title: "",
    company_name: "",
    start_date: "",
    end_date: "",
    is_current: false,
    description: ""
  });
  const [submitting, setSubmitting] = useState(false);

  const handleAddExperience = () => {
    setEditingExpId(null);
    setFormData({
      job_title: "",
      company_name: "",
      start_date: "",
      end_date: "",
      is_current: false,
      description: ""
    });
    setShowModal(true);
  };

  const handleEditExperience = (exp: any) => {
    setEditingExpId(exp.id);
    setFormData({
      job_title: exp.job_title,
      company_name: exp.company_name,
      start_date: exp.start_date.substring(0, 7),
      end_date: exp.end_date ? exp.end_date.substring(0, 7) : "",
      is_current: exp.is_current,
      description: exp.description
    });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.job_title.trim() || !formData.company_name.trim()) {
      alert("Posisi dan perusahaan tidak boleh kosong!");
      return;
    }

    try {
      setSubmitting(true);

      const payload = {
        ...formData,
        start_date: formData.start_date + "-01",
        end_date: formData.is_current ? null : (formData.end_date ? formData.end_date + "-01" : null)
      };

      if (editingExpId) {
        await editExperience(editingExpId, payload);
      } else {
        await addExperience(payload);
      }

      setShowModal(false);
      setFormData({
        job_title: "",
        company_name: "",
        start_date: "",
        end_date: "",
        is_current: false,
        description: ""
      });
    } catch (err: any) {
      console.error("Error saving experience:", err);
      alert(err.response?.data?.detail || "Gagal menyimpan pengalaman");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteExperience = async (id: number) => {
    if (!confirm("Yakin ingin menghapus pengalaman ini?")) return;

    try {
      await removeExperience(id);
    } catch (err: any) {
      console.error("Error deleting experience:", err);
      alert(err.response?.data?.detail || "Gagal menghapus pengalaman");
    }
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 md:p-8 animate-pulse">
        <div className="flex justify-between items-center mb-8">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-40"></div>
        </div>
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="h-32 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 md:p-8">
        <div className="flex justify-center items-center h-32">
          <p className="text-red-500 dark:text-red-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 md:p-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Pengalaman</h2>
          </div>
          <button
            onClick={handleAddExperience}
            className="flex items-center gap-1.5 bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-all hover:scale-105 shadow-sm"
          >
            <Plus size={16} />
            <span className="hidden md:inline">Tambah Pengalaman</span>
          </button>
        </div>

        <div className="space-y-4">
          {experiences.length > 0 ? (
            experiences.map((exp) => (
              <div key={exp.id} className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5 border border-gray-200 dark:border-gray-600 hover:shadow-md transition-all group">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-1">{exp.job_title}</h3>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">{exp.company_name}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                      <Calendar size={14} />
                      <span>{exp.start_date} - {exp.is_current ? <span className="text-green-600 dark:text-green-400 font-medium">Sekarang</span> : exp.end_date}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleEditExperience(exp)}
                      className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteExperience(exp.id)}
                      className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                      title="Hapus"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                {exp.description && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-3 leading-relaxed">{exp.description}</p>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-gray-50 dark:bg-gray-700/30 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600">
              <Briefcase className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-3" />
              <p className="text-gray-500 dark:text-gray-400 mb-2">Belum ada pengalaman yang ditambahkan</p>
              <p className="text-sm text-gray-400 dark:text-gray-500">Klik "Tambah Pengalaman" untuk menambahkan pengalaman baru</p>
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-up">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-gray-700">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              {editingExpId ? "Edit Pengalaman" : "Tambah Pengalaman Baru"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Posisi/Jabatan
                </label>
                <input
                  type="text"
                  value={formData.job_title}
                  onChange={(e) => setFormData({ ...formData, job_title: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all"
                  placeholder="Contoh: Full Stack Developer"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Perusahaan/Organisasi
                </label>
                <input
                  type="text"
                  value={formData.company_name}
                  onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all"
                  placeholder="Contoh: PT Teknologi Nusantara"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tanggal Mulai
                </label>
                <input
                  type="month"
                  value={formData.start_date}
                  onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all"
                  required
                />
              </div>

              <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <input
                  type="checkbox"
                  id="is_current"
                  checked={formData.is_current}
                  onChange={(e) => setFormData({ ...formData, is_current: e.target.checked })}
                  className="w-5 h-5 text-blue-600 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500"
                />
                <label htmlFor="is_current" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Saat ini masih bekerja di sini
                </label>
              </div>

              {!formData.is_current && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Tanggal Selesai
                  </label>
                  <input
                    type="month"
                    value={formData.end_date || ""}
                    onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Deskripsi
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all"
                  rows={4}
                  placeholder="Jelaskan tanggung jawab dan pencapaian Anda..."
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all font-medium"
                  disabled={submitting}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-lg shadow-blue-500/30"
                  disabled={submitting}
                >
                  {submitting ? "Menyimpan..." : "Simpan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
