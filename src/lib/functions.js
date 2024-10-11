/* eslint-disable no-unused-vars */
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
    return (book?.date == date && book?.time == time && book?.status == 'booked');
  });
  return has.length > 0;
};

function stringToDate(dateString) {
  const [month, day, year] = dateString.split('-');
  const monthNames = [
      "January", "February", "March", "April", "May", "June", 
      "July", "August", "September", "October", "November", "December"
  ];
  return `${monthNames[parseInt(month) - 1]} ${day}, ${year}`;
}

function isPastDateTime(dateString, timeString) {
  const [month, day, year] = dateString.split('-').map(Number);
  
  const [time, modifier] = timeString.split(' ');
  const [hours, minutes] = time.split(':').map(Number);

  const adjustedHours = modifier === 'PM' && hours !== 12 ? hours + 12 : hours;
  const adjustedHoursForMidnight = modifier === 'AM' && hours === 12 ? 0 : adjustedHours;
  const appointmentDateTime = new Date(year, month - 1, day, adjustedHoursForMidnight, minutes);

  const now = new Date();
  return appointmentDateTime < now;
}

const convertTimeStringToDate = (timeString, dateString, name, status, carePlanStatus) => {
  const [month, day, year] = dateString.split('-').map(num => parseInt(num, 10));
  const date = new Date(year, month - 1, day);

  const [startTime, endTime] = timeString.split(' - ').map(t => t.trim());
  
  const [startHour, startMinute] = startTime.split(':');
  const startPeriod = startMinute.slice(-2); // AM or PM
  const startMin = parseInt(startMinute.slice(0, -2), 10);

  const startHour24 = startPeriod === 'PM' && startHour !== '12'
    ? parseInt(startHour, 10) + 12
    : startPeriod === 'AM' && startHour === '12'
    ? 0
    : parseInt(startHour, 10);

  const startDate = new Date(date);
  startDate.setHours(startHour24, startMin, 0);

  const [endHour, endMinute] = endTime.split(':');
  const endPeriod = endMinute.slice(-2); // AM or PM
  const endMin = parseInt(endMinute.slice(0, -2), 10);

  const endHour24 = endPeriod === 'PM' && endHour !== '12'
    ? parseInt(endHour, 10) + 12
    : endPeriod === 'AM' && endHour === '12'
    ? 0
    : parseInt(endHour, 10);

  const endDate = new Date(date);
  endDate.setHours(endHour24, endMin, 0);

  const title = `${name}${name.endsWith('s') ? '' : "'s"} Appointment`;
  const color = status == 'cancelled' ? '#F44336' : (carePlanStatus ? '#4CAF50' :  (status == 'no-show' ? 'lightgray' : '#FF9800'));
  const desc = status == 'cancelled' ? 'Cancelled' : (carePlanStatus ? 'Completed' : (status == 'no-show' ? 'No-show' : 'Pending'));
  return { start: startDate, end: endDate, title, color, desc };
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
  "Emergency Visit"
];

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
  convertTimeStringToDate
};
