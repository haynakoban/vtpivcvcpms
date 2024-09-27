import SecureMainLayout from "@/layout/private";
import { ContentLayout } from "@/layout/private/content-layout";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

import DashboardPieChart from "@/components/dashboard/DashboardPieChart";
import { useEffect, useState } from "react";

import usePetStore from "@/store/usePetStore";
import useAuthStore from "@/store/useAuthStore";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Dashboard() {
  const { user } = useAuthStore();
  const { isChanged, userPets, getUserPet, getUserPets } = usePetStore();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true)
    if(user?.userType == 1){
      getUserPets(true).finally(() => setIsLoading(false));
    }else{
      getUserPet(true, user?.id).finally(() => setIsLoading(false));
    }
  },[getUserPet, getUserPets, isChanged, user?.id]);

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
          {
            isLoading ?
            <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
              <CardTitle>Pet Popularity by Species</CardTitle>
              <CardDescription>A breakdown of pet ownership by species, showing the percentage of each type.</CardDescription>
            </CardHeader>
              <CardContent className="flex justify-center items-center max-h-[400px] min-h-[400px]">
                  <div className="w-full text-center">Loading...</div>
              </CardContent>
            </Card>
            :
            <DashboardPieChart pets={userPets}/>
          }
        </div>
        <div className="mt-5">Recently Added Pet</div>
        <div className="flex flex-wrap mt-2">
          {userPets.slice(0, 4).map((pet, i) => {
            return <div key={i} className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-1">
              <Card>
                <CardHeader>
                  <CardTitle className="capitalize">{pet?.petName}</CardTitle>
                  <CardDescription className="capitalize">{pet?.species}</CardDescription>
                </CardHeader>
                <CardContent>
                  <img src={pet?.petImage} alt="" className="w-full aspect-square object-cover" />
                </CardContent>
              </Card>
            </div>
          })}
        </div>
      </ContentLayout>
    </SecureMainLayout>
  );
}
