import { useState } from "react";
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
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 md:p-8">
        <div className="flex justify-center items-center h-32">
          <p className="text-slate-500 dark:text-slate-400">Loading pengalaman...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 md:p-8">
        <div className="flex justify-center items-center h-32">
          <p className="text-red-500 dark:text-red-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 md:p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">Pengalaman</h2>
          <button
            onClick={handleAddExperience}
            className="flex items-center space-x-2 bg-slate-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-slate-700 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>Tambah Pengalaman</span>
          </button>
        </div>

        <div className="space-y-4">
          {experiences.length > 0 ? (
            experiences.map((exp) => (
              <div key={exp.id} className="border border-slate-200 dark:border-slate-700 rounded-lg p-4 hover:border-slate-300 dark:hover:border-slate-600 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900 dark:text-white">{exp.job_title}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{exp.company_name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                      {exp.start_date} - {exp.is_current ? "Sekarang" : exp.end_date}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditExperience(exp)}
                      className="text-blue-500 hover:text-blue-700 text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteExperience(exp.id)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
                {exp.description && (
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">{exp.description}</p>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-slate-400 dark:text-slate-500">
              Belum ada pengalaman yang ditambahkan. Klik "Tambah Pengalaman" untuk menambahkan.
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-slate-800 mb-4">
              {editingExpId ? "Edit Pengalaman" : "Tambah Pengalaman Baru"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Posisi/Jabatan
                </label>
                <input
                  type="text"
                  value={formData.job_title}
                  onChange={(e) => setFormData({ ...formData, job_title: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Contoh: Full Stack Developer"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Perusahaan/Organisasi
                </label>
                <input
                  type="text"
                  value={formData.company_name}
                  onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Contoh: PT Teknologi Nusantara"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Tanggal Mulai
                </label>
                <input
                  type="month"
                  value={formData.start_date}
                  onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="is_current"
                  checked={formData.is_current}
                  onChange={(e) => setFormData({ ...formData, is_current: e.target.checked })}
                  className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="is_current" className="text-sm font-medium text-slate-700">
                  Saat ini masih bekerja di sini
                </label>
              </div>

              {!formData.is_current && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Tanggal Selesai
                  </label>
                  <input
                    type="month"
                    value={formData.end_date || ""}
                    onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Deskripsi
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={4}
                  placeholder="Jelaskan tanggung jawab dan pencapaian Anda..."
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                  disabled={submitting}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors disabled:opacity-50"
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
