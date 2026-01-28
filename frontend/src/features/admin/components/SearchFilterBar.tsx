import { Search, RefreshCw, Download } from "lucide-react";

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
    <div className="flex flex-col gap-4">
      {/* Search Bar with Quick Actions */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
        {/* Search Input - Glass Morphism */}
        <div className="relative flex-1">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={22} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Cari berdasarkan nama, NIM, atau program studi..."
            className="w-full pl-16 pr-6 py-5 rounded-3xl shadow-lg glass-panel
                   border border-gray-200/50 dark:border-gray-700/50
                   focus:ring-2 focus:ring-blue-400/50 dark:focus:ring-blue-500/50 
                   focus:border-transparent outline-none
                   text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500
                   transition-all duration-300 hover:shadow-xl"
          />
        </div>

        {/* Quick Actions */}
        <div className="flex gap-3">
          <button
            onClick={() => window.location.reload()}
            className="px-5 py-3 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700
                   text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700
                   transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2 font-medium"
            title="Refresh Data"
          >
            <RefreshCw size={18} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
          
          <button
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 
                   text-white hover:from-blue-600 hover:to-indigo-700
                   transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:scale-105 
                   flex items-center gap-2 font-semibold"
            title="Export Data"
          >
            <Download size={18} />
            <span className="hidden sm:inline">Export</span>
          </button>
        </div>
      </div>

      {/* Filter Pills */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Status:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onFilterChange("all")}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
              filterStatus === "all"
                ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/30"
                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            Semua
          </button>

          <button
            onClick={() => onFilterChange("active")}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
              filterStatus === "active"
                ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg shadow-green-500/30"
                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            Aktif
          </button>

          <button
            onClick={() => onFilterChange("inactive")}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
              filterStatus === "inactive"
                ? "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg shadow-red-500/30"
                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            Nonaktif
          </button>
        </div>
      </div>
    </div>
  );
}
