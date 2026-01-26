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
    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700 p-5 flex flex-col md:flex-row gap-4 items-center transition-colors duration-300">
      
      {/* Search Input */}
      <div className="relative flex-1 w-full">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Cari berdasarkan nama, NIM, atau program studi..."
          className="w-full pl-12 pr-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400 dark:placeholder:text-gray-500 transition-all"
        />
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-2">
        <button
          onClick={() => onFilterChange("all")}
          className={`px-5 py-3 text-sm rounded-xl font-semibold transition-all ${
            filterStatus === "all"
              ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
              : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
          }`}
        >
          Semua
        </button>

        <button
          onClick={() => onFilterChange("active")}
          className={`px-5 py-3 text-sm rounded-xl font-semibold transition-all ${
            filterStatus === "active"
              ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
              : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
          }`}
        >
          Aktif
        </button>

        <button
          onClick={() => onFilterChange("inactive")}
          className={`px-5 py-3 text-sm rounded-xl font-semibold transition-all ${
            filterStatus === "inactive"
              ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
              : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
          }`}
        >
          Nonaktif
        </button>
      </div>
    </div>
  );
}
