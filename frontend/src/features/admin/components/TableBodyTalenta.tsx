import TableRowTalenta from "./TableRowTalenta";
import type { AdminTalent } from "../types/talent-admin.types";

interface TableBodyTalentaProps {
  talents: AdminTalent[];
  onUpdate: () => void;
}

const TableBodyTalenta = ({ talents, onUpdate }: TableBodyTalentaProps) => {
  return (
    <tbody>
        {talents.map((talent) => (
            <TableRowTalenta key={talent.id} talents={talent} onUpdate={onUpdate} />
        ))}
    </tbody>
  )}

export default TableBodyTalenta;