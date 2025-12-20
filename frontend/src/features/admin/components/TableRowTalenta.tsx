import { Eye, EyeOff, Pencil } from "lucide-react";
import type { AdminTalent } from "../types/talent-admin.types";
import { toggleUserStatus } from "../api/admin.talents.api";
import { useState } from "react";
import EditUserModal from "./EditUserModal.tsx";

interface TableRowTalentaProps {
  talents: AdminTalent;
  onUpdate: () => void;
}

const TableRowTalenta = ({ talents, onUpdate }: TableRowTalentaProps) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleToggleStatus = async () => {
    if (isUpdating) return;
    
    const action = talents.is_active ? "nonaktifkan" : "aktifkan";
    const confirmed = window.confirm(`Apakah Anda yakin ingin ${action} akun ${talents.name}?`);
    
    if (!confirmed) return;

    try {
      setIsUpdating(true);
      await toggleUserStatus(talents.id);
      onUpdate(); // Refresh data
    } catch (error) {
      console.error("Error toggling user status:", error);
      alert("Gagal mengubah status akun");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleEdit = () => {
    setShowEditModal(true);
  };

  const handleEditSuccess = () => {
    onUpdate(); // Refresh data
  };

  return (
    <>
      <tr className="border-b-sm border-gray-100 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors">
        <td className="py-4 w-32 whitespace-nowrap dark:text-gray-300">{talents.nim}</td>
        <td className="py-4 w-64">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-red-100 dark:bg-red-900/30 text-red-500 dark:text-red-400 flex items-center justify-center font-semibold">
              {talents.name.charAt(0).toUpperCase()}
            </div>
            <span className="font-medium dark:text-gray-200">{talents.name}</span>
          </div>
        </td>
        <td className="py-4 w-44 whitespace-nowrap dark:text-gray-300">{talents.program_studi}</td>
        <td className="py-4 w-72 text-gray-600 dark:text-gray-400">{talents.email}</td>
        <td className="py-4 w-64">
          <div className="flex flex-wrap gap-2">
            {talents.skills.length === 0 ? (
              <span className="px-2 py-1 text-xs rounded bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-400">
                Belum ada skill
              </span>
            ) : (
              <>
                {talents.skills.slice(0, 2).map((skill, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs rounded bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400"
                  >
                    {skill}
                  </span>
                ))}
                {talents.skills.length > 2 && (
                  <span className="px-2 py-1 text-xs rounded bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-400">
                    +{talents.skills.length - 2}
                  </span>
                )}
              </>
            )}
          </div>
        </td>
        <td className="py-4 w-28">
          {talents.is_active ? (
            <span className="px-3 py-1 text-xs rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 font-medium">
              Aktif
            </span>
          ) : (
            <span className="px-3 py-1 text-xs rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 font-medium">
              Nonaktif
            </span>
          )}
        </td>
        <td className="py-4 w-24">
          <div className="flex justify-center gap-3">
            {talents.is_active ? (
              <button
                onClick={handleToggleStatus}
                disabled={isUpdating}
                className="disabled:opacity-50"
                title="Nonaktifkan akun"
              >
                <EyeOff className="w-4 h-4 text-red-500 dark:text-red-400 cursor-pointer hover:text-red-700 dark:hover:text-red-300" />
              </button>
            ) : (
              <button
                onClick={handleToggleStatus}
                disabled={isUpdating}
                className="disabled:opacity-50"
                title="Aktifkan akun"
              >
                <Eye className="w-4 h-4 text-blue-500 dark:text-blue-400 cursor-pointer hover:text-blue-700 dark:hover:text-blue-300" />
              </button>
            )}
            <button
              onClick={handleEdit}
              title="Edit profil"
            >
              <Pencil className="w-4 h-4 text-gray-600 dark:text-gray-400 cursor-pointer hover:text-gray-800 dark:hover:text-gray-200" />
            </button>
          </div>
        </td>
      </tr>

      <EditUserModal
        user={talents}
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSuccess={handleEditSuccess}
      />
    </>
  );
};

export default TableRowTalenta;
