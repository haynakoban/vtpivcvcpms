/* eslint-disable react/prop-types */

import { useMeeting, useParticipant } from "@videosdk.live/react-sdk";
import { useMemo } from "react";
import MicOffIcon from "@/icons/ParticipantTabPanel/MicOffIcon";
import MicOnIcon from "@/icons/ParticipantTabPanel/MicOnIcon";
import RaiseHand from "@/icons/ParticipantTabPanel/RaiseHand";
import VideoCamOffIcon from "@/icons/ParticipantTabPanel/VideoCamOffIcon";
import VideoCamOnIcon from "@/icons/ParticipantTabPanel/VideoCamOnIcon";
import { useMeetingAppContext } from "@/MeetingAppContextDef";
import { nameTructed } from "@/utils/helper";
import { useTheme } from "@/components/common/theme-provider";

function ParticipantListItem({ participantId, raisedHand }) {
  const { micOn, webcamOn, displayName, isLocal } =
    useParticipant(participantId);

  const { theme } = useTheme();
  const dynamicIconColor =
    theme === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "#fff"
        : "#000"
      : theme === "dark"
      ? "#fff"
      : "#000";

  console.log({ dynamicIconColor });
  return (
    <div className="mt-2 m-2 p-2 border bg-gray-200 dark:bg-gray-800 rounded-lg mb-0">
      <div className="flex flex-1 items-center justify-center relative">
        <div className="h-10 w-10 text-lg font-semibold text-gray-200 dark:text-gray-900 bg-gray-700 dark:bg-gray-200 mt-0 rounded overflow-hidden flex relative items-center justify-center">
          {displayName?.charAt(0).toUpperCase()}
        </div>
        <div className="ml-2 mr-1 flex flex-1">
          <p className="text-base overflow-hidden whitespace-pre-wrap overflow-ellipsis">
            {isLocal ? "You" : nameTructed(displayName, 15)}
          </p>
        </div>
        {raisedHand && (
          <div className="flex items-center justify-center m-1 p-1">
            <RaiseHand fillcolor={"#fff"} />
          </div>
        )}
        <div className="m-1 p-1">
          {micOn ? (
            <MicOnIcon fillColor={dynamicIconColor} />
          ) : (
            <MicOffIcon fillColor={dynamicIconColor} />
          )}
        </div>
        <div className="m-1 p-1">
          {webcamOn ? (
            <VideoCamOnIcon fillColor={dynamicIconColor} />
          ) : (
            <VideoCamOffIcon fillColor={dynamicIconColor} />
          )}
        </div>
      </div>
    </div>
  );
}

export function ParticipantPanel({ panelHeight }) {
  const { raisedHandsParticipants } = useMeetingAppContext();
  const mMeeting = useMeeting();
  const participants = mMeeting.participants;

  const sortedRaisedHandsParticipants = useMemo(() => {
    const participantIds = [...participants.keys()];

    const notRaised = participantIds.filter(
      (pID) =>
        raisedHandsParticipants.findIndex(
          ({ participantId: rPID }) => rPID === pID
        ) === -1
    );

    const raisedSorted = raisedHandsParticipants.sort((a, b) => {
      if (a.raisedHandOn > b.raisedHandOn) {
        return -1;
      }
      if (a.raisedHandOn < b.raisedHandOn) {
        return 1;
      }
      return 0;
    });

    const combined = [
      ...raisedSorted.map(({ participantId: p }) => ({
        raisedHand: true,
        participantId: p,
      })),
      ...notRaised.map((p) => ({ raisedHand: false, participantId: p })),
    ];

    return combined;
  }, [raisedHandsParticipants, participants]);

  const filterParticipants = (sortedRaisedHandsParticipants) =>
    sortedRaisedHandsParticipants;

  const part = useMemo(
    () => filterParticipants(sortedRaisedHandsParticipants, participants),

    [sortedRaisedHandsParticipants, participants]
  );

  return (
    <div
      className={`flex w-full flex-col bg-gray-750 overflow-y-auto `}
      style={{ height: panelHeight }}
    >
      <div
        className="flex flex-col flex-1"
        style={{ height: panelHeight - 100 }}
      >
        {[...participants.keys()].map((participantId, index) => {
          const { raisedHand, participantId: peerId } = part[index];
          return (
            <ParticipantListItem
              key={index}
              participantId={peerId}
              raisedHand={raisedHand}
            />
          );
        })}
      </div>
    </div>
  );
}
