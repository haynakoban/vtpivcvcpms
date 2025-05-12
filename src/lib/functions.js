/* eslint-disable no-unused-vars */
import { Timestamp } from "firebase/firestore";
import moment from "moment";

export const isAMorPM = (date) => {
  const processDate = new Date(date);
  const amPm = moment(processDate).format("A");

  return amPm;
};

export const messageDate = ({ timestamp, format = "h:mm A" }) => {
  const jsDate = timestamp?.toDate();

  const formattedTime = moment(jsDate).format(format);

  return formattedTime;
};

const generateRandomId = () => {
  const now = Date.now().toString(36);
  const random = Math.random().toString(36).substr(2, 9);
  const randomExtra = Math.random().toString(36).substr(2, 9);
  return `${now}-${random}-${randomExtra}`;
};

const returnPetPie = (pets) => {
  const colors = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
    "hsl(var(--primary))",
  ];

  if (pets?.length == 0) {
    return {
      petData: [{ species: "No Data", pets: 1, fill: colors[5] }],
      chartConfig: {
        pets: {
          label: "No Data",
          color: colors[5],
        },
      },
    };
  }

  const groupedPets = pets.reduce((acc, pet) => {
    acc[pet.species] = (acc[pet.species] || 0) + 1;
    return acc;
  }, {});

  // Convert to array and sort by count
  const sortedSpecies = Object.entries(groupedPets)
    .map(([species, pets]) => ({ species, pets }))
    .sort((a, b) => b.pets - a.pets);

  // Get the top 4 species
  const top4 = sortedSpecies.slice(0, 4);

  // Calculate others count
  const othersCount = sortedSpecies
    .slice(4)
    .reduce((acc, { pets }) => acc + pets, 0);
  const otherData =
    sortedSpecies.length > 4
      ? { species: "Others", pets: othersCount, fill: colors[4] }
      : "";
  // Construct the final result as an array
  const petData = [
    ...top4.map(({ species, pets }, index) => ({
      species: species,
      pets,
      fill: colors[index],
    })),
    otherData,
  ];

  const chartConfig = {
    ...top4.map(({ species }, index) => ({
      color: colors[index],
      label: species,
    })),
    pets: {
      label: "Pets",
    },
  };

  return { petData, chartConfig };
};

const formatDate = (seconds) => {
  const date = new Date(seconds * 1000);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);
  return formattedDate;
};

const formatDateWDay = (seconds) => {
  const date = new Date(seconds * 1000);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  };
  const formattedDate = date.toLocaleDateString("en-US", options);
  return formattedDate;
};

const getDay = (seconds) => {
  const date = new Date(seconds * 1000);
  const options = { weekday: "long" };
  const formattedDate = date.toLocaleDateString("en-US", options);
  return formattedDate;
};

const formattedDate = (date) => {
  return `${String(date.getMonth() + 1).padStart(2, "0")}-${String(
    date.getDate()
  ).padStart(2, "0")}-${date.getFullYear()}`;
};

const checkSelectedPet = (selectedPet, id) => {
  return (
    selectedPet.filter((pet) => {
      return pet == id;
    }).length > 0
  );
};

const generateTimeSlots = ({ from, to, duration, maxClients }) => {
  const parseTime = (timeString) => {
    const [time, modifier] = timeString.split(" ");
    let [hours, minutes] = time.split(":").map((num) => parseInt(num, 10));
    if (modifier === "PM" && hours < 12) {
      hours += 12;
    } else if (modifier === "AM" && hours === 12) {
      hours = 0;
    }

    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
  };
  // Input validation
  if (!from || !to || isNaN(duration) || isNaN(maxClients) || maxClients <= 0) {
    return [];
  }
  const startTime = parseTime(from);
  const endTime = parseTime(to);
  const durationMinutes = parseInt(duration, 10);
  if (startTime >= endTime || durationMinutes <= 0) {
    return [];
  }
  const slots = [];
  const slotDuration = durationMinutes * 60 * 1000;
  let currentSlotStart = startTime;
  while (currentSlotStart < endTime) {
    const currentSlotEnd = new Date(currentSlotStart.getTime() + slotDuration);
    if (currentSlotEnd > endTime) break;
    slots.push({
      start: currentSlotStart.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
      end: currentSlotEnd.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
    });
    currentSlotStart = currentSlotEnd;
  }
  return slots;
};

const checkBookedSlot = (booked, date, time) => {
  const has = booked?.filter((book, i) => {
    return book?.date == date && book?.time == time && book?.status == "booked";
  });
  return has.length > 0;
};

