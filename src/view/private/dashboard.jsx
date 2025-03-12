/* eslint-disable no-unused-vars */
import SecureMainLayout from "@/layout/private";
import { ContentLayout } from "@/layout/private/content-layout";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

import DashboardPieChart from "@/components/dashboard/DashboardPieChart";
import DashboardForm from "@/components/dashboard/DashboardForm";
import { useEffect, useState } from "react";

import usePetStore from "@/store/usePetStore";
import useAuthStore from "@/store/useAuthStore";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import useDashboardStore from "@/store/useDashboardStore";
import DashboardContainer from "@/components/dashboard/DashboardContainer";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { user } = useAuthStore();
  const {
    dashboard,
    getDashboard,
    fetchDashboardData,
    fetchUsersSummary,
    fetchPetsSummary,
    fetchApptSummary,
  } = useDashboardStore();
  const { isChanged, userPets, getUserPet, getUserPets } = usePetStore();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if(user === undefined) return;
    if (!user) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    if (user?.userType == 2) {
      getUserPet(true, user?.id);
    } else {
      getUserPets(true);
    }
  }, [getUserPet, getUserPets, isChanged, user?.id]);

  useEffect(() => {
    fetchDashboardData();
    fetchUsersSummary();
    fetchPetsSummary();
    fetchApptSummary();
  }, [
    fetchDashboardData,
    fetchUsersSummary,
    fetchPetsSummary,
    fetchApptSummary,
  ]);

  useEffect(() => {
    setIsLoading(true);
    getDashboard().finally(() => setIsLoading(false));
  }, []);

  return (
    <SecureMainLayout>
      <ContentLayout title="Dashboard">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>Dashboard</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="mt-5">
          {user?.userType == 3 && (
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" onClick={() => setClicked(!clicked)}>
                  Edit Dashboard
                </Button>
              </DialogTrigger>
              <DashboardForm
                clicked={clicked}
                onClose={() => setIsOpen(false)}
              />
            </Dialog>
          )}

          {isLoading ? (
            <Card className="flex flex-col mt-5 p-20">
              <div className="w-full text-center">Loading...</div>
            </Card>
          ) : (
            <DashboardContainer dashboard={dashboard} userType={user?.userType} />
          )}
        </div>
        <div className="mt-5">Recently Added Pet</div>
        <div className="flex flex-wrap mt-2 pb-12">
          {userPets.slice(0, 4).map((pet, i) => {
            return (
              <div key={i} className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-1">
                <Card>
                  <CardHeader>
                    <CardTitle className="capitalize">{pet?.petName}</CardTitle>
                    <CardDescription className="capitalize">
                      {pet?.species}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <img
                      src={pet?.petImage}
                      alt=""
                      className="w-full aspect-square object-cover"
                    />
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </ContentLayout>
    </SecureMainLayout>
  );
}
