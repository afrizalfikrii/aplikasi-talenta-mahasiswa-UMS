import DaftarTalentaHead from "./TableHeadTalenta";
import TableBodyTalenta from "./TableBodyTalenta";
import { useAdminTalents } from "../hooks/useAdminTalents";
import { useMemo } from "react";
import { Users } from "lucide-react";
import type { FilterStatus } from "../types/talent-admin.types";

interface DaftarTalentaProps {
  onStatsUpdate?: () => void;
  searchTerm?: string;
  filterStatus?: FilterStatus;
}

const DaftarTalenta = ({ onStatsUpdate, searchTerm = "", filterStatus = "all" }: DaftarTalentaProps) => {
  const { talents: loadedTalents, loading, error, refetch } = useAdminTalents();
  
  const handleUpdate = () => {
    refetch();
    if (onStatsUpdate) {
      onStatsUpdate();
    }
  };

  // Filter and search talents
  const filteredTalents = useMemo(() => {
    let filtered = [...loadedTalents];

    // Filter by status
    if (filterStatus === "active") {
      filtered = filtered.filter((t) => t.is_active);
    } else if (filterStatus === "inactive") {
      filtered = filtered.filter((t) => !t.is_active);
    }

    // Search filter
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (t) =>
          t.name.toLowerCase().includes(search) ||
          t.nim.toLowerCase().includes(search) ||
          t.email.toLowerCase().includes(search) ||
          t.program_studi.toLowerCase().includes(search)
      );
    }

    return filtered;
  }, [loadedTalents, searchTerm, filterStatus]);
  
  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 overflow-x-auto transition-colors duration-300">
      <table className="min-w-full table-fixed text-sm">
        <DaftarTalentaHead />
        {loading ? (
          <tbody>
            <tr>
              <td colSpan={7} className="text-center py-12">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-gray-500 dark:text-gray-400">Loading talents...</p>
                </div>
              </td>
            </tr>
          </tbody>
        ) : error ? (
          <tbody>
            <tr>
              <td colSpan={7} className="text-center py-12">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                    <span className="text-2xl">❌</span>
                  </div>
                  <p className="text-red-600 dark:text-red-400 font-medium">Error: {error}</p>
                </div>
              </td>
            </tr>
          </tbody>
        ) : filteredTalents.length === 0 ? (
          <tbody>
            <tr>
              <td colSpan={7} className="text-center py-12">
                <div className="flex flex-col items-center gap-3">
                  <Users className="w-12 h-12 text-gray-400 dark:text-gray-500" />
                  <p className="text-gray-500 dark:text-gray-400 font-medium">
                    {searchTerm || filterStatus !== "all" 
                      ? "Tidak ada data yang sesuai dengan pencarian atau filter" 
                      : "Tidak ada data"}
                  </p>
                </div>
              </td>
            </tr>
          </tbody>
        ) : (
          <TableBodyTalenta talents={filteredTalents} onUpdate={handleUpdate} />
        )}
      </table>
    </div>
  );
};

export default DaftarTalenta;
