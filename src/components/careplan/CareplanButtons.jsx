/* eslint-disable react/prop-types */
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
import { Button } from "@/components/ui/button";

export default function CareplanButtons({
  carePlan,
  isFormChanged,
  onSaveAndLock,
  lockCareplan,
  cancelCareplan,
  navigate,
  printCarePlan,
}) {
  return (
    <div className="mt-5 flex justify-end gap-2.5 no-print">
      {carePlan?.status !== "locked" && (
        <>
          <Button type="submit" variant="default">
            Save Care Plan
          </Button>

          {/* Lock Care Plan */}
          {isFormChanged ? (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button type="button" variant="default">
                  Lock Care Plan
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Unsaved Changes</AlertDialogTitle>
                  <AlertDialogDescription>
                    You have unsaved changes. Would you like to save and lock
                    this care plan?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>No, Keep Editing</AlertDialogCancel>
                  <AlertDialogAction onClick={onSaveAndLock}>
                    Yes, Save and Lock
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          ) : (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button type="button" variant="default">
                  Lock Care Plan
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirm Care Plan Lock</AlertDialogTitle>
                  <AlertDialogDescription>
                    Locking this care plan will prevent further edits. This
                    action cannot be undone. Are you sure you want to proceed?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={lockCareplan}>
                    Yes, Lock Care Plan
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}

          {isFormChanged ? (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button type="button" variant="destructive">
                  Cancel
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Unsaved Changes</AlertDialogTitle>
                  <AlertDialogDescription>
                    You have unsaved changes. Are you sure you want to cancel
                    this care plan?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>No, Keep Editing</AlertDialogCancel>
                  <AlertDialogAction onClick={cancelCareplan}>
                    Yes, Discard Changes
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          ) : (
            <Button
              type="button"
              variant="destructive"
              onClick={cancelCareplan}
            >
              Cancel
            </Button>
          )}
        </>
      )}
      {carePlan?.status === "locked" && (
        <Button
          type="button"
          variant="ghost"
          onClick={() => navigate("/auth/careplan")}
        >
          Go Back To Care Plan List
        </Button>
      )}
      <Button
        type="button"
        variant="success"
        onClick={() => printCarePlan("print_careplan")}
      >
        Print
      </Button>
    </div>
  );
}
