import { create } from "zustand";
import { db } from "@/config/firebase";
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
} from "firebase/firestore";
import { convertTimeStringToDate, generateRandomId } from "@/lib/functions";

const useAppointmentStore = create((set) => ({
  appointments: [],
  userAppointments: [],
  isChanged: null,

  scheduleAppointment: async (date, time, pets, appointmentType, userId) => {
    try {
      const appointmentData = {
        date,
        time,
        pets,
        userId,
        appointmentType,
        status: 'booked',
        userFeedback: null,
        prescriptionFile: null,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      await addDoc(collection(db, "appointments"), appointmentData);
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
        const appointmentsCollection = collection(db, 'appointments');
        const q = query(appointmentsCollection);
        const appointmentsSnapshot = await getDocs(q);
        const appointmentsList = appointmentsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        const userPromises = appointmentsList.map(async appointment => {
            const userDoc = await getDoc(doc(db, 'users', appointment.userId));
            if(userDoc.exists()){
                const user = userDoc.data();

                let petData = [];
                const pets = appointment?.pets;
                pets.map(async pet => {
                    const petDoc = await getDoc(doc(db, 'pets', pet));
                    petData.push(petDoc.data());
                });

                const { start, end, title, color, desc } = convertTimeStringToDate(appointment?.time, appointment?.date, (user?.displayName || user?.alternateDisplayName), appointment?.status, appointment?.prescriptionFile);
                return { ...appointment, start, end, title, color, desc, pets: petData, alternateDisplayName: user?.alternateDisplayName, displayName: user?.displayName, email: user?.email, uid: user?.uid, userType: user?.userType };
            }
        });

        const appointmentsWithUsers = await Promise.all(userPromises);
        set({ appointments: appointmentsWithUsers });
    } catch (err) {
    }
  },

  getUserAppointments: async (userId) => {
    try {
        const appointmentsCollection = collection(db, 'appointments');
        const q = query(appointmentsCollection, where('userId', '==', userId));
        const appointmentsSnapshot = await getDocs(q);
        const appointmentsList = appointmentsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        const userPromises = appointmentsList.map(async appointment => {
            const userDoc = await getDoc(doc(db, 'users', appointment.userId));
            if(userDoc.exists()){
                const user = userDoc.data();

                let petData = [];
                const pets = appointment?.pets;
                pets.map(async pet => {
                    const petDoc = await getDoc(doc(db, 'pets', pet));
                    petData.push(petDoc.data());
                });
                
                const { start, end, title, color, desc } = convertTimeStringToDate(appointment?.time, appointment?.date, (user?.displayName || user?.alternateDisplayName), appointment?.status, appointment?.prescriptionFile);
                return { ...appointment, start, end, title, color, desc, pets: petData, alternateDisplayName: user?.alternateDisplayName, displayName: user?.displayName, email: user?.email, uid: user?.uid, userType: user?.userType };
            }
        });

        const appointmentsWithUsers = await Promise.all(userPromises);
        set({ userAppointments: appointmentsWithUsers });
    } catch (err) {
    }
  },

  cancelAppointment: async (appointmentId) => { // update status to cancelled
    try{
        const appointmentRef = doc(db, "appointments", appointmentId);
            
        await updateDoc(appointmentRef, {
            status: 'cancelled',
            updatedAt: serverTimestamp()
        });
      } catch(e){
        
      }
  },

  updateNoShowStatus: async (appointmentId) => { // update status to no-show
    try{
        const appointmentRef = doc(db, "appointments", appointmentId);
            
        await updateDoc(appointmentRef, {
            status: 'no-show',
            updatedAt: serverTimestamp()
        });

        set({ isChanged: generateRandomId() })
      } catch(e){
        
      }
  },

  updatePrescriptionFile: async (appointmentId) => { // update prescription file
    try{
        const prescriptionUrl = '';
        const appointmentRef = doc(db, "appointments", appointmentId);
        await updateDoc(appointmentRef, {
            prescriptionFile: prescriptionUrl,
            updatedAt: serverTimestamp()
        });

        set({ isChanged: generateRandomId() })
      } catch(e){
        
      }
  },

  updateUserFeedback: async (appointmentId, userFeedback) => { // update status to no-show
    try{
        const appointmentRef = doc(db, "appointments", appointmentId);
        await updateDoc(appointmentRef, {
            userFeedback,
            updatedAt: serverTimestamp()
        });

        set({ isChanged: generateRandomId() })
      } catch(e){
        
      }
  },
}));

export default useAppointmentStore;
