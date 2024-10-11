/* eslint-disable react/prop-types */
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { messageDate } from "@/lib/functions";
import { FaFilePdf } from "react-icons/fa";

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
              ${message.attachementUrl.length == 1 && "lg:grid-cols-1"}
              ${message.attachementUrl.length == 2 && "lg:grid-cols-2"}
              ${message.attachementUrl.length >= 3 && "lg:grid-cols-3"}
              grid gap-4 rounded-md mt-2 grid-cols-1`}
          >
            {message?.attachementUrl.map((img) => {
              return (
                <div key={img?.url}>
                  {img?.extension == 'pdf' ? 
                    <div className="aspect-square size-36 flex justify-center items-center bg-secondary/25 rounded-md p-4 text-center">
                      <a href={img?.url} className="hover:underline flex flex-col justify-center items-center gap-1 break-all text-sm" target="_blank"><FaFilePdf /> {img?.fileName}</a>
                    </div>
                    :
                    <a href={img?.url} target="_blank">
                      <img
                        loading={"lazy"}
                        src={img?.url}
                        alt={`Preview ${img?.url}`}
                        className="object-cover aspect-square size-36 rounded-md"
                      />
                    </a>
                  }
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
