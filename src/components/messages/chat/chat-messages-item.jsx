/* eslint-disable react/prop-types */
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { messageDate } from "@/lib/functions";

export default function ChatMessagesItem({ message, userId }) {
  return (
    <div
      className={`flex items-start gap-3 ${
        userId === message.senderId ? "justify-end" : "justify-start"
      }`}
    >
      {userId !== message.senderId && (
        <Avatar className="w-8 h-8 border">
          <AvatarImage src="/placeholder-user.jpg" alt="Avatar" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      )}
      <div
        className={`${
          userId === message.senderId
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-muted-foreground"
        } rounded-lg p-3 max-w-[70%]`}
      >
        <p>{message.content}</p>
        {message?.attachementUrl?.length > 0 && (
          <div
            className={`
              ${message.attachementUrl.length == 1 && "grid-cols-1"}
              ${message.attachementUrl.length == 2 && "grid-cols-2"}
              ${message.attachementUrl.length >= 3 && "grid-cols-3"}
              grid gap-4 rounded-md mt-2`}
          >
            {message?.attachementUrl.map((img) => {
              return (
                <div key={img}>
                  <img
                    loading={"lazy"}
                    src={img}
                    alt={`Preview ${img}`}
                    className="object-cover aspect-square size-36 rounded-md"
                  />
                </div>
              );
            })}
          </div>
        )}
        <div className="text-xs mt-1">
          {messageDate({ timestamp: message?.updatedAt })}
        </div>
      </div>
    </div>
  );
}
