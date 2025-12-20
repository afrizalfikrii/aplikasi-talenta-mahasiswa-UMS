
// import DaftarTalentaBody from "./TableBobyTalenta";
const TableHeadTalenta = () => {
  return (
    
    <thead className="border-b dark:border-slate-700 text-gray-600 dark:text-gray-400">
      <tr>
        <th className="py-3 text-left w-32 whitespace-nowrap">NIM</th>
        <th className="py-3 text-left w-64">Nama</th>
        <th className="py-3 text-left w-44 whitespace-nowrap">Program Studi</th>
        <th className="py-3 text-left w-72">Email</th>
        <th className="py-3 text-left w-64">Skills</th>
        <th className="py-3 text-left w-28">Status</th>
        <th className="py-3 text-center w-24">Aksi</th>
      </tr>
    </thead>
    // <DaftarTalentaBody />
  );
};

export default TableHeadTalenta;
