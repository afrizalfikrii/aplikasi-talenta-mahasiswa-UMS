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
      <tr className="border-b border-gray-100 dark:border-gray-800 hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-all duration-200">
        {/* NIM */}
        <td className="py-4 px-6">
          <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
            {talents.nim}
          </span>
        </td>

        {/* Nama with Avatar */}
        <td className="py-4 px-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-md flex-shrink-0">
              {talents.name.charAt(0).toUpperCase()}
            </div>
            <span className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
              {talents.name}
            </span>
          </div>
        </td>

        {/* Program Studi */}
        <td className="py-4 px-6">
          <span className="text-sm text-gray-700 dark:text-gray-300">
            {talents.program_studi}
          </span>
        </td>

        {/* Email */}
        <td className="py-4 px-6">
          <span className="text-sm text-gray-600 dark:text-gray-400 truncate block">
            {talents.email}
          </span>
        </td>

        {/* Skills */}
        <td className="py-4 px-6">
          <div className="flex flex-wrap gap-1.5">
            {talents.skills.length === 0 ? (
              <span className="px-2.5 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 font-medium">
                Belum ada skill
              </span>
            ) : (
              <>
                {talents.skills.slice(0, 2).map((skill, index) => (
                  <span
                    key={index}
                    className="px-2.5 py-1 text-xs rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-medium whitespace-nowrap"
                  >
                    {skill}
                  </span>
                ))}
                {talents.skills.length > 2 && (
                  <span className="px-2.5 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 font-medium">
                    +{talents.skills.length - 2}
                  </span>
                )}
              </>
            )}
          </div>
        </td>

        {/* Status */}
        <td className="py-4 px-6">
          <div className="flex justify-center">
            {talents.is_active ? (
              <span className="inline-flex items-center px-3 py-1.5 text-xs rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 font-semibold">
                Aktif
              </span>
            ) : (
              <span className="inline-flex items-center px-3 py-1.5 text-xs rounded-full bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 font-semibold">
                Nonaktif
              </span>
            )}
          </div>
        </td>

        {/* Actions */}
        <td className="py-4 px-6">
          <div className="flex justify-center items-center gap-2">
            {talents.is_active ? (
              <button
                onClick={handleToggleStatus}
                disabled={isUpdating}
                className="p-2 rounded-lg bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 
                       transition-all duration-200 disabled:opacity-50 group"
                title="Nonaktifkan akun"
              >
                <EyeOff className="w-4 h-4 text-red-600 dark:text-red-400 group-hover:scale-110 transition-transform" />
              </button>
            ) : (
              <button
                onClick={handleToggleStatus}
                disabled={isUpdating}
                className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 
                       transition-all duration-200 disabled:opacity-50 group"
                title="Aktifkan akun"
              >
                <Eye className="w-4 h-4 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform" />
              </button>
            )}
            <button
              onClick={handleEdit}
              className="p-2 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 
                     transition-all duration-200 group"
              title="Edit profil"
            >
              <Pencil className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:scale-110 transition-transform" />
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
