import { useEffect, useState } from "react";
import SecureMainLayout from "@/layout/private";
import { ContentLayout } from "@/layout/private/content-layout";

// store
import useAuthStore from "@/store/useAuthStore";

// components
import ChatPanel from "@/components/messages/chat/chat-panel";
import ChatContainer from "@/components/messages/chat/chat-container";
import ChatWindow from "@/components/messages/chat/chat-window";
import ChatHeaderEmpty from "@/components/messages/chat/chat-header-empty";
import ChatSendMessage from "@/components/messages/chat/chat-send-message";
import ChatMessagesIntro from "@/components/messages/chat/chat-messages-intro";
import useConversationStore from "@/store/useConversationStore";
import { useNavigate } from "react-router-dom";

export default function Messages() {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const { conversations, fetchRecentConvo } = useConversationStore();

  useEffect(() => {
    const init = async () => {
      try {
        setIsLoading(true);
        fetchRecentConvo({ self: user?.uid });
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user?.uid) {
      init();
    }
  }, [user?.uid, fetchRecentConvo]);

  useEffect(() => {
    if(user){
      if(user?.userType == 3) navigate('/auth/dashboard')
    }
  }, [navigate, user])

  return (
    <SecureMainLayout>
      <ContentLayout title="Messages">
        <ChatContainer>
          {/* Sidebar - Chats */}
          {isLoading ? (
            <div className="flex justify-start pt-5 items-center flex-col h-screen md:h-[calc(100vh_-_5.05rem)]">
              <span className="text-md text-medium text-white">Loading...</span>
            </div>
          ) : (
            <ChatPanel conversations={conversations} />
          )}

          {/* Chat Window */}
          <ChatWindow>
            {/* Chat Header */}
            <ChatHeaderEmpty />

            {/* Chat Messages */}
            <ChatMessagesIntro />

            {/* Chat Send Message */}
            <ChatSendMessage disabled={true} />
          </ChatWindow>
        </ChatContainer>
      </ContentLayout>
    </SecureMainLayout>
  );
}
