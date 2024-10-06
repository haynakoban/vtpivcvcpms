import { useEffect, useState } from "react";

import SecureMainLayout from "@/layout/private";
import { ContentLayout } from "@/layout/private/content-layout";

// store
import useAuthStore from "@/store/useAuthStore";
import { useFirebaseSearch } from "@/store/useFirestoreSearch";
import useConversationStore from "@/store/useConversationStore";

// components
import ChatPanel from "@/components/messages/chat/chat-panel";
import ChatContainer from "@/components/messages/chat/chat-container";
import ChatWindow from "@/components/messages/chat/chat-window";
import ChatSendMessage from "@/components/messages/chat/chat-send-message";
import ChatSearchUser from "@/components/messages/chat/chat-search-user";
import ChatMessagesEmpty from "@/components/messages/chat/chat-messages-empty";

export default function ComposeMessage() {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuthStore();
  const { searchResults, handleSearch } = useFirebaseSearch();
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
            {/* Chat Search User */}
            <ChatSearchUser
              searchResults={searchResults}
              handleSearch={handleSearch}
              userId={user?.uid}
            />

            {/* Chat Messages Empty */}
            <ChatMessagesEmpty />

            {/* Chat Send Message */}
            <ChatSendMessage disabled={true} />
          </ChatWindow>
        </ChatContainer>
      </ContentLayout>
    </SecureMainLayout>
  );
}
