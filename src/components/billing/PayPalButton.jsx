import { useEffect, useState } from 'react';
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
  } from "@/components/ui/alert-dialog";

import { FaCircleCheck } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

const PayPalButton = ({ amount, processForm }) => {
    const PAYPAL_CLIENT_ID = import.meta.env.VITE_PAYPAL_CLIENT_ID;
    const SANDBOX_CLIENT_ID = import.meta.env.VITE_PAYPAL_SANDBOX_ID;
    const navigate = useNavigate();
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const script = document.createElement('script');
        // script.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&currency=PHP`;
        script.src = `https://www.paypal.com/sdk/js?client-id=${SANDBOX_CLIENT_ID}&currency=PHP`;
        script.async = true;
        script.onload = () => {
        window.paypal.Buttons({
            createOrder: (data, actions) => {
                return actions.order.create({
                    purchase_units: [{
                    amount: {
                        value: amount,
                        currency_code: 'PHP'
                    },
                    }],
                });
            },
            onApprove: (data, actions) => {
            return actions.order.capture().then((details) => {
                setSuccess(true);
                processForm();
            });
            },
            onError: (err) => {
            console.error('PayPal Button Error', err);
            },
        }).render('#paypal-button-container');
        };
        document.body.appendChild(script);
    }, []);

    return (
        <div>
            <div id="paypal-button-container"></div>
            <AlertDialog open={success} onOpenChange={() => navigate('/auth/appointment')}>
                <AlertDialogContent className="z-[999]">
                    <AlertDialogHeader>
                    <AlertDialogTitle className="flex items-center gap-2 justify-center">Appointment Scheduled <FaCircleCheck /></AlertDialogTitle>
                    <AlertDialogDescription className="text-center">
                        Thank you for scheduling your appointment at Paws & Care Clinic! 
                        Your payment via PayPal has been successfully processed. 
                        We look forward to seeing you and your pet.
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="!justify-center">
                    <AlertDialogCancel>Close</AlertDialogCancel>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default PayPalButton;