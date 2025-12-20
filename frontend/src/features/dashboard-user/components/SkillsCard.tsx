import { useState } from "react";
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

    if (loading) {
        return (
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 md:p-8">
                <div className="flex justify-center items-center h-32">
                    <p className="text-slate-500 dark:text-slate-400">Loading skills...</p>
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
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-xl font-bold text-slate-800 dark:text-white">Skills</h2>
                    <button
                        onClick={handleAddSkill}
                        className="flex items-center space-x-2 bg-slate-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-slate-700 transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        <span>Tambah Skill</span>
                    </button>
                </div>

                <div className="space-y-6">
                    {skills.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {skills.map((skill) => (
                                <div key={skill.id} className="space-y-2 relative group">
                                    <div className="flex justify-between items-start">
                                        <label className="text-sm font-medium text-slate-500 dark:text-slate-400">
                                            {skill.skill_name}
                                        </label>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleEditSkill(skill.id, skill.skill_name, skill.proficiency_level)}
                                                className="text-blue-500 hover:text-blue-700 text-sm"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDeleteSkill(skill.id)}
                                                className="text-red-500 hover:text-red-700 text-sm"
                                            >
                                                Hapus
                                            </button>
                                        </div>
                                    </div>
                                    <div className="w-full p-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-900 dark:text-slate-100 capitalize">
                                        {skill.proficiency_level}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8 text-slate-400 dark:text-slate-500">
                            Belum ada skill yang ditambahkan. Klik "Tambah Skill" untuk menambahkan.
                        </div>
                    )}
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
                        <h3 className="text-xl font-bold text-slate-800 mb-4">
                            {editingSkillId ? "Edit Skill" : "Tambah Skill Baru"}
                        </h3>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Nama Skill
                                </label>
                                <input
                                    type="text"
                                    value={formData.skill_name}
                                    onChange={(e) => setFormData({ ...formData, skill_name: e.target.value })}
                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Contoh: React.js, Python, etc."
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Level Kemahiran
                                </label>
                                <select
                                    value={formData.proficiency_level}
                                    onChange={(e) => setFormData({ ...formData, proficiency_level: e.target.value as any })}
                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
