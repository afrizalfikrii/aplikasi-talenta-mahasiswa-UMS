import { useState } from "react";
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
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
                <div className="flex justify-center items-center h-32">
                    <p className="text-slate-500">Loading profil...</p>
                </div>
            </div>
        );
    }

    if (error || !profile) {
        return (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
                <div className="flex justify-center items-center h-32">
                    <p className="text-red-500">{error || "Gagal memuat profil"}</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-xl font-bold text-slate-800">Biodata</h2>
                    <button 
                        onClick={handleEditProfile}
                        className="flex items-center space-x-2 bg-slate-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-slate-700 transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                        <span>Edit Profil</span>
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-500">Nama Lengkap</label>
                        <div className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900">
                            {profile.user.first_name} {profile.user.last_name}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-500">NIM</label>
                        <div className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900">
                            {profile.user.nim}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-500">Email</label>
                        <div className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900">
                            {profile.user.email}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-500">No. Telepon</label>
                        <div className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900">
                            {profile.phone_number || "-"}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-500">Program Studi</label>
                        <div className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900">
                            {profile.prodi || "-"}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-500">Alamat</label>
                        <div className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900">
                            {profile.address || "-"}
                        </div>
                    </div>

                    <div className="col-span-2 space-y-2">
                        <label className="text-sm font-medium text-slate-500">Bio</label>
                        <div className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900">
                            {profile.summary || "-"}
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-slate-200">
                    <h3 className="text-lg font-semibold text-slate-800 mb-4">Upload Files</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                            <label className="block text-sm font-medium text-slate-700">
                                Foto Profil
                            </label>
                            {profile.profile_picture && (
                                <div className="mb-2">
                                    <img 
                                        src={profile.profile_picture} 
                                        alt="Profile" 
                                        className="w-32 h-32 rounded-full object-cover border-2 border-slate-200"
                                    />
                                </div>
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handlePhotoUpload}
                                disabled={uploading}
                                className="block w-full text-sm text-slate-500
                                    file:mr-4 file:py-2 file:px-4
                                    file:rounded-lg file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-slate-600 file:text-white
                                    hover:file:bg-slate-700
                                    file:cursor-pointer
                                    disabled:opacity-50"
                            />
                            <p className="text-xs text-slate-500">Max 5MB (JPG, PNG, WEBP)</p>
                        </div>

                        <div className="space-y-3">
                            <label className="block text-sm font-medium text-slate-700">
                                CV (PDF)
                            </label>
                            {profile.cv_file && (
                                <div className="mb-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                                    <p className="text-sm text-green-700 flex items-center gap-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        CV sudah diupload
                                    </p>
                                </div>
                            )}
                            <input
                                type="file"
                                accept=".pdf"
                                onChange={handleCVUpload}
                                disabled={uploading}
                                className="block w-full text-sm text-slate-500
                                    file:mr-4 file:py-2 file:px-4
                                    file:rounded-lg file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-slate-600 file:text-white
                                    hover:file:bg-slate-700
                                    file:cursor-pointer
                                    disabled:opacity-50"
                            />
                            <p className="text-xs text-slate-500">Max 10MB (PDF only)</p>
                        </div>
                    </div>
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
                        <h3 className="text-xl font-bold text-slate-800 mb-4">Edit Profil</h3>
                        
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Program Studi
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.prodi || ""}
                                        onChange={(e) => setFormData({ ...formData, prodi: e.target.value })}
                                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Teknik Informatika"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        No. Telepon
                                    </label>
                                    <input
                                        type="tel"
                                        value={formData.phone_number || ""}
                                        onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="081234567890"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Alamat
                                </label>
                                <input
                                    type="text"
                                    value={formData.address || ""}
                                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Jl. Ahmad Yani No. 123, Surakarta"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Bio / Ringkasan
                                </label>
                                <textarea
                                    value={formData.summary || ""}
                                    onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    rows={4}
                                    placeholder="Ceritakan tentang diri Anda..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    LinkedIn URL
                                </label>
                                <input
                                    type="url"
                                    value={formData.linkedin_url || ""}
                                    onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="https://linkedin.com/in/username"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    GitHub URL
                                </label>
                                <input
                                    type="url"
                                    value={formData.github_url || ""}
                                    onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="https://github.com/username"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Website URL
                                </label>
                                <input
                                    type="url"
                                    value={formData.website_url || ""}
                                    onChange={(e) => setFormData({ ...formData, website_url: e.target.value })}
                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="https://yourwebsite.com"
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
