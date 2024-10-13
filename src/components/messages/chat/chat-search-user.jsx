/* eslint-disable react/prop-types */
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import useConversationStore from "@/store/useConversationStore";

export default function ChatSearchUser({
  searchResults,
  handleSearch,
  userId,
}) {
  const navigate = useNavigate();
  const [isFocused, setIsFocused] = useState(false);
  const searchContainerRef = useRef(null);
  const { fetchConversation } = useConversationStore();

  const handleBlur = (e) => {
    if (searchContainerRef.current && !searchContainerRef.current.contains(e.relatedTarget || '')) {
      setIsFocused(false);
    }
  };

  return (
    <div className="border-b p-4 flex items-center justify-between">
      <div className="relative flex flex-grow items-center gap-1">
        <span>To:</span>
        <div className="flex-grow">
          <Input
            type="text"
            placeholder="Search user..."
            className="border-none focus-visible:outline-none focus-visible:border-none focus-visible:ring-0 w-full shadow-none"
            onChange={handleSearch}
            onFocus={() => setIsFocused(true)}
            onBlur={handleBlur}
          />
        </div>

        {isFocused && searchResults && (
          <div className="absolute top-full w-full lg:w-96 h-[calc(100vh_-_9rem)] md:h-72 shadow-md bg-gray-50 dark:bg-slate-900 md:rounded-lg border-t overflow-y-auto p-1.5 scrolly">
            {searchResults.map((user) => (
              <button
                key={user.id}
                className="w-full flex items-center gap-3 p-2.5 hover:bg-gray-100 dark:hover:bg-slate-950 cursor-pointer rounded-md"
                onClick={async () => {
                  const id = await fetchConversation({
                    self: userId,
                    uid: user.uid,
                  });
                  navigate(`/auth/messages/${id}`);
                }}
              >
                <Avatar className="size-10 border">
                  <AvatarImage src={user.photoUrl} alt="Profile picture" />
                  <AvatarFallback>
                    {user.displayName.slice(0, 1).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <h4 className="text-md font-medium capitalize">
                  {user.displayName}
                </h4>
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" onClick={() => navigate("/auth/messages/")}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
