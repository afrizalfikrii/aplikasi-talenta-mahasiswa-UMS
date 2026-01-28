const TableHeadTalenta = () => {
  return (
    <thead className="bg-gray-50 dark:bg-gray-800/50 border-b-2 border-gray-200 dark:border-gray-700">
      <tr>
        <th className="py-4 px-6 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider w-[120px]">
          NIM
        </th>
        <th className="py-4 px-6 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider min-w-[200px]">
          Nama
        </th>
        <th className="py-4 px-6 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider min-w-[180px]">
          Program Studi
        </th>
        <th className="py-4 px-6 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider min-w-[220px]">
          Email
        </th>
        <th className="py-4 px-6 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider min-w-[200px]">
          Skills
        </th>
        <th className="py-4 px-6 text-center text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider w-[100px]">
          Status
        </th>
        <th className="py-4 px-6 text-center text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider w-[100px]">
          Aksi
        </th>
      </tr>
    </thead>
  );
};

export default TableHeadTalenta;
