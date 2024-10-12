import { useState } from 'react'

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
  
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

import useAppointmentStore from '@/store/useAppointmentStore';
import { stringToDate } from "@/lib/functions";
import { Textarea } from "@/components/ui/textarea";

function UserCareplan({ appointments }) {  
    const { updateUserFeedback } = useAppointmentStore();
    const [saveLoading, setSaveLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [feedback, setFeedback] = useState('');
        
    const handleAddRating = (appointmentId) => {
        setSaveLoading(true);
        updateUserFeedback(appointmentId, feedback).finally(() => {
        setFeedback('');
        setIsOpen(false);
        setSaveLoading(false);
        });
    }

    return (
        <>
            {appointments?.map((appointment) => {
                return <div key={appointment?.id} className="w-full sm:w-1/3 xl:w-1/4 p-2">
                <Card className="p-2 h-full">
                    <CardHeader>
                    <CardTitle className="text-center">{appointment?.title}</CardTitle>
                    <CardDescription className="text-center">{appointment?.appointmentType}</CardDescription>
                    </CardHeader>
                    <CardContent>
                    <div className="text-center">{stringToDate(appointment?.date)}</div>
                    <div className="text-center text-sm">{appointment?.time}</div>
                    {appointment?.prescriptionFile ?
                        <>
                            <a href={appointment?.prescriptionFile?.url} target="_blank" className="block text-center text-sm bg-primary text-primary-foreground py-2 px-3 mt-5 rounded cursor-pointer hover:bg-primary/85">View Prescription</a>
                            <div onClick={() => {
                                setIsOpen(true);
                                setFeedback(appointment?.userFeedback);
                            }} className="text-center text-sm bg-primary text-primary-foreground py-2 px-3 mt-2 rounded cursor-pointer hover:bg-primary/85">Add Feedback</div>
                            <AlertDialog open={isOpen}>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                    <AlertDialogTitle>Add your feedback</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        <Textarea value={feedback} onChange={(e) => setFeedback(e.target.value)} placeholder="Enter you feedback"/>
                                    </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                    <AlertDialogCancel onClick={() => setIsOpen(false)}>Close</AlertDialogCancel>
                                    <AlertDialogAction disabled={!feedback || saveLoading} onClick={() => handleAddRating(appointment?.id)}><LoadingSpinner isLoading={saveLoading} disabled={true} /> Rate</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </>
                        :
                        <div className="text-center text-sm bg-secondary text-secondary-foreground py-2 px-3 mt-5 rounded booked-cursor">View Prescription</div>
                    }
                    </CardContent>
                </Card>
                </div>
            })
            }
        </>
    )
}

export default UserCareplan;
