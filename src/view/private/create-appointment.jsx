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
import Form from "@/components/appointments/form";
import { useEffect } from "react";
import useAuthStore from "@/store/useAuthStore";

export default function CreateAppointment() {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if(user){
      if(user?.userType != 2) navigate('/auth/dashboard')
    } else {
      navigate('/')
    }
  }, [navigate, user])

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
              <BreadcrumbPage>
                <Link to="/auth/appointment">Appointment</Link>
              </BreadcrumbPage>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Create Appointment</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="mt-5 relative">
          <Form />
        </div>
      </ContentLayout>
    </SecureMainLayout>
  );
}
