import moment from "moment";

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

const checkSelectedPet = (selectedPet, id) => {
  return (
    selectedPet.filter((pet) => {
      return pet == id;
    }).length > 0
  );
};

export { generateRandomId, returnPetPie, formatDate, checkSelectedPet };
