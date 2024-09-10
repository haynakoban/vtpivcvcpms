import { create } from "zustand";
import { auth, db } from "@/config/firebase";
import {
  addDoc,
  collection,
  serverTimestamp,
  FirestoreError,
  doc,
  getDoc,
  query,
  getDocs,
  where,
} from "firebase/firestore";
import { sendPasswordResetEmail } from "firebase/auth";

const useUsersStore = create((set) => ({
  users: [],
  user: null,

  createUser: async ({ fullName, user }) => {
    try {
      const userRef = collection(db, "users");
      // Store data in Firestore
      const userData = {
        uid: user.uid,
        email: user.email || "",
        displayName: fullName,
        emailVerified: user.emailVerified,
        photoUrl: user.photoURL || "",
        refreshToken: user.refreshToken,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      const result = await addDoc(userRef, userData);
      const userDoc = doc(db, "users", result.id);
      const userDocSnapshot = await getDoc(userDoc);
      const newUser = {
        ...userDocSnapshot.data(),
        id: result.id,
      };

      set((state) => ({ users: [...state.users, newUser], user: newUser }));
    } catch (err) {
      if (err instanceof FirestoreError) {
        console.error("Firestore error:", err.message);
      } else {
        console.error("Unexpected error:", err);
      }
    }
  },

  resetAccount: async (email) => {
    // reset account
    try {
      const userQuery = query(
        collection(db, "users"),
        where("email", "==", email)
      );
      const querySnapshot = await getDocs(userQuery);

      if (!querySnapshot.empty) {
        // const userDoc = querySnapshot.docs[0];
        // const userData = userDoc.data();

        // if (userData.userType != 2) {
        //   return {
        //     title: "Email Not Found",
        //     description: "Please try again.",
        //   };
        // }

        await sendPasswordResetEmail(auth, email);
        return {
          title: "Password Reset Sent!",
          description: "Check your email to reset your password.",
        };
      }

      return {
        title: "Email Not Found",
        description: "Please try again.",
      };
    } catch (err) {
      return {
        title: "Something went wrong!",
        description: "Please try again later.",
      };
    }
  },
}));

export default useUsersStore;
