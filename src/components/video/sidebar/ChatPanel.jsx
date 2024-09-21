/* eslint-disable react/prop-types */

import { PaperAirplaneIcon } from "@heroicons/react/solid";
import { useMeeting, usePubSub } from "@videosdk.live/react-sdk";
import { useEffect, useRef, useState } from "react";
import { formatAMPM, json_verify, nameTructed } from "@/utils/helper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ChatMessage = ({ senderId, senderName, text, timestamp }) => {
  const mMeeting = useMeeting();
  const localParticipantId = mMeeting?.localParticipant?.id;
  const localSender = localParticipantId === senderId;

  return (
    <div
      className={`flex ${localSender ? "justify-end" : "justify-start"} mt-4`}
      style={{
        maxWidth: "100%",
      }}
    >
      <div
        className={`w-full flex ${
          localSender ? "items-end" : "items-start"
        } flex-col py-1 px-2 rounded-md border`}
      >
        <p className="text-gray-600">
          {localSender ? "You" : nameTructed(senderName, 15)}
        </p>
        <div className="w-full">
          <p className="whitespace-pre-wrap break-words text-right">
            {text}
          </p>
        </div>
        <div className="mt-1 ">
          <p className="text-xs italic text-gray-600">
            {formatAMPM(new Date(timestamp))}
          </p>
        </div>
      </div>
    </div>
  );
};

const ChatInput = ({ inputHeight }) => {
  const [message, setMessage] = useState("");
  const { publish } = usePubSub("CHAT");
  const input = useRef();

  return (
    <div
      className="w-full flex items-center px-2"
      style={{ height: inputHeight }}
    >
      <div className="relative w-full">
        <span className="absolute inset-y-0 right-0 flex mr-3 rotate-90">
          <Button
            variant="icon"
            disabled={message.length < 2}
            type="submit"
            className="p-1 focus:outline-none focus:shadow-outline"
            onClick={() => {
              const messageText = message.trim();
              if (messageText.length > 0) {
                publish(messageText, { persist: true });
                setTimeout(() => {
                  setMessage("");
                }, 100);
                input.current?.focus();
              }
            }}
          >
            <PaperAirplaneIcon
              className={`w-6 h-6 ${
                message.length < 2 ? "text-gray-500 " : ""
              }`}
            />
          </Button>
        </span>
        <Input
          type="text"
          className="py-6 text-base rounded pr-10 pl-2 focus:outline-none w-full"
          placeholder="Write your message"
          autoComplete="off"
          ref={input}
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          onKeyPress={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              const messageText = message.trim();

              if (messageText.length > 0) {
                publish(messageText, { persist: true });
                setTimeout(() => {
                  setMessage("");
                }, 100);
                input.current?.focus();
              }
            }
          }}
        />
      </div>
    </div>
  );
};

const ChatMessages = ({ listHeight }) => {
  const listRef = useRef();
  const { messages } = usePubSub("CHAT");

  const scrollToBottom = (data) => {
    if (!data) {
      if (listRef.current) {
        listRef.current.scrollTop = listRef.current.scrollHeight;
      }
    } else {
      const { text } = data;

      if (json_verify(text)) {
        const { type } = JSON.parse(text);
        if (type === "CHAT") {
          if (listRef.current) {
            listRef.current.scrollTop = listRef.current.scrollHeight;
          }
        }
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return messages ? (
    <div
      className="scrolly"
      ref={listRef}
      style={{ overflowY: "scroll", height: listHeight }}
    >
      <div className="p-4">
        {messages.map((msg, i) => {
          const { senderId, senderName, message, timestamp } = msg;
          return (
            <ChatMessage
              key={`chat_item_${i}`}
              {...{ senderId, senderName, text: message, timestamp }}
            />
          );
        })}
      </div>
    </div>
  ) : (
    <p>No messages</p>
  );
};

export function ChatPanel({ panelHeight }) {
  const inputHeight = 72;
  const listHeight = panelHeight - inputHeight;

  return (
    <div>
      <ChatMessages listHeight={listHeight} />
      <ChatInput inputHeight={inputHeight} />
    </div>
  );
}
