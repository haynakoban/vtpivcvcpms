import { auth, db } from "@/config/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: undefined,
  isChanged: false,
  initializeAuth: () => {
    onAuthStateChanged(auth, async (u) => {
      if (u?.uid) {
        const userRef = doc(db, 'users', u?.uid);
        const user = await getDoc(userRef);
        
        if (user.exists()) {
          const userData = user.data();
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
  setCurrentUser: (value) => {
    set({ user: value });
  },
  setChanged: (value) => {
    set({ isChanged: value });
  },
}));

export default useAuthStore;