function stringToDate(dateString) {
  const [month, day, year] = dateString.split("-");
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return `${monthNames[parseInt(month) - 1]} ${day}, ${year}`;
}

function isPastDateTime(dateString, timeString) {
  const [month, day, year] = dateString.split("-").map(Number);

  const [time, modifier] = timeString.split(" ");
  const [hours, minutes] = time.split(":").map(Number);

  const adjustedHours = modifier === "PM" && hours !== 12 ? hours + 12 : hours;
  const adjustedHoursForMidnight =
    modifier === "AM" && hours === 12 ? 0 : adjustedHours;
  const appointmentDateTime = new Date(
    year,
    month - 1,
    day,
    adjustedHoursForMidnight,
    minutes
  );

  const now = new Date();
  return appointmentDateTime < now;
}

const convertTimeStringToDate = (
  timeString,
  dateString,
  name,
  status,
  carePlanStatus
) => {
  const [month, day, year] = dateString
    .split("-")
    .map((num) => parseInt(num, 10));
  const date = new Date(year, month - 1, day);

  const [startTime, endTime] = timeString.split(" - ").map((t) => t.trim());

  const [startHour, startMinute] = startTime.split(":");
  const startPeriod = startMinute.slice(-2); // AM or PM
  const startMin = parseInt(startMinute.slice(0, -2), 10);

  const startHour24 =
    startPeriod === "PM" && startHour !== "12"
      ? parseInt(startHour, 10) + 12
      : startPeriod === "AM" && startHour === "12"
      ? 0
      : parseInt(startHour, 10);

  const startDate = new Date(date);
  startDate.setHours(startHour24, startMin, 0);

  const [endHour, endMinute] = endTime.split(":");
  const endPeriod = endMinute.slice(-2); // AM or PM
  const endMin = parseInt(endMinute.slice(0, -2), 10);

  const endHour24 =
    endPeriod === "PM" && endHour !== "12"
      ? parseInt(endHour, 10) + 12
      : endPeriod === "AM" && endHour === "12"
      ? 0
      : parseInt(endHour, 10);

  const endDate = new Date(date);
  endDate.setHours(endHour24, endMin, 0);

  const title = `${name}${name.endsWith("s") ? "" : "'s"} Appointment`;
  const color =
    status == "cancelled"
      ? "#F44336"
      : carePlanStatus
      ? "#4CAF50"
      : status == "no-show"
      ? "lightgray"
      : "#FF9800";
  const desc =
    status == "cancelled"
      ? "Cancelled"
      : carePlanStatus
      ? "Completed"
      : status == "no-show"
      ? "No-show"
      : "Pending";
  return { start: startDate, end: endDate, title, color, desc };
};

const timeAgo = (date) => {
  const now = moment();
  const duration = moment.duration(now.diff(moment(date)));

  const seconds = Math.floor(duration.asSeconds());
  const minutes = Math.floor(duration.asMinutes());
  const hours = Math.floor(duration.asHours());
  const days = Math.floor(duration.asDays());
  const years = Math.floor(duration.asYears());

  if (isNaN(seconds) || seconds < 0) return "";
  if (years > 0) return `${years}y`;
  if (days > 0) return `${days}d`;
  if (hours > 0) return `${hours}h`;
  if (minutes > 0) return `${minutes}m`;
  return `${seconds}s`;
};

const vetAppointments = [
  "Wellness Checkup",
  "Vaccination Appointment",
  "Surgery Consultation",
  "Dental Cleaning",
  "Parasite Control Treatment",
  "Skin Allergy Consultation",
  "Urgent Care Visit",
  "Nutritional Consultation",
  "Behavioral Consultation",
  "Grooming Appointment",
  "Euthanasia Appointment",
  "Follow-up Visit",
  "Diagnostic Testing",
  "Senior Pet Evaluation",
  "Microchipping",
  "Spay/Neuter Surgery",
  "Health Certificate Exam",
  "Travel Health Check",
  "Puppy/Kitten Wellness Plan",
  "Emergency Visit",
];

