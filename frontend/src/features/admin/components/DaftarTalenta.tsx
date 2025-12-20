import DaftarTalentaHead from "./TableHeadTalenta";
import TableBodyTalenta from "./TableBodyTalenta";
import { useAdminTalents } from "../hooks/useAdminTalents";
import { useMemo } from "react";
import type { AdminTalent, FilterStatus } from "../types/talent-admin.types";

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
    <div className="w-full bg-white rounded-xl shadow p-4 overflow-x-auto">
      <table className="min-w-full table-fixed text-sm">
        <DaftarTalentaHead />
        {loading ? (
          <tbody>
            <tr>
              <td colSpan={7} className="text-center py-4">Loading talents...</td>
            </tr>
          </tbody>
        ) : error ? (
          <tbody>
            <tr>
              <td colSpan={7} className="text-center py-4 text-red-600">Error: {error}</td>
            </tr>
          </tbody>
        ) : filteredTalents.length === 0 ? (
          <tbody>
            <tr>
              <td colSpan={7} className="text-center py-8 text-gray-500">
                {searchTerm || filterStatus !== "all" 
                  ? "Tidak ada data yang sesuai dengan pencarian atau filter" 
                  : "Tidak ada data"}
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
