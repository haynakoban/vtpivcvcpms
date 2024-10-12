/* eslint-disable no-unused-vars */
/* eslint-disable no-empty */
// useAuditStore.js
import { create } from "zustand";
import {
  doc,
  collection,
  serverTimestamp,
  addDoc,
  getDoc,
  query,
  onSnapshot,
} from "firebase/firestore";
import { db } from "@/config/firebase";

const useAuditStore = create((set) => ({
  logs: [],
  getAllAudit: async () => {
    try {
      const logsCollection = collection(db, "logs");
      const q = query(logsCollection);

      const unsubscribe = onSnapshot(q, async (snapshot) => {
        const logsList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const userPromises = logsList.map(async (log) => {
          if (log.userId) {
            const userDoc = await getDoc(doc(db, "users", log.userId));

            if (userDoc.exists()) {
              const user = userDoc.data();
              return { ...log, createdBy: user.fullName };
            } else {
              return { ...log, createdBy: log.userId };
            }
          } else {
            return { ...log, createdBy: log.userId };
          }
        });

        const logsWithUsers = await Promise.all(userPromises);
        set({ logs: logsWithUsers });
      });

      return unsubscribe;
    } catch (err) {}
  },
  addAudit: async ({ userId, log, action, actionId }) => {
    const newLogs = {
      userId,
      log,
      action,
      actionId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    await addDoc(collection(db, "logs"), newLogs);
  },
}));

export default useAuditStore;
