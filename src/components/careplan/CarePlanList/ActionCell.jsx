/* eslint-disable react/prop-types */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";

import useAppointmentStore from "@/store/useAppointmentStore";
import useAuthStore from "@/store/useAuthStore";
import { stringToDate } from "@/lib/functions";

const ActionCell = ({ appointment }) => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const { getUserAppointments, cancelAppointment, createCarePlan } =
    useAppointmentStore();
  const [isOpen, setIsOpen] = useState(false);
  const handleCancel = (appointmentId) => {
    cancelAppointment(appointmentId).finally(() =>
      getUserAppointments(user?.id)
    );
  };

  const [pets, setPets] = useState([]);

  const handleCarePlan = async (appointmentId, petId, userId) => {
    const response = await createCarePlan(appointmentId, petId, userId);

    if (response) navigate(`/auth/careplan/${response.id}/${petId}`);
  };

  return (
    <DropdownMenu
      open={isOpen}
      onOpenChange={() => setIsOpen((prev) => !prev)}
      modal={isOpen}
    >
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <AlertDialog>
          <AlertDialogTrigger>
            <Button
              className="w-full"
              variant="ghost"
              onClick={() => setPets(appointment?.pets)}
            >
              View Information
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Appointment Informations</AlertDialogTitle>
              <AlertDialogDescription>
                <div className="mt-2">
                  Appointment: {appointment?.appointmentType}
                </div>
                <div>Date: {stringToDate(appointment?.date)}</div>
                <div>Time: {appointment?.time}</div>
                <div className="mt-2">Pets: </div>
                <div className="flex mt-2 flex-wrap">
                  {pets.length > 0 ? (
                    pets.map((pet, index) => (
                      <div key={`${pet?.id}-${index}`} className="w-1/3 p-2">
                        <img
                          src={pet?.petImage}
                          alt={pet?.petName}
                          className="w-full object-cover aspect-square rounded"
                        />
                        <div className="mt-2">Name: {pet?.petName}</div>
                        <div>Species: {pet?.species}</div>
                        <div>Breed: {pet?.breed}</div>
                        {appointment?.desc === "Completed" &&
                          (() => {
                            const existingCarePlan =
                              appointment?.carePlans?.find(
                                (plan) => plan.petId === pet.id
                              );

                            if (
                              existingCarePlan &&
                              existingCarePlan.status === "locked"
                            ) {
                              return (
                                <Button
                                  onClick={() => {
                                    navigate(
                                      `/auth/careplan/${appointment.id}/${pet.id}`
                                    );
                                  }}
                                  className="mt-2.5"
                                  variant="ghost"
                                >
                                  View Careplan
                                </Button>
                              );
                            }

                            return (
                              <Button
                                className="mt-2.5 cursor-not-allowed"
                                variant="ghost"
                              >
                                Unavailable
                              </Button>
                            );
                          })()}
                      </div>
                    ))
                  ) : (
                    <div>No pets available.</div>
                  )}
                </div>
                {/* <div className="mt-2">
                  <span
                    className={`py-2 px-4 text-white capitalize rounded bg-[${appointment?.color}]`}
                  >
                    {appointment?.desc}
                  </span>{" "}
                </div> */}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setIsOpen((prev) => !prev)}>
                Close
              </AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionCell;
