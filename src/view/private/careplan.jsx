import { Link } from "react-router-dom";
import SecureMainLayout from "@/layout/private";
import { ContentLayout } from "@/layout/private/content-layout";
import { FaUpload } from "react-icons/fa6";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import useAppointmentStore from "@/store/useAppointmentStore";
import { useEffect, useState } from "react";
import useAuthStore from "@/store/useAuthStore";
import LoadingSpinner from "@/components/loaders/LoadingSpinner";
import { stringToDate } from "@/lib/functions";

export default function Careplan() {
  const { user } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const { userAppointments, appointments, getAppointments, getUserAppointments } = useAppointmentStore();

  useEffect(() => {
    if(user){
      if(user?.userType == 1){
        getAppointments(user?.id).finally(() => setIsLoading(false));
      } else {
        getUserAppointments(user?.id).finally(() => setIsLoading(false));
      }
    }
  },[user]);

  const getData = () => user?.userType == 1 ? appointments : userAppointments;

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
          <div className="flex justify-start items-center">
              {getData()?.filter((a) => a.status == 'booked').map((appointment) => {
                return <div key={appointment?.id} className="w-1/4 p-2">
                  <Card className="p-2 h-full">
                    <CardHeader>
                      <CardTitle className="text-center">{appointment?.title}</CardTitle>
                      <CardDescription className="text-center">{appointment?.appointmentType}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center">{stringToDate(appointment?.date)}</div>
                      <div className="text-center text-sm">{appointment?.time}</div>
                      {appointment?.prescriptionFile ?
                        <div className="text-center text-sm bg-primary text-primary-foreground py-2 px-3 mt-5 rounded cursor-pointer hover:bg-primary/85">View Prescription</div>
                        :
                        <div className="text-center text-sm bg-secondary text-secondary-foreground py-2 px-3 mt-5 rounded booked-cursor">View Prescription</div>
                      }
                    </CardContent>
                  </Card>
                </div>
              })}
          </div>
        }
        </div>
      </ContentLayout>
    </SecureMainLayout>
  );
}
