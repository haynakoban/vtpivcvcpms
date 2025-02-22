/* eslint-disable react/prop-types */
import { CheckIcon, ClipboardIcon } from "@heroicons/react/outline";
import { useState } from "react";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import useAuditStore from "@/store/useAuditStore";
import useAuthStore from "@/store/useAuthStore";

export function MeetingDetailsScreen({
  onClickJoin,
  _handleOnCreateMeeting,
  participantName,
  setParticipantName,
  onClickStartMeeting,
}) {
  const { user } = useAuthStore();
  const { addAudit } = useAuditStore();
  const navigate = useNavigate();
  const [meetingId, setMeetingId] = useState("");
  const [meetingIdError, setMeetingIdError] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [iscreateMeetingClicked, setIscreateMeetingClicked] = useState(false);
  const [isJoinMeetingClicked, setIsJoinMeetingClicked] = useState(false);

  return (
    <div
      className={`flex flex-1 flex-col justify-center w-full md:p-[6px] sm:p-1 p-1.5`}
    >
      {iscreateMeetingClicked ? (
        <div className="border border-solid border-gray-400 rounded-xl px-4 py-3  flex items-center justify-center">
          <p className="text-base">{`Meeting code : ${meetingId}`}</p>
          <button
            className="ml-2"
            onClick={() => {
              navigator.clipboard.writeText(meetingId);
              setIsCopied(true);
              setTimeout(() => {
                setIsCopied(false);
              }, 3000);
            }}
          >
            {isCopied ? (
              <CheckIcon className="h-5 w-5 text-green-400" />
            ) : (
              <ClipboardIcon className="h-5 w-5" />
            )}
          </button>
        </div>
      ) : isJoinMeetingClicked ? (
        <>
          <Input
            defaultValue={meetingId}
            onChange={(e) => {
              setMeetingId(e.target.value);
            }}
            placeholder={"Enter meeting Id"}
            className="py-6 rounded-xl w-full text-center"
          />
          {meetingIdError && (
            <p className="text-xs text-red-600">{`Please enter valid meetingId`}</p>
          )}
        </>
      ) : null}

      {(iscreateMeetingClicked || isJoinMeetingClicked) && (
        <>
          <Input
            value={participantName}
            onChange={(e) => setParticipantName(e.target.value)}
            disabled
            placeholder="Enter your name"
            className="py-6 mt-5 rounded-xl w-full text-center"
          />

          {/* <p className="text-xs text-white mt-1 text-center">
            Your name will help everyone identify you in the meeting.
          </p> */}
          <Button
            disabled={participantName.length < 3}
            className={`w-full py-6 rounded-xl mt-5`}
            onClick={() => {
              if (iscreateMeetingClicked) {
                addAudit({
                  userId: user.id,
                  log: "New meeting created",
                  action: "Created a meeting",
                  actionId: user.id,
                });

                onClickStartMeeting();
              } else {
                if (meetingId.match("\\w{4}\\-\\w{4}\\-\\w{4}")) {
                  addAudit({
                    userId: user.id,
                    log: "Joined a meeting",
                    action: "Joined a meeting",
                    actionId: user.id,
                  });

                  onClickJoin(meetingId);
                } else setMeetingIdError(true);
              }
            }}
          >
            {iscreateMeetingClicked ? "Start a meeting" : "Join a meeting"}
          </Button>

          <Button
            variant="outline"
            className="`w-full mt-5 px-16 py-6 rounded-xl text-sm font-semibold border"
            onClick={() => {
              setMeetingId("");
              setIsJoinMeetingClicked(false);
              setIscreateMeetingClicked(false);
            }}
          >
            <IoMdArrowRoundBack /> &nbsp;Back
          </Button>
        </>
      )}

      {!iscreateMeetingClicked && !isJoinMeetingClicked && (
        <div className="w-full md:mt-0 mt-4 flex flex-col">
          <div className="flex items-center justify-center flex-col w-full ">
            {user?.userType == 1 &&
            <Button
              className="w-full py-6 rounded-xl"
              onClick={async () => {
                const { meetingId, err } = await _handleOnCreateMeeting();

                if (meetingId) {
                  setMeetingId(meetingId);
                  setIscreateMeetingClicked(true);
                } else {
                  toast(`${err}`, {
                    position: "bottom-left",
                    autoClose: 4000,
                    hideProgressBar: true,
                    closeButton: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                  });
                }
              }}
            >
              Create a meeting
            </Button>
            }
            <Button
              variant={`${user?.userType == 1 ? 'outline' : ''}`}
              className="w-full py-6 rounded-xl mt-5"
              onClick={() => {
                setIsJoinMeetingClicked(true);
              }}
            >
              Join a meeting
            </Button>
            <Button
              variant="outline"
              className="w-full px-16 py-6 mt-5 rounded-xl text-sm font-semibold border"
              onClick={() => {
                navigate("/");
              }}
            >
              <IoMdArrowRoundBack /> &nbsp;Back to home
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
