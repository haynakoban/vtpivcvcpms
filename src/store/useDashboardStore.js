/* eslint-disable no-unused-vars */
/* eslint-disable no-empty */
// useDashboardStore.js
import { create } from "zustand";
import {
  doc,
  collection,
  serverTimestamp,
  addDoc,
  getDoc,
  query,
  onSnapshot,
  limit,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/config/firebase";

const useDashboardStore = create((set) => ({
  dashboard: [],
  getDashboard: async () => {
    try {
      const dashboardCollection = collection(db, "dashboard");
      const q = query(dashboardCollection, limit(1));

      const unsubscribe = onSnapshot(q, (snapshot) => {
          if (!snapshot.empty) {
              const doc = snapshot.docs[0];
              set({ dashboard: { id: doc.id, ...doc.data() } });
          } else {
              set({ dashboard: null });
          }
      });

      return unsubscribe;
    } catch (err) {
        console.error("Error fetching dashboard:", err);
    }
  },
  saveDashboard: async (title, description, illnesses) => {
    const dashboardCollection = collection(db, "dashboard");

    const dashboardQuery = query(dashboardCollection, limit(1));
    const dashboardSnapshot = await getDocs(dashboardQuery);

    if (!dashboardSnapshot.empty) {
        const firstDoc = dashboardSnapshot.docs[0];
        const docRef = doc(db, "dashboard", firstDoc.id);
        console.log(illnesses)

        await updateDoc(docRef, {
            title,
            description,
            illnesses,
            updatedAt: serverTimestamp(),
        });

        return { success: "Dashboard updated successfully." };
    } else {
      console.log('add', illnesses)
        await addDoc(dashboardCollection, {
            title,
            description,
            illnesses,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        });

        return { success: "Dashboard added successfully." };
    }
  },
}));

export default useDashboardStore;
