import { Search } from "lucide-react";

interface SearchFilterBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filterStatus: "all" | "active" | "inactive";
  onFilterChange: (status: "all" | "active" | "inactive") => void;
}

export default function SearchFilterBar({
  searchTerm,
  onSearchChange,
  filterStatus,
  onFilterChange,
}: SearchFilterBarProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex flex-col md:flex-row gap-4 items-center">
      
      {/* Search Input */}
      <div className="relative flex-1 w-full">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Cari berdasarkan nama, NIM, atau program studi..."
          className="w-full pl-11 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-2">
        <button
          onClick={() => onFilterChange("all")}
          className={`px-4 py-2.5 text-sm rounded-lg font-medium transition-colors ${
            filterStatus === "all"
              ? "bg-red-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Semua
        </button>

        <button
          onClick={() => onFilterChange("active")}
          className={`px-4 py-2.5 text-sm rounded-lg font-medium transition-colors ${
            filterStatus === "active"
              ? "bg-red-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Aktif
        </button>

        <button
          onClick={() => onFilterChange("inactive")}
          className={`px-4 py-2.5 text-sm rounded-lg font-medium transition-colors ${
            filterStatus === "inactive"
              ? "bg-red-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Nonaktif
        </button>
      </div>
    </div>
  );
}
