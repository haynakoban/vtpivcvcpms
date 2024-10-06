/* eslint-disable no-unused-vars */
import { create } from "zustand";

import { db, storage } from "@/config/firebase";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const generateRandomId = () => {
  const now = Date.now().toString(36);
  const random = Math.random().toString(36).substr(2, 9);
  const randomExtra = Math.random().toString(36).substr(2, 9);
  return `${now}-${random}-${randomExtra}`;
};

const useMessageStore = create((set) => ({
  messages: [],

  createMessage: async ({
    conversationId,
    content,
    senderId,
    receiverId,
    receiverStatus,
    images = [],
  }) => {
    try {
      const imageUrls = [];
      for (const img of images) {
        try {
          const storageRef = ref(storage, `images/${generateRandomId()}`);
          const uploadTask = uploadBytesResumable(storageRef, img);

          // Wait for each upload task to complete
          await new Promise((resolve, reject) => {
            uploadTask.on(
              "state_changed",
              (snapshot) => {
                // Handle progress if needed
              },
              (error) => {
                reject("Error uploading file");
              },
              () => {
                // Upload completed successfully, get download URL
                getDownloadURL(uploadTask.snapshot.ref)
                  .then((downloadURL) => {
                    imageUrls.push(downloadURL);
                    resolve();
                  })
                  .catch((e) => {
                    reject("Error getting download URL");
                  });
              }
            );
          });
        } catch (error) {
          console.log({
            incidentError: "Something went wrong, please try again.",
          });
        }
      }

      const messageRef = collection(db, "messages");

      const messageData = {
        conversationId,
        senderId,
        receiverId,
        content,
        messageType: "text",
        deliveryStatus: receiverStatus === "online" ? "delivered" : "sent",
        attachementUrl: imageUrls,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      await addDoc(messageRef, messageData);
    } catch (err) {
      console.error(err);
    }
  },

  fetchMessages: async (conversationId) => {
    try {
      set({ messages: [] });
      const messageRef = collection(db, "messages");
      const messageQuery = query(
        messageRef,
        where("conversationId", "==", conversationId),
        orderBy("createdAt", "asc")
      );

      onSnapshot(messageQuery, (snapshot) => {
        const messages = [];

        snapshot.forEach((doc) => messages.push({ ...doc.data(), id: doc.id }));

        set({ messages });
      });
    } catch (err) {
      console.error(err);
    }
  },
}));

export default useMessageStore;
