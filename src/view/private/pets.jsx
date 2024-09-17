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

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import useAuthStore from "@/store/useAuthStore";
import PetRegistrationForm from "@/components/forms/PetRegistrationForm";
import { useState } from "react";


export default function Pets() {
  const { user } = useAuthStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const pets = [
    {
      name: 'Pochi',
      type: 'Dog',
      thumbnail: 'https://www.shutterstock.com/image-photo/happy-puppy-welsh-corgi-14-600nw-2270841247.jpg'
    },
    {
      name: 'Ming Ming',
      type: 'Cat',
      thumbnail: 'https://cdn.britannica.com/36/234736-050-4AC5B6D5/Scottish-fold-cat.jpg'
    },
    {
      name: 'Mingzi',
      type: 'Cat',
      thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cat_November_2010-1a.jpg/800px-Cat_November_2010-1a.jpg'
    },
  ];

  return (
    <SecureMainLayout>
      <ContentLayout title="My Pets">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/auth/dashboard">Dashboard</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>My Pets</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="mt-5 flex justify-between items-center">
          <div>My Pets</div>
          {user?.userType == 2 &&
            <Button onClick={() => setIsModalOpen(true)}>Register My Pet</Button>
          }
        </div>
        <div className="flex flex-wrap mt-2">
          {pets.map((pet, i) => {
            return <div key={i} className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-1">
              <Card>
                <CardHeader>
                  <CardTitle>{pet?.name}</CardTitle>
                  <CardDescription>{pet?.type}</CardDescription>
                </CardHeader>
                <CardContent>
                  <img src={pet?.thumbnail} alt="" className="w-full aspect-square object-cover" />
                </CardContent>
                <CardFooter className="w-full">
                  <Button className="w-full">View Information</Button>
                </CardFooter>
              </Card>
            </div>
          })}
        </div>
        {isModalOpen &&
          <PetRegistrationForm setIsModalOpen={setIsModalOpen}  />
        }
      </ContentLayout>
    </SecureMainLayout>
  );
}
