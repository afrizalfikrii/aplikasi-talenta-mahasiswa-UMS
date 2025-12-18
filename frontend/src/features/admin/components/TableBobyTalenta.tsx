import { Eye, EyeOff, Pencil } from "lucide-react";

const TableBodyTalenta = () => {
  return (
    <tbody>
      <tr className="border-b-sm hover:bg-gray-50">
        <td className="py-4">L200200001</td>
        <td className="py-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-red-100 text-red-500 flex items-center justify-center font-semibold">
              A
            </div>
            <span className="font-medium">Nama Talenta</span>
          </div>
        </td>
        <td className="py-4">Program Studi</td>
        <td className="py-4 text-gray-600">email@student.ac.id</td>
        <td className="py-4">
          <div className="flex flex-wrap gap-2">
            <span className="px-2 py-1 text-xs rounded bg-red-50 text-red-500">
              Skill 1
            </span>
            <span className="px-2 py-1 text-xs rounded bg-red-50 text-red-500">
              Skill 2
            </span>
            <span className="px-2 py-1 text-xs rounded bg-gray-100 text-gray-600">
              +4
            </span>
          </div>
        </td>
        <td className="py-4">
          <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-600 font-medium">
            Aktif
          </span>
        </td>
        <td className="py-4">
          <div className="flex justify-center gap-3">
            <Eye className="w-4 h-4 text-blue-500 cursor-pointer" />
            <EyeOff className="w-4 h-4 text-red-500 cursor-pointer" />
            <Pencil className="w-4 h-4 text-gray-600 cursor-pointer" />
          </div>
        </td>
      </tr>
    </tbody>
  );
};

export default TableBodyTalenta;
