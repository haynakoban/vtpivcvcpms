import { Link } from "react-router-dom";
import Payments from "@/assets/payments.jpg";
import PetWellness from "@/assets/pet_wellness.jpg";
import Telemedicine from "@/assets/vet_care.jpg";

export default function BlogPosts() {
  return (
    <section className="py-24 ">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-manrope text-4xl font-bold text-gray-900 dark:text-white text-center mb-14">
          Our popular blogs
        </h2>
        <div className="flex justify-center mb-14 gap-y-8 lg:gap-y-0 flex-wrap md:flex-wrap lg:flex-nowrap lg:flex-row lg:justify-between lg:gap-x-8">
          <div className="group cursor-pointer w-full max-lg:max-w-xl lg:w-1/3 border border-gray-300 rounded-2xl p-5 transition-all duration-300 hover:border-indigo-600">
            <div className="flex items-center mb-6">
              <img
                src={PetWellness}
                alt="Pet wellness image"
                className="rounded-lg w-full object-cover"
              />
            </div>
            <div className="block">
              <h4 className="text-gray-900 dark:text-white font-medium leading-8 mb-9">
                Pet Wellness 101: Essential Tips for Keeping Your Pet Healthy
              </h4>
              <div className="flex items-center justify-between  font-medium">
                <h6 className="text-sm text-gray-500">By Dr. Sarah L.</h6>
                <span className="text-sm text-indigo-600">6 months ago</span>
              </div>
            </div>
          </div>
          <div className="group cursor-pointer w-full max-lg:max-w-xl lg:w-1/3 border border-gray-300 rounded-2xl p-5 transition-all duration-300 hover:border-indigo-600">
            <div className="flex items-center mb-6">
              <img
                src={Telemedicine}
                alt="Telemedicine image"
                className="rounded-lg w-full object-cover"
              />
            </div>
            <div className="block">
              <h4 className="text-gray-900 dark:text-white font-medium leading-8 mb-9">
                From Clinic to Home: How Telemedicine is Transforming Veterinary
                Care
              </h4>
              <div className="flex items-center justify-between font-medium">
                <h6 className="text-sm text-gray-500">By Dr. Emily K.</h6>
                <span className="text-sm text-indigo-600">1 year ago</span>
              </div>
            </div>
          </div>
          <div className="group cursor-pointer w-full max-lg:max-w-xl lg:w-1/3 border border-gray-300 rounded-2xl p-5 transition-all duration-300 hover:border-indigo-600">
            <div className="flex items-center mb-6">
              <img
                src={Payments}
                alt="Payments image"
                className="rounded-lg w-full object-cover"
              />
            </div>
            <div className="block">
              <h4 className="text-gray-900 dark:text-white font-medium leading-8 mb-9">
                Veterinary Payment Plans: Making Pet Care More Affordable
              </h4>
              <div className="flex items-center justify-between font-medium">
                <h6 className="text-sm text-gray-500">By Dr. Megan R.</h6>
                <span className="text-sm text-indigo-600">8 months ago</span>
              </div>
            </div>
          </div>
        </div>
        <Link
          to={"#"}
          className="cursor-pointer border border-gray-300 shadow-sm rounded-full py-3.5 px-7 w-52 flex justify-center items-center text-gray-900 dark:text-white font-semibold mx-auto transition-all duration-300 hover:bg-gray-100 dark:hover:bg-slate-900"
        >
          View All
        </Link>
      </div>
    </section>
  );
}
