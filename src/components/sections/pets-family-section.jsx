import { Button } from "@/components/ui/button";
import DogPortrait from "@/assets/dog_3_portrait.jpg";

export default function PetsFamilySection() {
  return (
    <section className="mb-0 mt-24">
      <div className="p-8 relative flex flex-col items-center mx-auto lg:flex-row-reverse lg:max-w-5xl lg:mt-12 xl:max-w-6xl">
        {/* <!-- Image Column --> */}
        <div className="w-full h-full md:h-96 lg:w-1/2 lg:h-auto">
          <img
            className="h-full max-h-[600px] w-full object-cover rounded-md shadow-xl sm:rounded-xl"
            src={DogPortrait}
            alt="Dog Portrait Photo"
          />
        </div>
        {/* <!-- Close Image Column --> */}

        {/* <!-- Text Column --> */}
        <div className="w-full bg-white dark:bg-slate-900 rounded-md sm:rounded-xl md:max-w-2xl md:z-10 md:shadow-lg md:absolute md:top-28 md:mt-48 lg:w-3/5 lg:top-0 lg:left-0 lg:mt-20 lg:ml-20 xl:mt-24 xl:ml-12">
          {/* <!-- Text Wrapper --> */}
          <div className="flex flex-col px-0 py-12 md:px-16">
            <h2 className="text-2xl font-semibold uppercase text-purple-800 lg:text-4xl">
              Pets in the Family
            </h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Our services are designed to support the pets that are an integral
              part of your family. Whether it's routine checkups or specialized
              treatments, we’re here to ensure your furry family members stay
              healthy and happy.
            </p>
            {/* <!-- Button Container --> */}
            <div className="mt-8">
              <Button variant={"default"} size={"lg"}>
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
