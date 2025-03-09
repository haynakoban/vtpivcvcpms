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
import { dashboardData } from "@/lib/functions";

// Generate a random number between 0-750
const getRandomNumber = () => Math.floor(Math.random() * 751);

const useDashboardStore = create((set) => ({
  dashboard: [],
  dashboards: [],
  isLoading: false,
  usersSummary: {
    title: "Users",
    name1: "New Users",
    name2: "Active Users",
    name3: "Inactive Users",
    val1: "newUsers",
    val2: "activeUsers",
    val3: "inactiveUsers",
    total: "totalUsers",
    totalUsers: 0,
    newUsers: 0,
    activeUsers: 0,
    inactiveUsers: 0,
  },
  petsSummary: {
    title: "Pets",
    name1: "Senior Pets",
    name2: "Recently Registered",
    name3: "Frequent Visitors",
    val1: "seniorPets",
    val2: "recentlyRegisteredPets",
    val3: "frequentVisitors",
    total: "totalPets",
    totalPets: 0,
    seniorPets: 0,
    frequentVisitors: 0,
    recentlyRegisteredPets: 0,
  },
  apptSummary: {
    title: "Appointments",
    name1: "Pending",
    name2: "No-Show",
    name3: "Completed",
    name4: "Cancelled",
    val1: "pending",
    val2: "noShow",
    val3: "completed",
    val4: "cancelled",
    total: "totalAppts",
    totalAppts: 0,
    pending: 0,
    noShow: 0,
    completed: 0,
    cancelled: 0,
  },

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
  saveDashboard: async (title, description, illnesses, version) => {
    const dashboardCollection = collection(db, "dashboard");

    const dashboardQuery = query(dashboardCollection, limit(1));
    const dashboardSnapshot = await getDocs(dashboardQuery);

    if (!dashboardSnapshot.empty) {
      const firstDoc = dashboardSnapshot.docs[0];
      const docRef = doc(db, "dashboard", firstDoc.id);

      await updateDoc(docRef, {
        title,
        description,
        illnesses,
        version,
        updatedAt: serverTimestamp(),
      });

      return { success: "Dashboard updated successfully." };
    } else {
      await addDoc(dashboardCollection, {
        title,
        description,
        illnesses,
        version,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      return { success: "Dashboard added successfully." };
    }
  },

  fetchUsersSummary: async () => {
    const usersRef = collection(db, "users");
    const appointmentsRef = collection(db, "appointments");

    const usersSnapshot = await getDocs(usersRef);
    const appointmentsSnapshot = await getDocs(appointmentsRef);

    const now = new Date();
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(now.getMonth() - 6);

    const totalUsers = usersSnapshot.size; // Total users count
    const newUsers = [];
    const activeUsers = [];
    const inactiveUsers = [];

    const userAppointments = {};

    // Process appointments
    appointmentsSnapshot.forEach((doc) => {
      const data = doc.data();
      const userId = data.userId;
      const appointmentDate = data.createdAt.toDate(); // Convert Firestore Timestamp

      if (appointmentDate >= sixMonthsAgo) {
        userAppointments[userId] = (userAppointments[userId] || 0) + 1;
      }
    });

    // Process users
    usersSnapshot.forEach((doc) => {
      const data = doc.data();
      const userId = data.uid;
      const registeredAt = data.createdAt.toDate(); // Convert Firestore Timestamp

      // Check if the user is new (registered in the current month)
      if (
        registeredAt.getFullYear() === now.getFullYear() &&
        registeredAt.getMonth() === now.getMonth()
      ) {
        newUsers.push(userId);
      }

      // Check if the user has booked at least 3 appointments in the last 6 months
      if (userAppointments[userId] >= 3) {
        activeUsers.push(userId);
      } else {
        inactiveUsers.push(userId);
      }
    });

    set((state) => ({
      usersSummary: {
        ...state.usersSummary,
        totalUsers,
        newUsers: newUsers.length,
        activeUsers: activeUsers.length,
        inactiveUsers: inactiveUsers.length,
      },
    }));
  },

  fetchPetsSummary: async () => {
    const petsRef = collection(db, "pets");
    const appointmentsRef = collection(db, "appointments");

    const petsSnapshot = await getDocs(petsRef);
    const appointmentsSnapshot = await getDocs(appointmentsRef);

    const now = new Date();
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(now.getMonth() - 6);

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(now.getDate() - 30);

    let totalPets = 0;
    let seniorPets = 0;
    let recentlyRegisteredPets = 0;
    let frequentVisitors = 0;

    const petAppointments = {}; // Track appointment counts by pet ID

    // Process appointments first
    appointmentsSnapshot.forEach((doc) => {
      const appointment = doc.data();
      const appointmentDate = new Date(appointment.date);

      // Only count appointments within the last 6 months
      if (appointmentDate >= sixMonthsAgo) {
        appointment.pets.forEach((petId) => {
          if (!petAppointments[petId]) {
            petAppointments[petId] = 0;
          }
          petAppointments[petId]++;
        });
      }
    });

    // Process pets
    petsSnapshot.forEach((doc) => {
      const pet = doc.data();
      totalPets++;

      // Check if pet is senior (7+ years old)
      if (pet.age >= 7) {
        seniorPets++;
      }

      // Check if pet was registered in the last 30 days
      if (pet.createdAt.toDate() >= thirtyDaysAgo) {
        recentlyRegisteredPets++;
      }

      // Check if pet has 3+ appointments in the last 6 months
      if (petAppointments[doc.id] >= 3) {
        frequentVisitors++;
      }
    });

    // Update Zustand state
    set((state) => ({
      petsSummary: {
        ...state.petsSummary,
        totalPets,
        seniorPets,
        recentlyRegisteredPets,
        frequentVisitors,
      },
    }));
  },

  fetchApptSummary: async () => {
    const appointmentsRef = collection(db, "appointments");
    const appointmentsSnapshot = await getDocs(appointmentsRef);

    let totalAppts = 0;
    let pending = 0;
    let noShow = 0;
    let completed = 0;
    let cancelled = 0;

    appointmentsSnapshot.forEach((doc) => {
      const appt = doc.data();
      totalAppts++;

      // Categorize appointments based on their status
      if (appt.status === "booked") {
        pending++;
      } else if (appt.status === "no-show") {
        noShow++;
      } else if (appt.status === "completed") {
        completed++;
      } else if (appt.status === "cancelled") {
        cancelled++;
      }
    });

    // Update Zustand state
    set((state) => ({
      apptSummary: {
        ...state.apptSummary,
        totalAppts,
        pending,
        noShow,
        completed,
        cancelled,
      },
    }));
  },

  fetchDashboardData: async () => {
    try {
      const dataCollection = collection(db, "dashboards");
      const querySnapshot = await getDocs(dataCollection);
      const fetchedData = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          date: data.date?.toDate
            ? data.date.toDate().toISOString().split("T")[0]
            : data.date,
        };
      });

      set({ dashboards: fetchedData });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },
  insertData: async () => {
    set({ isLoading: true });

    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 120);
    const dataCollection = collection(db, "dashboards");

    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      const formattedDate = currentDate.toISOString().split("T")[0]; // "YYYY-MM-DD"

      const appointmentData = {
        date: formattedDate,
      };

      // Assign a random number to each camelCase appointment type
      Object.keys(dashboardData).forEach((key) => {
        appointmentData[key] = getRandomNumber();
      });

      try {
        await addDoc(dataCollection, appointmentData);
        console.log("Inserted:", appointmentData);
      } catch (error) {
        console.error("Error inserting data:", error);
      }

      currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
    }

    set({ isLoading: false });
  },
}));

export default useDashboardStore;
