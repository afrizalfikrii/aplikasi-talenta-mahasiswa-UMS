import DaftarTalentaHead from "./TableHeadTalenta";
import DaftarTalentaBody from "./TableBobyTalenta";

const DaftarTalenta = () => {
  return (
    <div className="bg-white rounded-xl shadow p-4 overflow-x-auto">
      <table className="w-full text-sm">
      <DaftarTalentaHead />
      <DaftarTalentaBody />
      </table>
    </div>
  );
};

export default DaftarTalenta;
