import { db } from "@/config/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { create } from "zustand";

export const useCarePlanStore = create((set) => ({
  carePlan: null,
  loading: false,

  fetchCarePlan: async (appointmentId, petId, navigate) => {
    if (!appointmentId || !petId) {
      navigate("/auth/careplan");
      return;
    }

    set({ loading: true });

    try {
      const carePlanQuery = query(
        collection(db, "careplans"),
        where("appointmentId", "==", appointmentId),
        where("petId", "==", petId)
      );

      const querySnapshot = await getDocs(carePlanQuery);

      if (!querySnapshot.empty) {
        const carePlanDoc = querySnapshot.docs[0];
        const carePlanData = { id: carePlanDoc.id, ...carePlanDoc.data() };

        if (carePlanData.userId) {
          const userQuery = query(
            collection(db, "users"),
            where("uid", "==", carePlanData.userId)
          );

          const userSnap = await getDocs(userQuery);

          if (!userSnap.empty) {
            const userDoc = userSnap.docs[0];
            carePlanData.user = { id: userDoc.id, ...userDoc.data() };
          }
        }

        if (carePlanData.petId) {
          const petQuery = doc(db, "pets", carePlanData.petId);
          const petSnap = await getDoc(petQuery);

          if (petSnap.exists()) {
            carePlanData.pet = { id: petSnap.id, ...petSnap.data() };
          }
        }

        set({ carePlan: carePlanData });
      } else {
        navigate("/auth/careplan"); // Redirect if no care plan exists
      }
    } catch (error) {
      console.error("Error fetching care plan:", error);
      navigate("/auth/careplan");
    } finally {
      set({ loading: false });
    }
  },

  saveCarePlan: async (appointmentId, petId, data) => {
    if (!appointmentId || !petId) {
      console.error("Invalid appointmentId or petId");
      return;
    }

    try {
      const carePlanQuery = query(
        collection(db, "careplans"),
        where("appointmentId", "==", appointmentId),
        where("petId", "==", petId)
      );

      const querySnapshot = await getDocs(carePlanQuery);
      let carePlanRef;

      if (!querySnapshot.empty) {
        const existingCarePlan = querySnapshot.docs[0];
        carePlanRef = doc(db, "careplans", existingCarePlan.id);

        await setDoc(
          carePlanRef,
          {
            ...data, // Merge new data
            updatedAt: new Date(),
          },
          { merge: true }
        );

        set({
          carePlan: {
            id: carePlanRef.id,
            ...existingCarePlan.data(),
            ...data,
          },
        });
      }
      //    else {
      //     // Care plan doesn't exist → create a new one
      //     const newCarePlanRef = await addDoc(collection(db, "careplans"), {
      //       appointmentId,
      //       petId,
      //       ...data,
      //       createdAt: new Date(),
      //     });

      //     set({
      //       carePlan: { id: newCarePlanRef.id, appointmentId, petId, ...data },
      //     });
      //   }
    } catch (error) {
      console.error("Error saving care plan:", error);
    }
  },
}));
