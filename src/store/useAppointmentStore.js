/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
import { create } from "zustand";
import { db, storage } from "@/config/firebase";
import {
  collection,
  serverTimestamp,
  FirestoreError,
  query,
  getDocs,
  where,
  addDoc,
  getDoc,
  doc,
  updateDoc,
  arrayUnion,
  Timestamp,
} from "firebase/firestore";
import { convertTimeStringToDate, generateRandomId } from "@/lib/functions";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import useAuditStore from "@/store/useAuditStore";
import { carePlanModel } from "@/model/careplan";
import useUsersStore from "@/store/useUsersStore";

async function deleteImage(downloadURL) {
  try {
    const filePath = decodeURIComponent(
      downloadURL.split("/o/")[1].split("?")[0].replace(/%2F/g, "/")
    );
    const fileRef = ref(storage, filePath);
    await deleteObject(fileRef);
  } catch (error) {}
}

const useAppointmentStore = create((set) => ({
  appointments: [],
  userAppointments: [],
  isChanged: null,

  scheduleAppointment: async (date, time, pets, appointmentType, userId) => {
    try {
      const { addAudit } = useAuditStore.getState();

      const appointmentData = {
        date,
        time,
        pets,
        userId,
        appointmentType,
        status: "booked",
        userFeedback: null,
        prescriptionFile: null,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      const result = await addDoc(
        collection(db, "appointments"),
        appointmentData
      );

      addAudit({
        userId,
        log: "New appointment scheduled successfully.",
        action: "Created Appointment",
        actionId: result.id,
      });
    } catch (err) {
      if (err instanceof FirestoreError) {
        console.error("Firestore error:", err.message);
      } else {
        console.error("Unexpected error:", err);
      }
    }
  },

  getAppointments: async () => {
    try {
      const appointmentsCollection = collection(db, "appointments");
      const q = query(appointmentsCollection);
      const appointmentsSnapshot = await getDocs(q);
      const appointmentsList = appointmentsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const userPromises = appointmentsList.map(async (appointment) => {
        const userDoc = await getDoc(doc(db, "users", appointment.userId));
        if (userDoc.exists()) {
          const user = userDoc.data();

          let petData = [];
          const pets = appointment?.pets;
          pets.map(async (pet) => {
            const petDoc = await getDoc(doc(db, "pets", pet));
            petData.push({ id: petDoc.id, ...petDoc.data() });
          });

          const { start, end, title, color, desc } = convertTimeStringToDate(
            appointment?.time,
            appointment?.date,
            user?.displayName || user?.alternateDisplayName,
            appointment?.status,
            appointment?.prescriptionFile
          );
          return {
            ...appointment,
            start,
            end,
            title,
            color,
            desc,
            pets: petData,
            alternateDisplayName: user?.alternateDisplayName,
            displayName: user?.displayName,
            email: user?.email,
            uid: user?.uid,
            userType: user?.userType,
          };
        }
      });

      const appointmentsWithUsers = await Promise.all(userPromises);
      set({ appointments: appointmentsWithUsers });
    } catch (err) {}
  },

  getUserAppointments: async (userId) => {
    try {
      const appointmentsCollection = collection(db, "appointments");
      const q = query(appointmentsCollection, where("userId", "==", userId));
      const appointmentsSnapshot = await getDocs(q);
      const appointmentsList = appointmentsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const userPromises = appointmentsList.map(async (appointment) => {
        const userDoc = await getDoc(doc(db, "users", appointment.userId));
        if (userDoc.exists()) {
          const user = userDoc.data();

          let petData = [];
          const pets = appointment?.pets;
          pets.map(async (pet) => {
            const petDoc = await getDoc(doc(db, "pets", pet));
            petData.push({ id: petDoc.id, ...petDoc.data() });
          });

          const { start, end, title, color, desc } = convertTimeStringToDate(
            appointment?.time,
            appointment?.date,
            user?.displayName || user?.alternateDisplayName,
            appointment?.status,
            appointment?.prescriptionFile
          );
          return {
            ...appointment,
            start,
            end,
            title,
            color,
            desc,
            pets: petData,
            alternateDisplayName: user?.alternateDisplayName,
            displayName: user?.displayName,
            email: user?.email,
            uid: user?.uid,
            userType: user?.userType,
          };
        }
      });

      const appointmentsWithUsers = await Promise.all(userPromises);
      set({ userAppointments: appointmentsWithUsers });
    } catch (err) {}
  },

  cancelAppointment: async (appointmentId) => {
    // update status to cancelled
    try {
      const appointmentRef = doc(db, "appointments", appointmentId);

      await updateDoc(appointmentRef, {
        status: "cancelled",
        updatedAt: serverTimestamp(),
      });
    } catch (e) {}
  },

  updateNoShowStatus: async (appointmentId) => {
    // update status to no-show
    try {
      const appointmentRef = doc(db, "appointments", appointmentId);

      await updateDoc(appointmentRef, {
        status: "no-show",
        updatedAt: serverTimestamp(),
      });

      set({ isChanged: generateRandomId() });
    } catch (e) {}
  },

  updatePrescriptionFile: async (file, appointmentId, url) => {
    // update prescription file
    try {
      let prescriptionUrl = "";
      if (file) {
        try {
          const storageRef = ref(storage, `pdf/${generateRandomId()}`);
          const uploadTask = uploadBytesResumable(storageRef, file);

          // Wait for each upload task to complete
          await new Promise((resolve, reject) => {
            uploadTask.on(
              "state_changed",
              (snapshot) => {},
              (error) => {
                reject("Error uploading file");
              },
              () => {
                // Upload completed successfully, get download URL
                getDownloadURL(uploadTask.snapshot.ref)
                  .then((downloadURL) => {
                    const fileName = file.name;
                    prescriptionUrl = {
                      url: downloadURL,
                      name: fileName,
                    };

                    resolve();
                  })
                  .catch((e) => {
                    return { err: "Something went wrong, please try again." };
                  });
              }
            );
          });

          await deleteImage(url);
        } catch (error) {
          return { err: "Something went wrong, please try again." };
        }
      }

      const appointmentRef = doc(db, "appointments", appointmentId);
      await updateDoc(appointmentRef, {
        prescriptionFile: prescriptionUrl,
        status: "completed",
        updatedAt: serverTimestamp(),
      });

      set({ isChanged: generateRandomId() });
    } catch (e) {}
  },

  updateUserFeedback: async (appointmentId, userFeedback) => {
    // update status to no-show
    try {
      const appointmentRef = doc(db, "appointments", appointmentId);
      await updateDoc(appointmentRef, {
        userFeedback,
        updatedAt: serverTimestamp(),
      });

      set({ isChanged: generateRandomId() });
    } catch (e) {}
  },

  createCarePlan: async (appointmentId, petId, userId) => {
    try {
      const vetInfos = useUsersStore.getState().vetInfos;

      const newCarePlan = {
        ...carePlanModel, // Use the existing model
        vaccination: {
          ...carePlanModel.vaccination,
          administeredBy: vetInfos?.displayName || "",
        },
        surgeries: {
          ...carePlanModel.surgeries,
          surgeonName: vetInfos?.displayName || "",
        },
        laboratory: {
          ...carePlanModel.laboratory,
          conductedBy: vetInfos?.displayName || "",
        },
      };

      const carePlanRef = await addDoc(collection(db, "careplans"), {
        petId,
        appointmentId,
        userId,
        status: "draft",
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
        ...newCarePlan,
      });

      const carePlanId = carePlanRef.id;

      const appointmentRef = doc(db, "appointments", appointmentId);

      const appointmentSnap = await getDoc(appointmentRef);

      if (!appointmentSnap.exists()) {
        throw new Error("Appointment not found");
      }

      await updateDoc(appointmentRef, {
        carePlans: arrayUnion({
          petId,
          carePlanId,
          status: "draft",
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now(),
        }),
      });

      const updatedAppointmentSnap = await getDoc(appointmentRef);

      if (updatedAppointmentSnap.exists()) {
        const updatedAppointment = updatedAppointmentSnap.data();
        set({ isChanged: generateRandomId() });

        return { id: updatedAppointmentSnap.id, ...updatedAppointment };
      } else {
        throw new Error("Failed to retrieve updated appointment");
      }
    } catch (error) {
      console.error("Error creating care plan:", error);
      return null;
    }
  },
}));

export default useAppointmentStore;
