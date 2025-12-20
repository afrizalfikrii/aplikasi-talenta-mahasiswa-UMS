import { useState } from "react";
import { usePortfolios } from "../hooks/usePortfolios";
import type { PortfolioPayload } from "../api/portfolio.api";

export default function PortfolioCard() {
    const { portfolios, loading, error, addPortfolio, editPortfolio, removePortfolio } = usePortfolios();
    const [showModal, setShowModal] = useState(false);
    const [editingPortfolioId, setEditingPortfolioId] = useState<number | null>(null);
    const [formData, setFormData] = useState<PortfolioPayload>({
        project_title: "",
        description: "",
        project_url: "",
    });
    const [submitting, setSubmitting] = useState(false);

    const handleAddPortfolio = () => {
        setEditingPortfolioId(null);
        setFormData({
            project_title: "",
            description: "",
            project_url: "",
        });
        setShowModal(true);
    };

    const handleEditPortfolio = (portfolio: any) => {
        setEditingPortfolioId(portfolio.id);
        setFormData({
            project_title: portfolio.project_title,
            description: portfolio.description,
            project_url: portfolio.project_url,
        });
        setShowModal(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.project_title.trim()) {
            alert("Judul proyek tidak boleh kosong!");
            return;
        }

        try {
            setSubmitting(true);

            if (editingPortfolioId) {
                await editPortfolio(editingPortfolioId, formData);
            } else {
                await addPortfolio(formData);
            }

            setShowModal(false);
            setFormData({
                project_title: "",
                description: "",
                project_url: "",
            });
        } catch (err: any) {
            console.error("Error saving portfolio:", err);
            alert(err.response?.data?.detail || "Gagal menyimpan portfolio");
        } finally {
            setSubmitting(false);
        }
    };

    const handleDeletePortfolio = async (id: number) => {
        if (!confirm("Yakin ingin menghapus portfolio ini?")) return;

        try {
            await removePortfolio(id);
        } catch (err: any) {
            console.error("Error deleting portfolio:", err);
            alert(err.response?.data?.detail || "Gagal menghapus portfolio");
        }
    };

    if (loading) {
        return (
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 md:p-8">
                <div className="flex justify-center items-center h-32">
                    <p className="text-slate-500 dark:text-slate-400">Loading portfolio...</p>
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
                    <h2 className="text-xl font-bold text-slate-800 dark:text-white">Portfolio</h2>
                    <button
                        onClick={handleAddPortfolio}
                        className="flex items-center space-x-2 bg-slate-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-slate-700 transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        <span>Tambah Portfolio</span>
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {portfolios.length > 0 ? (
                        portfolios.map((portfolio) => (
                            <div key={portfolio.id} className="border border-slate-200 dark:border-slate-700 rounded-lg p-4 hover:border-slate-300 dark:hover:border-slate-600 transition-colors">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-semibold text-slate-900 dark:text-white">{portfolio.project_title}</h3>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleEditPortfolio(portfolio)}
                                            className="text-blue-500 hover:text-blue-700 text-sm"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeletePortfolio(portfolio.id)}
                                            className="text-red-500 hover:text-red-700 text-sm"
                                        >
                                            Hapus
                                        </button>
                                    </div>
                                </div>
                                {portfolio.description && (
                                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">{portfolio.description}</p>
                                )}
                                {portfolio.project_url && (
                                    <a
                                        href={portfolio.project_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-blue-500 hover:text-blue-700 flex items-center gap-1"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                        Lihat Proyek
                                    </a>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="col-span-2 text-center py-8 text-slate-400 dark:text-slate-500">
                            Belum ada portfolio yang ditambahkan. Klik "Tambah Portfolio" untuk menambahkan.
                        </div>
                    )}
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
                        <h3 className="text-xl font-bold text-slate-800 mb-4">
                            {editingPortfolioId ? "Edit Portfolio" : "Tambah Portfolio Baru"}
                        </h3>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Judul Proyek
                                </label>
                                <input
                                    type="text"
                                    value={formData.project_title}
                                    onChange={(e) => setFormData({ ...formData, project_title: e.target.value })}
                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Contoh: Website E-Commerce"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Deskripsi
                                </label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    rows={4}
                                    placeholder="Jelaskan tentang proyek ini..."
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    URL Proyek
                                </label>
                                <input
                                    type="url"
                                    value={formData.project_url}
                                    onChange={(e) => setFormData({ ...formData, project_url: e.target.value })}
                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="https://github.com/username/project"
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