export const petDiseasesLookUps = [
  { key: 3000, value: "Rabies" },
  { key: 3001, value: "Canine Distemper" },
  { key: 3002, value: "Feline Calicivirus" },
  { key: 3003, value: "Ehrlichiosis (Tick Fever)" },
  { key: 3004, value: "Heartworm Disease" },
  { key: 3005, value: "Mange (Galise)" },
  { key: 3006, value: "Parvovirus" },
  { key: 3007, value: "Leptospirosis" },
  { key: 3008, value: "Feline Panleukopenia" },
  { key: 3009, value: "Tick and Flea Infestation" },
  { key: 3010, value: "Worm Infestation (Roundworm/Hookworm)" },
  { key: 3011, value: "Kennel Cough" },
  { key: 3012, value: "Feline Immunodeficiency Virus (FIV)" },
  { key: 3013, value: "Feline Leukemia Virus (FeLV)" },
  { key: 3014, value: "Heat Stroke" },
  { key: 3015, value: "Demodectic Mange" },
  { key: 3016, value: "Scabies (Sarcoptic Mange)" },
  { key: 3017, value: "Dental Disease" },
  { key: 3018, value: "Skin Allergies" },
  { key: 3019, value: "Ear Infections" },
  { key: 3020, value: "Urinary Tract Infections (UTI)" },
  { key: 3021, value: "Gastrointestinal Issues" },
  { key: 3022, value: "Arthritis" },
  { key: 3023, value: "Obesity" },
  { key: 3024, value: "Diabetes" },
  { key: 3025, value: "Heart Disease" },
  { key: 3026, value: "Respiratory Infections" },
  { key: 3027, value: "Eye Infections" },
  { key: 3028, value: "Kidney Disease" },
  { key: 3029, value: "Liver Disease" },
  { key: 3030, value: "Hypothyroidism" },
  { key: 3031, value: "Hyperthyroidism" },
  { key: 3032, value: "Cancer" },
  { key: 3033, value: "Anemia" },
  { key: 3034, value: "Seizures" },
  { key: 3035, value: "Other" },
];

export const dashboardData = {
  dentalDisease: "Dental Disease",
  skinAllergies: "Skin Allergies",
  earInfections: "Ear Infections",
  urinaryTractInfections: "Urinary Tract Infections (UTI)",
  gastrointestinalIssues: "Gastrointestinal Issues",
  arthritis: "Arthritis",
  obesity: "Obesity",
  diabetes: "Diabetes",
  heartDisease: "Heart Disease",
  respiratoryInfections: "Respiratory Infections",
  eyeInfections: "Eye Infections",
  kidneyDisease: "Kidney Disease",
  liverDisease: "Liver Disease",
  hypothyroidism: "Hypothyroidism",
  hyperthyroidism: "Hyperthyroidism",
  cancer: "Cancer",
  anemia: "Anemia",
  seizures: "Seizures",
  tickFever: "Tick Fever",
  parvovirus: "Parvovirus",
};

export const dashboardChartConfig = {
  appointments: {
    label: "Datadata",
  },
  ...Object.fromEntries(
    Object.entries(dashboardData).map(([key, label], index) => [
      key,
      {
        label,
        color: `hsl(var(--chart-${index + 1}))`,
      },
    ])
  ),
};

// dateUtils.js

export const normalizeDate = (value) => {
  if (!value) return null; // If value is null or undefined, return null
  if (value instanceof Date) return value; // Already a Date object
  if (typeof value === "object") {
    if (value.seconds !== undefined) {
      return new Date(value.seconds * 1000); // Firestore Timestamp
    }
  }
  return null; // If it's an invalid type, return null
};

export const formatDateForFirestore = (date) => {
  if (!date) return null; // Handle null values
  if (date instanceof Date) {
    return { seconds: Math.floor(date.getTime() / 1000), nanoseconds: 0 };
  }
  return date; // If already a timestamp, keep it as is
};

export const formatFirebaseDate = (timestamp) => {
  if (!timestamp || !timestamp.seconds) return "";
  return moment.unix(timestamp.seconds).format("MM/DD/YYYY"); // Convert Firestore timestamp to MM/DD/YYYY
};

// Function to format date with time (MM/DD/YYYY hh:mm A)
export const formatFirebaseDateTime = (timestamp) => {
  if (!timestamp || !timestamp.seconds) return "";
  return moment.unix(timestamp.seconds).format("MM/DD/YYYY hh:mm A");
};

export const removeUndefinedValues = (obj) => {
  if (obj === null || obj === undefined) return null;

  if (typeof obj === "object") {
    if (obj instanceof Date) {
      return Timestamp.fromDate(obj); // Convert Date to Firestore Timestamp
    }

    if (Array.isArray(obj)) {
      return obj.map(removeUndefinedValues); // Recursively clean arrays
    }

    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [
        key,
        removeUndefinedValues(value),
      ])
    );
  }

  return obj;
};

export {
  generateRandomId,
  returnPetPie,
  formatDate,
  checkSelectedPet,
  formatDateWDay,
  getDay,
  formattedDate,
  generateTimeSlots,
  checkBookedSlot,
  stringToDate,
  isPastDateTime,
  vetAppointments,
  convertTimeStringToDate,
  timeAgo,
};
