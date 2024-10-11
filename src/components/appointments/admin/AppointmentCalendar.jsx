import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import useAppointmentStore from '@/store/useAppointmentStore';
import { useEffect, useState } from 'react';
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
import { stringToDate } from '@/lib/functions';
import { FaUpload } from 'react-icons/fa6';

function AppointmentCalendar() {
    const { getAppointments, appointments } = useAppointmentStore();
    const [appointmentData, setAppointmentData] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [file, setFile] = useState(null);

    const handleDrop = (e) => {
        e.preventDefault();
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile) {
          setFile(droppedFile);
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
    },[]);

    useEffect(() => {
        if(!isOpen){
            setAppointmentData(null);
        }
        setFile(null);
    },[isOpen])

    const eventStyleGetter = (event) => {
        const backgroundColor = event.color || 'lightgray'; // Default color
        return {
          style: {
            backgroundColor,
            borderRadius: '5px',
            opacity: 1,
            color: 'white',
            border: '0',
            display: 'block',
          },
        };
    };

    const handleSelectEvent = (event) => {
        setAppointmentData(event);
        setIsOpen(true);
    };

    return (
        <div>
            <div>
                Status:
            </div>
            <div className='flex gap-4 flex-wrap justify-start items-center'>
                <div className='flex gap-2 justify-start items-center'>
                    <div className='bg-[#4CAF50] h-6 w-6 rounded'></div>
                    <div>Completed</div>
                </div>
                <div className='flex gap-2 justify-start items-center'>
                    <div className='bg-[#FF9800] h-6 w-6 rounded'></div>
                    <div>Pending</div>
                </div>
                <div className='flex gap-2 justify-start items-center'>
                    <div className='bg-[#F44336] h-6 w-6 rounded'></div>
                    <div>Cancelled</div>
                </div>
                <div className='flex gap-2 justify-start items-center'>
                    <div className='bg-[lightgray] h-6 w-6 rounded'></div>
                    <div>No-show</div>
                </div>
            </div>
            <div className='h-[80vh] pb-12 mt-5'>
                <Calendar
                    localizer={localizer}
                    events={appointments}
                    startAccessor="start"
                    endAccessor="end"
                    eventPropGetter={eventStyleGetter}
                    onSelectEvent={handleSelectEvent}
                />
            </div>

            {appointmentData &&
                <AlertDialog open={isOpen}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                        <AlertDialogTitle>Appointment Informations</AlertDialogTitle>
                        <AlertDialogDescription>
                            <div className="mt-2">Owner: {appointmentData?.displayName || appointmentData?.alternateDisplayName}</div>
                            <div>Appointment: {appointmentData?.appointmentType}</div>
                            <div>Date: {stringToDate(appointmentData?.date)}</div>
                            <div>Time: {appointmentData?.time}</div>
                            <div className="mt-2">Status: &nbsp;<span className={`py-1 px-2 text-white capitalize rounded-md bg-[${appointmentData?.color}]`}>{appointmentData?.desc}</span> </div>
                            <div className='mt-5'>Prescription:</div>
                            <div 
                                onDrop={handleDrop}
                                onDragOver={handleDragOver}
                                className={`mt-2 mb-2 flex justify-center flex-col items-center aspect-video bg-secondary rounded-md ${appointmentData?.status == 'cancelled' ? 'booked-cursor' : ''}`}>
                                <FaUpload className="text-3xl text-center" />
                                <p className='mt-2'>Drag and drop file here</p>
                                <p className='my-2'>- or -</p>
                                <label htmlFor="prescription_file">
                                    <div className={`bg-primary text-primary-foreground px-3 py-2 rounded hover:bg-primary/85 cursor-pointer  ${appointmentData?.status == 'cancelled' ? 'booked-cursor' : ''}`}>Browse File</div>
                                    <input 
                                        type="file" 
                                        hidden 
                                        id='prescription_file'
                                        onChange={handleFileChange}
                                        disabled={appointmentData?.status == 'cancelled'} />
                                </label>
                            </div>
                            {file && 
                                <a href={URL.createObjectURL(file)} target='_blank' className='block border px-3 py-2 rounded hover:bg-secondary w-full'>{file?.name || 'File'}</a>
                            }
                        </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setIsOpen(false)}>Close</AlertDialogCancel>
                        <AlertDialogAction disabled={!file}>Upload</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            }
        </div>
    )
}

export default AppointmentCalendar
