/* eslint-disable react/prop-types */
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function ChatHeader({ photoUrl, displayName, status }) {
  return (
    <div className="border-b p-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Avatar className="w-10 h-10 border">
          <AvatarImage src={photoUrl} alt="Avatar" />
          <AvatarFallback>J</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium">{displayName || "John Doe"}</p>
          <p className="text-sm text-muted-foreground">{status || "offline"}</p>
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
