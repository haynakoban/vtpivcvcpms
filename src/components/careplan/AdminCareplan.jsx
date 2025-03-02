import DataTable from "@/components/careplan/admin/data-table";
import { columns } from "@/components/careplan/admin/columns";

function AdminCareplan({ appointments }) {
  return (
    <div>
      <DataTable columns={columns} data={appointments} />
    </div>
  );
}

export default AdminCareplan;
