import { Link, useNavigate } from "react-router-dom";
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

import useAppointmentStore from "@/store/useAppointmentStore";
import { useEffect, useState } from "react";
import useAuthStore from "@/store/useAuthStore";
import LoadingSpinner from "@/components/loaders/LoadingSpinner";
import NewUserCareplan from "@/components/careplan/NewUserCareplan";
import useLookUpsStore from "@/store/useLookUpsStore";

export default function CreateCareplan() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const { getPetDiseases } = useLookUpsStore();
  const { getAppointments, getUserAppointments, isChanged } =
    useAppointmentStore();

  useEffect(() => {
    if (user) {
      if (user?.userType == 1) {
        getAppointments().finally(() => setIsLoading(false));
      } else {
        getUserAppointments(user?.id).finally(() => setIsLoading(false));
      }
      getPetDiseases();
    }
  }, [user, isChanged, getAppointments, getUserAppointments, getPetDiseases]);

  useEffect(() => {
    if (user === undefined) return;
    if (user) {
      if (user?.userType == 3) navigate("/auth/dashboard");
    }
  }, [navigate, user]);

  return (
    <SecureMainLayout>
      <ContentLayout title="Careplan">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/auth/dashboard">Dashboard</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/auth/careplan">Careplan</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Careplan Assessment</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="mt-5">
          {isLoading ? (
            <div className="flex justify-center items-center text-center w-full">
              <LoadingSpinner isLoading={isLoading} />
              Loading
            </div>
          ) : (
            <div>
              <NewUserCareplan />
            </div>
          )}
        </div>
      </ContentLayout>
    </SecureMainLayout>
  );
}
