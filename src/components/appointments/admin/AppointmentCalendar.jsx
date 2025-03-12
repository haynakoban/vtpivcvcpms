/* eslint-disable react/no-unescaped-entities */
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

import useAppointmentStore from "@/store/useAppointmentStore";
import { useEffect, useState } from "react";
const localizer = momentLocalizer(moment);

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { stringToDate } from "@/lib/functions";
import { FaUpload } from "react-icons/fa6";
import LoadingSpinner from "@/components/loaders/LoadingSpinner";

import useAuthStore from "@/store/useAuthStore";
import useAuditStore from "@/store/useAuditStore";

function AppointmentCalendar() {
  const {
    getAppointments,
    appointments,
    updateNoShowStatus,
    isChanged,
    updatePrescriptionFile,
  } = useAppointmentStore();
  const [appointmentData, setAppointmentData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [noShow, setNoShow] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);

  const { user } = useAuthStore();
  const { addAudit } = useAuditStore();
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
    getAppointments();
  }, [isChanged]);

  useEffect(() => {
    if (!isOpen) {
      setAppointmentData(null);
    }
    setFile(null);
  }, [isOpen]);

  const eventStyleGetter = (event) => {
    const backgroundColor = event.color || "lightgray"; // Default color
    return {
      style: {
        backgroundColor,
        borderRadius: "5px",
        opacity: 1,
        color: "white",
        border: "0",
        display: "block",
        textDecoration: event.status === "no-show" ? "line-through" : "none",
        textDecorationThickness: "2px",
      },
    };
  };

  const handleSelectEvent = (event) => {
    setAppointmentData(event);
    setIsOpen(true);
  };

  const handleUploadPrescription = (appointmentId, url) => {
    setSaveLoading(true);
    updatePrescriptionFile(file, appointmentId, url).finally(() => {
      setSaveLoading(false);
      setIsOpen(false);

      let log = "Uploaded a prescription";
      if(url){
        log = "Re-uploaded a prescription";   
      }
  
      addAudit({
        userId: user.id,
        log,
        action: "Uploaded file",
        actionId: user.id,
      });v
    });
  };

  return (
    <div>
      <div>Status:</div>
      <div className="flex gap-4 flex-wrap justify-start items-center">
        <div className="flex gap-2 justify-start items-center">
          <div className="bg-[#4CAF50] h-6 w-6 rounded"></div>
          <div>Completed</div>
        </div>
        <div className="flex gap-2 justify-start items-center">
          <div className="bg-[#FF9800] h-6 w-6 rounded"></div>
          <div>Pending</div>
        </div>
        <div className="flex gap-2 justify-start items-center">
          <div className="bg-[#F44336] h-6 w-6 rounded"></div>
          <div>Cancelled</div>
        </div>
        <div className="flex gap-2 justify-start items-center">
          <div className="bg-[lightgray] h-6 w-6 rounded"></div>
          <div>No-show</div>
        </div>
      </div>
      <div className="h-[80vh] pb-12 mt-5">
        <Calendar
          localizer={localizer}
          events={appointments}
          startAccessor="start"
          endAccessor="end"
          eventPropGetter={eventStyleGetter}
          onSelectEvent={handleSelectEvent}
        />
      </div>

      {appointmentData && (
        <AlertDialog open={isOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Appointment Informations</AlertDialogTitle>
              <AlertDialogDescription>
                <div className="mt-2">
                  Owner:{" "}
                  {appointmentData?.displayName ||
                    appointmentData?.alternateDisplayName}
                </div>
                <div>Appointment: {appointmentData?.appointmentType}</div>
                <div>Date: {stringToDate(appointmentData?.date)}</div>
                <div>Time: {appointmentData?.time}</div>
                <div className="mt-2">
                  <span
                    className={`py-1 px-2 text-white capitalize rounded-md bg-[${appointmentData?.color}]`}
                  >
                    {appointmentData?.desc}
                  </span>
                </div>
                {appointmentData?.desc == "Pending" ? (
                  <div className="mt-2">
                    <p>
                      Client did not attend? Click <b>"No-show"</b> to update
                      status.
                    </p>
                    <div className="flex justify-start items-center gap-2">
                      <button
                        className="block border px-3 py-2 rounded hover:bg-secondary"
                        onClick={() => setNoShow(true)}
                      >
                        No-show
                      </button>
                      <AlertDialog open={noShow}>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will update
                              your client status into "No-show".
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel onClick={() => setNoShow(false)}>
                              Close
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => {
                                updateNoShowStatus(appointmentData?.id);
                                setNoShow(false);
                                setIsOpen(false);
                              }}
                            >
                              Sure
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                ) : (
                  ""
                )}
                <div className="mt-5">Prescription:</div>
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  className={`mt-2 mb-2 flex justify-center flex-col items-center aspect-video bg-secondary rounded-md ${
                    appointmentData?.status == "cancelled" ||
                    appointmentData?.desc == "No-show"
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
                        appointmentData?.status == "cancelled" ||
                        appointmentData?.desc == "No-show"
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
                      disabled={appointmentData?.status == "cancelled"}
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
                    {appointmentData?.prescriptionFile && (
                      <a
                        href={appointmentData?.prescriptionFile?.url}
                        target="_blank"
                        className="block border px-3 py-2 rounded hover:bg-secondary w-full"
                      >
                        {appointmentData?.prescriptionFile?.name}
                      </a>
                    )}
                  </>
                )}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setIsOpen(false)}>
                Close
              </AlertDialogCancel>
              <AlertDialogAction
                disabled={!file || saveLoading}
                onClick={() =>
                  handleUploadPrescription(
                    appointmentData?.id,
                    appointmentData?.prescriptionFile?.url
                  )
                }
              >
                <LoadingSpinner isLoading={saveLoading} /> Upload
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}

export default AppointmentCalendar;
