import { Button } from "@/components/ui/button";

/* eslint-disable react/prop-types */
export function LeaveScreen({ setIsMeetingLeft }) {
  return (
    <div className="h-screen flex flex-col flex-1 items-center justify-center">
      <h1 className="text-4xl">You left the meeting!</h1>
      <div className="mt-12 text-center">
        <Button
          variant="secondary"
          className="`w-full px-16 py-6 rounded-xl text-sm font-semibold border"
          onClick={() => {
            setIsMeetingLeft(false);
          }}
        >
          Rejoin the Meeting
        </Button>
        <div className="mt-2"></div>
        <Button
          variant="destructive"
          className="w-full px-16 py-6 rounded-xl text-sm font-semibold border"
          onClick={() => {
            window.close()
          }}
        >
          Close
        </Button>
      </div>
    </div>
  );
}
