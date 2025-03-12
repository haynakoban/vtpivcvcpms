/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import SecureMainLayout from "@/layout/private";
import { ContentLayout } from "@/layout/private/content-layout";

// stores
import useAuthStore from "@/store/useAuthStore";
import useUsersStore from "@/store/useUsersStore";
import useMessageStore from "@/store/useMessageStore";
import useConversationStore from "@/store/useConversationStore";

// components
import ChatPanel from "@/components/messages/chat/chat-panel";
import ChatContainer from "@/components/messages/chat/chat-container";
import ChatWindow from "@/components/messages/chat/chat-window";
import ChatSendMessage from "@/components/messages/chat/chat-send-message";
import ChatHeader from "@/components/messages/chat/chat-header";
import ChatMessages from "@/components/messages/chat/chat-messages";

export default function Conversations() {
  const { id } = useParams();
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const { talkingTo, getUser } = useUsersStore();
  const { messages, createMessage, fetchMessages } = useMessageStore();
  const {
    conversation,
    conversations,
    fetchRecentConvo,
    fetchConversation,
    fetchConvoUsers,
  } = useConversationStore();

  const [isLoading, setIsLoading] = useState(false);
  const [isMessageLoading, setIsMessageLoading] = useState(false);

  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [images, setImages] = useState([]);
  const [preview, setPreview] = useState([]);
  const [filePreview, setFilePreview] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        const uids = await fetchConvoUsers({ id });

        const selfId = uids.filter((id) => id === user?.uid);
        const userId = uids.filter((id) => id !== user?.uid);

        await fetchConversation({
          self: selfId[0],
          uid: userId[0],
        });
      } catch (error) {
        console.error(error);
      }
    };

    if (user?.uid) {
      init();
    }
  }, [id, user?.uid, fetchConversation, fetchConvoUsers]);

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
    const init = () => {
      try {
        setIsMessageLoading(true);
        fetchMessages(conversation?.id);
      } catch (error) {
        console.error(error);
      } finally {
        setIsMessageLoading(false);
      }
    };

    if (conversation?.id) {
      init();
    }
  }, [conversation?.id, fetchMessages]);

  useEffect(() => {
    if (conversation?.currentId) {
      getUser(conversation.currentId);
    }
  }, [conversation?.currentId, getUser]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && event.shiftKey) {
      event.preventDefault();
      const textarea = event.target;
      const cursorPosition = textarea.selectionStart;
      textarea.value =
        textarea.value.substring(0, cursorPosition) +
        "\n" +
        textarea.value.substring(cursorPosition);
      textarea.selectionStart = textarea.selectionEnd = cursorPosition + 1;
    } else if (event.key === "Enter") {
      event.preventDefault();
      sendMessage();
    }
  };

  const sendMessage = () => {
    try {
      if ((message.trim() != "" && message.length >= 1) || images.length > 0) {
        setIsSending(true);
        createMessage({
          conversationId: conversation?.id,
          content: message,
          senderId: user?.uid,
          receiverId: talkingTo?.uid,
          receiverStatus: talkingTo?.status,
          images,
        }).finally(() => {
          setIsSending(false);
          setMessage("");
          setImages([]);
          setPreview([]);
          setFilePreview([]);
          setError(false);
          document.getElementById("fileUpload").value = "";
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if(user){
      if(user?.userType == 3) navigate('/auth/dashboard')
    } else {
      navigate('/')
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
            <ChatHeader
              photoUrl={talkingTo?.photoUrl}
              displayName={talkingTo?.displayName}
              status={talkingTo?.status}
            />

            {/* Chat Messages */}
            <ChatMessages messages={messages} userId={user?.uid} />

            {/* Chat Send Message */}
            <ChatSendMessage
              disabled={false}
              sendMessage={sendMessage}
              setMessage={setMessage}
              handleKeyDown={handleKeyDown}
              message={message}
              images={images}
              setImages={setImages}
              preview={preview}
              setPreview={setPreview}
              filePreview={filePreview}
              setFilePreview={setFilePreview}
              error={error}
              setError={setError}
              isSending={isSending}
            />
          </ChatWindow>
        </ChatContainer>
      </ContentLayout>
    </SecureMainLayout>
  );
}
