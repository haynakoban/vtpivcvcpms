/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
import { create } from "zustand";
import { db } from "@/config/firebase";
import {
  collection,
  addDoc,
  getDoc,
  query,
  where,
  getDocs,
  doc,
  setDoc,
} from "firebase/firestore";
import useAuditStore from "@/store/useAuditStore";

const useSettingsStore = create((set) => ({
  schedules: [],

  updateSchedule: async (
    schedule,
    timeSlot,
    appointmentAmount,
    userId,
    id = null
  ) => {
    try {
      const { addAudit } = useAuditStore.getState();
      const scheduleData = { schedule, timeSlot, appointmentAmount, userId };

      if (id) {
        const docRef = doc(db, "schedules", id);
        await setDoc(docRef, scheduleData, { merge: true });
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const updatedData = [{ id: docSnap.id, ...docSnap.data() }];
          set({ schedules: updatedData });

          addAudit({
            userId: id,
            log: "Schedules updated successfully.",
            action: "Updated Schedules",
            actionId: id,
          });

          return { success: "Schedule updated successfully." };
        } else {
          return { error: "Schedule update failed. Please try again." };
        }
      } else {
        const newDocRef = await addDoc(
          collection(db, "schedules"),
          scheduleData
        );
        const newDocSnap = await getDoc(newDocRef);

        if (newDocSnap.exists()) {
          const newData = [{ id: newDocSnap.id, ...newDocSnap.data() }];
          set({ schedules: newData });

          addAudit({
            userId: id,
            log: "New schedules created successfully.",
            action: "Created Schedules",
            actionId: id,
          });

          return { success: "Schedule created successfully." };
        } else {
          return { error: "Schedule creation failed. Please try again." };
        }
      }
    } catch (error) {
      return { error: "Error updating/creating schedule. Please try again." };
    }
  },

  getSchedule: async (userId) => {
    try {
      const q = query(
        collection(db, "schedules"),
        where("userId", "==", userId)
      );

      const querySnapshot = await getDocs(q);
      const results = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      set({ schedules: results });
    } catch (error) {
      set({ schedules: [] });
    }
  },

  getScheduleFirst: async () => {
    try {
      const q = query(collection(db, "schedules"));

      const querySnapshot = await getDocs(q);
      const results = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      set({ schedules: results[0] });
    } catch (error) {
      set({ schedules: [] });
    }
  },
}));

export default useSettingsStore;
