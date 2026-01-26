import { useState } from "react";
import { Plus, Edit2, Trash2, FolderGit2, ExternalLink } from "lucide-react";
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
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 md:p-8 animate-pulse">
                <div className="flex justify-between items-center mb-8">
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-28"></div>
                    <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-40"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center">
                            <FolderGit2 className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Portfolio</h2>
                    </div>
                    <button
                        onClick={handleAddPortfolio}
                        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl font-medium hover:bg-blue-700 transition-all hover:scale-105 shadow-sm"
                    >
                        <Plus size={18} />
                        <span>Tambah Portfolio</span>
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {portfolios.length > 0 ? (
                        portfolios.map((portfolio) => (
                            <div key={portfolio.id} className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5 border border-gray-200 dark:border-gray-600 hover:shadow-md transition-all group">
                                <div className="flex justify-between items-start mb-3">
                                    <h3 className="font-bold text-gray-900 dark:text-white text-lg flex-1 pr-2">{portfolio.project_title}</h3>
                                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => handleEditPortfolio(portfolio)}
                                            className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                                            title="Edit"
                                        >
                                            <Edit2 size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDeletePortfolio(portfolio.id)}
                                            className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                                            title="Hapus"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                                {portfolio.description && (
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 leading-relaxed line-clamp-2">{portfolio.description}</p>
                                )}
                                {portfolio.project_url && (
                                    <a
                                        href={portfolio.project_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
                                    >
                                        <ExternalLink size={16} />
                                        Lihat Proyek
                                    </a>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="col-span-2 text-center py-12 bg-gray-50 dark:bg-gray-700/30 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600">
                            <FolderGit2 className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-3" />
                            <p className="text-gray-500 dark:text-gray-400 mb-2">Belum ada portfolio yang ditambahkan</p>
                            <p className="text-sm text-gray-400 dark:text-gray-500">Klik "Tambah Portfolio" untuk menambahkan proyek baru</p>
                        </div>
                    )}
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-up">
                    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-lg w-full p-6 border border-gray-200 dark:border-gray-700">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                            {editingPortfolioId ? "Edit Portfolio" : "Tambah Portfolio Baru"}
                        </h3>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Judul Proyek
                                </label>
                                <input
                                    type="text"
                                    value={formData.project_title}
                                    onChange={(e) => setFormData({ ...formData, project_title: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all"
                                    placeholder="Contoh: Website E-Commerce"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Deskripsi
                                </label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all"
                                    rows={4}
                                    placeholder="Jelaskan tentang proyek ini..."
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    URL Proyek
                                </label>
                                <input
                                    type="url"
                                    value={formData.project_url}
                                    onChange={(e) => setFormData({ ...formData, project_url: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all"
                                    placeholder="https://github.com/username/project"
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
