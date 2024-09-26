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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { FaTrash } from "react-icons/fa";
import { RiEditFill } from "react-icons/ri";

import useAuthStore from "@/store/useAuthStore";
import PetRegistrationForm from "@/components/forms/PetRegistrationForm";
import { useEffect, useState } from "react";
import usePetStore from "@/store/usePetStore";
import LoadingSpinner from "@/components/loaders/LoadingSpinner";

export default function Pets() {
  const { user } = useAuthStore();
  const { isChanged, userPets, getUserPet, getUserPets, deletePetInformation } = usePetStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [petData, setPetData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if(user?.userType == 1){
      getUserPets();
    } else {
      getUserPet(user?.id);
    }
  },[getUserPet, getUserPets, isChanged, user?.id]);

  useEffect(() => {
    if(!isModalOpen) setPetData(null);
  },[isModalOpen]);

  function updatePetData(data) {
    setIsModalOpen(true);
    setPetData(data);
  }

  function handleDeletePet(id) {
    setIsLoading(true);
    deletePetInformation(id).finally(() => setIsLoading(false));
  }

  return (
    <SecureMainLayout>
      <ContentLayout title={user?.userType == 1  ? 'Pet Management' : 'My Pets'}>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/auth/dashboard">Dashboard</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{user?.userType == 1  ? 'Pet Management' : 'My Pets'}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="mt-5 flex justify-between items-center">
          <div>{user?.userType == 1  ? 'Pet Management' : 'My Pets'}</div>
          {user?.userType == 2 &&
            <Button onClick={() => setIsModalOpen(true)}>Register My Pet</Button>
          }
        </div>
        <div className="flex flex-wrap mt-2">
          {userPets.map((pet, i) => {
            return <div key={i} className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-1">
              <Card>
                <CardHeader>
                  <CardTitle className="capitalize">{pet?.petName}</CardTitle>
                  <CardDescription className="capitalize">{pet?.species}</CardDescription>
                </CardHeader>
                <CardContent>
                  <img src={pet?.petImage} alt="" className="w-full aspect-square object-cover" />
                </CardContent>
                <CardFooter className="w-full">
                  <Button className="w-full" disabled={isLoading}><LoadingSpinner isLoading={isLoading}/> View Information</Button>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button className="ml-2 w-12" variant="outline"><HiOutlineDotsVertical /></Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-50">
                      <div className="grid gap-2">
                        <Button className="w-full text-start justify-start" variant="outline" onClick={() => updatePetData(pet)}><RiEditFill className="mr-2" /> Edit</Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button className="w-full text-start justify-start" variant="destructive"><FaTrash className="mr-2" /> Delete</Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete your
                                pet information.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDeletePet(pet?.id)}>Continue</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </PopoverContent>
                  </Popover>
                </CardFooter>
              </Card>
            </div>
          })}
        </div>
        {isModalOpen &&
          <PetRegistrationForm setIsModalOpen={setIsModalOpen} updateData={petData} />
        }
      </ContentLayout>
    </SecureMainLayout>
  );
}
