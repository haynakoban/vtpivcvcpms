import React, { useState } from "react";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
} from "@/components/ui/alert-dialog";

import useAppointmentStore from "@/store/useAppointmentStore";
import useAuthStore from "@/store/useAuthStore";
import { stringToDate } from "@/lib/functions";

const ActionCell = ({ appointment }) => {
  const { user } = useAuthStore();
  const { getUserAppointments, cancelAppointment } = useAppointmentStore();
  const [isOpen, setIsOpen] = useState(false);
  const handleCancel = (appointmentId) => {
    cancelAppointment(appointmentId).finally(() => getUserAppointments(user?.id));
  }

  const [pets, setPets] = useState([]);

  return (
    <DropdownMenu open={isOpen} onOpenChange={() => setIsOpen((prev) => !prev)} modal={isOpen}>
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
                <div className="mt-2">Appointment: {appointment?.appointmentType}</div>
                <div>Date: {stringToDate(appointment?.date)}</div>
                <div>Time: {appointment?.time}</div>
                <div className="mt-2">Pets: </div>
                <div className="flex mt-2 flex-wrap">
                        {pets.length > 0 ? (
                            pets.map((pet) => (
                            <div key={pet?.id} className="w-1/3 p-2">
                                <img src={pet?.petImage} alt={pet?.petName} className="w-full object-cover aspect-square rounded" />
                                <div className="mt-2">Name: {pet?.petName}</div>
                                <div>Species: {pet?.species}</div>
                                <div>Breed: {pet?.breed}</div>
                            </div>
                            ))
                        ) : (
                            <div>No pets available.</div>
                        )}
                </div>
                <div className="mt-2"><span className={`py-2 px-4 text-white capitalize rounded bg-[${appointment?.color}]`}>{appointment?.desc}</span> </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setIsOpen((prev) => !prev)}>Close</AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <DropdownMenuSeparator />

        <AlertDialog>
          <AlertDialogTrigger className={`w-full bg-destructive text-white p-2 text-sm rounded-md ${appointment?.status == 'cancelled' ? 'bg-muted booked-cursor dark:!text-white !text-black' : 'hover:bg-destructive/90'}`} disabled={appointment?.status == 'cancelled' || appointment?.status == 'completed'}>Cancel</AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will cancel your booking
                and no refund policy.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setIsOpen((prev) => !prev)}>Close</AlertDialogCancel>
              <AlertDialogAction 
                onClick={() => {
                    handleCancel(appointment?.id)
                    setIsOpen((prev) => !prev)
                }} 
                className="bg-destructive hover:bg-destructive/90">Sure</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionCell;