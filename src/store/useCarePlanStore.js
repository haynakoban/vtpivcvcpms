import { db } from "@/config/firebase";
import {
  removeUndefinedValues,
  formatFirebaseDate,
  formatFirebaseDateTime,
} from "@/lib/functions";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  Timestamp,
  where,
} from "firebase/firestore";
import { create } from "zustand";

export const useCarePlanStore = create((set) => ({
  carePlan: null,
  loading: false,
  medicalHistory: {
    administrationMedication: [],
    allergies: [],
    carePlan: [],
    diagnoses: [],
    laboratory: [],
    medication: [],
    surgeries: [],
    vaccination: [],
  },

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
            ...removeUndefinedValues(data), // Merge new data
            updatedAt: new Date(),
          },
          { merge: true }
        );

        set((state) => ({
          carePlan: {
            ...state.carePlan,
            id: carePlanRef.id,
            ...existingCarePlan.data(),
            ...removeUndefinedValues(data),
          },
        }));
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

  lockCarePlan: async (appointmentId, petId) => {
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
        const timestamp = Timestamp.now();

        await setDoc(
          carePlanRef,
          {
            status: "locked",
            dateLocked: timestamp,
            updatedAt: timestamp,
          },
          { merge: true }
        );

        // Reference to the appointment
        const appointmentRef = doc(db, "appointments", appointmentId);
        const appointmentSnap = await getDoc(appointmentRef);

        if (appointmentSnap.exists()) {
          const appointmentData = appointmentSnap.data();

          // Update the specific care plan inside the carePlans array
          const updatedCarePlans = appointmentData.carePlans.map((carePlan) =>
            carePlan.petId === petId
              ? { ...carePlan, status: "locked", updatedAt: timestamp }
              : carePlan
          );

          // Update the appointment document
          await setDoc(
            appointmentRef,
            {
              carePlans: updatedCarePlans,
              updatedAt: timestamp,
            },
            { merge: true }
          );
        }

        set((state) => ({
          carePlan: {
            ...state.carePlan,
            id: carePlanRef.id,
            status: "locked",
            dateLocked: timestamp,
            updatedAt: timestamp,
          },
        }));
      }
    } catch (error) {
      console.error("Error updating care plan:", error);
    }
  },

  getMedicalHistory: async (petId, currentCarePlanId) => {
    try {
      const carePlanRef = collection(db, "careplans");
      const q = query(carePlanRef, where("petId", "==", petId));

      const querySnapshot = await getDocs(q);
      const carePlans = querySnapshot.docs
        .map((doc) => {
          const data = doc.data();

          return {
            id: doc.id,
            ...data,
            // Apply date formatting to relevant fields
            allergies: data.allergies
              ? {
                  ...data.allergies,
                  dateRecorded: formatFirebaseDateTime(
                    data.allergies.dateRecorded
                  ),
                }
              : null,
            vaccination: data.vaccination
              ? {
                  ...data.vaccination,
                  administeredAt: formatFirebaseDateTime(
                    data.vaccination.administeredAt
                  ),
                  nextDueDate: formatFirebaseDate(data.vaccination.nextDueDate),
                }
              : null,
            surgeries: data.surgeries
              ? {
                  ...data.surgeries,
                  dateOfSurgery: formatFirebaseDateTime(
                    data.surgeries.dateOfSurgery
                  ),
                }
              : null,
            diagnoses: data.diagnoses
              ? {
                  ...data.diagnoses,
                  dateOfDiagnosis: formatFirebaseDateTime(
                    data.diagnoses.dateOfDiagnosis
                  ),
                }
              : null,
            laboratory: data.laboratory
              ? {
                  ...data.laboratory,
                  dateConducted: formatFirebaseDateTime(
                    data.laboratory.dateConducted
                  ),
                }
              : null,
            medication: data.medication
              ? {
                  ...data.medication,
                  dateTimeTaken: formatFirebaseDateTime(
                    data.medication.dateTimeTaken
                  ),
                  startDate: formatFirebaseDate(data.medication.startDate),
                  endDate: formatFirebaseDate(data.medication.endDate),
                }
              : null,
            administrationMedication: data.administrationMedication
              ? {
                  ...data.administrationMedication,
                  startDate: formatFirebaseDate(
                    data.administrationMedication.startDate
                  ),
                  endDate: formatFirebaseDate(
                    data.administrationMedication.endDate
                  ),
                  dateTimeAdministered: formatFirebaseDateTime(
                    data.administrationMedication.dateTimeAdministered
                  ),
                }
              : null,
            carePlan: data.carePlan
              ? {
                  ...data.carePlan,
                  followUpDateTime: formatFirebaseDateTime(
                    data.carePlan.followUpDateTime
                  ),
                }
              : null,
          };
        })
        .filter((cp) => cp.id !== currentCarePlanId);

      // Categorize the formatted data into medicalHistory
      const categorizedHistory = {
        administrationMedication: [],
        allergies: [],
        carePlan: [],
        diagnoses: [],
        laboratory: [],
        medication: [],
        surgeries: [],
        vaccination: [],
      };

      carePlans.forEach((cp) => {
        if (cp.administrationMedication)
          categorizedHistory.administrationMedication.push(
            cp.administrationMedication
          );
        if (cp.allergies) categorizedHistory.allergies.push(cp.allergies);
        if (cp.diagnoses) categorizedHistory.diagnoses.push(cp.diagnoses);
        if (cp.laboratory) categorizedHistory.laboratory.push(cp.laboratory);
        if (cp.medication) categorizedHistory.medication.push(cp.medication);
        if (cp.surgeries) categorizedHistory.surgeries.push(cp.surgeries);
        if (cp.vaccination) categorizedHistory.vaccination.push(cp.vaccination);

        // Store the full care plan separately
        categorizedHistory.carePlan.push(cp.carePlan);
      });

      set({ medicalHistory: categorizedHistory }); // Update Zustand state
    } catch (error) {
      console.error("Error fetching medical history:", error);
    }
  },
}));
