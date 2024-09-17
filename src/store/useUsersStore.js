import { create } from "zustand";
import { auth, db } from "@/config/firebase";
import {
  collection,
  serverTimestamp,
  FirestoreError,
  doc,
  getDoc,
  query,
  getDocs,
  where,
  updateDoc,
  setDoc,
} from "firebase/firestore";
import { onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, updatePassword } from "firebase/auth";
import useAuthStore from "./useAuthStore";

const useUsersStore = create((set) => ({
  users: [],
  user: null,

  createUser: async ({ fullName, user }) => {
    try {
      const userRef = doc(db, "users", user.uid);
      // Store data in Firestore
      const userData = {
        uid: user.uid,
        email: user.email || "",
        displayName: fullName,
        emailVerified: user.emailVerified,
        photoUrl: user.photoURL || "",
        refreshToken: user.refreshToken,
        userType: 2,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      await setDoc(userRef, userData);
      const userDoc = doc(db, "users", user.uid);
      const userDocSnapshot = await getDoc(userDoc);
      const newUser = {
        ...userDocSnapshot.data(),
        id: user.uid,
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
        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data();

        if (userData.userType != 2) {
          return {
            title: "Email Not Found",
            description: "Please try again.",
          };
        }

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

  updateUserProfile: async (fullName, email, id) => {
    const setCurrentUser = useAuthStore.getState().setCurrentUser;

    try{
      const userRef = doc(db, "users", id);
      const docSnap = await getDoc(userRef);
      
      if (docSnap.exists()) {
        const userData = docSnap.data();
        if(fullName == userData.displayName && email == userData.email) return;

        await updateDoc(userRef, {
          displayName: fullName,
          email,
          updatedAt: serverTimestamp()
        });
  
        const userr = await getDoc(userRef);
        if (userr.exists()) {
          const userData = userr.data();
          setCurrentUser({ id, ...userData });
        }
        return { success: 'Profile updated successfully.' };
      } else {
        return { err: 'No user found.' };
      }
    } catch(e){
      set({ updateError: { other: 'Something went wrong, please try again' } });
    }
  },

  updateUserPassword: async (email, password, confirmPassword, oldPassword) => {
    if (password !== confirmPassword) return { err: "Passwords do not match!" };
    try {
      await signInWithEmailAndPassword(auth, email, oldPassword);
      
      onAuthStateChanged(auth, async (user) => {
        if(user){
          const newPassword = password;
          await updatePassword(user, newPassword);
          return { success: 'Password updated successfully.' };
        }
      })
      return { success: 'Password updated successfully.' };
    } catch (error) {
        console.log(error)
        return { err: 'Old password incorrect.' };
    }
  }
}));

export default useUsersStore;
