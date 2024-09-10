import { Activity, Ambulance, HeartPulse, Salad, Syringe } from "lucide-react";
import { TbDental } from "react-icons/tb";

const ServiceCard = ({ icon: IconComponent, title, description, color }) => {
  return (
    <div className="flex">
      <div className="flex flex-col rounded-xl py-8 px-7 shadow-md dark:shadow-gray-900 transition-all hover:shadow-lg sm:p-9 lg:px-6 xl:px-9 h-full">
        <div className="mb-7 inline-block">
          <IconComponent size={48} className={`${color}`} />
        </div>
        <div>
          <h3
            className={`${color} mb-4 text-xl font-bold sm:text-2xl lg:text-xl xl:text-2xl`}
          >
            {title}
          </h3>
          <p className="text-base font-medium text-body-color">{description}</p>
        </div>
      </div>
    </div>
  );
};

const services = [
  {
    icon: HeartPulse,
    title: "Comprehensive Health Exams",
    description:
      "Our clinic offers thorough health examinations to detect any potential issues in your pets, ensuring they lead healthy and happy lives.",
    color: "text-red-500 dark:text-red-400",
  },
  {
    icon: Syringe,
    title: "Vaccinations & Preventive Care",
    description:
      "Stay on top of your pet’s health with our vaccination and preventive care services, tailored to protect them from common diseases and illnesses.",
    color: "text-purple-700 dark:text-indigo-400",
  },
  {
    icon: TbDental,
    title: "Dental Care for Pets",
    description:
      "We provide professional dental care, including cleanings and treatments, to keep your pet’s teeth and gums in optimal condition.",
    color: "text-blue-600 dark:text-blue-400",
  },
  {
    icon: Activity,
    title: "Surgical Procedures",
    description:
      "From routine surgeries like spaying and neutering to more advanced procedures, our skilled veterinary team is equipped to provide the best care for your pet.",
    color: "text-green-500 dark:text-green-400",
  },
  {
    icon: Salad,
    title: "Pet Nutrition Counseling",
    description:
      "Our experts offer personalized nutrition counseling, helping you choose the right diet plan for your pet's health and lifestyle.",
    color: "text-orange-500 dark:text-orange-400",
  },
  {
    icon: Ambulance,
    title: "Emergency Services",
    description:
      "We are here to provide urgent care when your pet needs it most. Our clinic is equipped to handle a wide range of emergency situations.",
    color: "text-yellow-500 dark:text-yellow-400",
  },
];

export default function ServicesSection() {
  return (
    <section className="my-0 lg:my-24">
      <div className="flex items-center justify-center flex-col gap-y-2 py-5 mb-10">
        <h2 className="text-purple-700 dark:text-indigo-400 text-2xl md:text-3xl lg:text-4xl font-bold">
          Our Veterinary Services
        </h2>
        <p className="text-center italic text-lg font-medium text-slate-700/70 dark:text-gray-400">
          Discover the wide range of services we offer to keep your pets happy
          and healthy. Whether it’s routine check-ups, preventive care, or
          emergency treatments, our dedicated team is here to provide
          exceptional care for your furry companions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            icon={service.icon}
            title={service.title}
            description={service.description}
            color={service.color}
          />
        ))}
      </div>
    </section>
  );
}
