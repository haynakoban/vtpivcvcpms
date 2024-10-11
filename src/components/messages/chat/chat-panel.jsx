/* eslint-disable react/prop-types */
import { Plus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import moment from "moment";
import useAuthStore from "@/store/useAuthStore";
import { timeAgo } from "@/lib/functions";

export default function ChatPanel({ conversations }) {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  return (
    <div className="border-r bg-muted/20">
      <div className="flex items-center justify-center md:justify-between p-2 md:p-4">
        <h2 className="text-lg font-medium hidden md:block">Chats</h2>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          onClick={() => navigate("/auth/messages/compose")}
        >
          <Plus className="h-4 w-4" />
          <span className="sr-only">New Chat</span>
        </Button>
      </div>
      <div className="px-2 md:px-4 overflow-y-auto h-full max-h-[550px] scrolly">
        {conversations &&
          conversations.map((c, index) => {
            return (
              <div className="space-y-2" key={index}>
                <Link
                  to={`/auth/messages/${c.id}`}
                  className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/50"
                >
                  <Avatar className="w-10 h-10 border">
                    <AvatarImage
                      src={c.user.photoUrl}
                      alt={`${c.user.displayName} Profile picture`}
                    />
                    <AvatarFallback>
                      {c.user.displayName.slice(0, 1).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 truncate hidden md:block">
                    <p className="font-medium truncate">{c.user.displayName}</p>
                    <p className="text-sm text-muted-foreground truncate">
                      {user?.id == c.message.senderId ? 'You: ' : ''}
                      {c.message.content || 'Sent an attachment'}
                    </p>
                  </div>
                  <div className="text-xs text-muted-foreground hidden md:block">
                    {timeAgo(c.message?.createdAt?.seconds * 1000)}
                  </div>
                </Link>
              </div>
            );
          })}
      </div>
    </div>
  );
}
