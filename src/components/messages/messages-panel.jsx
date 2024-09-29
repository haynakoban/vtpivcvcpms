import { useState, useEffect, useRef } from "react";
import { Paperclip, MoreHorizontal, Send, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

// Dummy data for messages
const initialMessages = [
  {
    id: 1,
    text: "Hey, how's it going?",
    sender: "John Doe",
    isSender: false,
    time: "2:30 PM",
  },
  {
    id: 2,
    text: "Pretty good, just working on a new project.",
    sender: "You",
    isSender: true,
    time: "2:32 PM",
  },
  {
    id: 3,
    text: "That's great, let me know if you need any help!",
    sender: "John Doe",
    isSender: false,
    time: "2:35 PM",
  },
  {
    id: 4,
    text: "Will do, thanks!",
    sender: "You",
    isSender: true,
    time: "2:36 PM",
  },
  {
    id: 5,
    text: "Hey, how's it going?",
    sender: "John Doe",
    isSender: false,
    time: "2:30 PM",
  },
  {
    id: 6,
    text: "Pretty good, just working on a new project.",
    sender: "You",
    isSender: true,
    time: "2:32 PM",
  },
  {
    id: 7,
    text: "That's great, let me know if you need any help!",
    sender: "John Doe",
    isSender: false,
    time: "2:35 PM",
  },
  {
    id: 8,
    text: "Will do, thanks!",
    sender: "You",
    isSender: true,
    time: "2:36 PM",
  },
];

function ChatMessage({ message, isSender }) {
  return (
    <div
      className={`flex items-start gap-3 ${
        isSender ? "justify-end" : "justify-startt"
      }`}
    >
      {!isSender && (
        <Avatar className="w-8 h-8 border">
          <AvatarImage src="/placeholder-user.jpg" alt="Avatar" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      )}
      <div
        className={`${
          isSender
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-muted-foreground"
        } rounded-lg p-3 max-w-[70%]`}
      >
        <p>{message.text}</p>
        <div className="text-xs mt-1">{message.time}</div>
      </div>
    </div>
  );
}

function ChatMessages({ messages }) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-auto p-4 grid gap-4 max-h-[600px] scrolly">
      {messages.map((message) => (
        <ChatMessage
          key={message.id}
          message={message}
          isSender={message.isSender}
        />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}

function ChatPanel() {
  return (
    <div className="border-r bg-muted/20">
      <div className="flex items-center justify-center md:justify-between p-2 md:p-4">
        <h2 className="text-lg font-medium hidden md:block">Chats</h2>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Plus className="h-4 w-4" />
          <span className="sr-only">New Chat</span>
        </Button>
      </div>
      <div className="px-2 md:px-4 overflow-y-auto h-full max-h-[550px] scrolly">
        {Array.from({ length: 3 }).map((_, index) => {
          return (
            <div className="space-y-2" key={index}>
              <a
                href="#"
                className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/50"
              >
                <Avatar className="w-10 h-10 border">
                  <AvatarImage src="/placeholder-user.jpg" alt="Avatar" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="flex-1 truncate hidden md:block">
                  <p className="font-medium truncate">John Doe</p>
                  <p className="text-sm text-muted-foreground truncate">
                    Hey, how's it going?
                  </p>
                </div>
                <div className="text-xs text-muted-foreground hidden md:block">
                  2h
                </div>
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ChatHeader() {
  return (
    <div className="border-b p-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Avatar className="w-10 h-10 border">
          <AvatarImage src="/placeholder-user.jpg" alt="Avatar" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium">John Doe</p>
          <p className="text-sm text-muted-foreground">Online</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">More</span>
        </Button>
      </div>
    </div>
  );
}

export default function MessagesPanel() {
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    const newMsg = {
      id: messages.length + 1,
      text: newMessage,
      sender: "You",
      isSender: true,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prevMessages) => [...prevMessages, newMsg]);
    setNewMessage("");
  };

  return (
    <div className="grid grid-cols-[76px_1fr] md:grid-cols-[300px_1fr] h-[80vh] w-full max-w-[1200px] bg-background border rounded-lg overflow-hidden">
      {/* Sidebar - Chats */}
      <ChatPanel />

      {/* Chat Window */}
      <div className="flex flex-col">
        {/* Chat Header */}
        <ChatHeader />

        {/* Chat Messages */}
        <ChatMessages messages={messages} />

        {/* Input Area */}
        <div className="border-t p-4">
          <div className="relative">
            <div className="flex items-center gap-3">
              <label htmlFor="fileUpload">
                <div className="hover:bg-secondary cursor-pointer p-2 rounded">
                  <Paperclip className="h-4 w-4" />
                  <span className="sr-only">Fill Upload</span>
                  <input type="file" hidden id="fileUpload"/>
                </div>
              </label>
              <Textarea
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="w-full rounded-xl pr-16 resize-none"
                rows={1}
              />
            </div>
            <Button
              type="submit"
              size="icon"
              onClick={handleSendMessage}
              className="absolute top-1/2 right-2 -translate-y-1/2"
            >
              <Send className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
