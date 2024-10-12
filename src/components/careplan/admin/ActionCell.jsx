import { useEffect, useState } from "react";
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
import useAuditStore from "@/store/useAuditStore";
import useAuthStore from "@/store/useAuthStore";
import { stringToDate } from "@/lib/functions";
import { FaUpload } from "react-icons/fa6";
import LoadingSpinner from "@/components/loaders/LoadingSpinner";

const ActionCell = ({ appointment }) => {
  const { user } = useAuthStore();
  const { addAudit } = useAuditStore();
  const { updatePrescriptionFile } = useAppointmentStore();
  const [pets, setPets] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [saveLoading, setSaveLoading] = useState(false);

  
  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      if (
        droppedFile.type === "application/pdf" ||
        droppedFile.name.endsWith(".pdf")
      ) {
        setFile(droppedFile);
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  useEffect(() => {
    setFile(null);
  }, [isOpen]);
  
  const handleUploadPrescription = (appointmentId, url) => {
    setSaveLoading(true);
    updatePrescriptionFile(file, appointmentId, url).finally(() => {
      setSaveLoading(false);
      setIsOpen(false);
      setIsUploadOpen(false);

      let log = "Uploaded a prescription";
      if(url){
        log = "Re-uploaded a prescription";   
      }
  
      addAudit({
        userId: user.id,
        log,
        action: "Uploaded file",
        actionId: user.id,
      });
    });
  };

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
                <div className="mt-5">
                  {appointment?.prescriptionFile ?
                    <a className="px-3 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/85" href={appointment?.prescriptionFile?.url} target="_blank">View Prescription</a>
                    :
                    <span className="px-3 py-2 bg-secondary text-secondary-foreground rounded hover:bg-secondary/85 booked-cursor">View Prescription</span>
                  }
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setIsOpen((prev) => !prev)}>Close</AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <DropdownMenuSeparator />

        <AlertDialog open={isUploadOpen || saveLoading} onOpenChange={() => setIsUploadOpen((prev) => !prev)}>
          <AlertDialogTrigger className={`w-full p-2 text-sm rounded-md ${appointment?.prescriptionFile ? 'bg-secondary text-secondary-foreground' : 'bg-primary text-primary-foreground' }`}>{appointment?.prescriptionFile ? 'Re-upload' : 'Upload' }</AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                <div className="mt-2">
                  Owner:{" "}
                  {appointment?.displayName ||
                    appointment?.alternateDisplayName}
                </div>
                <div>Appointment: {appointment?.appointmentType}</div>
                <div>Date: {stringToDate(appointment?.date)}</div>
                <div>Time: {appointment?.time}</div>
                <div className="mt-2">
                  <span
                    className={`py-1 px-2 text-white capitalize rounded-md bg-[${appointment?.color}]`}
                  >
                    {appointment?.desc}
                  </span>
                </div>
                <div className="mt-5">Prescription:</div>
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  className={`mt-2 mb-2 flex justify-center flex-col items-center aspect-video bg-secondary rounded-md ${
                    appointment?.status == "cancelled" ||
                    appointment?.desc == "No-show"
                      ? "booked-cursor"
                      : ""
                  }`}
                >
                  <FaUpload className="text-3xl text-center" />
                  <p className="mt-2">Drag and drop file here</p>
                  <p className="my-2">- or -</p>
                  <label htmlFor="prescription_file">
                    <div
                      className={`bg-primary text-primary-foreground px-3 py-2 rounded hover:bg-primary/85 cursor-pointer  ${
                        appointment?.status == "cancelled" ||
                        appointment?.desc == "No-show"
                          ? "booked-cursor"
                          : ""
                      }`}
                    >
                      Browse File
                    </div>
                    <input
                      type="file"
                      hidden
                      id="prescription_file"
                      accept=".pdf"
                      onChange={handleFileChange}
                      disabled={appointment?.status == "cancelled"}
                    />
                  </label>
                </div>
                {file ? (
                  <a
                    href={URL.createObjectURL(file)}
                    target="_blank"
                    className="block border px-3 py-2 rounded hover:bg-secondary w-full"
                  >
                    {file?.name || "File"}
                  </a>
                ) : (
                  <>
                    {appointment?.prescriptionFile && (
                      <a
                        href={appointment?.prescriptionFile?.url}
                        target="_blank"
                        className="block border px-3 py-2 rounded hover:bg-secondary w-full"
                      >
                        {appointment?.prescriptionFile?.name}
                      </a>
                    )}
                  </>
                )}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setIsOpen(false)}>Close</AlertDialogCancel>
              <AlertDialogAction 
                disabled={!file || saveLoading}
                onClick={() =>
                  handleUploadPrescription(
                    appointment?.id,
                    appointment?.prescriptionFile?.url
                  )
                }
                className="bg-primary hover:bg-primary/90"><LoadingSpinner isLoading={saveLoading} />{appointment?.prescriptionFile ? 'Update' : 'Upload'}</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionCell;