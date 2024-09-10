/* eslint-disable @typescript-eslint/no-explicit-any */
import { auth, db } from "@/config/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: null,
  initializeAuth: () => {
    onAuthStateChanged(auth, async (u) => {
      if (u?.uid) {
        const userQuery = query(
          collection(db, "users"),
          where("uid", "==", u?.uid)
        );

        const userDocs = await getDocs(userQuery);
        if (!userDocs.empty) {
          const userData = userDocs.docs[0].data();
          set({ user: { id: u?.uid, ...userData } });
        } else {
          set({ user: null });
        }
      } else {
        set({ user: null });
      }
    });
  },
  signOut: async () => {
    await signOut(auth);
    set({ user: null });
  },
}));

export default useAuthStore;
