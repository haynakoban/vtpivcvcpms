import { create } from "zustand";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "@/config/firebase";
import { petDiseasesLookUps } from "@/lib/functions";

const useLookUpsStore = create((set) => ({
  petDiseases: [],
  loading: false,
  error: null,

  setPetDiseases: (updater) => {
    set((state) => {
      const updated =
        typeof updater === "function" ? updater(state.petDiseases) : updater;
      console.log(updated);
      return { petDiseases: updated };
    });
  },

  setLoading: (loading) => set({ loading }),

  setError: (error) => set({ error }),

  // insert pet diseases look ups
  insertPetDiseases: async () => {
    const diseasesRef = collection(db, "petDiseases");
    set({ loading: true, error: null });

    try {
      for (const disease of petDiseasesLookUps) {
        await addDoc(diseasesRef, {
          key: disease.key,
          value: disease.value,
        });
      }
      set({ loading: false });
      console.log("Pet diseases inserted successfully.");
    } catch (error) {
      set({ loading: false, error: "Error inserting pet diseases" });
      console.error("Error inserting pet diseases:", error);
    }
  },

  // retrieve pet diseases look ups
  getPetDiseases: async () => {
    const diseasesRef = collection(db, "petDiseases");
    set({ loading: true, error: null });

    try {
      const querySnapshot = await getDocs(diseasesRef);
      const diseases = [];

      querySnapshot.forEach((doc) => {
        diseases.push({
          key: doc.data().key,
          value: doc.data().value,
        });
      });

      // Sort diseases alphabetically by value
      diseases.sort((a, b) => a.value.localeCompare(b.value));

      set({ petDiseases: diseases, loading: false });

      return diseases;
    } catch (error) {
      set({ loading: false, error: "Error retrieving pet diseases" });
      console.error("Error retrieving pet diseases:", error);
      throw error;
    }
  },
}));

export default useLookUpsStore;
