import { useState } from "react";
import { Plus, Edit2, Trash2, Zap } from "lucide-react";
import { useSkills } from "../hooks/useSkills";
import type { SkillPayload } from "../api/skill.api";

export default function SkillsCard() {
    const { skills, loading, error, addSkill, editSkill, removeSkill } = useSkills();
    const [showModal, setShowModal] = useState(false);
    const [editingSkillId, setEditingSkillId] = useState<number | null>(null);
    const [formData, setFormData] = useState<SkillPayload>({
        skill_name: "",
        proficiency_level: "beginner"
    });
    const [submitting, setSubmitting] = useState(false);

    const handleAddSkill = () => {
        setEditingSkillId(null);
        setFormData({ skill_name: "", proficiency_level: "beginner" });
        setShowModal(true);
    };

    const handleEditSkill = (id: number, skillName: string, proficiencyLevel: SkillPayload['proficiency_level']) => {
        setEditingSkillId(id);
        setFormData({
            skill_name: skillName,
            proficiency_level: proficiencyLevel
        });
        setShowModal(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.skill_name.trim()) {
            alert("Nama skill tidak boleh kosong!");
            return;
        }

        try {
            setSubmitting(true);

            if (editingSkillId) {
                await editSkill(editingSkillId, formData);
            } else {
                await addSkill(formData);
            }

            setShowModal(false);
            setFormData({ skill_name: "", proficiency_level: "beginner" });
        } catch (err: any) {
            console.error("Error saving skill:", err);
            alert(err.response?.data?.detail || "Gagal menyimpan skill");
        } finally {
            setSubmitting(false);
        }
    };

    const handleDeleteSkill = async (id: number) => {
        if (!confirm("Yakin ingin menghapus skill ini?")) return;

        try {
            await removeSkill(id);
        } catch (err: any) {
            console.error("Error deleting skill:", err);
            alert(err.response?.data?.detail || "Gagal menghapus skill");
        }
    };

    const getLevelColor = (level: string) => {
        switch (level) {
            case "beginner": return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300";
            case "intermediate": return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300";
            case "advanced": return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300";
            case "expert": return "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300";
            default: return "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300";
        }
    };

    if (loading) {
        return (
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 md:p-8 animate-pulse">
                <div className="flex justify-between items-center mb-8">
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
                    <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="h-20 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
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
                        <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                            <Zap className="w-5 h-5 text-green-600 dark:text-green-400" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Skills</h2>
                    </div>
                    <button
                        onClick={handleAddSkill}
                        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl font-medium hover:bg-blue-700 transition-all hover:scale-105 shadow-sm"
                    >
                        <Plus size={18} />
                        <span>Tambah Skill</span>
                    </button>
                </div>

                <div className="space-y-6">
                    {skills.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {skills.map((skill) => (
                                <div key={skill.id} className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 border border-gray-200 dark:border-gray-600 hover:shadow-md transition-all group">
                                    <div className="flex justify-between items-start mb-3">
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                                                {skill.skill_name}
                                            </h3>
                                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium capitalize ${getLevelColor(skill.proficiency_level)}`}>
                                                {skill.proficiency_level}
                                            </span>
                                        </div>
                                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => handleEditSkill(skill.id, skill.skill_name, skill.proficiency_level)}
                                                className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                                                title="Edit"
                                            >
                                                <Edit2 size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteSkill(skill.id)}
                                                className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                                                title="Hapus"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-gray-50 dark:bg-gray-700/30 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600">
                            <Zap className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-3" />
                            <p className="text-gray-500 dark:text-gray-400 mb-2">Belum ada skill yang ditambahkan</p>
                            <p className="text-sm text-gray-400 dark:text-gray-500">Klik "Tambah Skill" untuk menambahkan skill baru</p>
                        </div>
                    )}
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-up">
                    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-md w-full p-6 border border-gray-200 dark:border-gray-700">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                            {editingSkillId ? "Edit Skill" : "Tambah Skill Baru"}
                        </h3>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Nama Skill
                                </label>
                                <input
                                    type="text"
                                    value={formData.skill_name}
                                    onChange={(e) => setFormData({ ...formData, skill_name: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all"
                                    placeholder="Contoh: React.js, Python, etc."
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Level Kemahiran
                                </label>
                                <select
                                    value={formData.proficiency_level}
                                    onChange={(e) => setFormData({ ...formData, proficiency_level: e.target.value as any })}
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all"
                                >
                                    <option value="beginner">Beginner</option>
                                    <option value="intermediate">Intermediate</option>
                                    <option value="advanced">Advanced</option>
                                    <option value="expert">Expert</option>
                                </select>
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
