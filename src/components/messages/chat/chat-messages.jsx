import { useEffect, useRef } from "react";
import ChatMessagesItem from "@/components/messages/chat/chat-messages-item";

/* eslint-disable react/prop-types */
export default function ChatMessages({ messages, userId }) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-auto p-4 flex flex-col gap-4 max-h-[600px] scrolly">
      {messages?.map((message) => (
        <ChatMessagesItem key={message.id} message={message} userId={userId} />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}
