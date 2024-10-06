import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function ChatMessagesIntro() {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col justify-center gap-4 overflow-auto p-4 max-h-[600px] scrolly">
      <div className="text-3xl">Select a conversation</div>
      <p className="text-secondary-foreground">
        Connect with your colleagues, clients, or veterinary staff. You can
        continue from your ongoing chats or start a new conversation to discuss
        patient care, appointments, or updates.
      </p>
      <div>
        <Button
          variant="default"
          onClick={() => navigate("/auth/messages/compose")}
        >
          New Conversation
        </Button>
      </div>
    </div>
  );
}
