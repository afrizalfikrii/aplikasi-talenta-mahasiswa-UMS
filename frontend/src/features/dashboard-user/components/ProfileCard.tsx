import { useState } from "react";
import { User, Upload, FileCheck, Edit2 } from "lucide-react";
import { useProfile } from "../hooks/useProfile";
import type { ProfileUpdatePayload } from "../api/profile.api";

export default function ProfileCard() {
  const { profile, loading, error, editProfile, uploadPhoto, uploadCVFile } = useProfile();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<ProfileUpdatePayload>({});
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleEditProfile = () => {
    if (!profile) return;
    setFormData({
      prodi: profile.prodi || "",
      phone_number: profile.phone_number || "",
      address: profile.address || "",
      summary: profile.summary || "",
      linkedin_url: profile.linkedin_url || "",
      github_url: profile.github_url || "",
      website_url: profile.website_url || "",
    });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setSubmitting(true);
      await editProfile(formData);
      setShowModal(false);
    } catch (err: any) {
      console.error("Error updating profile:", err);
      alert(err.response?.data?.detail || "Gagal mengupdate profil");
    } finally {
      setSubmitting(false);
    }
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("Ukuran file maksimal 5MB");
      return;
    }

    if (!file.type.startsWith('image/')) {
      alert("File harus berupa gambar (JPG, PNG, WEBP)");
      return;
    }

    try {
      setUploading(true);
      await uploadPhoto(file);
      alert("Foto profil berhasil diupload!");
    } catch (err: any) {
      console.error("Error uploading photo:", err);
      alert(err.response?.data?.detail || "Gagal upload foto profil");
    } finally {
      setUploading(false);
    }
  };

  const handleCVUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      alert("Ukuran file maksimal 10MB");
      return;
    }

    if (file.type !== 'application/pdf') {
      alert("File CV harus berupa PDF");
      return;
    }

    try {
      setUploading(true);
      await uploadCVFile(file);
      alert("CV berhasil diupload!");
    } catch (err: any) {
      console.error("Error uploading CV:", err);
      alert(err.response?.data?.detail || "Gagal upload CV");
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 md:p-8 animate-pulse">
        <div className="flex justify-center items-center h-32">
          <p className="text-gray-500 dark:text-gray-400">Loading profil...</p>
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 md:p-8">
        <div className="flex justify-center items-center h-32">
          <p className="text-red-500 dark:text-red-400">{error || "Gagal memuat profil"}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 md:p-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
              <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Biodata</h2>
          </div>
          <button
            onClick={handleEditProfile}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl font-medium hover:bg-blue-700 transition-all hover:scale-105 shadow-sm"
          >
            <Edit2 size={18} />
            <span>Edit Profil</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Nama Lengkap</label>
            <div className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-gray-100">
              {profile.user.first_name} {profile.user.last_name}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-500 dark:text-gray-400">NIM</label>
            <div className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-gray-100">
              {profile.user.nim}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</label>
            <div className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-gray-100">
              {profile.user.email}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-500 dark:text-gray-400">No. Telepon</label>
            <div className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-gray-100">
              {profile.phone_number || "-"}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Program Studi</label>
            <div className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-gray-100">
              {profile.prodi || "-"}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Alamat</label>
            <div className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-gray-100">
              {profile.address || "-"}
            </div>
          </div>

          <div className="col-span-2 space-y-2">
            <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Bio</label>
            <div className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-gray-100">
              {profile.summary || "-"}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Upload Files</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                <Upload size={16} />
                Foto Profil
              </label>
              {profile.profile_picture && (
                <div className="mb-2">
                  <img
                    src={profile.profile_picture}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover border-4 border-gray-200 dark:border-gray-600 shadow-md"
                  />
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                disabled={uploading}
                className="block w-full text-sm text-gray-500 dark:text-gray-400
                                    file:mr-4 file:py-2.5 file:px-4
                                    file:rounded-xl file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-blue-600 file:text-white
                                    hover:file:bg-blue-700
                                    file:cursor-pointer file:transition-all
                                    disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400">Max 5MB (JPG, PNG, WEBP)</p>
            </div>

            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                <FileCheck size={16} />
                CV (PDF)
              </label>
              {profile.cv_file && (
                <div className="mb-2 p-3 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700 rounded-xl">
                  <p className="text-sm text-green-700 dark:text-green-300 flex items-center gap-2">
                    <FileCheck size={16} />
                    CV sudah diupload
                  </p>
                </div>
              )}
              <input
                type="file"
                accept=".pdf"
                onChange={handleCVUpload}
                disabled={uploading}
                className="block w-full text-sm text-gray-500 dark:text-gray-400
                                    file:mr-4 file:py-2.5 file:px-4
                                    file:rounded-xl file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-blue-600 file:text-white
                                    hover:file:bg-blue-700
                                    file:cursor-pointer file:transition-all
                                    disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400">Max 10MB (PDF only)</p>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-up">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-gray-700">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Edit Profil</h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Program Studi
                  </label>
                  <input
                    type="text"
                    value={formData.prodi || ""}
                    onChange={(e) => setFormData({ ...formData, prodi: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all"
                    placeholder="Teknik Informatika"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    No. Telepon
                  </label>
                  <input
                    type="tel"
                    value={formData.phone_number || ""}
                    onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all"
                    placeholder="081234567890"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Alamat
                </label>
                <input
                  type="text"
                  value={formData.address || ""}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all"
                  placeholder="Jl. Ahmad Yani No. 123, Surakarta"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Bio / Ringkasan
                </label>
                <textarea
                  value={formData.summary || ""}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all"
                  rows={4}
                  placeholder="Ceritakan tentang diri Anda..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  LinkedIn URL
                </label>
                <input
                  type="url"
                  value={formData.linkedin_url || ""}
                  onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all"
                  placeholder="https://linkedin.com/in/username"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  GitHub URL
                </label>
                <input
                  type="url"
                  value={formData.github_url || ""}
                  onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all"
                  placeholder="https://github.com/username"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Website URL
                </label>
                <input
                  type="url"
                  value={formData.website_url || ""}
                  onChange={(e) => setFormData({ ...formData, website_url: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all"
                  placeholder="https://yourwebsite.com"
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
