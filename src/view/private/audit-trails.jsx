import { useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import SecureMainLayout from "@/layout/private";
import { ContentLayout } from "@/layout/private/content-layout";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import DataTable from "@/components/audit/data-table";
import { columns } from "@/components/audit/columns";
import useAuditStore from "@/store/useAuditStore";

export default function AuditTrails() {
  const { logs, getAllAudit } = useAuditStore((state) => ({
    logs: state.logs,
    getAllAudit: state.getAllAudit,
  }));

  // Memoize the getAllAudit function to prevent unnecessary calls
  const memoizedGetAllAudit = useCallback(() => {
    if (!logs || logs.length === 0) {
      getAllAudit();
    }
  }, [logs, getAllAudit]);

  useEffect(() => {
    memoizedGetAllAudit();
  }, [memoizedGetAllAudit]);

  return (
    <SecureMainLayout>
      <ContentLayout title="Audit Trails">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/auth/dashboard">Dashboard</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Audit Trails</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="mt-5">
          <DataTable columns={columns} data={logs} />
        </div>
      </ContentLayout>
    </SecureMainLayout>
  );
}
