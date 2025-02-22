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
import AdminCareplan from "@/components/careplan/AdminCareplan";
import UserCareplan from "@/components/careplan/UserCareplan";

export default function Careplan() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const { userAppointments, appointments, getAppointments, getUserAppointments, isChanged } = useAppointmentStore();

  useEffect(() => {
    if(user){
      if(user?.userType == 1){
        getAppointments().finally(() => setIsLoading(false));
      } else {
        getUserAppointments(user?.id).finally(() => setIsLoading(false));
      }
    }
  },[user, isChanged]);

  const getData = () => user?.userType == 1 ? appointments : userAppointments;

  useEffect(() => {
    if(user){
      if(user?.userType == 3) navigate('/auth/dashboard')
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
              <BreadcrumbPage>Careplan</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="mt-5">
        {isLoading ?
          <div className="flex justify-center items-center text-center w-full">
            <LoadingSpinner isLoading={isLoading} />
            Loading
          </div>
          :
          <>
            {user?.userType == 1 ?
              <AdminCareplan appointments={getData()?.filter((a) => a.status == 'booked')} /> 
              : 
              <div className="flex justify-start items-center">
                <UserCareplan appointments={getData()?.filter((a) => a.status == 'booked')}/>
              </div>
            }
          </>
        }
        </div>
      </ContentLayout>
    </SecureMainLayout>
  );
}
