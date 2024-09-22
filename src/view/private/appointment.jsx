/* eslint-disable react/no-unescaped-entities */
import { Link, useNavigate } from "react-router-dom";
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
} from "@/components/ui/alert-dialog";

import DataTable from "@/components/appointments/data-table";
import { columns, users } from "@/components/appointments/columns";
import { Button } from "@/components/ui/button";

export default function Appointment() {
  const navigate = useNavigate();

  return (
    <SecureMainLayout>
      <ContentLayout title="Appointment">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/auth/dashboard">Dashboard</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Appointment</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="mt-5">
          <div className="w-full justify-between flex items-center space-x-6">
            <h1>Your Appointment History</h1>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button>Start Appointment</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Terms and Conditions</AlertDialogTitle>
                  <AlertDialogDescription>
                    <p>
                      This veterinary appointment scheduling system allocates
                      appointment slots on a first come, first served basis.
                    </p>
                    <p className="mt-3">
                      Users accept full responsibility for providing accurate
                      and correct information when booking an appointment.
                      Inaccurate or incomplete information may result in the
                      forfeiture of the scheduled appointment without the right
                      to a refund.
                    </p>
                    <p className="mt-3">
                      <p>
                        For appointments utilizing the online payment system,
                        all fees are non-refundable. Fees will be forfeited in
                        the following situations:
                      </p>
                      <ul className="mt-2 ml-2 space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
                        <li>Failure to attend the confirmed appointment.</li>
                        <li>Cancellation of the appointment by the user.</li>
                        <li>
                          Incomplete or inaccurate information provided during
                          the booking process.
                        </li>
                        <li>
                          Presentation of incorrect, inconsistent, or fraudulent
                          documents or information.
                        </li>
                      </ul>
                    </p>
                    <p className="mt-3">
                      By proceeding with the booking, I understand and give my
                      full consent to the disclosure, collection, and use of my
                      personal information as required for the scheduling and
                      management of the veterinary appointment. I acknowledge
                      that this consent includes the waiver of any privacy
                      rights under the applicable data protection laws,
                      including the clinic's Privacy Policy and relevant
                      national regulations.
                    </p>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => navigate("/auth/appointment/create")}
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
          <DataTable columns={columns} data={users} />
        </div>
      </ContentLayout>
    </SecureMainLayout>
  );
}
